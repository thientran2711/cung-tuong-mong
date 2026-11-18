# PARALLEL TIME — worker report (opus, session_01964izEDFWH8uK569yeSGJt) · coordinator Foreman D #3
START_CTX ≈ 5% of 1M (get_session read 0; own estimate) → rolled over at ≈30% (START_CTX + 25%). HANDOVER at the end; the COORDINATOR opens the successor.
PRIORITY #1 CHECK: OD 18/11 19:50–20:35Z (8 lines, read verbatim) | main: no parallel/away state; delayed queues S.invite, S.invQ, S.knQ, S.ag.rq (agTell: the only khắc-keyed person queue, NPC-only, host), illP (week), j70 standing orders (busy list) | review/*: review/errand-scene NOT pushed yet (MAIN scene worker) | claims: none.

## Branch
`review/parallel-time` from origin/main 94d116237 → **f672568a9** (pushed). Status: core + most of the group DONE, gates green; NOT yet "SẴN SÀNG KIỂM" (see Remaining).

## The ONE mechanism (`dev/build/jptime.js`, after jagacts3; numbers `BAL.ptime` in jbal2)
- Clock: `ptNow()` = bid()×BAL.time.khac + used (absolute khắc). Her clock moves only by her own acts (spend / Sang buổi).
- ONE state `S.away` = [{who (ledger id mm:me / s<sid> / mm:<vid>), nm, kind, by, t0, due, place, tgt, a (runner args), fz (frozen shown odds), lbl, back, rep, read}]. Reader for MAIN's errand scene: `PTIME.away(id)` / `ptAwayOf(id)` → "person away until khắc `due`"; `PTIME.news()` = reports back, unread. Old saves: created lazily.
- Order: button pays `BAL.ptime.kinds[kind].o` (1 khắc; clothes 0 = its own Sức), the person is away `n` (2) khắc from the tap, n includes the walk (no double charge). Card: ONE Tốn row "1 khắc · chờ 2 khắc" (j63 KA_TIME + j25 optLine; `talkK(a)` = one rule for talk-option khắc, j2/j15/j25).
- Result at due khắc: runner by kind (`ptReg`, survives save/load), odds frozen at the order (fzRun). Report waits behind kit status icon `tin` (§77.1 kitStatusIcon: bobbing while away, seal dot when back, tap → kitPanel info with reports (kitFacts + kitChips) + who is away "về khắc K" + the ONE optional «Đợi tin» = jump to the next return khắc, same day). kitLine pill on send/return. No forced modal.
- Busy: away person locked on every card (ptLockWhy "X đang đi …, về khắc K"); bestSent skips busy servants (her and NPC households); j95 ledger rows = [place,"errand",tgt,"ngươi sai …"] for every away khắc (no "follow").
- Two-way NPC: AGRUN "cx2:maidSpy" wrapped (PT_NPC table): NPC's maid away n khắc, deed lands at due through the same runner/news.
- Receiver (maid road): «Việc chủ sai» now pops the kit order frame with ONE option «Đi» ("tốn: 2 khắc (cả đường đi) · thành: công lao +1"); she walks (srvGoTo) and the rest of n is the task → srvErrandDone. Master's dò la order (PEND.cnvOrd k spy) = ONE «Đi» with the SENDER's row: spyRoll odds, chứng cứ BAL.eff.j78.evN, fail Chủ tin −BAL.eff.jwhy.loyalSpyMaidRun "(hoảng sợ)" + oán BAL.eff.j78.j78maidFail. plant/poison orders keep their dilemma (see Open 3).

