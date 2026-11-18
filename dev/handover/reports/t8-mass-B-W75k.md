# t8-mass-B W75k (c26 a51 + c27 a26 done; c27 a36, c27 a51 TODO) — report + HANDOVER
Frozen builder dev/art/t8-prompt-B/ used unchanged (build.py cNN v0|v1|v2 --age aXX ; --t7 for t7). CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/
## Done
| person-age | sheet | md5[:8] t8 v0/v1/v2 ; t7 v0/v1/v2 | gens |
|---|---|---|---|
| c26 a51 | c26_a51_sheet.jpg | dc3d454e/5fc532fd/e321c72d ; 97946fd6/eb2421d8/c4985026 | 6, no regen |
| c27 a26 | c27_a26_sheet.jpg | (see CDN, cdn_sync --check same) | 6, no regen |
READY sent to Foreman C for both.
## TODO: c27 a36, c27 a51
1. Ref: creations_upload_image(url, fileName face-c27-t1.png, folderReference ba4aecfe-efce-47e2-b53f-30d292091886). a36 url = .../img/_review/consort-tiers/c27/b10-a36/c27_a36_t1_v0.png ; a51 url = .../img/hd/fig-consort-c27-t1-a51.webp.
2. Build prompts: copy build.py from branch claude/cung-tuong-mong-handover-hj0h8w (dev/art/t8-prompt-B/), run `build.py c27 v0|v1|v2 --age aXX` and `--t7`. Paste output verbatim into images_generate (gpt-2-6, 1024x2304, 2k, count 1, refs [{image,upload},{style,eIyOFEidqL}]). v1/v2/t7 differ from v0 only in colour slot (diff to confirm).
3. images_remove_background each -> creations_wait -> curl cut PNGs (alpha 0 check) -> 6-wide sheet (300px/col, grey bg) -> read sheet.
4. cdn_sync: fetch main, take dev/site/cdn_sync.py + manifest_guard.py into a scratch root, put files in img/_review/t8-reprompt/, `python3 -I dev/site/cdn_sync.py <7 files>` then `--check`.
5. READY via mcp__claude-code-remote__send_message (SendMessage tool cannot reach session ids) to session_011xDdVS7JY8KJW8hzKtoquL.
