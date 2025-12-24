declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Analytics
      UMAMI_ANALYTICS_ID?: string;

      // GitHub API Configuration
      GITHUB_TOKEN?: string;
      GITHUB_REPOSITORY?: string;

      // Web Push Notifications (VAPID Keys)
      NEXT_PUBLIC_VAPID_PUBLIC_KEY: string;
      VAPID_PUBLIC_KEY?: string;
      VAPID_PRIVATE_KEY?: string;

      // Web Push Contact
      WEB_PUSH_CONTACT?: string;

      // Node Environment
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
