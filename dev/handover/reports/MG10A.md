# MG10A report (worker MG10A, depth 7, START_CTX ~3 %) — mini-game NON-person art
PRIORITY #1 CHECK: see MG10a-scan.md (OD 0 | ledger 0 | claims 0 | main 5 slot-docs only | review/* 0).
Branch review/mg10a @87ad5da4 off origin/main 4ad20bd6. Magnific gpt-2-6, folder ba4aecfe, style ref cplQijT0eP. All pictures looked at (contact sheets). No people art (tat-bg/ne-bg have 2 / 1 tiny far back-view figures).
## Old → new (all uploaded to CDN img/kit/; cdn_sync 27 files, 2.8 MB)
| key | old | new | wiring |
|---|---|---|---|
| mg-tat-bg, mg-ne-bg | kit silk | painted palace hall (4:3) | drop-in (jslap kg82Bg/kg82Pic) |
| mg-tat-ruler, tat-hand, tat-zone-red, tat-zone-amber, ne-zone-green | plain rects | lacquer ruler, jade-bangle hand, red/amber/green silk strips | drop-in KG82_SPR |
| mg-nghe-bg, truyen-bg, mac-bg, thoico-bg | flat cream | 4 painted scheme backdrops (KP05 tail) | drop-in (kg82Bg) |
| mg-ve-motif-{sonchu,sonkhach,thuyen,tung} | code shapes | ink-wash motifs | CR_HAVE in jcraft.js |
| mg-kim-{sample,wedge,cut-moon,cut-tri,cut-drop,cut-half} | flat red shapes | paper-cut parts | CR_HAVE |
| mg-theu-{hoop,spool} | code shapes | bamboo hoop, red silk spool | CR_HAVE |
| mg-thu_tam-bg, thu_choi-bg, tuoi-bg, co7-bg | flat cream | painted (on CDN) | NOT wired: DOM boards have no backdrop slot → KIT REQUEST in dev/kit/KIT_REQUESTS.md (FOR MAIN / kit keeper) |
Skipped: hoadien-bg (board already shows a painted mirror+face; adding a mirror backdrop would clash). xa figures = MG10b.
Code change: jcraft.js CR_HAVE (12 names) + CHANGE.txt + rebuilt index.html/sw.js/assets.json (build_site.sh).
## LOOK (755x1000@2 + 1180x820@2)
13 kinds run live: tat nghe truyen mac thoico ve kim theu show the new art on both devices; 0 page errors. Ne on iPad shot caught the result row (round ended) — same parts as tat, Fold shot fine. Sprites cut out locally from flat-white gens (hand, wedge, ruler, hoop, spool, zones clean; ink motifs keep paper-white gaps; kim-cut-moon has a faint dark top corner).
Not run: ag-mgcal / jslap tests (reviewer) — only file names + CR_HAVE changed.
## Cost
34 gens x 80 cr = 2 720 cr (10 backdrops incl. unused hoadien-bg, 17 sprites, 7 redo of black-halo sprites) — balance before 2 696 325.
