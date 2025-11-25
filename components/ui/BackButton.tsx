"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function BackButton() {
  return (
    <Button
      variant="primary"
      onClick={() => window.history.back()}
      className="gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>Go Back</span>
    </Button>
  );
}

