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

---
# WORKER #2 (opus, session_01964izFaHZziojdgTAvWWfY)
START_CTX ≈ 7% of 1M (get_session reads 0; own estimate) → rolls over at ≈32% (START_CTX + 25%). HANDOVER at the end; the COORDINATOR opens the successor.
PRIORITY #1 CHECK ('parallel time' round 2 / 'receiver 4 answers'): OD 18/11 19:50–21:30Z read verbatim (L1905–L1918; **L1915 21:15Z = CANON OVERWRITE of the 20:35Z «Đi»-only**) | main: jagstf2 stf2Ord/cnvOrdOpts (obey/refuse/tell), j42 PEND.cnvOrd + srvOrder→pushDil (modal), OD L1876 4 answers (jrdhp rdHpW for road helpers) | review/*: review/receiver-choice (audit worker session_01964izESP2ym3HQX17qtSae, D's split) | claims: none other.

## Done this round (branch `review/parallel-time` → **6d5d47499**, pushed; origin/main fa411d6f merged in e52bfc856)
| button | file | before (her cost · timing · person) | after (BAL.ptime kind o/n) |
|---|---|---|---|
| Sai <cung nữ> đi đòi (cắt xén card) | jstip | 0 khắc · instant · maid | ask 0/2 · maid away + locked · result at due (bạc + real pieces back via stipRestore, or lòng −5) |
| Sai người mua lén ngoài cung (mạng) | jveil | Bạc + 1 khắc · instant | vlbuy 1/2 · bạc paid at order once · agent away + locked · veil (+ leak roll) at due |
| Sai tai mắt dò bên chủ hội | jmkt | Bạc 15 · instant · unnamed | mktspy 0/2 · her runner (real person) goes · learn at due |
| Truyền thái y (SUMMON, ruling a) | j13 | Bạc 40 + 2 khắc · instant | summon 1/2 · physician away (ledger) · 2nd summon locked · treat at due |
| Mời thái y bắt mạch (card, Cung nhân bm, nausea notice) | jthaiy | Bạc + 1 khắc · instant | summon 1/2 · verdict (his visit) at due |
| Truyền họa sư / nhạc sư vào cung | jroute | 1 khắc · instant | summon 1/2 · he is in her palace from due |
| NPC gift to her (PEND.giftin from j8 giveTo / j83 / jrcp) TWO-WAY (ruling c) | j8 | modal at once | giftin 0/2 · NPC's maid (or best servant) away · «Quà tặng» card at due |
| NPC host invites (AG cx3:invite2 → S.invQ) TWO-WAY | jagacts3 | lands next buổi | npcinv 0/2 · runner away · lands at due (p3InvLand at due, no double wait) · one invitation out per host |
| Nhờ thái giám mua đồ (PEND.shop) | j8 invAct | tray at once | shop 0/2 · eunuch away (eun:nvp) · tray at due |
One odds formula each (one core): `stipAskOdds(m,SK)` (jstip), `tsMkSpyO()` (jmkt) used by the card AND the landing. Co-op giftin from a player (jcoopthin/jcoopworld) is NOT delayed (sender is a player seat, not an RV NPC).
Still OPEN (not converted): j54/j55 family/court routes (people outside the palace — week clock, parked for D).

## (d) EQUAL-VALUE CHECK per kind (laws 2/3/4; numbers only in BAL.ptime + the buttons' own BAL rows)
| kind | her cost before → now | gain | the other roads of the same choice | receiver-side row (n, gain, loss) | verdict |
|---|---|---|---|---|---|
| spy / listen / scout | 2 (or 1) khắc → 1 khắc + wait 2 | same odds/evidence | Nghe ngóng 1/2, Hỏi chuyện (face) | maid n=2 incl. walk; công lao / evN; fail Chủ tin −5 (hoảng sợ) = sender's "Lòng −5" | equal (the 1 khắc saved is paid by the maid locked 2 khắc: can't follow / talk / be re-sent) |
| invite / harm / plant / gift (her) | 2 → 1 + wait 2 | same | doing it in person (together: own khắc, instant) | servant n=2 | equal (wait + locked servant vs. walking there) |
| ask (jstip) | 0 → 0 + wait 2 | same | Nhịn 0, Đút bạc (bạc), Tố lên (instant, Danh risk) | maid n=2 | equal: slower than the others, costs nothing, the maid locked |
| vlbuy | 1 khắc + bạc → same + wait 2 | same | Nội vụ phủ (own phẩm, known), tự tay kết | agent n=2 | equal |
| mktspy | Bạc 15 → Bạc 15 + wait 2 | same | Hỏi ma ma (bạc, instant), Hỏi người từng dự (affection gate) | runner n=2 | equal (needs Tai mắt; slower) |
| summon thái y | Bạc 40 + 2 khắc → Bạc 40 + 1 khắc + wait 2 | same | Tự bốc thuốc 2 khắc Sức −5 (Y thuật ≥3), Tĩnh dưỡng 4 khắc Sức +15; Sang Thái y viện 3 khắc Sức −5 instant | physician away n=2 | equal (bạc + wait vs. khắc + Sức) |
| shop | 0 → 0 + wait 2 | same | one road | eunuch n=2 | n/a (no rival road) |
| NPC giftin / npcinv / maidSpy | NPC's deed khắc unchanged | same | — | their servant n=2 | two-way equal to hers |
All o ≤ 1, all n = 2: no double charge (OD 20:00Z): n includes the walk; the order o is the only khắc she pays.

