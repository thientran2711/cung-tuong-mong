# t8-mass-B W75f (c24 a26 done; rest TODO) — report + HANDOVER
Frozen builder only (dev/art/t8-prompt-B/build.py `cNN v0|v1|v2 --age aXX` t8; `cNN v0|v1|v2 --t7 --age aXX` t7). No code changes. Rolled over at ~1 person-age (each costs ~30k tokens: 6 full prompts pasted).
## Done (CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/)
| person-age | sheet | md5[:8] t8 v0/v1/v2 ; t7 v0/v1/v2 | gens |
|---|---|---|---|
| c23 a51 (W75e) | c23_a51_sheet.jpg | see W75e report | 7 |
| c24 a26 | c24_a26_sheet.jpg | 2cf27212/4ba7d0b3/ba11e056 ; 101a1a1b/cd464ad2/28895e79 | 6 (1 each) |
READY sent to Foreman C for c24 a26. All 6 checked: yellow dominant t8, larger yellow parts t7, a18 colours kept (coral red / scarlet accent / lavender; t7 coral / lavender / azure), face = her t1. Output files are 1024x2304 (same as W75e).
## NOT done: c24 a36, c24 a51; c25 a26/a36/a51 (c25 t1 refs: same URL patterns); c23 a26/a36 if still wanted (task listed c24,c25 only).
## HANDOVER (same recipe as W75e, worked unchanged)
1. Ref upload: creations_upload_image url=https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10-a26|b10-a36/<cNN>_aXX_t1_v0.png (a51: .../img/hd/fig-consort-<cNN>-t1-a51.webp), fileName face-<cNN>-t1.png, folder ba4aecfe-efce-47e2-b53f-30d292091886.
2. images_generate gpt-2-6, 1024x2304, 2k, count 1, refs [{image,<upload>},{style,eIyOFEidqL}], prompt = build.py output pasted verbatim (dump all 6 to files first). 3-4 gens in flight; creations_read to look.
3. images_remove_background on each accepted gen (3 credits), creations_wait, then `python3 -I dev/handover/reports/t8-mass-B-W75f-fin.py cNN aXX t8v0=<url> t8v1=.. t8v2=.. t7v0=.. t7v1=.. t7v2=..` (writes to /tmp/claude-0/w/img/_review/t8-reprompt, sheet + md5). cdn_sync: copy dev/site/cdn_sync.py + manifest_guard.py from origin/main into /tmp/claude-0/w/dev/site; run `python3 -I dev/site/cdn_sync.py <7 files>` from /tmp/claude-0/w, then `--check`.
4. READY via send_message to session_011xDdVS7JY8KJW8hzKtoquL.
