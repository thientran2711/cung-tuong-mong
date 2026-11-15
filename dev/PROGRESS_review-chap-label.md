# PROGRESS review/chap-label (owner 15/11 ~20:30Z: story progress shows the CHAPTER and ACT, "Chương 1 · Hồi 3")

Base: origin/main 64e91f1a. Status: done, SẴN SÀNG KIỂM.

## What changed
- `dev/build/j67.js`: `pos67(A)` / `lab67(A)` = the one story position label.
  - Main line: `Chương <A.chap> · Hồi <A.i+1>/<A.seq.length>` (a closed chapter = n/n). If an old save has no `A.chap`, it uses `S.st.ch.n`, otherwise `Chương 1`.
  - Old phụ tuyến arcs (`S.st.X`, v2 saves): one chapter only, so they show the act only: `Hồi i/n`.
  - Old v1 story (no `S.st.v2`): `Chương 1 · Hồi step+1/n`.
  - Milestone chapters (`S.st.ms`, checklists): `Chương N` only; their checklist stays "Bước k/m".
- Sites switched to lab67: Hành sự story card, the objective head on Hành sự (also `STORY.hint`), panel67 heads (v2 + v3, servant road), and the Tuần lục line after each act (`<b>Chương 2 · Hồi 2/4 · <arc></b>: …`).
- `dev/build/jstory.js`: these now use lab67 too: the dialog title `title67` (also used when the pledge chip reopens a dialog), the old v1 dialog title, the rare-chance title (the chapter that just closed), the dialog's first line (side arcs: no Chương), and the "Đang lo liệu" Việc row.
- `dev/build/jtabs.js`: the Mệnh truyện tab head card (kit §21 kitSkillCard) has kicker `Chương N`, and its steps now show the act she is ON (`Hồi 2/4`, the same as the dialog title). Before, it showed acts done (`Hồi 1/4` while the dialog said `Bước 2/4`). Old v1 saves now get a story card in the tab (it used to be empty: "Chưa mở chương nào").
- No new kit part. Text only, inside existing kit pieces (kit header title, kitSkillCard kicker/steps, rows67, srvhead).

## Scripts
- `python3 dev/review/chap_label_sites.py [rev]`: static list of every progress-label site in dev/build (file:line, label kind).
  - origin/main: title67 "Bước i/n only (NO chapter)" ×1, act/step only ×2, hand-built ×1.
  - after: 12 lab67 sites + 2 kit head cards. Left as is: chapter cards (start / close / deadline warning / past list), the j72 favour, and 16 mini-game round HUDs (out of scope).
- `CHECK=1 [DPR=2] NODE_PATH=$(npm root -g) node dev/test/chap-label.js <url>/index.html <WxH> [out.json] [shot-prefix]`: live scan with 13 checks.
- `node dev/test/chap-label-oldsave.js <before url> <after url>`: saves made with the main build (v3, v2 without A.chap, v1) load in this build and get labels. PASS.
- `dev/test/story-deadline.js`: title check updated to the new format. PASS.
- NOTE: serve the ROOT index.html (`bash dev/site/build_site.sh`). dev/index.html has no charset meta and fails to parse under python http.server.

## Before / after (live, 755x1000; same at 1000x755, 1180x820, 1366x1024@1, 844x390)
| site | before (main) | after |
|---|---|---|
| story dialog title (kit header) | Chính tuyến · Báo thù cho nhà · Bước 2/3 | Chính tuyến · Báo thù cho nhà · Chương 2 · Hồi 2/4 |
| pledge chip → dialog title | … · Bước 2/5 | … · Chương 3 · Hồi 2/6 |
| rare chance title | Chính tuyến · Báo thù cho nhà · Cơ duyên hiếm | … · Chương 3 · Cơ duyên hiếm |
| Hành sự story card line | Chương 2 «Lật lại án cũ» · hồi 2/3 · còn 6 tháng | Chương 2 · Hồi 2/4 «Lật lại án cũ» · còn 6 tháng |
| Hành sự objective head / STORY.hint | Chương 2 «Lật lại án cũ» · hạn còn 6 tháng · … | Chương 2 · Hồi 2/4 «Lật lại án cũ» · hạn còn 6 tháng · … |
| Mệnh truyện tab head card | Chương 2 · Lật lại án cũ · Hồi 1/3 (acts done) | Chương 2 · Lật lại án cũ · Hồi 2/4 (act she is on) |
| panel67 head (servant road) | Chương 2: Lật lại án cũ | Chương 2 · Hồi 2/4: Lật lại án cũ |
| Tuần lục after an act | Lật lại án cũ: Tin hắn bán là thật. | Chương 2 · Hồi 2/4 · Lật lại án cũ: … |
| old v2 save (no A.chap) title | … · Bước 2/4 | … · Chương 1 · Hồi 2/5 (Chương 2 if S.st.ch exists) |
| old phụ tuyến arc title | Phụ tuyến · Người thân thất lạc · Bước 1/5 | Phụ tuyến · Người thân thất lạc · Hồi 1/6 |
| old v1 save title | Chính tuyến · Báo thù cho nhà · Bước 2 | Chính tuyến · Báo thù cho nhà · Chương 1 · Hồi 2/5 |
| old v1 save Mệnh truyện tab | "Chưa mở chương nào" (empty) | card Chương 1 · Báo thù cho nhà · Hồi i/5 + Mục tiêu + Kế tiếp |
| milestone chapter head / card | Chương 1 «Nhập cung…»: … / Bước 0/2 | unchanged (already has the chapter; a checklist has no acts) |
| chapter open / close / deadline cards + Tuần lục | Chương N: … / Chương N «…» khép lại | unchanged (already has the chapter) |

## Open decision (for the coordinator)
- j72 Việc nhờ favours (labelled "Phụ tuyến" in their offer title) still say `bước i/n` on the quest card. They are one-step-chain favours, not chaptered stories, so "Chương 1" on each favour would add noise. Ask the owner if she wants "Hồi" there too.
