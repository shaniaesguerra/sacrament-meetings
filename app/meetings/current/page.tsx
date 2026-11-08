import { notFound } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import { getCurrentMeeting } from "@/lib/meetings-db";

export default function CurrentMeetingPage() {
  const meeting = getCurrentMeeting();

  if (!meeting) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <MeetingDetail meeting={meeting} />
      </section>
    </main>
  );
}