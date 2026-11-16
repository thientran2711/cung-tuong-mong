# PROGRESS review/rank-port (D36 re-port of review/rank + review/rank-ui) - 16/11

Base: origin/main 2afdafc39. Sources: origin/review/rank (5 own commits, d5ad2e93e) + origin/review/rank-ui (895c898ef; WIP shots not ported).

## Ported (kept)
- Worker `rank/worker` (ctm-rank + Durable Object SQLite, score.js one-source Cong danh rules), tests, GitHub workflow, dev/LEADERBOARD.md.
- Game `dev/build/jrank.js` (+ score.js loaded before it, both before j84 in assemble.py): Bang vang screen (one title "Bang vang", kit-x close,
  Kiep | Nguoi choi tabs, podium via existing kitPodium, list with frame by highest rank, "Cach tinh" card, rename), offline queue/retry.
- j32 end-of-life card: kit sections only (kitRows + h4.kpst), "Xem Bang vang" button.
- dev/test/rank-e2e.js (+ first-run download-card skip), podium.js tweak.
- Privacy: only a random guest code (hashed server side) + chosen display name; no email/personal data.

## NOT ported under ONE KIT KEEPER (owner 16/11) - KIT REQUEST
- j90 podium rework (owner 08:55Z): big full-body figures, podium = name-plate cell, medals at plate top-right, "Ta" tag, optional fig/face/nameH/you fields (old rank-ui 895c898ef).
- jk4 person-dialog changes: own chip rank+name (`named:q===S` in kitStageFig), sticky figure column for option-less dialogs (end card, 844x390).
- KIT.md sections 26 / 32.7b / 32.10 text.
Main already has kitXHTML, kitNameRank and the figure-fills-column dialog fit, so those old parts are dropped as obsolete.
Consequently two rank-e2e checks (end card figure fill / name above; podium figure>plaque + medal corner) fail until the keeper applies the above.

## Backend
https://ctm-rank.victoria-tntt.workers.dev is live (/health ok, /top/lives empty). Tests use the local stand-in only, never the real Worker.
