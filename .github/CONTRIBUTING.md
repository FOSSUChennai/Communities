# Contributing to TamilNadu.tech Communities

Thank you for your interest in contributing to TamilNadu.tech Communities! We aim to make contributing as easy and transparent as possible. Whether you're adding your community's events, fixing bugs, or improving documentation - every contribution matters!

## 🎯 Quick Start

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/FOSSUChennai/Communities.git
   cd Communities
   ```
3. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Adding Events (Most Common Contribution)

Adding your community events is the most common and easiest way to contribute! Here's a detailed guide:

### Step 1: Locate the Events File

Navigate to `src/data/events.json` in your forked repository.

### Step 2: Add Your Event

Add your event to the JSON array using this template:

```json
{
  "eventName": "Your Event Name",
  "eventDescription": "Brief description of the event (max 200 characters)",
  "eventDate": "2024-02-20",
  "eventTime": "14:30",
  "eventVenue": "Full venue address",
  "eventLink": "https://registration-link.com",
  "location": "City Name",
  "communityName": "Your Community Name",
  "communityLogo": "https://url-to-your-logo.svg"
}
```

**Field Requirements:**

- `eventDate`: YYYY-MM-DD format
- `eventTime`: 24-hour format HH:MM
- `communityLogo`: Use imgbb to host images or add hostname to `next.config.ts`

### Step 3: Validate Your Event Entry

Ensure:

- All dates are in the future
- All fields are filled out correctly
- The event is taking place in Tamil Nadu
- URLs are valid and accessible
- Your community logo is a high-quality image (preferably SVG)

### Step 4: Submit Your Changes

1. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

   ```bash
   git add src/data/events.json
   git commit -m "feat: add [Your Event Name] on [Date]"
   git push origin feature/your-feature-name
   ```

   **Commit Message Guidelines:**

   - **feat:** New feature (e.g., `feat: add React Chennai meetup on Dec 15`)
   - **fix:** Bug fix (e.g., `fix: correct event date format`)
   - **docs:** Documentation (e.g., `docs: update setup instructions`)
   - **refactor:** Code restructuring
   - **test:** Tests
   - **chore:** Maintenance (e.g., `chore: update dependencies`)

2. Create a Pull Request with:
   - **Title:** Follow the conventional commit format (e.g., `feat: add [Your Event Name]`)
   - **Description:** Brief details about the event and why it was added

## 🐛 Reporting Bugs

1. Check existing issues first
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)

## 💡 Feature Requests

Have ideas to make the platform better? Create an issue with:

- Clear title
- Detailed description
- Use cases
- Potential implementation details

## 💻 Development Setup

### Environment Variables

1. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Generate VAPID keys:

   ```bash
   npx web-push generate-vapid-keys
   ```

3. Update `.env` with:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - Public VAPID key
   - `VAPID_PUBLIC_KEY` - Server-side public key
   - `VAPID_PRIVATE_KEY` - Server-side private key
   - `GITHUB_TOKEN` - For subscription management
   - `UMAMI_ANALYTICS_ID` - (Optional) Analytics

### Development Guidelines

- Use TypeScript for all code
- Follow existing code style
- Use conventional commits
- Add comments for complex logic
- Update docs when needed
- Test locally before PR

## 🤝 Community Guidelines

- Be kind and respectful
- Help others
- Share knowledge
- Participate in discussions

## 📝 License

By contributing, you agree that your contributions will be licensed under the GPL 3.0 License.
