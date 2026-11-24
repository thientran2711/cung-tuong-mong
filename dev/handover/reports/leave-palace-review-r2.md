# E79r — BIG REVIEW review/leave-palace-r ea730f77 (E74 FIX r1 + MAIN 119 kpGate) — verdict: **PASS 87f6480bf3fda9636440b5c1876f77964c1f6774**
PRIORITY #1 CHECK ('leave palace kpGate Kiếp này chưa trọn'): OD 0 new | ledger 0 | main: no crimeTier / convict / ttExposed / thatS / jleave before this branch | review/*: only review/leave-palace(-r) | claims E64, E64b, E72r, E74 (done), E79r (this). Read verbatim: OD 24/11 ~06:05Z, ~06:45Z, ~07:25Z, ~07:55Z, ~08:40Z real (MAIN 119 chat; part (2) no-prewarn scope); FOREMAN_E_STATUS FROM MAIN 117 05:07Z, ORDER CORRECTION 116 07:26Z + 07:57Z, FROM MAIN 118 06:16Z (P1/P2/P3), ORDER FROM MAIN 119 08:06Z (kpGate).
Reviewer E79r = session_01DgYSWmgnAggZbjFVCTvkKj. START_CTX ~3 %.

## MERGE
review/leave-palace-r ea730f77 + origin/main ac4790f0 → **87f6480b** on review/leave-palace-r2 (FF from main). Conflicts only in built files + assemble.py list: main's list + 'jleave.js' before 'jend.js' (the only file the branch adds); site rebuilt. Main's new files (j70c/j70sd route seeds, jworldc/jwsd, j71c/j71sd) hold no punish/deathSentence/fall/cold site: the new j70 routes run through the j70 runtime, so a trap catch on them goes through the branch's convict() (checked).

