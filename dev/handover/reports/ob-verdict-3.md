# OB-VERDICT-3 report (session_01Rc5AsNBc8V7zc55B3WkFTN, successor of OB-VERDICT-2)
depth 1 · START_CTX ~3 %

PRIORITY #1 CHECK ('ob-verdict|giá đáo|kết quả ngay|rtoast park'): OD 8 (rows 26/11 ~08:30Z, ~17:55Z, ~18:15Z, ~18:25Z) | main: jverdict not on LIVE f573dc94 (in lc23-os stack) | review/*: review/ob-verdict 2cb588a8 → ob-verdict-rv 5dc1db31 → kem-row a5ff660a → lc23-os d811a46d (my base) | claims: OB-VERDICT-2 (old account, stopped). Reused: KIT 7.3 kaAim / the kit result card (resultShow #rtoast .karesult), KIT 32.10a park rule, kitFocus §92 API (F.choices), kit button `kbtn`.

## Branch
`review/ob-verdict-3` = **c4cabcde** on `review/lc23-os` d811a46d (so it lands WITH / AFTER the ov→km→kw→os stack). Built (index.html + sw.js rebuilt).

## Root cause (owner OD 26/11 ~18:15Z «Nhịn … không thấy kết quả … mấy cái nút giao tiếp của bên hoàng hậu … cũng không thấy hiện gì»)
The scene she means is the jdfv ENCOUNTER (kitFocus §92: figure in the middle, say box «Hoàng hậu … giá đáo», choices L/R, then the person's talk acts).
1. KIT 32.10a parks (hides) the result card while any `[role=dialog]` is open — and the focus layer `.kfoc` is `role=dialog`. So EVERY result of a visitor
   reply and of every in-visit talk act was drawn hidden and never seen for the whole visit (she only saw the Đức box flash).
2. The result card sat at z 45, under `.kfoc` (46).
3. A choice whose next card was already queued: the next card (`#modal`) opened at once and the result card was parked under it (shown only after).
4. In the encounter, `dfSetGroups` opened the talk acts right after `chooseM`, no result in between.
(Also: jaudit hands a card raised inside chooseM to the INNER resultShow, so outer wrappers never see it — handled via `kaLastResult`.)

## Fix — KIT 7.4 RESULT FIRST (dev/build/jverdict.js, display only, law 4)
- Every choice runner (chooseM, act, doAct, talk, servAct, empAct, courtAct, recommend — the j19 wrapR set; focus acts run through them): its result
  card is on top (`.rtoast.karesult` z 47 > #modal 42, .kfoc 46).
- Next card queued / the encounter's talk acts next → the result card is HELD (`.kres-hold`, kit `kbtn kres-next` «Tiếp ▸», no auto-hide; a family timer
  that takes it away puts it back), the answered card goes, the encounter fan folds (`F.choices([])`); her tap (card / «Tiếp ▸» / kit #kxcatch /
  «Xem đầy đủ trong Sổ ghi») → the next card / the talk acts.
- KIT 32.10a exception: `.kfoc` never parks the result card; a held card is the front screen.
- A choice that opens its own next step with no result yet (picker, Bày mưu, mini-game) is not held. Bots (`__bot`) get no card → never held.
- j87: the card title borrowed the arrival stage line as context («Nhịn (Ngoài điện có tiếng xướng: “Hoàng hậu … giá đáo)») → arrival line skipped;
  «khiêu khích» taunts named («Nhịn lời khiêu khích của Hoàng hậu …»).
- KIT.md §7.4 + §32.10a exception (canon in place); kit page sample §7.4. «không» rows kept (OD 17:55Z) — no row hidden anywhere; kitRowNil 0.
- Option builders untouched (no odds word / «Cẩn thận khi lựa chọn» change — OD 18:25Z stays with KK44 / FIRSTCARD).

## Tests (real playwright taps, Fold 755x1000 + iPad 1180x820)
`node dev/test/ob-verdict-3.test.js index.html <shots>`: **29/29 ALL OK** on the branch; on base lc23-os: **13/27 FAIL**.
- Hoàng hậu encounter, each reply («Nhịn», «Đáp trả sắc sảo»): result on top + «Người ấy: Hoàng hậu Điền Chỉ Lan: ghen +3 (5)» + «Tiếp ▸»; talk acts NOT up
  before the tap; still there 10 s later; after the tap the talk acts open. In-visit talk act result above the focus. Base: result hidden, acts up at once.
- FAMILY SCAN (law 11) — before → after, per device (alone / followed by a queued card):

| maker | before (Fold, iPad) | after |
|---|---|---|
| ap.apTaunt / apSorry / apFriend ally / apFriend borrow / svAsk | alone OK · +next FAIL (next card over the result) | all PASS |
| ap.thCall (Thái hậu triệu) | alone FAIL + next FAIL (the walk opens the next screen) | PASS |
| gm.reply provoke / greet (AG-meet visitor) | alone OK · +next FAIL | PASS |
| e68 visit / day / emp / serv | alone OK · +next FAIL | PASS |
| encounter (focus) reply ×2 | FAIL ×2 devices | PASS |
| in-visit talk act | FAIL (parked) | PASS |
| **total** | **22/47** | **48/48** |
- bots: nothing held, next card at once ✔ · a buổi plays ✔ · no page errors ✔
- regression `dev/test/ob-verdict.test.js` (night thành/hỏng/bỏ dở, deed + talk scan, two-way, old save): **ALL 84 OK** on the branch (the night card, «Kèm» one per line, scan, two-way, old save)

## LOOK (I looked at every still, both devices) — CDN `img/_review/ob-verdict-3/`
https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-verdict-3/after-fold-enc0-3-result.png · …/after-ipad-enc0-3-result.png (held result, «Tiếp ▸»),
after-*-enc0-2-choices / -4-acts (talk acts after the tap) / -5-talk, after-*-enc1-3-result (Đáp trả); before-*-enc0-3-result (base: nothing shown).
LOOK READY to MAIN.

## Notes for RV / MAIN
- N1 the result card keeps an empty band under its last row on Fold + iPad (pre-existing on base: jk2b `.kevres` grid with the 124 px picture) — kit keeper.
- N2 the sentence of a sure reply is the raw Sổ ghi line («Có người đến: Nhịn lời … — Đức +2 vì nhịn.») — ob-verdict N4 family (verdSen covers aimed deeds only).
- N3 «Rất vững» shows on the no-roll replies «Nhịn» / «Đáp trả sắc sảo» / «Khiêu khích» — OD 18:25Z item for KK44 / FIRSTCARD (not touched here).
- N4 in the test the «Trò chuyện → Hỏi han» talk showed its result while the on-figure game rules card for it was up — check on LIVE (jdf flow), not this change.
- Held = one extra tap per choice that has a next screen (her rule: next screen only after she has seen / tapped the result).

## r2 (MAIN 162 LOOK PASS c4cabcde + note (b)) — review/ob-verdict-3 = ae7533bc
- The sentence under the result title never repeats the title (`kaSenDeTitle`, j63, whole family: every result card, incl. the 7.3 verdict sentence;
  rank words in the sentence tolerated; a sentence that is only the title is dropped but the card still shows its Ghi chú row — «không» rows kept).
  «Người bên cạnh: Nhịn lời khiêu khích của Hoàng hậu … — Đức +2 vì nhịn.» → «Đức +2 vì nhịn.». KIT §7.4 line.
- Tests: ob-verdict-3 **34/34 ALL OK** (new: on-screen sentence ≠ title, encounter ×2 devices + family scan **0/46 repeated**, family 46/46 result-first;
  e68 rows vary with the seed), ob-verdict **ALL 84 OK**. Stills re-uploaded (after-*-enc0-3-result.png). Note (a) empty band → KK44 (MAIN 162).
