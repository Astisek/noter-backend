import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/shared/config/interfaces/config.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptService {
  constructor(private configService: ConfigService<IConfig>) {}

  createHash(val: string) {
    const { saltRounds } = this.configService.get<IConfig['crypt']>('crypt');
    return bcrypt.hash(val, saltRounds);
  }

  compare(val: string, hash: string) {
    return bcrypt.compare(val, hash);
  }
}
