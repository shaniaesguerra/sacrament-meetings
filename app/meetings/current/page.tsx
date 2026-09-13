import MeetingDetail from "@/components/MeetingDetail";
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

export default async function CurrentMeetingPage() {
  const response = await fetch(
    `${process.env.APP_URL}/api/meetings/current`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the current meeting");
  }

  const meeting: SacramentMeeting = await response.json();

    return (
        <main className="mx-auto max-w-7xl gap-6 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 ">
                <h1 className="text-3xl font-bold text-brand">Current Meeting</h1>
                <nav aria-label="Meeting navigation" className="flex gap-2">
                <Link
                    href="/meetings"
                    className="rounded-full border border-brand px-4 py-2 font-semibold text-brand transition-colors hover:bg-brand hover:text-background"
                >
                    All meetings
                </Link>
                <Link
                    href="/meetings/current"
                    className="rounded-full bg-brand px-4 py-2 font-semibold text-background"
                    aria-current="page"
                >
                    Current meeting
                </Link>
                </nav>

                
            </div>

            <MeetingDetail {...meeting}/>
        </main>
    );
}