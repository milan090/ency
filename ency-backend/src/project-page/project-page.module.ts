import { Module } from "@nestjs/common";
import { ProjectPageService } from "./project-page.service";
import { ProjectPageController } from "./project-page.controller";

@Module({
  controllers: [ProjectPageController],
  providers: [ProjectPageService],
  exports: [ProjectPageService],
})
export class ProjectPageModule {}
