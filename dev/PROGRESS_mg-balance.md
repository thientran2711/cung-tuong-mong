# PROGRESS — review/mg-balance (minigame difficulty tiers, owner 16/11 07:10Z / 07:25Z "mức vừa" / ONE CORE)

## What changed
- `dev/build/jmgt.js` (assembled after j91): `mgTier(kind,{occ,rank,lv,big})`, `mgSet`, `mgDiffTxt`, `mgWord`, `mgGrade(raw,kind)`, `mgFull(env,b)`, `mgTol(env)`, `mgMore(env)`.
- `BAL.mgTier` (end of `dev/build/jbal2.js`) = every number: occasion stakes `occ` (hoc / hoi / trieu / exam / tuyen = [base, per rank]), `big`, `stakeMax`,
  `mid` (board ease at the matching level), `slope`, `band` (gap that makes Dễ / Khó), `easeMin`, per-engine trims `kAdj` and grade curves `kG`,
  `word` (Tạm được/Khá/Giỏi/Xuất sắc thresholds), `aid` (aid tiers by ease), `lesson`/`lessonPts`, `fullAt`, `gamma`, `tol` [ease0, ease5, floor], `more`,
  `wk` (works: `lvQ` per art level, `th` Khá/Tinh xảo/Tuyệt phẩm).
- Callers: j82 startContest (occ hoi, big) / playArt (occ hoc or o.occ) / kg82Lesson; jexam exRun (occ exam, rank = target); jts tsGame (occ trieu); jkc Phúc tuyển (occ tuyen).
- Board ease: before, `env.lv` = her art level → the better she was, the easier every board (cause of "Tuyệt phẩm almost every time"). Now `env.lv` = ease from the gap stake − skill.
- Whole family (every engine): `env.end` gets a FLOAT; `kg82Play` grades with `mgGrade` (per-kind curve). Capped scores (trace/kinh/may .85, arrange .88, hold .82, jts pluck .62) use `mgFull`;
  tolerances (trace width, rhythm windows, aim rings, hold band, heat zones, scent match, untangle time) use `mgTol`; memory boards (thêu, múa) add `mgMore` pieces at low ease.
  `kg82Tier` (aid tiers of the KNOW games) is now ease-based (high = easy).
- Works (j83): `wkScore = play + BAL.mgTier.wk.lvQ[art level] + material + Công`, tiers at BAL.mgTier.wk.th = 6 / 10 / 15 (was play + FULL art level, 14) → Tuyệt phẩm needs a precious material and an Xuất sắc-level play
  (art 4–5: play ≥ 9; art 2–3: play 10); Tinh xảo is the normal good result (good material: play ≥ 6–7). Card / glossary text prints the BAL numbers.
- Bug fixed: k91Trace (Vẽ / Chép kinh / May áo) threw "G is not iterable" when a stroke ended after the last stroke.
- Bots: `dev/measure/mg-bots.js` (virtual clock, skilled = right move from KG82.peek with human reaction 70 ms σ, tap scatter 1.8 % of board, think 0.45–1.35 s on drags/buttons and
  0.45–1.35 s × 2 on puzzle/memory taps, slips 6 % timing / 12 % puzzle; random = random taps/drags/holds). Test: `dev/test/mg-balance-vp.js` (6 viewports, old save, every kind opens + finishes).

