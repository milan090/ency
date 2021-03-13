import { PartialType } from "@nestjs/mapped-types";
import { Prisma } from "@prisma/client";
import { IsJSON, IsOptional, IsString } from "class-validator";
import { CreateProjectPageDto } from "./create-project-page.dto";

export class UpdateProjectPageDto extends PartialType(CreateProjectPageDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsJSON()
  data?: Prisma.JsonValue;
}
