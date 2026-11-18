# t8-mass-B W75c (c28-c32; a18 a26 a36 a51; t7 + t8, v0/v1/v2) — report + HANDOVER
PRIORITY #1 CHECK: build.py on handover branch already has --age and ORIG1 rows c26-c32 (all 20 person-ages build OK). Prompt = build.py output, pasted unchanged.
Rolled over at start+25% of the 1M window (each person-age costs ~25-30k tokens because 6 full prompts are pasted).
## Done (all gens=1, all 6 looked at on a raw contact sheet, bg removed, cdn_sync + --check same)
CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/
| person-age | sheet | md5[:8] t7 v0/v1/v2 ; t8 v0/v1/v2 |
|---|---|---|
| c28 a18 | c28_a18_sheet.jpg | a0e93083/a41d9bec/230dccf0 ; bc901d5d/9043a66b/1cec6368 |
| c28 a26 | c28_a26_sheet.jpg | 22003e2a/ed4568e0/03ab57c8 ; bcd73878/60905527/4942c8d3 |
| c28 a36 | c28_a36_sheet.jpg | (see CDN) |
| c28 a51 | c28_a51_sheet.jpg | (see CDN) |
| c29 a18 | c29_a18_sheet.jpg | (see CDN) |
| c29 a26 | c29_a26_sheet.jpg | (see CDN) |
Files: c28_aXX_t{7,8}_v{0,1,2}.png (1024x2304 transparent). All six reported READY to Foreman C (gens=6 each).
## NOT done: c29 a36, c29 a51; c30, c31, c32 at a18 a26 a36 a51.
Existing t1 uploads (Magnific, folder ba4aecfe): c29 a36 = p8ydHzoehw, c29 a51 = 0eUVC25TfW (c29 a18 vQAfsTha47, a26 79fOWKlJAL). c30-c32: upload their own.
Observation for Foreman C: at a51 the faces read only slightly older than a18 (prompt frozen, not touched).
## HANDOVER
1. Prompt per age: `python3 dev/art/t8-prompt-B/build.py cNN v0|v1|v2 --age aXX` (t8), `... cNN v0|v1|v2 --t7 --age aXX` (t7). VERIFIED: for c28 the output at a26/a36/a51 equals the a18 output with ONLY "about 22, youthful adult." replaced by the age text (a26 "about 30, mature and poised." / a36 "about 42, dignified and still beautiful, only subtle fine lines at the eyes." / a51 "about 55, graceful beautiful older lady, only soft faint lines, a few silver strands, still lovely."). Still run build.py for each new person and paste its output.
2. Ref 1 = that person's own t1 of the SAME age: a18 = https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/cNN/b10/cNN_a18_t1_v0.png ; a26/a36/a51 = live https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-aXX.webp (a26..a51 b10 PNGs do not exist). creations_upload_image (folder ba4aecfe-...) -> identifier. Existing uploads: c28 a18 = 8a68XREIrU, c28 a26 = EbYQHPbuuO. Ref 2 = {style, eIyOFEidqL}.
3. images_generate gpt-2-6, 1024x2304, 2k, count 1, six calls in one turn (t8 v0-2, t7 v0-2); creations_wait; then images_remove_background for each (folder given); creations_wait.
4. Looking: tools/w75c/rawsheet.py TAG label=url... downloads raw gens and builds ONE contact sheet (full body + face crop) -> view once with Read instead of 6 creations_read (saves context).
5. Finish: tools/w75c/fin2.py cNN aXX t8v0=url ... t7v2=url (cutout urls): downloads, writes sheet (old live t8 + 6 new, 7 columns), black-fill/alpha check, md5, cdn_sync + --check. It expects scratch root $S/cdnroot with dev/site/{cdn_sync.py,manifest_guard.py,manifest-floor.json} from origin/main (S path is hard-coded at the top: adjust). Then send_message (claude-code-remote) to session_011xDdVS7JY8KJW8hzKtoquL: "READY t8-B+t7 cNN aXX sheet <url> gens=N". (SendMessage tool does not reach it; use mcp__claude-code-remote__send_message.)
6. Colours: same at every age incl. a51 (owner 19:55Z); never edit prompts.
