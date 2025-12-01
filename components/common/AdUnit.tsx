"use client";

import Script from "next/script";
import * as React from "react";
import { AD_CLIENT } from "@/lib/ads";

interface AdUnitProps {
  size: "300x250" | "728x90" | "250x250" | "300x600";
  format: "responsive-display-square" | "responsive-display-horizontal" | "responsive-display-vertical" | "responsive-multiplex-vertical";
  adSlot: string;
  className?: string;
}

export function AdUnit({ size, format, adSlot, className }: AdUnitProps) {
  const adRef = React.useRef<HTMLDivElement>(null);
  const [isScriptLoaded, setIsScriptLoaded] = React.useState(false);
  const [isAdPushed, setIsAdPushed] = React.useState(false);

  React.useEffect(() => {
    if (!isScriptLoaded || isAdPushed || !adRef.current) return;

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      setIsAdPushed(true);
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  const dimensions = {
    "300x250": { width: 300, height: 250 },
    "728x90": { width: 728, height: 90 },
    "250x250": { width: 250, height: 250 },
    "300x600": { width: 300, height: 600 },
  };

  const { width, height } = dimensions[size];

  return (
    <div
      className={`flex items-center justify-center rounded-lg border border-border bg-surface/50 ${className || ""}`}
      style={{ minWidth: width, minHeight: height }}
    >
      {!isScriptLoaded && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
          onLoad={() => setIsScriptLoaded(true)}
        />
      )}

      <div className="text-center text-text-secondary">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={AD_CLIENT}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

