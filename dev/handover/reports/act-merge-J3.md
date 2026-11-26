# REPORT act-merge J3 — Hành sự 38 → 16 (ACT-MERGE J3, opus worker for MAIN CHÍNH 155)

PRIORITY #1 CHECK ('act-merge'): OD 2 (26/11 ~07:25Z whole-game merge; ~07:32Z «chỉ gộp cái thật sự trùng», read verbatim) | ledger 0 | claims 2 (act-merge plan, J-jobs) | main: dev/build/jact.js AD_DOOR shared doors + AD_OUT (act-dedupe w1, REUSED, untouched) · j19 cardH · j3 Q/showModal/chooseM option dialog (kitOptFinal) | review/*: review/act-merge 45cc9930 (plan, §4 row J3) · review/dup-report 87b41ef2 (HANHSU_MERGE §3.2 H1–H16, reused UNCHANGED) · review/act-dedupe(-r1) = already on main | archive 0.

Branch **review/act-merge-J3** head **ad3bc9e8** = LIVE 3af7896e + J1 c18fe3a5 (stack) + J0 52334847. Code: ONE file, `dev/build/jact2.js` (block «ACT-MERGE J3»). No other J-job file touched; J1's `jdoor.js` used as-is (DOOR.add registry + DOOR.card choice card).

## TÓM TẮT CHO SẾP (tiếng Việt)
Hành sự: mỗi tính năng còn **một nút**; cách làm chọn **bên trong** (bảng chọn kit). 38 thẻ → **16 nút** (+ «An thai» khi có thai). Mọi cách cũ giữ nguyên khắc, bạc, cơ hội, kết quả (chạy đúng việc cũ). Lãnh cung không đổi (việc của J5).

## 1. BUTTON NAMES — OLD → NEW (Hành sự, consort road)
| NEW button (door) | H# | OLD buttons now INSIDE it (ways, each keeps its own khắc / cost / odds / result) |
|---|---|---|
| **Nghỉ ngơi** | H2 | Nghỉ ngơi một lát · Nghỉ ngơi dưỡng sức · Dưỡng nhan |
| **Cáo bệnh** | H3 | Giả bệnh · Xin rút thẻ bài, đóng cửa tĩnh dưỡng |
| **Thỉnh an** | H4 | Thỉnh an Thái hậu · Thỉnh an Hoàng hậu |
| **Bắt mạch, chữa bệnh** | H5 | Mời thái y bắt mạch · Sang Thái y viện xin bắt mạch · (while ill) Truyền thái y · Tự bốc thuốc · Tĩnh dưỡng |
| **Xem sổ Kính sự phòng** | H6 | Xem sổ nguyệt sự · Xem lén sổ nguyệt sự |
| **Đọc sách** | H7 | Đọc sách giải khuây · Đọc binh thư, sử sách |
| **Dâng tài nghệ** | H8 | Múa trong yến tiệc · Kinh hồng vũ · Đánh cờ với Hoàng thượng · Đàn khúc Phượng cầu hoàng · Vẽ chân dung tặng Thái hậu (the deal still shows the art cards her levels open) |
| **Tai mắt** | H11 | Sai cung nữ đi dò la · Nghe ngóng chung · Cài tai mắt |
| **Rời cung** | H14 | Nghĩ cách trốn khỏi cung · Dâng biểu xin xuất gia · Xin ban hôn cho (một vị) Vương gia · Xin về quê phụng dưỡng cha mẹ · Nhờ Thái hậu nói giúp |
| **An thai** (only while pregnant) | (+) | An thai · Báo tin có thai |

