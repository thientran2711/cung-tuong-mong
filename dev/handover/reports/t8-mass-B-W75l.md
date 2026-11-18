# t8-mass-B W75l — c24 a51, c25 a26 done; rest TODO
Same recipe as W75f/W75h handover (dev/handover/reports/t8-mass-B-W75h.md on review/t8-mass-W75h); fin script t8-mass-B-W75f-fin.py unchanged; frozen builder only (dev/art/t8-prompt-B/build.py, handover branch tip fe2c012). No code changes.
## Done (CDN base https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/)
| person-age | sheet | md5[:8] t8 v0/v1/v2 ; t7 v0/v1/v2 |
|---|---|---|
| c24 a51 | c24_a51_sheet.jpg | 4092b5b3/12bed8cd/0f90d159 ; 3451c539/448981ea/bda320c2 |
| c25 a26 | c25_a26_sheet.jpg | 896b23e3/dd9b881b/a2694352 ; e061439d/3cf82c3e/ae0911f0 |
Both: CDN synced + --check ok; READY sent to Foreman C. All 12 gens checked (t8 yellow dominant, t7 larger yellow parts, a18 colours kept, a51 face reads ~51).
## TODO: c25 a36, c25 a51 (ref urls: .../img/_review/consort-tiers/c25/b10-a36/c25_a36_t1_v0.png ; a51: .../img/hd/fig-consort-c25-t1-a51.webp)
## Tips
- Setup: mkdir /tmp/claude-0/w/{p,dev/site}; build.py from handover branch; fin.py = W75f-fin.py; cdn_sync.py + manifest_guard.py from origin/main. Dump prompts: `python3 build.py c25 v0 --age a36 > p/..` (t7: add --t7).
- v1/v2 prompts differ from v0 only in colour phrases (t8: robe "silk mixed with X" / v1 "silk" + MAIN-yellow COLOUR RULE; t7: robe word + COLOUR RULE clause); but paste build.py output exactly (print with cat and paste).
- Mapping bg-removed ids by order; fin.py takes the bg-removed render url per slot.
- ~45k tokens per person-age incl. reading 6 images; pasting 6 prompts is the main cost.
