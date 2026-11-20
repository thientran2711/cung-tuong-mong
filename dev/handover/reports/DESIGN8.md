# DESIGN8 — Hán gon3 (owner Lượt 1380, Foreman C #7)
depth 7 · START_CTX ~3 % (get_session used_tokens read 0; own estimate) · Opus, prompt editing, 0 gens, 0 credits.

## Done
New prompts (+ .keep each), all ≤ 10 000 chars:
- dev/art/seasons4/s62_t6_HAN_BAC_gon3.txt (base t6 _gon2) — 9948 chars
- dev/art/seasons4/s62_t7_HAN_BAC_gon3.txt (base t7 _gon) — 9992 chars — t7 HQP HAD the same risk (cloud collar "sloping DOWN over the shoulders" with no front rule, "strands of pearls hung below the V", "a wide inner panel of the robe" in yellow, "all collars WIDE" with no V size) → fixed too.
- dev/art/seasons4/s62_t8_HAN_BAC_gon3.txt (base t8 _gon2) — 9995 chars
- t4 _gon2: NOT changed — its wording already describes the pink inner collar as a layered V edge inside the plum collar and the pearl net "ALONG the two sloping V collar edges" (same type as t5 Phi, which the owner likes). t5 _gon untouched ("Phi đẹp").

## The three faults (L1380) → how each is fixed (positive wording, not only negatives)
(a) "áo ngang" (straight horizontal inner top in the V): every inner robe is now described as ALSO a crossed-collar robe: "every inner robe is ALSO a crossed-collar robe whose collar is a V nested inside it, so the open chest shows only nested V collar lines down to the sash". Yellow "inner robe panel" (t6) / "wide inner panel of the robe" (t7) → "a yellow inner collar nested in the V"; t8 "wide borders and a few panels" → "wide borders".
(b) V too small: "the lapels reach the very edge of the SHOULDERS and meet LOW near the sash in a broad deep V like the Phi's"; collar bands now "along the V" (t6 FOUR, t7 FIVE, t8 SIX).
(c) cloud-collar fringe across the front: "lying/sewn flat ONLY on the shoulders and upper back", fringe/tassels "along the shoulders and back" (t6) / "its short pearl fringe there only" (t7/t8); "at the front its ends slope DOWN along the V edges, no fringe across the chest". t8 pearl strands "across the chest below the V" → "hanging DOWN from the V point"; t7 "hung below the V" → "hanging DOWN from the V point".
Kept: t6 small flat four-lobed, scalloped gold edge, gold tassels, few jade/pearl drops fewer than HQP; t8 royal yellow, denser gold, more pearls than HQP; every other outfit / jewellery / embroidery word.

Read-as-ChatGPT check: in all three, the only things named between the V edges are nested V collar lines, collar bands along the V, and pearls hanging DOWN; nothing is named that has a straight top edge above the sash (no panel, bodice, top, band across). Remaining words "across" = only "no fringe across the chest".

## A38 keep check — every lost phrase (all in .keep as allow lines)
Owner-asked collar text (L1380):
- t6: all collars WIDE to the shoulders · the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V · never a tight high crossing at the throat ("nothing at the throat" kept) · open WIDE and LOW like the Phi's · never a horizontal inner top across the chest (replaced by the positive nested-V sentence) · sewn flat over the shoulders · open in a deep V under the collar bands · a yellow inner robe panel
- t7: lying flat and sloping DOWN over the shoulders · with a short pearl fringe (reworded, fringe kept) · cut in a deep V under the collar bands · with strands of pearls hung below the V · a broad yellow collar and a wide inner panel of the robe
- t8: many long strands of pearls and jade across the chest below the V · lying flat and sloping DOWN over the shoulders · with a short pearl fringe (reworded) · cut in a deep V under the collar bands · wide borders and a few panels
Boilerplate duplicates trimmed for length (each tested: gate FAIL set unchanged):
- t6: "The wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like." (dup of the fabric sentence's "natural weight and soft natural folds, never stiff or board-like") · "FABRIC: thin light Song brocade with a graceful, flowing drape." (dup of the long FABRIC sentence)
- t7/t8: "An imperial consort" (t8 now "The Empress.") · no sharp angles anywhere · the gaze soft and kind · never looking in two directions (cross-/wall-eyed kept) · a small sweet closed-lip smile (mouth rules kept) · "FABRIC: light gold-woven gauze over thin Song brocade, flowing softly." (dup of outfit fabric) · "(honey-gold like #EFBD69)" in the 3-colour rule (hex kept in the colour rule)
- t7 only: "(medium depth, 18K gold tone)" (DESIGN6 precedent; "18K tone" kept) · "gaze to the viewer" (dup of "head up toward the viewer") · "; the royal yellow in the robe is exactly that colour" (the "Image 2 is only a colour reference for the royal yellow." sentence kept)
keep_check --sidecar: t6/t7/t8 gon3 PASS; --all: 52 sidecars PASS.

## Gate (check_store.py --scope tpN --age a18) — FAIL set same as base
t6 gon3: B12 M07 S07 S12 (= t6 gon2) · t7 gon3: B12 S07 (= t7 gon) · t8 gon3: B12 S07 (= t8 gon2).
Tried and REJECTED trims (they add a FAIL): hairpin dup → M13, "gentle expression…" → S18, HEAD AND BODY → S23, NOTHING on the forehead → S34, ANGLE "her head turns together…" → E1.

## !! TOOL BROKEN on the branch (for Foreman)
dev/art/check_store.py does NOT run at HEAD eaaa73e: IndentationError line 760 — bad merge left both old and new lines: line 759+760 (`doan_cuts_made(prompt,scope_from_store_args(args))` and `doan_cuts_made(prompt)`), 1016+1017 the same pair; dev/art/master_common.py has two `def doan_cuts_made` (line 81 with scope, line 85 without). Last touched by 45326af "status: F2 flower by rank found (L1338)". I ran the gate with a LOCAL fix (kept the scoped versions, dropped the duplicate lines) and did NOT commit it — tools are the foreman's. Please fix before anyone gens.

## Notes (not changed, A18)
- t6 Pose says "as a breeze lifts her long stole" but the outfit has "no shawl" — possible stole/shawl conflict; not raised by the owner, left as is.
- No gens. Owner sees prompts only; gen needs her yes (A20/A21).

## Handover
Job complete; nothing open. Coordinator: no successor needed.
