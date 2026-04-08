"use client";

import { Flag } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ReportOutdatedButtonProps {
  countryName: string;
  taskTitle: string;
}

export function ReportOutdatedButton({ countryName, taskTitle }: ReportOutdatedButtonProps) {
  const subject = encodeURIComponent(`Outdated info report: ${countryName} - ${taskTitle}`);
  const body = encodeURIComponent(
    `Hi,\n\nI found information that may need updating.\n\nCountry: ${countryName}\nTask: ${taskTitle}\n\nWhat looks outdated:\n`,
  );

  return (
    <Button asChild type="button" variant="ghost" className="h-auto rounded-full px-3 py-1.5 text-xs">
      <a href={`mailto:hello@expatstarterpack.com?subject=${subject}&body=${body}`}>
        <Flag className="size-3.5" />
        Report outdated info
      </a>
    </Button>
  );
}
