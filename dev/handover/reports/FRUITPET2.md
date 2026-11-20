# FRUITPET2 — pets for công chúa + trẻ con · s62–s65 season pairs · LEN note (Foreman C ROOT-68 session_01PEhRbv5MJBsBwzuyDQxpDD, 20/11)
depth 3 · START_CTX ≈ 3 % (get_session used_tokens read 0; own estimate) · 0 gens · 0 credits

## (a) PETS for công chúa + trẻ con: done (owner verbatim Lượt 1076: "Cung nữ nhà nghèo, nữ đế là không ôm thú cưng, công chúa trẻ con thì có ôm thú cưng.")
- Read as: công chúa = **Công chúa kid-f01–f24** at all her drawn ages **a4 a9 a14 a20** (kjobs.json lineups = these 4 ages). Trẻ con = the children, which adds **Hoàng tử kid-p01–p24** at the child ages **a4 a9 a14**. kid-p a20 is a grown man, so he gets no pet. Maids, ma ma, nhà nghèo/lãnh cung and Nữ đế get no pets (they are left out of the table and the gate fails them).
- Same rules as F17: the animal is in contact (hugged, cupped in the hands, perched on a finger/hand/wrist), never beside. It replaces that child's held item. 3 children per group × age. No species is used twice in one group across its ages. Each child has at most one pet. All are small animals that suit a child. I picked each animal's colour against the child's palette (no white pet on a white robe, no yellow on yellow).
- Table: `pets.KIDS` (`python3 dev/art/t8-prompt-B/pets.py` prints it; `pets.py check` → bad 0):

| Nhóm | Tuổi | Bé → thú cưng (tiếp xúc) |
|---|---|---|
| Công chúa kid-f | a4 | f01 → ôm thỏ trắng nhỏ trong tay · f02 → gà con vàng nâng trong hai bàn tay · f03 → ôm mèo con mướp trước ngực |
| Công chúa kid-f | a9 | f04 → bướm đậu trên đầu ngón tay · f05 → ôm chó con lông trắng trong tay · f06 → bồ câu trắng nhỏ đậu trên tay |
| Công chúa kid-f | a14 | f07 → chim hoàng yến đậu trên ngón tay · f08 → rùa con trên lòng bàn tay · f09 → chim vành khuyên đậu trên ngón tay khẽ nâng |
| Công chúa kid-f | a20 | f10 → đôi chim yến phụng đậu trên tay · f11 → chim hoàng anh đậu trên ngón tay · f12 → vẹt xanh nhỏ đậu trên cổ tay |
| Hoàng tử kid-p | a4 | p01 → ôm chó con lông trắng trong tay · p02 → vịt con vàng nâng trong hai bàn tay · p03 → ôm thỏ trắng nhỏ trong tay |
| Hoàng tử kid-p | a9 | p04 → chim sẻ đậu trên đầu ngón tay · p05 → rùa con trên lòng bàn tay · p06 → ôm mèo con mướp trước ngực |
| Hoàng tử kid-p | a14 | p07 → chim sáo đen nhỏ đậu trên cổ tay · p08 → chim hoàng yến đậu trên ngón tay · p09 → bồ câu trắng nhỏ đậu trên tay |

- Builder: `build_npc.kid()` swaps only the held-item clause for the pet clause. Proof: I snapshotted all 1 062 id×age outputs before and after (522 prompts build). **21 changed, exactly the 21 table cells**, and the only change in each is the item clause (for example f01 a4 "hugging a little cloth rabbit toy" → "hugging a small white rabbit in her arms"). `build_npc --verify gen_ledger` reports 0 kid gens in the ledger, so no record was touched.
- Gate `check_store.py` pet_fails (F17):
  - New scopes: `--scope girl` (kid-f, ages a4/a9/a14/a20) and `--scope boy` (kid-p, ages a4/a9/a14). Any other age in these scopes FAILs, and so does a missing `--age`. `boy` is already a male scope in master_common, so no earring sentence is needed.
  - Hold words now also match: hugging, cupped, he holds, in his arms.
  - "Beside" checks now also cover beside him, at his feet, next to him and by his side.
  - New animal words: chick, duckling, myna.
  - Toys ("… rabbit toy", "butterfly toy on a stick") do not count as pets.
  - `--self` has 7 new kid samples; result: 0 problems.
  - All 522 NPC prompts give 0 F16/F17 FAIL.
  - Full `kid-f02 a4 --scope girl` and `kid-p07 a14 --scope boy` runs: STORE CHECK PASS. The same kid-p07 text with `--age a20` FAILs (F17 PET AGE).
- Adult proof (the hold-word list got wider): `build_all.py --check` at a18/a26/a36/a51/a65 (2 200 prompts) gives **0 F16/F17**.
  - The other FAILs are older and not caused by this work: LEN only at a36/a51/a65 (2/317/263).
  - At a18 there are 4 invariant FAILs ("F minus added sentences != store output", m04/m42 t7, m01/m30 t8). They are **identical on clean HEAD** (I ran the same check in a separate worktree), so they were already there. Building one of these people alone passes, so the fail only shows inside the check_all run. Flagged for the foreman, not fixed.
