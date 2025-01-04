"use client";
import React, { useState, useEffect } from 'react';

const GitHubButton = () => {
  const [starCount, setStarCount] = useState<number | null>(null);
  const repoUrl = "https://github.com/FOSSUChennai/Communities";

  useEffect(() => {
    fetch("https://api.github.com/repos/FOSSUChennai/Communities")
      .then(res => res.json())
      .then(data => setStarCount(data.stargazers_count))
      .catch(err => console.error("Error fetching stars:", err));
  }, []);

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg bg-black/5 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-black/10"
    >
      <span>Contribute</span>
      {starCount !== null && (
        <span className="flex items-center gap-1">
          ⭐ {starCount}
        </span>
      )}
    </a>
  );
};

export default GitHubButton;