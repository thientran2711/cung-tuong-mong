# root30-W96b (painter, JOB C: t1-t6 style B a18; c05 redo v1/v2, then c06-c08)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims root30-mass brief | main 0 | review/* builder only | archive 0 -> REUSE frozen dev/art/t8-prompt-B (build.py 73299cc2, no edits). Golden c06 OK, test_low_all OK. FIGURE_GATE read (sections C/D/F key lines).

## c05 DONE (12 redo gens: v1/v2 x t1-t6, new colour table 5df887f7; v0 untouched) 1 gen each, 0 regens
Sheet https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/c05/c05_a18_low_sheet.jpg (row0 live, row1 v0, row2 v1, row3 v2). Files overwritten on CDN (md5 checked).
| figure | gens | pass |
|---|---|---|
| t1 v1 peach / v2 jade | 1+1 | pass |
| t2 v1 lilac / v2 plum rose | 1+1 | pass |
| t3 v1 rose pink / v2 lavender | 1+1 | pass |
| t4 v1 sky blue / v2 coral | 1+1 | pass |
| t5 v1 leaf green / v2 cornflower | 1+1 | pass |
| t6 v1 orchid purple / v2 apricot | 1+1 | pass (yellow panel+sash from swatch) |
Colour families now differ per rank and per version (v1/v2 no longer near-identical blush). ~1.7k credits.

## c06 IN PROGRESS (4 of 18 gens done, all pass, cut + on CDN img/_review/low-B/c06/ , no sheet yet)
Done: t1 v0 v1 v2, t2 v0 (c06_a18_t1_v0..v2.png, c06_a18_t2_v0.png). Face upload c06 t1 = face-c06-t1.png = 6AbZZygiJO (reuse).
TODO c06: t2 v1 v2, t3 v0-2, t4 v0-2, t5 v0-2, t6 v0-2 (t6 = 3 refs: face 6AbZZygiJO, style kspkwKx16B, swatch TdwDfOyVNR), then sheet, READY, then c07, c08.

## HANDOVER (context ~55% used; rollover)
Next: finish c06 (14 gens), then c07, c08 (18 gens each, all v0/v1/v2). Method that worked (lean):
1. build prompts: `python3 dev/art/t8-prompt-B/build.py cNN --low N vK --age a18` (re-fetch handover branch first; sparse worktree /home/user/wt/w96b may be gone: `git worktree add --no-checkout` + sparse dev/art dev/handover).
2. images_generate gpt-2-6 1024x2304 2k count 1 folder ba4aecfe-efce-47e2-b53f-30d292091886, refs [image face, style kspkwKx16B]; 4 in flight; paste the build.py text unchanged (print it with cat, copy whole).
3. NEVER creations_read each: download raw gens (token URLs from creations_wait) and montage 4 per image at 190x428 px with PIL, look once; only passing gens get images_remove_background (3 credits).
4. download cut PNG, check corner alpha 0, copy to cdn worktree (git worktree of origin/main sparse dev/site) img/_review/low-B/cNN/, CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py img/_review/low-B/cNN; sheet 6x4 230x518 cells (row0 live consort-tiers/cNN/b10/cNN_a18_t{N}_v0.png, rows1-3 new v0/v1/v2) uploaded as cNN_a18_low_sheet.jpg.
5. After each person send Foreman C READY.
(helper scripts lived in scratchpad and are gone with the container; they are 10-line PIL/curl scripts.)
