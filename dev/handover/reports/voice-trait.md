# voice-trait — VOICE BY TÍNH TÌNH (worker, sonnet) — PART 1: engine + first situations

PRIORITY #1 CHECK: OD 11 (OD tail 17/11 06:05Z VOICE BY TÍNH TÌNH + 06:20Z balance; L1435/L1436/L1458) | ledger 2 | claims 0 | main 15 (dev/build/jvoice.js kAddr/kSay/kLine; trait pool jbal2.js BAL.net + jnet.js traitsOf; jgreet.js) | review/* 2 (palace-voice, palace-voice-r1: both ancestors of main 65dcf52f, nothing missing; trait-pool-r1 + greet-meet-r1 also on main)
Start context: ~10% of window (START_CTX). Branch review/voice-trait @ 4ed80a060 (from origin/main 65dcf52f). Not pushed to main, no PR.

## STATUS: STOPPED AFTER THE ENGINE + FIRST SITUATIONS (brief item 4) — split proposal below
The engine is done and general; the line writing is ~25-30k lines in total (every pool in the game x 8 tones x 10+). I wrote 5 situations (400 lines) to prove the engine and stopped.

## Engine (one function, no second system)
- `jvoice.js` `kTone(x)` → the speaker's / person's TÍNH TÌNH nết (first of his 3 nết from the ONE trait pool via `traitsOf`); Emperor (ETRAITS keys) and Thái hậu (S.thTrait) mapped to the nearest tone by `BAL.voice.tone` (jbal2.js); male-only nết Cương trực→Nóng nảy lines, Xu nịnh→Khiêm nhường lines (`BAL.voice.tone.alias`, until a male pool is written); nameless servant literal → null → `BAL.voice.tone.dflt` (Điềm tĩnh). No nết is ever drawn for a nameless literal.
- `kLine(key, pool, o)`: a pool may now be keyed by tone `{ "Ân cần":[…]|{warm,cool,cold,any}, "Lạnh lùng":…, …, any }`. Tone = `o.t` | person the line is ABOUT (`o.about`) | speaker `o.sp`. Mood (warm/cool/cold) still shades INSIDE a tone when the sub-pool is mood-keyed. noRepeat memory kept per tone (`key|tone`); rank-band tags `[lo]`… still work; kAddr tokens unchanged. Old pools (arrays / mood objects) work unchanged → old saves fine (S.vmem optional).
- `kOutcome(kind, ok, p)` takes the stage person; rival/fallen and maid/ksp/elder use the tone pools (j2.js passes `p`).
- `jgreet.js` AG-MEET greet card ("‹she› tiến lại, …") uses `greet:come` tone pool about the approaching NPC.
- Lòng dạ / Chí hướng are NOT in the words (per owner): untouched, they keep steering acts via BAL.net.
- New file `dev/build/jtone.js` (data, after jvoice.js in assemble.py).

## Situations written (>=10 lines per tone; 8 tones: Ân cần, Lạnh lùng, Nóng nảy, Điềm tĩnh, Nhiều chuyện, Kín đáo, Kiêu ngạo, Khiêm nhường)
| situation (pool key) | where | lines per tone | total |
|---|---|---|---|
| talk result, rival: ok (`out:rival:ok`) | j2.js talk → kOutcome | 10 | 80 |
| talk result, rival: fail (`out:rival:no`) | same | 10 | 80 |
| talk result, maid/servant: ok | same | 10 | 80 |
| talk result, maid/servant: fail | same | 10 | 80 |
| greet approach (`greet:come`) | jgreet.js AG-MEET | 10 | 80 |
Total 400 new lines, no typed numbers/%, no line shared between tones (test-checked).

## Before / after (dev/test/voice-trait-scan.py; kLine/kOutcome call sites, real ones)
before (origin/main): 30 raw matches, TONE 0 (all mood-keyed or flat).   after: 2 call sites TONE (j2.js:173 kOutcome, jgreet.js:109) + the 5 tone pools; 17 sites still MOOD = the split work below. (Scan also counts accAskLine false matches in j41/j77 in the raw number.)

## NOT yet on the trait key (the split) — sites from the scan + static pools
1. kOutcome kinds th / hh / emp (jvoice.js OUT.th/hh/emp, ok+no, rank-band tags to keep) — th has 4 tones, emp maps to 4, hh = queenP tone.
2. j92 wdRemark (WD_SAY ok/over/under) + jtoil TOIL_SAY (9 keys x subs) + TOIL_TRAIT (old per-trait extras keyed by old names → fold into the tone pools) + TOIL_GEST (th/hh/emp/v ±) + TOIL_SLIP.
3. jstaff STAFF_SAY (tn/kn/gt talk lines) + jcycle CY_ASK + jts TS_WARN (maid-voice → maid's tone) + jvoice HABIT (6 old traits → 8 tones).
4. jgreet gmOpts narration "‹she› hỏi han sức khỏe / khen tài nghệ / kéo ra góc kể chuyện riêng / ghé tai bàn tán / nhắc coi chừng / buông lời khiêu khích" (6 predicates x 8 tones) + the greet reply lines.
5. Events/quests with quoted lines via kSay (j68/j72/…): scan with voice-scan.py list, key each speaker's line by kTone.
Proposal: foreman opens 2 sonnet writers on review/voice-trait: W-A = items 1+4 (outcome th/hh/emp + greet/AG-MEET predicates), W-B = items 2+3 (toil/wd/staff/cycle/ts/habit); W-C (opus or sonnet) = item 5 + voice-rep run over 10+ steps. Same pattern: pool object in jtone.js, call site passes `about`/`sp`; each extends dev/test/voice-trait.js (its auto-check covers every pool in TONE_POOL: >=10 lines per tone, no duplicates, no number/%, no line shared between tones).

## Tests
- `node dev/test/voice-trait.js`: PASS. Same situation x 8 tones → 8 distinct lines each from its own tone pool; kTone for rival / Emperor (nongnay, lanhlung) / Thái hậu / male nết alias / nameless servant; nameless servant and no-S.vmem save still speak; noRepeat: 0 repeats inside BAL.voice.noRepeat tuần over 40 draws; every pool >=10 per tone, no duplicates, no digits/%.
- voice-rep audit (10 steps, 5 tuần): 10 quotes, 1 repeat (a Thái hậu line from the old pool, untouched by this part), 0 page errors. NOTE: the audit only sees “…” quotes in dialogs/logs; my new narration lines are not quotes, so noRepeat for them is proven by the unit test, and a longer audit run is left to W-C.
- Fold 755x1000 + iPad 1180x820, greet card text per trait (DOM text of the real card): Ân cần "…tiến lại gần, nét mặt đầy quan tâm, cúi chào ngươi." · Lạnh lùng "…tiến lại, mắt nhìn thẳng, chào ngươi rất nhạt." · Nóng nảy "…hăm hở tiến lại, chắp tay chào ngươi vội vã." (the modal did not paint in my headless screenshots — shots not usable; reviewer please look in the real card; text verified from the DOM/return value).
- QUICKCHECK on 4ed80a060: PASS (230 s · open ok · old save ok · perf render 346/366 ms, buổi 1218/1643 ms · core gates PASS). Note: root index.html is skip-worktree in sparse worktrees; run `git update-index --no-skip-worktree index.html assets.json sw.js` before committing a site rebuild, else QUICKCHECK says NOT BUILT.

## Handover (context)
Context stayed low (~35%); no rollover needed. Anything left is in the split list above.

~25% xong / ~10% chơi được (cả nhiệm vụ voice; phần engine xong, 5/≈60 tình huống)

SẴN SÀNG KIỂM 4ed80a060
