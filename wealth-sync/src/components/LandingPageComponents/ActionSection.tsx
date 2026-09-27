import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { auth } from "@/server/auth";
import Link from "next/link";
import { Routes } from "@/lib/constants/routes";
import { getTranslations } from "next-intl/server";
import { SITE_NAME } from "@/lib/constants/site";

const ActionSection = async () => {
  const t = await getTranslations("ActionSection");
  const session = await auth();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.16),transparent_35%)]" />

      <div className="container relative mx-auto px-4 md:px-6">
        <div className="rounded-[32px] border border-emerald-200/80 bg-[linear-gradient(135deg,#0f172a_0%,#111827_35%,#082f29_100%)] px-6 py-12 text-center text-white shadow-[0_30px_80px_rgba(15,23,42,0.18)] md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-200">
              Ready when you are
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.06em] md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
              {t("description", { siteName: SITE_NAME })}
            </p>

            <div className="mt-8 flex justify-center">
              {session?.user ? (
                <Button
                  size="lg"
                  asChild
                  className="h-12 rounded-full bg-white px-6 text-sm font-medium text-slate-950 shadow-[0_18px_40px_rgba(255,255,255,0.18)] hover:bg-emerald-50"
                >
                  <Link href={Routes.DASHBOARD} className="inline-flex items-center">
                    <span>{t("goToDashboard")}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  asChild
                  className="h-12 rounded-full bg-white px-6 text-sm font-medium text-slate-950 shadow-[0_18px_40px_rgba(255,255,255,0.18)] hover:bg-emerald-50"
                >
                  <Link href={Routes.LOGIN} className="inline-flex items-center">
                    <span>{t("getStarted")}</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionSection;
