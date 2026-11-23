import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";
import { deleteMeeting } from "@/lib/actions";

type MeetingCardProps = {
    meeting: SacramentMeeting;
};

export default function MeetingCard({ meeting }: MeetingCardProps) {
    return (
        <article className="rounded-2xl border border-border bg-surface p-5 shadow-sm transition hover:border-primary hover:shadow-md">
            <Link href={`/meetings/${meeting.id}`} className="block">
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
            </Link>
            <div className="mt-5 flex items-center justify-between">
                <Link
                    className="text-sm font-medium text-primary hover:underline"
                    href={`/meetings/${meeting.id}/edit`}
                >
                    Edit
                </Link>
                <form action={deleteMeeting}>
                    <input type="hidden" name="id" value={meeting.id} />
                    <button
                        className="text-sm font-medium text-red-700 hover:underline"
                        type="submit"
                    >
                        Delete
                    </button>
                </form>
            </div>
        </article>
    );
}