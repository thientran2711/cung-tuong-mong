# LADDER1 — t1–t3 common prompt + 8-tier outer-robe audit (owner Lượt 1580)
depth 5 · START_CTX ~4 % (used_tokens read 0; estimate) · 0 gens · 0 prompt edits (A39: waiting for owner)
Sheet (LOOKED): dev/handover/review-sheets/ladder_outer_L1580/sheet.jpg (existing pictures only, 10 × 135 cr already spent).

## 0. FIRST — owner L1581 "Thường tại set must change (looks Tang/Đường); I ran your prompt on ChatGPT, said OK — why still this prompt?"
Trail (FOREMAN_C_STATUS.md 625–643, dev/art/dapung4/):
- ~17:25Z 20/11 (L1235): foreman logged "Đáp ứng current = Tang-like" → 4 NEW **t1** designs dapung4/s62_t1_dapung_mau1–4 (short crossed jacket / Song beizi / Han one-piece / half-sleeve over-jacket). No verbatim of this owner message is stored anywhere (grep FG, OD, status, briefs, reports).
- L1239: v1 rejected (maid-like); v2 dapung4/s62_t1_dapung_v2_mau1–4 → ~17:52Z ALL REJECTED ("không có cái nào đạt hết trơn").
- ~17:58Z: "Đáp ứng = copy Thường tại, simplify" → s62_t1_tu_thuongtai_A–D (L1242).
- ~18:00Z owner: **"Tao có đề cập gì tới đáp ứng à?"** → the redesign was put on the WRONG RANK (voice: she most likely meant Thường tại all along). H13 voided.
- ~18:10Z: she ran **mẫu C** (dapung4/s62_t1_tu_thuongtai_C.txt = the Thường tại design, simplified) on ChatGPT: liked ONLY its COLLAR (inner square-neck top + open outer robe); embroidery too sparse. → that collar went into t2/t3 (s62_t2_thuongtai_COMOI, s62_t3_quynhan_COMOI, L1245) and t1 (DESIGN1 JOB 5, L1253) → lineage COMOI_v2 → v2c → v2d = the thu final.
- So the final t2 DOES carry the one thing she OK'd (collar), but the body was never redesigned: still TIER_LOW t2 "robe … soft silk sash"; GPT draws it as a chest-high skirt tied with a bow (row B t2 on the sheet = Tang ruqun look). TIER_LOW t1 literally says "a Tang-style TWO-PIECE ruqun".
- No non-Tang t2 design with her OK exists in the repo; her ChatGPT picture is not saved (review-sheets/owner-chatgpt has only Hán t6/t8). No builder took any t2 redesign because none was approved — only the collar.
- Ask her: which picture did she OK (ChatGPT history screenshot)? If it was mẫu C, the "OK" was for the collar only (status L1245).

## 1. Which t1–t3 common prompt she approved
- The ONLY t1–t3 common prompt with an owner approval = the STORE/builder `TIER_LOW` in dev/art/t8-prompt-B/build.py:684 (golden_low / store-all build_all.py use it):
  - owner 18/11 ~22:45Z (FIGURE_GATE.md:102): "cái prompt cũ … ta đã ưng rồi … sản xuất ra hàng loạt là ta không hề complain";
  - G17 neckline APPROVED 20/11 ~07:58Z: "Rồi thường tại ổn nha, rồi tiến hành copy cái prompt này cho tất cả mọi người đi." (tests s62 t1 xSBeugTjfW, t2 8ai9BR2IrU);
  - t3 = G15 option B (owner Lượt 559) + G39 hairpins (L1568).
- The thu "COMOI" t1–t3 (layered neckline + open outer robe) was only "LIKES its collar" (L1245 on ChatGPT mẫu C) and "ỔN" in the L1552 status table — never "duyệt".
- Approved words (TIER_LOW):
  - t1: "a Tang-style TWO-PIECE ruqun: a snug upper garment with an OPEN SQUARE NECKLINE … over a long softly pleated skirt tied high above the waist at the chest with a broad ribbon band … wide embroidered {motif} hem band, **small sprays of embroidered {motif} on the upper garment**"
  - t2: "a fine silk robe with an OPEN SQUARE NECKLINE (… LAYERED border …); **delicate embroidered {motif} at the sleeves and hem** and a soft silk sash"
  - t3 (G15B): square neckline with a wide band + girdle + APRON PANEL + jade pendant sets.

