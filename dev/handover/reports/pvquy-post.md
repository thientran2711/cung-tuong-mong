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

## MAIN 189 ruling applied (one unit with aff-preview 037efcff; reviewer RV-186) — commits e859d8fd (merge 037efcff), d75648da
A display job must not change results: LIVE's applied numbers stay, the preview matches them.
- REVERTED aff-preview result change 1 (hh paced once): j1 apply and j8 ap pace hh with spG again, as LIVE; the write `S.hh=S.hh+v` → hhSet → affAdd is LIVE's. Preview `spSee("hh",n)` = the SAME two steps: spG pace peek, then the dry affAdd chain (affPreview(q,S,p1)); jgift queen card the same (affPreviewRun: affAdd, then hhSet(S.hh + pace peek)). apply's pop now shows what S.hh really moved (display only). Whether LIVE pacing hh twice is intended → a separate item for MAIN, not folded here.
- REVERTED aff-preview result change 2 (spAdd rel via affAdd): spAdd(p,"rel",n) paces p.rel only, as LIVE. Its 5 cards (j3:166 coldL, j7:27 poison, j7:34 spy, j7:107 comet, j7:144 cane) print `balSg(spSee("rel",n,v))` = LIVE's pace peek (spSee rel / oan back to LIVE's pace-only path; its other callers are jky's non-consort branches).
- scan: a spAdd-rel card must print spSee, a relAdd/affAdd card affSg/pvQuy. test: spAdd family previews spSee("rel"), hh family spSee("hh") — 3 runs: spAdd rel ×6 and apply hh ± all = real (e.g. hh +8 → card +7, real 7); POST rows 0/39 fail each run.
- MODGATE (assemble.py quoted *.js ⊇ LIVE): 0 missing, 508 = 508. a96564ad ancestor; 0 deletions; merges 1f17478d (a96564ad + 27a36750) and e859d8fd (4256fe5f + 037efcff) have 2 parents.

## Findings for RV-183 / MAIN 188 (not fixed here — aff-preview's unit or outside the order)
1. **Pre-existing PRE flake (reproduced on 27a36750 alone, built and run 4× in a worktree: 2 FAIL — «relAdd her→… +11», «gift card … (result line)»)**; on this branch the same rows fail ~1 run in 3 (card «Giúp đỡ nàng», relAdd family, gift card), POST rows never. Causes found: (a) jdh title bonus `fr(n,d)` rounds its fraction with `Math.random()` → a card and its act differ by 1 when a title applies (the test now holds one draw for preview AND act); (b) relAdd = affAdd(S,v) THEN affAdd(v,S): the first leg can fire a jemo emotion that changes her «vui» before the second leg (jfeel multiplies v→S by her vui), while affPreview(v,S) runs the second leg alone.
2. jmem.js «Lấy chuyện riêng ép nàng» RESULT line prints `pvOan(v,H.useOan)` (a preview) after oanAdd — the same law-4 family for oán (pvOan), outside this pvQuy order.
3. LIVE PRE sites that assume the partner is the player: jpma.js:139 `pvQuy(p,…,"quý "+t.name)` (p→t), j42.js:384 `pvQuy(v,BAL.coopBribe.grudge)` (comment says the briber's liking for the servant). Cards only; not changed.
4. Not reached by the runtime test (static scan covers them): j83 wkGive (needs a hand-made work), j55 tdLeak result (a trace roll), jky runOpt (the kỳ board), j9 «Giúp đỡ nàng» run (LIVE's jtwoway twDo answers that card with its own line, no number).

## HANDOVER (if a fresh seat continues)
Tip of review/pvquy-post = this report commit. Tools: the scan (`--pvquy` = every site with its sort and reason), `node dev/test/aff-preview.js .` (rebuild first: `bash dev/site/build_site.sh`). A new POST site → `affGot` around the funnel, `balSg(d)`; a new helper used on both sides → add it to `HELPER_PRE` with the arg a POST caller must pass.

## HANDOVER 2 (seat at 36.6 % context ≥ START+25 % → MAIN 189 opens the successor) — tip of review/pvquy-post after this commit
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

State: MAIN 189 order DONE in code (one unit with aff-preview 037efcff; its 2 result changes reverted, LIVE numbers kept; previews match: §MAIN 189 ruling). Reviewer = RV-186 session_01Rc5AsKajbM5YZjbexkmFTX. **RV READY NOT SENT** — two items open:
1. **Q-SOFTLOCK (dev/test/q-softlock.js index.html)** — runs by sha (3 each unless said): LIVE a96564ad PASS×3 · old LIVE 22afefb4 FAIL1,PASS,PASS · aff-preview 27a36750 PASS×3 · merge 1f17478d PASS×3 · 355f874c (POST) FAIL2,PASS,PASS · HEAD d75648da+ : quickcheck FAIL4, then PASS, FAIL8, FAIL4, PASS, PASS, FAIL8 (3/7 pass). Failure mode: no page errors; the test's openView() never gets DF.F — token taps return «gone»/«zero» or hit `div.kring-band` (the jkring person RING opened instead of the DF person view), so the 4 view rows fail. This unit touches none of jkring / jdfv / jdayq / jdf / jfocus / jkpick / jkstage / jtabs (jkring-item.js only = KK68 result rows, already in 27a36750). Next: run more runs per sha (≥6) on 1f17478d vs 355f874c vs HEAD to see if the rate is real; if real, bisect the 355f874c / d75648da hunks (suspect something that changes the start state — e.g. jky optX or j1 apply hh pop — making the start place a ring place), else report it as the flake (LC35 already lists q-softlock as a known flake on a96564ad).
2. **quickcheck perf** (buổi median vs LIVE) not measured: my `timeout 1700` killed quickcheck after core gates (1664 s). Rerun `CTM_LIVE_REF=a96564ad bash dev/tools/quickcheck.sh --runs 3` ALONE with no timeout (≥45 min). Core gates there: all PASS except G4 94-q-softlock (item 1); noise-day advisory.
Then send RV-186 «RV READY review/pvquy-post <sha>» with what it asked: aff-preview.js, kri-one-row, scan, pvQuy PRE/POST scan (92 call occurrences on LIVE = 82 call lines; 18 POST), webkit-syntax, quickcheck buổi median vs LIVE. Already green on this tip: scan exit 0, aff-preview.js PASS 2/3 (the 1 fail = aff-preview's pre-existing PRE flake, §Findings 1; POST rows 0/39 fail), MODGATE 0 missing, 0 deletions, merges 2 parents. Not re-run after d75648da: kri-one-row, webkit-syntax (re-run: cheap).
