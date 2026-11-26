# goal-links — chapter goal lines → «Cách làm» → «Đi tới»; «Mua bán» on the Dư đồ; the chapter's eunuch seller made real + named
depth: (lineage not given in brief) · START_CTX: not measurable here (worker opened by MAIN 161; ROLLOVER not reached)

PRIORITY #1 CHECK: OD 5 (26/11 ~18:05Z bug row + MAIN recs; 18/11 ~09:30Z shop panel; 25/11 ~23:45Z one short line per tag) | claims 0 | main: jtq14.js:44 quest «Nhờ thái giám Nội vụ phủ mua một món» (the beat she hit), jact.js §5 Nội vụ phủ place + peddler person, j95 roster c:ped (he stands at Nội vụ phủ every khắc), S.court.ped (named eunuch), jinv kitShopNvp (approved shop), j79 kitTapWord .kgl underline, jact §78 kitPlaceIcon nvp=`bac`, j27 .mleg legend, jtut kitCoach ring, jgoal kitGoalGo | review/*: map-zones-r7 9c8985ab8 (zone tag `data-mzk`; Nội vụ phủ hidden inside zone «Nội vụ» with icon place-cnh = why the shop mark vanishes at level 1) | KIT: no goal-link/«Cách làm» part, no map shop mark → KIT REQUEST sent to KK44.

## Branch
**review/goal-links @ 4d71d20a** (from LIVE f573dc94). Files: dev/build/jglink.js (new, in assemble after jmapz), dev/build/jtq14.js, dev/build/assemble.py, dev/test/goal-links.js, rebuilt index.html/sw.js.

## What
1. **Links (law 11 whole family = every goal checklist)**: kitChecks hook — an OPEN line of HER current chapter (MS67 steps incl. jtq14 quests, chapModel steps) that names a person / place / act gets the kit tap-word dotted underline (`.kgl`, `data-gl`). Other checklists (kit page, reign, route) untouched. Shown in: chapter detail (kitGoalDetail / jchap), Mệnh truyện tab, quest cards.
2. **«Cách làm» panel** = kitPanel info: head band = the PLACE picture (kitPlaceArt), rows Ai (name / «chưa biết tên · người bày hàng ở Nội vụ phủ», what he does now from the roster) · Ở đâu (place, Giờ mở, why closed now, walk khắc) · Cách làm (Tốn, Vì sao); options «Đi tới» (tốn N khắc) + «Xem Dư đồ»; tab-only lines → «Đi làm» (kitGoalGo). Known person → his painting in the kit person column.
3. **Đi tới** = j77Tap (all access rules, «Chọn người theo hầu» first walk of the day) → arrives → his «Để ta xem» shop (kitShopNvp) opens by itself. **Xem Dư đồ** = Dư đồ tab + kitCoach ring on the place tag (or its zone tag via `data-mzk` on map-zones).
4. **Real eunuch (law 6b)**: quest text «Đến Nội vụ phủ, nhờ {ped} mua một món»; {ped} = «thái giám <name>» once she knows his name (k61Named), before that «vị thái giám bày hàng ở đó» (the game masks unknown names; old text gave «nhờ thái giám một vị thái giám»). He stands at Nội vụ phủ every khắc (roster c:ped). Hints («Rương chưa có món…») name him too; done cards resolve {ped}.
5. **«Mua bán» on the Dư đồ**: every buying place now (Nội vụ phủ + wherever the roster puts the eunuch) → tag meta «… · Mua bán» + title; a ZONE tag holding one (map-zones level 1) gets the kit `bac` place icon + «Mua bán»; legend line prepended to `.mleg` «[bac] Mua bán: Nội vụ phủ ·».

## Whole-family scan (chapters 1–3, consort tt + cung nữ cnv; dev/test via glTarget)
| life · chapter | line | target | reachable |
|---|---|---|---|
| tt nhap14 | Thỉnh an Thái hậu hoặc Hoàng hậu | Thái hậu @ tn | yes |
| tt nhap14 | Đi một nơi trong cung | tab Dư đồ | yes |
| tt nhap14 | Thay y phục hay trang sức trong Tư trang | tab Tư trang | yes |
| tt sung14 | Bán đồ trong rương riêng | tab Tư trang | yes |
| tt sung14 | Điểm trang hoặc Dưỡng nhan | tab Hành sự | yes |
| tt sung14 | **Đến Nội vụ phủ, nhờ {ped} mua một món** (was «Nhờ thái giám Nội vụ phủ mua một món», no person/place link) | Thái giám Nội vụ phủ @ nvp | **yes (fixed)** |
| tt tap14 | Học môn tài nghệ / Học một buổi ở Tài nghệ | tab Tài nghệ | yes |
| tt tap14 | Làm một việc với một phi tần trong Hậu cung | tab Hậu cung | yes |
| tt tap14 | Trò chuyện với cung nữ thân cận | tab Hành sự | yes |
| cnv nhap14 | Làm một việc hầu hạ / Học lễ nghi với cô cô | tab Hành sự | yes |
| cnv nhap14 | Đi một nơi trong cung | tab Dư đồ | yes |
| cnv sung14 | Hoàng thượng để ý … | Hoàng thượng @ thu | yes |
| cnv sung14 | Đến Ngự hoa viên | vuon | yes |
| cnv sung14 | Chải chuốt / Thêu khăn bán ra ngoài | tab Hành sự | yes |
| cnv tap14 | Trò chuyện / Biếu quà một đồng liêu | tab staff | yes |
| all | «Sủng 8/25…», «Kết thân… thiện cảm 20», «Hoặc qua N tháng» | no named target | — (not linked) |
Not scanned yet (open): arc chapters (ARC67 hồi lines, mostly «Hồi n/N»), NPC requests «Việc nhờ», notices.

