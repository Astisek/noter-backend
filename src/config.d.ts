declare global {
  namespace NodeJS {
    interface ProcessEnv {
      IS_DEV: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_PORT: string;
      SALT_ROUNDS: string;
      JWT_SALT: string;
      PORT: string;
      PREFIX: string;
      EMAIL_USERNAME: string;
      EMAIL_PASSWORD: string;
      EMAIL_PORT: string;
      RECAPTCHA_PROJECT_ID: string;
      RECAPTCHA_KEY: string;
    }
  }
}

export {};
