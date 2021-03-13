import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let service: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    module.close();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
