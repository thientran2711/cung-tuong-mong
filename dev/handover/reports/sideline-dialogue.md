# SIDE-LINE DIALOGUE SCENES — lead report (Foreman B; brief dev/handover/briefs/b-sideline-dialogue.md)
PRIORITY #1 CHECK ('kitDialogue|dialogue scene|dlg'): OD 24/11 ~10:05Z (STORY = DIALOGUE SCENES, read verbatim) | main: no scene opener anywhere; composed text in j72 (110 T72 `h` asks) + THIN seeds (j72c 256, j7c 86, j68c 460 comps + 132 openers, kyc 77, j70c 78, j71c 80 comps, wc 91) — CONVERT, don't rebuild | review/kit-dialogue-vn-r1 214c6b2c (KIT §95 kitDialogue.play / kitScene.light / kitTypeLine = the ONLY UI) merged here; review/dialog-person*, kit-dialog* = the old person-talk modal (not a scene; untouched) | claims none.

## STATUS
- (24/11 ~07:00Z) LEAD #1 session_01N1tNP4b3uXPGSvnVmsC51b (opus). START_CTX ~4 % (used_tokens reads 0 → own estimate); roll at ~29 %, ceiling 60 %.
- Branch **review/sideline-dlg** = origin/main 0c0877a2 + kit-dialogue-vn-r1 214c6b2c + thin-p4-r2 7429bfa3 + thin-p6-r2 aea1baec (both LAND READY, merged so their seeds can carry scenes; drop the merges once they are LIVE).

## SCHEMA
ONE data shape for every dialogue scene, side lines (this file) AND main roads (Foreman E). It is the KIT §95 `kitDialogue.play` line format with a ROLE in `who` instead of a name; the shared engine turns it into the real call.
```
"dlg": {
  "L": "<role>",            // LEFT figure = the person who comes to her / speaks first (a real NPC of THIS quest, law 6b)
  "R": "<role>",            // RIGHT figure; default "me" (her). NPC→NPC that she WATCHES (law 1): R = the other NPC + "watch": true
  "watch": false,           // true = two NPCs talk, she only looks on (no "me" line allowed)
  "at": "<place key>|null", // background painting; null = the family default (step place → where L is → her palace)
  "lines": [                // 3..8 lines (BAL.dlgs.min / max)
    {"who": "<L role>|<R role>|nar", "text": "…", "focus": true}   // nar = narration, no one lit; focus optional = KIT §95 focus shot on the speaker
  ]
}
```
- Speaker lit, the other dimmed (kitScene.light), text typed word by word (kitTypeLine), tap = finish / next — all from KIT §95; no private UI (law 9).
- `role` = a cast key the family's own engine already resolves to a REAL living person (law 6b). Side-line role keys: j72 `A B M me` · j7 `plotter target maid me` · j68 `A B M me` · ky `W me` · j70 `M me` (her cung nữ brings what she saw) · j71 `B A W M me` · wc `A B M me`. Roads (E): the road's cast keys (`v`, `dad`, …) + `me`.
- `text`: polished cổ trang (VANPHONG, law 7): no digits, no %, no odds words; the family's own placeholders (`{A}` `{O}` `{goi}` `{xung}` `{M}` `{plotter}` `{W}`…); ≤ BAL.dlgs.maxCh characters per line. Rules of content: line 1–2 tell who she is and what happened, the middle gives the detail that makes it a story, the last line leads into the task / choice. `L` speaks ≥1 line; `me` speaks ≥1 line unless `watch`.
- WHERE IT HANGS: never inside the seed files (THIN owns them). A side table keyed by the unit id: `{"id":"<fam>:<unit id>","dlg":{…}}` (unit id = seed id, old template id, or `<seed id>#s<n>` for step n). Built into `dev/build/jdlgsd.js` (DLGS_DATA) by `dev/build/jdlgsd_build.py`.
- RUNTIME (resolved, = exactly the KIT §95 call): `{bg, figs:[srcL, srcR], names:[nL, nR], lines:[{fig:0|1|null, who:name, text, focus}]}` (strings only). It is found for a card either on the card (`m.dlg`, set by j71c/jworldc with `dlgsMk(id, cast, fill, at)`) or by a family resolver keyed by the card's pid (`DLGS.R`: q72o, e68c:*, j7c, kyngo, j70 seen). The showModal wrapper lets the card's own gates run FIRST, then (only for a card really shown) hides it, plays the scene ONCE (kitScene.open + Sc.fig + kitDialogue.play) and shows the card (choice) after the last line. Background = `at`, else the family's place, else where she stands (S.place). Roads (E): call `dlgsMk("<road unit id>", {<cast key>: A6-like actor {k,o,n}}, fill, at)` and put the result on the chapter card as `dlg`. Co-op: the card is in the seat's own Q, so the scene shows on the seat whose quest it is (host computes the world, never the scene). Old saves: cards without `dlg` show as before.

