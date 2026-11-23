# M112 SELECTION SCENE (cinematic tuyển tú / nhập cung) — opus BIG, MAIN 112, TOP PRIORITY
PRIORITY #1 CHECK ('tuyển tú'): OD 10 | ledger 1 | claims 0 | main 15 | review/* 0 | archive 15. ('giá đáo'): OD 2 | main 0. ('selection hall'): main 4 (jentry.js, jkc2.js kc2SelPlay/kc2SelDo:519-521, joi.js:14 tiểu thư Điện tuyển kcDien → kcEnter/kcTraveD, cung nữ/hòa thân kc2Enter).
REUSE (do not rebuild): dev/build/jentry.js entScore(road,raw,art) = the ONE score rule (BAL.entry.w) → entTier → ceiling / −1 / −2; jkc2.js selection exam; joi.js entry flow; j2.js:28 Nhập cung event; j27.js:49 tuyenTu() news.

OWNER WORDS — read VERBATIM in dev/OWNER_DECISIONS.md (handover branch): rows 23/11 ~21:50Z (CINEMATIC SELECTION SCENE), ~21:55Z (tests = mini-games, no word games; OD:L1250), ~21:58Z ("cái hay của game ... mới đầu game ... có thấy wow"). Also the event layout A rows 23/11 ~20:20Z/~20:22Z/~20:25Z/~20:27Z (figure LEFT full body, never clipped, box may lie over the figure; event picture = stage background shown clear then blurred; info fixed, only options scroll — dev/test/dialog-fixed.js).

