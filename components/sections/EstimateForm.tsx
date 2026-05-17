"use client";

import { useActionState } from "react";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { submitEstimate, type EstimateState } from "@/app/actions/submit-estimate";
import { content } from "@/lib/content";

const initialState: EstimateState = { status: "idle" };

export function EstimateForm() {
  const [state, formAction, pending] = useActionState(submitEstimate, initialState);
  const { estimate_form, business } = content;

  return (
    <section
      id="estimate"
      className="relative scroll-mt-24 overflow-hidden bg-kva-ink py-24 text-kva-cream sm:py-28 lg:py-32"
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
              <p className="ml-7 text-xs text-kva-cream/65">Text or call is fine — whichever you prefer.</p>
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
                    error={state.fieldErrors?.name?.[0]}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="(703) 555-0100"
                    error={state.fieldErrors?.phone?.[0]}
                  />
                </div>
                <Field
                  label="Property address"
                  name="address"
                  required
                  placeholder="123 Main St, Sterling VA 20165"
                  error={state.fieldErrors?.address?.[0]}
                />
                <Field
                  label="Email (optional)"
                  name="email"
                  type="email"
                  error={state.fieldErrors?.email?.[0]}
                />

                <fieldset>
                  <legend className="mb-2 block text-sm font-medium text-kva-cream">
                    What do you need?{" "}
                    <span className="text-kva-cream/60">(pick all that apply)</span>
                  </legend>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {estimate_form.fields
                      .find((f) => f.name === "services")
                      ?.options?.map((opt) => (
                        <label
                          key={opt}
                          className="group flex cursor-pointer items-center gap-3 rounded-xl border border-kva-cream/15 bg-kva-cream/5 px-3 py-2.5 text-sm text-kva-cream/85 transition-colors has-[:checked]:border-kva-gold/60 has-[:checked]:bg-kva-gold/10 has-[:checked]:text-kva-cream"
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
                    <p className="mt-1.5 text-xs text-kva-gold-deep">
                      {state.fieldErrors.services[0]}
                    </p>
                  )}
                </fieldset>

                <Field
                  label="Anything else? (photos welcome)"
                  name="message"
                  as="textarea"
                  rows={4}
                  placeholder="Backyard is about 1/4 acre, want a paver patio off the kitchen door and fresh mulch in the front beds. Available evenings/weekends for a walk-through."
                  error={state.fieldErrors?.message?.[0]}
                />

                {state.status === "error" && state.message && (
                  <p className="rounded-xl border border-kva-gold-deep/40 bg-kva-gold/10 px-3 py-2 text-sm text-kva-gold">
                    {state.message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-kva-gold px-6 py-3.5 text-base font-medium text-kva-ink shadow-lg shadow-kva-gold/20 transition-all hover:bg-kva-gold-deep hover:text-kva-cream hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {pending ? "Sending…" : "Send"}
                  {!pending && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
                </button>
                <p className="text-xs text-kva-cream/55">
                  We will not spam you or share your info. One reply within a business day, then a walk-through if you want it.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  as,
  rows,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  as?: "input" | "textarea";
  rows?: number;
}) {
  const fieldClass =
    "block w-full rounded-xl border border-kva-cream/15 bg-kva-cream/[0.06] px-4 py-3 text-[15px] text-kva-cream placeholder:text-kva-cream/40 transition-colors focus:border-kva-gold/60 focus:bg-kva-cream/[0.08] focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-kva-cream">
        {label}
        {required && <span className="ml-1 text-kva-gold">*</span>}
      </span>
      {as === "textarea" ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className={fieldClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={fieldClass}
        />
      )}
      {error && <p className="mt-1.5 text-xs text-kva-gold-deep">{error}</p>}
    </label>
  );
}
