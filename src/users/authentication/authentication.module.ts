import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersService } from '../users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule.registerAsync({
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get<string>('SECRET_JWT'),
      signOptions: { expiresIn: configService.get<string>('EXPIRES_IN_JWT') }
    }),
    inject: [ConfigService]
  })],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    UsersService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard
    }
  ],
  exports: [AuthenticationService]
})
export class AuthenticationModule {}
