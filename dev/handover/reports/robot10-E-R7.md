game sha 14ba8768 (partial12, chunk1, chunk2) / ac4790f0 (chunk3, chunk4)

# ROBOT-10 R7 report — origin bd, road bd_san (50 lives)

Runner R7, Foreman E. 10 bots x 5 lives, PAR=2, run in 2-bot chunks (harness-tracked background tasks; the box was reclaimed mid-run twice, so chunking replaced one 50-life run).
bd_soi was NOT run (moved to Foreman F by Foreman E child 3).

| part | bots | lives | harness | game sha | distinct bugs | crashes | stuck | file |
|---|---|---|---|---|---|---|---|---|
| partial12 | skilled x5, random x5, greedy x2 | 12 | main 14ba8768 | 14ba8768 | 27 | 0 | 7 | bd-20261124-0256-R7-partial12.md |
| chunk1 | greedy, cautious | 10 | main 14ba8768 | 14ba8768 | 35 | 0 | 3 | bd-20261124-0717-R7-chunk1.md |
| chunk2 | schemer, lover | 10 | fix-2 19183dca | 14ba8768 | 17 | 1 (tab OOM) | 2 (+1 HARNESS-ended life lover-1) | bd-20261124-0912-R7-chunk2.md |
| chunk3 | scholar, rebel | 10 | r3m 9e89619a | ac4790f0 | 6 | 0 | 2 | bd-20261124-1052-R7-chunk3.md |
| chunk4 | lazy, speed | 10 | r3m 9e89619a | ac4790f0 | 8 | 0 | 3 | bd-20261124-1204-R7-chunk4.md |

Greedy lives 1-2 appear in both partial12 and chunk1 (chunk1 re-ran greedy x5); the aggregate counts 50 distinct lives.
Rates: rates-20261124-1256.md/.csv/-avg.csv (same folder).

## Findings
- No NEW family vs R3/R4. Recurring: bot-page memory leak, stuck «Sang ngày mới» after load, no ending within the 1800 s wall cap.
- Bug counts fall chunk1 35 -> chunk4 8: mostly the newer harness (fix-2/r3m filters) plus the newer build, not necessarily fewer game faults. Compare rows only within the same game sha.
- Saves stay on the runner box (not in git); a fixer can ask for single ones.
