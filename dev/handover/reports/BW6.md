# BW6 — ROOT-54 jobs (E12 same-rank fix, then Sắc sảo mass on GO)
depth 7 · START_CTX ≈ 4 % (get_session used_tokens read 0; own estimate) · coordinator ROOT-54 session_01PEhRbwzgZmC7Bj99eCHvUz

## TASK 1 — SAME-RANK FIX (owner Lượt 650, E12; ruling (b)) — DONE, no gens
- `dev/art/t8-prompt-B/build.py`
  - L3F[1..6], ITEMS7, ITEMS, TH_ITEMS: +15 items each IN PLACE (3 per age), *_AGE dicts → 8 indices per age (first 5 unchanged). Max 8 items of one kind per age over t1–t8 (needed for E6 inside a group of 8). No text duplicates in any list.
  - `_E6_KINDS` + whistle, needle case, pouch.
  - `look_groups()` (reads face-common/LOOK_GROUPS.md, m ids only), `group_slot(c)`, `_group_items(group, age)` (Kőnig edge-colouring rank × kind, 8 colours), `_e6_picks` uses it for group members (slot < 8); others: old order + the 3 new items as last options. `th_index(c, age)` for Thái hậu.
  - ANG14 entries 8/12 rewritten (were duplicates of 5/1) from approved words (_TA_NF + MAMA_ANGLE).
- `dev/art/store-all/build_all.py`: angle_sentence / grace_sentence take the age (plan(age), was plan("a18")); plan() overrides angle + grace for look-group members (`group_angles` backtracking, `group_grace` Latin square), poses untouched; thaihau() uses store th_index; `_E12_GATE` in check_all.
- `dev/art/store-all/same_rank_audit.py` (new, re-runnable audit).
- E11 updated with rule.py set (5 → 8 per age, 40 per rank; Lượt 650 (19/11)).
- Numbers + gates: `dev/handover/reports/same-rank-audit.md` section "E12 SAME-RANK FIX — BEFORE / AFTER". Sắc sảo and Tinh nghịch: item / angle / grace now 8 different in 40/40 cells (before: items avg 4.6 distinct, up to 4 people sharing one item; angle sentence up to 3; grace up to 3; angle class up to 3–5 per class).
- Notes / not done:
  - Nữ đế list (NUDE_LIST) and maid / ma ma AGE5 lists are still 5 per age (no m look-group member has a Nữ đế rank; E11 line says so).
  - 9-person old groups (Tươi tắn, Dịu dàng, Trong trẻo, Đoan trang): 8 items / 8 grace lines for 9 people → one unavoidable repeat; gate cap 2 there.
  - The prompts of every look-group person changed (items/angle/grace). E12 = new gens only; already-drawn pictures stay.
  - BW5 handover order "flower-name size words" (A21 small fix) was not in my brief; NOT done (e.g. build.py MAID_FLOWER still has "a tiny camellia").
  - Partial clone: many files carry git skip-worktree ("S"); before editing a file run `git update-index --no-skip-worktree <file>` or git will not see the change.

## TASK 2 — Sắc sảo mass: waiting for ROOT-54 "GO".

## HANDOVER line
(open)
