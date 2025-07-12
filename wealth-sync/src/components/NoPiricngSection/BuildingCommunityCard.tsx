import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users } from "lucide-react";

const BuildingCommunityCard = () => {
  return (
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
          <Users className="h-6 w-6 text-blue-700" />
        </div>
        <CardTitle className="text-lg">Building Community</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          We want to build a strong user base and understand what features
          matter most before introducing pricing.
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default BuildingCommunityCard;
