import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';
import { IConfig } from 'src/interfaces/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService<IConfig>) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.['token'],
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SALT'),
    });
  }

  async validate(user: IJwtUser) {
    return user;
  }
}
