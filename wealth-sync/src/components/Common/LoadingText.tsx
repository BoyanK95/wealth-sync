import React from "react";

const LoadingText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      {text}
    </div>
  );
};

export default LoadingText;
