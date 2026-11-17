PRIORITY #1 CHECK: all seven are reviewer PASSes in dev/handover/FOREMAN_D_STATUS.md 'PASS' lines + CLAIMS.md (suc-khoe-r2 7e1f42ca, cloud-del-r1 7d67ba1f, item-ledger-solo-r1 be8dd7a1, npc-death-wire-r1 9253ec1b, story-frame-r1 7be4cdc6, batch-0032-oi-r1 36f86d3a, npc-roads-fx-r2 1f49625d) | live main 9fdc1199 (batch-0430 6c4f21c3 + trait-pool-r1) | builder only, nothing new built.

# batch-d8 — builder report

Builder session_01964izGMZ8GAccJj2diJHaA (opus), opened by Foreman D #8, reporting to Foreman D #9 (session_01964izBsQba9xq3oCFovTBQ). START_CTX ≈ 8 % (own estimate); now ≈ 50 %.

**FINAL SHA: `d9fb2519`** on `review/batch-d8` (base = LIVE main **9fdc1199** = 6c4f21c3 + trait-pool-r1 ONE TRAIT POOL, which landed after the brief was written). Main fast-forwards; builder never touched main.

## In (merge order) — all 7 taken, none dropped
| branch | PASS head | merge notes |
|---|---|---|
| review/suc-khoe-r2 | 7e1f42ca | jroute.js: suc-khoe's BAL.ngh blood-test code, its 2 trait tests rewritten to main's pool reads (`/Hiểm|Tâm/.test(v.trait)` → `netRx(v,/Xảo quyệt|Tâm/)`, `/Hiểm/` → `netRx(x,/Xảo quyệt/)`, exactly as trait-pool migrated the same lines). Carries the live WAGE fix b37865b7. |
| review/cloud-del-r1 | 7d67ba1f | generated only |
| review/item-ledger-solo-r1 | be8dd7a1 | j92.js: ilGone wiring kept, servant read = main's `netIs(s,"timid")||netIs(s,"greed")` |
| review/npc-death-wire-r1 | 9253ec1b | CHANGE.txt (combined line at the end) |
| review/story-frame-r1 | 7be4cdc6 | assemble only (jreg.js after jcdn.js) |
| review/batch-0032-oi-r1 | 36f86d3a | jbal2: both appended blocks (BAL.net + BAL.kc2). **Semantic conflict with trait-pool:** new module jkc2.js still used old nết words on home people (.tr). Resolved like trait-pool resolved jkc.js: BAL.net.old map (Hiền lành→Ân cần, Nhu mì→Khiêm nhường, Đa nghi/Cẩn trọng→Kín đáo, Tham lam→Ham lợi, phong lưu→Ham vui) + 5 words the map lacks (Ba phải→Xu nịnh, Nghiêm khắc→Lạnh lùng, Lắm lời→Nhiều chuyện, Ôn hòa→Điềm tĩnh, ham chơi→Ham vui); 20 `X.tr==="W"` → `hasT`, 3 nết tables → `tv`, 3 shown nết → `netTxt`; male envoy Kiêu ngạo → Cương trực (male pool). net-scan old rows = live main's. **Reviewer of the next trait/kc job: please glance at the 5 unmapped word choices.** |
| review/npc-roads-fx-r2 | 1f49625d | jbal2: main's BAL.il + branch BAL.nroad; jnroad maid stat `M.tr[s.tr]` → `qv(M.tr,s,0)` (trait-pool servant-quality read) |
| d9fb2519 | — | **merge interaction fix** story-frame × npc-roads: jreg regEach visits late T72 entries at load; jnroad's help-hồi `get bac` read S.rank before a game exists → console `regEach T72 alt 130..134 TypeError` → coop-e2e 'no page errors' FAIL ×3. Price = 0 when no S (not a bạc step = same as each branch alone; T72 steps with ch = 66 on branch and batch). |
assemble.py = union; order tail …jemoact, jkc2, jentry, joi, jseat, jcoopone, jkh, jnpcd, **jrbatch LAST** (outermost render wrapper); jreg 2nd; jil after jeitem; jnroad/jnroadm after jreign. `grep -rn "^<<<<<<< " dev` empty.

