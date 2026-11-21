
## r3 (fix worker, sonnet) — F1 DONE
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 8 | main: kit-relrows-ms (jkrel.js kitRelRows isMS branch, aff/oan, «Lòng» for her servants, strangers «chưa rõ») LANDED | review/* 1 (this branch). START_CTX ~3 %.
- Merged origin/main a201d968 (kit-relrows-ms + rel-picker-r3 popup picker + later lands). Conflicts j15 / j29 / j42 / jcoopworld / jhc resolved keeping both sides (my aff/oan reads, bribe affAdd, MEN_P «oan»; jhc: relCands + relPopBody carry Nam nhân / Cung nhân groups and the men↔Chí tôn exclusion; relPair rv/relMS guards). index.html/sw.js rebuilt.
- F1: j22 manCard custom lines «Hắn quý ngươi / Ngươi quý hắn / Hắn oán ngươi / Ngươi oán hắn» removed (kit block on the card now prints the same j9 numbers); «Tình ý» kept. jkrel.js untouched. No kit gap → no KIT_REQUESTS entry.
- Test rel-men-servants.js: U1 follows the popup picker (real slot click), selectors .krelpair .kr3r, U3 reads the kit block (no custom lines, aff both ways + oán equal j9), NEW S1 whole-group scan.
Before / after (law 11 scan, S1 on every met man + servant, both devices):
| Place | Before | After |
|---|---|---|
| Man card (j22) | custom aff/oan lines + kit «Hắn → ta Thiện cảm 62 (p.loyal)» = 2 numbers | kit block only: Thiện cảm 5 · Oán 38 · Ta → hắn Thiện cảm 5 |
| Person card pcfKey / Tuần lục j87 (kitRelRows) | loyal as Thiện cảm | aff(p,S) / oan (kit-relrows-ms) |
| Ân oán rows (jhc relRows) | aff/oan | unchanged = same numbers (S1: 0 mismatches over 8–41 people / 7–17 listed) |
| Her servant | Thiện cảm = loyal | Thiện cảm aff · Oán · Lòng = loyal |
Tests on 88c83c37: rel-men-servants 26/26 ×3 · quickcheck PASS (render 217/252, tab 391/403, buổi 1067/1070 ms) · one-core-guard PASS · undef-scan PASS (277) · role-parity ALL PASS · coop-e2e 124/124 (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) · coop-home 50/51: the only FAIL = «A has the home tabs» expects «Khuê phòng» but the home road now shows Hành sự|Dư đồ|Hậu cung|Giao tình|Hoàng tự|Tư trang|Tài nghệ|Mệnh truyện — stale expectation from the upstream tab rename, not touched by this branch (pre-existing; coop-home.js is outside this topic) · old save loads (quickcheck).
Shots LOOKED 3× (Fold 755x1000@2 + iPad 1180x820@2): https://ctm-img.victoria-tntt.workers.dev/img/_review/rel-men-servants/ rms-man / rms-srv / rms-stranger × both. Wipe: python3 dev/site/cdn_sync.py --wipe-review rel-men-servants.
READY: review/rel-men-servants 88c83c37.
