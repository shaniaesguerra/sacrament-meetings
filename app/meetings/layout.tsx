export default function MeetingsLayout({children,}: {children: React.ReactNode;}) {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-12">
          
          <h1 className="text-4xl font-bold text-foreground">
            Meetings
          </h1>

          <p className="mt-2 max-w-2xl text-text-secondary">
            Manage sacrament meeting schedules,
            speakers, hymns, and announcements.
          </p>

        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {children}
      </div>
    </main>
  );
}