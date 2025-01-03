"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import githubIcon from "../../public/githubIcon.svg";

const GitHubButton = () => {
  const [starCount, setStarCount] = useState(null);
  const repoUrl = `https://github.com/FOSSUChennai/Communities`;

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch(`https://api.github.com/repos/FOSSUChennai/Communities`);
      if (!response.ok) {
        throw new Error("Failed to fetch repository data");
      }
      const data = await response.json();
      setStarCount(data.stargazers_count);
    } catch (error) {
      console.error("Error fetching star count:", error);
    }
  };

  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center px-4 py-2 text-black rounded-lg shadow transition duration-200"
      style={{ background: "#d9d9d980" }}
    >
      <Image
          src={githubIcon}
          alt="Github star icon"
          className="w-5 h-5"
        />
      <span className="font-medium ml-2">Contribute</span>
      {starCount !== null && <span className="ml-2">⭐ {starCount}</span>}
    </a>
  );
};

export default GitHubButton;
