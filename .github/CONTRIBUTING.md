# Contributing to TamilNadu.tech Communities

Thank you for your interest in contributing to TamilNadu.tech Communities! We aim to make contributing as easy and transparent as possible. Whether you're adding your community's events, fixing bugs, or improving documentation - every contribution matters!

## 🎯 Quick Start

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/Communities.git
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
  "communityLogo": "https://url-to-your-logo.svg",
  "alert": {
    // Optional: Add alerts for important updates
    "message": "Important notice about the event",
    "type": "postponed" // Optional: "postponed", "venue-change", "cancelled", or "general"
  }
}
```

**Field Requirements:**

- `eventDate`: YYYY-MM-DD format
- `eventTime`: 24-hour format HH:MM
- `communityLogo`: Use imgbb to host images or add hostname to `next.config.ts`

#### Adding Event Alerts (Optional)

If your event has been postponed, cancelled, or has important updates (venue changes, time changes, etc.), you can add an `alert` field to notify attendees directly on the event card:

**Alert Types:**

- `"postponed"` - Event has been rescheduled to a different date
- `"venue-change"` - Event venue has changed
- `"cancelled"` - Event has been cancelled
- `"general"` - General important notice (or omit type for default)

**Example - Postponed Event:**

```json
{
  "eventName": "Community Meetup",
  "eventDate": "2025-12-06",
  "eventTime": "09:30",
  ...
  "alert": {
    "message": "Due to cyclone alert, event postponed from Nov 29 to Dec 6. Same venue. We apologise for any inconveniences.",
    "type": "postponed"
  }
}
```

**Example - Venue Change:**

```json
{
  "eventName": "Tech Workshop",
  "eventDate": "2025-12-15",
  "eventVenue": "New Venue Address",
  ...
  "alert": {
    "message": "Please note: The event venue has been changed. New location: New Venue Address",
    "type": "venue-change"
  }
}
```

**Example - General Notice:**

```json
{
  "eventName": "Hackathon",
  ...
  "alert": {
    "message": "Registration closes 2 days before the event. Limited seats available!",
    "type": "general"
  }
}
```

> **Note:** The `alert` field is completely optional. Events without alerts will display normally.

### Step 3: Validate Your Event Entry

Ensure:

- All dates are in the future
- All fields are filled out correctly
- The event is taking place in Tamil Nadu
- URLs are valid and accessible
- Your community logo is a high-quality image (preferably SVG)
- If using `alert`, the `message` field is provided and clearly communicates the update

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

2. **(Optional)** Generate VAPID keys for push notifications:

   > **Note:** Push notifications are disabled in non-production environments. VAPID keys are only required when `NODE_ENV=production`.

   ```bash
   npx web-push generate-vapid-keys
   ```

3. Update `.env` with:
   - `NEXT_PUBLIC_VAPID_PUBLIC_KEY` - (Optional) Public VAPID key
   - `VAPID_PUBLIC_KEY` - (Optional) Server-side public key
   - `VAPID_PRIVATE_KEY` - (Optional) Server-side private key
   - `GITHUB_TOKEN` - (Optional) For subscription management
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
