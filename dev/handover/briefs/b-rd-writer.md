# BRIEF — ROAD DIALOGUE WRITER (sonnet; one slice) — lead = B ROW4 ROAD-DIALOGUE helper session_01N1tNP6X94bVbzA5TSJzzxJ
PRIORITY #1 CHECK ('rd: road dialogue'): OD 1 (24/11 ~10:05Z STORY = DIALOGUE SCENES) | main 0 | review/road-dialogue (engine + inventory + validator + style model rd_tt.md) | claims: B ROWS 4+22 session_01N1tNP2GvCVsyLKPfx7RhNt.
This brief is your full authority, never ask the owner. Never push main, no pull requests, never message the owner.
KIT CHECK: data only — the scene plays through jdlgs dlgsPlay (KIT §95 kitDialogue.play / kitScene.light / kitTypeLine); you draw nothing.
Read in full first: dev/rules/START_CORE.md (18 LAWS) + START_WORKER.md; the OD row «24/11 ~10:05Z … STORY = DIALOGUE SCENES» in dev/OWNER_DECISIONS.md VERBATIM; dev/handover/briefs/b-dlg-writer.md (the side-line writer brief: QUALITY BAR, xưng hô rules, check — ALL of it applies here too); dev/kit/VANPHONG.md; reports/sideline-dialogue.md «## SCHEMA»; reports/road-dialogue.md «## RD RULES». STYLE MODEL = dev/handover/content/dlg/rd_tt.md (51 scenes, origin tt: read 15 of them before you write; match that bar).

## Job
Write ONE dialogue scene for every unit of your slice (table in reports/road-dialogue.md «## WRITER PLAN»), in `dev/handover/content/dlg/rd_<slice>.md` on the handover branch claude/cung-tuong-mong-handover-hj0h8w, one JSON object per line: `{"id":"rd:<unit>","dlg":{"L":"<role>","R":"me","lines":[{"who":"nar|<L>|me","text":"…"}, …]}}`.

## Your units and their facts
In a sparse worktree of **review/road-dialogue** (fetch --depth=30 under flock /home/user/wt/fetch.lock; never full-clone): `python3 dev/test/dlgs_validate.py --units rd --o <origin>` prints every unit of that origin: id, the roles you may use, the placeholders it knows, the chapter title, goal g and its FIRST hồi text(s) (what the card says right after your scene). The full rows: dev/test/rdlg_units.jsonl.

## Check (0 errors before every push)
Copy your file into that worktree: `python3 dev/test/dlgs_validate.py <your file> --strict` → 0 errors; `--cover` shows your rows. Send the lead (send_message session_01N1tNP6X94bVbzA5TSJzzxJ) «WRITER rd_<slice>.md <n> scenes, 0 errors, <handover sha>». Then self-read 15 random scenes, fix any flat line.
Rollover at START_CTX % + 25 % (ceiling 60 %): write «HANDOVER rd_<slice>: last id done» in reports/road-dialogue.md «## WRITERS», tell the lead + your coordinator; the coordinator opens the successor.
