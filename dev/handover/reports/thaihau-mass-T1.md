# thaihau-mass T1 (c01-c08) — HANDOVER to T1b (written 18/11 ~22:11Z, ctx ~45 %, START_CTX ~15 %)
PRIORITY #1 CHECK ('thai hau mass a36 a51 a65'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0. Read: START_CORE, START_WORKER, START_ART, FIGURE_GATE (D, owner 22:05 block), briefs/thaihau-mass.md, states-sample.md, APPROVED_PROMPTS.md.

## Status
Nothing is final. All 5 gens below used style B kspkwKx16B + own identity => TO BE REDONE (owner 22:30Z: style B no longer a reference; ONE ref = her own identity).
Redo command: `python3 dev/art/t8-prompt-B/build.py cNN --state thaihau --age a36|a51|a65 --nostyle` at build.py >= 4e1fca5d, pasted UNCHANGED. Refs = own identity image only.
Style-B gens (looked, looked OK, 135 cr each): c01 a36 Lw8SEkXswO, c01 a51 6AbZgFxiJO, c01 a65 gOm7qtZSXO, c02 a36 xSBlue0jfW (not looked), c02 a51 O6E9xCSynm (not looked). Cut-outs c01: nVs09obYQD, DoOXAClpcl, MBJd2CiDCm (a36,a51,a65 order assumed). Total 5 gens + 3 cut-outs.
Findings: gpt-2-6, width 1024 height 2304, resolution 2k, count 1 works via images_generate (references type image). Items per person come from build.py (c01 fan, c02 gold-thread book). No live t1 a65 on CDN for c01-c08 (404) => a65 uses the a51 identity.

## Identity uploads (folder ba4aecfe..., uploaded from CDN img/hd/fig-consort-cNN-t1-<age>.webp; id order from parallel calls, verify by looking)
| c | a36 | a51 |
|---|---|---|
| c01 | If3vWAFtvE | xSBlfhSjfW |
| c02 | SyhJqK7Ub8 | eIPoAYFdqL |
| c03 | DoOXZYvpcl | p8yB2cNehw |
| c04 | 5jDrmFiKxe | O6E9170ynm |
| c05 | UPvObSjwny | If3hxHCtvE (from sample; c05 a51 thaihau already exists: img/_review/states-sample/c05_a51_thaihau_v1.png, copy as c05_a51_thaihau_v0.png, no redo) |
| c06 | JNC41yCOq4 | ksejajT16B |
| c07 | 3zKAUG9REY | WDgVNppcXe |
| c08 | dt48zhJXSL | 4RFiLAP9Aa |

## Remaining
c01..c08 x a36/a51/a65 (c05 a51 copy) = 23 gens + cut-outs, sheets cNN_thaihau_sheet.jpg, CDN img/_review/thaihau/ (CLOUDFLARE_API_TOKEN=proxy-injected python3 dev/site/cdn_sync.py ...), report lines per person, READY to ROOT-31 per 2-3 people. Look at every image (<=600 px): face, stiff shoulder piece + collar, age, one item, closed lips, no forehead mark, not back-turned. Regen max 3. Worktree: /home/user/wt/t1 (sparse), builder outputs saved in scratchpad p/ may be gone: rebuild.
~15% xong / ~0% chơi được
