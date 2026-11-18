PRIORITY #1 CHECK: OD L644/L1252/L1601 (2) + audit D-Q2 | main dev/build/jnroad.js nrOffer/nrMOffer + jnroadm nrMenOffer (3 offer sites), 8 stock nr_* j72 cards, BAL.nroad jbal2.js | review/* review/questline-audit (§4 Q1 = spec), no other NRASK/jnrask anywhere (git grep origin/main + origin/review/*) | claims E7a/E7b/E7c (brief E7-questline-q1.md)

# Q1a — help hồi tells the real story (worker E7a, session_01DgYSWpyUqEzbbzMAtLMkNM, depth 1, START_CTX ≈ 4 %)
Branch **review/questline-q1a** @ **98cb395522dc387aef7036261bec345619038cd4** (base origin/main a95e8d4; 3 commits: engine+data, tests+step titles, site rebuilt).

## What
- **Engine (jnroad.js, ONE hook for all 3 offer sites: consorts nrOffer, maids nrMOffer, men nrMenOffer in jnroadm.js)**: `nrAskPick(N,A)` draws one ask of NRASK[<chapter id>] (per life → variety, OD:L1252) and stores its index in the quest (`p.av`); `nrAskOf(X)` gives it back. The 8 stock nr_* templates are wrapped: card text h, step title, option 1/2 labels and loss lines read the ask; **costs / odds / losses stay the stock ones** of kind k (ONE CORE: BAL.nroad.op/.bac/.suc). No entry, av −1, missing av (old saves) or a kind that no longer matches → today's stock card unchanged.
- Chapter id = jroad id (`ROAD14[road][n]`, e.g. `tt_co_7`); men template chapter = `<NRM id>_<n>` (E7c: e.g. `gd_tl_7`). Slots: `{me} {Me} {call} {Call} {he} {B}` (B fallback «kẻ kia»). Optional `c` = own step title; else a neutral per-kind title (stock titles named one errand only).
- **BAL.nroad.kinds** = ["thu","emp","th","hh","do","y","che"] — «bac» OFF (D-Q2); add "bac" = one key flip (tested). nrKind falls back to the first allowed kind of the chapter's hồi cast, else kinds[0]. nr_bac template stays registered so old-save quests still end.
- **Data dev/build/jnrask.js** (assemble.py: right after jnroadm.js): tt / dtq / muoi / cn, 16 roads × chapters .5–.10 = **96 chapters × 2 asks = 192 asks**, written from reports/questline-expert.md (K1–K7 shapes, origin flavour, B4 voices; money only as a cost). File pattern for E7b/E7c: `var NRASK=window.NRASK||(window.NRASK={}); Object.assign(NRASK,{...})`.

## Tests (all PASS)
| test | result |
|---|---|
| node dev/test/nrask-scan.js (static, ALL jnrask*.js: keys = real help chapters, full coverage per origin/men, kinds ⊂ BAL.nroad.kinds, ≥2 asks/chapter, no shared sentence / label / loss line, slots only, VANPHONG bans incl. typed pronouns, sizes) | ALL PASS · 192 asks · 514 sentences · 384 labels · 384 loss lines |
| node dev/test/nrask-engine.js (built game: kinds never «bac» + flip; offer carries av; all 192 asks × 2 voices (peer, Hoàng hậu) render 384 cards, no raw slot, stock costs kept; fallback; old save nr_emp/nr_bac without av end; ask played → hb>0, betrayal → hb<0) | ALL PASS |
| npc-roads.js (1 life × 120 mo) · npc-roads-saves.js (vs main build) · npc-roads-tokscan.js | 14/14 · all PASS · titleBad 0 |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · old save ok · perf new/live render 180/194 ms, buổi 918/796 ms · core gates PASS |
| node dev/test/nrask-shots.js <dir> (HOST, Fold 755x1000@2 + iPad 1180x820@2: offer card + Việc nhờ tab, tt_mat_7 peer Quý phi, muoi_lau_9 Hoàng hậu) | SHOTS OK (visible, no overflow, no raw slot, no page error) — looked at all 8 |

## Shots
CDN upload REFUSED (cdn_sync.py → Cloudflare HTTP 401 auth). Not committed to git (image rule OD 17/11). Re-make in 1 min: `bash dev/site/build_site.sh && node dev/test/nrask-shots.js /tmp/q1a-shots`. What they show: kit j72 offer card «Phụ tuyến · Quý phi …: «Mật ước với Hoàng hậu» · Chương 7 «Hoàng hậu thử lòng»», ask in tỷ/muội voice, step «Thưa giúp nàng ta trước Hoàng hậu»; Việc nhờ tab with kit option cards «Thưa với Hoàng hậu rằng nàng ta chỉ làm theo lệ cũ» (Sức −8, Năm ăn năm thua, BẠI Đức −2 · loss line) / «Dâng Trung cung một khay lá dâu bạc thay lời» (Bạc −30, Khá chắc); Hoàng hậu card «Thuyền muối đêm» ch. 9 che-ask. No new kit part, no KIT REQUEST.