## CHECK FIRST (brief items)
| # | check | result |
|---|---|---|
| 1 | NPCs have a way back from thất sủng (law 1) | ok — j8 tsMonth: one monthly «Hoàng thượng chợt nhớ» roll tsRecallCh(p) for her and every NPC from BAL.thatS.recall (Danh, Đức, living children; max 12); NPC also leaves at Sủng ≥ back. Robot (real monthTick, 6 lives × ≤120 months) on the merge: **15 entered, 14 left** (E72r: 17 in / 0 out). Her line + NPC news line exist. |
| 2 | ONE treason tier on every punish road (law 11), incl. j8 hại hoàng tự | ok — my own scan (punish/fall/cold/framed × hoàng tự/Hoàng hậu/gián điệp/bùa/trù ẻo/vu cổ/độc/mưu hại/xạ hương/tráo over all dev/build/*.js on the merge): every DOER of a proven treason deed goes through crimeTier/convict (j4 spy ×2, j4 poison HH, j8 poison/kpoison/pond/kframe, j9 pushp on HH, j70 trap M.k, jworld2 vu cổ doer). Kept sites match E74's table: framed victims (j7:21, j8:150, j42:330, j8:331, j8:181, jworld2:147 scapegoat), j7:187 xạ hương on a consort (fall), j8:173 ksab, j8:158 failed accusation, planners before a deed (j71:236, j95:442), generic «xét tội theo chứng cứ» (j78/jaudit/jrcv/j8:204, crime kind unknown). j8 musk/catswap catches go through caught() = evidence only (no punishment at all), law 6a ok. BAL.crime.nghichK/queenK = one source (law 4). |
| 3 | ONE tư thông function for her and NPCs | ok — j22 ttExposed(p,m,lead): man xử trảm; empMercy → lãnh cung; else deathSentence (first-year / nhân từ mercy). Callers: affairExposed (her: tryst, j95 npcCatch, jroute:127, j96 c_lo), ttNpcExposed (j3:99 loveletter, j95:442), trystNpc, j30 «Bóc chuyện tư tình» both branches, jmen report. No other copy left. |
| 4 | kpGate removal vs MAIN 119 + OD ~08:40Z | **right**. OD ~08:40Z (her words: «khi mà tôi bấm vào một lựa chọn rồi sau đó nó báo nhắc nhở để mà phải chọn lại») = exactly the «Kiếp này chưa trọn → Nghĩ lại / Vẫn chọn» card; it is not a system confirm and not an in-world event, so re-keying it on a flag would still be a re-ask → removal is the only form that obeys her. The kiếp rule itself is not undone (law 16): KP_RULE is appended to the ENTRY card (jkiep nlAccept wrapper) + glossary «Phúc duyên»; the penalty shows AFTER on the end card («Kiếp dở dang: … trừ thêm …», over() wrapper) + Sổ luân hồi; the title-screen «bỏ ngang» double tap (save-slot = system) stays. No life ends on a tap without that entry warning. My own static scan of option texts tripping the old regex: 20 static n/x hits with a cruder parser (E74: 28 incl. j67 / other keys) — same classes (mentions, idioms, risk-on-failure); none ends the life on the tap. Build has no word regex left (test). |

## GATES (on 87f6480b)
| gate | result |
|---|---|
| dev/test/leave-palace.test.js | 135/135 ok |
| dev/test/leave-palace-tsrobot.js | PASS: 15 in, 14 out |
| bash dev/tools/quickcheck.sh ×2 | PASS ×2 (core gates incl. G3 kit-conform PASS both; old save ok; perf new/live run 1 render 218/195, buổi 2179/1058 ms (my old-save robot ran alongside); run 2 alone: render 191/227, tab 409/384, buổi 1043/1027 ms) |
| G3 flaky? | kit-conform on LIVE ac4790f0 ×3 standalone: EXIT 0, 0 MIXED ×3; on the branch 2/2 clean inside quickcheck. E74's single «place:vuon» MIXED did not reproduce on either; the branch diff for that run was jkiep only (removes a card, adds none) → one-off flake, not caused by the branch. |
| role-parity ×2 | ALL PASS ×2 |
| coop-e2e host Fold / guest iPad | 142/142 passed |
| coop-e2e COOP_SWAP=1 (iPad host) | 142/142 passed |
| old save mid Trả thẻ bài (REAL: LIVE ac4790f0 tiểu thư life «Đổng Ngọc Nhu», Trả thẻ bài card pending, saved sổ 3 the game's way → loaded on 87f6480b) | loads, 0 page errors on both builds; S.kc.lv absent; all 3 options (gả / ở vậy dạy chữ / xuất gia) end the life with today's card and NO «Về sau», as MAIN 117 ordered |
| shots Fold 755x1000@2 + iPad 1180x820@2 (looked at all, scratch only, deleted; not uploaded) | (1) Trả thẻ bài · gả → «Về sau · Làm vợ ngoài cung» + Kết cục / Người ấy (his 3 nết) / Về sau rows; (2) Cao chạy xa bay with a real thị vệ → «Về sau · Theo người ra đi», Kết cục / Người ấy / Về sau rows; whole text, kit end card, no clip once the scroll-open animation ends (an early shot at 1.5 s caught the unroll mid-way — reshot at 4.5 s, full card). (3) thất sủng: «Ta thất sủng: Hoàng thượng không còn nhớ đến ta, thẻ bài của ta bị gác lại.» in Tuần lục «Việc của ta» (kit book page), both devices. (4) Vu Lan «Cúng các phi tần chết oan» (old gate word «chết»): card shown, tap → choice applied (Sức −10), no «Kiếp này chưa trọn» card, back to the act list. |

## LAW CHECK
| law | result |
|---|---|
| 1 two-way | ok — thất sủng in/out same for her and NPCs; one tư thông function; one treason tier (co-op friend's entry keeps punish on the host device: a player seat, documented) |
| 2 / 3 | ok — no new choice; own-choice leave options = endings with an epilogue (gain) |
| 4 one core | ok — BAL.crime (+nghichK/queenK), BAL.thatS (+recall, lonely), BAL.leave; no typed rule number in new code |
| 6a real evidence | ok — every convict / ttExposed site is after an existing caught / proven roll |
| 7 wording | ok — cổ trang, no %, odds words only |
| 9 kit only | ok — no new UI part; end card / kitRows / Tuần lục rows |
| 11 fix the group | ok — scans above (treason, tư thông, kpGate texts) |
| 16 / 17 | ok — kiếp rule kept (entry + end card); no re-ask after a game tap per OD ~08:40Z |

## NOTES (not blocking)
- jcoopthin.js:443/477 comments still say the «Kiếp này chưa trọn» warning «is asked on her phone»; kpGate is now a no-op there, so the comments are stale (code harmless). Tidy when that file is next touched.
- BAL.eff.j8.pondSev now only feeds convict's non-treason fallback (pond is always «nghich») — unused in effect (E74 note).
- NPC thất sủng news reaches her only through the existing newsAdd witness rule (npcTell / tai mắt / talkative servant); in a fresh life with no eyes it is often unseen — that is the live news rule, not this branch.
- Tuần lục shows her own news line; NPC S.news lines are not drawn on the j79 book pages (newsHTML is appended to wkSummary, j79 dawn draws its own groups) — pre-existing on LIVE, outside this branch; parking-lot candidate for MAIN.

**PASS 87f6480bf3fda9636440b5c1876f77964c1f6774** (review/leave-palace-r2; ancestor = origin/main ac4790f0 → fast-forward ready). LAND READY.
<<<<<<< HEAD

## RE-MERGE r3 (ORDER FROM MAIN 121 10:38Z via Foreman E: LIVE moved ac4790f0 → 178cac37, kit-framefit) — **PASS 8d93c02766df28738976691a8b8ee8a829add4d9**
review/leave-palace-r3 = merge of LIVE 178cac37 (parent 2) into 87f6480b (parent 1); only index.html / sw.js conflicted → rebuilt; dev/build diff vs LIVE identical to r2 (20 files, +265/−41).
| gate (on 8d93c027) | result |
|---|---|
| leave-palace.test.js | 135/135 ok |
| leave-palace-fit.js (end card after framefit) | Fold 24 + iPad 24, overflow 0 |
| quickcheck run 1 | FAIL perf only: buổi 3001/1352 ms (core gates, old save PASS) |
| quickcheck run 2 (quiet box) | PASS: render 254/255, tab 463/515, buổi 1406/2980 ms, core gates PASS, old save ok → run 1 = box noise (the LIVE side swung the same way) |
| coop-e2e host Fold | 138/162 (suite grew from 142): «#next enabled / buổi advanced for both» from week 0, 8 new-life dialogs queued (Q:8: Tiền truyện 1–4/4, kc2Sel…) |
| LOAD-COMPARE: coop-e2e on bare LIVE 178cac37 | SAME failure at week 0 (Q:8, «buổi 0:0 advanced for both» FAIL, room S9Q3) — LIVE regression since fd85907a (E81r saw the same); not the branch. COOP_SWAP not rerun (relay red on LIVE). |
=======
>>>>>>> 01958043 (MAIN 122: test-mrfoot ruling + B order)
