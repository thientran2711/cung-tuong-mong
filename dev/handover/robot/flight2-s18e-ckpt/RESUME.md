# flight2-s18e checkpoint
Life flight2-s18e · Fold 755x1000 · greedy · seed 2026112561 · build 86170222adab (main 772bee4f) · harness f65d019b · serve: rt-serve-build.sh --b 86170222adab 8940 · out /home/user/wt/s18e-out · run.sh resumes with resume=1.
ckpt at buoi ~1000, 21:06Z. Same life, never start fresh.

FINAL (s18r roll, 21:59Z): runner stopped cleanly; ckpt = last good resume point (buoi ~1275, year 9, rank 0 Lanh cung, Suc 100, 2 dead, 7 bugs, 0 stuck).
RESUME: (1) worktree of f65d019b at /home/user/wt/s18-h2 (git worktree add --detach <dir> f65d019b); (2) serve: bash <harness>/dev/test/rt-serve-build.sh --b 86170222adab 8940 (self-check OK); (3) mkdir /home/user/wt/s18e-out, copy ckpt json + run.sh there (do NOT delete profile dir; resume keeps it); (4) ./run.sh with run_in_background timeout 7200000; check «content identical». Pin stays on 86170222adab (not LIVE bd47c753/8330e8b8). 2h cap -> relaunch. At end: copy to dev/handover/robot/flight2-s18e.* + bugs file, robot-audit.js, LIFE DONE to the foreman. Open: «Tin báo» close, no-clock loops; harness 1-buoi SAVE REWIND on resume (known).

FINAL (s18 #2, 05:05Z): QUOTA STOP (known, cured on LIVE). Life ran buoi 1275 -> 2648 (year 9 -> 19) on pinned b 86170222adab; localStorage QuotaExceededError from buoi ~2602 (save 5.2M chars); runner stopped at 2648. Do NOT resume: the stored save stopped following the live game. 2h background-task cap killed serve+runner at 01:29Z and 03:30Z (relaunched with resume=1, saves identical); one ~1.5h gap 22:12-23:35Z (runner died between turns).
