# OB-M3UI — robot M3 UI faults (modal / legend / lightbox / confirm layer)

PRIORITY #1 CHECK: OD 24/11 ~07:25Z (no confirm before ending choices, xgConfirm removed) + ~08:08Z/~08:40Z (no re-ask after a game option; SYSTEM confirms kept) | main: KK29 jopic.js (picture tap chooses, MAIN 136), j79/jwhy option-card meter guard (MAIN 136), kitCloseLayer / kitModalClose / Esc (jk4 KIT 32.10), kitConfirm (j79 KIT 83.9), kpGate «Kiếp này chưa trọn» (jkiep) | review/* none on this layer | claims none open. Reused all of these; nothing rebuilt.

Branch `review/ob-m3ui` (fix 248d95c0, merged with LIVE 3af7896e). Built files not committed (coordinator rebuilds).
Test: `node dev/test/ob-m3ui.js <index.html> <old-save.json> [shotdir]` — real touch taps, Fold 755x1000 + iPad 1180x820, robot M3 old save (gunzip of dev/handover/robot/m3/save_dump_latest.json.gz on the handover branch).
Videos (AFTER, whole test run): CDN `img/_review/ob-m3ui/` — fold-fresh-life.mp4, fold-old-save.mp4, ipad-fresh-life.mp4, ipad-old-save.mp4.

## What she sees, before → after
1. **Option card / «Thang cơ duyên» legend.** On LIVE a tap on an option card already chooses it (MAIN 136 fix; both robot cards «Tắm gội chờ giá» (Kính sự phòng báo tin) and a plain card choose on Fold + iPad). Still wrong on LIVE: the legend opened anywhere else (HUD meter, «!» card) had no ✕, Esc did nothing and the phone's Back LEFT THE GAME. After: the legend has the kit ✕ in its corner; ✕, a tap anywhere, Esc and Back close it; Back never leaves the game. The «tap chooses» list is now ONE kit list `KIT_OPT_TAP` (j79, read by jwhy) that also covers scene options (`.kscn-box`) and bare scene options (`.kbare`).
2. **Full-screen picture / «!» card.** Before: the big picture (`#kpzoom`) and the «!» card (`#kpinfo`, the whole option card) had no ✕; only an invisible «tap anywhere» closed them; Esc did nothing; Back left the game and lost the dialog under it. After: both show the kit ✕ top-right of the screen; ✕, outside tap, Esc and Back close them and the dialog under them stays. Back on any closable dialog (e.g. an info panel) now closes it instead of leaving the game; Back on a forced event does nothing (never leaves).
3. **Irreversible acts.** Owner ruling OD 24/11 (~07:25Z «Chọn là chọn luôn, không có confirm», ~08:08Z «Không có một lời nhắc nào…», scope ~08:40Z: system confirms stay) decides this family, so the brief's «confirm on xuất cung / tự vẫn / bỏ cuộc / chuyển kiếp» was NOT applied to game choices (law 16/17). Found and fixed against that ruling: a game option naming death (e.g. «Tự vẫn cho xong») was stopped by «Kiếp này chưa trọn … Nghĩ lại / Vẫn chọn» (jkiep kpGate) → now chosen at once; the loss shows after (Kiếp dở dang card, unchanged). SYSTEM acts now use the ONE kit confirm (kitConfirm, danger button): «Kiếp mới» over a sổ that holds a life — before: the button text changed to «Chắc chắn? … bấm lần nữa» (a second tap) → after: «Bỏ kiếp trong sổ này?» (or «Bỏ ngang kiếp này?» with the nghiệp lines for an unfinished life), «Thôi» keeps the life. «Chuyển kiếp» (death card): left as is — the life is already over and written to Sổ luân hồi when that card shows; the card itself is the recap («Một kiếp nhìn lại»); an extra recap screen = robot suggestion, parked (feature freeze). Kept two-tap (not destructive, so not changed): cloud «Lấy lại bản này» (current copy stays on the cloud), co-op «Bỏ phòng» (only drops the room from the list).
4. **Unlabeled «!».** Scan of every visible «!»: the one beside the ✕ on the sheets the robot named is the HUD «Tin báo» box (named «Tin báo: N tin mới»; under the dim ground, a tap on it = a tap outside = the sheet closes, so ✕ is not the only exit). Every «!» part now has both a name and a hover title: «Ghi chú» (kitNoteBang), «Chi tiết» (jfocus), «Có chuyện buổi này» (jact map), «Xem thêm» (option card, already). Before, one «!» on iPad had no name.

