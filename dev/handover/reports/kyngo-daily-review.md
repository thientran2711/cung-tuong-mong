# kyngo-daily — BIG REVIEW (E18r, opus) — FAIL 8cb39e38 — 9 fixes

depth 2 · START_CTX ~0 % (window 1M) · now ~15 %.
PRIORITY #1 CHECK ('kyngo|kỳ ngộ'): OD 5 (19/11 ~03:30Z build, ~03:25Z no double gate) | ledger 0 | claims 8 | main 3 (j97 / jroad RD97L / j96 story-bound rares, reused) | review/* 1 (review/kyngo-daily = this review) | archive 0. Gate also used: dev/tools/quickcheck.sh exists on main (E18 looked in dev/test only).
★ THE 18 LAWS read first; each law the work touches is checked below.

Reviewed: review/kyngo-daily @ 8cb39e38, merged with LIVE origin/main 2481c80d on local review/kyngo-daily-rv (d126e958, clean merge, rebuilt with build_site.sh; NOT pushed because FAIL).
Foreman E #11 ruling (19/11): MAIN's bar 3–5 tuần stands; M outside → FAIL with a concrete lever.

## Results
| check | result |
|---|---|
| kyngo-eq.js (law 2 values, law 3 gain + cost, BAL only) | PASS |
| one-core-guard.js | PASS (but see F6: guard counts against a baseline, typed numbers slip under it) |
| kyngo-unit.js | PASS 16/16 |
| kyngo-shots.js Fold 755x1000@2 + iPad 1180x820@2 (LOOKED at all 8, 3×) | script PASS; LOOK: F4 on Fold |
| QUICKCHECK --cpu 4 (dev/tools/quickcheck.sh) | functional PASS: open 1614 ms, old save from live loads + plays a buổi, core gates PASS (one-core, rules-one-source, kit-conform, coop-one-world), TIME-SPILL PASS; perf median new/live render 189/210, tab 429/467, buổi 1339/1086 ms (one 6.9 s outlier run in new); "NOT BUILT" only because the local rebuild is uncommitted |
| Bot, my runs, band M (rank 3/4), 11 lives × 18 tuần | 28 hits → gap **7.1 tuần** ✗ (6-life run alone: 2.67/life, 6.8 tuần; hits per eligible buổi 0.84 → eligibility is the limit, as E18 found) |
| Bot L / H | runs OOM-killed (one renderer grows to ~7 GB over 6 lives; run 1 life per process); E18's L 3.5 / H 4.9 not re-measured |
| ilAudit net | 0–1 per life (same noise as E18's kỳ ngộ OFF baseline) |
| jky errors / page errors in bot + probes | 0 / 0 |
| Kit (law 9/10) | event card = kit §50 kitEventDp (PEND, cost mode, kitItemTag), result = kit BÁO card, Sổ luân hồi = rows67 like j97; no private CSS/frame found. Option pictures / banner = kit stand-ins until C draws (FOR C list ok) |
| Wording (law 7) | no %, ladder words only; the "Nắm chắc" on every option is the kit-wide sure-act ceiling (capW), not jky. See F8 |

## FIX LIST (file:line on review/kyngo-daily 8cb39e38)
1. **THE BAR (Q2) — band M gap 7.1 tuần, outside 3–5.** Lever (BAL only, eligibility-bound, no code): open the L-only encounters to band M in `dev/build/jbalky.js` E table — `ma_giao.b "01" → "012"` (jbalky.js:21), `th_chi.b "01" → "012"` (:39), `sv_tuyet.b "01" → "0123"` (:42). These three are what L has and M lacks (L e .079 vs M .044 with M's six extra encounters needing a man / the Emperor / a 51+ consort, which rarely line up). Then re-run the bot ≥12 lives for M (1 life per process, see above) and ≥6 for L and H: all three bands gap 3–5, zero-share ≤ 5 per hundred. If M is still > 5: second lever = widen places of ma_co / de_but / de_su in jky.js DEF (E18's own note). Also make the bot hold the rank each buổi (`S.rank=RK` inside the buổi loop, kyngo-bot.js:15): my M lives met ma_giao (b "01"), so her rank fell back to band L for part of the life — the M figure is measured on a partly-L life.
2. **Law 1 / MAIN note (b) is dead: she is never the WHO of an NPC's encounter.** `npcPass` runs after `nextBuoi` has advanced the buổi (jky.js:255), but `meHere` checks `S.kyAt.b === bk()` (jky.js:39), i.e. the NEW buổi, where she has not walked yet → always false. vat_thu (an NPC returns HER pet), th_sao with her, sv_den / sv_tre with her servant / child never fire. (Unit test 6 only covers vat_lac, which does not need her presence.) Fix: run `npcPass()` BEFORE `n0` (end of the buổi, roster still shows this buổi) in the nextBuoi wrap; when `meHere`, also push her staff and kids (jky.js:132 + kyPpl:36 run before she is added). Add a unit test: she walks to a place, a consort stands there, nextBuoi → that consort's eligible list holds her as WHO.
3. **Co-op double roll.** `npcPass` (jky.js:253) loops `liveRivals(true)`, which on the host holds the friend entry `{coop:true}` (jcoopworld.js:84) = the other human. The host rolls a kỳ ngộ for her and picks her option by mindPick, while she also rolls her own on her seat. Every other NPC agency skips `v.coop` (jagacts4.js:39, jcmaid.js:55, jallot.js:62 …). Fix: `if(v.confined||v.coop)continue`; use `worldOn()` (the one co-op guard, jcoopworld) instead of the private `coop()&&guest()` test.
4. **Gain shown as cost (law 3 display, kit parser).** Fold shot vat_lac: "Giữ lại" shows TỐN "1 khắc, **Son phấn giáng vào rương ta**" (red) and ĐƯỢC "chẳng được gì"; "Mang trả tận tay" also puts "… về lại tay chủ" under TỐN. The iPad shot with another piece (Yên chi hoa hồng) is right → the kit sentiment reader takes "giáng" in the item name as a bad word. Fix the whole group in jky.js specW (:214–218) and optX (:209–212): wrap every gain word in `<span class="g">…</span>` (the kit reads the class first), costs in `class="r"`; re-shoot with a piece whose name holds "giáng".
5. **Soft-lock: vat_ngu card with no way out.** Both options carry the buy price (BAL E.vat_ngu both `buy:1`, jbalky.js:32); with Bạc < price both buttons are disabled and the card has no ✕ (probe: Bạc 0 → 2 disabled buttons, no close). Fix: in eligibility (vat_ngu `what`, jky.js:93) require `F.bac >= buyPr` for her (same for vat_cu option 1 is free, so vat_cu is fine).
6. **Law 4 — hand-typed numbers in jky.js** (one-core-guard passes only because it compares a count to a baseline): `addArtP(F,"theu",20)` + text "Thêu tiến bộ 20 phần" ×2 (:194, :196); age `>=51` (:77, :113) while `BAL.ageBand[2]` exists (the group review/one-core-dup just fixed); child age `<=12` (:36); Emperor regard → Sủng `n/4` (:158); servant loyalty default `50` and `n/3` (:161). Fix: BAL.kyngo keys (e.g. loiArt, kidAge, relSung, relLoyal) + BAL.ageBand[2]; texts print the key.
7. **Dead gain (laws 2/3): "Xin bái ma ma làm thầy"** (ma_giao opt 2, s:"kn", priced sv.kn 14) only does `F.kyTeach++` (jky.js:199); nothing in the game reads kyTeach. Fix: make it real — e.g. one free "Học với thầy" lesson on the jrcp teacher road (jrcp.js:16, fee waived once, consumes kyTeach), or replace the special with a gain the vw table prices.
8. **Law 6b — Thái hậu always at Đức Thọ cung.** kyPpl pushes `{kind:"th"}` whenever k==="tn" (jky.js:29), ignoring her schedule in the record (`S.roster.P.th`, j95.js:242). Fix: `placeOfId("th","tn")===k`. Wording nit, same encounter: th_kinh opt 2 "Xin ma ma dạy lễ nghi" (jky.js:110) names the ma ma the text says is ill and absent → e.g. "Xin người dạy lễ nghi" (the Thái hậu is the WHO and gets the regard).
9. **Test gaps to add with the fixes:** unit for F2 (she as WHO), F3 (no roll for a `coop` entry), F5 (no unaffordable vat_ngu), eq/unit check that every special priced in `sv` has a reader (F7).

## Laws checked
1 two-way: FAIL (F2, F3). 2 equal value: eq PASS on BAL; F7 fake gain. 3 gain-and-loss: BAL PASS; display F4. 4 one core: FAIL (F6). 5 harder with rank: ok (V, hard, cd by band). 6 real world: pieces only move, logged (ok, note a folded in by making no crafted piece); 6b F8. 7 wording: ok (F8 nit). 9/10 kit: ok. 12 two devices: done, looked 3×. 13 prio#1 line: present in brief + report. Old saves: ok (unit 7 + quickcheck old save from live). Time cost: khắc via spend, TIME-SPILL PASS. Perf: ok.

Shots: scratch only (/home/user/wt/kyr-shots, not in git, not on CDN — E CDN is 401); regenerate with `node dev/test/kyngo-shots.js <url> <dir>`.
Round 2: I stay open; send «SẴN SÀNG KIỂM kyngo-daily <sha>».

## ROUND 2 (E18r) — PASS a2ae3ac2 — READY face71dd (review/kyngo-daily-rv)
depth 2 · ctx ~22 %. PRIORITY #1 CHECK ('kyngo|kỳ ngộ'): OD 5 | ledger 0 | claims 8 | main 3 | review/* 1 (review/kyngo-daily) | archive 0.
READY = review/kyngo-daily-rv @ face71dd: a2ae3ac2 + LIVE main edb2e724 (already contained) + index.html rebuilt by build_site.sh; fast-forward of origin/main.
| r1 fix | verified |
|---|---|
| 1 bar | my bot, 1 life per process, rank held: M 6 lives gap 4.2 ✓, H 6 lives gap 4.2 ✓, zero 0, 0 errors, net 0–2 (OFF-baseline noise); L 4.0 (E18b) stands, nothing in r2 makes band L harder. Lever = BAL only (E[].b strings, cd[H] 1). Foreman ruling check: law 5 holds — hard [0,0,8,16] and V [1,1,1.4,1.8] unchanged, still rising with rank; law 4 holds |
| 2 she as WHO | npcPass runs at the end of her buổi, before n0; her staff + kids join; unit 12/12b/12c run through the real nextBuoi; the z.last guard keeps one roll per buổi when nextBuoi is called again |
| 3 co-op | npcPass skips v.coop; guard = worldOn(); unit 13 |
| 4 gain words | g/r classes + the option line names no piece; Fold + iPad «Son phấn giáng» card LOOKED: TỐN 1 khắc only, ĐƯỢC on both options. The kit-wide kaSent fix is a KIT REQUEST for MAIN (dev/kit/KIT_REQUESTS.md); jky draws no look of its own → not a gate |
| 5 soft-lock | elig drops any card whose every option costs more Bạc than she holds (NPCs too); unit 14/15 |
| 6 typed numbers | loiK/loiArt, kidAge, relSung, relLoyal/relLoyK in BAL.kyngo; age = BAL.ageBand[2] |
| 7 dead gain | ma_giao opt 2 = real Thêu art + regard; kyTeach removed; eq checks every special has a reader |
| 8 Thái hậu | placeOfId("th","tn"); th_kinh wording fixed |
| 9 tests | unit 22/22 |
Gates on face71dd: kyngo-eq PASS · one-core-guard PASS · kyngo-unit 22/22 · kyngo-shots 12/12 on both devices (LOOKED 3×) · QUICKCHECK PASS (open 1416 ms, old save from live ok + buổi, core gates PASS incl. coop-one-world, TIME-SPILL PASS, perf new/live render 205/198, tab 423/417, buổi 978/1011 ms).
Shots: scratch only, deleted after the verdict.

## FINAL MERGES (E18r)
- 19/11: LIVE 1a4df595 → READY cc29a89a (assemble.py conflict: main's jptime.js + jbalky/jky kept).
- 20/11: LIVE 72922870 (palace-chatter) → READY ba7280e3 (assemble.py + KIT_REQUESTS.md both sides kept); kyngo-unit 14 made robust (a random cung-nữ start = band 0; test-only fix).
- 20/11: LIVE 94c3bddc (mg-ready-guide) → **READY 6f2987d** (only generated files conflicted; rebuilt). kyngo-eq PASS · one-core-guard PASS · kyngo-unit PASS · QUICKCHECK PASS (open 1590 ms, old save from live ok, core gates PASS, perf new/live render 222/224, buổi 1118/1333 ms). Fast-forward of origin/main checked.
- 20/11: LIVE a1aa8b19 (mgcal BAL + new jgamevs.js) → **READY d74f86a5** (assemble.py: main's list incl. jgamevs.js + jbalky/jky). kyngo-eq PASS · one-core-guard PASS · kyngo-unit PASS · QUICKCHECK PASS (open 1605 ms, old save ok, core gates PASS, perf render 186/229, buổi 1118/1081 ms). Fast-forward checked.
