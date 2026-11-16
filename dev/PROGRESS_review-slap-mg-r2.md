# review/slap-mg-r2 — fixes for reviewer FAIL r1 (dev/handover/reports/review-slap-mg-r1.md, items 1–8) — KIT §79

Base: origin/review/slap-mg-r1 8d266d31 + merge origin/main 399483e3 + merge origin/review/mg-balance 96736fff (mgTier, so slap joins the ONE tier system).
**Merge order note:** this branch contains review/mg-balance. Ship mg-balance first (or together); if mg-balance changes, re-merge it here.

## Items
| # | Reviewer item | Status |
|---|---|---|
| 1 | Painted sprites (ruler, hand, zones) | ART NEEDED (no Magnific on this account). Sprite path wired: `KG82_SPR.tat/ne` → kg82Spr; drop files in, no code change. Fallback = kit silk + plain shapes; each missing file goes to `CTM_MISSING_PICS` (kind "mg"). |
| 2 | Left painted picture (OD:L999) | Slot wired: `kg82Open({pic:kg82Pic(kind)})` → `img/kit/mg-tat-bg.webp` / `mg-ne-bg.webp` (same file = board painting). ART NEEDED. Whole family: `kg82Pic` now returns no slot when the file is not on the CDN (was a broken image ~2 s). |
| 3 | Tiers by skill + occasion, medium, Tuyệt phẩm(nặng) 20–30 % skilled | Done. `mgTier("tat",{occ:"tat"})` (her rank) / `mgTier("ne",{occ:"ne",rank:attacker})`, skill = Vũ. Measured with an anticipation human bot, table below. |
| 4 | First-time demo + idle hint | Done: j91 `k91DemoCard` (once per kind, S.mgSeen), `k91Glow` round the zone after `BAL.slap.hint[tier]` ms + hint line. |
| 5 | Test invalid (Người lạ face) | Fixed: `k61Meet` first; asserts kslap s1/s2/s3, kswell only on nặng, images loaded. Screenshot 5-marks looked at: three tiers on one real face. |
| 6 | ONE CORE leftovers | `(t.sung||0)>=60` → `BAL.slap.hoangMin`; raw 10/6/2/0 + thresholds → `BAL.slap.raw`; 750 ms → `endMs`; `roll(30)` extra week → `wkX`; `roll(50)` mama slap on talk-back → `scold`; `slapSev(p)||2` → `||BAL.slap.def`; dodge odds per tier `dodgeOdds[]`. |
| 7 | OPT.fxon Gọn | `kfStill()` (Gọn or reduced motion): no pops, result = still line; glow = still outline; needle still moves (it is the game). Tested (checks.gonStill). |
| 8 | Not run: viewports, panel-size, facefx-scan, coop-e2e | All run, results below. |

