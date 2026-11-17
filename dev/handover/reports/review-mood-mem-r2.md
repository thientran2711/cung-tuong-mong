PRIORITY #1 CHECK ('ghenUp|v\.ghen'): OD 0 | ledger 0 | claims 2 | main 15 | review/* 0 (foreman's line; this job = review/mood-mem-r1 + review/mood-mem-r2) · own grep 'pgUp|memWake|mwTick|mwWhy': main 0 · review/* only review/mood-mem-r2 (+ the older review/mood-mem-wip draft it was ported from) — reused jmem's own phrase / name / pronoun / number words instead of the copies, nothing rebuilt.
# REVIEW MOOD-MEM r2 (BIG, opus) — delta 654b205b..1b4f4967 on review/mood-mem-r2 (step 0 = 654b205b already PASSed)
Reviewer session_01UV1SzhYFatoThxPEGCiErj. START_CTX ≈ 5 %.

## PHASE 1 VERDICT: CONTENT PASS = 96e65494 (report commit; code = 983a4e5e) (review/mood-mem-r2, worker 1b4f4967 + 3 reviewer commits). Not fast-forwardable yet:
origin/main is not an ancestor (base review/ag-all-2 not on main). PHASE 2 (main merge → FF sha) waits for the foreman's "ag-all-2 LIVE on main".

## Owner rules checked (OD verbatim read: L1678 (b), 17/11 ~18:33Z, ~19:10Z, ~19:25Z, ~20:25Z)
- (b) "làm theo 2 tầng": layer 1 = p.mk causes (khắc timers, BAL.mood2); layer 2 = jmem memories. A memory wakes a short layer-1 cause on MEET (the two
  come to one place, after being apart), PLACE (m.pl stamped by memAdd when both were there; never the holder's own dwelling) and ANNIVERSARY (same tuần a
  later year, once). Weight gate BAL.memWake.min / ann, strength + khắc by weight (lifelong × life), cap of wakes per MONTH per person (S.turn = month,
  checked: j3 S.turn++ monthly, wk() = turn×3+tuần), per-memory pause cd. NPC parity: one mwTick loop over memHolders() (her, Hoàng thượng, Thái hậu,
  consorts, servants). Woken cause = ordinary mk cause (class sec, aimed at the remembered one) → moodCauseKnown reads it (test 10).
- ~19:10Z set: Chạnh lòng is an approved feeling; the score keeps the name Ghen (step 0 EMO_GHEN). memWake.kind uses vui / gian / so / buon / dau;
  'dau' leaves the set with FEELINGS-18 (dau→buon heavy) — mwFeel falls back to good/bad when a key is gone, and FEELINGS-18 #2 already maps
  musk / kidharm / takeaway to buon on its branch. Not a FAIL; whoever lands second keeps FEELINGS-18's mapping.
- ~19:25Z / ~20:25Z: no seal / portrait / news change here (no news line for a woken feeling — matches "news only reports EVENTS").
- Ghen family (LUẬT SỬA CẢ NHÓM): her own score v.pg had 2 direct raises (j8 rivalNight, j75 rivalNight, typed +6). Now j1 pgUp = the one way (clamp +
  her Chạnh lòng cause aimed at that consort, true why "X được thị tẩm"), BAL.mood2.ghen.pgNight. Scan: ghen-raise-scan.py → 0 direct (30 via ghenUp);
  --pg → 0 direct (2 via pgUp), other .pg fields skipped by name (checked the SKIP list: scar / plot / dataset page fields, not the score).
- VANPHONG: one memory-wake wording line; the Ghen / Chạnh lòng line stays the step-0 one (no double rule). Cổ trang, no %, no numbers in the text.
- ONE CORE: every number in BAL.memWake / BAL.mood2.ghen.pgNight; year length = 12 × TUAN.length (calendar shape, not a balance number). one-core-guard PASS.
- KIT FIRST: no UI part touched (cause rows go through the existing mkCauses / kit tap list).
- OLD SAVE: memories without pl / ww and people without mwc load and wake nothing on the first look (test 11); quickcheck old save from live.
- CO-OP: NPC wakes / NPC feelings host only (mwWorld → mckWorld, same as ghenFeel); her own wakes on each seat's own S. mem-coop ALL OK.

