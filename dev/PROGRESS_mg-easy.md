# PROGRESS: mg-easy (C23) — knowledge minigames winnable without classical knowledge
Owner (15/11): "Mini game này khó quá, tôi có rành mấy câu xưa tiếng việt đâu." Spec: dev/OWNER_DECISIONS.md "Thơ minigame too hard" (docs branch). Branch review/mg-easy (from main 3ef079f6).
C41 (Tứ đức minigames) is a separate worker (review/tuduc-mg): not touched.

## Rule applied to the whole family
Difficulty follows the player's own level (`kg82Tier(lv)`: lv 0–1 = Dễ, 2–3 = Vừa, 4+ = Khó), for the knowledge kinds only (`KG82_KNOW`: tho, doi, doden, co, le, tc, xa, thq).
Every such game now has: (a) the aid drawn on the board at low level, (b) a "Gợi ý" kit button (`.kgbtn`, costs a little score, never blocks), (c) a quiet auto-hint when she stalls (tier 0/1), (d) more time at low level, (e) wrong tries bounce back / are undone at once (tier 0/1), (f) a one-screen "how to play" card the first time (S.mgSeen[kind], old saves start empty; `KG82.noDemo` for tests).
The intro "Độ khó" row now reads Dễ · có gợi ý ngay trên bàn / Vừa · gợi ý bớt đi / Khó · gợi ý ở nút Gợi ý (before: higher level = "Dễ hơn", i.e. beginners got the hardest setting).

## What changed per game (dev/build/j91.js, j82.js, jexam.js)
- Thơ (k91Verse): rhyme ending shown under the red word of the lục line ("vần -anh"); each tile shows its ending (tier 0: tinted red when it fits; tier 1: plain ending; tier 2: none); a plain "ý:" line (12 verses got glosses and a curated rhyme family, e.g. ơi~ai); blanks 1/1/2/2 (Dễ), 2/2/3/3 (Vừa), 2/3/3/4 (Khó); decoys 1/2/2, never in the rhyme family; time 40/34/28 s per line (was 30–40 s, MORE at high level); wrong drop bounces back with a soft line ("Chưa hợp vần, cần chữ vần -x"); idle glow of the right tile after 8 s / 14 s; non-rhyme blanks never use a word that itself fits the rhyme.
- Câu đối (k91Pair): couplets 3/4/4, 4/5/5, 4/6/7 words (prefix of the real couplet); counterparts sit near their row at tier 0; wrong thread snaps back at once with a soft line; "Mẹo" line; Gợi ý lights one right pair; idle auto-hint; more time.
- Đố đèn (k91Lantern + KG82_DO): pieces to turn 4/5/7; lanterns 3/4/4; every riddle got a plain "gợi ý:" category line (shown at tier 0/1 and after a wrong pick or Gợi ý); a wrong lantern dims and she picks again (tier 0/1); Gợi ý straightens one piece, then dims a wrong lantern; more time.
- Khảo hạch quiz (kg82Quiz; lễ nghi, trị cung, xử án, Thái hậu hỏi): 2/3/4 choices, 20/15/10 s per question (was 3 choices, 10 s); Gợi ý button drops one wrong answer; idle auto-hint at tier 0/1; banks keep all wrong answers so tier 2 gets 4 choices.
- Cờ (kg82Go): gold dashed ring round the white group in danger (tier 0/1), Gợi ý / idle glow on the last empty spot, time 22/15/10 s (was 9–13 s).
- Checked, no change needed (the answer is on screen): Nấu ăn (recipe shown), Điều hương (match a shown colour), Cắm hoa (rule + labels), Hát, Đàn, Cung, Đầu hồ, Vẽ, Thêu, Múa, Khéo tay. Old j5 `quiz`/MG table is unreachable (j91 rebinds every lesson to the j91 games).
- Scoring: gain per line/round = right − 0.3 × wrong tries − hint costs (button .25, auto .15), never below 0; a right answer after hints still scores at least a little.
- Lessons (openMG → kg82Lesson) and contests (startContest/playArt/exam) all go through the same engines, so all paths are covered.

