# t8-mass-B W77i (c03 a18..a51, then c04 x4) - ROLLOVER after c03 a26 (context: ~35k tokens per person-age, prompts pasted 6x)
## Done (all gens 1 each, no regen; looked at every sheet: C2 yellow dominant on t8, larger yellow on t7, same colours at a18 and a26, faces visible, lips closed)
- c03 a18: t7+t8 v0/v1/v2 on CDN img/_review/t8-reprompt/c03_a18_t{7,8}_v{0,1,2}.png + c03_a18_t7t8_sheet.jpg. gens=6 (t7 v0 was refused once with "48/48 generation slots in use", nothing charged, re-sent the same prompt unchanged). READY sent.
- c03 a26: same files c03_a26_*. gens=6. READY sent.
## Remaining for successor
- c03 a36, c03 a51, then c04 a18, a26, a36, a51 (6 gens each). build.py already has the strengthened a36/a51 text (checked: handover branch tip e0c55c5 contains it). Check for a36 clearly older than a26, and a51 reads ~51 (fine lines, fuller mature face, few silver strands, never white).
- Magnific t1 upload ids (this account, folder ba4aecfe...): c03 a18 hu2afeMvqL, a26 KLp1rHPkqp, a36 hu2aftovqL, a51 1ldxLx8r4r. c04 not uploaded yet. t1 URLs: https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/cNN/b10[-aXX]/cNN_aXX_t1_v0.png (a18 uses b10; all 8 c03/c04 t1 exist, HTTP 200).
## Method (same as W77c) + tool fixes
Tools copied to /home/user/w77i/work (dl.py, fin.py, push.sh from review/t8-mass-W77c). Fix needed in fin.py for a18 old-t8 folder: b10 (not b10-a18). Scratch CDN root = git init + dev/site/cdn_sync.py + manifest_guard.py from main (paths in push.sh).
Shared account hits 48/48 slots when other painters run: send 3-4 gens per message, retry the refused one.
