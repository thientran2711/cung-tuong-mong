# PROGRESS review/rank-title-r1 (reviewer of review/rank-title, KIT 48.1)

State: merged onto origin/main d51a393e (HEAD descends from it), site rebuilt, pushed.
Fixes made on r1: Đại cung nữ / Nữ quan tones follow MRCOL; j3 dialog face captions use kitNameRank; KIT 48.1b her own name
(`.kmy`, owner 20:10Z); KIT 48.1c no box around person-dialog captions (owner 20:40Z). Details in dev/PROGRESS_rank-title.md "Review r1".
Checked on the e5a327d1 merge: rank-title.js 5 sizes x 10 cases (0 errors, 0 bad, old save ok), chap-label.js 3 sizes all ok,
month-cal.js bad 0, kit-page.js only the pre-existing sample error, ts-oldsave.js ok, her-name probe 6 sizes incl. 390x844 (no overflow).
Final on the d51a393e merge: rank-title.js 755x1000/1180x820/844x390 x 9 cases: 0 page errors, old save loads; one transient
844x390 "cards" tag overlap (shot mid-transition, figures still loading) re-run clean. ts-oldsave ok, chap-label 13/13 ok, month-cal bad 0,
kit-page only the pre-existing "reading 'out'" sample error (same on origin/main). Verdict: PASS.

## Update (owner 15/11 22:25Z, on main d8b81af9)
- KIT_RT tones made vivid (all ≥ 4.4:1 on parchment #fbf3e2); glow + dark outline ONLY on paintings (stage tags, .kesov captions over a
  picture, kit sample .krs row: tone lightened 72 %); framed UI (kitEventDp caption, cards, Tuần lục, lists, podium, kit page) = plain vivid
  text, no glow/outline; .modal.night = lightened tone, plain. Her name: gold glow only on paintings, plain black bold in framed UI. KIT 48.1 updated.
- rank-title.js 755x1000 x 9 cases clean (0 errors, old save ok). 844x390: stage tags overlap (Quý phi x Đáp ứng) in every stage case — the
  SAME on the plain origin/main d8b81af9 build (figures squeezed bottom-left beside "+2"); it was clean on main e5a327d1 → a main regression
  from the d51a393e..d8b81af9 merges, not from this branch. Reported to the coordinator.
