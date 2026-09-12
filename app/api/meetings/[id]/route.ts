import { NextRequest } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(request:NextRequest,{ params }: { params: Promise<{ id: string }>}) {
    const { id } = await params;
    const meetingId = Number(id);

    if (!Number.isInteger(meetingId)) {
        return Response.json(
            { error: "Meeting id must be a number" },
            { status: 400 }
        );
    };

    const meeting = getMeetingById(meetingId);
    if (!meeting) {
        return Response.json(
            { error: "Project not found." },
            { status: 404 }
        );
    };

    return Response.json(meeting);
}