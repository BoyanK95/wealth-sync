"use client";

import { AiFillCloseCircle } from "react-icons/ai";
import { Card, CardDescription, CardTitle } from "../ui/card";
// import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface NoNewsResultProps {
  fetchRecentNews: () => void;
}

export default function NoNewsResult({ fetchRecentNews }: NoNewsResultProps) {
  // const t = useTranslations("NewsPage.NoNewsResult");
  return (
    <Card className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-4 rounded-3xl border-gray-200 bg-white/80 p-6 text-center shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <AiFillCloseCircle className="mx-auto text-5xl text-slate-300 dark:text-slate-600" />
      <CardTitle className="text-xl font-semibold">
        No news for this asset!
      </CardTitle>
      <CardDescription className="text-sm text-slate-500">
        Try searching for a different ticker or company name.
      </CardDescription>
      <Button
        size={"default"}
        variant={"outline"}
        className="mt-5 p-5"
        onClick={fetchRecentNews}
      >
        Search for recent news
      </Button>
    </Card>
  );
}
