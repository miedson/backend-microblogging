import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotificationModule } from 'src/gateways/notification/notification.module';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NotificationGateway } from 'src/gateways/notification/notification.gateway';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([User]), NotificationModule],
  controllers: [UsersController],
  providers: [UsersService, NotificationGateway, ConfigService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
