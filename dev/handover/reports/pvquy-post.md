# PVQUY-POST — a preview is a prediction; a result line prints the real rise (MAIN 188 ruling, law 4)

depth 2 · START_CTX ≈ 3.5 % of 1M (get_session context_usage read 0 → own estimate); rollover at 28.5 %
PRIORITY #1 CHECK: OD/ledger — MAIN 188 ruling in the order (law 4: pvQuy / affPreview = a PREDICTION, PRE only) | main: pvQuy (jaudit, 82 call sites on LIVE a96564ad), affGot (j9, KK68) | review/*: review/aff-preview 27a36750 (affPreview / affSg / affPreviewRun, RV-183) | claims: none.
KIT CHECK: no UI part touched — only the NUMBER inside existing result / card texts; no CSS, no new frame or chip.

Base: LIVE a96564ad + merge review/aff-preview 27a36750. Branch: **review/pvquy-post**. Lands as its own unit (LC35).

## Rule applied
- PRE (card / option text: x, wt, duoc, g, k, gain, risk, opts, AOUT getters, card helpers) → `pvQuy(t,n,lab)` = `lab + affSg(t,S,n)` (the dry run of the real affAdd chain; honest range «+a đến +b» while her nết are not all known).
- POST (a line written after the act: run / go / ok body, a text built after relAdd / affAdd / ap in the same function, or a helper printed from such a spot) → wrap the funnel `const d=affGot(x,y,()=>relAdd(…))` and print `balSg(d)`; one row per person when the act moves several.

## Sort of every pvQuy( site — `python3 dev/measure/aff-preview-scan.py [build] --pvquy`
LIVE a96564ad: **92 sites → 74 PRE, 18 POST**. This branch: **71 sites → 71 PRE, 0 POST** (the 18 POST are now affGot; a few PRE call sites were added by the merge fixes).

### POST → affGot (all 18)
| # | LIVE a96564ad site | why POST (scan) | now on review/pvquy-post |
|---|---|---|---|
| 1 | `j24.js:26` | after relAdd in the same apFriend | j24.js:26 gift visit → `g1=affGot(v,S,relAdd)` · «thiện cảm ${balSg(g1)}» |
| 2 | `j55.js:72` | helper tdLeakSay() printed after the act at j55.js:77 | j55.js:77 tdLeak result → `dL=affGot(t,a,relAdd)`, tdLeakSay(t,lab,dL); cards j55:186/218 keep the preview (no d) |
| 3 | `j67.js:198` | after relAdd in the same e67ally | e67ally → `d=affGot(v,S,relAdd)` · «(thiện cảm ${balSg(d)})» |
| 4 | `j8.js:343` | helper giveTo() printed after the act at j8.js:543, j8.js:605, j8.js:606, jgift.js:52 | giveTo keep line → «thiện cảm ${balSg(keepGain.d)}» (KK68 keepGain = affGot) |
| 5 | `j83.js:113` | helper wkGive() printed after the act at j83.js:183 | wkGive keep line → «thiện cảm ${balSg(keepGain.d)}» |
| 6 | `j9.js:134` | inside run:()=>{…} (the act body) | j9.js:151 «Cảnh báo nàng» run → `affGot(v,S,affAdd)` · «Nàng quý ngươi ${balSg(d)}» (hit and miss) |
| 7 | `j9.js:136` | inside run:()=>{…} (the act body) | j9.js:153 «Nhún nhường» run → affGot · balSg(d) |
| 8 | `j9.js:137` | inside run:()=>{…} (the act body) | j9.js:154 «Giúp đỡ nàng» run → affGot(v,S,relAdd) · balSg(d) (on LIVE jtwoway twDo answers this card) |
| 9 | `j97.js:229` | inside go:()=>{…} (the act body) | «Một hô trăm ứng» → ONE ROW PER PERSON «Tên thiện cảm ${balSg(affGot(v,S,relAdd))}» |
| 10 | `jagacts3.js:129` | inside run:()=>{…} (the act body) | P3T health run → `dN=affGot(v,p,affAdd)`; her line «Nàng quý ngươi ${balSg(dN)}», NPC line «quý ${p.name} ${balSg(dN)}» |
| 11 | `jagacts3.js:129` | inside run:()=>{…} (the act body) | P3T health run → `dN=affGot(v,p,affAdd)`; her line «Nàng quý ngươi ${balSg(dN)}», NPC line «quý ${p.name} ${balSg(dN)}» |
| 12 | `jagacts3.js:131` | inside run:()=>{…} (the act body) | P3T praise run → dN (win) / dF (giả lả) via affGot |
| 13 | `jagacts3.js:131` | inside run:()=>{…} (the act body) | P3T praise run → dN (win) / dF (giả lả) via affGot |
| 14 | `jagacts3.js:135` | inside run:()=>{…} (the act body) | P3T gossip run → dN (hợp chuyện) / dM (lảng) via affGot |
| 15 | `jagacts3.js:139` | inside run:()=>{…} (the act body) | P3T secret run → dN via affGot |
| 16 | `jagacts3.js:140` | inside run:()=>{…} (the act body) | P3T secret run (kể chuyện riêng) → dN |
| 17 | `jemoact.js:444` | after affAdd in the same eaDo0 | «tiệc» → ONE ROW PER GUEST `fd=fr.map(x=>affGot(x,p,affAdd))` |
| 18 | `jky.js:162` | helper jkyRelW() printed after the act at jky.js:182 | jky runOpt result → `rs=affGot(r,F,relTo)` · «thiện cảm ${balSg(rs)}»; jkyRelW stays the card word (optX), fed the raw amount |

