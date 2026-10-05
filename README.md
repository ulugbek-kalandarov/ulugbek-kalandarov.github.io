# Digital Portfolio

Build a professional, formal, and visually polished personal portfolio website for a performance marketer. This site's primary goal is to attract freelance and contract clients who need Meta Ads / performance marketing help. It is NOT an event-planner or MICE-industry site — marketing execution and paid media results are the lead story. Event work only appears as visual proof of experience delivering for real international clients.

## Overall style
- Clean, modern, confident — think a boutique growth-marketing consultancy, not a personal blog.
- Neutral, premium palette (off-white/charcoal base with one accent color — deep blue, emerald, or similar). No default purple/violet gradients.
- Strong typographic hierarchy, generous whitespace, subtle scroll-triggered fade/slide-in animations. Nothing gimmicky.
- Fully responsive: mobile-first, but every section must look intentional on desktop too.

## Site structure (single-page, sectioned, with sticky nav)

### 1. Hero / Introduction
- Left (or top on mobile): Professional headshot photo of me, circular or soft-rounded frame.
- Right: Name "Ulugbek Kalandarov," a one-line positioning statement leading with performance marketing (e.g. "Performance Marketer specializing in Meta Ads & B2B growth campaigns" — write 2-3 polished alternatives I can pick from), and a 2-sentence intro paragraph.
- Primary CTA button: "Get in Touch" (scrolls to Contact form).
- Secondary CTA: "See My Work" (scrolls to Case Studies/Proof section).

### 2. What I Do (services / positioning)
Three or four cards, icon + short description, in this order of emphasis:
1. Meta Ads Management (Facebook & Instagram) — campaign planning, funnel setup, optimization, reporting
2. B2B Marketing Campaigns — outreach, partnership development, lead acquisition
3. Cross-Cultural Digital Marketing — campaigns adapted across Korean, English, Uzbek, Turkish markets
4. Growth Strategy & Reporting — data-driven optimization, performance reporting

### 3. Results / Proof (Meta Ads screenshot section)
- A dedicated, visually prominent section titled something like "Real Campaign Performance."
- One large image placeholder for a Meta Ads Manager results screenshot, framed like a browser window or dashboard card with subtle shadow — make it look like credible, real data, not decorative.
- A short supporting line of text beside/below it giving context on the campaign (platform, campaign type) — no specific performance numbers or stats.

### 4. Experience (concise, professional timeline)
Vertical or horizontal timeline, most recent first:
- **Marketing Assistant — W Korea** (Feb 2026–Present): Global marketing strategy for MICE, cultural, and entertainment events; B2B campaigns acquiring international partnerships across US/Europe/Asia; institutional partnership proposals; Meta Ads execution.
- **Ads Specialist — Access Consulting** (Oct 2024–Mar 2025): Planned and optimized Telegram and Meta ad campaigns for an education consulting agency; lead acquisition and digital advertising.
- One line only, near the bottom, in smaller/muted text: "Also founder of Asia Ballers, a personal sports media project." (Do not expand on this — it is a personal project, not client work, and should not compete visually with the marketing experience above.)

### 5. Event & Client Work Gallery (the photo proof section)
This is the key differentiator section — visual proof I've delivered for real international clients/events through W Korea.
- Section title: something like "Trusted at International Events" or "Field Experience."
- A responsive photo grid/gallery for **8 photos — a mix of 4 horizontal (landscape) and 4 vertical (portrait) orientations**. Requirements:
  - Use a **flexible masonry grid** (CSS columns or grid with `grid-auto-flow: dense` / masonry-style layout) that gracefully handles mixed aspect ratios — NOT a fixed-aspect-ratio grid that would crop or force-fit images.
  - Mobile: 1-2 columns. Tablet: 2-3 columns. Desktop: 3-4 columns.
  - Each image keeps its natural aspect ratio (vertical photos stay tall, horizontal photos stay wide) — no forced cropping to a uniform shape.
  - On click/tap, image opens in a lightbox/modal at larger size.
  - Each photo has a small caption overlay or below-image label naming the event (placeholders below).
- Final event captions to display on the photos, in this order:
  1. Apollo — Korea Private Credit Forum
  2. MLB Breakfast Club Korea
  3. JSW Dulux — Seoul Prestige Club
  4. Charles Monat — 55th Anniversary
  5. AXIS MAX — Gala Dinner
  6. Seoul Indie Beauty Show 2026 (IBS 2026)
  7. BJFEZ Investment Promotion Event
  8. UTAH University — Startup Sprint
- Photo orientation reference (for placeholder sizing only — do not display these labels on the page): photos 1-4 are horizontal/landscape, photos 5-8 are vertical/portrait.
- Use clean placeholder image blocks (gray boxes with a photo icon and the caption) sized to match each photo's orientation above, so I can drag in my real photos afterward in the correct spot.


### 6. Skills strip
A simple horizontal row or tag-cloud of skills: Meta Ads Manager, Campaign Optimization, B2B Outreach, Sponsorship Development, Cross-Cultural Communication, Korean/English/Uzbek/Turkish, Event Marketing Coordination, Data-Driven Reporting.

### 7. Education
Simple line: Inha University — Bachelor's Degree, International Business and Trade (Sep 2023–Present).

### 8. Contact
- Section title: "Want to Grow Your Business?" — a hook-style headline rather than a generic "Contact" label.
- A contact form with fields: Name, Email, Company (optional), Project Type/Budget (dropdown: e.g. "Meta Ads Management," "B2B Campaign," "Consulting," "Other"), Message.
- Submit button sends form data to my email (kbulugbek@gmail.com) — set up using Lovable's supported form-handling/backend method.
- Below the form: my email (kbulugbek@gmail.com), phone (+82-10-2712-1929), and LinkedIn (linkedin.com/in/ulugbek-kalandarov) as direct alternatives.

### 9. Footer
Minimal — name, copyright year, small links to email/LinkedIn.

## Technical requirements
- Fully responsive across mobile, tablet, desktop — pay special attention to the photo gallery reflowing correctly since source photos are a mix of horizontal and vertical orientations.
- Fast-loading, semantic HTML, accessible (alt text placeholders on all images).
- Smooth anchor-link scrolling from nav/CTAs to sections.
- Editable placeholder content clearly marked so I can swap in real photos, stats, and headshot afterward.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ulugbek-kalandarov.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/22c28d2e-4c23-45ba-a25a-207858c43b3a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
