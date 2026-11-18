# t8-mass-B W77l (c03 a36 + a51 DONE; c04 x4 ages remain) - ROLLOVER at start+25% context
## Done (36-gen job, all gens 1 each, no regen; looked at every image/sheet)
- c03 a36: t7+t8 v0/v1/v2 on CDN img/_review/t8-reprompt/c03_a36_t{7,8}_v{0,1,2}.png + c03_a36_t7t8_sheet.jpg. gens=6. READY sent to Foreman C. t8 C2 yellow dominant, t7 larger yellow parts, same colours as a18/a26, face reads ~42.
- c03 a51: same files c03_a51_*. gens=6. READY sent. face reads ~50, few silver strands, same colours as a18.
## Remaining for successor: c04 a18, a26, a36, a51 (6 gens each, 24 gens)
- Magnific t1 upload ids (folder ba4aecfe..., already uploaded by W77l; use as references[0] {type:image}; references[1] = {type:style, eIyOFEidqL}):
  c04 a18 KLp1AHukqp | a26 kserGKa16B | a36 79fOdyOJAL | a51 YMlcqVjWeC (a51 = live img/hd/fig-consort-c04-t1-a51.webp converted to PNG, hosted at img/_review/t8-reprompt/refs/face-c04-t1-a51.png)
  (c03 ids for reference: a18 hu2afeMvqL, a26 KLp1rHPkqp, a36 hu2aftovqL, a51 1ldxLx8r4r)
- Prompts: `python3 dev/art/t8-prompt-B/build.py c04 v0|v1|v2 --age aXX` (t8) and `... c04 --t7 v0|v1|v2 --age aXX` (t7); age keys are a18|a26|a36|a51 (NOT 18/36). Pasting by hand: only the age sentence differs between ages (diff the outputs to be sure), so paste carefully; 1 gen per call.
- Settings: gpt-2-6, width 1024 height 2304 resolution 2k count 1, folder ba4aecfe-efce-47e2-b53f-30d292091886. Then images_remove_background on each gen (3 credits) -> transparent PNG (1024x2304 RGBA, alpha_min 0).
- Tools (in dev/handover/reports/t8-mass-B-W77l-tools/): fin2.py (`python3 fin2.py c04 a36 t8v0=<url> t8v1=... t7v2=<url>` in a work dir: downloads, builds 9-column sheet old t8 | new t8 | new t7, prints md5/alpha), push2.sh (copy to a CDN scratch root = dir with dev/site/cdn_sync.py + manifest_guard.py from origin/main and img/_review/t8-reprompt/; edit paths S=...; `push2.sh c04 a36` uploads 7 files + verifies md5). Old t8 folders: a18 b10, others b10-aXX (a51 old files exist as b10-a51).
- Then send_message to Foreman C session_011xDdVS7JY8KJW8hzKtoquL: "READY t8-B c04 aXX <sheet url> gens=6".
## Notes
- 6 gens in flight at once worked without the 48/48 slot refusal (this time); keep <=3-4 if refused. Cost per person-age ~35-45k tokens because each prompt is pasted in full; plan the rollover at the start of each age.
