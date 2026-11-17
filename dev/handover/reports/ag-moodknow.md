# AG-MOODKNOW — mood CAUSE knowledge (owner OD 17/11 ~17:55Z item (1))
Worker session_01UV1Szkwcqu7s9tTHPUXBrh (opus), foreman C-AG #3. Branch review/ag-moodknow from review/ag-all-2 86135854; lands right AFTER ag-all-2.
PRIORITY #1 CHECK ('moodCauseKnown|Nguyên do chưa rõ|moodCause'): OD 1 (L1668 item (1)) | ledger 0 | claims 0 | main 0 | review/* 0. Reused: jemo p.emo {k,v,t,why,w} + emoEv/emoSet/emoGet/emoKey/emoByKey; jevb emoH / emoCauses / emoBoxArt / emoCauseArt; jagknow knHit (hashed draw, no flicker), taiMatRaw (Tai mắt), knSellGive / knErrGive (info sellers, servants' errands); j78 j78facts / intelLearn / intelAdd (scouting, "Đã biết"); oSee (her eyes, knFor rule (b)); k61Own (own people); j3 "Tin trong cung buổi này" news card. No second system, no new UI part. START_CTX ≈ 5 % (estimate).

## Owner law (verbatim key words, OD L1668 (1))
"gặp họ mà tôi không biết vì sao họ buồn ... bấm vào cái biểu tượng mặt ... chỉ hiện ra rằng là nguyên do không hiểu, không rõ" — cause shown only if known (scouting, Tuần lục, public palace news, morning-gossip leaks by odds); SECRET (needs scouting / Tai mắt) vs PUBLIC (everyone knows; may leak in morning news by odds).

## API (fixed; sent to kit-figure-mood session_01UV1SzjLSjT2E1w24wsPwS5 and s35)
- `moodCauseKnown(pid)` → cause text | null. pid = person object or emoKey ("me", "emp", "th", consort id, "s<sid>"). null → kit draws "Nguyên do chưa rõ". Text = the TRUE recorded cause p.emo.why; knowledge keyed by mood + cause (a newer cause is unknown again; never stale, never invented).
- `moodCauseKnownBy(x, pid)` — the same rule for any consort x.
- `kitEmotion(p)` now also returns `cause` (text|null) and `causeKnown`; `why` = known cause or "". `known` (the "seen" fog) NOT changed — mood-on-sight is the kit worker's part.
- `emoCauses(p)` (mood box) returns unknown entries as `{why:"Nguyên do chưa rõ", unk:1}`; `emoCauseArt` gives no event picture for them. So every cause display already obeys the rule: seal popover (jemo emoBadge/emoTip), mood box rows + picture caption (jevb emoBox/emoBoxArt), portrait card mood (jpcf pcfMood).
- `__mckOff = 1` → old behaviour (for measuring). `mckStat()` counters.

## The rule (jmoodknow.js, numbers BAL.mck at the end of jbal2.js)
x knows the cause of p's mood when ANY of:
1. p is x (own mood); 2. the cause involves x (aimed at x: emo.t, or names x / "ngươi"); 3. p is x's own people (k61Own for her; staff / maid / kids for a consort);
4. PUBLIC cause already leaked (S.mckPub, everyone knows); 5. learned before (S.mck / x.mck) by: scouting / servants' told errands / info sellers (j78 "mood" fact, pri BAL.mck.pri, sale value BAL.ag.sell.val.mood), a Tai mắt inside p's household (BAL.mck.spy, hashed once per cause), the morning general eyes (oSee(x) × BAL.mck.eye/100, one hashed draw per cause per day), an NPC master's told errand (BAL.mck.npcErr scout/listen).
Morning (endTurn, after emoWeek): each PUBLIC cause not leaked gets one draw at BAL.mck.pub.o[event] (def 35), clamped BAL.odds.lo/hi; up to pub.max (3) leaks a morning, each a line in "Tin trong cung buổi này" + log: "Trong cung truyền tai nhau: X đang buồn, vì bị giáng phẩm." Stores pruned to causes still on the person (BAL.mck.keep).

