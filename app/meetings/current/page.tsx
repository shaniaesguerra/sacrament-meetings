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

  //If there is no current meeting, just show there is no current meeting:
  if (response.status === 404) {
    return (
      <main className="mx-auto max-w-7xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-brand">Current Meeting</h1>
          <nav aria-label="Meeting navigation" className="flex gap-2">
            <Link
              href="/meetings"
              className="rounded-full border border-brand px-4 py-2 font-semibold text-brand transition-colors hover:bg-brand hover:text-background"
            >
              All meetings
            </Link>
          </nav>
        </div>

        <section className="mt-8 rounded-2xl border border-card/60 bg-card/20 p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold">No current meeting available</h2>
          <p className="mt-2 text-foreground/70">
            There is no meeting scheduled for the current Sunday.
          </p>
          <Link
            href="/meetings"
            className="mt-6 inline-block rounded-full bg-brand px-5 py-3 font-semibold text-background"
          >
            View all meetings
          </Link>
        </section>
      </main>
    );
  }

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