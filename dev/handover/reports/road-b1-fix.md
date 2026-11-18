# road-b1-fix (fix A = jroad engine owner + jrd_tt / jrd_dtq; fix B merged) — review/road-b1-fixa
Worker fix A, coordinator Foreman B (s7 → s8 session_01N1tNP4LoQPgWaFJWtCiVsJ). START_CTX ~4 % of a 1M window.
Base: origin/review/road-b1-r1 a05eec6e + road-map-next d69d6d24 + origin/main 8d14f6ef + review/road-b1-fixb 70a43f49 (fix B DONE; jrd_muoi/jrd_cn, report road-b1-fixb.md).

## Engine (jroad.js) — whole family
- Item 1a: rdR97() builds ARC67[id].E.r97 for EVERY RD97L entry present at load end (same shape as j97: k:1, ✦ tag, rare text, fx, go → r97After = Ngự tứ + title + Sổ luân hồi). Before: 16/16 road finales fell back to a plain win. After: 16/16 (road-rare). Later RD97L pushes (B2/B3 files) get it too.
- Item 1b: road-wide rare tally S.st.f14.q97: every choice in the road's .4 and .5–.10 is matched against the road's .11 RD97L path/bad (res67 wrapper after j97); the .11 thread starts from it (A.q97), j97 counts the .11 itself. Reset at road start. Reachability (chances = road chapters .5–.10 + .11 pools with a path option ≥ np+1): before (only .11 counted) 8/16 unreachable (cn_chu/tinh/ban/than, dtq_huynh, tt_oan/tranh/mat) + tt_co tight; after 0/16 LOW.
- Item 7: a mid-chapter recast (j67 beatOk67 need v → castRv67) is told like the chapter-start one (log + next hồi card, A.rq). rdCast {keep:[role]} = identity-bound role: cast once when the road first needs it, never recast. Found while merging fix B: CN_NORECAST={v:()=>false} also refused the FIRST cast → cn_than .4 casts v only in its c3 hồi, so most cn_than lives could not open .5 (newThread67 null) → fixed with keep, fix B took the line.
- Road start also resets S.st.f14.fb (fix B cross-chapter flags) and q97.

