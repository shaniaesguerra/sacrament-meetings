'use client';

import { useEffect } from 'react';
import Link from 'next/link';

type MeetingRouteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function MeetingRouteError({
  error,
  reset,
}: MeetingRouteErrorProps) {
  useEffect(() => {
    console.error('Meeting route error:', error);
  }, [error]);

  return (
    <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">
        We couldn’t load the meetings.
      </h1>
      <p className="mt-3 text-text-secondary">
        Something went wrong while loading or saving meeting information. Please try again.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <button
          className="rounded-lg bg-primary px-4 py-2 font-medium text-white hover:bg-primary-hover"
          onClick={reset}
          type="button"
        >
          Try Again
        </button>
        <Link
          className="rounded-lg border border-border px-4 py-2 font-medium text-foreground hover:bg-surface-secondary"
          href="/meetings"
        >
          Back to Meetings
        </Link>
      </div>
    </section>
  );
}
