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

## HANDOVER (worker rolled over on context; coordinator opens successor) — 11/16 16:58Z
State: review/tutrang-layout c35364409 pushed (merged main de239eca). Worktree was /home/user/wt/tutrang (may be gone: `git fetch origin review/tutrang-layout main`, `git worktree add`). Build: `bash dev/site/build_site.sh` (needs CDN curl). Shot harness (scratchpad, lost): load site, window.__forceOrigin='tt'; start(); remove #kroul/#kload/.kbd/#modal/.kcf-cards root, closeModal(); S.inv=[tramngoc w,vongngoc,nhansam,...]; petAdd(S,'cho','buy','buy'); S.petTip=1; click #tabs [data-tab=inv]; screenshot. toil: toilOpen(). Serve with python3 -m http.server (run_in_background).
Done: jinv.js kitInvGrid {side,sum,below} + kitEquipSlots {col:true,row:true}; kitInvFit sizes --kside (wear slot 72 max, floor 56) and fills free height by the bag column; jwdinv/jtoil/jpet/jtsb switched; pet age via petStage+tsbWk (N tháng tuổi / N tuổi).
TODO (owner 16:55Z + 17:30Z, from s20):
1. Pet box moves into the LEFT column under "Y phục": same column width, pet slot = wear-slot size, name/age/effects as small lines under it (fit the column; tap = opens Thú cưng sub-tab); empty: "Chưa nuôi con nào" once. Bag grid takes the WHOLE right side to the frame bottom (no pet strip; thin Sắc/Xa xỉ sum line may stay). Do not tune row/column counts per device (review/page-scale owns kitInvFit fill; expect merge conflicts in kitInvFit).
2. Inner tab row = "Túi đồ" | "Thú cưng" | "Việc" (kinvSubHTML in jinv.js; KINV_SUB). Thú cưng = list of all pets (kit cards) + care (jpetcare), buy (petShop), Cho theo hầu / Gửi về (petPick buttons) — move existing screens, kit parts only.
3. Shots fold/ipad with 0 / 1 / 3 pets + fold-toil; kit-conform 755x1000 + 1180x820; update pets-fix (stale PETC.peek at line 90 is pre-existing); game-feel (slow: 4x CPU throttle, give it >5 min or background) + old-save load NOT yet run; sw.js via build_site.sh. Report sha+shots to s20.
