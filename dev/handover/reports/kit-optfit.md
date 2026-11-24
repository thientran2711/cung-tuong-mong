# kit-optfit (KK18) — option title squeezed by the odds chip — OUTCOME: code DROPPED, no kit change

PRIORITY #1 CHECK: OD L2134 (21/11 ~04:00Z: odds meter ON THE TITLE ROW, never its own row) + L2211 (23/11 ~20:30Z: bar + word one row; no wrap when it fits) + L2212 (23/11 ~20:45Z: layout approved, change nothing else) + OD 18/11 ~09:02Z «title never squeezed by the odds chip» | main j79.js kitOdFit1 / KIT §6.2b-1 | review/kit-optfit 69003e15 (superseded) | claims none.

## What happened
- MAIN 120 order: SELSCENE-7 saw option titles ~4 words per line on Fold because of the odds chip. I measured it (synthetic 4 long options, Fold 755x1000 + iPad 1180x820, card 312 px wide): title 78-107 px beside a 84-113 px meter; chip drops under the title only below 5.5 em (KIT_ODFIT.min).
- review/kit-optfit 69003e15 changed kitOdFit1: a title needing more than 2 lines beside the meter → kodrow (meter under the title). Foreman B FAILED it (old kit-opt-title-wrap.js asserts the old canon, no report, SEED not like-for-like) and MAIN 121 ruled: her rules stand (meter ON the title row always, approved layout unchanged) → drop the meter-under-title case.

## r1 = nothing to merge
- review/kit-optfit 69003e15 is superseded and must NOT land. origin/main is already correct per her rules (kit-opt-title-wrap.js PASS on main fd85907a). No code, no built files, no test change is delivered in r1.
- The squeeze is the approved layout working as ruled (the title is a flex column beside a fixed-width meter; the rule only guarantees ≥ 5.5 em and no one-word lines).

## What I tried INSIDE the title row (prototype, not built) — for MAIN / sếp to decide
Goal: keep the meter on the title row at its right end (L2134), but let the title use the full width on lines 2+ ("title wraps to the left of the meter", only the first line is narrower).
- CSS-only prototype (injected into the live page, Fold): `.kat{display:block;position:relative}` + `.kan::before{float:right;width:var(--kmw)}` (spacer the width of the meter) + the meter absolutely positioned top-right. Result: title width 197 px (was 78-107), card height 140 px (was 189-206), meter stays on the title row. Titles read 4-6 words per line from line 2.
- BLOCKER: `.kat` also holds the «!» button (kobang) and other chips next to the meter; they are separate flex children, so absolute positioning put «!» over the meter word (shot: /home/user/wt/kk-shots/optr1/dlg-after-755x1000.png — «Hi…», «Tùy duy…» cut). A correct version needs ONE wrapper around all chips (meter + «!» + notes) built where the card is built (j63 / kaNorm, every button.ka that has .kat>.kodds: dialog options, act cards, pane cards) and a JS-measured --kmw. That changes how every title wraps in the game = layout change → needs her OK (L2212), not mine to decide.
- Other in-row options judged not worth it: shrinking the meter (cell 5→4 px, gap 5→3 px) gains ~8 px; hiding the word is forbidden (L2211).

## Test aid not delivered
- opt-card-scan.js SEED: the seeded Math.random still draws different events in main vs a branch (event pools consume random numbers during build), so before/after tables of real events are never like-for-like. The synthetic page test (4 long options, same text in both builds) is the only reliable comparison. Not landed.

## Open questions for MAIN
(a) Leave the squeeze as is (approved layout), or (b) ask sếp for the wrapper-based «title wraps beside the meter on line 1 only» change (affects every option / act card)? I build (b) only on her GO.

## MOCK PAIR (order MAIN 121/122, mock only, nothing built) — in-row fix vs LIVE, Fold 755x1000 + iPad 1180x820 @2
Files (scratch, NOT in git; Foreman C uploads): /home/user/wt/kk-shots/optfit/optfit-before-<WxH>.png (LIVE origin/main) and optfit-after-<WxH>.png (mock). Same dialog, 3 worst cards (long titles: «Cúi đầu đáp lời Hoàng thượng, giữ lễ và thưa rõ từng chữ» [Hiểm], «Ngẩng lên nhìn thẳng, nói khéo nhưng không hạ thấp mình trước mặt cả điện» [Tùy duyên], «Im lặng, chờ người khác lên tiếng trước rồi mới đáp» [Rất vững]).
Mock = in the live page: all chips (meter) of each .kat wrapped in ONE span, absolutely positioned at the title row's right end (left of the «!»); the title gets a float spacer the width of meter + «!» so only line 1 is narrower, lines 2+ use the full card-body width.
Fold: LIVE title column 78-107 px, 4-6 lines (3rd card 5 lines); MOCK title 189 px, 3-4 lines; card height 144 px in both (the Tốn/Được rows decide). iPad 1180x820 (card 480 px wide): LIVE and MOCK titles both fit in 1-2 lines (no squeeze there; the mock changes nothing visible).
LOOKED (Fold after): the meter stays on the title row at the right (L2134 kept), bar + word one row (L2211), «!» and the rows unchanged, approved layout otherwise unchanged.
HONEST DRAWBACK seen in the mock: line 1 of the title is narrower than the rest, so a long first word makes a ragged first line («Cúi đầu / đáp lời Hoàng thượng…», and the 3rd card breaks «Im / lặng, chờ…»). Tuning (a one-word first line must not happen) would be part of the real build. The real build needs the chip wrapper in the card builder (j63 / kaNorm) for every button.ka with .kat>.kodds.
