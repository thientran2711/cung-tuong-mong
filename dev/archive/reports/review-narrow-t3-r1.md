# review narrow-t3-r1 (reviewer, sonnet)

PRIORITY #1 CHECK: brief s32-review-narrow-t3.md | main none (no kszNarrow3) | review/* narrow-t3 aa1a3387 | claims narrow-t3 READY.

**PASS 07747a9bace9964dc49d5da4baa734b682d7fb69** = review/narrow-t3-r1 (aa1a3387 + merge origin/main 25bfd7cf, index.html/sw.js conflicts only, site rebuilt; ancestor of origin/main verified).

## Results
- quickcheck --runs 3: PASS 162 s, open 1681 ms, old save ok, core gates PASS, perf new/live render 225/200, tab 340/354, buoi 922/822, tasks>200ms 15/13 (noise-level).
- Narrow T3 (412x1058, 390x844), 10 kinds looked at (man, visit, toil, choice, two, fest, thtrieu, reward, scroll, many): figure + banner + text on top, 1-col full-width cards, one size per dialog, tall 3:4 pictures, no clipped names. 3-card dialogs scroll inside the frame (rule 32.5, accepted).
- kit-fit (own scan, all kinds), violations base 9b2f7821 -> new: 412: 14 -> 3 (court1, court2, scroll); 390: 12 -> 2 (court2, scroll); 755: 8 -> 7; 1180: 7 -> 6. "PERSON DIALOG cards not one size" and square 'two' are gone at 412/390. Remaining = the listed follow-up (court tab act rows, 10-option scroll menu at phone width). Not FAIL per brief.
- Fold 755 / iPad 1180 unchanged: per-kind geometry signature (figure gaps, card sizes/forms/heights) aa vs base identical for 29 kinds except toil; fest/visit/emp/court differences also occur base vs base (random rival text) = noise. toil differs because base rendered 6 options (the duplicate), new 3. Pixel compare was not usable (random girl/background differs run to run: base vs base up to 286k px); my first pixel pass was invalid (girl chest overlay #kmrew covered every shot) and was redone without it.
- showModal root fix: scan opens every kind (31) and does showModal x2, resize event, real viewport change both ways (412<->755) + showModal: option block count stable (1 .opts, same button count, 1 k3body) in all 7 states at both widths; first option click fires its callback exactly once (go=1) for every kind with options. Page errors 0.
- Kit consistency: only jksize.js + KIT.md 32.8b touched, no private CSS.

## Notes for main (not blocking)
- Harness: girl chest overlay (#kmrew) and rotate tip (#krottip) cover shots in kit-fit at fresh start; hide them when shooting. The 'man' kind eunuch figure does not render in file:// host (blank left column) on Fold too and on base: harness image, not this change.
- Follow-up kit job: stacking for page-layout (kdper) person menus + court tab rows at phone width.
- Shots stayed in scratch (not in git, no CDN sync).
