# know-notice — worker report lives on branch review/know-notice (dev/handover/reports/know-notice.md); review below

## REVIEW (r1, BIG reviewer-lander session_01Rc5AsMzkmnYoWhKFiCDBgU for MAIN 113) — FAIL
PRIORITY #1 CHECK ('know-notice'): OD 1 (23/11 ~23:08Z) | ledger 0 | claims 2 (worker + this review) | main 0 | review/* 1 (review/know-notice) | archive 0
Reviewed: review/know-notice 6205f686b7bf933d174adc2a6733611ff36b6adc. Base = live origin/main 72521d62 already an ancestor (no merge needed).
Pushed: review/know-notice-r a8176fbf939cfd81b6b2bc4587e3d73d8aa06199 = 6205f686 + rebuilt index.html/sw.js (the branch had NOT rebuilt them) + test fix (know-notice.js discover row: discover can batch a like and its linked fact → «biết thêm 2 điều», failed on iPad seed; regex now accepts it).

### Gates (own runs on a8176fbf)
| Gate | Result |
|---|---|
| quickcheck.sh (build identical, core gates G1–G5, time-spill, open, old save from live loads + plays a buổi, perf vs live) | PASS (690 s; perf median new/live render 273/313, buổi 2742/3211) |
| one-core guard / text / text-rule / bind | PASS (inline 3561 ≤ baseline 3592) |
| know-notice.js fold / ipadAir | 0 bad / 0 bad (after test fix) |
| coop-e2e (Fold host) / COOP_SWAP=1 (iPad host) | 141/141 / 141/141 |
| Shots Fold 755x1000 + iPad 1180x820 (chip «Ta biết thêm 3 điều», «Tin báo» panel) | looked 3×: no cut text, no overflow; kit §42.2 chip/box/panel; voice filter shows «Ta …» |

### What is good
- kitKnow is a thin batcher on kitNotice §42.2 (kind know), no private chip/frame; KIT.md §42.3 + kit page sample §42.3 present (law 9 OK).
- All S.known / S.met / S.trK / emp.known writers now go through k61Know / k61MetSet / learnTrait / discover (scan: only init/migration writers remain: j61:18/76/133, jht:152).
- Co-op: kitKnow in thin UICAP; coop-e2e both seats green; rkSeen is a personal key; old saves seed rkSeen silently.

### FAIL list (scope 1: "ONE clear notice per knowledge gain, none silent, none double", law 11 whole family)
1. STILL SILENT (log line only, same class the worker wired elsewhere):
   - dev/build/jmind.js:91 learnDis (non-jdis path): «… không ưa …» log only.
   - dev/build/jmind.js:89 learnLike else-branch (target not a rival): log only.
   - dev/build/jtrong.js:65-67 trongLearn for Hoàng thượng / Thái hậu (noteAdd skipped when q is emp/th → log only).
   - dev/build/j92.js:141-142 wdReveal and dev/build/jveil.js:77 vlReveal: an item's true phẩm learned (law 6c object knowledge) — log only.
   - dev/build/j29.js:33 servLearn: a servant's nature learned — log only.
   - dev/build/jht.js ktReveal (kid's nature; returns text) and dev/build/j85.js:198 S.kduc (her knowing someone's đức after a caught act): check and wire or show why the result card already tells it.
2. DOUBLE (card/dialog AND a know-notice for the same fact): the blanket noteAdd hook (dev/build/j21.js:3) fires a notice even when the same act already shows the fact in its dialog/result:
   - dev/build/j95b.js:214-217 j95bHear: Q card «Nghe đồn» + notice «Sổ ghi thêm …: Nghe đồn …».
   - dev/build/jcycle.js:216-217 cyBook: the found list in the Sổ nguyệt sự dialog + one notice per noteAdd.
   - dev/build/j78.js:110/116/121/125 + jact.js:162 intelLearn: the result text already lists the facts + notice from noteAdd (j78.js:53).
   The worker removed exactly this kind of double in jky (kitNotice + newsAdd) — apply the same rule to the whole family: a fact shown on the open card/dialog of the act counts as its notice (e.g. noteAdd gets a quiet flag from callers that show it, or kitKnow drops facts the current card already shows); scan all ~60 noteAdd callers, table before/after, test rows for j95bHear / cyBook / intelLearn = 1 visible telling each.
