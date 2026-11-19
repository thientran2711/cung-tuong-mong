# BW1 — age text a51/a65 for everyone (J6) + no hair flowers for cung nữ / nữ quan (K15)

Owner Lượt 520 (A) "copy the Nữ đế 51/65 age prompt to everyone, every rank"; (B) "only phi tần wear hair flowers: cung nữ, ma ma, nữ quan none".
Branch `claude/cung-tuong-mong-handover-hj0h8w`. No images generated.

## 1. Which age text reaches the final Nữ đế prompts

The praised Nữ đế pictures are the NDX1 mass (c01–c11). Their prompts are logged in `dev/art/gen_ledger.jsonl` (kind `NUDE-MASS`, cmd `build_all.py cNN nude --age aNN`).
I re-ran all 54 logged commands against the current builder: **54/54 byte-identical** (a18 10, a26 11, a36 11, a51 11, a65 11).

The age part of those prompts is `AGE_TXT["a51"]` / `AGE_TXT["a65"]` in `dev/art/t8-prompt-B/build.py` (line 165), **unchanged**:

- **a51:** "about 51, a graceful beautiful older lady who ages beautifully (đẹp lão): a slightly fuller mature face, soft fine lines at the eyes and gentle smile lines, … never a 20-30-year-old face, never haggard or plain. Her robe keeps the same colour families …, every colour is a DEEPER, DARKER, rich mature shade … never bright."
- **a65:** "about 65, a truly elderly lady who ages beautifully (đẹp lão): clearly older than her 51-year-old self, with gentle visible wrinkles … NOT pure white); still graceful, elegant and beautiful, never haggard. Her robe keeps exactly the same colours … (dignified, not bright; the royal yellow becomes a deeper antique gold)."

The older N4b swap ("the royal yellow stays the SAME soft warm antique gold as at 51…") only runs on the old `build.py --state nude` path. `build_all … nude` uses `--nude3`, so it never runs there, and **no NDX1 prompt contains it**. I briefly copied that swap into `AGE_TXT` a65 for every family. Then I found it would make every a65 prompt, including Nữ đế's, differ from the text the owner saw, so I **reverted it**. Net change to age text: **none**.

## 2. Table: a51/a65 age text per family (builder output, c10 / m05)

Checked with `python3 build_all.py` / `build.py` at a36, a51 and a65 for each family. "Verbatim" means `AGE_TXT[age]` is in the output byte for byte.

| family | builder / command | a51 = Nữ đế text | a65 = Nữ đế text | age-only extra sentences (not age wording) |
|---|---|---|---|---|
| **Nữ đế** (reference) | `build_all.py cNN nude --age aNN` | — | — | elder COLOUR RULE clause; image-2 yellow "elder shade" sentence |
| thường phục t1–t8 consorts | `build_all.py c10 1..8` | ✅ verbatim | ✅ verbatim | the same elder COLOUR RULE clause (`__main__` swap); "a fresh flower" → "a flower" |
| thường phục, maid faces in t1–t8 | `build_all.py m05 N` | ✅ | ✅ | same |
| princesses p01–p03 | `build_all.py p01 N` | ✅ | ✅ | same |
| Thái hậu | `build.py --state thaihau` | ✅ | ✅ | none |
| trung y ty1–ty8, lãnh cung | `--state ty1..8 / cold` | ✅ | ✅ | own COLOUR RULE (same hue deeper, J4) |
| triều phục 1–8 | `--trieu N` | ✅ | ✅ | none |
| Nam Chiếu / Bắc Địch nc1/bd6 | `--state nc1/bd6` | ✅ | ✅ | none |
| ma ma | `--state mama` (+ mama-specs files: 114 a51 + 114 a65, all verbatim) | ✅ | ✅ | own deeper-step COLOUR RULE (K1) |
| cung nữ tm0–tm3 | `--state tm0..tm3` | ✅ | ✅ | tm1/tm3 elder COLOUR RULE |
| nữ quan tm4 | `--state tm4` | ✅ | ✅ | none (red fixed at every age) |
| women NPCs (Thái hậu h1–h3) | `build_npc.py` (`W_AGE = B.AGE_TXT`) | ✅ (imports it) | ✅ | — |
| **men** (Emperor, eunuchs, officials, princes, công tử) | `emperor-B/build.py` AGE_TXT → `build_npc.py M_AGE` | ❌ own men's text ("dignified handsome older man … a few visible silver strands") | ❌ **no a65** (held for the owner, J5) | not changed: see Open question 1 |
| legacy first-gen specs | `dev/figwork/spec*.py` (e.g. TH "about 65 with a few fine lines…") | ❌ | ❌ | not a rule-0 builder; nothing is generated from it now |

