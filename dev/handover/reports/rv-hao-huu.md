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
