# hist-mama-ladder — who became ma ma (嬷嬷), from which rung? (history / drama expert E15, owner OD law 8)

PRIORITY #1 CHECK: OD 23 (key OD 19/11 ~00:40Z, L1935) | main j14 SRK.maid (5 rungs), jexam «Ở lại làm ma ma» (target "mama"), jbal2 srvBar[5], j42 cnvAge/srvTitle, jbal BAL.srvAge | review/* none | claims none ('hist-mama'). Reused: reports history-maid-nights, monthly-ration-history, foreign-princess-history.

## Owner's question (VERBATIM, OD 19/11 ~00:40Z)
"Cung nữ thô sử / Cung nữ / Đại cung nữ / Chưởng sự cô cô / Nữ quan — Tại sao mama không có nằm ở trong 5 cái bậc này? Bây giờ muốn lên làm mama thì như thế nào? Nếu như thời xưa trong cung đi, ai mới là người được làm mama? Mama đi lên từ cái bậc nào? Tại sao mama phải là người nằm riêng, một cái bậc riêng ở ngoài là sao?"

**Honesty note.** Written from the expert's knowledge; no archive access and no web search this session. Tags: [DOC] solid in standard scholarship; [MIX] documented in part, details from memoirs/retellings; [POP] drama or popular belief; [?] uncertain, verify before quoting to the owner. Sources are named so a human can check them.

## 0. What the live game does (to describe only)
- Ladder `SRK.maid` (j14.js:30): Cung nữ thô sử / Cung nữ / Đại cung nữ / Chưởng sự cô cô / Nữ quan (index 0..4), advanced by merit + exam (jexam srvBar[1..4]).
- Ma ma is NOT a rank in that array. At age `BAL.srvAge.ask` = 25 the dilemma «Đến tuổi xuất cung» (j42 PEND.cnvAge) offers «Ở lại làm ma ma» ONLY if rung index ≥ 3 (Chưởng sự cô cô or Nữ quan); it runs the Nội vụ phủ exam (jexam exSrvMama, bar srvBar[5] = 24, wait srvCd[5] = 3). Pass → `S.srv.mama = 1`, title "Ma ma", stay until `BAL.srvAge.mama` = 45, then silver and retirement; fail → leave at `BAL.srvAge.out` = 30.
- So the owner's observation is right: in the UI the five rungs end at Nữ quan and ma ma appears from nowhere as an age-25 choice. The rule itself (rung ≥ 3, age 25, exam) is already a sensible answer; it is just hidden.

## 1. Who became ma ma in the real courts
The word 嬷嬷 / 妈妈 (Manchu *mama* = "grandmother, old woman") is a **role / respect title for an older woman servant**, not one rank on one ladder. Three different women are called by it. [DOC for the three kinds; MIX for the exact proportions]

