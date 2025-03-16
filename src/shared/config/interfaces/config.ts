import { IConfig } from 'src/shared/config/interfaces/config.model';

export const config = (): IConfig => ({
  isDev: process.env.IS_DEV === 'true',
  prefix: process.env.PREFIX,
  port: process.env.PORT,
  crypt: {
    jwtSalt: process.env.JWT_SALT,
    saltRounds: +process.env.SALT_ROUNDS,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT,
  },
  email: {
    host: process.env.EMAIL_HOST,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
    port: +process.env.EMAIL_PORT,
  },
  recaptcha: {
    projectId: process.env.RECAPTCHA_PROJECT_ID,
    key: process.env.RECAPTCHA_KEY,
  },
});
