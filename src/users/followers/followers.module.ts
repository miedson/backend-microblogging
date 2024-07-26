import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Followers } from './entity/followers.entity';
import { UsersService } from '../users.service';
import { NotificationGateway } from 'src/gateways/notification/notification.gateway';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, Followers])],
  controllers: [FollowersController],
  providers: [FollowersService, UsersService, NotificationGateway, ConfigService, JwtService],
})
export class FollowersModule {}
