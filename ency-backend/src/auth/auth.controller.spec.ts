import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { IFirebaseUser } from "./interfaces/user.interface";
import { users } from "../../prisma/mock-data.json";
import { NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

describe("AuthController", () => {
  let controller: AuthController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [AppModule, PrismaModule],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  afterAll(async () => {
    await module.close();
  });

  describe("getUser", () => {
    it("Should return a valid user object", async () => {
      const userMockData = users[0];
      const firebaseUser: IFirebaseUser = {
        uid: userMockData.uid,
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

  describe("signUp", () => {
    it("Creating new valid user Should return a valid user object", async () => {
      const userMockData = users[1];
      const firebaseUser: IFirebaseUser = {
        uid: userMockData.uid,
      };
      const user = await controller.signUp(firebaseUser, {
        ...userMockData,
      });
      expect(user.coins).toBe(0);
      expect(user.uid).toBe(userMockData.uid);
      expect(user.email).toBe(userMockData.email);
    });

    it("Creating a duplicate user should return error message", async () => {
      const userMockData = users[0];
      const firebaseUser: IFirebaseUser = { uid: userMockData.uid };

      await expect(
        controller.signUp(firebaseUser, userMockData),
      ).rejects.toBeInstanceOf(PrismaClientKnownRequestError);
    });
  });
});
