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

## LEAD HANDOVER #5 -> #6 (17/11 ~02:00Z). START_CTX lead #5 ~3%; rolled over at ~28% (context). Foreman C s10 = session_011xDdVSeKM6qi8YXjVTPqrd opens lead #6 (lead never opens its own successor). Report to Foreman C by send_message; never talk to the owner.
STATE: owner GO 17/11 ~01:25Z for the WHOLE set; owner 01:30Z "2K là được rồi" => 2k only (1024x2048, 65 cr, extraSettings transparentBackground=true gives real alpha at 2k; 4k = opaque/fake checkerboard -> remove_background +3 cr). Thaihau skipped (old-people proportion worker session_011xDdVRzEtFchdNQKaMfih7). NO fish-tail trains (hem at feet). Owner wants NO more sheets for approval; Foreman C spot-checks hourly. Priority: a18 of ALL families first, then a26/a36/a51. BATCH_BRIEF.md (this folder) = binding brief for workers (owner words, 2k, no trains, proportion, TRANSPARENCY, UPLOADER (cdn_sync.py only on origin/main), hd rule (hd only where CDN has it; maids none), THROUGHPUT, CONTEXT DIET).
WORKERS (7 shards; each has batch-<shard>.md with TSV + handover; successors opened by the lead WITH source_url, sparse dev, branch handover, 3 rollover lines verbatim + CONTEXT DIET text):
- W1b hero+misc 1063 (shard w1-hero-misc) = session_011xDdVQbi2xn77hhwc3Qh3P (W1 retired: 16 hero files live at 4k)
- W2 consort-ty 1024 = session_011xDdVRJKYSAaQP1Z2rspXD (running, batch-consort-ty.md)
- W3b consort-rest-A 976 = session_011xDdVRasDZpQLoZZZc3Mmn (W3 retired: 20 files live; next c02-t3-a18)
- W7 consort-rest-B 976 = session_011xDdVSQXPe2qq8TJQ8hLyw (batch-consort-rest-B.md)
- W4b maid-ty 1664 = session_011xDdVSDgWxxs57zsL4S2JZ (W4 retired after 5; batch-maid-ty.md)
- W5b maid-rest-A 1586 = session_011xDdVRUq5KAtiVYtgqEjkS (W5 retired: 25 a18 live; next m02-t6-a18)
- W6 maid-rest-B 1586 = session_011xDdVNVPxjHSMerTjisLs3 (batch-maid-rest-B.md)
Retired pilots (archived by Foreman C): consort-ty ...Swe9QkM3wQy68q8kW, consort-rest ...StNhTvqiYzrTkyv2p, maid ...P57zPp4r9Gi61fiKp, misc ...PRFDEZZgSVGj5StKL, hero ...QK3g91ieUt2tJBYy7.
LIVE ON CDN at 02:00Z: ~36 + W5's 25 + W2/W4/others in progress. Credits: ~65-83 cr/file; account ~1.26M at start.
RISK: throughput is context-bound (~12-25 files per worker session at first; CONTEXT DIET targets >=40). ~8,800 files remain => hundreds of sessions unless the diet works; cap 7 workers now, Foreman C allows up to 12 total. Re-measure files/hour after the next worker reports and tell Foreman C. Possible later: ask the owner to accept a18 first and other ages as slow follow-up (Foreman C said other ages follow, not dropped).
YOUR LOOP: read notifications; when a worker reports a rollover, open its successor (copy the W5b prompt pattern); relay new findings into BATCH_BRIEF.md and to the workers; report counts + credits to Foreman C hourly; keep this section current.

## LEAD HANDOVER #6 (art lead #6 = session_011xDdVS87fDNLJMJGzeiVWL, started 17/11 ~02:00Z, START_CTX ~3% of 1M; roll over at ~28%, never above 60%; Foreman C opens #7)
- 02:00Z told all 7 workers 'new lead'. Maid hd answer (told Foreman C): game reads hd for any fig-*.webp listed in img/FIGURES-hd.json; maids simply were never listed/uploaded => no code change; workers now make+upload hd for all figs and merge manifest entries (BATCH_BRIEF.md section 'HD FOR EVERY FIGURE').
- Files live / credits: (fill each hour)
- 02:15Z manifest merge #1: CDN FIGURES-hd.json 1598 -> 1635 (W4b maid fragment, rebuilt by lead from CDN). W4b->W4c = session_011xDdVShYq4ow4VaBTVm4CY; W7->W7b = session_011xDdVRfTXkRr1K97oJueiZ (retro-fits 56 hd). W2: 33/256 a18 (ctx ~15%).
- 02:20Z W6->W6b = session_011xDdVNxAYRynZa8Sq6PzU6 (retro-fit hd of 56). Workers now: W1b ...Qbi2, W2 ...RJKY, W3b ...RasD, W4c ...ShYq4, W5b ...RUq5, W6b ...NxAY, W7b ...RfTX.
- 02:22Z W1b rolled over (~63 files live at 2k, no hd). Per Foreman C (6 family workers): NO successor; remaining hero+misc (eunuch a18 ~108, kid, other ages, + hd retro-fit of ~63 live files; see batch-w1-hero-misc.md, lists/shards/w1-done-2k.txt) merged into W2's queue (W2 delegates generation to sub-agents, lightest context). Workers now: W2, W3b, W4c, W5b, W6b, W7b.
- 02:58Z manifest merge #3 done (see count in report to C). W5b->W5c = session_011xDdVPuKQaYeJ9rNmE133Y; W3b->W3c = session_011xDdVQECUiUwmhLDihxoCd. RANK RULE (owner 17/11 ~03:02Z): consorts must not look like maids; W4c makes sample in rank-sample/, W2 ty1 paused (31 live ty1 + 79 ty1-3 at risk), maid-ty paused. Magnific shared slots 48/48 => max 5 images_generate at once per worker. Live a18 ~700: ty 192, maid-ty 124, cr-A 76, cr-B 56+, mr-A 89, mr-B 80+, hero-misc 63.
- 03:00Z merge #4: manifest 2222 -> 2248. Rank sample v2 (rank-sample/rank-sample-v2.jpg) sent to C; waiting owner OK; maid-ty + all t1 paused; at-risk lists in rank-sample/. Workers: W2 RJKY, W3c QECU, W4c ShYq4 (idle, sample done), W5c PuKQ, W6b NxAY, W7b RfTX.
- 03:58Z hourly: manifest merge #7 (see report). Owner rulings: maid redo cancelled, own costume per identity (no template), t1 GO (then withdrawn by rank-standard order), RANK STANDARD sheets (rank-standard/ + rank-standard.md) pending owner approval; ALL new consort + new maid-rank generation PAUSED; running: plain-maid repaint (W5c/W6b), eunuch/kid/misc (W4d). Est live new 2k files ~1,300 (ty ~330, cr-A ~150, cr-B 316, maid-ty 172, mr-A ~130, mr-B ~190+, hero-misc ~75); credits ~65/file => ~90k + ~3k sheets. Workers: W2b QTSTR, W3c QECU, W4d PnYcs, W5c PuKQ, W6b NxAY, W7b RfTX.
- 04:55Z merge #8 (see C report). Owner consort rules (flowing Han, wide sleeves, no bulk/qipao/vest, ALWAYS phi bach; maid+mama none) appended to BATCH_BRIEF.md. W3c rolled over idle (W3d to open at GO), W2b/W5c/W6b/W7b idle, W4d eunuch (mama paused). Generation paused until owner approves v4 standards.
