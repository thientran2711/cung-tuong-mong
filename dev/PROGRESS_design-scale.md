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
