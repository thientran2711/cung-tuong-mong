# BRIEF — DIALOGUE-SCENE WRITER (sonnet) for the SIDE-LINE DIALOGUE SCENES lead (Foreman B)
PRIORITY #1 CHECK ('kitDialogue|dialogue scene|dlg'): OD 24/11 ~10:05Z (STORY = DIALOGUE SCENES) | main: none (composed source text lives in the THIN seed files + dev/build/j72.js — you CONVERT it into scenes, never rewrite the quests) | review/sideline-dlg 919ce389 (engine + validator + 3 worked scenes) | claims: the lead session_01N1tNP4b3uXPGSvnVmsC51b.
Lead = session_01N1tNP4b3uXPGSvnVmsC51b (report to it by send_message AND a line in dev/handover/reports/sideline-dialogue.md «## WRITERS»). Coordinator = Foreman B session_01N1tNP5QAMJMb8uPDHpuXza.

## Read first (in full)
dev/rules/START_CORE.md (18 LAWS first) + dev/rules/START_WORKER.md; dev/kit/VANPHONG.md; dev/handover/reports/sideline-dialogue.md («## SCHEMA», «## API DLG»); the owner row below (VERBATIM, law 15).

## Owner row (verbatim, OD 24/11 ~10:05Z)
"Lưu ý nha là tôi muốn chính truyện của mình là cũng phải có những cái cảnh đối thoại, giống như những cái game bây giờ á, chơi chính truyện không có phải đơn giản chỉ là hiện những cái dòng giới thiệu về cái chương đó đâu nha, mà là ví dụ như cái chương đó nó có liên quan tới con người là phải có cái sự đối thoại qua lại để mình đọc, mình hiểu được cái cốt truyện, cái cuộc đời của người này. Giống như bạn cứ hình dung đi, đây giống như là một cái cuốn sách, một cái câu chuyện kể về cái thân phận của người này vậy đó. Tức là nó không phải chỉ đơn giản là những cái câu dẫn, câu kể, mà nó còn có cái sự đối thoại giữa những người với nhau. Ví dụ như tới một cái hồi chương nào đó, ví dụ như cái hồi, ví dụ như là cái kiếp phải báo thù đi chẳng hạn, thì có một người gia nhân ở trong nhà cũ tìm đến hay sao đó, thì phải hiện cái cuộc đối thoại đó là cái hình người gia nhân nằm ở bên trái nè, sáng lên, rồi cái ô đối thoại của ổng, rồi cái nhân vật của tôi nằm bên phải nè, rồi khi mà ai nói chuyện thì người đó sáng, người kia tắt đèn đó, rồi người nào nói chuyện qua nói chuyện lại vài câu để mà giới thiệu cái hoàn cảnh hay giới thiệu cái câu chuyện, hay là dẫn dắt cái câu chuyện nó đi theo cái nhiệm vụ của mình, nó hiểu không? Chứ không phải chỉ là đơn giản là hiện ra có mỗi cái đó. Tức là chính truyện và phụ tuyến, tức là chính tuyến và phụ tuyến là tôi muốn phải có những cái đoạn đối thoại này giữa người với nhau đó, chứ không phải là tự nhiên là giống như có một người tới báo là mất Trâm đi, không phải chỉ đơn giản là báo sự kiện là cái cô Phi Tần thường tại mất cái Trâm cần bạn tìm, không phải vậy, mà là tôi muốn thấy cảnh thực sự là cái cô này tới tìm bạn, hiện cổ ra, cổ sáng lên, đoạn hội thoại, muội vừa mất cái Trâm hay cái gì đó, muội vừa đi ngựa hoa viên hay cái gì đó, chung là đó là một cái câu chuyện, hiểu không? Mình phải tả cho nó thật. Tức là cái game của tôi nó không những là chỉ là chơi, mà nó còn là để cho người chơi, người ta đọc, để người ta tìm hiểu thêm cái thân phận này, cái câu chuyện này, cái nhiệm vụ này đang nói về cái gì chẳng hạn. Tất nhiên là tôi không có muốn nó dài thường lượt mấy trang, không phải vậy. Tức là mình nên hạn chế các cái câu nói, nhưng mà từ câu nào nó cũng phải đầy đủ ý và nghe cho nó hay, nghe cho nó trau chuốt từ ngữ, hiểu không?"

## Your job
For EVERY unit in your slice (table below) write ONE opening dialogue scene, one JSON object per line, in YOUR file `dev/handover/content/dlg/<your file>.md` on branch claude/cung-tuong-mong-handover-hj0h8w (only your file; pull --rebase before each push; commit every ~25 scenes).
`{"id":"<fam>:<unit id>","dlg":{"L":"<role>","R":"me","lines":[{"who":"<role>|me|nar","text":"…"}, …]}}` — schema and roles: reports/sideline-dialogue.md «## SCHEMA». Worked examples (valid): `dev/test/dlgs-fixture.jsonl` on review/sideline-dlg.
- SOURCE = the unit's own text (seed `ask`/`incident`/`text`/`t`/`tl`, title, object, clue, steps). CONVERT it: keep every fact (who, what object, where, the clue), turn it into a short exchange. Never change the quest, never invent a new person, object or place (law 6: the scene names only the unit's cast and real places).
- 3–8 lines (aim 4–6). Line 1–2: who comes and what happened; middle: the detail that makes it a story (why it matters to her, a feeling, the clue); last: leads into the task / the choice. Her ("me") speaks ≥1 line; the left person speaks ≥1 line. `nar` (narration, nobody lit) at most one line, usually the first.
- Polished cổ trang (VANPHONG, law 7): no digits, no %, no odds words, ≤170 characters a line, each line full of meaning and beautiful; no modern words.
- ADDRESS WORDS: `{goi}`/`{Goi}` = how the line's SPEAKER addresses the other figure, `{xung}`/`{Xung}` = how the speaker calls herself (the game's one address core fills them by rank; NEVER type tỷ/muội/bổn cung/thần thiếp yourself between two consorts). Her own lines to a servant may say «ngươi»/«ta». Names: `{A}` `{B}` `{M}` `{O}` and the family's own keys (see SCHEMA role list). A key not listed for that unit fails the validator.
- Family letters (j72 kind fam / old r:"fam"): L = "M" (her cung nữ brings and reads the letter); the writer of the letter is quoted inside «…».
- NPC→NPC the player only watches: `"R":"<other role>","watch":true`, no "me" line (j7 plotter vs target, wc, j71 rivals only).

