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

## ADDENDUM 3 (MAIN 112, 22:05Z) — RESULT = −1 / SAME / +1 (owner OD 23/11 ~22:15Z verbatim: "Tôi nghĩ là thấp hoặc cao hơn cái bậc của thân phận mình có, 1 bậc là được rồi, 2 bậc là nhiều quá.")
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
