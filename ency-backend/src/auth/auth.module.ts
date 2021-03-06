import { Module } from "@nestjs/common";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [PrismaModule],
  providers: [AuthService, AuthGuard, PrismaService],
  exports: [AuthGuard, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
