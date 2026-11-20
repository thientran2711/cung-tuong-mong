# errand-bal — BIG review r1 (E32r, opus) of be6302f6
PRIORITY #1 CHECK ('errand|j95dice|SRVA.errand|BAL.odb|betray|srvLaundry|srvPunW'): OD 16 (errand-scene UI + L1832 NPC purpose; no ruling on these numbers) | main: j42 SRVA.errand / betray kill:30, jagstaff:168 roll(SRVA.betray.kill) | review/*: review/errand-bal only (errand-scene = UI) | claims: E32 (SSK), E32r (this).

Reviewed: review/errand-bal be6302f6 · Review branch: **review/errand-bal-r1** · base = LIVE origin/main 463d3d70 merged (index.html/sw.js rebuilt).
Result: **PASS 0a707e656bc43c94ac4ee65a6d6a9e4d3daef22d** (r1 small fixes by reviewer; FF over LIVE origin/main 24dd2c62 holds)

## Laws checked
| law | result |
|---|---|
| 1 two-way | errand: her card and the NPC fallback read BAL.errand.offer + srvErrList — OK. **Found (fixed r1):** caught betraying — her: npwPick(kill vs Tân Giả khố, malice-based); NPC servant (jagstaff asMonth): flat roll(SRVA.betray.kill=30). Now both npwPick(srvPunW). |
| 4 one core | 47 literals → BAL.odb verified, values unchanged (spot diff of all sites). **Found (fixed r1):** the servant punishment family still typed: srvLaundry weeks 12 / 8 / 10 / 6, S.tin=10 / 5, S.tin<8 → BAL.ag.why.srv.pun.{betrayWk, spyOutWk, orderWk, orderTin, stealWk, stealTin} (values unchanged). My own rescan of roll/j95dice/chanceW/od/oddsCl(<literal>) over j42 j95 j95b j95c j95s jkc jkc2 jentry jagstaff jagstf2 jcmaid jstaff jagmaid: 0 left in code (jagstaff:13-14 are comments; j95 :426 catch formula = named queue family, see E32 report). |
| 7 wording | **Found (fixed r1):** «Mật báo chuyện…» card printed chanceW(30) + typed «12 tuần»; the 30 was the NPC roll, not her real outcome (twin of the spy card E32 fixed). Now chanceW(npwShare(...)) + BAL key. No % / number odds in player text; «tính ${entSkipRaw()}/10» is a score, as before (deterministic per art level, same value as the skip result). Shots (fold/ipad maid «Việc chủ sai») looked at: kit card, no odds numbers. |
| 11 whole group | the punishment family above was missed by E32; fixed + guarded (errand-bal.js check 5). |
| 2/3/5 balance | see below. |

## Changed values and play effect
- NPC servant errand chance 15 → 45 (fallback path only, agent loop off; default loop runs SRVA via jagstaff). Effect: an NPC maid/eunuch is away from her palace in one buổi slot ~45 % of days instead of ~15 %; places now her 4–5 (Thái y viện / Ngự hoa viên / Cần Chính điện / Đức Thọ cung / friendly palace) instead of Thái y viện / Kính sự phòng. Not a choice (law 2/3 n/a), no rank gate (law 5 n/a); real-world law 6b fine (people move about). Accepted: one act one number, the card value is the balanced one.
- NPC servant caught betraying: kill flat 30 → her rule, kill share by master malice (probe: malice 20/40 → 0, 50 → 33, 80 → 50 (sim 51 / 4000), 100 → 58). Cruel masters kill more, mild ones send to Tân Giả khố — same as her. Accepted (law 1).
- Entry exam: kc2Play skip/broken flat 5 → entSkipRaw (one not-playing value; E32 reason accepted).

## Gates (on review/errand-bal-r1 0a707e65 (final: LIVE 24dd2c62 merged))
- errand-bal.js PASS (self-test: injected srvLaundry(…,6) and roll(30) in jagstaff → FAIL as it should).
- one-core-guard PASS 3737 ≤ baseline (baseline shrunk 3739 → 3737); injected roll(20) in j42 → FAIL «NEW inline rule number».
- quickcheck PASS twice: after r1 fixes (render 208/252, buổi 1030/1195) and after the final-merge of 24dd2c62 (render 213/221, buổi 1043/1081; old save ok, core gates PASS).
- role-parity ×2 (on 9a015c6d = r1 fixes; the final-merge 24dd2c62 adds only kit-dress-picker, re-gated by quickcheck): ALL PASS both runs, outputs byte-identical (open baseline 17).
- coop-e2e: 68/68 PASS (live Worker).
- coop-errand (two seats): ALL PASS 16 (Fold host + iPad guest both maids: card + NPC fallback read 45, errand rate 41–46 %, 0 page errors). The r1 betray change is month-world logic (asMonth) covered by the coop-e2e one-world probe.

## Notes / queue (not this branch)
- An NPC servant who spies (s.spyFor) is never found out by her master (no spyFind in jagstaff) — the player maid can be; two-way gap for the role-parity / npc-purpose queue.
- S.tin=to?50:40 on a master change (j42 :307) and init S.tin=40+R(11) are start values, left.
- E32 put shots in git on the handover branch (dev/handover/shots/errand-bal/*.jpg, CDN 401); rule says shots never in git — 144 files already sit in that folder, coordinator to decide.

LAND READY errand-bal 0a707e656bc43c94ac4ee65a6d6a9e4d3daef22d
