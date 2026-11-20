# Polish pass brief (B3 road chapters) — edit ONLY the rdfrag files named in your task; no commit, no build
Files are data in the jrd_tt.js shape (see BRIEF.md in this folder for the shape and all rules, incl. "PATTERN FIXES").
1. HISTORY (expert pass, binding): read /home/user/wt/b3/.tmp/road-history.md — the "RULES FOR THE ROAD WRITERS" section (7 rules) and any
   section naming your roads (e.g. §10 thd_sach .9). Apply to every chapter of your roads: a consort is NEVER in a court hall, trial,
   triều hội, kinh diên, behind a screen at court or a trial (rewrite to allowed channels: bên gối / Ngự thư phòng after court, Thái hậu,
   Hoàng hậu, family petitioning in their own name, a clean Ngự sử/official, a eunuch with palace-law risk, a note, a gift); verdicts and
   appointments are the Emperor's (she only influences); a chapter saying «Tam ty»/«Tam pháp ty» names Hình bộ, Ngự sử đài, Đại Lý tự once;
   hồi tị as an option where a judge is related; retrials only after an Emperor's chỉ (show it); sedition softening shown as the Emperor's
   grace; no year / real dynasty / real person. Grep: rèm|thính chính|triều đường|công đường|đại điện|giữa điện|kinh diên|Tam ty|Tam pháp.
   Maids at Thận hình ty / Nội vụ phủ questioning are fine (servants), a raised consort is not questioned there in person.
2. LOSS TEXT: many options got a scripted numeric loss (c or l) whose lx still describes something else. For every option, lx must name the
   real effect it applies (e.g. c:{danh:-2} → lx says the standing/Danh loss in story words, consistent with the c/l keys; it may keep the
   story reason). Keep or improve numbers so no option is the obvious best; never remove a loss.
3. Keep: no A.sc in o:, guards (if:/need) for beats that state a cast person's rank/illness/child/office, cổ trang Vietnamese, no digits.
4. Gate after editing: cd /home/user/wt/b3 && node --check dev/build/rdfrag/<road>.js && node dev/measure/road-option-scan.js dev/build/rdfrag/<road>.js
   → 0 FREE GAIN, 0 text-only, 0 DOUBLE (digit hits on {n1}/{n2} tokens are false positives).
FINAL MESSAGE (short, English): per road the history changes made (chapter: what), count of lx lines rewritten, remaining doubts.
