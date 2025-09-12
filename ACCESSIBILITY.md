# Accessibility Statement — CareerProof OS

## 1. Compliance Standard
CareerProof OS is designed and engineered to conform to **WCAG 2.2 Level AA** standards across all public and authenticated interfaces.

---

## 2. Key Accessibility Implementations

### 2.1 Visual & Typography
- **Contrast Ratios**: All text meets or exceeds a minimum 4.5:1 contrast ratio against its background (7:1 for headers and primary CTAs).
- **Color Independence**: Statuses and skill levels use clear textual badges and distinct iconography in addition to color.
- **Fluid Sizing**: Layouts scale gracefully with user font size scaling up to 200%.

### 2.2 Keyboard Navigation & Focus Management
- Full keyboard operability (`Tab`, `Shift+Tab`, `Enter`, `Space`, `Esc`).
- High-visibility focus indicators on all interactive buttons, links, inputs, and tabs.
- Modal dialogs trap focus when open and return focus to the triggering element on dismissal.

### 2.3 Proof Graph Accessible Alternative
- The interactive Proof Graph provides an immediate, accessible one-click toggle to a fully structured, screen-reader-friendly Data Table and List view.

### 2.4 Reduced Motion
- Full support for `prefers-reduced-motion: reduce`. All CSS transitions and Framer Motion spring physics automatically collapse into instantaneous or gentle opacity transitions.

### 2.5 Screen Reader Semantics & RTL Support
- Native HTML semantic landmarks (`<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`, `<aside>`).
- Bidirectional support (`dir="ltr"` for English, `dir="rtl"` for Arabic) with appropriate `lang` attributes.
