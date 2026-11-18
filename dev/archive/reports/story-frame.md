PRIORITY #1 CHECK ('Bắc Địch|jorigins|STORY wrap|j67|regEach|load order'): OD 19 (hòa thân / origin words, no ruling on this bug) | ledger 1 | claims 8 (none on this fault) | main: j67.js:185/1788 load-time loops + jorigins.js:14 hand call story67Wrap("bd") (tut-followups aa391edf, a per-module patch, already on main) | review/* 0 → root fix in a new tiny jreg.js reused by every pass; no second frame, jst14/STORY/ARC67 reused.

# STORY FRAME for late-added origins + WHOLE FAMILY of load-time registry passes — worker report (D8)
Worker D8 story-frame (opus, START_CTX ~5 %). Branch **review/story-frame** @7be4cdc60bbef32eb0f16bf2223e3ce0859be9f3 (base live main 6c4f21c3).

## Root cause and root fix
The game is one script of modules in assemble order. A module that loops over a registry while loading sees only the entries of modules before it.
Live main had already patched bd by hand (jorigins calls story67Wrap("bd")); the brief's ask was the root fix, not another hand call.
- **dev/build/jreg.js** (new, loaded 2nd): `regEach(obj, fn, name)` runs fn on every entry now AND on every entry added or replaced later;
  `regSweep()` runs at the end of the game script (assemble.py appends it, + `setTimeout(regSweep,0)` for load timers) and at every life start
  (j67 STORY wrapper init). fn runs once per key+value; late=1 tells it the entry came after the pass was registered.
- j67: the STORY wrap and STORY acts loops are now `regEach(STORY, …)`; the hand call in jorigins is removed (comment points to jreg).
- Scan tool **dev/measure/regscan.py + regscan.js**: builds an instrumented copy (module markers; hooks Object.keys/values/entries, Array
  forEach/map/filter/some/every/reduce/find/findIndex/flatMap/for-of, and rewrites `for…in` over globals) and lists every load-time read of a
  named global whose key set grew later. Reviewed non-passes are listed in its OK table with the reason. Gate: `missed later keys: 0`.

## Whole family — before / after (regscan + runtime checks, live main 6c4f21c3 vs this branch)
| site | registry | missed on main (later entries) | after | effect |
|---|---|---|---|---|
| j67 story67Wrap loop | STORY | bd (hand call in jorigins) | regEach | frame for any origin added later; jorigins hand call removed |
| j67 story67Acts loop | STORY | bd | regEach | same |
| j67 Sức/hh halving of story options | ARC67 | 13 hand-typed arcs never halved: bd_hoa/ngua/tuc/hoang, st_the/con/dong, tm96a/b/c, noi14, hau14, ke14 | regEach, non-road arcs | those 13 arcs now follow the measured rule (Sức/hh costs of story options halved). Road chapters (o:"rd", 290 arcs) deliberately NOT halved: their numbers come from BAL.road (one core). 0 road arcs changed (checked). WeakSet: a shared option is halved once. |
| j97 E.r97 rare ending | R97 | 40 road finales (jroad did it by hand in a timer) | regEach | jroad's guarded copy kept (harmless) |
| jstory alt72 (cheaper 2nd way) | T72 | 18 jreign quest lines (0 qualify today) | regEach | future quest lines covered |
| j85 every act names itself (Đức deeds) | ACT | 17 acts (giahoa, tat, phatquy, rash, laydo, laydol, spyk…) | regEach | Đức changes of those acts now say why |
| j17 figure availability probe | FPOOL | 73 figures (pools man, ct1–5) never probed | regEach | fallback works for them |
| j83 Hiệu quả / Dấu vết line | WILL | docngam, phanhuy, meduoc | regEach | poison items show the line |
| j98 small icon → painting | ITEM_ART_G→ITIMG | 14 items (jpoison, jitev…) | regEach | same as jeitem/jkc/jstip/jweather already did by hand |
| jwdinv hair → trâm | IT | 0 today | regEach | future hair items |
| jwdinv fabric «May áo» text | IT | vaibong, aolong kept the wrong «May áo thường: Sắc +1» text | regEach | they read «May áo: …» like every fabric |
| j84 help-text wording fix | HX | kgt, kap, khm, kld, kty | regEach | same wording rule |
| jrcp first recipe bậc 0 + sách phổ items | RCP_ST | jtds kinds (jtds copied both passes by hand) | regEach | jtds copy removed (one code) |
| j79 KP_GLRE glossary regex | KIT_GLOSS | 27 words (unused constant) | built on first use | — |
| j91 K91.engines | KG82_ENG | 17 engines (jnwp refreshed by hand) | live getter | jnwp refresh removed |
Not changed (reviewed, reason in regscan.js OK table): lookups/check-then-add (RVGRP, ARTS, KINV_CATS, KIT_EVFIT, ORIGINS), runtime
functions called during load (KG kgOf/tab sync, SCIMG sync, IT itRx 4 s cache, luxThemeTags re-run), jrd_cnv CNV_QFIX (each call sits after its
road's last rdDef — checked), jwkr WKR (jtds kinds arrive in another raw shape, normalised by jtds:37), j83 IROUTE route lists (per-route design;
jpoison extends maid/cho itself).
**ONE-CORE note for the coordinator (not changed):** jecon reprices every ACT scheme with a Bạc cost by econSchemePrice; the 3 jtsb schemes
(thathu, phonghoa, thaopet) load later and keep their typed gates «Bạc 40/30/10» (jtsb.js:213–215). Repricing them here would contradict that
text; the typed numbers should move to BAL first (separate task).

