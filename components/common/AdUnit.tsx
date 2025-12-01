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

  // Check if AdSense script is already loaded (from layout.tsx)
  React.useEffect(() => {
    if (typeof window !== "undefined" && (window as any).adsbygoogle) {
      setIsScriptLoaded(true);
    }
  }, []);

  // Push ad to AdSense queue when script is loaded
  React.useEffect(() => {
    if (!isScriptLoaded || isAdPushed || !adRef.current) return;

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      setIsAdPushed(true);
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [isScriptLoaded, isAdPushed]);

  const dimensions = {
    "300x250": { width: 300, height: 250 },
    "728x90": { width: 728, height: 90 },
    "250x250": { width: 250, height: 250 },
    "300x600": { width: 300, height: 600 },
  };

  const { width, height } = dimensions[size];

  // Get ad format attributes based on format type
  const getAdAttributes = () => {
    const baseAttrs: Record<string, string> = {
      "data-ad-client": AD_CLIENT,
      "data-ad-slot": adSlot,
    };

    switch (format) {
      case "responsive-display-square":
        return {
          ...baseAttrs,
          "data-ad-format": "auto",
          "data-full-width-responsive": "true",
        };
      case "responsive-display-horizontal":
        return {
          ...baseAttrs,
          "data-ad-format": "horizontal",
          "data-full-width-responsive": "true",
        };
      case "responsive-display-vertical":
        return {
          ...baseAttrs,
          "data-ad-format": "vertical",
          "data-full-width-responsive": "true",
        };
      case "responsive-multiplex-vertical":
        return {
          ...baseAttrs,
          "data-ad-format": "autorelaxed",
        };
      default:
        return {
          ...baseAttrs,
          "data-ad-format": "auto",
          "data-full-width-responsive": "true",
        };
    }
  };

  const adAttributes = getAdAttributes();

  return (
    <div
      ref={adRef}
      className={`flex items-center justify-center ${className || ""}`}
      style={{ minWidth: width, minHeight: height }}
    >
      {/* Load AdSense script if not already loaded */}
      {!isScriptLoaded && (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
          onLoad={() => setIsScriptLoaded(true)}
        />
      )}

      <ins
        className="adsbygoogle"
        style={{ display: "block", width: `${width}px`, height: `${height}px` }}
        {...adAttributes}
      />
    </div>
  );
}

