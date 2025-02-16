import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CryptModule } from './crypt/crypt.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { NoteModule } from './note/note.module';
import { IConfig } from 'src/interfaces/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
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
          rootPath: join(__dirname, '..', '..', 'static'),
          serveRoot: `/${configService.get('PREFIX')}/static/`,
        },
      ],
    }),
    CategoryModule,
    NoteModule,
  ],
})
export class AppModule {}
