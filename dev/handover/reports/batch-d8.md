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