## Reader API for MAIN's errand-scene worker (session_01Rc5AsLfkFKRGnjiTepddVL) — D relays
- `PTIME.away(ledgerId)` → null or `{who, nm, kind, by ("me" | "v<id>"), t0, due (absolute khắc), place, tgt, lbl ("đi dò la X" …), back}` — "person away until khắc `due`". Ledger ids: her maid `"mm:me"`, her servants `"s<sid>"`, an NPC's maid `"mm:<vid>"`, physician `ledgerId(S.court.ty)` or `"ty"`, eunuch `"eun:nvp"`.
- `PTIME.mine()` = her people out now; `PTIME.news()` = reports back, unread (show the «!» on that person); `PTIME.when(due)` = words ("khắc 3" / "buổi chiều, khắc 1"); `PTIME.now()` = her absolute khắc.
- Walk OFF when an entry appears (or `PT.stat.sent` grows); walk back ON when `back` turns 1 (or `PT.stat.back` grows). Nothing else to compute; never write S.away.

## Gates (on 6d5d47499)
- `node dev/test/ptime.test.js` ALL OK · `node dev/test/ptime2.test.js` 10/10 ALL OK.
- `bash dev/tools/quickcheck.sh` PASS (core gates, time-spill guard, old save loads, perf new≈live) · `node dev/test/coop-e2e.js` 63/63 (co-op first: S.away is per player S; NPC two-way runs on the host world).

## HANDOVER (#2 → #3; rolled over at ≈32% context; the COORDINATOR opens the successor)
Branch review/parallel-time 6d5d47499 (worktree recipe: fetch shallow under flock, own worktree; build = `bash dev/site/build_site.sh`; tests above). NOT yet SẴN SÀNG KIỂM. Remaining, in this order:
1. **RECEIVER 4 ANSWERS (OD:L1915, owner 21:15Z, D confirmed it is this job; the audit is review/receiver-choice session_01964izESP2ym3HQX17qtSae — share its table, do not duplicate)**. Design ready to build in jptime.js (replace §RECEIVER SIDE «Đi»-only):
   a. NO pop-up: wrap `pushDil` for `d.pid==="cnvOrd"` (j42 srvOrder) on the maid road, and `ptErrFrame` (Việc chủ sai): push `{pid,pp,title,by,due: ptNow()+BAL.ptime.ansK}` to `S.ordQ` (new key, lazy) + `kitLine` "X cho gọi ngươi: có lệnh, trả lời trước khắc K"; the status icon `tin` gets the badge; `ptPanel` lists the orders with ONE opt «Nghe lệnh» → `pushDil(mkP(pid,pp))` under `PT.landing` (khắc boundary, her choice when).
   b. Expiry in `ptTick`: `ptNow()>=due` unanswered → run that card's «Từ chối» option (cnvOrdOpts refuse go; Việc chủ sai: Chủ tin −BAL.ptime.errRefuse) + log "không đến nghe lệnh: coi như từ chối".
   c. The 4 answers on EVERY order card (spy / plant / poison / Việc chủ sai), same BAL rows as the sender side: «Đi, làm hết lòng» (n = kinds[k].n, odds o, sender's gain/loss row = today's ptRecvRow), «Làm qua loa» (n−1 khắc, odds − BAL.ptime.half (added, =15), same loss row) — wrap `ordOdds` / spyRoll with a PT.half flag, «Từ chối» = cnvOrdOpts refuse (its BAL), «Mật báo cho …» = cnvOrdOpts tell (mách lẻo–phá ngầm). Việc chủ sai (harmless errand): 3 answers (no one to tell on) — say so in the table; add `errRefuse` + `errHalfTin` to BAL.ptime.
   d. NPC receivers (two-way): jagstf2 `stf2Ord` weights obey/refuse/tell exist (BAL.ag.stf2.ord); add `half` weight (BAL) and run the deed with odds − half when picked (ACTX.fz or the PT.half flag around the j29 runAct caller). Unit test both sides with the same numbers.
   e. Remove test 10 «ONE option «Đi»» asserts in ptime.test.js → 4 answers + notice + expiry.
