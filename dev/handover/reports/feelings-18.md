# FEELINGS-18 — 18 feelings × 3 levels, acts, intent, faceKeyFor (owner OD 17/11 ~19:10Z + ~19:25Z)
Worker session_01UV1SzmJYgJQJkt1RUTV1wK (opus), foreman C-AG #5 session_01UV1SzkwHkU5MoXKRsprFyU, order MAIN s36. Branch review/feelings-18.
PRIORITY #1 CHECK ('faceKeyFor|feelings-18|intent'): OD 9 | ledger 2 | claims 8 | main 15 | review/* 0 (+ s36 order: main jemo.js EMO table, jemoact.js, jbaleff.js | review/ag-moodknow-r1 a2a1f6b5, review/mood-mem | claims MOOD-MEM C-AG). Reused, not rebuilt: jemo p.emo/emoSet/emoEv/EMO_* tables, jmoodknow causes p.mk (khắc timers, summed seal, moodCauseKnown), jmood her bar + kitWhyHtml row pattern, jemoact ONE reaction table R_ (EA_REACT) + eaDo/eaPick/eaTemper/eaSay, MOOD-MEM moodBar (NPC signed bar) when present, j79 kitActCat (act category), jagknow knHit (hashed draws). START_CTX ≈ 6 % (1M window).

STATUS: #2 (session_01UV1Szhqo1wUz89vE6kRkkU, START_CTX ≈ 5 % of 1M) — owner overrides 20:15Z/20:20Z, 20:25Z/20:35Z, 20:45Z DONE; see "#2 WORK" at the end.

## Owner law (verbatim key words, OD 19:10Z / 19:25Z)
"Cả bộ này thì ok rồi đó" · "Khóc là một hành động, không phải cảm xúc" · "khi mà cái thanh tâm trạng mà nó xuống quá thấp cộng với một cái cảm xúc ... buồn ... nhân vật nó bộc phát cái hành động là khóc" · "Đúng vậy, giao làm theo cách này với một dấu vẻ mặt".

## Built (jfeel.js, numbers BAL.feel)
| part | what |
|---|---|
| (a) set | EMO = 18 keys vui tutin hanghai tinhtu chuyentam hungkhoi tinhnghich binh buon gian lo so hothen chan khochiu choang hon ghen(=Chạnh lòng, MOOD-MEM key); names VANPHONG (Bình thản, Hờn dỗi, Chạnh lòng …); heavy names Hân hoan / Đau khổ / Phẫn nộ / Bấn loạn / Khiếp đảm / Nhục nhã. Old keys converted at the ONE entry point emoSet (every module) + mkAdd + stored causes/emoH/p.emo (feelMig): dau→buon heavy, muu→none, ghen kept (MOOD-MEM key, named Chạnh lòng), khoc→none (act). |
| levels | level = summed strength of that kind's live causes, BAL.feel.lv [15,40,70] → nhẹ/vừa/nặng. |
| effects | odds by kit act category per kind per level (BAL.feel.od, cap ±6): her deck cards (a.o, shown = rolled, re-done when feelings change, "Cảm xúc ngươi: … : dễ hơn n bậc" row in Vì sao) + every runAct (NPCs); NPC act weights (EMO_W shape), Tình tứ × tablet, Vui × thiện cảm gains, Hờn dỗi drifts thiện cảm to its target a buổi; her bar push per new kind (BAL.mood.emo). New sources: night→Tình tứ, her study/art/kid/rest acts → Chuyên tâm/Hứng khởi/Tinh nghịch/Hăng hái, a public failure → Hổ thẹn, slap → Hổ thẹn + Choáng váng, a consort's quiet life by trait (weekly). |
| (b) acts | heavy level + bar past the jemoact line (hers BAL.ea.out.v, others BAL.ea.npc.bar.out) → odds a buổi × temper; the owner's main pair first (buồn→Khóc, giận→Đập đồ, lo→Thức trắng đêm, sợ→Trốn trong phòng, hổ thẹn→Cáo bệnh không dự, chán→Bỏ dở, hờn→Bỏ về không tiếp, vui→Ban thưởng cung nhân, tình tứ→Mời Hoàng thượng), else the nết picks from the ONE reaction table; khắc timer per act (khóc 1, mất ngủ / trốn / cáo bệnh = rest of buổi) + cooldown per group; hers ≤ 2 a tuần, shown in the kit event frame ("Tiếp tục"). |
| (c) intent | p.fi: born from Chạnh lòng/Giận/Hờn dỗi ≥ vừa + bar ≤ −25 + traits, aimed at the cause's person; renewed while the source holds; ends acted (harm act at the target) / exposed (punished) / faded (source gone + 16 khắc); old Toan tính act weights + danger while it lasts; seen as "Toan tính" by odds 70 − Tâm cơ × .6 (hashed per viewer/intent/day). Writes no chứng cứ. NPCs only (her schemes are the player's choices). |
| (d) API | faceKeyFor(pid, viewer) → {kind, key, level, fb, name, lines}; act > visible intent > feeling; lines "Đang: …", "Cảm xúc: <name> (<bậc>)", "Vẻ mặt: Toan tính". fb = existing art while Foreman C paints (FEEL_FB: tutin→vui … khoc→dau, phanno→gian, runso→so, matngu→lo, toantinh→muu). |
| family | group map FEEL_G/feelGrp/feelIn/feelBad/feelGood for every old table keyed by the old kinds: jevb ctxMood + colours, jrest REST_BAD, jroute, jtrong TR_MH/TR_MW (trMK), jwhyn. Scan: dev/measure/feelings18-scan.py. |

