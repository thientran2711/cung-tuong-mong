# FOREMAN D (fourth account) — rules + assigned slice
Owner (16/11, session 8): a fourth account runs Foreman D, to drain the unassigned queue. The rules are the same as dev/handover/FOREMAN_B.md; read it first: roles, how it works, the model rule (NEVER haiku; sonnet = default; opus = game rules/numbers, structure/core systems, hard root cause), the review gate, and the status file.
Also read: CLAUDE.md, dev/OWNER_DECISIONS.md (EVERY 16/11 entry), dev/handover/WORKER_BRIEF.md, dev/kit/KIT.md, dev/kit/KIT_NUMBERS.md, dev/kit/KIT_REQUESTS.md, dev/kit/VANPHONG.md.
NO DOUBLE WORK: take ONLY the items listed below. Items of the main coordinator (session 8) and Foremen B/C are off-limits even if they look idle.
Mark every item in dev/handover/FOREMAN_D_STATUS.md (RUNNING/…) BEFORE you spawn its worker. Max 12 agents; each worker ≤2 browsers; memory is tight → run tests one at a time.
Workers push only review/<topic> branches. No pull requests, never push main. A reviewer PASS goes under "## PASS" in your status file with the full sha; the main coordinator merges it.
CDN: if Cloudflare is not connected on your account, put new images under "PENDING CDN UPLOAD" in your status file and the main coordinator uploads them.
KIT FIRST + ONE KIT KEEPER (owner, the #1 rule): workers only USE kit parts. A missing or changed part → STOP and file a KIT REQUEST in your status file; the main coordinator's kit keeper decides. Reviewers FAIL any custom chip/row/frame or per-place variant.
Owner rules from 16/11 that bind every worker: never ask her something already ruled (grep OWNER_DECISIONS); never change or undo a working rule without her OK; new DESIGN needs her approval first (send the idea to the main coordinator, not to a worker).

## Slice D
Reviews (use REVIEWER.txt):
- D-R1 review/newgame-ui-r2 @70119a805: fixes the reviewer FAIL; §8.1 one panel size, a common figure tier KPID_WR=.5, pinned choices below the scroll. Merge origin/main first and run newgame-ui.js / panel-size.js / stage-fig-size.js at 5 viewports. Owner complaint: lag on the new-game screen.
- D-R2 review/row-align @0886f329b (C14): the earlier reviewer got stuck; re-review on current main.
Workers:
- C43 review/coop-invite-ux: owner "Rồi sao nữa" — a waiting state, 1-2-3 steps, auto-continue on join.
- C44 review/cloud-save: the same character on phone and iPad, solo and co-op. Spec in OWNER_DECISIONS ("Sổ mây"): sync code, auto upload at buổi end, conflict pick, 10 versions, existing Cloudflare Worker. Needs Cloudflare on your account plus a security review of the endpoint. opus.
- C3 review/art-complete part 2: resume from the branch's PROGRESS (art: Magnific gpt-2-6 only, folderReference ba4aecfe-efce-47e2-b53f-30d292091886; look at every image).
- D50 consorts without full-body figure art show a placeholder frame in the dialog person column.
- D51 fxkit follow-ups: cracked tea cup, scroll unroll, red seal slam, swaddle reveal, letter under the door, wired to their call sites (the kit keeper owns the §68 part; you only add sprites through KIT REQUEST).
- D52 skin-match audit of the 7347 figures never measured (plan in PROGRESS_review-skin-match.md).
- LATER, only when the main coordinator writes "GO" here: act-split wave 2 (outings, festivals) and wave 3 (night sneaking), after review/act-dedupe wave 1 lands.
- D54 (owner 16/11, high priority) PAINT the missing buổi versions: every room or place scene that lacks its own sáng/trưa/chiều/tối painting gets them, as Magnific gpt-2-6 edits of the approved scene (same layout, only light/sky/lamps change). Put the 4 seasons in too where the place uses seasons. The CSS buổi tint is being removed (review/postmerge-fix-1 lists the scenes without a set; scan SCIMG/j94 yourself if that list is not there yet). Send the owner a contact sheet per place before going live; she approves art.
- D55 (moved back to the main session: review/book-fig).
