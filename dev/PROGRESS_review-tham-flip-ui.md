# review/tham-flip-ui (thi tam card flip: gold tray + name under every card)
- Base: review/cardflip-glow2-r2 + origin/main (73c06812).
- Art (Magnific gpt-2-6, Personal folder): ksp-p gOtwoziSXO, emp-p bxVkc6h5Y2, ksp-l rgdLDnWxtc, emp-l 5jM10YSKxe (each upscaled 2k from s78SM7fl8e / bxVkzHG5Y2 / tC3vParmZJ / 9ZFifQ7NYZ). CDN keys img/kit/cf-gplate-{ksp,emp}{,-p}.webp (new names; old cf-plate-* untouched).
- Code: dev/build/jflip.js (tagOf, grid TAGH/TAGW, .kcf-f/.kcf-tag/.kcf-mine, BAL.cardFlip.plates geometry), cfDemo one card per person.
- Test: dev/test/thamflip-shots.js (stills + optional VIDEO=1, NEWDIR/NEWPLATE overrides, tag overlap check).
