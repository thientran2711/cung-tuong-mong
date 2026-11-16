PASS 6444443b9abea1c78daac2a6a6a1b5dab8d0e9db (ship after/with review/mg-balance)

# review-slap-mg-r3 — review/slap-mg-r2 @dd0b618f (KIT §79), reviewer branch review/slap-mg-r3
Merged onto origin/main 18fb8252 (ancestor of the PASS sha). Contains review/mg-balance @96736fff; reviewed only the slap diff + its mgTier use.
START_CTX ~3 % of the window; finished ~15 %, no rollover. Details: dev/PROGRESS_review-slap-mg-r3.md (here and on the branch).

## Checked
- Tiers via mgTier (occ tat = her rank, ne = attacker's rank, skill Vũ); "Độ khó" row; time-window zones by ease. Bot rerun by me (anticipation human bot, N(0,40 ms)): matching level e2 skilled nặng **26 %** (target 20–30 %, OD:L1266), casual 15 %, random 4 % (single-tap timing game: random = window/period; 6.5× below skilled — accepted as "~0"). Dodge e2 skilled 62 %, random 7 %; card odds [75,55,35] fit.
- Marks LOOKED at on one met face: kslap s1 faint, s2 clear, s3 red + kswell; no Người lạ.
- Demo once per kind, idle glow + hint line, Gọn = still result/outline (gonStill), kit frame/rows/buttons only, no %, ladder words.
- ONE CORE: no typed rule numbers left in jslap / jface tat after my fix below.
- slap-mg.js all 6 viewports pass (390x844 rotate prompt); facefx-scan all true; panel-size exit 0; coop-e2e 59/59 (one flaky 50/59 run; main 59/59 same day).

## Reviewer fixes on review/slap-mg-r3
1. "chừng ba giây" typed 3× → from BAL.slap.bar.ms/dodge.ms (kitNumVi).
2. OD:L1261: game auto-closed 750 ms after the tap → result row + j82 end button (kit ✕, same as every j82 game); only it closes.
3. OD:L908: intro row "Ngoài vùng" (Đức −2) green → loss colour (vàng too).
4. Hint line now says "Giữa thước đang sáng" (glow rings amber+red).
5. OD 07:35Z: NPC-slap result "BÁO · Bị tát" had small portraits only → passes the slapper → full-body figure.
6. Test: end-control + no-auto-close checks.

## ART NEEDED (exact, still open — slots wired, files drop in)
img/kit/mg-tat-bg.webp, mg-ne-bg.webp (board + LEFT picture, OD:L999), mg-tat-ruler.webp, mg-tat-hand.webp, mg-tat-zone-red.webp, mg-tat-zone-amber.webp, mg-ne-zone-green.webp (none on the CDN; verified img/_index.json). Family: mg-le/tc/xa/thq-bg also missing.

## For the coordinator
- mg-balance tip d1ca11be is newer than the 96736fff inside this branch: its mgGrade (gamma 1 today) is applied to every engine's raw; if gamma ≠ 1 slap's vừa can fall to nhẹ → slap should then read KG82.rawF. Re-merge mg-balance tip before shipping and rerun slap-mg.js.
- Kit-level: OD:L1261 (one visible end button) vs OD:L331 ("Đã hiểu" → ✕) for every j82 minigame result — not in the §81 sweep list yet.
