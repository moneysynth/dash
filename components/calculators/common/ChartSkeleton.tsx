import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Loader2 } from "lucide-react";

export function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-48 bg-surface rounded animate-pulse mb-2" />
        <div className="h-4 w-64 bg-surface/60 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-surface rounded animate-pulse flex items-center justify-center relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-3 relative z-10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <div className="text-text-secondary text-sm font-medium">Loading chart...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PieChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-5 w-32 bg-surface rounded animate-pulse mb-2" />
        <div className="h-4 w-48 bg-surface/60 rounded animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] bg-surface rounded animate-pulse flex items-center justify-center relative overflow-hidden">
          {/* Circular pattern for pie chart */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-primary/20 animate-pulse" />
          </div>
          <div className="flex flex-col items-center gap-3 relative z-10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
            <div className="text-text-secondary text-sm font-medium">Loading chart...</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

