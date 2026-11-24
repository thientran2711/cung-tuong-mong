# SIDE-LINE DIALOGUE SCENES — lead report (Foreman B; brief dev/handover/briefs/b-sideline-dialogue.md)
PRIORITY #1 CHECK ('kitDialogue|dialogue scene|dlg'): OD 24/11 ~10:05Z (STORY = DIALOGUE SCENES, read verbatim) | main: no scene opener anywhere; composed text in j72 (110 T72 `h` asks) + THIN seeds (j72c 256, j7c 86, j68c 460 comps + 132 openers, kyc 77, j70c 78, j71c 80 comps, wc 91) — CONVERT, don't rebuild | review/kit-dialogue-vn-r1 214c6b2c (KIT §95 kitDialogue.play / kitScene.light / kitTypeLine = the ONLY UI) merged here; review/dialog-person*, kit-dialog* = the old person-talk modal (not a scene; untouched) | claims none.

## STATUS
- (24/11 ~07:00Z) LEAD #1 session_01N1tNP4b3uXPGSvnVmsC51b (opus). START_CTX ~4 % (used_tokens reads 0 → own estimate); roll at ~29 %, ceiling 60 %.
- Branch **review/sideline-dlg** = origin/main 0c0877a2 + kit-dialogue-vn-r1 214c6b2c + thin-p4-r2 7429bfa3 + thin-p6-r2 aea1baec (both LAND READY, merged so their seeds can carry scenes; drop the merges once they are LIVE).

- (24/11 ~07:55Z) LEAD #2 session_01N1tNP5NjXSPTa5bEfwmqcY (opus). START_CTX ~5 % (estimate; 1M window) → roll at ~30 %, ceiling 60 %. Worktrees /home/user/wt/sdlg (code) + /home/user/wt/sdlg-ho (handover).

