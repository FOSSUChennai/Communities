# tamilnadu.tech

A central hub for discovering and engaging with technology communities and events across Tamil Nadu. Our aim is to foster collaboration, knowledge sharing, and growth within the regional tech and dev ecosystem.

## 🎯 About

tamilNadu.tech serves as a bridge connecting various tech communities, events, and enthusiasts throughout Tamil Nadu. Whether you're a student, professional, or tech enthusiast, this platform helps you:

- Discover upcoming tech events, meetups, and workshops
- Connect with local tech communities
- Stay updated with the latest happenings in Tamil Nadu's tech scene
- Contribute to the growing tech ecosystem

## 💡 Looking to Add Your Event?

Have an upcoming tech event in Tamil Nadu? Adding it is simple! Check out our [event submission guide](CONTRIBUTING.md#-adding-events-most-common-contribution) in the Contributing Guide. It's a straightforward process using a JSON template - no complex coding required!

## 💡 Why Contribute?

- **Support Local Tech Growth**: Help build a stronger tech community in Tamil Nadu
- **Easy to Contribute**: Simple JSON-based event submission process
- **Open Source**: Your contributions help make the platform better for everyone
- **Network**: Connect with other contributors and community leaders
- **Learn**: Great opportunity to practice with modern web technologies

## 🤝 Getting Started

1. Fork the repository
2. Clone the repository:

   ```bash
   git clone https://github.com/your-username/communities
   cd Communities
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   **(Optional)** Generate VAPID keys for push notifications:

   > **Note:** Push notifications are disabled in non-production environments. VAPID keys are only required when `NODE_ENV=production`.

   ```bash
   pnpx web-push generate-vapid-keys
   ```

   Update `.env` with generated keys and other values:

   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - (Optional) Public key (used in browser)
   - `VAPID_PUBLIC_KEY` - (Optional) Public key (server-side)
   - `VAPID_PRIVATE_KEY` - (Optional) Private key (server-side)
   - `GITHUB_TOKEN` - (Optional) For push notification subscription management
   - `UMAMI_ANALYTICS_ID` - (Optional) Analytics tracking

5. Start the development server:
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the application.

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [React 19](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Phosphor Icons](https://phosphoricons.com/) - Icons
- [Web Push](https://github.com/web-push-libs/web-push) - Push notifications
- [Umami Analytics](https://umami.is/) - Privacy-friendly analytics

## 📁 Project Structure

```
src/
├── app/
│   ├── Communities/    # Communities page
│   ├── api/           # API routes (subscriptions)
│   ├── archive/       # Past events
│   └── rss/          # RSS feed
├── components/        # React components
├── data/             # Events & communities JSON
├── lib/              # Utilities & web push
└── types/            # TypeScript types
```

## 🤝 Contributing

We welcome contributions from everyone!
Check out our [Contributing Guide](CONTRIBUTING.md) to get started.
Keep an eye on the issues tab for a mix of beginner friendly issues aswell as game changing issues that you can help the community by contributing.

Pointers to keep in mind is:

- if its an UI change, please include Output image
- if its a bug fix or a minor code change, please describe what your change does.
- if its a feature request, please provide a detailed description and if UI feature, please do provide a mockup.
- if updating events.json, please make sure you add the hostname for the image to next.config.ts file in the root directory.

## 🔔 Push Notifications

This platform supports web push notifications for event updates:

- Users can subscribe to notifications
- Subscriptions are stored in GitHub Secrets via repository dispatch
- Requires VAPID keys configuration
- See [PUSH_NOTIFICATIONS_SETUP.md](PUSH_NOTIFICATIONS_SETUP.md) for detailed setup

## 🥰 Contributors

<a href="https://github.com/fossuchennai/communities/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=fossuchennai/communities" />
</a>

## ⭐ Star History

Go put a star 😤

[![Star History Chart](https://api.star-history.com/svg?repos=FOSSUChennai/Communities&type=Date)](https://www.star-history.com/#FOSSUChennai/Communities&Date)

## 📝 License

This project is licensed under the terms of the GPL 3.0 license.
