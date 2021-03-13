import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { FirebaseAdminModule } from "@aginix/nestjs-firebase-admin";
import { AuthModule } from "./auth/auth.module";
import { ProjectModule } from "./project/project.module";
import * as admin from "firebase-admin";
import { ConfigModule } from "@nestjs/config";
import { LoggerService } from "./logger.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";

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
  ],
  providers: [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [LoggerService],
})
export class AppModule {}
