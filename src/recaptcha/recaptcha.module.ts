import { Module } from '@nestjs/common';
import { RecaptchaService } from './recaptcha.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [RecaptchaService],
  exports: [RecaptchaService],
  imports: [ConfigModule],
})
export class RecaptchaModule {}
