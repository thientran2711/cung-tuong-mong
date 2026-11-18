# t8-mass-B W75j (c31, c32; a18 a26 a36 a51) — HANDOVER
Rolled over at start+25% context (each person-age ~45k tokens: the 6 full prompts are printed and pasted).
## Done (6 gens each, 1 gen per slot, raw sheet looked at, bg removed, cdn_sync + --check same, READY sent to Foreman C)
- c31 a18, c31 a26 -> CDN img/_review/t8-reprompt/c31_a{18,26}_sheet.jpg (+ c31_aXX_t{7,8}_v{0,1,2}.png)
## NOT done: c31 a36, c31 a51; c32 a18 a26 a36 a51 (36 gens).
## Facts for the successor
1. Use build.py from handover branch (age text a36/a51 strengthened). VERIFIED by script for c31+c32, t7+t8, v0-2: output at a26/a36/a51 == a18 output with ONLY "about 22, youthful adult." replaced by the age phrase (AGE_TXT in build.py). So print the a18 prompts once per person and swap the phrase; still run build.py once to be sure.
2. Refs (folder ba4aecfe..., uploaded via creations_upload_image, webp URL works directly): c31 a18=5jDkzWJKxe, c31 a26=gOmUpElSXO, c32 a18=eIPXlAldqL. Still to upload: c31 a36/a51, c32 a26/a36/a51 from https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-aXX.webp. Style ref eIyOFEidqL.
3. images_generate args: mode gpt-2-6, width 1024, height 2304, resolution 2k, count 1, references [{type:image,identifier:<t1>},{type:style,identifier:eIyOFEidqL}], folderReference ba4aecfe-efce-47e2-b53f-30d292091886. Order of the 6: t8 v0,v1,v2, t7 v0,v1,v2. Then images_remove_background (creationIdentifier, same folder) on all 6, creations_wait.
4. Tools from branch review/t8-mass-W75c: tools/w75c/rawsheet.py (run from scratch dir, quote URLs) and fin2.py (set S= scratch path; needs $S/cdnroot/dev/site/{cdn_sync.py,manifest_guard.py,manifest-floor.json} from origin/main; usage fin2.py cNN aXX t8v0=url ... t7v2=url with cutout URLs). Then mcp__claude-code-remote__send_message to session_011xDdVS7JY8KJW8hzKtoquL "READY t8-B+t7 cNN aXX sheet <url> gens=6".
5. Raw gens looked fine at c31 a18/a26 (C2 yellow dominant on t8, larger yellow parts on t7, same colours). a51 face check still to do for c31/c32 with the new text.