## Scan (LUẬT SỬA CẢ NHÓM): `python3 dev/test/mgeasy-scan.py [ref]`; before/after tables in dev/test/_out are not committed; summary:
before (origin/main): none of the 6 knowledge groups had tier, Gợi ý, idle hint, instant check, demo or shown aid.
after: tho, doi: all 6; doden: all except instant bounce (it dims instead = P.dis); co: tier, Gợi ý, idle, ring (no demo, rule is one line); quiz: tier, Gợi ý, idle, wrongs (no demo).

## Tests
`dev/test/mgeasy.js` (= minigames91.js + env LV=0..5 forces the tier, DEMO=1 keeps the demo card; stubs kitRoulette, removes #kload; uses HTTPS_PROXY for CDN art). `dev/test/minigames91.js` unchanged (its fresh save would show the demo card: set KG82.noDemo first).
See results at the end of this file.

## Open questions for the owner
- Higher level now means a HARDER game (more blanks/pairs, fewer aids) for these kinds, as the coordinator spec said; rewards unchanged. OK?
- Rival NPC scores are still by kg82NpcMean(lv) (unchanged), so low-level players now clear the minigame part more easily; balance pass may want a look.

## Scan tables
BEFORE (origin/main)
```
kind                       asks                              tier         Gợi ý        idle-hint    bounce/instant check 1-screen demo shown rhyme/aid
tho                        old verse (lục bát rhyme)         -            -            -            -            -            -           
doi                        parallel word pairs               -            -            -            -            -            -           
doden                      folk riddles                      -            -            -            -            -            -           
co                         go "khí" rule                     -            -            -            -            -            -           
le/tc/xa/thq (khảo hạch)   palace manners / duties           -            -            -            -            -            -           
banh                       recipe order (recipe is shown)    -            -            -            -            -            -           
huong                      match a sample colour (shown)     -            -            -            -            -            -           
hoa(cắm)                   Thiên/Nhân/Địa by stem length (shown)-            -            -            -            -            -           
dan                        rhythm                            -            -            -            -            -            -           
hat                        follow a ribbon                   -            -            -            -            -            -           
ban                        timing                            -            -            -            -            -            -           
dauho                      physics                           -            -            -            -            -            -           
ve                         trace a faint line                -            -            -            -            -            -           
theu                       memory                            -            -            -            -            -            -           
mua                        memory                            -            -            yes          -            -            -           
kim                        untangle                          -            -            -            -            -            -           
```
AFTER
```
kind                       asks                              tier         Gợi ý        idle-hint    bounce/instant check 1-screen demo shown rhyme/aid
tho                        old verse (lục bát rhyme)         yes          yes          yes          yes          yes          yes         
doi                        parallel word pairs               yes          yes          yes          yes          yes          yes         
doden                      folk riddles                      yes          yes          yes          yes          yes          yes         
co                         go "khí" rule                     yes          yes          yes          yes          -            -           
le/tc/xa/thq (khảo hạch)   palace manners / duties           yes          yes          yes          yes          -            -           
banh                       recipe order (recipe is shown)    -            -            -            -            -            -           
huong                      match a sample colour (shown)     -            -            -            -            -            -           
hoa(cắm)                   Thiên/Nhân/Địa by stem length (shown)-            -            -            -            -            -           
dan                        rhythm                            -            -            -            -            -            -           
hat                        follow a ribbon                   -            -            -            -            -            -           
ban                        timing                            -            -            -            -            -            -           
dauho                      physics                           -            -            -            -            -            -           
ve                         trace a faint line                -            -            -            -            -            -           
theu                       memory                            -            -            -            -            -            -           
mua                        memory                            -            -            yes          -            -            -           
kim                        untangle                          -            -            -            -            -            -           
```

## Test results (dev/test/mgeasy-play.js, oracle auto-player, forced tier LV, 0 page errors, no horizontal overflow)
- 755x1000: tho, doi, doden, co, le (lễ nghi quiz), thq at LV 0, 2, 4: all reach the result; raw 10/10 (9/10 doi LV4). 1180x820, 844x390: tho/doi/doden intro+play shots checked (844x390 scrolls inside the dialog as before); 390x844 shows the rotate prompt.
- First-time demo card for doden checked by screenshot (DEMO arg).
- Images: none made. PENDING CDN UPLOAD: none.
