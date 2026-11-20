# COLLAR1 — crossed collar t1/t2/t3 at a36/a51/a65 (builder only, 0 credits, 0 gens)
depth 4 · START_CTX ≈3 % · parent ROOT-69 (session_01PEhRbtpihbwZzz96xrzhyb)

OWNER verbatim (ROOT-67 chat, Lượt 1128): "Nếu như vậy á, thì là cái bậc thường tại đáp ứng và cả quý nhân luôn. Cái cổ áo từ 36, 51 và 65 tuổi á, là phải là cái cổ xéo kín đáo. Tức là cái cổ này là mình sẽ quay về cái prompt cũ của đáp ứng và thiền tại và thường tại trước khi mà làm cái cổ vuông, sau đó copy cái cổ này qua cho bên quý nhân."

## What changed (rule G21)
- dev/art/t8-prompt-B/build.py: `CROSSED_AGES` + `TIER_LOW_CROSSED`; `outfit_low123` uses them when AGE ∈ a36/a51/a65 and t ∈ {1,2}. Words = the pre-G17 TIER_LOW robe words (`git show aef86d9^:dev/art/t8-prompt-B/build.py`), copied exactly (grep-verified).
- dev/art/check_store.py: `G19_AGES`, `G19_T3_COLLAR`, `g15_t3_words(age)`; `g15_t3(text,main,sec,age)`; store_check's G15 gate reads `--age` and accepts the crossed-collar t3 at a36+.
- dev/art/store-all/build_all.py `_t3_slot`: passes the store AGE to g15_t3.
- A17 diff, t3 a36/a51/a65 only: "…never a simple wrap robe, ~~NO crossed wrap collar,~~ NO high-waisted…" and "with a ~~straight SQUARE NECKLINE~~ **modest snug crossed-collar neckline** framed by a wide stiff {sec} embroidered {motif} band". Nothing else.
- a18/a26 unchanged (G17 square t1/t2, G15 square t3). t4+ untouched.

## Collar words per age (s62 and m29 identical apart from colour/motif slots)
- a18: t1 "OPEN SQUARE NECKLINE (style 1, simple)" · t2 "OPEN SQUARE NECKLINE (style 1 cut, Thường tại edge)" · t3 "straight SQUARE NECKLINE framed by a wide stiff {sec} embroidered {motif} band"
- a36 / a51 / a65: t1 "a Tang-style TWO-PIECE ruqun: a snug crossed-collar upper garment with long wide flowing sleeves …" · t2 "a fine silk robe with delicate embroidered {motif} at the collar, sleeves and hem and a soft silk sash" · t3 "a modest snug crossed-collar neckline framed by a wide stiff {sec} embroidered {motif} band"

## Gate (build_all.py <p> <t> --age aNN; check_store <file> --scope tpN --age aNN)
- PASS: s62 t1–t3 a18 + a36; m29 t1–t3 a18 + a36; m29 t2 a51; m29 t1/t2 a65. Full store-args gate (G15 path) PASS for s62 t3 a36 and a18.
- FAIL — LEN only (prompt > 10 000 chars; no other FAIL line): s62 t1/t2/t3 a51 + a65 (10 033–10 868), m29 t1 a51 (10 086), m29 t3 a51 (10 482), m29 t3 a65 (10 304).
  PRE-EXISTING: before this change the same prompts were already longer (s62 t1 a51 10 694 → now 10 448; s62 t3 a51 10 881; s62 t1 a65 10 593; m29 t1 a51 10 332; m29 t3 a65 10 317). The collar change does not cause it. Not fixed here (A18: no word changes the owner did not ask for). OPEN QUESTION for ROOT-69: a51/a65 t1–t3 prompts need a length cut (owner/foreman decision) before any gen at those ages.

Rule id G21 (G19/G20 were taken upstream by SKINS + INNER LAYER while this ran; renumbered at merge).
