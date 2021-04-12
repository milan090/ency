import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import Request from "supertest";
import { ProjectModule } from "./project.module";

describe("ProjectController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProjectModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/ (GET)", () => {
    return (
      Request(app.getHttpServer())
        // TODO
        .get("/")
        .expect(404)
    );
  });
});
