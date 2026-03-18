# Change Management Policy

**Thalian, Inc.**
**Effective Date:** March 2026
**Last Reviewed:** March 18, 2026
**Owner:** Engineering Team
**Classification:** Public

---

## 1. Purpose

This policy defines how changes to the Thalian platform are proposed, reviewed, tested, deployed, and rolled back. It ensures that all changes are traceable, reviewed, and do not introduce regressions or security vulnerabilities.

## 2. Scope

This policy applies to all changes to:

- Frontend application code (React, CSS, assets)
- Backend API endpoints (Cloudflare Pages Functions)
- Database schema (Supabase migrations)
- Infrastructure configuration (Cloudflare Pages settings, environment variables)
- CI/CD pipeline configuration (GitHub Actions)
- Third-party integration code (sync handlers, OAuth flows, remediation executors)

## 3. Change Categories

| Category | Description | Review Required | Testing Required | Example |
|---|---|---|---|---|
| **Standard** | Planned feature work, bug fixes, refactoring | PR review by 1+ team member | CI must pass (build + tests + security audit) | New integration, UI improvement, analysis rule |
| **Emergency** | Critical security fix or production outage | Post-deploy review acceptable | Build must pass; tests can follow | Credential rotation, auth bypass fix, XSS patch |
| **Breaking** | Schema migration, API contract change, dependency major version | PR review by 2+ team members | Full CI + manual testing | Database migration, API endpoint restructure |
| **Configuration** | Environment variable changes, feature flags | Logged in audit trail | Verify via health endpoint | Sentry DSN update, Stripe key rotation |

## 4. Development Workflow

### 4.1 Source Control

- **Repository:** `tori-mf13/thalian-beta` on GitHub
- **Primary branch:** `main` — all production deployments are triggered by pushes to this branch
- **Branch protection:** Pull request reviews required before merging to `main`
- **No direct commits to `main`** for standard and breaking changes

### 4.2 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make changes** with clear, descriptive commits
3. **Open a pull request** with:
   - Summary of what changed and why
   - Test plan (how to verify the change works)
   - Screenshots if UI changes are involved
4. **CI runs automatically:** build, tests (42 automated tests), security audit (dependency scan + secrets check)
5. **Reviewer approves** — at least one team member for standard changes, two for breaking changes
6. **Merge to `main`** — triggers automatic deployment

### 4.3 Automated Testing

The CI pipeline (`.github/workflows/ci.yml`) runs three parallel jobs on every push and PR:

| Job | What It Checks |
|---|---|
| **build** | `npm ci` + `react-scripts build` — verifies the app compiles without errors |
| **test** | `react-scripts test --ci` — runs 42 automated tests covering RBAC permissions, AES-256-GCM encryption round-trips, SHA-256 audit hash determinism, plan limits, trial expiration, and severity scoring |
| **security-audit** | `npm audit --audit-level=high` for dependency vulnerabilities + automated secrets scanner for leaked credentials in source |

**All three jobs must pass before merging.**

## 5. Deployment

### 5.1 Production Deployment

- **Trigger:** Push to `main` branch on GitHub
- **Platform:** Cloudflare Pages auto-deploys on push
- **Process:** GitHub → Cloudflare Pages build → global CDN distribution
- **Rollback:** `git revert <commit> && git push` — deploys the previous state within minutes
- **No manual deployment steps** — the pipeline is fully automated

### 5.2 Database Migrations

- **Tool:** Supabase Management API (MCP) or Supabase Dashboard
- **Process:** Migrations are applied via `apply_migration` with a descriptive name and SQL query
- **Tracking:** All migrations are recorded in Supabase's migration history (`list_migrations`)
- **Rollback:** Write a compensating migration (reverse the schema change) — Supabase does not support automatic rollback
- **Rules:**
  - Never modify production data directly — always use migrations
  - Test migrations on a development branch first when possible
  - RLS policies must remain enabled on all tables after migration

### 5.3 Environment Variable Changes

- Environment variables are managed in the Cloudflare Pages dashboard (Settings > Environment variables)
- Changes take effect on the next deployment
- Sensitive variables (secrets) are encrypted at rest by Cloudflare
- All variable changes should be documented in the team communication channel

## 6. Emergency Changes

For P1/P2 incidents (as defined in the Incident Response Plan):

1. **Fix can be pushed directly to `main`** without a PR review
2. **CI build must still pass** — no bypassing the build step
3. **Post-deploy review required within 24 hours** — create a retrospective PR documenting the change
4. **Incident Commander approves** the emergency deployment
5. **Update the incident timeline** with the deployment details

## 7. Rollback Procedures

| Change Type | Rollback Method | Time to Effect |
|---|---|---|
| Frontend/backend code | `git revert` + push to `main` | ~2 minutes (Cloudflare Pages rebuild) |
| Database migration | Compensating migration via Supabase MCP | ~1 minute (SQL execution) |
| Environment variable | Revert in Cloudflare Pages dashboard + redeploy | ~2 minutes |
| DNS/routing | Cloudflare dashboard | ~5 minutes (TTL dependent) |

## 8. Change Audit Trail

All changes are traceable through multiple mechanisms:

- **Git history:** Every code change has an author, timestamp, and commit message
- **GitHub PR history:** Review comments, approvals, and CI results are preserved
- **Supabase migration history:** Database changes are tracked with version numbers and timestamps
- **Cloudflare deployment history:** Every deployment is logged with commit hash and timestamp
- **Audit log:** Configuration changes (security settings, team management) are logged to the immutable audit_log table

## 9. Policy Review

This policy is reviewed quarterly or when significant changes are made to the development workflow, deployment pipeline, or infrastructure. All changes to this policy are tracked via version control.

---

*For emergency response procedures referenced in this policy, see [Incident Response Plan](./incident-response-plan.md).*
