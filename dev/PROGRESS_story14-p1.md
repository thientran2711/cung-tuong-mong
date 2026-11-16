# PROGRESS review/story14-p1 — 14-chapter life frame (phase 1 of dev/STORY_ROADS_PLAN.md, handover branch)

## Already-built check (LUẬT ƯU TIÊN SỐ 1)
j67 v3 (main) already had a ~13–15 chapter plan (nhap, sung, 4 origin arcs, fin, 3 shared, st_the/st_con/st_dong, hau, ke), road history
(ctm-arcs), castRv67, endings, rewards. j96/jkc splice Thanh mai trúc mã chapters into the plan. jgoal (KIT §72) = chapter detail.
review/chapter-detail-r1 (jchap.js) is queued, not on main — this branch only adds a few lines to jgoal/jtabs so both merge.
Nothing built the 14-chapter frame / tutorial-part / road roll → built here, as a wrapper over j67 (no j67 lines changed).

## What changed
- `dev/build/jst14.js` (new, after j67.js in assemble.py). New lives only (`S.st.f14`, `S.st.v2=4`); old saves untouched.
  - plan: `ms:nhap14, ms:sung14, ms:tap14 | o×4, fin, s×3 (cnv: ms:len14, s, s), st:st_the | end:12, ms:hau, ms:ke` = 14 chapters.
  - road roll at đầu thai (fresh premise first, else j67 history weight) → `S.st.f14.road`, opens chapter 4.
  - f14Norm: spliced chapters (j96/jkc Thanh mai) leave Phần đầu and go after the road's first chapter; extra shared arcs drop → 14.
  - chAdvance wrapper: a chapter that cannot run → a shared arc (numbers stay 1..14); end:12 = st_dong / st_con / shared arc.
  - tutorial milestones nhap14 / sung14 / tap14 / len14: real-state steps; time-limit step closes the chapter "Lỡ dịp" with NO Danh, NO item.
  - OD:L1247: hostile arc roles (castRv67 'v'/'v2', hostility read from the arc's own text) get relAdd -25 when cast; td family enemy
    (S.foe) = the same live consort, relAdd -30 + enemy flag.
  - OD:L1253: odds of every chancy story option move up to ±15 by this life's context (cast person's thiện cảm/oán/nature, her Tâm cơ/Đức,
    consorts holding a grudge) — oOf67 wrapper. Endings no roll decides (sure option / single-key o.e / Lợi thế tally) may move one step
    (win↔mid↔lose) with a 5–40 in 100 chance set by the same context (f14Shift, res67/end67 wrappers).
  - OD:L1247 casting: a hostile role prefers someone not already her friend; then both sides' thiện cảm ≤ -15 (f14Hate).
  - f14Info() → kitGoalDetail section "Đời người · 14 chương" (kitRows) + Mệnh truyện tab chips (kchip) + servant panel67 words.
- `dev/build/jgoal.js`, `dev/build/jtabs.js`: 2 small hooks to f14Info (existing kit parts only). No new CSS.
- Tests: `dev/test/story14-frame.js`, `dev/test/story14-view.js`.

## Open / notes for later phases
- Phase 2 replaces tap14 etc. with story-motivated DO-the-feature quests (plan §Phase 2, OD:L1259).
- j67 chapter rewards / milestone rewards are still the j67 ones (gain only); gain-and-loss pass = phase 2/3, balance = phase 5.
- Hostility detection is by keywords in the arc text (F14HOST); a per-arc role table belongs to phase 3 content.

## Test results (16/11, local build)
- story14-frame.js (40 sensible-bot steps + fast story bot 9 origins + 14 lives L1253 + old saves): 18/18 PASS, 0 page errors.
  Fast bot: every origin walks 1..14 in order (Phần đầu nhap14/sung14/tap14 → road at ch4 → ch12–14), origin ending told, ~120–135 months.
  L1253: same option → different odds in 36/60 beats across lives; 10/11 arcs played 3+ times ended in 2+ ways.
- story14-view.js 755x1000 + 1180x820: PASS (tab chip, chapter detail rows, no overflow, no page errors).
## Known follow-ups
- Option preview line still names the planned ending ("kết: …") for sure ending options; with f14Shift the ending can move one step →
  wording "thường dẫn tới …" to decide (VANPHONG) in phase 2.
- Sensible bot (inpage4) is slow through chapters (~1–2 chapters per 40 steps); chapter changes are covered by the fast story bot.
