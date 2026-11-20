export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner Skeleton */}
      <section className="relative overflow-hidden">
        <div className="h-64 animate-pulse bg-surface-secondary" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="h-4 w-32 animate-pulse rounded bg-white/20" />

            <div className="mt-4 h-12 w-64 animate-pulse rounded bg-white/20" />

            <div className="mt-4 h-5 w-48 animate-pulse rounded bg-white/20" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((card) => (
            <div
              key={card}
              className="rounded-2xl border border-border bg-surface p-4 shadow-sm"
            >
              <div className="h-4 w-24 animate-pulse rounded bg-surface-secondary" />

              <div className="mt-4 h-8 w-16 animate-pulse rounded bg-surface-secondary" />
            </div>
          ))}
        </div>

        {/* Meeting Detail Card */}
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <div className="mb-8 h-8 w-64 animate-pulse rounded bg-surface-secondary" />

          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((row) => (
              <div
                key={row}
                className="flex justify-between border-b border-border pb-4"
              >
                <div className="h-4 w-32 animate-pulse rounded bg-surface-secondary" />

                <div className="h-4 w-48 animate-pulse rounded bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>

        {/* Speakers Section */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <div className="mb-6 h-7 w-40 animate-pulse rounded bg-surface-secondary" />

          <div className="space-y-4">
            {[1, 2].map((speaker) => (
              <div
                key={speaker}
                className="rounded-xl bg-surface-secondary p-4"
              >
                <div className="h-5 w-40 animate-pulse rounded bg-background" />

                <div className="mt-3 h-4 w-64 animate-pulse rounded bg-background" />
              </div>
            ))}
          </div>
        </div>

        {/* Announcements Section */}
        <div className="mt-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
          <div className="mb-6 h-7 w-48 animate-pulse rounded bg-surface-secondary" />

          <div className="space-y-3">
            {[1, 2, 3].map((announcement) => (
              <div
                key={announcement}
                className="h-4 animate-pulse rounded bg-surface-secondary"
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}