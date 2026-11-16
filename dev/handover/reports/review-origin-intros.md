SẴN SÀNG KIỂM 30b37ea0598dc53fa7565e2ede2feef9f81661e0 (origin/main 2e9615fb is an ancestor; depends on review/kc-roads-cn-nc-fix-r1 3dba018d, merge that first)


# review/origin-intros — ORIGIN INTROS (Foreman C worker, opus) — 16/11

Task (Foreman C brief, s19 STORY ROADS SPLIT: C = ORIGIN INTROS): for EVERY origin (tt, dtq, muoi, cn, nc + bd branch, td, ch, thd, cnv)
(1) narrated intro with 3–4 painted panels, (2) entry animation palace gate → selection hall, (3) tuyển tú minigame deciding the entry rank
(ceiling only, patronage, reason on the result card, hòa thân = welcome audience, cung nữ = cung nữ selection); co-op OD:L1288; old saves load.
Owner lines: OD:L1244, L1250, L1251, L1259, L1261, L1267, L1288 (dev/rules/topic/story-roads.md). Plan: dev/STORY_ROADS_PLAN.md "Origin intros".
START_CTX ≈ 3 % of the window (get_session read 0; own estimate).

## LUẬT ƯU TIÊN SỐ 1 — what already existed (reused, not rebuilt)
- **review/entry-exam-r1** (Foreman D worker, reviewer PASS, not on main): `jentry.js` = the selection exam for every road (one art round in the
  kg82 frame, ONE score rule `entBase` / `BAL.entry`, ceiling / −1 / −2, gain and loss `BAL.entry.fx`, no word games), ONE "Tiền truyện" card
  with the origin painting, the entry scene `kitPersonReveal` after "Nhập cung". It ships inside **review/kc-roads-cn-nc-fix-r1** (home roads
  for cn/nc/bd/cnv + mg-balance + entry-exam; reviewer r1 FAIL on the "Chờ 3 năm" value — being fixed on that branch, not here).
- `jkc.js` tiểu thư road: Sơ tuyển → Phúc tuyển (exam frame) → Điện tuyển (kcScore, rank 0..2).
- No road map from Foreman B yet (dev/story/ROAD_MAP.md absent on main and on the docs branch at 16:00Z); nothing here depends on chapter order.
- review/story14-p1-r2: NOT merged (not needed: the intro runs before chapter 1 and touches no chapter code).

**Base**: origin/main 5682ce6f + merge of review/kc-roads-cn-nc-fix-r1 3dba018d (assemble: main's list + jmgt after j91, jkc2 + jentry after
jkc). **Merge order for main: review/kc-roads-cn-nc-fix(-rN) first, then this branch.** If that branch changes again, this branch re-merges it.

