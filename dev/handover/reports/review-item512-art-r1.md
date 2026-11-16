PASS f9d1095615598d34d697fd569deb6c20ae0f571f

Branch review/item512-art-r1 = review/item512-art (f9d10956); its parent chain contains current origin/main 18fb8252 (merge-base = origin/main), so the coordinator can fast-forward. Only 3 files change (PROGRESS log + 2 contact-sheet PNGs), no game code.

## Checked
1. 22-key mapping: all 22 img/item512/item-<IT key>.webp return HTTP 200, 512x512 RGBA. I looked at the contact sheet: every picture is the named item (a giao=amber blocks, bo dieu=phoenix hairpin, bot ngua=itch powder packet, dan coc=guqin, gam to=red brocade roll, giai doc=jade jar+pills, hac dinh=crane vase, hinh nhan=voodoo doll, huong tram=censer+incense, lua hang=pink silk, nghien=dragon inkstone+brush, ngoc boi=dragon jade pendant, nhan sam=ginseng box, son phan=rouge pot, thu nha=letter, thuoc an thai=herb packets+jar, tram phuong=phoenix hairpin, tranh co=landscape scroll, tui thom=sachet, vong ngoc=jade bangle, xa huong=musk box, yen sao=bird nest bowl). Clean transparent cut-outs, painterly, no text.
2. Marks: all 8 new img/mark512/me-mark-0..7.webp are 200, RGBA, longest side 512 (384x512, 426x512, 498x512, 309x512, 504x512, 512x507, 344x512, 509x512). Compared with the small kit originals on dark and light backgrounds: same design and colours per mark, clean edges (no halo/fringe seen), no text, no AI-looking artefacts; slightly bigger fill of frame on mark-0 (flower). OK.
3. Pets: fetched all 88 stage files for the 22 pets in jpet.js (key + -non/-tn/-lt) = 88/88 HTTP 200, all 512x512. Looked at 32 (8 pets x 4 stages: cho, cuuvi, hac, kylan, meomuop, phuong, thienma, tho): consistent painted style, growth stages distinct, cut-outs clean. (Worker's 98 = 88 stages + 10 others; not all checked.)
4. Model/credits: log lists gpt-2-6 for all 8 generations, folder ba4aecfe..., generate + bg-remove ids per mark; 8x40 + 8x3 = 344 credits, consistent.
5. Git content: no img/ files in the diff (0 tracked img/ on main). Two contact-sheet PNGs (~2 MB) under dev/art/item512-sheet/ are review sheets, same precedent as dev/art/places_work/*.jpg; acceptable, not game art. 

## Not done / notes
- Veils left at 480x445 (veil-fit.json depends on it): reasonable; worker's open question stays for the owner only if she sees them soft.
- econ pictures (jecon) still unmeasured.
- I did not run game/Playwright tests: no code changed.

## Notes for the kit keeper / Foreman B (D3)
- kitItemBigSrc must build from the IT key: img/item512/item-<key>.webp (j98 itemArt src512 already does), NOT from the old hyphenated ITIMG names; fallback to the small src on error.
- Mark big variant: img/mark512/me-mark-<r>.webp (r=0..7); folder name mark512 mirrors pet512 and is fine to keep. Aspect ratios now differ per mark, so use object-fit: contain inside a fixed box.
- Pet stage big src already correct in jpet.js petSrc(k,true) and jpetcare.js petcStageSrc.
