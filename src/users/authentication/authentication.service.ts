import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUserDto } from './types/auth-user.type';
import { PayloadJwt } from './types/payload-jwt.type';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.findByUsername(username);
    if(user && pass !== user.password) {
      throw new UnauthorizedException();
    }
    const { password, ...authUser } = user;
    return authUser;
  }

  async login({id, uuid, username, email}: AuthUserDto) {
    const payload: PayloadJwt = { uuid, username, email, sub: id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
