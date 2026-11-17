# START_MAIN — verbatim owner rules

## ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).


## SPREAD THE WORK — EVERY WAKE, NO REMINDER (owner 17/11 ~02:30Z, angry: she has reminded this session after session)
Owner (verbatim): "Tại sao lần nào cũng phải để tao nhắc vậy ta? ... tao có tới 4 cái tài khoản lận, không có đưa qua bớt để mà làm đi. Rồi tài khoản D, đó, tài khoản C, đủ thứ hết mà không có chịu đưa qua đi ... Một mình ôm hết bên này, trong khi là tao lại đang muốn cái game chơi lẹ." (with OD:L1286 hourly load check, OD:L1197 main = her bugs + UI only, OD:L1229/L1237 whole jobs, never split).
MANDATORY on session start AND on every wake, BEFORE anything else, written as one line in HANDOVER: "LOAD: main running n (owner bugs/UI/go-live only) | B free n | C free n | D free n | moved: <items>".
1. Read FOREMAN_B/C/D_STATUS last lines + CLAIMS. 2. Every main-held item that is NOT her bug, NOT UI, NOT go-live → move it, as a WHOLE job, to the foreman with free seats (write the ORDER in its STATUS file). 3. Every NEW non-UI item is written straight into a foreman's STATUS, never opened by main. 4. A foreman with free seats and items left = coordinator fault. 5. Every takeover prompt and every wake message repeats this block's first line.

Holds: main chat only (what the main chat does itself, how it talks to the owner).

