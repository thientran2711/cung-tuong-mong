# REPORT act-merge J1 — talk side (ACT-MERGE J1, opus worker for MAIN CHÍNH 155)

PRIORITY #1 CHECK ('act-merge'): OD 1 (26/11 ~07:25Z + ~07:32Z read verbatim) | ledger 0 | claims 2 | main 0 (no door / one-button-per-feature engine on origin/main 6b5d3d05; jact AD_DOOR = deck↔pop-up twin lock only, reused untouched) | review/* 1 (review/act-merge e50465e1 = plan, its scan scripts reused unchanged; review/dup-report 87b41ef2 doors P2/P3/P4 reused) | archive 0.

Branch **review/act-merge-J1** head fe457201 = J1 + J0 52334847 (kitRelW) + LIVE 3af7896e merged, rebuilt. START_CTX ~3 %.

## TÓM TẮT CHO SẾP (tiếng Việt)
- Chạm một người trên Dư đồ: các nút **trùng** gộp thành **một nút**, bấm vào mới hiện khung chọn việc (mỗi việc giữ nguyên giá, cơ hội, kết quả cũ). Nút nào là việc riêng thì **để riêng** đúng như lời sếp 07:32Z.
- Phi tần khác cung: Giao thiệp 23 → 12 nút (phần hại người / mưu kế là của thợ J2). Hoàng hậu 12 → 10, cùng cung 10 → 7, Hoàng thượng 6 → 4, Kính sự phòng 6 → 4, cung nữ 4 → 3, người hầu 10 → 9.
- Đã bấm thật trên Fold và iPad: chạm phi tần → «Trò chuyện» → hiện các chuyện ngay bên nàng → «Hỏi han sức khỏe» → trò chơi nhỏ như cũ → kết quả. Mở cửa không tốn khắc, làm việc thì tốn đúng 1 khắc như trước.

## 1. WHAT (English)
ONE engine, `dev/build/jdoor.js` (assembled right after jdf.js = the outermost talkOpts wrapper; no other game file edited):
- **Fold**: talkOpts folds the options of ONE feature into ONE door `{n, door:k, open}` placed where its first member stood; a door needs ≥ 2 members on that person today (a lone member stays a plain button). Fold is by option NAME (table `DOOR.T`, regex per door), so every act keeps its own code, price, lock, roll, result line, deeds/objects/evidence (law 3/4/6: nothing re-typed).
- **Raw keys**: `talkOpts(p)[-1-j]` === raw option j (array properties, invisible to map/forEach/length) → a picked member runs `talk(-1-j)`: the SAME talk() path as its old button (khắc + bạc paid once, ODDS CAP, result card, log sync, k61 knowing, jact door stamps, co-op intent «talk» with a number). Hành sự cards built by name from the pop-up (`directActs`, `adMaidCards`) read the raw list (DOOR.raw).
- **Door tap**: 0 khắc; opens the standard choice card (`pushDil` + saveable `PEND.door`; kit option rows via dilLine/kitOptFinal; ✕ = Thôi): one row per member with its own odds word · tốn · thành · hỏng and its own lock / «không đủ bạc» / khắc reason (kit `off.why`). A door whose members are all locked is locked with the first member's reason (stranger gate: only Chào hỏi is free, then it is gone — j61 unchanged).
- **Person view (jdf/jdfv focus, BAL.df.on)**: the door card plays in the scene (speaker = the person, «Tiếp» → topics fan L/R); jdayq (c) treats it as her own tap; a picked rolled member plays the SAME on-figure game its button played (dfEng / DF_RULE / dfGame / dfStep) and then runs; sure / delegated / own-flow members run as before.
- **Picture + tab**: the door shows its representative member's picture and kit category (kitActArt / kitActCat wrappers, same rule as jact's shared-door twins). No new kit part (KIT-FIRST: none needed; the chooser is the existing option dialog).
- **Two-way (law 1)**: NPC act keys and labels unchanged (AGC3BTN), so role-parity / ag-par3 still read the same names; `AGC3DOOR[key]` = the door an NPC act sits in (`DOOR.of(name)` maps hers and theirs the same way). Law 2: members keep today's prices; the door adds none.
- **For J2/J3/J4/J5**: `DOOR.add({k,n,kinds,re,rep,h,tier,…owner fields})` adds a talk door from any file (J2 P5–P14 rows + «J2 ext» stack on this head); `DOOR.fold(list,rows,o)` + `DOOR.card(t,h,rows,who)` = the same rule + card for any list; **J5b's DECK block adopted** (`DOOR.deck` rows, outermost deal()/act() fold for cung nữ Phận sự / lãnh cung / khuê các decks, `DOOR.flat` (one for talk + deck doors), `DOOR.run`); `doorRep` prefers the row of the person in front (J5b srv «Giao hảo» vs consort «Giao hảo»). J4 (a5d02a23) draws the same kit card shape with a private J4DOOR runner → asked via MAIN to switch to DOOR.card.

