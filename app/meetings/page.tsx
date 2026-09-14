import MeetingCard from "@/components/MeetingCard";
import type { SacramentMeeting } from "@/lib/types";
import Link from "next/link";

export default async function MeetingsPage() {
  const response = await fetch(
    `${process.env.APP_URL}/api/meetings`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meetings");
  }

  const meetings: SacramentMeeting[] = await response.json();

  return (
    <main className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-2">
      <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
        <h1 className="text-3xl font-bold text-brand">All Meetings</h1>

        <nav aria-label="Meeting navigation" className="flex gap-2">
          <Link
            href="/meetings"
            className="rounded-full bg-brand px-4 py-2 font-semibold text-background"
            aria-current="page"
          >
            All meetings
          </Link>
          <Link
            href="/meetings/current"
            className="rounded-full border border-brand px-4 py-2 font-semibold text-brand transition-colors hover:bg-brand hover:text-background"
          >
            Current meeting
          </Link>
        </nav>
      </div>

      {meetings.map((meeting) => (
        <MeetingCard key={meeting.id} {...meeting} />
      ))}
    </main>
  );
}