# D3 — contest-thitam: first place in ANY contest ⇒ thị tẩm that night

PRIORITY #1 CHECK ('thi thố|hạng nhất|thị tẩm|lật thẻ|contest'): OD 76 | ledger 6 | claims 8 | main 15 | review/* 8 | archive 314
(the literal brief phrase "thi thố hạng nhất thị tẩm lật thẻ contest" → 0 everywhere). No existing «first place ⇒ thị tẩm» anywhere;
review/contest-ui-r3 (podium / prize UI) and review/coop-contest-fix-r1 (co-op contest relay) are other jobs, not landed, not this rule.

Worker D3 (opus) · session_01D3E3NY4u5PWtro3m4FhbDG · depth 2 · START_CTX ~3 % · parent FOREMAN D session_01D3E3NX3vWTRXcmN8Wi8Yxw.
Branch `review/contest-thitam` — base LIVE f009e1a6, newest LIVE 02f564ae merged (7f28e647). Status line at the end.

## Owner words (verbatim, OD row «26/11 ~01:25Z»)
"Tôi thấy hiện tại tỉ lệ được lật thẻ bài thấp quá. Tôi muốn khi thắng hạng nhất các cuộc thi, ngoài phần thưởng hiện tại, còn được thị tẩm đêm đó"
→ ruling (1): first place in any contest ⇒ also thị tẩm that night (BAL key; current rewards unchanged; lật thẻ odds unchanged); test every contest kind; co-op two-way + both seats.

## What was built
- `dev/build/jctn.js` (new, last module) — `ctnWin(winner, title)`: keeps tonight for the winner with the SAME «night taken» mark his own
  visit uses (j75 `S.ntk {w: wk(), who, nm}`). Consequences, all from existing code:
  no tablet flip that tối (jnf / jfe realFlip), nobody can take the night (every steal / visit path reads j75 ntTaken / ntReason — same
  for her and NPCs), the winner's normal night plays at the end of tối (her: jnf herNight → «Chuẩn bị thị tẩm» → night cards; an NPC:
  resolveTonight → rivalNight; the co-op friend: the host's flip relay). With the 10-night ledger ON the winner holds the PLAYED tối of the
  tuần and the other nine nights are rolled / recorded as before.
- She is told at once: kit modal «Kính sự phòng báo tin» (same card pattern as ksp / nfsum) + Sổ ghi line. NPC winner: Sổ ghi line.
- Not given (her log says why; same rule for everyone): winner cannot serve tonight (nightCh 0: with child, ill, cấm túc, lãnh cung, her
  monthly days), tonight already taken (his visit, an earlier contest that day), tablet already turned.
- `BAL.ctn = {on: true}` (jbal2) — the rule switch (law 4). No new number: rewards untouched, nightCh / BAL.ag.emp.summon untouched.
- Every contest entry card prints the extra gain beside its own prize (`ctnX()`: «…, đêm nay được thị tẩm»): j71 sign-up / festival day
  / feast cards, jts Hội phối đồ «Tự tay phối đồ», j34 Tranh ghế intro.
