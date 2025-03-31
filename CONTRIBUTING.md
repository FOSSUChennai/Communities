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
  "eventDate": "2024-02-20", // Format: YYYY-MM-DD
  "eventTime": "14:30", // 24-hour format: HH:MM
  "eventVenue": "Full venue address",
  "eventLink": "https://registration-link.com",
  "location": "City Name",
  "communityName": "Your Community Name",
  "communityLogo": "https://url-to-your-logo.svg"
}
```

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
   - **feat:** A new feature (e.g., `feat: add new event on June 1st`)
   - **fix:** A bug fix (e.g., `fix: correct date format in events.json`)
   - **docs:** Documentation changes (e.g., `docs: update contributing guidelines`)
   - **refactor:** Code restructuring without functionality changes
   - **test:** Adding or modifying tests
   - **chore:** Routine tasks (e.g., `chore: update dependencies`)

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

## 💻 Development Guidelines

- Use TypeScript for all new code
- Follow existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 🤝 Community Guidelines

- Be kind and respectful
- Help others
- Share knowledge
- Participate in discussions

## 📝 License

By contributing, you agree that your contributions will be licensed under the GPL 3.0 License.
