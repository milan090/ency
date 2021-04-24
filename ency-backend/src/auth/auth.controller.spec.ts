import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
//import { IFirebaseUser } from "./interfaces/user.interface";
import { users } from "../../prisma/mock-data.json";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;
  let module: TestingModule;
  const notRegisteredInDbUser = {
    email: "not-registered-in-db@gmail.com",
    uid: "",
  };

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
    //await service.deleteUser(users[0].uid);
    //await service.deleteUser(notRegisteredInDbUser.uid);
    await module.close();
  });

  describe("todo", () => {
    it("", () => {
      const test = 2;
      expect(test).toBe(2);
    })
  })

  // describe("signUp", () => {
  //   it("Creating new valid user Should return a valid user object", async () => {
  //     const userMockData = users[0];

  //     const user = await controller.signUp({
  //       ...userMockData,
  //       password: "Abc123!!!",
  //     });
  //     users[0].uid = user.uid;

  //     expect(user.coins).toBe(0);
  //     expect(user.uid).toBe(userMockData.uid);
  //     expect(user.name).toBe(userMockData.name);
  //     expect(user.email).toBe(userMockData.email);
  //   });

  //   it("Creating a duplicate user should return error message", async () => {
  //     const userMockData = users[0];

  //     await expect(
  //       controller.signUp({ ...userMockData, password: "Abc123!!!" }),
  //     ).rejects.toEqual(
  //       new Error("The email address is already in use by another account."),
  //     );
  //   });
  // });

  // describe("getUser", () => {
  //   it("Should return a valid user object", async () => {
  //     const userMockData = users[0];

  //     const firebaseUser: IFirebaseUser = {
  //       uid: users[0].uid,
  //     };
  //     const user = await controller.getUser(firebaseUser);
  //     expect(user.email).toBe(userMockData.email);
  //   });

  //   it("Should throw error user object", async () => {
  //     const firebaseUser: IFirebaseUser = {
  //       uid: "some-users-uid-not-registered-in-database",
  //     };

  //     await expect(controller.getUser(firebaseUser)).rejects.toThrow();
  //   });

  //   it("Should return valid response for firebase authenticated user not registered in db", async () => {
  //     const newUser = await service.signUpEmailPass(
  //       notRegisteredInDbUser.email,
  //       "test1234",
  //     );
  //     notRegisteredInDbUser.uid = newUser.uid;
  //     const firebaseUser: IFirebaseUser = {
  //       uid: newUser.uid,
  //     };
  //     const user = await controller.getUser(firebaseUser);
  //     expect(user.email).toBe(notRegisteredInDbUser.email);
  //   });
  // });
});
