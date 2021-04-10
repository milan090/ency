import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../prisma/prisma.module";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { users, projects } from "../../prisma/mock-data.json";
import { Project } from "@prisma/client";
import { IFirebaseUser } from "../auth/interfaces/user.interface";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ProjectEntity } from "./enitiies/project.entity";
import { NotFoundException } from "@nestjs/common";

describe("ProjectController", () => {
  let controller: ProjectController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [ProjectController],
      providers: [ProjectService],
    }).compile();

    controller = module.get<ProjectController>(ProjectController);
  });

  afterAll(async () => {
    module.close();
  });

  describe("Post() create", () => {
    it("Creating project with valid data should return valid response", async () => {
      const mockProjectData = projects[0];
      const { userUid, ...mockProject } = mockProjectData;
      const mockUser: IFirebaseUser = {
        uid: userUid,
      };

      const project: Project = await controller.create(mockProject, mockUser);
      expect(project).toMatchObject(mockProjectData);
    });

    it("Creating project with invalid user data should throw error", async () => {
      const mockProjectData = projects[0];
      const { userUid, ...mockProject } = mockProjectData;
      const mockUser: IFirebaseUser = {
        uid: "invalid-user-data",
      };

      await expect(
        controller.create(mockProject, mockUser),
      ).rejects.toBeInstanceOf(PrismaClientKnownRequestError);
    });
  });

  describe("Get() findAll", () => {
    it("Should return array of projects for valid user", async () => {
      const mockUserData = users[0];
      const user: IFirebaseUser = { uid: mockUserData.uid };

      const mockProjectsData = projects.filter(
        (project) => project.userUid === user.uid,
      );

      await Promise.all(
        mockProjectsData.map(async (project) => {
          const { userUid, ...mockProjectData } = project;
          await controller.create(mockProjectData, user);
        }),
      );

      const projectsRes: Project[] = await controller.findAll(user);
      expect(projectsRes).toMatchSnapshot("mock-projects-data");
    });
  });

  describe("Get(:id) findOne", () => {
    it("Should return valid Project data", async () => {
      // Create a mock project in database which belongs to a user
      const mockUserData = users[0];
      const user: IFirebaseUser = { uid: mockUserData.uid };

      const mockProject = projects.filter(
        (project) => project.userUid === user.uid,
      )[0];

      const { userUid, ...mockProjectData } = mockProject;
      const { id: newProjectId } = await controller.create(
        mockProjectData,
        user,
      );

      const projectRes: ProjectEntity = await controller.findOne(
        newProjectId,
        user,
      );

      expect(projectRes).toMatchSnapshot("mock-project-0-data");
    });

    it("Should return valid Project data with not user authenticated", async () => {
      // Create a mock project in database that is public
      const mockUserData = users[0];
      const user: IFirebaseUser = { uid: mockUserData.uid };

      const mockProject = projects.filter((project) => project.isPublic)[0];
      const { userUid, ...mockProjectData } = mockProject;
      const { id: newProjectId } = await controller.create(
        mockProjectData,
        user,
      );

      const projectRes: ProjectEntity = await controller.findOne(newProjectId);

      expect(projectRes).toMatchSnapshot("mock-project-isPublic-data");
    });

    it("Should throw NotFoundException for invalid auth and not public post", async () => {
      // Create a mock project in database which is not public and belongs to diff user
      const mockUserData = users[0];
      const user: IFirebaseUser = { uid: mockUserData.uid };

      // Get a project which is not public
      const mockProject = projects.filter((project) => !project.isPublic)[0];

      const { userUid, ...mockProjectData } = mockProject;
      const { id: newProjectId } = await controller.create(
        mockProjectData,
        user,
      );

      const invalidUser: IFirebaseUser = { uid: "invalid-user-uid" };

      await expect(
        controller.findOne(newProjectId, invalidUser),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe("Put(:id) update", () => {
    let newProjectId: number;
    const mockUserData = users[0];
    const user: IFirebaseUser = { uid: mockUserData.uid };
    beforeAll(async () => {
      const mockProject = projects.filter((project) => project.isPublic)[0];
      const { userUid, ...mockProjectData } = mockProject;
      const newProjectData = await controller.create(mockProjectData, user);
      newProjectId = newProjectData.id;
    });

    it("Should return valid response on valid user and data", async () => {
      const projectRes = await controller.update(user, newProjectId, {
        description: "Some new description",
        tags: ["updated"],
        isPublic: false,
      });
      expect(projectRes).toMatchSnapshot("mock-project-updated");
    });

    it("Should throw error on invalid user", async () => {
      const invalidUser: IFirebaseUser = { uid: "invalid-user-id" };

      await expect(
        controller.update(invalidUser, newProjectId, {
          description: "some newer description",
        }),
      ).rejects.toBeInstanceOf(PrismaClientKnownRequestError);
    });
  });

  describe("Delete(:id) remove", () => {
    let newProjectId: number;
    const mockUserData = users[0];
    const user: IFirebaseUser = { uid: mockUserData.uid };
    beforeEach(async () => {
      const mockProject = projects.filter((project) => project.isPublic)[0];
      const { userUid, ...mockProjectData } = mockProject;
      const newProjectData = await controller.create(mockProjectData, user);
      newProjectId = newProjectData.id;
    });

    it("Should return valid response on valid user and data", async () => {
      const res = await controller.remove(user, newProjectId);

      expect(res).toEqual(1);

      await expect(
        controller.findOne(newProjectId, user),
      ).rejects.toBeInstanceOf(NotFoundException);
    });

    it("Should throw error on invalid user", async () => {
      const invalidUser: IFirebaseUser = { uid: "invalid-user-id" };
      await expect(
        controller.remove(invalidUser, newProjectId),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
