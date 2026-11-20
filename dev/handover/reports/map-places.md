# map-places (GAP KP02, J6) — worker session_01N1tNP5RC6vRXez3u71oULJ

PRIORITY #1 CHECK: OD L82 (decided 6 places) | main: jplx.js has cnh/tgk/ttp/acs/dc; **nvp already live: jact.js:90-97** (map spot, places(), count, peddler + weekly rare item, ACC_DAY, icon `bac`) → dropped from this job with proof | review/places (plan only, rejected pilot art) + review/places-port-r1 (= what main already has; its PROGRESS says nth/pd/nvp left out) | claims: none other.
START_CTX ~8 % (estimate), depth unknown.

## Done — branch review/map-places, sha 6883c4feb (on LIVE 30e8714e)
- `dev/build/jplx.js`: two new map places in the existing PLX registry (no old module edited):
  - `nth` Ngự thiện phòng, box .733,.455,.052,.137 (PLACES_PLAN §1), walk cell [1,4]; picture = STAND-IN (tạm) `img/kit/mg-banh-bg-hoc` (the painted kitchen board room), floor .74; keeper NPC «Quản sự Ngự thiện phòng»; open by day to Quý nhân+ (else the standard «Lẻn vào» card), closed at night.
  - `pd` Phật đường, box .77,.235,.065,.155, walk cell [0,4]; picture = STAND-IN (tạm) `tu-ninh-cung-<season>-<buổi>` (golden Buddha altar, 16 variants already on CDN); keeper NPC «Sư cô Phật đường»; open by day to every rank, closed at night.
  - Dư đồ list view row added; small labels like the other jplx places; map count = people on arrival (outermost count wrap, because the j95 ledger count would read 0 for places it does not know).
- `dev/build/jact.js` KIT_PLACE_IC: `nth:"suc"`, `pd:"duc"` stand-in glyphs.
- Law 6 (real people): NO servants are sampled into these rooms (one place per servant per buổi in the j95 ledger); only the fixed keepers. I tried errand-runner sampling first, the arrival check caught the count mismatch, removed.
- No numbers, no new acts: the existing acts of these places are NOT hooked (they are ledger/act work, see follow-ups).
- Test `dev/test/places-d42.js` now covers 7 places and checks count = people on arrival (also repaired: it started from `home`, where the retinue-picker modal blocked goTo).

| check | 755x1000@2 | 1180x820@2 |
|---|---|---|
| 7 spots on map | yes | yes |
| nth / pd count = arrival people | 1=1 / 1=1 | 1=1 / 1=1 |
| page errors | 0 | 0 |
| horizontal overflow | none | none |
| spot overlap | none new (old: lc/acs, cnh/nvp) | none new (cnh/nvp) |
Looked at: stage shots of nth and pd on both devices (stand-ins read correctly; modals from the harness covered part of the frame). Old save: nothing stored. Not run: quickcheck.sh (does not exist on LIVE), co-op suites (no rules/numbers touched; only S.place travels as before), 1366x1024/412/390.

## ART REQUEST for Foreman C (tạm → real)
Two paintings × 16 season×buổi (+ fallback) at 1280x720 like `thuong-thu-phong-*`: `ngu-thien-phong-*` (imperial kitchen, wide hall, stoves, steam, sacks, no people) and `phat-duong-*` (Buddha hall with lotus pond, as in PLACES_PLAN §1). When on the CDN: set `img`/`fl` in PLX.nth/pd, move both ids from PLX_STAND to PLX_NEW, remove `stand:1`.
## KIT REQUEST (filed in dev/kit/KIT_REQUESTS.md): glyphs `place-nth`, `place-pd`.

## Follow-ups (not built; need the j95 ledger or new numbers, feature freeze)
- Ledger rows for nth/pd (servants on errands: «sang lấy thiện», Phật tối mùng một / rằm), Thái hậu's morning rite at pd, festival events moving the court to pd (plan §2).
- Acts at these places: «Xin xăm ở Phật đường» (j2.js:152 is `if(false)`, left alone: owner rule 16), «Truy đến cùng Ngự thiện phòng» (j7 event option), kitchen lesson at nth (plan §4).
- Plan §3 per-place sneak odds + the «lảng vảng bếp ngự» evidence on a caught sneak into nth (new numbers → BIG review).
- Rows OD:L82 also lists Hoán y cục (= tgk), Dãy nhà cung nhân (= cnh), Thượng thư phòng (= ttp): already live. KP02 can close after nth/pd land; nvp was already done.

SẴN SÀNG KIỂM map-places 6883c4feb (SMALL review: no acts/numbers changed).

## REVIEW r1 (sonnet SMALL) — PASS 7c2aaa08c (review/map-places-r1 = 6883c4fe + merge of origin/main; index.html/sw.js conflicts resolved by rebuild)
PRIORITY #1 CHECK: report + brief carry it; nvp drop verified (jact.js:90-97 live).
- SMALL confirmed: diff = jplx.js, jact.js (icon map), places-d42.js, built files. No BAL, save, co-op, time or progression file. Access rules (nth: Quý nhân+ by day; pd: all by day) copy the existing ACC_ROLE pattern, no new numbers beyond the rank gate; flagged as a note, not a fail.
- Laws: 9 KIT (same PLX registry, same spot/label/list code as the other 5 places; stand-ins marked tạm; KIT_REQUESTS rows place-nth/place-pd on handover branch; art request in report) OK; 6 (people: fixed keepers only, no invented ledger servants; objects n/a) OK; 7 wording OK (cổ trang, no %); 4 no typed numbers; 11 whole group (list view + map + count + access) done; 12 shots looked.
- Tests on merged build: places-d42.js at 755x1000@2 and 1180x820@2: 7 spots found, nth/pd count = arrival people (1=1), page errors 0, no horizontal overflow, no overlap with neighbours. Fresh game, no old save needed (nothing stored).
- Looked at: map + nth + pd stage on both devices (birth modals from the harness cover part of the frame; labels «Ngự thiện phòng» / «Phật đường» and keepers visible, stand-in pictures read correctly).
- Not run: quickcheck.sh (absent on LIVE), co-op suites (nothing touched).
Landing: ff main to 7c2aaa08c only if main has not moved; else coordinator re-merges (built files will conflict again — rebuild).