## BEFORE → AFTER (buttons converted; full class list: `python3 dev/test/ptime-scan.py`, 395 labels: PARALLEL 14 · FACE 10 · STORY 362 · OPEN 9 · ? 0)
| button | file | before (cost · timing · person) | after |
|---|---|---|---|
| Sai cung nữ đi dò la / Sai đi dò la (maid, any servant) | jact/j2/jwhy/jhouse | 2 khắc · instant · maid/servant | 1 khắc order · chờ 2 · result at due · person locked |
| Nghe ngóng chung | jact/jwhy/jhouse | 1 khắc · instant | 1 · chờ 2 |
| Sai tai mắt dò nơi ở | j21 | 1 khắc · instant · unnamed | 1 · chờ 2 · her runner (real person) |
| Mời đến cung ta | j21 | 1 khắc · next buổi · unnamed | 1 · chờ 2 · runner; guest arrives at due (ledger visit) |
| deeds on a consort when not together ("phải sai người đi") | j8 doAct/j15 | 2 khắc · instant · bestSent | 1 · chờ 2 (sai X) · lands at due |
| Sai người lẻn vào cung cài đồ | j8 plantpick | 2 khắc · instant | 1 · chờ 2 · item carried (leaves chest, law 6c) |
| Tặng quà (her card, not together) | j8 giftpick | 2 khắc · instant | 1 · chờ 2 · servant carries the gift |
| Sai cung nữ thân tín mua lén ngoài cung | j83 | 1 khắc · roll now, goods next tuần | 1 · chờ 2 to know caught/not · goods next tuần |
| Sai cung nữ đến Nội vụ phủ xin (y phục) | jeitem | Sức · instant | Sức · chờ 2 · clothes come with her |
| Sai cung nữ dò la khẩu vị | jrcp | 2 khắc · instant | 1 · chờ 2 |
| NPC cx2:maidSpy | jagacts3 | instant at the deed | maid away 2 khắc, lands at due |
| maid road: Việc chủ sai | j42 | card 1 khắc + walk + tap at place | order frame «Đi», total n khắc incl. walk |
| maid road: master's dò la order | j42 cnvOrd | dilemma, own numbers | «Đi», sender's row mirrored |

## Gates (on f672568a9 / 073709ca)
- `node dev/test/ptime.test.js` 23/23 ALL OK (3 runs): card, order khắc, away, lock, ledger, lands at due (not before), report no modal, panel, Đợi tin across buổi, invite, harm, NPC two-way, receiver frame + walk + n khắc, cnvOrd mirror, old save (no S.away), off switch BAL.ptime.on=0.
- `bash dev/tools/quickcheck.sh` PASS (core gates: one-core-guard/text/bind/text-rule, rules-one-source, kit-conform, co-op one-world; time-spill guard; old save from live loads; perf new ≤ live).
- `node dev/test/coop-e2e.js` 63/63.
- Shots (`node dev/test/ptime-shots.js <out>`, Fold 755x1000@2 HOST + iPad 1180x820@2): sender card OK (Fold: "TỐN 1 khắc · chờ 2 khắc"); the receiver / panel shots were covered by the life-preload veil (#klife re-created after start) — RETAKE (Remaining 1). Shots stay outside git.

## Remaining (for the successor)
1. Shots: in ptime-shots.js remove #kload/#klife AFTER each start with a wait (they come back async), dismiss random news Q before shots; look 3× at both devices: sender card, status icon + red dot, «Đợi tin» panel, receiver order (spy) + Việc chủ sai. Upload to CDN img/_review/parallel-time if the reviewer must see them.
2. OPEN send buttons not converted yet (same adapter pattern): jstip "Sai X đi đòi", jveil "Sai người mua lén ngoài cung", jmkt "Sai tai mắt dò bên chủ hội"; j54/j55 family/court routes (people outside the palace: proposal = week clock, ask D).
3. Questions for Foreman D (not re-asking the owner; D decides with laws 2/3/4): (a) SUMMON class — Truyền thái y / Mời thái y bắt mạch / Truyền <man> vào cung: the visitor treats her in person; proposal: messenger n khắc, visit at arrival. (b) maid-road plant/poison orders keep «Từ chối» (AG-ALL-2 G10 dilemma) vs owner 20:35Z "chỉ có 1 option là đi" — only the dò la order and errands were made «Đi»-only. (c) NPC gifts by servant (PEND.giftin), NPC invites (S.invQ), PEND.shop (eunuch tray, classed FACE) not converted. (d) equal value: all sends o1/n2 — D's BAL check.
4. Co-op: j95 ledger is single-player (j95on off in co-op), so the ledger overlay is off there; S.away is per player S. Status icon glyph 信 until KIT REQUEST K-PT-1 (painted ico-tin, Foreman C).
5. Tell MAIN's errand-scene worker (session_01Rc5AsLfkFKRGnjiTepddVL): read `PTIME.away(ledgerId)` (due, place, lbl) to walk the figure off / back; `PTIME.news()` for the "!" on her; nothing else to compute.
Touched: dev/build/{jptime.js(new),jbal2.js,assemble.py,j2.js,j8.js,j15.js,j21.js,j25.js,j63.js,jact.js,jrcp.js}, dev/kit/{KIT.md,KIT_REQUESTS.md}, dev/test/{ptime.test.js,ptime-scan.py,ptime-shots.js}, index.html, sw.js.
