# review/slap-mg-r3 — reviewer pass on review/slap-mg-r2 @ dd0b618f (KIT §79)
Base: review/slap-mg-r2 dd0b618f + merge origin/main 18fb8252 (conflicts: assemble.py list = main's + jmgt after j91 + jslap after jts; KIT.md main §50.2/§81 + slap §79 both kept; index.html/sw.js rebuilt).
Contains review/mg-balance @96736fff (NOT its newer tip d1ca11be). Ship after/with review/mg-balance.

## Reviewer fixes (on this branch)
1. ONE CORE: "chừng ba giây" was typed 3× (how tat/ne, dodge card KÈM) → printed from BAL.slap.bar.ms / dodge.ms via kitNumVi (`slapSec`).
2. OD:L1261 (no scene closes by itself): the slap/dodge game auto-closed 750 ms after the tap. Now the result row + the j82 end button `#kg82ok` (kit shows it as the frame ✕, OD:L331 — the same as every j82 minigame / playArt). Only it closes; the act card follows.
3. OD:L908 colour by meaning: intro rows "Ngoài vùng" (Đức −2) was green, "Vùng vàng" plain → all loss colour.
4. Hint line said "Vùng đỏ đang sáng" while the glow rings the whole middle (amber+red) → "Giữa thước đang sáng: chạm khi kim lướt qua vùng đỏ".
5. OD 07:35Z person pop-up: the NPC-slap result card ("BÁO · Bị tát") had no `who` → small portraits only; now passes the slapper → full-body figure + default banner.
6. dev/test/slap-mg.js: clicks the end control, new checks oneEndButton + noAutoClose; skip path unchanged.

## Tests (this branch, local server)
- slap-mg.js: 755x1000@2 (N=30), 1180x820@2 (N=10), 1366x1024@2, 1000x755, 844x390 → fails [], no page errors, no overflow; 390x844 → rotate prompt. Screens looked at (marks s1/s2/s3 + kswell on one met face, demo, hint glow, Gọn still result, dodge card, dodge end, BÁO with full-body figure).
- facefx-scan.js: all fit/lg/sm/stage/podium/room true. panel-size.js 3 viewports: exit 0, nothing missing/nofit/out.
- coop-e2e: 59/59 (first run 50/59: Fold host stuck on ":Điềm báo / Hội phối đồ" pending events, not slap; origin/main 59/59; rerun here 59/59 → flaky).
- mg-bots.js (n=200, tat): e2 skilled nặng 26 % (vừa 61, nhẹ 13), casual 15 %, random 4 %; e0 skilled 14 %, random 2 %; e5 skilled 48 %, random 6 %. ne n=100: e2 skilled 62 %, random 7 %.

## Notes
- mg-balance tip d1ca11be: kg82Play now returns mgGrade(raw) (gamma 1 = identity today). If gamma is ever ≠ 1, slap raw 6 (vừa) can grade to 4 → slapTierOf gives nhẹ. Slap should then read KG82.rawF. Not broken today.
- Kit-level conflict for the coordinator (§81 sweep): every j82 minigame result ends with "Đã hiểu" turned into ✕ (OD:L331), while OD:L1261 wants one visible end button. Slap follows the family.