- Rule F17 extended with `rule.py set F17 … --luot 1076` (owner quote added; the old text is kept in ART_RULES_HISTORY).
- OPEN for the owner/foreman:
  1. Foreign princesses (nc/bd Nam Chiếu/Bắc Địch, bt/cl/pt in build_all) are titled "công chúa" but are adult consorts. They follow the rank rules (pets at t1–t6 a18/a26 only if they are in pets.table, and today they are not). I did not guess them in.
  2. Should kid-p a20 get a pet? I read "trẻ con" as children only, so today he gets none.
  3. A first sample gen of 1–2 pet kids before any mass gen (A1/A2).

## (b) s62–s65: other 3 seasons: done (0 gens)
- Script `dev/art/palettes3/add_s62_65.py [--write]` uses the P6 solver (four_season86_a32_soft: cands_for, tone band, stylist judge, forward-checking DFS, P6's escalation pools widened + fine_pairs).
  - The **86 people stay fixed** (checked: all 86 entries byte-identical).
  - Each person's root = their s_root_colours pair (owner Lượt 1042), marked ★.
  - Groups: s62/s63/s64 Dịu dàng, s65 Đoan trang (F4 report).
  - Run time ~2 min.
- Written into `face-common/palettes_season_deep.json` (the owner-approved P6 file, Lượt 1042), including `_flags.s62_65_added` and `_flags.A31_cannot_fit`.
- Gate: pair_verdict of every s62–s65 season pair against all 89 others → **0 FAIL**, 18 WARN (P6 had about 200 WARN).
- **A31: s65 fully clean. s62, s63 and s64 each have one A31 clash, all in Hạ** (s64's one Hạ phụ touches two of her colours). Hạ is full: no Hạ pair passes both the gate and A31 for these three. P6 kept 8 people the same way ("CANNOT FIT"):
  - s62 Hạ phụ #B9C9F9 ~ Đông root main #71B5D7
  - s63 Hạ main #EFE495 ~ Thu root phụ ivory #F3E7CE (light lemon vs ivory, ΔE 12.8)
  - s64 Hạ phụ #EDB9D5 ~ Xuân root main #F8B3D3 (same family) + ~ root phụ #ECE2FE

| id | nhóm | Xuân | Hạ | Thu | Đông |
|---|---|---|---|---|---|
| s62 | Dịu dàng | hồng hoa đào dịu #EB8186 + trắng ngà #F4F0E6 | cam đào sáng #F8B287 + dịu tím than #B9C9F9 | tím mận sáng #DF9ED9 + hồng phấn nhạt #FFE3EA | ★ ice blue #71B5D7 + mint mist #CDF2E0 |
| s63 | Dịu dàng | xanh lá xuân sáng #85CC87 + hồng phấn nhạt #FFE7EE | vàng chanh nhạt #EFE495 + hồng san hô #E69498 | ★ amber #CB996C + ivory #F3E7CE | xanh mòng két sáng #68D5DA + xanh sương #E0F1FF |
| s64 | Dịu dàng | ★ peony pink #F8B3D3 + smoke lilac #ECE2FE | cam đào sáng #FEAD94 + dịu tím mận #EDB9D5 | xanh rêu sáng #98CB8D + ngà #F3E7CE | xanh băng dịu #67B9E2 + xanh ngọc sương #CCF8FA |
| s65 | Đoan trang | hồng mẫu đơn đậm vừa #A45B86 + xanh ngọc sương #C9F5F7 | cam san hô dịu #DE826A + dịu tím than #C4B4E5 | "đỏ rượu sáng" #FF95B7 (the solver's name; it reads as a pink) + trắng ngà #F9F5EB | ★ jade #4EA989 + peach cream #FBDAC1 |

- I made no sheet; make_four_season_sheets.py can draw one if the owner wants to look. `check_unique.run` still expects exactly 86 consorts (it would list s62–s65 as "not one of the 86"); I did not change that gate list (foreman).

## (c) LEN trim of the ANGLE tail: NOT applied (needs owner OK, A18)
FRUITPET1's candidate (a) is still open. It cuts the ANGLE tail "; her head turns together with her shoulders and body, never back-turned, never in profile." down to "; never back-turned, never in profile." That saves 52 characters and fixes the 25 prompts that NOEAR pushed over the limit. The about 485 older a51/a65 LEN fails still need (b)/(c) or another trim. RANK8-B's ANG14 sentences (64b798f) were not touched.

## Files
dev/art/t8-prompt-B/pets.py (KID_AGES, KA, KIDS, kid_pet, kid_check; check() = ranks + kids) · t8-prompt-B/build_npc.py (kid() hook) · check_store.py (girl/boy scopes, regex, self samples, doc line) · ART_RULES.md + _HISTORY (F17) · palettes3/add_s62_65.py (new) · face-common/palettes_season_deep.json (+s62–s65) · this report.
Commit: (see the push message / git log "FRUITPET2")

# ROUND 2 — ROOT-69 "BEFORE MASS" blockers (0 gens)
## (a) s62/s63/s64/s65 added to OWNER_GROUPS_L686.json (139 → 143): done
- Groups come from LOOK_GROUPS.md Lượt 1046 (F4): s62, s63 and s64 = Dịu dàng, s65 = Đoan trang. s63 is included because the owner put her in the group; she has no rank pictures and stays HELD by B8.
- Side effect found and fixed:
  - Adding members made build_all re-plan the E12 ANGLE grid of the whole group (group_angles backtracks over every member). That would have changed the angles of 79 prompts of 13 existing people (m19, m20, m29 …).
  - Fix in build_all.plan(): the old members are planned exactly as before. The newcomers (S_NEW_SET) are fitted into the free slots by the new group_angles_add() under the same E1/E12 caps.
- Proof: a before/after snapshot of every Dịu dàng + Đoan trang member × t1–t8 × 5 ages (640 prompts). The **24 existing members are byte-identical**. Only s62, s64 and s65 change.
- One cell cannot be fitted under the caps: Dịu dàng a26. The 11 old members leave 15 usable slots, but s62 and s64 need 16. The fix lets the newcomer repeat one sentence as few times as possible: **1 repeat, s64 t8 a26** (sentence cap 1 → 2 there; listed in `build_all.ANGLE_ADD_DUPS`). The other option was to re-plan the old members' angles; I did not do that because it changes approved prompts (A18).
- IMPORTANT for the foreman: **s62, s64 and s65 are already drawn at 8 ranks (a18, RANK8)**. Their builder a18 prompts now follow the group plan, so they no longer match the drawn pictures:
  - item/pose differs at 7/8/5 ranks (s62/s64/s65)
  - angle differs at 6–7 ranks per person
  - grace line differs at most ranks
  The drawn pictures and ledger records stay as they are (no redraw, A20/A21).
- Why the old picks broke the rule: their drawn items repeated a group member's item at 12 rank cells (s62 = m19 at 6 ranks + m08 t3, s64 = m14 t2 + m02 t6, s65 = m05 t2 + m04 t4 + m16 t6). The new plan gives s64 the same items as m02 (8 ranks). That is the colour-class pigeonhole: 14 members over 8 classes, so a cap of 2 per item, allowed by E12.
- Other readers of OWNER_GROUPS:
  - check_unique.py now expects 90 consorts. On the approved P6 file (`python3 dev/art/palettes3/check_unique.py --file palettes_season_deep.json`, new option): 90/90 present, **0 FAIL**, 219 WARN.
  - The CLI default (old palettes_season.json, no s62–s65) now reports 4 "consort missing" lines. This is expected; the default file was not changed.
  - palette86.py, face_map_L703.py and make_season_sheets_by_season.py also read the file. I did not run them; they now see 90 people.

## (b) kc_refs_build.py: fixed
- Fix 1: it crashed on ledger lines whose `refs` are plain strings → it now takes `r.get("id")` for a dict and the string itself otherwise.
- Fix 2: it had no s-rows and set c06 to NOT drawn, so a rebuild would drop s62, s64 and s65 and undo REDRAW3's c06 row. Now every drawn row (m09_ok yes) in the existing KC_REFS.json that the script cannot produce is kept verbatim. The script prints which ones: `c06 s62 s64 s65`.
- Proof: after a rebuild, KC_REFS.json is **content- and order-identical** to before. KC_REFS.md was stale (said ok 55 / total 93); after the rebuild it shows ok 59 / total 96 with the c06/s62/s64/s65 rows.

## (c) build_all a18 invariant FAILs (m04/m42 t7, m01/m30 t8): builder-check bug, fixed
- Cause: FRUITPET1's F17 step `pets.depet` (at t7/t8 the old "butterfly on her raised finger" pose becomes "gazing at her lightly raised hand") runs in build() but not in check()'s rebuild of the store text. So the invariant compared the de-petted prompt against a reference that still had the butterfly. It only showed for people whose picked pose is one of the 3 old animal poses.
- Fix: check() applies the same depet step. No prompt wording changes; build() output is untouched.
- Re-run result: see "build_all --check after round 2" below.

### build_all --check after round 2 (all 5 ages, working tree = origin 78298b1 + my round-2 changes)
- "F minus added sentences" invariant: **0 at every age** (the 4 a18 FAILs are gone).
- F16/F17: 0. E6: 0. E12: 0, with s62/s64/s65 now inside their groups.
- NEW FAILs that are NOT from this work:
  - a18/a26: 53 t2/t3 prompts FAIL check_store, "store sentence missing or rewritten [0.77] Luminous smooth porcelain skin, bare clean forehead …".
  - a36+: t3 FAILs on "[0] G15 Quý nhân …".
  - Both come with the G17/G15 neckline commits merged from origin (aef86d9, ad3c824 …). That is the t1/t2/t3 collar code COLLAR1 is editing, so I did not touch it. → COLLAR1 / foreman.
- LEN FAILs at a36/a51/a65 as before (A18 trim still waiting for the owner).
Round-2 commit: 9e46608 (merged 653c783).
