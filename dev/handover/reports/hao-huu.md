# hao-huu — «Hảo hữu» partner sheet (co-op) — report

PRIORITY #1 CHECK: OD 21/11 ~06:05Z (mark #2 verbatim), OD:L165 (stranger rule), OD 16/11 friend-chip spec | main jcooptimer.js kitCoopFriend / kitCoopFriendPanel (status only), jcoopworld.js buildFriend (her entry), jrail.js kitStageRail (§77, left icon column; users here/back/cal/chat 20/goal/disp 40/kgf 61-62), j79.js kitPanel + kitPersonStats, j61 knowledge | review/* none (review/ui-tour-coop a274e97c LIST part A: "There is NO dedicated partner sheet anywhere") | claims: hao-huu row only (this worker).

Owner (verbatim, 21/11 ~06:05Z): "Làm khung Hảo hữu đi, nhưng Làm thành một cái icon để ở bên trái của cái nền phòng á. Bên trái mình đang có một cái mấy cái icon đó, để ở dưới luôn."

Branch `review/hao-huu` from origin/main d31c8ec0. Tier BIG (co-op).

## r1 — OWNER CANON OVERWRITE 21/11 ~06:30Z (relayed by MAIN CHÍNH 88; OD row read verbatim on the handover branch)
Owner: "... tôi cần ở cái thanh trên cùng, tức là cái thanh nhân vật của tôi á ... Tôi muốn phải có một cái icon ... nếu mà người đó off là màu xám ... On là sẽ màu tươi hơn ... đang xong thì có một cái dấu tích màu xanh kế bên ... vẫn còn đang bận thì là nó hiện cái dấu ba chấm kế bên ... khi mà cần thông tin của người đó thì mình bấm vô người đó thì nó ra thông tin chẳng hạn."
- The stage-rail item is GONE. KIT §69.2 `kitCoopFriend` (jcooptimer, the header friend chip) IS the «Hảo hữu» icon — one part, not two: square kit icon button (36 px, radius 8) in the fixed top bar (`#kctmf`, same placement scan, top-right free slot); content = her portrait once met (`isKnown61`), the keeper's painted `img/kit/ico-friend.webp` while she is a stranger (no face before meeting, OD:L165; a grey silhouette could not show online/offline); GREY (`.koff`, grayscale) when offline (away), full colour online; corner badge ✓ green = ready, «…» = busy / at work, ⏸ = she asked to pause, none when offline. No name / status words on screen (aria-label + title + a visually hidden span keep them for screen readers and the old tests). The shared buổi countdown stays beside it as ONE short kit chip (`m:ss`, `⏸ m:ss`, «Hết buổi») — older owner rule 16/11 "Đồng hồ count down cho 2 người chơi đâu?" kept (reviewer rule: older rules on the same element).
- Tap → the partner sheet (jhaohuu `kitHaoHuuOpen`), which now also holds what the old status-only chip panel had: Lúc này = «Hảo hữu» (status, `frWord`), «Ta» (ready / khắc left), Đang ở, the same note line, and the «Tạm dừng» option (act card: Tốn không · Được «Hậu cung dừng lại cho cả hai đến khi ta trở lại») → ONE panel. `kitCoopFriendPanel` stays only as the fallback when jhaohuu is absent (kit sample keeps it).
- BUG caught on the way: the first export name `COOPW.hold` collided with jcoopworld's build-hold flag (truthy function → room frozen, #next «Đợi cùng bản mới»). Renamed `COOPW.frHold`; the test now asserts COOPW.hold untouched + #next free.
- KIT.md §69.2 rewritten IN PLACE (canon overwrite); the §77 (4) line removed; KIT_REQUESTS K-ICO-HAOHUU line says KIT READY + top-bar user.
- Tests updated (fix the whole group): coop-chat (header label = aria label now), coop-sleep (tap icon → partner sheet, close by ✕); coop-timer reads textContent (hidden span keeps the words).

## r0 (superseded placement; the sheet itself is kept)
### What changed (r0)
- NEW `dev/build/jhaohuu.js` (after jstatus in assemble.py): kitStageRail item `haohuu`, `order:90` = BOTTOM of the stage's left icon column, `when` = co-op on (solo: absent), both seats. Icon `img/kit/ico-friend.webp` = KIT REQUEST K-ICO-HAOHUU, painted by the kit keeper (KIT READY 21/11, two crossed gold hairpins, on the CDN; their KIT_REQUESTS row is on review/kit-test-defaults 2e74ba49).
- Tap → `kitPanel({kind:"info"})` (seal ĐIỀU, ✕ / Esc / tap outside) with kit parts only:
  Thân phận (Danh vị = `kitName` rank unit, Cung = palName(palaceOf)) · Tư chất (`kitPersonStats` tiles) · Sức khỏe (Sức khỏe, Bệnh, Thai) · Trong cung của nàng (Con cái = hoàng tử / công chúa count, Cung nữ thân cận) · Lúc này (the header chip's live status + Buổi này countdown + Đang ở = S.where).
- `jcooptimer.js`: the status words table moved into `frWord(o)` (used by the chip panel AND the sheet: ONE source) + `COOPW.frInfo()` export (chip data + tone/glyph/word).
- Stranger rule OD:L165: unmet = title «Hảo hữu của ta», the kit stranger figure `unknown-fig-f` as a stage pseudo person ({__fig,__cap}, kitShop form) — never her entry (the stage resolved her real art + name from it: caught by the test), every field «chưa rõ»; stats follow kitStatKnown (Danh / Sắc show when the game's knowledge rule says anyone sees them). Health «chưa rõ» even when met unless kitStatKnown(suc) (same rule as every NPC).
- Servant road: Danh vị Cung nữ · Hầu hạ <consort> · Cung. Home road (tiểu thư before tuyển tú, no entry): «ở phủ nhà, chờ kỳ tuyển tú»; dead: «đã khuất».
- KIT.md §77 order list: item (4) Hảo hữu documented; KIT_REQUESTS.md: K-ICO-HAOHUU line.
- Data: all from game state (her entry in the shared world, S.where, room clock); no number typed (law 4/6b). Wording cổ trang, no %.

## Tests
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <out>` (NEW, two browsers, LIVE Worker): **130/130 ok** — solo no icon; host + guest × Fold 755x1000 + iPad 1180x820 × stranger + met: icon is the LAST rail button, inside the stage, square; panel seal + ✕; stranger title/name/rank/stats/silhouette; met title = name, rank unit, tiles = her numbers, palace + household rows, Lúc này; ✕ and Esc close; no overflow; no page errors.
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js <out>`: **92/92 passed**.
- `bash dev/tools/quickcheck.sh 31d4de93`: **QUICKCHECK PASS** · open 1712 ms · old save ok · perf new/live render 219/267, tab 429/499, buổi 1517/1331 ms · core gates PASS.
- Shots (looked 3×): CDN `img/_review/hao-huu/` — hh-{host,guest}-{fold,ipad}-{stranger,met}.jpg (8). Verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review hao-huu`.

## Notes for the reviewer
- The test closes the opening Thi tuyển chọn mini game (#ov) and holds the stranger state with an interval (the shared world re-sends what she knows): test-only.
- Panel scrolls inside itself on both devices (Lúc này is the last section); kit §8 behaviour.
