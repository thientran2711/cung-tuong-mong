# FEELINGS-18 — 18 feelings × 3 levels, acts, intent, faceKeyFor (owner OD 17/11 ~19:10Z + ~19:25Z)
Worker session_01UV1SzmJYgJQJkt1RUTV1wK (opus), foreman C-AG #5 session_01UV1SzkwHkU5MoXKRsprFyU, order MAIN s36. Branch review/feelings-18.
PRIORITY #1 CHECK ('faceKeyFor|feelings-18|intent'): OD 9 | ledger 2 | claims 8 | main 15 | review/* 0 (+ s36 order: main jemo.js EMO table, jemoact.js, jbaleff.js | review/ag-moodknow-r1 a2a1f6b5, review/mood-mem | claims MOOD-MEM C-AG). Reused, not rebuilt: jemo p.emo/emoSet/emoEv/EMO_* tables, jmoodknow causes p.mk (khắc timers, summed seal, moodCauseKnown), jmood her bar + kitWhyHtml row pattern, jemoact ONE reaction table R_ (EA_REACT) + eaDo/eaPick/eaTemper/eaSay, MOOD-MEM moodBar (NPC signed bar) when present, j79 kitActCat (act category), jagknow knHit (hashed draws). START_CTX ≈ 6 % (1M window).

STATUS: IN PROGRESS. Steps 1–2 done in a NEW module dev/build/jfeel.js (after jmoodknow) on a2a1f6b5; jemo/jemoact/jmoodknow edits wait for MOOD-MEM's step-0 sha (brief: no code there before it).

## Owner law (verbatim key words, OD 19:10Z / 19:25Z)
"Cả bộ này thì ok rồi đó" · "Khóc là một hành động, không phải cảm xúc" · "khi mà cái thanh tâm trạng mà nó xuống quá thấp cộng với một cái cảm xúc ... buồn ... nhân vật nó bộc phát cái hành động là khóc" · "Đúng vậy, giao làm theo cách này với một dấu vẻ mặt".

## Built (jfeel.js, numbers BAL.feel)
| part | what |
|---|---|
| (a) set | EMO = 18 keys vui tutin hanghai tinhtu chuyentam hungkhoi tinhnghich binh buon gian lo so hothen chan khochiu choang hon chanh; names VANPHONG (Bình thản, Hờn dỗi, Chạnh lòng …); heavy names Hân hoan / Đau khổ / Phẫn nộ / Bấn loạn / Khiếp đảm / Nhục nhã. Old keys converted at the ONE entry point emoSet (every module) + mkAdd + stored causes/emoH/p.emo (feelMig): dau→buon heavy, muu→none, ghen→chanh, khoc→none (act). |
| levels | level = summed strength of that kind's live causes, BAL.feel.lv [15,40,70] → nhẹ/vừa/nặng. |
| effects | odds by kit act category per kind per level (BAL.feel.od, cap ±6): her deck cards (a.o, shown = rolled, re-done when feelings change, "Cảm xúc ngươi: … : dễ hơn n bậc" row in Vì sao) + every runAct (NPCs); NPC act weights (EMO_W shape), Tình tứ × tablet, Vui × thiện cảm gains, Hờn dỗi drifts thiện cảm to its target a buổi; her bar push per new kind (BAL.mood.emo). New sources: night→Tình tứ, her study/art/kid/rest acts → Chuyên tâm/Hứng khởi/Tinh nghịch/Hăng hái, a public failure → Hổ thẹn, slap → Hổ thẹn + Choáng váng, a consort's quiet life by trait (weekly). |
| (b) acts | heavy level + bar past the jemoact line (hers BAL.ea.out.v, others BAL.ea.npc.bar.out) → odds a buổi × temper; the owner's main pair first (buồn→Khóc, giận→Đập đồ, lo→Thức trắng đêm, sợ→Trốn trong phòng, hổ thẹn→Cáo bệnh không dự, chán→Bỏ dở, hờn→Bỏ về không tiếp, vui→Ban thưởng cung nhân, tình tứ→Mời Hoàng thượng), else the nết picks from the ONE reaction table; khắc timer per act (khóc 1, mất ngủ / trốn / cáo bệnh = rest of buổi) + cooldown per group; hers ≤ 2 a tuần, shown in the kit event frame ("Tiếp tục"). |
| (c) intent | p.fi: born from Chạnh lòng/Giận/Hờn dỗi ≥ vừa + bar ≤ −25 + traits, aimed at the cause's person; renewed while the source holds; ends acted (harm act at the target) / exposed (punished) / faded (source gone + 16 khắc); old Toan tính act weights + danger while it lasts; seen as "Toan tính" by odds 70 − Tâm cơ × .6 (hashed per viewer/intent/day). Writes no chứng cứ. NPCs only (her schemes are the player's choices). |
| (d) API | faceKeyFor(pid, viewer) → {kind, key, level, fb, name, lines}; act > visible intent > feeling; lines "Đang: …", "Cảm xúc: <name> (<bậc>)", "Vẻ mặt: Toan tính". fb = existing art while Foreman C paints (FEEL_FB: tutin→vui … khoc→dau, phanno→gian, runso→so, matngu→lo, toantinh→muu). |
| family | group map FEEL_G/feelGrp/feelIn/feelBad/feelGood for every old table keyed by the old kinds: jevb ctxMood + colours, jrest REST_BAD, jroute, jtrong TR_MH/TR_MW (trMK), jwhyn. Scan: dev/measure/feelings18-scan.py. |

## Tests
dev/test/feelings18.test.js 21/21 PASS (set, names, conversion, levels + heavy names, old save, odds by category + deck card, nightCh, aff, intent born/seen/stable/ends/no evidence, faceKeyFor priority, servant + Emperor parity, bot days keys, no page errors).

## TODO after the base sha
jemo: EMO_EV/EMO_TR source edits (dau/muu/ghen), drop the 4-kind legacy map (kitEmotion Emperor fallback + emoFromLegacy 2→khochiu), emoBadge src via faceKeyFor + fb, gate/danger muu lines; jemoact: weekly outburst path off (acts now per buổi in jfeel), eaGrpK for new kinds; jmoodknow: emo2 khóc turn off, hon name; jmood mbFlav; scan before/after table; QUICKCHECK + long suite + co-op.
