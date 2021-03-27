import { FirebaseAuthenticationService } from "@aginix/nestjs-firebase-admin";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { IFirebaseUser } from "./interfaces/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private firebaseAuth: FirebaseAuthenticationService,
    private prisma: PrismaService,
  ) {}

  async validateUser(token: string, req: any): Promise<IFirebaseUser | null> {
    try {
      const idToken = await this.firebaseAuth.verifyIdToken(token);
      const user = { uid: idToken.uid };
      req.user = user;
      return user;
    } catch (error) {
      return null;
    }
  }

  async signUpEmailPass(email: string, password: string) {
    return this.firebaseAuth.createUser({
      email: email,
      password: password,
    });
  }

  async createUser(uid: string, name: string, email: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        uid,
        email,
        name,
        coins: 0,
      },
    });
  }

  async getUser(uid: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { uid } });
  }
}
