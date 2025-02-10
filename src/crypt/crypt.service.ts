import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/interfaces/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptService {
  constructor(private configService: ConfigService<IConfig>) {}

  createHash(val: string) {
    return bcrypt.hash(val, +this.configService.get('SALT_ROUNDS'));
  }

  compare(val: string, hash: string) {
    return bcrypt.compare(val, hash);
  }
}
