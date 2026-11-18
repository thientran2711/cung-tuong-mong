# t8-mass-B W77 (c01-c11) — STOPPED by Foreman C at c01 (old yellow)
PRIORITY #1 CHECK: brief dev/handover/briefs/t8-mass-B.md + HANDOVER_W72 | builder dev/art/t8-prompt-B | review/* none | claims W77.
START_CTX ~0%, depth 8.
## Done
- build.py: `--t7 v1|v2` + T7V2 table (32 people) pushed (6d42f6d1); ORIG1 c08 "soft cherry-blossom pink silk like #F0B9BB / pale sage green like #A9B596", c10 "soft peach silk like #F2C6A5 / cream like #F3E2CC" (by eye) added (this commit). Golden check c06/c16/c20/c25 t8 v0 + c06/c25 t7 v0 byte-identical.
- c01 t7+t8 v0/v1/v2 (OLD yellow #F2C985) on CDN img/_review/t8-reprompt/c01_a18_t{7,8}_v{0,1,2}.png + c01_a18_t7t8_sheet.jpg. gens: t8 v0/v1/v2 1 each; t7 v0 1, v1 2 (cut-out black below waist twice: image_remove_background bug; regen fixed), v2 1.
- Magnific t1 upload ids: c01 TdUToMoVNR, c02 SymS2HTUb8.
## Tooling (scratch, /home/user/wt/w77-work): p/*.txt prompts (build.py output), dl.py (raw sheet), fin.py (download cuts, black-fill check, sheet 9 cols), push.sh (cdn_sync). Always run the black-fill check: cut-out can return opaque black fill.
## Not received
Foreman C's two earlier messages (owner ~19:05Z yellow change, ~19:12Z t1-t3 structure) never reached W77; asked for resend.
## Next (after stop lifted)
c02..c11 (c06: only t8 v1/v2 + t7 v1/v2; t7/t8 v0 kept).
## 19:05Z yellow change (done) + t1-t3 template (done)
- --low 1|2|3 rebuilt (TIER_LOW template, LAD t4 structure stepped down), golden_low regenerated, pushed sha 5f9b8830.
- Yellow = C2 pick, measured on c03_a18_t8_C2.png robe yellow pixels: median #EFBD69, IQR #E2AE4F..#F9CB84 (W72's ~#F2BB5D was close). YEL_NEW now "honey-gold close to hex #EFBD69 (medium depth ...)". t8 (v0/v2): yellow DOMINANT (more than half), her colour second; v1 yellow main + accent; t7: her colour MAIN, yellow parts clearly larger. Old c25-yellow text removed (canon overwrite); golden (A/B) still byte-identical; new prompts in goldenC2/.
- Sample (seed 7172, 4 gens, 1 each, cut-outs checked): img/_review/t8-reprompt/yellow_c2_sample.jpg (current | new per figure); files c06/c25 _a18_t{7,8}_v0_yC2.png. Magnific t1 ids: c06 TdU0vvvVNR, c25 KLD5OGTkqp.
- c01 (old yellow) will need redoing if owner approves the sample.
## HANDOVER W77 -> successor (rollover at ctx ~31%, START_CTX ~0%; written 18/11 ~19:00Z real). Owner GO ~19:50Z: yellow C2 + more yellow approved; "Quý phi và hoàng quý phi đi" = paint t7+t8 v0/v1/v2 for c01..c11 (REDO c01 and c06 t7/t8 v0 with the new yellow).
State: NOTHING of the new-yellow batch painted yet except the 4 sample figures (c06/c25 t7+t8 v0, files img/_review/t8-reprompt/{c06,c25}_a18_t{7,8}_v0_yC2.png = valid new-yellow v0 for c06; c25 is another painter's).
Method that worked (tools in dev/art/t8-prompt-B/tools/, copy to a scratch dir; paths inside are /home/user/wt/w77-work and w77-cdn: edit):
1. build prompts: `python3 build.py cNN v0|v1|v2` (t8), `build.py cNN --t7 [v1|v2]` (t7). Golden check c06 v0 --golden | cmp golden/pB_c06.txt still passes. NEW-yellow prompts = build.py at sha >=5636171c.
2. Upload her t1 once: creations_upload_image url https://ctm-img.victoria-tntt.workers.dev/img/_review/consort-tiers/<cNN>/b10/<cNN>_a18_t1_v0.png fileName face-<cNN>-t1.png folder ba4aecfe-efce-47e2-b53f-30d292091886. Known ids (Magnific account): c06 TdU0vvvVNR, c25 KLD5OGTkqp, c01 TdUToMoVNR, c02 SymS2HTUb8; others upload again.
3. images_generate mode gpt-2-6, width 1024 height 2304, resolution 2k, folder as above, references [{type:image,identifier:<t1 id>},{type:style,identifier:eIyOFEidqL}], NO seed (production). Fire all 6 figures of a person in ONE message (parallel), creations_wait the 6 ids, download previews, dl.py makes one review sheet (body + face crop); look once; regen max 6 per figure.
4. images_remove_background on each pass (3 credits). !! The cut-out sometimes returns an opaque BLACK fill below the waist (c01 t7 v1 twice): fin.py detects it ('!!! BLACK FILL'); then REGENERATE the figure (re-cutting did not help).
5. fin.py cNN t8v0=<url> ... downloads cuts to out/<cNN>_a18_t<T>_v<K>.png, md5s, builds the 9-col sheet (old t8 v0/v1/v2 | new t8 | new t7); push.sh cNN = cdn_sync to img/_review/t8-reprompt/ (scratch root with dev/site/cdn_sync.py + manifest_guard.py copied from main; keys img/_review/t8-reprompt/<cNN>_a18_t{7,8}_v{0,1,2}.png + <cNN>_a18_t7t8_sheet.jpg) + md5 check. Then send Foreman C "READY t8-B+t7 <cNN> <sheet url> gens=<n>".
Selection (frozen): phoenix dominates t8, sleeves hang, yellow = C2 look (yellow dominant t8 v0/v2; t7 own colour main + large yellow parts), face = her t1, closed lips, nothing covers face, not side/back.
Old-yellow c01 files on CDN (c01_a18_t{7,8}_v*.png) are to be OVERWRITTEN by the redo (same keys).
Colours: ORIG1 c08/c10 by eye already in build.py; T7V2 table in build.py.
Per-person cost ~25-35k tokens (6 prompts pasted in + sheets). Rollover again at START_CTX+25%.
Remaining: c01 (redo) c02 c03 c04 c05 c06 (all 6: redo v0 too) c07 c08 c09 c10 c11.