### PRE (kept: pvQuy is the card word, = affSg) — LIVE line numbers
j22.js 38 · j24.js 24,25,28 · j25.js 96 · j31.js 17 · j42.js 190,384,577 · j54.js 154 · j6.js 28 · j68.js 42 · j70.js 245 · j71.js 115,121,121,125,128,130 · j78.js 165,166,198,199 · j83.js 180 · j9.js 134,136,137 · j95.js 433,447 · jagacts3.js 128,130,134,138 · jaudit.js 93,93,107,119 · jdc.js 98 · jemoact.js 557 · jgift.js 30 · jht.js 115 · jmen.js 191 · jmood.js 122 · jpetcare.js 193,205 · jpma.js 139,143 · jrcv.js 114,148,149,254,255 · jroute.js 207,249 · jshelf.js 263 · jstip.js 47,180 · jtoil.js 281 · jts.js 362,363,367,368 · jtsb.js 241,243 · jtwoway.js 100,106,111 · jworld.js 136,151 · jworld2.js 45,46,57,67,214

Sorter (scan): innermost function of the site; POST if it is a `run/go/ok/fn/fail/win/lose/done/then/after/res` arrow, or a funnel call (`relAdd affAdd tsAff relTo oanAdd ap apply`, `spAdd(…,"rel")`; comments ignored) stands before the site in the same body, or the site's helper is printed from a POST spot (helpers checked by hand: `HELPER_PRE` tdLeakSay — a POST caller must pass d). Checked against my hand sort: on LIVE the scan lists exactly the 18 sites above.