## road-option-scan (dev/measure) — now guards every jrd_* file (B2/B3/fix B use it)
New lists: INVERTED e:, X-BEAT DOMINANCE (worst ≥ other's best at ≤ cost, other with no upside), X-BEAT BOLD ≤ SAFE (free safe needs bold base +10; costed safe needs bold base above it), x odds not readable, VANPHONG banned words in every text field incl. function texts (string parts) and RD97L (chắc chắn any case, bạn, cơ hội, kế toán, hóa đơn, cạnh tranh, tẩy chay, Khôn Ninh, chỉ số, bấm/nhấn, %), digits in function texts, RD97L reachability. Odds read with the real BAL (jbal.js + jbal2.js in a sandbox) and a neutral life (stats 30, Tai mắt 3, rank 3, Lợi thế 0).

## Content (fix A files) — before → after (road-option-scan + own state sweeps)
| item | jrd_tt | jrd_dtq |
|---|---|---|
| 1c rare texts true when they fire | 1 → 0 (tt_mat ill vs childless wording) | 2 → 0 (binh: the Emperor hands the tally to the brother, «trước tên vua» dropped; vu: Đại Lý tự) |
| 1b rare reach (chapters .5–.10 with a path option) | tt_co 2 · oan 3 · tranh 3 · mat 5 (unchanged, carried now) | bien 2→3 · vu 0→4 · binh 1→5 · huynh 2→4 |
| 2 X-BEAT DOMINANCE / BOLD ≤ SAFE | 16 / 10 → 0 / 0 | 0 / 14 → 0 / 0 (28/28 x beats had bold base ≤ safe → 0) |
| 3 INVERTED e: | 0 | 4 → 0 (rt = written win lines) |
| 4 promised loss/gain not applied | 9 → 0 (tt_mat pact break = real promotion via jexam exDirectUp, seat-aware; cap texts read MATOVER) | ~19 → 0 (+ 22 dead flags wired or dropped; «Mượn bạc» debt collected via BAL.road.dtq_huynh.owe) |
| 5 history wording | 3 → 0 | 15 → 0 («Nhờ huynh trưởng/cha…», «Trẫm sẽ nghe tâu lại», gia ấn, Đại Lý tự, người trong ải) |
| 6 Hoàng hậu / Thái hậu assumed alive | 4 guards → 41 need hh + 27 hh-free siblings (tt_mat .5–.11) | 12 → 0 (need hh/th + hh-free siblings) |
| 7 continuity | 4 → 0 | 4 → 0 (+ dtq_vu .8 v-free t2 sibling) |
| 8 ONE CORE (RANKS clamp, number tables) | 1 → 0 | 2 + 4 tables → 0 (kitNumVi) |
| 9 VANPHONG (Khôn Ninh, cơ hội, bạn …) | 18 → 0 (Càn Ninh cung) | 3 → 0 (+ «Lệnh:» → «Nhắn thị vệ:») |
| smaller: tt_mat_6 c1 above the cap | 1 → 0 | — |

## Whole scan, all road files (after merging fix B)
| list | before (a05eec6e + new rules) | after (f1f18496) |
|---|---|---|
| INVERTED e: | 4 | 0 |
| X-BEAT DOMINANCE | 19 | 0 |
| X-BEAT BOLD ≤ SAFE | 55 | 0 |
| VANPHONG banned words | 47 | 0 |
| digits (text + function texts) / FREE GAIN / NO COST / DOUBLE LỢI THẾ | 0 | 0 |
| RD97L LOW (reach) | 8 (only .11 counted) | 0 |
| x odds unreadable (by hand) | 3 | 2 (cn_chu_9 x1, checked by fix B) |

## Tests (own http server; build f1f18496 unless noted)
| test | result |
|---|---|
| road-rare.js (new) | ALL PASS, 16 roads: E.r97 = rare ending; a .5–.10 path choice feeds f14.q97 and the .11 starts from it (muoi_*: path names only .11 options, counted by j97 there); rare fired → ✦ tag, title, Ngự tứ, origin finale = ✦ tag; mid-chapter recast told; 0 page errors |
| road-saves.js @755x1000@2 and @1180x820@2 (VP env) | 7/7 + 7/7: origin/main save loads, phase-1 save, mid-road tt/dtq/muoi/cn saves keep road+cast+plan and play on, 0 errors |
| road-full.js (first option) | tt_mat ✔ (fin «Trung cung là chỗ dựa»), dtq_binh ✔ («Cha về hưu vinh hiển»); cn_than ✗ 2: .10/.11 replaced by shared arcs (cast refused: identity-bound {v} gone by .10 → CN_NORECAST), origin ending told by the d69d6d24 fallback from .9 («Tên ghi vào tông phả»). Fix B: muoi_lau, cn_chu 10/10 |
| coop-e2e (live Worker, dev/index.html assembled) | fixa run1 57/59, run2 59/59; road-map-next d69d6d24 57/59; story14-p1-r3 c053ee92 59/59. Only fails anywhere = the 2 rebirth checks, flaky. road-b3 9 FAIL not reproduced (see Foreman B message) |
| chapter cards (j67 kit card) tt_mat_6, dtq_vu_9 @755x1000 + 1180x820 | open, 3–4 option cards with TỐN/GỢI Ý, overflow 0, 0 page errors (pictures lazy-load) |

## Open / for the reviewer
- cn_than (fix B's identity rule): when {v} dies/leaves the road stops at that chapter and the fallback finale tells the ending (no silent loss of the ending, but .10/.11 do not run). If the review wants .10/.11 to run, fix B needs v-free variant beats + cast(A) that allows an absent role — engine can add {keep} "absent ok" mode on request.
- tt_mat pact break uses jexam exDirectUp (a decree in the story: «Ân tấn phong»); switch to exGrace if the canon wants the exam even here. Seat full → text says so, no compensation.
- E fx with hh when there is no Hoàng hậu: harmless (no text says it), left.
- Rare-finale path names in muoi_* are .11-only (valid; fewer chances).

## HANDOVER
Done; nothing pending. Scratch (not in git): /home/user/wt/fixa_s (scan before/after, test logs, shots). Worktrees removed after push.

SẴN SÀNG KIỂM f1f18496fb931f8846ed3c8fbb4307c4af36e52a
