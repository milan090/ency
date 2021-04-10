import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from "@nestjs/common";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { FirebaseUser } from "../auth/decorators/user.decorator";
import { IFirebaseUser } from "../auth/interfaces/user.interface";
import { Public } from "../auth/auth.guard";
import { ProjectEntity } from "./enitiies/project.entity";

@Controller("projects")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(
    @Body() createProjectDto: CreateProjectDto,
    @FirebaseUser() user?: IFirebaseUser,
  ): Promise<ProjectEntity> {
    return this.projectService.create(createProjectDto, user?.uid);
  }

  @Get()
  findAll(@FirebaseUser() user: IFirebaseUser): Promise<ProjectEntity[]> {
    return this.projectService.findAll(user, user.uid);
  }

  @Public()
  @Get("user/:uid")
  async findUsersProjects(
    @FirebaseUser() user: IFirebaseUser,
    @Param("uid") userUid: string,
  ): Promise<ProjectEntity[]> {
    return this.projectService.findAll(user, userUid);
  }

  @Public()
  @Get(":id")
  async findOne(
    @Param("id", ParseIntPipe) id: number,
    @FirebaseUser() user?: IFirebaseUser,
  ): Promise<ProjectEntity> {
    const project = await this.projectService.findOne(id);

    if (!project.isPublic && project.userUid !== user?.uid) {
      throw new NotFoundException(
        "A project with the given id not found (or is not public and not owned by you)",
      );
    }

    return project;
  }

  @Put(":id")
  update(
    @FirebaseUser() user: IFirebaseUser,
    @Param("id", ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    return this.projectService.update(user.uid, id, updateProjectDto);
  }

  @Delete(":id")
  remove(
    @FirebaseUser() user: IFirebaseUser,
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.projectService.remove(user.uid, id);
  }
}
