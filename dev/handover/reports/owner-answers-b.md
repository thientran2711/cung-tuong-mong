# owner-answers-b — report (worker sonnet, 11/16/2026)
Branch review/owner-answers-b @ 011beb29b8ac8b5411868b55550b972fd752defa. Progress: dev/PROGRESS_owner-answers-b.md on the branch.

## Base (important for the coordinator)
Latest origin/main b85cdb1ef + MERGED the three READY branches that are not on main yet: review/nw-lantern-r1, review/presentation-r1, review/pcard-dislikes-r1
(conflicts only in generated index.html/sw.js/assets.json, assemble.py list, jbal2.js — resolved by union, site rebuilt). Items on main already: C28 room-btn, C34 contest-ui, D32 succession. On landing: fast-forward those three first (or this branch carries them).

## Items
- QB1: 'Đăng khôi' already in nw-lantern-r1 (jcui CU_KHOI.doden); 0 'Trí khôi' left in player text; formula Tài + Tâm cơ + Thi unchanged.
- QB2: already so — sung-ai uses bgm-night; painted FX full in dramatic groups, lighter/none in ordinary; Gọn starts none. presentation.js 755x1000@2: 75/75 cats, 0 errors, ok.
- Q6: icon-only <600 px (label = tooltip + aria); button now also on landscape/wide (two-row bar: under time block; one-row bar: between menu and name). Measured 103x36 (>=1000), 91x30 (755), 30x30 (390); inside header at all 6 sizes; 0 overflow; screenshots looked at (1180, 1366, 844 headers, 755).
- Q15: titles as kit rows "Danh hiệu thi tài" on profile card (3 variants: normal/srv/kc) + Mệnh truyện tab + Sổ ân thưởng (4 places, was 1).
- Q25: Thái hậu dislikes ("Người ghét" on her card, gift refusal/penalty via BAL.dis); consort "Nàng thích" known-likes row before "Nàng ghét" (learn by talk/spy/fitting gift). pcard-dislikes.js: ALL PASS at 6 sizes (old save loads).
- Q12: endArt() in j32 — every life-over card picks an approved ev-* picture; ev-quoc-tang only for Emperor-death endings; crown cards = ev-tan-phong. 12 endings mapped (table in PROGRESS); ending card seen at 844x390 and 1180x820 (picture arrives lazily from CDN, 5–15 s in this sandbox).

## Tests
dev/test/owner-answers-b.js (room button, 6 sizes: 0 page errors, 0 horizontal overflow) and owner-answers-b-probe.js (QB1/QB2/Q15/Q25/Q12 probes, 6 sizes, 0 page errors). Note: the probe's endPic flag uses a wrong selector (visual check done by screenshot instead).

## Limits / owner-visible notes
- Thái hậu dislikes are learnt only by a wrong gift/refusal for now (no talk/spy hook for her). Say if more is wanted.
- KIT REQUEST: none (kitRows, kitBackBtnHtml, kitSceneArt reused).
- Worktree deleted after push.

SẴN SÀNG KIỂM 011beb29b8ac8b5411868b55550b972fd752defa
