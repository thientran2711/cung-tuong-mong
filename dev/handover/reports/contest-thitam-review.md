PRIORITY #1 CHECK ('thi thố|hạng nhất|thị tẩm|lật thẻ|contest'): OD 77 | ledger 6 | claims 8 | main 15 | review/* 9 | archive 0 (sparse handover worktree; worker's full count: archive 314)

# BIG REVIEW — D3 review/contest-thitam — FINAL VERDICT: PASS 2c956d97 (first pass fcd5c086 = FAIL, 4 findings; all fixed)

Reviewer: BIG reviewer (opus) session_01D3E3NXwED3bj8Xfp41CezN · depth 3 · START_CTX ~3 % · child of worker D3 session_01D3E3NY4u5PWtro3m4FhbDG.
Base: branch fcd5c086 is a fast-forward of LIVE 6b5d3d05 (`git merge-base --is-ancestor origin/main HEAD` = yes). Diff = jctn.js (new) + call sites
in j71 / j8 / j34 / jts / j67 + BAL.ctn (jbal2) + assemble.py + tests/scan/report.
Owner rule (verbatim, OD «26/11 ~01:25Z»): "Tôi thấy hiện tại tỉ lệ được lật thẻ bài thấp quá. Tôi muốn khi thắng hạng nhất các cuộc thi, ngoài
phần thưởng hiện tại, còn được thị tẩm đêm đó" → ruling (1): first place in ANY contest ⇒ also thị tẩm that night.

## What holds (verified, not trusted)
- Logic test `node dev/test/contest-thitam.js` re-run on my own builds (assemble.py on branch and on LIVE 6b5d3d05):
  branch 16/16 · branch LEDGER=1 16/16 · LIVE 0/16 · 0 page errors. Not-given case (with child): no promise, the tablet runs as before.
  Lật thẻ odds: BAL.ag.emp.summon `[90,65]` identical on both; nightCh untouched in the diff.
- Rewards unchanged: the diff only ADDS `ctnWin(...)` after each prize line; no prize code changed (Sủng/Danh deltas in the test differ only by
  the random empGive/bestow roll, both directions).
- Mechanism: ctnWin uses the existing j75 night-taken mark S.ntk (same as his own visit) → no flip, no steal, normal night path (jnf herNight /
  resolveTonight rivalNight / co-op host flip relay). Old saves: S.ctn absent = nothing promised (safe). Servant / khuê các / lãnh cung / ill /
  with child refused through isSrv / isKc / nightCh — same rule for NPCs (law 1).
