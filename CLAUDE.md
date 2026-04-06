# Thalian Docs — Claude Code Instructions

This repo powers [docs.thalian.ai](https://docs.thalian.ai), built with **MkDocs Material** and deployed via Cloudflare Pages on `git push`.

---

## Page Structure

Every documentation page follows this exact structure:

```markdown
# Page Title

One-sentence or short paragraph describing what this page covers.

---

## First Section

Content...

## Second Section

Content...

---

*Footer line with cross-link to related page.*
```

### Rules:
- **One `#` heading** per page (the page title) — never more than one
- **`---` horizontal rule** immediately after the intro paragraph
- **`---` horizontal rule** before the footer line
- **Footer line** in italics with a cross-link to the most relevant related page, e.g.: `*For information on X, see [Page Name](./page-name.md).*`
- Sections use `##`. Subsections use `###`. Never go deeper than `###`
- No table of contents in the page body — MkDocs generates it automatically

---

## Typography & Formatting

### Text
- **Bold** for UI element names, feature names, and emphasis: `**Findings**`, `**Connect**`, `**MFA enforcement**`
- *Italics* for example finding sentences and the footer cross-link
- `inline code` for technical values: field names, API methods, config values, paths, scores, formulas
- No ALL CAPS except in actual UI labels that are capitalized

### Lists
- Use `-` for unordered lists (not `*`)
- Use `1.` numbered lists for sequential steps only
- Bold the lead term in definition-style lists: `- **Term:** Description`

### Tables
- Use `|---|---|` alignment (no colons for centering)
- Bold the first column when it's a label/name: `| **Okta** | API token | Users, groups... |`
- Keep tables compact — no extra whitespace padding
- Use tables for structured comparisons (plans, permissions, platforms). Use lists for everything else

### Links
- Internal cross-links use relative paths: `[Page Name](./page-name.md)`
- External links use full URLs: `[app.thalian.ai/signup](https://app.thalian.ai/signup)`
- Bold links in the index page: `- **[Page Name](page-name.md)** — Short description`

### Code blocks
- Use triple backticks with no language tag for formulas/pseudocode
- Use language-tagged blocks only for actual code snippets (rare in these docs)

### Admonitions (MkDocs Material)
- Available but used sparingly. Format:
  ```
  !!! warning "Title"
      Content indented 4 spaces.
  ```
- Only use for genuinely important callouts (deprecated features, security warnings)

---

## Content Conventions

### Voice & Tone
- Second person ("you", "your") — addressing IT admins directly
- Present tense, active voice
- Concise and direct — no filler, no marketing language
- Technical but not jargon-heavy — explain acronyms on first use

### Findings
- Always express example findings as italicized sentences in quotes:
  `*"Sarah Chen has admin access to Salesforce but hasn't logged into Okta in 45 days."*`
- Never show raw data table rows as finding examples

### UI References
- Reference pages by their sidebar name in bold: **Integrations**, **Findings**, **Reports**, **Settings**
- Include the route path in backticks on first mention: `` The Findings page (`/findings`) ``
- Describe navigation as: `Go to **Integrations** → **Browse**`

### Feature Descriptions
- Lead with what it does, not how it works internally
- Include plan availability where relevant (Free / Pro / Enterprise)
- Link to related pages rather than repeating content

---

## File Naming

- All lowercase, words separated by hyphens: `getting-started.md`, `findings-and-remediation.md`
- No underscores, no camelCase
- Name should match the nav label in `mkdocs.yml` (roughly)

---

## mkdocs.yml

When adding a new page:
1. Create the `.md` file in `docs/`
2. Add it to the `nav:` list in `mkdocs.yml`
3. Add a link to it from `index.md` under the appropriate section
4. Cross-link from the most related existing page's footer

Enabled extensions: `tables`, `admonition`, `pymdownx.details`, `toc` with permalinks.

---

## Screenshots

Screenshots are the only visual content in the docs — no diagrams, illustrations, or stock images. Every screenshot is a cropped capture of the actual Thalian UI from `demo.thalian.ai`.

### When to use
- To orient users on a page or feature they haven't seen before
- To show the result of a multi-step action (e.g., after connecting an integration)
- To clarify a UI element that's hard to describe in text alone

### When NOT to use
- For simple actions (clicking a button, toggling a filter)
- When text already explains the UI clearly
- For every section — screenshots should supplement, not replace, written instructions

### File conventions
- **Format:** PNG (sharp text on dark UI)
- **Max width:** 1200px
- **Location:** `docs/assets/screenshots/` — organized by section (`integrations/`, `findings/`, `settings/`, etc.)
- **Naming:** lowercase, hyphenated, descriptive: `findings-page-severity-filter.png`, `integrations-okta-connected.png`
- **Content:** Always use demo workspace data — never real customer data

### Markdown syntax
```markdown
![Short description of what the screenshot shows](./assets/screenshots/section/filename.png)
```

---

## What NOT to Do

- Don't use emoji in page content
- Don't nest sections deeper than `###`
- Don't use HTML in markdown files
- Don't repeat content across pages — cross-link instead
- Don't include internal implementation details (Supabase project IDs, API internals, worker names)
- Don't use placeholder or example data that implies fake workspace state
