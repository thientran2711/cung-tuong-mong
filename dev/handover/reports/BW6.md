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
  - Groups bigger than 8 (old 9-person groups, or a bigger group from the owner's regrouping tick page, LOOK_GROUPS.md 'Chia lại nhóm' Lượt 673–680): member i takes slot i % 8 → items/grace repeat only ceil(n/8); angles all different up to 14, class ≤ 2 up to 10 (e12_caps). Tested with fake groups of 8/9/10/14/16.
  - LOOK_GROUPS parser reads only lines that START with an m id (the new 'Chia lại nhóm' note says 'm01–m52' and was first read as 2 members). When the owner's tick-page result is written into LOOK_GROUPS.md, the plans follow it automatically (prompts of moved people change).
  - The prompts of every look-group person changed (items/angle/grace). E12 = new gens only; already-drawn pictures stay.
  - BW5 handover order "flower-name size words" (A21 small fix) was not in my brief; NOT done (e.g. build.py MAID_FLOWER still has "a tiny camellia").
  - Partial clone: many files carry git skip-worktree ("S"); before editing a file run `git update-index --no-skip-worktree <file>` or git will not see the change.

## TASK 2 — Sắc sảo mass: waiting for ROOT-54 "GO".

## HANDOVER line
BW6 TASK 1 done + reported to ROOT-54 (commits 0ee0570, 04df4ae; head e439ed0). Context ≈ 20 %. TASK 2 waits for ROOT-54 GO (flag: upstream c626007 "owner stop on Sắc sảo").

## Flower-name fix (ROOT-54 20:47Z / 21:09Z; A21 small fix, F13) — DONE, no gens
- build.py MAID_FLOWER (flower NAME slot of every m person): "a small pink silk flower / a small plum blossom / a little orchid / a small peach blossom / a tiny camellia" → "a pink silk flower / a plum blossom / an orchid / a peach blossom / a camellia" ("a white jasmine sprig" unchanged). Consort rows c04/c12/c20/c28 "a small lotus" → "a lotus". Only the F13 SZ ladder sets the size now.
- Gate: check_store.py new banned rule X16 (scope tp1-6 pr1-6): `fresh flower \((a|an) (tiny|small|little|large|big|huge)\b` → FAIL. Tested: the old "a fresh flower (a tiny camellia)" → FAIL X16. Scan of all 87 people × t1–t6 (B8 bypassed): 0 size words left in the slot.
- Gates: build_all --check ×5 ages 0 FAIL; check_store --self 0 problems (16 banned); 16 Sắc sảo + Tinh nghịch × t1–t8 × 5 ages 0 FAIL.
- Task 2 CANCELLED by owner stop (ROOT-54 20:56Z): no gens. Next expected from ROOT-54: the owner's new face groups → LOOK_GROUPS.md.

## Owner groups Lượt 686 wired (ROOT-54 21:13Z) — DONE, no gens
- store look_groups() reads OWNER_GROUPS_L686.json (m + c). build_all: e12_caps per group size; group_angles = backtracking up to 14 people, cyclic construction above 14 (backtracking stalled at 20/30). Audit script reads the JSON too.
- Numbers: same-rank-audit.md last section. AFTER: 0 cells over cap in all 5 groups; Sắc sảo (6) fully different; Tinh nghịch (14) all angle sentences different, items/grace ≤ 2.
