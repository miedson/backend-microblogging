import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, createUserSchema } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isPublic } from './authentication/decorators/is-public.decorator';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';
import { NotificationGateway } from 'src/gateways/notification/notification.gateway';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly notificationGateway: NotificationGateway) {}

  @isPublic()
  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }

  @isPublic()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
