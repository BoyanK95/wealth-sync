import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";

export default function ShowStatsButton({
  showStats,
  setShowStats,
}: {
  showStats: boolean;
  setShowStats: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => setShowStats((prev) => !prev)}
      className="cursor-pointer text-gray-400 dark:hover:text-gray-200"
    >
      {showStats ? <Eye className="h-6 w-6" /> : <EyeOff className="h-6 w-6" />}
    </Button>
  );
}