## Tests
dev/test/feelings18.test.js 21/21 PASS (set, names, conversion, levels + heavy names, old save, odds by category + deck card, nightCh, aff, intent born/seen/stable/ends/no evidence, faceKeyFor priority, servant + Emperor parity, bot days keys, no page errors).

## Done on the base (step 3)
jemo: EMO line keeps 7 old keys + EMO_GHEN (jfeel adds the rest); EMO_EV dau→buon; EMO_TR muu→gian/ghen, dau→buon; EMO_DECAY/DK/W/OD/NIGHT/LOY without dau/muu (Toan tính weights = BAL.feel.intent.w); emoEv aims gian/ghen/hon; emoLv/servant/motive/nightCh/kitCourtMood via feelGrp/feelBad/feelLv; legacy 4-step bars → EMO_LEG [vui,binh,khochiu,gian] as ONE cause; kitEmotion no Emperor fallback, name = feelName(level); emoBadge src = faceKeyFor key, onerror → FEEL_FB art, then removes; pulse CSS kemo-gian/phanno/khoc. jemoact: eaGrpK via feelGrp; weekly outburst (hers + NPC out line) OFF while jfeel acts are on (eaActsJfeel), act band unchanged. jmoodknow: no khóc turn (act), slap → buon, EMO.hon = Hờn dỗi. jmood mbFlav via feelGrp. jagday agMoodF + BAL.ag.day.mood (dau row = heavy Buồn, muu row gone). jevb mood box picture/mark via FEEL_FB / feelArt (kitPhOnCdn). Grief (old dau) keeps BAL.mood.emo.dau on the bar (cause hv, mkBarOne wrap). Slap daze is PUBLIC like the slap. feelSums syncs once a khắc.
## Tests on head
feelings18 21/21 · ag-moodknow 33/33 (khóc lines rewritten to the owner's 19:10Z ruling: khóc is an act) · moodknow-step0 17/17 · one-core-guard PASS · emotion-acts.js: base 8e2ac171 fails out+gen (base issue); head fails only "lock" in 1 of 2 runs (traits are random per start; my own replay of the lock case passes 3/3) — successor: rerun 2× more (/tmp task ba2r7gbmz was running) · emotion-acts-2.js: head FAIL 3 on the pre-fix build, base not measured yet → compare base vs head.

## HANDOVER (successor)
Worktree /home/user/wt/f18 (sparse, branch review/feelings-18), base build /home/user/wt/f18base (8e2ac171, delete when done), scratch /home/user/wt/f18-scratch (smoke.js, acts.js, lock2.js).
Remaining: (1) emotion-acts-2 base vs head + emotion-acts lock rerun; fix anything new. (2) add ACT cases to dev/test/feelings18.test.js (gate: heavy + bar line; main pair; cooldown; khắc timer ends; her ≤ meWk a tuần; NPC host-only) + a rate measure of acts per 100 tuần vs the old weekly outbursts (bot). (3) feelings18-scan before/after table into this report (before = run the scan on 8e2ac171: python3 dev/measure/feelings18-scan.py /home/user/wt/f18base/dev/build). (4) QUICKCHECK --cpu 4, coop-one-world (p.fa/p.fcd/p.fi of NPCs are host-only via feelWorld; S.fa/S.fcd/S.fa2 personal), long suite. (5) site build (dev/site/build_site.sh), push, send foreman "SẴN SÀNG KIỂM <sha>". KIT: no UI built; faceKeyFor(pid) → {kind,key,level,fb,set,art,name,lines} for main's kit-figure-mood worker; Chạnh lòng art = emo-ghen (MOOD-MEM key).
NEW OWNER RULINGS after my last code (relayed by MAIN s36; NOT built yet — successor must do them first):
(a) OD 20:15Z (verbatim) "thôi đừng có hiện cái mặt ý đồ. Hiện cái mặt ý đồ thì đúng là nó mất hay của cái game mà cung đấu." → intent NEVER on the seal / tap card: faceKeyFor returns kind 'act' | 'feel' only; drop the "Vẻ mặt: Toan tính" line and the intent branch (jfeel faceKeyFor + feelIntentSeen used only for scouting/evidence-free clues if at all); fix feelings18 test r5/r6.
(b) OD 20:45Z: 17 ACTS, one per feeling (Bình thản none), each with its OWN face key emo-act-<feelingkey> — read dev/handover/research/feelings-18-model.md section "ACT LIST + FACES" (docs branch). Replaces the 4 act face keys (khoc/phanno/runso/matngu) in BAL.feel.act.face; faceKeyFor act → key 'act-<feelingkey>' (FEEL_FB fallback for those keys → the feeling's art). BAL.feel.act.g/main must cover all 17 kinds.
ROLLOVER (verbatim): Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).



## #2 WORK (successor session_01UV1Szhqo1wUz89vE6kRkkU)
PRIORITY #1 CHECK ('faceKeyFor|feelings-18|intent'): OD 9 | ledger 2 | claims 8 | main 15 | review/* 0 (this job). Reused: jemoact R_ / eaDo / eaPick / eaTemper / eaSay, jemo emoKnown + kitEmotion + emoBadge, j60 kitIsKnown ("Người lạ" silhouette), jmoodknow moodCauseKnown (unchanged).

### Owner overrides built (commit 430a21e0)
| ruling | built |
|---|---|
| OD 20:15Z + 20:20Z: intent never shown | faceKeyFor returns kind 'act' or 'feel' only; intent branch, "Vẻ mặt: Toan tính" line, BAL.feel.intent.show, feelIntentSeen, feelTc, FEEL_FB.toantinh removed. A live intent is skipped: the seal shows the active act, else the strongest feeling. Intent still steers acts (weights, danger) and is readable for scouting via feelIntentOf(p) (no UI). |
| OD 20:45Z: 17 acts, one per feeling | BAL.feel.act.main = buon khóc · gian đập đồ · khochiu cáu gắt với người hầu · so trốn trong phòng · hothen cáo bệnh không dự · lo mất ngủ · chan bỏ dở việc · choang ngồi thừ người · hon không tiếp, bỏ về · ghen nói móc đối thủ · vui ban thưởng người hầu · tutin khoe tài trước đông người · tinhtu chủ động mời Hoàng thượng · tinhnghich bày trò trêu người · hanghai làm một mạch không nghỉ · chuyentam chìm vào việc, quên giờ · hungkhoi sáng tác ngay tại chỗ. Gate unchanged (strongest kind at heavy level AND bar past the jemoact line on its side). Cooldown now per feeling (BAL.feel.act.cd), khắc timers per act (BAL.feel.act.kh), new acts' numbers BAL.feel.act.fx (noimoc reuses eaDo "cham"). Face key "act-<feeling>" (p.fa.face); fallback chain act-<k> → <k> → FEEL_FB (feelFb/feelArt, CDN-checked). Old-save acts with the old face keys map to their feeling's act face (feelActFace). NPC parity: consorts fire the same 17; other roles (Emperor, Thái hậu, servants, men, court, kids) fire their own reaction of the group (BAL.feel.act.g) with the same act face. Host-only for NPCs (feelWorld). mainP removed (one act per feeling, the nết only blocks via the reaction's ok()). |
| OD 20:25Z + 20:35Z: seal always for known | jemo emoKnown(p) = kitIsKnown(p): every known person's seal shows (no grey "Chưa rõ" seal; Trong cung mood words follow the same rule); Người lạ → kitEmotion null → no seal. Causes still need scouting (moodCauseKnown untouched). jemo emoBadge draws faceKeyFor().art (CDN-resolved) with feelFb onerror; jevb mood-box mark = faceKeyFor().art. |
| bug found | jfeel acts called jemoact closure-only helpers (ventMe, ventNpc, staffOf, eaRival, loyAdd) → silently failed (acts never vented the bar). jemoact now exports window.EA_H; jfeel uses it. |

API sent to main's kit-figure-mood r4 worker (session_01UV1Szm15TBGXbyca7ucqMq): faceKeyFor(pid) → null | {kind:'act'|'feel', key, level, name, fb, set, art, lines}. Art ask (Foreman C): 17 act seals emo-act-<k> × 3 sets.
MOOD-MEM #2 (session_01UV1Szigr35QvLkVSd2Vb9L) told before the shared jemo.js edit (emoKnown + emoBadge only).

### Tests (head)
| test | head | base 6cadd5c3 (review/mood-mem) |
|---|---|---|
| feelings18.test.js | 33/33 PASS (new: intent never on face/card, act-<feeling> faces + fallback chain + old-save act face, 17 acts one per feeling all fire, gate heavy AND bar, khắc timer + cooldown, her ≤ meWk, Emperor parity, co-op guest writes no NPC act, known seal always / Người lạ none / cause still scouted) | — |
| ag-moodknow.test.js | 33/33 | — |
| moodknow-step0.test.js | 17/17 | — |
| mood-mem.test.js | 16/16 | — |
| one-core-guard | PASS | — |
| emotion-acts.js (755x1000) | PASS 2/2 runs ('out' rewritten to the owner's act rule; 'lock' pins her traits — it was flaky on base too) | FAIL out, gen, lock |
| emotion-acts-2.js (755x1000) | FAIL hoitimid only | FAIL plock, hoitimid → hoitimid is a base issue (not this branch) |

### Acts rate (dev/measure/feelings18-acts-rate.js, bot, 2 runs × 20 tuần = 40 tuần, per 100 tuần)
| | head | base |
|---|---|---|
| jfeel acts (whole palace) | 17.5 (buồn 7.5, sợ 5, vui 5) | 0 (no jfeel) |
| old weekly outbursts npcOut.* | 0 (off under jfeel acts) | 7.5 |
| her acts | 0 (bot never holds her bar past ±45 with a heavy feeling) | 0 |
| emotion act cards npcAct.* | ~ same both sides | |
| page errors | 0 | 0 |

### Whole-family scan (dev/measure/feelings18-scan.py; old keys dau/muu/khoc + EMO tables + seal art)
| | before (base) | after (head) |
|---|---|---|
| sites | 67 in 8 files | 50 in 8 files |
| old-key reads not converted | jevb ["gian","ghen","dau"], jroute ["buon","dau","so"], jmoodknow ["buon","dau","so"] + emoSet(p,"khoc"), jemo ev-old dau/muu rows | 0 |
| left on purpose | — | jbal2 BAL.mood.emo.dau (grief keeps its bar weight via cause hv), BAL.ag.day.mood dau row (= heavy Buồn), BAL.emo2.khoc config (old khóc turn, now off), BAL.mood.emo.khoc (dead weight, harmless); jemoact nmA khoc = an ACT key; jfeel 2 conversion reads (dau/khoc at the entry point) |
| seal-art sites | 5 | 5 (jemo emoBadge + jevb mark now draw faceKeyFor().art) |

### Not done / for the reviewer
- No UI built (KIT FIRST): the tap card lines + seal wiring are main's kit-figure-mood r4 worker (API sent).
- Act art emo-act-<k> × 3 sets = Foreman C; until painted the chain shows the feeling's seal.
- Intent scouting surface: only feelIntentOf(p) exists; no player-visible scouting line was built (needs an owner/main decision + kit part).
- emotion-acts-2 hoitimid fails on base 6cadd5c3 too (not this branch).
