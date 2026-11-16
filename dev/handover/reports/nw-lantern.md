# nw-lantern report (family B, no word games) — branch review/nw-lantern

## What was replaced by what
Đố đèn (riddle: turn 9 pieces, read riddle, pick answer lantern) → **Thắp đèn** (`dev/build/jlant.js`, engine `lamp`, key `doden` kept for saves/SC7/talent formula/prizes).
3 rounds, all info on screen: (1) tap every lantern equal to the sample (shape + colour); (2) tap to light lanterns so the grid equals the sample grid; (3) tap tray lanterns in the order of the sample string.
Same easy rules as mg-easy: Gợi ý (costs a little), idle auto-hint tiers 0/1, wrong tap dims/bounces at tiers 0/1, first-time demo (flag `doden2`). Raw 0–10 → same j83 work tiers. Numbers: `BAL.lantern` (3 tier columns). Tier: `window.mgTier(kind, ctx)` if present (mg-balance report not yet seen), else kg82Tier(level); `BAL.lantern.tier` forces one tier.
Removed: k91Lantern (j91), KG82_DO + quiz bank `b:"do"` (j82), doden-panel use. Player text reworded (j71, j31, jkc, jmcal, jevban, j72, jcui "Đăng khôi").

## Scan (dev/test/lantern-scan.py, entry points of the riddle game in dev/build/j*.js)
before (origin/main): 45 hits in j31, j71, j72, j82, j91, jevban, jkc, jmcal → after: 2 hits, both the header comment of jlant.js.

## Tests (build rebuilt; dev/test/lantern.js)
- Oracle bot finishes with no page error / no overflow at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2 (canvas scrolls inside dialog as before), 390x844@2 (standard "xoay ngang" prompt). Screenshots looked at and deleted.
- Raw (0–10) at 755x1000, LV0/2/4: skilled bot (1.5–2.5 s/tap, 6 % wrong taps, n=12): mean 8.9 / 8.9 / 8.25, raw≥9 in 11/11/6 of 12, none 10. Random bot (n=8): mean 2.5 / 1.25 / 0, never ≥6 at LV0 except one 6, never ≥9.
- Skilled raw clusters at 9 (speed term is small); a Tuyệt phẩm needs raw+level+material ≥14 (j83), so the final 20–30 % depends on mg-balance's tiers. Knobs if raw must spread: BAL.lantern.lim / speed / miss.
- Old save: no schema change (S.mgSeen already tolerated); not separately loaded with a real old save file.

## KIT REQUESTS
None (uses kit frame, k91Btns/k91DemoCard, doden-bg painting). Note: puzzle lanterns are code-drawn tokens, not paintings — a painted set could be a later kit/art item.

## Owner questions
1. Prize title "Trí khôi" → "Đăng khôi" (jcui) — OK?
2. Talent formula for this contest still reads Tài, Tâm cơ, Thi (unchanged) — keep?
3. Art key `giai-cau-do-den` should be renamed `thap-den-thi` (ACT_PIC_ALL row 480 noted).

SẴN SÀNG KIỂM 877a2585dec7e52e90e5493bacbbe05dd972cb3e
