import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { IJwtUser } from 'src/auth/interfaces/jtwUser';
import { IConfig } from 'src/shared/config/interfaces/config.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService<IConfig>) {
    const { jwtSalt } = configService.get<IConfig['crypt']>('crypt');

    super({
      jwtFromRequest: (req: Request) => {
        return req?.cookies?.['token'];
      },
      ignoreExpiration: false,
      secretOrKey: jwtSalt,
    });
  }

  async validate(user: IJwtUser) {
    return user;
  }
}
