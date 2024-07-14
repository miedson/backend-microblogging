import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { isPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUserDto } from './types/auth-user.type';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @isPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user: AuthUserDto = req.user;
    return this.authenticationService.login(user);
  }
}
