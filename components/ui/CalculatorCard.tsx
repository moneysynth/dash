import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface CalculatorCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export function CalculatorCard({
  title,
  description,
  href,
  icon,
}: CalculatorCardProps) {
  return (
    <Card className="group transition-all hover:shadow-lg">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={href}>
          <Button variant="primary" className="w-full group-hover:gap-2">
            Calculate Now
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

