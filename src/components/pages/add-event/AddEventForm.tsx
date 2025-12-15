'use client';

import React, { useMemo, useState } from 'react';

type EventJson = {
  eventName: string;
  eventDescription: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string; // HH:MM
  eventVenue: string;
  eventLink: string;
  location: string;
  communityName: string;
  communityLogo: string;
};

const GITHUB_EDIT_EVENTS_URL =
  'https://github.com/fossuchennai/communities/edit/main/src/data/events.json';
const CONTRIBUTING_URL =
  'https://github.com/fossuchennai/communities/blob/main/CONTRIBUTING.md#-adding-events-most-common-contribution';

const ALLOWED_LOGO_HOSTS = new Set([
  'makerstribe.in',
  'geekcoders-community.pages.dev',
  'globalazure.in',
  'secure.meetupstatic.com',
  'res.cloudinary.com',
  'i.ibb.co',
  'fossunited.org',
  'avatars.githubusercontent.com',
  'cisc.club',
  'cdn2.allevents.in',
  'www.djangoindia.org'
]);

function isValidDate(value: string) {
  // YYYY-MM-DD (basic) + real date check
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function isValidTime(value: string) {
  // HH:MM 24h
  if (!/^\d{2}:\d{2}$/.test(value)) return false;
  const [hh, mm] = value.split(':').map(Number);
  return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
}

function normalizeTime(value: string) {
  // Some browsers may return HH:MM:SS for type="time" depending on step.
  if (/^\d{2}:\d{2}:\d{2}$/.test(value)) return value.slice(0, 5);
  return value;
}

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function getHostname(value: string) {
  try {
    return new URL(value).hostname;
  } catch {
    return null;
  }
}

function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function AddEventForm() {
  const [form, setForm] = useState<EventJson>({
    eventName: '',
    eventDescription: '',
    eventDate: '',
    eventTime: '',
    eventVenue: '',
    eventLink: '',
    location: '',
    communityName: '',
    communityLogo: ''
  });

  const [touched, setTouched] = useState<Record<keyof EventJson, boolean>>({
    eventName: false,
    eventDescription: false,
    eventDate: false,
    eventTime: false,
    eventVenue: false,
    eventLink: false,
    location: false,
    communityName: false,
    communityLogo: false
  });

  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');

  const errors = useMemo(() => {
    const next: Partial<Record<keyof EventJson, string>> = {};

    if (!form.eventName.trim()) next.eventName = 'Event name is required.';
    if (!form.eventDescription.trim()) next.eventDescription = 'Event description is required.';
    if (form.eventDescription.trim().length > 200)
      next.eventDescription = 'Keep it within 200 characters.';

    if (!form.eventDate.trim()) next.eventDate = 'Event date is required.';
    else if (!isValidDate(form.eventDate.trim())) next.eventDate = 'Use YYYY-MM-DD.';

    if (!form.eventTime.trim()) next.eventTime = 'Event time is required.';
    else if (!isValidTime(form.eventTime.trim())) next.eventTime = 'Use HH:MM (24-hour).';

    if (!form.eventVenue.trim()) next.eventVenue = 'Venue is required.';

    if (!form.eventLink.trim()) next.eventLink = 'Event link is required.';
    else if (!isValidUrl(form.eventLink.trim())) next.eventLink = 'Provide a valid URL.';

    if (!form.location.trim()) next.location = 'Location (city) is required.';

    if (!form.communityName.trim()) next.communityName = 'Community name is required.';

    if (!form.communityLogo.trim()) next.communityLogo = 'Community logo URL is required.';
    else if (!isValidUrl(form.communityLogo.trim())) next.communityLogo = 'Provide a valid URL.';

    return next;
  }, [form]);

  const isFormValid = Object.keys(errors).length === 0;

  const jsonObject: EventJson = useMemo(
    () => ({
      eventName: form.eventName.trim(),
      eventDescription: form.eventDescription.trim(),
      eventDate: form.eventDate.trim(),
      eventTime: form.eventTime.trim(),
      eventVenue: form.eventVenue.trim(),
      eventLink: form.eventLink.trim(),
      location: form.location.trim(),
      communityName: form.communityName.trim(),
      communityLogo: form.communityLogo.trim()
    }),
    [form]
  );

  const jsonPretty = useMemo(() => JSON.stringify(jsonObject, null, 2), [jsonObject]);

  const logoHostname = useMemo(() => getHostname(form.communityLogo.trim()), [form.communityLogo]);
  const logoHostAllowed = useMemo(() => {
    if (!logoHostname) return null;
    return ALLOWED_LOGO_HOSTS.has(logoHostname);
  }, [logoHostname]);

  const onChange = (key: keyof EventJson) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const value = key === 'eventTime' ? normalizeTime(rawValue) : rawValue;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onChangeTextarea =
    (key: keyof EventJson) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onBlur = (key: keyof EventJson) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
  };

  const markAllTouched = () => {
    setTouched({
      eventName: true,
      eventDescription: true,
      eventDate: true,
      eventTime: true,
      eventVenue: true,
      eventLink: true,
      location: true,
      communityName: true,
      communityLogo: true
    });
  };

  const copyJson = async () => {
    setCopyStatus('idle');
    try {
      await navigator.clipboard.writeText(jsonPretty);
      setCopyStatus('copied');
      window.setTimeout(() => setCopyStatus('idle'), 1500);
    } catch {
      setCopyStatus('failed');
      window.setTimeout(() => setCopyStatus('idle'), 2000);
    }
  };

  const downloadJson = () => {
    const safeName = (form.eventName || 'event')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60);

    const filename = `${safeName || 'event'}-${form.eventDate || 'date'}.json`;
    downloadTextFile(filename, jsonPretty);
  };

  return (
    <div className='grid gap-8 lg:grid-cols-2'>
      <div>
        <div className='grid gap-8'>
          <div>
            <h2 className='text-sm font-semibold text-gray-900'>Event details</h2>
            <p className='mt-1 text-sm text-gray-600'>
              Use the calendar/time pickers for the correct format.
            </p>
          </div>

          <div className='grid gap-4'>
            <Field
              id='eventName'
              name='eventName'
              label='Event name'
              value={form.eventName}
              onChange={onChange('eventName')}
              onBlur={onBlur('eventName')}
              placeholder='DevFest 2025 Chennai'
              autoComplete='off'
              error={touched.eventName ? errors.eventName : undefined}
            />

            <TextAreaField
              id='eventDescription'
              name='eventDescription'
              label='Event description (max 200 chars)'
              value={form.eventDescription}
              onChange={onChangeTextarea('eventDescription')}
              onBlur={onBlur('eventDescription')}
              placeholder='Brief description of the event...'
              error={touched.eventDescription ? errors.eventDescription : undefined}
              helper={`${Math.min(form.eventDescription.length, 999)}/200`}
            />

            <div className='grid gap-4 sm:grid-cols-2'>
              <Field
                id='eventDate'
                name='eventDate'
                type='date'
                label='Event date'
                value={form.eventDate}
                onChange={onChange('eventDate')}
                onBlur={onBlur('eventDate')}
                placeholder='YYYY-MM-DD'
                error={touched.eventDate ? errors.eventDate : undefined}
              />
              <Field
                id='eventTime'
                name='eventTime'
                type='time'
                step={60}
                label='Event time'
                value={form.eventTime}
                onChange={onChange('eventTime')}
                onBlur={onBlur('eventTime')}
                placeholder='HH:MM'
                error={touched.eventTime ? errors.eventTime : undefined}
              />
            </div>

            <Field
              id='eventVenue'
              name='eventVenue'
              label='Venue'
              value={form.eventVenue}
              onChange={onChange('eventVenue')}
              onBlur={onBlur('eventVenue')}
              placeholder='IIT Madras Research Park, Chennai'
              error={touched.eventVenue ? errors.eventVenue : undefined}
            />

            <Field
              id='eventLink'
              name='eventLink'
              inputMode='url'
              label='Event link'
              value={form.eventLink}
              onChange={onChange('eventLink')}
              onBlur={onBlur('eventLink')}
              placeholder='https://...'
              autoComplete='url'
              error={touched.eventLink ? errors.eventLink : undefined}
            />
          </div>

          <div className='border-t border-gray-200 pt-6'>
            <h2 className='text-sm font-semibold text-gray-900'>Community details</h2>
            <p className='mt-1 text-sm text-gray-600'>This helps people identify the organizer.</p>
          </div>

          <div className='grid gap-4 sm:grid-cols-2'>
            <Field
              id='location'
              name='location'
              label='Location (city)'
              value={form.location}
              onChange={onChange('location')}
              onBlur={onBlur('location')}
              placeholder='Chennai'
              error={touched.location ? errors.location : undefined}
            />
            <Field
              id='communityName'
              name='communityName'
              label='Community name'
              value={form.communityName}
              onChange={onChange('communityName')}
              onBlur={onBlur('communityName')}
              placeholder="India Linux User's Group Chennai"
              error={touched.communityName ? errors.communityName : undefined}
            />
          </div>

          <Field
            id='communityLogo'
            name='communityLogo'
            inputMode='url'
            label='Community logo URL'
            value={form.communityLogo}
            onChange={onChange('communityLogo')}
            onBlur={onBlur('communityLogo')}
            placeholder='https://i.ibb.co/.../logo.png'
            autoComplete='url'
            error={touched.communityLogo ? errors.communityLogo : undefined}
          />

          {logoHostname && logoHostAllowed === false && (
            <div className='rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900'>
              The logo host <span className='font-medium'>{logoHostname}</span> might not be allowed
              by Next.js image settings. If the logo doesn’t show up after merge, a maintainer may
              need to add the hostname to <span className='font-medium'>next.config.ts</span>.
            </div>
          )}
        </div>

        <div className='mt-6 flex flex-wrap gap-3'>
          <button
            className='btn btn-primary'
            onClick={() => {
              markAllTouched();
              if (!isFormValid) return;
              copyJson();
            }}
          >
            {copyStatus === 'copied'
              ? 'Copied!'
              : copyStatus === 'failed'
                ? 'Copy failed'
                : 'Copy JSON'}
          </button>

          <button
            className='btn btn-secondary'
            onClick={() => {
              markAllTouched();
              if (!isFormValid) return;
              downloadJson();
            }}
          >
            Download .json
          </button>
        </div>

        {!isFormValid && (
          <p className='mt-3 text-sm text-gray-600'>
            Fill all required fields to enable copy/download.
          </p>
        )}
      </div>

      <div>
        <div className='rounded-2xl border border-gray-200 bg-gray-50 p-4'>
          <div className='flex items-center justify-between gap-3'>
            <h2 className='text-sm font-semibold text-gray-900'>Generated JSON (single entry)</h2>
            <span className='text-xs text-gray-600'>Paste into the events array</span>
          </div>
          <pre className='mt-3 max-h-[520px] overflow-auto rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-900'>
            {jsonPretty}
          </pre>
        </div>

        <div className='mt-4 rounded-2xl border border-gray-200 bg-white p-4'>
          <div className='flex items-start justify-between gap-3'>
            <div>
              <h3 className='text-sm font-semibold text-gray-900'>How to submit</h3>
              <p className='mt-1 text-sm text-gray-600'>3 quick steps to get your event listed.</p>
            </div>
            <a
              className='btn btn-ghost -mt-1 h-9 px-3'
              href={GITHUB_EDIT_EVENTS_URL}
              target='_blank'
              rel='noreferrer'
              title='Opens GitHub edit view for src/data/events.json'
            >
              Open GitHub
            </a>
          </div>

          <div className='mt-4'>
            <Stepper>
              <Step
                number={1}
                title='Open GitHub (fork if needed)'
                description='Click “Open GitHub”. GitHub will guide you to fork this repo if you don’t have one.'
              />
              <Step
                number={2}
                title='Paste the JSON into events.json'
                description='Copy the generated JSON and paste it as a new item inside the events array.'
                emphasis={
                  <code className='rounded bg-gray-100 px-1.5 py-0.5 text-xs'>
                    src/data/events.json
                  </code>
                }
              />
              <Step
                number={3}
                title='Propose changes → Open PR'
                description='Submit the change and create a Pull Request so maintainers can review and merge.'
              />
            </Stepper>
          </div>

          <div className='mt-4 flex flex-wrap gap-3 text-sm'>
            <a
              className='btn btn-secondary h-9 px-3'
              href={CONTRIBUTING_URL}
              target='_blank'
              rel='noreferrer'
            >
              Read guidelines
            </a>
            <a
              className='btn btn-ghost h-9 px-3'
              href={GITHUB_EDIT_EVENTS_URL}
              target='_blank'
              rel='noreferrer'
            >
              Edit events.json
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  name,
  type = 'text',
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  inputMode,
  step,
  autoComplete
}: {
  id: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  error?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
  step?: number;
  autoComplete?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className='text-sm font-medium text-gray-800'>
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        inputMode={inputMode}
        step={step}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'
        }`}
      />
      {error && (
        <p id={errorId} className='mt-1 text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  helper
}: {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  error?: string;
  helper?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <div className='flex items-center justify-between gap-3'>
        <label htmlFor={id} className='text-sm font-medium text-gray-800'>
          {label}
        </label>
        {helper && <span className='text-xs text-gray-600'>{helper}</span>}
      </div>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`mt-2 w-full resize-none rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition focus:border-green-500 focus:ring-4 focus:ring-green-500/10 ${
          error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200'
        }`}
      />
      {error && (
        <p id={errorId} className='mt-1 text-xs text-red-600'>
          {error}
        </p>
      )}
    </div>
  );
}

function Stepper({ children }: { children: React.ReactNode }) {
  return <div className='relative space-y-4'>{children}</div>;
}

function Step({
  number,
  title,
  description,
  emphasis
}: {
  number: number;
  title: string;
  description: string;
  emphasis?: React.ReactNode;
}) {
  return (
    <div className='relative flex items-start gap-4'>
      <div className='relative flex flex-col items-center'>
        <div className='grid h-8 w-8 place-items-center rounded-full bg-green-600 text-sm font-semibold text-white shadow-sm'>
          {number}
        </div>
        {number !== 3 && <div className='mt-2 h-full w-px bg-green-200' />}
      </div>

      <div className='min-w-0 pt-0.5'>
        <div className='flex flex-wrap items-center gap-2'>
          <p className='text-sm font-semibold text-gray-900'>{title}</p>
          {emphasis}
        </div>
        <p className='mt-1 text-sm text-gray-600'>{description}</p>
      </div>
    </div>
  );
}
