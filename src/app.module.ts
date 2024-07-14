import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonsModule } from './commons/commons.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, CommonsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
