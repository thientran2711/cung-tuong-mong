# RANK8-A — s62 (Dịu dàng, ice blue + mint mist) 8 ranks t1–t8 — PREP ONLY, BLOCKED
START_CTX ≈3 % of 1M (estimate; get_session read 0) · depth 3 (limit 8) · worker of Foreman C ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD)
Brief dev/handover/briefs/rank8-L1078.md. ROOT-68 HOLD (07:2xZ): "NO GENS … prep only (0 cr) … wait for my GO". **0 gens, 0 credits.**

## 1. s62 has NO rank pictures — VERIFIED
- gen_ledger.jsonl (2859 lines): s62 appears only in the F4 face line (OWNER-OK 07:25Z, s62 ov6PVaf829→nVsrRMPYQD). No rank gen.
- t8-prompt-B/build.py has no s62 row (see 2), so no builder rank prompt for s62 can ever have been made.
- Game files: no s62 path outside dev/ (index.html / bgm hits are base64 noise).
- s62 is in FACE_MAP_L703.json / FACE_CUTS_L703.json (face only, v5, cut nVsrRMPYQD) and s_root_colours.json (ice blue #71B5D7 + mint mist #CDF2E0, root season đông).

## 2. BLOCKER — the rank builder cannot build s62 (B6/B7)
`python3 dev/art/t8-prompt-B/build.py s62 --low 1 v0 --spec5pose --age a18` →
`build_low: pal,face=DATA[c] … KeyError: 's62'`. DATA has 93 keys (c01–c32, m01–m52, p01–p03, nc/bd), **no s-id at all** (s07–s65 none).
So: no t1–t8 prompt, no check_store gate run possible. A painter may not hand-type or patch the builder (B6: "a missing wording → Foreman C adds").

### What Foreman C needs to add (proposal, NOT applied) — same pattern as PRINCESS_ROWS (build.py ~l.1036–1042)
- DATA["s62"]=("ice blue and mint mist", <face words or "" = face from her ref image nVsrRMPYQD>)
- ORIG1["s62"]=("ice blue silk like #71B5D7","mint mist like #CDF2E0") · M_COLS row · LOWNAME
- MOTIF_LOW["s62"]=(motif, ONE hair flower) — needs a pick (unique vs Dịu dàng people, E12)
- ITEMS_LOW["s62"]=items3f("s62") (check: F16 no fruit, F15 no earrings auto via EAR_SENT, pets per FRUITPET1 rules — in contact, ages 18–26, none t7/t8)
- OUTFIT_JOBS s62-t4..t6 via _g3["outfit"]
- t7 / t8 paths (B17 three colours = royal yellow #EFBD69 + main + secondary verbatim) — check they read the same rows
- kc_drawn / KC_ID regex (`(?:c|m|p)\d\d|nc\d|bd\d`) does not match s-ids → the B8 face-word path and the "not drawn → refuse" guard are skipped; decide if s-ids need it
- check_store.py `--pid s62` for rank scope (it already reads s_root_colours.json for B20 roots at face scope; rank scope untested for s-ids)
- Season colours (P6 toned A32 + A31): palettes_season(_deep).json have NO s62 entry (P6 left s62–s65 out; FRUITPET1 is making "s62–s65 other 3 season pairs"). Only the root pair exists. Brief asks for "root pair + season colours exactly as the builder applies them" → needs FRUITPET1's output wired first, or a ruling that ranks use the root pair only.
- coverage.py / BUILDER_COVERAGE.md has no s-id section (B7: must be green first).

## 3. Cost (when unblocked)
8 pictures × ~138 cr ≈ **1 104 cr** (t1–t8, a18, 1 try each). Sheet = 0 cr (local PIL compose with big labels A27). Balance not checked (no gens).

## 4. Next (on GO + builder rows added)
build t1–t8 → check_store PASS ×8 → ledger --log → 8 gens → look full size → one labelled sheet → push → send_message ROOT-68.

## Handover
Not needed (context ≈ low). Waiting for ROOT-68.

## 5. DRAWN (owner GO via ROOT-68) — 8 gens × 135 cr = 1 080 cr
Builder rows by RANK8-C (c51c37e / fbb5797). Prompts = `python3 dev/art/store-all/build_all.py s62 N` (a18) → dev/art/rank8-s62/s62_tN.txt, verbatim, no diff (A17: none).
Gate: `check_store.py dev/art/rank8-s62/s62_tN.txt s62 --low N|--t7|(t8) v0 --spec5pose` → STORE CHECK PASS + approved_check PASS ×8; build_all --check no s62 error.
Gen: gpt-2-6 1024x2304 2k seed 7172, no transparentBackground; refs t1–t5 = her face cut nVsrRMPYQD; t6–t8 + royal-yellow swatch TdwDfOyVNR. Ledger: 8 RANK8 lines.
| t | rank | gen | item |
|---|---|---|---|
| 1 | Đáp ứng | mEZiZ8ShJQ | folded flower-paper letter |
| 2 | Thường tại | 9ZHuqIGNYZ | embroidered sachet |
| 3 | Quý nhân | vQARGIUa47 | tú cầu with bells |
| 4 | Tần | SyhIap2Ub8 | silver-mounted book box |
| 5 | Phi | xSBe8KVjfW | pipa |
| 6 | Quý phi | 1ldDonjr4r | pearl-tasselled lantern |
| 7 | Hoàng quý phi | nVsxSZNYQD | jade flute (no pet) |
| 8 | Hoàng hậu | KLpVBAXkqp | gold phoenix hairpin |
Sheet (A27 labels big on image): dev/handover/review-sheets/rank8-s62/s62_t1-t8_sheet.webp · singles s62_tN_a18.webp (opaque bg, no remove_bg).
Credits: 83 922 before → 81 222 after (pool shared with RANK8-B/C running at the same time; mine = 1 080).

## 6. Looked (full sheet + face crops) — notes only, NO redraw
- All 8: face same girl, eyes straight, mouth closed, no teeth, no earrings, no forehead mark, one item each, ice blue + mint mist clear, ranks rise in luxury. No fruit, no pet.
- t1/t2 hairpin pearl dangles hang near the ear — read as hairpin, not earrings, but close.
- t3 square neckline came out soft; apron panel + jade pendants ok.
- t4 capelet + pearl net ok; the book box is purple (contrast ok).
- t5 cloud collar has two embroidered birds (motif, not a pet).
- t6 hair flower is a blue peony (close to robe colour; F13 size ok). Yellow sash/panel visible.
- t7 yellow areas larger than t6, crown phoenix ok, no flower. Frontal.
- t8 yellow dominant, nine-phoenix crown; item hairpin held at chest.
- "Place" label = "Hậu cung" (no per-rank palace name in the builder) — tell me if a palace name per rank is wanted.

## 7. OWNER TEST "cổ vuông" t1/t2 (ROOT-68 urgent) — 2 gens × 135 = 270 cr, builder NOT changed
t3 store sentence (kept): "…court robe with a straight SQUARE NECKLINE framed by a wide stiff {S} embroidered {mot} band".
NEW t1 (replaces "a snug crossed-collar upper garment with long wide flowing sleeves"): "a snug upper garment with an OPEN SQUARE NECKLINE (style 1, simple): a low, simple straight-edged square opening that shows her neck and collarbones, edged only by a narrow plain {S} silk band with no embroidery on it; never a round collar, never a V, NO crossed wrap collar; with long wide flowing sleeves"
NEW t2 (replaces "a fine silk robe with delicate embroidered {mot} at the collar, sleeves and hem"): "a fine silk robe with an OPEN SQUARE NECKLINE (style 2, wide and shallow): a broad, shallow square opening stretching out toward the shoulders that shows her neck and collarbones, its edge a LAYERED border of two stacked bands, a thin {S} piping inside and a wider band of small embroidered {mot} outside; never a round collar, never a V, NO crossed wrap collar; delicate embroidered {mot} at the sleeves and hem"
Sent same wording to RANK8-B + RANK8-C. Test prompts dev/art/rank8-s62/test-square/s62_t{1,2}_sq.txt; gate: full store FAIL only on the swapped sentence (expected), --scope tp1/tp2 --age a18 PASS.
Gens xSBeugTjfW (t1), nVsx9M3YQD (t2). Sheet dev/handover/review-sheets/rank8-s62/s62_THU_covuong_t1-t2-t3.webp.
Looked: both square, open, no round, no V, no cross collar. t1 = deep, low square (shows upper chest a bit — may be too low for the owner); band reads ice blue not clearly mint. t2 = wide shallow square with embroidered band — but close to t3's look (t3 adds stiff mint band + girdle + apron). Not redrawn.

## 8. G17 into the builder (owner verdict: kiểu 1 OK, kiểu 2 "rộng quá … muốn tuột xuống") — 0 cr
- t8-prompt-B/build.py TIER_LOW (shared t1–t3 store, used by EVERY person's t1/t2): t1 "crossed-collar upper garment" → "upper garment with an OPEN SQUARE NECKLINE (style 1, simple) … narrow plain {sec} silk band …"; t2 "delicate embroidered {motif} at the collar, sleeves and hem" → same style-1 neckline + "delicate embroidered {motif} at the sleeves and hem" (rest of t2 robe kept). outfit_low123 now formats sec = secondary colour name. t3, t4+ untouched.
- Gate: check_store STORE CHECK PASS s62/s64/s65 × t1/t2; m05 t2 PASS (band = her secondary "teal"). Outputs: dev/art/rank8-s62/g17/.
- Rule G17 added (rule.py add, owner verbatim).
- Note: this changes t1/t2 prompts for ALL people (c/m/p/s) at their next gen; already-drawn pictures untouched (no redraw).
- Note: s62 t1/t3/t4 builder output also differs from my drawn prompts in the ANGLE sentence — that is an upstream commit (not mine).

## 9. G17 clarification + 1 new t2 test (owner GO) — 1 gen, 135 cr
- build.py TIER_LOW t2: "OPEN SQUARE NECKLINE (style 1 cut, Thường tại edge): the SAME low, simple, narrow straight-edged square opening as the lowest rank (NOT wide, NOT stretched toward the shoulders) … its edge a LAYERED border of two stacked narrow bands, a thin {sec} piping inside and a narrow band of small embroidered {motif} outside …". t1 unchanged (plain band). G17 updated with the owner's clarification verbatim.
- Gate STORE CHECK PASS s62/s64/s65 t2 (dev/art/rank8-s62/g17/).
- Gen 8ai9BR2IrU. Sheet dev/handover/review-sheets/rank8-s62/s62_THU_covuong2_t1-t2.webp (t1 đã OK | t2 THỬ MỚI).
- Looked: t2 square is the same narrow size as t1 (not wide), edge = thin mint piping + plum-blossom band; rest of t2 outfit as before. Face ok, mouth closed, no earrings.

## 10. TEST cổ vuông t4 Tần / t5 Phi / t6 Quý phi (owner) — 3 gens, 405 cr, builder untouched
Test prompts dev/art/rank8-s62/test-square456/s62_t{4,5,6}_sq.txt (= current builder output + one neckline phrase). Approved gate --scope tp4/5/6 --age a18 PASS (t4 shortened to stay < 10 000 chars).
- t4 Tần: ", a crossed collar," → ", a SQUARE NECKLINE (Tần, more covered): a small, high square opening at the base of the throat, collarbones covered, edged with a stiff embroidered band; never round, never a V, NO crossed wrap collar,"
- t5 Phi: + "with a SQUARE COLLAR (Phi style, closed and covered): a high square-cut collar whose small square front frames the base of the neck, the neck covered up to the throat by a {S} inner collar, the square edged with a DOUBLE band of gold brocade; never round/V/cross"
- t6 Quý phi: + "with a SQUARE STANDING COLLAR (Quý phi style, the most covered): a stiff upright collar with SQUARE corners closing high around the neck, only a very narrow square notch at the front of the throat, edged with plain gold brocade (no pearls, no fringe, no tassels on the collar); never round/V/cross"
Gens eIPOIm2dqL / UPvmPCKwny / 79fvNG6JAL. Sheet dev/handover/review-sheets/rank8-s62/s62_THU_covuong_t4-t5-t6.webp.
Looked (honest): t4 = small square neckline visible in the capelet opening under the jade clasp — reads square. t5 = closed mint stand collar under the cloud collar; the SQUARE does NOT read (looks like a mandarin stand collar). t6 = stand collar with squared top corners; square weak, reads mostly as a stand collar. Coverage rises t4 → t6 as asked. No redraw.

## 11. JOB 1 SKINS (0 cr)
15 pictures kept as skins: s62/s64/s65/m29/m19 t1+t2 old crossed collar (10) + square tests s62 t2 kiểu 2, s64 t1/t2, s65 t1/t2 (5). Not skins: s62 t1 kiểu 1 (approved) and s62 t2 covuong2 (new). Copies in dev/handover/review-sheets/skins-1120/ (s64 + square-test files fetched from Magnific, 0 cr; others copied from repo; webp). SKINS.md section "20/11 t1/t2 new-girl outfits", 15 ledger rows kind SKIN-1120, rule added (owner verbatim). Nothing deleted.
