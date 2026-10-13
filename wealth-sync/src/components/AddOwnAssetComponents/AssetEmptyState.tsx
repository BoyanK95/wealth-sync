import { Plus, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function AssetsEmptyState({
  hasAnyAssets,
  onAdd,
}: {
  hasAnyAssets: boolean;
  onAdd: () => void;
}) {
  const t = useTranslations("AssetsEmptyState");

  return (
    <Card className="rounded-2xl border-dashed">
      <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50">
          <Wallet className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
        </div>
        <div>
          <p className="font-semibold">
            {hasAnyAssets
              ? t("nothingInThisCategory")
              : t("noAssetsYet")}
          </p>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>
        <Button
          onClick={onAdd}
          className="cursor-pointer bg-green-700 hover:bg-green-800"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          {t("addAssetButton")}
        </Button>
      </CardContent>
    </Card>
  );
}
