"use client";

import * as React from "react";
import { Moon, Sun } from "phosphor-react";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative inline-flex items-center justify-center z-50 cursor-pointer"
    >
      <Sun
        weight="bold"
        className="absolute h-[1.2rem] w-[1.2rem] transition-all dark:scale-0"
      />
      <Moon
        weight="bold"
        className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