## API DLG (writers)
- **ENGINE READY on review/sideline-dlg 03f4f781**: `dev/build/jdlgs.js` (shared player: a card carrying `m.dlg` plays its scene once before it shows; j72 adapter LIVE on every việc nhờ offer), data `dev/build/jdlgsd.js` (built by `python3 dev/build/jdlgsd_build.py` from content/dlg/*.md), numbers `BAL.dlgs` (jbal2.js). `node dev/test/dlgs-play.js <outdir> fold,ipadAir 3` ALL PASS 188 (3 lead scenes, Fold + iPad: scene before card, two figures, title = speaker, spotlight, tap-finish, card after, never twice, 0 page errors). Writer brief: dev/handover/briefs/b-dlg-writer.md (9 slices W1–W9).
- Writer file: `dev/handover/content/dlg/<fam>_<letter>.md` on the handover branch, one JSON object per line (lines not starting with `{` ignored): `{"id":"j72:j72c-craft-001","dlg":{…}}`.
- Validator (on review/sideline-dlg): `python3 dev/test/dlgs_validate.py [files…] [--fam j72]` → 0 errors; it checks the shape, roles against the unit's real cast, placeholders, 3–8 lines, length, VANPHONG words, and prints the cover table «family / units / with scene». Example file: `dev/test/dlgs-fixture.jsonl`.
- Play: `node dev/test/dlgs-play.js [file]` (opens each scene in a real life, Fold + iPad).

## COVER (law 11, `python3 dev/test/dlgs_validate.py --cover`)
| family | units | with scene | plays in game |
|---|---|---|---|
| j72 (110 old + 256 composed) | 366 | 3 | yes |
| j7 | 81 | 1 | yes |
| j68 comp | 460 | 1 | yes |
| ky | 77 | 1 | yes |
| j70 routes | 78 | 1 | yes (her cung nữ reports a tell aimed at her; not when she saw it herself) |
| j71 comp | 80 | 1 | yes |
| wc | 91 | 1 | yes |
| ALL | 1233 | 9 (lead scenes, content/dlg/lead.md) | |

## LOG
- 07:2xZ c5aba2a7: all 7 adapters live; `node dev/test/dlgs-play.js <out> fold,ipadAir 9` ALL PASS 506 (every scene of DLGS_DATA cast in a real life and played: scene before card, 2 painted figures, title = speaker, spotlight, tap-finish, card after with choices, never twice, 0 page errors). Shots looked at (Fold + iPad): j72 thường tại / cung nữ letter / rsv servant, j68 Quý phi, ky ma ma, j70 cung nữ report.
- NOT YET: the 33 old j7 ev() cards, 90 old j68 decisions, 25 old kỳ ngộ, 51 old j70 routes (old composed text: second wave after W1–W9), festival STAGES (no person speaks), coop-e2e, old saves.

## KIT REQUEST (for KK18, not blocking)
- §95 kitDialogue: the speech tail always points LEFT (kitDlgBox tail on the left edge); when the RIGHT figure (her) speaks it should point right. Ask: a `tail:"r"` side (or auto from the lit figure's side). Until then the box sits bottom-centre over both figures.

## WRITERS
- (24/11) W1 j72_a.md DONE: 127 scenes (63 craft + 64 social), 0 errors on dlgs_validate (review/sideline-dlg 03f4f781). Last id done: j72:j72c-social-064. Include the lead's two fixture ids (craft-001, craft-007) as written there. Self-read pass pending.
- (24/11) W2 j72_b.md DONE: 129 scenes (63 court + 66 fam), 0 errors on dlgs_validate (review/sideline-dlg 03f4f781 tree). Last id done: j72:j72c-fam-066. fam units (all L = M): sv/ak/maid asks are told by M bringing the servant's plea or the child's letter. Self-read pass pending.
