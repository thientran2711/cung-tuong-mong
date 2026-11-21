# HAIR1 — hair table (Foreman C #15) — depth 6, START_CTX ~3 % (est. 30k/1M; get_session read 0)

## JOB 1 — DONE (0 gens, 0 credits)
Owner order 21/11: every rank a different hairstyle; t1–t3 still loose with different buns; no duplicate inside a rank; one person 8 ranks = 8 styles; table first.

Files
- `dev/art/hair/make_hair_table.py` — source of truth (catalogue + assignment). Re-run to rebuild.
- `dev/art/hair/HAIR_TABLE.json` — full table: catalogue axes + 90 people × t1–t8 (VN name + EN sentence, a18 and a36+ forms).
- `dev/art/hair/HAIR_TABLE_builder.json` + `dev/art/hair/hair_words.py` — builder form: `hair_words(pid, tier, age)` -> one `HAIRSTYLE (her own at this rank): …` sentence.
- `dev/art/hair/check_hair_table.py` — auto-check: PASS (no duplicate code/VN/EN inside any rank; 8 different per person; shapes rank-disjoint; F1/F11 words; check_store BANNED regexes ×21 + local animal/flower/Qing/phoenix list). Mutation test: injected duplicates -> FAIL 9 (works).
- Sheets (LIST format, 0 cr): `dev/handover/review-sheets/hair_table_L1621/` — `00_danh_muc.png` (catalogue) + per group `NNA_<nhóm>_t1-4.png` and `NNB_<nhóm>_t5-8.png` (12 sheets), maker `make_hair_sheet.py`.

Design
- Roster = 90 (palettes_season_L1583.json: 86 + s62–s65), not 86.
- Style = SHAPE (10 per rank, rank-specific, 80 shapes total, Hán/Đường-style kế names) × POSITION (t1–t3: top / high back / back at ear level) or SIDE HAIR (t4–t8: sleek / softly puffed / swept up showing ears) × WRAP (smooth / braid-wrapped base / twisted rope strands) = 90 per rank.
- t1–t3 extra axis LOOSE PART (straight down the back / + two locks in front of shoulders / + one thin braid in the loose hair) at a18/a26; at a36/a51/a65 the loose part becomes "a neat low knot at the nape" (F11).
- Assignment: cell = (i·K[t] + O[t]) mod 90, a bijection per rank (K coprime to 90).

Rules respected / conflicts
- F1, F11 (see above); F14 no Qing words; F2/F5/F13/G39 flower + hairpin words NOT touched (the sentence names only the hairstyle); t7/t8 crown words untouched (chignon "beneath the headdress"); no flower-shaped buns (F13 one flower); no animal words (PET gate); no "crown" at t1–t6.
- No hard conflict found. Note: the store HAIR rank-law sentence (check_store APPROVED, "her hair stays LOOSE…" / "ALL her hair is swept UP into a high bun / chignon") stays; the new HAIRSTYLE sentence is ADDED after it (JOB 2 needs that as an owner-approved addition, A38 allow line).
- Honest limit: within one rank, 9 people share each of the 10 shapes and differ by position/side hair + wrap (+ loose part at t1–t3). Different to the eye in a full-body picture, but subtle at small game size. At t7/t8 the crown hides much of the top, so the difference shows mostly in side hair + back volume.
- Same hairstyle in all 4 seasons/eras (owner did not ask per season) — open question for the owner.

## JOB 2 — waiting for Foreman go (t1–t3 builder words, A38 keep_check, no gen).

## JOB 1b — DONE (owner L1630: 'cho tôi một cái prompt … vẽ hết 10 kiểu này vô một bậc … tôi đưa chat GPT nó vẽ') — 0 gens
- dev/handover/review-sheets/hair_table_L1621/chatgpt/hair_t1..t8.txt (+ make_chatgpt_hair.py, README.md with gate result + what was dropped / hand-written).
- Gate: no BANNED, no REWRITTEN; only figure-only master/store sentences missing on purpose (listed in README).
