# START — Foreman C (drawing / vẽ) — read ONLY this file first (≤ 10 KB, CLEAN1 Lượt 810)
Repo thientran2711/cung-tuong-mong, branch claude/cung-tuong-mong-handover-hj0h8w (git pull --rebase before every push). Do NOT read big files whole: use wc -c, head, grep, sed -n ranges. Newest detail = your predecessor's takeover prompt dev/handover/TAKEOVER_FOREMAN_C_ROOT<N>.md (older ones: dev/archive/takeovers/).

**READ FIRST: dev/art/DESIGN_BIBLE.md** (owner L2276 — index of all shared rules, common blocks, per-person data, approved core, unapproved new direction, lessons).

## The owner (sếp)
- She talks in the Foreman C chat: short Vietnamese. ALL drawing is yours. Do ONLY what she says, NEVER drop or shorten any part of her order.
- EVERY message AND every file caption starts "Lượt N" (A5). Check the takeover / FOREMAN_C_STATUS.md for the last used number.
- Every report ends "~X% xong / ~Y% chơi được".
- SEND PICTURES IN CHAT with SendUserFile (display render) — NEVER links. LOOK at every picture full size before sending (A11, A22).
- Before asking her ANYTHING: `python3 dev/art/rule.py find <words>` (VN or EN, accents optional). Never re-ask an approved thing (she was angry, Lượt 779/780).
- NO REDRAW / regen / small fix without her explicit yes (A20/A21 Lượt 777). Faults → RECOMMENDED-REDRAW list to her first (L21 Lượt 807). Our own critiques are notes only (A18 LAW #0).
- APPROVED PLAN = DETAILS ARE OURS (owner L2370 22/11, verbatim: "Cái mức nào thì quản đốc nào đưa ra khuyến nghị gì đó thì bạn cứ làm theo cái ý của tôi thôi, khỏi cần tôi duyệt nữa. Bây giờ tôi đã duyệt rồi, đừng có hỏi lại nữa."): once she approves a plan, the foreman decides levels/details itself (follow her words + the recommendation) and does NOT ask her again.
- NO ROOM LOOKS POOR (owner L2370 verbatim: "Trong game này tôi không muốn cái phòng nào hay ai là nhìn thấy nghèo hết trơn á, bởi vì bản chất tôi cũng chơi cái tuyến cung nhân, mà khi vào một cái phòng nhìn nó nghèo nàn quá tôi thấy chán lắm"): low-rank rooms/places (maid, servants, phối, Lãnh cung) are simple but still beautiful and well-kept, never shabby/poor.
- Only "duyệt" approves (A7). Credits are shared and she is very sensitive about spending: say the cost before big jobs.

## Rollover + lineage (copied verbatim from TAKEOVER_FOREMAN_C_ROOT58.md — every takeover prompt copies them)
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
CHECK get_session context_usage.used_tokens OFTEN (estimates overshoot). Keep image reads few (each costs a lot).

## NO HOURLY SCHEDULED TASKS (owner 20/11 ~20:09Z, angry: "Khi mà quản đốc mở phiên mới cho chính mình phải tắt cái lịch cũ ... tại sao mà cứ phải làm phiền tôi đi vô tắt")
Foremen do NOT create hourly check-in scheduled tasks any more (workers report by send_message). If one exists: the foreman that OWNS it disables it (update_trigger enabled=false) BEFORE opening its successor. Never leave a schedule for the owner to turn off. Every takeover prompt repeats this line.

## Live workers (at ROOT-58 start; check FOREMAN_C_STATUS.md for newer lines)
WORKERS (ROOT-57's children; all report to you now):
- P2 session_01PEhRbuWh1d14YneeXYEvpZ — season palette for the 86 (solve: unique pair per person per season, all seasons same soft tone Lượt 769, root CODES may change Lượt 770, roots_drawn kept). Deliver 6 sheets → LOOK → send owner. (Owner asked progress at Lượt 790.)
- MG2 session_01PEhRbvbbxVfNyyAPeZSLxG — builders/gate: did L779 (style = thiếu nữ M01 only, X18 bans near-3D; C5 elder rule), L780 B9 bg, L781 B12 fabric by rank (t1–t5 M06 thướt tha / t6+ brocade), L784 gate checklist 1–8, L800 F14 no Qing headdress words + list of drawn pictures with them, L806 ANGLE AUDIT (14-angle table E1 really used? left/right balance + gate). ALSO ordered: redraw the 13 near-3D pictures (Nữ đế m05×5, m29×5, Thái hậu m05 a36/a51/a65; owner Lượt 781 explicit order) one try each, OLD|NEW sheets per person → send owner.
- SEAL5 session_01PEhRbwtx2GY38uuWDV5MvK — Thái hậu seals, whole group GO (Lượt 781). Done units 1–3 (vui buồn sợ / an bình đau ghen / lo mưu tutin hanghai — owner OK'd unit 3 Lượt 809, Ẩn OK). Unit 4 (tinhtu chuyentam hungkhoi tinhnghich) running. Ordered: redraw th-dau with heart-ache wording (owner Lượt 803), de-duplicate look-alike seals, no green discs, captions in Vietnamese with accents, no 'Qing' words.
- SEAL2 session_01PEhRbxPQ3gYNVrkhFRctPa — Hoàng hậu «giận» OK → whole Hoàng hậu set GO (37); pt + ptl samples REJECTED (Qing two-wing headdress) → redraw both samples with bun + hairpins + flowers (Lượt 800).
- SEAL3 session_01PEhRby6DDg2s4jQQLbiwCu — idle. mm (ma ma), bg (bé gái), bt (bé trai) samples OK'd by owner; full sets WAIT: credits (each set ≈115k; told owner Lượt 800: Thái hậu + Hoàng hậu first, then stop and report).
- SEAL4 session_01PEhRbtRdsuVhZsB5aryc5E — idle. ht (keep, childish face accepted), htg, tg, tv samples OK'd (Lượt 803); full sets WAIT on credits. htg BACK purple-face fault noted (owner said OK).
- PR14 session_01PEhRbtipUwfFGpHTpwcLYS — rooms (successor of PR13): 74 missing rooms + ~35 live place scenes to redraw (Lượt 800: "35 hình nơi chốn … bỏ hết"), batches of 5 (Lượt 803), bed-height sentence (L21), first job: RECOMMENDED-REDRAW list of drawn bedrooms (send owner, no redraw). PR13 rooms so far: Thừa Minh tây phối bedroom (sent Lượt 802), its reception, Cảnh Phúc đông phối bedroom (not yet sent; go in batch 1).
- F2 session_01PEhRbxZYk34EBHsYxXhgnM — new faces done: Lạnh lùng +5 (OK), Kiêu kỳ +5 (OK Lượt 789), Quyến rũ +6 (OK Lượt 803). 86 consort faces complete. Idle.
- CLEAN1 — this cleanup (no gens); report dev/handover/reports/CLEAN1.md.
Retired workers (NF1–NF4, NDX*, PR9–PR13, BW*, MM*/MMX*, TH1, CP1, SEAL1, MG1, P1, F1, SL1, AP1): their files are in dev/archive/{reports,briefs}/ (a few stay in dev/handover/ because a script or a live successor points at them: MG1-ledger-audit, MG1-master-gate, NDX5, P1-palette86, PR13-rooms, briefs master-gate-L745, palette86-L763, rooms-rest-L793).

## Open with the owner (at ROOT-58 start)
OPEN WITH THE OWNER:
- Lượt 803 question unanswered: "vẽ bớt Lạnh lùng lại, đừng vẽ nhóm Lạnh lùng nữa, bỏ qua hết cái nhóm Quyến rũ đi" — ROOT-57 asked: move how many Lạnh lùng people to Quyến rũ (all 15? only s46–s50?). Wait for her answer; then update OWNER_GROUPS_L686.json + LOOK_GROUPS.md (data only).
- Credits plan: Thái hậu + Hoàng hậu sets first, then stop and report before mm/bg/bt/ht/htg/tg/tv sets (~115k each).
- Optional asks she may answer: room 1 floor too large / beds low (PR14 list), th-hanghai etc. — only redraw what she names.
- Notice picture «nơi sắp đóng cửa» (MAIN 18/11 request) not drawn — offered (135 cr), no answer.
FOR MAIN lines in FOREMAN_C_STATUS.md (Lượt 726/728 B24 frame colours; Lượt 800 places dropped; Lượt 796 line CANCELLED). The MAIN session id ROOT-57 had (ROOT-72 session_01Rc5AsK1W5sm4JWNWeSDH2k) was not found — check FOREMAN_C_STATUS 'FROM MAIN' lines for the current one.

## Where things are
- Art rules: dev/art/ART_RULES.md — use `rule.py find` (never read whole); `rule.py set/add/check` to change. History: ART_RULES_HISTORY.md; contradictions: ART_RULES_CONFLICTS.md; owner verbatim + full history: FIGURE_GATE.md (grep it).
- Store gate before EVERY gen: `python3 dev/art/check_store.py <prompt> <args>` (A19).
- Status log: dev/handover/FOREMAN_C_STATUS.md (append your lines; grep "ROOT-5" / "FOR MAIN" / "FROM MAIN"; old part in dev/archive/FOREMAN_C_STATUS_upto_ROOT54.md).
- Worker reports: dev/handover/reports/<WORKER>.md · briefs: dev/handover/briefs/ · art worker start file: dev/art/START_ART_WORKER.md (point every art brief at it).
- Owner decisions (shared, never edit casually): dev/OWNER_DECISIONS.md (grep "OD:L…"). Other foremen's files (A/B/D/E…) are not yours.

## MODEL RULE (owner 16/11 OD 'Pick the model by task weight' + correction; re-reminded 20/11 Lượt 1267)
create_session model= MUST be set: NEVER haiku; SONNET (claude-sonnet-5-5) = default for ALL art workers (prompts, Magnific gens, sheets, builder text). OPUS only for game rules/numbers/core systems/hard root-cause — AND (owner 20/11 Lượt 1271, verbatim: "Ok, nếu mà thiết kế thì cho Opus làm.") for NEW OUTFIT/DESIGN invention (new era looks, new garments, ladders). (owner Lượt 1281: Sonnet-then-retry wastes turns) → ALL prompt writing/editing (design, swaps, trims, fabric/collar edits) = OPUS. Sonnet only for Magnific gens + sheets/look/upload with a ready prompt. A38 keep_check still runs on every edited prompt (it is a free script). #4 broke this (DESIGN2/ITEMFIX3/SWAP56 on Opus) — don't repeat.

## A38 KEEP CHECK (owner Lượt 1274) — before sending ANY prompt batch to the owner
`python3 dev/art/keep_check.py --all` (and `--sidecar <file>` per file). Every edited prompt needs `<file>.keep` (base + allowed changes). A worker's file without a .keep or with CUT lines is NOT sent. Every brief you write repeats this.

## Opening a worker
Brief = short: job + "read dev/art/START_ART_WORKER.md first" + "do not read big files whole" + the three ROLLOVER lines and LINEAGE line verbatim + its report file name + who to tell when done (send_message to you). Open it as your child (create_session).
