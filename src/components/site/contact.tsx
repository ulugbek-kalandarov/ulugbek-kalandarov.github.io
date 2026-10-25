import { useEffect, useRef, useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { useLanguage } from "@/i18n/provider";
import { translations } from "@/i18n/translations";
import { englishProjectType, fillText } from "@/i18n/language";

const EMAIL = "kbulugbek@gmail.com";
const WEB3FORMS_KEY = "3c6dbbaf-5947-469b-91bf-793165cbcf30";

export function Contact() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [firstName, setFirstName] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (status === "sent") headingRef.current?.focus();
  }, [status]);

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
          project_type: englishProjectType(String(data.get("type") ?? "").trim()),
          language: lang,
          message: String(data.get("message") ?? "").trim().slice(0, 2000),
          botcheck: data.get("botcheck") ? "on" : "",
        }),
      });
      const json = await res.json().catch(() => null);
      if (!json || json.success !== true) throw new Error("failed");
      setFirstName(name.split(/\s+/)[0] ?? "");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const sendAnother = () => {
    setFirstName("");
    setStatus("idle");
  };

  const field =
    "contact-field w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground";
  const label = "mb-1.5 block text-xs font-semibold text-muted-foreground";

  return (
    <section id="contact" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.contact.heading}</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {t.contact.intro}
          </p>

          <dl className="mt-8 space-y-4 text-sm">
            <div>
              <dt className={label}>{t.contact.emailLabel}</dt>
              <dd>
                <a href={`mailto:${EMAIL}`} className="font-medium text-foreground hover:text-link">
                  {EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>{t.contact.phoneLabel}</dt>
              <dd>
                <a href="tel:+821027121929" className="font-medium text-foreground hover:text-link">
                  +82-10-2712-1929
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>{t.contact.linkedinLabel}</dt>
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
          {status === "sent" ? (
            <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
              <svg className="success-check h-6 w-6 text-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path className="check-short" d="M4 12l5 5" /><path className="check-long" d="M9 17L20 6" /></svg>
              <h3
                ref={headingRef}
                tabIndex={-1}
                className="mt-4 text-2xl font-semibold text-foreground outline-none focus:outline-none"
              >
                {firstName ? fillText(t.contact.success.headingWithName, { name: firstName }) : t.contact.success.heading}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {t.contact.success.body}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {t.contact.success.urgent.split("{email}")[0]}
                <a href={`mailto:${EMAIL}`} className="font-medium text-link hover:text-foreground">
                  {EMAIL}
                </a>
                {t.contact.success.urgent.split("{email}")[1]}
              </p>
              <Button variant="outline"
                type="button"
                onClick={sendAnother}
                className="mt-6 h-auto rounded-[6px] border border-border bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground shadow-none hover:border-primary hover:bg-transparent hover:text-link"
              >
                {t.contact.success.sendAnother}
              </Button>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="rounded-lg border border-border bg-card p-6 sm:p-8"
            >
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="contact-field-wrap">
                  <label className={label} htmlFor="name">{t.contact.form.name}</label>
                  <input id="name" name="name" required maxLength={100} className={field} placeholder={t.contact.form.namePlaceholder} />
                </div>
                <div className="contact-field-wrap">
                  <label className={label} htmlFor="email">{t.contact.form.email}</label>
                  <input id="email" name="email" type="email" required maxLength={255} className={field} placeholder={t.contact.form.emailPlaceholder} />
                </div>
                <div className="contact-field-wrap sm:col-span-2">
                  <label className={label} htmlFor="company">{t.contact.form.company} <span className="normal-case">{t.contact.form.optional}</span></label>
                  <input id="company" name="company" maxLength={120} className={field} placeholder={t.contact.form.companyPlaceholder} />
                </div>
                <div className="contact-field-wrap sm:col-span-2">
                  <label className={label} htmlFor="type">{t.contact.form.type}</label>
                  <select id="type" name="type" required className={field}>
                    {t.contact.form.typeOptions.map((option, i) => <option key={i} value={translations.en.contact.form.typeOptions[i]}>{option}</option>)}
                  </select>
                </div>
                <div className="contact-field-wrap sm:col-span-2">
                  <label className={label} htmlFor="message">{t.contact.form.message}</label>
                  <textarea id="message" name="message" required rows={5} maxLength={2000} className={field} placeholder={t.contact.form.messagePlaceholder} />
                </div>
              </div>

               <Button
                type="submit"
                disabled={status === "sending"}
                 className="mt-6 h-auto w-full rounded-[6px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-none hover:bg-primary-deep disabled:opacity-60 sm:w-auto"
                 aria-busy={status === "sending"}
              >
                 {status === "sending" && <LoaderCircle className="sending-spinner size-4" aria-hidden="true" />}
                 {status === "sending" ? t.contact.form.sending : t.contact.form.send}
               </Button>
              {status === "error" ? (
                <p className="mt-4 text-sm text-destructive" role="alert">
                  {t.contact.form.error.split("{email}")[0]}
                  <a href={`mailto:${EMAIL}`} className="font-medium text-link hover:text-foreground">{EMAIL}</a>{t.contact.form.error.split("{email}")[1]}
                </p>
              ) : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