### Doors (G-rows of act-merge.md §2; ĐỂ RIÊNG per the TÓM TẮT table)
| Door (button) | Person kinds | Members folded inside (met by the test) | Kept separate (ĐỂ RIÊNG) |
|---|---|---|---|
| Trò chuyện | consort (other palace, own palace, Hoàng hậu, co-op friend) | Hỏi han sức khỏe · Khen tài nghệ nàng · Bàn tán về <người> (one row per person) · Chia sẻ bí mật · Cảnh báo nàng · Thử lòng · Nương theo · Rỉ tai chuyện trong cung · Tạ lỗi · Nhún nhường · Nhắc lại ân xưa | Hòa giải (two other people) · Thỉnh an · Xin Hoàng hậu che chở · Xin son phấn |
| Giao hảo | consort | Tặng quà · Giúp đỡ nàng · Nhờ giúp đỡ · Mượn son phấn · Ghé chơi (keeps «xem phòng ốc») | — (own palace: Mượn son phấn alone stays a button) |
| Cùng chơi / Thách đấu | consort, Hoàng hậu | Cùng chơi · Thách đấu (jpma unchanged) | — |
| Hầu chuyện | Hoàng thượng | Tâng bốc · Nói thật lòng · Bàn chuyện triều chính | Xin ân điển · Dâng hoa |
| Phô tài | Hoàng thượng | Phô tài: <môn> (door only when ≥ 2 arts are offered; today one = bare) | — |
| Xem sổ Kính sự phòng | Kính sự phòng | Xem sổ thị tẩm · Xem sổ nguyệt sự · Hầu chuyện, xem lén sổ nguyệt sự | Đút lót lật thẻ · Hỏi sở thích Hoàng thượng · Chào hỏi gate |
| Dò la tin tức | cung nữ thân cận, người hầu | Nghe ngóng chung · Sai đi dò la | Trò chuyện với cung nữ / Tâm sự · Hỏi chuyện · Giao việc phòng bị · Tiến cử · Xem người |
| — | Thái hậu (4), thái y (4), nam nhân (5), rương (3) | none (plan: ALL SEPARATE) | all |

Judgment call (stated, not hidden): the own-palace consort gets the SAME «Trò chuyện» door as every consort (Hỏi han + Bàn tán inside) — one engine everywhere (§2 «card AND pop-up share one set», law 11); §2 G2 text said «Bàn tán kept». If MAIN wants Bàn tán bare there, it is one regex line (kinds).
Not J1 (other owners): harm / scheme / accuse / Ra uy rows (Khiêu khích tiers, Hắt/Tát/Phạt quỳ, Dò la, Hặc ăn mặc …) = J2; servant «Thưởng phạt» (Thưởng vô cớ · Phạt vô cớ · Đổi người) is j24 servJudgeBtns (card buttons, not talkOpts) = J4.

## 2. BEFORE / AFTER (dev/tools/act-inventory.js, same harness, LIVE 6b5d3d05 vs this branch) — buttons in ONE pop-up (max) · distinct names
| Tap a person | Before (LIVE) | After J1 | of which harm/scheme rows left for J2 |
|---|---|---|---|
| consort, other palace | 23–32 · 35 | 12–19 · 23 | 13 (Khiêu khích, Hạ nhục, Khoe quà, Hắt ×3, Tát, Hặc, Dò la, Tung tin, Nghe lén, Hạ độc, Ngáng chân, Vu oan, Tố xa xỉ, đẩy hồ ×2, Phạt quỳ) |
| consort, own palace | 9–11 · 11 | 7–9 · 9 | Hắt ×3, Tát, Phạt quỳ |
| Hoàng hậu | 11–12 · 12 | 9–10 · 10 | Khiêu khích, Hắt ×3 |
| Hoàng thượng | 5–6 | 3–4 | — |
| Thái hậu | 4 | 4 | — |
| Kính sự phòng | 6 | 4 | — |
| thái y | 4 | 4 | — |
| người hầu | 10 | 9 | (Thưởng phạt = J4) |
| cung nữ thân cận | 4 | 3 | — |
| rương · ma ma · người bán · phế phi | 3 · 2 · 2 · 1 | same | — |
Whole-game distinct action names: ≈165 → 157 after J1 alone (the rest is J2–J5).
Direct talkOpts count (dev/test/act-merge-j1.test.js, every person × 4 scenarios × 4 buổi): rival raw 26 → 15, Hoàng hậu 9 → 7, Hoàng thượng 6 → 4, Kính sự phòng 6 → 4, maid 4 → 3, servant 10 → 9.