Read in full at start by: MAIN. Reading sets: MAIN = START_CORE + START_FOREMAN + START_MAIN; FOREMAN = START_CORE + START_FOREMAN; WORKER = START_CORE + START_WORKER; REVIEWER = START_CORE + START_WORKER + START_REVIEWER; ART = START_CORE + START_WORKER + START_ART. Then read ONLY the dev/rules/topic/*.md files your task touches (list in dev/PRIORITY_RULES.md).

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L1100 16/11 (session 8) — Owner angry: KIT FIRST is the #1 rule since day one (owner)
[OD:L1102] - Coordinator admission: the rule already exists (CLAUDE.md core law LUẬT KIT TRƯỚC, WORKER_BRIEF line 1, HANDOVER PRIORITY RULES); session 8 failed to enforce it (hc-portrait shipped a card-only frame variant; reviewer passed it).
### OD:L7 2026-11-14
[OD:L143] - (23:55Z) Owner: the wide sweeping skirt pose is OK — do not raise pose issues she didn't complain about; only answer exactly what she asks (here: is the Quý phi outfit right for her rank).
[OD:L150] - (00:45Z) Owner: as soon as the book UI is finished, put it live immediately (fast kit review + Fold/iPad play-test, then merge fold-layout+page-curl to main).
[OD:L220] - (02:55Z) Owner: 'Đẩy lên live đi' + from now on builds that passed review (kit reviewer PASS) go live right away, no need to ask. Pushed main = 355d6d58 (loading: app updates itself to the new build).
[OD:L223] - (03:15Z) Owner: the main session may push images to Cloudflare itself (including overwriting fixed images with the same name), no need to ask.
[OD:L248] - (05:28Z) Owner annoyed: the Thỉnh an Hoàng hậu no-relation-gain bug was reported on 14/11 and still not fixed (old session didn't log it). → HOTFIX top priority (review/hotfix-thinhan), live as soon as it passes review.
[OD:L1345] - (16/11 15:35Z, s18 chat) Owner: "giao tài khoản C vẽ toàn bộ mọi thứ đi. Cái gì liên quan tới vẽ là bên đó làm hết" → the MAIN SESSION no longer draws (not even samples); missing art → Foreman C inbox. (Overwrites OD:L270 "main may draw art".)
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L519] - (≈18:05Z, owner) Worker watch reminder: once every HOUR (not 30 minutes). 30-minute reminder deleted, hourly schedule kept (minute 32).
[OD:L524] - (~18:30Z, owner) REPLACES the 18:20Z ChatGPT setup: no per-item audit, no schedule, no gate. WEEKLY CHATGPT AUDIT only when she asks "đoạn audit tuần này" (one English paste block; report docs/reviews/chatgpt/Weekly_Audit_<date>.md via PR; Claude then merges, answers every finding ACCEPTED/REJECTED, fixes BLOCKING first, reports in Vietnamese). CHATGPT IDEA REVIEW only when she asks "đoạn điều phối tuần này" (one English paste with her open ideas from dev/IDEAS_OPEN.md; answer docs/ideas/ChatGPT_Ideas_<date>_VI.md via PR; Claude summarizes with adopt/park/drop). Done: main ebbbd9eff (AGENTS.md rewritten, CLAUDE.md rules, dev/IDEAS_OPEN.md); branch chatgpt-claims deleted.
### OD:L588 15/11 ~20:05Z — Big owner batch (recorded by session 6, assigned by session 7)
[OD:L595] - Animation/frames ideas: once ideas are given, BUILD them without waiting for approval. Any future needed animation: just do it.
### OD:L698 15/11 ~22:00Z — Sounds: no owner approval (owner)
[OD:L699] - Game sounds go straight into the game; do NOT send them to the owner for listening/approval. Coordinator + workers judge by measurement and by meaning-mapping; owner reports anything she dislikes while playing.
### OD:L942 15/11 (session 8) — Contest intro layout: picture left, info right, scrolling contestant box (owner screenshot)
[OD:L946] - (session 8) Owner (verbatim): "Hình như có thợ vẽ rồi đó. Coi thử. Tôi nói rồi. Trước khi cho thợ làm gì phải coi có ai làm chưa mà." → Checked: yes — review/night-end-r1 already has painted night pictures by tone (ne-night-warm/normal/cold/lonely, KIT §62; not live, review FAIL). Coordinator mistake: assigned new night art without checking. Fix: pic-dupes told to drop it; night-end-r1 worker re-spawned to fix its FAIL list AND reuse those pictures for the in-night dialog by tone AND convert dark night/other dark panels to the light kit panel (C30 merged into B1). Coordinator rule reaffirmed: LUẬT ƯU TIÊN SỐ 1 check (OWNER_LEDGER + git grep main/review/*) BEFORE every new assignment.
### OD:L1051 16/11 (session 8) — Pick the model by task weight (owner)
[OD:L1063] - (16/11, session 8) Owner: "Khi nào phần chơi chung lên game thì báo tôi." → coordinator must notify her (push notification + chat) the moment coop-timer-r1 (stuck-buổi fix, reconnect, countdown, friend status chip) is fast-forwarded to main.
### OD:L1140 16/11 (session 8) — Lifespan answers; Dư đồ purpose unclear (owner)
[OD:L1143] - (16/11) Care lengthens a life only a little, with a hard ceiling (careMax 3 years); fate (số trời) rules. Owner was ANGRY at being asked what happens in co-op when one player dies: the rule already exists (L94: reincarnate at once into the same room with the friend). RULE FOR ALL SESSIONS: before asking the owner anything, grep OWNER_DECISIONS. Never ask about something already ruled.
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1148] - The rank-up reward "+1 servant per rank" (promo-rules-r1) was fine. The coordinator was wrong to put it on hold. HOLD LIFTED, and it goes into merge-train-2. RULE: never change or undo an existing working rule without asking her first.
[OD:L1197] - (16/11) OWNER RULE: the MAIN chat focuses on the bugs and UI problems she meets while playing; every bug she reports is fixed urgently here. Work that is not UI and not a game bug (new features, systems, art batches, balance, audits) goes to the other foremen.
### HANDOVER.md
[HANDOVER.md:L89] - Think WITH the owner: for every idea she gives, weigh it and propose how (or whether) to do it; don't just obey blindly.
[HANDOVER.md:L15] Owner: Victoria ("sếp"). Reply to her in Vietnamese only, as "em", short, no questions unless truly needed; she reads on a Samsung Galaxy Z Fold (inner ~1510x2000 portrait, cover ~904x2316). This is her standalone game, NOT Đại Hy (Đại Hy has its own main session; send any Đại Hy word of hers to MAIN 495 session_01Rc5AsLpa5TYV5oV2gBycQy via send_message).
