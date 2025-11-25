"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Toggle between light and dark only
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  // Show icon based on resolved theme (what's actually being displayed)
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      className="w-10 h-10 p-0"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