### 2b. BUTTON NAMES old → new, per screen (MAIN 155 add-on 08:15Z: names, never counts only)
| Screen (tap a person) | OLD buttons (each its own button) | NEW button | ĐỂ RIÊNG (still its own button) — why |
|---|---|---|---|
| Phi tần khác cung | Hỏi han sức khỏe, Khen tài nghệ nàng, Bàn tán về <A>, Bàn tán về <B> …, Chia sẻ bí mật, Thử lòng, Cảnh báo nàng, Rỉ tai chuyện trong cung, Nương theo | **Trò chuyện** | Hòa giải — nhắm vào hai người khác (giảm oán giữa nàng và người thứ ba), không phải chuyện giữa ta với nàng |
| | Tặng quà, Giúp đỡ nàng, Nhờ giúp đỡ, Mượn son phấn, Ghé chơi | **Giao hảo** | Chào hỏi — chỉ hiện khi chưa quen (cổng j61), quen rồi thì mất |
| | Cùng chơi, Thách đấu | **Cùng chơi / Thách đấu** | harm / scheme / accuse / Ra uy rows = J2 (Khiêu khích, Hạ nhục, Khoe quà, Hắt …, Tát, Phạt quỳ, Dò la, Tung tin, Nghe lén, Hạ độc, Ngáng chân, Vu oan, Tố xa xỉ, Hặc ăn mặc, đẩy hồ) |
| Phi tần cùng cung | Hỏi han sức khỏe, Bàn tán về <A> … | **Trò chuyện** | Mượn son phấn — một mình nó trong Giao hảo ở cùng cung → nút riêng; «Cùng cung» = dòng lý do |
| | Cùng chơi, Thách đấu | **Cùng chơi / Thách đấu** | |
| Hoàng hậu | Hỏi han sức khỏe, Chia sẻ bí mật, Tạ lỗi, Nhún nhường | **Trò chuyện** | Thỉnh an — lễ buổi sáng · Xin Hoàng hậu che chở — 2 tháng khó bị hại, chỉ Hoàng hậu cho · Xin son phấn — việc xin đồ |
| | Cùng chơi, Thách đấu | **Cùng chơi / Thách đấu** | |
| Hoàng thượng | Tâng bốc, Nói thật lòng, Bàn chuyện triều chính | **Hầu chuyện** | Xin ân điển — xin bạc, rủi ro mất sủng · Dâng một cành hoa — hầu hạ, tốn bạc |
| | Phô tài: <môn 1>, Phô tài: <môn 2> … | **Phô tài** (khi có ≥ 2 môn) | |
| Thái hậu | — | — | Thỉnh an, chép kinh · Xin Thái hậu đỡ lời · Kể tội một phi tần · Xin son phấn — bốn việc khác hẳn (lễ / nhờ nói giúp / tố cáo / xin đồ) |
| Kính sự phòng | Xem sổ thị tẩm, Xem sổ nguyệt sự, Hầu chuyện, xem lén sổ nguyệt sự | **Xem sổ Kính sự phòng** | Đút lót lật thẻ — tranh sủng · Hỏi sở thích Hoàng thượng — biết điều ngài thích · Chào hỏi khi chưa quen |
| Thái y | — | — | Xin bắt mạch (khám) · Bài thuốc dễ thụ thai (có con) · Mời làm thái y tâm phúc (đồng minh lâu dài) · Chào hỏi khi chưa quen |
| Cung nữ thân cận | Nghe ngóng chung, Sai đi dò la | **Dò la tin tức** | Trò chuyện với cung nữ — thiện cảm · Giao việc phòng bị — canh phòng |
| Người hầu | Nghe ngóng chung, Sai đi dò la | **Dò la tin tức** | Tâm sự (thiện cảm) ≠ Hỏi chuyện (chứng cứ) · Xem người · Giao việc phòng bị · Tiến cử · (Thưởng/Phạt/Đổi người = J4 «Thưởng phạt») |
| Nam nhân | — | — | Chào hỏi đúng lễ · Liếc mắt đưa tình · Trao khăn tay · Hẹn gặp riêng · Cắt đứt — các bước nối nhau, bước sau mở khi bước trước xong |
| Rương | — | — | Cài đồ vào rương nàng (vu oan, J2) · Lục rương tìm chứng cứ · Lấy trộm son phấn — ba mục đích khác nhau |
| Ma ma · người bán · phế phi | — | — | đã một việc một nút |
OB-OAN entry points kept: «Tạ lỗi», «Nhún nhường», «Thỉnh an» stay talkOpts option NAMES (inside «Trò chuyện» for the first two); find them with doorRaw(p) (raw list) and run with talk(-1-j) or doorPick.