3. Nit (law 4 style, not blocking alone): j61.js k61RankSync uses `v.queen?7:(v.rank|0)` — use the shared rank helper (rkOf / RANKS.length-1) instead of a typed 7.
4. Nit: the Tin báo panel joins facts with « · » in one paragraph; fine for now (worker noted).

Next round: worker builds on review/know-notice-r (a8176fbf), fixes 1–2 (3 too), reruns know-notice.js both devices + coop-e2e; then re-review.
Shots: scratch only (none in git, none on CDN; deleted).

## REVIEW r2 (BIG reviewer-lander session_01Rc5AsMzkmnYoWhKFiCDBgU for MAIN 113) — PASS
PRIORITY #1 CHECK ('know-notice'): OD 1 (23/11 ~23:08Z) | claims 2 | main 0 | review/* review/know-notice, -r, -r2 | archive 0
Reviewed: review/know-notice-r2 37312b96 (worker round 3 on my a8176fbf). LAND sha: review/know-notice-r ce2860f00edcd8dace76dbfd693726f1111b05ea (merge of LIVE c39e5009; live main is its ancestor → fast-forward).
r1 items: (1) silent learners jmind learnDis/learnLike, jtrong emp/th, j92 wdReveal, jveil vlReveal, j29 servLearn, j53 ktReveal (log path), j85 S.kduc, j78:125 → each 1 notice ✔. (2) noteAdd(id,t,shown) quiet flag at j95bHear, cyBook, intelLearn, j92 wdTaimat ✔. (3) rkOf(v) ✔.
Law 11 family check of the ~54 noteAdd callers the worker left unverified (MAIN asked): reviewer fixes on the branch (commits b09b7530, d87ab6aa):
| Site | Before (r2) | After |
|---|---|---|
| j24.js:32 maidWarn (card «Lời cảnh báo») | card + notice | card only (shown=1) |
| j68e.js:95 / j68h.js:42 (event ok text tells it) | result + notice | result only |
| j70.js:249 «Tra ra rồi» result | result + notice | result only |
| jthaiy.js:106 taint line in the Thái y dialog | dialog + notice | dialog only |
| j22.js:82 month text «Tai mắt báo…» | month card + notice | month card only |
| jagknow.js:469 Mua tin (Q «Tin mua được») | card + notice | card only |
| j78.js:45 dò la trait fact (card «… có nết X») → learnTrait | card + notice (worker's own test row failed on Fold) | learnTrait(v,why,shown) → card only |
| Others (j21:8/17, j22:66, j28:56/81, j40, j43, j70:181/190/286/291/355, j92:275, j95 ×3, j95b:236, jagday, jagent ×2, jagknow:199, jcycle:222, jdis, jdress, jkh, jmind, jroute, jshelf ×2, jthaiy:59/61/122/141, jts:352, jtsb ×2, jtwoway, jtrong) | log line or a different fact on the card | notice kept = the one clear telling |
Gates on ce2860f0: quickcheck PASS (661 s: build identical, core gates G1–G5, old save from live loads + plays, perf new/live render 262/278, buổi 2557/4095) · one-core guard/text/text-rule/bind PASS · know-notice.js fold 0 bad / ipadAir 0 bad · coop-e2e Fold host 141/141 (and on the pre-merge sha: Fold host + COOP_SWAP 141/141 twice) · ky-keeper-f2 (merged from live, touches jky) PASS · shots Fold 755x1000 + iPad 1180x820 looked 3× (chip «Ta biết thêm 3 điều», Tin báo panel; no cut, no overflow).
Laws touched: 1 (both seats: kitKnow in UICAP, coop green) ✔ · 4 (no typed number; rkOf) ✔ · 7 (no %, voice «Ta») ✔ · 9 (kitNotice §42.2, KIT.md + kit page §42.3) ✔ · 11 (family scan above) ✔ · 12 ✔.
Open for later (not blocking): Tin báo panel joins facts with « · » in one paragraph; SẮC PHONG NEWS screen belongs to SELSCENE (kitKnowMany ready).
Shots: scratch only, deleted.
