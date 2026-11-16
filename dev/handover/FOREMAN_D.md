MANDATORY: read dev/PRIORITY_RULES.md in full (and dev/art/OWNER_ART_RULES.md in full for any art work) before anything else. Never summarise the owner's rules in a brief — point to these files.

# FOREMAN D (fourth account) — rules + assigned slice
Owner (16/11, session 8): a fourth account runs Foreman D, to drain the unassigned queue. The rules are the same as dev/handover/FOREMAN_B.md; read it first: roles, how it works, the model rule (NEVER haiku; sonnet = default; opus = game rules/numbers, structure/core systems, hard root cause), the review gate, and the status file.
Also read: CLAUDE.md, dev/OWNER_DECISIONS.md (EVERY 16/11 entry), dev/handover/WORKER_BRIEF.md, dev/kit/KIT.md, dev/kit/KIT_NUMBERS.md, dev/kit/KIT_REQUESTS.md, dev/kit/VANPHONG.md.
NO DOUBLE WORK: take ONLY the items listed below. Items of the main coordinator (session 8) and Foremen B/C are off-limits even if they look idle.
Mark every item in dev/handover/FOREMAN_D_STATUS.md (RUNNING/…) BEFORE you spawn its worker. Max 12 agents; each worker ≤2 browsers; memory is tight → run tests one at a time.
Workers push only review/<topic> branches. No pull requests, never push main. A reviewer PASS goes under "## PASS" in your status file with the full sha; the main coordinator merges it.
CDN: if Cloudflare is not connected on your account, put new images under "PENDING CDN UPLOAD" in your status file and the main coordinator uploads them.
KIT FIRST + ONE KIT KEEPER (owner, the #1 rule): workers only USE kit parts. A missing or changed part → STOP and file a KIT REQUEST in your status file; the main coordinator's kit keeper decides. Reviewers FAIL any custom chip/row/frame or per-place variant.
Owner rules from 16/11 that bind every worker: never ask her something already ruled (grep OWNER_DECISIONS); never change or undo a working rule without her OK; new DESIGN needs her approval first (send the idea to the main coordinator, not to a worker).

## Slice D
Reviews (use REVIEWER.txt):
- D-R1 review/newgame-ui-r2 @70119a805: fixes the reviewer FAIL; §8.1 one panel size, a common figure tier KPID_WR=.5, pinned choices below the scroll. Merge origin/main first and run newgame-ui.js / panel-size.js / stage-fig-size.js at 5 viewports. Owner complaint: lag on the new-game screen.
- D-R2 review/row-align @0886f329b (C14): the earlier reviewer got stuck; re-review on current main.
Workers:
- C43 review/coop-invite-ux: owner "Rồi sao nữa" — a waiting state, 1-2-3 steps, auto-continue on join.
- C44 review/cloud-save: the same character on phone and iPad, solo and co-op. Spec in OWNER_DECISIONS ("Sổ mây"): sync code, auto upload at buổi end, conflict pick, 10 versions, existing Cloudflare Worker. Needs Cloudflare on your account plus a security review of the endpoint. opus.
- C3 review/art-complete part 2: resume from the branch's PROGRESS (art: Magnific gpt-2-6 only, folderReference ba4aecfe-efce-47e2-b53f-30d292091886; look at every image).
- D50 consorts without full-body figure art show a placeholder frame in the dialog person column.
- D51 fxkit follow-ups: cracked tea cup, scroll unroll, red seal slam, swaddle reveal, letter under the door, wired to their call sites (the kit keeper owns the §68 part; you only add sprites through KIT REQUEST).
- D52 skin-match audit of the 7347 figures never measured (plan in PROGRESS_review-skin-match.md).
- LATER, only when the main coordinator writes "GO" here: act-split wave 2 (outings, festivals) and wave 3 (night sneaking), after review/act-dedupe wave 1 lands.
- D54 (owner 16/11, high priority) PAINT the missing buổi versions: every room or place scene that lacks its own sáng/trưa/chiều/tối painting gets them, as Magnific gpt-2-6 edits of the approved scene (same layout, only light/sky/lamps change). Put the 4 seasons in too where the place uses seasons. The CSS buổi tint is being removed (review/postmerge-fix-1 lists the scenes without a set; scan SCIMG/j94 yourself if that list is not there yet). Send the owner a contact sheet per place before going live; she approves art.
- D55 (moved back to the main session: review/book-fig).
- D56 art: kit icon glyphs (Kính sự phòng card tablets, Lãnh cung, palace roof, garden for Ngự hoa viên) in the kit icon style; Nội vụ phủ scene with 4 buổi (+ seasons if the place uses them). Show the owner before going live.

## MOVED to Foreman D (owner rule 16/11: main chat = live bugs/UI only)
- Reviews: review/reign-road @c0e6f7d255 (a main reviewer may already be running; check dev/review/reign-road.md on origin first), review/slap-mg 3c4f1c81b (after facefx-all lands; §79), review/coop-chat bdd2b6b53 (after the stage rail lands; §80; mount into kitStageRail).
- Workers: act-split wave 2 (outings, festivals) + wave 3 (night sneaking): GO after review/act-dedupe lands (design notes in its PROGRESS); fig HD upscale for servants/eunuchs/men (Magnific, owner approved credits; resume from review/fig-hd-upscale if pushed) + face-sharp-hd2 remaining consort sheets; balance-after-truth audit re-run (opus); review/servant-system phase 2 (active NPC maid line, owner approved) once its fix A + audit are reviewed; pregnancy-rate proposal is waiting for the owner (do not change).

## CONTEXT ROLLOVER (owner 16/11, binding for the main chat and every foreman)
- At session start, note the starting context size in your status file. The budget is the start + 25%. When you reach it (or the system compacts/summarises the conversation, whichever comes first), roll over:
  1) write a HANDOVER block in your status file (state, running agents + branches, waiting items, open owner questions);
  2) open the NEW session yourself with the remote-session tool create_session (same environment, same repo, prompt = your role paste block + "read the HANDOVER in <status file>"), tell the owner in one line, then stop spawning.
