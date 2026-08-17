import { useState, type FormEvent } from "react";
import { Reveal } from "./reveal";

const EMAIL = "kbulugbek@gmail.com";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim().slice(0, 100);
    const email = String(data.get("email") ?? "").trim().slice(0, 255);
    const company = String(data.get("company") ?? "").trim().slice(0, 120);
    const type = String(data.get("type") ?? "").trim();
    const message = String(data.get("message") ?? "").trim().slice(0, 2000);

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      `Project type: ${type}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `New enquiry — ${type} — ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <section id="contact" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Want to grow your business?</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Tell me about your product, your market and what you want paid media to do. I&apos;ll come back with
            an honest view on whether I can help and how I&apos;d approach it.
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
                <select id="type" name="type" required defaultValue="Meta Ads Management" className={field}>
                  <option>Meta Ads Management</option>
                  <option>B2B Campaign</option>
                  <option>Consulting</option>
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
              className="mt-6 w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep sm:w-auto"
            >
              Send message
            </button>
            {sent ? (
              <p className="mt-4 text-sm text-muted-foreground" role="status">
                Your email app should now be open with the message ready to send. If nothing happened, write to{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-primary">{EMAIL}</a>.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}