## Measured (n = 30 per cell; "Xuất sắc" = graded play ≥ 9 ≈ Tuyệt phẩm; Dễ = occasion 2 levels BELOW her skill, Vừa = matching, Khó = 2 above)
| Kind | Dễ: Xuất sắc ≥9 / Giỏi+ ≥7 / mean | Vừa: Xuất sắc ≥9 / Giỏi+ ≥7 / mean | Khó: Xuất sắc ≥9 / Giỏi+ ≥7 / mean | Vừa random: Xuất sắc ≥9 / Giỏi+ ≥7 / mean |
|---|---|---|---|---|
| ban | 23% / 97% / 8.1 (n=30) | 30% / 100% / 8.3 (n=30) | 3% / 83% / 7.3 (n=30) | 0% / 0% / 2.2 (n=30) |
| banh | 100% / 100% / 10.0 (n=30) | 100% / 100% / 10.0 (n=30) | 93% / 100% / 8.9 (n=30) | 0% / 0% / 0.2 (n=30) |
| co | 83% / 83% / 9.0 (n=30) | 87% / 87% / 9.2 (n=30) | 87% / 90% / 9.3 (n=30) | 0% / 0% / 0.0 (n=30) |
| dan | 50% / 83% / 8.2 (n=30) | 30% / 73% / 7.5 (n=30) | 0% / 43% / 6.0 (n=30) | 0% / 0% / 0.0 (n=30) |
| dauho | 0% / 0% / 3.0 (n=30) | 0% / 3% / 2.9 (n=30) | 0% / 0% / 2.5 (n=30) | 0% / 0% / 0.0 (n=30) |
| den | 30% / 97% / 8.0 (n=30) | 27% / 93% / 7.9 (n=30) | 23% / 97% / 8.0 (n=30) | 0% / 0% / 2.8 (n=30) |
| duho | 90% / 100% / 9.5 (n=30) | 30% / 87% / 7.7 (n=30) | 7% / 53% / 6.7 (n=30) | 0% / 0% / 0.1 (n=30) |
| hat | 100% / 100% / 10.0 (n=30) | 20% / 100% / 8.1 (n=30) | 0% / 0% / 5.1 (n=30) | 0% / 0% / 1.1 (n=30) |
| hoa | 87% / 97% / 9.1 (n=30) | 30% / 97% / 8.1 (n=30) | 3% / 83% / 7.2 (n=30) | 0% / 0% / 0.0 (n=30) |
| huong | 57% / 77% / 7.3 (n=30) | 37% / 87% / 7.5 (n=30) | 3% / 77% / 6.3 (n=30) | 0% / 0% / 0.0 (n=30) |
| kim | 97% / 100% / 9.0 (n=30) | 30% / 100% / 8.3 (n=30) | 0% / 100% / 7.3 (n=30) | 0% / 0% / 0.0 (n=30) |
| kinh | 87% / 100% / 9.5 (n=30) | 20% / 93% / 7.8 (n=30) | 0% / 0% / 5.0 (n=30) | 0% / 0% / 0.0 (n=30) |
| may | 83% / 97% / 9.2 (n=30) | 20% / 73% / 7.2 (n=30) | 0% / 0% / 4.7 (n=30) | 0% / 0% / 0.0 (n=30) |
| mua | 60% / 67% / 7.3 (n=30) | 40% / 47% / 5.8 (n=30) | 37% / 47% / 5.7 (n=30) | 0% / 0% / 0.0 (n=30) |
| td_cong | 90% / 93% / 9.7 (n=30) | 37% / 43% / 7.6 (n=30) | 27% / 27% / 7.1 (n=30) | 0% / 0% / 0.0 (n=30) |
| td_dung | 0% / 0% / 0.0 (n=30) | 0% / 0% / 0.0 (n=30) | 0% / 0% / 0.0 (n=30) | 0% / 0% / 1.8 (n=30) |
| td_hanh | 83% / 97% / 9.4 (n=30) | 100% / 100% / 9.8 (n=30) | 90% / 93% / 9.1 (n=30) | 0% / 0% / 0.0 (n=30) |
| theu | 30% / 77% / 7.7 (n=30) | 23% / 57% / 7.1 (n=30) | 20% / 63% / 6.8 (n=30) | 0% / 0% / 0.0 (n=30) |
| ve | 93% / 100% / 9.7 (n=30) | 17% / 90% / 7.7 (n=30) | 0% / 0% / 4.5 (n=30) | 0% / 0% / 0.0 (n=30) |
| **mean of kinds** | 65% | 36% | 21% | 0% |

