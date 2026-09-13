import { getCurrentMeeting} from "@/lib/meetings-db";

export async function GET() {
    const meeting = getCurrentMeeting();

    if (!meeting) {
        return Response.json(
            { error: "No meeting found for the current Sunday." },
            { status: 404 }
        );
    };

    return Response.json(meeting);
}