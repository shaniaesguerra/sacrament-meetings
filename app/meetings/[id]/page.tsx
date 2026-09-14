import MeetingDetail from "@/components/MeetingDetail";
import Link from "next/link";
import type { SacramentMeeting } from "@/lib/types";

type MeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default async function MeetingPage({params}:MeetingPageProps) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.APP_URL}/api/meetings/${id}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch meeting");
  }

  const meeting: SacramentMeeting = await response.json();

  return (
        <main className="mx-auto max-w-7xl gap-6 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 ">
                <h1 className="text-3xl font-bold text-brand">Meeting Details</h1>
                <nav aria-label="Meeting navigation" className="flex gap-2">
                <Link
                    href="/meetings"
                    className="rounded-full border border-brand px-4 py-2 font-semibold text-brand transition-colors hover:bg-brand hover:text-background"
                >
                    All meetings
                </Link>
                </nav>

                
            </div>

            <MeetingDetail {...meeting}/>
        </main>
    );
}