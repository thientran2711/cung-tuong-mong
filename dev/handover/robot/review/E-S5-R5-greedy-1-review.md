# E-S5-R5-greedy-1 — player review (pf / pt_su, greedy = min-maxer, iPad 1180x820, seed 2937005677)
PRIORITY #1 CHECK: OD 25/11 ~05:10–05:58Z rules | review/robot-realtap 69e41729 harness | claims E-S5 (this runner).
## 1. Summary
Persona greedy (harness bot=bold). Origin pf, road pt_su. Ended by DEATH: «Hồng nhan bạc mệnh» age 20, year 2, rank 0 (Phế phi · lãnh cung), 162 buổi, 1901 real taps, jsClicks 0, no exit pick. Real time ≈ 77 min (11:29–12:46Z, two harness switches, resumed once at buổi 21 on the same life). VALID life.
## 2. Scores (1–10)
a. First 15 minutes — 5: the first buổi chains dawn, Tổng lược, «Tin trong cung», bổng lộc, Phụ tuyến before the map; the goal (get favour, rank) is unclear and a hidden queued news dialog later makes «Sang ngày mới» a no-op (y1 t1 buổi 3).
b. Loop & pacing — 4: from y1 t2 the life sits in lãnh cung (Trường Môn viện); each buổi is the same page and the same Tư trang/Việc cards; nothing to optimise.
c. Buttons & UI — 4: «Sang ngày mới» silent no-op while a queued dialog exists (softlock ×4, no cue); «Tin báo» long list with ✕ off-screen (stuck 15 min); 150-tap no-clock loops on the map page «Vĩnh Hòa cung · Hòa Chương hiên» and «Trường Môn viện»; a pinned reward popup over the ending screen.
d. Story & drama — 6: the death (Hoàng thượng băng hà, Thái hậu xét lại chuyện cũ, lụa trắng tuẫn táng) is coherent and dramatic, but arrives in year 2 after a flat cold-palace stretch.
e. Characters — 5: the fellow cold-palace consort Tần Thanh Từ stands beside me every shot but never speaks or acts; new consorts are promoted (Uyển phi) with no link to me.
f. Choices & fairness — 4: «Đến chúc mừng (Sức −5)» vs «Không đến (Sức +3)»: the second is plainly better; for greedy min-maxer this is cost-only vs free (laws 2/3).
g. Rewards & feedback — 5: Bổng lộc chest with 3 named items is nice; but it pops over the death screen.
h. Mini-games — n/a in this life (none offered/played; offers 38 seen, 4 picked in the whole audit view).
i. Visuals & sound — 7: cold-palace scene (autumn leaves, broken lattice) and the two figures are beautiful and mood-fitting; no sound judged.
j. Co-op — n/a.
## 3. Top
Loved: the cold-palace scene art; the strong death line; Bổng lộc chest item cards.
Hated: «Sang ngày mới» that does nothing; the 150-tap map loops; same page every buổi in lãnh cung.
Would I play another life? Yes, but not this road: after demotion there is nothing to play for.
## 4. BUGS
1. [game] «Sang ngày mới» tapped, buổi does not turn, no dialog visible, Q=1 «Tin trong cung buổi này» (y1 t1 buổi 3; ×4). Dump/save in shots-E-S5-R5-greedy-1/*-dump.json.
2. [game/kit] «Tin báo» long news dialog: ✕/option below the inner scroll, stuck 15 min (resolved by reload).
3. [game] map page «Vĩnh Hòa cung · Hòa Chương hiên · Ở đây còn 2 người» and «Trường Môn viện … » → 150 taps without a clock step (×3 loops; the harness's own look/scroll gets back out).
4. [game] «Bổng lộc tháng giêng» reward popup drawn over the ending screen (shots-E-S5-R5-greedy-1/end.png).
5. [game] person dialog queue dedupe (known, F).
## 5. Suggestions (parking lot, law 18)
- Cold-palace road needs a goal/loop (earn back favour, a small project) so the stretch is not a wait.
- Say why «Sang ngày mới» is blocked («Còn tin chưa xem») instead of silence.
