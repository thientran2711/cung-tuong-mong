# PROGRESS design-scale (review/design-scale)
Worker session_01UV1SzjmR9rHoafmnuNS1KA. Plan: dev/handover/reports/design-scale.md. Audit: node dev/measure/media-audit.js 590.
- 16/11: plan written; main already has rot.js scaler + k3 phone shell; gap = portrait canvas 755x1000 is not the iPad half.
- next: phase 1 (PAGE 590x820, kv1/kv2, equal pages, shell on kitView().pages, panel content rules, test dev/test/design-scale.js).
- 16/11 phase 1 (c087aafa): rot.js KIT_FRAME page 590x820 + kitView().pages + html.kv1/kv2; spread = two equal 582 px pages (book binding);
  kv1 page margins 4 px → page box 582 both modes. Codemod dev/measure/kv-codemod.js: 27 content @media dropped (PAGE-only), 9 unwrapped
  (LAND-only/ALWAYS); chrome/screen @media kept (phase 3 → :where(.kv1/.kv2)). JS: jk2b strip/narrow, jk4 dialog vh + kdnarrow, j59 j59ph/capOn/MAXN/CW → spread values.
  Chrome: kv1 top bar = spread two-row bar (jk4), "Về phòng" under the menu (icon), tab bar one row (j57 cols=n, font auto-fits ~.59rem),
  k3ph grid = one page box (no empty row). Breakpoints 189 → 143; content breakpoints 0.
  Layout test A (seeded, Hậu cung/Chí tôn): RIGHT page box 582x623 vs 582x620, x/width match 98–100 %, full 95 %; LEFT page 100 % x/width,
  ~82 % full (3 px height: kv1 top bar 132 vs 129 — the time block wraps to 3 lines).
- next (phase 2): kv1 time block 2 lines (page box 623 exactly); screens (title, roulette, map, scene panel, mini-games, podium, toilet) review per mode;
  phase 3: rewrite remaining chrome width queries as :where(.kv1/.kv2), delete 37 DEAD, unwrap 6 ALWAYS, build check.
- 16/11 phase 2+3 (review/design-scale-p2, worker session_01UV1Szh2HXLUxv3oHmnezMy): kv1 time block = one wrapping row of whole items + kitTcFit
  (zoom ≤ 20 %) → top bar = spread height, page box 582x623 both modes, layout test right 100 % / left 100 %. Phase 3: dev/measure/kv-phase3.js
  rewrote every remaining width @media (31 DEAD deleted, 3 ALWAYS unwrapped, 34 → :where(.kv1), 12 → :where(.kv2)); JS breakpoints by hand →
  kitView().pages (incl. innerWidth vs innerHeight orientation compares); build check dev/measure/media-check.js in build_site.sh (0 left;
  media-audit lists ENV only). Tab-mode bug: KIT_TABMODE reset in j6 renderPanel; dev/test/tab-pairs.js 56 pairs x 2 sizes 0 mismatches
  (old code: 17). design-scale.js copies the whole save (ser/deser) — S-only copy gave a different rivals list (flaky 14–98 %).
- open: toilette (jtoil) on the one page drops the mirror column (spread dialog ~920 px spans both pages) → KIT REQUEST, see report.
