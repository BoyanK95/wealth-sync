"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export default function LangSwitchButton() {
  const router = useRouter();
  const t = useTranslations("LangSwitchButton");

  const changeLanguage = (locale: string) => {
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;

    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Globe className="h-4 w-4" />
          <span className="ml-2">{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLanguage("en")}
        >
          En
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => changeLanguage("bg")}
        >
          BG
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
