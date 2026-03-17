# Contributing

Fork the repo, create a branch, make changes, and open a PR against `main`.

## Adding Events

Add an entry to the relevant community's JSON file under `src/data/communities/`:

```json
{
    "name": "Event Name",
    "date": "YYYY-MM-DD",
    "description": "Short description",
    "link": "https://event-link"
}
```

Use conventional commits (e.g., `feat: add event for <community>`).
