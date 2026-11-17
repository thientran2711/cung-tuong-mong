PRIORITY #1 CHECK ('batch-0032-oi|oi-perf|origin-intros|renderAfter'): OD 1 | ledger 0 | claims 8 | main 0 | review/* 4 → reviewed the existing branch review/batch-0032-oi de6a876b, no rebuild.

# Review oi-r1 (opus reviewer, Foreman D #8) — 17/11
START_CTX ≈ 6 % of the window (own estimate). Reviewed review/batch-0032-oi **de6a876b** (worker oi-perf + oi-render).
Branch **review/batch-0032-oi-r1** = de6a876b + live main **6c4f21c3** + reviewer fixes. Head **36f86d3a**; origin/main 6c4f21c3 is its ancestor (fast-forward).

## Merge
Only assemble.py + generated files conflicted. assemble = main's list (new jbalroad/jroad/jrd_*/jend14/jdemo/jlevel/jemoact) + jkc2, jentry, joi
after jemoact, **jrbatch last of the list** (outermost nlAccept/render/showModal wrapper as designed). jcoopthin is appended by assemble after
the list; it only wraps render() to queue a debounced co-op delta — harmless inside a renderHold. Site rebuilt (e7530a4f).

## (1) Render change behaviour-identical
- Pixel compare, same saved life, BASE = this merge with the two render commits reverted (247a71b7, 0eaa6353) vs HEAD, Fold 755x1000@2 + iPad
  1180x820@2: home, all 8 tabs, act panel scrolled + re-render, a dialog, rotate + rotate back. Panel scrollTop identical in every shot
  (incl. 1230/1507 after re-render, 2853/0 rotated, 2133/1148 back) → no stale layout after resize/rotate.
  Run 1 (CDN blocked): diffs only = broken-image glyphs. Run 2 (CDN on, waited for images): Fold 8–106 px per shot; iPad 0 px on home/act/go,
  one constant area = the stage figure's glow/light effect timing (same position, looked at side by side). Layout identical.
- Family scan: every render-time layout read in the branch's list now goes through renderAfter (k3Stage, kitSealHud, j59 tooltips, kitFloorFit,
  kitPane, rail, panelScrollKeep ×6 renderers, tabsFit ×3 callers, kitTabStick, jhc). New reads that main added since 7abaf07a checked: jmapc
  centring (wrapper after jlag2, only when the map slot changes), jsl clamp (rAF), jksize kszFeetFit (dialog fit, not render) — none per-render.
- srvTabs "write only what differs" + kg head keeps its group label: no visible change (pixel run).

## (2) Quickcheck — PASS 3/3 in a row (run by me on e7530a4f, iPad CPU 4x, new/live)
| run | render ms | tab ms | buổi ms | tasks>200 |
|---|---|---|---|---|
| 1 | 181/253 | 307/374 | 821/1075 | 13/13 |
| 2 | 193/310 | 288/382 | 935/1032 | 13/15 |
| 3 | 212/282 | 267/337 | 852/1027 | 14/13 |
Core gates PASS each run (one-core-guard 0 fails, rules-one-source, kit-conform, co-op one-world); time-spill guard PASS; old save from live loads + plays.
Buổi time below live in every run (limit live +5 %).

