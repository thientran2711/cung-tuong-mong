# KP09 BODY-FIT NOTES - data work for Foreman C (NOT prompts; no picture is drawn for this)
Source: dev/handover/reports/kit-keeper-6.md section 1 (handover worktree), KIT.md 28.8e (main line 1284), jbody.js header.
PRIORITY #1 CHECK: img/body-fit.json is not in git on origin/main (git ls-tree: only dev/test/kit-body-fit.js matches); it is CDN data (jbody.js fitUrl img/body-fit.json) and the code treats it as optional: no row = the measure (kitFigBody) is used. So today the file may be empty or absent; C creates it.

## What the report says is off
- Report line "For C (later)": fill img/body-fit.json rows where the measure is off. The ONLY measured fault it names: zone **waist** slightly LOW on some wide-sleeve WOMEN figures (fig-consort-*, maid and similar wide-sleeve robes; the report says 'women at sash' fits, men exact). No file names and no number are given.
- Every other zone is reported fine: hair on heads, head, chest at shoulders, sleeveL and sleeveR both sides, skirt, hem at feet (test A: 48 pictures = 11 kinds x 4 + 4 por, all zones inside the picture and the painted body, PASS Fold 755x1000@2 and iPad 1180x820@2; shots on CDN img/_review/kit-body-fit/kbody-sample-755.jpg, -1180.jpg, kbody-stage-755/1180.jpg).
- Not determinable from the files: which exact fig-*/por-* are off (need to open the sample shots).

## Work for C (measure by looking at each figure)
Row format: img/body-fit.json { "<fig-/por- file>": { "<zone>": [left%, top%, width%, height%, rotateDeg] } }, % of the picture box, partial rows override only the zones given; cdn_sync, no rebuild.
Zone ids (KIT_BODY.zones): hair, head, chest, waist, sleeveL, sleeveR (viewer's left / right), skirt, hem. Portraits (por-*) only have hair, head, chest.
1. Open the kit sample 28.8e and the 11 figure kinds checked by dev/test/kit-body-fit.js:17: consort, maid, mama, eunuch, man, official, physician, emperor, thaihau, kid, player (+ por-consort).
2. For each wide-sleeve woman figure (consort, maid, mama, thaihau, and any robe where the debug box for waist sits below the sash): write a row with a corrected waist only (move top up to the sash line, keep width).
3. Then run the new overlays (the 27 KP09 pictures) on those figures and fix any zone where an overlay lands off the body; the hair and chest boxes matter most (khoi / tra on chest, toc / tocam / vuong on hair).
4. Re-run: node dev/test/kit-body-fit.js <url> and look at the shots.
