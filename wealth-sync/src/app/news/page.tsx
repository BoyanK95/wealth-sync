import NewsPageComponent from "@/components/NewsPageComponents/NewsPageComponent";
import { type Metadata } from "next";
import { env } from "@/env";

export const metadata: Metadata = {
  title: "News | WealthSync",
  description: "Stay updated with the latest news from a given ticker",
};

export default function NewsPage() {
  const benzingaApiKey = env.BENZINGA_APIKEY;

  return <NewsPageComponent benzingaApiKey={benzingaApiKey} />;
}