**ĐỂ RIÊNG** (each its own feature, owner ~07:32Z):
| Button (unchanged) | H# | Why separate |
|---|---|---|
| Điểm trang | H1 | dress/makeup of the day; its own picker (DRESS, LC21) — nothing else does it |
| Hối lộ Kính sự phòng | H9 | buys the lật thẻ (2 tuần dễ được lật thẻ); a different goal from reading the book (H6); shared door with the Tổng quản pop-up (jact AD_DOOR) kept |
| Trò chuyện với cung nữ | H12 | thiện cảm with her own maid; not a search (H11) |
| Cầu tự ở Phụng Tiên điện | H10 | fertility for 2 tháng; nothing else gives it |
| Phát bạc cứu giúp cung nhân nghèo | H13 | Đức/Danh by charity; one lock with Tài nghệ (jact) |
| Để ý một nam nhân (áo gấm / vương gia / thái y) | H15 | men road ladder, its own steps |
| Giả mang thai | H16 | a scheme with its own exposure risk |

Distinct buttons over 7 forced states (scan below): **35 old card names → 20 button names** = the 16 features + «An thai» while pregnant + 3 names a lone way shows under on days its twin is not dealt (Giả bệnh · Xin rút thẻ bài, đóng cửa tĩnh dưỡng · Múa trong yến tiệc) — the ONE engine's deck rule (jdoor deckFold, J5b): a door when ≥2 ways are dealt, a lone way stays its own card. On any one day ≤16 buttons. Lãnh cung deck: 10 → 10 (J5 owns it; checked: no door shown there).

