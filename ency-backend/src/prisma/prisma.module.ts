import { Module } from "@nestjs/common";
import { PrismaInterceptor } from "./prisma.interceptor";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService, PrismaInterceptor],
  exports: [PrismaService, PrismaInterceptor],
})
export class PrismaModule {}
