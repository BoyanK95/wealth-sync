"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cookie, Settings } from "lucide-react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "wealthsync-cookie-consent";

export function CookieConsentDialog() {
  const [showDialog, setShowDialog] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setShowDialog(true);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setShowDialog(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "necessary-only");
    setShowDialog(false);
  };

  if (!mounted) return null;

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="max-w-md mt-55">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5 text-amber-600" />
            We Use Cookies
          </DialogTitle>
          <DialogDescription className="text-left">
            We use cookies to enhance your experience, analyze site usage, and
            assist with our marketing efforts. You can manage your preferences
            at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <div>
            <h4 className="font-medium">Essential Cookies</h4>
            <p className="text-muted-foreground text-xs">
              Required for authentication and core functionality
            </p>
          </div>
          <div>
            <h4 className="font-medium">Analytics Cookies</h4>
            <p className="text-muted-foreground text-xs">
              Help us understand how you use WealthSync
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleAcceptAll}
            className="w-full bg-green-700 hover:bg-green-800 cursor-pointer dark:hover:text-white"
          >
            Accept All Cookies
          </Button>
          <div className="flex w-full gap-2">
            <Button
              variant="outline"
              onClick={handleAcceptNecessary}
              className="flex-1 cursor-pointer"
            >
              Necessary Only
            </Button>
            <Button variant="outline" size="sm" asChild className="cursor-pointer">
              <Link href="/privacy">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
