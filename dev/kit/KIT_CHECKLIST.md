# KIT_CHECKLIST — every cross-cutting standard the owner gave for info displays

Owner 27/11 ~04:33Z (OD, verbatim): "Khi mà bạn làm mấy cái thẻ này là tôi thấy bạn quên hết mấy cái luật về mấy cái kit chân, mấy cái kit chuẩn, mấy cái kit chung hết rồi. Nào là được là màu xanh lá cây, mất là màu đỏ, quên hết. Tôi thấy bạn không còn áp dụng những cái đó khi mà bạn làm một cái kit mới, rất là bực bội luôn á."
Owner 27/11 ~04:39Z (OD, verbatim): "Không phải mỗi vấn đề được mất cái màu xanh hay màu đỏ của nó, mà còn những cái vấn đề khác nữa mà tôi đã đưa ra cái luật chung, cái chung như thế nào."

HOW TO USE (law 9 / 11 / 15; OD 27/11 ~04:39Z order 4)
- Every kit / UI worker brief AND every UI review LINKS this file and starts with one line: `KIT CHECK: reuses <parts>` (the existing standard parts the new thing is built from: rows `kaRows`/`kitRows`, colours `kcls`/`.ef g|r|n`, odds `oddsChip`/`kitOdds`, chips `kitChip`, frames `kpanel`, names `kitName`, notice `kitNotice`, close `✕`, …). No line = the brief / review is void. A new kit part that needs a thing not in the list of parts stops and files KIT_REQUESTS.md (law 9).
- Each line below = rule text + source tag. The rule text is QUOTED (law 15), never reworded; KIT §n = dev/kit/KIT.md section, OD = dev/OWNER_DECISIONS.md row (date ~time Z), VP = dev/kit/VANPHONG.md. Quotes in «» / "" are verbatim; where a source is an English kit sentence it is copied as written there.
- CHECK column: `scan:Xnn` = machine-checked by `dev/test/kit-std-scan.js` on Fold 755x1000 + iPad 1180x820 (prints FAIL list, rule id = Xnn); `review` = the reviewer checks it with stills (Fold + iPad) and writes PASS/FAIL per line id in the review.
- Canon overwrite (law 14): if a rule changes, change it IN ITS PLACE here and in KIT.md the same commit.

