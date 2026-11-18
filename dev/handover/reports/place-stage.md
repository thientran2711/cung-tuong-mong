# place-stage — report (worker; sonnet; MAIN s43)
PRIORITY #1 CHECK: OD 1813/1814/1818 | main: j59.js kitHereCount/j59ico, jrail.js kitStageRail, j93.js .kmnote, jk3.js kshR | review/*: ag-all-2-land, npc-chain-land, stage-caption searched, no stage-top news chip | claims: place-banner (superseded).

STATUS: SHOTS READY. Branch review/place-stage sha 235d854e (r3) on live main e24d5838. r1 e40b8df3 is superseded.
Kept from place-banner: kitHereCount for every place (chip built from the ONE head count). NOT kept: .j59ln, J59EASE, #sc-t plaque, kmmAvoid change (not needed: the chip steps right of her marker itself).

## What changed (dev/build/jplst.js new, last in assemble.py)
1. `#sc-t` plaque hidden (`display:none`), still in DOM as data carrier (renderStage unchanged).
2. Count chip = first item of kitStageRail (jrail.js: new non-button item kind `chip`), order 0, V/L/M under it. No chip at 0 people. `window.j59ico` exported from j59.js.
3. Place name = `#kpname` top of right column, kit paper (jk3 `.ksh .k3p` rule extended with `.kpname`), 1.1rem bold; `#kshR` shifted down by `--kpnh`.
4. Entry line (S.visit.msg minus the count prefix; "Không gặp ai." dropped) = `.kmnote.kmslot > .kchip` at top of the stage, .74rem, max 2 lines, starts right of her marker if they meet. j93 kitFlipNote no longer removes `.kmslot`. KIT.md §place stage layout written.
5. Figures: no plaque cap any more, so they stand at the full kit size (live shrank some places up to ~8 % because the tall plaque capped them).
NOTE: owner's "top-frame yellow ! + popup chip" does not exist in code (told MAIN): `.khap` is map-only; `.kmnote` is the only popup chip, originally right under the top bar (jk3 moved it to the bottom). Used `.kmnote` in the top-of-stage slot.

## Entry-line kinds (where each shows now; all go to the chip, results/events keep their own cards)
| kind (source) | example | now |
|---|---|---|
| default visit (j2/j42/j95) "Ở đây có N người" | count only | count chip, no line |
| empty "Không gặp ai." | — | nothing |
| emperor away/busy/blocked (j2 thu/vuon/dtd) | "Hoàng thượng không ra vườn hôm nay", "Trẫm đang bận việc nước. Ngươi phải lui ra" | chip |
| palace empty (j2 r3-r5, j42) | "Phi X không có ở cung" / "đi vắng, đang ở …" | chip |
| gate/refusal (j21) | "cáo bệnh không tiếp ngươi", "Cung nữ gác cửa: …", "vừa rời đi … [Theo]" | chip (the follow button stays clickable inside) |
| Nội vụ / cold palace / laundry flavour (jact, j95, j14, j42) | "Thái giám Nội vụ phủ bày hàng…" | chip |
| talk/act results (j95b, jpetcare, jshelf: msg after an action) | "… nguôi đi phần nào" | chip (their log() lines unchanged) |
Real news still lives in its log/Q card (unchanged code); the chip is the same text, shown once.

## Scan (host mode, seeded Math.random, 18 places x 5 devices, live vs mine) — dev/test/place-stage-scan.js
r2 scan (18 places x 5 devices, dev/test/place-stage-scan.js): name-plate gap to frame bottom = 8 px in all 90 cells; head/marker min top = 8 (Fold) / 13 (others) px, never outside; 0 plaque, count chip + name everywhere, marker visible everywhere (one Fold r3 timing outlier re-run: 8/13). Per cell (r1 table kept): count chip(n) / name / entry line / ... all 90 cells: plaque none, count chip first in left rail (when people), name at top of right column with cards below it, line present, her marker visible, 0 page errors. Examples (Fold / iPad Air / iPad Pro / Pixel / iPhone14): vuon C4/N/L, tn C6, kn C10, r3 C5, r4 C2, r5 C2, lc C1, nvp C1 (all N/L, marker M in every cell). Figure max height: Fold live 485-523 → mine 523 everywhere (full size, no cap). Entry chip vs figure image boxes (img box includes transparent margin) touches in some cells; visually clear of heads on Fold/iPad (looked).
## Shots (LOOKED 3x: Fold full, iPad full, composite)
Live | mine, same character Kiều Thủy Tiên, Ngự hoa viên, 4 people (outfit differs: random pick):
- Fold 755x1000: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-stage/sbs-fold-vuon.jpg
- iPad 1180x820: https://ctm-img.victoria-tntt.workers.dev/img/_review/place-stage/sbs-ipad-vuon.jpg
quickcheck: PASS 144 s (open 1352 ms, old save ok, render 172/189 ms new/live, tasks>200ms 13/13; core gates PASS).
Delete CDN folder after verdict: python3 dev/site/cdn_sync.py --wipe-review place-stage.
Open: "Phi ???" mask text (not this task). Place icon (kplic) no longer shown beside the name.
~95% xong (chờ kiểm) / chơi được sau khi kiểm

