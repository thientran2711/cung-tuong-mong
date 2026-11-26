# ONE-SIEVE — report (worker session_01V1ZZH2fHrCdnudewe1PcfC, coordinator MAIN CHÍNH 156)

depth 5 · START_CTX ≈ 5 % (get_session reads 0; own estimate) · roll at ≈ 30 %

PRIORITY #1 CHECK ('one sieve'): OD 26/11 ~06:50Z (B) ONE SIEVE + ~04:40Z / ~05:05Z NEWS SIEVE + ~08:30Z pillow verdict (read verbatim) |
main: jnsieve (on review/news-sieve), j63 kaResultRows / kitKemRow / kaWhyCl, jhc knownList, j6 Sổ ghi tab | review/*: review/news-sieve 2a24d4db
(base, extended), review/act-merge-J0 52334847 (KIT 7.1 kaNT «+8 (42)», MERGED, not rebuilt), review/ob-verdict 5a282542 (seal / «Người ấy» /
«Ai làm», MERGED, not touched), review/qc-noise-hygiene (PLAYER-NOISE BUDGET (A) = FOREMAN F #19 worker session_01UV1Szjdc6ChaY51kuwNyt3 —
NOT duplicated here) | claims: NEWS-SIEVE(-2), OB-VERDICT, QC-NOISE-HYGIENE.

## RESULT — branch `review/one-sieve`
Stack: review/news-sieve 2a24d4db + LIVE 3af7896e + review/act-merge-J0 52334847 + review/ob-verdict 165dc7b6 (r3) (only built files / list
conflicts; j63 merge: OB-VERDICT's target «rel» parts now use kaNT totals too). Land order: J0 and ob-verdict first (or this branch carries them).
OB-VERDICT-2 (session_01V1ZZH3VrbDxs1F7ghNy88g) told: it owns seal / Người ấy / Ai làm; this branch owns which OTHER rows show. If it pushes
again, re-merge review/ob-verdict.

ONE function (law 4 / OD (B) «ONE function, no per-screen filters»): `nsSieve(o)` in dev/build/jnsieve.js §7 —
`{t}` text → touches her / not NPC-only (nsHerLine / nsNpcLine, the NEWS SIEVE test); `{v,d,why,tgt,ev}` person → her, household,
Hoàng hậu, her act's target, evidence, |change| ≥ BAL.news.card.big, or the span's log names that person in a line about HER. Every surface asks it:

| surface (OD (B)) | what changed | where |
|---|---|---|
| (1) result cards + night card (jne kitNightEnd uses kaResultRows) | bystander person rows kept only when nsSieve passes (≤ BAL.news.card.rowMax, largest first); Kèm (ghen/oán of others) = OB-VERDICT r3's ONE kitKemRow (MAIN 157, law 14: one person per line, unnamed same-number «N vị khác: ghen +8») fed with ≤ BAL.news.card.kemMax people that pass nsSieve (KIT 7.1 «+N (total)» for a named or single person), every other changed person only counted «… và N người khác»; ONE Sổ ghi record per card with all names and numbers; link «Xem đầy đủ trong Sổ ghi» (source text, was «ở Nhật ký» + a j79 observer) | jnsieve nsCard ← j63 kaResultRows / kitKemRow |
| (2) «VÌ SAO» rows | the reasons come from the span's log clauses minus NPC-only clauses (they stay in the Sổ ghi) | jnsieve wraps kaWhyCl |
| (3) Hậu cung view | «Đã biết về X» (relPair / knownCol): facts that touch HER first, the rest after (nothing dropped). The relation view itself already opens on Ta (relSel "me", relYk default Ta) — unchanged | jnsieve wraps jhc knownList |
| (4) person pop-ups | same knownList (kitKnownList, «Đã biết: N tin» chip, kitIntel) | same |
| (5) Sổ ghi | kit kind tabs (Tất cả · Việc của ta · Chuyện hậu cung · Mưu hại; empty kind = no tab), person chip row (12 most named), kitInput search (accents ignored); rows hidden, empty date headings hidden | jnsieve §8, BAL.news.logTabs |
| (6) news at home | the Khuê các feed already goes through the same sieve (newsAdd / kitKnow / morning card wrappers have no home gate); the harem record stays off at home (OD 25/11 ~23:10Z); «Thư từ · Tin trong cung» at home = her own knowledge list (her choices) — no change needed | — |
KIT.md §7 «KÈM» line = CANON OVERWRITE in place (law 14) of «Kèm: 12 phi tần ghen thêm 8 / one line per person (MAIN 129)»; Sổ ghi kit note added.
Kèm look: MAIN 157 chose OB-VERDICT's per-person kitKemRow (one version, law 14); my earlier one-line «Trong cung: …» summary is dropped. Row look = KK41 (review/kit-kem-row).

## BEFORE / AFTER (node dev/test/one-sieve.test.js <page> 12 <seed>; 12 tuần bot life, every «Trong cung vừa qua» card + one act of hers per tuần)
| seed | LIVE 3af7896e: cards · rows/card avg / max · Kèm lines max | review/one-sieve (fddebc94): cards · rows/card avg / max · Kèm lines max (≤ 4 people + tail) · bystander rows max |
|---|---|---|
| 1 | 42 · 5.1 / 17 · 9 | 43 · 3.8 / 15 · 5 · 3 |
| 2 | 44 · 4.8 / 18 · 9 | 46 · 3.5 / 12 · 5 · 2 |
| 3 | 38 · 3.6 / 18 · 9 | 39 · 3.5 / 13 · 5 · 2 |
Night card, 10 consorts ghen +8 (one +12), dev/test/one-sieve-night.js: LIVE = 8 glued «một vị …:» lines + «… và 2 người khác» (the wall MAIN 157 saw); fix = «Hoàng hậu Lục Hương Ngưng: ghen +12 (12)» · «3 vị khác: ghen +8» · «… và 6 người khác».
(rows = every item in the card body; the largest fixed cards are HER own rows: Sức, Sủng, Danh … + Hoàng hậu / Thái hậu / maid.)
Lines per buổi of the daily feed: unchanged from NEWS-SIEVE-2 (its test re-run PASS 10/10, seed 1).

## TESTS (this box, build faba991a+)
- one-sieve.test.js seeds 1/2/3: PASS 7/7 each (bystander rows ≤ 3; Kèm ≤ kemMax people + tail + link; every folded person in the card's Sổ ghi record;
  0 «Vì sao» from NPC-only clauses; Sổ ghi tabs + search narrow 450 → 70 rows; 0 page errors).
- news-sieve.test.js 36 1: PASS 10/10 (kem records carry no act kind `k`, so check 8 «every NPC act has a cause» still counts only acts).
- ob-verdict.test.js: ALL 81 OK (incl. old save loads and plays a buổi). viecnho-fix.test.js: 1 FAIL «result stamp covers no text {hit:[kat]}» = OB-VERDICT r3 .kmseal placement (told OB-VERDICT-2); the Kèm check passes.
- quickcheck run 1 (4b0f6004): QUICKCHECK PASS · old save ok · perf new/live render 241/250, tab 667/638, buổi 1756/2215, tasks>200ms 35/39; core G1 one-core-guard FAIL = 2 inline numbers in jkitpage.js OB-VERDICT sample «Sủng −10 (34 → 24)» / «thiện cảm −5» (from 5a282542; told OB-VERDICT-2). NOT BUILT line = build hash includes the commit (rebuilt).
- quickcheck: see the line below (QUICKCHECK).
- Stills (Fold 755x1000 @2 + iPad 1180x820 @2, LIVE vs fix, same seed; looked at each): CDN img/_review/one-sieve/ —
  live-fold-card.png (Kèm 8 rows + «… và 1 người khác») vs fix-fold-card.png (Mất 1 row + ONE Kèm line), live-ipad-card.png vs fix-ipad-card.png,
  live-*-soghi.png vs fix-*-soghi.png (kind tabs, person chips, search box), live-*-night.png vs fix-*-night.png (night card Kèm). NOTE: the card stills
  fold-card / ipad-card were taken BEFORE MAIN 157's Kèm choice (they show the dropped one-line summary); the night stills show the current Kèm.
  Seen, not mine: iPad night card — title «Đêm êm đềm» + line sit over the act cards behind, to the right of the picture (jne layout, for KK41 / OB-VERDICT). Stills force the card visible (a «Mật báo» gate hides it while the
  dawn layer plays; the script removes those layers). Seen, not mine: the Sổ ghi shows «Trong cung truyền tai nhau: … đang buồn …» twice in one
  tuần (NEWS-SIEVE dedup is per exact text) — for NEWS-SIEVE owner / MAIN.

## OPEN FOR MAIN
1. KIT keeper (KK40): the Kèm line reuses `.kkem` / `.kkems` / `.kkeml` (existing kit CSS) and the Sổ ghi bar reuses kitSubTabs / kitTabRowHTML /
   kitInput — no new CSS; please confirm (law 9).
2. OB-VERDICT kaAimStat still prints «(42 → 37)» on the target row; KIT 7.1 says «−5 (37)» — OB-VERDICT-2's call (told).

QUICKCHECK run 2 (f5e70415): old save ok · perf new/live render 259/258, tab 642/682, buổi 1488/1549, tasks>200ms 37/35; FAIL longTaskMaxMs 3155 vs
live 1832 (limit 2931) = one long task (run 1 on the same sieve code: 2009 vs 2419, PASS → box noise, rerun on land); G1 one-core-guard = the same 2 OB-VERDICT
jkitpage sample numbers (not this branch's code).
Kèm row: KK41 rolled; its ONE kitKemRow (review/kit-kem-row-r2 e384546b) will be rebased by KK42 with this branch's two content lines (kaNT totals,
K.more tail) — KK41 asked to keep this branch's copy (f5e70415) until that lands. On land: take KK42's kitKemRow, keep jnsieve nsCard feeding K / K.more.

## HANDOVER
Nothing left on this job except re-merging review/ob-verdict(-rv) / KK42's kit-kem-row when they land. Context used ≈ 27 % (roll line 30 %).

## ROLLOVER HANDOVER (ONE-SIEVE #1 session_01V1ZZH2fHrCdnudewe1PcfC → successor opened by MAIN 158)
Context measured 44 % (START ≈ 5 %, roll line 30 %): rolled. Branch review/one-sieve e61586f9+ (this commit). MAIN 158 LOOK on e61586f9: night card 3 lines PASS, Sổ ghi tabs/chips/search PASS.
OPEN ORDER (MAIN 158, 26/11 11:22Z, verbatim): "One fix (law 11, same family): the Sổ ghi record that holds the folded names is still a glued wall («Trong cung vừa qua — kèm theo trong cung: Hoàng hậu … ghen +1 (19); Quý phi … ghen …» ×10 on one paragraph) → render those records with the SAME kitKemRow one-per-line form (named once per feeling, «N vị khác»), via the kit part, no copy. Then RESTACK: base = review/ob-verdict-rv FINAL 5dc1db31 + KK42's kit-kem-row-r3 (after it merges 5dc1db31; d356c9f6 SMALL PASS) + news-sieve-rv 82eb2832; DROP your own Kèm copy (KK42's kitKemRow is the one; your kaNT + K.more points are in it). viecnho-fix + G1 are fixed on 5dc1db31. Rerun one-sieve/news-sieve/ob-verdict/kit-kem-row tests + quickcheck → LAND READY to me; I open the BIG rv. («???» in Sổ ghi lines = KK42 fixing kitName.)"
HOW (for the successor):
1. Sổ ghi record: jnsieve nsCard writes it with recPush({t, ids}) + r0.kem=1. Store the folded items on the record instead of a text wall (e.g. r0.K=[{id,k,d,t}] for ghen/oán and {id,k:"thiện cảm",d,t} for bystander rows), and in recMerge's row() render a record with .K through the kit kitKemRow (build K entries {v:RV(id),k,d,t}; kitKemRow names / groups / masks itself) after a short lead «Trong cung vừa qua — kèm theo:». Old records without .K keep their text. Check one-sieve.test check 3 (it reads x.t of new records: keep the names in t too, or change the check to read .K).
2. Restack: new branch state = merge review/ob-verdict-rv 5dc1db31, then review/kit-kem-row-r3 (KK42), then review/news-sieve-rv 82eb2832 into review/one-sieve; in j63 conflicts take THEIR kitKemRow entirely (drop this branch's copy) but keep: kaResultRows `nsCard` call (per entries carry v,d; `K.length=0;K.push(...SV.kem);K.more=SV.more;K.fold=SV.fold`), the `!(K&&K.more)` empty-card guard, `fold:K.fold||null` in kaLastResult. Verify KK42's kitKemRow honours K.more (tail «… và N người khác» / «N người khác trong cung đổi lòng chút ít») — if not, tell KK42, don't copy.
3. Rebuild (bash dev/site/build_site.sh), tests: node dev/test/one-sieve.test.js dev/index.html 12 {1,2,3}; news-sieve.test.js dev/index.html 36 1; ob-verdict.test.js; kit-kem-row.js (KK42's); viecnho-fix.test.js; bash dev/tools/quickcheck.sh (≈25 min; run in background). Stills: dev/test/one-sieve-shots.js / one-sieve-night.js (Fold 755x1000 + iPad 1180x820) → CDN img/_review/one-sieve/ via python3 dev/site/cdn_sync.py.
4. Update this report, push, send MAIN 158 session_01V1ZZH1pQzdRNK5sLJfMJc1 «LAND READY <sha>».
