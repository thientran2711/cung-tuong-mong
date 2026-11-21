# MAIDP4 — G43: maids wear no jade pendant, a fragrant sachet (túi thơm) instead (owner L1608). 0 gens.
depth 5 · START_CTX ~3 % (used_tokens read 0; estimate). Coordinator: Foreman C #14 session_01D3E3NauaLGHu8gXNd9siaj.
Owner L1608 verbatim: "Sửa lại là cung nữ là sẽ không có đeo ngọc bội, nhưng mà đổi lại thì cung nữ có thể đeo túi thơm nha." (rule G43). A39: only this change.

## Source fixes (future builds follow G43)
1. `dev/art/maid7/make7_gpt.py` — new G43 block: `G43_SACHET`, `G43_SWAPS` (3 pendant phrases → sachet), `g43(t)` (apply to ANY maid text, asserts no jade pendant left), `g43_job()`, job `g43_all`. Run: `python3 dev/art/maid7/make7_gpt.py g43_all`.
2. `dev/art/t8-prompt-B/build.py` — build_maid tm1 (tam đẳng), tm2 (nhị đẳng) and build_mama: pendant → sachet (+ G43 comment above MAMA_DRAWN). tm0 thô sử already says "no jade" (unchanged); tm3 chưởng sự / tm4 nữ quan had no pendant. NOTE: m01 ma ma (MAMA_DRAWN, approved) is no longer byte-identical when rebuilt — only the sachet words differ.
3. `dev/art/check_store.py` — new check G43 in check_text (every scope): a maid prompt (subject "A … palace maid", "cung nu/nữ", "A palace ma ma", "chuong su co co"/"chưởng sự", "mistress of servants", or --scope mama) containing "jade pendant / jade or tassel pendant / jade disc / ngọc bội" = FAIL. Consort lines like "finer than a palace maid's" do NOT trigger it (case-sensitive subject match; scan of all repo .txt prompts: 0 consort hits). 4 self-test cases added (pass; the 2 old PROOF MISMATCH S14/S19 problems were already there).

## New CURRENT maid ChatGPT files (dev/art/maid7/gpt/, each + .keep; keep_check --sidecar PASS ×10)
| old → new | words lost → added |
|---|---|
| tamdang_gpt → tamdang_gpt_v2 | "jade or tassel pendant;" → "embroidered silk fragrant sachet (túi thơm) hanging from it;" |
| tamdang_thancan_gpt_v3 → _v4 | same |
| nhi_gpt_v2 → nhi_gpt_v3 | "jade pendant" → "small embroidered silk fragrant sachet (túi thơm) hanging from it" (on a silk cord kept) |
| nhi_thancan_gpt_v3 → _v4 | same |
| nhat_gpt_v6 → nhat_gpt_v7 | "jade pendant" → "small embroidered silk fragrant sachet (túi thơm)" (on a silk cord with a tassel … centre between the two panels kept) |
| nhat_thancan_gpt_v3 → _v4, thancan_gpt_v4 → _v5, chuongsu_gpt_v4 → _v5 | same as nhất |
| mama_gpt_v4_a51/_a65 → mama_gpt_v6_a51/_a65 (v5 = SUPERSEDED, skipped) | same as nhất |
Word diff (difflib) checked: nothing else changed. All ≤ 9 794 chars. Jade HAIRPINS ("gold, jade and pearl hairpins") and the colour word "deep dark jade" are not pendants → kept (A39).
Gate: check_store --scope mama: old files now FAIL G43, new files have no G43 (other S01/S32/S19 fails = known scope noise, same as before). build.py m05 tm1/tm2/mama: same FAIL set before/after, no G43. keep_check --all: 269 sidecars PASS.

## Approved (DUYỆT L1352) maid pictures that SHOW a jade pendant — no redraw (A20/A21)
Looked at each (512 px):
- Tdw9BE8VNR — tam đẳng round 3 (m18): round green jade disc + long tassel at the sash. YES.
- dt4ZloSXSL — nhị đẳng v5 (m18): jade disc + tassel below the sash. YES.
- ov6GUhR829 — nhất đẳng v5 (m18): jade disc + pink tassel at the centre. YES.
- hu2cFrpvqL — thô sử round 3: prompt says "no jade" → not opened, none expected.
- Not checked: the approved ma ma m01 (MAMA_DRAWN in build.py; gen id not found quickly) — its prompt had the jade pendant, so most likely YES.
Also the gen_L1512 local pictures (tam/nhi/nhat/chuongsu, owner "ok", not duyệt) were made from pendant prompts — not opened.

## Open
- Old live/test maid texts (maid7/live_tm1/live_tm2/live_mama, test*, design1/, thancan1/) still contain the pendant and now FAIL G43 if reused — left as history.
- NHI2_TWO_TA question from MAIDP3 still unanswered.
