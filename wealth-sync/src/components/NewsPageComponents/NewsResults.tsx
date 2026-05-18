import React from "react";

export default function NewsResults({
  result,
}: {
  result: { news: Array<{ headline: string; source: string; url: string }> };
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <h3 className="text-lg font-semibold">Latest news</h3>
      <ul className="mt-4 space-y-4">
        {result.news.map((item, index) => (
          <li key={index} className="rounded-2xl border p-4">
            <a
              className="text-primary font-medium"
              href={item.url}
              target="_blank"
              rel="noreferrer"
            >
              {item.headline}
            </a>
            <p className="mt-1 text-sm text-slate-500">{item.source}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
