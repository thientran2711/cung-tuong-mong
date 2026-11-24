# wording — verbatim owner rules

Holds: player-visible words, VANPHONG, no %, names of acts.

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L83] - (21:00Z) Owner: result/report texts (e.g. spy 'dò la' result) as bullet lists, one fact per line; gains/costs coloured; filler as footnote. All result/report/news/event texts.
[OD:L172] - (05:40Z) Owner: no 'Gánh hàng rong' inside the palace — renamed to 'Nhờ thái giám mua đồ' (Nội vụ phủ eunuch buys from outside).
[OD:L181] - (07:00Z) Owner: luxury shown as numbers (corner 'Xa xỉ N' per item; header total vs allowance), not words. Ref dev/owner-shots/1115-xaxi-ref.jpg.
[OD:L221] - (03:05Z) Owner disliked 'có thai: Liều · được ban thưởng: Liều' on act cards. Rule: the Liều…Nắm chắc ladder is only for the act's own success/failure odds; side chances (pregnancy, reward, card turned…) use the ladder Rất thấp/Thấp/Vừa/Cao/Rất cao like the status cells (hud-chance2). Assigned review/sub-odds.
[OD:L228] - (04:05Z) Owner: move Tai mắt + Ân sủng (Có thai, Lật thẻ, Ân tình đêm, Số lần ân thưởng) onto the stage, right column under the Hoàng thượng/Thái hậu/Hoàng hậu/servant chips; remove the 'Tư chất · trạng thái' panel entirely (other info already lives elsewhere). Có thai/Lật thẻ on the Rất thấp…Rất cao ladder. Assigned review/sub-odds.
[OD:L230] - (04:15Z) Owner asked "Sai đi Tiểu Lâm Tử là sao" → change to "Người chạy việc: …" with explanation, in one place only, person selectable. Chip "Thỉnh tranh nhân vật" must not cover content. review/hau-cung-ui.
[OD:L239] - (04:55Z) Owner asked "tiếng cứng cỏi là sao" → ban vague effect words with no real rule in Được/Mất/Kèm; good things don't go in the red Kèm line. review/sub-odds.
[OD:L244] - (05:15Z) Owner reported bug: Thỉnh an Hoàng hậu says 'thiện cảm +4' but nothing changes. Fix: the act really raises 'Hoàng hậu với ngươi +4'; result card shows real numbers. Unified terms: 'Ngươi với nàng' / 'Nàng (Hoàng hậu, Hắn…) với ngươi', drop bare 'thiện cảm'. Audit every relation effect. review/sub-odds + review/hau-cung-ui.
[OD:L247] - (05:25Z) Owner: 'Ngươi với nàng / Nàng với ngươi' hard to understand → clear subject-verb labels: 'Nàng quý ngươi: <level> · number', 'Nàng oán ngươi: number', 'Ngươi quý nàng…', 'Hoàng hậu quý ngươi +4'; levels: Ghét/Không ưa/Bình thường/Có cảm tình/Quý mến/Thân thiết. Everywhere (cards, Giao tình, acts, results, logs).
[OD:L255] - (05:55Z) Owner asked whether 'Sai đi dò la' odds (Khá chắc) are based on anything or pure luck → currently just 40 + loyalty/3 then roll. Rule: odds must come from real factors (servant's talent/nature, target's Tâm cơ/nature, guards, acquaintance, Tai mắt, quẻ), and tapping the odds word shows 'Vì sao …' listing the factors (no %). Applies to every act; NPCs same formula. review/act-audit.
[OD:L275] - (08:10Z) Owner: rename 'Sổ tuần' and audit every name to sound period/archaic → style worker drafts a proposal table (recommends 'Tuần lục'), coordinator approves then applies.
### OD:L310 15/11 ~05:05Z (owner) archaic names + shop
[OD:L311] - Chơi cùng bạn / Mời bạn → "Cùng hảo hữu" / "Mời hảo hữu" (tri kỷ too intimate). Bảng vàng: ok. Qua đêm → Qua ngày.
### OD:L327 15/11 ~05:35Z (owner)
[OD:L332] - Wording must pair: "Sang buổi" / "Sang ngày mới" (drop "Qua ngày").
### OD:L310 15/11 ~05:05Z (owner) archaic names + shop
[OD:L312] - The word "ngươi" referring to the player in the UI becomes "ta" (first person): "Con của ta", "Hoàng hậu với ta". NPC dialogue addressing her keeps "ngươi".
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L352] - (06:50Z) Everyone's attitude to her (servants included) uses only ONE word "Thiện cảm"; drop "Lòng". Person names must not contain numbers.
[OD:L356] - (07:10Z) Words for OTHER people must be clear third person: women "nàng ta", men "y"/"hắn", Emperor "bệ hạ", Thái hậu "Thái hậu", neutral "vị ấy". "Ta" is the player.
[OD:L362] - (07:25Z) Keep TWO separate stats: thiện cảm (like/dislike, decides whether they help) and oán (resentment for past deeds, decides retaliation, fades over time). Keep the word "oán" (not "thù"). Tapping the label shows a short explanation.
[OD:L369] - (08:00Z) Label for items in use in Tư trang: only ONE word "Đang mặc" for every item (drop "Đang cài", "Đang đeo"…).
[OD:L488] - [ ] (16:40Z) Bottom corner button still says "Qua ngày" (must be "Sang ngày mới"); the "Đã mở bản mới" chip covers the scene title.
[OD:L493] - (16:50Z) Explaining "thù": the old game still had a leftover "thù −15" in the log (bug); the fix changes all to "oán". Owner keeps the rule, "oán" stays.
### OD:L701 15/11 ~22:25Z — Rank title look: brighter; glow only on paintings (owner)
[OD:L701] ## 15/11 ~22:25Z — Rank title look: brighter; glow only on paintings (owner)
[OD:L702] - Rank-title colours are too pale/dull, hard to read → make every rank colour more SATURATED and vivid (still readable).
[OD:L703] - The GLOW + outline effect only where the name sits ON A PAINTING (stage figures over the scene picture, scroll/figure art). In framed UI (dialogs, cards, name boxes, Tuần lục text, lists — anything with a panel/paper background) use the same vivid colour as PLAIN text: no glow, no outline.
[OD:L704] - Her own name: black + light-gold glow on paintings (per 20:10Z); in framed UI plain black (bold OK).
### OD:L740 15/11 ~22:55Z — Co-op pause + timer sync (owner)
[OD:L741] - Add a "Tạm dừng" button in co-op: pressing it pauses the game for BOTH players (the other cannot continue) until the one who paused resumes. Friend sees a cổ-ngữ notice (e.g. "Hảo hữu xin tạm nghỉ, chờ giây lát").
[OD:L743] - The waiting player sees only a generic old-style notice, NOT what the friend is doing (e.g. "Hảo hữu đang dở tay, xin đợi" / "Hảo hữu đang bận việc").
### OD:L797 15/11 (session 8) — Action odds explanation is hard to understand (owner screenshot)
[OD:L798] - Owner (verbatim): "Giải thích khó hiểu quá."
### OD:L846 15/11 (session 8) — Tài nghệ act card text broken and unclear (owner screenshot)
[OD:L847] - Owner screenshot dev/handover/refs/owner-act-text-jumble.jpg (circled): card "Tự học Thi: viết thơ, thư pháp": ĐƯỢC "tiến bộ Thi +1..2 · Tinh xảo: cần chơi 9 phần · Tuyệt phẩm: chỉ vật liệu quý); dâng · tặng được" (stray ")"), KÈM "tự tay chơi thì ra Thư pháp «Vọng nguyệt» (chơi 5 phần: Khá" (unclosed, cut), "+1..2" is not player wording. Rule: every act card line is complete, short, clear cổ-trang wording (VANPHONG), no broken brackets, no code-like ranges, no truncation. → worker review/act-text: whole family over all act cards (scan every generated card text for unbalanced brackets, "..", cut text, glued words).
### OD:L905 15/11 (session 8) — A gain shown in red (owner screenshot)
[OD:L908] - Rule: every value is coloured by its MEANING (gain green, loss red, neutral plain), never by the row it sits in; gains belong in ĐƯỢC, not KÈM. Whole family across all cards → added to review/act-text scope (scan: "+N shown red / −N shown green").
### OD:L7 2026-11-14
[OD:L171] - (05:25Z) Owner: stage name labels = rank on top line, name below, text coloured by rank (kit rule, all stages).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L523] - (~18:30Z, owner) LANGUAGE: from now on every repo work file is written in ENGLISH to save credits (this log included). Player-visible text stays Vietnamese.
<<<<<<< HEAD
[OD 24/11 ~22:14Z] - UNNAMED PERSON IN PROSE: «một vị cung nữ» / «một vị phi tần» / «một vị thái giám» (or the visible rank title), never «chưa quen biết» (owner: "không có tên thì chỉ cần đơn giản gọi đó là một vị cung nữ đó, hoặc là một vị phi tần vậy thôi, chứ chưa quen biết làm chi dài dòng"). Whole kitNoUnk family.
=======
>>>>>>> b92874ab (face-master03 Sharp: age26 c14,c19,c27 done; handover)
