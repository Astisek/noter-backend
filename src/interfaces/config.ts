export interface IConfig {
  IS_DEV: boolean;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_PORT: number;
  SALT_ROUNDS: string;
  JWT_SALT: string;
  PORT: string;
}
