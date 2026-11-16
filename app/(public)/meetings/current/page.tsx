import { connection } from "next/server";
import MeetingDetail from "@/components/MeetingDetail";
import { getCurrentMeeting } from "@/lib/meetings-db";
import { redirect} from "next/navigation";

export default async function CurrentMeetingPage() {
  await connection();

  const meeting = await getCurrentMeeting();

  if (!meeting) {
    redirect("/meetings");
  }

  return (
    <main className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold text-foreground">
         Current Meeting
      </h1>
      <section className="mx-auto max-w-7xl px-6 py-10">
        <MeetingDetail meeting={meeting} />
      </section>
    </main>
  );
}