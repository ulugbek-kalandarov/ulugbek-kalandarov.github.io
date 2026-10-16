import { useState, type FormEvent } from "react";
import { Reveal } from "./reveal";

const EMAIL = "kbulugbek@gmail.com";
const WEB3FORMS_KEY = "3c6dbbaf-5947-469b-91bf-793165cbcf30";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim().slice(0, 100);
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "New portfolio message from " + name,
          from_name: "Portfolio contact form",
          name,
          email: String(data.get("email") ?? "").trim().slice(0, 255),
          company: String(data.get("company") ?? "").trim().slice(0, 120),
          project_type: String(data.get("type") ?? "").trim(),
          message: String(data.get("message") ?? "").trim().slice(0, 2000),
          botcheck: data.get("botcheck") ? "on" : "",
        }),
      });
      const json = await res.json().catch(() => null);
      if (!json || json.success !== true) throw new Error("failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const field =
    "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";
  const label = "mb-1.5 block text-xs font-semibold text-muted-foreground";

  return (
    <section id="contact" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Want to grow your business? </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Hiring for a marketing role or need help with paid media? Tell me what you&apos;re looking for and
            I&apos;ll get back to you.
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className={label}>Email</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="font-medium text-foreground hover:text-link">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>Phone</dt>
              <dd>
                <a href="tel:+821027121929" className="font-medium text-foreground hover:text-link">
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
                  className="font-medium text-foreground hover:text-link"
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
            className="rounded-lg border border-border bg-card p-6 sm:p-8"
          >
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
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
              className="mt-6 w-full rounded-[6px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? "Sending…" : "Send message"}
            </button>
            {status === "sent" ? (
              <p className="mt-4 text-sm text-muted-foreground" role="status">
                Thanks — your message has been received. I&apos;ll reply to you shortly. You can also reach me at{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-link hover:text-foreground">{EMAIL}</a>.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="mt-4 text-sm text-destructive" role="alert">
                Something went wrong sending your message. Please email me directly at{" "}
                <a href={`mailto:${EMAIL}`} className="font-medium text-link hover:text-foreground">{EMAIL}</a>.
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  );
}