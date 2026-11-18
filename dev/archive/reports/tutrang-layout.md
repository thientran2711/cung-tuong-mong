# tutrang-layout report (worker, 11/16/2026)
Branch review/tutrang-layout, sha bf6258593 (base origin/main 0ce59361). START_CTX ~5%; no rollover needed.

## Change (shared kit only, dev/build/jinv.js)
- kitInvGrid gains side / sum / below: wear column LEFT, bag grid RIGHT (whole rows only, natural cell size), worn-bonus chips under the grid, pet strip below.
- kitEquipSlots gains col:true (vertical column: slot picture + small slot name; item name/chips live in tap panel + tooltip) and row:true (one strip: slot = bag-cell size, pet name + state beside it; empty = "Chưa nuôi con nào").
- kitInvFit sizes --kcell (bag cell) and --kside (wear slot = bag cell, shrunk so 6 slots + labels fit panel height, min 44px); free-height fill measures the bag column.
- Callers switched (all places with wear slots + bag): Tư trang (jinv keqTT + jwdinv override), Chọn y phục (jtoil), pet strip (jpet petHTML, jtsb no longer appends it). Person-card kitWearSlots (no bag) untouched.
## Measurements (CSS px)
Fold 755x1000: panel 769 tall, no scroll (scrollHeight=clientHeight); wear column 508 tall x 78 wide (6 slots, labels 0.58rem), bag 615, pet strip 78 (was 197). iPad 1180x820: right pane 580x621 no scroll, column 489 tall. No horizontal overflow; 0 page errors.
## Shots
dev/review-shots/tutrang-layout/{fold,ipad}-pet{0,1}.jpg (@2), fold-toil.jpg (@1, dress picker).
## Tests
kit-conform 755x1000: 91 CONFORMS, 15 MISSING (place:*, contest, cold-palace; not inventory, no errs; baseline not re-run). NOT run: game-feel, old-save load, inv-grade/pets-fix (pets-fix asserts the old keq subgrid pet row: needs updating to the strip). Site root index.html rebuilt; sw.js not rebuilt.
## Open
1km: veil label wraps to 2 lines at narrow widths; owner decides if she wants item names back in the column.

## RESULT #2 (worker tutrang-layout #2, 11/16 ~18:00Z) — review/tutrang-layout c39139e51 (merged main fb367740; generated index.html/sw.js rebuilt)
START_CTX ~5%, no rollover.
Built (kit parts only): Túi đồ = LEFT column ĐANG MANG (6 slots) + PET box directly under Y phục (jpet petSideHTML; kitEquipSlots col:true with per-slot `info`/`lc`; same width/slot size; followed pet else first; name/age/effect chip; 0 pets = empty slot + "Chưa nuôi con nào"; tap -> Thú cưng tab); RIGHT = bag fills to the frame bottom, no pet strip. Inner tabs = Túi đồ | Thú cưng | Việc (kinvSubHTML; Thú cưng = jpet petPanelHTML: kitSkillCard per pet + Chăm -> jpetcare, Cho theo hầu, Gửi về, "Nhờ thái giám tìm thú nuôi"). Old row strip (keqr) removed. kitInvFit: wear column slot fits panel height (max 72, floor 40 + .kinvtight drops pet title/spare line when still too tall); no bag row/col tuning (page-scale owns it). KIT.md 28.13g updated.
Slot size: Fold 755x1000 = 61-64 px (not 72: 7 slots + pet text do not fit 769 px panel at 72); iPad 1180x820 = 40 px (right page only 621 px tall). Panel never scrolls on Túi đồ in 0/1/3 pets at both sizes.
Tests: pets-fix 755x1000 PASS (0 errs, no overflow; test rewritten to Thú cưng tab; stale PETC.peek was really a stale feed step: feed/bath/play now run and change stats; feed uses the tap-food-then-tap-pet path because pictures are not reachable from the sandbox). kit-conform 755x1000 91 CONFORMS/15 MISSING, 1180x820 91/14, 0 MIXED/CUSTOM (MISSING = place/contest/cold-palace, as before). tab-pairs both sizes 0 mismatches 0 errors. game-feel: ONLY phase 4 (old save made by main loads: ok, offline ok, 0 errs) run; phases 1-3,5 (perf, 4x throttle) NOT run. Tests needed window.__nlInner (added to game-feel/tab-pairs). Not run: inv-grade, 1366x1024, 412x1058, 390x844.
Shots (@2): dev/review-shots/tutrang-layout/{fold,ipad}-pet{0,1,3}-{tui,thu}.jpg. fold-toil.jpg is the older dress-picker shot (not reshot). Caveat: pet pictures in the fold shots are blank placeholders (CDN images not loading in sandbox); ipad ones loaded.
Open: pet name wraps to 2 lines in narrow column; "Khăn che mặt" label wraps at 40 px.
## HANDOVER (worker rolled over on context; coordinator opens successor) — 11/16 16:58Z
State: review/tutrang-layout c35364409 pushed (merged main de239eca). Worktree was /home/user/wt/tutrang (may be gone: `git fetch origin review/tutrang-layout main`, `git worktree add`). Build: `bash dev/site/build_site.sh` (needs CDN curl). Shot harness (scratchpad, lost): load site, window.__forceOrigin='tt'; start(); remove #kroul/#kload/.kbd/#modal/.kcf-cards root, closeModal(); S.inv=[tramngoc w,vongngoc,nhansam,...]; petAdd(S,'cho','buy','buy'); S.petTip=1; click #tabs [data-tab=inv]; screenshot. toil: toilOpen(). Serve with python3 -m http.server (run_in_background).
Done: jinv.js kitInvGrid {side,sum,below} + kitEquipSlots {col:true,row:true}; kitInvFit sizes --kside (wear slot 72 max, floor 56) and fills free height by the bag column; jwdinv/jtoil/jpet/jtsb switched; pet age via petStage+tsbWk (N tháng tuổi / N tuổi).
TODO (owner 16:55Z + 17:30Z, from s20):
1. Pet box moves into the LEFT column under "Y phục": same column width, pet slot = wear-slot size, name/age/effects as small lines under it (fit the column; tap = opens Thú cưng sub-tab); empty: "Chưa nuôi con nào" once. Bag grid takes the WHOLE right side to the frame bottom (no pet strip; thin Sắc/Xa xỉ sum line may stay). Do not tune row/column counts per device (review/page-scale owns kitInvFit fill; expect merge conflicts in kitInvFit).
2. Inner tab row = "Túi đồ" | "Thú cưng" | "Việc" (kinvSubHTML in jinv.js; KINV_SUB). Thú cưng = list of all pets (kit cards) + care (jpetcare), buy (petShop), Cho theo hầu / Gửi về (petPick buttons) — move existing screens, kit parts only.
3. Shots fold/ipad with 0 / 1 / 3 pets + fold-toil; kit-conform 755x1000 + 1180x820; update pets-fix (stale PETC.peek at line 90 is pre-existing); game-feel (slow: 4x CPU throttle, give it >5 min or background) + old-save load NOT yet run; sw.js via build_site.sh. Report sha+shots to s20.
