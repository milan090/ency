import { Test, TestingModule } from "@nestjs/testing";
import { PrismaModule } from "src/prisma/prisma.module";
import { ProjectService } from "./project.service";

describe("ProjectService", () => {
  let service: ProjectService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ProjectService],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  afterAll(async () => {
    module.close();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
