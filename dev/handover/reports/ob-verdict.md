# OB-VERDICT — report (worker, opus; MAIN CHÍNH 155 session_01V1ZZH2xEpGEfFdnaf8bfYc)

PRIORITY #1 CHECK: OD last row 26/11 ~08:30Z (owner bug + RULE) | main j8.js:357 «Thì thầm nói xấu» → jagemp.js:68 pillowDo (works; card printed only HER rows) + j63 resultShow/kaResultRows (§7 result card) + jne kitNightEnd (the real night card) | review/news-sieve c7a3302d does not touch j63/jne (no result-card fork); review/one-sieve: not on origin; review/act-merge = report only | claims none.

Branch `review/ob-verdict` on LIVE origin/main 6b5d3d05. Files: `dev/build/j63.js` (kit part KIT 7.3), `dev/build/jverdict.js` (new, last in assemble list: hooks only), `dev/build/jne.js` (night card reads the same kit part), `dev/build/assemble.py`, `dev/kit/KIT.md` §7.3, `dev/kit/KIT_REQUESTS.md` (KK39 review entry), `dev/test/ob-verdict.test.js`, rebuilt `index.html` / `sw.js` / `assets.json`. No act logic, no BAL number touched (law 4); J1/J2 act files untouched (only wrappers from outside).

## What she sees — before → after (names = what is on screen)
- Night «Thì thầm nói xấu <X>», THÀNH. BEFORE: night card «Hoàng thượng · Được Sủng +4 Bạc +20 Ân tình +7 · Mất một vị Thường tại: thiện cảm −5 · Kèm …» — no verdict, X's Sủng drop invisible.
  AFTER: «Kết cục: Gối đầu, ta thì thầm nói xấu Thường tại Tô Nhu Tắc: ngài nghe lọt tai. [✓ THÀNH]» · «Người ấy: Thường tại Tô Nhu Tắc: Sủng −10 (34 → 24), thiện cảm −5, ghen +14, oán +2» · Được … · Kèm …
- Same, HỎNG. AFTER: «Kết cục: … ngài không tin, lại quay ra nghi ta. [✗ BẠI]» · «Người ấy: …: không hề hấn gì, ghen +8» · «Mất: Sủng −2 · Danh −3».
- Same, slipped at the odds cap. AFTER: «Kết cục: Ta định nói xấu …, rồi lại thôi không nói. [BỎ DỞ]» · «Người ấy: …: không hề hấn gì …».
- Every deed / talk option on a consort (person card): a «Người ấy» row with the target's real change («Vu oan → Người ấy: Sủng −10 (65 → 55), Danh −12 (40 → 28), bị cấm túc, oán +8»), seal THÀNH / BẠI from the act's own roll (Khiêu khích, Kết giao, Tự đi dò la, Giá họa … were all «KẾT QUẢ» before), «chưa rõ — người được sai về sẽ báo» for a deed handed to a sent servant, «chưa rõ — tai mắt sẽ báo» for a done deed with nothing she can see yet.
- Two-way: an NPC's pillow slander / deed on HER that her Sổ ghi names → «Ai làm: Tần Vu Uyển Đình: nói xấu ngươi bên gối · thành» above her Mất row.

