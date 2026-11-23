import { Suspense } from 'react';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';
import { notFound } from 'next/navigation';

type EditMeetingPageProps = {
  params: Promise<{ id: string }>;
};

export default function EditMeetingPage({ params }: EditMeetingPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-foreground">Edit Meeting</h1>
      <Suspense fallback={<p role="status">Loading meeting...</p>}>
        <EditMeetingForm params={params} />
      </Suspense>
    </main>
  );
}

async function EditMeetingForm({ params }: EditMeetingPageProps) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!/^\d+$/.test(idParam) || !Number.isSafeInteger(id) || id <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(id);
  if (!meeting) notFound();

  return (
    <MeetingForm action={updateMeeting.bind(null, id)} meeting={meeting} />
  );
}