### 1.1 Wet nurses and child-minders: 奶嬷嬷 / 乳母 / 保姆 (Qing)
- Qing princes' and princesses' nurses (乳母, 奶母, 奶嬷嬷) and the senior "keeper" (保姆 / 保母) were chosen from the wives of Nội vụ phủ bao yi (包衣) families, often of the Upper Three Banners, i.e. **married women hired from outside the maid corps** who had recently borne a child [DOC outline: Qing court rules on milk-mothers; 《国朝宫史》, 《钦定宫中现行则例》 — no exact article cited from memory].
- Best known case: **Lady Sun (孙氏), Kangxi's 保母**; her husband Cao Xi's family became Imperial Household bao yi grandees (her son Cao Yin was Kangxi's boyhood companion; the family of Cao Xueqin) [DOC: Kangxi's 1684 southern tour honours "my nurse" at the Jiangning weaving office; see Zhou Ruchang, 《红楼梦新证》, and Spence, *Ts'ao Yin and the K'ang-hsi Emperor*]. A nurse's household could rise very high; she herself did not "climb the maid ladder".
- Ming equal: 奶口 / 奶婆 / 乳母 [DOC]. Extreme case **Ke shi 客氏 (Tianqi's wet nurse), titled 奉圣夫人** and ruling the palace with the eunuch Wei Zhongxian [DOC: 《明史·后妃传》 / 《酌中志》 by Liu Ruoyu]. Shows the nurse was an outside married woman and her power came from the child, not from a maid rank.
- Kept on in the princess's / prince's household while the child was small; after weaning she was usually rewarded and sent home or kept as 嬷嬷 [MIX].

### 1.2 Governess / teaching ma ma: 教引嬷嬷, 精奇嬷嬷 (Qing)
- 教引嬷嬷 ("guiding / teaching ma ma") were older women of Nội vụ phủ origin who **taught etiquette, sewing and speech to young maids, to selected girls (秀女) entering the palace, and to young princesses**. 精奇嬷嬷 = a title of senior instructor; 精奇 is from Manchu *jingkini* ("true, proper") [MIX; the exact formal rank is [?]]. They sat in the princess's or prince's household (the princess "from about age 6 under 教引嬷嬷 and male tutors 谙达") [MIX].
- Recruited from **long-serving palace women of the Nội vụ phủ (maids who stayed past release age) and from bao yi households' married/widowed women** [MIX]. Not from a specific maid rung: the criterion was age, discretion and skill.
- 《宫女谈往录》 (Jin Yi & Shen Yiling, 1990; memoir of a Qing palace maid; details [?], verify) describes the culture: young maids call older senior maids "姑姑" or "嬷嬷" and fear them [MIX].

### 1.3 The managing elder palace women (maid-side seniors)
- Qing maids (宫女 / 官女子) were levied from bannermen's / bao yi daughters at about 13, and **released at about 25** (some sources 25, the game also uses 25) [DOC outline: Qing palace regulations; scholarship e.g. Ke Xiaoli & others on 宫女出宫制度; [?] exact age by reign]. The small minority who **did not leave** (old, no family, favoured by a mistress, or retained as skilled) became the "老宫女", called 嬷嬷 or 姑姑 by juniors [MIX]. They lived in the palaces' back rooms, led work, and were kept to death (a few got a retirement allowance). Kept = from Nội vụ phủ permission, i.e. an exam-like "who is worth keeping" call [?, the game's exam is invention].
- A mistress's **personal senior maid** was a "首领宫女 / 管事宫女" and could be a 陪嫁 (dowry maid) who came with her and stayed [MIX]. The game's Chưởng sự cô cô is this figure.
- Ming had a real **formal** office ladder for palace women, 六局一司 (Six Bureaus and one Court: 尚宫, 尚仪, 尚服, 尚食, 尚寝, 尚功 + 宫正司, officers 女官 with ranks about 正五 to 正八品 in Hongwu's design) [DOC: 《明史·职官志》 / 《后妃传》], but eunuch offices (二十四衙门) took over their power in later reigns [DOC]. Qing had **no matching formal 女官 ladder**: its palace women were 宫女 under Nội vụ phủ and the mistress; 女官 in the Qing sense (e.g. the empress's "宫殿女官") is mostly drama usage [MIX / POP].

### 1.4 From which rank / age / origin — summary
| kind | origin | age | from maid rung? |
|---|---|---|---|
| 奶嬷嬷 / 保姆 (nurse) | married women of outside bao yi families (Qing), outside women (Ming) | recently a mother, ~20–35 | **No** — hired from outside |
| 教引 / 精奇嬷嬷 (teacher) | long-serving Nội vụ phủ palace women + bao yi widows/matrons | mid-30s and up | **Mostly yes** — maids who stayed past release age, picked by skill/trust |
| managing elders (老宫女, 嬷嬷/姑姑) | the maid corps itself | 25+ | **Yes** — a maid who was kept; usually already a senior (首领 / 管事) one, not a junior |
[MIX overall; the division is the standard reading, individual sources mix the words.]

## 2. Ranking against 掌事姑姑 and 女官, pay, standing
- **Qing.** No fixed order "Chưởng sự cô cô < ma ma". 姑姑 and 嬷嬷 are respect terms for the same kind of old senior servant; both were **servants, not officials** — they received a stipend by the household office (about 1–2 taels a month for senior maids, with grain; the nurse's pay and rewards much higher, plus the husband's post). The figures are [?]; no exact rate should be shown to the owner. The famous rule that a senior servant outranked a lower consort in daily power ("an elder servant of the Empress Dowager is bowed to by a Cháng-zài") is [POP] for Qing; the real constraint was that she was still a servant under the sumptuary rules [MIX].
- **Ming.** 女官 = formal rank with official stipend and sumptuary dress; a ma ma/nurse could out-rank them by **favour** (Ke shi) but never by rule [DOC].
- Standing came from **who she served and how long** (a Thái hậu's or Hoàng hậu's ma ma > a Thường tại's), not from a numeric rung [MIX].
- Pay and fate on leaving: kept servants got a retirement grant and could be allowed to live out in the palace or be released to a relative; the ones with no kin stayed to the end [MIX].

## 3. How the dramas show it, and where they bend history
| drama | who | what they show | bend |
|---|---|---|---|
| 《延禧攻略》 (Diên Hi công lược, 2018) | 魏璎珞 maid → promoted by merit and wits; 精奇嬷嬷 teach the new maids etiquette in the first episodes [recalled, verify]; the 辛者库 (laundry bureau) as a punishment pit | maid climbs by deeds; ma ma as drill sergeant | A single maid rising by wits to concubine: real but rare (Xiaoyichun, [DOC]); 辛者库 was real. A maid becoming "女官" is drama usage [POP] |
| 《后宫·甄嬛传》 (Chân Hoàn truyện, 2011) | 崔槿汐 (Cuī Jǐnxī, Chân Hoàn's senior maid, called 姑姑), 竹息 / 芳若 (Thái hậu's 姑姑), 剪秋 | the 姑姑 = trusted lieutenant who knows every secret, "managing" the palace's maids, often a dowry/long-serving maid | They stay for decades — real only for the few kept. The drama treats 姑姑 as a post; history treats it as a respect term for a senior woman [MIX] |
| 《如懿传》 (Như Ý truyện, 2018) | 容珮 (Rong Pei, 如懿's 姑姑), 惢心, 李玉 (eunuch) | the loyal elder maid as the mistress's shield; nursing / old maids who share her fortune | Same as above; dowry maids stayed with the mistress [MIX] |
| 《还珠格格》 (Hoàn Châu cách cách, 1998) | 容嬷嬷 | the vicious "ma ma" who punishes with needles | [POP] — the ma ma-as-torturer image comes from this drama; real 教引嬷嬷 did discipline, but needles are a trope |
- The consensus across the three dramas: ma ma / cô cô = a **senior woman who stays**, serves one mistress or the Thái hậu, ages out inside the palace, is loyal or scheming, and can be both punisher and protector. That is the true core. The "掌事姑姑 as an official post with a clear ladder" is **drama, not law** [MIX].

## 4. RECOMMENDATION for our ladder (history-true and honest to the owner)
**Both: ma ma is a 6th rung shown on the same ladder, but it is a "stay-on" rung reached by age + exam + senior rung, not by merit alone.**

1. **True answer for the owner:** In the real palaces ma ma was not a step above Nữ quan; it was a **different axis**: age and staying. The maid corps lost its girls at about 25 (in game 25); the few kept past that became the elder women (嬷嬷 / 姑姑); the nurses and the nurse-governesses came from outside the maid corps. Therefore "ma ma sits outside the 5 rungs" is historically right — but the game should **show** it, not hide it.
2. **Show it as the 6th link of the same chain** (kit chip row "Cung nữ thô sử › Cung nữ › Đại cung nữ › Chưởng sự cô cô › Nữ quan › Ma ma"), with the 6th chip locked with the plain rule: «Đến 25 tuổi, từ Chưởng sự cô cô trở lên, đỗ khảo hạch Nội vụ phủ mới được ở lại làm ma ma.» This matches live code exactly (j42 cnvAge hi = rk ≥ 3, srvAge.ask 25, exam srvBar[5]); the owner's "from which rung" question is answered by the chip itself.
3. **Which rungs may enter:** history says a kept elder is normally an already senior maid, so **Chưởng sự cô cô and Nữ quan only** (live rule, keep it; do not open to rungs 0–2). It is both a continuation of the 掌事 line (a Chưởng sự cô cô who stays) and an exit from the Nữ quan line (a Nữ quan who retires into the elder body), so make ma ma reachable from BOTH rungs 3 and 4, not "above Nữ quan".
4. **Ranking text (law 14, canon overwrite, no numbers beyond BAL):** ma ma is the oldest-in-service woman of a household, treated with great respect by juniors, but still a servant: she does not climb to consort by this road; pay/standing figures stay in BAL, not invented from history ([?] for exact taels).
5. **Optional second kind, parked (law 18 freeze):** "Nhũ mẫu / Bảo mẫu" = the nurse of a prince or princess, hired from outside as a married woman, **an NPC role that is not on the player's ladder** (the player servant is a young maid; the nurse is a mother). Could be a flavour NPC when a child is born (ration/maids chapters), no work now.
6. **UI wording suggestion (VANPHONG):** in the exit row, replace «chưởng sự được ở lại làm ma ma» with «từ Chưởng sự cô cô trở lên, đỗ khảo hạch, được ở lại làm ma ma». No % ; odds in words.
7. **Not recommended:** making ma ma a 6th rung reached by merit points at any age (then the age-25 release, which is the real mechanism, vanishes); making ma ma a hidden side road with no chip (the owner's complaint).

## Sources (check before quoting; none re-verified here)
- 《国朝宫史》 and 《国朝宫史续编》; 《钦定宫中现行则例》; 《钦定大清会典》 / 《大清会典事例》 (内务府 chapters).
- 《明史》 (后妃传, 职官志); Liu Ruoyu 《酌中志》 (Ke shi, nurses, 女官 and palace service).
- 《宫女谈往录》, Jin Yi & Shen Yiling (1990), memoir of Qing palace maids [recalled, verify details].
- Jonathan Spence, *Ts'ao Yin and the K'ang-hsi Emperor, Bondservant and Master* (1966) for Lady Sun, bao yi and the imperial nurse.
- Evelyn Rawski, *The Last Emperors* (1998), on the Qing household and 乳母 / servant system; Zhou Ruchang 《红楼梦新证》 for Cao family.
- Dramas (fiction, not history): 《延禧攻略》 (2018), 《后宫·甄嬛传》 (2011), 《如懿传》 (2018), 《还珠格格》 (1998).
- Earlier project reports: history-maid-nights.md, monthly-ration-history.md.

## Uncertain list ([?])
exact stipend of senior maids; the precise rank or title of 精奇嬷嬷 in rules; exact release age in each reign; whether the Qing kept a formal "女官" row at all; the memoir example.
