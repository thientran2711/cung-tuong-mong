# one-core-jkc — tiểu thư Áp lực hôn sự cuts + text↔rule family + jkc frozen kinds

PRIORITY #1 CHECK ('jkc' / 'kapHot kcKap S.kap'): OD ONE CORE OD:L1267 + OD:L585 | ledger #48/#57/#165 | prio1.sh 0 hits for the new keys | main ce29592e1 jkc.js:47/320-321/566/572/595/596/615/638/733, BAL.kc2.st (kapHot/kapRow = jkc2), dev/test/one-core-guard.js odb/hst/oan | review/* none on jkc | claims CLAIMS:812 = this session. Reused: dev/measure/one-core-land-kc2-move.js (copied as one-core-jkc-move.js), one-core-land-kc2-sw-move.js (run as is), one-core-dup2-same.js (proof), existing keys BAL.m95.dtdSung, BAL.loy.warn, BAL.time.sucMin, BAL.cut.veil.
START_CTX ≈ 3 % of 1M (get_session reads 0; estimate) → rollover ≈ 28 %, ceiling 60 %. Stopped new work near the rollover; only push + report done after. Successor items in §6.

Branch **review/one-core-jkc**, base origin/main ce29592e1. Commits: 25f56fb80 (PART 1 + PART 3), 938691428 (PART 2), 84129fa23 (proof fold, CHANGE line, site) = **SẴN SÀNG KIỂM 84129fa23**.

## 1. PART 1 — cuts → keys (tiểu thư road, jkc.js)
jkc2's kapHot 70 / kapRow 50 are NOT shared: there the same field is Nợ nhà / Phe chủ chiến (another rule, other values). Own keys **BAL.kc2.st.kc** (jbal2, comment block), one key per rule:
| rule | was (typed) | key | value |
|---|---|---|---|
| bà mối may come (monthly roll) + Áp lực row in the top bar shows | jkc:320 S.kap>=40, jkc:572 S.kap>=40 | st.kc.moi | 40 |
| red cut (HUD chip, top bar, Giao du, Nhà tab, summary) | jkc:566/572/595/615/638 S.kap>=60 ×5 | st.kc.hot | 60 |
| miễn tuyển may be asked (cha «Xin cha lo…», tổ mẫu chiêu) | jkc:421 S.kap<50, jkc:733 S.kap>=50 | st.kc.mien | 50 |
| «Nhận lời nhà …» enabled | jkc:412 S.kap<70 | st.kc.nhan | 70 |
| cha định hôn | jkc:321 S.kap>=90 | st.kc.dinh | 90 |
| help HX.kap (jkc:47) | «Từ 60 nhà bàn chuyện gả ngươi; tới 85 cha định hôn» | prints moi / dinh | «Từ 40 bà mối bắt đầu tới nhà; tới 90 cha định hôn» |
| KIT_GLOSS «Áp lực hôn sự» (jkc:596) | «Từ 60 nhà bàn chuyện gả; tới 90 cha định hôn» | prints moi / dinh | same words as HX |
PART 3 extras in the same block (values unchanged): kgt [40,20], kgtBr [10,-10], kap [10,10] (starts), gtuPoor 40, gtuRich 90, chaYes 40, mienSo 85.
Player words checked in page: HX.kap = «Áp lực hôn sự (0–100): mỗi tháng một tăng. Từ 40 bà mối bắt đầu tới nhà; tới 90 cha định hôn.»

