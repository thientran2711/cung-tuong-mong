# kit-keeper-1 report (session_01UV1Szj1bf6YFPCryaDjdEi, 16/11 06:38Z) — base origin/main ba07c65e

## A. C8 fig-bg step 2 (KIT §61) — KIT OK c2cbe401e6d2cf66e855f53a9229266315e84d1b (review/fig-bg-k1; ancestor = origin/main ba07c65e)
One shared part (jfigbg.js: kitFigBgKey + KIT_FIGBG + one CSS block; data-fb written by kitStageFig only), documented in KIT §61, no private frame:
the scroll is a border-image on the two existing figure columns (.kbk-por book page, .kes event dialog). 14 webp on the CDN (checked 200, 10–51 KB).
Fixes made while merging onto main:
1. kitStageFig: kept main's crossorigin + named own chip, added data-fb.
2. kitDpFit: main rewrote it (KIT 32.2 cap + crop). The branch's "widen the column by the scroll border" would break the cap → the border is now taken
   INSIDE the capped column (Wmax − border; --kdpw = need + border). The column never grows past KIT_DP_COL.
3. jfigbg.js moved to the end of assemble.py (after jact, jkc).
4. Open point "two people → one scroll" is closed by main's KIT 50.1 (one person in the dialog column).
Tests: dev/test/figbg/scroll.js PASS at 1180x820@2, 755x1000@2, 844x390, 390x844 (rotate prompt, as designed), 1000x755, 1366x1024; shots looked at
(dialog scroll with rods top+bottom, Thái hậu wide robe cropped inside the silk, name chip readable on the silk). Foreman C: independent reviewer may start.

## B. D36 rank-port kit requests — KIT OK 05bce551901c8a1ea46ea7a5d6bd267fdaf823f8 (review/kit-keeper-1; ancestor = origin/main ba07c65e)
Built as amendments of existing parts (sub-numbers, no new top number):
1. KIT 26.1 podium (j90): the plaque IS the step (no lacquered dais), medal at the plaque's top-right, "Ta"/"Con ta" tag top-left, figures take the whole
   free height at ONE KIT_FIG scale (C34 rule: only plaque height differs), optional entry fields fig / face / nameH / you / mine (what jrank kpodCol needs),
   "Ta đứng thứ N" (was "Ngươi"). Found + fixed: kitPortrait could print "false" while the portrait list loads. jcui held a private copy of podium CSS for
   short screens → moved into j90 (one place; its .58rem chip → .66rem, KIT §2 minimum).
2. KIT 32.7d person dialog without options (end card): the text side scrolls by itself, the figure column keeps the dialog height (before: the column
   stretched to the text length and the figure scrolled away at 844x390 and 1180x820). kitDpNat counts the full text. Own chip rank+name was already on main.
3. KIT.md §26 / 26.1 / 32.7d written; KIT_NUMBERS: 61 → KIT OK, 79 slap-mg + 80 coop-chat RESERVED (both branches still write "§76" → must renumber),
   next free = 81 (C41 "kitHintRing §76" collides with kitPalaceMap §76 → 81 if it becomes a part).
Tests: new dev/test/podium-plaque.js PASS (contest + Bảng vàng entries) at 1180x820@2, 755x1000@2, 844x390, 390x844, 1000x755, 1366x1024; option-less
dialog check at 844x390 + 1180x820 (figure column = dialog height, figure in view; skirt cut at the floor per 32.2 owner rule). Shots looked at.
Not done: old dev/test/podium.js is stale on main (roulette #kroulw intercepts the first tap) — same on main, not caused here.
Foreman B / D36 worker: merge review/kit-keeper-1 into review/rank-port, drop rank-port's own j90/jk4 expectations, re-run rank-e2e at all viewports.
Note for the D36 reviewer: jrank.js carries many private .krk-* rules (header, list rows) — check them against the kit (KIT CONSISTENCY).
