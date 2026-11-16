# review/owner-answers-b — coordinator answers (main s16, 12:55Z) applied to Foreman B's shipped work

## Base
review/owner-answers-b = latest origin/main (b85cdb1ef) + merged READY branches that are not on main yet:
review/nw-lantern-r1 (9696bc72), review/presentation-r1 (9ec1852a), review/pcard-dislikes-r1 (3b2e15ef).
Conflicts were only generated files (index.html, sw.js, assets.json: take main's, rebuilt) + assemble.py file list (unioned) + jbal2.js (both blocks kept).
On landing: merging these three first makes this branch a pure delta. Already on main: room-btn (C28), contest-ui (C34), succession-port (D32).

## Items
| Item | Result |
|---|---|
| QB1 lantern title | 'Trí khôi' -> 'Đăng khôi' was already in nw-lantern-r1 (jcui.js CU_KHOI.doden). Scan: 0 hits of "Trí khôi" in player text (only dev/art/pp4/titles.json art-prompt list, not shown). Formula Tài + Tâm cơ + Thi unchanged (j71 doden / j82 KG82_F). |
| QB2 sủng ái | KPG["sung-ai"] = {sfx favour, mus bgm-night, fx petal-peach x7} -> night music already used; painted FX: dramatic groups use kit FX / 8-particle bursts, ordinary groups none or <=6 particles (as now); Gọn setting starts none (presentation.js). No change needed. |
| Q6 room button | (a) icon-only only under 600 px (jk4.js rule that hid the label up to 999 px removed; jk3 @media 599 keeps it); label = tooltip/aria. (b) button now also on landscape/wide: jk3.js k3Shell creates it whenever she is alive, always visible in the two-page spread, in the one-page view only while away from the room home; jk4.js places it: two-row bar (.khd2) under the time block, one-row bar between menu and name. |
| Q15 contest titles | kcuHonorRows() (jcui.js) -> kit rows "Danh hiệu thi tài": Sổ ân thưởng (all, unchanged), her profile card selfCardHTML (j15 + srv j42 + kc jkc variants, newest 5), Mệnh truyện tab (panel67 wrapper in jcui.js, newest 5). Places before: 1; after: 4. |
| Q25 pcard-dislikes | jdis.js: Thái hậu has dislikes (S.thO.dis, pool arts + item kinds, never her own liked kinds; learnt by wrong gift/refusal; refused/penalty uses BAL.dis.aff/refAff on S.th; gift dialog warns once known); row "Người ghét" on the Thái hậu card (jpcf). Consorts: row "Nàng thích" (known likes) before "Nàng ghét", same kitRows; learnt by talking (BAL.dis.talk), spying fact, or an accepted fitting gift (S.likK). Old saves: all fields optional. |
| Q12 ending cards | j32.js endArt(): every life-over card gets an already-approved ev-* picture by ending (table END_ART); ev-quoc-tang only for Emperor-death endings (Thái phi / tuẫn táng / băng hà); crowning endings = ev-tan-phong; j3.js crown card = ev-tan-phong. No new art. Mapping tested for 12 endings. |

## Tests (node dev/test/owner-answers-b.js / owner-answers-b-probe.js; pcard-dislikes.js; presentation.js)
See reports/owner-answers-b.md on the docs branch. KIT: no new kit part (kitRows, kitBackBtnHtml, kitSceneArt reused).
