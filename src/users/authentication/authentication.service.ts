import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthUser } from './types/auth-user.type';
import { PayloadJwt } from './types/payload-jwt.type';
import { RequestAuthUserDto } from './dto/request-auth-user.dto';
import { isMatch, getHash } from './utils/crypt.util';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validateUser({ username, pass }: RequestAuthUserDto) {
    const user = await this.usersService.findByUsername(username);
    const matchPassword = await isMatch(pass, user.password);
    if(!user || !matchPassword) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async login({id, uuid, username, email}: AuthUser) {
    const payload: PayloadJwt = { uuid, username, email, sub: id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
