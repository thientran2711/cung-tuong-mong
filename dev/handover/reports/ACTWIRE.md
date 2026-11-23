START_CTX ≈ 4 % of 1M (own estimate) · depth 1 · ended ≈ 15 % (own estimate) · cost **0 cr** (no Magnific; wiring + post-process only)
# ACTWIRE (N14): the 21 Thái hậu act seals (THACT5 FINAL -D112) wired into the game. Worker of Foreman C ROOT-C6 (session_01D3E3NbR3sDtAqDLRspEis7)

PRIORITY #1 CHECK: `sh dev/tools/prio1.sh "act seal thai hau"` → `PRIORITY #1 CHECK ('act seal thai hau'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0`.
Manual: OD 23/11 ~03:25Z (last line; owner approved all 21, no pick) · THACT4/THACT5 reports · THACT1 L59 "th-act seals are NOT referenced in js/html/json" · main has NO person seal sets (emoArtSet = "" / m- / mo- only), act faces "act-<k>" fall back to the feeling seal, only `gian` has a 3-part clip set · CLAIMS L1124 = this job. No review/* branch wires th- seals. → built on the existing kit (KIT_EMOSEAL 3-part set + faceKeyFor), nothing new beside it.

## Branch
**review/act-seals-n14 @ f1510547** (off LIVE main 81d76c8b). Commits: 55e74e04 wire · f6c5bfb9 index-lookup fix · f1510547 look test.

## What changed (kit first: all in the seal kit data + the 3 seal url builders)
- `dev/build/jemoseal.js` KIT_EMOSEAL: `roleSet:{thaihau:"th-"}` (a person's OWN painted seal set) + `setThree["th-act-"]` = THACT5 spec once (OUT 4.0 s = 60 f, BACK 3.0 s = 45 f, c0 .514 = 148/288 rest disc, c1 .576 = ×1.12 loop disc) for the 21 keys → expanded into `three["th-act-<k>"]`. `kesSet` regex built from the set list; `kesPartsUrl` reads `three[set+key]` first (so the women's/men's act faces are unchanged).
- `dev/build/jemo.js` `emoArtSet(p,k)`: with a key → her own set when `img/kit/emo-th-<k>.webp` is in the CDN index (strict: index loaded), else the base set (old function = `emoArtBase`). `emoBadge` uses faceKeyFor's set; its onerror fallback uses the base set.
- `dev/build/jfeel.js` faceKeyFor: `r.set=emoArtSet(p,r.key)`. `dev/build/jevb.js` emoBoxArt mark uses faceKeyFor's set too (same seal in the mood box).
- `dev/site/assets.py`: `img/kit/emo-anim/th-*` NOT always-core (63 clips ≈ 32 MB → background/lazy; kesPre probes them before a lean).
- `dev/art/actwire_stage.py`: stages from `img/_review/emo-anim-groups/tonedown/act/th-act-<k>-{out,loop,back}-D112.webp` → `img/kit/emo-anim/th-act-<k>-out.webp / th-act-<k>.webp / th-act-<k>-back.webp` (bytes unchanged) + still `img/kit/emo-th-act-<k>.webp` = OUT frame 0 cropped to the rest disc (r 74+1 at 144,144) → 160 px.
- `dev/test/actwire-look.js`: the look test below.
- Effect: only Thái hậu (role thaihau) with an active act shows the act seal; feelings and every other person unchanged (her th- feeling seals are not in img/kit → base set, as today).

## CDN
- **Uploaded now: the 21 stills** `img/kit/emo-th-act-<k>.webp` (0.3 MB; harmless on main: main never asks for th-).
- **NOT uploaded yet: the 63 clips** (32 MB). Reason: assets.py on main marks every img/kit/ file always-core, so any main build before this branch lands would make 32 MB of clips block entry. **LANDER: after the land build, run** `python3 dev/art/actwire_stage.py && python3 dev/site/cdn_sync.py img/kit/emo-anim/th-act-*` (≈ 2 min), then rebuild so assets.json lists them (bg/lazy). Until then her act seal shows the still + CSS motion (no 404 break).

## Checks
- LOOK (dev/test/actwire-look.js: Thái hậu given act-<k>, real faceKeyFor → emoBadge → kitEmoSeal lean; clips served from the staged local files): **Fold 755x1000@2: lo, gian, vui, mưu, hổ thẹn · iPad 1180x820@2: lo, ghen, tự tin, chán, ẩn** = 10 seals. Every one: still src `emo-th-act-<k>.webp`, set th-, parts out → loop → back at 0 / ~3.95 / ~7.05 s, lean 10 s, 0 page errors. Looked at the frame sheets: disc pops out, loop at 112 %, back to rest, no white/beige square at part swaps, still under it matches frame 0. Sheets: CDN `img/_review/act-seals-n14/fold-755x1000-lo-gian-muu-hothen.jpg`, `ipad-1180x820-lo-ghen-tutin-an.jpg` (verdict giver wipes: `cdn_sync.py --wipe-review act-seals-n14`).
- 21 stills contact sheet looked: all discs whole, rim kept.
- quickcheck f6c5bfb9: core gates PASS, time-spill PASS, open 1887 ms 0 errors, old save ok; **perf FAIL buoiMs 4389 vs live 2526** (box busy with my CDN upload + look runs at the time; the diff does not touch the buổi path) → re-run f1510547 (3 runs): buổi now OK but longTaskMax 4002/2212 FAIL (a different metric each run = noise) → **f1510547 `quickcheck --runs 5`: QUICKCHECK PASS · open 1869 ms · old save ok · perf median of 5 new/live: render 281/257, tab 472/449, buổi 1408/1693, tasks>200ms 23/23 · core gates PASS** (per-run buổi swings 1.2–3.6 s on both builds).

## Open
- lo's OUT holds its lean ≈ 2.2 s (THACT5 known, owner OK'd as is).
- Pre-existing (not mine, not fixed): jevb `emoEvMark` checks `KIT_CDNHAVE.has(\`img/kit/emo-…\`)` but the build rewrites that literal to a full CDN url → the check is always false (walks the fallback chain needlessly). Same fix as here (strip to `img/…`). Report to KIT keeper.

## HANDOVER STATE
Done; nothing pending from me except the LANDER step (clips upload after land, see CDN). SẴN SÀNG KIỂM @ f1510547.