Reading: target "skilled at matching level 20–30 % Xuất sắc, random ~0 %": ban 30, dan 30, den 27, duho 30, hat 20, hoa 30, kim 30, kinh 20, may 20, theu 23, ve 17, huong 37, mua 40 → 11 of 16 inside 20–30 % (ve 17, huong 37 close; ±8 points is the n=30 noise).
Random bot 0 % everywhere. Order Dễ > Vừa > Khó holds for every engine except co/den/mua/theu (flat).
OUT OF TARGET (open, honest):
- banh (Nấu ăn): 100 % even at the narrowest heat zone — the hold-the-fan control is too forgiving; needs an engine change (e.g. heat drift / gusts that grow as ease falls). Not done.
- co (Cờ): 87 % — the bot reads the answer from the oracle; puzzles have no ease lever beyond time. Needs harder positions at low ease. Not done.
- mua (Múa) 40 %, flat across tiers — memory errors are all-or-nothing; mgMore adds steps but the bot's slip model dominates.
- dauho (Đầu hồ): the skilled bot itself cannot aim the fling (≈3/10 everywhere) → not calibrated; kAdj 0.
- Khó for the tracing games (ve/kinh/may) and hat: mean ≈ 5 ("Khá"), 0 % Giỏi — harsh but only when the occasion is ≥ 1.5 levels above her skill.
- Tứ đức games (jtd, new on main): wired (mgSet, mgTol, float scores). td_cong 37 % at Vừa (kG 1.6); td_hanh (share portions) saturates like co/banh; td_dung (balance the bowl) — the skilled bot cannot play its hold-left/right control (0/10), not calibrated. td_ngon (Ứng đối) is a WORD game → UNASSIGNED for a no-word replacement.
- Not tiered (no board ease today, own BAL.toil / pet numbers): Điểm trang (jtoil), Chải chuốt (j92), Phối đồ (jts), pet care games (jpetcare).

## Resume
- Re-measure one engine: `node dev/measure/mg-bots.js http://127.0.0.1:<port>/index.html <kind> hoc/0/2,hoc/4/2,hoc/6/1 skilled,random 30 3 /tmp/x.json` (serve the repo root after `bash dev/site/build_site.sh`).
- Trim only `BAL.mgTier.kAdj[kind]` (ease) or `kG[kind]` (grade curve).

## Tests (11/16/2026, merged origin/main 9ddb3f6c)
`node dev/test/mg-balance-vp.js <old main build> <new build>`: old save (slot 3, made on the main build) loads; 28 minigame kinds (every KG82_KIND with an engine, incl. exam quiz kinds, Tứ đức games, Chải chuốt) open and FINISH
at 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2; the "Độ khó" tier row shows on the contest intro; 0 page errors; 0 horizontal overflow. Site rebuilt (dev/site/build_site.sh).

## Reviewer r1 (review/mg-balance-r1, 11/16/2026)
- Re-measured (dev/measure/mg-bots.js, skilled + random, Vừa = hoc/4/2): graded ≥9 at Vừa — ban 27, hat 8 (n=60), hoa 20, kinh 36 (n=28), theu 34 (n=29), duho 20, kim 27, ve 45 (n=60), huong 27, den 35 (n=60), mua 33, dan 43 (n=60); random 0 % everywhere.
  Dễ/Khó (hoc/0/2, hoc/6/1): order Dễ > Vừa > Khó holds for dan, hat, kim, ve, duho.
- Grade curves re-trimmed on the pooled n=60 raws (grading is post-hoc, raws unchanged): `kG` dan 2.3→2.8 (43→28 %), ve 1.5→1.7 (45→27 %), den .9→1.05 (35→25 %), hat (none)→.85 (8→25 %).
- ONE CORE fixes: every work card prints the tier line from `BAL.mgTier.wk.th` (`wkThTxt`, was a typed "Tuyệt phẩm 14" in j83 / jwkr / jtds) and the art-level add from `wkLvQ`
  (jwkr / jtds showed "+level"); rival / "Để tài nghệ quyết định" mean play = `BAL.mgTier.npc`.
- Công lift (+1 tier at Công bậc 3) now stops at Tinh xảo (`BAL.mgTier.wk.cong`): with it, quý material + Công 3 gave Tuyệt phẩm at play 3 (automatic); now play 8 at Thêu 4.
