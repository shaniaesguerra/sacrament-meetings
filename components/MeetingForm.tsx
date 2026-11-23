import type { SacramentMeeting } from '@/lib/types';

type MeetingFormProps = {
  action: (formData: FormData) => Promise<void>;
  meeting?: SacramentMeeting;
};

const inputClassName =
  'mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground';

export default function MeetingForm({ action, meeting }: MeetingFormProps) {
  return (
    <form action={action} className="space-y-6 rounded-2xl border border-border bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Meeting date
          <input
            className={inputClassName}
            type="date"
            name="date"
            required
            defaultValue={meeting?.date ?? ''}
          />
        </label>

        <label className="block text-sm font-medium">
          Meeting type
          <select
            className={inputClassName}
            name="meetingType"
            defaultValue={meeting?.meetingType ?? 'regular'}
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
        </label>

        <label className="block text-sm font-medium">
          Presiding
          <input
            className={inputClassName}
            name="presiding"
            required
            defaultValue={meeting?.presiding ?? ''}
          />
        </label>

        <label className="block text-sm font-medium">
          Conducting
          <input
            className={inputClassName}
            name="conducting"
            required
            defaultValue={meeting?.conducting ?? ''}
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Announcements (one per line)
        <textarea
          className={inputClassName}
          name="announcements"
          rows={3}
          defaultValue={meeting?.announcements?.join('\n') ?? ''}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Opening hymn number
          <input
            className={inputClassName}
            type="number"
            name="openingHymnNumber"
            min="1"
            required
            defaultValue={meeting?.openingHymn.number ?? ''}
          />
        </label>
        <label className="block text-sm font-medium">
          Opening hymn title
          <input
            className={inputClassName}
            name="openingHymnTitle"
            required
            defaultValue={meeting?.openingHymn.title ?? ''}
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Opening prayer
        <input
          className={inputClassName}
          name="openingPrayer"
          required
          defaultValue={meeting?.openingPrayer ?? ''}
        />
      </label>

      <label className="block text-sm font-medium">
        Ward business (one item per line)
        <textarea
          className={inputClassName}
          name="wardBusiness"
          rows={3}
          defaultValue={meeting?.wardBusiness.map((item) => item.description).join('\n') ?? ''}
        />
      </label>

      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          name="stakeBusiness"
          defaultChecked={meeting?.stakeBusiness ?? false}
        />
        Include stake business
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Sacrament hymn number
          <input
            className={inputClassName}
            type="number"
            name="sacramentHymnNumber"
            min="1"
            required
            defaultValue={meeting?.sacramentHymn.number ?? ''}
          />
        </label>
        <label className="block text-sm font-medium">
          Sacrament hymn title
          <input
            className={inputClassName}
            name="sacramentHymnTitle"
            required
            defaultValue={meeting?.sacramentHymn.title ?? ''}
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Speakers (one per line: name | topic | speaker or musical-number)
        <textarea
          className={inputClassName}
          name="speakers"
          rows={4}
          defaultValue={
            meeting?.speakers
              .map((speaker) => `${speaker.name} | ${speaker.topic} | ${speaker.type}`)
              .join('\n') ?? ''
          }
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Closing hymn number
          <input
            className={inputClassName}
            type="number"
            name="closingHymnNumber"
            min="1"
            required
            defaultValue={meeting?.closingHymn.number ?? ''}
          />
        </label>
        <label className="block text-sm font-medium">
          Closing hymn title
          <input
            className={inputClassName}
            name="closingHymnTitle"
            required
            defaultValue={meeting?.closingHymn.title ?? ''}
          />
        </label>
      </div>

      <label className="block text-sm font-medium">
        Closing prayer
        <input
          className={inputClassName}
          name="closingPrayer"
          required
          defaultValue={meeting?.closingPrayer ?? ''}
        />
      </label>

      <button
        className="rounded-lg bg-primary px-5 py-3 font-medium text-white hover:bg-primary-hover"
        type="submit"
      >
        {meeting ? 'Save changes' : 'Create meeting'}
      </button>
    </form>
  );
}