## r3 (owner: "dấu ta" = HER bouncing flower marker went outside the frame)
Root cause: kmmBob bounces the marker up to 11 px (+3 % squash) above its rest spot, but its room test only used the frame top (rest spot 13 px under it -> bounce top -0.6 px).
Fix (one kit rule, all stages): KIT_MEMARK.bob 11 / edge 4 (jmark.js); window.kitMeMarkRoom(bh) = marker height x1.03 + gap + bob + edge; j59 size() gets meCap(fo): her picture top keeps that room under the frame top, so ALL figures (one shared H) shrink just enough: 524 -> 517 px (-1.3 %), true proportions; the marker keeps its full size (36 px, was shrinking under a tight roof); dialogs: roomTop now = frame top + bob + edge.
Scan (dev/test/place-stage-scan.js, markBounceTop = min over 2.8 s of the marker picture's top vs frame top): 18 places x 5 devices, min 5.9 px inside (never outside), name-plate gap 8 px everywhere, marker visible, 0 errors (r3 on iPad Pro opens a place card: plate gap 4, still inside). quickcheck PASS 128 s.
Shots (same character, live | mine): Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/place-stage/sbs-fold-vuon.jpg iPad .../sbs-ipad-vuon.jpg

## ROLLOVER HANDOVER (place-stage worker SziagD5; 04:40Z; START_CTX ~2 %, now 36 % = 360k/1M; ceiling rule hit; MAIN/ROOT-44 opens the successor)
STATE: review/place-stage @ 8bd4dc22 (code = r3 235d854e) pushed on origin, quickcheck PASS 128 s. Worktrees: /home/user/wt/place-stage (mine, built root), /home/user/wt/live (origin/main e24d5838 for live shots, scan copied in), /home/user/wt/ho (handover), scratch /home/user/wt/ps-shots (shots), /home/user/wt/ps-scan. CDN img/_review/place-stage/ holds sbs-*.jpg + nochip-*.jpg (wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review place-stage).
NEW JOB (ROOT-44, owner OD ~04:45Z, "tên còn thêm 1 hàng có danh hiệu nữa, phải để chỗ … cần thu nhỏ nhân vật"): the stage name plate (kit part, every place) reserves room for the 3-line tag DANH HIỆU / PHẨM / TÊN (OD:L1306; title source = live worn-title if it exists (j67/j97/kcuHonorRows), else a sample title in the shots); figures scale DOWN just enough so tag + feet + her flower marker all fit in the frame (true proportions). SIZE LADDER: 3-4 figure scales, each FULL SCREEN Fold 755x1000 + iPad 1180x820, same character + Ngự hoa viên, chip hidden, 3-line tag shown, labelled 1-4 -> CDN img/_review/place-stage/ladder-<fold|ipad>-<n>.jpg (or one labelled sheet per device with whole screens) -> send ROOT-44 "STAGE LADDER READY <sha>".
WHERE THE KNOBS ARE (learned):
- Floor strip under the feet = KIT_SLOTS.band (jkit.js, 46 now; plate gap to frame bottom = 8 px). A 3-line tag needs band ~ 46 + one tag line (~16-18 px) = ~64 (that was the old value for 2 lines). Name tag = `.tag` under each figure (j59.js CSS `.stage.j59 .tok.fig .tag{position:absolute;top:100%…}`, jk3.js `.tok .tag .j59t/.j59n` = rank line + name line; FOX = floor band the wrapped tags need, j59.js size()).
- Figure height: j59lay size(): H = min(KF.h*sH, CAP=sH-fo-topR, meCap(fo), KF.maxPx cap). KF.h = KIT_FIG.h .79 (jkit.js:8, the ladder = H scales e.g. .79/.76/.73/.70 or equivalent via KIT_FIG.h). meCap (r3) keeps her marker's bounce inside the frame (kitMeMarkRoom, jmark.js; KIT_MEMARK.bob 11, edge 4). Her picture height = H/(mb.b-bt) ≈ 1.065 H.
- Title line source: grep "danh hiệu"/kcuHonorRows/worn title in j67.js, j97.js; the tag builder is j59 (the `.tag` innerHTML with .j59t rank + .j59n name; jk3 CSS).
- Whole group: scan = `DEV=fold|ipadAir|ipadPro|pixel|iphone14 PLACES=all node dev/test/place-stage-scan.js` (host mode, built root; seeded Math.random; fields tagBottomGap, markBounceTop, meTop/meH, headTopMin; `NOCHIP=1 SHOTS=dir TAG=x` writes -hi/-lo shots with the marker frozen; `__toastKeep` test knob keeps the entry toast on; use NOCHIP or remove #ktbtoast for chip-hidden shots). Add a check: tag top (3 lines) bottom gap >= 6 px and plate inside the frame for every figure.
- Shots: run live (/home/user/wt/live) and mine with the SAME script (seeded; outfit can still differ), composite with PIL, LOOK at each (3x), upload with python3 dev/site/cdn_sync.py img/_review/place-stage from inside /home/user/wt/place-stage (the folder is git-ignored). bash (not sh) for quickcheck: `bash dev/tools/quickcheck.sh --runs 3` needs a COMMITTED built tree (bash dev/site/build_site.sh, commit index.html sw.js assets.json).
- Handover branch commits: fetch under flock then `git reset --hard origin/<branch>` before adding the report (rebase replays unrelated commits).
OPEN QUESTIONS for main: (1) "+3"/"+1" swipe overflow chip (j59more, KIT 33.9) is a different part from the new "4" count chip — I recommended keep; owner has not answered. (2) entry-line toast is a twin of jtinbao's toast until ag-all-2 lands. (3) "Phi ???" mask text in empty-palace lines is old text, not this task.

## r4 STATUS (worker session_01UV1SzikTZwNu6Q6dJKkcGi? no: r4 = successor of SziagD5; 18/11 05:35Z) — WAITING FOR HER PICK
PRIORITY #1 CHECK ('danh hiệu'): OD L1306/L1814/L1839 | main jtitle.js kitTitlePlate/kitTitleWorn (3-line tag already exists; band grew only when a title was worn) | review/place-stage 2bd09cc.
Branch review/place-stage @ 2bd09cc (live main merged dbb6866; build files regenerated at 1536421). Code changed so far: jk4.js PT/HT rule only (stage tag rank line = rank hue x72 % black + the name line's light halo, OD L532/L702/L866). Everything else is TEST-ONLY (dev/test/place-stage-scan.js knobs): TITLE=s3|s8 (title only on S), BAND, FIGH, FIXFIG, FIX4, PET=<species>, HH=1 (rank 7, c09, a26; works around jly.js:20 bug), EXTRA=n (n extra people via curPeople/kitHereCount wrapper), MARKB=1 (marker moved beside her name tag + kitMeMarkRoom=4), NOCHIP; fields tagH, petOv, slots, gaps(min neighbour gap, alpha bbox), tokSrc, meSrc.
DECISIONS TO BAKE AFTER HER PICK: (1) KIT_SLOTS.band 46 -> 70 (tag 3 lines = 57 px + 3 + 8 gap; measured gap 11 px); (2) figure scale = size 1..4 = KIT_FIG.h .79/.63/.59/.55 for Hoàng hậu A (472/444/416/388 px) or plain consort ladder (493/470/443/417 px at h .79/.71/.67/.63); (3) A (marker above head, live) or B (marker anchored beside the name tag; to build as ONE KIT_MEMARK rule, meCap without head room, whole group); (4) then: scan 18 places x 5 devices (dev/test/place-stage-scan.js, add tag gap >= 6 + plate inside frame), run stage-tag-contrast.py via a harness server (local `http.server` was DENIED; use D.serveRoot inside a node wrapper), quickcheck (bash dev/tools/quickcheck.sh --runs 3 on a COMMITTED built tree), upload shots, wipe CDN img/_review/place-stage after verdict (python3 dev/site/cdn_sync.py --wipe-review place-stage), CLAIMS row, "SẴN SÀNG KIỂM <sha>" to MAIN ROOT-45 = session_01UV1SzikTZwNu6Q6dJKkcGi.
FINDINGS: pet bottom = floor line, tag top = floor+3 => 0 px overlap for S/M/L pets (cho, meo, kylan). Slots: iPad full-screen place = 4 equal columns (OD L1439/L1442 puzzle slots, replaced L1049); count chip = OTHERS (OD 11/15 06:55Z). BUG for a ticket: jly.js:20 figTierOf(S) = -1 because S.lyF (the fallen Lý object) is stored on S => her own figure uses tcold art in every place.
CDN (delete after verdict): img/_review/place-stage/ladder-{fold,ipad}-{1..4}[-r2|-pet].jpg, ladder-{fold,ipad}-{A1..A4,B1..B4,Bmax1,Bmax2}-pet2.jpg, ladder-ipad1366-Pro-pet2.jpg, sbs-*, nochip-*.
Worktrees (this container only): /home/user/wt/place-stage-r4 (code), /home/user/wt/ho. Context: START_CTX ~2 %, now estimated ~50 %; rolling over soon after her pick (coordinator opens the successor).
