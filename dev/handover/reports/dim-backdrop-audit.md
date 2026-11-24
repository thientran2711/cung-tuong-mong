# DIM / BACKDROP AUDIT (KK18, order MAIN 120/122, owner OD 24/11 ~09:05Z) — REPORT + BEFORE/AFTER MOCK, NOTHING BUILT

PRIORITY #1 CHECK ('backdrop dim nền tối'): OD 24/11 ~09:05Z (rule) + OD:L1480 (no colour board before) | main: every row below | review/kit-dialogue-vn (§95 spotlight) | claims none.

OWNER RULE (verbatim, via MAIN 120): the background stays at NORMAL brightness, no dark overlay on the whole scene; "nhân vật vẫn sáng lên khi mình chọn"; night buổi stays night only by the real time.

## A. Every full-screen dim / veil / backdrop found (static scan of origin/main + runtime scan of 4 screens)
| # | what | file:line | value | covers |
|---|---|---|---|---|
| 1 | dialog backdrop `.modal` | index/j-css (`.modal{position:fixed;inset:0;background:#2a1a1288}`) | rgba(42,26,18,.53) | whole game behind EVERY #modal dialog (events, kitModal, results) |
| 2 | motion stages `.kmov` (reward, card-flip, ink, reveal, notice scenes) | j93.js:329/337 `--km-dim:#1a0f0acc` | rgba(26,15,10,.80) — the HEAVIEST | whole game behind every kitReward / kmov scene |
| 3 | selection scene layer `.kscn-veil` | jkitsel.js:16/21 `KIT_SCN.veil` | rgba(20,12,8,.45) + bg blur 6 px | the scene picture of kitScene (§93) |
| 4 | same, night | jkitsel.js:16/22/23 | veilNight rgba(10,16,48,.45) + bg brightness .62 saturate .85 | night scenes (KEEP the night look: real time only) |
| 5 | focus view `.kfoc-veil` | jfocus.js:160-162 | rgba(20,12,8,.62) + backdrop blur 6 px + brightness .45 | whole Dư đồ stage behind a person focus |
| 6 | full-screen picture blur `.kfull-blur` | j93.js:84 | blur 14 px brightness .72 saturate .9 | kitFullPic backdrops |
| 7 | ending backdrops | jend.js:101-102,133-134 | brightness .62-.70 (+ grayscale .55 for mourning) | ending screens (mood by design: sếp to say) |
| 8 | podium / rank / kidfl overlays | j90.js:122 `#kpodov` #2a1a12b8 · jrank.js:233 `#krkov` #2a1a12b8 · jitd.js:127 `.kidfl` #2a1a1255 | .72 / .72 / .33 | their own full-screen layers |
| 9 | picture lightbox / info | jopic.js:218 `#kpzoom` #1a0f08cc · jopic.js:372 `#kpinfo` #1a0f08cc | .80 | tap-to-zoom picture, «!» overlay |
| 10 | tutorial dim | jtut.js:71 `.ktut-dim` | rgba(30,18,10,.58) | tutorial steps |
| 11 | hud2 dim | jk3.js:269 `#hud2:has(.khg)::before` | #2a1a1266 | behind the open HUD group |
| 12 | §95 dialogue (review/kit-dialogue-vn 8e12fbc5, NOT on main yet) | jkitsel.js focus shot: `kitScene.focus` bg blur 14 px + brightness (line 96), `kitScene.light` speaker lit / others `.kscn-dim` brightness .5 saturate .75 (BAL.kdlg) | per beat | the room picture darkens + blurs brown on every beat (MAIN's mock selx7); the dimmed OTHER figure is a spotlight, not a background wash |
Not dims (checked): flip-card `.kcf-dim` (non-picked cards dimmed = card focus), feedback vignettes (fxOver) AFTER an action, per-element disabled opacity.

## B. Proposed ONE kit rule (for sếp)
RULE «NỀN GIỮ NGUYÊN SÁNG» (kit token `--k-dim`): no full-screen layer darkens the background. Focus = (1) the lit speaker / card / picture itself (§95 `kitScene.light`: the OTHER figure may dim, that is a spotlight on figures, not the background), (2) at most a soft blur of the background (≤ 3 px; 0 on dialogs), (3) at most a thin edge vignette (inset, ≤ .22 alpha, centre 62 % clear). Night scenes keep their night filter ONLY when it is really night (buổi 3 / night event), never as a focus device. One table in jkitsel/j93 (`KIT_DIM = {modal:0, kmov:vignette, scn:0, scnBlur:3, foc:blur3, lightbox:.2}`) read by every row above; BAL not needed (look, not game numbers).
Rows 1,2,3,5,6,8,9,10,11 → follow the rule. Row 4 stays (night by real time). Row 7 (endings: mourning/fest mood) = sếp decides (mood of the ending, not a focus dim). Row 12 = §95 look changes (law 16: only with her OK).

## C. BEFORE / AFTER (mock = the rule injected as CSS into the live page, nothing built), Fold 755x1000 + iPad 1180x820 @2
Files (scratch, NOT in git; Foreman C uploads): /home/user/wt/kk-shots/dim/<screen>-before|after-<W>x<H>.png
1. 1-event — real event dialog over the stage (row 1)
2. 2-scene-day — kitScene selection scene by day (row 3): BEFORE brown veil + 6 px blur (the room reads dull); AFTER room at normal brightness, soft 3 px blur, figures + boxes unchanged. LOOKED (Fold) 3×.
3. 3-scene-night — same scene at buổi 3 (row 4): AFTER unchanged by design (night filter kept: real time).
4. 4-reward — kitReward over the stage (row 2): BEFORE the whole stage under a .80 brown wash (looked); AFTER the stage at normal brightness with a thin edge vignette (looked). CAVEAT: the reward box/items did not appear in either shot (animation not started at capture time), so the shot shows the background only, not the chest.
Runtime scan (same pages): event .modal rgba(42,26,18,.533); scene .kscn-veil rgba(20,12,8,.45); night .kscn-veil rgba(10,16,48,.45) + bg brightness .62; reward .kmov = --km-dim .80 (the scan missed it because it is a CSS variable on a flex box — found by source).
HONEST: iPad pairs shot but not all looked; event pair Fold scan returned empty (dialog not yet open at scan time) — its image was taken after; no focus view (row 5) shot, needs a Dư đồ person; no §95 shot (not on main).

## D. If sếp says GO (build, one branch review/kit-dim)
KIT_DIM table + rows 1,2,3,5,6,8,9,10,11 pointed at it; KIT.md §0 UI law «background keeps normal brightness» + §93/§95 canon overwritten in place; tests: dim-scan (every full-screen element with alpha ≥ .15 & dark & ≥ 45 % viewport = FAIL except night + endings), Fold + iPad shots of all screens. §95 spotlight stays (figures only).
