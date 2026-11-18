# root30-W96 (painter, JOB C: t1-t6 style B, a18, c05-c08)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims root30-mass brief | main 0 | review/* low-ranks-B-W79 builder only | archive 0 -> REUSE frozen dev/art/t8-prompt-B (build.py, no edits). Golden: `build.py c06 v0 --golden | cmp` OK; test_low_all.py OK 2304 builds.
Rules re-read before c05: FIGURE_GATE (all), consort-B10, START_CORE/WORKER/ART, root30-mass brief, README, W79 report.
Magnific: same account (268,243 credits at start); refs m09/style B kspkwKx16B/swatch TdwDfOyVNR valid; face upload c05 t1 = face-c05-t1.png (79fyQaVJAL). t1-t5 refs = face + style B; t6 = face + style B + swatch. 1024x2304 2k gpt-2-6, no seed, count 1, then images_remove_background.

## c05 (a18) - sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/c05/c05_a18_low_sheet.jpg  (row0 live t1-t6 v0, rows1-3 new v0/v1/v2)
Files: img/_review/low-B/c05/c05_a18_t<N>_v<k>.png (18, md5 checked vs CDN). cut: all alpha 0 corner, 0 black fill.
| figure | gens | pass |
|---|---|---|
| t1 v0 v1 v2 | 1 each | pass (closed lips, fan below chin, no phoenix, no yellow) |
| t2 v0 v1 v2 | 1 each | pass |
| t3 v0 v1 v2 | 1 each | pass |
| t4 v0 v1 v2 | 1 each | pass |
| t5 v0 v1 v2 | 1 each | pass |
| t6 v0 v1 v2 | 1 each | pass (small yellow sash/inner panel, pearls) |
Total 18 gens, 0 regens (~2.4k credits + 54 cut).
FLAG (not mine to change, prompt frozen): c05 LOWV v1/v2 for t1-t6 are all blush-pink / pale-peach (t1v1~t1v2, t2v2~t3v2, t5v1~t5v2 nearly identical). Owner rule C3a wants 3 completely different colour families; the LOWV table for c05 (measured from pastel live pics) fails that. Foreman should decide whether to change LOWV rows for c05 (and probably others) before more mass.
Item note: items come from build.py (every rank = round fan with peony painting) - same kind per rank, rising richness, contrast with robe OK.

## HANDOVER (context ~60% used after c05)
Next: c06, c07, c08 (a18, same method). Setup: worktree /home/user/wt/w96 (sparse, handover branch) for build.py; /home/user/wt/w96-cdn (origin/main sparse + cdn_sync.py) for upload with CLOUDFLARE_API_TOKEN=proxy-injected; prompts via `python3 dev/art/t8-prompt-B/build.py cNN --low N vK --age a18`; upload face-<cNN>-t1.png from https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png. Sheet recipe: 6 cols x 4 rows, 230 px cells (row0 live t1-t6 v0 from CDN). Successor must be opened by Foreman C.
