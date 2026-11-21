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

## JOB 2 — owner L1590 DUYỆT applied (0 gens, A39 only these 2 changes)
Owner L1590: "Ok, áo ngoài của kiểu 1 là để ngoài hết cho 8 bậc rồi, ok, duyệt." + density = the common prompt.
- **Rule G40** (rule.py add) OUTER ROBE OUTSIDE THE SASH, all 8 tiers; shared clause `master_common.OUTER_OUT`:
  "the outer robe hangs OPEN and loose OUTSIDE the sash, girdle or ribbon band, straight down to the hem, never tucked in, never belted or tied under it, the sash, girdle or ribbon band tying ONLY the inner garment".
- **H6 / H12** (rule.py set): L1590 ruling appended — t1–t3 embroidery = common TIER_LOW words only; make_han_bac.DENSE never on t1–t3.
- **check_store OUT1** (check_text, every scope): FAIL = outer robe/garment/layer + tucked / under or inside the sash/girdle/belt; WARN = "closes only at/by … sash/belt" or "cross only LOW / high above (at) the sash". Tested: "outer robe is tucked into the sash" → FAIL.
- **Thu** `dapung4/make_thu_L1590.py` → s62_t1_COMOI_v2e, s62_t2_COMOI_v2e, s62_t3_COMOI_v2f: DENSE sentence replaced by OUTER_OUT (same spot in the Outfit). t2 body untouched (DESIGN18 next).
- **Xuân Hán** `seasons4/make_han_xuan_t13.py` → s62_t{1,2,3}_HAN_BAC_v3: DENSE → OUTER_OUT; collar "curve down to cross high above the sash" → "fall softly down the front WITHOUT crossing"; COLLAR CUT "the robe closes only by its wrap and sash" → "the outer robe is never closed, wrapped or buttoned down the front" (contradiction gone). Lengths 9501 / 9707 / 10000.
- Gates: check_store --scope tpN --age a22 APPROVED+STORE PASS ×6 (no OUT1 warn); keep_check sidecars ×6 PASS (cuts = exactly the DENSE pieces + the 2 collar phrases); keep_check --all 244 PASS.

### Still breaking G40 (LIST ONLY, next job)
- thu t4 `thu_comoi/s62_t4_THU_COMOIc` + check_store **S13_COMOI** gate sentence: "the outer robe closes only at the sash" (WARN). Changing it needs the S13_COMOI gate form changed too.
- xuân Hán t4–t8 (`seasons4/s62_t4_HAN_BAC_open5c`, `t5_open3c`, `t6_open5c`, `t7_open8c`, `t8_open11c`): "edges … cross only LOW at the sash" (+ t4 "closes only by its wrap and belt") = wrap robe closed at the sash → WARN ×5.
- đông `dong_hientai/s62_t4_DONG_HIENTAI*.txt` (9 files): "closes only at the sash".
- thu t5–t8: no tuck wording, pictures already outside; they do not carry OUTER_OUT yet (add for "same sentence for everyone" when next touched).
- 51 .txt files in total hit OUT1 (old versions in seasons4 / thu_comoi / dong_hientai); scan: `out1_fails` in check_store.py.
