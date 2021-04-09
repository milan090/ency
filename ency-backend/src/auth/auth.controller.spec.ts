import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { IFirebaseUser } from "./interfaces/user.interface";
import { users } from "../../prisma/mock-data.json";
import { NotFoundException } from "@nestjs/common";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [AppModule, PrismaModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  afterAll(async () => {
    await service.deleteUser(users[0].uid, true);

    // await module.close();
  });

  describe("signUp", () => {
    it("Creating new valid user Should return a valid user object", async () => {
      const userMockData = users[0];

      const user = await controller.signUp({
        ...userMockData,
        password: "Abc123!!!",
      });
      users[0].uid = user.uid;

      expect(user.coins).toBe(0);
      expect(user.uid).toBe(userMockData.uid);
      expect(user.name).toBe(userMockData.name);
      expect(user.email).toBe(userMockData.email);
    });

    it("Creating a duplicate user should return error message", async () => {
      const userMockData = users[0];

      await expect(
        controller.signUp({ ...userMockData, password: "Abc123!!!" }),
      ).rejects.toEqual(
        new Error("The email address is already in use by another account."),
      );
    });
  });

  describe("getUser", () => {
    it("Should return a valid user object", async () => {
      const userMockData = users[0];

      const firebaseUser: IFirebaseUser = {
        uid: users[0].uid,
      };
      const user = await controller.getUser(firebaseUser);
      expect(user.email).toBe(userMockData.email);
    });

    it("Should throw error user object", async () => {
      const firebaseUser: IFirebaseUser = {
        uid: "some-users-uid-not-registered-in-database",
      };

      await expect(controller.getUser(firebaseUser)).rejects.toEqual(
        new NotFoundException("User with given id not found"),
      );
    });
  });
});
