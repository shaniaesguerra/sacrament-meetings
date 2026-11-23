'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createMeeting as insertMeeting,
  deleteMeeting as removeMeeting,
  updateMeeting as saveMeeting,
} from './meetings-db';
import type { MeetingActionState } from './types';

const meetingTypes = ['testimony', 'regular', 'stake', 'general'] as const;
const speakerTypes = ['speaker', 'musical-number'] as const;

const MeetingFormSchema = z.object({
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
      const date = new Date(`${value}T00:00:00.000Z`);
      return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
    }, 'Enter a valid date.'),
  meetingType: z.enum(meetingTypes),
  presiding: z.string().trim().min(1, 'Enter who is presiding.'),
  conducting: z.string().trim().min(1, 'Enter who is conducting.'),
  announcements: z.string().transform((value) =>
    value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
  ),
  openingHymnNumber: z.coerce.number().int().positive(),
  openingHymnTitle: z.string().trim().min(1, 'Enter the opening hymn title.'),
  openingPrayer: z.string().trim().min(1, 'Enter who will offer the opening prayer.'),
  wardBusiness: z.string().transform((value) =>
    value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
      .map((description) => ({ description }))
  ),
  stakeBusiness: z.enum(['on', 'off']).transform((value) => value === 'on'),
  sacramentHymnNumber: z.coerce.number().int().positive(),
  sacramentHymnTitle: z.string().trim().min(1, 'Enter the sacrament hymn title.'),
  speakers: z.string()
    .superRefine((value, context) => {
      value.split(/\r?\n/).forEach((line, index) => {
        if (!line.trim()) return;

        const fields = line.split('|').map((field) => field.trim());
        const invalidType =
          fields[2] !== undefined && !speakerTypes.some((type) => type === fields[2]);

        if (fields.length > 3 || !fields[0] || invalidType) {
          context.addIssue({
            code: 'custom',
            path: ['speakers'],
            message: `Speaker line ${index + 1} must be "name | topic | speaker" or "name | topic | musical-number".`,
          });
        }
      });
    })
    .transform((value) =>
      value.split(/\r?\n/).filter((line) => line.trim()).map((line) => {
        const [name, topic = '', type = 'speaker'] = line.split('|').map((field) => field.trim());
        return { name, topic, type };
      })
    )
    .pipe(z.array(z.object({
      name: z.string().trim().min(1),
      topic: z.string(),
      type: z.enum(speakerTypes),
    }))),
  closingHymnNumber: z.coerce.number().int().positive(),
  closingHymnTitle: z.string().trim().min(1, 'Enter the closing hymn title.'),
  closingPrayer: z.string().trim().min(1, 'Enter who will offer the closing prayer.'),
}).transform((fields) => ({
  date: fields.date,
  meetingType: fields.meetingType,
  presiding: fields.presiding,
  conducting: fields.conducting,
  announcements: fields.announcements,
  openingHymn: {
    number: fields.openingHymnNumber,
    title: fields.openingHymnTitle,
  },
  openingPrayer: fields.openingPrayer,
  wardBusiness: fields.wardBusiness,
  stakeBusiness: fields.stakeBusiness,
  sacramentHymn: {
    number: fields.sacramentHymnNumber,
    title: fields.sacramentHymnTitle,
  },
  speakers: fields.speakers,
  closingHymn: {
    number: fields.closingHymnNumber,
    title: fields.closingHymnTitle,
  },
  closingPrayer: fields.closingPrayer,
}));

const MeetingIdSchema = z.coerce.number().int().positive()
  .refine(Number.isSafeInteger, 'Meeting ID must be a positive safe integer.');

function getRawMeetingFormValues(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    announcements: formData.get('announcements'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    wardBusiness: formData.get('wardBusiness'),
    stakeBusiness: formData.get('stakeBusiness') === 'on' ? 'on' : 'off',
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    speakers: formData.get('speakers'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
  };
}

export async function createMeeting(
  _prevState: MeetingActionState,
  formData: FormData,
): Promise<MeetingActionState> {
  const result = MeetingFormSchema.safeParse(getRawMeetingFormValues(formData));
  if (!result.success) {
    return {
      message: 'Please correct the highlighted fields.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await insertMeeting(result.data);
  } catch (error) {
    console.error('Error creating meeting:', error);
    throw new Error('Could not create the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath('/');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingActionState,
  formData: FormData,
): Promise<MeetingActionState> {
  const parsedId = MeetingIdSchema.safeParse(id);
  if (!parsedId.success) {
    return {
      message: 'This meeting ID is invalid.',
      errors: {},
    };
  }

  const result = MeetingFormSchema.safeParse(getRawMeetingFormValues(formData));
  if (!result.success) {
    return {
      message: 'Please correct the highlighted fields.',
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await saveMeeting(parsedId.data, result.data);
  } catch (error) {
    console.error(`Error updating meeting ${parsedId.data}:`, error);
    throw new Error('Could not save the meeting changes. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath('/');
  redirect('/meetings');
}

export async function deleteMeeting(formData: FormData): Promise<void> {
  const parsedId = MeetingIdSchema.safeParse(formData.get('id'));
  if (!parsedId.success) {
    throw new Error('Could not delete the meeting because its ID is invalid.');
  }

  try {
    await removeMeeting(parsedId.data);
  } catch (error) {
    console.error(`Error deleting meeting ${parsedId.data}:`, error);
    throw new Error('Could not delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath('/');
  redirect('/meetings');
}
