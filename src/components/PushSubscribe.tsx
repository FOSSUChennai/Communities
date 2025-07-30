'use client';
import React, { useState, useEffect } from 'react';
import { BellIcon, BellRingingIcon, XIcon } from '@phosphor-icons/react';

interface PushSubscribeProps {
  className?: string;
}

const PushSubscribe: React.FC<PushSubscribeProps> = ({ className = '' }) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    throw new Error('NEXT_PUBLIC_VAPID_PUBLIC_KEY not set.');
  }
  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      if (!isSupported) return;

      try {
        const registration = await navigator.serviceWorker.getRegistration('/sw.js');
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        }
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    if (typeof window !== 'undefined') {
      setIsSupported('serviceWorker' in navigator && 'PushManager' in window);
      checkSubscriptionStatus();

      const timer = setTimeout(() => {
        if (!isSubscribed && isSupported) {
          setShowPrompt(true);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubscribed, isSupported]);

  const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('Service workers not supported');
    }

    const registration = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;
    return registration;
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const subscribeToNotifications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') throw new Error('Notification permission denied');

      const registration = await registerServiceWorker();

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      const response = await fetch('/api/save-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Failed to save subscription');
      const data = await response.json();
      localStorage.setItem('pushSubscriptionId', data.subscriptionId);

      setIsSubscribed(true);
      setShowPrompt(false);
    } catch (error) {
      console.error('Subscription error:', error);
      setError(error instanceof Error ? error.message : 'Failed to subscribe');
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribeFromNotifications = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const registration = await navigator.serviceWorker.getRegistration('/sw.js');
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();

          await fetch('/api/remove-subscription', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint: subscription.endpoint })
          });
        }
      }
      setIsSubscribed(false);
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setError(error instanceof Error ? error.message : 'Failed to unsubscribe');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) return null;

  return (
    <>
      {/* Prompt Box */}
      {showPrompt && !isSubscribed && (
        <div className='fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-900'>
          <div className='flex items-start justify-between'>
            <div className='flex space-x-3'>
              <BellIcon className='mt-0.5 h-6 w-6 text-green-500' />
              <div>
                <h4 className='font-medium text-gray-900 dark:text-white'>Stay Updated!</h4>
                <p className='mt-1 text-sm text-gray-600 dark:text-gray-300'>
                  Get notified about new tech events in Tamil Nadu
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className='text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            >
              <XIcon className='h-5 w-5' />
            </button>
          </div>
          <div className='mt-3 flex space-x-2'>
            <button
              onClick={subscribeToNotifications}
              disabled={isLoading}
              className='flex-1 rounded bg-green-500 px-3 py-2 text-sm font-medium text-white hover:bg-green-600 disabled:opacity-50'
            >
              {isLoading ? 'Enabling...' : 'Enable'}
            </button>
            <button
              onClick={() => setShowPrompt(false)}
              className='flex-1 rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Main Toggle Button */}
      <button
        onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
        disabled={isLoading}
        className={`flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
          isSubscribed
            ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        } disabled:opacity-50 ${className}`}
        title={isSubscribed ? 'Unsubscribe from notifications' : 'Subscribe to notifications'}
      >
        {isSubscribed ? <BellRingingIcon className='h-5 w-5' /> : <BellIcon className='h-5 w-5' />}
        <span className='hidden sm:inline'>
          {isLoading ? 'Loading...' : isSubscribed ? 'Notifications On' : 'Get Notifications'}
        </span>
      </button>

      {/* Error Toast */}
      {error && (
        <div className='fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-600 dark:bg-red-900'>
          <div className='flex items-start space-x-2'>
            <div className='mt-0.5 h-5 w-5 text-red-400 dark:text-red-300'>⚠️</div>
            <div>
              <h4 className='font-medium text-red-800 dark:text-red-100'>Error</h4>
              <p className='mt-1 text-sm text-red-600 dark:text-red-300'>{error}</p>
            </div>
          </div>
          <button
            onClick={() => setError(null)}
            className='mt-2 text-sm text-red-600 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200'
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
};

export default PushSubscribe;
