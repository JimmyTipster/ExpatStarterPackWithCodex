"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface WizardLayoutProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description: string;
  stepKey: string;
  direction: 1 | -1;
  icon: LucideIcon;
  nextLabel: string;
  children: ReactNode;
  validationMessage?: string | null;
  onNext: () => void;
  onBack?: () => void;
  onSkip?: () => void;
  isSubmitting?: boolean;
}

const stepVariants = {
  enter: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? 40 : -40,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: 1 | -1) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
  }),
};

export function WizardLayout({
  currentStep,
  totalSteps,
  title,
  description,
  stepKey,
  direction,
  icon: Icon,
  nextLabel,
  children,
  validationMessage,
  onNext,
  onBack,
  onSkip,
  isSubmitting = false,
}: WizardLayoutProps) {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-7rem)] w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative flex min-h-full flex-1 flex-col overflow-hidden rounded-[2rem] border border-border/80 bg-card/92 shadow-[0_28px_100px_rgba(45,52,54,0.12)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(circle_at_top_left,rgba(245,230,211,0.9),transparent_55%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(107,144,128,0.16),transparent_55%)]" />
        <div className="relative flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">
                Step {currentStep} of {totalSteps}
              </p>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSteps }, (_, index) => {
                  const stepNumber = index + 1;
                  const isCompleted = stepNumber < currentStep;
                  const isCurrent = stepNumber === currentStep;

                  return (
                    <span
                      key={stepNumber}
                      className={[
                        "block h-3 w-3 rounded-full border transition-colors",
                        isCompleted
                          ? "border-[var(--accent)] bg-[var(--accent)]"
                          : isCurrent
                            ? "border-[var(--accent)] bg-transparent"
                            : "border-border bg-secondary/70",
                      ].join(" ")}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex size-14 items-center justify-center rounded-[1.6rem] border border-primary/10 bg-primary/8 text-primary">
              <Icon className="size-6" />
            </div>
          </div>

          <AnimatePresence custom={direction} initial={false} mode="wait">
            <motion.div
              key={stepKey}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex flex-1 flex-col"
            >
              <div className="mt-8 max-w-3xl space-y-4">
                <h1 className="text-balance text-4xl leading-tight font-semibold text-foreground sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  {description}
                </p>
              </div>
              <div className="mt-8 flex-1">{children}</div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="border-t border-border/70 bg-background/90 px-6 py-5 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-6 text-sm text-[var(--danger)]">
              {validationMessage ?? ""}
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
              {onBack ? (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className="min-h-12 rounded-2xl px-5"
                >
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
              ) : (
                <span />
              )}
              <div className="flex items-center gap-2">
                {onSkip ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="lg"
                    onClick={onSkip}
                    className="min-h-12 rounded-2xl px-4 text-muted-foreground"
                  >
                    Skip
                  </Button>
                ) : null}
                <Button
                  type="button"
                  size="lg"
                  onClick={onNext}
                  disabled={isSubmitting}
                  className="min-h-12 rounded-2xl bg-[var(--accent)] px-6 text-[var(--accent-foreground)] hover:bg-[color-mix(in_srgb,var(--accent)_88%,black)]"
                >
                  {isSubmitting ? "Saving..." : nextLabel}
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
