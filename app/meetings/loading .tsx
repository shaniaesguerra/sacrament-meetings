export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="h-10 w-56 animate-pulse rounded-lg bg-surface-secondary" />

          <div className="mt-4 h-5 w-96 animate-pulse rounded-lg bg-surface-secondary" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
            >
              {/* Date */}
              <div className="h-4 w-24 animate-pulse rounded bg-surface-secondary" />

              {/* Title */}
              <div className="mt-4 h-7 w-40 animate-pulse rounded bg-surface-secondary" />

              {/* Conducting */}
              <div className="mt-6 h-4 w-full animate-pulse rounded bg-surface-secondary" />

              {/* Presiding */}
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-surface-secondary" />

              {/* Badges */}
              <div className="mt-6 flex gap-2">
                <div className="h-8 w-24 animate-pulse rounded-full bg-surface-secondary" />

                <div className="h-8 w-20 animate-pulse rounded-full bg-surface-secondary" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}