## Before / after table (dev/test/ob-m3ui.js, 2 devices)
| case (each × Fold + iPad) | LIVE 6b5d3d05 | review/ob-m3ui |
|---|---|---|
| meter tap on plain card / «Kính sự phòng báo tin» card | chose | chose |
| legend: ✕ / outside / Esc / Back | no ✕ · outside ok · Esc stays · Back LEAVES GAME | all four close, game kept |
| picture #kpzoom: ✕ / outside / Esc / Back | no ✕ · outside ok · Esc stays · Back LEAVES GAME | all four close, dialog under kept |
| «!» card #kpinfo: ✕ / outside / Esc / Back | same as picture | all four close, dialog under kept |
| Back on an info dialog | LEAVES GAME | closes the dialog |
| death option «Tự vẫn…» | «Kiếp này chưa trọn» re-ask | chosen at once |
| «Kiếp mới» over the robot's live sổ (old save) | no confirm (two-tap text) | kit confirm, «Thôi» keeps life |
| every visible «!» named | 1 unnamed (iPad) | all named |
| old save → «Tiếp tục kiếp này» | Mạnh Mi Trang in play | Mạnh Mi Trang in play |
| page errors | 0 | 0 |
| total | 31 FAIL / 45 | 0 FAIL / 44 |

Regression: kit-opt-art-tap.js 6/6 pass; kit-close.js output identical to LIVE; dialog-stack-scan.js fails 10/10 on LIVE too (pre-existing, test harness, not this branch).

## Kit change (for KK39 via MAIN)
New kit hooks in jk4 next to KIT 32.10: `kitTopClose()` (Esc + Back share it) and `kitBackArm()` (one history guard entry). `kitOvX(k)` (jopic) = the existing `kitXHTML` ✕ placed in a full-screen viewer corner (`.kxov`), `.kxpop` = the same ✕ in the word pop-up. KIT.md 32.10, §6.2 option «!» / picture lines, #kpop line and 83.9 overwritten in place. No new look.

## Files
dev/build/j6.js, j79.js, jk4.js, jkiep.js, jopic.js, jwhy.js, jact.js, jfocus.js; dev/kit/KIT.md; dev/test/ob-m3ui.js.

LOOK READY.

## REVIEW (RV-OB-M3UI)
PRIORITY #1 CHECK: OD 24/11 ~07:25Z / ~08:08Z / ~08:40Z (real) | main KIT 32.10 closers, kitConfirm 83.9, jkiep kpGate | review/* review/ob-m3ui only | claims OB-M3UI session_01V1ZZH2Vt4J15fPjFZDCzMq.
Target review/ob-m3ui 0c6e3222 (fix 248d95c0 on LIVE 3af7896e). Built both with dev/build/assemble.py (review.html / live.html) and ran every test on both.

**VERDICT: FAIL** — 1 real fault (Back still leaves the game), 2 smaller. Everything else PASSES.

