# BRIEF D-FACE-MASTER03-MASS — 90-face × 5-age bare-face portraits on Magnific (owner direct order to Foreman D, 24/11 ~21:25Z)
PRIORITY #1 CHECK: OD 0 hits ("face-master03"/"MASTER-SKIN") | main none | review/* none | claims none — new owner order; package supplied by owner (zip) and copied to dev/handover/face-master03/.

OWNER (verbatim, 24/11): "Ok, chạy hàng loạt 90 người. Năm nhóm tuổi." (after approving the 5-face Sharp-16 test). Earlier: "135 credit là GPT 2.6 2K. 135 credit." Owner chose to drop the printed caption (the new package has no caption). Owner OK'd (24/11 ~21:20Z, "Ok") removing ONLY the operator sentence from the INPUT line so the prompt fits Magnific's 10 000-char limit.

PACKAGE (read in full before work): dev/handover/face-master03/Claude_Execution_Instructions.txt + README.txt; prompts dev/handover/face-master03/Prompts/*.txt (30 = 6 families × ages 16/26/39/51/63); jobs dev/handover/face-master03/Assignments/<Family>_Jobs.json (445 jobs, M05 excluded by owner); identity sources Source_Manifest.json (original_url on the CDN img/share/face90/<id>.png + sha256 — verify hash).

FIXED SETTINGS (same for every job; recorded in run log):
- Magnific MCP images_generate, mode gpt-2-6, resolution 2k, aspect auto (gives 2688x1520), count 1, no extraSettings.
- references = [ {type:image, identifier:<identity upload of IMAGE 1>}, {type:image, identifier:"UPf76Ptwny"} ] — UPf76Ptwny = Face_Style_Master_No_Text.png already uploaded on this account (sha256 14b67de2…1d34). Never a third ref, never the m09 maid figure.
- Identity upload: creations_upload_image(url=original_url, fileName=<id>.png). Already uploaded (reuse): m09 fHYEKbDCDY, c05 eI9Xa4ydqL, c06 0e7V8JuTfW, c11 lJhS9fGgv9, c14 mEAvqcfhJQ, c19 IfZmFWctvE, c27 YMScX9rWeC, c31 ov3Iu0B829, s07 dtNBfccXSL, s08 u50FxhMQLD, s09 nVgWd2yYQD, s39 79EORw2JAL, s40 jUIsPsiLD0, s41 u50FjqIQLD, s42 Xm6oEmXBfo.
- PROMPT = the full prompt file text, unchanged, EXCEPT delete exactly this one operator sentence (with its leading space) from the INPUT line: " Reuse this full prompt unchanged for another individual in this family at this age; replace only IMAGE 1. Keep the same IMAGE 2. No manual text substitution or intermediate render is required." Nothing else is cut. Check len ≤ 10 000 before each call.
- AGE 39 IS ON HOLD: all six age-39 prompts are still 10 308–10 644 chars after that cut → do NOT run, do NOT shorten further; OWNER 24/11 ~21:30Z (verbatim): "Em thì vậy thì khoan làm, không làm gì hết. Chạy trước 16, 26, 51, 63 trước đi. Nhưng mà mày mở thợ ra mà làm" → age 39 waits for her. Run ages 16, 26, 51, 63 only (89 × 4 = 356 jobs; Sharp-16 m09/c05/c06/c11/s40 are DONE — skip them).
- Cost: 135 cr per image (simulate_cost exact). 351 jobs ≈ 47 400 cr. Stop and report if account_balance < 60 000.

ALREADY DONE (Foreman D depth 6, test approved by owner): Sharp age16 MASTERSKIN03 T01: m09 DoPecSPpcl, c05 lJhSr8vgv9, c06 eI9XT4WdqL, c11 gOvUxCeSXO, s40 p84d0ZKehw.

SPLIT: one sonnet worker per family (Alluring, Cold, Dignified, Gentle, Proud, Sharp), each runs its own Assignments/<Family>_Jobs.json for ages 16/26/51/63. Claim rows in CLAIMS.md before opening.

PER JOB: one generation, creations_wait, LOOK at the result (creations_read) vs IMAGE 2 master (skin colour/undertone, painting, light), identity, target age, no makeup, no text anywhere, ivory robe/pin, crop. Status DONE / NEEDS_REVIEW (text, wrong age, makeup look, skin off-master, wrong person) — never auto-retry more than once per job; list NEEDS_REVIEW for the owner.

OUTPUT (images never in git): keep results on Magnific; per family write dev/handover/reports/face-master03-<family>.md with a run-log table (job_id, source_id, age, prompt_id, identity creation id, output creation id + webUrl, status, one-line QC) and one contact sheet per age (original | result, 2 columns) uploaded to the CDN under img/_review/face-master03/<family>/ with the repo's existing review-upload recipe (grep dev/tools dev/art for "img/_review" uploads); link the sheet URLs in the report. Report to Foreman D on finish (send_message to the current Foreman D id in dev/handover/FOREMAN_D_STATUS.md).
Context rollover (owner OD:L1217): at START_CTX % + 25 %, ceiling 60 % — write a handover in your report file and tell Foreman D; Foreman D opens the successor.
<<<<<<< HEAD

## AGE 39 — UNBLOCKED (owner 24/11 ~21:45Z, verbatim: "Ok, cái prompt 39 tuổi sửa xong rồi nè, bây giờ làm 39 tuổi luôn.")
Use ONLY dev/handover/face-master03/age39-fix04/Prompts/FACE-REUSE-<FAMILY>-AGE39-DUAL-MASTER-SKIN-BAREFACE-NOTEXT-04.txt (9 380–9 728 chars). Paste the WHOLE file text UNCHANGED — no cut at all (the operator sentence is already gone). Job rows: age39-fix04/Age39_Job_Updates.json (89 jobs). Read age39-fix04/Claude_Apply_Age39_Fix.txt. Same refs (identity upload + UPf76Ptwny), same settings (gpt-2-6, 2k, aspect auto). 89 × 135 cr ≈ 12 000 cr. Reuse each family's identity upload ids from its report.
=======
>>>>>>> b92874ab (face-master03 Sharp: age26 c14,c19,c27 done; handover)
