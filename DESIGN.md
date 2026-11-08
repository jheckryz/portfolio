---
name: Jheckryz Osio
description: A near-black darkroom where every image develops from crimson duotone to true colour on one scroll timeline.
colors:
  crimson: "#d0142f"
  on-crimson: "#fff"
  ground: "#0c0a0a"
  ink: "#f1eee8"
  dim: "#a49d96"
  line: "rgba(241, 238, 232, .18)"
  ghost: "rgba(241, 238, 232, .07)"
  ground-light: "#f1eee8"
  ink-light: "#0c0a0a"
  dim-light: "#5f5954"
  line-light: "rgba(12, 10, 10, .2)"
  ghost-light: "rgba(12, 10, 10, .06)"
  paper-white: "#fff"
  paper-hover: "#f0efed"
  paper-ink: "#0c0a0a"
  plate-backing: "#17090c"
  duotone-shadow: "#2b050d"
  duotone-mid: "#d1122b"
  duotone-highlight: "#ffebe6"
typography:
  display:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "21.75vw"
    fontWeight: 800
    lineHeight: 0.78
    letterSpacing: "-.055em"
  marquee:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(17vw, 34vh)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-.055em"
  email:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "calc((100vw - 2 * clamp(16px, 2.8vw, 40px) - 20px) / 10.7)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-.03em"
  headline:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-.045em"
  lead:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3.7vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-.035em"
  title:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.625rem, 3.4vw, 3.25rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-.04em"
  label-section:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "-.015em"
  body:
    fontFamily: "Host Grotesk, Helvetica Neue, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label-nav:
    fontFamily: "Geist Mono, ui-monospace, Menlo, monospace"
    fontSize: "clamp(10.5px, 2.8vw, 12px)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: ".12em"
  label-data:
    fontFamily: "Geist Mono, ui-monospace, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.3
  label-index:
    fontFamily: "Geist Mono, ui-monospace, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.35
    fontFeature: "tnum"
  label-rail:
    fontFamily: "Geist Mono, ui-monospace, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: ".14em"
    fontFeature: "tnum"
rounded:
  none: "0px"
  pill: "999px"
spacing:
  gutter: "clamp(16px, 2.8vw, 40px)"
  rail-room: "20px"
  rail-clear: "18px"
  section-y: "clamp(96px, 16vh, 160px)"
  row-y: "clamp(16px, 2.4vw, 28px)"
  cell-y: "16px"
components:
  nav-tab:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.paper-ink}"
    height: "56px"
  nav-item:
    textColor: "{colors.paper-ink}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.pill}"
    padding: "0 clamp(7px, 1.25vw, 18px)"
    height: "40px"
  nav-item-hover:
    backgroundColor: "{colors.paper-hover}"
  button-primary:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.on-crimson}"
    rounded: "{rounded.none}"
    padding: "14px 18px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ground}"
  button-outline-on-crimson:
    textColor: "{colors.on-crimson}"
    rounded: "{rounded.none}"
    padding: "0 18px"
    height: "44px"
  button-outline-on-crimson-hover:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.crimson}"
  plate:
    backgroundColor: "{colors.plate-backing}"
    rounded: "{rounded.none}"
  print:
    rounded: "{rounded.none}"
  project-row:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    padding: "{spacing.row-y} 0"
  project-row-hover:
    backgroundColor: "{colors.crimson}"
    textColor: "{colors.on-crimson}"
  ledger-cell:
    textColor: "{colors.dim}"
    typography: "{typography.body}"
    padding: "16px 12px 16px 0"
  ledger-cell-hover:
    textColor: "{colors.ink}"
---

# Design System: Jheckryz Osio

## Overview

**Creative North Star: "The Safelight Darkroom"**

The page is a near-black room lit by one crimson safelight. Images arrive as crimson duotone plates and resolve to true colour as the visitor scrolls, the way a print comes up in the tray. Scroll position, smoothed once, is the only clock for that change, so the page reads as one continuous development rather than a sequence of separate animations.

Everything else stays out of the way of that event. Off-white ink sets tight, heavy grotesk type at very large sizes, Geist Mono carries numbering and data, surfaces are flat and sharp-cornered, and film grain sits over the whole frame. Density swings on purpose: pinned stages hold a single idea at full viewport height, while the rows and ledgers below them are open, hairline-ruled and text-only.

The theme toggle turns the room lights on. Ground and ink swap, the duotone and the wash disappear, and every plate shows in full colour. Crimson and the white tab do not change between rooms.

