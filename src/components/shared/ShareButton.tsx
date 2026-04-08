"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        return;
      }
    }

    if (navigator.clipboard && url) {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <Button type="button" variant="outline" className="rounded-full" onClick={() => void handleShare()}>
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? "Link copied" : "Share"}
    </Button>
  );
}
