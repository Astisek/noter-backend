import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { IConfig } from 'src/shared/config/interfaces/config.model';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig>) => {
        const { host, password, port, username } =
          configService.get<IConfig['email']>('email');

        return {
          transport: {
            host,
            port,
            secure: true,
            tls: {
              rejectUnauthorized: false,
              minVersion: 'TLSv1.2',
            },
            auth: {
              user: username,
              pass: password,
            },
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
