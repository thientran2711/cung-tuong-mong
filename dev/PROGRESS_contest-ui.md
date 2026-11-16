# PROGRESS: contest-ui (review/contest-ui, queue C34, owner 15/11 session 8)
Spec: OWNER_DECISIONS "Contest podium: rewards for 2nd/3rd...", "Contest intro layout...", "Podium backdrop redraw", "Thi mấy cái này không có phần thưởng gì luôn".

LUẬT ƯU TIÊN SỐ 1 check: opt-pics (option cards picture-left) is already on main (jopic); the board paintings `mg-<kind>-bg(-hoc)` (review/minigames, 24 files on the CDN) already exist and are reused as the contest picture; `kitReward` (§65), `bestow` / Sổ ân thưởng, `k61Meet` already exist and are reused. Nothing rebuilt.

## What changed
1. Game frame (KIT 13.4): `kitGameFrame({pic})` = `.kgbody > .kgpic (left) + .kginfo (right)`; result panel included (it lives in `.kginfo`). Wired for: every startContest (j82), playArt (works, lessons, practice, veil), exams (jexam rounds + result), Điểm trang (jtoil, `mg-chai-bg`). Phones: 104 px picture band on top, hidden while a game runs.
2. Contest intro: counters PHẦN/HỒI/CÒN hidden until the game runs (`kg-idle`), ĐỐI THỦ list = `.kgrv` own box scrolling alone, buttons sticky.
3. Prizes (jcui.js, KIT 13.5, `BAL.cp`): Nhất themed item + bạc + chest reveal + title in `S.honors` (+ Sổ ân thưởng page) + Emperor gift (guaranteed at big festivals/feasts); Nhì/Tam smaller item and/or bạc; Danh +1 for Nhì/Tam also in the two feasts (was missing). NPC winners paid the same (inv + bạc). Podium shows the chips under every place; result panel lists "Ban thưởng hội thi".
4. Podium: same figure box height for all three (only steps differ; KIT_FIG fac), everyone on the dais known (k61Meet), new painted backdrop `podium-bg2(-p).webp` (CDN, looked at: no people, no text), `KIT_BD.podium` updated.
5. Contestants known: `cuMeet` at the contest intro (before the list renders) and again at the podium.

## Balance table (BAL.cp; pool = BL[her rank] x months x share; months small 1 / big 2; shares 1 / .5 / .25; item part .6 / .4 / .6 of the pool at its shop price)
| her rank (stipend) | contest | Nhất pool | Nhì | Tam |
|---|---|---|---|---|
| Thường tại (30) | small | 30 | 15 | 8 |
| Thường tại | big | 60 | 30 | 15 |
| Phi (130) | small | 130 | 65 | 33 |
| Phi | big | 260 | 130 | 65 |
Items come from a themed pool per art (`CU_POOL`, e.g. cắm hoa = trâm ngọc / vòng ngọc / bộ diêu; đàn = đàn cổ; thơ/câu đối = nghiên / tranh cổ; thêu = lụa / gấm; bếp = yến sào / nhân sâm; hương = hương trầm / túi thơm), only items the winner's rank allows. Cost of entering stays Sức -6 as before; the prize pays about the same as one month's stipend for a small contest, so neither "enter" nor "skip" is the obvious pick.

## LUẬT SỬA CẢ NHÓM scan (game frame, before -> after)
| entry point | before | after |
|---|---|---|
| startContest (all j71 festivals, feasts, lessons with rivals) | single column | picture left / info right, rivals box scrolls |
| playArt (works, tự luyện, lessons, veil) | single column | picture left (`-hoc` painting) |
| jexam rounds + result | single column | picture left |
| jtoil Điểm trang | single column | picture left (mg-chai-bg) |
| jpetcare game box | single column | NOT changed: no painting for pet care exists (KIT REQUEST below) |
| Tranh ghế / hoàng tự exam / công chúa podium | silhouettes possible, 0.84 figure scale | same scale, known faces (shared kitPodiumShow) |

## Tests
`node dev/test/contest-ui.js <url> <W>x<H>@dpr <outdir>` (intro layout, counters hidden, rivals box, podium figure heights, prize chips, chest, result layout, page errors). Results below.

## KIT REQUEST / KEEPER (owner 16/11 one-kit-keeper rule; KIT.md NOT edited by me)
Implemented in code so the owner can see it, but these are kit changes for the keeper to adopt/rewrite into KIT.md (§13 game frame, §20 podium):
- `kitGameFrame({pic})` (j79) now = `.kgbody > .kgpic + .kginfo`; CSS in jcui.js (`#kcu-css`); `kg82Open({pic})`, `kg82Pic(kind)`; `#kg82.kg-idle` hides HUD; `.kgrv` self-scrolling list (also used by kitGameResult standings).
- Podium: same figure height for all places (`.kpod-fig`, `--kf` = KIT_FIG.fac/man), prize chips from `CU.last`, `kpodPrize` accepts chip strings; `KIT_BD.podium` -> `podium-bg2.webp` / `podium-bg2-p.webp` (shared art, painted by me with Magnific gpt-2-6, uploaded to the CDN, looked at).
- jpetcare game box has no painting: KIT REQUEST: pet-care board painting `mg-chamthu-bg` (+ pass pic in petcGameBox).
- Prize items `from:"thi"` ("Thưởng hội thi" via kinvFrom wrapper) and `S.honors` list in Sổ ân thưởng: item-origin / record additions for the keeper to confirm.

## Test results (dev/test/contest-ui.js, Playwright, one browser at a time)
755x1000@2, 1180x820@1, 1366x1024@2, 844x390@2, 390x844@3: picture left of info (top band on phones), counters hidden on intro, rivals box scrolls alone, buttons in view, 3 podium figure boxes equal height (410/738/120/...), 0 silhouettes (all 5 rivals known after the intro; unknown before), prize chips on every place, result panel picture-left, no horizontal overflow, 0 page errors. Not verified by the test: the chest reveal (kitReward) timing (it starts after "Tiếp"; spark seen in the 755 shot; assets load slowly on this box) and the "Ban thưởng hội thi" rows (seen in screenshots 1180 and 755; the test's text check ran after the chest overlay).

## r2 (reviewer FAIL fix)
- Podium at max-height:520px (844x390): compact header (one line, no sub), small medals, plaque = one row name+title+score, chips on one wrapped row, smaller Tiep; figures keep KIT_FIG scale (figH 120 -> 151, min-height untouched); rules in #kcu-css. Test now asserts figures clear of the header.
- CU.did cleared when a contest starts and right after its own onDone (jcui startContest wrapper), not only inside cFin7/fxFin7.
- Checked 844x390@2, 755x1000@2, 1180x820@2, 1366x1024, 1000x755, 390x844: no errors, same fig height, no overflow.
