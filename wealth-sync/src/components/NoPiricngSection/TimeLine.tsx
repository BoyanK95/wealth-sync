import React from "react";

const TimeLine = () => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <h3 className="text-xl font-semibold">Our Approach</h3>
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-700">
            <span className="text-xs font-bold text-white">1</span>
          </div>
          <div>
            <p className="font-medium">Build & Learn</p>
            <p className="text-muted-foreground text-sm">
              Keep everything free while we develop features and learn from user
              feedback
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="bg-muted mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
            <span className="text-muted-foreground text-xs font-bold">2</span>
          </div>
          <div>
            <p className="font-medium">Research & Plan</p>
            <p className="text-muted-foreground text-sm">
              Study user needs and market conditions to design fair pricing
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-4">
          <div className="bg-muted mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
            <span className="text-muted-foreground text-xs font-bold">3</span>
          </div>
          <div>
            <p className="font-medium">Transparent Launch</p>
            <p className="text-muted-foreground text-sm">
              Announce pricing well in advance with grandfathered benefits for
              early users
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
