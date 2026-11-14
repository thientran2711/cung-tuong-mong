# Act / info art: progress (branch review/act-art)

## Done
- Act inventory: acts_data.py -> acts_list.json (91 images, 17 categories, 219 act names; names ending "*" are prefixes; ids = engine A("id") ids).
- All 91 act images + 17 category fallbacks: img/act-<key>.webp, img/act-cat-<cat>.webp, 384x506 (owner: one shared portrait frame).
  img/ACTS.json = {key:{file,cat,names,ids?}} + "cat-<cat>":{file,cat,label}. Lookup order: exact name, prefix "*", id, cat-<cat>.
- Dark redo (owner 11/14): every mưu kế / hại người image (22) redrawn really dark (70%+ shadow, one light source, no hands),
  style ref = night bedroom scene tam-cung-dem (Magnific iGq8UJy3uK). Bright images use the Ngự hoa viên scene (cplQijT0eP).
- Hủy dung act (img/act-huy-dung.webp) + veil overlay: img/veil.png (cutout 640x310), veil-por.png 384x506, veil-fig.png 385x900.
- Info panels: dev/figwork/info/info_list.json (30 keys from the kit owner); 16 done -> img/info-<key>.webp, img/INFO.json {"have":[...]} lists them.

## Left (queue, in this order)
1. Info redo: nguy-hiem + tai-mat in the DARK template (drawn bright, before the owner's dark rule); thai-hau shows a 囍 character -> redraw without any character.
   Info panels, 14 left: thai lat-the lanh-cung(D) cam-tuc(D) tranh-ghe tuyen-tu noi-vu tan-gia-kho phe-phai chung-cu(D) suc bac phuc-duyen tin;
   then write img/INFO.json {"have":[keys]}. (D) = dark template (see prompt below).
2. Arts/virtues, 3:4 bright, no faces: img/art-cam ky thi hoa vu y theu nau .webp ; img/vir-cong dung ngon hanh .webp.
3. Book textures for the week report: img/book-cover, book-left, book-right, book-end .webp (aged paper, borders, no text, 3:4).

## How
- Generate: Magnific images_generate mode gpt-2-6, aspectRatio 3:4, resolution 1k (40 credits), folder ba4aecfe-..., ONE style ref.
  Bright prompt: `python3 prompt.py KEY` (acts). Dark template: "Portrait 3:4 game card illustration, deep night, low-key lighting: {scene}.
  Over 70% of the frame in deep indigo-black shadow; the only light is {one candle / dim lantern / moonlight}. ... No people, no hands, no faces."
- Log "key creationId" in gens.txt (last line wins; '#' lines ignored). After creations_wait (its output lands in the session transcript),
  `python3 fetch.py [keys]` downloads + crops to 384x506. For info: `GENS=../info/gens.txt PFX=info- python3 fetch.py`.
  NOTE fetch.py reads URLs from THIS session's transcript (TRX env var to point at another .jsonl).
- `python3 manifest.py` rebuilds img/ACTS.json. `python3 sheet.py out.jpg keys..` contact sheet; `python3 preview.py keys..` single jpgs.
