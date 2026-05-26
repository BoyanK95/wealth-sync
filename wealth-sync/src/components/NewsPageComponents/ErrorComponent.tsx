"use client";

import { IoIosWarning } from "react-icons/io";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

function ErrorComponent({
  error,
  fetchRecentNews,
}: {
  error: string;
  fetchRecentNews: (event: React.SyntheticEvent<EventTarget>) => void;
}) {
  const t = useTranslations("NewsPage");

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mt-10 flex flex-col rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-gray-700 dark:bg-slate-900/80"
    >
      <IoIosWarning className="text-destructive mx-auto mt-6 text-6xl" />
      <p className="text-destructive text-md pt-2 text-center">{error}</p>
      <Button
        size={"default"}
        variant={"outline"}
        className="mt-5 p-5"
        onClick={fetchRecentNews}
      >
        {t("seeRecentNewsButton")}
      </Button>
    </div>
  );
}

export default ErrorComponent;
