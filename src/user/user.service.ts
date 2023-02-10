import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./models/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt'
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
              private jwtService: JwtService
  ) {}

 async all(): Promise<UserEntity[]>{
    return this.userRepository.find()
  }

  async create(dto: UserDto): Promise<UserEntity>{
    const hashPassword = await bcrypt.hash(dto.password, 10)
    return this.userRepository.save({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: hashPassword
    })
  }
  async login(dto: LoginDto, res: Response): Promise<UserEntity>{
    const user = await this.userRepository.findOne({where: {email: dto.email}})
    if (!user){
      throw new UnauthorizedException()
    }
    const isPassword = await bcrypt.compare(dto.password, user.password)
    if (!isPassword){
      throw new UnauthorizedException()
    }
    const jwt = this.jwtService.signAsync({id: user.id})
    res.cookie('jwt', jwt, {httpOnly: true})
    return user
  }
}
