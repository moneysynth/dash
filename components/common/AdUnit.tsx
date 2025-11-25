"use client";

import * as React from "react";

interface AdUnitProps {
  size: "300x250" | "728x90";
  className?: string;
}

export function AdUnit({ size, className }: AdUnitProps) {
  // Placeholder for Google AdSense
  // Replace with actual AdSense code when ready
  React.useEffect(() => {
    // AdSense initialization would go here
    // Example: (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  const dimensions = {
    "300x250": { width: 300, height: 250 },
    "728x90": { width: 728, height: 90 },
  };

  const { width, height } = dimensions[size];

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-border bg-surface/50 ${className || ""}`}
      style={{ minWidth: width, minHeight: height }}
    >
      <div className="text-center text-text-secondary">
        <p className="text-xs">Advertisement</p>
        <p className="text-xs">{width} × {height}</p>
        {/* Replace with actual AdSense component */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

