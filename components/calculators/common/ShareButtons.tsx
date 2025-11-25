"use client";

import { Copy, MessageCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { shareCalculation } from "@/lib/storage";
import { useState, useCallback, memo } from "react";

interface ShareButtonsProps {
  title: string;
  data: Record<string, unknown>;
}

function ShareButtonsComponent({ title, data }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback((platform: "whatsapp" | "twitter" | "facebook" | "copy") => {
    if (platform === "copy") {
      shareCalculation(title, data, "copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      shareCalculation(title, data, platform);
    }
  }, [title, data]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-secondary">Share:</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("copy")}
        className="gap-2"
        disabled={copied}
      >
        {copied ? (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            Copy
          </>
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("whatsapp")}
        className="gap-2"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("twitter")}
        className="gap-2"
        aria-label="Share on Twitter"
      >
        <span className="text-xs">Twitter</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare("facebook")}
        className="gap-2"
        aria-label="Share on Facebook"
      >
        <span className="text-xs">Facebook</span>
      </Button>
    </div>
  );
}

export const ShareButtons = memo(ShareButtonsComponent);

