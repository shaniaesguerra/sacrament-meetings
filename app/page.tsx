import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

async function getDashboardData() {
  const baseUrl = process.env.APP_URL ?? "http://localhost:3000" ;

  const [currentRes, meetingsRes] = await Promise.all([
    fetch(`${baseUrl}/api/meetings/current`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/meetings`, { cache: "no-store" }),
  ]);

  //Get crurent meeting
  const currentMeeting: SacramentMeeting | null = currentRes.ok
    ? await currentRes.json()
    : null;

  //Get All meetings
  const meetings: SacramentMeeting[] = meetingsRes.ok
    ? await meetingsRes.json()
    : [];

  //Get Upcoming meetings
  const upcoming = [...meetings]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return { currentMeeting, meetings, upcoming };
}

export default async function Home() {
  const { currentMeeting, meetings, upcoming } = await getDashboardData();

  return (
    <main className="mx-auto max-w-7xl p-4 text-foreground">
      <section className="rounded-3xl border border-card/60 bg-card/20 px-6 py-10 shadow-md">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Sacrament meeting planner
            </p>

            <h1 className="text-4xl font-black tracking-tight md:text-5xl">
              Sunday planning made simple.
            </h1>

            <p className="mt-4 max-w-xl text-lg text-foreground/75">
              Track current programs, organize speakers, and keep each meeting
              ready for members and leaders.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/meetings"
                className="rounded-full bg-brand px-6 py-3 font-semibold text-background"
              >
                View meetings
              </Link>

              <Link
                href="/meetings/current"
                className="rounded-full border border-brand px-6 py-3 font-semibold text-brand"
              >
                Current meeting
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-card/60 bg-background/60 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand">
              Current meeting
            </p>

            {currentMeeting ? (
              <>
                <h2 className="mt-3 text-2xl font-bold">
                  {new Date(`${currentMeeting.date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </h2>

                <p className="mt-2 text-foreground/80 capitalize">
                  {currentMeeting.meetingType} meeting
                </p>

                <p className="mt-4 text-lg font-semibold">
                  {currentMeeting.presiding}
                </p>

                <p className="text-sm text-foreground/70">
                  Conducting: {currentMeeting.conducting}
                </p>

                <p className="mt-4 text-sm text-foreground/70">
                  Opening Hymn: #{currentMeeting.openingHymn.number}{" "}
                  {currentMeeting.openingHymn.title}
                </p>
              </>
            ) : (
              <p className="mt-3 text-foreground/80">
                No current meeting found for this Sunday.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-card/60 bg-card/20 p-6">
          <p className="text-sm uppercase tracking-wide text-brand">Meetings</p>
          <p className="mt-2 text-3xl font-bold">{meetings.length}</p>
        </div>

        <div className="rounded-2xl border border-card/60 bg-card/20 p-6">
          <p className="text-sm uppercase tracking-wide text-brand">Upcoming</p>
          <p className="mt-2 text-3xl font-bold">{upcoming.length}</p>
        </div>

        <div className="rounded-2xl border border-card/60 bg-card/20 p-6">
          <p className="text-sm uppercase tracking-wide text-brand">Status</p>
          <p className="mt-2 text-3xl font-bold">
            {currentMeeting ? "Live" : "Pending"}
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-bold text-brand">Upcoming meetings</h2>

        <div className="grid gap-4 md:grid-cols-3">
          {upcoming.map((meeting) => (
            <Link
              key={meeting.id}
              href={`/meetings/${meeting.id}`}
              className="rounded-2xl border border-card/60 bg-card/20 p-5 transition hover:border-brand"
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-brand">
                {meeting.meetingType}
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {new Date(`${meeting.date}T00:00:00`).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>

              <p className="mt-3 text-sm text-foreground">
                Presiding: {meeting.presiding}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}