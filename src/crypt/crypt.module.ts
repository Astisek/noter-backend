import { Module } from '@nestjs/common';
import { CryptService } from './crypt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [CryptService],
  imports: [ConfigModule],
  exports: [CryptService],
})
export class CryptModule {}
