# PROGRESS review/coop-invite-ux (C43)
Owner "Rồi sao nữa" (OWNER_DECISIONS session 8): host invite screen did not say what happens next.
Done: kit part kitCoopSteps (KIT.md §69.3, jcooptimer.js + kit page sample); jcooplobby `wait` page = Ám hiệu / Hảo hữu rows + 1-2-3 guide (kitRows only),
live waiting row with elapsed time (1 s text tick), step 1 flips on send/copy, "mở đường dẫn trên máy khác" hint, sfx-join + kitLine on join,
auto-continue into the shared game unchanged (COOP "both" -> "start", no tap). Sync logic untouched (review/coop-night-sync).
Tests: dev/test/coop-invite-ux.js (4 viewports 755x1000, 1180x820, 1366x1024, 844x390 + second browser joins, live Worker) ALL OK;
dev/test/coop-e2e.js plain run: see report. Shots: dev/shots/coop-invite-ux (delete after review).
Open: 844x390 panel scrolls (primary button below the fold), same as before this change.
