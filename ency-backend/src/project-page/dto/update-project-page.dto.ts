import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectPageDto } from './create-project-page.dto';

export class UpdateProjectPageDto extends PartialType(CreateProjectPageDto) {}
