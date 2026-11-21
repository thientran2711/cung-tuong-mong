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
