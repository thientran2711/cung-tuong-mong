PASS ced2edc655a2ed177e6d9bcb8c557e297f222c99
# review/title-sys-r1 — independent review of TITLE SYSTEM phase 1 (review/title-sys @ 06dd80ae)
Reviewer (opus, rules + numbers) for Foreman C. START_CTX ~4 % of 1M; finished well under the +25 % limit.
Branch review/title-sys-r1 = review/title-sys merged onto origin/main 5d6de0d9, then onto origin/main 5682ce6f (latest at push). title-tag + rank-bright are already on main via title-tag-r1 (KIT §82), so only jdh.js + BAL.dh + jcoopworld LOOK come in here. Conflicts: assemble.py (main's list incl. kvfallback + 'jdh.js' after jcui.js), built index.html / sw.js / assets.json rebuilt.

## Owner rules checked (OD 16/11 13:00Z, 13:15Z, 13:20Z + RULE FOR EVERY SESSION, 13:25Z D, 13:30Z, 13:35Z, 13:50Z/13:55Z s17, 14:10Z; FOREMAN_C 13:20Z s16 … 14:45Z s17)
| rule | result |
|---|---|
| own evocative name per event/goal, no "<place> · <festival>" | OK: 35 titles, unique, none with "·"/Tết/Hội (Chức Nữ for Thất tịch xâu kim) |
| lengths vary, max 4 words | OK: 2 words ×9, 3 ×4, 4 ×22 (advisory: skewed to 4-word idioms; not dull, but a few 2–3-word names would balance) |
| tiers 1/5/10 = same name, higher colour tier | OK (test: tiers 3,3,5,5,7 for counts 1,4,5,9,10, name unchanged) |
| ONE worn title, ONE bonus, PLAYER picks from the title's types | OK: picker = kit info panel + kit option cards; switching title drops the old bonus (tested) |
| bonuses modest BAL constants, varied (14:10Z) | OK: BAL.dh.B, 18 types (flat stats, gain shares, bạc, bề trên, phi tần, cung nữ, luck, conception, study, contest, sleep, rumour) |
| pregnancy +1–2 only on hard titles | OK: thai v [0,1,2] points on conceiveCh (a 2–85 percent chance), offered only by Trăng soi rèm ngọc (10 / 30 nights) and Phúc ấm đầy nhà (3 / 5 children), never at step 1 |
| LUCK "Phúc khí" defined, never conception | OK: +2/+3/+4 on lotB; "Con cái" excluded (play-test: conceiveCh 2→2 with Phúc khí worn); Quẻ tag stays quẻ-only. Canon text still to be written by Foreman C/main (FOREMAN_C_STATUS 15:12Z); note it also nudges nightCh (lotB "Sủng"/2 = being chosen, not conception) — say so in the canon line |
| each bonus at the ONE existing gain place, no second formula | OK after fix 1 below; grep: dhB / titleWorn read only in jdh.js (+ kit jtitle, jcoopworld LOOK) |
| NPC consorts same rules | OK: contests, works, nights, children, art levels counted for NPCs (host only in co-op), wear best title, pick by need; daily-act titles are hers only (NPC acts are not runOpt) — acceptable |
| 'Danh hiệu' tab in Nhiệm vụ | OK: rail goal icon → kit tab row "Mục tiêu / Danh hiệu n/35" (same pctabs.kcattabs row as jgift/jinv) |
| info card when/how | OK: kitTitleOpen "Đạt được <date> · Cách có: Đạt được khi … · đủ N lần: lên bậc …" |
| 3-line tag stage + pop-up left figure | OK (kit §82): stage "Chức Nữ / Tần / <name>", pop-up "Trăng soi rèm ngọc / Phi / <name>" |
| co-op per player | OK: S.dh/S.titleWorn personal; friend entry dhB = 0 (bonus applied once, on the owner's machine); LOOK += hieu/titleWorn/dh |
| old saves load | OK |
| KIT FIRST | OK: kitPanel/kitRows/option cards/kitTitlePlate/kitTabRowHTML only; no CSS in jdh.js (.kdhtabs is a hook class with no style) |
| VANPHONG | OK: no %, shares as "một phần mười bốn", odds words from the kit |

## Play-test as a player (755x1000)
Fresh life → 5 real Thỉnh an acts through runOpt (roll forced to succeed): S.dh.a_thinh {n:5,i:0} → kit reward "Danh hiệu mới", log "Ngươi được danh hiệu «Sớm viếng chiều thăm»". Picker offered "Thêm Đức | Đức +1" / "Bề trên quý mến | … một phần mười hai" / Để sau → picked Bề trên → worn "dh-a_thinh pick=gTren". Bonus once: apply({hh:6}) ×200 → average 8.15 without, 8.54 with (expected +0.5; once, not doubled). Rail icon → Danh hiệu tab opened, no horizontal overflow, 0 page errors.

## Fixes made on this branch (commit 4deece0f)
1. gSung was hooked inside sg(), but sg() also prints previews (fmt — 59 callers — and wkGainTxt): with "Sủng dễ lên" worn the same option showed "Sủng +5" or "Sủng +6" on each render and the real gain rolled again separately (play-test: fmt({sung:5}) gave both texts). Moved to apply() (her) next to gDanh/gBac (before j1's sg), NPCs already via ap. Preview now stable; test title-sys.js checks it.
2. Neutral options (Để sau / Quay lại / Đã hiểu) carried text that the kit printed as "ĐƯỢC: về sổ danh hiệu" (OD 13:25Z: Được/Mất must be real) → x:"" like every other "Thôi" option (kit default note).

## Tests (on ced2edc6)
- title-sys.js: 755x1000@2, 1180x820@2, 1000x755, 390x844@2 (rotate prompt shown, as designed): 0 page errors, 0 fails. 1366x1024@2 and 844x390: 0 page errors, only "no dialog" = the known pop-up flake (test Q.push behind opening cards; the kit's title-tag.js has the same; pop-up verified at the other 4 sizes).
- title-tag.js (kit): 0 errors, 0 fails.
- coop-e2e.js: 59/59 passed (incl. solo + old save).
- ts-oldsave.js (save on origin/main build → load on this build, 12 weeks): ok, 0 errors.
- Screenshots looked at: stage, panel, picker, info card, pop-up (755x1000, 1180x820, 390x844, 844x390): plates read clearly, no cut text, panel scrolls.

## Notes for kit keeper / Foreman C (not blocking)
- KIT §82 jtitle.js: KIT_TIER_NAME = [Sơ, Nhất … Thất] indexed by tier 1..8 → tier 8 prints "Thất" like tier 7 (jdh follows the kit, Math.min(7,…)). Kit keeper: make it tier-1 indexed with 8 names; then drop the min(7) in jdh.js (2 places).
- Panel / picker / card show the generic tea-set picture (KIT REQUEST optional: a sắc phong scroll picture).
- If an origin has no chapter goal, the rail goal icon hides and the Danh hiệu tab is unreachable (normally a chapter always exists, incl. "Mệnh truyện trọn vẹn") — phase 2 could give the tab its own entry if that ever happens.
- Wording follow-up from the worker (Sổ ân thưởng "Danh hiệu thi tài" → "Thứ hạng thi tài") still open, waits for review/owner-answers-b.
