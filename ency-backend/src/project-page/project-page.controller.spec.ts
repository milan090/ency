import { Test, TestingModule } from "@nestjs/testing";
import { ProjectPageController } from "./project-page.controller";
import { ProjectPageService } from "./project-page.service";

describe("ProjectPageController", () => {
  let controller: ProjectPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectPageController],
      providers: [ProjectPageService],
    }).compile();

    controller = module.get<ProjectPageController>(ProjectPageController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