GOAL: first-impression WOW at the start of every NEW life. Scene: her figure stands in the line of tú nữ → eunuch calls «Hoàng thượng giá đáo» / «Hoàng thái hậu giá đáo» / «Hoàng hậu giá đáo»: each royal enters (motion per dev/MOTION.md, full-body figure, name/title intro card) → each royal in turn speaks (layout A dialogue) and sets her ONE EXISTING kit mini-game (law 5: harder by the origin's ceiling) → the scores feed the one entScore → ceiling/−1/−2 rule unchanged → outcome shown (giữ thẻ bài / ban hoa per history report) → rank given. Cung nữ origin = Nội vụ phủ / ma ma version of the same scene. Each origin's existing road (direct, tiểu thư Điện tuyển, cung nữ, hòa thân) keeps its logic; the scene wraps it. NEW lives only; old saves load untouched. sfx/music cues from the existing sound set.

STEPS:
1. Wait for / read dev/handover/reports/HIST-TUYENTU.md (expert session_01Rc5AsLFDccEnVfxsc5Ag99, ETA ~30 min) — read the code meanwhile.
2. MOCKUP VIDEO first (mp4 screen recordings, Fold 755x1000 + iPad 1180x820; extract and LOOK at frames): a staged run of the whole scene with current art. Push the mp4s to the handover branch dev/handover/refs/ (or CDN) and send_message MAIN 112 "SELSCENE MOCK READY <paths>". MAIN shows sếp; build only after her OK (or her fixes).
3. Build on review/selection-scene from newest origin/main; BIG tier (new-life flow): tests for every origin × branch entry, old-save load 16/16, dialog-fixed, balance-core, quickcheck; report dev/handover/reports/selection-scene.md; send "READY FOR REVIEW review/selection-scene <full sha>" to MAIN 112.

LAWS: read dev/rules/START_CORE.md (18 LAWS first) + START_WORKER.md. KIT FIRST: use kit parts only (layout A parts are being built by KIT KEEPER #12 session_01Rc5AsLLYr8sHGVYNmfHpMF on review/mock-stage — reuse; a missing part → STOP that part, KIT REQUEST in dev/kit/KIT_REQUESTS.md + tell MAIN). ONE CORE: every number from BAL. Words per dev/kit/VANPHONG.md (cổ trang, odds ladder Mong manh/Hiểm/Khó lường/Tùy duyên/Có cơ/Vững/Rất vững, no %). ART: you draw nothing; missing painted hall/line-up background → tell MAIN (MAIN orders Foreman C). Never ask the owner about pictures. Line-break law (new work): what fits on one line never wraps.
Worktree: sparse detached under /home/user/wt; fetch --depth=30 under flock /home/user/wt/fetch.lock; never full-clone; push review/selection-scene only (never main, no PR). Roll over at START_CTX+25 % (ceiling 60 %): write handover in your report, tell MAIN 112 (MAIN opens your successor).

## ADDENDUM 1 (MAIN 112, 21:58Z) — WAITING YARD + ROUNDS + KNOWLEDGE (owner OD 23/11 ~22:05Z, read verbatim)
- WAITING YARD before the royals arrive: tú nữ stand chatting; she may TAP girls to chat and get acquainted, limited by a visible countdown (~20 s, BAL) and a cap (~3 girls, BAL). Each girl met → FACE known (j61 stage 1); NAME only if that girl's nết + rank/birth make her give it (existing rule OD 17/11 ~05:28Z; proud high-born girls do not) — reuse the existing greet/name-reveal code, no new logic; same both ways (law 1). Her rank stays unknown. (Corrected by ADDENDUM 5.)
- CEREMONY IN 3 ROUNDS: she is in round 3. In rounds 1–2 she watches real NPCs (law 6b: girls who exist in this life's roster) receive «giữ thẻ bài» / «trả thẻ» (and «ban hoa» = phỏng theo phim, per HIST-TUYENTU); unknown girls show as «một tú nữ», befriended ones by face + name. Who passes/fails comes from the real NPC roster outcome (not random text).
- KNOWLEDGE: she learns ranks ONLY of girls in her own round + girls she befriended; everyone else stays unknown until met later in the game.
- Include the yard + rounds in the MOCKUP VIDEO.

## ADDENDUM 2 (MAIN 112, 22:03Z) — STORY + NARRATOR; OVERWRITES the «giá đáo» entrances (owner OD 23/11 ~22:12Z, read verbatim)
- The scene is a STORY told by a NARRATOR (the palace ma ma, OD:L1432 — reuse that narrator voice/figure).
- Flow: arrival → waiting yard (tú nữ chatting, 20 s acquaintance, Addendum 1) → she is summoned in with a few girls (her round) → Hoàng thượng is ALREADY SEATED, Thái hậu + Hoàng hậu beside him. NO «giá đáo» announcements, NO name labels at first (the player infers who is who from look/seat/words).
- Frames in order: Thái hậu → Hoàng thượng → Hoàng hậu; each speaks (layout A) and sets ONE existing mini-game (Thái hậu theu, Hoàng thượng dan, Hoàng hậu huong; NVP/ma ma kim+theu for cung nữ).
- Each round ALSO moves her thiện cảm with THAT royal up/down by BAL amounts (two-way, law 1/4), besides feeding the combined raw → entScore → rank (cut unchanged).
- Rounds 1–2 watching (Addendum 1) stay. Remove all entrance-announcement beats from the mock video.

## [RE-INSTATED by ADDENDUM 18] ADDENDUM 3 (MAIN 112, 22:05Z) — RESULT = −1 / SAME / +1 (owner OD 23/11 ~22:15Z verbatim: "Tôi nghĩ là thấp hoặc cao hơn cái bậc của thân phận mình có, 1 bậc là được rồi, 2 bậc là nhiều quá.")
- Selection outcome is now origin rank −1 / same / +1 (OVERWRITES ceiling/−1/−2 of OD:L1250; canon already overwritten in dev/rules/topic/story-roads.md:31).
- Apply in the ONE place: jentry entTier + kc2SelDo (direct road), jkc tiểu thư Điện tuyển road (kcDien → kcEnter), cung nữ placement analogous (one step lower/same/higher in the maid ladder). Steps from a BAL key (e.g. BAL.entry.step = [-1,0,1]); every text prints the BAL value. Clamp at ladder ends.
- BIG review (rank/progression). NEW lives only; old saves untouched. Update the mock video's result frame.

## ADDENDUM 4 (MAIN 112, 22:12Z) — WAITING-YARD DRAMA, one per life (owner OD 23/11 ~22:20Z, read verbatim)
- Each new life plays ONE yard drama before she is summoned; generated so no two lives match: drama SEED pool (HIST-TUYENTU adds real/drama seeds to its report as §7) × ACTORS chosen from the real tú nữ of this life by nết (BAL.net / jnet.js; traits j1.js:45) + their relations: a bully, a victim, bystanders who each act by nết + thiện cảm (defend / join / stay silent / fetch the ma ma).
- She can act too: defend / join / mediate / stay out — EQUAL value (law 2), each with gain AND loss (law 3), two-way (law 1). All numbers in BAL (law 4).
- Outcomes carry into the game: known (j61 npcKnows), thiện cảm changes, grudge / friend marks on those NPCs (real people, law 6b). Seeded per life (deterministic from the life seed; co-op: each player's own life).
- Show one drama in the mock video.

## ADDENDUM 5 (MAIN 112, 22:15Z) — CORRECTION (owner OD 23/11 ~22:25Z, read verbatim)
- Waiting-yard chat reveals the FACE (j61 stage 1); the NAME only when that girl's nết + rank/birth make her give it (existing rule OD 17/11 ~05:28Z). Same both ways. Reuse existing greet/name-reveal code — no new logic. Addendum 1 text fixed in place; in rounds 1–2 a girl whose name is unknown shows by face only.

## ADDENDUM 6 (MAIN 112, 22:17Z) — HOW MANY TÚ NỮ (owner asked, OD 23/11 ~22:28Z; MAIN 111 recommendation, build unless she objects)
- 12 tú nữ in the yard incl. her = 3 rounds × 4 (BAL key, e.g. BAL.entry.yard = {n:12, perRound:4, kept:4}).
- About 4 kept (giữ thẻ bài) incl. her; the rest «ban hoa» (sent home) but remain REAL people who exist afterwards (law 6b: they go home / marry / may reappear).
- Kept girls join the existing start roster (≈12 consorts, OD 17/11 ~04:32Z; cap 20) — no duplicate people.
- Screen: 4–6 figures visible at a time, the yard PANS so figures stay full size on Fold 755x1000 (never shrink to fit, never clip — layout A rules).

## ADDENDUM 7 (MAIN 112, 22:20Z) — HER ROUND (owner OD 23/11 ~22:32Z, read verbatim)
- Girls in HER round (round 3): she knows their face + their result/rank, and they know hers (two-way).
- MAIN (unless she objects): the presenting eunuch reads each girl's name + father's office aloud when the round is presented → round-mates' NAMES known too (j61 stage 2). This is the only extra name source; girls of rounds 1–2 are known only through yard chat (Addendum 5).

## ADDENDUM 8 (MAIN 112, 22:25Z) — THREE TEST TYPES (owner OD 23/11 ~22:36Z, read verbatim; OVERWRITES "each royal sets a mini-game")
- The 3 royals set 3 DIFFERENT test types, one each: (a) MINI-GAME (existing kit mini-game, per HIST-TUYENTU §4 mapping); (b) ĐỐI ĐÁP — the royal asks, she picks a WAY to answer (tone/stance), which pleases or displeases by THAT royal's nết; no right/wrong trivia; (c) HÀNH XỬ — a surprise incident (e.g. a cat thrown at her feet, tea spilled on her dress) → options what to do.
- Each test → contributes to the combined raw → entScore (−1/0/+1 rank, Addendum 3) + thiện cảm with that royal (Addendum 2).
- MAIN pick (unless she objects): which type each royal gives is drawn per life from that royal's nết (seeded); a POOL per type (HIST-TUYENTU §8) so tests rarely repeat across lives; options of (b)/(c) equal value with gain + loss (laws 2/3), numbers in BAL (law 4). Harder by origin ceiling (law 5).
- Cung nữ origin (Nội vụ phủ/ma ma) uses the same 3 types.

## [VOID by ADDENDUM 17] ADDENDUM 9 (MAIN 112, 22:27Z) — ENTRY-RANK CAP (MAIN 111 recommendation to owner, OD ~22:40Z; number = MAIN's)
- Keep ±1 (Addendum 3) with two guards: (1) tests harder by origin rank (law 5, already in brief); (2) a BAL entry-rank CAP: BAL.entry.cap = the highest rank ANY origin can reach on entry TODAY (the current top origin's ceiling under the old rule) — so +1 never lifts a new life above what the game already allowed; clamp after the ±1 step. Report the chosen rank name + before/after table per origin in your report.

## ADDENDUM 10 (MAIN 112, 22:30Z) — POOL SIZES + NO-REPEAT (owner OD 23/11 ~22:40Z, read verbatim: 5–10 dramas far too few)
- YARD DRAMA ≥ 60 seeds, each COMPOSED from parts (actors by nết/birth × incident/object × place × bystander reactions × outcome) → thousands of variants. HÀNH XỬ ≥ 40. ĐỐI ĐÁP ≥ 40. Mini-games: the full kit list allowed by BAL.entry.word.
- NO-REPEAT memory per player ACROSS lives (stored with the player's life log / meta save, survives new lives): a seed/test is not shown again until its pool is used up, then the cycle restarts.
- CONTENT is written by MAIN's sonnet writer seats into dev/handover/content/selscene/ on the handover branch (yard.md, hanhxu.md, doidap.md, one entry per block in a fixed machine-readable format agreed in §8 of HIST-TUYENTU.md). SELSCENE builds the GENERATOR + seen-memory + a loader that turns those files into a data module (one source), and validates every entry (roles fill, options equal value, gain+loss, BAL keys only).

## ADDENDUM 11 (MAIN 112, 22:36Z) — DRAMA KNOWLEDGE (owner OD 23/11 ~22:44Z, read verbatim)
- She STEPS IN (defend / join / mediate) → she knows the FACES of all participants and they know hers (two-way); NAMES by nết + rank (the defended girl likely gives her name in thanks; a proud bully may throw her name/family as a threat) — via the existing j61 stages.
- She STAYS OUT → she sees participants' faces only, no names; they do NOT register her.

## ADDENDUM 12 (MAIN 112, 22:40Z) — YARD GREETING = EXISTING RULE (owner OD 23/11 ~22:50Z, read verbatim)
- Follow OD 17/11 ~05:28Z + j61.js exactly: greet → face known; equals (tú nữ) exchange names unless proud/cold by nết; if no name, offer the existing «Hỏi danh tính» (j61.js:180/190, odds BAL.odb.j61) — in the yard it costs COUNTDOWN SECONDS (BAL key) instead of khắc; on refusal, the existing refusal line explains why. Reuse code; no new logic.

## ADDENDUM 13 (MAIN 112, 22:43Z) — RANK COMES BY EDICT (owner OD 23/11 ~22:53Z, read verbatim; OVERWRITES "rank known at the ceremony" in Addenda 1/7)
- At the ceremony only KEPT (giữ thẻ bài) vs BAN HOA is known — no ranks for anyone.
- A few days later (BAL key, in-game days) the conferral EDICT (thánh chỉ sắc phong): short scene — a eunuch reads it at her lodging, she kneels → she learns her OWN rank (−1/0/+1 rule, cap Addendum 9).
- Round-mates' and befriended girls' ranks become known as the edict news spreads (news line); everyone else's rank only when met.

## ADDENDUM 14 (MAIN 112, 22:58Z) — YARD = ONE BUỔI OF 4 KHẮC (owner OD 23/11 ~23:05Z, read verbatim; OVERWRITES the seconds countdown in Addenda 1/6/12)
- The waiting yard is ONE BUỔI of 4 KHẮC using the normal khắc system — NO seconds countdown anywhere.
- She takes actions of her choice (greet, Hỏi danh tính, step into the drama, observe, tidy her dress, rest …), each costing khắc exactly as in the game (existing costs; Hỏi danh tính uses its normal khắc cost, not seconds).
- The yard drama and NPC moves advance with the khắc (who talks to whom, the drama escalates on its own if she does nothing). Acquaintance cap = whatever 4 khắc allow (no separate ~3 cap).

## ADDENDUM 15 (MAIN 112, 23:00Z) — SẮC PHONG NEWS SCREEN (owner OD 23/11 ~23:08Z, read verbatim)
- Right after the edict scene: a clear SẮC PHONG NEWS screen listing each girl she now knows (round-mates + befriended): face + name (if known) + new rank, ONE KIT ROW each (kit part only; missing → KIT REQUEST). Never skipped, never silent.
- Standing whole-game rule (every time she learns a name/rank/face/relation/secret she gets a clear notice) is a separate MAIN job KNOW-NOTICE; use its shared notice part once it exists (coordinate via MAIN).

## [VOID by ADDENDUM 17] ADDENDUM 16 (MAIN 112, 23:05Z) — CAP VALUE (owner OD 23/11 ~23:12Z, read verbatim; OVERWRITES the cap value of Addendum 9)
- The +1 must work for the TOP origin too: Cháu gái Thái hậu (enters Quý nhân) + top result → Tần. BAL.entry.cap = top-origin entry rank + 1 (Tần), so the cap never blocks a +1.

## [VOID by ADDENDUM 18] ADDENDUM 17 (MAIN 112, 23:10Z) — OWNER FINAL: OLD RULE (OD 23/11 ~23:16Z, she picked «Cách cũ (trần)»)
- Entry rank = OLD rule OD:L1250: origin rank is the CEILING; good → that rank, poor → −1, very poor → −2. The existing kc2SelDo / entTier math stays EXACTLY as on LIVE (no new BAL step/cap keys).
- ADDENDUM 3 (±1), 9 (cap) and 16 (Tần) are VOID. No new life starts above its origin rank. (Canon dev/rules/topic/story-roads.md:31 restored.) The edict (Add. 13) announces the rank from this rule.

## ADDENDUM 18 (MAIN 112, 23:15Z) — OWNER FINAL PICK «±1, trần Tần» (OD 23/11 ~23:25Z, read verbatim; she wants lives to move faster; overwrites ~23:16Z «cách cũ»)
- Result = origin rank +1 / same / −1 (ADDENDUM 3 re-instated). BAL.entry.cap = Tần, clamp after the step (e.g. Cao Ly princess entering at Tần: good/middling → Tần, poor → Quý nhân; Cháu gái Thái hậu Quý nhân: good → Tần).
- ADDENDUM 17 is VOID; Addenda 9/16 stay void (this addendum is the cap). Canon dev/rules/topic/story-roads.md:31 updated by MAIN 111. BIG review; new lives only; per-origin before/after table in the report.

## ADDENDUM 19 (MAIN 113, 22:19Z) — HÒA THÂN EXCEPTION to the Tần cap (OD 23/11 ~23:28Z, read verbatim in dev/OWNER_DECISIONS.md)
- Hòa thân princess origins (nc Cao Ly, bd Bắc Địch, pf Phù Tang) follow ±1 with cap PHI (not Tần). The +1 above the origin rank needs a GOOD selection result AND high Sắc ("vua thấy đẹp"); the Sắc threshold is a new BAL key (one core), e.g. BAL.entry.hoaThanSac. Good result without high Sắc → same rank (still capped by Phi).
- So Cao Ly (Tần) → can enter as Phi; Bắc Địch / Phù Tang (Quý nhân) → up to Tần. Every other origin keeps ADDENDUM 18 (cap Tần).
- Per-origin before/after table in the report must show these 3 rows with and without high Sắc. BIG review; new lives only.

## ADDENDUM 20 (MAIN 113, 22:23Z) — TESTS ADAPT TO THIS LIFE + NO GUIDANCE (OD 23/11 ~23:40Z, read verbatim in dev/OWNER_DECISIONS.md; relayed by MAIN 111)
PRIORITY #1 CHECK ('sở thích|chữ trọng|hobby'): OD 7 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0 (REUSE: emperor likes = LIKES in j2.js:181 / jagacts2.js «Hỏi sở thích»; chữ trọng = jagknow.js btTerms (static + offended/honoured); nết = BAL.net/jnet.js).
1. Each royal's test is picked from THIS life's royal: MINI-GAME = cầm kỳ thi họa drawn from that royal's likes (e.g. Emperor loves music → zither mini-game) OR công dung ngôn hạnh by what he/she wants to test; ĐỐI ĐÁP / HÀNH XỬ lean to the virtue that royal values (chữ trọng: hiếu, lễ, tiết, trung …) + nết.
2. All 3 (or 4) answers read reasonable/virtuous; which is best depends on that royal's values this life — the same answer may please one royal and displease another. Data: each option tagged by the value(s) it expresses; score = match with the asker's chữ trọng + nết (BAL weights).
3. NO GUIDANCE on selection answers: no odds word, no gain/loss line, no hint label (EXCEPTION to the option-card rule, selection scene only — note it in KIT.md where the option card is defined). Results shown AFTER (thiện cảm notice + entScore at the edict).
4. Content rewrite of doidap.jsonl + hanhxu.jsonl → writer SELW-TESTS2 (same files, new fields: values[], no obvious ranking); build reads the new fields.

## ADDENDUM 21 (MAIN 113, 22:24Z) — RESULT CARD AFTER EACH CHOICE (OD 23/11 ~23:43Z, relayed by MAIN 111; read the OD row verbatim)
- The no-hint exception of ADDENDUM 20.3 is ONLY the nhập cung selection scene; every other option card in the game keeps odds + gain/loss (do not touch them).
- In nhập cung, RIGHT AFTER each choice (đối đáp, hành xử, mini-game, yard acts) show a clear RESULT card from kit rows: what she gained/lost — thiện cảm ± with that royal (or girl), and the score effect in words (no numbers, no %; VANPHONG). Kit part only (kitNotice / kit rows); missing → KIT REQUEST to KIT KEEPER #13.
