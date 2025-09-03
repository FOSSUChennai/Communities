# Push Notifications Setup Guide

This guide explains how to set up the push notification system for Tamil Nadu Tech Communities.

## Overview

The notification system consists of:

- **Frontend Component**: `PushSubscribe` component for subscription management
- **Service Worker**: Handles push notification display and interactions
- **API Endpoints**: Save/remove subscriptions and send notifications
- **GitHub Actions**: Stores subscriptions securely in GitHub Secrets
- **Web Push Library**: Sends notifications to subscribers

## Setup Instructions

### 1. Generate VAPID Keys

First, you need to generate VAPID (Voluntary Application Server Identification) keys:

```bash
npx web-push generate-vapid-keys
```

This will output something like:

```
=======================================
Public Key:
BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U

Private Key:
tUxbFFHGGFvABk5g5VDLegBsqaF1HQMa8uKVPb5DFQi
=======================================
```

### 2. Environment Variables

Add these environment variables to your `.env.local` file:

```env
# VAPID Keys
NEXT_PUBLIC_VAPID_PUBLIC_KEY=your_public_key_here
VAPID_PRIVATE_KEY=your_private_key_here

# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_REPOSITORY=FOSSUChennai/Communities

# Notification API Key (for sending notifications)
NOTIFICATION_API_KEY=your_secure_api_key

# Optional
WEB_PUSH_CONTACT=mailto:your-email@example.com
```

### 3. GitHub Token Setup

Create a GitHub Personal Access Token with these permissions:

- `repo` (full repository access)
- `workflow` (to trigger repository dispatch events)

Add this token to your environment variables as `GITHUB_TOKEN`.

### 4. Install Dependencies

Install the required web-push dependency:

```bash
npm install web-push
npm install --save-dev @types/web-push
```

### 5. Deploy and Test

1. Deploy your application with the new environment variables
2. Visit your site and try subscribing to notifications
3. Check GitHub repository secrets to verify subscriptions are being saved
4. Test sending notifications using the API endpoint

## Usage

### Subscribing to Notifications

The `PushSubscribe` component is automatically added to the header. Users can:

- Click the bell icon to subscribe
- See a popup prompt asking for permission
- Unsubscribe by clicking the active bell icon

### Sending Notifications

### Integration with Event Creation

When new events are added, you can automatically send notifications by calling the send notification API:

### Integration with Workflow Dispatch

Maintainers/Admins have access to sending test notifications in the Github Actions tab.

## File Structure

```
src/
├── components/
│   └── PushSubscribe.tsx          # Main subscription component
├── app/
│   └── api/
│       ├── save-subscription/     # Save subscription endpoint
│       ├── remove-subscription/   # Remove subscription endpoint
│       └── send-notification/     # Send notification endpoint
├── lib/
│   └── webpush.ts                # Web push utilities
public/
└── sw.js                         # Service worker
.github/
└── workflows/
    └── manage-push-subscriptions.yml  # GitHub Actions workflow
```

## Security Considerations

1. **VAPID Keys**: Keep your private VAPID key secure and never expose it to the client
2. **API Key**: Use a strong API key for the notification endpoint
3. **GitHub Token**: Use a token with minimal required permissions
4. **HTTPS Required**: Push notifications only work over HTTPS
5. **Rate Limiting**: Consider implementing rate limiting for the notification API

## Troubleshooting

### Common Issues

1. **Service Worker Not Registering**

   - Ensure the service worker is served from the root domain
   - Check browser console for errors
   - Verify HTTPS is enabled

2. **Subscriptions Not Saving**

   - Verify GitHub token has correct permissions
   - Check API endpoint logs
   - Ensure repository dispatch events are enabled

3. **Notifications Not Sending**
   - Verify VAPID keys are correctly configured
   - Check subscription format is valid
   - Ensure notification API has proper authentication

### Debug Mode

Add this to your service worker for debugging:

```javascript
// At the top of sw.js
const DEBUG = true;
if (DEBUG) {
  console.log = (...args) => {
    // Service worker console logs
    self.clients.matchAll().then((clients) => {
      clients.forEach((client) => {
        client.postMessage({
          type: 'SW_LOG',
          message: args.join(' ')
        });
      });
    });
  };
}
```

## Browser Support

Push notifications are supported in:

- Chrome 50+
- Firefox 44+
- Safari 16.4+
- Edge 17+

The component gracefully degrades for unsupported browsers.

## Performance Considerations

1. **Service Worker Caching**: The service worker is cached and updated automatically
2. **Subscription Storage**: Subscriptions are stored in GitHub Secrets (encrypted)
3. **API Rate Limits**: GitHub API has rate limits - consider caching subscription lists
4. **Notification Batching**: For large subscriber lists, consider batching notifications

## Future Enhancements

1. **Database Storage**: Move from GitHub Secrets to a proper database
2. **User Preferences**: Allow users to choose notification types
3. **Analytics**: Track notification delivery and engagement
4. **Scheduled Notifications**: Send reminders before events
5. **Rich Notifications**: Add images and action buttons
