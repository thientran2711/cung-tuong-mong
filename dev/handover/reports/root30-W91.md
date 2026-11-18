# root30-W91 (painter W91, Foreman C ROOT-30) - JOB A a65 t7+t8 c01-c08
PRIORITY #1 CHECK: OD 0 | main 0 | review/* 0 | claims: brief dev/handover/briefs/root30-mass.md | method = frozen builder dev/art/t8-prompt-B (build.py, no edits).
Rules read in full before c01: START_CORE, START_WORKER, START_ART, FIGURE_GATE (all), consort-B10, t8-prompt-B README+refs. Golden `build.py c06 v0 --golden | cmp` = OK; test_low_all.py = OK (2304 builds).

| figure | gens | pass |
|---|---|---|
| c01 t8 v0/v1/v2, t7 v0/v1/v2 | 6 (1 each) | yes (looked at every image: ~65, silver hair, phoenix, closed lips, face clear, item below chin) |
| c02 same six | 6 | yes |
| c03 same six | 6 | yes |
| c04-c08 | 0 | NOT STARTED |

Sheets (live a51 t8 | a65 t7 v0-2 | t8 v0-2): https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/c0{1,2,3}_a65_sheet.jpg ; files c0N_a65_t{7,8}_v{0,1,2}.png in the same folder. All sent READY to Foreman C.

## HANDOVER (rollover) - next: c04, then c05..c08
- Magnific refs already uploaded (own live a51 t1): c01 1ldj8Lxr4r, c02 aFGEVSKfSh, c03 eIPBG68dqL, **c04 JNCPs5nOq4**, c05 If3hxHCtvE (old). c06-c08 not uploaded yet (creations_upload_image from https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-a51.webp, fileName fig-consort-cNN-t1-a51.png, folderReference ba4aecfe-efce-47e2-b53f-30d292091886). Style m09 = eIyOFEidqL.
- Prompts: `python3 build.py cNN v0|v1|v2 --age a65` (t8) and `python3 build.py cNN --t7 v0|v1|v2 --age a65` (t7); copy output verbatim. root30-W91-tools/seg.py cNN prints only the per-person segments (face, item, hands, colour sentences) so you only re-read what varies; the rest is identical to the c01/c02/c03 text.
- Per gen: images_generate gpt-2-6, 1024x2304, 2k, count 1, folderReference above, refs [image own a51 t1, style eIyOFEidqL]; then images_remove_background; curl the bg-removed render.png; root30-W91-tools/sheet.py cNN <scratch> builds the sheet; upload with cdn_sync from a sparse origin/main worktree (copy files to img/_review/t8-reprompt/, `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py <files>`).
- Cost seen: 135 credits/gen + 3/bg; ~40k tokens of context per person (verbatim prompts dominate).
~X% xong: JOB A W91 = 3/8 people (~38%) / ~38% chơi được (nothing live).
