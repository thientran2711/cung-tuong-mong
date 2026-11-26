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


## REVIEW (RV-OB-VERDICT session_01V1ZZH4KVXLc23oaAiikKLg) r1 — FAIL (on 4a1fe665; pasted by OB-VERDICT, relayed by MAIN 156)
Passes: 39/39 on branch + LIVE merge, laws 4/6/1/VANPHONG OK, perf OK. FIX ALL (whole family):
1. Deeds run from a dialog lose their verdict (the owner's exact symptom): Bày mưu «Ra tay ngay» + confirm «Làm như thường» (Vu oan, Giá họa trộm đồ, Ly gián, Hạ độc dần, Bỏ phấn lạ…). Cause: jverdict doAct wrapper `if(!Q.length)x.used=1` marks the inner aim (holding aRoll/caught) used before chooseM's card reads it → card «KẾT QUẢ», no sentence. Repro LIVE merge seeded: Giá họa «bị bắt, khai ra ngươi» → KẾT QUẢ; Vu oan «bị lộ», cấm túc, Danh 14→0 → KẾT QUẢ. Servant-sent Giá họa loses «chưa rõ — người được sai về sẽ báo».
2. Acts decided without aRoll show no seal: Tố xa xỉ / Hặc ăn mặc sai phẩm (wdAccuse), Giá họa resolution (wdFrame) → feed f.ok from each ACT[k].f's real decision point + test assert.
3. Law 11, runners bypassing hooks: j55 tdProbe/tdLeak (NPC→her j55:154/156 no «Ai làm»); j7 event options aimed at a consort (Đổ thêm dầu vào lửa, Thêm một lời buộc tội); j67 e67pun; jemoact Emperor/Thái hậu deeds on her (eaHitMe noi/nghi…); servant mode j42 «Tố cáo <chủ> trước Hoàng hậu» («Người ấy» shows the listener, not the accused).
4. Law 9: kit page — jkitpage kitPgSeals lacks «BỎ DỞ»; result-card sample (jkitpage.js:70) lacks «Người ấy»/«Ai làm».
5. kaAimsOf drops aims after 120 s wall-clock (Date.now) → use seq/frame only.
6. Test passes while its scan prints faults 1–2 → add seal asserts for rolled/decided deeds.
Then r2 + new stills (incl. a Vu oan via Bày mưu) → «LOOK READY <sha>» to MAIN 156; the same reviewer re-checks.

## r2 — DONE (OB-VERDICT-2, successor of OB-VERDICT; START_CTX ≈ 3 % of the window, ends well under the ceiling)
PRIORITY #1 CHECK ('ob-verdict'): OD 26/11 ~08:30Z (owner bug «nói xấu» verdict) | ledger 0 | claims OB-VERDICT | main 0 (LIVE 3af7896e) | review/* review/ob-verdict 5a282542 | archive 0.
Files: `dev/build/jverdict.js` (hooks only), `dev/build/j63.js` (kaAimsOf: open aims; «Ai làm» pub doer), `dev/kit/KIT.md` §7.3, `dev/test/ob-verdict.test.js`, rebuilt index.html / sw.js. No act logic, no BAL number (law 4); J2 act files untouched (ACT-MERGE J2 = hooks only).
- RV #1 (the owner's symptom): an OUTER act's aim is OPEN (`x.open`) and lives until the card that shows it; a deed re-entered from its own dialog («Bày mưu» → «Ra tay ngay», road card «Làm như thường», picker) runs on the SAME frame/aim (pending until its dialog is answered; its span moves to that card); «Thôi» on its dialog closes it; a finished act with no card is closed when the board is idle. Servant-sent deed: `ptHarmSend` hook marks the frame `sent` → «chưa rõ — người được sai về sẽ báo» (also no longer shown for a deed that simply did not run).
- RV #2 (decisions without aRoll, whole family): accuse family at the ACT level (vp / xx incl. jshelf's by-value runners: «…: thành» / «bỏ qua» / «tố bừa»), `wdFrameResolve` (Giá họa: found guilty = THÀNH), `frameExpose` (Vu oan: the framed one clears herself = BẠI even after the plant roll), `rcvPick` (Kết giao … receiver's yes/no), `rcvMaidBribe` / `stf2Bribe` (bribe taken / refused), j29 servant refusal «việc không thành» = BỎ DỞ.
- RV #3 (law 11 runners): j55 `tdProbe` / `tdLeak` (NPC→her «Ai làm», verdict = the deed's own outcome), j7 / j67 / any card about a consort (`chooseM` with `who` = a consort: «Người ấy» + the option's roll), j67 `e67pun`, jemoact `eaHitMe` («Ai làm: Hoàng thượng / Thái hậu: nổi giận với ngươi …», pub doer), j42 servant mode: an option naming her mistress is aimed at the mistress («Tố cáo <chủ> trước Hoàng hậu» → «Người ấy: Thường tại <chủ>: bị phế, ra khỏi cung», seal from the option's own «thành. / hỏng.» roll).
- RV #6 test: Vu oan via Bày mưu by REAL taps on Fold 755x1000 + iPad 1180x820 (thành → «Người ấy: Sủng −10 (67 → 57), Danh −16 (45 → 29), bị giáng xuống Phi»; bị lộ → BẠI «không hề hấn gì»), Giá họa via the road card, servant-sent Giá họa, «Đổ thêm dầu vào lửa» (Sủng a → b), tdLeak «Ai làm … · thành», Emperor «Ai làm», servant «Tố cáo <chủ>», and ONE assert: every scanned deed whose own outcome line rolled / decided has THÀNH / BẠI / BỎ DỞ, never KẾT QUẢ.

### Scan (law 11) r2 — BEFORE = r1 4a1fe665 (reviewer repro + r1 table) → AFTER = this branch (seeded scan, her own dialogs answered «Ra tay ngay» / «Làm như thường»)
| act (via) | BEFORE r1 | AFTER r2 |
|---|---|---|
| Vu oan (Bày mưu «Ra tay ngay») | KẾT QUẢ (reviewer: «bị lộ», cấm túc, Danh 14→0) | BẠI · Người ấy «không hề hấn gì, thiện cảm −30, oán +13» / THÀNH · «Sủng −10 (67 → 57), Danh −16, bị giáng» (taps) |
| Giá họa trộm đồ (road «Làm như thường») | KẾT QUẢ («bị bắt, khai ra ngươi») | BẠI · «không hề hấn gì, thiện cảm −20, oán +8» |
| Giá họa, servant-sent | «chưa rõ — người được sai về sẽ báo» lost | kept (test) |
| Ly gián / Hạ độc dần / Bỏ phấn lạ / Hủy dung / Tung tin đồn / Rút thẻ bài / Phá việc học (dialogs) | KẾT QUẢ | THÀNH / BẠI + «Người ấy» |
| Hặc ăn mặc sai phẩm / Tố xa xỉ (false cause) | KẾT QUẢ | BẠI |
| Kết giao (receiver answers) | KẾT QUẢ | THÀNH / BẠI |
| Mua chuộc cung nữ / Sai cung nữ thân tín lấy lòng / lấy đồ | KẾT QUẢ | BẠI / THÀNH (bribe taken / refused) |
| Ép nộp của, Ngáng chân, Sai người lấy trộm đồ | THÀNH/BẠI | same |
| Tặng quà, Hắt trà, Quạt mực (no roll) | KẾT QUẢ | KẾT QUẢ (law: seal only from a roll / decision) |
| tdLeak by an NPC on her | Mất only | «Ai làm: Quý phi …: dâng chứng cứ cha ngươi tham ô · thành» |
| Emperor's anger on her (eaHitMe) | Mất only | «Ai làm: Hoàng thượng: nổi giận với ngươi» |
| «Đổ thêm dầu vào lửa» (j7 Sao chổi) | no «Người ấy» | «Người ấy: …: Sủng −15 (a → b)» |
| servant «Tố cáo <chủ> trước Hoàng hậu» | «Người ấy» = Hoàng hậu (listener) | «Người ấy» = the mistress; THÀNH |

### Tests r2
- `node dev/test/ob-verdict.test.js index.html <shots>` → **ALL 67 OK** on this branch AND on a trial merge with LIVE origin/main 3af7896e (built files taken from main, rebuilt): night thành / hỏng / bỏ dở ×2 devices, Vu oan via Bày mưu thành / bị lộ ×2 devices by real taps, scan, r2 checks, two-way, old save loads + plays a buổi, 0 page errors.
- Bot (`dev/test/bot-same.js`, 4 steps × 2 builds): 0 page errors.
- Stills on the CDN (img/_review/ob-verdict/): `after-{fold,ipad}-vuoan-{ok,lo}.png` (new: Vu oan via Bày mưu thành + bị lộ), `after-{fold,ipad}-night-{ok,fail,soft}.png` (refreshed); r1 `before-…` + videos stay.
Standing orders kept: her target always named (data-k61skip); seal word BẠI; «Kèm» rows = NEWS-SIEVE-2 (untouched); J2 owns Bày mưu act logic (hooks only).
Open: the card of the intermediate «Bày mưu: Ra tay ngay» choice (before the road card) stays a plain KẾT QUẢ choice card (pre-existing, no deed yet); slap-game deeds (Tát, Hắt nước) show their card after the mini-game (headless scan: no card).

## r3 (MAIN 157 LOOK on 6503999a)
- (3) the THÀNH / BẠI stamp (kit part kitResultFx, j93 `.kmseal`) hung ABOVE the card (bottom:100%) and landed on the option card behind it (iPad «Nghỉ ngơi một lát»). Now it sits INSIDE the result card's top-right corner (top 8px, 58px); the title row and the sentence reserve that corner (padding-right 66px, min-height so no row runs under it) — never on words. One kit place → every result card. Test assert: the stamp's box lies inside #rtoast (Fold + iPad, thành + bị lộ).
- (2) vuoan-lo header «Phi Điền Thanh Hoan nay bị giáng xuống Phi» = LEFTOVER of the thành run on the same page (that run demoted her; the notice stayed). The test now boots a fresh life per outcome; the bị lộ still shows no such notice, «Người ấy: Quý phi Điền Thanh Hoan: không hề hấn gì» and an assert that her rank did not change.
- (1) night card «Kèm» wall: the Kèm block belongs to ONE-SIEVE (MAIN 156 split); asked ONE-SIEVE session_01V1ZZH2fHrCdnudewe1PcfC whether review/one-sieve covers the night card; kit keeper KK41 for a new many-people row if needed.
- Tests: ALL 73 OK (Fold 755x1000 + iPad 1180x820). Stills re-uploaded (img/_review/ob-verdict/after-{fold,ipad}-vuoan-{ok,lo}.png).
- r3b (MAIN 157 + RV N1–N4 verbatim; supersedes the 165dc7b6 bullet): «Kèm» REVERTED to 129a9c51 (MAIN 157: kitKemRow family → kit keeper KK41 / ONE-SIEVE; not this branch).
  RV N1: a pending act whose dialog left the queue by game code (Q cleared, nextBuoi) is closed when any card reads aims outside a dialog being answered (kaAimsOf hook) and by the idle board; test repro (doAct frame → Q cleared → target Sủng −14 → talk to another consort) shows no «Người ấy» for the first target.
  RV N4 (whole family): every aim of hers with a verdict carries the deed's OWN sentence, never another log line — «Ngươi vu oan Quý phi Điền Thanh Hoan: thành, nàng bị giáng xuống Phi.» / «…: bị lộ.» / «…: không thành.» / «…: bỏ dở.» (verb from j78act; talk / dialog options / servant / court / runner aims use their own name «Khiêu khích — Phi …: thành.»; target named as she knew her when she acted). Scan: 22 acts with a verdict all carry it.
  RV N2: not done (explicit outcome flags would need the act code; the seal assert guards the text-read hooks). RV N3: pre-existing kaWhy line («Được: Danh +3 · kẻ được ta sai đi bị bắt») → NEWS-SIEVE.
  Tests ALL 78 OK (Fold + iPad).
