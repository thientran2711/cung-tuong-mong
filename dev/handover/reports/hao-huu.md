# hao-huu — «Hảo hữu» partner sheet (co-op) — report

PRIORITY #1 CHECK: OD 21/11 ~06:05Z (mark #2 verbatim), OD:L165 (stranger rule), OD 16/11 friend-chip spec | main jcooptimer.js kitCoopFriend / kitCoopFriendPanel (status only), jcoopworld.js buildFriend (her entry), jrail.js kitStageRail (§77, left icon column; users here/back/cal/chat 20/goal/disp 40/kgf 61-62), j79.js kitPanel + kitPersonStats, j61 knowledge | review/* none (review/ui-tour-coop a274e97c LIST part A: "There is NO dedicated partner sheet anywhere") | claims: hao-huu row only (this worker).

Owner (verbatim, 21/11 ~06:05Z): "Làm khung Hảo hữu đi, nhưng Làm thành một cái icon để ở bên trái của cái nền phòng á. Bên trái mình đang có một cái mấy cái icon đó, để ở dưới luôn."

Branch `review/hao-huu` from origin/main d31c8ec0. Tier BIG (co-op).

## HANDOVER (DONE in r2 below; worker rollover 21/11 ~06:45Z; context ~38 % > START_CTX ~3 % + 25 %, owner OD:L1217 / 16/11 08:22Z s14)
Status: review FAIL on f654456a (reviewer session_01Rc5AsL294sG5kphwVE5b5S, list: dev/handover/reports/rv-hao-huu.md on the handover branch 17054803, shots CDN img/_review/rv-hao-huu/; merged base with origin/main 2021e23f = review/hao-huu-rv 6c38f01b). KEPT as passed: gates, panel content, stranger/met masking, countdown chip, frHold rename.
FIX LIST for the successor (branch review/hao-huu; start from review/hao-huu-rv 6c38f01b to get main 2021e23f):
1. Grey offline icon and ⏸ never visible: jcooptimer paintF hides #kctmf under #coopfz (freeze panel) and HP (hold panel). Keep the icon in the bar in EVERY co-op state (raise #kctmf above those overlays or stop hiding; tap while frozen/held may stay inert or open the sheet). Test with a REAL away (peer page → about:blank) and a REAL hold (frHold(true)), not markup strings (replace the offMk/readyMk/busyMk markup checks in dev/test/coop-haohuu.js).
2. Fold 755x1000: the icon covers bar text (weather «sương sớm» → «sương»). placeF (jcooptimer) only scans leaves (`!e.children.length`), so text inside elements with children is ignored. Scan visible text/boxes (text nodes via Range rects, or elements with own text) — the jrail hudFit scan is the model. WHOLE GROUP: everything placeF places.
3. Fold: the «Hảo hữu đã sẵn sàng» notice (§42.2 kitNotice top chip) covers the icon + ✓, and the clock chip overlaps the «!» notice button. The slot must avoid the §42.2 box/chip area.
4. ONE FIXED SLOT per viewport: today it moves (579,8) → (470,29) after the friend rejoins (placeF re-scans on hud text length). Compute the slot once per viewport (innerWidth x innerHeight key) and reserve it (e.g. a fixed slot element in header.hud, like jrail hudSlot), never re-place on content change (owner OD 16/11 "layout per viewport is fixed").
5. jhaohuu kidsWord leaks to strangers («Con cái: chưa có») → «chưa rõ» when !known.
6. LAW 9: build the icon on the kit square button (.krailb, compact like .krail.khud, 32 px) instead of the private .kctmf frame; badge (✓ / … / ⏸ / grey) = a KIT REQUEST to the keeper (session_01Rc5AsMtjP4KTgBZVjENGLs) via MAIN: register the status badge in KIT.md + kit page; keep .kctmf only as the id/hook.
Then: re-run COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js + coop-e2e + coop-chat + quickcheck; Fold + iPad shots both seats incl. away / hold / ready states; SẴN SÀNG KIỂM to MAIN CHÍNH 89 session_01Rc5AsN8weZNZcjxNiCsivs. Note coop-sleep fails on main too (baseline), not this branch.
Worktree /home/user/wt/hh (sparse) is clean at the last push; scratch shots /home/user/wt/hh-shots.