## Gates on d9fb2519 (18ebbea7 = same minus the load-time fix where marked)
| check | result |
|---|---|
| quickcheck --runs 5 vs live 9fdc1199 | **PASS** 379 s · open 1559 ms · old save ok · core gates PASS · render 169/294 ms, tab 296/362, buổi 837/1164, tasks>200ms 13/14 (18ebbea7: PASS too) |
| one-core-guard | fails 0 (inline 6654 ≤ baseline 6691) |
| coop-e2e vs LIVE Worker | **61/61** (18ebbea7 was 58/61 = the 3 console errors fixed in d9fb2519) |
| oldsave-r1.js (old = live index.html) | 16/16 (18ebbea7) |
| suc-khoe.js | PASS (exit 0, no fails, no errors) |
| cloud-save.js | ALL 55 OK |
| item-ledger.js Fold + iPad | exit 0 both (18ebbea7; the regEach console lines seen there are gone in d9fb2519) |
| npc-death.js | 12/12 |
| origins.js Fold | ok (no overflow) · regscan.js: 93 load-time passes, missed 0 |
| story-frame-oldsave.js (old = pre-fix 7abaf07a, as the reviewer) | 8/8 PASS (with 6c4f21c3 as 'old' the save is already framed → test precondition gone, same on the PASS branch itself) |
| origin-intros flow.js / entry-exam direct.js | 10/10 · 9/9 |
| npc-roads.js | 29/30 — the 1 FAIL = **LIVE MAIN BUG, not this batch**: `menDecide` ReferenceError `tr is not defined` (jmen.js:228, trait-pool removed `const tr=w.trait`; identical on live 9fdc1199: `menDecide({},null)` throws). Men NPC acts silently fail on live. → FOR MAIN / trait-pool owner (B): one-line fix in jmen.js. |
| npc-roads-maids.js / men.js | **22/22** · 22/23 — the 1 FAIL = the same live-main menDecide `tr` console error (no other error) |
| net-scan.py | old rows = live main's (0 field/regex/table reads) |

## LOOK (CDN `img/_review/batch-d8/`; wipe: `python3 dev/site/cdn_sync.py --wipe-review batch-d8`) — looked at all
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/fold-755x1000-home.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/ipad-1180x820-home.jpg — bd life home: both figures with feet, Sức 100/100, side column + «+4» chip below it, no overlap.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/fold-755x1000-menhtruyen-bd.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/ipad-1180x820-menhtruyen-bd.jpg — Mệnh truyện of a Bắc Địch life: «Tờ hòa ước còn sống», Chương 1/14 Nhập cung, 6 months, 5 steps; no overlap.
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/fold-755x1000-somay.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/ipad-1180x820-somay.jpg — Ám hiệu sổ mây page with «Xóa sổ trên mây» danger button (kit), rows read whole, panel inside the screen.
- Kẻ hầu road line: **not captured** — fold/ipad-…-kehau-road.jpg show the Cung nhân tab, but the «Tuyến truyện: «…» · qua chương 4» span exists only for one moment after the tab opens and is gone from the shown card (0 spans after the page settles); SAME on the PASS branch npc-roads-fx-r2 alone (same element metrics) → pre-existing, not from the merge. npc-roads-maids.js only checks staffTabHTML() text. → FOR D: one small check whether the road line is visible on the settled Kẻ hầu card at all.

## CHANGE line (dev/site/CHANGE.txt, first line)
Sức khỏe nay định mức Sức tối đa, ốm đau và thai nghén đều hao tổn, sinh nở xong phải ở cữ; đồ vật không bao giờ mất hẳn: bán đi thì trôi ra chợ, có ngày người mang về cho chuộc, bị tịch thu thì Nội vụ phủ cất giữ, đồ vỡ được đem sửa; phi tần, cung nhân qua đời thì có người mới vào thay, Phế phi họ Lý cũng có ngày mất; mỗi xuất thân có đoạn dẫn vào cung riêng cùng kỳ khảo tuyển, xuất thân Bắc Địch nay có trọn mạch truyện; cung nữ, thái giám và nam nhân trong cung cũng có đường đời riêng; sổ trên mây có nút xóa sổ.

## For main / D
1. FF main → d9fb2519 after looking at the 6 shots.
2. LIVE BUG (trait-pool): jmen.js menDecide `tr` undefined — fix `const tr=…` → pool reads (hasT) in B's or main's next small job.
3. Kẻ hầu road line visibility (above).

BATCH READY d9fb2519

