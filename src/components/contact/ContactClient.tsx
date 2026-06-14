"use client";

import { useState, useId } from "react";
import { siteConfig } from "@/config/site";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
  _hp: string; // honeypot
}

interface FieldError {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const CATEGORIES = [
  { value: "General Question", icon: "💬" },
  { value: "Technical Issue", icon: "🔧" },
  { value: "Content Feedback", icon: "📝" },
  { value: "Billing & Subscription", icon: "💳" },
  { value: "Partnership / Collaboration", icon: "🤝" },
  { value: "Faculty Query", icon: "🎓" },
  { value: "Other", icon: "📌" },
];

const FAQS = [
  {
    q: "How do I report a mistake in a theory or solution?",
    a: "Use the Content Feedback category and mention the chapter name and section. We review every submission and publish corrections within 48 hours.",
  },
  {
    q: "Is there a free plan available?",
    a: "Yes. Core theory, formula sheets, and a selection of practice questions are free. Full PYQ access, mock tests, and AI Tutor require a subscription.",
  },
  {
    q: "How does the AI Tutor work?",
    a: "The AI Tutor is powered by Anthropic Claude. It answers Physics doubts, explains derivations step-by-step, and can quiz you on any topic — all within the context of JEE and NEET syllabi.",
  },
  {
    q: "Can I access the platform on mobile?",
    a: "Absolutely. The platform is fully responsive. A dedicated Android/iOS app is on the roadmap for a future phase.",
  },
  {
    q: "How quickly do you respond to support emails?",
    a: "We aim to reply to all support queries within 24 hours on weekdays. For urgent technical issues, mention 'URGENT' in the subject line.",
  },
  {
    q: "Do you offer group or school plans?",
    a: "Yes — we offer customised plans for coaching institutes and schools. Reach out via the Partnership category and we will get back to you within 2 business days.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Validation
// ─────────────────────────────────────────────────────────────────────────────
function validate(data: FormData): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim() || data.name.trim().length < 2)
    errors.name = "Please enter your full name.";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email address.";
  if (!data.subject.trim() || data.subject.trim().length < 5)
    errors.subject = "Subject must be at least 5 characters.";
  if (!data.message.trim() || data.message.trim().length < 20)
    errors.message = "Message must be at least 20 characters.";
  return errors;
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────────────────────
export function ContactClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <div className="border-b bg-white">
        <div className="container mx-auto max-w-5xl px-4 py-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
            Get in touch
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            We&apos;re here to help
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg text-slate-500">
            Have a question, spotted an error, or want to collaborate? Fill in
            the form below — we typically reply within{" "}
            <span className="font-medium text-slate-700">24 hours</span>.
          </p>
        </div>
      </div>

      {/* ── MAIN GRID ────────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Left: info + FAQ */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <ContactInfo />
            <FAQ />
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// Contact Info Card
// =============================================================================
function ContactInfo() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-5">
      <h2 className="text-base font-bold text-slate-900">Contact details</h2>

      {/* Email */}
      <a
        href={`mailto:${siteConfig.contact.supportEmail}`}
        className="flex items-start gap-3 group"
      >
        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
        </span>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Email support</p>
          <p className="text-sm font-medium text-slate-800 group-hover:text-indigo-600 transition-colors">
            {siteConfig.contact.supportEmail}
          </p>
        </div>
      </a>

      {/* Response time */}
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 flex-shrink-0">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </span>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Response time</p>
          <p className="text-sm font-medium text-slate-800">Within 24 hours</p>
          <p className="text-xs text-slate-400">Mon – Sat, 9 AM – 9 PM IST</p>
        </div>
      </div>

      {/* Telegram placeholder */}
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-sky-50 text-sky-600 flex-shrink-0">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
          </svg>
        </span>
        <div>
          <p className="text-xs text-slate-400 mb-0.5">Telegram community</p>
          <p className="text-sm font-medium text-slate-800">Coming soon</p>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <p className="text-xs text-slate-400 leading-relaxed">
          For urgent bugs or billing issues, add{" "}
          <span className="font-mono bg-slate-50 px-1 py-0.5 rounded text-slate-600">
            URGENT
          </span>{" "}
          to the subject line and we&apos;ll prioritise your ticket.
        </p>
      </div>
    </div>
  );
}

// =============================================================================
// FAQ Accordion
// =============================================================================
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-bold text-slate-900 mb-4">
        Frequently asked questions
      </h2>
      <div className="flex flex-col divide-y divide-slate-100">
        {FAQS.map((faq, i) => (
          <div key={i} className="py-3">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-start justify-between gap-3 text-left"
            >
              <span className="text-sm font-medium text-slate-800 leading-snug">
                {faq.q}
              </span>
              <span
                className={`mt-0.5 flex-shrink-0 h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  open === i ? "rotate-180" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </button>
            {open === i && (
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Contact Form
// =============================================================================
function ContactForm() {
  const id = useId();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    category: "General Question",
    subject: "",
    message: "",
    _hp: "",
  });
  const [errors, setErrors] = useState<FieldError>({});
  const [state, setState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState("");

  function set(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field as keyof FieldError]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setState("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error ?? "Something went wrong. Please try again.");
        setState("error");
      } else {
        setState("success");
      }
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setState("error");
    }
  }

  // ── SUCCESS STATE ──────────────────────────────────────────────────────────
  if (state === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10 shadow-sm flex flex-col items-center text-center gap-4 min-h-[420px] justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-8 w-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-emerald-900">
          Message sent — thank you!
        </h2>
        <p className="text-sm text-emerald-700 max-w-xs leading-relaxed">
          We&apos;ve received your message and will reply to{" "}
          <span className="font-medium">{form.email}</span> within 24 hours.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm({
              name: "", email: "", category: "General Question",
              subject: "", message: "", _hp: "",
            });
          }}
          className="mt-2 px-5 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  // ── FORM ──────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col gap-5"
    >
      <h2 className="text-base font-bold text-slate-900">Send us a message</h2>

      {/* Name + Email row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field
          id={`${id}-name`}
          label="Your name"
          required
          error={errors.name}
        >
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Abdullah Khan"
            className={inputCls(!!errors.name)}
          />
        </Field>

        <Field
          id={`${id}-email`}
          label="Email address"
          required
          error={errors.email}
        >
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
            className={inputCls(!!errors.email)}
          />
        </Field>
      </div>

      {/* Category */}
      <Field id={`${id}-category`} label="Category">
        <div className="flex flex-wrap gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => set("category", cat.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                form.category === cat.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.value}
            </button>
          ))}
        </div>
      </Field>

      {/* Subject */}
      <Field
        id={`${id}-subject`}
        label="Subject"
        required
        error={errors.subject}
      >
        <input
          id={`${id}-subject`}
          type="text"
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          placeholder="e.g. Error in Current Electricity — Section 5.3"
          className={inputCls(!!errors.subject)}
        />
      </Field>

      {/* Message */}
      <Field
        id={`${id}-message`}
        label="Message"
        required
        error={errors.message}
        hint={`${form.message.length} / 20 min`}
      >
        <textarea
          id={`${id}-message`}
          rows={6}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Describe your query in detail. The more context you provide, the faster we can help."
          className={`${inputCls(!!errors.message)} resize-none`}
        />
      </Field>

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        name="_hp"
        value={form._hp}
        onChange={(e) => set("_hp", e.target.value)}
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden"
        autoComplete="off"
      />

      {/* Server error */}
      {state === "error" && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "submitting"}
        className="flex items-center justify-center gap-2 w-full rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm"
      >
        {state === "submitting" ? (
          <>
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            Sending…
          </>
        ) : (
          <>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
            </svg>
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-slate-400 text-center">
        By submitting, you agree to our{" "}
        <a href="/privacy" className="underline hover:text-slate-600">Privacy Policy</a>.
        We never share your information.
      </p>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Field wrapper
// ─────────────────────────────────────────────────────────────────────────────
function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-0.5 text-red-500">*</span>}
        </label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-600">
          <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400",
    "focus:outline-none focus:ring-2 transition-all bg-white",
    hasError
      ? "border-red-300 focus:ring-red-200 focus:border-red-400"
      : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-400",
  ].join(" ");
}
