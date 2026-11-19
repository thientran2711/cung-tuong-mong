# NDX1 painter sub-brief — Nữ đế mass, one-ref method (owner Lượt 479/482)

You paint Nữ đế (Female Emperor) figures for consorts, 5 ages each (a18 a26 a36 a51 a65). English only. Do NOT edit any repo file except via the helper commands below. Do NOT commit or push (the parent does).

## Tools
Load Magnific tools first: ToolSearch query
`select:mcp__04f5151b-0da2-4894-b66f-229478ee6f85__images_generate,mcp__04f5151b-0da2-4894-b66f-229478ee6f85__creations_wait,mcp__04f5151b-0da2-4894-b66f-229478ee6f85__creations_upload_image`
Helper: `cd /home/user/cung-tuong-mong && python3 dev/art/store-all/ndx1/nd.py ...`
Scratch dir S = /tmp/claude-0/-home-user-cung-tuong-mong/f1b54cf7-4c52-5d19-a246-ca440900bf9e/scratchpad

## Per person cNN
1. `nd.py prep cNN` → must print PASS for all 5 ages (STORE CHECK). Any FAIL → stop and report.
2. Upload her own t1 face pictures (folderReference `ba4aecfe-efce-47e2-b53f-30d292091886`), fileName `cNN_t1_aNN.webp`, url `https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-aNN.webp` for a18, a26, a36, a51 (a65 has no t1 → use the a51 face id).
3. For each age: `cat $S/cNN_aNN.txt` and pass that text EXACTLY, byte for byte (no edits, no trimming, no additions) as `prompt` to images_generate with:
   mode `gpt-2-6`, width 1024, height 2304, resolution `2k`, extraSettings `{"transparentBackground": true}`, folderReference as above,
   references = `[{"type":"image","identifier":"<her face id for that age>"},{"type":"image","identifier":"TdwDfOyVNR"}]` (exactly two: her own t1 = image 1, royal-yellow swatch = image 2; NEVER the style image 6AbGv6EiJO).
   You may fire the 5 ages in parallel.
4. creations_wait, then for each: `nd.py dl cNN aNN '<results.url>'` (quote the url).
5. `nd.py look cNN` → LOOK at `$S/out/look_cNN.jpg` and `$S/out/head_cNN.jpg` with the Read tool. GATE per image:
   - face = the same woman as her t1 (first tile of head sheet); closed-lip smile; eyes open; nothing covering the face;
   - bead fringe stops above the eyebrows; crown with dragons, NO flowers on the crown/hairpins;
   - NO forehead mark/dot/flower on the forehead (zoom if unsure: crop the face from `$S/out/cNN_aNN_nude.png`);
   - NO phi bạch (no sheer shawl draped behind the back/over the arms); stiff short shoulder pieces present;
   - ONE item held, calm pose; a51 shows visible silver at the temples; a65 clearly older with much silver; elders deeper colours;
   - full body head to feet, transparent background.
6. Passing image → `nd.py log cNN aNN <gen_id> <face_id>`.
   Failing image → `mv $S/out/cNN_aNN_nude.png $S/out/rej_cNN_aNN_<gen_id>.png`, append a ledger reject line:
   `echo '{"ts":"<UTC now>","kind":"NUDE-MASS","gen_id":"<id>","cmd":"python3 dev/art/store-all/build_all.py cNN nude --age aNN","store_check":"PASS","credits":135,"verdict":"REJECTED: <fault> -> regen k/2","who":"ROOT-48 art worker NDX1 painter"}' >> dev/art/gen_ledger.jsonl`
   then regenerate with the SAME prompt + refs (cap 2 regens per image). If it fails twice more, keep the best, log it with the fault noted in your report, move on.
7. Same crown design within one person is correct (crown varies per PERSON, not per age).

## Report (final message, short)
Per person: ages done with gen ids, regens + reasons, any image you are unsure of. Total gens. Nothing else.

## Forehead dots (learned c03/c08)
Some own t1 face refs carry a small red/pink dot on the forehead, and the one-ref method copies it. If a gen shows a forehead dot, check her t1 face (head sheet, tile 1): if the REF has the dot too, do ONE regen only; if it fails again keep the cleaner try, log it, and flag it in the report (do not burn the 2nd regen).