- Co-op (host-authoritative night): the host keeps the night for whoever wins in its world (itself, an NPC, the friend's entry) and tells
  the friend; a contest the GUEST plays on her own seat sends her first place to the host (free-form `act` k `ctm-ctn`, no Worker change,
  old clients ignore it); host applies the same rule and answers ok / no; her card + log follow the answer.
- Kit: modal card + log line only (no new part; LAW 9). Words: VANPHONG cổ trang, no %.

## Whole family (LAW 11) — `python3 dev/tools/contest-thitam-scan.py [root]`
Markers: every `bestow(w,"contest")`, the finish functions by name, story endings «đứng đầu» in a «Kỳ thi / Hội thi / khảo» node, child contests.
14 contest kinds found · LIVE: 0 of 8 wired · branch: 8 of 8 wired · 6 not wired with a reason · 0 unknown sites.

| contest kind | file | LIVE | branch | why not |
|---|---|---|---|---|
| Hội thi ngày lễ (j71 festival contest, by formula; she entered or not) | j71 cRun7 | no | yes | |
| Hội thi ngày lễ after her mini-game | j71 cFin7 | no | yes | |
| Yến tiệc đầu xuân / Thi tài Thất tịch after her mini-game | j71 fxFin7 | no | yes | |
| Yến tiệc đầu xuân / Thi tài Thất tịch, no mini-game | j71 festival wrapper | no | yes | |
| base feast (j71 off) | j8 festival | no | yes | |
| Tranh ghế | j34 contestEnd | no | yes | |
| Hội phối đồ | jts tsDressHold | no | yes | |
| Kỳ thi Tài nữ (story contest) | j67 ARC67 thd_tho | no | yes | |
| contest prize table | jcui cuAward | — | — | pays the places of the j71 contests above (wired there) |
| Tuyển tú | jselx / jselxday | — | — | before sắc phong: no thẻ bài, nights are the yard dormitory |
| Ngày khảo việc (cung nữ) | j67 | — | — | servant road, never thị tẩm |
| khảo thí hoàng tử / công chúa dâng nghệ / con đứng đầu kỳ khảo | j53 / j54 / j67 | — | — | the child places, not a consort |

## Tests (LIVE f009e1a6 build vs branch build)
1. `node dev/test/contest-thitam.js <dev/index.html url>` — every kind × (her, NPC), one day each, tablet steered to another NPC so LIVE
   shows what the flip alone gives. Pass = night kept for the winner, winner +1 night, nobody else, no flip choice, day advances once.
   - LIVE: 0/16 (winner never gets the night; the flip choice opens every time).  Branch: 16/16. Ledger ON (`LEDGER=1`): branch 16/16
     (winner holds the played tối; the other nights of the tuần still rolled, 4–9 recorded).
   - Not given: with child → no promise, the tablet runs as before (her 0, other +1). Rewards: each contest's own Sủng / Danh deltas unchanged
     (prize code untouched; deltas equal LIVE ± the random empGive bestow).
   - Entry card on branch: «Dự thi thơ — … thành: đoạt giải, Sủng +3, Danh +3, đêm nay được thị tẩm, có thể được ban thưởng …».
2. Co-op `node dev/test/coop-contest-thitam.js` (2 browsers, LIVE Worker, host Fold 755x1000 / guest iPad 1180x820): C1 host wins, C2 the
   friend's entry wins in the host's contest, C3 the guest wins on her own seat (relay), C4 an NPC wins. RESULT: see «Co-op result» below.
3. Real-tap videos (HOST mode, rot.js, the player's screen; set-up = the j71 festival invitation card + her talent pinned top; then only
   real taps): `node dev/test/contest-thitam-video.js <root> <out> <tag>`.

## Videos (CDN review folder img/_review/contest-thitam/)
- Branch Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-fold-755x1000.webm
  (Dự thi thơ → first place → «Kính sự phòng báo tin: tối nay ngài truyền ngươi thị tẩm» → Sang buổi ×3 → Sang ngày mới → Chuẩn bị thị tẩm
  → Đêm thị tẩm ×2; no flip choice; her nights +1)
- Branch iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/branch-ipad-1180x820.webm (same flow)
- LIVE Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/live-fold-755x1000.webm (she wins, no card; the
  tablet decides — this run it happened to turn hers)
- LIVE iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/contest-thitam/live-ipad-1180x820.webm (she wins, no card,
  another consort's card turned → the flip choice → no night)
Note: the video driver stops at the night-end kit scene («Đêm êm đềm / lạnh nhạt», tap-to-close) — the same on LIVE; a harness limit,
not a stall (the player taps the scene).

## Decisions for the reviewer / sếp
- GUARANTEED night (no steal on it): the Emperor himself keeps it, like his own visit. Two-way: an NPC winner's night cannot be stolen by
  her either. (Alternative not built: hand the tablet to the winner but keep the 10-second steal choice.)
- Tuyển tú first place: not wired (no thẻ bài before sắc phong).

## Files
dev/build/jctn.js (new) · j71.js · j8.js · j34.js · jts.js · j67.js · jbal2.js (BAL.ctn) · assemble.py (+jctn last) · dev/site/CHANGE.txt ·
index.html / sw.js rebuilt · dev/tools/contest-thitam-scan.py · dev/test/contest-thitam.js · coop-contest-thitam.js · contest-thitam-video.js
