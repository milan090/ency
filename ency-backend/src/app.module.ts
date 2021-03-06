import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaModule } from "./prisma/prisma.module";
import { FirebaseAdminModule } from "@aginix/nestjs-firebase-admin";
import { AuthModule } from "./auth/auth.module";
import { ProjectModule } from "./project/project.module";
import * as admin from "firebase-admin";
import { ProjectPageModule } from "./project-page/project-page.module";
import { ConfigModule } from "@nestjs/config";
import { LoggerService } from "./logger.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
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
    ProjectModule,
    ProjectPageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, LoggerService],
  exports: [LoggerService],
})
export class AppModule {}
