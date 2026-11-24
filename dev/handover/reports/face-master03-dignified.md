# face-master03 — Dignified (ages 16/26/51/63; age 39 ON HOLD) — worker run log
PRIORITY #1 CHECK: brief D-face-master03-mass.md read in full; CLAIMS row added; no other worker on Dignified; Sharp-16 done set irrelevant (not Dignified). Age 39 NOT run (owner hold).

Settings (all jobs): images_generate mode gpt-2-6, resolution 2k, aspect auto, count 1, refs = [identity upload, UPf76Ptwny]; prompt = file text minus the one operator sentence (len 9791/9523/9887/9829 for ages 16/26/51/63, all <=10000). 135 cr/job; 48 jobs. Balance at start 2,639,842.
Identity sha256 verified for all 12 sources vs Source_Manifest (match).

Identity uploads: c04 EbcFFhnuuO, c10 ksXxxbr16B, c16 cpwVVY30eP, c22 rgoLLr0xtc, c28 VXOpeD2MMU, m04 N253RRL6D9, m10 LwtgSwWswO, m16 rgoLsU6xtc, m22 TdJDp8FVNR, m28 aFnEukWfSh, m29 ksXxjO216B, s65 s7m SU3hl8e (=s7mSU3hl8e).

| job (source,age) | output creation | status | QC |
|---|---|---|---|
| m04 A16 | 1lBjL83r4r | DONE (looked) | no text, no makeup look, ivory robe+pin, warm-ivory bg, smile as spec; identity vs source not pixel-compared |
| c04 A16 | MByeXxyDCm | DONE (looked) | no text, no makeup look, ivory robe+pin, warm-ivory bg; identity not pixel-compared |

Prompt texts at /home/user/wt/dig-out/p{16,26,51,63}.txt may be wiped: regenerate with the cut sentence script (delete exactly the one operator sentence).

## HANDOVER (rollover)
Cost finding: every images_generate call needs the FULL ~9.8k-char prompt typed into the call (~3.5k tokens of context each), so one worker can only do ~15-20 jobs before the 60% ceiling. 2 of 48 done; 46 remain.
Remaining: ages 16 (10: c10 c16 c22 c28 m10 m16 m22 m28 m29 s65), 26 (12), 51 (12), 63 (12). Recommend 4 successor workers, one per age (12 jobs each; age 16 has 10).
Successor steps: fetch handover branch (sparse dev/handover), rebuild prompt = Prompts/FACE-REUSE-DIGNIFIED-AGE<age>-...-03.txt minus the one operator sentence, reuse identity uploads above (already uploaded, hashes verified) + ref UPf76Ptwny, gpt-2-6 2k auto count 1; creations_wait + creations_read each; log in this file (append rows; rebase-retry push). Do not re-run m04/c04 A16.
