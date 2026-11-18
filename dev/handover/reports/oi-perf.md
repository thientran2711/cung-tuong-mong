# oi-perf — origin-intros opening long task (worker session_01UV1SziJLwwyFFAvzGMHcyD, 11/17/2026)
START_CTX ≈ 5 % (estimate). Branch `review/batch-0032-oi`, base 5e5eb4c8 → **head 4f5c75d9**. Live compared = local origin/main of this box (older than today's main 0f61ff92).

## Root cause (Playwright CDP trace, iPad 1180x820)
1. "Nhận thân phận" tap = **4 full render() + 4 showModal()**: every module hooking nlAccept (jkc2 Tuyển chọn, jentry Tiền truyện, joi panels; jkc/jkiep/jage/jcoopworld) ends its hook with `showModal();render()`, and closeModal renders again. The first showModal is the costly selection card (jkc2 inserts "Tuyển chọn", jentry/joi then put the story panel in front). Trace: 612 ms task at CPU 1x, render 4× ~70 ms + forced layout (clientWidth/offsetParent).
2. The opening is now **8 cards** (life card, 4 story panels, selection, Nhập cung, Mệnh truyện) instead of 2–3; each close/choice redraws the whole board under the next card. quickcheck's SETTLE closes up to 8 cards in ONE task → 3.2–3.7 s task.
3. quickcheck harness bug (new AND live): NEWLIFE re-rolls with `start()` but never clears the pending life (ctm-nextlife), so a first life that is cung nữ re-rolls the SAME life 40× in one task → 27–33 s "long task" (seen on live too: 27861 ms), it poisoned the medians.

## Fix (no behaviour change: same calls, same order, same final screen)
- `dev/build/jrbatch.js` (assembled LAST = outermost wrapper): `renderHold` — while nlAccept runs, render()/showModal() only mark "wanted"; one showModal + one render when the outermost nlAccept returns.
- `dev/build/j3.js` closeModal: life card (m.nl) onClose runs held (closeModal shows+renders right after); chooseM/closeModal with another card following: `renderSoon()` = one render at the end of the current task (microtask; a later render() in the same task cancels it) — a single tap keeps its render in the same task, a run of cards renders once; an origin story panel (entI, no onClose) followed by another card: no board redraw (nothing changed).
- `dev/tools/quickcheck.js` NEWLIFE: `store.set(NL_KEY,null)` before each reroll (same idiom as origin-intros/flow.js). Gate thresholds untouched.

## Numbers
| measure (iPad 1180x820) | live | before (5e5eb4c8) | after (4f5c75d9) |
|---|---|---|---|
| life-card tap, CPU 1x, sync / to frame | 73 / 201 ms | 377–432 / 544–666 ms | 166–194 / 291–327 (1st fix only) |
| life-card tap render()/showModal() calls | 1 / 1 | 4 / 4 | 1 / 1 |
| SETTLE 8-card task, CPU 4x | (2–3 cards) | 2.3–3.7 s | 1.07–1.32 s |
| quickcheck longTaskMaxMs median | 1146–1236 | 4400 (3/3 FAIL) | 1311–1626 (limit ≈ 2000, always OK) |

QUICKCHECK on the final code (qc4 = after harness fix, qc5 = head): **4 PASS / 7 runs**, never on longTaskMaxMs any more. The fails are all by 1–2 units on OTHER metrics: renderMs 292/291, tabMs 365/364, longTasks200 13/12, 14/13, 15/14.
- **NOT ×3 PASS in a row.** Remaining gap = steady-state render()/tab cost +35–45 % vs live (render 260–300 vs 190–215 ms at 4x; DOM 1600–1900 vs 1270–1360 nodes; act panel 21–28 cards vs 16). Part of it is already in the pre-OI batch (42939eaa5: render median 231 vs live 211; opt-greyed-2 shows greyed cards). longTasks200 +5–6: each extra opening card is one >200 ms tap at 4x.
- Suggest a follow-up task "render-cost" (act panel layout thrash: tabsFit offsetParent, k3Stage clientWidth, kitSealHud/kitHdMe getBoundingClientRect inside render) — outside the OI click.

## Other gates / tests
- core gates (one-core-guard 0 fails, rules-one-source, kit-conform, co-op one-world hook) PASS in every quickcheck run; old save from live loads + plays: ok.
- entry-exam/direct.js PASS 9/9.
- origin-intros/flow.js (1180 + 755, cung + nha), oldsave.js: FAIL — **identical on the untouched base 5e5eb4c8** (checked side by side tt/nc/cnv/muoi): "no kit picture band 1–3" (the test's `#mb > .kdlgart` selector vs the batch-0032 kit-size merges) and oldsave "no saved slot on NEW" (old/new served on two ports = two origins on this box). Not caused by this fix; needs a test update by whoever owns the batch kit change.

## HANDOVER
Code pushed. Left: decide on renderMs/tabMs/longTasks200 borderline (follow-up render-cost task, or accept), update origin-intros/flow.js picture-band selector to the batch kit markup.

---
# oi-render (worker session_01964izCi8228y2v2JjEknpd, Foreman D #8, 17/11) — render-cost root fix + 2 tests + kc2val
PRIORITY #1 CHECK ('render-cost|batch-0032-oi|oi-perf'): OD 1 | ledger 0 | claims 5 | main 0 | review/* 1 → reused review/batch-0032-oi @ 4f5c75d9 (no new branch); reused lag-play-2's jlag2 render depth (__rdep) as the one mechanism.
START_CTX ≈ 5 % (get_session read 0; own estimate). Branch review/batch-0032-oi, head **de6a876b**.

## 0. Merge live main 7abaf07a → 73db6e4a
Conflicts: KIT_REQUESTS.md (both rows kept), CHANGE.txt (main's lines + "mỗi xuất thân có đoạn dẫn vào cung riêng"), index.html/sw.js/assets.json rebuilt.
After the merge the old +35–45 % gap was mostly gone (the pre-OI batch is live now): render 232/251, tab 319/288 (new/live).

## 1. Render-cost ROOT fix (same behaviour, no gate threshold touched)
Cause (CDP trace, Layout/UpdateLayoutTree with JS stacks + InvalidateLayout between them): every render() forced **~12 layouts**, ~40 % of render time:
part fits READ layout (clientWidth, scrollTop, getBoundingClientRect, innerText, computed style) after other parts had WRITTEN.
Fix = ONE mechanism, `window.renderAfter(key, fn)` in jlag2 (owner of the render depth): inside a render the read runs once per key when the
OUTERMOST render returns (same task, before paint); outside a render at once. Whole family converted:
| reader (file) | before | after |
|---|---|---|
| k3Stage (jk3) | 3x per render (renderHud2, renderStage, render), 3 forced layouts each | once at render end; tags/floor re-placed if gutters changed |
| kitSealHud (jseal) | in renderHUD | render end |
| j59 name-tag tooltips innerText (j59) | in renderStage | render end |
| kitFloorFit (jk2b) | in renderStage | render end |
| kitPane bar measure (jpane) | in renderPanel/k3CatTabs | moves stay at once, measure at render end |
| rail paint (jrail) | 2x (renderStage + render) | once at render end |
| panel scroll keep — j6, j42, j72, jhc, jht, jkc (new shared `panelScrollKeep`) + jhc same-tab keep | scrollTop set right after innerHTML (full layout), read again after kaNorm (2nd full layout) | once at render end |
| tabsFit (j57, j79 kgBar, jkc) | re-measured 2x EVERY render: j42 srvTabs reset the Hậu cung head to "Chí tôn" and kgBar set "Hậu cung" back (text flip) | flip removed (writes only when different, kg head left to kgBar); measure at render end |
| kitTabStick in k3CatTabs (jk3) | in render | render end |
| jhc court sub-tab | read P.clientWidth (both branches "Chí tôn") | no read |
Per render: ~12 → 2 forced layouts (trace, iPad 1x). Pixel check (same saved life loaded in base 73db6e4a and new, every tab + scrolled act panel, Fold 755x1000 + iPad 1180x820): **0 px difference** except broken-image glyph timing (net blocked); panel scrollTop and tab font size identical.
| quickcheck (iPad, CPU 4x, median of 3, new/live) | render ms | tab ms | buổi ms | tasks>200 ms |
|---|---|---|---|---|
| after merge, before fix | 232/251 | 319/288 | 757/795 | 11/11 |
| run 1 | 145/254 | 250/280 | 622/734 | 8/10 |
| run 2 | 171/245 | 230/291 | 725/1460 | 10/12 |
| run 3 | 157/228 | 273/309 | 757/1142 | 11/11 |
**QUICKCHECK PASS 3 runs in a row** (core gates PASS each: one-core-guard 0 fails, rules-one-source, kit-conform, co-op hook; old save ok).
DOM/act cards: unchanged by this task (the greyed cards are live content now on main too).

## 2. The two tests
- origin-intros/flow.js: panels 1–3 are now the kit-size card (`#mb > .k3body > .k3main.k3mpic > figure.ksart`, jksize), panel 4 `.kdlgart`; the test accepts both kit picture frames (BAND). **PASS 3/3** (tt, nc, cnv @755x1000).
- origin-intros/oldsave.js: serves old + new builds itself from ONE origin (args: git ref / index.html / folder / URL; "/" switched by /__ver). `node oldsave.js origin/main HEAD` **PASS 3/3**.

## 3. kc2val re-measure (row 60) + a measuring-bot fault, whole family
First run: nc palace arm 16/24 lives TIMEOUT at month 0. Cause: opt-greyed-2 shows "Tố giác …" greyed (c.off) on "Sau vụ mưu hại"; chooseM ignores a greyed option, the bot kept picking it → loop. Same on the base build (not this change). Fixed in every option-picking bot: 10 sites in dev/measure (inpage4/5/6, inkc, kc2val, reign) + dev/test (act-dedupe-bot, act-pics, event-dp-scan, news-face-real): before 10 sites without `!c.off`, after 0; quickcheck SETTLE/BUOI pick the first non-greyed option (thresholds untouched).
Re-run SEED 51–54 × 6 lives per arm, both arms fresh (raw dev/measure/kc2val-oi-s5*.json):
| origin | palace V (sd, alive) | home V (sd, alive) | gap home − palace (± se) | per seed |
|---|---|---|---|---|
| cnv | 315 (99, 23/24) | 298 (17, 24/24) | **−18** (±21) | −2 / −19 / 49 / −88 |
| nc | 306 (66, 22/24) | 330 (9, 24/24) | **+25** (±14) | 29 / −2 / 39 / 33 |
Both inside the band (within ~2 se and well inside the palace spread) → **BAL.kcv unchanged**.

## 4. Other gates
entry-exam/direct.js **PASS 9/9** (755x1000) · coop-e2e (live Worker) **60/60** (not worse than live) · Fold + iPad shots looked at (no overlap, nothing cut; identical to base).

## Notes
- All commits on review/batch-0032-oi: 73db6e4a (merge), 247a71b7, 62ac4436, 0eaa6353 (render), 7f984d67 (tests), bots fix, kc2val files, head de6a876b.
- Worktree /home/user/wt/oirc removed after push.

SẴN SÀNG KIỂM de6a876b72f1ee9c63bc3cc26438c499338a1aa9