## 2. Thu finals t1–t3 vs the approved prompt (outfit sentences only)
| sentence | approved TIER_LOW | thu final (dapung4 t1 v2d / t2 v2d / t3 v2e) | who added it |
|---|---|---|---|
| neckline | one garment, square neck | "LAYERED NECKLINE … fitted blush INNER top … OVER it the light plum outer robe (t1: upper garment) worn OPEN at the front …" | COMOI (L1245 / L1361 thu ladder) |
| body embroidery | t1 "small sprays … on the upper garment"; t2 "delicate … at the sleeves and hem" | + "the robe body **densely embroidered ALL OVER** (not only the borders) with **many** small-size spring flowers spread over the **whole garment**, clearly more embroidery than any palace maid" | DESIGN17 make_thu_L1574.py (CHECK1 fault list, H6/H12) |
| t3 fabric | G15 "wide stiff … brocade girdle" | "wide soft blush silk girdle" | L1574 (B29) |
| t3 pose | — | "adjusting a hairpin set in her hair with one raised empty hand" | L1574 (F18) |

**Why the embroidery is too dense:** the DENSE sentence is copied from seasons4/make_han_bac.py (the XUÂN HÁN t4 base), not from the thu t4 prompt. H6 (Lượt 492) says t1–t3 density = "the Tần (t4) density", but the THU t4 Tần prompt (thu_comoi/s62_t4_THU_COMOIc) has only "WIDE gold-thread embroidered borders … + a few LARGE flowers" (G22) — no all-over sentence; t5/t6 thu also = borders + "richly embroidered". So t1–t3 now carry the strongest density sentence of the whole thu ladder → t1–t3 look busier than t4–t6 (sheet rows B vs C). It conflicts with the approved TIER_LOW ("small sprays" / "delicate at sleeves and hem"). Rule conflict to settle: H6 + H12 (owner 20/11 ~17:40Z "mật độ thêu rất là ít … một hai cái hoa") vs approved TIER_LOW — row A pictures are the approved level.

## 3. Outer robe: OUTSIDE or TUCKED in the sash — per tier
rule.py: NO rule exists (searched "tucked", "outer robe", "sash", "đai lưng"). Nearest: G38 (thu t4 COMOI) "the outer robe closes only at the sash, never at the throat" (the t4 picture still shows it outside).

THU (s62, current files) — pictures looked at full size:
| tier | file | result | sentence that causes it |
|---|---|---|---|
| t1 | dapung4/s62_t1_COMOI_v2d | **TUCKED** (ribbon band wraps over the plum upper garment) | "a Tang-style TWO-PIECE ruqun … OVER it the light plum upper garment worn OPEN … over a long softly pleated skirt tied high above the waist at the chest with a broad ribbon band" (ruqun = top tucked into the skirt) |
| t2 | dapung4/s62_t2_COMOI_v2d | OUTSIDE | "the light plum outer robe worn OPEN at the front … straight down each side" + only "a soft silk sash" (no position) |
| t3 | dapung4/s62_t3_COMOI_v2e | **TUCKED** (girdle over the robe) | "an ankle-length light plum silk court robe … OVER it the … outer robe worn OPEN … ; a wide soft blush silk girdle at the natural waist, from which hangs … APRON PANEL" (G15B) |
| t4 | thu_comoi/s62_t4_THU_COMOIc | OUTSIDE in picture | "worn OPEN at the front … falling from both shoulders" vs G38 "the outer robe closes only at the sash" (mixed words) |
| t5 | thu_comoi/s62_t5_THU_COMOIc | OUTSIDE | "outer robe worn OPEN … straight down each side of the chest" |
| t6 | thu_comoi/s62_t6_THU_COMOId | OUTSIDE | same + "a yellow inner robe panel, a yellow sash" |
| t7 | thu_comoi/s62_t7_THU_COMOI_v8c | OUTSIDE (pics L1383 s62 + L1402 m02) | same OPEN sentence + "a wide yellow sash … inner panel" |
| t8 | thu_comoi/s62_t8_THU_COMOI_v10c | OUTSIDE (pic L1394 v2) | same OPEN sentence + "a jade-and-gold belt" |

XUÂN HÁN (seasons4, latest t1–t3 _v2, t4 open5c, t5 open3c, t6 open5c, t7 open8c, t8 open11c): all 8 = wrapped/straight robe CLOSED by the sash/belt ("cross high above the sash" t1–t3; "cross only LOW at the sash" + "closes only by its wrap and belt/sash" t4–t8) → consistent (no separate open outer robe). Đông winter1 s62 t1–t8: no open outer robe sentence at all (store design) → not affected.

**Thu breaks consistency at t1 and t3 only.**

