import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <section className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-surface p-8 text-center shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">
        Meeting not found
      </h1>
      <p className="mt-3 text-text-secondary">
        The meeting you’re trying to edit doesn’t exist or may have been deleted.
      </p>
      <Link
        className="mt-6 inline-block rounded-lg bg-primary px-4 py-2 font-medium text-white hover:bg-primary-hover"
        href="/meetings"
      >
        Back to Meetings
      </Link>
    </section>
  );
}
