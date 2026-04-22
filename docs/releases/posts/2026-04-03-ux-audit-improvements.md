---
date: 2026-04-03
slug: ux-audit-improvements
---

# UX audit: landing, demo, and signup improvements

UX improvements across the landing page, demo experience, and signup flow based on a full product audit.

<!-- more -->

## Landing page

- **Open Graph image** for professional social sharing on LinkedIn and Slack
- **"See Live Demo" CTA** in hero section and navigation: demo.thalian.ai is now discoverable
- **FAQ section** rendered on the page (previously only in structured data)
- **Mobile navigation**: primary CTA now visible at all breakpoints
- **Docs link** added to top navigation for evaluators

## Demo experience

- **Guided tour**: 5-step walkthrough for first-time visitors introduces the dashboard, findings, identities, and AI chat
- **Demo banner**: persistent banner clarifying sample data with conversion CTA
- **Login**: email/password only with request access form for new visitors
- **Demo request workflow**: visitors can request access directly; provisioning auto-generates and emails a magic link

## App improvements

- **Signup hardening**: company name required, personal email domains blocked
- **SSO error messaging**: includes admin self-service guidance with Settings link
- **Iru naming**: all references updated from Kandji to Iru (formerly Kandji)
- **AccessReview**: browser `alert()` calls replaced with Toast component

