# JOB_OLDER (consort-ty a26/a36/a51 ty4-8 from OLD design). Same tools as JOB.md (P = this dir, R = dev/handover/reports/fig-cutout-clean; run batch.sh from R). NO creations_upload_image calls (rate-limited), no commit/push/upload.
Magnific folderReference ba4aecfe-efce-47e2-b53f-30d292091886. Face refs (identifiers): N2HYqYa6D9 bxVgMSX5Y2 dtPf4EDXSL eIyaPEVdqL.
Lines: "idx key sheetid a18id" (sheetid = Magnific id of the OLD design sheet of that key; a18id = NEW a18 master gen id of the same look).
AT MOST 2 images_generate in flight at any time (shared slot pool). Per pair of files:
1. Prompt = `python3 P/prompt.py <idx> <age> sheet` (age from key suffix a26/a36/a51), verbatim. Hands hold a prop, lively graceful (the prompt has it).
2. images_generate gpt-2-6, width 1024, height 2048, resolution 2k, folderReference, extraSettings {"transparentBackground": true}, references (type image) = [sheetid, a18id, N2HYqYa6D9, bxVgMSX5Y2, dtPf4EDXSL, eIyaPEVdqL].
3. creations_wait for the ids. Collect 4-8 results then ONE `P/batch.sh /tmp/<agent>-<n>.tsv /tmp/<agent>-<n>.jpg` from R (tsv key<TAB>result_url), read the sheet once. Judge: calm frontal face, hands/5 fingers, shoes visible, hem at feet, tiny huadian, beautiful face, outfit/colours/trims/hairstyle match the old design, age matches. Fail -> regenerate that key (max 2 retries then HARD).
4. Per key append progress/older.tsv: key<TAB>sheetid<TAB>a18id<TAB>newgenid<TAB>OK|HARD; and for OK append key<TAB>newgenid to progress/ids.tsv. 
5. At the end build ONE sheet (<=1100 px wide, dark 30,30,36) of all keys: [live CDN fig-<key>.webp (OLD figure still on the CDN) | new fitted fig from scratchpad out/img/fig-<key>.webp] pairs, labelled, save /tmp/<agent>-cmp.jpg. Reply: n OK, n HARD, credits, sheet path (short).
