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

## RELAND r2 (sonnet SMALL reviewer-lander for Foreman B ROOT-6; ORDER MAIN CHÍNH 95 21/11 13:50Z)
PRIORITY #1 CHECK ('dialog-person|jksize'): OD 13 | ledger 2 | claims 8 | main 15 | review/* 6 | archive 23 — branch review/dialog-person-3-rv b187ecdc (PASS rv 5SDchEK7) reused; nothing rebuilt.
Branch **review/dialog-person-3-r2 = 037d2c1f** = b187ecdc + merge of origin/main 99795d67 (contains kit-dialog-2 LIVE f85cba97; main IS an ancestor → fast-forwardable). Net diff vs main is SMALL: jksize.js +1 line (.kfav-off one column), jfigseal.js (#73 seal filter), KIT.md bullet, report, 2 look scripts, scan-test fix; no BAL / save / co-op / time / progression file.
### Conflict table (merge)
| file | hunk | decision |
|---|---|---|
| dev/build/jksize.js kszLiveLay3 left-slot block | dialog-person-3 side: pres "one" + who → framed portrait (kszPor3) left, event picture on top of the right column (#80/#81). main side (kit-dialog-2 #76): ONE part kszSlot3(type) = item / person / matter; its "person" case is exactly kszPor3(who) + evTop; also keeps mark #68 corner seal element | take main's block whole. Same person behaviour (checked: kszSlot3 person = kszPor3 + evTop), plus the item slot. Stays ONE kit part, no per-screen size. dp3's .kfav-off CSS fix (non-conflicting hunk) kept. |
| index.html, sw.js | build outputs | not hand-merged: regenerated by dev/site/build_site.sh |
| dev/kit/KIT.md | auto-merged, both bullets kept | ok |
### Tests (all on 037d2c1f tree)
- quickcheck 1851f607 (same build; only a test file changed after): PASS 274 s, core gates PASS incl. G4 80-dialog-fixed, time-spill PASS, old save loads + plays a buổi, perf new/live render 287/267, tab 509/530, buổi 1386/1887.
- dialog-fixed.js: all pass, Fold + iPad (incl. kit-dialog-2 checks).
- dialog-person-scan.js: first run FAIL 2 rows «Đồ thất lạc her own frame has no (ta)» — test was written before #76: an item-subject frame now shows the ITEM in the left slot (kszSlot3), not her figure, so no (ta)/line-avatar rule applies. Test updated (X.slot!=="item" exempt, 2 lines); then PASS (Fold + iPad); a later random-play sweep run also hit «Nội vụ phủ trả đồ line avatar» for the same reason (item slot) → same exemption, rerun PASS.
- coop-e2e (A=tt, B=nc): 94/94 passed, old save ok.
### Eyes (Fold 755x1000 + iPad 1180x820, LOOKED 3×)
Pass 1 Thái hậu (ch1) both devices; pass 2 Thư nhà (tt1) both, «(ta)» under her name; pass 3 phoenix (Fold) + Đoan ngọ (iPad). One picture per person, no round medallion beside the figure (#73), no squeezed line text, option cards same size/shape (kit). No page errors. Shots in scratch only. Item-target / gift shots were covered by a reward pop-up (test noise), not used.
### Reviewer check (b-review-small)
SMALL confirmed (no BAL/save/coop/time file); 18 laws touched: 9 KIT FIRST + 10 (one slot part) + 11 whole group (scan + .kfav-off all avatar-off rows) + 12 two devices — OK; VANPHONG: no new player word; no stand-in art. Not reached (list for eye pass, unchanged from r1): tsbFirst, Hắt nước, Thất tịch contest, Chủ thưởng, Bị bắt.
### Verdict
PASS dialog-person-3-r2 037d2c1f. ~96% xong / ~92% chơi được.