## 2. PART 2 — text family (whole game)
Scan: **dev/measure/one-core-text-rule.js** (new): every player string / template that types a threshold next to a stat word («từ / tới / dưới / đủ / cần N», «N+», «≥ N») vs every cut the code compares that stat with. TYPED = typed copy of a rule cut, DIFF = no rule uses it, SAMPLE = kit sample pages (jkitpage / jksize, demo data, no rule).
Before (origin/main): 66 hits = 49 TYPED + 11 DIFF + 6 SAMPLE. After: 20 = **14 TYPED (all the «thiếu bạc (cần N)» lock family, §6) + 0 DIFF** + 6 SAMPLE.
Real text ≠ rule (fixed, words change): jkc:47 (60/85 → 40/90), jkc:596 (60 → 40), **j79:205 KIT_GLOSS «Sức»: «Dưới 20 thì không làm được việc nặng» while the rule is BAL.time.sucMin = 5** (j15 whyTime) → prints it («Dưới 5»). The other scan DIFFs were true matches the scan could not see (ternary / function reads) — checked by hand, now print the key.
| text (file:line) | number | rule now reads | key |
|---|---|---|---|
| j2:100 Dưỡng Hòa điện d «Sủng dưới 50» + j2:116 door | 50 | existing | BAL.m95.dtdSung |
| j8:97 Tố giác x «cần 2 … Hoàng hậu: 4» (getter) + j8:51 accNeed | 2 / 4 | new | BAL.accNeedEv [2,4] |
| j8:171 Ngọc bội d (getter+setter) + j8:248 floor + jinv:116 / 258 | 15 | new | BAL.ngocboiSung |
| j14:11 minh oan «đủ 2» + «/2» + rule | 2 | new | BAL.coldEvNeed |
| j19:80 HX.maid, j79:209 gloss «Lòng» «Dưới 45» | 45 | existing (jtut prints the same) | BAL.loy.warn |
| j20:27 «Sinh thần (Sủng từ 50)» + j20:34 | 50 | new | BAL.sinhThanSung |
| j30:24/25/26 «cần 1 / 2 chứng cứ», «thiện cảm 40+» + ok() | 1 / 2 / 40 | new | BAL.m30.tocaoEv / exposeEv / xinhhAff |
| j42:12 HX.tin, j79:208, j42:351 «dưới 10» + j42:239 | 10 | new | BAL.srvx.tinOut |
| j42:298 «Chủ tin dưới 60» + j42:297 | 60 | new | BAL.srvx.keepTin |
| j42:119 «ít nhất 2 chuyện» + lock | 2 | new | BAL.srvx.secNeed |
| j42:352/355/359/411 «quý ngươi từ 30» + j42:33 srvFriendList, j42:359 lock | 30 | new | BAL.srvx.friendAf |
| j10:103 «phi tần quý ngươi từ 30 để lập phe» + filter | 30 | new | BAL.facJoinAff |
| j85:19 «Sủng từ 40» + j85:142; j85:31 «(đến 80)» + j85:145 | 40 / 80 | new | BAL.virx.camSung / hanhCap |
| jts:216 «dưới 30» + jts:205; jts:264 «dưới 20» + jts:255 | 30 / 20 | new | BAL.tsx.empSung / denSung |
| jveil:141 «Dưới 6 … 6 / 10 / 14» | 6/10/14 | existing (vlCraftOut) | BAL.cut.veil |
| jweather:51 «Sức dưới 20 / 40» + the cuts | 20 / 40 | its table | BAL.wx.veryLowSucAt / lowSucAt |
| jpoison:51 «Sức … dưới 30» + cut | 30 | its table | BAL.pg.weakSuc |
| «Sức dưới N» locks + the act's own check: j23:19/27, j85:114/174/180, jtabs:33/38, j83:144/164 (25); j83:143/194, jtabs:55 (15); jrcp:244/245/252/253 (10); j53:186/187/202, j54:207/215 (5); jact:80/82 (15, «thiếu Sức») | | new | BAL.sucNeed {self 25, wk 15, rcp 10, kid 5, yKid 15} |
New keys: one commented block in jbal.js (before evWipe) + wx / pg in their module tables.

