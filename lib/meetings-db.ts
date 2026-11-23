import { neon } from '@neondatabase/serverless';
import type { NewSacramentMeeting, SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const ITEMS_PER_PAGE = 5;
const MEETING_COLUMNS = sql.unsafe(`
  id,
  to_char(date, 'YYYY-MM-DD') AS "date",
  meeting_type                AS "meetingType",
  presiding, conducting, announcements,
  opening_hymn                AS "openingHymn",
  opening_prayer              AS "openingPrayer",
  ward_business               AS "wardBusiness",
  stake_business              AS "stakeBusiness",
  sacrament_hymn              AS "sacramentHymn",
  speakers,
  closing_hymn                AS "closingHymn",
  closing_prayer              AS "closingPrayer"
`);

function assertValidMeetingId(id: number): void {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new RangeError('Meeting ID must be a positive safe integer.');
  }
}

export async function getAllMeetings(query: string = ''): Promise<SacramentMeeting[]> {
    const searchTerm = `%${query}%`;

    const rows = await sql`
    SELECT ${MEETING_COLUMNS}
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    `;

    return rows as unknown as SacramentMeeting[];
}

export async function getMeetings(query: string = '', currentPage: number = 1): Promise<SacramentMeeting[]>{
    const searchTerm = `%${query}%`;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    const rows = await sql`
    SELECT ${MEETING_COLUMNS}
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return rows as unknown as SacramentMeeting[];
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null>{
    const rows = await sql`
    SELECT ${MEETING_COLUMNS}
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function getCurrentMeeting(): Promise<SacramentMeeting | null>{
  const today = new Date();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const formatLocalDate = (date: Date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

  const startDate = formatLocalDate(startOfWeek);
  const endDate = formatLocalDate(endOfWeek);

  const rows = await sql`
    SELECT ${MEETING_COLUMNS}
    FROM meetings
    WHERE date >= ${startDate}::date
      AND date <= ${endDate}::date
    ORDER BY date ASC
    LIMIT 1
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

export async function createMeeting(meeting: NewSacramentMeeting): Promise<number> {
  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date},
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)},
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)},
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)},
      ${JSON.stringify(meeting.speakers)},
      ${JSON.stringify(meeting.closingHymn)},
      ${meeting.closingPrayer}
    )
    RETURNING id
  `;

  if (!rows[0]) {
    throw new Error('Creating the meeting did not return an ID.');
  }

  return Number(rows[0].id);
}

export async function updateMeeting(
  id: number,
  meeting: NewSacramentMeeting,
): Promise<void> {
  assertValidMeetingId(id);

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${meeting.date},
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)},
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)},
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)},
      speakers = ${JSON.stringify(meeting.speakers)},
      closing_hymn = ${JSON.stringify(meeting.closingHymn)},
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
    RETURNING id
  `;

  if (!rows[0]) {
    throw new Error(`Meeting ${id} was not found.`);
  }
}

export async function deleteMeeting(id: number): Promise<void> {
  assertValidMeetingId(id);

  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;

  if (!rows[0]) {
    throw new Error(`Meeting ${id} was not found.`);
  }
}

export async function getMeetingsTotalPages(query: string = ""): Promise<number> {
  const searchTerm = `%${query}%`;

  const rows = await sql`
    SELECT COUNT(*) AS total
    FROM meetings
    WHERE
      presiding ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.ceil(Number(rows[0]?.total ?? 0) / ITEMS_PER_PAGE);
}