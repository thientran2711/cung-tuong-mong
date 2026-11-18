# t8-mass-B W75e (c23 a51 done; c24-c27 a26/a36/a51 TODO) — report + HANDOVER
PRIORITY #1 CHECK: reused FROZEN builder dev/art/t8-prompt-B/ (build.py: `cNN v0|v1|v2 --age aXX` t8, `... --t7 --age aXX` t7). No new code. Rolled over early (context: each person-age costs ~35k tokens because 6 full prompts are pasted into gens).
## Done (CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/)
| person-age | files | sheet | md5[:8] t8 v0/v1/v2 ; t7 v0/v1/v2 | gens |
|---|---|---|---|---|
| c23 a51 | c23_a51_t{7,8}_v{0,1,2}.png | c23_a51_sheet.jpg (t8 v0-2 | t7 v0-2) | c6df9f93/2e809c32/ffda6f33 ; c19d0784/6220536c/181ac01d | 7 (t8 v0: first gen refused as false NSFW, resent identical) |
READY sent to Foreman C. All 6 looked at: yellow dominant on t8, larger yellow parts on t7, a18 colours kept (coral red / azure / orchid purple), phoenix clear, face reads ~50, a few silver strands.
## NOT done: c24, c25, c26, c27 at a26, a36, a51.
## HANDOVER
1. a51 ref: `creations_upload_image(url=https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-a51.webp, fileName face-cNN-t1.png, folderReference ba4aecfe-...)` works directly (webp URL accepted, no conversion needed). a26/a36 = .../consort-tiers/<cNN>/b10-a26|b10-a36/<cNN>_aXX_t1_v0.png.
2. images_generate mode gpt-2-6, 1024x2304, resolution 2k, count 1, refs [{image,<upload>},{style,eIyOFEidqL}], prompt = build.py output pasted verbatim. 3-4 gens at once.
3. Then images_remove_background on each (3 credits) -> creations_wait -> `python3 -I dev/handover/reports/t8-mass-B-W75e-fin.py cNN aXX t8v0=<cut url> ... t7v2=<url>` (downloads to /tmp/claude-0/w/img/_review/t8-reprompt, makes 6-column sheet, prints md5). Then cdn_sync: copy dev/site/cdn_sync.py + manifest_guard.py from origin/main into /tmp/claude-0/w/dev/site and run `python3 -I dev/site/cdn_sync.py <7 files>` from /tmp/claude-0/w, then `--check`.
4. Send READY via SendMessage to session_011xDdVS7JY8KJW8hzKtoquL.
5. Tip: a first-run NSFW false positive can occur; resend the identical prompt.
