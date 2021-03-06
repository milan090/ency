import { Injectable } from "@nestjs/common";
import { CreateProjectPageDto } from "./dto/create-project-page.dto";
import { UpdateProjectPageDto } from "./dto/update-project-page.dto";

@Injectable()
export class ProjectPageService {
  create(createProjectPageDto: CreateProjectPageDto) {
    return "This action adds a new projectPage";
  }

  findAll() {
    return "This action returns all projectPage";
  }

  findOne(id: number) {
    return `This action returns a #${id} projectPage`;
  }

  update(id: number, updateProjectPageDto: UpdateProjectPageDto) {
    return `This action updates a #${id} projectPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectPage`;
  }
}
