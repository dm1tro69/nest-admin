import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5444,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  }), UserModule, AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