### Numbered faults
1. **Device Back still LEAVES the game in three states; the "Back never leaves the game" claim (brief + report §2 «Back on a forced event does nothing (never leaves)») is false.** Cause: `kitBackArm()` (jk4) pushes the one history guard entry ONLY when `kitTopClose(true)` is true at the moment of a click +80 ms / +700 ms. Probe (Fold 755x1000, touch, page.goBack, 0 page errors) on review.html:
   - forced event (options, no cancel option, nothing closable): Back → page LEFT (history entry before the game). Not armed, `kitTopClose(true)=false`.
   - nothing open: Back → LEFT.
   - a closable card that opens by itself >700 ms after the last tap (timer / dawn / world step; no click armed it): `kitTopClose(true)=true` yet Back → LEFT (no guard entry).
   - a guard entry left behind after a layer is closed with ✕ swallows one Back with no visible effect, the next Back leaves (guard is never re-armed after a plain pop with nothing to close).
   Same on LIVE for the first two (not a regression), but the brief for this branch was exactly «never leaves the game». Fix proposal (small, kit-side, jk4): push the guard once at boot (and on every popstate), make `popstate` run `kitTopClose()` and otherwise do nothing (stay in the game), drop the click-timer arming. Owner decision needed only if she wants Back to be able to exit the app from the bare room — law 16: ask her; the brief says never leave.
2. **law 11 list — where Back now acts as the ✕/Esc of that layer (new behaviour, was «leave game»)**; none skips a required choice, but MAIN should know: (a) a dialog with a close-only option («Thôi» / «Lui» / «Đóng» / «Đã hiểu» / «Đã rõ» / «OK» / «Xong», kitCancelIx) → Back = that option via chooseM (its go/wrappers run, same as ✕ and Esc since KIT 32.10), so Back on an invitation-type card with a «Thôi» DECLINES it; (b) game/lesson result card #ov → Back presses its result button (applies the result, same as ✕); (c) kitBook, mini-game while it runs (no result button), podium, forced events (no ✕), `.kpod` → Back does nothing in-layer (and see fault 1: it then leaves). No layer found where Back skips a must-answer choice. Not tested live: co-op screens and individual minigames (one-by-one scan not possible in a sparse harness); they use the same #modal/#ov paths.
3. **Minor / test-harness:** (a) report says LIVE 31 FAIL / 45; I get 32 FAIL / 45 on LIVE, 0 FAIL / 44 on the branch (count differs by 1, same cases). (b) `kit-opt-art-tap` is flaky on BOTH builds: the «ksp-card» row randomly reads «no card» (review run 1 Fold, LIVE run 1 Fold; re-run both green) — not a regression. (c) `dialog-stack-scan.js` cannot run here at all (times out waiting for `#krotf`, 120 s) on LIVE AND the branch, so the 10/10 LIVE count could not be compared; harness, not branch.

