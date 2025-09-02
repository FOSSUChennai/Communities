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

  // VAPID public key - you'll need to generate this
  if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
    throw new Error(
      'Environment variable NEXT_PUBLIC_VAPID_PUBLIC_KEY is required but not set. Please set it to a valid VAPID public key.'
    );
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

      // Show prompt after a delay if not subscribed
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
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

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
      // Request permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // Register service worker
      const registration = await registerServiceWorker();

      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });

      // Save subscription to server
      const response = await fetch('/api/save-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscription,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save subscription');
      }
      // save the response.subscriptionId to storage
      const data = await response.json();
      localStorage.setItem('pushSubscriptionId', data.subscriptionId);

      setIsSubscribed(true);
      setShowPrompt(false);
      console.log('Successfully subscribed to notifications');
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
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

          // Optionally, remove from server
          await fetch('/api/remove-subscription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              endpoint: subscription.endpoint
            })
          });
        }
      }

      setIsSubscribed(false);
      console.log('Successfully unsubscribed from notifications');
    } catch (error) {
      console.error('Error unsubscribing from notifications:', error);
      setError(error instanceof Error ? error.message : 'Failed to unsubscribe');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* Notification Prompt */}
      {showPrompt && !isSubscribed && (
        <div className='fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-lg'>
          <div className='flex items-start justify-between'>
            <div className='flex items-start space-x-3'>
              <BellIcon className='mt-0.5 h-6 w-6 text-green-500' />
              <div>
                <h4 className='font-medium text-gray-900'>Stay Updated!</h4>
                <p className='mt-1 text-sm text-gray-600'>
                  Get notified about new tech events in Tamil Nadu
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowPrompt(false)}
              className='text-gray-400 hover:text-gray-600'
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
              className='flex-1 rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200'
            >
              Later
            </button>
          </div>
        </div>
      )}

      {/* Notification Button */}
      <button
        onClick={isSubscribed ? unsubscribeFromNotifications : subscribeToNotifications}
        disabled={isLoading}
        className={`flex items-center space-x-2 rounded-lg px-4 py-2 font-medium transition-colors ${
          isSubscribed
            ? 'bg-green-100 text-green-700 hover:bg-green-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        } disabled:opacity-50 ${className}`}
        title={isSubscribed ? 'Unsubscribe from notifications' : 'Subscribe to notifications'}
      >
        {isSubscribed ? <BellRingingIcon className='h-5 w-5' /> : <BellIcon className='h-5 w-5' />}
        <span className='hidden text-sm sm:inline'>
          {isLoading ? 'Loading...' : isSubscribed ? 'Notifications On' : 'Get Notifications'}
        </span>
      </button>

      {/* Error Message */}
      {error && (
        <div className='fixed bottom-4 right-4 z-50 max-w-sm rounded-lg border border-red-200 bg-red-50 p-4'>
          <div className='flex items-start space-x-2'>
            <div className='mt-0.5 h-5 w-5 text-red-400'>⚠️</div>
            <div>
              <h4 className='font-medium text-red-800'>Error</h4>
              <p className='mt-1 text-sm text-red-600'>{error}</p>
            </div>
          </div>
          <button
            onClick={() => setError(null)}
            className='mt-2 text-sm text-red-600 hover:text-red-800'
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
};

export default PushSubscribe;
