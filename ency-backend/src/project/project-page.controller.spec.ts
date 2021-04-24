import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import { AuthModule } from "../auth/auth.module";
import { PrismaModule } from "../prisma/prisma.module";
import { ProjectPageController } from "./project-page.controller";
import { ProjectPageService } from "./project-page.service";
import { ProjectController } from "./project.controller";
import { users, projects } from "../../prisma/mock-data.json";
import { IFirebaseUser } from "../auth/interfaces/user.interface";
import { ProjectService } from "./project.service";
import { NotFoundException } from "@nestjs/common";

//TODO findAll()

describe("ProjectPageController", () => {
  let projectController: ProjectController;
  let controller: ProjectPageController;
  let module: TestingModule;

  const mockData = { pageId: 0, projectId: 0 }; // Temp values

  let newProjectId: number;
  const mockUserData = users[0];
  const user: IFirebaseUser = { uid: mockUserData.uid };
  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule, AuthModule, AppModule],
      controllers: [ProjectPageController, ProjectController],
      providers: [ProjectPageService, ProjectService],
    }).compile();

    controller = module.get<ProjectPageController>(ProjectPageController);
    projectController = module.get<ProjectController>(ProjectController);

    const mockProject = projects.filter((project) => project.isPublic)[0];
    const { userUid, ...mockProjectData } = mockProject;
    const newProjectData = await projectController.create(
      mockProjectData,
      user,
    );
    newProjectId = newProjectData.id;
  });

  afterAll(async () => {
    await module.close();
  });

  describe("Post(:id/page) create", () => {
    it("With valid input, Should return valid Response, (create)", async () => {
      const newProjectPage = await controller.create(user, {
        projectId: newProjectId,
      });
      mockData.pageId = newProjectPage.id;
      mockData.projectId = newProjectPage.projectId;
      expect(newProjectPage).toMatchSnapshot("new-project-page");
    });
    // checked
    it("With invalid input, it should return an error", async () => {
      await expect(controller.create(user, { projectId: 7835 })).toThrowError; //user
    });

    it("Creating a duplicate should return error", async () => {
      await expect(controller.create(user, { projectId: newProjectId }))
        .toThrowError;
    });
  });

  describe("Get(:id/page/:pageId) read", () => {
    it("With valid input, Should return valid Response, (get)", async () => {
      const res = await controller.findOne(user, mockData.pageId);
      expect(res.id).toBe(mockData.pageId);
      expect(res.name).toBe("Untitled Page");
      expect(res.data).toBe("");
      expect(res.projectId).toBe(mockData.projectId);
    });

    it("With invalid input, it should return an error", async () => {
      const invalidProjectPageId = 0;
      await expect(
        controller.findOne(user, invalidProjectPageId),
      ).rejects.toThrowError(
        new NotFoundException(
          `Project Page with given id not found: ${invalidProjectPageId}`,
        ),
      );
    });
  });

  describe("Update(:id/page/:pageId) put", () => {
    const updateData = {
      name: "updated project page",
      data: "updated data here",
    };
    it("With valid input, Should return valid Response, (update)", async () => {
      const res = await controller.update(user, mockData.projectId, updateData); // user
      expect(res).toMatchSnapshot();
    });

    it("With invalid input, it should return an error", async () => {
      await expect(
        controller.update(user, 7835, updateData),
      ).rejects.toThrowError(
        new NotFoundException("Page with given id does not exist"),
      );
    });
  });

  describe("Delete(:id/page/:pageId) delete", () => {
    it("With valid input, Should return valid Response (delete)", async () => {
      await expect(controller.remove(user, mockData.pageId)).toMatchSnapshot();
    });

    it("With invalid input, it should return an error", async () => {
      await expect(controller.remove(user, 7835)).rejects.toThrowError(
        new NotFoundException("Page with given id does not exist"),
      );
    });
  });
});
