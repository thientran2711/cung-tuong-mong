# mg-balance — minigame inventory + no-word replacements + difficulty tiers
Worker: mg-balance (opus), Foreman B. Branch: review/mg-balance (from origin/main cdad7109).
Owner lines: OD 16/11 07:10Z (too easy), 07:20Z (NO WORD GAMES), 07:25Z (target MEDIUM, Tuyệt phẩm 20–30 % for skilled play at matching level), 07:25Z (ONE CORE).

## STEP 1 — INVENTORY (origin/main cdad7109), 11/16/2026

All minigames run in the j82 frame (`kg82Open`/`kg82Play`, engines in `KG82_ENG`, kinds in `KG82_KIND`; later files override earlier ones).
Entry points: `startContest` (j71 festival contests, Tranh ghế), `playArt` (j83 works/self-practice, jrcp lessons with a teacher, jkc Phúc tuyển, jveil, jwkg), `openMG` → `KG82_MGL` (Tài nghệ lessons), `kg82Play` direct (jexam exam rounds, jts private summons), `kg82Open` own boards (jtoil makeup, j92 Chải chuốt, jts Phối đồ), jpetcare own boxes.

| Kind | File · engine fn | Art / occasion | Word-based? | Owner of replacement |
|---|---|---|---|---|
| dan Đàn | j82 `kg82Rhythm` | Cầm; contests, lessons, works, jts summons | no | — |
| hat Hát | j91 `k91Hold` | contests | no | — |
| co Cờ | j82 `kg82Go` (capture, 1 liberty) | Kỳ; contests, lessons, works, jts summons | no (in KG82_KNOW only for hint tiers) | — |
| dauho Đầu hồ | j91 `k91Fling` | contests | no | — |
| ban Bắn cung | j82 `kg82Aim` | contests | no | — |
| **tho Thơ** | j91 `k91Verse` (drag words into lục bát) | Thi; contests, lessons, works, Phúc tuyển, exam tier 1 (via EX_CKTT) | **YES** | **A — review/nw-poem** |
| **doi Câu đối** | j91 `k91Pair` (thread word ↔ opposite word) | contests; exam tier 1 (always one round) | **YES** | **A — review/nw-poem** |
| **doden Đố đèn** | j91 `k91Lantern` (rotate pieces to READ riddle, pick answer) | festival contests (Nguyên tiêu) | **YES** | **B — review/nw-lantern** |
| ve Vẽ | j91 `k91Trace` | Họa; contests, lessons, works | no | — |
| hoa Cắm hoa | j91 `k91Arrange` | contests | no | — |
| theu Thêu | j82 `kg82Pattern` (memory) | Thêu; contests, lessons, works, exam tier 0 | no | — |
| kim Khéo tay | j91 `k91Untangle` | contests | no | — |
| mua Múa | j82 `kg82Steps` | Vũ; contests, lessons, works | no | — |
| banh Nấu ăn | j91 `k91Cook` (jwkr overrides `KG82_ENG.cook`) | Nấu nướng; contests, lessons, works, exam tier 0 | no | — |
| huong Điều hương | j91 `k91Blend` | Y thuật & điều hương; contests, lessons, works | no | — |
| kinh Chép kinh | jwkg `kwkTrace(KWK_KINH)` | works (copy sutra) — traces stroke shapes, no reading | no | — |
| may May áo | jwkg `kwkTrace(KWK_MAY)` | works (sewing) | no | — |
| duho Du hồ | jts `tsEngPluck` | Emperor's private summons | no | — |
| den Hoa đăng | jts `tsEngSteer` | Thả đèn hoa đăng festival | no | — |
| chai Chải chuốt | j92 `kg92Groom` | wardrobe dressing | no | — |
| Trang điểm | jtoil (own board in kg82 frame) | morning toilette | no | — |
| Phối đồ theo đề | jts `tsDressGame` (item picture tiles; theme named in one line) | Hội phối đồ | no (picture tiles) — borderline: theme shown as words | UNASSIGNED (Foreman B: judge; suggest theme shown as colour/motif swatches) |
| Pet feed / bath / ball | jpetcare `petcFeed` `petcBath` + game 3 | pet care | no (food tiles are pictures) | — |
| **le Lễ nghi** | jexam `EXQ.le` → j82 `kg82Quiz` | promotion exam tier 0 | **YES (quiz bank)** | **C — review/nw-quiz** |
| **tc Trị cung** | jexam `EXQ.tc` → `kg82Quiz` | exam tier 2 | **YES** | **C — review/nw-quiz** |
| **xa Xử án** | jexam `EXQ.xa` → `kg82Quiz` | exam tier 2 | **YES** | **C — review/nw-quiz** |
| **thq Đối đáp (Thái hậu hỏi)** | jexam `EXQ.thq` → `kg82Quiz` | exam tier 2 | **YES** | **C — review/nw-quiz** |
| dead word banks | j82 `kg82Bank` banks doi/do/bep/huong; j5 `MG.thi` (DOI) + `MG.y` (YQ) quizzes | no longer reached (j91 + `KG82_MGL` reroute every lesson) | yes but dead | UNASSIGNED — delete when A/B/C land (no player path today) |

