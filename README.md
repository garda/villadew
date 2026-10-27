# Villa Dew — website

A single static page selling one booking: guests pick dates and pay in the
on-page **Hostex booking widget** (section `#book`), synced live with the
Hostex calendar and paid via PayPal. Hosted fallback: the same inventory at
**https://villadew.hostexbooking.site**.

No build step, no framework, no dependencies. Open `index.html` and it works.

```
index.html              the whole page
assets/css/style.css    all styling (brand tokens at the top, as CSS variables)
assets/js/main.js       1.4 KB — sticky bar, scroll reveals, footer year
assets/img/             photography (webp + jpg fallback)
assets/logo/            the three official wordmarks + favicons
robots.txt · sitemap.xml · site.webmanifest
```

## Run it locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321.

## Deploy

Drag the folder onto Netlify/Vercel, or push to GitHub Pages. It is plain
static files — nothing to configure.

**Before going live, search and replace `https://villadew.com/`** in
`index.html` (canonical + Open Graph + JSON-LD), `robots.txt` and `sitemap.xml`
with the real domain. Those are the only absolute URLs; everything else is
relative.

## Brand

Tokens come straight from *Villa Dew Brand Guidelines, Edition 01 · 2026* and
live as CSS variables at the top of `style.css`:

| Token | Hex | Role |
|---|---|---|
| Antique Gold | `#70623F` | logo, headings, hairlines |
| Ivory | `#F7F3EA` | the canvas — never pure white |
| Teak | `#4A3A28` | booking CTA ground |
| Rice Terrace | `#7C8A5A` | reserved accent (unused so far, by design) |
| Morning Mist | `#E9E4D6` | panels, the villa section |
| Charcoal Ink | `#2B2A26` | body text, footer |

Type is Cormorant Garamond (display, quotes) + Poppins (everything else), both
from Google Fonts. Copy is verbatim from the brand book's Fact Sheet and Voice
& Tone pages — please keep it that way.

All six colour pairings used on the page pass WCAG AA for normal text.

## Photography

The site now uses the professional shoot from the owner's Lightroom export
(`photos-in/`, copied from `~/Documents/IndaVillas/KRES CANGU/Lightrom`).
14 frames were selected from the ~300 available, skipping near-duplicates:
gallery images are prefixed `g-`, hover-preview images `p-`. All are resized
to ≤1400 px and served as WebP with JPEG fallback.

(Earlier note corrected: the brand book's "mood" shots — dark-tiled pool,
coconut top-down — are in this same Lightroom export, including a night shot
of the Dew sign, so they are genuine Villa Dew after all, from an
evening/lifestyle session.)

`photos-in/` is source material only — it is not referenced by the page and
should **not** be uploaded when deploying. Deploy just `index.html`,
`assets/`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

### Hover previews ("peek")

Place names in the copy (garden cabin, private pool, teak ceilings, sun
terrace, kitchen, ensuite bedrooms…) are marked with
`<span class="peek" data-peek="<image-name>" data-cap="<caption>">`.
Hovering, focusing (keyboard) or tapping (touch) shows a floating photo card;
Escape or tapping elsewhere dismisses it. To add another, wrap any phrase in
that span — `data-peek` is an image basename in `assets/img/` (WebP required).

## Things worth your decision

1. **Check-in time.** The brand book Fact Sheet and the task brief both say
   **15:00**; the management intake form says 2pm. The site and the schema use
   15:00. If 14:00 is correct, change it in the `.facts` list, the `.near`
   list, and `checkinTime` in the JSON-LD.
2. **Bedroom count.** The brand book says "3 ensuite bedrooms + garden cabin";
   the intake form says 4 bedrooms, 4 kings, 4.5 baths. Visible copy follows
   the brand book; the JSON-LD uses the literal counts (4 rooms, 4.5 baths) so
   search results and filters stay accurate. Both describe the same house.
3. **Contact details.** Only `ask.villadew@gmail.com` and `@villadew` are
   published. The owner's mobile and the exact street address are in the intake
   form but are deliberately **not** on the page — say the word if you want the
   phone number added.
4. **`geo` coordinates** are omitted from the schema rather than guessed. Adding
   real lat/long would improve local search; send them and it's a two-line edit.

## Direct booking (Hostex)

The `#book` section embeds Hostex's booking widget (script from hostex.io +
`<hostex-booking-widget listing-id="123629">`). It is managed in Hostex →
Booking Site → **"Villa Dew Website"** (self-hosted type, site id 531245):
listing price/rules, the widget's enable switch, and the embed code all live
there. PayPal account "Paypal Flatiro" is linked for payments. Gotchas learned
setting it up: each step of the listing editor saves separately (change the
price, save on that step), and the widget sells in the SITE currency (USD) —
a price left at the property's IDR number would show as $2.5M/night.
