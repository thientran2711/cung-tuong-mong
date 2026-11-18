# t8-mass-B W77b (c01-c11, 4 ages) — HANDOVER at ctx ~25% of START (worker rollover)
PRIORITY #1 CHECK: brief t8-mass-B + W77 report + Foreman C EXTRA (--age) | builder dev/art/t8-prompt-B | review/* none else.
START_CTX ~0%, depth n/a (worker).
## Done
- build.py `--age a18|a26|a36|a51` (default a18; only the age phrase changes, jobs.json wording; a18 byte-identical, golden OK) — branch review/t8-mass-W77b sha 3939488a.
- c01 a18 t7+t8 v0/v1/v2 NEW YELLOW (C2) painted, 1 gen each (6 gens), all 6 cut-outs black-fill checked OK, on CDN img/_review/t8-reprompt/c01_a18_t{7,8}_v{0,1,2}.png + c01_a18_t7t8_sheet.jpg (old-yellow files overwritten).
## Tooling (scratch /home/user/wt/w77-work, /home/user/wt/w77-cdn; rebuild from dev/art/t8-prompt-B/tools)
- cdn root needs dev/site/{cdn_sync.py,manifest_guard.py,manifest-floor.json} from main.
- fin.py/push.sh hardcode "a18" in file names: for a26/a36/a51 change to `<cNN>_<age>_t<T>_v<K>.png` (+ sheet `<cNN>_<age>_t7t8_sheet.jpg`); old-t8 columns in the sheet do not exist for other ages.
- Magnific t1 ids: c01 a18 TdUToMoVNR, c02 a18 SymS2HTUb8, c06 a18 TdU0vvvVNR. Others + a26/a36/a51 t1: upload (see message of Foreman C for the source path).
## Cost note for Foreman C
One person-age = 6 gens + 6 cut-outs, prompts must be pasted literally into each images_generate call (~1k tokens each) => ~25-30k tokens per person-age. 11 people x 4 ages = 44 person-ages = ~1.2M tokens: needs ~15+ successor sessions. Suggest splitting c02..c11 by person/age across several workers.
## Next
c01 a26, a36, a51 (t1 refs not yet checked on CDN: img/_review/consort-tiers/c01/b10-<age>/c01_<age>_t1_v0.png else img/hd/fig-consort-c01-t1-<age>.webp), then c02..c11 (c06 all six), a18 then a26/a36/a51 per person.
