# t8-mass-B W77k (c02 all 4 ages) - DONE, no rollover needed
PRIORITY #1 CHECK: brief t8-mass-B.md + W77h report; build.py --age (handover branch e579391) | claims W77k c02.
## Done (each age: t8 v0/v1/v2 + t7 v0/v1/v2 = 6 gens, 1 per prompt, 0 regens; every gen looked at; prompts = build.py output byte-exact, only the age phrase differs, checked with sed+cmp against a18)
- c02 a18, a26, a36, a51: 24 gens. Sheets (6 columns t8v0 t8v1 t8v2 | t7v0 t7v1 t7v2): img/_review/t8-reprompt/c02_aXX_t7t8_sheet.jpg ; files c02_aXX_t{7,8}_v{0,1,2}.png (1024x2304 transparent, md5 checked on the CDN). READY sent to Foreman C for each age.
- Colours identical at all ages (muted blue ORIG / sapphire accent / coral pink; t7 blue, coral, turquoise); t8 yellow dominant, t7 larger yellow parts.
- a51: faces checked on a crop sheet: fine eye lines, fuller mature face, dark-brown hair with few lighter strands, never white.
## Method
refs per gen exactly 2: own t1 (a18 .../c02/b10/c02_a18_t1_v0.png, a26 b10-a26, a36 b10-a36, a51 live img/hd/fig-consort-c02-t1-a51.webp) + style eIyOFEidqL; images_generate gpt-2-6 1024x2304 2k count 1, then images_remove_background; /home/user/w77k/work (fin2.py = download + sheet + black-fill check, push2.sh = cdn_sync + md5); scratch CDN root /home/user/w77k/cdn (cdn_sync.py, manifest_guard.py, manifest-floor.json from main).
## Next
c03.. per the brief (other painters/successors).