Not on main (branches only, not counted): scheme minigames (Nghe ngóng/Truyền lời/Mặc cả), Tứ đức games (review/tuduc-mg*), slap-mg, blood-test eye contact (review/routes). If any of them lands with a word mechanic it falls under the same rule.

## Proposed NON-word replacements (same art/occasion, winnable by what is shown, hints + demo, tiers from `mgTier`)
Keep each kind's key (`tho`, `doi`, `doden`, `le`, `tc`, `xa`, `thq`) so every caller (j71 SC7, jexam rounds, KG82_MGL, j83 works) keeps working — only `KG82_KIND[k].e/how` and a new engine change.

- **A tho (Thi / thư pháp) → «Thư pháp: viết theo nét»**: a sample brush character is shown with numbered strokes; she draws each stroke IN ORDER with a pressure bar (hold longer = thicker) and must keep the ink inside the sample's width band. Differs from `ve` (free coverage) by stroke order + thickness. Score = order right × band coverage.
- **A doi (Câu đối) → «Treo câu đối: đối xứng»**: two red scrolls; the left one shows a column of picture motifs (núi, mây, tùng, hạc, trăng…); she completes the right scroll by placing the mirrored PICTURE pair (núi↔sông, trăng↔trời, tùng↔hạc) — pairs drawn as matching colour/frame shapes at low tier; at high tier only the motif. No characters read.
- **B doden (Đố đèn) → «Bóng đèn»**: a lantern with 2–4 rotating cut-out rings; a small sample shows the target silhouette (thỏ, cá chép, sen, hạc); she turns the rings until the shadow on the wall matches. Live shadow = immediate feedback; Gợi ý lights the next wrong ring.
- **C le (Lễ nghi) → «Hành lễ đúng vị»**: the hall floor has coloured mats in rank order (colour key shown at the side); she drags consort tokens (rank colours) to the right mats, then does the bow at the gong (one tap timing). Winnable from the colour key.
- **C tc (Trị cung) → «Chia của lục cung»**: palaces show need bars (than, lụa, gạo as icons); she drags goods from the store into palaces to fill each bar into its green band without running out. Visible needs → winnable.
- **C xa (Xử án) → «Tìm dấu vết»**: a painted room vs the witness's sketch; tap the N differences (the clues) before time runs out; Gợi ý circles an area.
- **C thq (Thái hậu hỏi) → «Dâng trà»**: steady-hand game — hold the tray level (keep the tea dot in the calm ring while the tray drifts) and set the cup down when the Thái hậu's hand-signal icon lights.

All seven call `mgTier(kind, occ)` (below, STEP 2) for their difficulty and finish through the normal `env.end(raw0to10)`.

## STEP 2 — difficulty tiers: API for review/nw-* (11/16/2026, code on review/mg-balance, numbers being calibrated)
File `dev/build/jmgt.js` (assembled right after j91), numbers in `BAL.mgTier` (`dev/build/jbal2.js`, end of file).
- `mgTier(kind, {occ, rank?, lv?, p?, big?})` → `{occ, occName, rank, stake, lv, d, tier 0|1|2, word Dễ|Vừa|Khó, ease 0..5}`.
  occ: `hoc` lessons/self-practice/works · `hoi` festival contests (j71) · `trieu` Emperor's summons (jts) · `exam` khảo hạch (rank = TARGET rank) · `tuyen` Phúc tuyển (jkc).
  stake = BAL.mgTier.occ[occ][0] + [1]×rank (+big); d = stake − her art level; ease = mid − slope×d + kAdj[kind] (clamped 0..5).
- `mgSet(kind, o)` sets `KG82.tier` and `KG82.lv = ease` before `kg82Play`; startContest / playArt / kg82Lesson / jexam / jts already call it.
- **Inside an engine: `env.lv` IS the ease (0 = hardest, 5 = easiest).** Scale your windows/time/pieces with it like j91 does. Aid tiers: `kg82Tier(env.lv)` → 0 Dễ (aids on board) / 1 Vừa / 2 Khó (aids on Gợi ý only), thresholds BAL.mgTier.aid. NOTE: kg82Tier was "low lv = easy" before; it is now ease-based (high = easy).
- Intro row "Độ khó": `mgDiffTxt(KG82.tier, kind)`. Result word: `kg82Word(raw)` = `mgWord(raw)` (BAL.mgTier.word).
- Keep the kind key (`tho`, `doi`, `doden`, `le`, `tc`, `xa`, `thq`) and expose `KG82.peek()` (the right move: `{x,y}` tap, `{drag:[[x,y],…]}`, `{sel:"css"}`, `{hold:bool,x,y}`) — the balance bot `dev/measure/mg-bots.js` plays every engine through it.
- Measure your engine: `node dev/measure/mg-bots.js <url>/index.html <kind> e1,e2,e3 skilled,random 30 3 out.json` (virtual clock, fast). Target at the matching level (ease = mid): skilled raw ≥ BAL.mgTier.word[3] ("Xuất sắc" ≈ Tuyệt phẩm) in 20–30 % of plays, random ≈ 0 %; if off, add a trim in `BAL.mgTier.kAdj[kind]` (not in your engine).
