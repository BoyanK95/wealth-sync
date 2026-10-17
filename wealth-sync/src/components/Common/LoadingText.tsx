import React from "react";
import LoadingCircle from "./LoadingCircle";

const LoadingText = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-2">
      <LoadingCircle />
      {text}
    </div>
  );
};

export default LoadingText;
