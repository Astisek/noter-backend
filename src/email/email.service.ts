import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly defaultOptions: ISendMailOptions = {
    from: 'No reply <noreply@noter-tools.ru>',
  };

  constructor(private mailService: MailerService) {}

  async sendCode(email: string, code: string) {
    await this.mailService.sendMail({
      ...this.defaultOptions,
      to: email,
      subject: 'Noter signup code!',
      template: './email-code.template.hbs',
      context: { code },
    });
  }
}
