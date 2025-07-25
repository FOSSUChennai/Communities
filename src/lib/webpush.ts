// Utility functions for web push notifications
import webpush from 'web-push';

// Configure web-push with VAPID keys
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.WEB_PUSH_CONTACT || 'https://tamilnadu.tech/',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

export interface NotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  url?: string;
  eventId?: string;
  tag?: string;
}

export interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface WebPushError extends Error {
  statusCode?: number;
}

/**
 * Send a push notification to a single subscription
 */
export async function sendNotification(
  subscription: PushSubscription,
  payload: NotificationPayload
): Promise<boolean> {
  try {
    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      icon: payload.icon || '/logo.webp',
      badge: payload.badge || '/logo.webp',
      url: payload.url || '/',
      eventId: payload.eventId,
      tag: payload.tag || 'tech-event'
    });

    await webpush.sendNotification(subscription, notificationPayload);
    return true;
  } catch (error) {
    console.error('Error sending notification:', error);

    // If the subscription is invalid (410 Gone), it should be removed
    if ((error as WebPushError)?.statusCode === 410) {
      console.log('Subscription expired, should be removed from storage');
      // Here you could trigger removal from GitHub secrets
    }

    return false;
  }
}

/**
 * Send notifications to multiple subscriptions
 */
export async function sendBulkNotifications(
  subscriptions: PushSubscription[],
  payload: NotificationPayload
): Promise<{ success: number; failed: number }> {
  const promises = subscriptions.map((subscription) => sendNotification(subscription, payload));

  const results = await Promise.allSettled(promises);

  const success = results.filter(
    (result) => result.status === 'fulfilled' && result.value === true
  ).length;

  const failed = results.length - success;

  return { success, failed };
}

/**
 * Validate a push subscription object
 */
export function isValidSubscription(subscription: unknown): subscription is PushSubscription {
  return Boolean(
    subscription &&
      typeof subscription === 'object' &&
      subscription !== null &&
      'endpoint' in subscription &&
      'keys' in subscription &&
      typeof (subscription as PushSubscription).endpoint === 'string' &&
      (subscription as PushSubscription).keys &&
      typeof (subscription as PushSubscription).keys === 'object' &&
      typeof (subscription as PushSubscription).keys.p256dh === 'string' &&
      typeof (subscription as PushSubscription).keys.auth === 'string'
  );
}

/**
 * Generate VAPID keys (for development/setup)
 */
export function generateVapidKeys() {
  return webpush.generateVAPIDKeys();
}

const webPushUtils = {
  sendNotification,
  sendBulkNotifications,
  isValidSubscription,
  generateVapidKeys
};

export default webPushUtils;
