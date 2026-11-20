import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import { MeetingSearch } from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import {
  getMeetings,
  getMeetingsTotalPages,
} from "@/lib/meetings-db";

type MeetingsPageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default function MeetingsPage({ searchParams }: MeetingsPageProps) {
  return (
    <section>
      <div className="mb-8 max-w-md">
        <Suspense
          fallback={<p className="text-text-secondary">Loading search…</p>}
        >
          <MeetingSearch />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <p role="status" className="text-text-secondary">
            Loading meetings…
          </p>
        }
      >
        <MeetingsResults searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function MeetingsResults({ searchParams }: MeetingsPageProps) {
  const params = await searchParams;
  const query = params.query ?? "";

  const requestedPage = Number(params.page ?? "1");
  const currentPage =
    Number.isInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
      {meetings.length === 0 ? (
        <p className="text-text-secondary">No meetings found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </>
  );
}