# mg-intro-2 — contest / mini-game INTRO (owner mark #55, OD 21/11 ~04:17Z)

PRIORITY #1 CHECK: OD row 21/11 ~04:17Z (#55) | main j82 kgReady (.kgr-demo picture) + j82:466 contest intro | review/mg-5s-clear (NWB_DEMO demos, not on main; none to remove here), review/kit-tap-word (kitTapWord not on main → existing kit «!» kpPop used) | claims none else.

Branch review/mg-intro-2 = origin/main 9c1dd605 + 2 commits. Numbers / grading / BAL untouched (drawing + text layout only).

## What changed (KIT, law 9)
1. `kgReady` (j82, the ONE rules block of every intro): the picture of the move (`.kgr-demo`, `kgReadyDemo`, `NWB_DEMO` in jnwb, all demo CSS) is DELETED. On top: the EVENT picture `.kgr-ev` (`evArtOf(spec.ev)`: festival `fest:<fk>` for a festival contest, `sys:tuyen-tu` entry exam, `sys:thi-tam` Khảo hạch, default `cat:tai-nghe`; `ev:false` for pet / plant care dialogs). Heading «Luật chơi · name» + kit «!».
2. `kgBang(html,title)` / `kgBangRows(head,all,shown)` (KIT.md §13.7.4) = thin wrappers of LIVE `kitTapWord` (§73.2): the heading words are the tap-word, a tap opens the kit pop-up. (First version used own «!» + kpPop; replaced after MAIN 87.) Long rules (Môn / Luật / steps / «chưa tính giờ» note), all «Phần của ngươi» rows, rival details sit behind it.
3. Callers: startContest («Gồm» + «Độ khó» shown; «Đối thủ» = name + «tài nghệ n»), jentry (Độ khó + road row), jexam (Độ khó + Mức đỗ), playArt `o.rows` (first 2), every other kgReady caller via the shared block.

## Before / after (scan: dev/test/mg-intro-2.js, every KG82_KIND via playArt + startContest Thất tịch)
| element | before | after |
|---|---|---|
| picture on top | picture of the move (demo) | event picture (all kinds: yes) |
| `.kgr-demo` | every kgReady screen | 0 |
| Môn/Luật rows in view | always | 0 (behind «!») |
| «Phần của ngươi» rows (contest) | 4–6 rows | 2 rows + «!» |
| rival line | «tài nghệ a + chuẩn bị b + màn thi chưa rõ (0–30)» | «tài nghệ n» (detail behind «!») |
| «Đọc kỹ luật…» note | always | behind «!» |

## Tests (Fold 755x1000 + iPad 1180x820 shots looked, scratch /home/user/wt/mgi2-shots)
mg-intro-2 ALL OK (new) · mg-allkinds 7/7 · mg-ui-rest 39/39 (`.kgr-demo` → `.kgbang`) · mg-noword-a ok · mg-noword-b ALL OK · mg-noword-kit PASS 31 kinds · mg-ready-guide 9/9 (the «kit-guide» test = this one; no file named kit-guide) · coop-e2e (tt/nc) 92/92 · quickcheck PASS (core gates PASS). mg-play2 rules check changed to «no demo picture».
MAIN 87 follow-ups: merged LIVE 5a8c30af; kitTapWord used (no own pop-up code); Fold + iPad: all 3 rival rows visible, not cut (event picture lower, `.kgrv-c` no inner scroll).
KEEPER answer (session_01Rc5AsMtjP4KTgBZVjENGLs): kgBang is covered by `kitNoteBang(text)` (KIT §62.1, review/kit-ghichu-bang a775df5b, not LIVE yet); keeper will add `title` arg after it lands, then kgBang/kgBangRows call it (kgBangRows row logic stays mine). Until then kgBang stays, marked with the «→ kitNoteBang(text,title)» comment in j82.js. Owner's «!» wish: the round «!» replaces the tap-word then.
Re-run on 31ebca8a+: mg-intro-2 ALL OK (Fold + iPad), mg-ui-rest 39/39, mg-allkinds 7/7, mg-noword-a 0 FAIL, mg-noword-b ALL OK, mg-noword-kit PASS, mg-ready-guide 9/9, coop-e2e 92/92, quickcheck PASS.

~92% xong / ~88% chơi được

## Follow-up (MAIN 89, after kit-ghichu-bang LIVE 068662ad)
- Merged LIVE 068662ad (conflicts only index.html/sw.js/j82/jnwb; mg-5s-clear's NWB_DEMO rules demos dropped with the rest, no picture of the move remains anywhere).
- kgBang(html,title) now = heading words + `kitNoteBang(html,title)` (the round yellow «!»; popup title = heading). kitNoteBang got the optional `title` arg here (j79.js, keeper-agreed); keeper's own version (kit-ghichu-sections cfde1cc4, not LIVE yet) does the same → on conflict in j79.js take main's. kgBangRows row logic unchanged. kitTapWord no longer used here.
- Tests on f1b57d34: mg-intro-2 ALL OK · mg-ui-rest 39/39 · mg-allkinds 7/7 · mg-noword-a 0 FAIL · mg-noword-b ALL OK · mg-noword-kit PASS 31 · mg-ready-guide 9/9 · coop-e2e 92/92 · quickcheck PASS. Fold + iPad looked (3 rival rows visible, «!» popup works).

## Re-merge (MAIN 92, LIVE 74cea8bf incl. mg11 a66b5a49)
Merged origin/main 74cea8bf (real conflicts: j79.js kitNoteBang → main's version (has `title` already); jshelf.js → both: `ev:false` + main's `W,env`; jnwb.js merged clean — NWB_DEMO demos stay deleted, nothing else of mg11 lost; index.html/sw.js rebuilt). Gates on 2bff694c: mg-intro-2 ALL OK · mg-ui-rest 39/39 · mg-allkinds 13/13 · mg-noword-b ALL OK · mg-ready-guide 9/9 · coop-e2e 92/92 · quickcheck PASS · mg-noword-a 0 FAIL.
mg-noword-kit prints «FAIL 3 kinds» (thu_tam, thu_choi, tuoi = pet/plant care text) — SAME on pristine origin/main 74cea8bf (verified in a clean worktree), not from this branch.

## Land re-merge (MAIN 93): review/mg-intro-2-land
Base rv3 847a5934 + origin/main ba9b6243 (pm-c 75ad237d, kit-opt-kem a4ee93d7, kit-badge). Real conflict only dev/build/j82.js (startContest end + playArt intro): both sides kept — my event picture `ev` (startContest / playArt / EG engine games) + `kgBangRows`, main's `onGo(rows)`, EG engine spec, `quick.raw`. index.html/sw.js rebuilt. Gates: mg-intro-2 ALL OK · mg-ui-rest 39/39 · mg-allkinds 13/13 · mg-noword-b ALL OK · mg-ready-guide 9/9 · coop-e2e 94/94 · quickcheck PASS (core gates PASS) · mg-noword-a 0 FAIL.
