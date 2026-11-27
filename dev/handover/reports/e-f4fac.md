# E-F4FAC report — branch review/e-f4fac @ 4fd3bf42 (FF from LIVE 17f23656)

START_CTX ≈ 6 % (fresh session, ~12 % used at report). Depth: worker, no successor needed (work finished).

PRIORITY #1 CHECK: OD 0 new (OD:L221/L228 = side-chance scale, see Q1) | ledger 0 | main: j10.js facAct, j14.js coldFacActs, jrcv.js rcvAsk, j3.js:185-186, j55.js:124/125/137, dev/test/npc-roads-fix-scan.js:51 | review/*: none by name (F4 scan lives on main) | claims: this worker only.

## 1. F4 voice («lowercase after stop») — verdict: SCAN FALSE POSITIVES, no game-text fault
Scan = dev/test/npc-roads-fix-scan.js F4. Before: 16 flagged cards (88 cards, 11 asker kinds), `by` = Hoàng hậu 8, man Thị vệ 8.
| card (asker) | text | verdict | fix |
|---|---|---|---|
| Hoàng hậu × 8 (nr_emp, nr_th, nr_hh, nr_thu, nr_do, nr_y …) | «…rồi. **Đ**áp ứng được gần thánh giá…» | FALSE POSITIVE: the class `[a-zà-ỹđ]` spans U+00E0–U+1EF9, which also contains capital Đ (U+0110) / Ế / Ệ … so every sentence starting with the rank «Đáp ứng» (and Đế/Ế…) was «lowercase» | rule → `/[.!?] +\p{Ll}/u` |
| man Thị vệ × 8 (same 8 tids) | same Đáp ứng hit + self-word | the scan expected «thần» for a Thị vệ; the game (jnroadm.js:148-152, VANPHONG §2 fix r2) deliberately says «nô tài» | scan: Thị vệ self-word = nô tài, other men «thần» |
After: F4 bad 0 / 88 cards (page errors 0). No game text changed for F4 (sentences really start capitalised). Whole-family check: the same `[a-zà-ỹđ]` class appears only in this scan (git grep).

## 2. facAct family (law 6c) — dev/test/facact-log-scan.js (new; table row per act × answer; forces the receiver's answer through rcvPick)
Her side (j10 facAct) + lãnh cung letters (j14 coldFacActs) + the shared answer path (jrcv rcvAsk / PEND.rcvAsk). jagacts3 fac* NPC acts spend none of HER khắc (NPC acts; her-as-receiver ask = «sai người sang … ngươi» line + her card) → no change needed.
| act | answer | khắc | log before | log after |
|---|---|---|---|---|
| Lập phe cùng | yes | 2 | «…kết thành phe Khổng gia. **.**» (DOUBLE STOP) | «…phe Khổng gia.» |
| Lập phe cùng | qua loa (hẹn) / no / mách | 2 | line present | same |
| Mời vào phe | yes (+ qua loa/no/mách) | 2 | «…gia nhập phe Khổng gia. .» double stop; others ok | single stop |
| Xin vào phe | yes/qua loa | 2 | «…Vân gia. .» | single stop |
| Xin vào phe | no / mách | 2 | line | same |
| Rời phe · Bán đứng · Ly gián · Hợp mưu · Gạch tên | – | 0/2 | line | same |
| any rcvAsk answer whose text is "" (ticket «no/hẹn returns ""») | – | 2 | (none) SILENT | «<tên> đáp lời <người>: <tên lựa chọn>.» (rcvLine) |
| Ly gián with < 2 other members (act cannot run, divide → "") | – | 2 | (none) SILENT | khắc refunded + «Việc này nay không còn làm được, khắc chưa mất.» |
| lãnh cung letters (xin vào / rời / tố) | all 4 answers | 2 | line | same; a blank result now says «Thư gửi đi rồi, chưa có hồi âm.» |
NOTE: with the 4 real RCVK answers (no / hẹn) the LIVE 17f23656 build already logs a line in my scan (not reproducible); the ticket scenario (a result ""/no pick) is the guard I added: silent spends before = 2 (rows «empty answer», «no pair left»), after = 0.
Code: jrcv.js `rcvLine(t,p,c,s)` (used by rcvAsk NPC receiver AND PEND.rcvAsk her cards; also fixes the `$1. ` regex that saw the trailing space); j10.js facAct (`u0=used`; refund + line when r="" after a spend); j14.js `say`.

## 3. Odds words (law 7 one ladder)
| where | before | after |
|---|---|---|
| j3.js:185 Thái hậu tha ngươi | «(khả năng: rất thấp)» | «(cơ may: Khó lường)» = word(o) |
| j3.js:186 purge death «ban lụa trắng» | «(khả năng: rất thấp)» | «(cơ may: <ladder word>)» (played: «…xét lại chuyện cũ (cơ may: Khó lường), ban lụa trắng…») |
| j55.js:124 tuyển tú chuẩn / :125 gác lại / :137 cách chức | «(khả năng: …)» | «(cơ may: <ladder word>)» |
Every `khả năng:` template in dev/build/j*.js = 5 → 0 (scan dev/test/odds-offladder-scan.js, exit 1 if any returns). Other off-ladder old words (Liều/Khá chắc/…) in player text: none found (only comments/KIT_ODDS_OLD map). 

## Tests
node --check j3 j10 j14 j55 jrcv OK; assemble.py OK. npc-roads-fix-scan F4 16→0; facact-log-scan before 2 silent → after 0; odds-offladder-scan PASS; cold-faction.js ALL PASS 20; odds-unknown-scan unchanged (7/18, same before/after). fac-parity-play 4 FAIL + role-parity-drift2-play 1 FAIL are IDENTICAL on LIVE 17f23656 without my patch (the facfix seed/parity fix is parity-facfix-lr5, not landed) — not caused by this branch.

## QUESTIONS for Foreman E / owner (law 16 — I did NOT change these)
Q1. The 105 `chanceW/chanceLo` calls print «khả năng thấp / rất thấp / vừa / cao» (status cells, side chances in Được/Mất/Kèm, hints, e.g. «có thai: khả năng thấp», Sổ ghi). Owner OD:L221 (14/11) + L228 still say side chances use Rất thấp…Rất cao, while law 7 (18/11) says odds in the 7 ladder words. Two live rules conflict; I converted only the five `(khả năng: …)` narrative sites (event outcomes) and left the HUD/side-chance scale. If the owner wants ALL on the ladder: one edit in j1.js chanceW/chanceLo (word(n) per number) + canon overwrite of L221/L228 — one place, ~105 callers follow.
Q2. CLAUDE.md/VANPHONG §1 still list the old ladder (Liều…Nắm chắc) next to law 7's new one → canon-overwrite needed (law 14); not touched.

Could not do: looks (no UI change → no screenshots needed); co-op run (rcvLine touches shared answer text only).
