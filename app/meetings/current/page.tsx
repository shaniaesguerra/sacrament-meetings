import { connection } from "next/server";
import MeetingDetail from "@/components/MeetingDetail";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default async function CurrentMeetingPage() {
  await connection();

  const meeting = getCurrentMeeting();

  if (!meeting) {
     return (
      <main className="min-h-screen bg-background">
        <section className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-3xl font-bold text-foreground">
            No current meetings this week
          </h1>
          <p className="mt-2 text-foreground">
            Check back later for this week’s meeting details.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <MeetingDetail meeting={meeting} />
      </section>
    </main>
  );
}