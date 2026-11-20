# RANK8-C — s65 (Đoan trang, jade + peach cream) — 8 RANKS DRAWN
depth 3 · START_CTX ≈ 4 % (context_usage read 0; own estimate) · worker for Foreman C ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD)

## 1. Check: no rank pictures for s65 before this
The ledger only had the face (gen jUoeq99LD0 → cut jUoe5yJLD0) and its OWNER-OK (Lượt 1046). No s-id was in the rank builder, the store or KC_REFS.

## 2. Builder change (commit c51c37e, owner GO via ROOT-68) — new people s62 s64 s65, DATA ROWS ONLY
- t8-prompt-B/build.py: `S_NEW_ROWS` loop, done the same way as the princess N8b rows. Colours = face-common/s_root_colours.json. Motif = from each person's approved face outfit (s62 plum blossoms, s64 lilies of the valley, s65 chrysanthemums). Hair flower = maid rule MAID_FLOWER[n%6]. ITEMS_LOW = items3f; OUTFIT_JOBS t4–t6 = _g3. SPEC5_IDS = maid index rule. KC_ID regex now also takes `s\d\d`. No store sentence touched.
- store-all/build_all.py:
  - `S_NEW` appended LAST to PEOPLE, so everyone else's plan is unchanged (m04 t3, m52 t8, p02 t5 byte-identical).
  - PET BAN (owner rule: no pet at t7 HQP / t8 HH): `PET_RX` added to the t7/t8 pose filter for the new people, and a PET GATE in `gate()` (exit 1).
  - Grammar fix "held in the hand in one/both hand(s)" → "held in …", new people only.
- KC_REFS.json: s62 s64 s65 entries (ref = FACE_MAP cut; face_words = "Her face"+"Expression" VERBATIM from sNN.v5.FULL.txt).
- Check: all 24 prompts (3 people × 8) STORE CHECK PASS + build_all.check() 0 errors; no pet at t7/t8.

## 3. Gens — s65 t1–t8, 1 try each, gate PASS right before (A19)
gpt-2-6 1024x2304 2k seed 7172. Refs: t1–t5 jUoe5yJLD0; t6–t8 + royal swatch TdwDfOyVNR. All logged in the ledger (kind RANK8).
| t | rank | gen | item |
|---|---|---|---|
| 1 | Đáp ứng | u5Wzn36QLD | swallow kite |
| 2 | Thường tại | iG5Hb2f3uK | pipa |
| 3 | Quý nhân | 9ZHuFupNYZ | painted scroll |
| 4 | Tần | N2qQqAg6D9 | jade butterfly hairpin |
| 5 | Phi | xSBeBpdjfW | gilded flower basket |
| 6 | Quý phi | kseMdjO16B | pearl-silk poetry book |
| 7 | Hoàng quý phi | xSBeoMDjfW | tú cầu silk ball (NO pet) |
| 8 | Hoàng hậu | aFGZnE6fSh | gold phoenix seal box |
Credits: 8 × 135 = **1 080 cr**. Balance 84 462 → ≈83 382.
Sheet: `dev/art/rank8-s65/s65_8bac_sheet.jpg` (labels ON the image: tN · rank · s65 · Đoan trang · place). The place line says "chưa xếp cung" because no palace is assigned to her yet.

## 4. Looked at full size (A11/A22) — notes only, NO redraw (A20/A21)
- OK: same face at all 8 ranks; mouth closed, no teeth, no earrings, eyes level; jade + peach cream at every rank; royal yellow grows t6 → t8 (t8 yellow dominant); one hair flower t1–t6 growing in size, none at t7/t8; hair loose t1–t3, up t4–t8; no pet; no fruit.
- (n1) The camellia reads like a peony (pink / peach big bloom).
- (n2) t4 and t5: one gold hairpin points sideways (rule: upward/backward).
- (n3) t1 kite floats free on its string from the reel (fine); t7 is a "dance step, twirling one long sleeve" at HQP — calm but lively for t7.
- (b, left as is per ROOT-68) Đoan trang gets lively t1–t3 poses, from the maid index trait (thamvong).
- c02 t8 and c13 t7 still get a songbird pose (old people; pet ban not applied to them) — note for ROOT-68.

## 5. Transparent cut-outs (owner URGENT via ROOT-68) — 8 × 3 cr = 24 cr
`dev/art/rank8-s65/cut/s65_t1_cut.png … s65_t8_cut.png`: RGBA. The figure stays at native 1024×2304 with no rescale; a 220 px label band is added on top (canvas 1024×2524, strip "tN · rank · s65 · Đoan trang · chưa xếp cung").
Tool: images_remove_background on each gen (cuts tCR6YKWmZJ cpSsPhc0eP O6Ea5cAynm N2qQxpJ6D9 iG5HLXb3uK yiufKMxPW9 aFGZTUTfSh bxM0oig5Y2). Ledger: kind RANK8-CUT.
Checked on a dark background, overview + 1:1 zooms: hair strands clean, gauze sleeves/shawl keep partial transparency (semi-alpha 0.6–4.8 % of pixels), kite string + crown tassels kept, no parchment halo.
NEXT: when RANK8-A/B finish → one combined transparent image per rank of s62/s64/s65 side by side (labels).

## 6. Combined per rank s62 | s64 | s65 (transparent) — 16 cuts × 3 cr = 48 cr
`dev/art/rank8-trio/trio_t1_s62_s64_s65.png … trio_t8_…png`: 3072×2648 RGBA. Each girl stays at native 1024×2304, side by side. Labels: a big rank strip ("tN · rank · 3 người mới · chưa xếp cung") and one strip per girl ("sNN · group"). Cuts of the RANK8-A/B gens logged in the ledger (kind RANK8-CUT). Checked on a dark background: clean.
