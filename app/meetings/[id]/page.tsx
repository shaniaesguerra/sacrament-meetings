import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";
import { notFound } from "next/navigation";

type Props = {
    params: Promise<{ id: string; }>;
};

export default async function MeetingPage({ params }: Props) {
    const { id } = await params;
    const meeting = getMeetingById(Number(id));

    if (!meeting) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-5xl px-6 py-10">
        <MeetingDetail meeting={meeting} />
        </main>
     );
}