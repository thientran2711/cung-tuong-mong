# review-mg-tune-r1 — independent review of review/mg-tune @ 96131b41

Reviewer session (START_CTX ~5 %, ended ~20 %). Verdict: **PASS 859acc68ddea3bb649ae6f5b086174e0f260d7ae** (branch review/mg-tune-r1; descends origin/main 9fc1ac33).

## Merge onto latest main
- origin/main cde8029d, then 9fc1ac33 (story14, lag-play, chonso-cloud, fest-fx…): only generated files conflicted (assets.json, index.html, sw.js) → main's copy + dev/site/build_site.sh.
  Main touched none of the mg-tune files (j82, j91, jbal2, jmgt, jnwp, jnwq, jlant, jexam, mg-bots, mg-balance-vp); jbal.js change on main = story14 numbers only.

## Code (read in full)
- `mgPace(env, kind, el, lim)` (jmgt): whole score while el ≤ fast·lim, linear to keep at time out; fast/keep from BAL.mgTier.lev[kind] via mgLev, else BAL.mgTier.pace. Numbers only in BAL. OK.
- Wired in tho (calli), doi (doiline), le/tc/thq (nwqPlace), xa (clue), doden (lamp; BAL.lantern.speed removed), co (go; its typed 0.4 drop removed, lev.co.fast is now a share). Nothing else reads the old lev.co.fast (ms) or lantern.speed.
- jnwq / jlant now pass a float raw (graded once by mgGrade) — consistent with the other engines.
- Bot model: peek `cands` only on the 8 changed engines; skilled bot waits 600 + 350 ms × cands × U(.3,1). Fair for a person scanning pictures; other kinds measured exactly as before.
- **FIX (small, here — ONE CORE whole-family scan):** one more typed time/score formula left: j91 k91Untangle (kim, Khéo tay "Gỡ rối chỉ") `per*(.6+.4*left/LIM)`.
  Now `mgPace(env,"kim",t-t0,LIM)` with `BAL.mgTier.lev.kim {fast:[0,0], keep:[.6,.6]}` = the identical curve (no balance change); kim how text gets "Làm nhanh thì được trọn phần." like the other timed games.
  Scan after: no score line in j82/j91/jtd/jslap/j92/jts/jnwp/jnwq/jlant uses time except through mgPace (others use t0 only for HUD "giây" or motion).
- Wording (VANPHONG §4): "Làm nhanh thì được trọn phần." — short, clear, no number/%. OK. No UI change (KIT FIRST): only how-strings, BAL, engine scoring.

## Re-measured myself (dev/measure/mg-bots.js, Xuất sắc = graded ≥ 9 via mg-grade.py; Dễ hoc/0/2 · Vừa hoc/4/2 · Khó hoc/6/1)
| kind | skilled Dễ / Vừa / Khó (n=30) | Vừa extra run | random Vừa ≥9 % (mean) |
|---|---|---|---|
| tho | 83 / 47 / 0 | n=60: **28** (pooled 90: 34; with worker's 90: ~30) | 0 (0.0) |
| doi | 100 / 27 / 0 | | 0 (0.0) |
| doden | 90 / 17 / 0 | | 0 (0.7) |
| le | 100 / 23 / 0 | | 0 (0.0) |
| tc | 97 / 17 / 0 | | 0 (0.0) |
| xa | 87 / 23 / 0 | | 0 (4.1; Giỏi+ 17 %) |
| thq | 97 / 27 / 0 | | 0 (0.0) |
| co | 83 / 17 / 0 | | 0 (0.0) |
| kim | 87 / 23 / 0 | n=60: **20** | 0 (0.0) |
| theu | – | n=60: **27** | – |
| td_dung | – | n=60: **23** | – |
| ne | – | n=60: **67** (all-or-nothing 0/10) | – |
- Worker's table holds within n=30 noise (±8): Vừa 17–30 % on the changed engines, Dễ easy (83–100), Khó hard (0), random ≈ 0.
- The "≥ 40 % at Vừa" kinds: kim 20, theu 27, td_dung 23 at n=60 → they were n=30 noise; in band, no change needed.
- ne (Né, slap dodge) stays 67 %: the score is 0 or 10 (dodged or not), accepted by the slap reviewer; not a time-part game → follow-up only.

## Tests (final build unless noted)
| test | result |
|---|---|
| mg-balance-vp, old save from origin/main → this build, 755x1000@2 + 1180x820@2 (final 859acc68, and on a19205ba) | 30/30 each, 0 bad, 0 page errors, 0 overflow, old save loads (5 keys) |
| mg-balance-vp 1000x755, 1366x1024@2, 844x390@2, 390x844@2 (a19205ba) | 30/30 each, 0 bad, 0 errors |
| coop-e2e | 59/59 (a first run 56/59 while mg-balance-vp ran beside it on 4 CPUs — friend-leave / frozen timing; clean re-run 59/59) |
- Screenshots looked at: kim board 755x1000 (kit kg82 frame, how text wraps whole), Thơ contest intro 755x1000, Xử án demo card 1180x820 — no cut text, no overflow.

## Follow-ups (not FAILed)
1. ne (Né) 67 % Xuất sắc at Vừa — binary dodge score; if the owner wants it in 20–30 %, it needs a graded score (slap owner).
2. xa random play: 0 % Xuất sắc but Giỏi+ 17 % at Vừa (guessing earns the 0.4 floor per case). Small; lower the floor in BAL.nwq if it matters.
3. Beginner sees "Độ khó: Khó" in festival contests from rank 1 (hội stake 1 + .5·rank, d ≥ 1.5 at tài nghệ 0). Matches OD:L1255 (harder as she climbs) but at Khó skilled Giỏi+ is only 7–13 % on xa / co. If the owner's "mức vừa" (OD:L1266) should cover a novice's first contests, lower BAL.mgTier.occ.hoi or raise band — design call for Foreman B.
4. k91Untangle LIM `(30000+lv*2500)` is still a typed number (pre-existing, mg-balance); move to BAL.mgTier.lev.kim.lim in a later ONE CORE pass.
