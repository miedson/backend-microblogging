import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { isPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthUser } from './types/auth-user.type';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @isPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user: AuthUser = req.user;
    return this.authenticationService.login(user);
  }
}
