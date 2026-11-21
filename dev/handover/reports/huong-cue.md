# huong-cue report (worker, 21/11)
PRIORITY #1 CHECK: OD 2014/2023/1998 + 21/11 ~00:40Z bug | main: mg-noword-a/b/kit landed (j91 k91Blend) | review/* none for huong cue | claims none

Branch review/huong-cue @ 54c3adfd (base origin/main f15146ea, includes mgcal-redo). Code: dev/build/j91.js k91Blend; KIT.md §13.1 note.

## Fix
Điều hương lost its words (còn xa / đã gần / rất gần / khớp, "Mẫu nặng về X") in mg-noword; only a tiny ★ line remained. Now, no word:
- ring round her smoke swatch: wider + colour step (hair → brown → gold → kit --good + BAL.mgFx glow);
- gauge of 3 pills (T.length of BAL.mgTier.blend.star) mid-board where the stars were: 0 empty … 3 full green = matched. Same thresholds as the grade (law 4); grading untouched. Verdict ★ still replaces the gauge after Dâng hương.
Uses kit colours (--good/--gold), BAL.mgFx glow; live canvas marks only (KIT §13.1 allows). No new kit part needed.

## Whole group (law 11) — scan of mg-noword-a/-b/-kit diffs (removed word cues)
| Engine | Before | Now | Action |
|---|---|---|---|
| huong | live line "độ khớp: còn xa…khớp" + dominant scent + slider labels | ★ glyphs only | FIXED (ring + gauge) |
| hoa/chai/theu/dauho/den etc. | one-shot pops ("Vừa khéo!", "Xa quá", "Mũi kim lệch nhiều") | painted signs / pops via kg82Signs | no continuous cue lost; unchanged |
Only huong lost a live continuous closeness cue.

## Tests
mg-allkinds 7/7, mgcal-redo 10/10, mg-noword-a/b/kit pass (31 kinds 0 words), quickcheck ALL OK. coop-e2e NOT run (no origins here; engine change is canvas-only, no sync). Shots Fold 755x1000 + iPad 1180x820 far/near/vnear/match looked: steps read clearly (empty / brown 1 / gold 2 / green 3 + ring). Shots not in git.
