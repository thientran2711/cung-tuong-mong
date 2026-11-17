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
