import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { FirebaseAdminModule } from "@aginix/nestjs-firebase-admin";
import { AuthModule } from "./auth/auth.module";
import * as admin from "firebase-admin";
import { AuthGuard } from "./auth/auth.guard";

@Module({
  imports: [
    PrismaModule,
    // nestjs-firebase-admin: https://www.npmjs.com/package/@aginix/nestjs-firebase-admin
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
