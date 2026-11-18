# root30 W90 — JOB B a51 DARK sample (c13, c05; t7 v0 + t8 v0)
PRIORITY #1 CHECK: OD 0 new | ledger 0 | claims 0 | main 0 | review/* none usable → reused frozen builder dev/art/t8-prompt-B (handover tip). Golden `build.py c06 v0 --golden | cmp` = OK; test_low_all.py = OK (2304 builds).
Rules re-read before gens: START_CORE, START_WORKER, START_ART, FIGURE_GATE (all), consort-B10, t8-prompt-B README/refs. Prompts = build.py output (`--age a51`, `--t7 v0`), pasted unchanged. Refs: own live a51 t1 (c13 rgXL37zxtc, c05 If3hxHCtvE) + m09 eIyOFEidqL. gpt-2-6, 1024x2304, 2k, count 1, no seed, then images_remove_background.

| figure | gens | pass | note |
|---|---|---|---|
| c13 a51 t7 v0 | 2 | partial | silver streaks clear, closed lips, face free, phoenix clear. Colour stays apricot-peach (not dark): both gens the same. Kept gen 1 (silver clearer) |
| c13 a51 t8 v0 | 1 | yes | gold dominant (antique), peach second, silver visible |
| c05 a51 t7 v0 | 1 | yes | deep teal, yellow parts, silver visible |
| c05 a51 t8 v0 | 1 | yes | antique gold + teal, silver visible |

FINDING: the frozen text still carries "all colours fresh, clear and luminous" (COLOUR RULE) next to the "DEEPER, DARKER" sentence; for c13 (peach original) the fresh clause wins, so t7 stays bright peach. Prompt NOT edited (frozen); owner/Foreman C decides whether to drop the clause for a51.
Gens total 5 (675 credits) + 4 cut-outs.
Files (CDN): img/_review/t8-reprompt/{c13,c05}_a51d_t{7,8}_v0.png ; sheet img/_review/t8-reprompt/age_colour_sample.jpg (rows c13 t7, c13 t8, c05 t7, c05 t8; cols a18 live | a51 live old | a51 dark NEW | a65). https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/age_colour_sample.jpg
Not live. Old files untouched.

## Round 2 (Foreman C order: build.py a51 colour clause swapped, commit 444f8c04)
Golden + test_low_all OK on the new tip. Same 4 figures, same refs, build.py output pasted unchanged (`--age a51`, `--t7 v0`), 1 gen each (4 gens, 540 credits + 4 cut-outs).
| figure | gens | pass | note |
|---|---|---|---|
| c13 a51d2 t7 v0 | 1 | yes | now deep rose-terracotta + gold (was bright peach), silver visible, closed lips, face free |
| c13 a51d2 t8 v0 | 1 | yes | antique gold + dusty rose, silver visible |
| c05 a51d2 t7 v0 | 1 | yes | deep teal + gold |
| c05 a51d2 t8 v0 | 1 | yes | antique gold + deep teal |
Files: img/_review/t8-reprompt/{c13,c05}_a51d2_t{7,8}_v0.png ; sheet age_colour_sample2.jpg (cols a18 live | a51 old | a51 dark 1st try | a51 dark2 NEW | a65). https://ctm-img.victoria-tntt.workers.dev/img/_review/t8-reprompt/age_colour_sample2.jpg
Total gens this job: 9. Not live.

## HANDOVER (W90 rollover, ~21:05Z) — next job states-sample NOT started
Context of W90 is past START_CTX+25 % (long prompts + FIGURE_GATE reads). Nothing of dev/handover/briefs/states-sample.md has been done: no builder change, no gen, no files.
Successor: read the brief in full, START_CORE/WORKER/ART, FIGURE_GATE (all), consort-B10, t8-prompt-B README. Practical notes from W90:
- Workflow that works: worktree /home/user/wt/h (sparse dev/rules dev/art dev/handover) detached at the handover tip; cdn worktree /home/user/wt/w90-cdn (origin/main, sparse dev/site) + `CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py <files>` works; scratch in the session scratchpad.
- Prompts must be pasted into images_generate by hand: print the build.py output to a file, cat it, paste unchanged (c13/c05 a51 done this way). Max 4 gens in flight; creations_wait, creations_read (low), images_remove_background (folder ba4aecfe…), download from the result url (token in URL).
- Pushing: `git checkout -q -- .` first (build.py run dirties __pycache__ and blocks checkout), then fetch --depth=30 under flock, checkout FETCH_HEAD detached, cherry-pick, push; verify the remote file afterwards.
- FIGURE_GATE still says Nữ đế painting stopped until owner says otherwise; the brief quotes her 21:00Z go-ahead (sample only).
- Sheet helper: scratchpad sheet.py style (PIL thumbnails on white, <=1400 px wide).
