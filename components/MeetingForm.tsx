'use client';

import { useActionState } from 'react';
import type { MeetingActionState, MeetingFormField, SacramentMeeting } from '@/lib/types';

type MeetingFormProps = {
  action: (
    previousState: MeetingActionState,
    formData: FormData,
  ) => Promise<MeetingActionState>;
  meeting?: SacramentMeeting;
};

const initialState: MeetingActionState = {
  message: null,
  errors: {},
};

const inputClassName =
  'mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground';

function FieldErrors({
  field,
  errors,
}: {
  field: MeetingFormField;
  errors?: string[];
}) {
  const errorId = `${field}-error`;

  return (
    <div id={errorId} aria-live="polite" aria-atomic="true">
      {errors?.map((error, index) => (
        <p key={`${errorId}-${index}`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      ))}
    </div>
  );
}

export default function MeetingForm({ action, meeting }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="date">
            Meeting date
          </label>
          <input
            aria-describedby="date-error"
            aria-invalid={Boolean(state.errors.date?.length)}
            className={inputClassName}
            id="date"
            type="date"
            name="date"
            required
            defaultValue={meeting?.date ?? ''}
          />
          <FieldErrors field="date" errors={state.errors.date} />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="meetingType">
            Meeting type
          </label>
          <select
            aria-describedby="meetingType-error"
            aria-invalid={Boolean(state.errors.meetingType?.length)}
            className={inputClassName}
            id="meetingType"
            name="meetingType"
            defaultValue={meeting?.meetingType ?? 'regular'}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <FieldErrors field="meetingType" errors={state.errors.meetingType} />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="presiding">
            Presiding
          </label>
          <input
            aria-describedby="presiding-error"
            aria-invalid={Boolean(state.errors.presiding?.length)}
            className={inputClassName}
            id="presiding"
            name="presiding"
            required
            defaultValue={meeting?.presiding ?? ''}
          />
          <FieldErrors field="presiding" errors={state.errors.presiding} />
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="conducting">
            Conducting
          </label>
          <input
            aria-describedby="conducting-error"
            aria-invalid={Boolean(state.errors.conducting?.length)}
            className={inputClassName}
            id="conducting"
            name="conducting"
            required
            defaultValue={meeting?.conducting ?? ''}
          />
          <FieldErrors field="conducting" errors={state.errors.conducting} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="announcements">
          Announcements (one per line)
        </label>
        <textarea
          aria-describedby="announcements-error"
          aria-invalid={Boolean(state.errors.announcements?.length)}
          className={inputClassName}
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={meeting?.announcements?.join('\n') ?? ''}
        />
        <FieldErrors field="announcements" errors={state.errors.announcements} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="openingHymnNumber">
            Opening hymn number
          </label>
          <input
            aria-describedby="openingHymnNumber-error"
            aria-invalid={Boolean(state.errors.openingHymnNumber?.length)}
            className={inputClassName}
            id="openingHymnNumber"
            type="number"
            name="openingHymnNumber"
            min="1"
            required
            defaultValue={meeting?.openingHymn.number ?? ''}
          />
          <FieldErrors field="openingHymnNumber" errors={state.errors.openingHymnNumber} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="openingHymnTitle">
            Opening hymn title
          </label>
          <input
            aria-describedby="openingHymnTitle-error"
            aria-invalid={Boolean(state.errors.openingHymnTitle?.length)}
            className={inputClassName}
            id="openingHymnTitle"
            name="openingHymnTitle"
            required
            defaultValue={meeting?.openingHymn.title ?? ''}
          />
          <FieldErrors field="openingHymnTitle" errors={state.errors.openingHymnTitle} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="openingPrayer">
          Opening prayer
        </label>
        <input
          aria-describedby="openingPrayer-error"
          aria-invalid={Boolean(state.errors.openingPrayer?.length)}
          className={inputClassName}
          id="openingPrayer"
          name="openingPrayer"
          required
          defaultValue={meeting?.openingPrayer ?? ''}
        />
        <FieldErrors field="openingPrayer" errors={state.errors.openingPrayer} />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="wardBusiness">
          Ward business (one item per line)
        </label>
        <textarea
          aria-describedby="wardBusiness-error"
          aria-invalid={Boolean(state.errors.wardBusiness?.length)}
          className={inputClassName}
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          defaultValue={meeting?.wardBusiness.map((item) => item.description).join('\n') ?? ''}
        />
        <FieldErrors field="wardBusiness" errors={state.errors.wardBusiness} />
      </div>

      <div>
        <input
          aria-describedby="stakeBusiness-error"
          aria-invalid={Boolean(state.errors.stakeBusiness?.length)}
          id="stakeBusiness"
          type="checkbox"
          name="stakeBusiness"
          defaultChecked={meeting?.stakeBusiness ?? false}
        />
        <label className="ml-2 text-sm font-medium" htmlFor="stakeBusiness">
          Include stake business
        </label>
        <FieldErrors field="stakeBusiness" errors={state.errors.stakeBusiness} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="sacramentHymnNumber">
            Sacrament hymn number
          </label>
          <input
            aria-describedby="sacramentHymnNumber-error"
            aria-invalid={Boolean(state.errors.sacramentHymnNumber?.length)}
            className={inputClassName}
            id="sacramentHymnNumber"
            type="number"
            name="sacramentHymnNumber"
            min="1"
            required
            defaultValue={meeting?.sacramentHymn.number ?? ''}
          />
          <FieldErrors field="sacramentHymnNumber" errors={state.errors.sacramentHymnNumber} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="sacramentHymnTitle">
            Sacrament hymn title
          </label>
          <input
            aria-describedby="sacramentHymnTitle-error"
            aria-invalid={Boolean(state.errors.sacramentHymnTitle?.length)}
            className={inputClassName}
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            required
            defaultValue={meeting?.sacramentHymn.title ?? ''}
          />
          <FieldErrors field="sacramentHymnTitle" errors={state.errors.sacramentHymnTitle} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="speakers">
          Speakers (one per line: name | topic | speaker or musical-number)
        </label>
        <textarea
          aria-describedby="speakers-error"
          aria-invalid={Boolean(state.errors.speakers?.length)}
          className={inputClassName}
          id="speakers"
          name="speakers"
          rows={4}
          defaultValue={
            meeting?.speakers
              .map((speaker) => `${speaker.name} | ${speaker.topic} | ${speaker.type}`)
              .join('\n') ?? ''
          }
        />
        <FieldErrors field="speakers" errors={state.errors.speakers} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium" htmlFor="closingHymnNumber">
            Closing hymn number
          </label>
          <input
            aria-describedby="closingHymnNumber-error"
            aria-invalid={Boolean(state.errors.closingHymnNumber?.length)}
            className={inputClassName}
            id="closingHymnNumber"
            type="number"
            name="closingHymnNumber"
            min="1"
            required
            defaultValue={meeting?.closingHymn.number ?? ''}
          />
          <FieldErrors field="closingHymnNumber" errors={state.errors.closingHymnNumber} />
        </div>
        <div>
          <label className="block text-sm font-medium" htmlFor="closingHymnTitle">
            Closing hymn title
          </label>
          <input
            aria-describedby="closingHymnTitle-error"
            aria-invalid={Boolean(state.errors.closingHymnTitle?.length)}
            className={inputClassName}
            id="closingHymnTitle"
            name="closingHymnTitle"
            required
            defaultValue={meeting?.closingHymn.title ?? ''}
          />
          <FieldErrors field="closingHymnTitle" errors={state.errors.closingHymnTitle} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="closingPrayer">
          Closing prayer
        </label>
        <input
          aria-describedby="closingPrayer-error"
          aria-invalid={Boolean(state.errors.closingPrayer?.length)}
          className={inputClassName}
          id="closingPrayer"
          name="closingPrayer"
          required
          defaultValue={meeting?.closingPrayer ?? ''}
        />
        <FieldErrors field="closingPrayer" errors={state.errors.closingPrayer} />
      </div>

      {state.message && (
        <p className="text-sm text-red-700" role="status" aria-live="polite" aria-atomic="true">
          {state.message}
        </p>
      )}

      <button
        className="rounded-lg bg-primary px-5 py-3 font-medium text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
        disabled={isPending}
      >
        {isPending ? 'Saving...' : meeting ? 'Save changes' : 'Create meeting'}
      </button>
    </form>
  );
}
