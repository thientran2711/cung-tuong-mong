# BATCH PLAN (art lead #5, 16/11) — prepared, NOT started. Waits for Foreman C "GO" with the owner's words.
START_CTX lead #5 ~0-5% of 1M. Roll over at ~30%, never above 60%.
## Shards (<=5 workers open at once, each with source_url of the repo; lists/shards/<shard>.txt = file names under img/)
| shard | files | res | order |
| hero (player, thaihau, emperor, physician, tutor, steward, fallen, official) | 97 | 4k | 1 |
| consort-ty | 1024 | per owner verdict | 2 |
| consort-rest | 1952 | per owner verdict | 3 |
| maid-ty | 1664 | per verdict | 4 (after maid pilot is approved) |
| maid-rest | 3172 | per verdict | 5 |
| misc (eunuch 481, kid 336, man 132, mama 32) | 981 | per verdict | 6 |
Worker slots: W1 hero then misc, W2 consort-ty, W3 consort-rest, W4 maid-ty, W5 maid-rest. Each worker follows FAMILY_BRIEF.md recipe (finish_fig.py -> qa_fig.py -> LOOK) and uploads to CDN only after lead says GO for that family.
Ages a26/a36/a51: separate generation, identity ref = the a18 CDN file of the same look (after a18 is approved).
Pilot masters are NOT reused unless the owner OKs the pilot; pilot files (a18) can count as done.
## Batch rules (owner)
one skin (4 praised faces 01/05/12/18); lively hands + props; huadian flower/leaf only, 0.085 x face width; never back-turned; transparent bg; full body incl. feet; nothing touching canvas edge; fit_fig height = old; no low res; men never pink/purple.
## Per-batch QA
qa_fig.py every file + forehead-crop contact sheet + hands/feet look on dark+light; fail -> regenerate max 2, then 'hard' list. Credits tracked per worker in its report.

## CREDITS (re-estimate 17/11 after owner: 2k only)
~8,800 files x 65 cr = ~572k + ~8% retries = ~620k (balance ~1.27M).
