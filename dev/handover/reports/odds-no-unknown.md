# odds-no-unknown — worker report (JOB 1, MAIN ROOT-63 via FOREMAN C-AG #20)
PRIORITY #1 CHECK ('Khó lường', 'oddsLead', 'p:' odds field, 'kitOptOdds'): OD 0 | ledger 0 | main 9 code refs (j17 dilLine, j63 kaOdds/KA_ODDS, jk2b ×2, jkitpage, jpoison «Nhận ngay», comments j17/j79) + KIT.md:493/901/1105 | review/* 0 | claims own row. Reused: kit meter kitOdds/kitOptOdds (odds-meter-back), word()/oddsCl/chanceW (j1), j68 c6 `p` convention, j79 kitBranchFx.
START_CTX ~5 % (1M window). depth 8. Branch `review/odds-no-unknown` from LIVE f43a2ba6, final-merged LIVE **fd6118c** → READY sha **7a56b2e**.

## What (laws 4 + 7, whole group = every ROLLED event option whose card meter did not show its roll's odds)
1. **ONE ODDS RULE (kit, j17 `oddsLead(c,s)`)**: a rolled option names the odds of its roll as `p` (the SAME number its go rolls, also when the roll sits in a helper); a card line with no ladder word gets `word(p)` first. Used by `dilLine`, the j67 line path (`c.j67`, j67.js) and `kitOptModel` (jk2b) → meter, hint and line read one number.
2. **«Khó lường» retired from the build**: j17 dilLine fallback, j63 `kaOdds` unknown branch + `KA_ODDS`, jk2b `KIT_HINT_LADDER` + kitOptModel regex, jkitpage fallback, jpoison text. `git grep "Khó lường" dev/build` = 0 (comments reworded too). No unlit meter exists any more.
3. **Per-family fixes** (each gets `p` = the expression its roll uses):
   - jtruth «Bị vu oan» ×4 (meter showed **Nắm chắc**, hint said Liều/Khó!) → p = clamp(base+…); hint no longer repeats the word.
   - j92 «Giá họa đồ» (o1, o2) + «Đồ ngự tứ» (o) → were Nắm chắc.
   - jtoil «Dung nhan» replies (Đáp lại khéo / Đáp trả gay gắt / Đáp lại: roll in toilAns) → p = BAL.toil.replyWin / harshWin (were Nắm chắc).
   - jne sáng hôm sau «Đáp lại» → p = BAL.toil.replyWin; removed the hard-coded `:50` / `:2` fallbacks (law 4).
   - j8 «Cài đồ» (plantpick: every item card rolls fz via fzRun) → p = oddsCl(fz) (were Nắm chắc).
   - jdh2 «Ấn tín thất lạc» (loDo rolls loOdds) → p (were Nắm chắc).
   - j42 `cnvPend` (cnvRun rolls op.o) → p = op.o (kit-level, every cnv dialog).
   - jpoison «Nhận ngay» (was the empty «Khó lường» meter): odds = her real guard against THIS giver's poison = 100 − pgOdds(giver → her, dish), the SAME for a clean or a poisoned dish (no tell, law 6a kept); roll uses that p.
   - j7 «Tìm kẻ tung tin» with nobody to find: nothing is rolled now (j79 had read the other branch's roll(oSpy())).
   - Side chances that roll but are not the card's outcome → `chanceW` phrase (existing KIT rule «never label (word(n))»): jworld2 «Chịu rét», jkc2 «Lễ chùa», jgift tainted gift, jecon bán lén, jpetcare đánh hơi, jaudit punish (+ ONE `punishDemoP()` for the punish roll and its text, j8), j71 reward note, j83 hạc đỉnh hồng.
4. KIT.md canon overwrite in place: §25 (ONE ODDS RULE + gates), §28.6 kitOptOdds bullet (no unknown word / no unlit meter), §53 index line, § odds words CHW line. `sub-odds.js` / `odds-meter-back.js` no longer mention the retired word.

## Scan (before = LIVE f43a2ba6, after = 7a56b2e)
`node dev/test/odds-unknown-scan.js [build dir]` (new, static: every dialog option object with go/fail and no o/odds/p that rolls in its own code or one helper level down; the card line must carry odds; 19 hand-checked exemptions with reasons in EXEMPT, `--all` lists them):

| | rolled options whose card line has no odds | «Khó lường» in code |
|---|---|---|
| before | 17 | 9 |
| after | **0** | **0** |

`node dev/test/odds-no-unknown.js <url> <out> 755x1000,1180x820` (new, runtime: the fixed families with forced setups + every PEND dialog + 300 visit draws; checks no «Khó lường», no unlit meter, meter = word(p), meter = line):

| card (Fold; iPad same) | before (LIVE) | after |
|---|---|---|
| Vu oan: Xin tra sổ Kính sự phòng / Gọi cung nữ làm chứng / Mời Thái y / Trình chứng cứ | Nắm chắc ×4 | Liều / Khó / Khó / Năm ăn năm thua |
| Giá họa đồ: Xin Cung Chính ti tra xét | Nắm chắc | Năm ăn năm thua |
| Đồ ngự tứ: Sai người lùng tìm | Nắm chắc | Năm ăn năm thua |
| Quà ăn (độc / sạch): Nhận ngay | «Khó lường», unlit | Rất chắc / Rất chắc (same word, no tell) |
| Cài đồ: every item | Nắm chắc ×6 | Liều ×6 (= the dialog's own word) |
| Dung nhan: Đáp lại khéo / Đáp trả gay gắt / Đáp lại | Nắm chắc ×3 | Năm ăn năm thua / Khó / Năm ăn năm thua |
| Sáng hôm sau: Đáp lại | Năm ăn năm thua (read from a hard-coded 50) | Năm ăn năm thua (BAL.toil.replyWin) |
| Ấn tín thất lạc: Báo Cung Chính ti / Hỏi cung nhân | Nắm chắc ×2 | Năm ăn năm thua ×2 |

| run | device | dialogs | options | with p | «Khó lường» | unlit | meter≠word(p) | meter≠line | result |
|---|---|---|---|---|---|---|---|---|---|
| before | Fold | 56 | 172 | 0 | 2 | 2 | – | 0 | FAIL |
| before | iPad | 63 | 191 | 0 | 2 | 2 | – | 0 | FAIL |
| after 58f4309 ×2 | Fold | 65/66 | 196/198 | 19/20 | 0 | 0 | 0 | 0 | PASS |
| after 58f4309 ×2 | iPad | 66/61 | 197/185 | 20 | 0 | 0 | 0 | 0 | PASS |
| after **7a56b2e** (merged fd6118c) | Fold | 57 | 174 | 20 | 0 | 0 | 0 | 0 | PASS |
| after **7a56b2e** | iPad | 68 | 203 | 20 | 0 | 0 | 0 | 0 | PASS |

Other gates on 7a56b2e: `odds-meter-back.js` Fold 148/148 · iPad 166/166 meter, krisk 0, step≠odds 0 PASS · static scan 0 / 0 PASS.
quickcheck 7a56b2e `--runs 5`: **QUICKCHECK PASS** · open 1925 ms · old save ok · render 251/261, tab 420/453, buổi 1113/1285 ms, tasks>200 18/19 · core gates PASS. (On 58f4309 a default 3-run quickcheck failed on one buổi sample 3079/1100 ms only — the known rare slow buổi sample; `--runs 5` on 58f4309 then PASS 1203/1185.)

## Shots (CDN, delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review odds-no-unknown`)
img/_review/odds-no-unknown/: fold-/ipad-{vuoan,pgin,toil}.jpg (755x1000@2, 1180x820@2). Looked at: meters at the real odds, the vu oan hint no longer repeats the word, no overflow.

## Seen, NOT fixed (for MAIN)
1. Side-roll hidden bonuses with no wording on `o` cards (the card's own odds are right; a second roll in go/fail is not printed): j2 «Tâng bốc» (discover), «Xin ân điển» (angry punish), j42 «Lén báo tin» (caught), jroute «Trao tín vật» / «Dặn cung nữ» (lost / blab), jkc2 «Trả bớt nợ» (only with the hidden trait Ham lợi — wording would reveal it, exempt). Same law-4 family one level wider.
2. Law 4: punish demotion chance 100/25/50 and literal roll(30)/roll(40)/roll(15) in j4/j24/j76/jkc are typed numbers, not BAL (now one function `punishDemoP`, still literal).
3. Pre-existing PEND sweep harness errors (cn2 / rtAn / giftto need params) — test noise, same on LIVE.
