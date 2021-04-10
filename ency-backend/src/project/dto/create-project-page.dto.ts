import { IsInt } from "class-validator";

export class CreateProjectPageDto {
  @IsInt()
  projectId!: number;
}
