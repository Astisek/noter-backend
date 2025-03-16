export interface IConfig {
  isDev: boolean;
  port: string;
  prefix: string;
  database: {
    host: string;
    user: string;
    password: string;
    name: string;
    port: number;
  };
  email: {
    host: string;
    username: string;
    password: string;
    port: number;
  };
  crypt: {
    saltRounds: number;
    jwtSalt: string;
  };
  recaptcha: {
    projectId: string;
    key: string;
  };
}