- (24/11 ~08:15Z) LEAD #3 session_01N1tNP6z16eEuagFdH5WCZE (opus). START_CTX ~4 % (used_tokens reads 0 → estimate; 1M window) → roll at ~29 %, ceiling 60 %. Worktrees /home/user/wt/sdlg (code, sparse + dev/art + dev/measure) + /home/user/wt/sdlg-ho (handover).
- (lead #3) 89de4172: OPEN 1–3 of lead #2 closed. (1) j68 «no scene resolved» = TEST only: the game's evGate pacing (one optional card per buổi/day, same actor) dropped every j68 card after the first in one test life → the test clears e68().sch/EVHOLD/EVLAST per unit. (2) REAL FAULT, fixed family-wide (law 11): actors of kind «kid» (j68 kid seeds 49 roles, ky kid 9) had no figure → scene silently skipped; dlgsActor now paints kid like ak (kidFigSrc). (3) REAL FAULT, law 11: GEN placeholders {S}{E}{M} (validator allows them in every family) were filled only by some family fills → ky {S} scenes (kyc-sv-019/021) dropped; one dlgsGen() now fills them for every family. Scan GEN use: j72 {M} 63, j68 {M} 27, wc {M} 2, ky {S} 2 → before: ky 2 dropped; after: 0. Test: ky W cast from the same sources as jky kyPpl (rival / emp / th / men / court post / elder / a rival's servant or young child / lãnh cung), mid-life household (staff, young child), serv seeds get a bigger household. Targeted reruns: j68 every 8th + all ky + kid → ALL PASS. Figure-kind probe (rv/sv/maid/emp/th/doc/eun/ksp/kid/man) → every kind paints its own figure role. Running: full dlgs-play Fold (1233) + iPad (every 3rd).

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

- (24/11 08:05Z, lead #2) 9ac0922a: lead.md dropped its j72c-fam-001 (W2 owns it; was a duplicate id) → validator 0; jdlgsd.js + site rebuilt (262 scenes). 14d7cf3b: validator FLAT check (stock «Được./Vâng./Ừ.» replies; «ngài» spoken TO the listener → {goi}); `--strict` makes them errors (writer brief updated: QUALITY BAR + --strict). Law 11 scan «ngài» in all files: 20 lines in j72_b court → {goi} (+1 third person → «Hoàng thượng»); j72_a 0. FLAT now: j72_b 0, j72_a 48 (stock «Được.» in 48 of 127 scenes, no scene-setting line, avg 4.1 lines) → POLISH slice W1p requested from Foreman B (rewrite j72_a to the W2 bar).
- Read 10 random of j72_b + 8 of j72_a: W2 good (nar opener, real facts, feeling); W1 correct but flat.
- (08:40Z) REAL FAULT found by the sample run, fixed family-wide (law 11): scenes whose left person is the Thái hậu (req th: 8 j72 seeds + every j68/other unit casting th) or her grown CHILD (req ak) were SILENTLY SKIPPED — figFor() got an actor object without `kind` (th) / kids paint from the kid set, not figFor. 122cad26: th/emp resolve by kind; 39c6e9f0: ak via kidFigSrc. Probe: craft-056/court-019/court-024/social-011 (th), court-010 (emp), craft-006/social-008/social-053/fam-046 (ak) now resolve + play (ALL PASS). Test fixes: grown test child (as j72c-play), no birth bloom, finish-tap only while typing (fam-056 short-line race), DLGS_ONLY=id,… filter.
- Sample DLGS_STEP=5 after the th fix: FAILED 6 (pass 2724) = only the 3 ak units ×2 devices → fixed in 39c6e9f0 (targeted rerun ALL PASS). Shots looked (Fold + iPad): speaker lit, other dimmed, Thái hậu + princess figures painted. Running now: quickcheck, then full dlgs-play (all 262, Fold + iPad).

- (08:20Z) ALL 9 SLICES IN (6676d59b): W1p j72_a 127 (polished), W2 j72_b 129, W3 j72_old 110, W4 j68_a 127, W5 j68_b 120, W6 j68_c 129, W7 j68_d_ky 161, W8 j7_wc 172, W9 j70_j71 158 → **cover 1233/1233 (100 %) for all 7 families**, validator --strict 0 errors / 0 flat. lead.md removed (its 6 ids were all owned by writers = duplicates). Lead read 1 random scene per file: correct facts, nar opener, real cast; 1 stage direction inside her line (j71 fc-xb-c09) fixed; scan for others: 0.
- Gates so far: every family play test no-arg ALL PASS (j72c 256 built, j68c 460, kyc, j70c 78, j71c, wc 91, j7c); undef-scan PASS; quickcheck (39c6e9f0): open 2188 ms, old save ok, perf new/live render 280/322 buổi 1273/1622 → PASS; its core gate G4 «mk-layer-scan» failed only because the sparse worktree lacked dev/art (added; rerun on the final sha). dlgs-play full 262 on Fold: only harness «cannot cast» (fixed 2a248d21, rerun ALL PASS). Running: dlgs-play DLGS_STEP=4 over 1233 Fold + iPad.

## HANDOVER (LEAD #2 → LEAD #3; written 24/11 ~08:55Z, context ~30 %, START ~5 %)
Branch review/sideline-dlg **b271b221** = all 9 slices (1233/1233 units, validator --strict 0) + engine fixes (th/emp/ak figures) + LIVE main 056c2402 merged (thin-p4/p6 LIVE; kit-dialogue-vn-r1 214c6b2c still NOT live, keep it). Built files committed.
Gates DONE: family play tests no-arg ALL PASS (j72c/j68c/kyc/j70c/j71c/wc/j7c, on 2a248d21); undef-scan PASS; quickcheck on 39c6e9f0 functional PASS (open 2188 ms, old save ok, perf ≤ live) but core gate G4 failed for a sparse-checkout reason (dev/art missing → now in sparse set: `git sparse-checkout add dev/art`).
OPEN (successor, in order):
1. dlgs-play DLGS_STEP=4 over 1233 (build 6676d59b, Fold + iPad): every sampled **j68** unit (114) + 9 **ky** units FAIL «no scene resolved»; j72/j7/j70/j71/wc pass. On the MERGED build b271b221 a targeted rerun `DLGS_ONLY=j68:j68c-day-005,ky:kyc-sv-019,j68:j68c-emp-001` → day-005 PASS, emp-001 + kyc-sv-019 FAIL. A probe showed j68 day-005/009/visit-002 resolve fine via dlgsResolve with the real fill (e68Fill(j68cO)) → so the j68 test failures may be the j68 test path (e68Push → showModal → Q[0].dlg; j95 actor gate / another card first) — rerun j68 on b271b221 first: `DLGS_ONLY=$(python3 -c "...j68 ids...") node dev/test/dlgs-play.js <out> fold 3`, then dig only what still fails (emp-001: A = Hoàng thượng in j68 — check e68X A.k is "emp" and dlgsActor's emp branch).
2. ky: the TEST builds W without a real ref for kind sv/el/court/kid (dev/test/dlgs-play.js ky branch) — in the game jky picks a real person (w.ref; court = pDoc/pEunCourt, kid = kidFace). Fix the test to cast W like jky (or pick a real servant), AND law 11 in the ky adapter (jdlgs.js DLGS.R kyngo): kind "kid" → kidFigSrc, kind "court" (ty doc / court eunuch) → a figure by kind (figFor({kind:"ty"}) / eunuch), as jky's face() does.
3. j68c-serv-058 «cannot cast» in the test (forced cast list lacks its need) — harness only.
4. Then: quickcheck on the final sha (`bash dev/tools/quickcheck.sh`, run ALONE), coop-e2e both seat orders (`node dev/test/coop-e2e.js` — the scene is per-seat Q; check a seat never plays the other's scene), dlgs-play sample both devices ALL PASS, look ≥6 shots per device 3× → «SẴN SÀNG KIỂM <sha>» to Foreman B (B opens the opus BIG reviewer at once).
Optional polish (writers noted, not errors): j72_b fam openers «Ngươi đọc ta nghe» repeat; ky / wc / j70 closing lines similar rhythm. KIT REQUEST (tail side) stays.
Lead #2 fixed this session: duplicate ids (lead.md removed), «ngài»→{goi} family (20), validator FLAT/--strict, th/emp/ak figures (scenes were silently skipped), test forced cast (26 units), test DLGS_ONLY filter, short-line tap race, merge LIVE.

## KIT REQUEST (for KK18, not blocking)
- §95 kitDialogue: the speech tail always points LEFT (kitDlgBox tail on the left edge); when the RIGHT figure (her) speaks it should point right. Ask: a `tail:"r"` side (or auto from the lit figure's side). Until then the box sits bottom-centre over both figures.

## WRITERS
- (24/11) W4 j68_a.md DONE 127 scenes, W5 j68_b.md DONE 120 scenes, W6 j68_c.md DONE 129 scenes (all --strict 0 errors / 0 flat). Last id done: j68:j68c-kid-042. Unit with no `A` person (sea events) use L = M (her cung nữ reports). Self-read pass pending.
- (24/11) W1p j72_a.md POLISHED (127 scenes, nar opener, no stock replies, --strict 0). W3 j72_old.md DONE: 110 scenes (the 110 T7 templates), --strict 0 errors/0 flat. Fam letters (r:fam) L = M; sứ thần fam letters L = A. Self-read pass pending.
- (24/11) W1 j72_a.md DONE: 127 scenes (63 craft + 64 social), 0 errors on dlgs_validate (review/sideline-dlg 03f4f781). Last id done: j72:j72c-social-064. Include the lead's two fixture ids (craft-001, craft-007) as written there. Self-read pass pending.
- (24/11) W2 j72_b.md DONE: 129 scenes (63 court + 66 fam), 0 errors on dlgs_validate (review/sideline-dlg 03f4f781 tree). Last id done: j72:j72c-fam-066. fam units (all L = M): sv/ak/maid asks are told by M bringing the servant's plea or the child's letter. Self-read pass pending.

## HANDOVER (LEAD #1 → LEAD #2; written ~07:40Z, context ~25 %, START ~4 %)
State (07:50Z): review/sideline-dlg HEAD has the validator address rule, W1 j72_a + W2 j72_b (both lead-fixed, also on the handover branch), lead.md (7 scenes), DLGS_STEP filter. jdlgsd.js / index.html NOT yet rebuilt with W1+W2 (quickcheck on c5aba2a7 was running in that worktree; rerun it on the new build). Cover: j72 256/366, others 1 each → 262/1233. Worktree /home/user/wt/sdlg (sparse), shots /home/user/wt/sdlg-shots (outside git).
Successor steps:
1. Fetch review/sideline-dlg; copy every `dev/handover/content/dlg/*.md` from the handover branch into the worktree (lead.md lives only on the code branch); `python3 dev/test/dlgs_validate.py dev/handover/content/dlg/*.md --cover` → 0 errors (fix typed address words mechanically: «nương nương» in a non-me line → {Goi}/{goi}, «tôi» → {xung}; see W1 fix 07:35Z); `python3 dev/build/jdlgsd_build.py`; `bash dev/site/build_site.sh`; commit index.html/sw.js/assets.json with the data.
2. `DLGS_STEP=5 node dev/test/dlgs-play.js /home/user/wt/sdlg-shots fold,ipadAir 6` (sample) and a full run before SẴN SÀNG KIỂM; look at ≥6 scene shots per device 3× (outside git).
3. Writers (Foreman B opens; brief briefs/b-dlg-writer.md): W1 j72_a DONE (fixed: typed address words), W2 j72_b DONE (fixed: maid «nhà ta», «chị ấy»; self-read not done by W2), W3–W9 waiting for seats. Read 10 random scenes of every finished file before merging (typed address, flat lines, wrong person).
4. Gates before SẴN SÀNG KIỂM: validator 0 + cover table 100 % for the 7 families (law 11), dlgs-play ALL PASS, quickcheck (`bash dev/tools/quickcheck.sh`, run on c5aba2a7 by #1 — result below if done), `node dev/test/undef-scan.js`, old saves (`node dev/test/norep-oldsave.js <live index.html>`), coop-e2e both seat orders (the scene is per-seat Q: check a seat never plays the other seat's scene), every *-play test no-arg + args (j72c/j68c/kyc/j70c/j71c/wc/j7c — the dlg field must not break them).
5. Second wave (after W1–W9): the OLD composed text — 33 old j7 ev() cards, 90 old j68 decisions, 25 old kỳ ngộ, 51 old j70 routes: add their units to dlgs_validate.py (UNITS) + resolvers (j68 old: pid "e68<id>" non-c; j7 old ev(): find its card) and a W10 brief slice.
6. Drop the thin-p4-r2 / thin-p6-r2 merges once LIVE (merge LIVE main instead). KIT REQUEST (tail side) stays filed above.
- (24/11) W7 j68_d_ky.md DONE 161 scenes (84 j68 myst+rumor, 77 ky), W8 j7_wc.md DONE 172 (81 j7, 91 wc), W9 j70_j71.md DONE 158 (78 j70, 80 j71); each `--strict` 0 errors/0 flat; cover j7/ky/j70/j71/wc 100 %. Pushed 31ea9c68. Notes: lead.md ids ky:kyc-ma-002 etc. now duplicate W7 (drop from lead.md). Rhythm similar in ~30 ky scenes and many wc/j70 closers (polish pass optional). ky kyc-vat-001/002/003/005/012/013: W speaks from off-scene (source has no W speaker). Sub-writers sonnet; self-read only partial.
