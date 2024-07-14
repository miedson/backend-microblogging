import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PayloadJwt } from "../types/payload-jwt.type";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'SecretPasswordForJwt',
        });
    }

    async validate({ sub, email, username, uuid }: PayloadJwt) {
        return {userId: sub, uuid, username, email};
    }
}