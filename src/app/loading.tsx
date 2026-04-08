import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <LoadingSkeleton className="h-16 rounded-[1.75rem]" />
      <LoadingSkeleton className="h-56 rounded-[2rem]" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <LoadingSkeleton className="h-48 rounded-[1.75rem]" />
        <LoadingSkeleton className="h-48 rounded-[1.75rem]" />
        <LoadingSkeleton className="h-48 rounded-[1.75rem]" />
      </div>
    </div>
  );
}
