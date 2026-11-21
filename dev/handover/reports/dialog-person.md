# dialog-person — report (worker session_01Rc5AsLY5saawhz5LjrvM95 for MAIN CHÍNH 86; owner marks #58 #59)

PRIORITY #1 CHECK: OD rows (21/11 ~04:25Z + ~04:27Z, in the brief) | git grep origin/main: `kszWho3` / `kitStagePeople` / `kitOptPic` / `kpOptArt` / `kopface` / `KIT_ACT_PIDS` read; kit avatar part = KIT §4.2 `mdH` (exists: no KIT REQUEST needed) | origin/review/kit-dialog: branch not pushed yet when I started (worker session_01Rc5AsMcXo2ivEx1p5K5Ysh owns option card layout / picture / figure SIZE; I touched no layout CSS of theirs, only the speaker + the person picture slot) | CLAIMS: row added (RUNNING).

## Branch
Pushed as **review/dialog-person-r86** (sha de1d7e11, base origin/main 0d60ae54). The name `review/dialog-person` is taken on origin by an OLD 15/11 branch (2b321b3b "KIT 32.7: hộp thoại một/hai người…", not an ancestor of main); I did not overwrite it. MAIN: tell me / the coordinator to rename or force it if wanted.

## Root causes (both from the owner's two shots)
1. Left figure of a dialog with no person of its own = the NARRATOR of its kind (`BAL.staff.narrator`, jksize `kszWho3`): `choice` → Quản sự ma ma (kn). It stood in her room whether or not she could really be there (law 6b) and "asked" her things she decides alone. The small avatar beside the line was the kit's own first-person row (`.kfact.kfme`).
2. Option cards of people: `kpOptArt` cut a loose portrait crop (`kitArtFrame`, `.kopface`) or, for servants (entourage, no face found by name), fell to a meaning-group / placeholder EVENT picture, with no rank.

## Fix (one place each)
- **Speaker** (`jksize.js`): `kszOwnAct3(m)` (a picker she opened: KIT_ACT_PIDS, `entp`, `act`, `shop`, `ownAct`) → HER OWN figure; `kszHere3(p)` (roster `j95whereId` vs her place) — a narrator official only stands there if she is really there, else her own figure; `kszWho3` is the one helper (`kitFrameLive3` calls it with the dialog). `jk4.js kitStagePeople` gives the same answer to the older stage route (`[S]` for her own act). `kszDropMe3`: when the figure is her, the duplicate small avatar of her own line is removed. Spy picker (`jwhy.js`) marked `ownAct`; entourage picker is already `pid:"entpick"`.
- **Person option cards** (`jopic.js` `kitOptAvatar`, used by `kpOptArt` and `jgift.js`): any option naming a person (`kgt`, new `kgp` = a person object, name-in-title, name chip) shows the KIT avatar `mdH(face,"big")` in the picture slot + the kit rank/name STACK (`kitRankName`; stranger "rank / ???"; a sentence about a person keeps its words). Entourage options now carry `kgp` (`j95s.js`) so servants get rank + avatar too. CSS: `.kaart.kaav` (no edge ring, whole tassel).
- KIT.md: two bullets in §6.2b (person option card + speaker rule).

## Tests
- `node dev/test/dialog-person-scan.js file://…/dev/index.html <out>` (new): A = speaker before/after table for every narrator kind and every picker pid, at home and away (all FIGURES valid, every own-act = her figure); B = real pickers (entourage, spy, evidence, item target, plant, gift) on Fold 755x1000 and iPad 1180x820: every person option has the kit avatar, rank+name stack, no loose crop, no event picture. PASS.
- quickcheck / coop-e2e: see MAIN message.

## Speaker table (after = the rule). Full table: run the scan.
| dialog | before | after |
|---|---|---|
| choice / news / notice / week (no person) | Quản sự ma ma (kn) | her own figure (kn not here) |
| rule / info / evidence (no person) | Giáo tập / tn official | her own figure |
| night / reward | Ksp / Tq eunuch | her own figure |
| intel / threat / person | her thân tín maid | maid only if she is with her now, else her own |
| end / result | her | her |
| every KIT_ACT_PIDS picker + entpick | Quản sự ma ma | her own figure |
| spy picker | the maid she sends | her own figure |
## Status
~90% xong / ~85% chơi được (pending quickcheck + co-op e2e, reviewer FAIL/PASS). Not done: dialogs that name a WRONG person as `who` in their own builders (not narrator) were not audited one by one — only the narrator/own-act group.
