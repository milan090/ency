import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "../prisma/prisma.module";
import { ProjectPageService } from "./project-page.service";

describe("ProjectPageService", () => {
  let service: ProjectPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProjectPageService],
    }).compile();

    service = module.get<ProjectPageService>(ProjectPageService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
