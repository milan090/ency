import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { ProjectPageService } from "./project-page.service";
import { CreateProjectPageDto } from "./dto/create-project-page.dto";
import { UpdateProjectPageDto } from "./dto/update-project-page.dto";

@Controller("project-page")
export class ProjectPageController {
  constructor(private readonly projectPageService: ProjectPageService) {}

  @Post()
  create(@Body() createProjectPageDto: CreateProjectPageDto) {
    return this.projectPageService.create(createProjectPageDto);
  }

  @Get()
  findAll() {
    return this.projectPageService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.projectPageService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateProjectPageDto: UpdateProjectPageDto,
  ) {
    return this.projectPageService.update(+id, updateProjectPageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.projectPageService.remove(+id);
  }
}
