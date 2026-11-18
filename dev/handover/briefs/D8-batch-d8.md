# BATCH-D8 builder (opus: merge + gates for go-live) — opened by Foreman D #8, 17/11 ~07:40Z
PRIORITY #1 CHECK: main's last go-live batch = 04:30 (main 6c4f21c3, CLAIMS row 'BATCH 04:30 LIVE'); main s30 cannot open sessions (lineage limit, FOREMAN_D_STATUS 04:50Z line) → D prepares ONE ready batch of its own PASSes so main only fast-forwards. Recipe = dev/handover/reports/batch-0430.md + batch-0415.md (merge order, quickcheck, coop-e2e vs LIVE, shots, CHANGE line).
Base: LIVE origin/main (6c4f21c3 or newer). Branch review/batch-d8. NEVER push main — main s30 fast-forwards after looking at your shots.
TAKE, in this order (all reviewer PASS; details in dev/handover/FOREMAN_D_STATUS.md 'PASS' lines + each review report):
1. review/suc-khoe-r2 7e1f42ca (BIG health+pregnancy; carries live-bug fix b37865b7 j15 WAGE→BAL.wage)
2. review/cloud-del-r1 7d67ba1f (SMALL UI)
3. review/item-ledger-solo-r1 be8dd7a1 (BIG items)
4. review/npc-death-wire-r1 9253ec1b (BIG people)
5. review/story-frame-r1 7be4cdc6 (BIG ch1–4: Bắc Địch frame, jreg.js)
6. review/batch-0032-oi-r1 36f86d3a (BIG ch1–4: origin intros + entry exam + kc-roads fix2 + render-cost)
7. review/npc-roads-fx-r2 1f49625d (BIG NPC roads; needs B's road engine = already live)
Generated files (index.html, sw.js, assets.json, built site): take main's and rebuild at the end; assemble.py lists = union, keep each branch's 'must be LAST' module order (check each PASS sha's assemble tail; jreg/jrbatch/jlag2 placement per their reports). If one item breaks a gate, drop THAT item (say why) and ship the rest; do not change game code beyond merge resolution.
Gates on the final head: one-core-guard 0, quickcheck.sh PASS (old save, render + buổi ≤ live +5 %), coop-e2e vs LIVE Worker ≥ live (60/60), each item's own main suite once (suc-khoe.js, cloud-save.js, item-ledger, npc-death.js, origins/tut-origins, origin-intros flow + entry-exam direct, npc-roads consorts/maids/men), old-save 16/16.
Shots Fold 755x1000@2 + iPad 1180x820@2: home, Mệnh truyện of a bd life, a Sổ mây page with the danger button, a Kẻ hầu card road line — LOOK at them (no overlap, feet not cut).
Then: write reports/batch-d8.md (merged shas, gates, shots, ONE combined CHANGE line) and end with "BATCH READY <sha>"; send_message to Foreman D. Foreman D hands it to main.

READ FIRST (handover branch claude/cung-tuong-mong-handover-hj0h8w): dev/rules/START_CORE.md + START_WORKER.md in full (GATE ZERO at the top), then ONLY the dev/rules/topic/*.md files your task touches. Owner rules are never summarised here — read them there. CLAUDE.md core laws bind you: KIT FIRST (dev/kit/KIT.md; missing part → stop + KIT REQUEST in dev/kit/KIT_REQUESTS.md), fix the WHOLE family (scan + before/after table), ONE CORE (every number from BAL), VANPHONG wording (no %), Fold 755x1000@2 + iPad 1180x820@2 first.
GIT/DISK: sparse worktree under /home/user/wt; fetch --depth=30 with + refspecs under `flock /home/user/wt/fetch.lock`; never full-clone; never push main; no pull requests. PUSH WIP OFTEN to your branch (accounts run out of quota — unpushed work is lost). Before any handover push: `grep -rn "^<<<<<<< " dev` must be empty.
CO-OP: owner 17/11 02:05Z — NO co-op patching (co-op goes to the thin-guest rebuild, Foreman B). coop-e2e is a regression guard only: your change must not make it worse vs live; do not fix co-op code.
GATES before SẴN SÀNG KIỂM / PASS: one-core-guard 0 fails, quickcheck.sh PASS (old save loads, render + buổi time ≤ live +5 %), your topic tests, Fold + iPad shots LOOKED at (no overlap, feet not cut).
REPORT: dev/handover/reports/batch-d8.md on the handover branch (pull --rebase, push). First line = the PRIORITY #1 CHECK line below. End with "SẴN SÀNG KIỂM <full sha>" (worker) or "PASS <sha>" / "FAIL <n> @<sha> + list" (reviewer). Then send_message to the coordinator Foreman D #8 = session_01964izEvrHqnQQMQqZ2g5t1 (if it fails, the report is enough — D reads it every hour). Then stop; the coordinator archives you.
MODEL: you were opened as the right model for the job; do not open sub-sessions yourself except the rollover rule below.
ROLLOVER (verbatim):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
