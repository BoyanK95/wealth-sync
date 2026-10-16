import React from "react";

export default function LoadingChartSkeleton() {
  return (
    <div className="flex min-h-screen flex-col">
      <style>{`
        @keyframes draw-line {
          0% { stroke-dashoffset: 240; }
          70% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes ping-soft {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.6); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(22, 163, 74, 0.08) 25%,
            rgba(22, 163, 74, 0.18) 37%,
            rgba(22, 163, 74, 0.08) 63%
          );
          background-size: 400% 100%;
          animation: shimmer 1.8s ease-in-out infinite;
        }
        .draw-line-path {
          stroke-dasharray: 240;
          stroke-dashoffset: 240;
          animation: draw-line 2.2s ease-in-out infinite;
        }
        .ping-dot {
          animation: ping-soft 1.6s ease-in-out infinite;
        }
      `}</style>

      <main className="flex-1 pt-16">
        {/* Hero skeleton */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            {/* dynamic header placeholder */}
            <div className="skeleton-shimmer mx-auto mb-8 h-8 w-full max-w-xl rounded-md" />

            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-3">
                  <div className="skeleton-shimmer h-12 w-4/5 rounded-md" />
                  <div className="skeleton-shimmer h-12 w-3/5 rounded-md" />
                  <div className="skeleton-shimmer h-5 w-full max-w-[520px] rounded-md" />
                  <div className="skeleton-shimmer h-5 w-2/3 max-w-[400px] rounded-md" />
                </div>
                <div className="skeleton-shimmer h-11 w-40 rounded-md" />
                <div className="flex items-center space-x-4">
                  <div className="skeleton-shimmer h-4 w-20 rounded" />
                  <div className="skeleton-shimmer h-4 w-24 rounded" />
                  <div className="skeleton-shimmer h-4 w-16 rounded" />
                </div>
              </div>

              {/* illustration placeholder with a self-drawing line chart */}
              <div className="flex items-center justify-center">
                <div className="bg-background relative flex w-full items-center justify-center overflow-hidden rounded-lg border border-green-100 p-6 sm:h-[400px] lg:h-[500px]">
                  <svg
                    viewBox="0 0 260 140"
                    className="h-2/3 w-2/3 max-w-[280px]"
                    fill="none"
                  >
                    <path
                      d="M10 110 C 50 95, 70 125, 100 100 S 150 55, 190 68 S 230 40, 250 25"
                      stroke="#16a34a"
                      strokeWidth="4"
                      strokeLinecap="round"
                      className="draw-line-path"
                    />
                    <circle
                      cx="250"
                      cy="25"
                      r="5"
                      fill="#16a34a"
                      className="ping-dot"
                    />
                  </svg>
                  <span
                    role="status"
                    className="absolute bottom-4 text-xs font-medium tracking-wide text-green-700/70"
                  >
                    Loading your portfolio…
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features skeleton */}
        <section className="bg-muted/50 flex w-full justify-center py-8">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-3 pb-8 text-center">
              <div className="skeleton-shimmer h-6 w-24 rounded-full" />
              <div className="skeleton-shimmer h-8 w-72 rounded-md" />
              <div className="skeleton-shimmer h-5 w-96 max-w-full rounded-md" />
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-4 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-3 rounded-lg border p-6 shadow-sm"
                >
                  <div className="skeleton-shimmer h-12 w-12 rounded-full" />
                  <div className="skeleton-shimmer h-5 w-32 rounded" />
                  <div className="skeleton-shimmer h-4 w-full rounded" />
                  <div className="skeleton-shimmer h-4 w-4/5 rounded" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