## 2. HOW (display only — no rule, no number moved)
- ONE ENGINE (J1 `jdoor.js`): the 10 Hành sự rows are registered with `DOOR.add({k:"hs-…",n,kinds:["hs"],re,h})` (DOOR.of(name,"hs") names the door; NPC keys AGC3DOOR unchanged); H6 uses the same name as J1's KSP pop-up door «Xem sổ Kính sự phòng» (one feature).
- `deck` keeps EVERY original card object (Hậu cung deckFor, goals, tutorial, jact shared doors read it unchanged); a renderPanel wrapper (`hsdBuild`) replaces the dealt cards of one feature with ONE door card built by the SAME `cardH` (kit act card; art = the lead way's act art). Door rule = jdoor deck rule (≥2 ways dealt; greyed ways greyed inside with their reason). Its Thành row names the ways; odds chip = the best way's odds when every way rolls.
- Tap a door → `DOOR.card` = the standard choice card (pushDil, kit option rows, ✕ = Thôi): one row per way with its own Tốn (khắc + cost), Được, odds word, and the greyed reason. Greyed door: tap shows every way's reason (kpPop, as jact grey cards).
- Picking a way runs `act(i)` of the OLD card in its OWN task (setTimeout 0), exactly like a tap on the old card: same wrappers (jrest, j76, jmood, jaudit minigames, jstagehere walk, jact shared doors), same result card; the door dialog logs nothing of its own (`logChoice` skipped) and no dialog-choice context (j78 evidence «how», j85 deed, co-op pick text) wraps the act.
- Law 1 (two-way): NPCs use the same BAL.deck / AGC3BTN tables — untouched. Law 2/3: ways keep today's prices and gains. Law 4: no number typed (khắc = cardCost, costs = fmt(a.c), odds = optOdds). Law 6: deeds / objects / evidence come from the unchanged acts. Co-op: display only, no shared state.
- Kit: no new kit part (kitOptFinal option dialog + kit act card), no private CSS.

## 3. TESTS (all on this branch's build)
| Test | Result |
|---|---|
| `dev/test/act-merge-j3-deck.js` — Hành sự rendered under the dup-report forced states (base · art lv max · ill · con · pregnant · tâm cơ · evening) + lãnh cung | before → after buttons: base 22→14 · art 30→16 · ill 32→16 · con 21→13 · pregnant 23→14 · tâm cơ 22→14 · evening 28→15 · lãnh cung 10→10 (no J3 door; J5's own deck doors there); every dealt card reachable (0 lost); 0 page errors |
| `dev/test/act-merge-j3-ways.js` — every way of every door (5 states, success AND fail forced): old card path `act(i)` vs door tap + way pick, same saved state + same seed; compares khắc used, the act's change (AA.snap delta), queued dialog titles | **196 way runs, 0 differences** (stacked build ad3bc9e8), 0 page errors (control: the old path run twice; the harness flags runs where the old path itself varies — background NPC life / rival ghen not reset by AA.restore) |
| `dev/test/act-merge-j3-look.js` — REAL taps Fold 755x1000 + iPad 1180x820: Hành sự tab → door → kit dialog → way → its own result card | Nghỉ ngơi → Nghỉ ngơi một lát (1 khắc, Sức +6) and Tai mắt → Cài tai mắt (bại: Danh −3) on both devices; 0 page errors |
| `dev/tools/act-inventory.js` (plan tool) | see §5 |

Videos + dialog shots (CDN): `img/_review/act-merge-J3/` — fold-nghi.webm · ipad-nghi.webm · fold-taimat.webm · ipad-taimat.webm · fold-nghi-dialog.png · ipad-nghi-dialog.png · fold-taimat-dialog.png · ipad-taimat-dialog.png (https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J3/…). Pictures show «Đang thỉnh tranh…» because the test blocks CDN fetches.

## 4. OPEN / LIMITS
- kitRelW (J0): not used — no Hành sự door line prints a person number of its own (each way's result card is the act's own).
- The choice card (DOOR.card, J1 standard) words Được in kit words (e.g. «dưỡng sức») where the old card listed numbers; the numbers show on the way's result card. Same look as J1's talk doors.
- **D5 mg-trim** (j83 «Học nhanh»): review/mg-trim head bb0ae651 is NOT on LIVE yet (origin/main 3af7896e). J3 touches no j83 code (Hành sự has no j83 card on the consort deck), so the merge is mechanical: merge LIVE again once mg-trim lands, rebuild, re-run the three tests.
- Files listed for J3 in §4 (j2 deal/pool, jact, j13 illCards, j83, jcycle) needed NO edit: the merge is one display layer over their cards (no card removed from the deck, so every other screen that reads `deck` — Hậu cung deckFor, goals, tutorial — is unchanged).
- In the parity harness the kit dialog DOM is held by the scenario's stale life card, so the way is picked with `chooseM(j)` (what the option tap calls); the real option tap is proven by the look test on both devices.

## 5. INVENTORY
The whole-game `act-inventory.js` re-run was cut for time (the stacked rebuild came mid-scan); the Hành sự numbers above come from the rendered panel under the same forced states the dup-report used. Reviewer: `node dev/tools/act-inventory.js out.json` on ad3bc9e8 gives the whole-game row.

## STATE
LAND READY ad3bc9e8 (stack: LIVE 3af7896e → J0 52334847 → J1 c18fe3a5 → J3). Re-stack needed only if J1 moves or mg-trim lands (merge, rebuild, rerun the 3 tests).

## r1 (RV-ACT-MERGE F2(c) + F4) — head f27af4f1
- F2(c): no third fold. J1 took my display-only model into `jdoor.js` as THE deck-door engine (DOOR.road = hs | srv | cold | kc). `jact2.js` J3 block = the HSD table + `DOOR.deck({k:"hs-…",n,roads:["hs"],h,re})` registration only; my hsdBuild / hsdOpen / chooser / logChoice / kitActArt wrappers DELETED. Deck untouched (AD_DOOR locks, jhc deckFor, jgoal read it as before).
- F4: the deck door card speaker = her figure (pMe) — J1 4821c522; look test reads Q[0].who = true on Fold + iPad.
- Stack: LIVE 3af7896e → J0 52334847 → J1 4821c522 → J3 f27af4f1.
- Tests on this build: deck scan base 29→16 · art 30→16 · ill 25→13 · con 21→13 · pregnant 23→14 · tâm cơ 22→14 · evening 22→13; 0 lost, 0 page errors. Parity 206 way runs 0 differences (one earlier run showed 6 diffs, all the same background rival change, gone on rerun = noise). Fold + iPad real taps (Nghỉ ngơi, Tai mắt) with her figure; videos re-uploaded img/_review/act-merge-J3/.
LAND READY f27af4f1.
