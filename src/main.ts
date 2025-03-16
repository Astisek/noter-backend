import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IConfig } from 'src/shared/config/interfaces/config.model';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService<IConfig>>(ConfigService);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.setGlobalPrefix(config.get('prefix'));
  if (config.get('isDev')) {
    app.enableCors({
      origin: true,
      credentials: true,
      methods: 'GET,PUT,POST,DELETE,OPTIONS',
    });
  }
  const port = config.get('port');

  await app.listen(port);
}
bootstrap();
