# quickcheck hooks (G4 of dev/tools/coregates.sh)
Every `*.sh` here runs on each go-live check (sorted by name), after the build, with:
`QC_WT` (worktree holding the built sha), `QC_URL` (new build, served locally), `QC_OLD_URL` (the live build), `QC_OUT` (write logs here),
`QC_KIT` (the go-live kit root: run scripts from here). Exit 0 = PASS, anything else = the go-live FAILS. Keep each under ~2 min.
`50-coop-one-world.sh` (landed in review/one-core-land-r1) — co-op one-world probe, runs the sha's own dev/test/coop-one-world.js (review/coop-one-world): host and guest must read the SAME numbers (owner CO-OP FIRST, 16/11 ~20:32Z).
`80-dialog-fixed.sh` (kit-dialog 21/11) — runs dev/test/dialog-fixed.js: option card odds on the title row, iPad 2 columns, picture fills the card, only the option list scrolls, one Trân nữ seal place + size, same figure in same-size frames (owner marks #44 #47 #49).
`85-dead-card.sh` (flight-modal-deadlock 25/11) — runs dev/test/dead-card.js: no VIỆC card with every option greyed and no way out (scan at bạc 0, fixed j68c seeds, jdeadcard «Lui» net).
`92-look-dedupe.sh` (button-crawl-fix-2 25/11) — runs dev/test/look-dedupe.js: look-up panels one per title, never saved, one ✕ closes; kit cards saved with their body; the flight2 poisoned save loads clean (Fold + iPad, real taps).
