# KIT-STAGE-R3 report (MAIN CHÍNH 161) — Bàn bài kitHand + thẻ gỗ kitPick, part of the ONE new animation kit set

depth 1 · START_CTX ~4 % · branch `review/kit-stage-r3` (NOT for landing alone — OD 26/11 ~19:00Z: the set lands as ONE with RING-BUILD + MOTION-BUILD under KK44).

PRIORITY #1 CHECK ('kitHand|kitPick|kitKind|place card|kitFocus'): OD 26/11 ~18:55Z + ~19:00Z (read verbatim) | main f573dc94: no kitHand / kitPick (r2 not live) | review/kit-stage-r2 ec2f7c43 (base), review/nhv-areas + review/kit-ring5 (kitPick only in the talk stage, no place / focus wiring), review/place-stage (old) | claims: KK44 (kit owner), RING-BUILD (ring), MOTION-BUILD (vòng bảo vật). Reused: kitHand, kitStage, kitPick, kitFocus.btn plaque — no new part invented.

## What changed (commits on review/kit-stage-r3)
1. **Merge LIVE f573dc94 into r2 ec2f7c43** (e89698de). Conflicts: built files (rebuilt), `assemble.py` (LIVE list + jkpick / jkhand / jkstage / jkmapban, kit files last so the showModal wrappers wrap LIVE's), `jksize.js` scroll cue = LIVE's one-pass rule (kscSoon, `:not(.sib)`) + r2's KK31 list watch / stray strip rules. `scroll-cue-loop.js` PASS. Door frames (jdoor PEND.door, jactj4 tab doors) now on the branch; PEND.door is an event-choice hand with ONE figure (the person), its in-focus door list is thẻ gỗ (see 4).
2. **KIT §101.9 kitKind — the hand is OPT-IN BY KIND** (`jkhand.js`). The showModal pass no longer turns «any 2–10 option list» into a hand. `kitKind(m)` → `hand` | `pick` | `ring` | `group` | `list`; sources (first wins): `m.kind` set by the builder → place card `m.placeK` = pick → `KIT_KIND.pid` registry → an option with `grp` = group → kitPanel info/rule/help = list. ring / group / list frames are NEVER a hand (they keep today's list until RING-BUILD's ring lands with the set; RING-BUILD hooks on `kitKind(m)==="ring"|"group"`). Unnamed frames are a hand only if they pass the old structural test (story + 2–10 kit cards, not every card a person) — the census below shows every opened frame's part.
   - ring: `hireCard` (j29, kind), `eaScoldPick` (jemoact, kind), PEND `runner`, `cmPick`, `plantsv`, `evpick`, `itarget`, `pgpick`, `entpick` («Chọn người theo hầu» retinue, found while filming).
   - group: `palCeremony` (j27 + jbancung override, kind), `rgJoinOpts` options carry `grp` → PEND rg join beats (c2a «Tân quân lập uy · Chương 2», change-side beats) = group. Tests that used c2a as THE hand sample now use c1b.
   - `pushDil` copies `d.kind` (j3).
3. **§102.3 THẺ GỖ AT THE PLACE** (`jkstage.js kstgPickPlace`): the place card (KIT 32.8: Đi tới / Xin bái kiến / Xin yết kiến / Lẻn vào / greeting / last walk) = the place painting as the stage, NO figure, the place lines in the light box (iPad left column, Fold band under the title), the card's choices as kitPick plaques on a signpost (≤ KIT_PLAQUE.max per page «Việc · 1/2»), tap = lift + line, ✓ = the card's own button (same chooseM path), ✕ = put back. Knobs KIT_STAGE.pickCol / pickBand / pickGap.
4. **§98.11 FOCUS ACTS = THẺ GỖ** (`jfocus.js fillPick`): the Dư đồ focus view's acts (KIT §98 replace order 1) and the NPC-initiated choices `F.choices` (order 3, incl. the in-focus door lists) hang as kitPick plaques on the signpost RIGHT of the person (owner 18:55Z «bên phải là sẽ thả xuống mấy cái nút giao tiếp»); the focus group tabs stay; a robot / keyboard click (detail 0) acts at once; say / play / close remove the plaques. `KIT_FOC.pick=false` = old fan (kit page only). `act-merge-j1-tap.js` taps the plaque then ✓ (force click: plaques sway).
5. **§102.7 ONE FIGURE** (owner 18:55Z «2 người xuất hiện chỉ khi nào mà đó là cuộc hội thoại giữa 2 người»): only a dialogue (§102.2 talk stage) keeps two figures; any other stage = the speaker (her figure never walks in), or her alone when there is no other speaker; a thẻ gỗ place card = no figure. KK36 dedupe runs first (a «speaker» that is her is no speaker). `kit-stage.js` check rewritten: ONE figure.

## Census — dev/test/kit-kind-scan.js (Fold; every PEND family that opens from the opt-scan state + the KK44 Q-pushed builders)
| frame | kind (r3) | LIVE f573dc94 | r2 ec2f7c43 part / figs | r3 part / figs |
|---|---|---|---|---|
| PEND:ch1 | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:ch2 | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:trungcuu | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:dongchi | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:j7c | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:ksp | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:night1 | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:night2 | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:giu | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:evpick | ring | list | list / - | list / - |
| PEND:itarget | ring | list | list / - | list / - |
| PEND:plantsv | ring | list | list / - | list / - |
| PEND:j70def | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:wdframe | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:vlnvp | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:runner | ring | list | list / - | list / - |
| PEND:pgin | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:rcpacc | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:cmBrawl | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:cmLand | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:cmSec | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:pmPick | - | list | hand / sp+me **WRONG** | hand / sp |
| PEND:pmLad | - | list | hand / sp+me **WRONG** | hand / sp |
| place:* | pick | list | hand / me | pick / - |
| palCeremony | group | list | hand / sp+me **WRONG** | list / - |
| hireCard | ring | none | none / - | list / - |
| rg c2a (join a side) | group | list | hand / sp+me **WRONG** | list / - |
| rg c1b (court choice) | - | list | hand / sp+me **WRONG** | hand / sp |

Frames opened: LIVE 55 · r2 54 · r3 54. WRONG (wrong part for the kind, or 2 figures on a non-dialogue stage): r2 22 → r3 **0**. Unchanged rows (same part + figures on r2 and r3, e.g. the 6 talk events = thẻ gỗ answers with 2 figures, dialogue) are omitted.

eaScoldPick is tagged at source (kind ring) but the scan could not open it (needs a real servant scold state).

## «old left» for my two kinds (KK44 table rows) — honest count
Card hand (KK44 §1, 14): DONE 2 — event option frames now by kind (PEND families, c1b etc., no wrong-kind hands left) · jdoor PEND.door (rebased in, a hand, one figure). Checked ok: sgAsk (auto hand). OPEN 11 — owner rulings needed first: long-name list exception (KK41), >10 cards, info panels (KK36); NOT YET BUILT: SELSCENE kbare answers, kpsc identity pair, Hành sự act deck, Khuê các decks, Tài nghệ / skill act cells, empty-tab act, jactj4 tab doors, jflip row, kpdlg guide buttons (all outside #modal — kitHand needs a non-modal host first: KIT REQUEST to KK44 «kitHand outside #modal»).
Thẻ gỗ (KK44 §2, 9): DONE 4 — talk answers (r2), place card (§102.3), Dư đồ focus acts (§98.11), jfocus NPC choices / in-focus door lists. OPEN 5 — popCard stage act rows (j6/j15 `#popw`, KIT §98 order 2), home servants' acts (jhouse), Hậu cung tab person-card acts (j15 pcard rows), place-entry chip «Theo» (jplst), jrail chips (owner: related?).
So old left: card hand 11 (3 wait on owner rulings) · thẻ gỗ 5. NOT at 0 — the set must not land yet.

## Videos (owner look gate) — real taps, ≤ 30 s, full device size
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r3/fold-banbai.mp4 (25 s) · ipad-banbai.mp4 (25 s): rg c1b «Tân quân lập uy · Hồi 2/2» — Thái hậu alone on the stage (one figure), deal, tap card → lift + plate, ✕, tap another, ✓ → chosen.
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r3/fold-thego.mp4 (27 s) · ipad-thego.mp4 (29 s): real tap «Dư đồ», then the place card of Cần Chính điện (opened by page code = what a map tap on a guarded place opens) as thẻ gỗ — lift «Xin yết kiến», ✕, lift «Lẻn vào» (Khó lường · Tốn 3 khắc), ✓.
Still: fold-focus-thego.png (focus view plaques on the person's right). I looked at the frames of every video (dealt / lift / put back / chosen; place / lift / chosen).
Known art gap: c1b card 1 «Cúi đầu vâng dạ» shows the placeholder picture (kit-hand.js «every card its own picture» FAILs on c1b for that card) → ART request: own picture for c1b option 1.

## Tests
kit-stage.js PASS (Fold + iPad) · scroll-cue-loop.js PASS · kit-kind-scan.js WRONG 0 (r2 22) · kit-hand.js FAIL 2 = only the c1b placeholder picture above · kit-stage-r3-video.js (videos) all steps ok, 0 page errors.

## HANDOVER (rollover; successor continues on review/kit-stage-r3)
Worktree: /home/user/wt/ks3 (sparse). Tools: dev/test/kit-kind-scan.js (census, `NOFAIL=1` for LIVE), dev/test/kit-stage-r3-video.js (videos; `ONLY=banbai|thego`). Next, in order: (a) popCard `#popw` act rows → kitPick (j6.js renderStage / j15 popCard; same pattern as jfocus fillPick: plaques beside the person's stage figure, ✓ = the act's existing click path); (b) jhouse servants + Hậu cung pcard acts → kitPick; (c) kitHand outside #modal for the act decks (KIT REQUEST to KK44 first, law 9); (d) owner rulings on long-name / >10 / info panels via MAIN; (e) re-run the census + videos, send sha to KK44.
