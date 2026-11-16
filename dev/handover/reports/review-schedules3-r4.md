SẴN SÀNG KIỂM f388b4dedc910395fb66c9ae0ff5523624d15640

# review/schedules3-r4 — D29 fix pass 4 (worker, Foreman C)
Start: review/schedules3-r3 @ 94edaf9f. Merged origin/main 2232ea32 (100 commits; conflicts only in assemble.py / index.html / sw.js /
assets.json: main's list + `jk95` after `jk2b`, `j95, j95b, j95c, jqsave` just before `jkpc`). Site rebuilt with dev/site/build_site.sh.

## FAIL item 1 — jroute NPC acts through the shared motive gate + record (OD:L35)
| place | before | after |
|---|---|---|
| `rtCaughtBy` blackmail (`T.bm`, card `rtBm`) | `greedy‖roll(55)`, own `aff>=45` check, no gate, no record line | still `aff>=45` → keeps her secret; then `(greedy‖roll(55)) && motiveOK(v,S,"uyhiep")`, logged with `j95actLog` (`rtGate`) |
| `rtCaughtBy` → `rtReport` (report to the Emperor) | ungated | `motiveOK(v,S,"tocao")`; fails → "Nàng không nói gì, nhưng đã ghi nhớ." (evidence kept) |
| monthly re-demand `rtBm` (`rtMonth`) | pushed every month | re-gated each month; motive gone → "<name> thôi đòi bạc của ngươi." and `T.bm` cleared |
| card `rtBm` | not in P95B | P95B `rtBm:{v:{h:"uyhiep",nr:1}}` (never re-picked: the blackmailer is a fact) |
| card `rtNpcEsc` | not in P95B | P95B witness role `{n:"đang lén chuẩn bị trốn khỏi cung (việc có thật: kế đã lập từ trước)"}`; the record line moves her act to `scheme` with that reason (`j95bPut`, src rtNpcEsc) |
| family in the same module: rival frames her child (`rtMonth` wrapper → `rtNgSet`) | Hiểm + danger≥60, ungated | `motiveOK(f,S,"accuse")` + record |
| family: `rtNgNpcAuto` foe who oils the bowl against another consort | aff<-30 + Hiểm, ungated | `motiveOK(foe,v,"frame")` + record (`rtGateT`) |

## FAIL item 2 — jroute witnesses come from the record at the current khắc
| function | before | after |
|---|---|---|
| `rtWit(k)` | `S.where[v.id]===k` (view, can lag) | `whereOf(v)===k` (S.roster at j95kh()) |
| `rtSeen` fallback pool | none at the place → any consort with `mat>=2` anywhere, 55 % | removed: nobody at the place in the record → nobody sees (footsteps line) |
| `rtNpcMeet` | `S.where[v.id]===S.place` | `whereOf(v)===S.place` |
| LUẬT SỬA CẢ NHÓM, other witness readers of S.where: `jmen menEyes`, `menNpcSee`, the "seen with a man" loop (`seenMe`), `jgift` walk with the Emperor (who sees → ghen) | `S.where` | `whereOf` (same record; falls back to S.where when the record is off, e.g. co-op) |

## FAIL item 3 — LUẬT SỬA CẢ NHÓM scan of cards with a consort id in their params
Script: `python3 dev/test/pend_consort_scan.py <schedules2 PEND ids>` (static: RV/byKey/rivals.find on params, plus "indirect" bodies that
read rivals) + the live audit (g) of roster_audit (it caught two cards the static scan cannot see).
| card (module, new since schedules2) | consort param | before (r3) | after (r4) |
|---|---|---|---|
| rtBm (jroute) | v | MISSING | P95B hostile `uyhiep`, no re-pick; act gated at the source |
| rtNpcEsc (jroute) | v | MISSING | P95B witness role + record line |
| rtNgNpc (jroute) | v | P95B (her own act, r3) | same |
| rtNg (jroute) | none in params (accuser `T.ng.acc` from state) | accuser ungated at the source | every source of `rtNgSet` with a consort accuser now gated (rtReport via tocao, frame-child via accuse) |
| sgpick (jsgame) | v (via sgJob) | P95B her own pick (r3) | same |
| cmBrawl (jcmaid, from main 2232ea32) | v | MISSING (audit (g) ×2) | P95B neutral victim side |
| cmScorn (jcmaid) | v | MISSING (audit (g) ×3) | P95B hostile `provoke` (gate + re-pick a consort with a motive) |
| cmSec / `cmSecFor` spy (jcmaid) | m.sec.by from state | any random consort | only a consort passing `motiveOK(v,S,"spy")`, logged; none → no spy secret |
| menEnc, tsbBul, tsbOmen, tsbFirst, pgin, rcpacc, vuoan (jmen/jtsb/jpoison/jrcp/jtruth) | v/a/f/acc | P95B | same |
| e68doubtVisit (jevb) | a0 | E95B | same |
| tsbPetGift (jpet), pgpick (jpoison) | strings / item index, no consort id | – | – (not a consort param) |
Scan totals after: 47 cards read consorts, 17 new since schedules2; every one with a consort id in params is declared (P95B/E95B) or is
her own pick; the remaining "MISSING" rows of the script are old cards (PASSed on schedules2, unchanged) or indirect bodies without a
consort param.

## FAIL item 4 — tests (build f388b4dedc910395fb66c9ae0ff5523624d15640 = r3 + main 2232ea32 + the fixes above)
| test | result |
|---|---|
| roster_audit **sens 18** (CAP 3300) | run 1 (before the jcmaid fix f1ab27a4): 17 131 checks, (a) 1, (c) 4, **(g) 5 = cmBrawl ×2, cmScorn ×3** (new main cards, fixed above); run 2 on the final build: **17 893 checks, all (a)–(r) 0**, page err 0, J95/J95B/J95C errors 0, knownTgkElder 14 441 |
| roster_audit **rand 18 shard 4** (timeout 6600 s) | **42 173 checks, all (a)–(r) 0**, page err 0, gate 1 148 / pass 3 242 (most lives end on the time cap, 2 die) |
| stage-counts.js ×3 | thd 148/151/148, cnv 69/61/61 walks, **0 mismatches**, 0 errors |
| roster_dom 20 moments | 755x1000@2 **0 bad**, 1180x820@2 **0 bad**, maid road (cnv) 755x1000 **0 bad**; 0 page errors, no overflow |
| roster_oldsave (save made on main 2232ea32 without j95 → this build) | loads at 755x1000 + 1180x820, record built on load, 46 checks each, 0 bad, 0 errors |
| coop-e2e (live Worker) | **59/59** |
| pend_consort_scan.py | table above |

## Known, not fixed here (non-blocking, as on r3)
- (a) "cnv spend thiếu m4": one khắc at a maid→consort promotion (stale S.menWhy until the next buổi) — same known gap as r2/r3.
- (c) at her palace a child drawn by homePeople that the record had elsewhere for one buổi (dtq T10, 4 checks of one buổi) — see sens run 1.
- `knownTgkElder` (jstaff draws the Đức Thọ cung elder at Tân Giả khố too; main bug) — fixed on review/people-ledger through the one
  record (map count = record).
- Wording seen in main's j77 (not this branch): option text "Chắc chắn · tốn …" (VANPHONG forbids "Chắc chắn").
- KIT REQUEST K14 still pending at the kit keeper; nothing private drawn. No style added (grep 0).

## Stage 2 (same worker): review/people-ledger — in progress, NOT ready; see dev/PROGRESS_people-ledger.md on that branch (handover there).

## HANDOVER — stage 2 PEOPLE LEDGER (worker rolled over, Foreman C 15:45Z)
Branch **review/people-ledger @ afcac6cb** (from this branch + merge of r4 f388b4de). Full notes: dev/PROGRESS_people-ledger.md there.
Done: every record person is a Dư đồ shadow where the record puts them at the CURRENT khắc (consort road), counts add up to the record
(ledger_shadows.js: 30 moments, map 1711 = record 1711, hidden/extra/twice 0, stage = record 0 diffs); one outermost countAt from the
record (jplx/jact side counts and the Tân Giả khố elder +1 gone); stage draws everyone with existing kit stage kinds (j59 pages);
fixed-calendar planner (seeded by S.j95seed + buổi key). Left: (1) maid road (cnv) under the same rule; (2) RULE CONFLICT to decide:
main's stage-counts.js wants arrival-khắc counts, the owner's 13:50Z law needs one-moment counts; (3) audit outside men / officials set
hours + morning court presence; (4) full test suite + Playwright shots 755x1000 / 1180x820 on that branch (crowded stages);
(5) git-grep Foreman D's review/mem-upgrade + review/item-ledger, share one ledger style.