- LAW 4: BAL.ctn.on (switch only, no new number). LAW 7: no %, cổ trang words. LAW 9: kit modal card (Q) + log line only, no new part.
- Real-tap videos (worker's, 4 files; frames extracted and looked at): branch Fold + iPad show «Kính sự phòng báo tin» → Chuẩn bị thị tẩm →
  Đêm thị tẩm, no flip choice; LIVE shows no card and the flip deciding. Layout clean on both devices.
- Co-op: see «Co-op re-run» at the end.

## FINDINGS (FAIL)
1. LAW 11 WHOLE FAMILY — contest kinds missed (the scan cannot see them).
   - `dev/build/jrd_thd.js:110` road chapter thd_tho_7 «Vòng thi Ngự hoa viên» (kỳ Xuân thí, Hoàng thượng presiding): ending `win`
     «Bài ngươi đứng đầu vòng Xuân thí…» = her FIRST PLACE → no ctnWin. Ending `lose` (`:112`) «{v} đứng đầu vòng Xuân thí» = an NPC's first
     place → no ctnWin (LAW 1 two-way). Same road's chapter 4 (j67 ARC67 thd_tho «Tài nữ số một») IS wired → one road, two rules.
     Failure: she wins the Xuân thí round (the only poetry contest of the Thư hương road's middle chapters) → that night the tablet is turned as
     usual; promised rule broken.
   - `dev/build/jrd_bd.js:262/265` road chapter bd_san_9 «Mã cầu và hội bắn xuân»: option «Tự giương cung bắn mũi cuối» → `win`
     («Mũi tên của ngươi xẻ đôi mũi tên của em trai {v} trên hồng tâm») = she wins the archery contest → no ctnWin. (The other `win` road,
     «Đưa cây cung cho hoàng tử», is the prince's shot, not hers → no night; «Hạ cung» → {v}'s brother wins, not a consort → no night.)
   - Scan blind spot `dev/tools/contest-thitam-scan.py` M3: needs «Kỳ thi|Hội thi|kỳ khảo|khảo việc» AND «đứng đầu» on ONE line, so «vòng Xuân thí»
     and «hội bắn» are invisible; «0 unknown sites» is not proof. Fix: also scan j67/jroad arc nodes (ARC67 / rdDef `t` / `sj` / `g`) for
     thi|hội bắn|tranh tài|so tài|đua and their E endings for đứng đầu|thắng hội|xẻ đôi …; add both chapters to KIND (wired), and list the
     excluded kinds with their reason so the table is the whole family: jkc/jkcg khuê các festivals (before she enters the palace), jpma
     «Thách đấu / Cùng chơi» (1-to-1 duel, not a ranking contest; wiring it would make nights farmable daily), j31 «Hội Phượng» (one arrow roll,
     no ranking), jexam khảo hạch (pass/fail), jrd thd_tro / thd_hoc / bd_soi / bd_hen (contestants are scholars / children / men).
2. THE PROMISED GAIN IS NOT SHOWN ON THE CARD. Every entry card shows the kit hint (jk2b `kitHint`, hideOutcome), which keeps only the first two
   gains (`good…slice(0,2)`, jk2b.js:299). `ctnX()` is appended 3rd/4th, so it is always cut. Proof:
   - worker's own Fold video, frame t≈16.5 s: «Dự thi thơ … ĐƯỢC: đoạt giải, bệ hạ để mắt hơn; thường ổn» — no night.
   - probe on the branch build, j71 card text at hint level 0/1/2: «đoạt giải, được để mắt…» / «đoạt giải, bệ hạ để mắt hơn; thường ổn…» /
     «đoạt giải, Hoàng thượng để mắt hơn…» — no night at any level; the feast card «đứng đầu, bệ hạ để mắt hơn; thường ổn» — no night.
   The report's claim «Every contest entry card prints the extra gain» holds only for the raw `x` string, not for what she sees.
   Fix: make the night one of the first two gains (e.g. «đoạt giải, đêm ấy được thị tẩm, Sủng …») on j71 (3 cards + festival day card),
   PEND.j71x, jts «Tự tay phối đồ», or, if the kit hint must rank it, a KIT REQUEST (do not patch kitHint yourself, LAW 9). Re-check on the
   real cards at Fold 755x1000 + iPad 1180x820.
3. WORDING (LAW 7 / VANPHONG, clarity): `ctnX()` says «đêm nay được thị tẩm» on cards for a contest held LATER: j71.js:338 fInv7
   «Lời mời · … (tuần tới)» and j71.js:384 PEND.j71x (feast sign-up weeks ahead). Read as «tonight». Use «đêm ấy được thị tẩm» (j34 already
   says «đêm ấy») — one wording for all cards.
4. CAUSE BEFORE EFFECT (owner's own complaint in the same OD row: things happen «mà không hiểu vì sao»): in the Fold video her «Kính sự phòng
   báo tin» card opens BEFORE the contest's «KẾT QUẢ» card (t≈16 s then ≈20 s), and the KẾT QUẢ «Được» rows list Sủng / Danh but not the night.
   Fix: queue the summons card after the result (or add the night as a row of the result's Được) so she reads «you won → the night» in order.

## ADVISORY (not a FAIL; for the worker to measure, for Foreman D to weigh)
- Two-way means every NPC first place now also takes that day's tablet away from her. Her nights per year go UP only if her share of first
  places is larger than her ordinary per-night tablet chance. The owner's motive is «tỉ lệ lật thẻ thấp quá»; please add a 1-year robot count
  (her nights / year, LIVE vs branch, ranks 0–3) to the report so sếp sees the net effect.
- Guaranteed night (no steal) is the worker's choice — keep it in the report's «Decisions» for sếp (fine by me).

## Laws checked
1 two-way: OK for the wired kinds (NPC + friend's entry), NOT for Xuân thí `lose` ({v}) → finding 1 · 2/3 equal value / gain-loss: no new choice ·
4 one core: BAL.ctn.on · 5 n/a · 6 real people: NPC winners get a real night (rivalNight) · 7 wording: finding 3 · 9 kit: OK (Q card + log) ·
10 n/a · 11 whole family: FAIL (finding 1) · 12 devices: videos Fold + iPad looked at · 13 prio1 line: present.

## Re-run commands
python3 dev/build/assemble.py (branch + LIVE) · node dev/test/contest-thitam.js file://…/dev/index.html (and LEDGER=1) ·
python3 dev/tools/contest-thitam-scan.py <root> (branch 8/8, LIVE 0/8 — but see finding 1) · node dev/test/coop-contest-thitam.js (+ C4FIRST=1).

## Co-op re-run (LIVE Worker, 2 browsers: host Fold 755x1000@2 / guest iPad 1180x820@2) — reviewer's own runs
| case | result |
|---|---|
| C1 host first | PASS: host keeps tonight (ntk me) + her card · played tối = host on both seats, no flip choice · host +1, guest 0 |
| C2 friend's entry first (host's contest) | PASS: host keeps it for entry 902 · guest gets ok relay + her card · played tối = guest on both seats · guest +1, host 0 |
| C3 guest first on her own seat (relay) | rule PASS: relay → guest card + ntk · played tối (d6) = guest on both seats · guest +1, host 0. Harness: «week merged once» FAIL (host + guest queues hold «Lễ Phật đản» twice = the stall the worker reported) |
| C4 NPC first (C4FIRST=1, on build ab9e28b0) | PASS: host keeps it for NPC 1 · played tối (d4) = NPC 1 on both seats · neither seat +1 |
Run 1's C4 failed only because C3's stalled week never merged (seats still on d6); the C4FIRST run proves the case.

## RE-CHECK of the fixes (ab9e28b0, worker D3 «RV-FIX»), code + logic only — final PASS waits for D3 #2's sha + new videos + 1-year count
- #1 whole family: jrd_thd thd_tho_7 round (her :110 + {v} :112) and thd_tho_10 board (her :209 + {v} :211) wired; jrd_bd bd_san_9 only on her own
  shot (option f:"ctnself" → E.win checks A.f.ctnself; prince's shot → no night). Scan widened: 27 kinds · 13 should · 13 wired · 0 unknown; the
  excluded kinds are listed with reasons. OK.
- #2 card: ctnF() puts «đêm ấy được thị tẩm» FIRST. Probe at hint level 0/1/2 → «đêm ấy được thị tẩm, đoạt giải, …»; feast card the same. OK in
  code; the jts «Tự tay phối đồ» card must be checked on the real screen (my probe could not build its card shape).
- #3 wording: «đêm ấy» on every entry card. OK.
- #4 order: jctn cardLater waits for the result toast / podium / mini-game board (BAL.ctn.waitMs 1500, cap 60 s), and the toast's Được gets
  «đêm ấy được thị tẩm» (kit item markup). OK in code; must be seen on the new videos.
- Logic test on ab9e28b0 build: 21/21 (16 + 5 new story rows), 0 page errors.

## FINAL RE-REVIEW — PASS 2c956d97 (D3 #2; FF of LIVE 3af7896e, `merge-base --is-ancestor` = yes)
- Diff vs LIVE: only the D3 files (assemble, j34, j67, j71, j8, jbal2, jctn, jrd_bd, jrd_thd, jts) + tests/scan/report.
- New fix 32bdeda4 (jctn tagToast): the KẾT QUẢ toast gets «đêm ấy được thị tẩm» on the card tick after it is painted (data-ctn, no double).
- Scan on 2c956d97: 27 kinds · 13 should · 13 wired · 0 unknown. Logic test on my own build of 2c956d97: 21/21, 0 page errors.
- Videos (new, real taps; frames extracted and looked at): Fold 755x1000 — entry card «ĐƯỢC: đêm ấy được thị tẩm, đoạt giải, bệ hạ để mắt hơn»
  → KẾT QUẢ «Được: đêm ấy được thị tẩm · Sủng +4 · Danh +3» → Kính sự phòng card → night. iPad 1180x820 — card → KẾT QUẢ → bestow chest →
  Kính sự phòng card. Order right on both (finding 4 closed). jts «Tự tay phối đồ» PNGs, Fold + iPad: «đứng đầu: đêm ấy được thị tẩm» first, kit card, no overflow.
- 1-year robot (worker's, 16 lives each): her nights/yr LIVE 10.2 vs branch 10.6 (net ≈ +0.4, inside noise); her firsts 1.9/yr, NPC firsts
  4.4/yr. For sếp: the two-way rule keeps her net gain small; she gains clearly only when she wins more contests.
- Co-op: worker 27/27 on the merged build; mine C1/C2/C4 PASS + C3 rule PASS on the earlier build. The «Lễ Phật đản ×2» stall is
  pre-existing (same on bare LIVE, per worker; coop-clear now taps «Bỏ qua» / «Đã hiểu» in the kg82 frame).
- Quickcheck 1485a122 (worker): PASS (open 0 errors, old save OK, perf new/live render 181/244, buổi 1084/1507); CORE G4 80-dialog-fixed 2 rows FAIL = pre-existing, identical on bare LIVE 3af7896e. Gate closed; LAND READY sent to Foreman D.
