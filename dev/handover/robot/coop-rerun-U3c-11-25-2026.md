# U3c co-op rerun (runner session_01N1tNP6q6oiuzPjWAgcdy8j, depth 4, START_CTX ~4%, 11/25/2026)
PRIORITY #1 CHECK ('coop-rerun U3'): read U3 handover coop-rerun-U3-11-25-2026.md; same recipe.
Game = stack review/robot-coop-stack-u3 512cfee6 + own local Worker; harness = review/robot-realtap 5edf09f6 + realtap-B-5edf-patch.diff (RELOAD_AT=20, SEG_MIN=120, SEG_YEAR=2). Fold host / iPad guest, real taps (jsClicks 0).

| # | room | seed | devices | result |
|---|---|---|---|---|
| S1 | BF8G | 44 | Fold/iPad | INVALID: scheduled reload at buổi 20 OK both seats; stuck 15 min at night buổi 27-28 Y1 on host dialog «Sai Thải Hà đi dò la» (VIỆC spy-target choice, cards without ✕; card-body taps open title-chip popup «Trăng soi rèm ngọc»/«Phúc ấm đầy nhà», choice never resolves; unstick reload re-opens it). NEW (not in KNOWN) — game vs nested-chip harness TBD by Foreman B. Dump: review/robot10-coop-saves u3r/BF8G/host-fold-stuck-1-dump.json @363ede66. Also «Tâm trạng · X» Lui dead (known). Run cut at ~30 min. |
| S2 | DSZG | 45 | Fold/iPad | INVALID: reload at buổi 20 OK both seats; stuck 15 min at buổi ~53-62 Y1 night on «Sai Hoán Bích đi dò la» (same class as S1, repro 2/2; j2.js:189 maidSpy target chooser). Dump: review/robot10-coop-saves u3r/DSZG/host-stuck-1-dump.json @b79e0baa. Run cut at ~60 min. |
| S3 | D2JU | 46 | Fold/iPad | NOT counted: ran on OLD patch (no #2–#4); stuck loop at buổi 13 in monthly dialog «Bổng lộc tháng ba · Lễ nghĩa» (card tap → «Thang cơ duyên» odds-chip popup, known harness class), cut ~35 min. Seed 47 restarted on patch #4 (sha 581c7635). |
