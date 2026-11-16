# PROGRESS item512-art (Foreman C art worker, 16/11)

## Finding (LUẬT ƯU TIÊN SỐ 1)
The item-big report listed 22 items "without item512" using the OLD hyphen file names (a-giao, bo-dieu, ...). The game (dev/build/j98.js itemArt) uses the IT key: `img/item512/item-<key>.webp`. All 22 exist under IT keys, verified on the CDN (HTTP 200, 512x512 RGBA webp):
a-giao=agiao, bo-dieu=boodieu, bot-ngua=botngua, dan-co=dancoc, gam-to-chau=gamto, hac-dinh-hong=hacdinh, hinh-nhan=hinhnhan, huong-tram=huongtram, lua-hang-chau=luahang, nghien-muc=nghien, ngoc-boi-ban=ngocboi, nhan-sam=nhansam, phan-son=sonphan, thu-nha=thunha, thuoc-an-thai=thuocanthai, thuoc-giai=giaidoc, tram-phuong=tramphuong, tranh-co=tranhco, tui-thom=tuithom, vong-ngoc=vongngoc, xa-huong=xahuong, yen-sao=yensao.
=> No item drawing needed (0 credits). The 20 blurry call sites only need kitItemBigSrc to build `img/item512/item-<IT key>.webp`.

## Pets
img/pet512/pet-*.webp: 98 files, same names as img/pet-*.webp (98) — all 512x512. jpet.js petSrc(k,big) already points there. Nothing to draw.

## Veils
img/veil-t1..t8, veil-silk-ivory/pink .png are 480x445 and are fitted to faces by img/veil-fit.json; redrawing would break the fit. NOT redrawn (open question below).

## Marks (me-mark-0..7, were 145-240 px) -> redrawn at 512 px
Source = existing small picture (uploaded as reference), model gpt-2-6, folder ba4aecfe…, then Magnific remove-background, trim to bbox, longest side 512, webp q90. Looked at all 8 (old vs new sheet, dark+light bg): same design/colours, no text, clean edges.
CDN: https://ctm-img.victoria-tntt.workers.dev/img/mark512/me-mark-<r>.webp (new folder, mirrors pet512; HTTP 200 all 8)

| key | model | generate id | bg-remove id | source |
|---|---|---|---|---|
| me-mark-0 | gpt-2-6 | VXUzPfFMMU | mE3dYzghJQ | img/kit/me-mark-0.webp |
| me-mark-1 | gpt-2-6 | p8JWNqBehw | yiCg5KaPW9 | me-mark-1 |
| me-mark-2 | gpt-2-6 | 1lpF82yr4r | TdSG4ihVNR | me-mark-2 |
| me-mark-3 | gpt-2-6 | lJ8khVpgv9 | rgeHmu4xtc | me-mark-3 |
| me-mark-4 | gpt-2-6 | gOI1fMcSXO | nVj373VYQD | me-mark-4 |
| me-mark-5 | gpt-2-6 | 1lpF80zr4r | If6pzXxtvE | me-mark-5 |
| me-mark-6 | gpt-2-6 | fHA8c2GCDY | fHA8TvvCDY | me-mark-6 |
| me-mark-7 | gpt-2-6 | gOI1fh8SXO | yiCgK4LPW9 | me-mark-7 |

Credits: 8 x 40 + 8 x 3 = 344.
Contact sheets: dev/art/item512-sheet/marks-old-vs-new.png, marks-final-dark-light.png
Note: new marks keep the old aspect but trimmed, so a few differ slightly in bbox ratio (e.g. mark-0 flower fills more of the frame); kit should use object-fit: contain.
