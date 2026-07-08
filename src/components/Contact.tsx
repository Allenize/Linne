"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail, ArrowUpRight, Send, CheckCircle, Phone, MapPin, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import Script from "next/script";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      render: (
        container: HTMLElement,
        parameters: {
          sitekey: string;
          size?: "invisible";
          callback?: (token: string) => void;
        }
      ) => number;
      execute: (widgetId?: number) => void;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
    };
  }
}

const EMAILJS_SERVICE_ID = "service_qoh6pio";
const EMAILJS_TEMPLATE_ID = "template_kpcp90f";
const EMAILJS_PUBLIC_KEY = "dY0Ki_rxnlVV4B3XS";

// Minimum time a real visitor needs to fill out the form. Bots that submit
// instantly on page load get silently rejected.
const MIN_FILL_TIME_MS = 2000;
// Prevents the same browser from firing off repeated submissions.
const SUBMIT_COOLDOWN_MS = 30000;
const LAST_SUBMIT_KEY = "contact_last_submit";

// Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your .env.local once you've created
// a reCAPTCHA v2 site at https://www.google.com/recaptcha/admin/create.
// Until it's set, the form works exactly as before — the widget only
// appears and gets enforced once a key is configured.
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const GitHubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const contactLinks = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "johnallenguerra@gmail.com",
    href: "mailto:johnallenguerra@gmail.com",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: "+63 967 792 4819",
    href: "tel:+639677924819",
    isPhone: true,
  },
  {
    icon: <GitHubIcon size={18} />,
    label: "GitHub",
    value: "github.com/Allenize",
    href: "https://github.com/Allenize",
  },
  {
    icon: <LinkedInIcon size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/guerra-john-allen",
    displayValue: "linkedin.com/in/guerra-john-allen-a-0765743ba/",
    href: "https://www.linkedin.com/in/guerra-john-allen-a-0765743ba/",
  },
];