## What this branch adds (`dev/build/joi.js`, last module; small edits in jentry.js, jkc.js, jbal2.js)
1. **Narrated intro, 3–4 panels per origin** — jentry's single "Tiền truyện" card is replaced by a sequence of KIT §14 scene panels
   (`kitPanel({scene:true,kind:"notice"})`, header "Tiền truyện · <origin>", sub "n/N"), each with ONE picture in the §28.17 picture frame
   (`kitSceneArt(img/intro/<k>-<n>.webp, caption, {shape:"wide", fb: §59 placeholder by kitPhTone})`) and one narrated paragraph; the last
   panel adds `kitTiles` (Xuất thân · Cao nhất kỳ này · Sắp qua / Rồi sẽ qua · Xét theo). Buttons "Tiếp theo" … last "Vào cung" (cnv "Theo ma ma").
   - "Vào cung ngay": 4 panels (her world · the conflict that sends her · the summons · the road to the gate) → the selection.
   - Home road (tiểu thư, thôn quê, cố quốc): 3 panels (1, 2, h3 "why she waits") → the home road's own first card (it keeps jentry's painting).
     td home has its own pair (family still alive, kc-lore) h1/h2.
   - Story first (OD:L1259): each origin's panels name its real stake (father's power, the treaty, the salt money, the frame-up and the live
     `S.foe` / `S.foeDad` of this life for td, Thái hậu's hairpin for ch, the Emperor's name). Narrator says "ngươi" like every story card
     (the game's own text pass renders it as "ta" on screen).
2. **Reason on every result card** — a "Vì sao" row (kitRows) on the "Nhập cung" / "Nhập cung làm cung nữ" card and in the log, from HER score:
   the part furthest above / below an ordinary new girl (`BAL.entry.why.ref`) weighted by the road's own `BAL.entry.w`, in the words of that
   road's judges: "Hoàng thượng để mắt tới dung mạo của ngươi", "Thái hậu khen ngươi đoan trang, biết lễ", "Thái hậu nói giúp ngươi một lời"
   (patronage), "Hoàng hậu chê ngươi chưa thuộc lễ" (only when a Hoàng hậu lives), "Màn Múa của ngươi làm cả điện lặng đi / vấp váp trước điện",
   ma ma words on the cung nữ road, "Thái hậu vốn không ưa người ngoại tộc" / "lời tâu của sứ thần" on hòa thân. Ceiling: what lifted her;
   one step under: what lifted her + "nhưng" what held her back; bottom: what held her back. A round she did not play is never praised or blamed.
   All roads: direct (kc2SelDo), cung nữ / hòa thân home (kc2Enter), tiểu thư Điện tuyển (kcDien → kcEnter card, or the returned-tablet card).
3. **The selection named for its road** — hòa thân direct (nc, bd) = **"Lễ ra mắt"** (Điện Thái Hòa, bá quan, the envoy outside; judges
   "Hoàng thượng, Thái hậu, bá quan, sứ thần"); cn = **"Xét phong danh phận"** (Từ Ninh cung, Thái hậu looks at the maid the Emperor kept);
   cnv keeps "Tuyển cung nữ"; consorts "Tuyển chọn". The exam frame header reads the same name (jentry kg82Open art label = entCtx head).
4. **ONE CORE fix found on the way** — jkc `kcScore` (tiểu thư Điện tuyển) had its weights typed by hand; now `BAL.entry.w.kc` (same values,
   no rule change). Still typed in jkc (flagged, not changed: the way bonus 6, ch th +15, origin r ×4, KC.cut) — entry-exam report Q4.
5. **Entry animation seam** — `oiGate()` calls `window.kitEntryGate({kind, origin, road, to})` once per life right before the first in-palace
   selection card of her road (direct: after the last intro panel; tiểu thư: Phúc tuyển / early Điện tuyển; hòa thân home: Lễ ra mắt;
   cung nữ home: the entry card). The part does not exist → nothing plays; jentry's kitPersonReveal entry scene still closes the entry. KIT REQUEST below.
- New lives only (`S.oiV`); saves without it are untouched. Co-op: her own Q cards only (no sync, nobody waits; OD:L1288).

## KIT REQUEST (stop on this part; coordinator → kit keeper)
**K-OI-1 `kitEntryGate(o)` — entry animation "palace gate → selection hall" (OD:L1244; same request as entry-intro.md #1, still unbuilt).**
A kmStage scene (KIT §81 end button, Gọn / reduced motion = final frame) with painted layers: (1) the red palace gate (Ngọ môn) closed, the
doors swing open (two door layers slide/rotate), (2) her procession passes through and the camera pans along the vermilion walls of the inner
court (2 painted path frames cross-fading with a slow Ken-Burns pan), (3) the selection hall interior fades in, (4) end button with the
selection's name (`o.to`: "Tuyển chọn", "Lễ ra mắt", "Xét phong danh phận", "Tuyển cung nữ", "Phúc tuyển"). Variants `o.kind`:
`consort` (red sedan + eunuchs), `bride` (bridal sedan + envoy banners; bd adds horses held outside the gate), `maid` (a line of maids behind
a mama, side gate), `corridor` (cn: no gate — the Càn Thanh corridor at dawn to Từ Ninh cung). §68 effects: petals (consort / bride), dust
motes, `glow-gold` on the hall. Budget ≤ ~250 KB per centre picture. Caller is ready (joi.js oiGate); it plays as soon as the part is registered.
Art for it = ART LIST rows G1–G7.

## ART LIST FOR FOREMAN C (Magnific gpt-2-6 only, style per dev/art/OWNER_ART_RULES.md + STYLE_ANCHOR; sample to the owner first)
Format: landscape 16:9, **1280x720 WebP ≤ 250 KB**, CDN `img/intro/<key>.webp` (cdn_sync.py; never git). The panel frame is §28.17
`kitSceneArt` shape wide (16:9) inside the §14 scene panel; keep the subject inside the centre band so the KIT-size LL banner crop
(full width × 200/260 at 562/860 px, ≈ 3:1) still reads. Until a key exists the §59 event placeholder shows (light/dark by kitPhTone).
People: she is seen from behind / three-quarter back or small in the scene; no clear faces anywhere in intimate scenes (marked ◆);
everyone fair, serene, adult, nobody poor-looking, men never pink/purple, calm poses, no flying sleeves; no blood, no bodies.
| key | origin · road | scene (what the painting shows) | cast |
|---|---|---|---|
| tt-1 | Tể tướng · both | the Chancellor's mansion at night, east of the capital: lanterns along a long gallery, officials' silhouettes waiting in the courtyard | officials (small, backs) |
| tt-2 | Tể tướng · both | an audience hall in the morning: a young Emperor on the dais far away, ministers in rows, one minister in front (her father) | Emperor (tiny, far), ministers (backs) |
| tt-3 | Tể tướng · direct | a study: the father's hand on his daughter's shoulder, a yellow edict on the desk | father (36–50), her (back / three-quarter) |
| tt-4 | Tể tướng · direct | dawn at the mansion gate: a small red sedan leaving, the mother at the gate holding back tears | mother (36–50, no tears shown), bearers |
| tt-h3 | Tể tướng · home | her boudoir: zither, books, embroidery frame, a window on a plum tree in spring | her (back) |
| dtq-1 | Tướng quân · both | border camp at dusk: drill field, war drums, banners, a girl on horseback in riding clothes | her (small, riding) |
| dtq-2 | Tướng quân · both | a general's tent: a map table, a sword, a red cord tying a jade token | none / still life |
| dtq-3 | Tướng quân · direct | a letter with a war seal on a lacquer table beside a folded riding coat | still life |
| dtq-4 | Tướng quân · direct | she in brocade steps into a sedan; riding boots left by the door; a groom holds her horse | her (back), groom |
| dtq-h3 | Tướng quân · home | courtyard: a mother watches her daughter at the zither, a bow on the wall | mother, her (three-quarter back) |
| muoi-1 | Buôn muối · both | salt boats at a southern river landing: sacks, scales, warehouses | workers (small) |
| muoi-2 | Buôn muối · both | a rich merchant hall: silk bolts, silver ingots, whispering guests behind fans | guests (small) |
| muoi-3 | Buôn muối · direct | three iron-bound silver chests loaded on a sedan, the father beside them | father, servants |
| muoi-4 | Buôn muối · direct | the sedan in a market street, people pointing; the red palace wall rising behind | crowd (small) |
| muoi-h3 | Buôn muối · home | a tutor teaching her calligraphy in a fine study | tutor (51+), her (back) |
| cn-1 | Cung nữ được sủng hạnh | Càn Thanh cung tea room: a tea tray, the second steeping poured, eunuchs passing outside the lattice | maids (backs) |
| cn-2 ◆ | Cung nữ được sủng hạnh | a rainy night: rain on the lattice of the Emperor's study, a lamp, two shadows on a paper screen (fully clothed, no faces) | silhouettes only |
| cn-3 | Cung nữ được sủng hạnh | a eunuch reads an oral decree in a corridor; maids kneel | eunuch (36–50), maids (backs) |
| cn-4 | Cung nữ được sủng hạnh | the long red corridor at dawn toward Từ Ninh cung; she walks without a tray | her (back) |
| nc-1 | Hòa thân · Nam Chiếu · both | Nhĩ Hải lake, the three white pagodas, camellias in bloom | none |
| nc-2 | Hòa thân · Nam Chiếu · both | the treaty signing in a Nam Chiếu hall: two envoys, a sealed scroll | envoys |
| nc-3 | Hòa thân · Nam Chiếu · direct | the envoy procession camped at night on a mountain road; a dried camellia in her sleeve | her (back), envoy guards |
| nc-4 | Hòa thân · Nam Chiếu · direct | the vast capital of Đại Hy seen from the procession; ritual officials waiting at the gate | officials (small) |
| nc-h3 | Hòa thân · Nam Chiếu · home | a Nam Chiếu palace room: a Đại Hy tutor teaches court etiquette, books in Han script | tutor, her (back) |
| bd-1 | Hòa thân · Bắc Địch · both | steppe at sunset, a herd of horses, felt tents, a girl riding | her (small, riding) |
| bd-2 | Hòa thân · Bắc Địch · both | three hundred horses driven toward the border fort; banners of both sides | riders (small) |
| bd-3 | Hòa thân · Bắc Địch · direct | inside a felt tent: Đại Hy court ladies hold out brocade robes and embroidered shoes; her braids being loosened | court ladies, her (back) |
| bd-4 | Hòa thân · Bắc Địch · direct | the horses halted outside the city wall; a bridal sedan waiting | riders, bearers |
| bd-h3 | Hòa thân · Bắc Địch · home | a hearth in a felt tent at night, a book of Đại Hy script open by the fire | her (back) |
| td-1 | Tội thần · direct | the sealed mansion gate at night: torches, a paper seal across the doors (no blood, no bodies) | guards (small) |
| td-2 | Tội thần · direct | a memorial on a desk under lamplight; a minister's hand with the brush (the accuser), face out of frame | hand only |
| td-3 | Tội thần · direct | an old family friend crossing out a name in the draft register by candlelight | friend (51+) |
| td-4 | Tội thần · direct | she alone at the palace side gate at dawn, head lowered | her (back) |
| td-h1 | Tội thần · home | the Thị lang's household at a family dinner, a little brother laughing | family (small, warm light) |
| td-h2 | Tội thần · home | two officials whispering in a dark court corridor | officials (backs) |
| td-h3 | Tội thần · home | the family courtyard in late autumn, a falling leaf, the gate still open | none |
| ch-1 | Cháu gái Thái hậu · both | the garden path of Từ Ninh cung, a small girl's hand in an elder lady's | hands / backs |
| ch-2 | Cháu gái Thái hậu · both | the Thái hậu (51+) seated, seen from behind a screen, looking toward the Emperor's palace | Thái hậu (back) |
| ch-3 | Cháu gái Thái hậu · direct | a jade hairpin on red silk in an open box, a sealed note beside it | still life |
| ch-4 | Cháu gái Thái hậu · direct | a sedan passing under Ngọ môn | bearers |
| ch-h3 | Cháu gái Thái hậu · home | her family garden; a lady-in-waiting from Từ Ninh cung bringing a message | lady-in-waiting, her (back) |
| thd-1 | Thầy đồ nghèo · both | a thatched house with old bookshelves, rain leaking into a basin | none |
| thd-2 | Thầy đồ nghèo · both | a county magistrate reading a poem scroll, impressed | magistrate (36–50) |
| thd-3 | Thầy đồ nghèo · direct | the father hands her a hand-copied book and her best (clean, modest) robe | father (51+), her (back) |
| thd-4 | Thầy đồ nghèo · direct | a Nội vụ phủ boat on the river at dawn, the capital walls ahead | boatmen (small) |
| thd-h3 | Thầy đồ nghèo · home | village children at low desks, she teaching (seen from behind) | children (well dressed, not poor-looking), her (back) |
| cnv-1 | Cung nữ tuyển vào cung · both | the village hall: the draft list posted, girls in line, a eunuch with a register | girls (backs), eunuch |
| cnv-2 | Cung nữ tuyển vào cung · both | a lamp-lit village house at night, a mother sewing a bundle | mother (36–50, serene) |
| cnv-3 | Cung nữ tuyển vào cung · direct | morning farewell at the village gate, a cloth bundle handed over | mother, her (back) |
| cnv-4 | Cung nữ tuyển vào cung · direct | the rear gate of the palace: a cart of girls, a mama with a register | mama (36–50), girls (backs) |
| cnv-h3 | Cung nữ tuyển vào cung · home | a village courtyard: she embroiders under a tree | her (three-quarter back) |
| G1 | entry animation (K-OI-1) | Ngọ môn, doors CLOSED, morning (separate door layers if possible) | none |
| G2 | entry animation | Ngọ môn, doors OPEN, a red sedan entering | bearers |
| G3 | entry animation | inner court path between vermilion walls (2 frames for the pan) | eunuchs (small) |
| G4 | entry animation | the selection hall (Điện tuyển tú / Trữ Tú cung) interior, empty dais (reuse ev-tuyen-tu if it fits) | none |
| G5 | entry animation · bride | bridal sedan + envoy banners at Ngọ môn; bd: horses held outside | envoys, riders |
| G6 | entry animation · maid | the side gate: maids in line behind a mama | maids (backs), mama |
| G7 | entry animation · corridor | Càn Thanh corridor at dawn toward Từ Ninh cung | none |
Total: 51 intro panels + 7 animation pictures. Suggested sample for the owner first: tt-1..4 (direct set) + cn-2 (the ◆ rule) + G1.

## Chapter list + ETA (for main s19 / Foreman B)
The intro is not a chapter: it plays before chapter 1 ("Nhập cung, đứng vững") of the 14-chapter frame and hands over to it unchanged.
| unit | state | ETA |
|---|---|---|
| intro text, 10 origin keys (9 origins + bd branch), both roads | DONE (this branch) | — |
| reason row on every entry result (4 roads) | DONE | — |
| selection named per road (Lễ ra mắt / Xét phong danh phận) | DONE | — |
| 51 intro pictures + 7 gate pictures | ART LIST above → Foreman C art workers | sample tt set ~1 h after approval, rest ~3–4 h |
| entry animation `kitEntryGate` | KIT REQUEST K-OI-1 → kit keeper | caller ready; plays once registered |

## Tests (final build, merged origin/main 2e9615fb, local server, ONE browser at a time, 0 page errors everywhere)
| test | size | result |
|---|---|---|
| origin-intros/flow.js direct, 10 origin keys | 755x1000 | logic 10/10 OK; 3 runs flagged only "placeholder picture not shown" (CDN through the proxy, timing) |
| same | 1180x820 | 10/10 PASS |
| flow.js road=nha, 9 home-road origins | 755x1000 | 9/9 logic OK (2 picture-timing flags) |
| origin-intros/oldsave.js (old main build → this build: nc, muoi home, cnv) | 755x1000 | PASS 3/3 |
| entry-exam/direct.js (tt, nc) | 755x1000 | PASS 2/2 (run singly; the test now clicks through every intro panel, `entI` or `oiP` — it expected the old single card; two runs lost the browser to CPU timeout, re-run passed) |
| kc-roads/coop-together.js (live Worker) | Fold+iPad | 26/26 |
| coop-e2e.js (live Worker) | Fold+iPad | 58/59; the one FAIL = WebSocket handshake 502 from the live Worker/proxy (infra, not game code) |
| host mode (device.js openHost) fold 755x1000, ipadAir 1180x820 | | intro panel 1/4 shown, no overflow, 0 errors |
Not run: 1366x1024 (not asked in this round).
Dependency: ships AFTER review/kc-roads-cn-nc-fix-r1 (3dba018d is in this branch); origin/main is an ancestor.

## HANDOVER (16:55Z, worker rolled over at ~33 % context — Foreman C opens the successor)
Done: everything in "What this branch adds", ART LIST, KIT REQUEST K-OI-1, tests above. Last two fixes (placeholder at once via kitPhOnCdn;
"Thái hậu" kept capital after "nhưng"; cung nữ tier-1 line "chưa đủ để được chia về hầu phi tần bậc cao") are built + committed but not re-tested.
Left: (1) re-run flow.js direct at 755x1000 + 1180x820 + 1366x1024 and road=nha at 755x1000, ONE browser at a time (parallel runs time out
the local server); (2) coop-together.js + coop-e2e.js; (3) rebuild site after any re-merge of review/kc-roads-cn-nc-fix-rN; (4) write
'SẴN SÀNG KIỂM <full sha>' at the top of this file and report to Foreman C.
Branch review/origin-intros (worktree /home/user/wt/oi, sparse). Code: dev/build/joi.js (all of this task), jentry.js (one line: exam
frame label), jkc.js kcScore (reads BAL.entry.w.kc), jbal2.js (BAL.entry.w.kc, BAL.entry.why). Test: dev/test/origin-intros/flow.js
`<url> <WxH> <shotdir|-> <origins> <cung|nha>`. Open: art (Foreman C), K-OI-1 (kit keeper); re-merge review/kc-roads-cn-nc-fix-rN when it moves.
