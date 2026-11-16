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

## 11/16 resume (kit parts landed)
- Merged origin/main cdad7109 + review/kit-keeper-1 05bce551 (assemble.py list: score.js + jrank.js kept after jnight.js; generated files rebuilt).
- Podium + end card already use the kit parts (kpodCol entry fields fig/face/nameH/you/mine; option-less person dialog). No private podium CSS added.
- Recovery code (owner Q20): client only, Worker unchanged. Code = the guest id shown as 6 groups of 4 (server keeps only its hash). Card opens once on first Bảng vàng open ("Ta đã ghi lại"), later via button "Mã khôi phục" (view code + copy + restore). Restore = GET /me?gid= (404 -> not found), then local id/name switch, queue flushes under the new id.
- rank-e2e: new recovery section (guest R1), S.succ bypass for the Thai hau scenario (main's j99succ), first-life roulette wait, podium ratio 1.5 (kit rule).
