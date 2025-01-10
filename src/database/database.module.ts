import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { IConfig } from 'src/interfaces/config';
import { Note } from 'src/note/entities/note.entity';
import { User } from 'src/user/entities/user.entity';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService<IConfig>) => ({
    type: 'postgres',
    host: config.get('DB_HOST'),
    port: +config.get('DB_PORT'),
    username: config.get('DB_USER'),
    password: config.get('DB_PASSWORD'),
    database: config.get('DB_NAME'),
    entities: [User, Category, Note],
    synchronize: config.get('IS_DEV') === 'true',
  }),
});
