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

# COLLAR1 job 2 — legs/feet fit the pose (rule G23, 0 cr, 0 gens; ROOT-69 relay 20/11 ~08:07Z)
OWNER verbatim: "Sửa cái prompt, cái chân lại cho nó phù hợp đi."
- (1) store-all/build_all.py `pose_end(t,pose)` + `WALK_RX`: at t7/t8 a walking pose (walk / mid-step / step / stride / stroll) now ends "the robe hem swaying gently with her step"; a standing pose keeps "the robe falling still and straight"; t1–t6 endings unchanged. "still and straight" occurs only in pose_end; no other source.
- (2) "floor-length robe with slippers visible" → "floor-length robe, only slipper toe tips peeking under the hem": all 9 uses in t8-prompt-B/build.py, approved sentence S19 (same id; check_store.py + APPROVED_SENTENCES.md, with the owner verbatim and old text in its luot field). Feet placement ("feet natural under the skirt hem") is already in the kept natural-legs sentence, so the new words stay short (+24 chars) for the 10 000 limit.
- (3) natural-legs sentence untouched. G21 collar code, t4 Tần work and INNER_EMB untouched.
- Gate: check_store `walk_still_fails` (G23 WALK+STILL) FAILS when a walking pose and "still and straight" are in the same prompt (negative test: FAIL as expected).
- Test s62 + m29, t1/t4/t7 at a18 + a36: 11 PASS. s62 t4 a36 FAIL LEN only (10 047 chars). It was already 10 024 before this job, so the overflow pre-dates it (open, same as the a51/a65 LEN question). Store-args gate PASS for m29 t7 a18 and s62 t1 a36.
