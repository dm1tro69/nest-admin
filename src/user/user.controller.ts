import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserEntity } from "./models/user.entity";
import { UserDto } from "./dto/user.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
 async all(): Promise<UserEntity[]>{
    return this.userService.all()
  }

}