## 4. Owner picks once
- **Option 1 — ALL 8 OUTSIDE (recommended: fewest changes).** Already liked: t5 Phi DUYỆT L1334, t7 HQP "rất đẹp" L1383, t8 HH v2 "ổn nhất" L1394, t2/t4/t6 thu ỔN (L1552 table). Fix = t1 + t3 wording only (outer robe hangs loose outside the band/girdle; the band/girdle ties only the inner skirt/robe) + G38 t4 wording.
- **Option 2 — ALL 8 TUCKED the same way.** Liked examples: xuân Hán t4–t6 ỔN (Hán wrap robe closed by the sash), thu t1/t3 finals. Fix = thu t2, t4, t5 (DUYỆT prompt), t6, t7, t8 = 6 prompts.
- Density: (a) back to approved TIER_LOW level (row A) for t1–t3, or (b) keep "richer than maids" but below the thu t4 level — cut the "densely … ALL OVER … many … whole garment" sentence either way? Owner decides; H6/H12 rule text then needs her update (foreman's rule.py).
- Xuân Hán t1–t3 v2 drafts (held): same density sentence (make_han_xuan_t13 copies DENSE) → same answer applies.

Open: sheet label t1 row B slightly clipped ("dải buộc ngực"). No commit of prompts.

## JOB 2 — owner L1590 (density) + L1592 (G40 outer robe HELD IN by the sash; L1592 reversed L1590's "outside") — 0 gens, A39
- An "outside" version was built first and never pushed; it was replaced by this one after Foreman C's L1592 message (rebase kept Foreman's G40 text).
- Shared clause `master_common.OUTER_IN`: "the outer robe's open front edges fall from the shoulders and are HELD IN by the sash, girdle or ribbon band tied OVER the outer robe, so the outer robe hugs the body, never a loose open coat hanging outside the sash".
- Rules: G40 (Foreman, L1592) + "WIRED" note; H6 / H12 L1590 ruling appended (t1–t3 embroidery = common TIER_LOW words only; DENSE never on t1–t3).
- check_store OUT1 (every scope): FAIL = outer robe hangs/falls/worn outside the sash; WARN = "outer robe worn OPEN at the front" without OUTER_IN. Tested FAIL path. --self: same 2 old PROOF MISMATCH (S14, S19) as before my change.
- Thu `dapung4/make_thu_L1590.py` → s62_t1_COMOI_v2e, s62_t2_COMOI_v2e, s62_t3_COMOI_v2f: DENSE → OUTER_IN (same spot). t2 BODY untouched (DESIGN18 = mẫu C next).
- Xuân Hán `seasons4/make_han_xuan_t13.py` → s62_t{1,2,3}_HAN_BAC_v3: DENSE → OUTER_IN; COLLAR CUT "the robe closes only by its wrap and sash" → "the outer robe is held in only by the sash" (contradiction gone); collar crossing above the sash kept (L1577 liked). 9476 / 9682 / 9975 chars (A38 trim list, 8 items).
- Gates: check_store --scope tpN --age a22 STORE+APPROVED PASS ×6, no OUT1 warn; keep_check sidecars ×6 (cuts = DENSE pieces + the closes-by-wrap phrase); keep_check --all 244 PASS.

### Next job (LIST only) — G40 breakers
- thu t4–t8 (`thu_comoi/s62_t4_THU_COMOIc`, `t5_COMOIc`, `t6_COMOId`, `t7_v8c`, `t8_v10c`): "outer robe worn OPEN at the front … straight down each side", no held-in clause; pictures show the robe outside → OUT1 WARN ×5. t4 also has the S13_COMOI "closes only at the sash" (fits G40, keep).
- xuân Hán t4–t8 (open5c/open3c/open5c/open8c/open11c): wrap crossing low at the sash = already held in → OK.
- đông dong_hientai t4 "closes only at the sash" = OK under G40.

## JOB 3 — G40 clause into thu t4/t6/t7/t8 (Foreman C #14 order after L1596; t5 = KHO2) — 0 gens
- `master_common.OUTER_IN` SHORTENED (t6/t7/t8 sit at the 10 000 limit with only outfit words left, A38): now "the outer robe HELD IN by the sash or girdle tied OVER it, hugging the body, never a loose open coat" (100 chars). Xuân t1–t3 _v3 rebuilt with it (9456 / 9662 / 9955, fewer trims). The thu t1–t3 v2e/v2f (DESIGN18's now) still carry the older long wording; DESIGN18 copies the constant.
- `thu_comoi/make_thu_g40_L1596.py` puts the clause right after the "outer robe worn OPEN at the front …;" clause:
  t4 COMOIc→**COMOId** (9958, no trim) · t6 COMOId→**COMOIe** (9970, A38 trims: never a pair / never in profile / Everyone beautiful… / never copy anything but its colour) · t7 v8c→**v8d** (9917, trim: Full-body… boilerplate).
- **t8 v10c NOT built:** with the clause it is 10 073 chars, every A38 trim is already used, and only owner outfit words are left, so it is 39 over even at PROMPT_MAX 10 000. **Needs your/owner call on what to shorten.**
- Gates: t4 d / t6 e STORE+APPROVED PASS, no OUT1 warn. t7 v8d FAILS with exactly the 3 faults its base v8c already had (G23 walk+still, E1 angle, S19 tail; listed in COLORFIX1.md:74). Under A39 these were not touched, so t7 is not gen-ready until they are fixed. keep_check --all 247 PASS.
