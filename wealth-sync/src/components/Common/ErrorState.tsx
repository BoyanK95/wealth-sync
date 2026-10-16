"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  title: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
};

/**
 * Error state Alert (destructive variant) + Button.
 * Pass translated strings from next-intl to keep it presentational.
 *
 * In a grid, give it `className="sm:col-span-3"` to span the full row.
 * Requires: npx shadcn@latest add alert
 */
const ErrorState = ({
  title,
  message,
  onRetry,
  retryLabel = "Try again",
  className,
}: ErrorStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
    >
      <Alert
        variant="destructive"
        className={cn("rounded-2xl backdrop-blur-xl")}
      >
        <AlertCircle />
        <AlertTitle>{title}</AlertTitle>
        {(message ?? onRetry) && (
          <AlertDescription className="space-y-3">
            {message && <p>{message}</p>}
            {onRetry && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="cursor-pointer"
              >
                <RefreshCw className="mr-1.5 h-4 w-4" />
                {retryLabel}
              </Button>
            )}
          </AlertDescription>
        )}
      </Alert>
    </motion.div>
  );
};

export default ErrorState;
