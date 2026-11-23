import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export default function NewMeetingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold text-foreground">
        Create Meeting
      </h1>
      <MeetingForm action={createMeeting} />
    </main>
  );
}