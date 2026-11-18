PRIORITY #1 CHECK ('Q3 helper answers' / 'phá ngầm' / 'giúp qua loa' / 'RDHP' / 'BAL.road.hp'): OD L1876 (D-Q1 = "1") + L1601 (5) | main none (rdOdds jroad.js:28 rolls HER stats only) | review/* review/questline-audit (§4 Q3 spec), review/questline-q1a/b/c (voice slots reused, no overlap: they write NPC help asks, not her road) | claims none other on Q3

# QUESTLINE Q3 — helpers in HER road (worker E9, Foreman E)
Branch `review/questline-q3` from origin/main 5cbfd620. START_CTX ≈ 3 %.

## What was built
- **Tags (data, road files untouched)** — `dev/build/jrdhp.js` (assembled after jrd_cnv.js): `RDHP["<arc id>:<beat>:<option index>"]={hp}` for **216** «Nhờ …» options (all 220 of the .4 premise arcs + .5–.11 chapters incl. Bắc Địch, minus 4 that ask nobody: «Cảm tạ, không dám nhờ», «…không kèm lời nhờ», «Không nhờ ai», «Họ cha, nhờ công trận»). Roles: off 56 · go 30 · dad 25 · eun 18 · fam 18 · bro 16 · th 12 · srv 10 · n1 9 · hh 5 · v 4 · emp 4 · doc 3 · mom 2 · maid/man/foe/mis 1.
- **Numbers** — `BAL.road.hp` in jbal2.js next to BAL.nroad (ONE CORE): base weights per role [full, half, no, sab], nết table (24 nết), liking coefficients, Tâm cơ term, own-road term (NPC road with her as rival / last chapter won/lost), nợ ân term (j72 ledger), half (20), min odds, refusal cost noC (Sức −3), sabotage (Đức −3, rival oán +6), words, trK (a house head's nết counts ×0.3 toward his daughter).
- **Engine** — end of `dev/build/jroad.js` (rdHp*): wraps `PEND.j67` (word), `res67` (answer), `opts67` (refused option leaves the open hồi).
  - giúp hết lòng = option's own odds · giúp qua loa = odds − half (sure option rolls at 100 − half) · từ chối = option does not run, Sức −3, the SAME hồi comes back with the refusal line on top (existing A.rq line, kit speaker row) and that option gone · phá ngầm / mách lẻo = option fails + Đức −3 + road rival {v} oán +6 (jnroad «mách» shape; mách lẻo = a Nhiều chuyện helper).
  - Helper read from the real person: consorts (aff, nết, tamco, v.nr), own maid (loyal, nết), men, Tổng quản / Thái y (court af.me, mnet), father = house head (dad67 / trS().H), Hoàng thượng (S.sung, kTone), Thái hậu (S.th, thTrait), Hoàng hậu (NPC queen or S.hh); roles without a person use the role base only.
- **Word before she picks** — KIT: no new part. The option card's **Gợi ý row** (KIT §28.6 `kitHintRow`, part of the §6.2 option card) opens with «<helper>: <word>» through the documented per-option `hint` override (kitHint of the same option follows, so nothing else changes). Words: Sẵn lòng / Miễn cưỡng / Không ưa / Theo quy củ / Còn đắn đo / Lắm lời / Không rõ (unnamed go-between). Sabotage is never shown (except a Nhiều chuyện helper's leak = «Lắm lời»). A tagged sure option's risk chip becomes «có rủi ro» (it can now fail). **No K-Q1 filed.**
- **Answer lines** — `RDHPL` in jrdhp.js: 15 helper types × 5 (full, half, no, sab, lk) = 75 lines, none shared, xưng hô only via {goi}/{xung} → jvoice kSay (rank voice as Q1); a Sổ ghi line «<kind>. <line>» on every answer.
- **Never forced** — every tagged hồi keeps ≥ 1 option that asks nobody (static scan: 203/203). If a filter hides the free option at run time (2 hồi in a neutral life: dtq_huynh:c2, cn_than:c1), a refusal falls back to a plain failure of that option (no dead end). Endings funnel untouched: only the odds of HER option change.
- **Old saves / co-op** — untagged option = today's roll; A.hpNo is new and optional; old open hồi resolves (unit test). Co-op guest (nrGuest) → today's roll, no word; the co-op friend is never an NPC helper. `window.__hpoff=1` switches it off.

