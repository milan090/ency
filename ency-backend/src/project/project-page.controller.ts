import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ProjectPageService } from "./project-page.service";
import { CreateProjectPageDto } from "./dto/create-project-page.dto";
import { UpdateProjectPageDto } from "./dto/update-project-page.dto";
import { Public } from "src/auth/auth.guard";
import { FirebaseUser } from "src/auth/decorators/user.decorator";
import { IFirebaseUser } from "src/auth/interfaces/user.interface";
import {
  ProjectPageEntity,
  ProjectPageEntityNoData,
} from "./enitiies/projectPage.entity";

/**
 * Here id param will be used to refer to the Projects ID and pageId for ProjectPages ID
 */
@Controller("project")
export class ProjectPageController {
  constructor(private readonly projectPageService: ProjectPageService) {}

  @Post(":id/page")
  create(
    @FirebaseUser() user: IFirebaseUser,
    @Body() createProjectPageDto: CreateProjectPageDto,
  ) {
    return this.projectPageService.create(user, createProjectPageDto);
  }

  @Get(":id/page")
  @Public()
  findAll(
    @FirebaseUser() user: IFirebaseUser,
    @Param("id", ParseIntPipe) projectId: number,
  ): Promise<ProjectPageEntityNoData[]> {
    return this.projectPageService.findAll(user, projectId);
  }

  @Get(":id/page/:pageId")
  @Public()
  findOne(
    @FirebaseUser() user: IFirebaseUser,
    @Param("pageId", ParseIntPipe) pageId: number,
  ): Promise<ProjectPageEntity> {
    return this.projectPageService.findOne(user, pageId);
  }

  @Put(":id/page/:pageId")
  update(
    @FirebaseUser() user: IFirebaseUser,
    @Param("pageId", ParseIntPipe) pageId: number,
    @Body() updateProjectPageDto: UpdateProjectPageDto,
  ): Promise<ProjectPageEntity> {
    return this.projectPageService.update(user, pageId, updateProjectPageDto);
  }

  @Delete(":id/page/:pageId")
  remove(
    @FirebaseUser() user: IFirebaseUser,
    @Param("pageId", ParseIntPipe) pageId: number,
  ): Promise<ProjectPageEntity> {
    return this.projectPageService.remove(user, pageId);
  }
}