## Scan table (law 11) — `node dev/test/ob-verdict.test.js` scan, BEFORE = main 6b5d3d05 index.html, AFTER = this branch (seeded; rows = labels)
| act (via) | BEFORE main 6b5d3d05: seal · rows | AFTER review/ob-verdict: seal · rows | «Người ấy» (after) |
|---|---|---|---|
| Hỏi han sức khỏe (talk) | — | KẾT QUẢ · Được | — |
| Khen tài nghệ nàng (talk) | KẾT QUẢ · Mất | KẾT QUẢ · Người ấy / Ghi chú / Vì sao | Phi Vu Uyển Đình: thiện cảm +2 |
| Bàn tán về Khương Thanh Hoan (talk) | KẾT QUẢ · Được / Vì sao | KẾT QUẢ · Người ấy / Ghi chú / Vì sao | Phi Vu Uyển Đình: thiện cảm −3 |
| Chia sẻ bí mật (talk) | KẾT QUẢ · Được / Vì sao | KẾT QUẢ · Người ấy / Ghi chú / Vì sao | Phi Vu Uyển Đình: thiện cảm +4 |
| Nhờ giúp đỡ (talk) | skip: locked | KẾT QUẢ · Ghi chú / Vì sao | — |
| Giúp đỡ nàng (talk) | KẾT QUẢ · Được / Mất / Vì sao | KẾT QUẢ · Người ấy / Mất / Vì sao | Phi Vu Uyển Đình: thiện cảm +12 |
| Thử lòng (talk) | KẾT QUẢ · Được | KẾT QUẢ · Được | — |
| Nương theo (talk) | KẾT QUẢ · Được / Vì sao | KẾT QUẢ · Người ấy / Ghi chú / Vì sao | Phi Vu Uyển Đình: thiện cảm +7 |
| Rỉ tai chuyện trong cung (talk) | KẾT QUẢ · Ghi chú | KẾT QUẢ · Ghi chú | — |
| Ghé chơi (talk) | KẾT QUẢ · Được | KẾT QUẢ · Người ấy / Ghi chú | Phi Vu Uyển Đình: Sức −4 (80 → 76), thiện cảm +4 |
| Khiêu khích (talk) | KẾT QUẢ · Được / Mất / Vì sao | THÀNH · Người ấy / Được | Phi Vu Uyển Đình: thiện cảm −15, ghen +10, oán +6 |
| Dò la (doAct) | KẾT QUẢ · Ghi chú | KẾT QUẢ · Người ấy / Ghi chú | Phi Vu Uyển Đình: chưa rõ — người được sai về sẽ báo |
| Kết giao (doAct) | KẾT QUẢ · Mất / Vì sao | THÀNH · Người ấy / Được / Mất | Phi Vu Uyển Đình: Danh −3 (43 → 40), Sức −4 (76 → 72), thiện cảm +30, ghen −10, oán −6 |
| Tung tin đồn (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Mất | — |
| Vu oan (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Người ấy / Mất | Phi Vu Uyển Đình: thiện cảm −30, oán +13 |
| Mua chuộc cung nữ (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Người ấy / Ghi chú | Phi Vu Uyển Đình: thiện cảm −5, oán +1 |
| Rút thẻ bài (doAct) | KẾT QUẢ · Ghi chú | KẾT QUẢ · Ghi chú | — |
| Phá việc học (doAct) | KẾT QUẢ · Được / Mất | KẾT QUẢ · Mất | — |
| Hặc ăn mặc sai phẩm (doAct) | KẾT QUẢ · Mất / Vì sao | KẾT QUẢ · Người ấy / Ghi chú | Phi Vu Uyển Đình: Danh +2 (40 → 42), thiện cảm −12, oán +5 |
| Tặng quà (doAct) | KẾT QUẢ · Được | KẾT QUẢ · Người ấy / Ghi chú | Phi Vu Uyển Đình: thiện cảm +7, oán −2 |
| Ngáng chân (doAct) | no card | no card | — |
| Ly gián (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Người ấy / Mất | Phi Vu Uyển Đình: Sủng −10 (65 → 55) |
| Hạ độc dần (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Mất | — |
| Hủy dung (doAct) | KẾT QUẢ · Ghi chú | KẾT QUẢ · Ghi chú | — |
| Giá họa trộm đồ (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Người ấy / Mất | Phi Vu Uyển Đình: thiện cảm −20, oán +8 |
| Tát (doAct) | skip: no target | no card | — |
| Bỏ phấn lạ (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Người ấy / Mất | Phi Vu Uyển Đình: chưa rõ — người được sai về sẽ báo |
| Sai người lấy trộm đồ (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Mất | — |
| Sai cung nữ thân tín lấy đồ (doAct) | KẾT QUẢ · Mất | KẾT QUẢ · Mất | — |
| Tự đi dò la (doAct) | KẾT QUẢ · Được | BẠI · Người ấy / Ghi chú | Phi Vu Uyển Đình: không hề hấn gì, thiện cảm −8, oán +3 |
| Thả thú dữ làm hại dung nhan (doAct) | KẾT QUẢ · Ghi chú / Vì sao | BẠI · Người ấy / Mất | Phi Vu Uyển Đình: không hề hấn gì |
| Ép nộp của (doAct) | skip: no target | no card | — |
| Tố xa xỉ (doAct) | KẾT QUẢ · Mất / Vì sao | KẾT QUẢ · Người ấy / Ghi chú | Phi Vu Uyển Đình: Danh +2 (42 → 44), thiện cảm −12, oán +5 |
| Hắt nước (doAct) | no card | no card | — |
| Hắt trà (doAct) | KẾT QUẢ · Ghi chú / Vì sao | KẾT QUẢ · Ghi chú | — |
| Quạt mực (doAct) | KẾT QUẢ · Ghi chú / Vì sao | KẾT QUẢ · Ghi chú | — |
| Thì thầm nói xấu — ok (night card, real taps) | no verdict · Hoàng thượng / Được / Mất / Kèm | THÀNH · Kết cục / Người ấy / Được / Mất / Kèm | Thường tại Tô Nhu Tắc: Sủng −10 (34 → 24), thiện cảm −5, ghen +14, oán +2 |
| Thì thầm nói xấu — fail (night card, real taps) | no verdict · Hoàng thượng / Được / Mất / Kèm | BẠI · Kết cục / Người ấy / Được / Mất / Kèm | Thường tại Tô Nhu Tắc: không hề hấn gì, ghen +8 |
| Thì thầm nói xấu — soft (night card, real taps) | no verdict · Hoàng thượng / Được / Mất / Kèm | BỎ DỞ · Kết cục / Người ấy / Được / Mất / Kèm | Thường tại Tô Nhu Tắc: không hề hấn gì, ghen +8 |
| NPC pillow slander on her (two-way) | KẾT QUẢ · Mất / Vì sao | KẾT QUẢ · Ai làm / Mất | Ai làm: Phi Vu Uyển Đình: nói xấu ngươi bên gối · thành |

scan acts with a card: 36; with a «Người ấy» row after: 19 (the rest: no number moved on a no-roll act, or a «Bày mưu» dialog whose deed lands later — see Open)

## r1 (MAIN 155 LOOK)
- (a) her chosen target always shows its real name + title («Thường tại Tô Nhu Tắc», never «Thường tại ???») in «Kết cục» and «Người ấy» — one place in the kit builder (j63 K.tgt) + the pillow sentence (jverdict), name wrapped in `data-k61skip`; the «???» mask stays for doers she cannot know («Ai làm» still needs her Sổ ghi to name them). Test check added (both devices × 3 outcomes). Seal word stays BẠI (MAIN).

## Tests (this branch)
- `node dev/test/ob-verdict.test.js index.html <dir>` → ALL 39 OK: real taps Fold 755x1000 + iPad 1180x820, night pillow thành / hỏng / bỏ dở (seal, sentence, «Người ấy» with Sủng a → b, her Sủng loss in Mất), scan, two-way «Ai làm», old save loads + plays a buổi, 0 page errors.
- Bot life 24 tuần (5 buổi each, first option): 0 page errors; hooks fired (pillowOnHer, runActOnHer).
- Shots + video on the CDN (https://ctm-img.victoria-tntt.workers.dev/img/_review/ob-verdict/): `after-{fold,ipad}-night-{ok,fail,soft}.png`, `before-…` (same taps on main), `fold-night-taps.webm`, `ipad-night-taps.webm`.

## Open / handed on
- «Bày mưu» deeds (Hạ độc, Rút thẻ bài, Hủy dung, Tung tin đồn … via the scheme dialog + minigame, J2's harm-act area): the card right after the dialog choice is the choice card; the deed's own verdict + «Người ấy» show on the card of the span where the deed LANDS (runAct hook). J2 (ACT-MERGE harm acts) may want one hook: call `kaAim(t,{ok})` where the minigame result decides the deed.
- Talk options without a roll («Hỏi han sức khỏe», «Rỉ tai chuyện trong cung») keep KẾT QUẢ (law: a seal only from a roll); their target change shows in «Người ấy» when a number moved.
- Word: the brief says «Hỏng»; the kit seal stays «BẠI» (kit rule since 11/15) — one place to flip (`kitResultSeal`), asked in KIT_REQUESTS for MAIN/KK39.
- Kèm row layout inside the night card wraps unevenly (pre-existing kitKemRow in kitRows; ONE-SIEVE / KK39).
- KK39 to confirm the two new row labels «Người ấy» / «Ai làm» and the «BỎ DỞ» seal value (KIT_REQUESTS 26/11 OB-VERDICT).