## Tests (all on the built site)
| Test | Result |
|---|---|
| `node dev/test/roadhp-scan.js <url>` — every «Nhờ» tagged, every tag on a «Nhờ», free option per tagged hồi, roles↔BAL↔lines, no digit/%/typed address word, no shared line | PASS (220 «Nhờ» · 216 tagged · 4 no-ask · 203 hồi · 75 lines) |
| `node dev/test/roadhp-unit.js <url>` — 8 roles (th, bro, off, dad, eun, go, fam, emp): word in hint, no number; full/half/no/sab each forced and checked (odds rolled, hồi reopened + option gone + Sức cost + hpNo cleared, Đức hit + forced failure); BAL.road.hp.half=33 read; untagged option unchanged; __hpoff and co-op guest = today's roll; old open hồi | PASS |
| `bash dev/tools/quickcheck.sh` | PASS (old save ok, perf new/live render 204/229 ms, core gates PASS) |
| `node dev/measure/road-option-scan.js` | unchanged (0 FREE) |

## Measures — `node dev/measure/road-hp-bal.js <url> 20 12 <styles>` (month loop, she plays her road; npc-roads-bal pattern)
**Answer shares by helper (census: every live NPC consort as helper, 19 650 draws, 20 lives × 12 years):**
| Helper | n | hết lòng | qua loa | từ chối | phá ngầm | mách lẻo |
|---|---|---|---|---|---|---|
| cold Kiêu ngạo (liking ≤ −15) | 160 | 4 | 26 | 41 | **29** | 0 |
| warm Ân cần (liking ≥ 15) | 800 | 70 | 23 | 2 | **5** | 0 |
| any Kiêu ngạo | 1890 | 21 | 25 | 35 | 19 | 0 |
| any Ân cần | 1300 | 48 | 28 | 17 | 7 | 0 |
| liking ≥ 15 | 6340 | 50 | 27 | 16 | 7 | 0 |
| liking −14…14 | 12410 | 25 | 28 | 28 | 15 | 4 |
| liking ≤ −15 | 900 | 13 | 28 | 30 | 22 | 8 |
Expected shares of tagged options actually shown, by role (on): dad 59/20/14/7 (after trK; was 28/24/10/38 before — fixed), fam 49–53/26–28/16–18/5, off 30/25/40/5, eun 25–39/35–38/18/8–19, th 4–77 (by her Thái hậu standing), hh 33–66. Words shown (1 999 cards): Sẵn lòng 958 · Miễn cưỡng 492 · Không ưa 408 · Lắm lời 132 · Theo quy củ 5 · Không rõ 4.

**Her road win rate (chapters won / mid / lost):**
| Bot | off (today) | on |
|---|---|---|
| best-odds player (rarely asks) | 19/59/15 = 20 % | 33/96/18 = 22 % |
| always-ask player, run 1 | 25/74/31 = 19 % | 25/56/12 = 27 % |
| always-ask player, run 2 (after trK) | 37/82/15 = 28 % | 21/71/19 = 19 % |
| always-ask, runs 1+2 | 62/156/46 = **23.5 %** | 46/127/31 = **22.5 %** |
Change is small and inside life-to-life noise (≈ 1.5 «Nhờ» asks per life over 12 years). 0 page errors in every run.

## Shots (LOOKED at; outside git, /home/user/wt/q3-shots, not uploaded)
`node dev/test/roadhp-shots.js <outdir>`: Fold 755x1000@2 + iPad 1180x820@2. Shot 1: hồi «Mất một thành» — option «Nhờ Thái hậu nói một lời», Gợi ý row «Thái hậu: Không ưa; chẳng được gì; …», other options unchanged. Shot 2: forced refusal — the same hồi back with the Thái hậu portrait line «Từ chối: Thái hậu khép mắt: «Ai gia già rồi, chuyện ấy Đáp ứng tự liệu lấy.»», the asked option gone, Sức 75 → 72. No overflow, no page error. (Header reads «Phụ tuyến» only because the shot script opens the hồi as a side thread.)