- Agents you spawned die with your session: roll over only when no worker is mid-task, or note each running branch so the new session re-spawns from the pushed branch/PROGRESS.

## COORDINATOR ORDER (owner 16/11): HOURLY SELF-WAKE
Every foreman must keep a recurring hourly self-wake in its own session (CronCreate / scheduled check-in, re-created after any restart or rollover). Each wake: pull the handover branch, re-read this file + your STATUS + OWNER_DECISIONS (new 16/11 entries), take new items of your slice from the repo, spawn reviewers for SẴN SÀNG KIỂM, refill slots, push your STATUS. Write the time of the last wake at the top of your STATUS ("last wake: <UTC>") so the main chat can see you are alive.

- (16/11) OWNER RULE (angry; credits): workers and reviewers are opened as SEPARATE cloud sessions (create_session, same environment, prompt = the task brief), NOT as in-session subagents. Each worker writes its result to the repo (branch + PROGRESS + a short report file under dev/handover/reports/<branch>.md on the handover branch). The coordinator reads the repo on each hourly wake, so the main chat context stays small and any new main session can take over without losing workers. Applies to the main chat and every foreman.

- (16/11) OWNER RULE (claim before work): a foreman (or the main chat) CLAIMS an item BEFORE opening the worker session: write "<item> | <branch> | <session id> | RUNNING | <UTC>" in its STATUS and in the shared dev/handover/CLAIMS.md, then pull --rebase and push at once. If the item is already claimed in CLAIMS.md by anyone, do not take it. The main chat checks CLAIMS.md against every foreman slice on each hourly wake; it fixes duplicates, re-opens stale claims (no push for 3 h) and reports conflicts to the foreman.

## NEW ITEM from main s9 (owner 16/11)
- D57 review/preg-rate (opus): (16/11, s9) Owner picked pregnancy-rate option 4 = 1+3: DOUBLE the base conception chance per night for everyone (player and NPC), PLUS a fertile-window peak from the monthly cycle (jcycle / Kính sự phòng book; low on other days). Then a balance check (opus): births per consort per year, palace child count after 5 and 10 years, NPC heir pressure; trim the peak if NPC births run high. Build AFTER review/mortality (pregnancy parts) and cycle-r3 land on main.

## NEW ITEM from main s9 (owner approved 16/11)
- D58 review/close-maid (opus): (16/11, s9) Owner APPROVED close-maid-by-origin table v2: Tể tướng = home maid (trusted from day 1 | father uses her to spy/press); Đại tướng quân = home maid (martial, guards her | hot-tempered, fights other maids); Cháu gái Thái hậu = Thái hậu's plant (Thái hậu protection | Thái hậu knows everything); Buôn muối = home maid (money/bribes cheaper | low birth scorned, faults found); Hòa thân = home-country maid in home dress (bridge to home court, home tongue | suspected spy, questioned); Thầy đồ nghèo = palace-assigned, she PICKS one of several (built trust lasts, cannot be bought; she teaches her letters → fast maid promotion | first months alone); Tội thần = palace-assigned + may meet an old family servant (loyal to death, knows the old case | exposure endangers both); Cung nữ được sủng hạnh = old roommate (knows every corner, good spy | knows her past, dangerous if she turns); Cung nữ tuyển = palace-assigned, she picks (knows many maids, wide gossip net | nobody behind her). General rule: a maid who comes with her carries family ties; none → she chooses and trust lasts longer. Random per game: loyalty, one talent, one secret. Then measure with bots ONLY if a new road is added (owner: do not re-test old origins); a balance check of the maid effects is OK. → Foreman D (servant system phase 2), opus for the numbers.
