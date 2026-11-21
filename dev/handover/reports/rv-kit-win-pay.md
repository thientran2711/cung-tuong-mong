# rv: kit-win-pay (0e6fe923, keeper #2)
PRIORITY #1 CHECK: KIT_REQUESTS 21/11 D econ-tamco F1 «§6.2b × §88 THÀNH Mất»; grep OD on red chips / «khi thành»; checked jopic fold and every kr-thanh use (all.js/j63/j93/jk3/jopic).
- Diff is tiny: jopic.js toggles .kwinrow on the Được slot only when the card has a roll AND the slot is the Thành row; CSS suffix « khi thành» on its own red .ef (not .kdup copies from other rows). Sure cards untouched. No caller change, no %, VANPHONG wording OK.
- Merged LIVE 6f4e8d70 into review/kit-win-pay-rv (203cd559a4a1066a2be0ed64788bee8dece5861f). kit-win-pay.js Fold+iPad PASS; quickcheck PASS (core gates); coop-e2e 94/94.
- Shots Fold+iPad looked at: «Bạc -30 khi thành» red, Danh +2 green untagged, sure option untagged. On LIVE as is, the unit wraps «Bạc / -30 khi thành» (generic ef-unit break). Combined with kit-ef-unit-rv2 (temp merge): «Bạc -30 khi thành» on one line, no overflow — so land kit-ef-unit first (or either order; both fine).
- VERDICT: PASS.