## Check (must be 0 errors before every push)
In a sparse worktree of review/sideline-dlg (fetch --depth=30 under flock /home/user/wt/fetch.lock; never full-clone): copy your file in and run `python3 dev/test/dlgs_validate.py <your file> --cover`. Send the lead «WRITER <file> <n> scenes, 0 errors, <sha>» when your slice is done; then a short self-read: re-read 20 random scenes aloud in your head, fix any flat line.
Rollover at START_CTX % + 25 % (ceiling 60 %): write the HANDOVER (last id done) in reports/sideline-dialogue.md «## WRITERS», tell the lead + Foreman B; Foreman B opens the successor. Never push main, no pull requests, never message the owner.

## Slices (file → units; source)
| W | file | units | source |
|---|---|---|---|
| W1 | j72_a.md | j72 composed craft + social (127) | content/thin/j72seeds_a.md |
| W2 | j72_b.md | j72 composed court + fam (129) | content/thin/j72seeds_b.md |
| W3 | j72_old.md | j72 old 110 templates (id = the T7 id, e.g. `j72:th_thuoc`) | dev/build/j72.js `T7("<id>",…{r,b,t,h,…})` |
| W4 | j68_a.md | j68 comp day + visit (127) | content/thin/j68seeds_a.md |
| W5 | j68_b.md | j68 comp serv + emp (120) | content/thin/j68seeds_b.md |
| W6 | j68_c.md | j68 comp sea + court + kid (129) | content/thin/j68seeds_c.md |
| W7 | j68_d_ky.md | j68 comp myst + rumor (84) + kỳ ngộ (77, L = "W") | content/thin/j68seeds_d.md, kyseeds_a/b.md |
| W8 | j7_wc.md | j7 (81) + world reactions wc (91) | content/thin/j7seeds.md, wseeds_a/b.md |
| W9 | j70_j71.md | j70 routes (78, L = "M": her cung nữ reports the tell) + j71 complications (80) | content/thin/j70seeds_a/b.md, fseeds_a/b.md |
