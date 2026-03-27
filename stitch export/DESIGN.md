```markdown
# Design System Strategy: The Cinematic Frame

## 1. Overview & Creative North Star
**The Creative North Star: "The Director’s Cut"**

This design system is not a website; it is a high-end production suite. We are moving away from the "SaaS dashboard" aesthetic and toward a "Studio Editorial" experience. The goal is to evoke the tactile, high-stakes atmosphere of a midnight color-grading session at a premier film house. 

The visual language breaks traditional digital boundaries through **Intentional Brutalism** and **Anamorphic Depth**. We favor sharp, 0px corners to mimic the precision of film canisters and clapperboards, contrasted with high-contrast, cinematic typography. This is a space of light and shadow, where the UI disappears to let the "footage" (the content) command the screen.

---

## 2. Colors: The Low-Key Palette
We operate in a low-key lighting environment. Surfaces are deep, moody, and layered to provide a sense of infinite studio space.

### The Palette (Material Design Tokens)
*   **Surface/Background:** `#131318` (The Void)
*   **Surface Container (Lowest to Highest):** `#0e0e13` → `#1f1f25` → `#35343a`
*   **Primary (Action):** `#d5baff` (A soft, neon-purple "On-Air" glow)
*   **Secondary (Atmospheric):** `#cec0e5`
*   **Tertiary (Accent):** `#ccc1e8`
*   **Muted/Outline:** `#968e9e`

### The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. They feel "web-like" and thin. Instead, define space through:
1.  **Tonal Shifts:** Place a `surface_container_high` card against a `surface_dim` background.
2.  **Negative Space:** Use the Spacing Scale (specifically `8` to `16`) to create distinct content zones.

### The "Glass & Gradient" Rule
To mimic lens flares and light leaks, use subtle linear gradients (e.g., `surface_container` to `surface_container_high` at a 45-degree angle). Floating elements (Modals/Overlays) must use **Glassmorphism**: `surface_variant` at 60% opacity with a `24px` backdrop blur to simulate the thickness of high-end optical glass.

---

## 3. Typography: The Billing Block Hierarchy
Our typography functions like film credits: bold, authoritative, and meticulously spaced.

*   **Display & Headlines (Bebas Neue / SpaceGrotesk):** All headlines must be **UPPERCASE** with a tracking (letter-spacing) of `0.05em`. This replicates the cinematic "Billing Block" aesthetic. Use `display-lg` (3.5rem) for hero moments to create a sense of scale.
*   **Body & Labels (DM Sans / Manrope):** Body text is our "Editorial Script." It must remain clean and highly legible. Use `body-md` (0.875rem) for primary content.
*   **Contrast is Key:** Pair a massive `display-lg` headline with a tiny `label-sm` metadata tag (all caps) to create an "Editorial" look that feels designed, not just populated.

---

## 4. Elevation & Depth: Tonal Layering
In a film studio, depth is created with light, not drop shadows. 

*   **The Layering Principle:** Treat the UI as a series of stacked matte-black panels. 
    *   **Level 0 (Floor):** `surface_dim`
    *   **Level 1 (Panels):** `surface_container_low`
    *   **Level 2 (Active Cards):** `surface_container_high`
*   **Ambient Shadows:** If an element must float (e.g., a context menu), use a shadow with a `40px` blur, `0%` spread, and `8%` opacity using the `primary` color hex. This creates a "purple-tinted ambient glow" rather than a dirty grey shadow.
*   **Ghost Borders:** For essential containment (e.g., Input fields), use `outline_variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Studio Tools

### Buttons (The "Trigger")
*   **Primary:** Solid `primary` (`#d5baff`) with `on_primary` text. **0px border radius.** Hover state: Add a subtle `1px` glow (box-shadow) using the primary color.
*   **Secondary:** Ghost style. No background, `outline` border at 20% opacity. Text is `primary`.
*   **Tertiary:** Text only, All-caps `label-md`, with a small `4px` purple square (the "record light") prefixing the label.

### Cards (The "Film Strip")
*   **Style:** `surface_container` background, `0px` radius. 
*   **Interaction:** On hover, the background shifts to `surface_container_highest`. 
*   **No Dividers:** Use `spacing-6` (2rem) to separate internal card elements.

### Specialized Components
*   **The Timeline Scrubber:** A custom slider using `primary` for the track and `primary_fixed` for the handle. Use `label-sm` monospace fonts for timestamps.
*   **The Lens Flare Overlay:** A subtle, non-interactive absolute-positioned `div` with a radial gradient (Primary Purple to transparent) at 5% opacity, placed in the corner of hero sections.
*   **Film Grain Texture:** A global CSS overlay using a tiled `noise.png` at 3% opacity to give the digital interface a tactile, "analog" film feel.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place a large headline on the left and a small metadata block on the far right.
*   **Embrace the Dark:** Let the deep `#0A0A0F` background breathe. 
*   **Use Monospace for Data:** Use `manrope` for frame rates, file sizes, and timecodes to maintain the "technical equipment" feel.

### Don't:
*   **No Rounded Corners:** Never use `border-radius`. Everything is a sharp, precision-cut edge.
*   **No Generic Icons:** Avoid bubbly, rounded icon sets. Use thin-stroke, technical icons (e.g., crosshairs, apertures, sliders).
*   **No Pure White:** Use `White #F5F3FF` for text. Pure `#FFFFFF` is too harsh for this cinematic environment; we want the "off-white" of a projector screen.

---

## 7. Motion: The Shutter Effect
Transitions should mimic camera movements:
*   **Page Transitions:** "Hard Cuts" (0ms) or "Dissolves" (300ms ease-in-out).
*   **Hover States:** A fast `150ms` "Focus" effect, mimicking a lens snapping into sharp focus.
*   **Loading:** Use a pulsing "Record" icon (Primary Purple) instead of a standard spinning loader.```