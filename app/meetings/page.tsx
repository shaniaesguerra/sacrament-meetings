import MeetingCard from "@/components/MeetingCard";
import { getAllMeetings } from "@/lib/meetings-db";

export default function MeetingsPage() {
  const meetings = getAllMeetings();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-foreground">
        All Meetings
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>
    </main>
  );
}