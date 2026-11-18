PRIORITY #1 CHECK ('npc-roads|nroad'): OD 0 | ledger 2 | claims 8 | main 15 (jnroad*.js not on main) | review/* 4 (npc-roads, npc-roads-r1, npc-roads-fx, npc-roads-fx-r2 = this) → review of the existing branch, no rebuild.
# review-npc-roads-r2 — reviewer (opus, BIG tier), Foreman D #8
Reviewer session: session_01964izESTjuhUzS2khSQ5K9. START_CTX ≈ 6 % of the 1M window (get_session reads 0; own estimate). Rollover at 31 %.
Reviewed: review/npc-roads-fx @ e34393b1 (U2 maids + U3 men + U4 balance + r1 families + ch1–4 gate; carries r1 83d84225).
Review branch: **review/npc-roads-fx-r2** = e34393b1 + merge LIVE main 4719d424 (19d33501) + fix F7/F8 (1c457b14) + maids test (952564a9) + merge LIVE main 6c4f21c3 (1f49625d, generated files only).

## Test build
B's road engine (road-onecore, road-b2-fix-r2, road-b3-fix2-r1) is now ON main (batch-0232, ancestors of origin/main 4719d424), so the
test build is simply **this branch + latest main** (no local-only B merges). Merge conflicts (mechanical): assemble.py = main's list +
jnroad.js/jnroadm.js after jreign.js; jbal2.js = only the BAL.nroad block kept (the old BAL.road block moved to jbalroad.js on main);
index.html/sw.js/assets.json rebuilt. jroad.js / jrd_tt.js / j67.js = main's (identical after merge).

## Findings
| # | finding | rule | fix (r2, 1c457b14) | before → after |
|---|---|---|---|---|
| F7 BLOCKING | NPC chapter ending tags and one chapter title are the PLAYER's arc text with cast tokens: «{mis} chen giữa», «Nắm thóp {v}», «Nhà {v} trong án cũ», «{v2} giữ miệng…» — printed raw on the Kẻ hầu card (seen on iPad 1180 shot: «qua chương 6: {mis} chen giữa»), in Tin trong cung news and in the help-offer title | true info / VANPHONG (no raw code text to the player); LUẬT SỬA CẢ NHÓM | nrFill(s, person): {v} {v2} {foe} {foed} = the NPC's own rival (a consort's rival can be the player → «ngươi», j84 makes it «ta»), {mis} = her mistress («ngươi» for the player's own maids), else «đối thủ»/«chủ nhân»; applied to every tag (nrEnd), every chapter title (play results, nrChT, offer head) and the stored N.e on card/close lines (old saves) | scan all 71 roads × .4–.11 × 3 signs: 51 tags + 1 title → 0 |
| F8 BLOCKING | 5 tags are FUNCTIONS (cn_chu/cn_tinh/cn_ban/ch_co/ch_bi/muoi MATQ…): plain(fn) printed the JS source «()=>MATQ()?"Trung cung thành đối thủ":…» as the NPC's ending (seen at runtime in a muoi life, N.e) | same | nrS(x,A): function tags/titles are read by value; a stored source-text N.e is dropped on display | 5 → 0; runtime 3 lives × 120 months (muoi/tt/cnv): 0 bad of 310 card/tag lines, 0 bad news lines |
Scan kept: dev/test/npc-roads-tokscan.js (titles + tags, raw token / `=>` / `${`).
Why r1/fix-scan missed it: F2 only looked for «ngươi»/✦ in tags.

