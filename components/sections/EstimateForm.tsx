"use client";

import { type ChangeEvent, type DragEvent, useActionState, useRef, useState } from "react";
import { MoveRight, CheckCircle2, ImagePlus, Phone, Star, X } from "lucide-react";
import { submitEstimate, type EstimateState } from "@/app/actions/submit-estimate";
import { content } from "@/lib/content";

const initialState: EstimateState = { status: "idle" };
const MAX_PHOTO_COUNT = 5;
const MAX_PHOTO_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/heic",
  "image/heif",
  "image/webp",
]);
const ACCEPTED_PHOTO_EXTENSIONS = [".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"];

// Hide "Snow plowing (next winter)" between Apr and Oct so the form isn't asking about
// a service the user can't currently book. We still keep it in content.json so the
// schema-of-record doesn't drift.
function isWinterBookingSeason(now: Date = new Date()): boolean {
  const month = now.getMonth(); // 0-indexed
  return month >= 9 || month <= 2; // Oct (9) – Mar (2) inclusive
}

export function EstimateForm() {
  const [state, formAction, pending] = useActionState(submitEstimate, initialState);
  const { estimate_form, business } = content;
  const allServiceOptions =
    estimate_form.fields.find((f) => f.name === "services")?.options ?? [];
  const visibleServiceOptions = isWinterBookingSeason()
    ? allServiceOptions
    : allServiceOptions.filter((o) => !o.toLowerCase().includes("snow plowing"));

  return (
    <section
      id="estimate"
      className="relative scroll-mt-24 overflow-hidden bg-kva-ink py-16 text-kva-cream sm:py-28 lg:py-32"
    >
      {/* Background flourish */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25">
        <div className="absolute -left-32 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-kva-forest-soft/30 blur-3xl" />
        <div className="absolute -right-32 top-0 h-[30rem] w-[30rem] rounded-full bg-kva-gold/20 blur-3xl" />
      </div>

      <div className="kva-container">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="inline-flex rounded-full border border-kva-cream/20 bg-kva-cream/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-kva-cream/80">
              Free, no-pressure estimate
            </span>
            <h2 className="mt-4 font-display text-balance text-4xl font-medium leading-tight tracking-tight text-kva-cream sm:text-5xl lg:text-6xl">
              {estimate_form.headline}
            </h2>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-kva-cream/80">
              {estimate_form.subhead}
            </p>

            <div className="mt-10 space-y-3 text-sm text-kva-cream/85">
              <div className="flex flex-wrap items-center gap-3">
                <Phone className="h-4 w-4 text-kva-gold" aria-hidden />
                <a href={`tel:${content.hero.secondary_cta.tel}`} className="hover:text-kva-cream">
                  Call {business.phone_primary}
                </a>
                <span className="text-kva-cream/40" aria-hidden>·</span>
                <a href={`sms:${content.hero.secondary_cta.tel}`} className="hover:text-kva-cream">
                  Text us
                </a>
              </div>
              <p className="ml-7 text-xs text-kva-cream/75">Text or call is fine — whichever you prefer.</p>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden>
                  ✉
                </span>
                <a href={`mailto:${business.email}`} className="hover:text-kva-cream">
                  {business.email}
                </a>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-kva-cream/10 px-4 py-2 text-xs text-kva-cream/85 backdrop-blur">
                <span className="inline-flex h-2 w-2 rounded-full bg-kva-gold" aria-hidden />
                {estimate_form.response_pill ?? "Usually replies within an hour during business hours."}
              </div>
            </div>

            {/* Social proof — reassurance next to the form */}
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-kva-cream/15 pt-6 text-sm text-kva-cream/85">
              <span className="flex items-center gap-0.5" role="img" aria-label={`${content.review_aggregate.weighted_rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-kva-gold text-kva-gold" aria-hidden />
                ))}
              </span>
              <span className="font-semibold text-kva-cream">
                {content.review_aggregate.weighted_rating.toFixed(1)}
              </span>
              <span>· {content.review_aggregate.total_review_count}+ reviews</span>
              <span className="text-kva-cream/40" aria-hidden>·</span>
              <span>Class A VA Contractor · Thumbtack Top Pro 2025</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            {state.status === "success" ? (
              <div className="rounded-3xl border border-kva-gold/30 bg-kva-cream/5 p-10 text-center backdrop-blur">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-kva-gold/15 text-kva-gold">
                  <CheckCircle2 className="h-7 w-7" aria-hidden />
                </div>
                <h3 className="mt-5 font-display text-2xl font-medium text-kva-cream">
                  {estimate_form.success_message}
                </h3>
                <p className="mt-3 text-sm text-kva-cream/70">
                  {state.message ?? "If it is urgent, give us a call directly."}
                </p>
                <a
                  href={`tel:${content.hero.secondary_cta.tel}`}
                  className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-[6px] border border-kva-cream/55 bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-kva-cream transition-colors hover:border-kva-cream hover:bg-kva-cream/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-cream focus-visible:ring-offset-2 focus-visible:ring-offset-kva-ink"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Call {business.phone_primary}
                </a>
              </div>
            ) : (
              <form
                action={formAction}
                className="space-y-4 rounded-3xl border border-kva-cream/15 bg-kva-cream/[0.04] p-6 backdrop-blur sm:p-8"
              >
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Your name"
                    name="name"
                    required
                    autoComplete="name"
                    error={state.fieldErrors?.name?.[0]}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="(703) 555-0100"
                    helper="Text or call is fine — whichever you prefer."
                    error={state.fieldErrors?.phone?.[0]}
                  />
                </div>
                <Field
                  label="Property address or ZIP"
                  name="address"
                  autoComplete="street-address"
                  placeholder="Street, or just a ZIP — we'll confirm when we call"
                  helper="Street or just a ZIP is fine — we'll confirm when we call."
                  error={state.fieldErrors?.address?.[0]}
                />
                <Field
                  label="Email (optional)"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  error={state.fieldErrors?.email?.[0]}
                />

                <fieldset
                  aria-describedby={state.fieldErrors?.services ? "services-error" : undefined}
                >
                  <legend className="mb-2 block text-sm font-medium text-kva-cream">
                    What do you need?{" "}
                    <span className="text-kva-cream/75">(pick all that apply)</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {visibleServiceOptions.map((opt) => (
                      <label
                        key={opt}
                        className="group flex cursor-pointer items-center gap-3 rounded-xl border border-kva-cream/15 bg-kva-cream/5 px-3 py-2.5 text-sm text-kva-cream/90 transition-colors has-[:checked]:border-kva-gold/60 has-[:checked]:bg-kva-gold/10 has-[:checked]:text-kva-cream focus-within:border-kva-gold/40"
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={opt}
                          className="h-4 w-4 flex-none rounded border-kva-cream/30 bg-kva-cream/5 text-kva-gold focus:ring-kva-gold focus:ring-offset-kva-ink"
                        />
                        <span className="leading-snug">{opt}</span>
                      </label>
                    ))}
                  </div>
                  {state.fieldErrors?.services && (
                    <p id="services-error" className="mt-1.5 text-xs text-kva-gold-deep">
                      {state.fieldErrors.services[0]}
                    </p>
                  )}
                </fieldset>

                <Field
                  label="Anything else?"
                  name="message"
                  as="textarea"
                  rows={4}
                  placeholder="Backyard is about 1/4 acre, want a paver patio off the kitchen door and fresh mulch in the front beds. Available evenings/weekends for a walk-through."
                  error={state.fieldErrors?.message?.[0]}
                />

                <PhotoUploadField
                  disabled={pending}
                  serverError={state.fieldErrors?.photos?.[0]}
                />

                {state.status === "error" && state.message && (
                  <p className="rounded-xl border border-kva-gold-deep/40 bg-kva-gold/10 px-3 py-2 text-sm text-kva-gold">
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-[6px] border border-kva-sage-soft/40 bg-kva-sage px-7 py-3.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-kva-cream transition-colors hover:bg-kva-sage-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-kva-sage focus-visible:ring-offset-2 focus-visible:ring-offset-kva-forest-deep disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {pending ? "Sending…" : "Request Free Walk-Through"}
                  {!pending && <MoveRight className="h-4 w-4" aria-hidden />}
                </button>
                <p className="text-xs text-kva-cream/75">
                  <span className="text-kva-gold">*</span> required. We will not spam you or share your info. One reply within a business day, then a walk-through if you want it.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoUploadField({
  disabled,
  serverError,
}: {
  disabled?: boolean;
  serverError?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [clientError, setClientError] = useState<string>();
  const [isDragging, setIsDragging] = useState(false);
  const error = clientError ?? serverError;
  const errorId = "photos-error";
  const helperId = "photos-helper";

  function syncInputFiles(nextPhotos: File[]) {
    setPhotos(nextPhotos);

    if (!inputRef.current) return;

    const transfer = new DataTransfer();
    nextPhotos.forEach((file) => transfer.items.add(file));
    inputRef.current.files = transfer.files;
  }

  function addPhotos(files: FileList | File[]) {
    const nextPhotos = [...photos, ...Array.from(files)];
    const validationError = getPhotoValidationError(nextPhotos);

    if (validationError) {
      setClientError(validationError);
      syncInputFiles(photos);
      return;
    }

    setClientError(undefined);
    syncInputFiles(nextPhotos);
  }

  function removePhoto(index: number) {
    const nextPhotos = photos.filter((_, photoIndex) => photoIndex !== index);
    setClientError(undefined);
    syncInputFiles(nextPhotos);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.currentTarget.files) return;
    addPhotos(event.currentTarget.files);
  }

  function handleDragOver(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (disabled) return;
    event.dataTransfer.dropEffect = "copy";
    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDragging(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    if (disabled || event.dataTransfer.files.length === 0) return;
    addPhotos(event.dataTransfer.files);
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl border border-dashed p-4 transition-colors ${
          isDragging
            ? "border-kva-gold bg-kva-gold/10"
            : "border-kva-cream/20 bg-kva-cream/[0.035]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          name="photos"
          multiple
          accept="image/*,.heic,.heif"
          onChange={handleChange}
          aria-describedby={`${helperId}${error ? ` ${errorId}` : ""}`}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-kva-cream">Photos</p>
            <p id={helperId} className="mt-1 text-xs leading-relaxed text-kva-cream/75">
              JPEG, PNG, HEIC, or WebP. Up to 5 photos, 5 MB each.
            </p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={disabled}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-kva-cream/20 bg-kva-cream/10 px-4 py-2 text-sm font-medium text-kva-cream transition-colors hover:border-kva-gold/50 hover:bg-kva-gold/15 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ImagePlus className="h-4 w-4 text-kva-gold" aria-hidden />
            Add photos (optional)
          </button>
        </div>

        {photos.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {photos.map((photo, index) => (
              <li
                key={`${photo.name}-${photo.size}-${photo.lastModified}-${index}`}
                className="inline-flex max-w-full items-center gap-2 rounded-full border border-kva-cream/15 bg-kva-ink/45 px-3 py-1.5 text-xs text-kva-cream/85"
              >
                <span className="max-w-56 truncate">{photo.name}</span>
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  disabled={disabled}
                  aria-label={`Remove ${photo.name}`}
                  className="rounded-full p-0.5 text-kva-cream/60 transition-colors hover:bg-kva-cream/10 hover:text-kva-cream disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-kva-gold-deep">
          {error}
        </p>
      )}
    </div>
  );
}

function getPhotoValidationError(photos: File[]) {
  if (photos.length > MAX_PHOTO_COUNT) {
    return "Add up to 5 photos.";
  }

  const oversized = photos.find((photo) => photo.size > MAX_PHOTO_SIZE_BYTES);
  if (oversized) {
    return `${oversized.name} is over 5 MB.`;
  }

  const unsupported = photos.find((photo) => !isAcceptedPhoto(photo));
  if (unsupported) {
    return `${unsupported.name} must be a JPEG, PNG, HEIC, or WebP image.`;
  }

  return undefined;
}

function isAcceptedPhoto(photo: File) {
  if (ACCEPTED_PHOTO_TYPES.has(photo.type)) return true;

  const name = photo.name.toLowerCase();
  return ACCEPTED_PHOTO_EXTENSIONS.some((extension) => name.endsWith(extension));
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  helper,
  as,
  rows,
  autoComplete,
  inputMode,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  helper?: string;
  as?: "input" | "textarea";
  rows?: number;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "url" | "search" | "numeric" | "decimal" | "none";
}) {
  const errId = `${name}-error`;
  const helperId = `${name}-helper`;
  const describedBy = [error ? errId : null, helper ? helperId : null].filter(Boolean).join(" ") || undefined;
  const fieldClass =
    "block w-full rounded-xl border border-kva-cream/15 bg-kva-cream/[0.06] px-4 py-3 text-[15px] text-kva-cream placeholder:text-kva-cream/45 transition-colors focus:border-kva-gold/60 focus:bg-kva-cream/[0.08] focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-kva-cream">
        {label}
        {required && <span className="ml-1 text-kva-gold" aria-hidden>*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={fieldClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={fieldClass}
        />
      )}
      {helper && !error && (
        <p id={helperId} className="mt-1.5 text-xs text-kva-cream/75">{helper}</p>
      )}
      {error && (
        <p id={errId} className="mt-1.5 text-xs text-kva-gold-deep">{error}</p>
      )}
    </label>
  );
}
