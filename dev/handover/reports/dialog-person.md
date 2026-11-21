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

## ROUND 2 — sha 2b8b3efd on review/dialog-person-r86 (fast-forward on de1d7e11; marks #62–#65 #67 #69 #70 #73 #76–#81)
PRIORITY #1 CHECK: OD rows 2150–2175 (handover branch) read; no other branch holds avatar/speaker code (kit-dialog owns option layout only).
- Left slot = main subject (jksize `kszSubject3`): named person → her own act → the ONE other person in the lines → only "ta" → her figure → else event picture. Default ma-ma narrator + `BAL.staff.narrator` DELETED. Small frame with subject: framed avatar left, picture top-right (#80).
- ONE avatar rule (`kszAvatarRule3`, rows carry data-kfp/kfn): ≥2 people in a line = no avatar; left subject never repeated; second person's avatar ON the event picture (`.kevav`); no subject → actor avatar beside her line. «(ta)» under her name when she is the subject (`kszTa`, #81).
- #79 root cause: servant objects carry `src:"home"/"pick"` (origin) and `kitFaceH` drew it as an image → broken icon. `kitIsFaceObj` fix (j79).
- #63: `kitItemTag` size sm. NOT DONE: #76 item art in the LEFT slot for Đồ thất lạc (item is still the small tag on the right; needs `ievPlace`/left-slot work, share with kit-dialog); #73 round mood medallion beside the figure (mood-seal worker's `kfseal`); #62 "empty band + Kéo xuống" (kit-dialog); quest chips/tags (#66 family, dialog-stack).
- Tests: `dev/test/dialog-person-scan.js` PASS on Fold+iPad: A own-act/bare frame; B 6 person pickers; C sweep of 429 (Fold) + 511 (iPad) live frames (231 PEND + 14 rounds of play): 0 dup, 0 many-people avatar, 0 line avatar beside a person, 0 broken avatar images (96/81 distinct), subject changes Fold: 305 named-same / 18 self / 67 picture / 39 one-person. quickcheck PASS (214 s). coop-e2e 90/92: 2 FAIL «both seats show the same Thái hậu picture» (seat B figure f:"" empty) at start and after week 1 — not analysed; may be pre-existing (checks the stage figure pool, not a dialog) — MAIN: please compare with plain main.
- Handover note (context ~at the 25 % mark): remaining = #76 item-left, verify coop fail on plain main, LOOK 3× Fold+iPad of 4–5 more dialogs (Thi tài Thất tịch, Chủ thưởng, Lần đầu gặp mặt, Bị bắt, Hắt nước) — the sweep proves structure, only a few were looked at (Thái hậu bệnh, pickers).
