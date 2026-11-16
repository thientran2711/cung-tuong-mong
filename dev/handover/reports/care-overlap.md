# care-overlap report
Branch review/care-overlap @ 962453c2 (main 12f52db7 + review/pet-lifespan-r1 0e8e3684 merged cleanly).
Root cause: kshopd puts .kpmain in grid row 1/-1; the KIT 50 default banner (kdpban) also sits in row 1 -> picture covers the bars/first tiles.
Fix: one kit rule in jinv.js (body in row 2, scrolls itself) + KIT.md note. Whole group: pet care, pet shop, errand shop.
Scan before/after (Fold 755x1000, iPad 1180x820): overlap 4/4 -> 0/4 each; 0 page errors; kit-conform (no per-screen CSS, media-check passes in build).
Shots: dev/review/care-overlap/before|after/{petcare,petcare-stage3,petshop,errandshop}-{755x1000,1180x820}.jpg
Rollover: no handover needed (finished).
