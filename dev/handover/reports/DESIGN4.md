# DESIGN4 — Hán t4–t8 open neck with signature piece (owner Lượt 1280)
depth 4 · START_CTX ~3 % (get_session read 0; estimate) · gens 0 · credits 0 · text only.

## Fix (same logic for all 5)
The piece now sits LOW on the OUTER shoulders and upper arms, cut/open in a deep V UNDER the collar bands (bands lie on top), "nothing at the throat", + the explicit line "her neck, collarbones and the wide V neckline are fully visible, never covered by …". Piece identity, fabrics, layers, embroidery, jewellery, hair, colours unchanged. Captions unchanged (piece names unchanged).

## Before → after (piece sentences)
- t4 BEFORE: capelet … over only the shoulders and upper chest, worn open at the front so the wide collar shows, a jade clasp at the throat, with a beaded yoke over it: … lying flat from the throat over the WHOLE capelet, its short pearl fringe at its lower edge …
  AFTER: capelet (not cloud-shaped, scalloped or pointed) set LOW on the OUTER shoulders and upper arms, cut in a deep V under the collar bands, nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by it; with a beaded yoke over it: … lying flat over the WHOLE capelet, its short pearl fringe at its lower edge, never only half of it;
- t5 BEFORE: TWO layered … SHORT shoulder capes (… both resting on the shoulders, pearl-edged), worn open at the front so the wide collar shows, never covering the neckline;
  AFTER: … (… pearl-edged), both set LOW on the OUTER shoulders and upper arms, cut in a deep V under the collar bands, nothing at the throat; her neck, collarbones and the wide V neckline are fully visible, never covered by the capes;
- t6 BEFORE: cloud collar (yunjian) over the shoulders with a scalloped gold-thread edge and a fringe of small gold tassels, worn open at the front so the wide collar shows, never covering the neckline;
  AFTER: cloud collar (yunjian) with a scalloped gold-thread edge and a fringe of small gold tassels, set LOW on the OUTER shoulders and upper arms, open in a deep V under the collar bands, nothing at the throat; her neck, … never covered by the cloud collar;
- t7 BEFORE: jewelled brocade cloud-collar cape edged with pearls and gold over the shoulders, worn open at the front so the wide collar shows, with strands of pearls across the chest;
  AFTER: … edged with pearls and gold, set LOW on the OUTER shoulders and upper arms, cut in a deep V under the collar bands, nothing at the throat, with strands of pearls hung below the V; her neck, … never covered by the cape;
- t8 BEFORE: wide jewelled gold-brocade and pearl cloud collar with layered pearl fringes over the shoulders, worn open at the front so the wide collar shows;  (+ base "many long strands of pearls and jade across the chest")
  AFTER: … with layered pearl fringes, set LOW on the OUTER shoulders and upper arms, open in a deep V under the collar bands, nothing at the throat; her neck, … never covered by it;  (+ "…across the chest below the V", words only added)

## Length trims (no allow lines needed: exact duplicates only, keep_check + gate verified)
- t4/t6/t7/t8: second "centered, plain light parchment background," in the short summary line (kept earlier); "face clearly visible," in the summary line (kept in "whole face clearly visible"). t6 also: duplicate "image 2 is only a colour reference;" and "gold only as thin accents." (both still present elsewhere).
- Tried and refused by the gate (restored): ANGLE head-turn clause (E1), S19 tail.

## Checks
- keep_check --all: 7 sidecars PASS. .keep: allow lines only for replaced placement words (v4 text), tagged Lượt 1280.
- Lengths: t4 9992 · t5 9867 · t6 9965 · t7 9976 · t8 9996.
- check_store --scope tpN --age a18: t4/t5 M06+M07+S12, t6 M07+S12, t7/t8 PASS = same as DESIGN3 (known only).

## OPEN — foreman/owner decision
- t4 S13 (store-approved CAPELET CUT, Lượt 397/412) still says "the robe closes only at the throat clasp". Changing it fails the gate (S13 REWRITTEN), so it is kept verbatim. It is the last "throat" cue in t4 and may still pull the neck closed. Recommend: a Hán exemption / new S13 wording (e.g. "the robe closes only by its wrap and belt") — owner/foreman call (rule.py is the foreman's).
- Test in ChatGPT: t4 first (the S13 risk), then t7/t8 (pearl strands).
