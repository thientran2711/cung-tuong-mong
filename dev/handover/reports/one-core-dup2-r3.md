# one-core-dup2-r3 — opus fix worker (session_01N1tNP5Muf9zF38i81jtdgj), coordinator Foreman B S3 (session_01N1tNP3Jf9UG8ZtZdVruBg7)

PRIORITY #1 CHECK ('one-core-text|one-core-bind|balSg|AOUT|wrong binding'): OD:L1267 | main 05ebe3da (contained, merged) | review/* one-core-dup2-r2 711e637d FAIL (this fix), one-core-arcs 882649ac, one-core-roads-r1 75bc9f05 | claims B (this worker replaces session_01N1tNP2SKjMzEdsyLuEZtJa); no one-core-bind guard existed anywhere (git grep origin/main + review/*: none)
START_CTX ≈ 4 % of the window (own estimate; get_session reads 0); at report ≈ 27 %; no rollover.

## r3 FIX
Branch review/one-core-dup2-r2 @ **069188d7f8406a62a5b1bafc2696ddb51873a24b** (on 711e637d, no history rewrite): d4e105ad merge main 9fdc1199 (trait pool) · c062c60c FIX · 1a100b61 bind guard refinement · 069188d7 merge main 05ebe3da (npc-agent ag2). Site rebuilt.