## Tests
`node dev/test/goal-links.js <url> 755x1000,1180x820 [shots]` → **PASS both** (links dotted, buy line names him / masked form, panel rows + Đi tới/Xem Dư đồ, ring on, «Mua bán» mark + legend in DOM, Đi tới → place nvp + eunuch there + shop open, Mệnh truyện tab links, no page errors).

## LOOK (CDN img/_review/goal-links/, Fold 755x1000 + iPad 1180x820, looked at myself)
1-goal-links (chapter detail with underlined lines) · 2-cach-lam (panel) · 3-du-do-ring · 4-du-do-muaban · 5-di-toi (arrived, shop open) · 6-menh-truyen. Exact URLs:
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/755x1000-1-goal-links.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/1180x820-1-goal-links.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/755x1000-2-cach-lam.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/1180x820-2-cach-lam.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/755x1000-3-du-do-ring.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/1180x820-3-du-do-ring.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/755x1000-4-du-do-muaban.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/1180x820-4-du-do-muaban.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/755x1000-5-di-toi.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/1180x820-5-di-toi.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/755x1000-6-menh-truyen.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links/1180x820-6-menh-truyen.jpg


## Open / honest notes
- **KIT REQUEST (KK44, sent)**: kitGoLink (link + small «Cách làm» panel) and kitMapMark «Mua bán». Interim uses only existing kit parts (kitTapWord underline, kitPanel, kitCoach, kitPlaceIcon, .mleg).
- **Kit fault found**: kitPanel `subject` stranger silhouette is ALWAYS unknown-fig-f (a eunuch shows a woman's silhouette; personRoleRank sex ignored on that path). Interim: no figure for a stranger seller (place picture only). Tell KK44 (whole family, j61/j79).
- The legend line is in `.mleg`, which is hidden in today's Fold and iPad map layout → not visible; needs a visible kit legend row (part of kitMapMark request).
- Choosing «Xem Dư đồ» / «Đi tới» shows the generic kit option-result toast «Cách làm: Xem Dư đồ … không được gì, cũng không mất gì» (same as jgoal «Đi làm»); a navigation option should not make a result card — kit option flag needed.
- Zone level (map-zones-r7) code path written (data-mzk) but NOT yet seen on a merged build; check when r7 lands (or merge test).
- Eunuch names from nmNew("eun") can read oddly (seen «Tiểu Thái Tử» = little crown prince) — name pool issue, not changed here.

## MAIN 161 rulings (26/11 ~18:58Z) + ROLLOVER HANDOVER
Rulings: (a) legend → KIT_REQUESTS row for KK44 (done); (b) navigation options (Đi tới / Xem Dư đồ / jgoal «Đi làm» / every pure navigation button) must NOT show the «không được gì, cũng không mất gì» toast → kit flag `nav` via KK44 (KIT_REQUESTS row done), then apply to the whole family; (c) stranger silhouette sex = KIT FAULT to KK44 (sent), interim no figure; (d) verify zone marks on a merged r7 build once LC24 lands map-zones-r7.
ROLLOVER (worker context past START+25%): successor continues on review/goal-links 4d71d20a (worktree /home/user/wt/gl, test dev/test/goal-links.js). TODO: (1) scan + link the not-scanned goal groups: ARC67 hồi lines (jchap chapModel arc steps / hint67), «Việc nhờ» (jnrask*), notices (jnotice) — glTarget(line,q) is the one resolver, kitChecks hook only covers checklists, so rows/notice text need a call to window.glWrap(html) at their render site; (2) when KK44 ships `nav` flag + kitGoLink/kitMapMark, swap glHow/markMap to them and apply `nav` to jgoal nextOpts + glHow options; (3) r7 merged LOOK of level-1 zone tag «Nội vụ» with bac icon + «Mua bán».

## r2 (GOAL-LINKS-2, session_01Rc5AsMJutk5gwYU1eE3Kqn)
depth: successor of GOAL-LINKS (lineage depth not given in brief) · START_CTX: not measurable here
PRIORITY #1 CHECK: OD 5 (26/11 ~18:05Z GOAL LINKS row + ~18:35Z icon size) | main: jtq14 buy quest, jinv kitShopNvp, jpet petShop, j61 k61SeedChiTon (chí tôn seeding = reused for him), j67 arcReveal67 (rule reused for Việc nhờ), j3 logChoice / j19 wrapR chooseM (where the nav toast came from), jdoor/jselxsc «no result card» precedents | review/*: goal-links 4d71d20a (base), map-zones-r7 9c8985ab (not on main) | KIT: KK44 kitGoLink / kitMapMark / `nav` still OPEN (KK44 on its r3) → interims below.

**Branch review/goal-links @ 46839ef3** (2 commits on 4d71d20a). Files: jglink, j61, jname, jtq14, jinv, jpet, jgoal, jge, test goal-links.js, index.html/sw.js.

### MAIN LOOK fixes
1. **Named from day one (law 6b)**: j61 k61SeedChiTon also seeds S.court.ped (name + face, stage 2) on new games and on every load (old saves) → goal «Đến Nội vụ phủ, nhờ thái giám <Tên> mua một món», «Cách làm» row «Người: Thái giám <Tên> · lo mua đồ ở Nội vụ phủ» + HIS full painting (same kit seller figure as his shop, kitPanel stage form — this also sidesteps the female-silhouette kit fault, still open at KK44), shop header «Nhờ thái giám <Tên> mua đồ» (+ jpet «… tìm thú nuôi», same seller). No «???», no «chưa biết tên», no «vị thái giám bày hàng». Name pool: «Thái» removed from NM_EUNX («Tiểu Thái Tử» = little crown prince); old saves with that name get a fresh one once.
2. **Navigation is not a choice** (interim for KK44 `nav`): option flag `nav:1` → no result card, no log line (jglink wraps chooseM/logChoice/resultShow). Applied to the whole family: «Cách làm» Đi tới / Xem Dư đồ / Xem hàng / Đi làm / Đóng, jgoal «Đi làm: …», jge «Xem bảng vàng», and every bare «Đóng» with no fx. Her real arrival act (j77 bái kiến card) still shows its own card.
3. **«Mua bán» readable**: now its own line INSIDE the kit paper name slip (13 px ink, §34.1d), not the grey info row; zone tags the same. Icon size + a VISIBLE legend row stay with KK44 (kitMapMark; .mleg legend still hidden on Fold/iPad — not done here, honest).
4. **Whole-family scan**: (a) **Việc nhờ** — 809 step lines / every template: a text naming {A}/{B} now makes those people named (j61 stage 2, same rule as arcReveal67). Test: 8/8 templates with an UNMET consort as {B} → named, card shows her name, no «???». Việc nhờ cards already carry their own «Đến <nơi>» button (navigation exists). (b) **ARC67 hồi** — names already revealed by j67 arcReveal67; hint «… ở mục Hành sự» now resolves to the Hành sự tab in glTarget. (c) **Notices** — jnotice already never prints «???» (plain «một vị … chưa quen biết»), and notices are news, not tasks → not linked (no target to find). (d) r7 merged LOOK: a test merge of map-zones-r7 conflicts in assemble.py / jbal2 / jk3 / jksize (r7 sits on an older base) → still waits for LC24 to land r7 on main.

### Tests
`node dev/test/goal-links.js <url> 755x1000,1180x820 [shots]` → **PASS both** (r2 adds: eunuch known; buy line «thái giám <name>»; no «???»/unnamed in panel; no result card + no log after Xem Dư đồ / Đi tới / jgoal Đi làm / Đóng; «Mua bán» inside the name slip; shop header named). No page errors.

### LOOK (looked at every still myself) — LOOK READY
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/755x1000-1-goal-links.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/1180x820-1-goal-links.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/755x1000-2-cach-lam.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/1180x820-2-cach-lam.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/755x1000-3-du-do-ring.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/1180x820-3-du-do-ring.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/755x1000-4-du-do-muaban.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/1180x820-4-du-do-muaban.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/755x1000-5-di-toi.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/1180x820-5-di-toi.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/755x1000-6-menh-truyen.jpg
https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2/1180x820-6-menh-truyen.jpg

### Open
- KK44: kitGoLink, kitMapMark (big icon + visible legend row), `nav` kit flag, stranger silhouette sex — when READY swap jglink interims (NAV wrappers → kit flag; slip line → kitMapMark).
- r7 merged LOOK after LC24 lands map-zones-r7.

### r2b — on KIT READY §6.2l (MAIN 161 19:16Z)
**Branch review/goal-links-r2b @ 98c89c71** = r2 rebased on review/kit-k44-parts 24bfab11 (clean rebase) + the swap. (A force-push of review/goal-links was refused by the session's safety check, so the rebased line lives on the NEW branch; review/goal-links 46839ef3 = old r2, superseded — RV/LAND use goal-links-r2b, which contains kit-k44-parts.)
- The private link (.kgl/data-gl) + private «Cách làm» panel (glHow, Xem Dư đồ/kitCoach ring, tapGL listeners) are GONE (law 9). jglink now gives only DATA: glSpec(T) → kitGoalLink(label, {who: his real record S.court.ped (named, painting), where, hours, cost (đường đi N khắc · bạc theo món), note (đang làm / lúc này / chỗ bấm / vì sao), go, goK}). «Xem Dư đồ» dropped (kit has ONE «Đi tới»; not asked of KK44 — Đi tới covers it).
- go closes the info frames under the panel (chapter detail) before walking / shop / tab; kit «Đi tới» (panel cls kgoalhow) treated as navigation → no result card, no log.
- Test goal-links.js updated (kit link [data-kglink], panel cls kgoalhow, no private link left, Đi tới no card) → **PASS 755x1000 + 1180x820**.
- KIT notes for KK44 (seen in the stills): (a) the «Đi tới» option card prints «Được: không» — a nav option should not show a Được row (the `nav` flag); (b) the panel head band picture is tea cups, not the place (kitHowPanel has no headArt from `where`); (c) ONE PERSON TWO PAINTINGS: kitHowPanel draws his own court portrait (grey-green robe), his shop (jinv kitShopNvp) draws the generic tray figure fig-eunuch-ndp-tray (blue robe) — law 6b / one figure per person: shop should use his portrait, or both the tray figure (kit/art decision, not changed here).
Stills (looked at): https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2b/{755x1000,1180x820}-{1-goal-links,2-cach-lam,3-du-do-ring,4-du-do-muaban,5-di-toi,6-menh-truyen}.jpg — e.g. https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2b/755x1000-2-cach-lam.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2b/1180x820-2-cach-lam.jpg

### r2c — FINAL for RV: **review/goal-links-r2c @ 92a35339** (on kit-k44-parts ed3b8ad9; supersedes goal-links-r2b and review/goal-links)
- KK44 added how.map → «Xem Dư đồ» is back as the kit's second button (Dư đồ tab + kit guide ring on the place / its zone tag). Test goal-links.js PASS 755x1000 + 1180x820 (both buttons, no result card for Đi tới / Xem Dư đồ / jgoal Đi làm / Đóng).
- Extra kit note (d): the kit «Xem Dư đồ» option card (no `x`) shows a lone «!» circle top-right with nothing behind it.
- Stills: https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2c/{755x1000,1180x820}-{1-goal-links,2-cach-lam,3-du-do-ring,4-du-do-muaban,5-di-toi,6-menh-truyen}.jpg. Old CDN folders goal-links-r2 / goal-links-r2b can be wiped.
- Left for later: re-check stills when KK44 ships nav / kitMapMark legend / head picture / one-painting fixes; r7 merged LOOK after LC24.

### r2d — FINAL for RV: **review/goal-links-r2d @ fa62dee6** (on kit-k44-parts 60599208 = the passed kit; supersedes r2c / r2b / review/goal-links)
- Kit §6.2m nav:1 shipped → my r2 interim wrappers (chooseM / logChoice / resultShow in jglink) REMOVED; the family carries the kit flag: kit «Cách làm» Đi tới / Xem Dư đồ, jgoal «Đi làm», jge «Xem bảng vàng», every bare «Đóng» (jdh, jge, jgoal, jhaohuu, jload, jstatus — 6/6 found by scan).
- Kit fixes seen in stills: head picture = Nội vụ phủ; nav cards have no «Được: không»; no lone «!».
- Tests: goal-links.js PASS 755x1000 + 1180x820; kit-goal-link.js 8 ok / 0 FAIL.
- New kit note (e) for KK44: iPad 1180x820 — the two nav option cards wrap their label one word per line («Đi / tới · / 2 / khắc», «Xem / Dư / đồ»): text column too narrow beside the picture.
- Still open kit/art: (c) one person two paintings (panel portrait vs shop tray figure); map legend row + big icon (KK44-H). r7 LOOK after LC24.
- Stills: https://ctm-img.victoria-tntt.workers.dev/img/_review/goal-links-r2d/{755x1000,1180x820}-{1-goal-links,2-cach-lam,3-du-do-ring,4-du-do-muaban,5-di-toi,6-menh-truyen}.jpg (older folders r2 / r2b / r2c can be wiped).
