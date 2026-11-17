# quickcheck hooks (G4 of dev/tools/coregates.sh)
Every `*.sh` here runs on each go-live check (sorted by name), after the build, with:
`QC_WT` (worktree holding the built sha), `QC_URL` (new build, served locally), `QC_OLD_URL` (the live build), `QC_OUT` (write logs here),
`QC_KIT` (the go-live kit root: run scripts from here). Exit 0 = PASS, anything else = the go-live FAILS. Keep each under ~2 min.
Reserved: `50-coop-one-world.sh` — co-op one-world probe (review/coop-one-world): host and guest must read the SAME numbers (owner CO-OP FIRST, 16/11 ~20:32Z).
