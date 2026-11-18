# t8-mass-B W75g (c26 a26 + a36 done; c26 a51, c27 a26/a36/a51 TODO) — report + HANDOVER
Frozen builder dev/art/t8-prompt-B/ used unchanged (`build.py cNN v0|v1|v2 --age aXX` t8; `build.py cNN --t7 v0|v1|v2 --age aXX` t7). Golden c06 v0 checked byte-identical.
## Done (CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/)
| person-age | sheet | md5[:8] t8 v0/v1/v2 ; t7 v0/v1/v2 | gens |
|---|---|---|---|
| c26 a26 | c26_a26_sheet.jpg | 8441c585/abe0a108/2c784d7b ; 7d4f4285/0843a3b2/64bb82a6 | 6 (1 each, no regen) |
| c26 a36 | c26_a36_sheet.jpg | fe7cc879/2a4b8c62/8a746a33 ; 39391b96/0bc44700/29b819fa | 6 |
READY sent to Foreman C for both. Files c26_aXX_t{7,8}_v{0,1,2}.png synced (cdn_sync --check same).
## NOT done: c26 a51; c27 a26, a36, a51.
## HANDOVER
1. Refs: creations_upload_image(url, fileName face-cNN-t1.png, folderReference ba4aecfe-efce-47e2-b53f-30d292091886). a26/a36 url = .../img/_review/consort-tiers/<cNN>/b10-a26|b10-a36/<cNN>_aXX_t1_v0.png ; a51 = .../img/hd/fig-consort-cNN-t1-a51.webp (webp accepted).
2. images_generate mode gpt-2-6, width 1024 height 2304, resolution 2k, count 1, refs [{image,<upload>},{style,eIyOFEidqL}], prompt = build.py output pasted verbatim (6 per person-age; I verified a36/a51 prompt == a26 prompt with only the age sentence swapped, so pasting is safe, but still print build.py output for each new person: c27 differs in face/colours/item).
3. images_remove_background on each (folderReference as above) -> creations_wait -> `python3 -I fin.py cNN aXX t8v0=<cut url> ... t7v2=<url>` (copy of t8-mass-B-W75g-fin.py; run from /tmp/claude-0/w) -> view the sheet -> cdn_sync: `git fetch --depth=1 origin main`, `git show FETCH_HEAD:dev/site/cdn_sync.py` + manifest_guard.py into /tmp/claude-0/w/dev/site, run `python3 -I dev/site/cdn_sync.py <7 files>` then `--check` from /tmp/claude-0/w.
4. READY via send_message to session_011xDdVS7JY8KJW8hzKtoquL.
5. Cost: each person-age ~35k tokens of context (6 pasted prompts); a false NSFW refusal may be resent once unchanged.
