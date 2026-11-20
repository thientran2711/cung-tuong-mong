# rv-kit-item-big — reviewer verdict: PASS 26cbe21ca77d5c6918b4c9edda1443b87d3d0005 (review/kit-item-big-rv = bbe1b20f + LIVE 0aaf8152; clean merge, no code diff, doc/test only)
PRIORITY #1 CHECK: OD:L686 / KIT §28.13b / reports/item-big.md | main jk2b kitItem + kitItemBigSrc (jk2b:799-804) | review/* kit-item-big | claims keeper session_01Rc5AsMtjP4KTgBZVjENGLs
18 laws: 9 KIT FIRST + 14 canon (mapping stays ONE place inside kitItem; no call-site duplicates) OK; no player text/number touched.
Claim "IT01 already met by §28.13b" VERIFIED on LIVE: kitItemBigSrc maps img/item-X → img/item512/item-X for lg/xl (relative + CDN prefix), data-fb fallback, frameless lg/xl, frame:true opt-in.
Scan: item-big-scan.py exit 0, 24 big sites = gave512 9 · auto512 5 · veil 4 · pet512 3 · wd 2 · ghost 1, no «other». Independent grep found 25 = the 24 + the kit-page sample row (jkitpage, excluded on purpose). Sites with a variable size (jitd:74 asks src512 itself, jksize:227 KSZ_ITEM frame:true sample, jdress opts.size default sm) all go through kitItem, so the kit mapping covers them; the scan simply does not list them (harmless, optional note).
Test: kit-item-big.js on merged root index.html = PASS (7 ok, no page errors).
Art-gap list (22 items w/o item512, 213 wd icons, 4 veil, 44 pet-stage) taken from the keeper's CDN-index run; not re-verified against the CDN index (not needed for PASS).
Not run: QUICKCHECK (built game identical; diff = tests + KIT.md line).
