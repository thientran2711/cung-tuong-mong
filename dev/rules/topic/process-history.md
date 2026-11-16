# process-history — verbatim owner rules

Holds: older process rulings and session history (main chat reads when needed).

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L56] - (16:30Z) Owner very upset: person card (Phi tần) no longer the layout she approved — sticky header (from kit-2b) drawn over the card's own copy: info twice, overlapping, actions clipped, card at bottom of screen. URGENT hotfix: one sticky header only, no duplicate, opaque, actions scroll beneath, all person-card types. Lesson: main session must play-test inside the game on Fold before merging any kit change.
[OD:L61] - (18:00Z) Owner: the consort picker strip must ALWAYS stay visible on Fold (never scrolled away to make room); and she rejects partial deliveries — ship the slim top bar, stage overlays, scene fix, picker and person card together as one build. Lesson: never show her a screenshot that still has a known complaint unaddressed.
[OD:L67] - (18:20Z) Owner: her Tư chất (Sắc/Tài/Tâm cơ/Đức) must be visible at all times on phone too (in the slim top bar), not only on the room home. Always send her BOTH Fold and iPad screenshots together.
[OD:L138] - (22:45Z) Owner: speed up co-op with several workers (target: play with a friend tonight). Split: lead/backend (Worker+DO+PROTOCOL), B client+lobby, C shared-world gameplay; MVP first (reborn as cung nữ; tiểu thư later).
[OD:L146] - (00:10Z) Owner angry: I sent emotion shots taken on an OLD base (rejected layout: Bảng phẩm vị button, Tư chất dropdown, small room strip). RULE: every screenshot sent to the owner must be on the approved current layout (review/fold-layout / page-curl base). Workers must base UI work on it; coordinator checks shots before sending.
[OD:L193] - (09:05Z) Coordinator: to let owner play with a friend sooner, ship review/coop (includes book-release 1b90526) as one live release after kit review; iPad 3–4 people, dialog scroll, full flap come in the next update.
[OD:L195] - (09:30Z) Scheme minigames: first worker stopped by a safety classifier (likely the poison-dose game). Scope narrowed to abstract games: Nghe ngóng, Truyền lời, Mặc cả; no poison minigame.
[OD:L207] - (01:45Z) Owner allowed pushing the 2 maid fix batches (wip/maid-art-fix, wip/maid-art-b-fix). Re-checked: both (and 89dd550/7b3f527/212db69, maid-art-c) already PASSED and have been on main since 14/11 — the note in HANDOVER.md was stale; nothing left to push.
[OD:L254] - (05:50Z) Reviewer 2: balance FAIL (j92 wearables collide with the new Tư trang) → needs a worker to merge WD wearables into Tư trang before merging balance/emotion/difficulty/lost-items/appearance/schedules2/outside. Bot on main: HH 54% (high), early death 29%.
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L483] - (15:45Z) Owner asked to HAND OVER to a new session and CLOSE this one (credit cost). Save everything the owner said.
[OD:L514] - (17:45Z) Session 5 archived on owner's order.
[OD:L518] - (≈18:02Z, owner) Owner going to sleep, tells session 6 to keep working. (PASS → push main; drawing/pushing CDN needs no asking; samples needing her choice get collected and reported tomorrow morning.)
[OD:L521] - (≈18:20Z, owner) Add ONE ChatGPT COORDINATOR chat (VAI: ĐIỀU PHỐI): (a) reviews the whole game, (b) each sheet pasted S<n>; gives strengths/gaps/add-change, historically right palace intrigue (with sources), ideas from good games; each idea with risk, feasibility, size, how to catch/undo, ONE verdict; numbers only proposals. Doesn't write rules/numbers/code/design, no UI/art/voice. Pushes its answer to docs/ideas/ChatGPT_S<n>_Answer_VI.md (PR "ChatGPT S<n> answer") then tells the owner in 1 line. CLAUDE.md rule: every owner idea/bug/ruling on rules/numbers → ONE S<n> paste block for the COORDINATOR chat in that same reply; next turn merge + summarise for the owner + put the approved parts into the design as PROVISIONAL; S_LOG.md on chatgpt-claims; unanswered S<n> re-listed in every report.
[OD:L522] - Done: main 62a0506ac (AGENTS.md, CLAUDE.md, docs/reviews/chatgpt, docs/ideas; synced OWNER_DECISIONS/WORKER_BRIEF/KIT_REQUESTS to main); branch chatgpt-claims 24f69f701 (QUEUE 3 items, audit-fast, OPEN_AUDITS, S_LOG S1).
### OD:L579 15/11 ~20:30Z — Session handover; story chapter labels; bạc-alternative balance (owner)
[OD:L580] - Session 6 is heavy: hand over to a new coordinator session; workers report to the new session. Session 6 stays only until the remaining workers have reported, then is archived.
### OD:L588 15/11 ~20:05Z — Big owner batch (recorded by session 6, assigned by session 7)
[OD:L589] ANSWERS to open questions:
[OD:L590] - Son's birth = direct promotion, no exam. Daughter's birth = exam. Servant/mama road (cung nữ road) = exams too.
[OD:L593] - Ngự tứ pet life-save stage: owner asked coordinator to recommend (Linh thú now vs Trưởng thành) → coordinator decides; pet bar label "No" vs "Đói": owner did not pick → coordinator decides.
### OD:L706 15/11 ~22:30Z — Pet decisions (owner)
[OD:L707] - Ngự tứ pet saves her life only at the LINH THÚ stage (keep as now, coordinator's recommendation).
[OD:L708] - Pet bar label stays "No" (do NOT change to "Đói").
### OD:L618 15/11 ~20:15Z — Calendar ideas, Trân nữ seal on event frames, rosy skin mismatch (owner)
[OD:L619] - Calendar: owner asked for more ideas to make it useful → coordinator listed ideas (below); per owner rule, build them without waiting.
[OD:L620]   Ideas: (a) her own days: birthday, Emperor's/Thái hậu's/Hoàng hậu's birthdays (Vạn thọ/Thánh thọ/Thiên thu) with gift reminders; (b) stipend day, Nội vụ phủ issue days, monthly thái y visit if built; (c) KNOWN deadlines: exam/khảo hạch dates, tuyển tú year, pregnancy due month, children's birthdays and school exams, pet growth; (d) "sổ hẹn": acts she schedules ahead (send a gift on day X, visit someone) + reminder the day before; (e) prep checklist per festival (what contest, what art/item to prepare, ready ✓/✗ from her inventory and art levels); (f) lucky/unlucky days from the weekly quẻ (only known ones); (g) weather forecast for the coming tuần if she has the right servant/skill; (h) tap a day → past log of what happened that day (memory); (i) moon phases (rằm/mùng một) for rites; (j) co-op: the friend's important days visible too.
### OD:L706 15/11 ~22:30Z — Pet decisions (owner)
[OD:L706] ## 15/11 ~22:30Z — Pet decisions (owner)
### OD:L710 15/11 ~22:35Z — Calendar ideas all; art level-up scene; performance budget (owner)
[OD:L711] - Calendar: build ALL coordinator ideas (a)–(j) from 20:15Z.
### OD:L780 15/11 ~21:45Z (session 7 clock) — Move house to a new account (owner)
[OD:L781] - Owner: move now. Session 7 sums up everything and packs the handover so that a NEW main chat (session 8) on a NEW account continues all of it: re-open EVERY unfinished worker; no worker and no owner idea from today may be lost.
### OD:L784 15/11 (late, session 7) — Her face blurry on stage (owner screenshot)
[OD:L786] - (owner, last message to session 7) The account runs on paid usage: once workers stop reporting, archive this chat. → Session 7 stopped its remaining agents (their WIP is on their branches) and archived itself.
### OD:L788 15/11 (session 8 start) — Takeover by main session 8 on the new account (owner)
[OD:L789] - Owner's opening order to session 8 (verbatim, Vietnamese): "Việc đầu tiên: đọc dev/handover/HANDOVER_TO_SESSION8.md ... làm đúng mục 0 → 5: dựng máy, kiểm kết nối GitHub/Cloudflare/Magnific, tạo lịch theo dõi mỗi giờ, giao người duyệt cho mọi nhánh 'SẴN SÀNG KIỂM', mở lại MỌI thợ đang dở theo file PROGRESS của nhánh, rồi giao hết việc còn lại trong dev/handover/OWNER_LEDGER.md mục 'UNASSIGNED'. Không được bỏ sót thợ nào hay ý nào của sếp. Ghi mọi lời sếp vào dev/OWNER_DECISIONS.md ngay trong lượt đó."
### OD:L883 15/11 (session 8) — Buổi change page-flip animation looks odd (owner)
[OD:L886] - (session 8) Owner (verbatim): "Cái vụ số khắc trong ngày có thợ làm rồi mà." → Confirmed: review/time-spill (j76 "thời gian liền mạch trong ngày") was merged to main on 14/11. review/khac-day was told to build on j76/jtime4 (no second system) and find why the CẦN khắc chip is still per buổi.
### OD:L899 15/11 (session 8) — Giao tình relation picker wastes space; press-fx URGENT (owner screenshot)
[OD:L903] - press-fx made URGENT → worker review/press-fx spawned immediately.
### OD:L1051 16/11 (session 8) — Pick the model by task weight (owner)
[OD:L1051] ## 16/11 (session 8) — Pick the model by task weight (owner)
[OD:L1058] - (16/11, session 8) Owner (verbatim): "Các cái ván nào mà chơi một mình bị mất rồi thôi kệ đi, khỏi đi." → no recovery of lost solo saves; save-slots worker focuses on cause + separate slots only.
### OD:L1076 16/11 (session 8) — Owner rulings: start children, factions, don't ask small things, head marker, no double work across accounts
[OD:L1077] - Owner (verbatim summary): children at start must be SMALL and the SAME age group (1–4 tuổi), not many ages — grown kids leave her no chance; to keep succession lively give ~4 kids at start (now there are 4 princes). Weak Emperor → Thái hậu / quyền thần strong: OK, let the player CHOOSE A SIDE. "Cái nào mà làm cho game hay hơn thì cứ làm, không cần phải hỏi tôi đâu ... không có thời gian mà đọc lại ... mấy cái lặt vặt như vậy mà hỏi nữa." Old saves: obviously new rules only for new games. Co-op: first-born need not be a big advantage.
[OD:L1078]   → RULES: start = ~4 small children (1–4 y), mixed sexes, no đích tử; heir choice weighs talent/mother/favour, not birth order alone; faction road (Emperor / Thái hậu / quyền thần) with consequences. COORDINATOR RULE: decide small/obvious things myself (recommend + do), only ask the owner when it truly changes the game's direction; never ask about old saves (new rules = new games).
[OD:L1087] - (16/11, session 8) Owner (verbatim): "Ủa, có thấy khác gì đâu ... y chang như cũ ... lỗi mất tên các cung ở hàng chân dung cũng còn mà." Screenshot dev/handover/refs/owner-hc-nochange.jpg (iPad portrait, right after 'Đã mở bản mới'). Live site serves the new code (deployed 01:57Z, HTML cache 10 min). → verifier spawned to check on live in iPad HOST mode and fix if the reviewer's direct-mode test missed it. Coordinator lesson: reviewers must test the real iPad host mode (rot.js), not only direct mode.
### OD:L1123 16/11 (session 8) — Hành sự vs Dư đồ vs Tài nghệ: owner approves the idea before any worker
[OD:L1124] - Owner: if the map keeps only shortcuts it is useless; if everything moves to the map, Hành sự is useless. Each must have its own purpose. Tài nghệ study is duplicated between Hành sự and the Tài nghệ tab and still has no fix. Owner wants the IDEA shown to her first, before a worker builds it.
### OD:L1146 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
[OD:L1146] ## 16/11 (session 8) — Owner corrections (angry: "nói một đằng làm một nẻo", "phá mọi thứ")
### HANDOVER.md
[HANDOVER.md:L52] - Adults 18+ for every cast member and the player; man–woman only; intimacy fade-to-black; consequences at full weight.
[HANDOVER.md:L76] Test sizes from now on (CSS px, Playwright viewport + deviceScaleFactor):
