import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

type MeetingCardProps = {
    meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <Link href={`/meetings/${meeting.id}`}>
            <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary hover:shadow-md">
                <p className="text-sm text-text-secondary">
                {new Date(meeting.date).toLocaleDateString()}
                </p>

                <h2 className="mt-2 text-lg font-semibold text-foreground capitalize">
                {meeting.meetingType === "testimony"
                    ? "Fast & Testimony Meeting"
                    : `${meeting.meetingType} Meeting`}
                </h2>

                <p className="mt-2 text-sm text-text-secondary capitalize">
                Conducting: {meeting.conducting}
                </p>

                <p className="text-sm text-text-secondary capitalize">
                Presiding: {meeting.presiding}
                </p>

                <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs text-white">
                    {meeting.speakers.length} Participants
                </span>

                {meeting.stakeBusiness && (
                    <span className="rounded-full bg-warning-bg px-3 py-1 text-xs text-warning">
                    Stake Business
                    </span>
                )}
                </div>
            </article>
        </Link>  
    );
}