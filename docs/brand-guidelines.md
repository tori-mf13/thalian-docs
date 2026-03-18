# Brand Guidelines

Typography, color system, logo geometry, and usage rules for the Thalian brand.

---

## The Mark: F7 "The Relay"

Two tapered brackets flanking a tall center bar. Brackets = incoming/outgoing signals. Bar = the intelligence relay.

---

## Typography

| Role | Font | Weight | CSS Variable | Notes |
|------|------|--------|--------------|-------|
| Wordmark | Syne | 700 (Bold) | — | ALL CAPS, letter-spacing: 4px |
| Headings | Syne | 600–800 | `--font-heading` | |
| Body | **DM Sans** | 300–900 | `--font-body` | **Replaces Outfit (deprecated)** |
| Mono/Meta | DM Mono | 400–500 | `--font-mono` | Badges, tags, timestamps, counts, metadata |

!!! warning "Outfit is deprecated"
    Use **DM Sans** for all body text. Outfit should not appear in any new code.

!!! info "DM Mono on metadata"
    DM Mono on all metadata elements (badges, timestamps, counts, percentages, status labels) is a **deliberate brand decision**. It is not a bug. Do not change it.

---

## Color System

### Primary (white/light backgrounds)

| Element | Color | Hex |
|---------|-------|-----|
| Brackets | Purple | `#7C3AED` |
| Center bar | Teal | `#14B8A6` |

### Dark Background Variants

| Element | Color | Hex |
|---------|-------|-----|
| Brackets | Purple Light | `#A78BFA` |
| Center bar | Teal Light | `#2DD4BF` |

### Deep Purple Background Variants

| Element | Color | Hex |
|---------|-------|-----|
| Brackets | Purple Soft | `#C4B5FD` |
| Center bar | Teal Soft | `#5EEAD4` |

### Backgrounds

| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Light backgrounds |
| Light Gray | `#F3F4F6` | Light surface |
| Near Black | `#0B0A1A` | Primary dark background |
| Navy | `#1E1B4B` | Text on light backgrounds |
| Deep Purple | `#2E1065` | Brand dark background |
| Dark Void | `#0a0a0f` | App background |

---

## Logo Files

Logo assets are organized as follows:

- `mark/` — icon only (primary, dark-bg, purple-bg)
- `lockup/` — icon + wordmark (horizontal & stacked, multiple bg variants, mono versions)
- `monochrome/` — single-color marks
- `favicon/` — optimized for 16–32px

### Mark Geometry (viewBox 0 0 100 100)

```
Left bracket:  M 6,18 L 38,18 L 28,30 L 20,30 L 20,70 L 28,70 L 38,82 L 6,82 Z
Right bracket: M 94,18 L 62,18 L 72,30 L 80,30 L 80,70 L 72,70 L 62,82 L 94,82 Z
Center bar:    x="43" y="5" width="14" height="90"
```

### Dark-bg Lockup SVG Colors

| Element | Color |
|---------|-------|
| Brackets | `#A78BFA` |
| Center bar | `#2DD4BF` |
| Wordmark text | `#F1F0FB` (Syne 700, ALL CAPS, letter-spacing 4) |

---

## Usage Rules

- Min clear space = height of mark on all sides
- Icon only: **24px min**; with wordmark: **28px height min**
- Don't rotate, skew, add shadows/gradients, change proportions, or substitute fonts

---

*For frontend implementation rules and design patterns, see [Development Guidelines](./development-guidelines.md).*
