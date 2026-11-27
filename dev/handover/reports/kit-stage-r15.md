# KIT-STAGE-R15 report (MAIN 179 worker; succeeds R14) — branch review/kit-stage-r15 cec55446
PRIORITY #1 CHECK ('kit-stage-r14'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 4 (kit-stage-r14, -fix 4fa50496, -rv171 7f88d2a6, -rv174 739d3478) | archive 0 — continued on them (brief = kit-stage-r14.md ROUND 4 + rv-174.md §2). git grep for the frame-height rule: jksize.js 56.25 grow (kgrow) + :root --kph (j79) + jend .modal.kes margin — reused, no new part.
KIT CHECK: reuses the live frame size system (jksize kszlive / KIT_SIZE.v3.live, 56.17 figure fill, 56.25 grow), jend end scene bands (--kes-top / --kes-bot), §0.0a --kvh; dev/kit/KIT_CHECKLIST.md. kit-std-scan pasted below.
START_CTX ~3 % of the window (get_session read 0; own estimate).

## Chain
739d3478 (RV-174 stack) + merge LIVE 772bee4f (3a4bf9c5) + fix (cec55446). Gate: `git merge-base --is-ancestor 772bee4f cec55446` OK, 0 files deleted vs LIVE.
Merge conflicts: assemble.py (module list = union: LIVE jglink/jplink + R14 jkpcard, each once); j3.js (LIVE empty-modal kitModalLive + R14 kitDlgTwinsDone calls in closeModal / chooseM); jph.js (kit-g4-r3 §59.1a neutral wait ground kept, extended to LIVE's eunuch e / es wait keys); jpma.js + tainghe-info.js = LIVE (owner 25/11 people-tab ruling); index.html / sw.js rebuilt; assets.json = LIVE.

## RV-174 FAIL-1 — cause
- iPad (kv2): an L/XL live frame's max height is `:root --kph` = 70 % of the screen (574 px on 820) unless its text / option list still scrolls; then 56.25 grows it (`data-kgrow=1`, cap min(100×kvh−24, 780)). So the XL height followed the CONTENT: «Đại kết cục» (long text) grew to 753 px, «Kết cục» / quiet end (short) stayed 548 px → two figure sizes (620 vs 415).
- The end scene (`.modal.kes`, jend) puts a margin-top (--kes-top − --kes-bot ≈ 69 px) on the frame for the crown band; the grown 753 px frame then ran past the screen (iPad 69..822 of 820). Pre-existing on LIVE (all three ~754 and all cut).
- Bisect (f04b1201 good → 6d9fe822 bad, probe = iPad DAI vs KET height): first bad = **cbe6290f** kit-stage-r6 (close-only cards → kit ✕ «Thôi»): the Kết cục body got shorter, so it stopped growing. Not the suspects 15a7db55 / 6396bf4e / 352a5310 / 80d1fb88 / 39ad2e6f / 59cba434. The real fault is the content-driven XL height, not r6.

## Fix — KIT §56.33 ONE XL FRAME SIZE PER DEVICE (jksize.js live CSS + KIT.md)
- An XL live frame (not the hand stage .kstage) is ALWAYS the screen room: `height: var(--kph)`, --kph = 100×--kvh − room.gap, iPad at most room.max. New `KIT_SIZE.v3.live.room={gap:24,max:780}`; the 3 typed 24 / 780 in the live CSS (kv1 L/XL, kv2 kgrow, kv1 stacked) now read it too (law 4).
- End scene: `min(room, 100×--kvh − --kes-top − --kes-bot)` so the frame fits under the crown band and above the foot band.
- The room uses --kvh (px), not %: with % the computed max-height stayed a `min(...)` string, kszFeetFit read NaN and the figure stopped filling (56.17) — found on the stills, fixed before push.
- 56.25 grow unchanged for L frames and the Fold stacked frame.
- NOTE for MAIN / RV: --kvh is 1 % of the SPREAD height on BOTH devices (§0.0a), so the Fold XL room is 796 px (end scene 708), same as before for ordinary Fold XL (796); Fold end dialogs go 770 → 708 (figure 637 → 550). If MAIN wants the Fold end frame taller, that is a §0.0a question (vh vs spread), not this rule.

## Family scan (law 11) — dev/test/xl-one-size.js (new), real dialogs, Fold 755x1000 + iPad 1180x820
| device | dialog | before 739d3478 (h / fig / top..bottom) | after cec55446 |
|---|---|---|---|
| iPad | end: Đại kết cục | 753 / 220x620 / 69..822 (CUT) | 707 / 220x549 / 93..800 |
| iPad | end: Kết cục | 548 / 220x415 | 708 / 220x550 / 90..799 |
| iPad | end: quiet end | 548 / 220x415 | 708 / 220x550 |
| iPad | long text (XL) | 780 | 780 |
| iPad | person + long text (XL) | 780 / 220x635 | 780 / 220x635 |
| iPad | Sổ nguyệt sự 14 rows (XL list) | 633 | 780 |
| iPad | 9 / 6 options (hand stage) | 605 stage | 605 stage (untouched) |
| Fold | end: Đại kết cục / Kết cục / quiet | 770 / 220x636-637 | 708 / 220x549-550 / 180..889 |
| Fold | person + long text (XL) | 796 / 220x650 | 796 / 220x650 |
| Fold | long text, intel 14 rows | L 796 | L 796 |
Result: before 3 FAIL (iPad end sizes, iPad ordinary sizes, iPad end frame off-screen) → after all pass.

## Measures (cec55446 build, each run ALONE)
| test | result |
|---|---|
| hook 80 dialog-fixed (Fold + iPad, 280 s cap) | all pass (3 m 04 s); (f) XL: 3 dialogs 708 / 220x550 on both devices |
| xl-one-size.js | all pass (before: 3 FAIL) |
| hook 96 kit-std-scan SUBS=0 | total 6 ≤ baseline 28 {X06:4, X08:2}; X08 = `span.kone-t` ellipsis «Trong cung: Chương 1…» on tab:court, Fold + iPad — not a frame (RV-174 saw only X06 on 739d3478, so it came with LIVE 772bee4f or is the known X08 load flake; under baseline) |
| one-core-guard | PASS, 0 fails (law 4 item: samples read BAL.kitpage.demo.*, kept as RV-174 merged it) |
| kit-hand.js | 172 PASS / 0 FAIL |
| badge-hand.js | 22 PASS / 0 FAIL |
Stills (looked at, Fold + iPad, every XL kind + before shots): https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r15/ (after-<device>-<dialog>.png, before-1180x820-dai-ket-cuc / ket-cuc.png). Verdict giver wipes it.

## Findings (not fixed, outside scope)
- The emperor's live emote `img.kemo.kemo-m-nod` (18 px at rest) on the Đại kết cục banner pops large for a moment and covers the start of the line «Đại kết cục · Hiền tướng hậu cung» (seen in the dialog-fixed still; pre-existing on 739d3478, smaller phase). Transient motion; MAIN to say if the pop should stay inside the picture.
- iPad Sổ nguyệt sự (XL list frame) is now 780 tall: its left event picture becomes a tall narrow strip (same rule as every XL; picture ladder unchanged).
- Kit sample page: §56.33 is a size rule of existing frames, no new part, so no sample tile added.

## HANDOVER
Ready for UI reviewer RV-175. Worktrees: /home/user/wt/r15 (branch), /home/user/wt/r15bis (bisect, delete), /home/user/wt/r15ho (this report). Build: `bash dev/site/build_site.sh` then `git checkout assets.json`.