## Scan table (before / after, whole group = every NPC help card)
| | before (main) | after |
|---|---|---|
| help card text about the NPC's own chapter | 0 of 8 stock cards | 96 chapters (tt/dtq/muoi/cn) × 2 asks; Q1b/Q1c add theirs on the same hook |
| «bac» ("xin bạc") dealt | yes (default of nrKind) | never (kinds flip to restore) |
| offer sites reading the ask | — | 3/3 (consort, maid, man) |

## Notes for E7b / E7c
Rebase on this branch; add only your data file + assemble line after jnrask.js; nrask-scan.js already scans every jnrask*.js (men coverage = 20 templates × .5–.10 = 120 chapters). `do` asks must name {B} (the stock option hits {B}'s bond).

SẴN SÀNG KIỂM questline-q1a 98cb395522dc387aef7036261bec345619038cd4


## Fix r1 (Foreman E order from E7br q1b review item 6) → ed01a6b22ed161ac272f2d38e76e1c6b664d0cad
No asker is sent to herself (whole family): `NRSELF = {queen:["hh"], ty:["y"]}` in jnroad.js; `nrAskPick(N,A,who)` skips those asks and `nrKind(A,no)` skips those stock kinds — consorts pass "queen" (v.queen), men pass their kind (Thái y = ty); Emperor / Thái hậu have no NPC road. nrask-engine check 7: every chapter of every road × each self role → never its own kind; 288 live queen offers → no nr_hh. nrask-scan / nrask-engine ALL PASS, quickcheck PASS. NRASK data shape unchanged (E7b/E7c files need no change).
SẴN SÀNG KIỂM questline-q1a ed01a6b22ed161ac272f2d38e76e1c6b664d0cad

## Fix r2 (review E7ar FAIL 98cb395, reports/questline-q1a-review.md) → 54f10e85ea0438884fcba07a354bbacb80ad41f9
| # | review item | fix (whole family) | before → after |
|---|---|---|---|
| 1 | Hoàng hậu asked to speak «trước Hoàng hậu» | NRSELF {queen:[hh], ty:[y]} + the PLAYER as Hoàng hậu (rank ≥ BAL.voice.hq, jvoice rule) → kind removed from asks AND stock nrKind, all 3 offer sites | queen draws hh 45/384 → 0; player-queen hh 0 (check 7, 7b) |
| 2 | consort voice not VANPHONG §2 | consort/Hoàng hậu asker of EVERY nr card (8 stock + NRASK slots) speaks via jvoice kAddr(asker, player), mood floor cool (no «ngươi» when asking); men by trade (nrVoiceM): Thái y / quan / sứ thần / họa sư / nhạc sư → vi thần, Thị vệ + thái giám → nô tài, Vương gia → bản vương, player called via kAddr (tiểu chủ / nương nương / Hoàng hậu nương nương); {call} keeps title capitals mid-sentence | Quý phi→Thường tại «tỷ…muội muội» → «bổn cung…muội muội»; Thường tại→Quý phi → «tần thiếp…Quý phi nương nương»; →player Hoàng hậu «muội / Tỷ tỷ» → «thần thiếp / Hoàng hậu nương nương»; S.men all «thần» → by trade (check 8) |
| 3 | «kẻ kia» when no rival {B} | nrAskPick(…, hasB): no real B → no ask naming {B} and no stock «do» (spies on B); rival computed before the pick at all 3 offer sites | 72/192 asks could print «kẻ kia» → 0 (check 9) |
| 4 | nrask-scan dup key dead | each file loaded in its own sandbox; a key in two jnrask*.js files FAILs | copy of jnrask.js as a 2nd file → 96 dup FAILs (was 0) |
Tests at 54f10e8: nrask-scan ALL PASS · nrask-engine ALL PASS (new 7b/8/9) · npc-roads 14/14 · -saves 6/6 · -tokscan titleBad 0 · -men 16/16 (its voice check now follows VANPHONG: Thị vệ nô tài, others vi thần) · -maids 15/15 · nrask-shots Fold+iPad SHOTS OK (looked: «Hoàng hậu giao bổn cung … Xin muội muội thưa…» Quý phi→Thường tại) · quickcheck PASS.
Data shape for E7b/E7c UNCHANGED (slots the same; {call} now e.g. «Quý phi nương nương» / «Hoàng hậu nương nương» — write asks that read well with a title, e.g. «Xin {call} …»). Asks naming {B} are simply not drawn when there is no rival: keep at least one {B}-free ask per chapter where possible.
SẴN SÀNG KIỂM questline-q1a 54f10e85ea0438884fcba07a354bbacb80ad41f9
