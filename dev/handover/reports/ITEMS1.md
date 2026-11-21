# ITEMS1 — per-person held-item ladders (90 consorts × t1–t8, a18 thu) — depth 1, START_CTX ~3 %
JOB changed by ROOT (owner L2053): no new item table — assign from the EXISTING map only. Done. 0 gens, no build edits.

## Files
- `dev/art/items_per_person_L2053.py` — assigner + `--check` (CHECK PASS).
- `dev/art/items_per_person_L2053_DRAFT.json` — 90 persons: group + t1..t8 {idx, kind, item}; idx = index into the builder's own list `_E11_LISTS()[t][0]`, only a18 indices `L[t][1]['a18']`; item text = verbatim copy.
- `dev/art/items_per_person_L2053_vn.py` — short VN names (sample sheet only). Sample PNG (10 persons) sent to Foreman C, not in git.

## The existing map (read)
E6 (8 kinds per person), E7 (rank × age cell, t6–t8 reserved), E11 (per rank 40 items = 8 per age, `_E11_LISTS`), E12 (same look group + rank + age → different items), look groups = face-common/OWNER_GROUPS_L686.json (6 consort groups, 13–18 members; princess groups + Kho excluded = 90). item-rank-age.md / item_age.py = the older 10-per-rank status map (lady/maid/poor groups); the builder's t1–t8 path reads E11, so E11 is used.

## WHY the builder gave only 8 ladders (exact lines, t8-prompt-B/build.py)
- L247 `_group_items(name,age)`: `edges=[(t,idx,e6_kind(...)) for t in _E6_TIERS for idx in L[t][1][age]]` — edges depend on AGE only; `name` is just the cache key → all 6 groups get the SAME 8 colour classes.
- L204 `out[t]=L[t][0][GI[(gs[1]%8,t)]]` — member slot % 8 → slot i and i+8 of a group identical, and slot i of every group identical ⇒ 8 ladders for 90 persons (E12 holds only for groups ≤ 8, all groups have 13–18).
- VE12 `thu_comoi/make_thu_s63_65_L2026.py` L2–4, L11–12: built s63–s65 from `BASE` = s62's approved files and states "Items kept = s62's approved ladder" — it never called `_e6_picks` at all (copy, not the map).

## Assignment rules + result (`--check`)
- E6 8 different kinds per person (s62 exception: t3 + t7 flute, owner-approved L1979/L1976). E7 a18 cell only. G59: t2 a18 idx 1 (embroidered silk sachet) skipped → t2 uses 7 items.
- E12 pigeonhole: each item at most ceil(members/items) per group+rank (Quyến rũ 18 → 3; others 2; t2 up to 3).
- 90 distinct ladders; same group shares ≤ 3 ranks; ANY two persons ≤ 4 ranks; global use balanced; personality kinds as tie-break.
- Pinned: s62 = approved thu ladder (t1 idx5, t2 10, t3 13, t4 9, t5 25, t6 25, t7 12, t8 10).
- person_gate W1 can never be 0 inside a group > 8 with 8 items/rank (pigeonhole); it is now the minimum.

## Where the builder must read it (sent to BUILDFIX1)
`t8-prompt-B/build.py _e6_picks` L196–200, right after the cache check, before `gs=group_slot(c)`: if `age=="a18"` and c in the json → `out[t]=L[t][0][J[c][t]["idx"]]` for t1–t8, keep the existing `nude` lines (k8 from out t8). `e6_check` must exempt s62 (t3/t7 flute). After wiring, person_gate APPROVED_ITEM s62 becomes redundant (same items).

## Open (owner)
1. Other ages (a26–a65) still on the old 8-ladder path — same method can fill them if wanted.
2. t7 a18 list holds "a gold flower basket set with gems" while item_age says t6+ never basket — kept (existing map); owner call.
3. t2 a18 has the banned sachet (G59) in the builder list itself — BUILDFIX1 should drop it from the list.
4. s63–s65 thu t1–t5 copies (VE12): if already drawn, E12 says leave the pictures; new data gives them their own items for new gens.
