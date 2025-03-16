import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/shared/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CryptModule } from './crypt/crypt.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { NoteModule } from './note/note.module';
import { IConfig } from 'src/shared/config/interfaces/config.model';
import { EmailModule } from './email/email.module';
import { config } from 'src/shared/config/interfaces/config';
import { RecaptchaModule } from './recaptcha/recaptcha.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    CryptModule,
    FileModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<IConfig>) => [
        {
          rootPath: join(process.cwd(), 'static'),
          serveRoot: `/${configService.get('prefix')}/static/`,
        },
      ],
    }),
    CategoryModule,
    NoteModule,
    EmailModule,
    RecaptchaModule,
  ],
})
export class AppModule {}
