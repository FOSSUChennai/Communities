declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UMAMI_ANALYTICS_ID: string;
    }
  }
}

export {};
