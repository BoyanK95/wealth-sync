'use client"';

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NewsResults({
  result,
}: {
  result: {
    news: Array<{
      headline: string;
      source: string;
      datetime: number;
      url: string;
    }>;
  };
}) {
  const t = useTranslations("NewsPage.NewsResults");

  return (
    <div className="rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <h3 className="text-lg font-semibold">{t("latestNews")}</h3>
      <ul className="mt-4 space-y-4">
        {result.news.map((item, index) => (
          <Link href={item.url} target="_blank" rel="noreferrer" key={index}>
            <Card
              key={index}
              className="rounded-2xl border p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  {item.headline}
                </CardTitle>
                <CardDescription>
                  <p className="text-md mt-1 text-slate-500">{item.source}</p>
                  <p className="text-xs text-slate-400">
                    {new Date(item.datetime * 1000).toLocaleString()}
                  </p>
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </ul>
    </div>
  );
}
