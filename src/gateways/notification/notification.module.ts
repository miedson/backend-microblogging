import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [NotificationGateway, JwtService, ConfigService]
})
export class NotificationModule {}
