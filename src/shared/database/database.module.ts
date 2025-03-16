import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { IConfig } from 'src/shared/config/interfaces/config.model';
import { Note } from 'src/note/entities/note.entity';
import { User } from 'src/user/entities/user.entity';
import { EmailCode } from 'src/auth/entities/email-code.entity';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService<IConfig>) => {
    const { host, name, password, port, user } =
      config.get<IConfig['database']>('database');
    const isDev = config.get<boolean>('isDev');

    return {
      type: 'postgres',
      host,
      port,
      username: user,
      password: password,
      database: name,
      entities: [User, Category, Note, EmailCode],
      synchronize: isDev,
    };
  },
});
