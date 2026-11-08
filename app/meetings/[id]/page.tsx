"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MeetingDetail from "@/components/MeetingDetail";
import type { SacramentMeeting } from "@/lib/types";

export default function MeetingPage() {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<SacramentMeeting | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    void fetch(`/api/meetings/${encodeURIComponent(id)}`)
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Meeting not found");
        }
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json() as Promise<SacramentMeeting>;
      })
      .then((data) => {
        if (active) setMeeting(data);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Could not load meeting"
          );
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) return <p role="alert">{error}</p>;
  if (meeting === null) return <p>Loading meeting…</p>;

  return (
    <main className="min-h-screen bg-background">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}