**Conclusion (A):** every women's family already builds the Nữ đế a51/a65 age text **verbatim** from one shared `AGE_TXT`. Copying it again changes nothing. If the owner sees other families looking older than Nữ đế, the cause is not the current age wording. Likely causes:
1. Their **live pictures were made earlier with older age texts** (for example the a51 text before 18/11 ~20:45Z, legacy spec*.py), and have not been re-made since.
2. **One-ref:** image 1 is the person's own live picture at that age, so an old-looking face reference carries over.
3. Costume and colour: Thái hậu, ma ma and the trung y families add their own darker elder COLOUR RULE.

Re-drawing those pictures is the fix. It needs the coordinator's go-ahead and image generation, which BW1 does not do.

## 3. Hair flowers (B)

| family | before | after |
|---|---|---|
| cung nữ tm1 (tam đẳng) | "…one or two elegant silver hairpins with small pearls and a fresh flower;" (a51/a65: "and a flower") | "…one or two elegant silver hairpins with small pearls;" |
| cung nữ tm2 (nhị đẳng) | "…several silver and pearl hairpins and small fresh flowers, pearl earrings;" | "…several silver and pearl hairpins, pearl earrings;" |
| cung nữ tm0 (thô sử) | already "no flowers, no jewels" | unchanged |
| chưởng sự cô cô tm3 | no flower | unchanged |
| nữ quan tm4 | no flower | unchanged |
| ma ma | "one small fresh {flower} … beside the bun" + MAMA_HAIR | **MMX3 c9d4cd7** already added `--noflower` (opt-in flag, removal only); I did not touch it |
| consorts / princesses / maid faces in consort tiers t1–t6 | flowers | kept (phi tần), unchanged |

The removal is **always on** for tm1 and tm2, with no flag and no words added. No tm prompt is in the ledger, so this breaks no logged generation.

## 4. Before/after diff and gates

- Builder output before/after across 33 family samples × a36/a51/a65 (99 prompts): **only** tm1 and tm2 (3 ages each) differ, and only in the hair-flower clause. All other prompts, Nữ đế included, are byte-identical.
- `check_store.py --self`: 33 sentences, 13 banned, 0 problems.
- `check_store.py` gate on tm1/tm2/tm4 m05 at a36/a51/a65: STORE CHECK PASS (9/9).
- `check_store.py --audit` (written to scratch; the committed APPROVED_AUDIT.md was not rewritten): **4089 prompts, 3745 PASS, 344 FAIL**. Thường phục consort 1280/1280, maid-person 2080/2080, princess 120/120, Nữ đế 160/160, triều 5/8, ma ma one-ref 100/199, ma ma 3-ref 0/242. The FAIL count is the same as in the committed audit (344). The only difference is +99 PASS: MMX3's new `*.twocol.noflower` ma ma files. The audit does not cover tm builders; those are gated above.

## 5. Rules

J6 and K15 (added by ROOT-49 in ad8950c) already say what the owner said. No `rule.py` change was needed.

## Open questions for the coordinator

1. **Men:** "everyone in the game" could include the Emperor and other men. Their a51 text is the separate men's text, and a65 is held (J5: "consort a65 text adapted"). The women's text ("older lady", robe colours) cannot be copied word for word onto a man. Only the owner can approve an adapted version, so I did not invent one.
2. **Older families look older:** re-draw at a51/a65 with the current builder (one-ref)? This needs image generation, so it is not BW1's job.

## Addendum (after merging ROOT-50 c89ce6f / Lượt 529)

- **J6 widened** (Lượt 529): all five ages, men AND women. Checked a18 and a26 too (nude, t1, t8, princess, ma ma, tm1, tm4, kc, ty1, triều 3), and a36 in all 33 samples: **every women's family already uses `AGE_TXT` verbatim at all five ages**. The only family that is not verbatim is the **men** (`emperor-B` AGE_TXT a18–a51, no a65; `build_npc.py M_AGE`). Copying the women's sentences ("older lady", robe colours, "her") onto men needs at least her→his/lady→man swaps, and J5 already says "adapted". That is a coordinator or owner wording call; BW1 changed no men's text.
- **K15 note (ROOT-50 ruling A, ma ma only):** removing the flower words was not enough; the generation copied the face reference's flower, so ma ma `--noflower` now adds "NO flowers in the hair (no fresh or silk flowers), only her hairpins." **The same risk applies to cung nữ tm1/tm2** (image 1 = her live maid picture, which has flowers). BW1 did only the removal, per LAW #0. **Suggestion:** if the ruling is extended to tm0–tm4, append that same sentence verbatim to the tm1/tm2 hair clause, and extend X14 scope to tm*.
- Pushed: 9135a20, merged as baa3e96.
