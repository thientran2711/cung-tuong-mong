# rv-dialog-person (part 1) — MAIN CHÍNH 87 reviewer, 21/11
PRIORITY #1 CHECK: OD 21/11 marks #58 #59 #67 #70 #77 | worker de1d7e11 (reports/dialog-person.md) | main fafe0f62 | claims row 21/11 04:08Z.

VERDICT: **PASS (part 1)** — branch review/dialog-person-rv @ 642f056d, fast-forward of origin/main fafe0f62 (merged main 3 times; jksize.js conflict with mood-seal kszLiveMark3 resolved by keeping both `m` and `mk`; index/sw rebuilt, never conflict markers).

Gates
- quickcheck on 17730f2a (main 8b2e344d): PASS (open, old save loads + plays a buổi, perf 230/214 ms, core gates, time-spill). Not re-run on 642f056d: the last merge only brought chiton-name; dialog-person-scan re-run PASS there.
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js`: 92/92 passed.
- dev/test/dialog-person-scan.js (Fold + iPad): PASS. Speaker table: every narrator kind and every own-act picker at home and away resolves to her own figure; officials (news/notice/week/choice/rule/info/evidence/night/reward) never walk in unless really present; ma-ma figure gone. Person option cards: entpick 2/2, spy 9/9, evpick 10/10, itarget 10/10, plantsv 9/9, gift 12/12 have kit avatar + rank/name stack, 0 loose crops, 0 event pictures, on both sizes.
- Real events (j24 approaches, 20 festival invites, merit "Lập công", cung nữ road): 0 page errors, 0 overflow/cut dialogs; figure = the person named in the dialog or her own; no default ma-ma anywhere.

Looked at (Fold 755x1000 + iPad 1180x820): Tin đồn (Thái hậu named), Tết Nguyên đán (Hoàng thượng host), Lễ Vu Lan, Lập công · Bắt kẻ tham ô (her own maid Thải Chi named), news dialog without person (no figure), Đêm yên (her own figure), 6 person pickers. LOOK 3x done.

Notes for the next sha (not FAIL, part 2 scope)
1. A small round face badge sits on top of every left figure (also her own figure → second copy of the same face, iPad "Đêm yên"); this is the one-avatar rule.
2. Festival cards carry an explicit `who` (Vu Lan, Vạn thọ, Thánh thọ, Đông chí, Lạp bát → Thái hậu as host). It is the event's own named person, so legal under law 6b, but if sếp thinks "chùa mở đại lễ" has no Thái hậu in it, the data (j71 who) needs a ruling.
3. Cung nữ road: "Lễ Phật đản", "Sứ đoàn vào triều" notices show who="?" (a person without name field) but no figure column; harmless.
