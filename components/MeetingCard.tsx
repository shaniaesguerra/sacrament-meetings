import Link from "next/link";
import type { MeetingType, Hymn, WardBusinessItem, SpeakerItem } from "@/lib/types";

interface MeetingCardProps{
    id: number;
    date: string;              // ISO date string: 'YYYY-MM-DD'
    meetingType: MeetingType;
    presiding: string;
    conducting: string;
    announcements?: string[];
    openingHymn: Hymn;
    openingPrayer: string;
    wardBusiness: WardBusinessItem[];
    stakeBusiness: boolean;
    sacramentHymn: Hymn;
    speakers: SpeakerItem[];
    closingHymn: Hymn;
    closingPrayer: string;
}

export default function MeetingCard({
  id,
  date,
  meetingType,
  presiding,
  conducting,
  openingHymn,
  sacramentHymn,
  closingHymn,
}: MeetingCardProps) {
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  const meetingTypeLabel =
    meetingType.charAt(0).toUpperCase() + meetingType.slice(1);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-card/60 bg-card/20 p-5 shadow-md transition-shadow hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {meetingTypeLabel} meeting
          </p>
          <h2 className="mt-1 text-xl font-bold">{formattedDate}</h2>
        </div>
        <span className="rounded-full bg-brand px-3 py-1 text-sm font-semibold text-background">
          #{id}
        </span>
      </div>

      <dl className="mb-5 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-brand">Presiding</dt>
          <dd>{presiding}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand">Conducting</dt>
          <dd>{conducting}</dd>
        </div>
      </dl>

      <dl className="space-y-3 border-y border-card/60 py-4 text-sm">
        <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-semibold text-brand">Opening hymn</dt>
          <dd>
            #{openingHymn.number} &ldquo;{openingHymn.title}&rdquo;
          </dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-semibold text-brand">Sacrament hymn</dt>
          <dd>
            #{sacramentHymn.number} &ldquo;{sacramentHymn.title}&rdquo;
          </dd>
        </div>
        <div className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-4">
          <dt className="font-semibold text-brand">Closing hymn</dt>
          <dd>
            #{closingHymn.number} &ldquo;{closingHymn.title}&rdquo;
          </dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <Link
            href={`/meetings/${id}`}
            className="inline-flex w-fit rounded-full bg-brand px-4 py-2 font-semibold text-background transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
            View meeting
        </Link>
      </div>
    </article>
  );
}