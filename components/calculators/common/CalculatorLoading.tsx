import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Loader2 } from "lucide-react";

export function CalculatorLoading() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-48 bg-surface rounded animate-pulse mb-2" />
          <div className="h-4 w-64 bg-surface/60 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Input fields skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-surface/60 rounded animate-pulse" />
              <div className="h-12 bg-surface rounded animate-pulse" />
              <div className="h-10 bg-surface/80 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-surface/60 rounded animate-pulse" />
              <div className="h-12 bg-surface rounded animate-pulse" />
              <div className="h-10 bg-surface/80 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-surface/60 rounded animate-pulse" />
              <div className="h-12 bg-surface rounded animate-pulse" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="h-6 w-32 bg-surface rounded animate-pulse mb-2" />
          <div className="h-4 w-48 bg-surface/60 rounded animate-pulse" />
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-surface rounded animate-pulse flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <div className="text-text-secondary text-sm">Loading calculator...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

