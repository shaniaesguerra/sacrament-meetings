import { NextRequest, NextResponse } from "next/server";
import { getAllMeetings } from "@/lib/meetings-db";
import { isMeetingType } from "@/lib/types";

export function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const type = searchParams.get("type");

  if (type !== null && !isMeetingType(type)) {
    return NextResponse.json(
      { error: "Invalid meeting type" },
      { status: 400 }
    );
  }

  const meetings = getAllMeetings(date);
  const filteredMeetings =
    type === null
      ? meetings
      : meetings.filter((meeting) => meeting.meetingType === type);

  return NextResponse.json(filteredMeetings);
}