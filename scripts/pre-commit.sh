#!/bin/bash
# Check if events.json is staged
if git diff --cached --name-only | grep -q 'data/events.json'; then
    echo "events.json changed. Generating RSS feed..."
    npm run generate-rss
    # Stage the updated RSS feed
    git add public/rss.xml
else
    echo "events.json not changed. Skipping RSS generation."
fi