2. **Shots** (Fold 755x1000@2 + iPad 1180x820@2, look 3×): `node dev/test/ptime-shots.js <out>` — after each start wait for `#klife`/`#kload` to finish (await `document.getElementById('klife')` hidden / removed by the game, or tap its own dismiss; NEVER hide by CSS); clear random news Q before the shot. Shots: sender card (Tốn «1 khắc · chờ 2 khắc»), status icon + seal dot, «Đợi tin» panel, the receiver order notice + 4-answer card, Việc chủ sai. Outside git; CDN img/_review/parallel-time if the reviewer must see them.
3. quickcheck + coop-e2e again after 1, then "SẴN SÀNG KIỂM <sha> + touched files" here + STATUS line + send_message Foreman D #3.
Touched by #2: dev/build/{jptime.js,jbal2.js,jstip.js,jmkt.js}, dev/test/ptime2.test.js, index.html, sw.js (+ merge e52bfc856: dev/kit/KIT_REQUESTS.md both rows kept).
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

---
# WORKER #3 (opus, session_01964izGM3cyQq9y9byHFKnV)
START_CTX ≈ 4% of 1M (get_session reads 0; own estimate) → rolls over at ≈29% (START_CTX + 25%). Finished below that; no handover needed.
PRIORITY #1 CHECK ('receiver 4 answers' / 'Giúp qua loa' / 'ordQ'): OD L1876 + L1915 read verbatim | main: j42 cnvOrdOpts (obey/refuse/tell), jagstf2 stf2Ord, j29 runAct | review/receiver-choice: not pushed yet (audit worker session_01964izESP2ym3HQX17qtSae); my receiver path = the one core it reuses (below) | claims: none other.