## r5 — hao-huu-2: keeper's kit-badge r2 8bf7b164 merged (badge 20 px, glyph 14 px, ⏸ = two CSS bars; API unchanged → no wiring change)
- coop-haohuu (tt/nc, HH_DSF=2): **319/319 ok**. quickcheck HEAD: **QUICKCHECK PASS** · open 1748 ms · old save ok · perf new/live render 271/255, tab 432/424, buổi 1333/1388 · core gates PASS.
- Shots looked at (Fold + iPad, both seats): ✓ ready, ⏸ bars, away grey no badge, … busy — clear; badge does not touch the clock chip. CDN `img/_review/hao-huu/r5-*`.
- Note: the «⏸» inside the clock CHIP (`⏸ m:ss`, kit .kchip text) is still a small text glyph; the badge carries the pause state. Say if the chip should drop the glyph.

## r4 — hao-huu-2: K-BADGE-HAOHUU wired (keeper KIT READY 36b6071e, review/kit-badge merged in)
- Merged review/kit-badge 36b6071e (assemble list union +j68q.js; index.html/sw.js rebuilt). The kit part is under its own review (rv MSxp, via MAIN 91).
- jcooptimer: private `.kctmf-b` badge and `.kctmf.koff` look DELETED; badge = `kitStBadge(ready→ok · hold→pause · busy/work→busy · away→"")` as the button's LAST child; grey = the kit `.krailb.koff`. The picture span clips the portrait → the kit cord no longer pokes under the button (rv N3). N4 (⏸ glyph size) belongs to the kit part (10 px in §77b) — the keeper's call.
- KIT.md §69.2 badge/grey lines now point to §77b (in place). Test: badge must be `.kbdg ok|busy|pause`.
- coop-haohuu (tt/nc, HH_DSF=2): **319/319 ok**. quickcheck HEAD 16110bc8: **QUICKCHECK PASS** · open 1848 ms · old save ok · perf new/live render 245/266, tab 564/518, buổi 1078/1351 · core gates PASS.
- Shots CDN `img/_review/hao-huu/r4-*` (ready ✓ / hold ⏸ / away grey / met, Fold + iPad, both seats; looked at).

