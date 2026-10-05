import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Reveal } from "./reveal";
import { submitContact } from "@/lib/contact.functions";

const EMAIL = "kbulugbek@gmail.com";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const send = useServerFn(submitContact);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      await send({
        data: {
          name: String(data.get("name") ?? "").trim().slice(0, 100),
          email: String(data.get("email") ?? "").trim().slice(0, 255),
          company: String(data.get("company") ?? "").trim().slice(0, 120),
          type: String(data.get("type") ?? "").trim(),
          message: String(data.get("message") ?? "").trim().slice(0, 2000),
        },
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <section id="contact" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Let&apos;s work together</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Hiring for a marketing role or need help with paid media? Tell me what you&apos;re looking for and
            I&apos;ll get back to you.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className={label}>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="font-medium text-foreground hover:text-primary">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Phone</dt>
              <dd>
                <a href="tel:+821027121929" className="font-medium text-foreground hover:text-primary">
                  +82-10-2712-1929
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>LinkedIn</dt>
              <dd>
                <a
                  href="https://linkedin.com/in/ulugbek-kalandarov"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-foreground hover:text-primary"
                >
                  linkedin.com/in/ulugbek-kalandarov
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={90}>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className={label} htmlFor="name">Name</label>
                <input id="name" name="name" required maxLength={100} className={field} placeholder="Your name" />
              </div>
              <div>
                <label className={label} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required maxLength={255} className={field} placeholder="you@company.com" />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="company">Company <span className="normal-case">(optional)</span></label>
                <input id="company" name="company" maxLength={120} className={field} placeholder="Company name" />
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="type">Project type</label>
                <select id="type" name="type" required className={field}>
                  <option>Job / internship opportunity</option>
                  <option>Meta Ads Management</option>
                  <option>B2B Campaign</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={label} htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={5} maxLength={2000} className={field} placeholder="What are you trying to achieve?" />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" ? (
              <p className="mt-4 text-sm text-muted-foreground" role="status">
                Thanks — your message has been received. I&apos;ll reply to you shortly. You can also reach me at{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-primary">{EMAIL}</a>.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-destructive" role="alert">
                Something went wrong sending your message. Please email me directly at{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-primary">{EMAIL}</a>.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}