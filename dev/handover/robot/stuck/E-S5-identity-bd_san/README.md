# E-S5 runner — ES8-bd_san-R7-cautious3-h: harness «LIFE IDENTITY CHANGE» false void on bd/bd_san (28/11)
PRIORITY #1 CHECK: Foreman E C9 order (HOLD seed 304984224 for F; evidence only, no profiles). Foreman asked for 2 identity PNG in git — included (brief default is shots never in git).

Row: bd / bd_san, cautious, seed 304984224, iPad, LIVE game build 5fb13d60+/8af7b3429f38 (2026-11-27T21:15Z), harness f65d019b, FRESH start, profile deleted, pin=0.

| attempt | recorded identity (first in-life scan, buổi 1) | page at void | buổi |
|---|---|---|---|
| 1 | Ngụy Tịnh Sơ · Công chúa Ba Tư hòa thân · born −17 | Đoan Mộc Hương Ngưng · same origin · born −19 | 7 |
| 2 | Sử Lạc Yên · Công chúa Ba Tư hòa thân · born −19 | Đoan Mộc Hương Ngưng · same origin · born −19 | 8 |

Reading: same seed, same origin, same final heroine «Đoan Mộc Hương Ngưng» both times (clock 1.0.1.1), but the FIRST recorded name differs per attempt → the harness's first in-life scan read a placeholder / another heroine's name (the origin screen or a different S.name source on bd) and stored it as the identity. At buổi 7–8 the page shows the seeded heroine → hard stop, VOID (never counted). Not a different life in the save: attempt 2's birth year (−19) already equals the final one; only the name differs. The other 3 ES8-h rows (greedy3, lover1, scholar3) did NOT trip it. Trace before the void: «Hội phối đồ: báo đề» dialogs / Sang buổi on page «Chung Tú cung · Minh Hòa hiên» (attempt 1), «Vĩnh Hòa cung · Hòa Chương hiên» (attempt 2).
Files: attemptN/<log, identity-N-dump.json, identity-N.png> (profiles/ckpts not copied; voided ckpt is stamped ended+void, no replay).
Seed 304984224 is HELD until F relaxes the identity baseline on bd origin (e.g. record after buổi ~10 or accept a name change when org+born are unchanged).

## UPDATE 28/11 ~03:10Z — Foreman E C9 repro A/B (plain reload of a persisted life)
greedy3 (bold, seed 2922198749) void: «SAVE STALE stored b<1 live b50 chars 79319 (stored clock unreadable, live 1.4.0.1)» at ~b50 → unstick reload (title «chơi một mình») at b61 → NEW life (clock 1.0.0.0, Thiệu Tuyết Kiến) → identity void. Log: greedy3.log. NOTE: same seed 2922198749 gave «Lữ Ngọc Hành» (greedy3) and «Vân Liên Y» (repro A) → the seed does NOT pin the heroine.
Repro (repro/reload.js: harness slice=20 on LIVE 5fb13d60+/8af7b3429f38, iPad, fresh profile, pin=0; then a NEW browser on the SAME profile = persisted localStorage, goto LIVE, tap title «Chơi một mình» → «Tiếp tục kiếp này»):
| case | origin | save before (localStorage hclh-save-v2-1) | title shows | after continue |
|---|---|---|---|---|
| A | bd / bd_san | 62 173 chars (b20, 14 keys) | «Chơi một mình · Tiếp tục: Tần Vân Liên Y» | «Tiếp tục kiếp này» → Vân Liên Y, Tần, 18 tuổi, same life |
| B (control) | pf / pt_su | 61 518 chars (b20, 14 keys) | «Chơi một mình · Tiếp tục: Đáp ứng Viên Cẩm» | «Tiếp tục kiếp này» → Viên Cẩm Sắt, Đáp ứng, 19 tuổi, same life |
Conclusion: at b20 bd_san persists and resumes exactly like the control → NOT «bd save never persisted». The failing signature in greedy3 starts ~b50 («stored clock unreadable») and cautious3 void at b7/b8 has no reload in its log. Open: need the same reload at b50–60 (and cautious3 b7 cause). Limits: this reopens the profile in a new browser (localStorage persistence) — not an in-page location.reload() or the harness unstick reload.