## Merge (27a36750 onto a96564ad) — commit 1f17478d
33 conflicting files; word-level 3-way merge, then the hunks where LIVE (balSg → `pvQuy(t,n,lab)`) and aff-preview (balSg → `affSg(t,S,n)`) touched the same words take LIVE (pvQuy now IS affSg; LIVE's pvQuyAny / pvOan labels / BAL.relOan keys kept). Restored from aff-preview where LIVE's `pvQuy(t,…)` (partner = the player) is wrong: jgift queen card (affPreviewRun, one number), jrcv visitor cards (`affSg(p,t,…)`). The raw-scan then found 14 card numbers the conflict had taken back to balSg → affSg again (j24 ×3, j25, j71, j78 ×4, jtsb ×2, j9 miss, jagacts3 miss, jtoil frown, jpromob meAff). jky optX: jkyRelW was fed an already-paced spSee number then pvQuy paced again → fed the raw amount.

## Gates
- LIVE a96564ad is an ancestor of the tip · 0 files deleted vs LIVE (`git diff --diff-filter=D origin/main` empty) · dev/build/assemble.py identical to LIVE (module list ⊇ LIVE, incl. `jkring-item.js`, `../../rank/worker/src/score.js`).
- `python3 dev/measure/aff-preview-scan.py` → exit 0: 0 raw previews, pvQuy 71 sites, POST 0.
- `node dev/test/aff-preview.js .` → POST rows (new): 39 per run (33 before the j97 / tiệc hooks were fixed), **0 POST fail in 8 runs** — j9 Nhún nhường / Cảnh báo, jagacts3 health / praise / gossip / secret (her side + NPC→NPC), j24 gift visit (number read from the text handed to kitParse; the kit draws it as marks), j67 e67ally, j97 group (row per person), jemoact tiệc (row per guest), j8 giveTo. Each act runs with her nết hidden and two bonds near the pace ceiling; the result line must be ONE number equal to that person's real change.
- MUTATE (worktree of 355f874c, jagacts3 health result + j67 e67ally reverted to pvQuy): scan → exit 1 (2 POST listed); runtime → FAIL in 3/3 runs («quý ngươi 0 đến +1» vs 1, «thiện cảm +9 đến +11» vs 12).
- `node dev/test/kri-one-row.js .` → KRI-ONE-ROW PASS · 4 receivers. `node dev/test/webkit-syntax.js` → 487 modules, 0 parse-level hits.
- Not run: quickcheck (perf) — RV please run it vs LIVE a96564ad if wanted.

## Findings for RV-183 / MAIN 188 (not fixed here — aff-preview's unit or outside the order)
1. **Pre-existing PRE flake (reproduced on 27a36750 alone, built and run 4× in a worktree: 2 FAIL — «relAdd her→… +11», «gift card … (result line)»)**; on this branch the same rows fail ~1 run in 3 (card «Giúp đỡ nàng», relAdd family, gift card), POST rows never. Causes found: (a) jdh title bonus `fr(n,d)` rounds its fraction with `Math.random()` → a card and its act differ by 1 when a title applies (the test now holds one draw for preview AND act); (b) relAdd = affAdd(S,v) THEN affAdd(v,S): the first leg can fire a jemo emotion that changes her «vui» before the second leg (jfeel multiplies v→S by her vui), while affPreview(v,S) runs the second leg alone.
2. jmem.js «Lấy chuyện riêng ép nàng» RESULT line prints `pvOan(v,H.useOan)` (a preview) after oanAdd — the same law-4 family for oán (pvOan), outside this pvQuy order.
3. LIVE PRE sites that assume the partner is the player: jpma.js:139 `pvQuy(p,…,"quý "+t.name)` (p→t), j42.js:384 `pvQuy(v,BAL.coopBribe.grudge)` (comment says the briber's liking for the servant). Cards only; not changed.
4. Not reached by the runtime test (static scan covers them): j83 wkGive (needs a hand-made work), j55 tdLeak result (a trace roll), jky runOpt (the kỳ board), j9 «Giúp đỡ nàng» run (LIVE's jtwoway twDo answers that card with its own line, no number).

## ROUND 2 — PVQUY-POST-2 (RV-186 FAIL list, MAIN 189) · branch review/pvquy-post-r2
session_01Rc5AsKMg38TfbMyywiukfd · depth 3 · START_CTX ≈ 3 % of 1M → roll ≤ 28 %
PRIORITY #1 CHECK: OD MAIN 189 ruling «a display job must not change results» + RV-186 FAIL list (docs 46bb89cf) | main a96564ad j1.js:173, j8.js:24, jstatpace.js:22-29, j24.js:102-103 | review/* review/pvquy-post 4256fe5f (base), review/aff-preview 27a36750 | claims PVQUY-POST.
KIT CHECK: no UI part touched — numbers inside existing card / result texts only.

| RV-186 item | done |
|---|---|
| 1 restore LIVE result lines | `j1.js:173` apply(), `j8.js:24` ap(), `jstatpace.js:23` spAdd — byte-identical to a96564ad (`git diff a96564ad -- dev/build/j1.js` empty; j8 differs only in the giveTo keep line/ result line of round 1) |
| 2 previews = LIVE's applied numbers | `spSee("hh",n)` → new `hhSee(n)` = affPreview(Empress, her, `hhPace(n)`) (apply's spG peek, THEN hhSet→affAdd chain); jgift queen card dry-runs affAdd(t,S,gr) then `hhSet(S,S.hh+hhPace(g))`; `spSee("rel",who)` back to LIVE (spG pace only); the 5 spAdd-rel cards round 1 had moved to affSg (j3:166 «Giúp nàng», j7:27/34/107/144) print `spSee("rel",n,v)`; jvisit Hoàng hậu card → `spSee("hh",-V.hh)`. Test rows: «spAdd rel ×6» (pace), «apply hh ±» , «card apply({hh:6}/{hh:-4}) chip» (j1 fmt), «card spAdd rel «Đứng ra nói đỡ»» (j7 comet), «gift card queen» (now forced to keep → really runs relAdd + ap hh) |
| 3 hh double pace | proof note **reports/hh-double-pace.md** (LIVE paces twice; LIVE chip showed pace #1 only → shown ≠ real). Not fixed — MAIN to rule |
| 4 pvOan POST | scan now sorts pvQuy + pvOan + pvOanSet: 10 POST pvOan sites → `oanGot` (new, j9, twin of affGot) printing the real oán: j70:364, j78:112, j78:131 (also its quý → affGot), j95:454, jagacts3:136, jemoact:419/437, jexam:123 (one row per mother), **jmem «Lấy chuyện riêng ép nàng»** (hookUse runs the oanAdd inside oanGot), jroad:233. Scan: POST 0. Test row «POST jemoact kexau oán» |
| 5 wrong partner | jpma.js:139 + :143 (law 11) → `affSg(p,t,…)`; j42.js:384 «Từ chối, im lặng» → `affSg(v,a,grudge)`, :383 «Từ chối, bẩm chủ» (same card set) → `affSg(v,a,-grudge)` |
| 6 flake | cause proven: relAdd's first leg fires a jemo emotion (emoEv) that rescales the second leg; a preview (wrappers stand aside) can't see it. With emoEv stubbed: 10/10 PASS (was 2 fails / 8). Test holds emoEv still for card+act pairs (test only) and prints a «GAP (info)» row each run: 0–2 of 16 relAdd pairs differ by 1 with the emotion ON → **separate item for MAIN: real shown-vs-real gap, relAdd + jemo emotion** (not changed). **0 fails in 8 runs** |
| 7 gates | see below |

### Gates (round 2)
- a96564ad ancestor · 0 deletions vs LIVE · assemble.py identical to LIVE.
- `python3 dev/measure/aff-preview-scan.py dev/build` → exit 0 · raw 0 · pvQuy/pvOan sites 127 PRE, 0 POST.
- `node dev/test/aff-preview.js .` → PASS 8/8 (95–98 acts).
- `node dev/test/kri-one-row.js .` → PASS · 4 receivers. `node dev/test/webkit-syntax.js` → 487 modules, 0 hits.
- quickcheck cef4fa29 vs LIVE a96564ad → perf **PASS** (median of 3 new/live: render 325/365 ms, tab 577/684 ms, **buổi 1942/1917 ms**, tasks>200 ms 30/49), open 2275 ms, old save loads + plays a buổi, time-spill PASS. Overall line **QUICKCHECK FAIL** on ONE core-gate hit, G4 96-noise-hygiene text-hygiene --runtime: NEW long «80>70» «Ma ma dặn: Hoàng thượng thích y phục thanh nhã, ăn vận ra mắt phải liệu cho hợp.» — a LIVE string (jselxday.js:210 + jtoil.js:56 TOIL_HK, both identical to a96564ad, untouched here) that the random robot life happened to reach; not this unit's (for MAIN: add it to dev/test/text-hygiene-known.json or shorten it in its own unit). static text-hygiene, vp-doubled, noise-sampler-pure, noise-day all PASS.
- Stills (Fold 755x1000 + iPad 1180x820; talk hand, opened card, queen gift card): `node dev/test/aff-preview-shots.js . <out>` → AFF-SHOTS PASS (0 page errors, no h-scroll). Looked at all 6: talk hand (4 cards, «nàng quý ngươi +n»), opened card «Hỏi han sức khỏe» (kit Tốn/Được), «Tặng quà» picker with the Hoàng hậu row first («Được: nàng quý ta ++», the kit marks; its text = «nàng quý ngươi +14» Fold / «+7» iPad). Portraits are blank because CDN art is blocked offline (same on any local build). Stills kept outside git: /tmp/claude-0/shots/

### Round 2b — MAIN 189 rulings (09:44Z): A keep LIVE double pace (hhSee = the fix) · B accepted gap, info row kept · C/D card prints the real applied number → done here
- C jky: `jkyAfV` / `jkyAfGain` (jky.js, beside relTo) — the raw servant / official row relTo writes (clamped, no pace; 0 when no one holds it). Card (optX) prints `jkyAfGain`; result line (runOpt) measures the row before/after relTo (relTo now runs before the line is written — same call, same args). Test rows «jky card servant row / official number / no one» (via read-only hook `window.__jkyAf`).
- D j7 typed spAdd-rel cards → `spSee("rel",n,who)`: pact «Kết minh», coldvisit «Xin Hoàng thượng ân xá», fire «Lao vào cứu người», rvframe «Báo cho…», «Giúp … một tay», rvquarrel «Đứng ra can ngăn» (now one row per person), «Đứng về phía…», rvmusk «Cảnh báo…», rvbribe «Mách…». Raw `rel -= n` «thù -n» parts are exact already (no pace, no clamp) — unchanged. Test rows «Đứng ra can ngăn» ×2, «Kết minh».
- Gates: aff-preview 8/8 PASS (101–104 acts) · scan exit 0 · kri-one-row PASS · webkit-syntax 0 · text-hygiene --static PASS · 0 deletions · assemble.py / j1 identical to LIVE. Quickcheck not re-run for these two text-only files (perf unaffected: card strings + one peek per option).

### Separate items for MAIN (not folded)
A. hh double pace — reports/hh-double-pace.md. **Ruled 09:44Z: keep LIVE.**
B. relAdd + jemo emotion gap (item 6): card ≠ act by 1 in ~0–2 of 16 relAdd pairs when the first leg's emotion fires. **Ruled: accepted, info row kept.**
C. jky non-consort target (servant / official, `relTo` raw `r.af += n`, no pace): the card prints `spSee("rel",rw,r)` (a pace) — on LIVE too; shown ≠ real when the pace bites. **Ruled C → fixed in 2b.**
D. LIVE typed numbers on spAdd-rel cards (j7.js:43 «Kết minh» +25, :155/170 +40, :176/177/181/182/186/192): card prints the raw amount, act paces (spAdd). **Ruled D → fixed in 2b.**

## HANDOVER (if a fresh seat continues)
Round 2 tip = review/pvquy-post-r2 (this report commit). Round 1 tip = review/pvquy-post. Tools: the scan (`--pvquy` = every site with its sort and reason), `node dev/test/aff-preview.js .` (rebuild first: `bash dev/site/build_site.sh`). A new POST site → `affGot` around the funnel, `balSg(d)`; a new helper used on both sides → add it to `HELPER_PRE` with the arg a POST caller must pass.

## ROUND 3 — PVQUY-POST-3 (re-merge onto new LIVE aecbc267, MAIN 189) · branch review/pvquy-post-r3
session_01Rc5AsJyaVisRE1nRk3Y6vS · depth 3 · START_CTX ≈ 3 % of 1M → roll ≤ 28 %
PRIORITY #1 CHECK: MAIN 189 rulings (no result change vs LIVE; preview = applied number; PRE = prediction; POST = real rise; hh double pace kept) | main aecbc267 (lr-rules-r3: oan-pace-2 F2 spSee wraps, ghét step opDn in affAdd, pace-speed spAbs/spCeil, one Tố giác) | review/* review/pvquy-post-r2 97bd0858 (RV-186 PASS, void by the new LIVE) | claims PVQUY-POST.
KIT CHECK: no UI part touched — numbers inside existing card / result texts only.

TRUE 2-parent merge: `4f254405` = aecbc267 + 97bd0858 (20 conflicting source files + built files), then `c47a974a` (jexam fix + scan + rebuild).

| conflict | resolution |
|---|---|
| j9 affAdd | aecbc267's ghét step (`opDn`, a fall = one bounded step per cause, day cap) kept on the live path, before relMS as on LIVE. A dry run (`AFF_DRY`) takes the SAME step, then puts `x.agw` / `x.opa` back (affPreview: at once; affPreviewRun: in its undo list) → a preview of a fall = what lands (law 4), nothing moves. |
| jstatpace spG | aecbc267's `spAbs` / `spCeil(rk,k)` + r2's peek that creates no carry. `spSee("hh")` → `hhSee` kept (LIVE double pace shown honestly). |
| PRE card numbers (j24 ×3, j25, j30 queen, j42, j55, j70, j71, j78 trinhhh ×2, j95, jtsb ×2) | aecbc267 wrapped `balSg(spSee("rel",n))` (the pace step alone, no partner); r2's `affSg(partner,…,n)` = the dry run of the whole affAdd chain incl. that pace → r2 wins (one number = the act). Where r2 had a fallback (`q?affSg(q,…):…`) the fallback keeps aecbc267's spSee. |
| spAdd-rel cards (j3, j7 ×4) | `spSee("rel",n,who)` (r2: spAdd paces against that person). |
| jaudit | `pvQuy` = r2 (`affSg`, range kept); aecbc267's `aaSee` + its `pvOan` kept. |
| POST lines | j9 «Tạ lỗi» run: aecbc267 printed `spSee("oan",…)` after oanAdd → `oanGot`; j72 fn_8 / jpoison found: auto-merge gave `balSg(spSee("rel",<real d>))` (pace on an already-real number) → `balSg(d)`; j78 chest run: r2 affGot/oanGot; jexam «Thái hậu lạnh nhạt»: printed `pvOanAny` after oanAdd (missed by the r2 scan: the -Any twins were not scanned) → the real oán each took (`oanGot`, one number or «a đến b»; no number when no one). |
| aecbc267 logic | kept as is: j30 phản tọa / tư thông tiers, j42 spyLearn, j78 / j95 one «Tố giác» (r2's number fixes moved onto the surviving lines), j9 «Cùng cung» notice. |
| test | aff-preview: the hh chip regex accepts an unsigned «0» (aecbc267's ghét day cap can swallow apply({hh:-4}) after an earlier fall the same day; chip «thiện cảm 0» = real 0). Test-only. |

### Gates (round 3, tip c47a974a)
- aecbc267 ancestor · merge 4f254405 parents (aecbc267, 97bd0858) · 0 files deleted vs aecbc267 · MODGATE: assemble.py identical to aecbc267 (0 quoted *.js missing).
- j1.js / j8.js (apply / ap, the hh path) = aecbc267 (untouched by this unit).
- `python3 dev/measure/aff-preview-scan.py dev/build` → exit 0 · raw 0 · pvQuy/pvOan(+Any) sites 134 PRE, **POST 0**. MUTATE (jexam back to pvOanAny) → exit 1, POST 1.
- `node dev/test/aff-preview.js .` → **8/8 PASS** (101–104 acts, preview = real).
- `node dev/test/kri-one-row.js .` → PASS · 4 receivers. `node dev/test/webkit-syntax.js` → 492 modules, 0 hits.
- quickcheck c47a974a vs LIVE aecbc267 → **QUICKCHECK PASS** (627 s): core gates PASS (hooks 17), time-spill PASS, open 2759 ms 0 errors, old save loads + plays a buổi, perf median of 3 new/live: render 349/318 ms, tab 606/715 ms, **buổi 1968/2716 ms**, tasks>200 ms 62/44.
- Rerun on the final code (c47a974a = tip code; 573444e3+ report only): aff-preview 8/8 PASS (101–103 acts) · kri-one-row PASS · webkit 492 modules 0.

### HANDOVER (round 3)
Tip = review/pvquy-post-r3 (this report commit). Waiting RV-186 delta. If LIVE moves again: merge the new LIVE into r3 (true 2-parent), rule: aecbc267-style `balSg(spSee("rel",n))` on an affAdd/relAdd card → `affSg(partner,…,n)`; a `spSee` wrapped around an affGot/oanGot number → drop the spSee; rerun the scan + aff-preview ×8.

### Separate item for MAIN (not folded — aecbc267's own new sites, spSee not pvQuy/pvOan)
E. aecbc267's oan-pace-2 F2 put `spSee("rel"|"oan",n)` into 8 RESULT lines, 10 calls (the scan run with the spSee family; a96564ad had 1 — jky, fixed in r2b). Several write the number RAW (no pace at all: `s.loyal=cl(+n)`, `h.af[k]+=n`), so the line shows a paced number the act never paces: j10.js:106 / :113 / :122 (servDo thưởng / che chở, courtGive biếu), j55.js:57 (tdGift head returns gift), j72.js:406 (trả bạc), jgreet.js:133 (provoke line, oán), jtc.js:35/38 helper printed after the act at j68g.js:67 (thcSet loy/envy/calm). Law 4 says a result line prints the real change; outside this order → MAIN to rule (fix = measure before/after like affGot, or print raw where the write is raw).

### Round 3b — LIVE 8a30664e + MAIN 189 ruling on item E (11:11Z): «a result line prints the number actually applied; raw write → raw applied value; paced write → real rise»
- FF-merge of LIVE: `b023afd5` = (8b0f3346, 8a30664e) — sources auto-merged (8a30664e touched j93 / jnf / jverdict only), index.html / sw.js rebuilt; assemble.py identical to 8a30664e; 0 deletions.
- Item E fixed (`b25c4f42`), every line measures the stat before/after the SAME write (no number in the game logic changed):
  j10 servDo «Thưởng» (s.loyal, raw clamp) · «Che chở» success AND its fail branch (the fail printed the raw constant `+failLoy`; law 11 same group) · courtGive «Biếu» (c.af, raw) · j55 tdGift «Cương trực» head returns the gift (h.af, raw clamp) · j72 «Bắt … trả lại» (s.loyal) · jgreet provoke line (relAdd paced + opDn/opUp: `affGot(S,v)` / `oanGot(S,v)` around the same relAdd) · jtc thcSet drop + pick (her row = measured; the other maids = measured, one number or «a đến b», clause left out when there are none).
- Scan: `aff-preview-scan.py` now sorts `spSee("rel"|"oan",…)` too (the pace peek is a prediction): 259 sites, PRE 259, **POST 0**; MUTATE (jtc + j10 back) → 7 POST.
- Test rows (aff-preview.js): «POST j10 servDo thưởng (loyal 98)» → line +2 = real 2 (the raw constant is 12; the old spSee line would not have shown 2), «(loyal 40)» +12, «POST j10 courtGive tq» +10; jtc thcSet is not reached in the test life (info row; static scan covers it). The test gives the life one servant via the game's own `mkServ` when it has none (setup only).
- Gates on b25c4f42: aff-preview **8/8 PASS** (105–108 acts) · scan exit 0 · kri-one-row PASS · webkit 492 modules 0 · 0 deletions vs 8a30664e · assemble.py identical · j1.js = LIVE, j8.js differs only by r2's giveTo result line (display).
- quickcheck vs LIVE 8a30664e, 2 runs (honest):
  run 1 (b25c4f42): FAIL. G4 coop-one-world «guest week changes the world» (R.fa, seed 7). Rerun of the probe alone on this tip: seeds 7 / 3 / 5 all PASS → flaky. Perf FAIL too: one day life had 83 long tasks > ceiling 72; one live run had 73 the same check. Medians new/live: render 388/319, tab 722/728, buổi 2722/2326, tasks>200 71/56.
  run 2 (599db873, same code): **core gates PASS** (coop-one-world PASS), time-spill PASS, old save OK. Perf FAIL only on the absolute day ceiling: lives 77 / 85 > 72 long tasks. The LIVE build's own median is 74, also above 72, so the box was loaded. Medians new/live: render 436/365, tab 882/694, buổi 3024/2765, tasks>200 77/74.
  For comparison, the same code family vs aecbc267 on a quieter box (c47a974a) was a PASS with buổi 1968/2716. This unit adds no per-buổi work: display strings, plus a JSON snapshot only when a card previews a FALL. → for RV: please rerun quickcheck on your box.
