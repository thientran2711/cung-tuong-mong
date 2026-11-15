# PROGRESS review/rank-title-r1 (reviewer of review/rank-title, KIT 48.1)

State: merged onto origin/main d51a393e (HEAD descends from it), site rebuilt, pushed.
Fixes made on r1: Đại cung nữ / Nữ quan tones follow MRCOL; j3 dialog face captions use kitNameRank; KIT 48.1b her own name
(`.kmy`, owner 20:10Z); KIT 48.1c no box around person-dialog captions (owner 20:40Z). Details in dev/PROGRESS_rank-title.md "Review r1".
Checked on the e5a327d1 merge: rank-title.js 5 sizes x 10 cases (0 errors, 0 bad, old save ok), chap-label.js 3 sizes all ok,
month-cal.js bad 0, kit-page.js only the pre-existing sample error, ts-oldsave.js ok, her-name probe 6 sizes incl. 390x844 (no overflow).
Left: final re-run on the d51a393e merge (rank-title 755/1180/844 + ts-oldsave + chap-label + month-cal + kit-page) was in progress
when the container move was announced; if not reported, rerun: OLDURL=<main build> node dev/test/rank-title.js <url> <out> r "755x1000@2,844x390@2".