## Measured rates (dev/measure/mg-bots.js, virtual clock, n=200 tat / 120 ne per cell)
Bots: **skilled** = anticipates the needle it sees coming, taps at the crossing + N(0, 40 ms); **casual** = same, N(0, 80 ms); **random** = random taps (B's random bot).
ease 2 = matching level (d = 0, Vừa). Raw JSON: dev/measure/slap-r2-tat.json, slap-r2-ne.json, slap-r2-mgt.json.

| Tát (ease) | skilled nặng / vừa / nhẹ | casual nặng | random nặng |
|---|---|---|---|
| e0 (Khó end) | 15 / 54 / 32 % | 8 % | 3 % |
| **e2 (matching)** | **24 / 58 / 18 %** | 12 % | 4 % |
| e5 (Dễ end) | 49 / 50 / 2 % | 33 % | 8 % |

Through mgTier (skilled, n=100): rank 0 Vũ 0 (Vừa, ease 1.6) 22 % · rank 3 Vũ 2 (Vừa, 2.0) 27 % · rank 5 Vũ 0 (Khó, 0.0) 13 % · rank 5 Vũ 4 (Vừa, 2.8) 35 %.

| Né đòn (ease) | skilled dodged | casual | random |
|---|---|---|---|
| e0 | 39 % | 20 % | 6 % |
| e2 | 53 % | 30 % | 19 % |
| e5 | 85 % | 63 % | 17 % |
Card odds `dodgeOdds` = [75, 55, 35] for Dễ / Vừa / Khó (ladder words, no %).

Before (r1): fixed zones red .16 / amber .38 of the half bar, speed .0026 → red time window ±62 ms: the same skilled bot model would land nặng ≈ 88 % (computed: P(|N(0,40)| < 62)); reviewer's random taps 2/32 nặng, perfect-timing bot 3/4.

## Tests (this branch, local build)
- dev/test/slap-mg.js: 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3 → fails [] (every check true), no page errors, no overflow; 390x844@3 → rotate prompt (screenshot looked at).
- dev/test/panel-size.js 755x1000@2,1180x820@2,1366x1024@2 → exit 0, nothing missing / out of frame.
- dev/test/facefx-scan.js → every person kind fit/lg/sm/stage/podium/room true, no errors.
- dev/test/coop-e2e.js → 59/59 passed.

## Family scan: minigame left picture (kg82Pic) — before / after
| kinds | before | after |
|---|---|---|
| dan hat co dauho ban tho doi doden ve hoa theu kim mua banh huong td_* chai kinh | picture | picture (unchanged) |
| le tc xa thq (+ tat ne) | broken picture ~2 s, then the slot vanished | no slot, listed in CTM_MISSING_PICS → ART NEEDED |
| duho den may | no slot (hard list) | unchanged |

## Bytes added
Code only (jslap ~+4 KB, jbal2/j82/jface small). No pictures added. Painted parts when they come: board/left ≤ ~250 KB each, sprites ≤ ~40 KB each (performance budget).

## ART NEEDED (Magnific gpt-2-6, folder ba4aecfe…, style refs consort-01/05/12/18; upload with dev/site/cdn_sync.py)
1. `img/kit/mg-tat-bg.webp` — 1200×900 landscape (4:3), WebP ≤ 250 KB: the slap scene for the board and the LEFT intro picture: a palace inner hall, one consort (seen from behind / side, calm face, no rank-revealing huadian needed) raising an open hand toward a kneeling or standing lesser consort; soft, not violent, game palette (not vivid). Lower third calm floor (the bar is drawn over it).
2. `img/kit/mg-ne-bg.webp` — 1200×900, ≤ 250 KB: same hall, a consort turning her face aside / stepping back from a raised hand (dodging); calm faces.
3. `img/kit/mg-tat-ruler.webp` — 1600×120 transparent, ≤ 40 KB: a long lacquered wooden ruler / measuring board (thước), plain middle (zones are laid over it), carved ends.
4. `img/kit/mg-tat-hand.webp` — 160×220 transparent, ≤ 40 KB: a slender lady's hand, palm forward, fingers down, jade bangle; the fingertips at the BOTTOM edge (it is the needle tip).
5. `img/kit/mg-tat-zone-red.webp`, `mg-tat-zone-amber.webp`, `mg-ne-zone-green.webp` — 400×80 transparent, ≤ 20 KB each: soft painted silk/lacquer strips in red, amber gold, jade green (stretched to the zone width by code).

## Notes for Foreman B (review/mg-balance)
- Added occasions `tat`, `ne` to `BAL.mgTier.occ` and their names to `MGT_OCCN` (from jslap), `KG82_F.tat/ne` = Vũ like Bắn cung.
- dev/measure/mg-bots.js: new anticipation path (`peek().at` = ms until the right moment → tap at at + N(0, BOT.aim)), bot `casual` (2× aim), and `KG82.noDemo=1` while measuring (the j91 demo cards would otherwise block the skilled bot on a fresh save).

## Resume
Worktree /home/user/wt/slap2 (sparse). Build: `bash dev/site/build_site.sh`. Nothing open except ART NEEDED.