## Not blocking (notes)
- N1 (main-side, j72/jk2b vague hints): an nr_* offer from a maid reads «GỢI Ý: được lòng kẻ hầu, X nợ ta một ân, được lòng kẻ hầu; nhưng mất lòng kẻ hầu». The branch's tokens are correct and named («Lòng X +6», «X nợ ngươi một ân», rival −) — the jk2b vague-wording layer maps every «Lòng …» token to the same generic words and does not de-duplicate. Same for every j72 servant asker on main → owner of jk2b/j72 hints.
- N2: «Mệnh truyện» line on the person card: wraps, not cut; on Fold the Kẻ hầu card's left column must be scrolled to see it (kit .pcl scroll, same for every person card).
- N3: Nam nhân tab with a forced «seen» man and no S.menW entry throws in manCard→travel→mapPos («Mục này đang lỗi») — identical on main; a test artifact (in play «seen» always comes with S.menW). Not this branch.
- N4: r1 N3 (news repeat at a road's end) still open; ROAD_MAP §4.10 men rows still a PROPOSAL for Foreman B's canon check.
- The PEND.j70scar console error noted in the worker's FINISH no longer appears (main fixed it): maids 22/22, men 23/23, consorts 38/38.

## Checks
| check | result |
|---|---|
| ch1–4 gate at runtime (gate probe, muoi life, f14 on) | ch1 / ch3 (warm or cold): consort asks 0/11, maid asks 0/10, men asks 0/18, player as rival 0/40 · ch4 warm: 9 / 4 / 17 asks · ch4 cold: rival 16/40 · lãnh cung (S.out) at ch5: 0 / 0 / 0 asks |
| r1 families F1–F6 (npc-roads-fix-scan) | see Tests |
| ONE CORE | one-core-guard on the test build (see Tests); new r2 code has no number |
| VANPHONG / voice | nô tỳ + Tiểu chủ in maid offers; no %/digits in new text; no ✦ on NPC endings |
| two-way / co-op | host-only unchanged; coop-e2e branch vs main (see Tests); no co-op code touched |
| kit | no CSS, no new part (pcard .pcinfo line, j72 offer card, log lines) — consistency: same row style as j85/j24 lines |

## Tests (test build 1c457b14 served locally)
| test | build | result |
|---|---|---|
| one-core-guard | 1c457b14 / 1f49625d | PASS, 0 fails (B's engine on main: the 80 jrd_tt fails of the plain branch are gone) |
| npc-roads-fix-scan F1–F6 | 1c457b14 | F1 servants/men 150 + consorts 42 chapters in a kẻ-hầu life · F2 1273 tags 0 · F3 80 cards 0 · F4 10 kinds 0 · F5 0 · F6 10 checks 0 · 0 page errors |
| npc-roads-tokscan (NEW, F7/F8) | e34393b1+main → 1c457b14 | titles 1 → 0, tags 51+5 → 0 (491 chapters, 8838 dealt tags) |
| runtime line scan (3 lives × 120 months, muoi/tt/cnv; cards, N.e, news) | 1c457b14 | 0 bad lines of 310 |
| npc-roads.js 4 lives × 180 months (consorts) | 1c457b14 | 38/38 |
| npc-roads-maids.js | 1c457b14 → 952564a9 | 21/22 (stale-state check: a maid changed house between chapters) → test now checks the rival as the next chapter reads it → 22/22 |
| npc-roads-men.js | 1c457b14 | 23/23 |
| npc-roads-saves.js (+ LIVE main save) | 1c457b14 | 6/6 |
| coop-e2e (live Worker) | 1c457b14 | 60/60 (not worse; the main-worktree baseline run could not start: generated dev/index.html absent there) |
| quickcheck.sh | 952564a9 (run alone) | PASS · old save ok · render 242/275, buổi 909/957 ms (≤ live) · core gates + time-spill PASS |
| quickcheck.sh | 1f49625d (after main 6c4f21c3 merge) | PASS · old save ok · render 290/259, buổi 1075/980 ms (run-to-run noise: the same NPC code measured 909/957 above; quickcheck gate PASS) |
| ch1–4 gate probe | 1f49625d | ch1/ch3 0 asks / 0 rival-me; ch4 asks + rival-me return |

## Look (shots outside git, /home/user/wt/nrr2-shots; 755x1000@2 + 1180x820@2, looked at each, 0 page errors)
- Kẻ hầu card (own trusted maid): «Mệnh truyện: «Ánh mắt nơi hành lang» · qua chương 5: Chủ cũ thành kẻ thù» — kit pcard line, wraps. iPad shot before the fix showed «{mis} chen giữa» → F7.
- Nam nhân card (Thị vệ): «Mệnh truyện: «Mối tình bên cổng cung» · qua chương 5: lỡ hẹn» — same row style, not cut.
- Maid offer (nr_do, real nrMOffer path): «Phụ tuyến · Cung nữ thân tín Hải Đường: «Chị em đồng hương» · Chương 6 «Kẻ vu» · Lời nhờ (1 bước)», quote «Nô tỳ … Tiểu chủ …», hạn 6 tuần, Nhận lời (có rủi ro) / Khéo từ chối (an toàn). Hints: N1.

## Verdict
**PASS 1f49625ded26fa0395dd055d7e0d6a1d2834965e** — U2 maids + U3 men + U4 balance + ch1–4 gate + r1 families, with the 2 blocking families F7/F8 fixed in r2.
Fast-forwardable: origin/main 6c4f21c3 is an ancestor. Go-live order: B's road engine is ALREADY on main (batch-0232), so this can go in the
next hourly batch as is (carries r1 83d84225 and all of review/npc-roads-fx). Open notes N1–N4 are for other owners / later units.

PASS 1f49625ded26fa0395dd055d7e0d6a1d2834965e
