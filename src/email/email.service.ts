import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/shared/config/interfaces/config.model';

@Injectable()
export class EmailService {
  private readonly defaultConfig: ISendMailOptions = {
    from: `No reply <${this.configService.get('email').username}>`,
  };

  constructor(
    private mailService: MailerService,
    private configService: ConfigService<IConfig>,
  ) {}

  async sendCode(email: string, code: string) {
    const domain = this.configService.get('imageDomain');

    await this.mailService.sendMail({
      ...this.defaultConfig,
      to: email,
      subject: 'Noter signup code!',
      template: './email-code.template.hbs',
      context: { code, domain },
    });
  }
}
