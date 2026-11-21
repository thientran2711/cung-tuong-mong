# REVIEW hao-huu (BIG, opus, co-op) — MAIN CHÍNH 89 — verdict: **FAIL**

PRIORITY #1 CHECK ('hao-huu'): OD 06:05Z + 06:30Z canon overwrite rows, OD:L165 (stranger), OD:L1035/L1060-1061 (16/11 friend chip + countdown) | main jcooptimer.js kitCoopFriend/placeF, jrail.js `.krailb` / `.krail.khud` (kit square icon button in the top bar, KIT §77 dock) | review/* review/hao-huu f654456a only | claims: my row (line 787) + worker session_01Rc5AsKMNBVnS15FJkKKYgv.

Reviewer: session_01Rc5AsL294sG5kphwVE5b5S. START_CTX ≈ 5 % of the window.
Branch `review/hao-huu-rv` = f654456a + merge of origin/main 2021e23f (assemble list union via asmunion.py; index.html/sw.js rebuilt) = **6c38f01b**, FF of main. Pushed only as a merged base for the fixer; NOT land ready.

## Gates (all on 6c38f01b, run one at a time)
| gate | result |
|---|---|
| `bash dev/tools/quickcheck.sh HEAD` | QUICKCHECK PASS · open 1942 ms · old save ok · perf new/live render 282/252, tab 554/492, buổi 1817/1846 · core gates PASS |
| `coop-haohuu` (tt/nc) | 178/178 ok |
| `coop-e2e` (tt/nc) | 92/92 passed |
| `coop-chat` | ALL OK 55 checks |
| `role-parity.test.js` (alone) | ALL PASS |
| `coop-sleep` branch vs LIVE 2021e23f | SAME on both: FAIL 1 + FAIL 4 ×2 + the `page.click` timeout → **already on LIVE, not from this branch** (worker's claim CONFIRMED) |
| COOPW.frHold vs jcoopworld/jcoopthin `CW.hold` | no clash (CW.hold only read by jcoopworld frozen() and jcoopthin TH.on; frHold is a separate export) |
| countdown chip kept (16/11 owner rule) | yes (`m:ss`, `⏸ m:ss`, «Hết buổi») |

## LIVE-state shots (my script hhstates.js: both seats, Fold 755x1000 + iPad 1180x820; the states really happen between two browsers, not markup only)
CDN `img/_review/rv-hao-huu/`: st-host-fold-away-met.jpg, st-host-ipad-hold-met.jpg, st-guest-ipad-ready-met.jpg, fold-bar-overlap-zoom.jpg, fold-ready-badge-hidden-zoom.jpg, fold-icon-moved-after-rejoin-zoom.jpg, hh-guest-fold-stranger.jpg. Looked at 3×.
Probe log (icon box / state): work + busy + ready all show (… / … / ✓); **hold → icon hidden (vis false)**; **away → icon hidden (vis false)**; host Fold box (579,8) → after the friend rejoined **(470,29)**.

## FAIL list (to the worker; fix every item, whole group, with tests that drive the LIVE state)
1. **Grey offline is never seen; ⏸ is never seen.** Owner verbatim 06:30Z: "nếu mà người đó off là màu xám ... On là sẽ màu tươi hơn". When she goes offline the room freezes and `paintF()` hides `#kctmf` under `#coopfz`; when she asks for a pause it hides under the hold panel (`HP`). So `.koff` and the ⏸ badge exist only in markup (coop-haohuu checks `kitCoopFriend({st:'away'})` strings, never a real away). Shots st-host-fold-away-met / st-host-ipad-hold-met: no icon in the bar. Fix: the icon stays in the fixed top bar in every co-op state (grey, no badge while she is away; ⏸ while she holds), under / beside those panels; the test must make the peer really leave (B → about:blank) and really hold, and assert the icon is visible + grey / ⏸.
2. **Fold: the icon covers the bar's text.** fold-bar-overlap-zoom.jpg: «sương sớm» → «sương» (guest), «Hôm nay mặt mộc · hoa…» half-hidden (host). Cause: `placeF()` checks only childless leaves (`!e.children.length`), so the weather / mood items (icon + text in one element) are not avoided. Fix the free-slot scan (text-node rects / every visible box), whole group = every item placed by placeF. No text in the top bar may be covered at 755x1000 or 1180x820 (owner 21/11 05:05Z: the top frame is fixed, nothing may push or hide).
3. **Fold: the ✓ is hidden by the friend-ready notice, and the clock chip sits on the «!» notice button.** fold-ready-badge-hidden-zoom.jpg + row 3 of fold-bar-overlap-zoom.jpg: the §42.2 notice «Hảo hữu đã sẵn sàng» lies over the icon, so the green ✓ (the one signal she asked to see at a glance) is covered; the «4:33» chip overlaps the left edge of the yellow «!» button. Fix: the icon + clock get a slot that never collides with the notice box or the «!» button.
4. **The icon moves.** Owner: the top bar is "cái thanh không có bao giờ bị dịch chuyển". Host Fold: (579,8) in every state, then (470,29) after the friend came back (fold-icon-moved-after-rejoin-zoom.jpg: it drops to the second line, under the weather). One fixed slot per viewport (no re-scan wandering on text-length changes).
5. **Stranger rule leak (OD:L165 + 06:05Z «unmet = chưa rõ»).** hh-guest-fold-stranger.jpg / -end: an unmet friend shows «Con cái: chưa có». `kidsWord(e)` is not gated by `known` (the maid row is). Fix: «chưa rõ» when not met (same check as Cung / Cung nữ thân cận).
6. **Law 9 / OD:L1095 kit consistency.** The kit already has the square icon button for the fixed top bar: `.krailb` (compact 32 px in `.krail.khud`, card paper, gold hairline + double inset hairline, KIT §77 `dock`). `.kctmf` is a second private square button (36 px, own border / shadow, no inset hairline), and the status badge `.kctmf-b` is a new look. Build the icon on the kit button (size may differ, shape/style must match), and have the KIT KEEPER register the status badge (✓ / … / ⏸, grey state) as a kit part in KIT.md + kit sample page (OD:L1103: only the keeper creates/changes kit parts) — or MAIN gets the keeper to sign §69.2 as written.

## Checked and OK
- Solo: no icon. Both seats show it in co-op. Stranger = painted kit icon (no face), met = her portrait; panel title «Hảo hữu của ta» (owner verbatim 16/11 L1060 "chưa biết tên thì ghi 'hảo hữu của ta'", = K61FR used by chat), name nowhere, silhouette, rank / stats / health «chưa rõ» (Danh shows as the knowledge rule allows anyone); met = name, kit rank unit, real stat numbers, palace, household, Lúc này (Hảo hữu / Ta / Đang ở) + note + «Tạm dừng» act card; ✕ / Esc close; no overflow; no page errors.
- No name / status words on screen (aria-label / title / hidden span only). Busy = «…», ready = green ✓ (when not covered, item 3).
- Wording cổ trang, no %, numbers from game state (law 4/6b). ONE panel (old chip panel only a fallback). Two-way: both seats see each other the same way.
- coop-sleep failure is pre-existing on LIVE (not this branch); MAIN may want its own fixer for it.

Shots wipe after the fix review: `python3 dev/site/cdn_sync.py --wipe-review rv-hao-huu`.

## r2 — REVIEW of d41876c9 (hao-huu-2 fixes) — MAIN CHÍNH 91 — verdict: **FAIL (1 new item) · badge still pending**
PRIORITY #1 CHECK ('hao-huu' / 'kctmf' / 'BADGE-HAOHUU'): OD 21/11 ~06:05Z + ~06:30Z canon overwrite, OD:L165, OD:L1035/L1060 (countdown, «hảo hữu của ta»), OD 21/11 ~05:05Z fixed top bar + ~05:10Z older-rules check | main jcooptimer kitCoopFriend, jrail .krailb, jnotice #kntbox, j61 k61Scrub DOM mask; K-BADGE-HAOHUU NOT on main / any review/kit* yet | review/* review/hao-huu d41876c9, review/hao-huu-rv 6c38f01b | claims: my row (session_01Rc5AsJeK88vMSezSQUhfso), worker hao-huu-2 session_01Rc5AsJ4dpczX6uEaSGaTBe.
START_CTX ≈ 3 %. Branch `review/hao-huu-rv2` = d41876c9 + merge of origin/main aee7ff84 (index.html/sw.js = main, then assemble.py + build_site.sh rebuilt) = **dfd14ac7**, FF of main. Pushed as merged base only — NOT land ready.

### The 6 r1 items
| # | item | r1 shot | r2 shot | verdict |
|---|---|---|---|---|
| 1 | grey offline / ⏸ never seen | st-host-fold-away-met, st-host-ipad-hold-met (no icon) | st-host-fold-away (grey icon, no badge, above #coopfz), st-host-fold-hold / st-host-ipad-hold (⏸ above hold panel); guest side too (st-guest-*-hold/away) | FIXED (⏸ glyph is tiny at 10 px → keeper badge) |
| 2 | icon covers bar text | fold-bar-overlap-zoom | all 28 shots: no bar word under icon/clock (test words/pics = [] in every state) | FIXED |
| 3 | ready notice covers ✓ / clock on «!» | fold-ready-badge-hidden-zoom | st-host-fold-ready: notice «Hảo hữu đã sẵn sàng» left of the icon, ✓ clear, «!» box clear | FIXED |
| 4 | icon moves (579,8 → 470,29) | fold-icon-moved-after-rejoin-zoom | same box in every in-session state + after the friend came back (host Fold 596,50 · host iPad 799,8 · guest iPad 795,8) | FIXED in-session; see note N1 (after the player's OWN page reload it can land elsewhere) |
| 5 | stranger «Con cái: chưa có» | hh-guest-fold-stranger | hh-guest-fold-stranger-end: Con cái «chưa rõ», Cung nữ «chưa rõ», Đang ở «chưa rõ» | FIXED |
| 6 | law 9 private button + badge | — | `button.krailb.kctmf` (kit §77 button, 32 px); badge + grey still private `.kctmf-b` / `.koff` → K-BADGE-HAOHUU open | button FIXED; badge = PENDING keeper (brief: may not land without it) |

### Gates (dfd14ac7, one at a time)
| gate | result |
|---|---|
| quickcheck HEAD | QUICKCHECK PASS · open 1778 ms · old save ok · perf new/live render 274/259, tab 469/430, buổi 1521/1392 · core gates PASS |
| coop-haohuu (tt/nc, HH_DSF=2) + my reverse states (host ready / host away seen by the guest) | worker checks 320/326 — 6 FAIL: 2 real (item A below), 2 = N1, 2 = my own reverse-ready step (both seats were already ready → the buổi advanced; test artefact, not the product) |
| coop-e2e (tt/nc) | 92/92 passed |
| coop-chat | ALL OK 55 checks |
| role-parity.test.js (alone) | ALL PASS (also role-parity-drift2-play ALL PASS) |
| coop-sleep LIVE aee7ff84 vs branch | IDENTICAL: FAIL 1 + FAIL 4 ×2 + page.click timeout on both → pre-existing on LIVE (worker claim CONFIRMED again) |
| frHold vs CW.hold | no clash (jcooptimer local `hold` → CW.frHold; CW.hold only read by jcoopworld frozen() / jcoopthin TH.on; jsmg's frHold is IIFE-local) |
| countdown chip (owner 16/11) | kept: `m:ss`, `⏸ m:ss`, «Hết buổi» beside the icon |

Shots (scale 2, Fold 755x1000 + iPad 1180x820, both seats, stranger / met / hold / ready / away + panel; looked at 3×): CDN `img/_review/rv-hao-huu-2/`: title-mask-guest-fold-met.jpg, slot-moved-guest-ipad-after-reload.jpg, st-host-fold-{hold,away,ready}.jpg, st-host-ipad-hold.jpg, hh-guest-fold-stranger-end.jpg.

### FAIL list (to the worker)
A. **Met friend's sheet title is masked «Hàn lâm học sĩ ???»** (title-mask-guest-fold-met.jpg; guest seat, Fold + iPad; friend = host «Quý nhân Lương Diệu Hoa», tt origin). The figure caption and «Danh vị: Quý nhân Lương Diệu Hoa» are right; only the `.kptitle` text is wrong. Cause: the title is plain name text, so the j61 DOM mask (`k61Scrub` via K61MAP name → key) rewrites it; on the guest the name «Lương Diệu Hoa» maps to an entry that is not her and that the guest has not met, masked with its title «Hàn lâm học sĩ» = j96 `tt:{role:"Hàn lâm học sĩ"}` (the tt-origin family record). Random lives: a second run (other names) did not hit it, but it is a player-visible lie about the partner (law 6b + OD:L165 knowledge rule works per person, not per name string). Fix: (1) the sheet must name HER entity, not a string the mask re-reads — e.g. render the title through the kit name path that resolves the entity (kitName / k61PortEnt, as Danh vị does) or mark the title `data-k61skip` when known (stranger title «Hảo hữu của ta» is already the mask); whole group = every name text in the sheet + the icon aria-label / title (k61Node also scrubs title / aria-label); (2) find WHY the friend's full name is in K61MAP under another key on the guest (name collision between the host player and a record of her tt family in the guest's table) and report it to MAIN if it is outside this branch (name core jnamefix: "a guest keeps the host's names"). Test: force a tt host, guest met → title === friend.name and no «???» anywhere in the sheet / aria-label, both seats.

### Notes (not blocking alone; fix with the badge follow-up if cheap)
- N1 slot after the player's own reload: guest iPad slot 795,8 → 785,8 after the guest page reloaded and the bar text changed (Buổi trưa, «Hôm nay mặt mộc · hoa đào bay», «Về phòng»). `SLM` lives in memory, so a reload finds a new slot from the current bar text. Owner: the bar "không có bao giờ bị dịch chuyển" — consider a slot that does not depend on the bar's current words (e.g. a reserved bar cell like jrail hudSlot), or persist SLM per viewport.
- N2 KIT.md §69.2 says the raised copy is `#kctmf.kup: body child`; the code uses a separate `#kctmfu.kup`. Fix the doc line in place.
- N3 the met portrait's kit hanging cord pokes a few px under the button (worker noted; same as the bar avatar).
- N4 ⏸ in the badge and in the clock chip is barely readable at 10 px (st-host-*-hold) → the keeper's K-BADGE-HAOHUU must fix the size.

### Checked OK
Both seats; stranger = painted kit icon + «Hảo hữu của ta» sheet with silhouette, every field «chưa rõ» except what anyone sees (Danh); met = portrait, rank unit, real numbers, palace, household, Lúc này + «Tạm dừng» act card (Tốn không · Được …); online colour, ✓ ready, … work/busy, ⏸ hold, grey + no badge away; no words on screen; ✕ / Esc close; no overflow; no page errors; ONE panel; two-way (law 1) both seats see each other the same way; numbers from game state (law 4).
Next: worker fixes A (+ N1/N2 if cheap) and wires K-BADGE-HAOHUU when the keeper lands it; then re-check only that diff + the badge states. Shots wipe at the final verdict: `python3 dev/site/cdn_sync.py --wipe-review rv-hao-huu-2` (and `rv-hao-huu`, `hao-huu`).

## r2b — re-check of 8bcba06b (hao-huu-2 r3: A + N1 + N2) — verdict: **PASS-PENDING-BADGE**
Diff dfd14ac7..8bcba06b only (jhaohuu, jcooptimer, KIT §69.2, coop-haohuu, rebuilt index/sw). 8bcba06b descends from review/hao-huu-rv2 dfd14ac7 (main aee7ff84); main has moved on (a66b5a49) → the final land needs one more merge of main.
| item | check | verdict |
|---|---|---|
| A sheet title masked | title + Danh vị = `kitName(entity,{cap:true})` in a `data-k61skip` span; `#kctmf` / `#kctmfu` data-k61skip. coop-haohuu (tt/nc, HH_DSF=2) **311/311 ok**; shot r3 hh-guest-fold-met: «Quý nhân Tô Tĩnh Thù» in rank colours, Danh vị the same, no «???» (also aria-label / title / hidden words, test). Rank + name together = owner 15/11 rule; unmet stays «Hảo hữu của ta» (OD:L1060). | FIXED |
| A root cause | not reproducible (random lives); the test now logs any K61MAP variant of her name mapped to another key; the name-core collision (guest keeps the host's names) reported to MAIN by the worker, outside this branch. | accepted |
| N1 slot after own reload | slot per viewport in localStorage `ctmHhSlot` (UI only, try/catch); no collision re-check within 1.2 s of a resize; strip slot retries without toggling. Test: guest iPad same box after reload. | FIXED |
| N2 KIT doc | §69.2 rewritten in place (#kctmfu.kup copy, data-k61skip, slot persistence). | FIXED |
| N3 / N4 | cord + tiny ⏸ → badge commit (keeper `kitStBadge`, review/kit-badge 36b6071e, not KIT READY yet). | with badge |
Remaining before LAND: keeper K-BADGE-HAOHUU KIT READY → worker wires it → I re-check that diff + badge states (✓ / … / ⏸ / grey, Fold + iPad, both seats), merge newest main, gates, push review/hao-huu-rv2, send LAND READY.

## r2c — FINAL re-check: badge 0466ee43 (K-BADGE-HAOHUU) + newest main — verdict: **PASS → LAND READY**
Diff 8bcba06b..0466ee43: merge of review/kit-badge 36b6071e (keeper session_01Rc5AsMtjP4KTgBZVjENGLs; its base 1af8db13 is in main) + wiring.
- Keeper part (law 9, OD:L1103): `kitStBadge(st)` in jrail.js → `<b class="kbdg ok|busy|pause">`, 15 px disc bottom-right of a `.krailb`, `.krailb.koff` greys every child but the badge; KIT.md §77b + kit sample §77b + dev/test/kit-badge.js (PASS 755x1000 + 1180x820). KIT_REQUESTS row K-BADGE-HAOHUU present.
- Wiring (jcooptimer): ready → ok ✓ · hold → pause ⏸ · busy/work → busy … · away → no badge + `.koff`; the private `.kctmf-b` / `.kctmf.koff` CSS is DELETED (no second look; consistency with every `.krailb`); portrait clipped inside the button (N3 cord gone).
- Owner canon 06:30Z checked against shots (Fold 755x1000 + iPad 1180x820, both seats, scale 2, looked at 3×): green ✓ beside the icon when she is ready (st-host-fold-ready / st-host-ipad-ready, the «Hảo hữu đã sẵn sàng» notice sits LEFT of it, not over it); «…» while she works / is busy (hh-*-met, hh-*-stranger); grey picture + no badge when she is offline (st-host-fold-away / st-host-ipad-away, raised above the freeze panel); ⏸ amber while she holds (st-*-hold, above the hold panel). No long text; tap → partner sheet (unchanged, r2b). Countdown chip kept (16/11).
- Note (non-blocking, keeper): at 10 px the ⏸ glyph draws as one white bar on the amber disc (zoom), not two; the owner's canon only names ✓ and «…»; keeper may swap the glyph for two drawn bars in §77b later.

### Merges + gates
Branch `review/hao-huu-rv2`: 0466ee43 + merge origin/main a3a65964 (475d23d1; assemble = main list + jhaohuu.js; KIT_REQUESTS rows of both kept) + merge f3353128 (90ccc476; CI/perf-test files only) + merge f13dc915 (44b3418d; assemble = main list + jhaohuu.js; index.html/sw.js rebuilt every time).
| gate | on | result |
|---|---|---|
| quickcheck | 475d23d1 | PASS · open 1643 · old save ok · render 212/212, tab 397/421, buổi 1095/986 · core PASS |
| quickcheck | 90ccc476 | run 1 FAIL perf only (buổi 3582 vs live 1102: runs 3582/3713/1708, random-life noise; game code = 475d23d1); run 2 PASS · buổi 1042/1568 · old save ok · core PASS |
| kit-badge.js | 475d23d1 | PASS both sizes |
| coop-haohuu (tt/nc, HH_DSF=2) | 475d23d1 | 319/319 ok |
| coop-e2e | 475d23d1 | 92/92 passed |
| coop-chat | 475d23d1 | ALL OK 55 checks |
| role-parity.test.js (alone) | 475d23d1 | ALL PASS |
| coop-haohuu | 1f08d99a (+ main 2bab70e1) | run 1 317/319: host Fold stranger, `#kntchip` caught over the icon for one frame; run 2 319/319. Probe (both seats × Fold/iPad × 4 notice lengths 19–82 chars): every PLACED chip keeps clear of icon + clock (slots bar / bar2 / hidden), so this is a ≤ 300 ms placement race before jnotice's 300 ms watch re-places the chip, not a lasting cover. Non-blocking; could be hardened later by adding `#kctmf` to the jnotice bar2 obstacles |
| quickcheck | 44b3418d (+ main f13dc915) | run 1 FAIL perf only (buổi 3085 vs 1026); run 2 PASS buổi 1071/1398. Same-seed A/B (6 seeded lives, new vs LIVE, run alone): buổi medians ≈ 1668 vs 1690 ms, LIVE spikes 3640 / 4688 too → random-life noise, no branch cost (jhaohuu has no timers; jcooptimer work is co-op only) |
| coop-e2e | 44b3418d, 1f08d99a | 92/92, 92/92 |
| coop-haohuu + quickcheck | **b4aa7f42** (+ main e391b85f, which changed j61 / j79 used by fix A) | **319/319 ok** · **QUICKCHECK PASS** · open 1711 · old save ok · render 241/232, tab 514/491, buổi 1288/1257 · core PASS |
Further merges: f3353128 (90ccc476), f13dc915 (44b3418d), 2bab70e1 (1f08d99a), e391b85f (b4aa7f42); every time assemble = main list + 'jhaohuu.js' after 'jstatus.js', index.html/sw.js rebuilt; no other conflict.

**LAND READY hao-huu b4aa7f42** (review/hao-huu-rv2), FF of main **e391b85f**. Main then moved to 94cbe0cd (quest-rows: j72, j79, jk2b, jnroad*, KIT.md): the land merge is mechanical (assemble = main list + 'jhaohuu.js' after 'jstatus.js'; index.html/sw.js = rebuild). Because j79 (kitName, used by the sheet title) changed again, re-run `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-haohuu.js <out>` after that merge.
Laws checked: 1 two-way (both seats see each other the same way) · 4 one core (numbers from game state) · 6b real people (the partner's own entity, knowledge rule per person) · 7 wording (no %, cổ trang; no status words on screen) · 9 kit first (kit .krailb + keeper §77b kitStBadge, no private badge CSS) · 11 whole group (every name text + labels guarded; badge on every state) · 12 two devices (Fold + iPad, both seats, looked at 3×) · 14 canon overwrite (§69.2 in place). Older owner rules on the same element kept: 16/11 countdown chip, OD:L1060 «Hảo hữu của ta», OD:L165 stranger, 21/11 05:05Z fixed top bar.
CDN review folders wiped: rv-hao-huu, rv-hao-huu-2, hao-huu.
