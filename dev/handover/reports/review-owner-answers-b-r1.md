# review-owner-answers-b-r1 (reviewer sonnet, 11/16/2026)
PASS 07f84484ade29fb2b79873dc57c0d597cbc6096a  (review/owner-answers-b-r1; descends from origin/main e9c6021d)

## Merge
review/owner-answers-b 011beb29 merged onto latest origin/main e9c6021d (merge-train-6). Conflicts only in assemble.py (file list), jbal2.js (BAL.dis already on main -> kept once), jevban.js (KIT_DLGMAP: main map incl. "cyrep" + branch's "thắp đèn" wording), generated index.html/sw.js (site rebuilt, 0 markers).
The branch carries review/nw-lantern-r1 (jlant.js), review/presentation-r1 (jpres.js) and review/pcard-dislikes-r1 (already on main via merge-train); all merged cleanly, none duplicated. Fast-forwarding this branch lands nw-lantern + presentation + owner-answers-b together.

## Verified (6 sizes, 0 page errors, 0 horizontal overflow)
- QB1: CU_KHOI.doden = "Đăng khôi", 0 "Trí khôi" in the built game; lantern.js oracle run 10/10, no errors.
- QB2: KPG["sung-ai"] mus bgm-night + painted petal FX; presentation.js 755x1000@2 ok.
- Q6: room button icon-only <600 px (30x30, label = tooltip + aria), 91x30 at 755, 103x36 at >=1000/844; inside header at all sizes; shown on landscape. Uses kit kitBackBtnHtml (no private chip).
- Q15: "Danh hiệu thi tài" kit row on profile card, Mệnh truyện, Sổ ân thưởng.
- Q25: pcard-dislikes.js ALL PASS (old save loads); Thái hậu "Người ghét", consort "Nàng thích" row before "Nàng ghét"; shots of consort and Emperor cards seen at 755/1366.
- Q12: all 11 ev-* pictures exist on CDN; 12 endings mapped; ev-quoc-tang only for Thái phi / tuẫn táng / băng hà; crown = ev-tan-phong; ending cards seen at 755x1000 and 1180x820 (picture shows).
- Kit-first: no private CSS beyond the room-button positioning rules on the kit back button; no per-place variants found.

## Notes (non-blocking)
- 390x844 shows the rotate prompt (as designed); header there is cramped under the prompt, unsupported size.
- Room-button icon arrives lazily from CDN (slow in sandbox); label fallback exists only when the icon fails to load.
- Thái hậu dislikes are learnt only via wrong gift (worker's own note).
