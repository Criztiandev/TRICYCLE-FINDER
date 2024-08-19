declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;
      JWT_SECRET: string;
      SESSION_SECRET: string;
      COOKIE_SECRET: string;
      ENCRYPTION_KEY_32: string;
      ENCRYPTION_KEY_16: string;
      MONGO_URI: string;
      ACCESS_TOKEN_EXPIRATION: string;
      REFRESH_TOKEN_EXPIRATION: string;
    }
  }
}

export {};