## Old saves of a bd life (jst14 f67Mig)
A bd life saved before the fix has S.st without v2. After a save loads (normAll → setTimeout 0; a new life is already framed by then, so no-op)
the frame starts once, only for origins wrapped late (W.__late): tutorial chapters whose months are over close «Lỡ dịp» (no reward, as their limit
would have), the running one keeps only the months left; one summary log line «Mệnh truyện mở lại. Đời này đang ở chương n «…»; k chương đầu đã
qua hạn, khép lại không thưởng.»; no cards. Save has no entry month: palace-start lives count from month 0; at home (f14Home) the tutorial waits.
Old v1 saves of other origins keep their old storyline (unchanged policy).

## Tests (all on this branch's build, absolute paths)
- **dev/test/story-frame-oldsave.js** (new; saves made by 7abaf07a, the pre-fix build): month 0 → ch1 «còn 6 tháng»; month 9 → ch1 Lỡ dịp, ch2
  «còn 7 tháng»; month 40 → ch1–3 Lỡ dịp, ch4 = a bd arc; quiet + one log line; second load = same frame; 6 buổi play on, chapters never go back;
  old tt v1 save untouched; 0 page errors → **PASS 8/8**.
- tut-origins-scan.js: **PASS 10/10** (bd: wrapped, f14, nhap14, quests an/di/trang).
- origins.js 755x1000: **PASS 20/20** (bd arcs v2, 4 arcs play to ends).
- story14-frame.js: crashes at the home-road step with `chAdvance67 … reading 'startsWith'` — **the same crash on live main 6c4f21c3** (and on the
  older main checkout), so not from this branch; before the crash this branch prints 0 FAIL (main printed 1 random L1253 spread FAIL). Pre-existing
  test/home-road fault for the coordinator to route (test line 99 sets ch.i=j-1 on a plan where j is past the end).
- regscan: 91 load-time reads of named globals, **0 missed**.
- quickcheck.sh: **PASS** (core gates one-core-guard · rules-one-source · kit-conform · coop-one-world; time-spill guard; old save loads + buổi;
  perf new/live render 259/268 ms, tab 343/336, buổi 1007/921 (+9 %: noise of a box running 3 browsers; 3-run medians, the gate passed).
- coop-e2e: **60/60** passed (not worse).
- Shots LOOKED at: bd Mệnh truyện ch1 «Nhập cung, đứng vững», Fold 755x1000@2 + iPad 1180x820@2 — kit panel, no overlap, nothing cut.
  CDN review folder: img/_review/story-frame/ (bd-menh-fold.png, bd-menh-ipad.png); verdict giver wipes it.

## Story bot re-run (review/story-bot tools, runstory.sh, ch1–4, 34 lives, Dễ/Vừa/Khó, bd + tt + nc)
| origin | lives | reach ch4 | reach ch5 | ch4 start (month) |
|---|---|---|---|---|
| bd | 12 | 12/12 | 12/12 | 12–13 |
| tt | 11 | 11/11 | 10/11 | 10–14 |
| nc | 11 | 10/11 | 9/11 | 11–15 |
Before (story-bot P1): bd 0 chapters in 28/28 lives. bd ch4 outcomes: ok 1, mid 7, bad 4 (small n). No stuck lives.

## Files
dev/build/jreg.js (new), assemble.py (jreg 2nd + end sweep), j17, j67, j79, j83, j84, j85, j91, j97, j98, jnwp, jorigins, jrcp, jst14, jstory, jtds,
jwdinv; dev/measure/regscan.py + regscan.js; dev/test/story-frame-oldsave.js; site rebuilt (index.html, assets.json, sw.js).

SẴN SÀNG KIỂM 7be4cdc60bbef32eb0f16bf2223e3ce0859be9f3
