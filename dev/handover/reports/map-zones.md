# map-zones — Dư đồ zones + zoom/fog + Càn Ninh / Đức Thọ second level + her people where they really are
PRIORITY #1 CHECK: OD 18/11 ~19:25Z (zones), L1409 (courtyard level), L1316 (one ledger S.roster), 19:05Z/19:15Z (grey look-only, «Lẻn vào») | main: j26 MAPH, jpal (5 west), j27 mapSpots, j38 mapFit, jmapc §85, jpm kitPalaceMap (courtyard incl. a painted Càn Ninh courtyard nhat-can-ninh used as ONE hall only), j95 S.roster (every servant has a place + activity per khắc), jplfs kplBack (kit left-rail back) | review/*: map-labels-missing r2 01256d36 (merged, its grey state reused) | claims: none other.

Branch **review/map-zones @ 5692c687** (main 94d11623 + map-labels-missing r2 01256d36). New module dev/build/jmapz.js (last in assemble.py); scan dev/test/map-labels-scan.js extended; KIT.md §85.10.

## What
1. **Zones on the overview** (one kit tag each, same slip, "N bóng" = sum of the members' countAt): **Đông lục cung** (8 east palaces + Trường Môn viện, which stands among them), **Tây lục cung** (5 west), **Nội vụ** (Nội vụ phủ, Tân Giả khố, Tích Cần viện), **Hoàng tử sở** (Đông cung, A ca sở, Thượng thư phòng). Own tags (not grouped): Cần Chính điện, Càn Ninh, Đức Thọ, Dưỡng Hòa điện, Ngự hoa viên, Thái y viện, Ngoại triều, **Kính sự phòng**, her residence + the place she stands in (pulled out of their zone so her crest stays).
   - Change to main's split: **Kính sự phòng stays its own tag**. The painting forced this: it sits at the bottom of the map, far from the other Nội vụ places on the west edge, so a Nội vụ zoom would cover ~70 % x 50 % of the map, which is hardly a zoom. **Trường Môn viện** (lãnh cung) was not in either list; it stands inside the east block, so it goes to Đông lục cung.
   - Names (L1327 check, from memory, no web): Đông/Tây lục cung = the real 東/西六宮 quarters (the game has 8 + 5 palaces, the quarter name is kept); Kính sự phòng, Tân Giả khố and Nội vụ phủ were all offices of 內務府, hence "Nội vụ"; A ca sở = 阿哥所 (the princes' quarters), so the zone is "Hoàng tử sở".
2. **Tap a zone** → the same Dư đồ zooms/pans onto it (FLIP 460 ms x kitPace, reduced motion = instant). Everything else goes under ONE kit fog layer .kmfog: light paper fog by day, dark veil in the buổi tối, feathered edge. Inside the zone every place keeps its own tag with all r2 rules (grey, lock, «Lẻn vào», walk-spill) because they are the same buttons. The cartouche shows the zone name; +/− still work. Back = the kit left-rail back button (§33.11 kplBack) or a tap outside the zone (fog/sky).
3. **Second level Càn Ninh + Đức Thọ** (kitPalaceMap, 3 painted halls; new plaques Mẫu Nghi điện / Khôn Hòa hiên / Thục Thận trai, Từ Khang điện / Di Xuân hiên / An Thọ trai). Each hall = "N bóng người" (unchanged map count) + "K cung nhân" = that household's servants from S.roster, placed by the activity the record gives them (serve → chính; clean/brew/work → Đông; rest/sleep/eat/own deeds ag_* → Tây). The chính row adds "Cung nhân: X trong cung · Y đi vắng". Counts only, no names (hữu duyên). The courtyard only opens while she can walk in. Locked or out of khắc → the old one-hall tap (place card with «Lẻn vào» / walk-spill); r2's lock test caught this and it is fixed.
4. **Her palace**: the servants' row (or her own hall row when she lives in a side hall) names her people where the ledger puts them: "Trong cung: … · Đi vắng: <tên> (ở Thái y viện)". A servant on an errand is already left off her stage (j95 hsvList), so nobody teleports.

## Tests
- dev/tools/quickcheck.sh: **PASS** (open, old save ok, perf new/live render 275/284, tab 535/543, buổi 1785/1733 ms).
- map-labels-scan (r2 checks + zone checks), Fold 755x1000 + iPad 1180x820, day + night: **all PASS**; 4 zones x 2 buổi x 2 sizes, each inner check OK: members visible, 0 overlaps, nothing from outside, fog present, zone total = sum of members; courtyards 13 PASS.
- map-full PASS (5 sizes); map-frame-kit PASS. map-portrait: Fold "hereIn" FAIL is the same on main 94d11623 (baseline run); iPad/1366 PASS.

## Shots (LOOKED 3x) — the CDN refused (proxy 403), so per root53-common they are on the handover branch: dev/handover/shots/map-zones/
fold-/ipad- 1-overview-day, 2-overview-night, 3-zone-dong-fog-day, 4-zone-noivu-fog-night, 5-can-ninh-2nd-level, 6-her-palace-maid-away (all @2). Delete the folder after the verdict.

## Scan table (overview tags, iPad day, one life)
| | before (main) | after |
|---|---|---|
| place tags on the overview | 28–32 | 13 (9 own + 4 zones) |
| label scale at fit (iPad) | .85 (floor) | 1.0 |
| overlaps Fold (map-portrait) | 2 | 0 |

## Open items / for main
- **ART REQUEST (Foreman C)**: Đức Thọ courtyard painting (3 halls). It uses the Càn Ninh courtyard with the kit "tạm" chip until then.
- **C-AG item**: household servants have place-level locations in S.roster but no in-palace daily rhythm (rest/sleep/meals). The rooms come only from the activity code, so Tây phối điện is usually empty; Thái hậu's household is always "serve". The stage draws no household servants of other palaces (j95vis), so a side-hall room line says "N cung nhân đang … ở đây" while the stage stays empty.
- **Existing family issue, not new**: on the courtyard level the side-hall tags at the far left/right of the panned painting are cut at the page edge (every consort courtyard on main does this; the hall rows below list every hall). Belongs to the map-labels courtyard family.

---
## RE-SCOPE 18/11 ~20:10Z (owner OD ~19:45Z: no zones; main ROOT-54/55: trim 13 → 10 palaces, keep the 2nd levels) — branch now **review/map-zones @ 8f8dadb9**
Done on the branch:
- Zone layer, zoom and fog are **removed**. Consort palaces show their own tags exactly as on r2. The old zone code is kept in history at 5692c687 (jmapz.js sections 1–2) and can be reused if a zoom is ever wanted.
- **Kept**: the Càn Ninh / Đức Thọ second level (3 halls, servants counted from S.roster by activity, "Cung nhân: X trong cung · Y đi vắng", locked → «Lẻn vào» tap kept) and her palace naming HER people in/away from the ledger. KIT §85.10 is rewritten in place. map-labels-scan is back to the r2 version: PASS on Fold + iPad, day + night, courtyards 13.
- Shots in dev/handover/shots/map-zones/: 5- (Càn Ninh) and 6- (her palace, maid away) are still valid; 1–4 show the cancelled zones, so ignore them.

## HANDOVER (rollover: context limit) — next worker on review/map-zones
TODO 1 — **TRIM 13 → 10 consort palaces** (OD 19:45Z: "Ba cái cung dư ra … bỏ luôn"; "Trữ Tú cung chỗ cho tú nữ học … bỏ qua chỗ khác"):
- Data: jpal.js adds 5 west palaces (Vĩnh Thọ, Dực Khôn, Trữ Tú, Hàm Phúc, Thái Cực điện) to MAPH.rivalSlots/PALN. Main must name which 3 to drop. Suggestion: Trữ Tú (named by the owner), Hàm Phúc, Thái Cực điện, which keeps the two west palaces next to Ngọc Thanh các.
- Every reference: PALN indices (S.pal, v.pal), HALL_PN rows (jhall), BAL.res/BAL.seat/harem cap (pending 19:35Z residence decision at main, Tần/Phi rooms 2), palCeremony free list, kpm slots, residenceArt keys, jpal comment header, j27 mapSpots.
- Save migration: on deser, anyone with pal in a dropped slot (player or NPC) → palFix re-houses them into a kept free slot, else a side hall, with one log line. Keep the palace list data-driven (one table), because the owner may change 13/10 again.
- «Tú nữ học» (Trữ Tú): grep its uses (tuyenTu / jtut / any "tú nữ" scene) and move them to an existing place (suggest Nội vụ phủ or Kính sự phòng picture) with no own map spot.
TODO 2 — when C-AG review/live-servants (session_01Rc5AsM1HkYcxpG9VcjpeVt) lands: switch mapzStaffNow (jmapz.js) from reading R.P directly to its accessors j95here(k)/j95whereId(id) (dev/build/j95s.js). Ask that worker for a "hall/act" field if halls should be finer than the activity code.
TODO 3 — open items carried over: ART REQUEST Đức Thọ courtyard; courtyard edge tags cut on pan (existing family issue).

## Dư đồ — what else to DROP / MERGE / ADD (for MAIN to put to the owner; reasons from the map + j41/jplx/jmen rules)
1. **Ngoại triều** — DROP the tag. It is always «cấm nữ quyến bước vào», a dead end she can never use; keep it painted only.
2. **A ca sở, Thượng thư phòng, Đông cung** — SHOW ONLY WHEN THEY MATTER: A ca sở / Thượng thư phòng once she has a child of 6–17 (before that they are locked for her below Tần), Đông cung once a Thái tử exists. They are 3 grey tags most lives never use.
3. **Trường Môn viện (lãnh cung)** — show only when someone lives there or she is sent there; otherwise it is a locked dead end.
4. **Tân Giả khố → merge into Nội vụ phủ** (the laundry is an office of Nội vụ phủ): one tag; its punished maids and overseer become people at Nội vụ phủ.
5. **Tích Cần viện (servants' quarters)** — keep for the maid road (it is her home there); on the consort road it is locked at night and has little use → show it only on the maid road.
6. **Dưỡng Hòa điện + Cần Chính điện** — both "chỉ vào khi được triệu" for most of the game. Keep them (owner: the Emperor's places are not grouped), but candidate: one tag "Dưỡng Hòa điện" while she has no access, both when she can enter.
7. **ADD: nothing.** The places the acts need already exist (OD 19:55Z: Hành sự acts must walk to their place). Act → place mapping is a separate job.
Result if all are taken: overview ~28 → ~17 tags (10 palaces + Càn Ninh, Đức Thọ, Dưỡng Hòa, Cần Chính, Ngự hoa viên, Thái y viện, Kính sự phòng, Nội vụ phủ, her palace).

## r2 — trim 13 → 10 consort palaces (MAIN ROOT-55 ruling) — branch **review/map-zones @ 7e398b9**
PRIORITY #1 CHECK: OD 18/11 ~19:35Z (residence, 10 palaces), ~19:45Z ("Ba cái cung dư ra … bỏ luôn", Trữ Tú «tú nữ học» elsewhere) | main 13bb8c88: jpal.js west table (5), j27 PALN = MAPH.rivalSlots, jhall HALL_PN, jbal BAL.staff.posts gt (palace "Trữ Tú cung"), BAL.seat/res/harem | review/*: map-zones 8f8dadb9 (base), map-labels-missing r2 01256d36 (already in), r3 NOT pushed yet (not merged) | claims: this session only. START_CTX ~4 % (depth 3).
Merged origin/main 13bb8c88 (shop-panel r3).
### What
1. **One palace table**: jpal.js `PAL_WEST` = Vĩnh Thọ, Dực Khôn (east 8 stay in MAPH). PALN = 10. Dropped Trữ Tú, Hàm Phúc, Thái Cực điện = the old tail slots 10–12, so every kept palace keeps its slot index in every save. Changing the count again = edit PAL_WEST only (+ `PAL_GONE` names for the log line). jhall rows of the 3 removed.
2. **Save migration** (palFix, runs on every deser): anyone (player or NPC) with pal outside PALN → re-housed by the normal palFix path: a chủ vị gets a free palace (the player gets NO Ban-cung ceremony, her palCer is restored), a lone lower consort a side hall (or a free palace). One log line each: "«Trữ Tú cung» đóng cửa; ngươi dời sang Thừa Minh cung." / "… ; Quý phi X dời sang Cảnh Phúc cung." / "…; Quý nhân Y dời sang thiên điện Hàm An cung."
3. **«Tú nữ học»** moves to **Nội vụ phủ** (no own map spot): BAL.staff.posts gt palace, jstaff duty row / tutorial lines, jentry «Phúc tuyển» judge, jkc kcPhucD scene text. The Giáo tập ma ma's location logic (Đức Thọ / her room while new) is unchanged.
4. **Capacity (no seat counts changed)**: palaces 10 ≥ chủ vị seats 7 (HQP 1 + QP 1 + Phi 2 + Tần 3); hosts 6 × resCap 2 = 12 side seats; HH 1 + HQP 1 + 6 + 12 = 20 = BAL.harem.cap 20 → fits; 3 palaces spare (palLone overflow / favour).
### Tests
- quickcheck: **PASS** (old save ok, core gates PASS, perf new/live render 287/290, tab 502/535, buổi 1672/1317 ms).
- NEW dev/test/pal-trim-oldsave.js: player + Quý phi + lone Quý nhân put in slots 10/11/12, saved, reloaded → all re-housed, 3 log lines, palCer 0, every PALN has hall rows, 0 page errors: **PASS** (prints the capacity numbers above).
- map-labels-scan DSF=2: Fold 755x1000 day/night PASS, courtyards 10 PASS; iPad 1180x820 day/night PASS, courtyards 10 PASS. (Its game setup is flaky on iPad: 3 of 5 runs got S=undefined before any check; base 8f8dadb passes the same way when it gets a game. Not from this change.)
- one-core grep: no typed palace count in code (only PALN.length; jres resPalIdx keeps an old `:8` fallback for when PALN is undefined — never at runtime).
### Shots (LOOKED) dev/handover/shots/map-zones/: fold-/ipad- r2-overview-day, r2-overview-night, r2-courtyard (@2). Old zone shots 1–4 deleted (cancelled). 5-/6- still valid.
Seen: the 3 lower-west courts are painted only, no tag; Fold right-edge tags (Trường Môn viện, Thái y viện) cut at the map pan edge = existing family, waiting for map-labels-missing r3 "Fold edge-clip fix" (merge it when pushed).
### Still open: TODO 2 (switch mapzStaffNow to j95here/j95whereId when C-AG live-servants lands), TODO 3 (ART Đức Thọ courtyard; courtyard edge tags), drop/merge list items 1–6 wait for MAIN.

### r2b — on main 790cda59 (map-labels-missing live) — **review/map-zones @ 635c406**
Merged origin/main 790cda59 (only index.html/sw.js conflicted → rebuilt). Re-run: quickcheck **PASS** (old save ok, core gates PASS, perf new/live render 281/278, tab 489/476, buổi 1266/1397 ms); pal-trim-oldsave **PASS**; map-labels-scan DSF=2 Fold 755x1000 + iPad 1180x820, day + night **PASS** (leaders 0, 0 overlaps), courtyards 10 **PASS** (both first try). Shots fold-/ipad- r2-overview-day/-night/-courtyard replaced with this build, LOOKED: the 3 dropped palaces are gone (their courts are painted only), tags clean, no clipping on iPad.

### r3 — fixes for review FAIL 635c406 (reports/review-map-zones.md) — **review/map-zones @ 5a83694**
1. Side-hall residents of a dropped palace (incl. the PLAYER below Tần) now get their one log line too ("Trữ Tú cung đóng cửa; ngươi dời sang Dưỡng Xuân hiên · Cảnh Phúc cung."). Whole group: every live resident whose host sat in a dropped slot.
2. A resident of a dead/out host in a dropped slot logs the dropped palace's name (PAL_GONE via goneN), never «cung cũ»; no person gets two lines (the `was` line wins).
3. Law 14, rewritten in place: jres.js (header "8 cung"/"0..7", line 48 "5 west (8–12)"), jpm.js header "8 cung phi tần", PROGRESS_balance.md "PALN 13". Grep of 13-palace / 5-west / slot 9-13 wording over dev (excl. measure data + old reports): none left.
Tests: pal-trim-oldsave now 2 cases — heads (player + Quý phi + lone Quý nhân in dropped slots) PASS; residents (player below Tần under a dropped host + a resident of a DEAD dropped host) PASS; every moved person exactly one line, no «cung cũ». quickcheck PASS (render 231/230, tab 432/418, buổi 1031/962 ms, core gates PASS). No UI change since r2b (map shots still valid).

### r3b — on LIVE main a7e6199c — **review/map-zones @ ebe46acb**
Merged origin/main a7e6199c (ge-writers-w1). Conflict in dev/build/assemble.py module list: took main's list (adds jgedata_w1.js) + kept jmapz.js last; index.html/sw.js rebuilt (jmapz + PAL_WEST present in the build). Re-run: pal-trim-oldsave heads + residents PASS; map-labels-scan DSF=2 Fold + iPad day/night PASS + courtyards 10 PASS; quickcheck PASS (render 232/241, tab 423/428, buổi 1014/1195 ms, core gates PASS).

## r7 — OB-PHU4 (26/11) — Dư đồ TWO LEVELS everywhere — **review/map-zones-r7 @ abc1c795** — LOOK READY
PRIORITY #1 CHECK: OD L1898, L1900, L1901, L1902, L1905, L2408, L2537, 26/11 ~07:05Z read verbatim | main: no zones (jmapz §85.10 second level only), j95s.js:213 READ API, jpm courtyard | review/*: review/ob-phu b5c053d1 jmapz MAPZ_ZONES + zoom/fog (REUSED, merged), review/map-zones ebe46acb (old 18/11 round, NOT overwritten → this round is review/map-zones-r7) | claims: OB-PHU3 → OB-PHU4. depth 3 · START_CTX ~4%.
Owner (26/11 ~07:05Z, verbatim): "Trên dư đồ hiện tại tôi cũng thấy tùm lum nơi hết trơn á, quá là nhiều, cho nên là cũng cần phải gộp cái dư đồ lại. Tức là giống như hồi trước tôi nói vậy đó, gộp xong rồi á, bấm vào tầng 2 thì sẽ hiện ra chi tiết của cái nơi đó nữa, hiểu không? Chứ không phải là gộp là một nơi mà bỏ hết những nơi còn lại, không phải vậy."
BASE: review/nhv-areas b48425a1 + review/ob-phu b5c053d1 + review/kit-stage-r2 22e318d5 (LIVE + KIT §103 zone fallback, KK38). review/home-way-r6 532fbce1 NOT merged: its conflicts are kit code unrelated to the map (jksize / jopic / jk3 / jplst vs kit-stage-r2 §101) — MAIN's stack land resolves them; rebase this branch on LIVE after.
WHAT (dev/build/jmapz.js only + KIT §85.10 (1) overwritten in place):
- Level 1 zones: «Đông lục cung» (8 consort palaces east of Càn Ninh's axis), «Tây lục cung» (2 west), «Ty sở» (Ngự thiện phòng + Thái y viện + Kính sự phòng), kept «Nội vụ» (4) + «Hoàng tử sở» (2). Not grouped (key places L1898 (3), L1900): Càn Ninh, Đức Thọ, Dưỡng Hòa, Cần Chính, Đông cung, Ngự hoa viên, Phật đường, Trường Môn viện, Ngoại triều. Zone tag = name + one count «N bóng» (Σ members).
- Her palace is grouped too (L1901): the zone tag carries her rank marker (kitMeMapMark) when she stands in it and «Nhà ta» in its row when her home is inside; data-mzk lists the member keys → KIT §103 (KK38) puts the red ring + «⌂ Nhà ta» chip find/glow on the zone tag.
- Level 2 = tap zone: same map zooms in, fog on the rest (existing kit fog), EVERY member keeps its own tag (empty palaces too). Level 3 = tap a palace → courtyard (jpm); «Về» → back to the zone, re-fitted; «Về» / fog tap → overview.
- East/west = geometry (rivalSlots box vs Càn Ninh centre), not a list index.
NOTE for MAIN: L1905 (18/11 ~19:45Z) had cancelled the lục cung zones («Thêm một tầng nữa mất công một lần bấm nó rối»); built per the MAIN 154 brief + her 26/11 complaint. If she still wants consort palaces ungrouped, delete the two «dlc»/«tlc» rows of MAPZ_ZONES (one place).
BEFORE / AFTER (dev/test/map-family-scan.js, iPad; Fold the same counts):
| view | LIVE 6b5d3d05 tags | base (nhv+ob-phu) tags | r7 tags | places reachable r7 |
|---|---|---|---|---|
| palace overview (level 1) | 27 | 24 | **14** | 28 (= base, none lost) |
| zone Đông lục cung / Tây lục cung / Ty sở / Nội vụ / Hoàng tử sở | – | –/–/–/4/2 | 8 / 2 / 3 / 4 / 2 | all |
| Ngự hoa viên areas (level 2) | 0 (no areas on LIVE) | 5 | 5 | 5 |
| her palace courtyard | – | 3 | 3 | 3 |
| home map, each of the 8 home roads | 9 | 9 | 9 (not grouped: 9 distinct kinds, no clutter; one extra tap to visit mother would cost more than it saves — MAIN may rule) | 9 |
TESTS (local build): map-zones-scan Fold+iPad day/night/cấm túc/every zone/home PASS (now: every zone tap shows all members + fog + nothing else; no place lost; sums) · map-family-scan · map-wait PASS · map-labels-scan day PASS, night lockBad «no-spot» = pre-existing on the base (same FAIL on 872b8888) · kit-mapban: all PASS except KK's synthetic «zone fallback» case — in this build the real home ring already sits on the real zone tag, so the case's h is the zone itself (verified by probe: cấm túc → '.mspot.mzone.mzhome.kmb-home' on «Đông lục cung», data-mzk "r3 r5 r4"); KK39 to make the case skip when h is already .mzone.
VIDEOS (level 1 → tap zone → level 2 → her palace courtyard → Về → zone → Về → overview; Ty sở + fog tap; Ngự hoa viên areas): https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/map-zones-fold.mp4 · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/map-zones-ipad.mp4
SHOTS: https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/before-755x1000-day.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/before-1180x820-day.jpg → https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/after-755x1000-day.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/after-1180x820-day.jpg · zoom https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/after-755x1000-zone-dlc.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/after-1180x820-zone-dlc.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/after-1180x820-zone-ty.jpg · cấm túc ring on the zone https://ctm-img.victoria-tntt.workers.dev/img/_review/map-zones/after-camtuc-fold-ipad.jpg
KNOWN: Fold headless video shows ~1 blank frame (200 ms) while the zoomed picture rasterises (software GPU, picture ~4600 px wide); iPad shows the fog fade only. The cấm túc ring outlines the whole zone box (the zone tag is the zone's box).
### r7 handover (OB-PHU4 stops, 26/11 ~08:05Z) — MAIN 155 LOOK PASS, BIG rv open; lục cung zones STAY (MAIN 155: her 07:05Z words overwrite the 18/11 cancel)
For a fixer: branch review/map-zones-r7 abc1c795 (all code in dev/build/jmapz.js: MAPZ_ZONES rows, mapHTML wrapper = zone tags + her marks + data-mzk, mapFit wrapper = zone fit, render wrapper = re-fit after courtyard back). Tests: dev/test/map-zones-scan.js <url> <dir|-> (every zone), dev/test/map-family-scan.js <url> [WxH] (before/after table), video dev/test/map-zones-video.js (DEV=fold|ipadAir, built root). Serve the worktree with python3 -m http.server --bind 127.0.0.1 (run_in_background). Open: rebase on LIVE after the home-way-r6 / nhv-areas / kit-stage-r2 stack lands (assemble.py list = union, jplrule last); KK39 to fix kit-mapban's synthetic zone case.