### FAIL 1 — wrong bindings: every printed key is the key its own rule reads
New guard **dev/test/one-core-bind.js** (in coregates G1, after one-core-text). For every `${balSg|balAb|balOan(BAL…)}` / `${BAL…}` print in the game (not only the 3 commits: 514 prints now): the key must be read (outside a print) by the option the text belongs to — nearest object with a go/fn/f/ok function, an entry call add("k")/A("k")/T7("k"), an `if(k==="lit")` branch, else the named top-level function — or by a function it calls (2 deep), or by the act it previews (link names DERIVED from code: AOUT/ACT/act-table property keys, add/A first arg, k:"lit", data-x="v", ACT.k.f chains → A("k") / ACT.k= / `k:{…run/go…}` tables / `if(…==="k")` branches / a handler named …K; an option a wrapper finds by name `a.n==="…"` / `/^…/.test(a.n)` → the object with that n). A text function whose rule sits in another function says so in code (`/* previews: ruleFn */`, checked: ruleFn must read the key; used 3×: j21 inviteBtn → placeWhere, j55 ccLine → ccStep, jpoison pgLine → pgGive). BAL.eff keys are per-site → strict; BAL.road/arc strict inside an option, any engine read in an info text; concept keys (BAL.steal.rel, BAL.loy.close …) must be read by some rule; example numbers with no rule by design: BAL.kitpage.*, BAL.td.exNeed.
Scan on 711e637d: **29 mismatches** (all 15 reviewer rows except #15, + 9 more); now **0**. #15 is the one case a script cannot see (same option reads the same key, but for another person) — fixed by hand.

| # | site | before (printed key) | after (the rule's own key) | rule change (value same) |
|---|---|---|---|---|
| 1 | j72 bac_mat "lòng với ngươi" | j72.fn_2 | **j72.bacMat -8** | s.loyal-8 → +BAL.eff.j72.bacMat |
| 2 | j72 gioi_th x + fn "(+5)" | j72.fn_6 / typed | **j72.gioiTh 5** | ap {th:5} → BAL |
| 3 | j72 tin_doi x + fn "+4" | j72.fn_7 / typed | **j72.tinDoi 4** | ap {th:4} → BAL |
| 4 | j71 hầu bệnh Thái hậu (npc both lines + player CH7 w/l) | j71.npc / typed +3 | **j71.thNurse [10,3]** | th:10 / th:3 (npc + player) → BAL |
| 5 | j55 tdGift "người ấy quý ngươi" | j55.tdLeak_3 | **j55.tdGiftHead -10** | h.af-10 → BAL |
| 6 | j55 "Nhờ cha dâng sớ" tốn | j55.fail | j55.tdAsk | — |
| 7 | j55:176 + :204 leak thành | j55.top_9 | j55.tdLeak | — |
| 8 | j78 trinhth gain + fail (j78out + add) | typed +2 / j8.go_2[1] | **j78.trinhth 2 / trinhth_2 -4** | apply {th:2}/{th:-4} → BAL |
| 9 | j78 accuse fail quý + oán | j2.go_3 | j8.f_6 | — |
| 10 | j70 Thái hậu che chở / Tuyết liên | j70.ok_3 | **j70.thShield -3 / thLotus -3** | apply {th:-3} ×2 → BAL |
| 11 | jkc ngáng chân / nghe ngóng "${maid} thiện cảm" | jkc.fail_13 | **jkc.mzL 5** (prints -mzL) | mzL(5) ×4 → BAL |
| 12 | jtsb Thái hậu triệu Đến ngay / Cáo bệnh | jtsb.tsbBulNpc / go_13 | **jtsb.thCall 3 / thCall_2 -3** | apply {th:±3} → BAL |
| 13 | jpet tho / ngoctho use | jpet.petMonthOf | the pet's own `soft` (`get use(){…balAb(this.soft)…}`) | — |
| 14 | jmen nghe lén hỏng | balOan(menReport_2) | jmen.menChoose (direct oán) + **jmen.hearMan -5** ("hắn quý ngươi") | m.af-5 → BAL |
| 15 | jmen giấu giúp "hắn mang ơn, người ấy quý ngươi" | jmen.menHide (the consort's) | **jmen.hideMan 15** — the rule exists: `m.af+15` (the man), typed | m.af+15 → BAL |
| 16 | j25 "Bàn tán về …" wrapper of j9 | j25.go_2 (faction invite!) + typed "+10" | j9.run_3 / j9.run_4 | — |
| 17 | j78 Xử tội (judge) risk | j78.f_2 (trinhhh) | j8.judge (empAct → judge()) | — |
| 18 | jlost Đòi lại êm thấm hỏng | jlost.go_2 | jlost.loUI (askback handler) | — |
| 19 | jlost Trả về chủ | jlost.go | jlost.loUI_2 (giveback handler) | — |
| 20 | jwhy maid spy x + risk "oán ta" (+ pvOan(v,5) typed) | balOan(jwhy.f) | j78.j78maidFail (+ pvOan reads it) | — |
| 21 | j72 hh_th (guard coincidence th 5) | typed | **j72.hhTh 5** | ap {th:5} → BAL |
| 22 | j71 dâng hương (guard coincidence th 3) | typed | **j71.incenseTh 3** | apply {th:3} → BAL |
| 23 | j42 Tố lỗi với chủ hỏng (guard coincidence -30) | typed | **j42.cnvFrame -30** | srvAf(s,-30) → BAL |
17 new BAL.eff keys (bold), every old key unchanged. Not a binding issue but a WORDING mismatch, reported only (no wording change, gate): jkc row 11 says "${maid} thiện cảm -5" but the rule lowers the maid's **lòng**.

### FAIL 2 — j17 root AOUT prints the j8 rules
spy f · ally f_2 / f_3 · rumor f_4 · frame f_5 · accuse f_6 · ksab f_7 · takeaway f_9 / f_8 · vp vpAccuse_2 · plant plantItem (each checked against j8:87–126, vpAccuse / plantItem); steal/road: ghen `BAL.steal.ghen`, quý `-BAL.steal.rel`, oán `balOan(-BAL.steal.rel,"hurt")` (stealWin relAdd), hỏng `Sủng -BAL.steal.failSung`. Lazy: `aoLz(a,()=>…)` = a plain array whose items are element getters (j17 loads before jbaleff; still an Array, so jaudit §13 / j79 wrap it as before). Left typed (typed rules, not BAL): "nàng bớt ghen 10", Danh/Sủng/Tài amounts.

### FAIL 3 — one-core-text guard gaps
(a) hand `LINK` deleted: links come from one-core-bind `linkMods()` (acts only: A / ACT / act tables `k:{run|go|act}`; options by name). (b) `if(r.mode==='amt')continue` removed: the beside-ref pass checks BAL.road / BAL.arc / any BAL.eff amount beside its read again; a print (balSg/balAb/balOan) is not a read. (c) the FIRST stat word of the clause decides the kind: Thái hậu → th ({th:…} / .th=), Hoàng hậu → hh (+ relation), lòng → loyal ({loyal|maid:…} / .loyal=); only then "thiện cảm / quý / với …" (rel).
Planted on a scratch copy (dev/build copied, one plant at a time, `--list`), current tree: **11/11 CAUGHT**
| plant | caught by |
|---|---|
| P1 jreign rgPurge sibling ternary "thiện cảm -15" | jreign.rgPurge |
| P2 jstip sibling if "oán ngươi +10" | jstip.go_2 |
| P3 jne AOUT preview "thiện cảm -3" | jne.go |
| P4 jstip x/risk "oán +5 / +10" | jstip.go / go_2 |
| P5 jtruth DEED table provoke "oán ngươi +6" | j28.run_5 (link provoke → j28 SOC table; jtruth has no 6) |
| P5b jtruth add("accuse") "quý ngươi -20" | j8.f_6 listed (derived link), besides jtruth's own -20 |
| P6 jreign derived "oán ngươi +9" | balOan(rgPurge,"hurt") |
| P7 jstip "lòng 60+" / "Lòng dưới 40" / "Đức 80–100" | loy.close / loy.low / ducLv.word[3] |
| P8 jend14 lx "Sủng +4" beside BAL.road.end.fertM | road.end.fertM (regression fixed) |
On 711e637d the new one-core-text also catches the whole j17 AOUT table (15 sites) and j25 "+10".

### Proofs and gates (all on the final sha unless said)
- **one-core-bind-same** (new, dev/measure): c062c60c vs d4e105ad — 16 modules identical (prints evaluated, BAL put back, `x+(-n)`≡`x-n`, getter≡value, aoLz≡array), every old jbaleff key unchanged, 17 new keys. **No visible wording change.**
- one-core-guard 0 fails, inline 11729 ≤ baseline 11790 (baseline byte-unchanged, no --update, no --allow-grow). one-core-text 0 sites, 0 early. one-core-bind 514 prints, 0 mismatches.
- one-core-dup-same: vs d4e105ad 4431/4431 identical (+1 new top-level aoLz); vs origin/main 05ebe3da only the 14 dup2 ladder-cut functions differ (word, ladI, oddsChip, affW, oanW, ageBandOf, band4, ccWord, pidBand, kitOddsLv, petCareW, tsQuy, sgLv, kcBand — the set accepted in review-one-core-dup2-r1); one-core-dup-same gained the same `x+(-n)`≡`x-n` rewrite.
- quickcheck PASS (core gates incl. bind, old save ok, perf new/live render 224/278, tab 335/331, buổi 901/961). coop-e2e **62/62** (LIVE Worker). coop-one-world PASS (default + SEED=7). trait-pool 20/20 (base 6c4f21c3).
- Trial merges (not pushed): + one-core-arcs **882649ac**: code conflicts j96 (the known rare96 2-line resolve + main-trait vs arcs BAL.arc.t96 lines), jroute (main netRx vs arcs BAL.route.seen), one-core-guard.js (take arcs' amt + amt1), assemble union; guard PASS 0 fails, text 0, bind 523/0, coop-one-world PASS. + roads-r1 75bc9f05 on top: generated + baseline only; guard (after --update) PASS inline 4757, text 0, bind 0. With arcs **c682afe6** (the brief's sha): same conflicts; guard then fails only on arcs' own 66 one-argument e67dad amounts, which arcs r2 882649ac already moved → merge arcs r2, not c682.

### Side notes (not fixed here)
- jlost:242–243 "Đức -4" / "lòng -10" type LO.act values (module table, not BAL). jroute:89/95 "Chủ tin 60+" (watcher() checks no Chủ tin; open for main).
- BAL.eff.j8.go (-5) has no reader since main's pillow rewrite (BAL.tw.g.pillow) — dead key, harmless.
- Typed text beside its own typed rule still exists elsewhere (e.g. j55 ccLine "Thái hậu -8" + apply {th:-8}; jmen giấu giúp ok srvAf; j42 frame ok -40): consistent, not a binding error; the next ONE CORE sweep may move them.

SẴN SÀNG KIỂM review/one-core-dup2-r2 069188d7f8406a62a5b1bafc2696ddb51873a24b