## Done this round (branch `review/parallel-time` → **0306b8ed6**; origin/main 790cda59c merged in 5d55dd594, origin/main e16e1d661 merged in 0306b8ed6 — assemble.py: main's list + jptime.js)
RECEIVER 4 ANSWERS (OD:L1915, canon overwrite of the 20:35Z «Đi»-only), labels = OD L1876 verbatim:
| receiver | before | after |
|---|---|---|
| her (maid road) — master's order dò la / bùa ngải / bỏ độc (j42 srvOrder → PEND.cnvOrd) | modal pop-up at once; dò la = ONE option «Đi»; plant/poison = Vâng lệnh / Từ chối / Mật báo | NOTICE: S.ordQ + kitLine "X cho gọi ngươi: có lệnh, trả lời trước khắc K" + 信 icon badge; she opens it from the panel («Nghe lệnh») when her act ends; card = **Giúp hết lòng** (n=2 khắc incl. walk, odds o) · **Giúp qua loa** (n−1=1 khắc, odds o − BAL.ptime.half 15) · **Từ chối** (Chủ tin −10/−15, maybe quỳ phạt Sức) · **Mách lẻo: báo cho …** (Bạc +20 Danh +2, evidence to the other side, risk); unanswered past ansK=2 khắc → Từ chối with its cost (log line) |
| her — «Việc chủ sai» (j42 srvErrPick) | modal «Đi» (#2) / Phận sự card | NOTICE as above; Phận sự card opens the same answer card (k 0); 3 answers (harmless errand, nothing to tell on — said on the card): Giúp hết lòng (2 khắc, công lao +1) · Giúp qua loa (1 khắc, công lao +1, Chủ tin −1 = BAL.ptime.errHalfTin) · Từ chối (0 khắc, Chủ tin −3 = errRefuse) |
| NPC servant ordered by its master (j29 runAct → jagstf2 stf2Ord) | obey / refuse / tell | the SAME 4 from cnvOrdOpts: obey · **half** (deed runs under ordHalf: odds − 15 via ACTX.pen / frozen fz) · refuse · tell; weight half = BAL.ag.stf2.ord.half 0.2 × (1 − lòng), nết lanh 1.4 / nhát 1.2. ag-stf2 sample: lòng 10 → half 242 obey 89 tell 39 refuse 30; lòng 90 → obey 338 half 22 |
ONE core: j42 `cnvOrdOpts` now returns 4 options (obey "Giúp hết lòng", half "Giúp qua loa", refuse "Từ chối", tell "Mách lẻo: báo cho X"); `ordHalf(fn)` + `ORDHALF` (j9) is the one qua-loa flag read by `ordOdds` (j42), `actCtx` pen and runAct's frozen odds (j9); `ordRow(k,t)` (j42) is the one gain/loss row of an order (j42 card and jptime card both read it). The receiver-choice audit should reuse `cnvOrdOpts` + `ordHalf` (no second system).
Bug fixed on the way: BAL.ptime.half sat inside `kinds` (BAL.ptime.half was undefined; code fell back to 15) — moved out with ansK / errRefuse / errHalfTin.
Bug fixed on the way: at the deadline the j95b world gate could drop the rebuilt card → Từ chối had no cost; orders now rebuild as a save-load does (`ptOrdMk`, PEND direct).

## EQUAL-VALUE (laws 2/3/4) of the 4 answers (numbers only in BAL)
| answer | khắc (her) | gain | loss / risk | why equal |
|---|---|---|---|---|
| Giúp hết lòng | n = 2 | full odds o, the order's gain row | fail row (dò la: Chủ tin −5 hoảng sợ + oán; plant/poison: Chủ tin −2, half caught) | baseline |
| Giúp qua loa | n − 1 = 1 | same row, odds o − 15 | same fail row, more often | 1 khắc back for her own acts vs. 15 points of odds |
| Từ chối | 0 | no deed, no risk of being caught | Chủ tin −10 (−15 vs a cruel master), quỳ phạt Sức −20 at malice/2 | safe road paid in trust |
| Mách lẻo | 0 | Bạc +20, Danh +2, the other side's favour | master learns → beaten / Tân Giả khố | big gain, big risk |
| Việc chủ sai: hết lòng / qua loa / từ chối | 2 / 1 / 0 | công lao +1 / +1 / — | — / Chủ tin −1 / Chủ tin −3 | 1 khắc ↔ Chủ tin −1 |
NPC receivers: the same options, same odds penalty (ordHalf), weights by lòng × nết × tâm cơ (mindPick).

## ONE «tin» panel (FROM MAIN ROOT-57 ~21:58Z): d7e49ed is not on origin/main yet (not merged here). No new panel added; the orders are exposed for MAIN's one panel through the reader API:
`PTIME.orders()` → [{id, pid ("cnvOrd" | "err"), byNm, title, due}] · `PTIME.ordWhen(o)` → "trả lời trước …" · `PTIME.answer(id)` → opens that order's answer card (4 answers; Việc chủ sai 3). The badge rule: show the «!» while `PTIME.orders().length`. Today's ptPanel/ptIcon (from #1/#2) list them too until errand-scene r2 lands; when it lands, MAIN's panel replaces ptIcon's registration and must call the three above (clash → FOR MAIN).

## Shots (Fold 755x1000@2 + iPad 1180x820@2, taken on 2ad55a065 before the r3c text fix + main merge; outside git; `node dev/test/ptime-shots.js <out>`)
#kload / #klife now waited for by their own buttons (iPad: «Chơi luôn ở đây» on the add-to-home screen; life gate «vào luôn»), settle before every shot, nothing hidden. 7 shots per device: 1 sender card · 2 status icon · 3 信 panel with «Đợi tin» · 4 receiver notice (信 badge) · 5 panel «Nghe lệnh» (deadline shown) · 6 the 4-answer order card · 7 Việc chủ sai 3 answers. Looked at all of them; known: shot 4 (fold) also shows a random news toast from the new life over the lower screen; the badge is visible.

## Gates (on 0306b8ed6)
- `node dev/test/ptime.test.js` ALL OK (test 10 rewritten: notice not pop-up, deadline ansK, «Nghe lệnh», Việc chủ sai 3 answers + walk n khắc, order 4 answers in L1876 words, qua loa odds = odds − half, unanswered = Từ chối with its cost, NPC stf2Ord → "half" over the same 4) · `node dev/test/ptime2.test.js` ALL OK
- `bash dev/tools/quickcheck.sh` PASS (core gates incl. one-core guard, old save loads, perf new≈live) · `node dev/test/coop-e2e.js` 63/63 · `node dev/test/coop-one-world.js` PASS
- `node dev/test/ag-stf2.js dev/index.html` (touches cnvOrdOpts / stf2Ord): ALL 23 PASS in 4 of 5 runs; 1 run printed «1 FAIL» (sampling test, the item was not captured in that run; 3 reruns hunting it all PASS) — the reviewer should rerun it.

SẴN SÀNG KIỂM 0306b8ed6 — touched (this round): dev/build/{j9.js, j29.js, j42.js, jagstf2.js, jbal2.js, jptime.js, assemble.py (merge: + jptime.js)}, dev/test/{ptime.test.js, ptime-shots.js}, index.html, sw.js (+ merge 5d55dd594). Whole branch: + #1/#2 files listed above (jptime.js, jbal2.js, jstip.js, jmkt.js, jveil, j13, jthaiy, jroute, j8, jagacts3, ptime2.test.js). Reviewer = BIG (opus).
