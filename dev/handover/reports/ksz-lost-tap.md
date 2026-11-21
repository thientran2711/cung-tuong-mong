# ksz-lost-tap — report (sonnet worker, SMALL)
PRIORITY #1 CHECK: OD 0 | main jksize.js kszLiveRepick3 | review/* none | claims = this row.
Branch review/ksz-lost-tap @ 3bcc7e13a (from origin/main a201d968a). START_CTX ~5%.

## Finding (honest)
- The "node rebuilt under the finger" theory does NOT lose the click in Chromium (nodes are re-appended, the click still fires): forced re-pick mid-hold, 36/36 taps landed on LIVE.
- Real LIVE fault MEASURED (shift probe, Fold, pictures delayed 900 ms): the late picture re-pick resizes/moves the option cards: card 1 161 -> 140 px tall at ~500 ms, cards below slide up 21 px; the finger already aimed at the old place lands on the gap or on the NEIGHBOUR card (misroute).
- Test dev/test/ksz-late-tap-real.js (real Hồi kết dialog, real touch, finger on the card top edge ≤ 250 ms after the cards move): LIVE a201d968 missed 3/6 and 1/6 (two runs: Fold card 1, iPad cards 1-3, once landing on card 1 = misroute); FIX 12/12 (3 runs x 6, finger 76-249 ms after the move).
- Test-artefact lesson: #modal.klifewait (life gate) hides the dialog and blocks taps up to 3 s while people pictures load; not a bug, the scan waits for it.

## Fix (kit only, jksize.js + one line jpdlg.js; KIT.md 56.20)
1. kszLiveRepick3 never runs while a pointer is down inside #modal (waits pointer-up + 120 ms; 1.5 s safety).
2. kszStaleSnap3/kszStaleMark3/kszKeep3: old rect of every option button kept; for 300 ms after a re-lay a pointer-down on where a button WAS (not on it now) delivers its click to that button (native click swallowed, synthetic click on the right button).
No per-dialog patch; no new kit part; no visual change (Fold + iPad shots looked: unchanged).

## Scan (law 11) — every late re-lay / re-fit path
| path | before | after |
|---|---|---|
| jksize.js:628 late img -> kszLiveRepick3 (live frame) | shift under finger, tap on gap/neighbour | pointer-down defer + grace remap |
| jksize.js:691 resize -> kszLiveRepick3 | same | same (one function) |
| jksize.js:629 late event pic -> kitFrameApplyLive3 | un-guarded | wrapped kszKeep3 |
| jksize.js:490 builder sheet fit (kit sample page, not a player dialog) | n/a | wrapped kszKeep3 |
| jksize.js:197 kszsheet (sample page) | n/a | left |
| jpdlg.js:27 person dialog late fig -> kitPersonDlgFit | un-guarded | wrapped kszKeep3 (.kpopts buttons) |
| other load listeners (jface/jfighd/jkpor/jmark/jseal/jsl/…) | only art/figure fits, no option block | not touched |
Synthetic scan dev/test/ksz-late-tap.js (12 dialog kinds x Fold/iPad x 6 tap times, straddling re-pick): LIVE 0 lost, FIX 0 lost (kinds without a button are skipped by the scan; documented).

## Gates (on 3bcc7e13a / f8d18cc2 build)
quickcheck f8d18cc2 vs live a201d968: CORE GATES PASS (G1-G4 incl. 80-dialog-fixed hook), time-spill PASS, old save loads (errors 0). dialog-fixed 84 ok / all pass. dialog-person-scan PASS. coop-e2e 124/124.
Shots: Fold 755x1000@2 + iPad 1180x820@2 Hồi kết dialog looked 3x, identical layout to LIVE (no visual change).
HANDOVER: none needed (small task done).