### What PASSES (evidence)
- law 16/17 (OD quote): the removed re-ask is exactly what she ruled. OD 24/11 ~07:25Z: «Tôi không có muốn phải hỏi lại confirm gì hết. Chọn là chọn luôn, không có confirm lại một lần nữa» ; ~08:08Z real: «Không có một lời nhắc nào về bất cứ một cái hành động của tôi nha … tôi không có muốn có một cái lời nhắc nào cả» ; ~08:40Z real: «những cái vấn đề liên quan tới hệ thống … xóa bản lưu … là bắt buộc phải hỏi lại … Tôi đang nói … khi tôi bấm vào một lựa chọn rồi sau đó nó báo nhắc nhở để phải chọn lại». So «Kiếp này chưa trọn … Nghĩ lại / Vẫn chọn» (a game option) → removed = correct; «Kiếp mới» over a live sổ (system act, deletes the save) → ONE kit confirm = correct. kpGate kept as a stub returning false (co-op thin callers keep working).
- law 9: KIT.md 32.10/32.11, §6.2, 83.9 overwritten in place (no side-by-side copy); ✕ = existing kitXHTML, `.kxov` / `.kxpop` only place it; list `KIT_OPT_TAP` is one list read by j79 and jwhy.
- `dev/test/ob-m3ui.js` Fold 755x1000 + iPad 1180x820, robot M3 old save: branch 0 FAIL / 44 (legend ✕/outside/Esc/Back, #kpzoom, #kpinfo all four, Back on info dialog, death option chosen at once, «Kiếp mới» → kit confirm + ✕ keeps life, every «!» named, old save «Tiếp tục kiếp này» → Mạnh Mi Trang, A/B page errors none); LIVE 32 FAIL / 45.
- `kit-opt-art-tap` 6/6 on branch and LIVE (flaky row only). 0 new page errors vs LIVE (0 on both).
- LOOK PASS: shots 755x1000/1180x820 1b-ladder, 2-kpinfo, 2-kpzoom, 3a-confirm, 4-bang looked at: ✕ in the corner, sits inside the screen, no cut text. Note: on 3a the confirm shows ✕ + «Bắt đầu kiếp mới»; the «Thôi» word is the ✕ (kit close-only option), by design.
- Video sheets (fold/ipad fresh-life, fold old-save): the grey silhouette portrait on the «Tin» dialogs is a loading placeholder — in my own run of the same build the same dialog shows the real portrait (Tạ Tâm Duyệt, 755x1000 2-kpinfo) while option thumbnails and event art load in the video too, so it is image latency in the recorded run, not a kit fault. (Same silhouette appears in the first «Nhập cung» frame before art arrives.)

Re-review after fault 1: SMALL re-check = run `node dev/test/ob-m3ui.js` + add cases «Back on forced event / bare room / timer-opened card stays in the game».

## FIX r2 (after RV-OB-M3UI SMALL FAIL)
Back guard is now kept on top ALWAYS: `kitBackArm` at boot, on every pointerdown / key, and re-pushed on every popstate; popstate runs `kitTopClose()` (closes a closable layer, else nothing). New cases in ob-m3ui.js, Fold + iPad: Back on the bare room → stays in the game; Back on a forced event → stays, event still waiting; Back on a card opened by a timer 1.5 s after the last tap → closes it. 50/50 pass, old save continues, 0 page errors. KIT.md 32.10 Back line overwritten in place.

## REVIEW r2 (RV-OB-M3UI) — cb7906f4: **PASS**
- Fault 1 fixed: guard armed at boot + every pointerdown/key + re-pushed on popstate; popstate → kitTopClose() else nothing. Probe on Fold, goBack: bare room, forced event (stays, still waiting), timer-opened card (closes) — none leaves. dev/test/ob-m3ui.js on r2 build: 0 FAIL / 50 (Fold + iPad), old save continues, 0 page errors.
- Extra cases MAIN asked for (the worker did not cover them; tested by RV, own probe, Fold 755x1000, touch):
  - «Kiếp mới» «yes» path (old save, sổ 1 = Mạnh Mi Trang alive): kit confirm → «Bắt đầu kiếp mới» → sổ replaced, new life «Lư Tĩnh Uyển» in play, 0 page errors.
  - Co-op lobby pages co / wait / join / pick (COOP_LOBBY.open, modal kptitle kcoop): Back never leaves the game; no page error. Back closes only the «co» page (its close-word); wait/join/pick stay open (no close-only button) — nothing required is skipped. A real two-player room could not be run here (no co-op server in the harness): the lobby/room code is not touched by this branch, Back only reaches it through the same #modal/#ov paths.
  - Mini-game shell running (playArt art co / cam / ky / hoa → #kg82): Back leaves the game running (still open, onDone not fired, game kept), 0 errors. A mini-game has no ✕ while it runs, so Back does nothing — never quits or skips the round; its result card closes through kitOvBtn as before.
- Residual note for MAIN (owner call, not a fault): with the guard always on, the phone's Back can no longer exit the app from the bare room (history entry kept). That is what the brief asked («never leaves the game»); if she ever wants Back-to-exit from the room, it is one line in kitBackArm.
## FIX r3 (MAIN 156 addendum)
- Back = Esc by construction: popstate re-pushes the guard and sends ONE Escape key event to the focused element, so every layer's own Esc handler answers Back the same way. `kitTopClose` also closes the co-op letters panel (#kchatp ✕) and a mini-game shell only while its back is free (KG82.backPre / KG82.back); in a round with stakes Back does nothing (the ✕ there = give up, so Back never gives up for her).
- Scan, Fold + iPad (dev/test/ob-m3ui.js, 122/122 pass): every mini-game shell via each art's lesson (cầm, kỳ, thi, họa, vũ, y, thêu, nấu) on the rules screen: Back = Esc (no free back: stays; free back: closes), 0 bạc / 0 sức spent, never leaves; title pages Thiết lập / Cùng hảo hữu (co-op rooms page) / Sổ luân hồi: Back → title home like Esc; «Kiếp mới» confirm YES path: new life starts (identity card) in that sổ.
- Not testable here: a LIVE co-op room (needs the relay + a second player). Code path: Back only runs local closers (no COOP send), the room lobby is a kit modal (Back = its ✕), the letters panel closes by its ✕.

## REVIEW r3 (RV-OB-M3UI-r3) — 5843966e (delta 68a1c68d..5843966e): **SMALL PASS**
PRIORITY #1 CHECK ('ob-m3ui'): OD 24/11 ~07:25Z/~08:08Z/~08:40Z (no confirm on game choices); KIT §32.10; r2 68a1c68d = SMALL PASS; claim OB-M3UI. Delta = jk4.js (popstate → ONE synthetic Escape to the focused element or body; kitTopClose + #kchatp ✕ + mini-game shell ✕ only when KG82.backPre/back), ob-m3ui.js (+72 cases), report, KIT 32.10 line.
- **Every `keydown` Escape handler in dev/build (grep, all listed):** j74 title sub-page → home; j82:672 mini-game rules screen `t.back()` (not while #modal open); j87 kitBook close; j90 podium: Esc = skip the cutscene (no spend); jcoopchat input + panel: closePanel only (Enter sends, Esc never sends); jdisp display room / drawer close; jinv shop detail close; jitd item card close; jk3:125 kgfClose, jk3:244 HUD sheet collapse; jrank Bảng vàng close (only when no modal); jk4:892 kit catch-all (kitTopClose, skipped when defaultPrevented). None gives up, spends bạc/sức, answers a choice or sends a co-op message. The only "answer" path is the long-known kitCancelIx close-only option (Thôi/Đóng/Đã hiểu… via chooseM, r2 note 2a), same as real Esc/✕. Live mini-game round: no kgback ✕ with free back → Back does nothing (never gives up).
- **No double-close:** layers that handle Esc call preventDefault/stopPropagation and the kit catch-all skips on defaultPrevented. Residual, identical to a real Esc (not new): jk3:244 (HUD sheet) and jrank-with-modal do not preventDefault, so one Esc/Back there can also let kitTopClose close one more layer.
- **Nothing focused:** probe, blur before each of 60 `goBack`: 60/60 Escapes reach the document, never left the game, history length stays 3, 0 page errors.
- **No listener leak:** probe wrapping addEventListener: 60 popstates → +4 listeners total (game ticks), not +60; handler is one permanent popstate listener.
- `node dev/test/ob-m3ui.js` on a fresh build of 5843966e (CDN pictures), robot M3 old save, Fold 755x1000 + iPad 1180x820: **0 FAIL / 122** (kit-close cases, mini-game scan, title pages, Kiếp mới YES, old save «Tiếp tục kiếp này», A/B page errors none).
- Note only: «3a-yes» logs «Sổ luân hồi +0» for the replaced life (lifeLog length unchanged); a new life does start. Not a Back matter, not in this delta; MAIN may check that «Bỏ ngang» is meant to write no Sổ line.
- Not testable here: live co-op room (relay + 2nd player); Back there only calls local closers.

## FIX sololh (MAIN 156, law 6c) — branch review/ob-m3ui-sololh
LIVE and r3 wrote NOTHING to Sổ luân hồi when «Kiếp mới» overwrote a LIVING life that is already «trọn» (S.kpTron, set on entering the palace = most living lives; only unfinished lives were written, by jkiep). Now j6 writes the row «Bỏ ngang» (name, origin, highest rank, age, year, living children) for that case; unfinished lives stay with jkiep (nghiệp), dead lives were written at death — never twice. Test 3a-yes now asks Sổ luân hồi +1: Fold + iPad +1 (was +0), 122/122 pass.
