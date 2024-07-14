import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthenticationService } from "../authentication.service";
import { Injectable } from "@nestjs/common";
import { AuthUser } from "../types/auth-user.type";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthenticationService) {
        super();
    }

    async validate(username: string, pass: string): Promise<AuthUser> {;
        const user = await this.authService.validateUser({ username, pass});
        return user;
    }
}