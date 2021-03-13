import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { AuthModule } from "src/auth/auth.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProjectPageController } from "./project-page.controller";
import { ProjectPageService } from "./project-page.service";
import { ProjectController } from "./project.controller";
import { users, projects } from "../../prisma/mock-data.json";
import { IFirebaseUser } from "src/auth/interfaces/user.interface";
import { ProjectService } from "./project.service";

describe("ProjectPageController", () => {
  let projectController: ProjectController;
  let controller: ProjectPageController;
  let module: TestingModule;

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
    it("With valid input, Should return valid Response", async () => {
      const newProjectPage = await controller.create(user, {
        projectId: newProjectId,
      });

      expect(newProjectPage).toMatchSnapshot("new-project-page");
    });
  });
});
