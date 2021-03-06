import { FirebaseAuthenticationService } from "@aginix/nestjs-firebase-admin";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Request } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { UserEntity } from "./interfaces/user.interface";

@Injectable()
export class AuthService {
  constructor(
    private firebaseAuth: FirebaseAuthenticationService,
    private prisma: PrismaService,
  ) {}

  async validateUser(token: string, req: any): Promise<boolean> {
    try {
      const idToken = await this.firebaseAuth.verifyIdToken(token);
      req.user = { uid: idToken.uid };
      return !!idToken.uid;
    } catch (error) {
      return false;
    }
  }

  async createUser(
    uid: string,
    name: string,
    email: string,
  ): Promise<UserEntity> {
    return await this.prisma.user.create({
      data: {
        uid,
        email,
        name,
        coins: 0,
      },
    });
  }

  async getUser(uid: string): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { uid } });
  }
}
