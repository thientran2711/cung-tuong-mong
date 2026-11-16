SẴN SÀNG KIỂM 06e4179ec98ae4eb09d78bf80e539cb473f0a03e
# Report — review/mem-upgrade (worker session_01DgYSWnbZAx5XWMeN9VzwiE, Foreman D item (1) MEMORY UPGRADE + ONE LEDGER (b) CAUSE ledger)

Branch `review/mem-upgrade` from origin/main e9c6021d. Full docs: `dev/PROGRESS_review-mem-upgrade.md` on the branch. START_CTX ≈ 4 % (own estimate, ~40k of 1M); finished below the rollover line.
Owner words read verbatim: OD 16/11 13:25Z (A), 13:40Z ONE LEDGER (13:35Z foreman-load and 13:55Z think-with-her also read).

## Done (extends jmem.js — no second memory system; all numbers BAL.mem / BAL.hook)
1. Per-person fade speed by personality: BAL.mem.fadeT[nết] = [good, bad] multipliers (Thù dai keeps grudges, Trọng nghĩa keeps kindness, Hiền lành forgives,
   Tham vọng forgets favours; servants' and the Emperor's traits too) × a fixed per-person spread (fadeJit, from the id) → same nết still differ.
2. LIFELONG memories (no fade, own cap): poison, musk, kidharm, pardon, frame, takeaway, gifttaint, demote, srvshield, rescue + any memory ≥ lifeMin + event swing ≥ lifeRel.
3. Memory-driven behaviour: will to harm survives Oán decay (danger floor from bad memories); a big remembered kindness blocks harm (OD:L35);
   revenge in kind (NPC mind weights); everyday dealings (npcSocial: whom they turn to + kind vs hostile acts); servants' loyalty in bribe odds.
4. CAUSE ledger in the jmem ledger: every act between two people records who/what/whom/why (reason kinds tra/on/mem/ghen/oan/ghet/ngo/nong/tv/than/net/toi/su/chon),
   memories link to their cause (m.c) so a retaliation names the earlier act. Hidden from her; main reads `causeLog({to:"me",limit:10})` in the console.
5. Co-op: NPC / Emperor / Thái hậu / servant memories and causes now live on those objects (world state, host authority, same both sides); her own stay personal.
   Old saves migrate once. Fade is deterministic.

## LUẬT SỬA CẢ NHÓM — act families (scan table in PROGRESS)
10 families wired: runAct schemes (all ACT keys, both ways, NPC↔NPC, co-op), giveTo, empAct, talk, q72End, event swings, SOC everyday acts (NEW memories),
punish (NEW), servAct (NEW), bribeServ/threatServ (NEW). Not wired (no single target / other workers): see PROGRESS "Not wired".

## Measure (bots, dev/measure/mem-behaviour.js; before = main e9c6021d, after = branch; controlled cases + seeded sensible-bot run 6×300 steps)
| case | before | after |
|---|---|---|
| M1 share of an NPC's target picks on her: none / remembers her rumour | .045 / .136 | .047 / .152 |
| M2 NPC she poisoned (Oán 70): harm band month 0 / month 24 (memory weight) | 2 / 1 (25) | 2 / 2 (70, lifelong) |
| M3 share of "rumor" in that NPC's menu: none / remembers her rumour | .189 / .189 | .268 / .423 |
| M4 helps she gets from a Hiền lành NPC in 3000 social turns: none / pardoned | 86 / 90 | 88 / 403 |
| M5 same rumour (25) left after 12 months, 8 people | 1 for everyone | 0 (Hiền lành, Nhu mì, Tham vọng+Cả nể) … 21.4 (Hiểm độc+Thù dai) |
| M6 harm band at Oán 70: none / pardoned | 2 / 2 | 2 / 0 |
| natural run: memories (holders) · lifelong · cause records · without a reason | (her only) | 98 (her 31, consorts 66, emp 1) · 24 · 292 · 0 |

## Tests
- dev/test/mem-upgrade.js 755x1000@1 + 1180x820@1: ALL OK (29 checks each + card "Kỷ niệm" with "khắc cốt ghi tâm", no overflow, no page errors). Card shot looked at.
- dev/test/mem-coop.js: ALL OK (host+guest act on one NPC in one week → PROTOCOL §4 merge3 → both rebuilt sides see the same memories/causes from their own side; fade identical).
- dev/test/memories.js (D26, fade checks updated for the new rules): ALL OK.
- coop-e2e (live Worker): 59 ok, 0 FAIL. coop-world: 3 FAIL (friend visibility/position) + whereOf crash, IDENTICAL on main e9c6021d → pre-existing, not this branch.
- trong-check (old main save → branch): OK, no errors. evtruth-bot 2 lives: OK, no errors.
UI: no new component, no CSS (KIT FIRST); only text inside existing kitRows/quote line. No KIT REQUEST.

## QUESTIONS (design choices beyond the owner's words — for Foreman D to route)
1. Show causes to her? Today hidden (OD 13:40Z "hidden from her"). Option: in the person card "Kỷ niệm" rows, add "vì …" only for causes she could know (she saw it / a maid told her).
2. Emperor / Thái hậu acting on their memories (night picks, punishment weight, Sủng gains) — not wired: balance impact; owner/balance call.
3. Her own fade speed: she has no nết, so she fades at the base rate (+ a fixed spread). Should her fade follow something (Tâm cơ? an origin)?
4. Lifelong list (above) — add more big events (child born / lost, first night, rescue in events) when those events call memAdd(..,"rescue"|..,{life:1}).
5. Co-op friend's OWN memories of NPC acts on her: the friend entry is rebuilt each week, so they are not written to her blob yet (needs a jcoopworld write-back like rl/ro).
6. Coordination: forced emotion events (item B) and the item ledger (a, review/item-ledger) should call `causeAdd(by,to,act,{s,n,d,y})` and read `memTop/causeQuery`,
   so the item ledger and the cause ledger agree (theft / confiscation / search causes). API in PROGRESS.

## Handover (if a successor is needed)
Branch is complete and pushed; resume from PROGRESS. Worktrees removed.
