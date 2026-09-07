import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container flex min-h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md border-0 shadow-none">
        <div className="space-y-8 p-6">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="bg-muted h-8 w-3/4 animate-pulse rounded-md" />
            <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
          </div>
          {/* Content skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="bg-muted h-4 w-1/4 animate-pulse rounded-md" />
                <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
              </div>
            ))}
            {/* Button skeleton */}
            <div className="bg-muted h-10 w-full animate-pulse rounded-md" />
          </div>
        </div>
      </Card>
    </div>
  );
}
