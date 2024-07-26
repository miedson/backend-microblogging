import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NotificationGateway } from 'src/gateways/notification/notification.gateway';
import { FollowersModule } from './followers/followers.module';
import { Followers } from './followers/entity/followers.entity';

@Module({
  imports: [AuthenticationModule, TypeOrmModule.forFeature([User, Followers]), FollowersModule],
  controllers: [UsersController],
  providers: [UsersService, NotificationGateway, ConfigService, JwtService],
  exports: [UsersService],
})
export class UsersModule {}