## (3) Tests (local server, HEAD build)
| test | result |
|---|---|
| origin-intros/flow.js 755x1000, all 10 origins | PASS 10/10 |
| origin-intros/flow.js 1180x820 tt,nc,cnv,cn | PASS 4/4 |
| origin-intros/oldsave.js origin/main → HEAD | PASS 3/3 |
| entry-exam/direct.js 755x1000, 9 origins | PASS 9/9 |
| kc-roads/kin-known.js | PASS 8/8 |
| kc-roads/route.js cnv / nc / bd @1180x820@2 | 0 fails each |
| kc-roads/direct.js | was 0/9 (stale since origin-intros) → **fixed test, 9/9** |
| coop-e2e.js (live Worker) | 60/60 (= live) |
Test fixes of the worker are honest: flow.js still requires the kit picture band (now also the kit-size frame .k3mpic/.k3ev the batch kit
markup uses); oldsave.js serves old+new from ONE origin (a save lives in one origin's localStorage) — no check removed or loosened.

## (4) kc2val — bot fix is a real bot bug; gap re-measured (SEED 61/62/63 × 6 lives per arm)
- chooseM (j3) refuses a greyed option (c.off) — game rule unchanged; the bots looped on it. Bot-only fix, OK.
- Re-measure with today's main bots:
| arms | cnv gap home − palace | nc gap |
|---|---|---|
| palace = main's inpage6 (diff-remeasure: self-study + kit pick dialogs), home = kc2val home bot | **−71 (±21)** | **−219 (±16)** |
| palace = same bot with self-study/pick OFF (window.__noSelf/__noPick), home = same | **−19 (±25)**, seeds −58/+13/−12 | **+12 (±17)**, seeds +27/+22/−12 |
  Cause: main's diff-remeasure (bcc994f43) taught the PALACE bot the free Tài nghệ self-study + pick dialogs (palace arts 25 vs home 4–5), the kc2val
  HOME bot was not given it. The home road HAS the same Tài nghệ tab and "Tự học" (probed: cnv + nc home, tab art, lessonMode → "Học X: làm gì?").
  Like-for-like (both arms without self-study) the gap is inside the band, same as the worker's (−18 / +25) → **BAL.kcv unchanged: OK**.
  I tried to give the home bot the same self-study: the pick → minigame step is asynchronous and kc2val's home policy is one synchronous loop
  (it nulls S.mg), so it gained nothing; reverted (no ineffective tool code shipped).
  **F1 (follow-up for Foreman D, not this branch): make kc2val's home bot self-study like inpage6 (async step: pick "Làm" → #mgskip/#mgok) and
  re-measure; if the gap is then still outside the band, retune BAL.kcv (OD:L1288).**

## (5) Other gates
- one-core-guard 0 (quickcheck core gates). jkc2 ONE-CORE move (819fb9cf, 149 numbers → BAL.kc2): checked by substituting all 138 BAL.kc2 keys back —
  identical to the old jkc2 except the khắc label now prints BAL.kc2.kcGoWhy_k (=1). joi/jentry unchanged since the origin-intros-r1 PASS.
- KIT FIRST: no private CSS/inline style in joi/jentry/jkc2/jrbatch; VANPHONG: no % / "Chắc chắn" in their player text.
- Old saves: quickcheck old-save + oldsave.js PASS. coop-e2e not worse (60/60).
- Shots looked at (Fold + iPad): intro panel 1/4, exam frame, Nhập cung card; nothing overlapping, feet visible.

## Reviewer fixes on review/batch-0032-oi-r1
1. e7530a4f merge live main 6c4f21c3 (above).
2. 6dde1bdc **greyed-option bot fix, rest of the family**: the worker fixed 10 sites; a scan found 42 more in 25 bots/tests (generic loops picking
   chooseM(0), a random option, the last option, or a bac-only filter) that stall on a greyed option. All now skip c.off. Before/after: 42 → 0
   sites of those four patterns (dev/measure firsthour, m43/smoke, routes, uismoke; dev/test perf, spread-e2e, origins, roster_*, ledger_*,
   kc-roads/route, kc-lore/route-td, outside/*, …; node --check all).
3. 36f86d3a kc-roads/direct.js: skips the intro panels (oiP) and accepts the selection named for its road (Lễ ra mắt / Xét phong danh phận): 9/9.

## Notes (not blocking)
- N1 (kit keeper / D): the post-exam "Nhập cung" card (jentry art band) at 755x1000 and 1180x820 needs a scroll inside the card body to reach
  Theo hầu … Vì sao, and the figure's name tag at its foot sits under the scroll edge on iPad; text wraps (measured), nothing is lost. Live main's
  card (no band) shows name on top. Option: put "Vì sao" right after "Phong", or a kit size that keeps the name tag in view.
- N2 (pre-existing, already reported in origin-intros-r1 N1): the Nhập cung card behind the exam frame shows the CEILING rank until the exam ends.
- No shots in git or on the CDN; scratch shots deleted.

PASS 36f86d3a49c66f2c7f625e59d544063d7917d51d