## Fixes made by the reviewer (small; no worker running)
1. 81a760f1 mwWhy carried private copies of jmem's phrase builder, names, pronouns and the number words (mwName / mwPron / MW_NUM). jmem now exports
   memPhrase / memName / memPron / memNum (its own functions) and mwWhy reads those — one source. Meet text said the name twice ("gặp X, chợt nhớ chuyện
   cũ: X tặng ngươi …") → "gặp X, chợt nhớ chuyện cũ: nàng từng tặng ngươi …"; when both sides would be "nàng" (NPC ↔ NPC) the name is kept so it stays
   clear. VANPHONG line updated.
2. 983a4e5e a dead holder (alive false / dead) wakes no memory (a dead consort's anniversary could otherwise add causes to a dead person).
3. Site build (index.html, sw.js, assets.json) in 983a4e5e.

## Tests (on 983a4e5e build)
mood-mem 16/16 · moodknow-step0 19/19 · ag-moodknow 33/33 (×3; one earlier run 2 FAIL then 3 clean runs = the known random base) · mem-coop ALL OK ·
memories ALL OK · one-core-guard PASS · ghen-raise-scan 0 / --pg 0 direct.
mem-upgrade: 2–5 random FAILs per run from the same family (fade_by_personality_*, fade_6mo_grudge_kept_longer, behav_danger_*, cause_soc_help) —
identical family on the base 654b205b (3 runs each) → pre-existing randomness, not this delta.
QUICKCHECK --cpu 4: PASS open 1576 ms, old save ok + buổi, perf new/live render 210/188, tab 377/407, buổi 1041/850, TIME-SPILL PASS. CORE GATES: G1 one-core-bind 6 mismatches (j25 / j78 BAL.eff.j9/j2) + frozen list 3843 → 5093 = identical on 654b205b and absent on main → pre-existing on the ag-all-2 line, cleared by the main merge. G4 coop-one-world failed once ("merge differs from the host"), then 2 clean re-runs = the known ag-all-2 coop flake (step-0 review), not this delta.

## Notes (not FAILs)
- The anniversary counts from m.w, which jmem moves when a memory is reinforced → "tròn N năm" counts from the last time it happened again. Acceptable
  (it is the last such day); if the owner wants the first day, jmem must keep a first-week field.
- jmem's pronoun for any non-emp/th person is "nàng" (also for a eunuch servant holder); this is jmem's existing wording family, not this delta.

## PHASE 2 (pending)
Waits for the foreman: ag-all-2 LIVE on main → merge origin/main into review/mood-mem-r1 565e6c24 → site build → moodknow-step0, ag-moodknow,
emotion-acts, coop-one-world 7+3, QUICKCHECK --cpu 4 → "PASS <sha> FF" → then the same for review/mood-mem-r2 on top.

## PLAN CHANGE (C-AG #6, from main s37 21:17Z): ONE landing head review/npc-chain-land on LIVE main — WIP + HANDOVER (rollover, context ≈ 28 %)
Branch review/npc-chain-land @ a088443d (merge main 4c8568f5) (pushed). Built from:
1. review/feelings-18-r1 5ca1b262 + merge 68178e5d (mood-mem r2 review; only built files conflicted).
2. + review/kit-figure-mood-r6 43fbf2e7 (only built files conflicted; r6 contains feelings-18-r1).
3. + review/ag-all-2-r2 521a4ac3 (its WIP head, merged EARLY on purpose: it already holds the main c0a52168 resolutions → 37 conflicting files against main
   dropped to 13 + 7). Resolutions (real merges): ag-all-2's BAL keys kept AND the chain's true ghen whys / ghenUp / pgUp (j7 j8 ×2 j68g j71 ×2 j75 jts);
   jemo / jemoseal / jemocause / KIT.md / emotion-acts(-2) tests = FEELINGS-18 + kit-figure-mood r6 side (owner 20:15Z no intent, 20:25Z seal always for a
   known person, no pop-over; no caller of kitEmoSeal.pop / emoSealSrc left); jbal2 both appended blocks kept (MOODKNOW/MOOD-MEM + AG-ALL-2f3);
   assemble list = union.
4. + origin/main 4c8568f5: assemble + jshelf/jdisp; j19 main "Bại" + fmt kept with ag-all-2 payWinFail; jemo/jemoseal/jemocause/KIT.md = r6 side
   (supersedes main's kit-figure-mood r4/r5); CHANGE.txt main.
Tests on the WIP build (dev/index.html via assemble; site NOT rebuilt yet): feelings18 34/34 · mood-mem 16/16 · moodknow-step0 19/19 ·
ag-moodknow 33/33 (one earlier run 1 FAIL = the known random) · one-core-guard PASS.

### TODO for the successor (in order)
a. bash dev/site/build_site.sh → commit index.html / sw.js / assets.json.
b. Step 2 of the order: G1 one-core-bind 6 mismatches at the root — j25.js:11 BAL.eff.j9.evRun and j78.js:127 BAL.eff.j2.evRun / BAL.eff.j2.run: the TEXT
   prints a BAL key that the option's own rule does not read → make the rule read the same key (or print the key the rule reads). Check
   .quickcheck/gates/g1-bind.txt after quickcheck; whole family (LUẬT SỬA CẢ NHÓM): the gate lists all.
c. When the ag-all-2 r2 reviewer (session_01UV1SzibgyTxRDxLdJ5yW6t) gives its PASS sha on review/ag-all-2-r2: merge it in (only the delta after 521a4ac3).
   If main moved: merge origin/main again.
d. Gates: quickcheck --runs 5 (--cpu 4), coop-e2e 63/63, feelings18 34/34, mood-mem, moodknow-step0, ag-moodknow, one-core-guard, emotion-acts(-2),
   coop-one-world 7+3, fig-seal shots Fold 755x1000 + iPad 1180x820 (shots outside git), old save → ONE "PASS <sha>" (origin/main ancestor) → C-AG #6
   session_01UV1SzjqdQPh2K9YUVK9VhU.
Tools used for the merge (re-creatable): a hunk char-diff printer + a hunk resolver (ours/theirs/sub on theirs) — plain python, nothing in the repo.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