## Cause sources classified (class stamped on emo.c / emoH.c when set; old saves: BAL.mck.pubRe words)
| source | file:line | class |
|---|---|---|
| tấn phong / giáng / lãnh cung / cấm túc / sinh hạ / mất con / thị tẩm / lạnh nhạt / ốm / qua đời (self + others' reactions rivalUp, friendUp, foeDown, otherKid, friendDie, foeDie) | jemo.js:92–102 (emoWeek) | PUBLIC |
| servants about mistress (mistressUp/Down) | jemo.js:106–108 | PUBLIC |
| servant "chủ nhân đang nổi giận" | jemo.js:107 | SECRET |
| servant lòng up/down (loyalUp/Down) | jemo.js:105; jemoact.js:195, 287 | SECRET |
| beaten by mistress ("Chuyện lọt ra ngoài") | jemoact.js:289 (punished) | PUBLIC |
| kids: mother died / to lãnh cung | jemo.js:111 | PUBLIC; kids' "chơi đùa" SECRET |
| officials "việc triều thuận lợi / rối ren"; houses "thế ở triều lên / sa sút" | jemo.js:113; jemoact.js:467 | PUBLIC |
| men "chuyện riêng" | jemo.js:114 | SECRET |
| Emperor "mừng / thương xót hoàng tự" | jemo.js:116 | PUBLIC |
| slight "bị X làm nhục" (oanAdd hook) | jemo.js:118 | SECRET |
| kindness "được X đối đãi tử tế" (affAdd hook) | jemo.js:119 | SECRET |
| kidDie hook "mất con" | jemo.js:120 | PUBLIC |
| punish hook "bị phạt vì …" + Emperor "phật ý X" | jemo.js:121 | PUBLIC |
| Emperor / Thái hậu legacy mood (long thể khoan khoái, việc triều đè nặng, jcmood why) | jemo.js:79–80 | by words (việc triều → PUBLIC, else SECRET) |
| event outcomes toward her / by her | jevb.js:87–91 | involve her → she knows; others SECRET |
| gifts to her | jmind.js:140 | her own |
| her route mood | jroute.js:30 | her own |
| scolding her maid (her slight) | jemoact.js:374 | her own / SECRET for the scolded maid |

## Tests
- NEW dev/test/ag-moodknow.test.js: ALL 17 PASS — secret unknown → null, seal why "", box rows "Nguyên do chưa rõ" + no picture; scouted → true text, shown on seal + box; newer cause unknown again; public leak 63 % at odds 60 (60 draws), secret never leaks, line in Tin trong cung, odds 100 clamped (97 % ≈ hi 95); NPC parity (aimed → she knows, player not; public → both; Tai mắt in household 31/40 vs 32/40 at spy 85); old save no store / unstamped → no throw, classified by words; 4-day bot every known cause = the real current cause; no page errors.
- ag-know.test 23/23 PASS, ag-truth.test 10/10 PASS, one-core-guard PASS.
- Mood box spec check (kitModal captured, 755x1000, consort with a public tấn phong cause): unknown → row "Vui · Nguyên do chưa rõ · tuần này", head picture = plain ev-mood-vui, caption "Nguyên do chưa rõ"; after the morning leak → row "được tấn phong Tiệp dư", picture ev-tan-phong, seal cause shown; no page errors. (Old screenshot test mood-dialog.js did not open its dialog on this start — maid start; not used.)

## NOT changed (for foreman)
1. j95 motive lines ("vì đang giận X (why)", jemo.js:154–157) carry the doer's cause; they are the doer's recorded reason for an act aimed at someone; when aimed at her the cause involves her (rule 2), so no leak to fix. If another screen prints NPC-on-NPC motive reasons, it should read moodCauseKnown.
2. Friends passing the cause on (knFor rule (d)) — not added; leaks + Tai mắt + scouting cover the owner's routes.
3. Tuần lục: public causes reach it through the morning news log line; no separate Tuần lục entry.

## ADD — KHÓC + HỜN moods (owner OD L1669 '(17/11 ~18:00Z real'; order C-AG #3/#4, s35)
Owner (verbatim): "Mình có biểu tượng cảm xúc khóc chưa ta? ... khóc là mình sẽ thấy có cái nước mắt chảy ra" + hờn from her 16:20Z (g) list ("buồn, vui, giận, hờn").
Built in jmoodknow.js (same piece, reuse jemo; numbers BAL.emo2 in jbal2.js; off switch __emo2Off). State keys for the seals: **`khoc`** (name "Khóc") and **`hon`** (name "Hờn") in EMO → p.emo.k; art keys img/kit/emo-khoc / emo-hon (+ emo-m- / emo-mo-) = kit-figure-mood's part (sent).
| mood | trigger (one rule for her, consorts, servants, Emperor) | odds / strength | duration / effects |
|---|---|---|---|
| khoc | a strong buồn / đau khổ / sợ (v ≥ BAL.emo2.khoc.v) from the events khoc.ev (làm nhục, phạt, giáng, lãnh cung, mất con, bạn mất, mẹ mất, bị hắt hủi, lạnh nhạt) turns into tears | khoc.o + trait points tr, clamped BAL.odds | decay 20 / tuần (fast); act weights like grief (harm .6, kind .7, idle 1.5); vent group "buồn" |
| khoc | a SLAP (jface slapGive) | khoc.slap[sev] 35/55/75, strength slapV | cause "bị X tát" = PUBLIC (the mark shows), event key "slap" leaks at 55 |
| hon | a slight / scolding / punishment / neglect from someone CLOSE (thiện cảm ≥ hon.aff 30; a servant's own master; Hoàng thượng for a consort) → sulks AT that person (emo.t) | hon.o + tr, clamped | decay 10 / tuần; friendly acts (F95) toward that person refused while it lasts (motive gate "đang hờn X (cause)"); servants' Lòng −2 a month |
Cause = the true event (why) → moodCauseKnown works unchanged (sulking at her involves her → she knows why). Old mood ladders read them (emoLv: level 2; eaGrpK: khoc→buồn, hon→giận).
Not changed: the red/green word colour lists in jemo.js:210 / jevb.js:64 (colour only; khoc/hon show neutral) — kit worker's call.
Tests: ag-moodknow.test now 23/23 PASS (3 runs): khóc by odds high/low, slap → khóc public and known to the slapper, her servant sulks at her (known), NPC sulks at a close friend who knows why, motive gate refuses the friendly act, khóc decay + words.
ag-all.test perf p95 (day draw) fails its 8 ms budget on this box for BOTH builds: base (no jmoodknow) 14 / 16.1 ms vs this branch 15.5 / 17.8 ms — box noise, not this part.

## Handover
Done except review. Worktree /home/user/wt/moodknow (sparse). START_CTX ≈ 5 %.
ROLLOVER (verbatim): Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
