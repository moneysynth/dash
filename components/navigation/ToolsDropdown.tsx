"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Tool {
  name: string;
  href: string;
  description?: string;
}

const tools: Tool[] = [
  {
    name: "Home Loan EMI Comparison",
    href: "/tools/home-loan-emi-comparison",
    description: "Compare loans with prepayment options",
  },
  {
    name: "Salary Comparison - Labour Code 2025",
    href: "/tools/salary-comparison-labour-code-2025",
    description: "Compare current vs New Labour Code 2025 salary",
  },
];

export function ToolsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Tools
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-[400px] rounded-lg border border-border bg-surface shadow-lg z-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <BarChart3 className="h-4 w-4" />
            Tools
          </div>
          <ul className="space-y-2">
            {tools.map((tool) => (
              <li key={tool.name}>
                <Link
                  href={tool.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm text-text-secondary transition-colors hover:bg-primary/5 hover:text-primary"
                >
                  <div className="font-medium">{tool.name}</div>
                  {tool.description && (
                    <div className="text-xs text-text-secondary mt-0.5">
                      {tool.description}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

