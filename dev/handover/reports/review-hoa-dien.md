# review-hoa-dien r1 — report (reviewer session_01N1tNP4LhhQaE7j3FQW5NGV, opus BIG)

PRIORITY #1 CHECK: OD L152/L1104/L1451 (huadian art rules) + L1255/L1266 (mg medium, top grade 20–30 %) + OD tail '(17/11 ~17:30Z real' + '(17/11 ~17:45Z real' + 17:10Z Thử tay (read verbatim) | main j92.js:76 'Hoa điền bạc khảm lưu ly' (moved into slot hd, no duplicate: 8 rows, one per P) | review/* review/hoa-dien fa483a8ed on review/makeup-lux 7c6ef2fda | claims B worker session_01N1tNP6SdCcvsQaB11nruyu.
START_CTX ~5 % (1M window); finished well under the rollover line.

## VERDICT: **PASS review/hoa-dien-r1 67b18b1e** (stacked on makeup-lux 7c6ef2fda; NOT fast-forwardable to main until makeup-lux lands — land makeup-lux first, then this; main has moved to e503c53e, merge happens through makeup-lux as the worker noted).

## Reviewer fixes on review/hoa-dien-r1 (2 commits on fa483a8ed)
1. **5478f7e2 — difficulty was too easy (OD:L1255/L1266 violated).** Bot spread on the placing board (Thử tay kind, real pointer events, house human error model of dev/measure/mg-bots.js: oracle aim + drag scatter N(0, .018·board·.8), tilt taps to nearest 3°), Vừa = ease 2 (BAL.mgTier.mid, kAdj 0):
   | tolD | careful top grade (≥9) | careful ≥7 | note |
   |---|---|---|---|
   | .45 (worker) | **70 %** (n=80) | 100 % | ease 3 (the makeup step's mkLv): 80 % |
   | .38 | 63 % | 99 % | |
   | .32 | 44 % | 93 % | |
   | .28 | 38 % (5 faces, n=240) | ~90 % | |
   | **.24 (chosen)** | **26 % (4 faces, n=160)** | 86 % | sloppy 1 %, random 0 %, idle (tap Dán only) 0 % (raw ~1.3) |
   → `BAL.hd.tolD .45 → .24`; `BAL.hd.mkLv 3 → 2` (the makeup step played at Vừa = BAL.mgTier.mid, like Thử tay at matching level).
   Faces differ a lot (eye distance 90–120 px on Fold): single-face runs scatter ±12 points; always pool several new games.
   **RE-MEASURE when Foreman C ships clean foreheads**: today the painted hoa điền sits exactly on the anchor (oracle = reality). With an invisible target ("careful-noOracleY": height judged by eye ±.12 eye distance) top grade is 30 % at .45 but 8 % at .24–.28 → after clean art tolD should go back up (~.40). Script: /home/user/wt/rv-hd-tools/hd-bots.js (scratch; ask me/B to commit it as dev/measure/hd-bots.js if wanted).
2. **5478f7e2 — invisible sticker.** 7 of the 8 hoa điền have no picture (img/hd-<key>.webp 404 AND img/wd-hd-*.webp 404) → the board drew NOTHING to drag for hd_mai/hd_dao/hd_diep/hd_lan/hd_sen/hd_maudon/hd_phuong (worker test only used hoadien_bac). `hdImg` now falls back hd-<key> → own icon → wd-hoadien-bac (the one painting that exists). Checked in page: all 8 load (256 px). Bag/shop still show no picture for the 7 (pending C art request, as reported).
3. 67b18b1e — site build (build_site.sh).

## Checks (brief items)
1. Item: ONE j92 table, slot hd, 8 tiers P1..P8, flowers/leaf/butterfly/phoenix names only; old jewelry item moved (no duplicate); never worn (wdWear/wdWearEntry refuse; no Cài button); sources shop/NPC hold→gift/found/+1 per promotion — OK. Old saves: worn hoa điền → chest, default trâm back (test + world30 fixture) — OK.
2. Placing: real relative drag + tilt buttons, scored by real distance/tilt, NOT snapped (sloppy 1 %, random/idle 0 %); a miss counts (q .119 in test); no clock in the makeup step. Note: in Thử tay the kg82Play guard (97.5 s → raw 0) still applies to every kind — a 1.5-min fiddler would get 0; minor, family-wide (kg82Play), not this delta.
3. NPC/rival/auto-bot/mesh-timeout: hdNpc hashed per person per day, cap .95, mgHand when ag-all-2 lands — OK (q from hand, like other kinds).
4. Xa xỉ only via toilMkLux → luxTotal; luxParts.hd is a share of mk — OK. Minor: the result card's "Xa xỉ son phấn" chip shows only the makeup level's xa xỉ (e.g. 8), not +33 of the hoa điền (picker shows "xa xỉ 33"); the total is right. Suggest a later kit row, not blocking.
5. Thử tay: KG82_KIND.hoadien passes the mgCalKinds filter — OK.
6. Art: painted hoa điền not hidden (C silent) — nothing breaks; code-drawn sprites none.
7. Kit: picker = kg82Btn, result = kit rows; no private CSS in delta. VANPHONG: no %, cổ trang words.
Design note for B (not FAIL): weights are normalised, so a badly placed hoa điền LOWERS the score vs "Không dán" (owner: "đặt không khớp thì nó vẫn được tính"); fine by her words, but she may expect a miss never to hurt — ask only if she complains.

## Tests (build 67b18b1e unless noted; served with a utf-8 static server — plain `python3 -m http.server` breaks dev/index.html: no meta charset)
| test | result |
|---|---|
| hoa-dien.js Fold 755x1000@2 mouse / TOUCH / iPad 1180x820@2 TOUCH (fa483a8ed) | 29/29 · 29/29 · 29/29 |
| hoa-dien.js Fold TOUCH after the fixes | ALL OK (on anchor q .999, miss q .119) |
| toilette · makeup-lux · luxury | OK · OK · all PASS |
| minigames.js hoadien,chai | exit 0, no overflow |
| coop-toil-look | 29/29 |
| coop-e2e | run 1 56/63 (Fold stuck on "Điềm báo"/"Danh hiệu mới" modals, unrelated), run 2 **63/63** → flake |
| one-core-guard / text / text-rule / bind | PASS / PASS / PASS / PASS (inline 4948 ≤ baseline 4957) |
| quickcheck.sh | open 1521 ms · old save OK · perf ≈ live · time-spill PASS · core gates: **ONLY G1 "frozen list 3843→4957"** = inherited from makeup-lux's one-core-baseline.json (hoa-dien does not touch it); rules-one-source + kit-conform inside coregates raised nothing else |
| LOOKED | Fold pick / place / result, iPad result rows: buttons fit, face in the glass, no overflow. (The mirror's right half shows the beige fill where the portrait ends — same on base makeup flow, not this delta.) |
Shots: scratch only (/home/user/wt/rv-hd-shots, deleted); nothing on the CDN review folder.