## HANDOVER (builder #1 → successor; written 17/11 ~09:10Z at context ≈ 55 % > START_CTX 8 % + 25 %)
Foreman D #9 (09:08Z): live main moved to **9391f9a9** (AG1+AG2 05ebe3da + show-why-r1; show-why f487d479 should fix the jmen menDecide free `tr`) → d9fb2519 is NOT FF any more. The BATCH READY d9fb2519 line above is SUPERSEDED.
Successor job (opus):
1. Sparse worktree of review/batch-d8 (d9fb2519); `git merge origin/main` (9391f9a9). Generated files (index.html, sw.js, assets.json) = ours, rebuild at the end with `bash dev/site/build_site.sh`. assemble.py = union; keep tail …jkh, jnpcd, **jrbatch.js LAST**; jreg.js 2nd. jbal2 conflicts so far were always "both appended blocks → keep both".
2. Same semantic rules: ONE TRAIT POOL (no `.trait`/`.tr` field reads, no old nết words — run `python3 dev/test/net-scan.py`, old rows must equal live main's), plus show-why WHY_OWN / BAL.net. Check the batch's own semantic fixes survive: jroute rtNgOil/rtNgNpcAuto netRx, j92 netIs, jkc2 hasT/tv/netTxt, jnroad `qv(M.tr,s,0)` and the load-time `if(typeof S==="undefined"||!S)return 0` in jnroad `bac`.
3. Gates on the new head: quickcheck.sh --runs 5 (PASS), one-core 0, coop-e2e LIVE (≥ 61/61), oldsave-r1 (put `git show origin/main:index.html > .tmp/old.html`) 16/16, npc-roads.js / -maids / -men (expect menDecide clean now → 30/30, 22/22, 23/23), plus a console check that no `regEach` errors appear at load. Serve the worktree with `python3 -m http.server 8788` for URL tests. Other suites passed on d9fb2519 (table above); re-run any whose files the main merge touches.
4. Kẻ hầu road line: the line is in staffTabHTML() text (npc-roads-maids checks it) and a span `Tuyến truyện: «…» · qua chương 4` exists right after opening Cung nhân, but it is gone after the page settles (0 spans; same on npc-roads-fx-r2 alone). Find the element that shows the selected person's road on the settled card (person card «.pcinfo» row, jnroad 'person-card row in .pcinfo (j85 pattern)') — maybe only for a person whose card is open via the people strip, not S.maid; set `nrMInit(s); s.nr.l=[[4,1]]` on that person, open her card, shoot Fold 755x1000@2 + iPad 1180x820@2, LOOK, upload to img/_review/batch-d8/.
5. Update this report: new FINAL SHA, gates table, shots, keep the CHANGE line (add AG/show-why only if main's CHANGE top line differs), end with 'BATCH READY <sha>', send_message Foreman D (#9 = session_01964izBsQba9xq3oCFovTBQ).
ROLLOVER (verbatim):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## BUILDER #2 (successor, session_01964izFyv85ttBMAjgKknm6, opus) — 17/11 ~10:40Z
PRIORITY #1 CHECK: live main re-fetched = **9391f9a9** (AG1+AG2 05ebe3da + show-why-r1, incl. f487d479 free-`tr` fix) | review/batch-d8 was d9fb2519 | nothing new built, merge + gates only. START_CTX ≈ 5 % (own estimate).

**FINAL SHA: `8806f7b3ca5a0bb7a1d0f61d5f5e6241d431bdd2`** on `review/batch-d8` = d9fb2519 + merge of live main 9391f9a9. Main fast-forwards (9391f9a9 is an ancestor). Main not touched.

### Merge 9391f9a9 → batch
| file | resolution |
|---|---|
| index.html / sw.js / assets.json | ours, then `bash dev/site/build_site.sh` |
| assemble.py | union: jmind after jdis · jagent, jagemp after jil (before jlag2) · jwhyn after jcoopone · jreg 2nd · tail …jseat, jcoopone, jwhyn, jkh, jnpcd, **jrbatch LAST** (292 modules, no dups). jwhyn wraps log/affAdd/…; jnpcd only wraps log for one call → order-safe |
| j8.js night1 | main's `BAL.night.mood[E.mood]` + batch's `ilFilter(S,…,"conf")` (item-ledger) |
| jbal2.js | both blocks, twice (suc-khoe BAL.kh/preT/pgRisk/ngh + AG BAL.ag/mind/deck; kc2 + show-why BAL.net.k/BAL.net.n). No BAL key defined twice |
| KIT_REQUESTS.md | both requests kept |
| **semantic (show-why ONE CORE)** | `net-inline-scan.py` found **12** nết-chosen numbers in batch module jkc2.js (origin-intros) → moved to `BAL.net.n` rows kc2HmAsk, kc2MeSick, kc2MuTalk, kc2ChaWant, kc2MeWant, kc2EnvoyMeet, kc2KhanGo, kc2MuGo, kc2MuSwap, kc2KhanSwap, kc2KhanVow, kc2KhanStay, read by `nv()` (same values, same pattern main used for jkc.js kcBac/kcReal/kcPowder). Scan now **0** |
| batch semantic fixes | still there: jroute netRx ×4, j92 `netIs(s,"timid")||netIs(s,"greed")`, jkc2 hasT/tv/netTxt, jnroad `qv(M.tr,s,0)` + `if(typeof S==="undefined"||!S)return 0` |

### Gates on 8806f7b3
| check | result |
|---|---|
| quickcheck --runs 5 vs live 9391f9a9 | **PASS** 361 s · open 1467 ms · old save ok · core gates PASS · render 172/254 ms · tab 261/312 · buổi 833/951 · tasks>200ms 11/13 |
| one-core-guard / rules-one-source / kit-conform / time-spill | PASS (inside quickcheck core gates) |
| net-scan.py | old rows = live main's (all 0 except the 2 rows main has too: 10 / 2) · net-inline-scan **0** |
| coop-e2e vs LIVE Worker | **63/63** |
| oldsave-r1.js (old = live index.html) | **16/16** |
| npc-roads.js / -maids / -men | **30/30 · 22/22 · 23/23** (menDecide fixed by main's f487d479) |
| regEach / console at load (Fold + iPad, load + start) | 0 console errors, 0 regEach |
| origin-intros flow.js / entry-exam direct.js | 10/10 · 9/9 |
| origins.js Fold | ok (no overflow, box fit) |
| item-ledger.js Fold + iPad | exit 0 both, no FAIL |
| suc-khoe.js · npc-death.js · cloud-save.js | PASS · 12/12 · ALL 55 OK |

### Kẻ hầu road line — FOUND, shown (not a bug)
Builder #1 looked for the text «Tuyến truyện:». The line IS on the settled card, but the j84 wording pass renames it to **«Mệnh truyện: «…» · qua chương 4»** (j84 map `["Tuyến truyện","Mệnh truyện"]`). It is the last `.pcinfo` span in the card's LEFT column (`.pcl`, which scrolls by itself) under the item pictures and the Thiện cảm / Tuổi / Kẻ hầu / Trọng chips. So the player sees it after scrolling that column a little (Fold: ~110 px, iPad: ~200 px). Shots (S.maid, `nrMInit(s); s.nr.l=[[4,1]]`, Cung nhân tab, mouse wheel over the left column) — LOOKED: line whole, no overlap, nothing cut:
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/fold-755x1000-kehau-road.jpg
- https://ctm-img.victoria-tntt.workers.dev/img/_review/batch-d8/ipad-1180x820-kehau-road.jpg
The 6 other shots of builder #1 (home, Mệnh truyện bd, Sổ mây) stay valid. Main's merge touched none of those screens' modules beyond show-why's result-card row.
→ FOR D (UX, not blocking): the road line sits below the fold of the left column; if the owner wants it seen without scrolling, move it up in the .pcinfo order (the jnroad pcard wrapper appends it last).

### CHANGE line
Unchanged (main's CHANGE.txt top line is the same as on 9fdc1199; AG/show-why added none). Same text as above.

### For main / D
1. FF main → 8806f7b3 (9391f9a9 is its ancestor).
2. Wipe review shots after the verdict: `python3 dev/site/cdn_sync.py --wipe-review batch-d8`.

BATCH READY 8806f7b3ca5a0bb7a1d0f61d5f5e6241d431bdd2
<<<<<<< HEAD

## BUILDER #3 (session_01964izDXBECKNTXdyNVmcBc, opus) — 17/11 ~12:40Z
PRIORITY #1 CHECK: claims = this job only (D9 brief D9-batch-d8-remerge3.md) | review/batch-d8 was 8806f7b3 | live main moved 9391f9a9 → 7e264081 (npc-agent-ag3-r1) → **65dcf52f** (greet-meet-r1) during the run | nothing new built, merge + gates only. START_CTX ≈ 8 % (own estimate); now ≈ 35 %.

**FINAL SHA: `6ca041487a6ae0aa240d3a1a7976303530d23ced`** on `review/batch-d8` = 8806f7b3 + merge 7e264081 (466c3906) + merge 65dcf52f (6ca04148). Main fast-forwards (65dcf52f is an ancestor). Main not touched.

### Merge 7e264081 (AG3) → 466c3906
| file | resolution |
|---|---|
| index.html / sw.js / assets.json | ours, then `bash dev/site/build_site.sh` |
| assemble.py | batch order kept (jreg 2nd, …jkh, jnpcd, **jrbatch LAST**) + AG3's new **jagmaid.js after jagemp** (as on main) → 293 modules, no dups |
| j3.js endTurn | both meanings: main's `const rg=nightRg()` + batch's (suc-khoe) `sucCap(S)` / `sucCap(v)` clamps |
| **semantic** j42.js (AG3 srvEndTurn, NPC consorts rest in a maid life) | clamped to `100` → `sucCap(v)` (jkh rule: every Sức clamp reads sucCap). Whole-family scan `\.suc=cl(…,0,100)` in dev/build: the only merge-born one was this; j80 / jnroad:79 are pre-existing on the batch (jnroad goes through `ap` → sucCap), all*.js are old archives |
### Merge 65dcf52f (greet-meet) → 6ca04148
| assemble.py | + **jgreet.js between jcoopone and jwhyn** (as on main) → 294 modules, jreg 2nd, jrbatch LAST |
| jbal2.js | both appended blocks (batch BAL.net.n kc2* + greet BAL.greet / BAL.net.n.greetName / meetW / BAL.talk); one-core: no key set twice |

### Gates
| check | 466c3906 | 6ca04148 (final) |
|---|---|---|
| quickcheck --runs 3 vs live | **PASS** vs 7e264081 · render 180/314 · tab 375/360 (+4 %) · buổi 960/1368 · old save ok · core gates PASS | **PASS** vs 65dcf52f · open 1441 ms · render 156/262 · tab 305/362 · buổi 781/1134 · tasks>200ms 12/13 · old save ok · core gates PASS |
| one-core-guard | fails 0 (inline 6625 ≤ 6691) | fails 0 |
| net-scan old rows / net-inline-scan | = live main (10 / 2, rest 0) · 0 | same · 0 |
| coop-e2e vs LIVE Worker | **63/63** | **63/63** |
| oldsave-r1 (old = live 7e264081 index.html) | **16/16** | — (brief: only quickcheck + coop-e2e after the 2nd merge; quickcheck's old-save step passed) |
| agmaid_check.js (AG3's own) | 23/23, no page errors | — |
| agent_check.js | exit 0, no FAIL | — |
| greet_check.js (greet's own) | — | 13 ok, 0 FAIL |
| console / regEach at load+start, Fold 755x1000 + iPad 1180x820 | 0 game errors, **0 regEach** | — |
| npc-roads.js | 28/30 (see below) | — |
| npc-roads-maids.js | 21/22 (see below) | — |
| npc-roads-men.js | 22/23 (see below) | — |

**Not-a-bug notes (please check, D):**
1. The local `python3 -m http.server` was **blocked by this session's permission classifier**, so the npc-roads suites, agmaid/agent and the console check ran on `file://…/index.html`. Under file:// the only console error is `Fetch API cannot load file:///…/audio/VOICES.json. URL scheme "file" is not supported` (a scheme limit, not a game error) → it is the whole content of the 'no page errors' FAIL in all 3 npc-roads suites (npc-roads 1, maids 1, men 1). Builder #2 served over http and got 30/30 · 22/22 · 23/23. A reviewer with http may re-run them.
2. npc-roads 'at most one help hồi per NPC' FAIL once (life 3, rival id 10, offers `nr_bac:8` + `nr_emp:8`, her own record `hs:1`): **test-key collision**, not a game bug. The test groups offered q72 cards by `c.ri` only, but maid (jnroad nrMOffer) and men (jnroadm nrMenOffer) offers go into the same queue with their own `rk` (servant / man) and `ri`; the game dedupes per (rk, ri) via `nrSameA`. A maid or man with id 10 at their chapter 8 = second entry under consort 10. Random life (bot not seeded); neither merge touched jnroad. → small test fix for whoever owns npc-roads: key `offers` by `c.rk+':'+c.ri` and keep only rk 'rv'/'hh'.
3. First npc-roads-men run crashed the browser tab (`Target crashed`) when 3 long-bot suites ran at once (memory); re-run alone = 22/23 as above.

### CHANGE line
Unchanged (main's CHANGE.txt top line did not change with AG3 / greet-meet).

### For main / D
1. FF main → 6ca04148 (65dcf52f is its ancestor).
2. Wipe review shots after the verdict: `python3 dev/site/cdn_sync.py --wipe-review batch-d8`.

BATCH READY 6ca041487a6ae0aa240d3a1a7976303530d23ced
=======
>>>>>>> 942503ed (report voice-trait part 1 (engine + 5 situations, split proposal))