## Open / for the reviewer
- Phá ngầm is told at once in the answer line (true info); a delayed hidden-truth reveal (audit §4 Q3 wording) is not built — can come with Q2's npcTell once npc-chain-land lands.
- Bot sample of real asks is small (31–36 per 20 lives); the census is the large sample for the helper-type table.
- Numbers are first values, tunable in BAL.road.hp only.

## FIX 1 (review E9r, reports/questline-q3-review.md) — review/questline-q3 18f638ed, rebased on origin/main 711d7bad
| # | Finding | Fix | Check |
|---|---|---|---|
| 1 | raw {Xung}/{xung} for the whole `off` role (no speaker) | rdHpWho `case "off"` → {role:"x",rw:"quan"} (vi thần); rdHpLine falls back to a role voice (RDHP_SP) whenever a line holds {goi}/{xung} and the helper has no speaker | roadhp-scan (5) RENDER: every tag (216) × 5 lines × rank 1 / 6 × cast / no cast = 4 320 lines rendered through rdHpLine; FAIL on any {…}, empty label, double space; unit (h): every role in BAL.road.hp.w renders. PASS |
| 2 | non-officials tagged `off` | new role/type `dan` (BAL w [35,35,20,10], label «Người ấy», 5 own lines, no shared sentence) | before/after below |
| 3 | empty mis/foe → broken line | v/v2/mis/man with no person, foe/n1 with no name → the go set (lines, weights, label «Người được nhờ», word «Không rõ») | unit (g): empty mis, v, v2, foe, n1 → go, no {…}. PASS |
| 4 | iPad answer shot not forced | roadhp-shots zeroes tr / aff / rdRiv / owe / tcSab / rdWon / rdLost as unit force(), BAL restored after | both devices re-shot and LOOKED: Fold + iPad shot 2 show «Từ chối: Thái hậu khép mắt: «Ai gia già rồi, chuyện ấy … tự liệu lấy.»», option gone, Sức 75→72 |
| 5 | rebase | cherry-picked on origin/main 711d7bad (assemble.py: only + jrdhp.js), index.html / sw.js rebuilt | roadhp-scan PASS · roadhp-unit PASS · quickcheck PASS (168 s, old save ok, core gates PASS) |

Re-tag table (before → after):
| Tag | Option | off → |
|---|---|---|
| muoi_lau_5:s2:0 · muoi_lau_10:x1:1 | thầy kiện | dan |
| cn_than:s2:0 | thợ cung | dan |
| cn_tinh_5:s1:1 | đội trưởng canh phòng | dan |
| td_an:s1:0 | «Bỏ bạc nhờ ông chép lại» (a clerk) | dan |
| td_song_5:s2:0 · td_song_6:c3:1 · td_song_8:c2:2 | lái buôn · trạm dịch quân · đoàn quân lương | dan |
| thd_sach_8:c1:2 · thd_sach_11:s2:2 | học trò của cha · sĩ lâm | dan |
| nc_vuong_6:s2:2 · nc_vuong_9:c1:1 · bd_hoang_6:s2:2 · bd_hoang_9:c1:1 | phu nhân Thượng thư Lễ bộ | dan |
| cn_chu_8:c1:2 | đồng liêu cũ (old fellow servants) | srv |
| td_an_8:x1:1 | người đủ cao (unnamed) | go |
| nc_su_6:c1:0 · bd_hoa_6:c1:0 | {pa} = Hoàng huynh / Đại huynh | bro |
`off` now 38 (Ngự sử, Hàn lâm / học sĩ, Lại bộ, Lễ bộ, Hộ bộ, sứ thần / sứ quán / sứ đoàn, phó tướng, Thái bộc, lão quan bộ Lễ). Roles: off 38 · go 31 · dad 25 · bro 18 · eun 18 · fam 18 · dan 14 · th 12 · srv 11 · n1 9 · hh 5 · v 4 · emp 4 · doc 3 · mom 2 · maid / man / foe / mis 1. Answer lines 80 (16 types × 5).
