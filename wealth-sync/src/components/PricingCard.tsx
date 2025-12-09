import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
  buttonText: string;
  buttonVariant?: "default" | "outline";
}

const PricingCard = ({
  title,
  description,
  price,
  period,
  features,
  isPopular = false,
  buttonText,
  buttonVariant = "outline",
}: PricingCardProps) => {
  return (
    <div className={`flex flex-col rounded-lg border p-6 shadow-sm ${isPopular ? 'border-green-700' : ''}`}>
      <div className="space-y-2">
        {isPopular && (
          <div className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            Popular
          </div>
        )}
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="mt-4 flex items-baseline text-3xl font-bold">
        {price}
        <span className="text-muted-foreground ml-1 text-base font-medium">
          {period}
        </span>
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="mr-2 h-4 w-4 text-green-700" />
            {feature.text}
          </li>
        ))}
      </ul>
      <Button 
        className={`mt-8 cursor-pointer ${isPopular ? 'bg-green-700 hover:bg-green-800 dark:hover:text-white' : ''}`} 
        variant={buttonVariant}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PricingCard;