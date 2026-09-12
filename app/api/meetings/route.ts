import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from '@/lib/meetings-db';
import { isMeetingType } from '@/lib/types';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const date = searchParams.get("date");

    if (type !== null && !isMeetingType(type)) {
        return NextResponse.json(
            { error: 'Invalid meeting type' },
            { status: 400 }
        );
    };

    const meetings = getMeetings(date, type ?? undefined);
    return NextResponse.json(meetings);
}