**Key Characteristics:**
- One crimson, reserved for what is live or actionable.
- Images develop from duotone to true colour on one scroll timeline.
- Sharp-cornered plates and prints with no resting shadow.
- A white tab with flared shoulders hanging from a thin top bar.
- Tight heavy grotesk display over small mono data labels.
- A fixed frame number on a vertical edge rail.
- Film grain over the entire page.

## Colors

A near-achromatic warm room with a single saturated crimson; the only other chroma comes from the photographs themselves.

### Primary
- **Safelight Crimson** (#d0142f): Live state and the contact action only. The primary button, the current-section mark in the nav, the wipe behind a pointed project row, the letter under the pointer in the hero name, the text selection, the wash over undeveloped prints, and the full-bleed contact field.
- **White on Crimson** (#fff): Text, icons and the rail number on any crimson surface.

### Neutral
- **Darkroom Black** (#0c0a0a): Page ground in the dark room; becomes ink when the lights are on.
- **Fixer Off-White** (#f1eee8): Ink in the dark room; becomes the ground when the lights are on.
- **Dim Warm Grey** (#a49d96, light #5f5954): Secondary reading text, mono data labels, ledger cells and row status.
- **Hairline** (rgba(241, 238, 232, .18), light rgba(12, 10, 10, .2)): Row rules, ledger rules, the 1px inset outline on plates, and the dashed empty-evidence stroke.
- **Ghost Ink** (rgba(241, 238, 232, .07), light rgba(12, 10, 10, .06)): The second, aria-hidden marquee row only. Purely decorative; the same words run at full ink in the neighbouring row and in the project title.

### Fixed Surfaces
- **Paper White** (#fff) with **Paper Ink** (#0c0a0a): The nav tab and top bar in both rooms. **Paper Hover** (#f0efed) is the nav item pointer state.
- **Plate Backing** (#17090c): Sits behind plates and app screens while images load.

### Duotone
The crimson duotone is the `safelight` SVG filter defined inline at the top of `index.html`, with `color-interpolation-filters="sRGB"`. It desaturates (`feColorMatrix type="saturate" values="0"`) and then maps luminance through three-stop tables: R `0.17 0.82 1`, G `0.02 0.07 0.92`, B `0.05 0.17 0.90`. In hex those stops are shadow #2b050d, mid #d1122b, highlight #ffebe6. The midtone sits next to Safelight Crimson by construction, though the two are separate literal values.

### Named Rules
**The Live Crimson Rule.** Crimson marks something developing, current, pointed at or actionable. Nothing else gets it, and no second accent exists.

**The Room Lights Rule.** The theme switches ground, ink, dim, line, ghost and grain (dark .06, light .04). It never changes crimson or the white tab, and in the lit room the duotone and wash layers are removed entirely.

**The True Colour Default Rule.** True colour is the base state. The duotone layer is a clone added by script, so without script, under reduced motion or in the lit room, plates are simply the photograph.

## Typography

**Display Font:** Host Grotesk (with Helvetica Neue, Arial, sans-serif), self-hosted variable, weights 300 to 800
**Body Font:** Host Grotesk, the same family at reading weights
**Label/Mono Font:** Geist Mono (with ui-monospace, Menlo, monospace), self-hosted variable, weights 100 to 900

**Character:** A tight, heavy grotesk pulled hard into negative tracking, set against a small, plain mono that behaves like the numbering printed on film stock. Almost all contrast comes from size and weight; there is no italic and no third family.

### Hierarchy
- **Display** (800, 21.75vw, 21.2vw below 800px, line height .78, -.055em, uppercase): The name, edge to edge along the bottom of the hero.
- **Marquee** (800, min(17vw, 34vh), 18vw on phones, line height .95, -.055em): A project name running behind or around its screens.
- **Email** (700, sized from the viewport so the address spans the content width, line height 1, -.03em): The contact address. Its 10.7 divisor is fitted to this address and must be refitted if the address changes.
- **Headline** (700, clamp(2.75rem, 6vw, 5.75rem), line height .98, -.045em): Large section titles.
- **Lead** (500, clamp(1.75rem, 3.7vw, 3.5rem), line height 1.12, -.035em): The statement paragraph, with `text-wrap: pretty`.
- **Title** (700, clamp(1.625rem, 3.4vw, 3.25rem), line height 1.05, -.04em): Project rows. The pinned project title uses the same voice at clamp(2rem, 3.4vw, 3.25rem) and line height 1.
- **Section Label** (500, clamp(1.25rem, 1.8vw, 1.625rem), -.015em): Quiet section and sub-group names that sit beside or above larger content.
- **Body** (400, 1rem, line height 1.5): Default reading text. Supporting paragraphs step up to clamp(1rem, 1.25vw, 1.1875rem) in dim at a maximum of 34em.
- **Nav Label** (Geist Mono 400, clamp(10.5px, 2.8vw, 12px), .12em, uppercase): Tab links only.
- **Data Label** (Geist Mono 400, 12px, line height 1.3): Table headers, row status and figure numbers.
- **Index Label** (Geist Mono 400, 11px, line height 1.35, tabular numerals): Frame numbers above each contact-sheet entry.
- **Rail Label** (Geist Mono 400, 11px, .14em, tabular numerals, vertical): The section frame number.

### Named Rules
**The Two Voices Rule.** The grotesk speaks and the mono counts. Mono carries numbering, table headers, status and nav, and never a sentence.

**The Frame Number Rule.** A section's number lives on the edge rail, in the form `02 / 05`. Mono indexes may sit with items in a numbered series (a figure, a contact-sheet frame), but section headings never get a label above them.

## Layout

The page is one long scroll alternating pinned stages with open, ruled sections. In the hero a single portrait, tilted 5deg with its foot overlapping the name, straightens and shrinks into a circle icon centred between the nav and the name, cropped around the face with an animated `clip-path` from `data-focus`, developing to true colour on the way. It is the one image on the page that ends round. A pinned stage is a sticky, overflow-hidden viewport inside a tall section (hero 230svh, 200svh on phones; project 320svh, 280svh on phones), and the scroll distance is what drives its development. Open sections use the fluid gutter and generous vertical padding (section-y for most, up to clamp(120px, 24vh, 240px) for the statement).

Grids are simple and exposed: a 12-column split for the statement block (label in columns 1 to 4, copy from column 5), a pinned helix of prints (an even 8-column grid, 4 on phones, when motion is reduced), and two equal columns inside an open project row. Text and rule blocks that could run under the rail keep rail-clear (`--rail-clear`, 18px, 0 on phones where there is no rail) of extra right padding beyond the gutter, so every section shares one right edge. Project titles carry a mono role line beneath them, and an outlined "Explore project" button opens a native `<dialog>` sheet from the right (min(560px, 100vw), 320ms on ease-drawer, a 60% ink backdrop) listing the project's description, objectives, technologies, team, role and status.

Phone layout begins at 799px and below, matching the script's `innerWidth < 800`. The rail is hidden, statements stack, an open project row collapses to one column, and each ledger row becomes a stacked block with its header repeated inline from `data-label`. On a phone the project name runs above and below the screens instead of behind them, since there are no side margins. The nav tightens rather than drops: shoulders narrow to 34px on phones and 30px at 430px, tracking drops to .08em at 430px and .04em at 345px, and the logo link is the one item removed, at 389px. Phone heights of 720px and below reposition one plate.

### Motion
Motion is scrubbed, not triggered. Scroll position is smoothed once, by exponential approach with rate 14 per second and a frame delta capped at 50ms, and that single value renders every scrubbed effect through an `inOut` cubic. Scrubbed effects are the plates squaring up and developing, app screens growing and parting, opposed marquee rows, word-by-word opacity from .2 to 1 in the statement, prints washing out column by column, the logo helix winding, and the contact field unclipping from inset(14% 6% 0 6%). Nav mark and rail read raw scroll position, so their state is never late.

Outside the scroll timeline run the one-time entrance at the top of the page (tab 600ms, name 1000ms, plate 900ms, intro and action 500ms after a 500ms delay), pointer states, the 220ms theme crossfade via View Transitions where supported, and smooth anchor scrolling. Named curves are ease-out `cubic-bezier(.23, 1, .32, 1)` for movement and ease-drawer `cubic-bezier(.32, .72, 0, 1)` for the nav mark; colour fades use plain `ease` at 160ms to 200ms.

**The One Timeline Rule.** New scroll effects are added to the one smoothed render loop as a function of scroll position. They never get their own listener, library or trigger.

**The Hold Still Rule.** Under `prefers-reduced-motion: reduce` pinning, duotone, wash, entrance, smoothing and the larger pointer movements (plate scale, print rise, logo scale, row shift) all go away. Stages stop pinning and every image sits in place in true colour.

**The Real Pointer Rule.** Hover states exist only inside `(hover: hover) and (pointer: fine)`. Project rows mirror their hover state on `:focus-visible`, so keyboard users get the same wipe.

## Elevation & Depth

Flat by default. Depth comes from physical stacking instead of shadow: plates overlapping the name, the name passing behind app screens, and the crimson contact field opening to full bleed. A fixed film grain at z-index 90 (an SVG `feTurbulence` at opacity .06 dark, .04 light, with no pointer events) gives every surface one shared material. The only drop shadow in the system is under the nav.

### Shadow Vocabulary
- **Tab lift** (`filter: drop-shadow(0 8px 20px rgba(12, 10, 10, .16))`): Applied to the tab so it follows the flared silhouette. The bar carries a lighter `box-shadow: 0 2px 10px rgba(12, 10, 10, .1)`. It is what separates the white tab from the off-white ground when the lights are on.
- **Ledger trace** (`box-shadow: inset 0 -1px 0 ink, inset 0 1px 0 ink`): Not elevation. Under a pointer it redraws the row's hairlines in full ink.

### Named Rules
**The Flat Plate Rule.** Plates, prints, buttons and rows carry no resting or hover shadow. A pointed plate scales to 1.03 and comes forward in z-order instead.

## Shapes

Hard rectangles are the default: plates, app screens, prints, buttons, rows, ledgers and the contact field are all square-cornered (0). The nav is the deliberate exception. Its tab grows out of the top bar through flared S-curve shoulders, and its items take a pill-shaped pointer state (999px). Plates hold a 4:5 crop, prints are 1:1, and app screens hold their own 446:1000 proportion. Lines are 1px hairlines. The only dashed stroke marks an empty evidence slot. Icons are thin 1.5px line paths in `currentColor`, inlined as SVG.

**The Sharp Plate Rule.** Anything that holds an image or an action outside the nav is square-cornered. Curves belong to the nav tab, and to the phone bodies that hold app screens, which depict a real object.

## Components

### Buttons
Blunt and unadorned.
- **Shape:** Square corners (0), scaling to .97 when pressed.
- **Primary:** Safelight Crimson with White on Crimson text at weight 500 (14px 18px padding, 14px gap), with a 16px arrow icon.
- **Hover / Focus:** Fills with ink and ground text over 160ms while the arrow travels 3px. Focus is the global 2px `currentColor` outline at a 3px offset.
- **Outline on crimson:** On the contact field, 1px `currentColor` border with no fill, 44px minimum height and a minimum width of 8.5em so its label can change without moving the layout. On hover it fills white with crimson text. Its status text appears beside it in a live region, and failure names the fallback.

### Navigation: The Hanging Tab
The signature of the system. An 8px white bar is fixed across the top of the viewport at z-index 80, with a 56px white tab hanging from its centre. A 56px by 56px SVG shoulder on each side, one mirrored and each overlapping the tab by 1px, flares the bar into the tab along the path `M0 0V8C14 8 20 12 25 21L35 41C40 51 46 56 56 56V0Z`. It stays white in both rooms.
- **Items:** 40px tall, mono spaced capitals, in `paper-ink`, including a 28px logo mark and a 20px theme icon.
- **Pointer:** A pill of Paper Hover behind the item; the theme icon rotates 30deg over 300ms. Pressed items scale to .97.
- **Current section:** A 12px by 2px crimson mark, 5px above the tab's bottom edge, slides under the active item over 260ms on ease-drawer. The active link also carries `aria-current`. The mark fades out if its link is hidden.
- **Entrance:** Uses the same reveal as the tuck, once, only at the top of the page.
- **Tuck:** One movement with no delays. Past the hero, 6px of downward scroll draws the strip into the centre over 380ms on `cubic-bezier(.4, 0, .2, 1)` as the tab lifts 88px over 460ms on `cubic-bezier(.6, 0, .4, 1)`. 24px of upward scroll or keyboard focus drops the tab over 560ms on `cubic-bezier(.22, 1, .36, 1)` while the strip spreads from behind it over 640ms on `cubic-bezier(.5, 0, .15, 1)`. Circle drawing doesn't change it, and it's instant under reduced motion.
- **Skip link:** A solid ink block with ground-coloured text, revealed on focus at top 72px.

### Edge Rail
The frame counter. Vertical mono text fixed at the vertical centre, 12px from the right edge, reading `current / total` with tabular numerals. It updates as a section reaches the viewport midline, and switches to white over the crimson field. It is decorative to assistive technology and is hidden at 799px and below.

### Plate
A sharp-cornered image frame holding two stacked images: the true-colour photograph, and an aria-hidden clone over it through `filter: url(#safelight)`. Scroll fades the clone's opacity to 0, which is the develop. A 1px inset hairline outline keeps the plate's edge visible on the ground. On a real pointer the plate scales to 1.03 over 300ms, rises in z-order, and develops immediately. App screens use the same two-layer structure without the outline, clipped inside a phone body: a #17171b shell with a 1px light rim, a side button, and rounded glass. Phones turn in towards the middle, from rotateY 28deg and rotate 7deg down to a resting rotateY 14deg and rotate 3deg. The IoT stage deliberately differs from DominiMap: no marquee, and an upright phone beside a large title. A 2px crimson scan line with a trailing band crosses the whole pinned stage on scroll, turning ghost text to ink and wiping a crimson still of the demo's first frame away from the phone. The demo stays on that frame until the scan finishes, then plays muted on a loop with native controls while on screen, and three step labels follow its timeline. It doesn't autoplay under reduced motion, where the text and video show plainly. Project titles take the hero name's letter-by-letter crimson hover.

### Contact-Sheet Frame
A square white print holds a logo at 56% (wordmarks at 84%), with a crimson `multiply` wash over it. Frames sit on a pinned helix: 30deg apart around a vertical axis, each a step higher, in CSS 3D with 1500px perspective, and scroll winds it. Only the frame facing the viewer is fully developed; the wash follows .9 sin²θ, and past the side of the helix a frame isn't drawn. The coils spread by up to 35% at speed. A real pointer can also draw circles anywhere on the stage: the angle moves the page's scroll position, runs on after release with a .55s decay, and settles on the nearest frame over 600ms. Touch only scrolls. With reduced motion the frames stand still as a grid.

Behind the helix sits a dial: a 1px ring at radius .42 of the viewport's short side, with one tick per frame within six steps of the current one. Ticks turn with the wind, and the current frame's tick reaches twelve o'clock longer and brighter. The dial rests at 50% opacity and goes to full over 200ms while drawing, when a dot on the ring tracks the pointer. Beneath sit an 11px mono frame number in dim and the item's name. On a pointer the print rises 4px, the logo scales to 1.08, the wash clears, and the number lifts to ink.

### Project Row
An expandable `details` row between hairlines, with a Title-voice name, a mono status and a 1.5px plus icon that rotates 45deg when open.
- **Hover and focus:** A crimson field wipes in from the left over 280ms via `clip-path`, extending 12px beyond each edge. Text turns white and the name shifts 8px right.
- **Open body:** Two equal columns: a definition list of label and value rows ruled by hairlines, and an evidence slot.
- **Empty evidence slot:** A centred dim note inside a 1px dashed hairline box, at least 220px tall. Dashed is the empty state; supplied evidence replaces the box.

### Ledger
A fixed-layout four-column table for dated records, with no fill. Headers are dim mono labels, and cells are dim text between full-width hairlines. Ledgers with three fields merge their last two columns with `colspan`, so every ledger on the page shares one grid. A pointed row lifts to ink and traces its rules in full ink over 160ms. Phones stack each row as label and value pairs.

### Contact Field
The one full-bleed crimson surface, at least a full viewport tall, with White on Crimson text. It holds the section label, the address at Email size with an underline that fades in on hover, the outline button, status, and external links with a diagonal arrow that travels 2px up and right. It ends in a small footer under a white rule at 40%. Entering, it unclips from the inset shape over .85 of a viewport of scroll.

## Do's and Don'ts

### Do:
- **Do** route every photograph and app screen through the two-layer plate so it starts in `safelight` duotone and ends in true colour.
- **Do** add new scroll effects to the single smoothed render loop.
- **Do** keep crimson (#d0142f) to live state and the contact action, so the Live Crimson Rule still holds at a glance.
- **Do** swap ground and ink in the lit room, remove the duotone and wash layers, and keep the tab white.
- **Do** give every new section a fixed frame number on the rail in `NN / NN` form.
- **Do** set hairlines at 1px using the line colour.
- **Do** keep text and rule blocks 18px clear of the rail beyond the gutter.
- **Do** provide the reduced-motion version of every new effect: in place, true colour, no pin.
- **Do** gate hover behind `(hover: hover) and (pointer: fine)` and mirror essential row states on `:focus-visible`.

### Don't:
- **Don't** add a second accent or put crimson on anything that is not live or the contact action.
- **Don't** bake duotone into a photograph or fake it with a blend; photographs and app screens take the `safelight` filter. The `multiply` wash belongs to logos, masked to each logo's shape; prints have no backing, so logos stand directly on the ground. The black Render mark inverts in the dark room.
- **Don't** put a shadow on plates, prints, buttons or rows; the tab lift is the system's only drop shadow.
- **Don't** round plates, prints, buttons, rows or fields; the tab's shoulders and pill states are the only curves.
- **Don't** place a kicker or eyebrow above a section heading; the number lives on the rail.
- **Don't** set sentences in mono or add a third typeface.
- **Don't** trigger scroll effects on entering the viewport or give them separate timers; they scrub with position.
- **Don't** treat placeholder rows or ledger cells as content; the component is the system, and its text comes from the owner.
