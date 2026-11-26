# ONE-SIEVE — report (worker session_01V1ZZH2fHrCdnudewe1PcfC, coordinator MAIN CHÍNH 156)

depth 5 · START_CTX ≈ 5 % (get_session reads 0; own estimate) · roll at ≈ 30 %

PRIORITY #1 CHECK ('one sieve'): OD 26/11 ~06:50Z (B) ONE SIEVE + ~04:40Z / ~05:05Z NEWS SIEVE + ~08:30Z pillow verdict (read verbatim) |
main: jnsieve (on review/news-sieve), j63 kaResultRows / kitKemRow / kaWhyCl, jhc knownList, j6 Sổ ghi tab | review/*: review/news-sieve 2a24d4db
(base, extended), review/act-merge-J0 52334847 (KIT 7.1 kaNT «+8 (42)», MERGED, not rebuilt), review/ob-verdict 5a282542 (seal / «Người ấy» /
«Ai làm», MERGED, not touched), review/qc-noise-hygiene (PLAYER-NOISE BUDGET (A) = FOREMAN F #19 worker session_01UV1Szjdc6ChaY51kuwNyt3 —
NOT duplicated here) | claims: NEWS-SIEVE(-2), OB-VERDICT, QC-NOISE-HYGIENE.

## RESULT — branch `review/one-sieve`
Stack: review/news-sieve 2a24d4db + LIVE 3af7896e + review/act-merge-J0 52334847 + review/ob-verdict 5a282542 (only built files / list
conflicts; j63 merge: OB-VERDICT's target «rel» parts now use kaNT totals too). Land order: J0 and ob-verdict first (or this branch carries them).
OB-VERDICT-2 (session_01V1ZZH3VrbDxs1F7ghNy88g) told: it owns seal / Người ấy / Ai làm; this branch owns which OTHER rows show. If it pushes
again, re-merge review/ob-verdict.

ONE function (law 4 / OD (B) «ONE function, no per-screen filters»): `nsSieve(o)` in dev/build/jnsieve.js §7 —
`{t}` text → touches her / not NPC-only (nsHerLine / nsNpcLine, the NEWS SIEVE test); `{v,d,why,tgt,ev}` person → her, household,
Hoàng hậu, her act's target, evidence, |change| ≥ BAL.news.card.big, or the span's log names that person in a line about HER. Every surface asks it:

| surface (OD (B)) | what changed | where |
|---|---|---|
| (1) result cards | bystander person rows kept only when nsSieve passes (≤ BAL.news.card.rowMax, largest first); every other person change + every ghen/oán = ONE Kèm line «Trong cung: 9 người ghen thêm (Hoàng hậu … +10, …), 2 người nguôi oán» (names + «+N (total)» behind the tap, kit .kkem); ONE Sổ ghi record per card with all names and numbers; link «Xem đầy đủ trong Sổ ghi» (source text, was «ở Nhật ký» + a j79 observer) | jnsieve nsCard ← j63 kaResultRows / kitKemRow |
| (2) «VÌ SAO» rows | the reasons come from the span's log clauses minus NPC-only clauses (they stay in the Sổ ghi) | jnsieve wraps kaWhyCl |
| (3) Hậu cung view | «Đã biết về X» (relPair / knownCol): facts that touch HER first, the rest after (nothing dropped). The relation view itself already opens on Ta (relSel "me", relYk default Ta) — unchanged | jnsieve wraps jhc knownList |
| (4) person pop-ups | same knownList (kitKnownList, «Đã biết: N tin» chip, kitIntel) | same |
| (5) Sổ ghi | kit kind tabs (Tất cả · Việc của ta · Chuyện hậu cung · Mưu hại; empty kind = no tab), person chip row (12 most named), kitInput search (accents ignored); rows hidden, empty date headings hidden | jnsieve §8, BAL.news.logTabs |
| (6) news at home | the Khuê các feed already goes through the same sieve (newsAdd / kitKnow / morning card wrappers have no home gate); the harem record stays off at home (OD 25/11 ~23:10Z); «Thư từ · Tin trong cung» at home = her own knowledge list (her choices) — no change needed | — |
KIT.md §7 «KÈM» line = CANON OVERWRITE in place (law 14) of «Kèm: 12 phi tần ghen thêm 8 / one line per person (MAIN 129)»; Sổ ghi kit note added.
LAW 16 note for MAIN: MAIN 129 / owner 24/11 ~21:57Z had «ONE line per person» in Kèm; OD (B) (MAIN 156 order) replaces it with ONE summary
line + Sổ ghi. If sếp wants the per-person Kèm back, it is BAL.news.card.kemMax (1 → 99).

## BEFORE / AFTER (node dev/test/one-sieve.test.js <page> 12 <seed>; 12 tuần bot life, every «Trong cung vừa qua» card + one act of hers per tuần)
| seed | LIVE 3af7896e: cards · rows/card avg / max · Kèm lines max | review/one-sieve: cards · rows/card avg / max · Kèm lines max · bystander rows max |
|---|---|---|
| 1 | 42 · 5.1 / 17 · 9 | 46 · 3.2 / 12 · 1 · 2 |
| 2 | 44 · 4.8 / 18 · 9 | 40 · 2.6 / 11 · 1 · 1 |
| 3 | 38 · 3.6 / 18 · 9 | 39 · 2.6 / 10 · 1 · 1 |
(rows = every item in the card body; the largest fixed cards are HER own rows: Sức, Sủng, Danh … + Hoàng hậu / Thái hậu / maid.)
Lines per buổi of the daily feed: unchanged from NEWS-SIEVE-2 (its test re-run PASS 10/10, seed 1).

## TESTS (this box, build faba991a+)
- one-sieve.test.js seeds 1/2/3: PASS 7/7 each (bystander rows ≤ 3; Kèm = 1 line + link; every folded person in the card's Sổ ghi record;
  0 «Vì sao» from NPC-only clauses; Sổ ghi tabs + search narrow 450 → 70 rows; 0 page errors).
- news-sieve.test.js 36 1: PASS 10/10 (kem records carry no act kind `k`, so check 8 «every NPC act has a cause» still counts only acts).
- viecnho-fix.test.js: ALL OK. ob-verdict.test.js: ALL 39 OK (incl. old save loads and plays a buổi).
- quickcheck: see the line below (QUICKCHECK).
- Stills (Fold 755x1000 @2 + iPad 1180x820 @2, LIVE vs fix, same seed; looked at each): CDN img/_review/one-sieve/ —
  live-fold-card.png (Kèm 8 rows + «… và 1 người khác») vs fix-fold-card.png (Mất 1 row + ONE Kèm line), live-ipad-card.png vs fix-ipad-card.png,
  live-*-soghi.png vs fix-*-soghi.png (kind tabs, person chips, search box). Stills force the card visible (a «Mật báo» gate hides it while the
  dawn layer plays; the script removes those layers). Seen, not mine: the Sổ ghi shows «Trong cung truyền tai nhau: … đang buồn …» twice in one
  tuần (NEWS-SIEVE dedup is per exact text) — for NEWS-SIEVE owner / MAIN.

## OPEN FOR MAIN
1. KIT keeper (KK40): the Kèm line reuses `.kkem` / `.kkems` / `.kkeml` (existing kit CSS) and the Sổ ghi bar reuses kitSubTabs / kitTabRowHTML /
   kitInput — no new CSS; please confirm (law 9).
2. OB-VERDICT kaAimStat still prints «(42 → 37)» on the target row; KIT 7.1 says «−5 (37)» — OB-VERDICT-2's call (told).

QUICKCHECK: (pending)
