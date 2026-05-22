'use client";';

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ErrorComponent from "./ErrorComponent";

type TickerSearchFormProps = {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  handleTickerSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
};

export default function TickerSearchForm({
  query,
  setQuery,
  loading,
  handleTickerSearch,
  error,
}: TickerSearchFormProps) {
  const t = useTranslations("NewsPage");

  return (
    <div className="mb-8 rounded-3xl border border-gray-200 bg-white/80 p-8 shadow-sm dark:border-gray-700 dark:bg-slate-900/80">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
        {t("description")}
      </p>

      <form
        onSubmit={handleTickerSearch}
        className="mt-6 flex flex-col gap-4 sm:flex-row"
      >
        <Input
          placeholder={t("searchPlaceholder")}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? t("searching") : t("search")}
        </Button>
      </form>

      {error && <ErrorComponent error={error} />}
    </div>
  );
}
