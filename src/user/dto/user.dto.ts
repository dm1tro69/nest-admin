import { IsEmail, IsString } from "class-validator";

export class UserDto {

  @IsString()
   last_name: string

  @IsString()
  first_name: string

  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsString()
  password_confirm: string
}