const isMobileDevice = () => {
  if (typeof navigator === "undefined") return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  // The invisible reCAPTCHA callback is registered once when the widget
  // renders, so it would otherwise always see the form's initial empty
  // values. This ref always holds the latest values for it to read.
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current = form;
  }, [form]);
  // Honeypot: a field real visitors never see or fill, but bots that
  // auto-fill every input on the page will.
  const [honeypot, setHoneypot] = useState("");
  // Timestamp the form mounted, used to catch bots that submit instantly.
  const mountedAtRef = useRef(Date.now());
  // Where the invisible reCAPTCHA badge gets rendered, and the id Google
  // assigns it so we can trigger/reset it.
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetIdRef = useRef<number | null>(null);

  const handleRecaptchaScriptLoad = () => {
    window.grecaptcha?.ready(() => {
      if (
        RECAPTCHA_SITE_KEY &&
        recaptchaContainerRef.current &&
        recaptchaWidgetIdRef.current === null
      ) {
        recaptchaWidgetIdRef.current = window.grecaptcha!.render(
          recaptchaContainerRef.current,
          {
            sitekey: RECAPTCHA_SITE_KEY,
            size: "invisible",
            callback: sendMessage,
          }
        );
      }
    });
  };

  // Runs once a reCAPTCHA token is available (or immediately, with an empty
  // token, if no site key is configured yet) and actually sends the email.
  const sendMessage = async (recaptchaToken: string) => {
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formRef.current.name,
          from_email: formRef.current.email,
          message: formRef.current.message,
          ...(recaptchaToken ? { "g-recaptcha-response": recaptchaToken } : {}),
        },
        EMAILJS_PUBLIC_KEY
      );
      window.grecaptcha?.reset(recaptchaWidgetIdRef.current ?? undefined);
      localStorage.setItem(LAST_SUBMIT_KEY, String(Date.now()));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      window.grecaptcha?.reset(recaptchaWidgetIdRef.current ?? undefined);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handlePhoneClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { value: string; label: string }
  ) => {
    if (!isMobileDevice()) {
      e.preventDefault();
      navigator.clipboard.writeText(link.value).then(() => {
        setCopiedLabel(link.label);
        setTimeout(() => setCopiedLabel(null), 2000);
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    // Honeypot tripped — silently pretend it worked so the bot moves on,
    // without actually sending anything or revealing it was caught.
    if (honeypot) {
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    // Submitted too fast to be a human filling out three fields.
    if (Date.now() - mountedAtRef.current < MIN_FILL_TIME_MS) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    // Cooldown to stop the same browser from firing off repeated sends.
    const lastSubmit = Number(localStorage.getItem(LAST_SUBMIT_KEY) || 0);
    if (Date.now() - lastSubmit < SUBMIT_COOLDOWN_MS) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    // This runs the invisible reCAPTCHA check. Most of the time it resolves
    // silently and goes straight to sendMessage via the callback; a popup
    // challenge only appears if Google's risk check flags something.
    if (RECAPTCHA_SITE_KEY && recaptchaWidgetIdRef.current !== null) {
      window.grecaptcha?.execute(recaptchaWidgetIdRef.current);
    } else {
      // No site key configured yet — send directly, same as before.
      sendMessage("");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 bg-stone-50 overflow-x-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.25em] uppercase text-stone-400">
            06 / Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Say Hello form */}
          {/* min-w-0 stops this grid item from growing past its track based on
              content size, which is what was pushing the whole max-w-6xl
              container (and everything in it) wider than the viewport on mobile */}
          <div className="min-w-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as const }}
              className="font-serif text-4xl md:text-5xl font-normal text-stone-900 leading-tight mb-6"
            >
              Let&apos;s build
              <br />
              <span className="italic text-stone-400">something great.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-stone-500 leading-relaxed max-w-md mb-2"
            >
              I&apos;m actively looking for full-time opportunities where I can
              apply my IT skills and continue growing. Whether you have a role
              in mind or just want to connect, feel free to reach out anytime.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="text-stone-400 text-sm mb-8 flex items-center gap-1.5"
            >
              <MapPin size={13} className="text-stone-400 shrink-0" />
              San Pablo, Laguna, Philippines
            </motion.p>

            {/* Say Hello Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="bg-white rounded-2xl border border-stone-100 p-5 sm:p-6 shadow-sm"
            >
              <h3 className="font-serif text-lg text-stone-700 uppercase tracking-widest mb-5 flex items-center gap-2">
                <Mail size={14} className="text-stone-400" />
                Say Hello
              </h3>

              <div className="space-y-4">
                {/* Honeypot field — invisible and unreachable to real users,
                    but bots that auto-fill every input will trip it. */}
                <input
                  type="text"
                  name="company"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    opacity: 0,
                  }}
                />

                {/* FIX: grid-cols-1 on mobile, grid-cols-2 on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-stone-400 mb-1.5 tracking-wide uppercase">
                      Your Name
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Allen Guerra"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all bg-stone-50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1.5 tracking-wide uppercase">
                      Your Email
                    </label>
                    <input
                      suppressHydrationWarning
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all bg-stone-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-400 mb-1.5 tracking-wide uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm text-stone-800 placeholder-stone-300 focus:outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition-all bg-stone-50 resize-none"
                  />
                </div>

                {RECAPTCHA_SITE_KEY && (
                  <>
                    <Script
                      src="https://www.google.com/recaptcha/api.js"
                      strategy="afterInteractive"
                      onLoad={handleRecaptchaScriptLoad}
                    />
                    {/* Hides Google's floating "protected by reCAPTCHA" badge.
                        visibility: hidden (not display: none) keeps it
                        functional — Google still needs it in the DOM, just
                        not visible. Since we're hiding it, Google's terms
                        require the text disclosure below instead. */}
                    <style>{`.grecaptcha-badge { visibility: hidden; }`}</style>
                    <div className="flex justify-center">
                      <div ref={recaptchaContainerRef} />
                    </div>
                    <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-stone-600"
                      >
                        Privacy Policy
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://policies.google.com/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:text-stone-600"
                      >
                        Terms of Service
                      </a>{" "}
                      apply.
                    </p>
                  </>
                )}

                <button
                  suppressHydrationWarning
                  onClick={handleSubmit}
                  disabled={!form.name || !form.email || !form.message || status === "sending"}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 shadow-sm ${
                    status === "sent"
                      ? "bg-green-600 text-white"
                      : status === "error"
                      ? "bg-red-500 text-white"
                      : "bg-stone-900 text-white hover:bg-stone-700 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  }`}
                >
                  {status === "sent" ? (
                    <>
                      <CheckCircle size={15} />
                      Message Sent!
                    </>
                  ) : status === "error" ? (
                    <>
                      <AlertCircle size={15} />
                      Failed. Try again.
                    </>
                  ) : status === "sending" ? (
                    <>
                      <Send size={15} className="animate-pulse" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right: Contact links */}
          <div className="min-w-0 space-y-4">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                onClick={
                  link.isPhone ? (e) => handlePhoneClick(e, link) : undefined
                }
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.1,
                  ease: "easeOut" as const,
                }}
                className="flex items-center gap-4 p-4 sm:p-5 bg-white rounded-2xl border border-stone-100 hover:border-stone-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-600 group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-300 flex-shrink-0">
                  {link.icon}
                </div>
                {/* FIX: min-w-0 + overflow-hidden ensures text truncation works correctly */}
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="text-xs tracking-widest uppercase text-stone-400">
                    {link.label}
                  </div>
                  <p className="text-sm font-medium text-stone-800 truncate mt-0.5">
                    {"displayValue" in link ? link.displayValue : link.value}
                  </p>
                  {link.isPhone && copiedLabel === link.label && (
                    <p className="text-xs text-stone-400 mt-0.5">
                      Copied to clipboard!
                    </p>
                  )}
                </div>
                <ArrowUpRight
                  size={16}
                  className="text-stone-300 group-hover:text-stone-700 transition-colors flex-shrink-0"
                />
              </motion.a>
            ))}

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" as const }}
              className="flex items-center justify-center gap-3 p-4 bg-stone-100 rounded-2xl border border-stone-200"
            >
              <div className="min-w-0 text-center">
                <p className="font-serif text-sm text-stone-600 tracking-wide">Currently open to full-time roles, freelance work, and creative collaborations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}