# Act / info art: progress (branch review/act-art)

## Done
- Act inventory: acts_data.py -> acts_list.json (91 images, 17 categories, 219 act names; names ending "*" are prefixes; ids = engine A("id") ids).
- All 91 act images + 17 category fallbacks: img/act-<key>.webp, img/act-cat-<cat>.webp, 384x506 (owner: one shared portrait frame).
  img/ACTS.json = {key:{file,cat,names,ids?}} + "cat-<cat>":{file,cat,label}. Lookup order: exact name, prefix "*", id, cat-<cat>.
- Dark redo (owner 11/14): every mưu kế / hại người image (22) redrawn really dark (70%+ shadow, one light source, no hands),
  style ref = night bedroom scene tam-cung-dem (Magnific iGq8UJy3uK). Bright images use the Ngự hoa viên scene (cplQijT0eP).
- Hủy dung act (img/act-huy-dung.webp) + veil overlay: img/veil.png (cutout 640x310), veil-por.png 384x506, veil-fig.png 385x900.
- Info panels: dev/figwork/info/info_list.json (30 keys from the kit owner); 16 done -> img/info-<key>.webp, img/INFO.json {"have":[...]} lists them.

- Session 2 (11/14): info redo nguy-hiem + tai-mat (dark), thai-hau (no characters) and the 14 remaining info panels -> all 30 keys in img/INFO.json.
  Arts/virtues: img/art-{cam,ky,thi,hoa,vu,y,theu,nau}.webp, img/vir-{cong,dung,ngon,hanh}.webp (bright, no people).
  Book textures: img/book-{cover,left,right,end}.webp (768x1024, the whole original image, NOT cropped, so the red borders stay; republished at full size 11/14 for @2);
  left page has the stitching on its right edge, right/end pages on the left; end page has an empty seal box lower right).
  Ids in dev/figwork/arts/gens.txt (key = output basename, run fetch.py with PFX= GENS=../arts/gens.txt).

## Left
- Nothing queued. Possible: owner feedback redraws.

## How
- Generate: Magnific images_generate mode gpt-2-6, aspectRatio 3:4, resolution 1k (40 credits), folder ba4aecfe-..., ONE style ref.
  Bright prompt: `python3 prompt.py KEY` (acts). Dark template: "Portrait 3:4 game card illustration, deep night, low-key lighting: {scene}.
  Over 70% of the frame in deep indigo-black shadow; the only light is {one candle / dim lantern / moonlight}. ... No people, no hands, no faces."
- Log "key creationId" in gens.txt (last line wins; '#' lines ignored). After creations_wait (its output lands in the session transcript),
  `python3 fetch.py [keys]` downloads + crops to 384x506. For info: `GENS=../info/gens.txt PFX=info- python3 fetch.py`.
  NOTE fetch.py reads URLs from a session transcript: set TRX to the .jsonl that holds the creations_wait output
  (session 2 used subagents/agent-ae0c4c6b6177a62c1.jsonl). `PFX=info- python3 preview.py keys..` for non-act images.
- `python3 manifest.py` rebuilds img/ACTS.json. `python3 sheet.py out.jpg keys..` contact sheet; `python3 preview.py keys..` single jpgs.
