import Link from "next/link";
import MeetingCard from "@/components/MeetingCard";
import { getAllMeetings } from "@/lib/meetings-db";
import Image from "next/image";

export default function Home() {
  const meetings = getAllMeetings();
  const totalMeetings = meetings.length;
  const scheduledSpeakers = meetings.reduce(
    (count, meeting) => count + meeting.speakers.filter(
      speaker => speaker.type === "speaker").length,
    0
  );
  const testimonyMeetings = meetings.filter(
    (meeting) => meeting.meetingType === "testimony"
  ).length;
  const programsReady = meetings.filter(
  (meeting) =>
    meeting.openingPrayer &&
    meeting.closingPrayer &&
    meeting.openingHymn &&
    meeting.sacramentHymn &&
    meeting.closingHymn &&
    meeting.speakers.length > 0
).length;

  return (
    <>
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 ">
          <Image
            src="/images/hero.jpeg"
            alt="Salt Lake Temple"
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/70"></div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Hero Content */}
            <div>
              <h1 className="text-5xl font-bold text-white md:text-6xl">
                Welcome to the
                <span className="block text-blue-200">
                  Sacrament Meeting Planner
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-slate-200">
                Organize speakers, hymns, prayers, and
                announcements in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/meetings"
                  className="rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover"
                >
                  View Meetings
                </Link>
              </div>
            </div>

            {/* Dashboard Preview */}
            <div className="rounded-3xl bg-white/10 p-6 shadow-lg backdrop-blur-lg">

              <h2 className="mb-6 text-xl font-semibold text-white">
                Dashboard Preview
              </h2>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">
                    Upcoming Meetings
                  </p>

                  <p className="mt-1 text-3xl font-bold text-white">
                    {totalMeetings}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">
                    Scheduled Speakers
                  </p>

                  <p className="mt-1 text-3xl font-bold text-white">
                    {scheduledSpeakers}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">
                    Testimony Meetings
                  </p>

                  <p className="mt-1 text-3xl font-bold text-white">
                    {testimonyMeetings}
                  </p>
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  <p className="text-sm text-slate-200">
                    Programs Ready
                  </p>

                  <p className="mt-1 text-3xl font-bold text-white">
                    {programsReady}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Upcoming Meetings */}

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-foreground">
            Upcoming Meetings
          </h2>

          <Link
            href="/meetings"
            className="text-primary hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
            />
          ))}
        </div>
      </section>
    </>
  );
}