## A. COLOURS BY MEANING · ROWS (the owner's «được xanh / mất đỏ»)
| id | rule (verbatim) | source | check |
|---|---|---|---|
| A1 | "a value goes to its row by meaning (`kaRows`): a gain is always green and in Được; a cost/loss is always red (Tốn, Mất, Kèm)." | KIT §6 Rules | scan:X01 |
| A2 | "gain: `.ef.g` = `--good`, bold; cost/loss: `.ef.r` = `--bad`, bold; neutral: `.ef.n` = `--dim`, normal weight." (`--good` #2d7a52, `--bad` #c23b22, `--dim` #6b5643) | KIT §1.2 | scan:X01 |
| A3 | "Time (`N khắc`, `1-2 khắc`) is in Tốn in dark ink, never red." | KIT §6 Rules | scan:X01 |
| A4 | "Sign wins: a value whose only number is negative (`lòng -5`, …) is a loss → red, never in Được" | KIT §6 Rules | scan:X01 |
| A5 | "risks are on their own red line labelled `kèm` (`.kl` label + `.ef.r`), never mixed into the gain line." | KIT §1.2 | scan:X01 |
| A6 | "Rows always in this order; an empty row is left out. Labels are Vietnamese title case `Cần / Tốn / Được / Mất / Kèm / Ghi chú`" — and CANON 26/11: "KEEP ALL result/gain/cost rows everywhere — «Tốn: không», «Được: không», the BẠI line «Tốn công, không được gì», empty Thành rows — one rule for all (nothing hidden)". The Tốn row stays «không». | KIT §6 Rules + OD 26/11 ~17:55Z (CANON, MAIN 160/161; "kit §6.7 kitRowNil must NOT land") | scan:X02 |
| A7 | Every cost / gain / loss line on ANY new card / plaque / hand / nav / result card is built ONLY with the existing kit row part (`kaRows` + `kcls` + the odds part) — never its own text. "(1) every NEW kit card/plaque/hand/nav/result card builds its cost/gain/loss lines ONLY with the existing kit row part (kaRows + kcls + odds part) — never its own text" | OD 27/11 ~04:33Z | scan:X03 |
| A8 | "on every CHOICE (button, plaque, card, card back after flip, option row, Tốn/Được/Mất cells) a stat change shows ONLY as marks: «Danh +» / «Danh ++» / «Danh +++» … the TỐN row (what she pays to choose: Bạc, Sức, khắc, items, anything) always shows the EXACT amount («Tốn: Bạc 20 · Sức 5 · 1 khắc»); the ĐƯỢC and MẤT rows (outcomes) show ONLY marks for every kind, Bạc and Sức included … EXACT numbers appear ONLY in the result card (khung kết quả) and Sổ ghi." | OD 26/11 ~22:00Z–22:02Z (CANON) | scan:X04 |
| A9 | "Rows are arrays: one fact per line (`.kitem`), never joined sentences" · "Never pass a joined string of several facts from new code." | KIT §7 / §9 | review |
| A10 | "inside one block, every label/value row shares ONE label column width (the widest label), so all values start on the same vertical line (same as the TỐN/ĐƯỢC/MẤT/GHI CHÚ rows)." | OD L815 (15/11 session 8) | scan:X05 |
| A11 | "`kitRows([[label, value|[values], cls]])` = the act-card `.kb` grid (labels small caps `--k-lab`) = THE kit table for every label|value list" | KIT §9 | scan:X05 |
| A12 | "A gain that rounds to 0 is never shown as a gain: «Sắc +0» becomes «Sắc không đổi» in Ghi chú." | KIT §6 | review |
| A13 | "a gain never sits in Kèm" — "A colour follows the meaning, never the row" | KIT §6 Text integrity | scan:X01 |
| A14 | "stats are never red, red = cost/risk only" (Đức < 50 shows a small gold "!") | KIT §31.12 | review |

## B. ODDS · WORDING (law 7)
| id | rule (verbatim) | source | check |
|---|---|---|---|
| B1 | "`oddsChip(word)` → `.oc .oc0..oc7` | ladder Mong manh/Hiểm/Khó lường/Tùy duyên/Có cơ/Vững/Rất vững; never %, never "Chắc chắn"" | KIT §3 | scan:X06 |
| B2 | "`kitOdds(word|percent)` → `.kodm`: 7 segments filled to the level, red → amber → green, plus the word." — odds = the word ladder + the kit odds bar, never a bare word. "It is the ONE word in the act card's corner / beside a dialog option (`oddsChip()`), and nowhere else." | KIT §11 + OD 27/11 ~04:39Z order (1) "odds = word ladder + the kit odds bar, never a bare word" | scan:X06 |
| B3 | "Ladder = the act's own success/failure ONLY." Side chances (có thai, bị phát giác …) read on the CHANCE scale "Rất thấp < Thấp < Vừa < Cao < Rất cao", never a ladder word after ':' or '('. | KIT §11 | scan:X06 |
| B3b | Side chances use the SECOND scale «Rất thấp < Thấp < Vừa < Cao < Rất cao» (HUD/stage chips, status cells, Có thai, Lật thẻ …) — allowed there; the 7-band ladder is ONLY an act's own success odds. An odds word outside BOTH scales is a FAIL. | KIT §11 + OD L221, L228 (restated 25/11 ~23:27Z; MAIN 171 05:21Z) | scan:X06 |
| B4 | "Chữ cơ hội (Mong manh … Rất vững) chỉ hiện trên lựa chọn thật sự có tung cơ hội, và luôn là chữ đúng; không bao giờ đổi chữ để cảnh báo." Choices that change an ending without a roll: no odds word; ONE small line «Cẩn thận khi lựa chọn». | VP §2.7 (sếp 26/11 ~18:25Z) | review |
| B5 | "Never %, never "Chắc chắn" (bookkeeping / decisions show nothing …)" · "Ký hiệu máy: %, "B1:", "T3/1", thẻ nội bộ trong ngoặc vuông" are not on screen. | KIT §11 + VP §3 | scan:X07 |
| B6 | No old ladder words (Liều, Khó, Hơi khó, Bấp bênh, Thập tử nhất sinh, Năm ăn năm thua …); the words live ONLY in `KIT_ODDS` (j0.js). | KIT §11 | scan:X06 |
| B7 | "Chữ ngoại: OK, buff, stat, level, combo, random, bot, test, game, click, tab, slot." and modern words "điểm, chỉ số, cơ hội, kiểm tra …" are not on screen. | VP §3 | scan:X07 |
| B8 | Player-visible wording is cổ trang; the player is "ta"; people in 3rd person "nàng ta / y / hắn / bệ hạ / Thái hậu / vị ấy". "Không cắt chữ (không "…"): đổi chữ phải vừa ô ở 390 px." | VP §2.1 / §4 | review (+ scan:X08 for «…») |
| B9 | "Con số giữ nguyên và đứng sau tên: "Sủng +6", "Bạc -30", "Sủng 28 → 31"." | VP §4 | review |
| B10 | The «Tốn / Thành / Bại / Kèm» lines belong to the kit owner: "không ai tự đổi". Seal words only THÀNH / BẠI / KẾT QUẢ. | VP §4 | scan:X20 |

## C. FRAMES · LAYOUT · BUTTON SIZE (law 10)
| id | rule (verbatim) | source | check |
|---|---|---|---|
| C1 | "FRAME → LAYOUT → BUTTON SIZE: frames S/M/L/XL first, then the layout (long rows or 2 columns, picked by text), then ONE fixed size per button tier S/M/L = the largest that tier needs across all layouts phone→iPad; only tall frames grow to screen ratio; a big scene picture only when the content fits without scrolling" | START_CORE law 10 (OD:L1375, L1430, OD 18/11 ~16:05Z/~16:10Z/~16:15Z) | scan:X09 |
| C2 | "BUTTON TIERS (ONE size each, never a variant inside a tier)" (S 132 / M 104 / L 140 card height; picture 3:4) | KIT §6.2d | scan:X09 |
| C3 | "Size: ONE SET = ONE SIZE — every act card / choice button of one container is the SAME width AND the SAME height across ALL rows (the tallest sets the height, content top-aligned, long content scrolls inside); owner OD 27/11 ~07:20Z, repeats OD L1354 (4) + L1867" | KIT §6 | scan:X09 |
| C4 | "ONE pop-up look (KIT §8): … never a dark panel body." · "every pop-up uses the same frame SIZE per viewport (same width; same height or min-height …), only the seal word and content differ." | OD L916, L963 | scan:X10 |
| C5 | "RESULT CARD height = its content (no empty band; no fixed min-height); whole family of kit cards/panels (scan every kit card/panel for fixed min-height leaving empty space > one row)" | OD 26/11 ~22:07Z (wording RULINGS 1) | scan:X11 |
| C6 | "in every button/act list in the game, available buttons on top, dimmed ones below." | OD L317 (15/11 ~05:10Z) | scan:X12 |
| C7 | "in dialogs only the option list scrolls; title/picture/figures/text stay fixed (kit rule for all dialogs)." | OD L191 | review |
| C8 | "ONE plaque post at ONE fixed place for EVERY choice board … the post stands at the same x (right side of the stage) and the same top on every board and device" | OD 26/11 ~21:41Z | review |
| C9 | "The enlarged card opens ABOVE the hand row … never over it; the hand row stays exactly where it is with ALL cards visible in their own places … If the space above cannot fit the card without covering the row on a device, the card shrinks (kit size tier), never covers the row." | OD 27/11 ~04:36Z | scan:X13 |
| C10 | "Never shrink text to fit: text wraps; no truncation (`…`, line-clamp) anywhere" | KIT §2 | scan:X08 |
| C11 | One layout per orientation, scaled; page content has no width/orientation breakpoint; no `N vh` inside the canvas. | KIT §0 | (build: media-check.js) |
| C12 | Test sizes: "Samsung Fold portrait 755x1000 + iPad landscape 1180x820; every picture to her = both devices together, full screen, looked 3×" | START_CORE law 12 | scan (runs both) |

## D. PORTRAITS · PEOPLE · NAMES
| id | rule (verbatim) | source | check |
|---|---|---|---|
| D1 | "portrait frames all 3:4" (consistency scan of that element across tabs/dialogs); small 3:4 portrait `.kpsubj`; round avatar `mdH` ONLY for the person-picker row of the Hậu cung tabs (OD 27/11 ~00:05Z/~00:08Z: "Chỉ có chỗ đó đổi tròn thôi, còn khung ở avatar người được chọn vẫn ở dưới"). | OD L1095 + OD 27/11 | scan:X14 |
| D2 | "Character name + rank ALWAYS ABOVE the portrait/figure (small rank line, then name line), everywhere; one kit component kitNameRank." | OD L361 / KIT §48.2 | review |
| D3 | "a person's RANK and NAME always go together, everywhere … never the bare name — rank in its rank colour" ; "EVERY place that shows a person's rank with their name (picker rows, cards, dialogs, lists, logs, toasts, popups) shows the rank in its rank colour via the shared kit." | OD L821, L795 | scan:X15 |
| D4 | ONE rank palette B24 (`RCOL`, j1): "Nobody keeps a copy: read live `RCOL[rank]` / `kitRankCol` / `kitRankTone`." | KIT §1.3 | scan:X15 |
| D5 | "Người khác → ta (thiện cảm, oán, ghen, tin… của họ với ta) `--rel-them` #7a4fa0 (tím); Ta → người khác `--rel-me` #2f6f9f (lam)" — "Only the LABEL takes the direction colour (weight 600); the number keeps the Được/Mất colour … Never green/red for a direction." | KIT §11.2 | scan:X16 |
| D6 | "Relation lines (thiện cảm/oán) use ONE kit component: label; "word · number" one line + bar at the same position/length on every line" | OD L360 | review |
| D7 | "NO round avatars anywhere" (kit 2) except the picker row above; small avatar = `mdH(face,"xs|sm|big")`. | KIT §4.2 + OD 27/11 ~00:05Z | review |
| D8 | "Tapping a character on the stage → opens EXACTLY the kit person dialog (full-body person left, info right), not a private frame." | OD L349 | review |
| D9 | "Person info chip labels start with a capital ("Lòng 70", not "lòng")." | KIT §31.15 | review |
| D10 | "A consort card ALWAYS shows the relation row Ghen · Oán · Thiện cảm · Nàng với ngươi ("?" when unknown)" | KIT §31.9 | review |

## E. CHIPS · ICONS · CLOSE · NOTICES · SELECTED STATE
| id | rule (verbatim) | source | check |
|---|---|---|---|
| E0 | No glued text: a row label (Tốn/Được/Mất/Kèm/Thành/Bại/Ghi chú/Cần) or an odds chip never runs straight into other text — «Tùy duyênThànhBạc−−BạiTồn công», «TồnBạc 20Ghi chúNội vụ phủ» (seen on act-move cadf0346); one row = label column + value column, a row break between rows. | KIT §6 (kb grid, label column fixed) + MAIN 171 05:00Z | scan:X22 |
| E1 | "`kitChip(label, n)` delta chip (sign + colour by meaning) · `kitChip(text,"ok"|"no"|"g"|"r"|"n")` status chip (✓ / ✗) · `kitChips(list)`." Every chip/row from the kit; "Reviewers FAIL any custom chip/row/frame." | KIT §9 + CLAUDE.md law kit-first | scan:X17 |
| E2 | "REMOVE every "Thôi" button (and Lui/Đóng) across the game; every closable panel gets one ✕ in the top-right corner." Leaving = the ✕ of the frame/stage; no «Thôi / Thôi, để sau / Bỏ qua» card that only closes. | OD L331 + OD 26/11 ~22:43Z | scan:X18 |
| E3 | "a panel's ✕ always above everything in its panel" | OD L1038 | scan:X18 |
| E4 | "Tapping outside a panel (dimmed backdrop) anywhere closes it, like ✕ (except mandatory panels)." | OD L340 | review |
| E5 | "kitNotice(spec) — THE ONE NOTICE SYSTEM: top-bar «!» box + top chip + «Tin báo» panel … every game notice; never a toast / pill / strip anywhere else, never at the bottom" | KIT §42.2 + §8.2 table | scan:X19 |
| E6 | Icons: stat icons through `kitStatCell(icon,…)`; shortcuts/status icons through the stage rail (§77 / `kitStatusIcon`) — "nothing else floats on the stage". ONE colour for every "!" (no red). | KIT §32.1, §6.2d, §8.2 | review |
| E7 | "Selected = soft gold glow following the frame's own outline (`--k-glow`), the frame ×1.06–1.07, full colour; unselected opacity .7–.75." NO box / background block, NO check badge on pickers. (Plaque / hand confirm = the ONE small green ✓ top-right, below.) | KIT §31.13 + OD 27/11 ~04:00Z | review |
| E8 | "the confirm on a lifted plaque is a SMALL GREEN ✓ tick in the plaque's TOP-RIGHT corner (kit part, BAL size; no word «Chọn», no bar, no ✕) … SAME tick on every kitPick plaque board AND on the Bàn bài enlarged card" | OD 27/11 ~04:00Z | scan:X21 |
| E9 | "the press/sink feedback (game-feel) belongs ONLY to the actual tappable element under the finger" | OD L876 | review |
| E10 | "ONE component per element kind (kitStatCell etc.); duplicate implementations = review FAIL" | OD L115 | scan:X17 |

## F. RESULT CARD · NAV CARDS · STAGE PLAQUES · HAND
| id | rule (verbatim) | source | check |
|---|---|---|---|
| F1 | Result card parts: seal THÀNH (green) | BẠI (red) | KẾT QUẢ (grey, no roll), act name, one short sentence, rows Được (green) / Mất (red) / Kèm collapsed line, every line "value · reason", «Xem đủ trong Sổ ghi» (KIT §7.4a; on every card that folds detail away = has a Kèm row; owner OD 24/11 ~21:57Z: long detail lives only in Sổ ghi). "Same `.kb` row grid and colours as the act card" | KIT §7 | scan:X20 |
| F2 | "SEAL … comes ONLY from the act's own roll … an act without a roll ("sure", null) gets NO stamp: the neutral grey seal "KẾT QUẢ"" | KIT §7 | scan:X20 |
| F3 | "(thẻ lụa) every plaque … ivory/cream silk-paper face (same tone as the kit panels and act cards), thin pale-gold border … Done ONCE in the kit plaque part (kitPick/§98 family)" | OD 26/11 ~05:55Z (KK53) | review |
| F4 | A plaque / hand card FRONT shows: name · picture · Tốn exact / Được–Mất marks · odds word — built by the kit row part (A7, A8, B2). "NO FLIP anywhere." | OD 26/11 ~23:58Z | scan:X03 |
| F5 | "tapping a lifted plaque again also chooses; tap outside drops the lift" | OD 27/11 ~03:17Z | review |
| F6 | One kit part (kitHand) for every hand in the game; "REMOVE every «Thôi» card/option" ; "(no paging) all cards of an event show at once" | OD 27/11 ~04:36Z + 26/11 | review |
| F7 | Nav cards («Cách làm» §6.2l / §6.2m) are ONE long row each and carry a real gain; "«!» only when real". | KIT §6.2l / §6.2m | review (+ A-rows by scan) |
| F8 | "EVENT SCENES (Bàn bài / kitHand event stage): NO character figure for the event — only the event background picture + the cards + the info box at the top" | OD 26/11 ~22:07Z (RULINGS 2) | review |
| F9 | Every item cell: tap → info through ONE kit item-detail part; picture via `kitItemSrc`. | OD L826 | review |
| F10 | Every real object / person named on a card exists (law 6) — checked by its owner's review, not by the scan. | START_CORE law 6 | review |

## Scan rule ids (dev/test/kit-std-scan.js)
X01 colour by meaning in every `.kr` row (Được green · Mất/Kèm/Tốn-resources red · khắc ink · neutral dim) · X02 act-card rows present (Tốn row on every priced card) · X03 no cost/gain/loss/odds text outside the kit row parts (bare «Tốn …», «Được …», «lượng bạc», «N khắc» in plain text) · X04 Được/Mất rows carry marks not exact numbers on choice surfaces · X05 label/value columns aligned within one block · X06 odds word only inside `.oc`/`.kodm`/`.kodds`, ladder words only from the ladder, no bare word · X07 no `%`, no «Chắc chắn», no forbidden foreign/modern words · X08 no truncation (ellipsis, line-clamp, clipped text, «…») · X09 one size per tier: sibling cards of a set equal width/height (±2 px) · X10 panels light, ONE frame size per kind · X11 kit card with empty band (min-height gap > one row) · X12 enabled before dimmed · X13 enlarged card never covers its hand row · X14 portrait frames 3:4 (round only the picker row) · X15 rank word with a name carries a rank colour · X16 relation label colours · X17 custom chip/row/button not from the kit (class allowlist) · X18 ✕ present top-right, no Thôi/Lui/Đóng buttons · X19 no floating toast / pill / strip · X20 result-card parts + seal words · X21 green ✓ top-right on lifted plaque / enlarged card · X22 glued labels / chips · X23 a tag label stays on ONE line (named tag parts .seal .kchip .kpill .kbadge … and any short own-text label with bg/border, not a button; K-TAG-WRAP).
