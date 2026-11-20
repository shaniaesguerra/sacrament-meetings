import { SacramentMeeting } from "@/lib/types";

type MeetingDetailProps = {
    meeting: SacramentMeeting;
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between border-b border-border pb-3">
      <span className="font-medium text-text-secondary">
        {label}
      </span>

      <span className="text-foreground">
        {value}
      </span>
    </div>
  );
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
    const announcements = meeting.announcements ?? [];
  return (
    <section className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <h1 className="mb-2 text-3xl font-bold text-foreground">
        Sacrament Meeting
      </h1>

      <p className="mb-8 text-text-secondary">
        {new Date(meeting.date).toLocaleDateString()}
      </p>

      <div className="space-y-4">
        <DetailRow
          label="Presiding"
          value={meeting.presiding}
        />

        <DetailRow
          label="Conducting"
          value={meeting.conducting}
        />

        <DetailRow
          label="Opening Hymn"
          value={`${meeting.openingHymn.number} - ${meeting.openingHymn.title}`}
        />

        <DetailRow
          label="Opening Prayer"
          value={meeting.openingPrayer}
        />

        <DetailRow
          label="Sacrament Hymn"
          value={`${meeting.sacramentHymn.number} - ${meeting.sacramentHymn.title}`}
        />

        <DetailRow
          label="Closing Hymn"
          value={`${meeting.closingHymn.number} - ${meeting.closingHymn.title}`}
        />

        <DetailRow
          label="Closing Prayer"
          value={meeting.closingPrayer}
        />
      </div>

      <hr className="my-8 border-border" />

      <h2 className="mb-4 text-xl font-semibold">
        Speakers
      </h2>

      <div className="space-y-3">
        {meeting.speakers.map((speaker, index) => (
          <div
            key={index}
            className="rounded-xl bg-surface-secondary p-4"
          >
            <p className="font-medium text-foreground">
              {speaker.name}
            </p>

            {speaker.topic && (
              <p className="text-text-secondary">
                {speaker.topic}
              </p>
            )}
          </div>
        ))}
      </div>

      {announcements.length > 0 && (
        <>
          <hr className="my-8 border-border" />

          <h2 className="mb-4 text-xl font-semibold">
            Announcements
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            {announcements.map(
              (announcement, index) => (
                <li key={index}>
                  {announcement}
                </li>
              )
            )}
          </ul>
        </>
      )}
    </section>
  );
}