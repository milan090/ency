import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class SignUpEmailPassDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  name!: string;
}

export class SignUpGoogleDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;
}
