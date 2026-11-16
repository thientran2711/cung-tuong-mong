# PROGRESS review/thaiy — Thái y (owner 15/11 20:20Z, 4 ideas)

Base: origin/main e3fc5f61. Module `dev/build/jthaiy.js` (after jty in assemble.py). Numbers `BAL.thy` in `dev/build/jbal.js`.
Test: `python3 dev/build/assemble.py && node dev/test/thaiy.js <outdir> [WxHxD,...]` (serves from disk, no http server).

## Reused (LUẬT ƯU TIÊN SỐ 1)
- Court physician `S.court.ty` (j10; `af` = thiện cảm per person, `af.me` hers; "Biếu" +10 for 20 bạc), own trusted physician `S.doctor` / NPC `p.doctor`.
- Illness ILL/illOf/illName/treat (j13): `treat()` now asks `thyBribedBy(p)` (same bribe/trust rule; was a dead check since nothing ever raised `ty.af[v.id]`).
- Pregnancy j75 (`S.pregUnk/pregWk/pregDisc`, `pregFind()` card): j75 NOT edited; jthaiy only brings `pregDisc` forward and calls `pregFind()`.
- TAINT gifts (j8), j70 plots (reveal = `p.kn=1; p.kt.push(tellOf70()); p.pend="seen"`), newsAdd/noteAdd, kit person dialog (Q card `who:pDoc()`), pcard/pbtn (j15).
- `cycleLate(S)` from the cycle worker's jcycle.js is read when defined (hint only).

## Built
1. **Thỉnh bình an mạch** (free, monthly): wraps `monthTick`; verdict Khỏe mạnh / Hơi yếu / Có bệnh + khí huyết word; shallow
   (hidden harm only as "mạch có chỗ lạ", BAL.thy.routineHint); finds an unfound pregnancy ≥3 weeks; writes the mạch án `S.thy.rec`.
   Card when not healthy / something odd / Q short, else log only. Calendar API: `thaiyNextVisit()` → {turn,month,year,tuan:0,n,free},
   `thaiyVisits(n)`.
2. **Mời thái y bắt mạch** — two roads (Hành sự deck via illCards wrap; physician card group "Bắt mạch" in Hậu cung › Cung nhân;
   Thái y viện talk option "Xin bắt mạch"; nausea card):
   - bạc road: Bạc `BAL.thy.cost[rank]` = 6/8/10/12/15/20/25/35 (≈1/7 of BAL.pay at every rank), 1 khắc, discreet;
   - her road: no bạc, 3 khắc + Sức -5, may be seen (40%: a rival hears; 30%: a hidden pregnancy is guessed), but +10 to find hidden
     harm and a bribed physician lies less (20% vs 35%).
   Balance reasoning: at rank 0 (40 bạc/month) 6 bạc ≈ 15% of the month's pay vs 2 extra khắc (half a buổi) + Sức 5 + exposure; with
   only ~6 bạc she must choose between money and secrecy vs time/Sức and being seen.
   Result: Sức number, illness (marked known), hidden harm with odds `findO` (tainted gifts → marked `e.seen`, advice to nghiệm độc;
   j70 poison2 plots / musk plots while pregnant → revealed as j70 "seen"; a musk plot BY the bribed physician is never told by him).
3. **Pregnancy**: j75 auto-find kept; requested check finds it from week 3 (=1 month: 3 tuần), week 2 with `early` odds; nausea card
   once per pregnancy from week 2 (BAL.thy.nausea weekly %) offering both roads.
4. **Bribed / trusted**: bribed = rival af ≥30 and hostility ≥40, and she is not trusted (S.doctor, or af.me ≥40 and above every rival).
   Bribed → may lie (no hidden-harm finding, illness softened, "chưa thấy hỉ mạch" + pregDisc +2 weeks) and leak (50%): hidden pregnancy
   un-hidden + briber ghen +6, illness rumour (Danh -2), note; Tai mắt may tell her ("thái y … đã ghé cung X").
   NPCs (rivalsMonth wrap → host-only in co-op): hostile rivals with bạc bribe the physician (30 bạc → af +20), bribes fade 4/month;
   routine visit finds a tainted gift in a rival (removed, proof vs giver, oán) unless a briber hostile to her holds him; unknown NPC
   illness becomes known. j70 musk route "ty" sets the plotter's af ≥40 (the physician is really bought). Hỏi chuyện with a physician
   who likes her (af.me ≥30) may tell a rival's hidden pregnancy / illness.

## Small edits outside jthaiy
- j15.js: physician pcard gets `thyCardLines()` + `thyCardGroup()` (hooks, guarded by typeof).
- j13.js: treat() bribe check via `thyBribedBy` (guarded).
- jbal.js: `BAL.thy` block. assemble.py: jthaiy.js after jty.js.

## Art
Uses the existing physician portrait/figure (pDoc, img/face-physician / court ty face) — no new picture needed.
Optional (not required): an event banner for "Thỉnh bình an mạch" (physician kneeling, pulse on a silk-covered wrist) — LIST ONLY.

## Status (resume notes)
- DONE and pushed on review/thaiy. Nothing local-only; no art generated (none needed).
- dev/test/thaiy.js: 49/49 ok at 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2 (logic checks + physician card + result
  card; no page errors, no horizontal overflow). Screenshots looked at (kit person dialog, existing banner "Ốm đau, thái y", physician figure).
- dev/test/coop-e2e.js: 34 ok, 0 FAIL, then the browser was closed by the run timeout under load ~40 (4 shared CPUs) before the
  last steps (B dies / rebirth / old save). Re-run when the machine is quiet: `node dev/test/coop-e2e.js tmp/coop`.
- Site (root index.html/sw.js) NOT rebuilt on this branch: run `bash dev/site/build_site.sh` at merge time.
- Resume: `cd <worktree> && python3 dev/build/assemble.py && node dev/test/thaiy.js tmp/thaiy 755x1000x2`.
- For cal-plus: `thaiyNextVisit()` / `thaiyVisits(n)` (window globals, null/[] in lãnh cung or maid mode).
- For the cycle worker: jthaiy reads `cycleLate(S)` if defined; j75 untouched.

## Review r1 (reviewer)
Merged origin/main (assemble.py conflict: main list kept, jthaiy.js placed right after jty.js; jcycle can be appended LAST). Tests: thaiy.js 49/49 (755x1000, 1000x755, 1180x820, 1366x1024, 844x390), coop-e2e 59/59, 0 FAIL. Balance: bạc 6..35 = 12.5-15% of BAL.pay vs her road 3 khắc + Sức 5 + exposure: accepted. Site rebuilt.