## r3 — hao-huu-2: rv r2 FAIL A + N1 + N2 (base review/hao-huu-rv2 dfd14ac7)
PRIORITY #1 CHECK ('k61skip' / 'K61MAP' / 'krn'): rv-hao-huu.md «r2» (A, N1–N4), j61 k61Table/k61Scrub/K61SKIP, jaudit KRN rank-name pass, j79 kitName, jnamefix | main + review/hao-huu-rv2 | review/kit-badge 36b6071e (keeper, K-BADGE-HAOHUU, not yet KIT READY) | claims: hao-huu-2.
- **A (title masked «Hàn lâm học sĩ ???»)**: jhaohuu sheet title + «Danh vị» = `kitName(her entity,{cap:true})` (rank + name in the rank colours: owner 15/11 "phẩm và tên người lúc nào cũng phải đi chung"; the same on both seats — a bare string was given a rank by the jaudit rank-name pass on one seat only) inside a `data-k61skip` span, so the j61 DOM mask cannot re-map her words to another record. Unmet = «Hảo hữu của ta» (already the mask). Whole group: `#kctmf` + `#kctmfu` carry `data-k61skip` (button aria-label / title / hidden words: her name is written there only once k61Named); other names in the sheet belong to other people (her maid, a servant's mistress) and keep their own knowledge rule.
- **A cause (evidence)**: not reproduced in 3 tt/nc runs (random lives). The test now logs every variant of her name that `K61MAP` maps to another key (`evidence <seat>: …` with that record's name / kind / role and whether she is in `k61All()`). Code reading: `k61Table` protects a name only for people in `k61All()` (rivals, men, court…); on the guest the friend entry comes from the shared world — if she is not in `k61All()` her name is unprotected and any unmet record holding the same words (a `S.men` man of the tt origin, role «Hàn lâm học sĩ») masks it. Same-name record across the two seats = name core (jnamefix: only the host sweeps; "a guest keeps the host's names") → reported to MAIN, outside this branch.
- **N1**: the slot per viewport is kept in localStorage `ctmHhSlot` (UI only, not the save) → same spot after her own page reload (test: guest iPad after reload = same box). Also: no collision re-check within 1.2 s of a resize; a strip (`kctm-pad`) slot retries for a real slot without toggling the strip (a mid-layout check had sent guest iPad to the strip in run r4).
- **N2**: KIT.md §69.2 now says `#kctmfu.kup` (copy) + data-k61skip + slot persistence (in place).
- N3 / N4 (cord, tiny ⏸) → the badge commit (keeper's `kitStBadge`).
### r3 tests (0a482d44)
- coop-haohuu (tt/nc, HH_DSF=2): **311/311 ok** (title = her kit name both seats ×2 devices, no «???» in sheet / icon labels, slot fixed in every state + after own reload).
- quickcheck HEAD: **QUICKCHECK PASS** · open 1739 ms · old save ok · perf new/live render 266/243, tab 488/442, buổi 1454/1122 · core gates PASS.
- Shots CDN `img/_review/hao-huu/r3-hh-{host,guest}-{fold,ipad}-met.jpg` (looked at).

## r2 — hao-huu-2 (OPUS, MAIN CHÍNH 90, session_01Rc5AsJ4dpczX6uEaSGaTBe): the 6 rv FAIL items fixed (START_CTX ≈ 4 %)
PRIORITY #1 CHECK ('hao-huu' / 'kctmf' / 'hudSlot'): OD 21/11 ~06:05Z + ~06:30Z rows (read verbatim), OD:L165 | main jcooptimer kitCoopFriend/placeF, jnotice #kntbox (§42.2 bar-child box, cal/setAt), jrail .krailb/.krail.khud/hudFit | review/hao-huu 9ae5101d + review/hao-huu-rv 6c38f01b (base) | claims: hao-huu-2 row (this session).
Base: review/hao-huu-rv 6c38f01b + merge origin/main fc0867ca (assemble list union +jwalk.js; index.html/sw.js rebuilt) + merge of review/hao-huu 9ae5101d (handover).
| # | rv item | fix |
|---|---|---|
| 1 | grey / ⏸ never seen (hidden under #coopfz / hold panel) | paintF no longer hides the icon under the freeze / hold panel. The bar's own icon stays in the bar; a COPY `#kctmfu` (aria-hidden, tap inert, class `kup`, z 9600 > #coopfz 9500) stands at the SAME spot above the panel. LIVE test: B page → about:blank → A sees grey (computed grayscale filter), no badge, above the freeze panel (Fold + iPad); B / A `frHold(true)` → the other seat sees ⏸ above the hold panel; own pause → icon still on screen. Markup-string checks removed. |
| 2 | Fold: icon covers bar text (leaf-only scan) | `#kctmf` is now a CHILD of `header.hud` (like the §42.2 «!» box). Slot scan obstacles = the whole boxes of the bar's direct children (a word growing inside its block cannot reach the slot) + every text-node rect (Range, also inside elements with children) + every picture / button / the seal. Test: no text node / picture of the bar under icon + clock in every phase and state. Whole group: placeF places only #kctmf; the kit placers jnotice hudRects + jrail hudFit were scanned (leafscan, Fold + iPad): no bar word escapes them (they count buttons with children), so no change there. |
| 3 | Fold: ready notice chip covers ✓; clock on the «!» button | bar child ⇒ the notice chip (§42.2 scan of the bar's boxes) and the «!» box keep clear of it; the «!» box YIELDS (not an obstacle of our slot; `kitNoticeBox()` is called after every move so it re-checks its own spot). Test: «!» box and notice chip never intersect icon + clock; elementFromPoint on the button and on the badge = ours, in every state (incl. «Hảo hữu đã sẵn sàng» up). |
| 4 | the icon moves (579,8 → 470,29 after rejoin) | ONE FIXED SLOT per viewport (innerWidth x innerHeight), kept per viewport (`SLM`), sized for the widest content (icon + «⏸ 0:00» / «Hết buổi», min-width), found only after the bar has settled from a resize (≥400 ms + same bar size two ticks; a mid-layout slot fell into the strip on iPad in t2), never re-placed on a content change — only if a word / picture of the bar really lies under it (checked every 1.5 s). Test: the same box in stranger, met, hold ×2, ready, away AND after the friend comes back, per seat × device (host Fold 596,50 · host iPad 799,8 · guest iPad 795,8 at scale 1). |
| 5 | stranger leak «Con cái: chưa có» | jhaohuu: Con cái = «chưa rõ» (tone t) unless met. Whole group in the sheet: Danh vị (named), Cung, Cung nữ thân cận (met), stats (kitPersonStats knowledge), Sức khỏe / Bệnh / Thai (kitStatKnown0 suc), servant road rows — all gated; Lúc này = what anyone sees. |
| 6 | Law 9: private .kctmf button + badge | the icon is the kit square button `button.krailb.kctmf` (compact 32 px like #kntbox / .krail.khud, padding 3 px). Badge + grey state = KIT REQUEST **K-BADGE-HAOHUU** (MAIN → keeper session_01Rc5AsMtjP4KTgBZVjENGLs; I asked the keeper directly for the class name, no answer yet); `.kctmf-b` (.g/.n/.w) + `.kctmf.koff` stay only as the hook until KIT READY, then I wire the registered class. KIT_REQUESTS line added. |
KIT.md §69.2 rewritten IN PLACE (placement, bar child, copy over panels, .krailb); no second version.

### r2 tests (branch head after the merge; code commit a1e27a84)
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <out>`: **302/302 ok** (twice: scale 1, and `HH_DSF=2` for the shots).
- `coop-e2e` (tt/nc): **92/92 passed**.
- `coop-chat`: run 1 FAILED 1/55 («unmet friend: signature … Hảo hữu của ta» — the random lives knew each other: the next check, icon aria label == chat label, passed); run 2 **ALL OK 55 checks**. The test does not force the unmet state (chat code untouched by this branch).
- `quickcheck HEAD`: **QUICKCHECK PASS** · open 1711 ms · old save ok · perf new/live render 229/263, tab 426/498, buổi 1029/1538 · core gates PASS.
- coop-sleep not re-run: rv confirmed its FAILs are on LIVE (baseline).
- Shots (scale 2, looked 3×; CDN `img/_review/hao-huu/`, 16): st-{host,guest}-{fold,ipad}-hold, st-host-{fold,ipad}-{ready,away}, hh-{host,guest}-{fold,ipad}-{stranger,met}. Verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review hao-huu`.
- Note for the reviewer: the met portrait (kitFaceH xs) keeps its kit hanging cord a few px under the button (same as the bar's own avatar); the ⏸ glyph is small at 10 px until the keeper's badge part lands.

## r1 — OWNER CANON OVERWRITE 21/11 ~06:30Z (relayed by MAIN CHÍNH 88; OD row read verbatim on the handover branch)
Owner: "... tôi cần ở cái thanh trên cùng, tức là cái thanh nhân vật của tôi á ... Tôi muốn phải có một cái icon ... nếu mà người đó off là màu xám ... On là sẽ màu tươi hơn ... đang xong thì có một cái dấu tích màu xanh kế bên ... vẫn còn đang bận thì là nó hiện cái dấu ba chấm kế bên ... khi mà cần thông tin của người đó thì mình bấm vô người đó thì nó ra thông tin chẳng hạn."
- The stage-rail item is GONE. KIT §69.2 `kitCoopFriend` (jcooptimer, the header friend chip) IS the «Hảo hữu» icon — one part, not two: square kit icon button (36 px, radius 8) in the fixed top bar (`#kctmf`, same placement scan, top-right free slot); content = her portrait once met (`isKnown61`), the keeper's painted `img/kit/ico-friend.webp` while she is a stranger (no face before meeting, OD:L165; a grey silhouette could not show online/offline); GREY (`.koff`, grayscale) when offline (away), full colour online; corner badge ✓ green = ready, «…» = busy / at work, ⏸ = she asked to pause, none when offline. No name / status words on screen (aria-label + title + a visually hidden span keep them for screen readers and the old tests). The shared buổi countdown stays beside it as ONE short kit chip (`m:ss`, `⏸ m:ss`, «Hết buổi») — older owner rule 16/11 "Đồng hồ count down cho 2 người chơi đâu?" kept (reviewer rule: older rules on the same element).
- Tap → the partner sheet (jhaohuu `kitHaoHuuOpen`), which now also holds what the old status-only chip panel had: Lúc này = «Hảo hữu» (status, `frWord`), «Ta» (ready / khắc left), Đang ở, the same note line, and the «Tạm dừng» option (act card: Tốn không · Được «Hậu cung dừng lại cho cả hai đến khi ta trở lại») → ONE panel. `kitCoopFriendPanel` stays only as the fallback when jhaohuu is absent (kit sample keeps it).
- BUG caught on the way: the first export name `COOPW.hold` collided with jcoopworld's build-hold flag (truthy function → room frozen, #next «Đợi cùng bản mới»). Renamed `COOPW.frHold`; the test now asserts COOPW.hold untouched + #next free.
- KIT.md §69.2 rewritten IN PLACE (canon overwrite); the §77 (4) line removed; KIT_REQUESTS K-ICO-HAOHUU line says KIT READY + top-bar user.
- Tests updated (fix the whole group): coop-chat (header label = aria label now), coop-sleep (tap icon → partner sheet, close by ✕); coop-timer reads textContent (hidden span keeps the words).

### r1 tests (sha f207807d; build commit e64263a5)
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <out>`: **178/178 ok** (solo no icon; host + guest × Fold 755x1000 + iPad 1180x820 × stranger + met: icon in the top bar, square, no words on screen, badge = her status, away markup grey/no badge, ready ✓, busy …, stranger = painted icon / met = portrait, no rail item, room not held; sheet seal + ✕, Hảo hữu / Ta rows, «Tạm dừng» option, stranger masking, met real numbers; ✕ + Esc close; no overflow; no page errors).
- `coop-e2e` (tt/nc): **92/92 passed**. `coop-chat`: **ALL OK 55 checks**.
- `coop-sleep`: FAILS — the SAME 3 FAILs + the same click timeout on unchanged origin/main d31c8ec0 (baseline run in a throw-away worktree): pre-existing (status «Đang bận» while a story card .kmov is open, then the card blocks the click), not from this branch.
- `quickcheck HEAD`: **PASS** · open 1763 ms · old save ok · perf new/live render 245/228, tab 450/530, buổi 1433/2042 · core gates PASS.
- Shots (looked 3×, CDN `img/_review/hao-huu/`, 16): hh-{host,guest}-{fold,ipad}-{stranger,met}[-end].jpg (-end = the sheet scrolled to «Lúc này» + «Tạm dừng»; the top-bar icon is visible in every shot).

## r0 (superseded placement; the sheet itself is kept)
### What changed (r0)
- NEW `dev/build/jhaohuu.js` (after jstatus in assemble.py): kitStageRail item `haohuu`, `order:90` = BOTTOM of the stage's left icon column, `when` = co-op on (solo: absent), both seats. Icon `img/kit/ico-friend.webp` = KIT REQUEST K-ICO-HAOHUU, painted by the kit keeper (KIT READY 21/11, two crossed gold hairpins, on the CDN; their KIT_REQUESTS row is on review/kit-test-defaults 2e74ba49).
- Tap → `kitPanel({kind:"info"})` (seal ĐIỀU, ✕ / Esc / tap outside) with kit parts only:
  Thân phận (Danh vị = `kitName` rank unit, Cung = palName(palaceOf)) · Tư chất (`kitPersonStats` tiles) · Sức khỏe (Sức khỏe, Bệnh, Thai) · Trong cung của nàng (Con cái = hoàng tử / công chúa count, Cung nữ thân cận) · Lúc này (the header chip's live status + Buổi này countdown + Đang ở = S.where).
- `jcooptimer.js`: the status words table moved into `frWord(o)` (used by the chip panel AND the sheet: ONE source) + `COOPW.frInfo()` export (chip data + tone/glyph/word).
- Stranger rule OD:L165: unmet = title «Hảo hữu của ta», the kit stranger figure `unknown-fig-f` as a stage pseudo person ({__fig,__cap}, kitShop form) — never her entry (the stage resolved her real art + name from it: caught by the test), every field «chưa rõ»; stats follow kitStatKnown (Danh / Sắc show when the game's knowledge rule says anyone sees them). Health «chưa rõ» even when met unless kitStatKnown(suc) (same rule as every NPC).
- Servant road: Danh vị Cung nữ · Hầu hạ <consort> · Cung. Home road (tiểu thư before tuyển tú, no entry): «ở phủ nhà, chờ kỳ tuyển tú»; dead: «đã khuất».
- KIT.md §77 order list: item (4) Hảo hữu documented; KIT_REQUESTS.md: K-ICO-HAOHUU line.
- Data: all from game state (her entry in the shared world, S.where, room clock); no number typed (law 4/6b). Wording cổ trang, no %.

## Tests
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <out>` (NEW, two browsers, LIVE Worker): **130/130 ok** — solo no icon; host + guest × Fold 755x1000 + iPad 1180x820 × stranger + met: icon is the LAST rail button, inside the stage, square; panel seal + ✕; stranger title/name/rank/stats/silhouette; met title = name, rank unit, tiles = her numbers, palace + household rows, Lúc này; ✕ and Esc close; no overflow; no page errors.
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js <out>`: **92/92 passed**.
- `bash dev/tools/quickcheck.sh 31d4de93`: **QUICKCHECK PASS** · open 1712 ms · old save ok · perf new/live render 219/267, tab 429/499, buổi 1517/1331 ms · core gates PASS.
- Shots (looked 3×): CDN `img/_review/hao-huu/` — hh-{host,guest}-{fold,ipad}-{stranger,met}.jpg (8). Verdict giver wipes: `python3 dev/site/cdn_sync.py --wipe-review hao-huu`.

## Notes for the reviewer
- The test closes the opening Thi tuyển chọn mini game (#ov) and holds the stranger state with an interval (the shared world re-sends what she knows): test-only.
- Panel scrolls inside itself on both devices (Lúc này is the last section); kit §8 behaviour.
