import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [],
  controllers: [AuthController],
  imports: [UserModule, JwtModule.register({
    secret: 'qwerty',
    signOptions: {expiresIn: '2d'}
  })]

})
export class AuthModule {}
