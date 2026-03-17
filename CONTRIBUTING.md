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

To add an event, add an entry to the relevant community's JSON file under `src/data/communities/`.

Each event entry should follow this structure:

```json
{
    "name": "Event Name",
    "date": "YYYY-MM-DD",
    "description": "Short description of the event",
    "link": "https://event-registration-or-info-link"
}
```

## 📬 Submitting a Pull Request

1. Ensure your changes follow the existing code style
2. Commit with a conventional commit message (e.g., `feat: add event for <community>`)
3. Push your branch and open a pull request against `main`
4. Fill in the PR description with a brief summary of your changes
