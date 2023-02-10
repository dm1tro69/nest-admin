import { BadRequestException, Body, Controller, Post, Res } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { UserDto } from "../user/dto/user.dto";
import { LoginDto } from "../user/dto/login.dto";
import { Response } from "express";


@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {
  }
  @Post('register')
  async register(@Body() dto: UserDto){
    if (dto.password !== dto.password_confirm){
      throw new BadRequestException()
    }
     return this.userService.create(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response){
    return this.userService.login(dto, res)
  }
}
