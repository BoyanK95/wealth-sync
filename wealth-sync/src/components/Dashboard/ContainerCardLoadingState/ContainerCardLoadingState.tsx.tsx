import React from "react";

type CardLoadingConfig = {
  id: string;
  title: string;
  hasValue?: boolean;
  hasSubtext?: boolean;
};

const ContainerCardLoadingState = ({
  cards,
}: {
  cards: CardLoadingConfig[];
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-card text-card-foreground rounded-lg border shadow-sm"
        >
          <div className="flex flex-row items-center justify-between space-y-0 p-6 pb-2">
            <div className="bg-muted h-4 w-48 animate-pulse rounded-md" />
            <div className="bg-muted h-4 w-4 animate-pulse rounded-md" />
          </div>
          <div className="p-6 pt-0">
            {card.hasValue && (
              <div className="bg-muted mt-2 h-8 w-32 animate-pulse rounded-md" />
            )}
            {card.hasSubtext && (
              <div className="mt-2 flex items-center pt-1">
                <div className="bg-muted mr-1 h-4 w-4 animate-pulse rounded-md" />
                <div className="bg-muted h-4 w-24 animate-pulse rounded-md" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContainerCardLoadingState;