## 3. PART 3 — jkc frozen kinds → BAL (value-identical)
| kind | sites | moved to | how |
|---|---|---|---|
| odb od(N…) / roll(N±…) | 45 | BAL.kc2.kcCard.<card>_od / <option>_rb (59 keys incl. card slots) | dev/measure/one-core-jkc-move.js |
| hst card c/w/l kap/kgt/khm | (in the 59) | BAL.kc2.kcCard.<card>_<slot>_<stat> | same script |
| hst S.kap/S.kgt writes ±= N / = x±N | 26 | BAL.eff.jkc.kap… / kgt… | one-core-land-kc2-sw-move.js jkc.js (31 amounts incl. oan) |
| oan x.oan += N | 12 | BAL.eff.jkc.oan… | same |
| hst cuts / starts / set-values | 16 | BAL.kc2.st.kc (§1) | by hand |
Guard: jkc hst 47 / oan 12 / odb 45 → **0 / 0 / 0**. Baseline total 5093 → 4989 (PART 3) → **4957** (PART 2 locks); never grew.
Note: key name kc2.kc collided with st.kc in the guard's dup-key check → the card table is BAL.kc2.kcCard.

## 4. Proofs
- `node dev/measure/one-core-dup2-same.js origin/main` → **PASS, 23 modules, 203 refs put back**. Extended: NS + the new keys; module tables BAL.pg / BAL.wx loaded; a new `fold` turns a printed key back into words (`a ${40} b` → "a 40 b", "Sức dưới "+25, get x(){return `…`} → x:"…"). INTENDED (listed with reasons in the script): jkc TryStatement ×2 (HX.kap + KIT_GLOSS: words 60/85 → 40/90), j19 HX getter/setter maid, j20 AREASON arrow fn + awCard, j79 KIT_GLOSS (Sức 20 → 5; Lòng / Chủ tin same words), jinv ngocboi d (balSg of its own w), jpoison / jweather table gained keys + wxRisk reads via alias W.
- BAL values: new keys only; no existing key changed.

## 5. Tests (on 84129fa23)
| gate | result |
|---|---|
| one-core-guard / one-core-text / one-core-bind | PASS 4957 = 4957 / PASS / PASS |
| quickcheck (build, core gates G1–G5 incl. rules-one-source + kit-conform + coop-one-world, old save, perf) | **PASS** 293 s; render 155/154, tab 260/293, buổi 797/708 ms |
| outside/route.js --origin=tt Fold 755x1000@2 + iPad 1180x820@2 | all steps ok, 0 page errors, no overflow / cut; one fail «Danh carry-over 33» = **pre-existing**: same fail on main ce29592e1 (run here) — not this branch |
| road-end | 51/51 |
| coop-e2e | 63/63 first try |
| help / gloss words in page | HX.kap, KIT_GLOSS «Áp lực hôn sự», «Sức», «Lòng», «Chủ tin», HX.maid print 40/90, 5, 45, 10, 45; looked at the Fold home shot |
Shots in /home/user/wt/jkc-tmp (scratch, deleted), none in git, no CDN folder.

## 6. NOT done — successor (exactly where I stopped)
1. **«thiếu bạc (cần N)» lock family (14 sites, all TYPED, values agree today)**: j15:65 (sv doi 20), j24:65 (sj thuong 10), j25:49 (kid care 10), j25:51 (kid guard 20), j25:62 (40), j42:358 (cnv gift 5; handler j42:363), j54:138 (50), j54:203 (h54 thu 15; j54:218), j54:204 (h54 noi 10; j54:219), j55:175 (30), j55:176 (td leak 20), j55:177 (40), jinv:139 (kinvact test 10; j8:492), jht:122 (ht ask 5; jht:126). Each action has 4 copies (preview «Bạc -N», lock S.bac<N, «cần N», handler apply/check) → one key per action, all four read it. Find with `node dev/measure/one-core-text-rule.js | grep bạc`.
2. Game-wide **odb** kind (≈300 left: j42 34, j68e 32, j2 27, jroute 24, j68f 23, j7 20, j71 19 …) — not started; module by module with one-core-jkc-move.js pattern, value-identical, proof dup2-same.
3. Amounts typed in BOTH a text and its rule (e.g. j30 «hỏng: Danh -5» + ap(a,{danh:-5}), j85 VIRW «Đức +3» + VIRB) = the guard's fx kind; out of this wave's cut family.
4. Pre-existing test fail outside/route.js «Danh carry-over ≤ 30» (main too) — needs its owner to say whether the cap or the test is stale.
