import { PartialType } from "@nestjs/mapped-types";
import { IsOptional, IsString } from "class-validator";
import { CreateProjectDto } from "./create-project.dto";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
