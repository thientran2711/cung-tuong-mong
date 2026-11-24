# kit-rewardplate r3 review (SMALL kit reviewer, 11/24/2026)

PRIORITY #1 CHECK ('evframe rewardplate'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (from ORDER MAIN 125 16:54Z; re-read at start: START_CORE 18 LAWS, START_WORKER, START_REVIEWER, KIT §82 + rewardplate note, VANPHONG).

Target: review/kit-rewardplate deab3d84 (r3). Merge base eae255e2. Newest origin/main at review time: 284e0d08 (LIVE moved to 8eceeef9 → 284e0d08; merge was clean, 0 conflicts). Merged head built locally = 654a2400 (merge) → 95d8b32e (local build commit, NOT pushed).
Note: the bare head does not hold its own built index.html/sw.js (branch commits sources only) → quickcheck "built" gate cannot pass on the bare head; bare head was built locally with `bash dev/site/build_site.sh` for the tests.

## Verdict: KIT FAIL → KK20 (1 row, small)
Everything MAIN asked for in row 4 is fixed and readable. One same-part inconsistency (law 9 / law 11) remains.

### FAIL row 1 — kitGain / kitRevealHTML `from` + sub lines are still bare text on the stage
- `kitRevealHTML` (jkrev.js:35) puts the item name on the plate, but `.krevf` (`from`, e.g. «Thái hậu ban») and `.krevs` (sub, e.g. «Thuốc bổ») are still bare small cream text (#f6ead6c0, .76/.8rem) on the stage picture. Used by kitGain (jfx.js:412, `kitGain(entry,{from})`) = every single-item gain.
- In kitReward the SAME kind of line (`from`: «Hoàng thượng ban») is on the kit title plate. Same part, two looks = law 9 / law 11 break, and it is the exact complaint (owner 24/11 «chữ phải đọc được»): see shot fold-D-kitgain (stage mid-tone behind «Thuốc bổ» / «Thái hậu ban»: small, low contrast).
- Fix the whole group: render `from` (and the sub line) in kitRevealHTML with the same `kitTitlePlate` tier 8 «sh t», small variant (`kmrew-pl-s` look), `kdh-still`, `id:false` (jkrev has no kmPlate, call kitTitlePlate directly or move kmPlate to the kit core). Add kitGain with `from` + the longest item name to dev/test/kit-rewardplate.js (it covers kitReward only), both devices.
- Callers scanned: kitReward (all 20 call sites in 13 modules go through the ONE function → consistent); kitRevealHTML callers = kitReward reveal (noSub:true), kitGain, kit sample §54.1; only kitGain/§54.1 show `from`/sub bare.

## What was checked and is OK
| Check | Result |
|---|---|
| Row 4 «contrast readable» | OK: tier 8 plate = dark ink on light gold, readable on both stages (shots fold/ipad A-short, C-longest) |
| Petals UNDER the plate, never over text | OK: z-index 8 on `.kmrew-h`; `kfAmbWant` now off under `.kmov`, `.kscn`, `#modal:not([hidden])` (static, diff jfx.js:254); 0 petal nodes in the reward in all 3 sets × 2 devices |
| No ghost figures | OK: plates fully opaque when settled (computed opacity 1); `kmBlink` now pulses by scale, never opacity; background figures are the stage under the dim, not duplicates |
| No overlap | OK: title plate above the chest lid (open state), from plate under it; item-name plate sits below grade chip, no collision with chip / shelf / list |
| Open-state plate | OK: shot X-2open: title + from still above the open chest, readable |
| Longest item name «Bản chép tay hương phổ «Hương kỳ nam, long diên»» (49 chars) | OK: one line, plate ~500 px on Fold 755, ~500 px iPad, not clipped, no horizontal overflow (sw == vw 755/1180) |
| VANPHONG wording | OK: «Ân thưởng», «Mâm thưởng», «Hộp gấm», «Chạm để mở», «Hoàng thượng ban», no %, no odds words |
| Laws touched | 7 OK · 9 FAIL row 1 · 10 OK (plates fit, one size tier) · 11 FAIL row 1 · 12 looked on Fold + iPad · 14 KIT.md note in §82 list, in place · 4/6/2/3 not touched |

## Commands + outputs
```
# bare head (deab3d84) built locally, node dev/test/kit-rewardplate.js <out>   (no args = 755x1000 + 1180x820)
FAIL fold chest: reward open / FAIL fold tray: reward open     (run 1)
ok ipad chest/tray: 3 kit title plates, visible, not clipped, not tappable ; no bare caption ; no page errors ; FAILED 2
# bare, args 755x1000 alone: ALL PASS ; bare, args 1180x820 ok
# merged head (654a2400 + LIVE 284e0d08) no args: run1/run2 FAIL fold reward open x2 (ipad all ok) ; args 755x1000: 1 FAIL / 1 ALL PASS ; reverse order idem
```
Fold «reward open» = HARNESS FLAKE, not this branch: the same test run on bare LIVE main (284e0d08, no rewardplate) gives `FAIL fold chest: reward open` + DIAG {"kmov":[],"Q":0,"modalOpen":false,"kload":false} 2 of 3 runs. Cause = kmFree() holds the queue while the buổi dawn is on (test starts with nextBuoi x5), 20 s wait is not always enough. Not a branch defect; fix belongs to the picture/dawn-wait helper repair A (waitForFunction #dawn not .on before kitReward). With the dawn waited, my 3-reward shot script passed every time on Fold and iPad.

```
# 3 rewards, Fold + iPad, plates seen 3x (closed / open / reveal / settled / end):
A short  chest  «Ân thưởng / Hoàng thượng ban / Chạm để mở» + item «Lư hạc»
B mid    tray   «Mâm thưởng / Thái hậu ban / Chạm để mở» + «Bản chép tay mẫu may «Áo phượng, nghê thường»», «Vòng ngọc Hòa Điền»
C long   gift   «Hộp gấm / Nội vụ phủ / Chạm để mở» + «Bản chép tay hương phổ «Hương kỳ nam, long diên»», «…phương phấn son «Dầu tóc, hoa cài»», «Vòng ngọc Hòa Điền», «Bạc +30»
fold  kdhFit all true, petals 0, vw 755 sw 755 ; ipad kdhFit all true, petals 0, vw 1180 sw 1180
D kitGain «Nhân sâm trăm năm» from «Thái hậu ban» → FAIL row 1 (bare from / sub)
```
```
bash dev/tools/quickcheck.sh (merged head 95d8b32e, built; ALONE, old save)
run 1: QUICKCHECK FAIL perf buổi 3274/1547 (box noisy; open 2226 ms, old save ok, core gates PASS)
run 2: QUICKCHECK PASS · 232 s · open 2336 ms · old save ok · perf render 260/267, tab 557/545, buổi 1542/1466, tasks>200ms 25/23 · core gates PASS
```
(run 1 first attempt before that died in the CDN `_index.json` fetch of assets.py: truncated JSON, transient.)

Mock page img/_review/dim3/index.html opens (CDN, KK20's own mock; its «nền giữ nguyên sáng» rule is mock-only CSS, not in the branch — not reviewed as code).

Shots stayed in scratch (outside the repo), none in git.
