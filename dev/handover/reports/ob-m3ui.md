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
