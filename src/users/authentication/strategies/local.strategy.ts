import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../authentication.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Users } from "src/users/entities/user.entity";
import { AuthUserDto } from "../types/auth-user.type";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthenticationService) {
        super();
    }

    async validate(username: string, password: string): Promise<AuthUserDto> {
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}