## 3. TESTS
- `node dev/test/act-merge-j1.test.js` → **FAIL 0**, 153 door cards opened, 144 members run (khắc spent = the member's own talkK, once; person marked talked; raw keys = raw options; no member bare beside its door; every ĐỂ RIÊNG act still a button; locks right), page errors 0.
- `node dev/test/act-merge-j1-tap.js <dir>` real taps Fold 755x1000 + iPad 1180x820 → **PASS** both: tap consort (real click) → fan shows «Trò chuyện / Giao hảo / Cùng chơi / Thách đấu …» → tap «Trò chuyện» (0 khắc) → «Tiếp» → topics in the scene (locked «Cảnh báo nàng ta» grey with its «!» reason) → «Hỏi han sức khỏe» → its game rules («Sẵn sàng») → «Bỏ qua» → result card «… cảm động vì được hỏi han …», 1 khắc spent, 0 page errors.
- Videos (CDN): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J1/act-merge-j1-fold.webm · https://ctm-img.victoria-tntt.workers.dev/img/_review/act-merge-J1/act-merge-j1-ipad.webm (verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review act-merge-J1`).
- Regressions reported by J5b / MAIN on b3e935e9, status: (1) act-merge-j1 «Hỏi han sức khỏe 0 khắc / not talked» — FIXED d8bc3de2 (door person held by identity, member re-found by name, a notice queued with the card waits behind her pick, person-view game only for the same on-screen person); test FAIL 0 on fe457201 (152 cards, 143 runs). (2) role-parity-drift2-play «Hoàng hậu sees Lập phe cùng (facHTML)» — NOT J1: the same FAIL on LIVE 3af7896e's own index.html (facHTML says «Cần một phi tần thân với ngươi» for the seeded consort; facHTML does not read talkOpts). (3) ag-par3 «Nhờ giúp đỡ» — row is **ok** on J1 («her card and cx2:help run helpAsk {me:1,npc:1}»); ag-par3 FAILs on J1 = 5, on LIVE 3af7896e = 6 (same rows + phe phái), none about a door.
- greet-stranger.js PASS (Chào hỏi gate; the known consort's list now reads «Trò chuyện | Giao hảo | Khiêu khích | … | Cùng chơi / Thách đấu»).
- coregates (G1–G5): see §5.

## 4. FILES
dev/build/jdoor.js (new) · dev/build/assemble.py (+ 'jdoor.js' after 'jdf.js') · dev/test/act-merge-j1.test.js · dev/test/act-merge-j1-tap.js · dev/tools/act-inventory.js + act-inventory-tap.js (copied unchanged from review/act-merge) · built index.html / sw.js / assets.json.
None of j2 / j9 / jtwoway / jagacts3 / jgreet / j22 / jpma / jshelf / j68e / jthaiy / jcycle needed an edit: the fold is by name, so their acts run unchanged. J2 may merge this head freely (no shared file except assemble.py, one line).

## 5. STATUS
**LAND READY fe457201** (review/act-merge-J1; J0 52334847 merged; LIVE 3af7896e merged; rebuilt).
- Core gates `bash dev/tools/coregates.sh <wt> 3af7896e <out>`: G1 one-core-guard, G2 rules-one-source, G3 kit-conform, G5 pass; G4 FAILS on two hooks that FAIL IDENTICALLY on LIVE 3af7896e's own index.html (same harness, same machine): 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» on a synthetic test card (Fold + iPad), and 90-button-crawl «Ô lưu [title menu] · Lui · close button did not close its layer». Neither touches a person pop-up; not caused by J1.
- Lock rule (for the BIG review): talk doors count members PRESENT (≥ 2) whatever their lock; a locked member stays visible INSIDE the door card, grey, with its own reason (kit off.why) as on LIVE; a door whose members are all locked is itself locked with the first member's reason. DOOR.fold (lists) needs ≥ 2 AVAILABLE; with 1 available, every member stays a bare button INCLUDING its locked twins (grey + reason) unless the caller passes dropLocked. J5b's deck block counts every way (locked included).
- Tier wording: a door row with tier(a) puts it in the option TITLE «<việc> · nặng» (KIT §7.1 / J0); J2's rows do the same.
- OB-OAN uses doorRaw({kind,ref}) (no visit needed) for Tạ lỗi / Nhún nhường / Thỉnh an / Xin che chở / Xin đỡ lời — kept.

## 6. HANDOVER (if a successor takes over)
Owner of dev/build/jdoor.js = J1. Stack order J1 → J2 (d431c6b1 «J2 ext» in jdoor.js, marked) ; J5b jdoor5.js loads after jdoor.js. Re-run: `node dev/test/act-merge-j1.test.js`, `node dev/test/act-merge-j1-tap.js <dir>`, `node dev/tools/act-inventory.js <out.json>`.

