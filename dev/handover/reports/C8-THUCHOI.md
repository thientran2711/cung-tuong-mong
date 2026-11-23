# C8-THUCHOI — thu_choi own board backdrop (worker, depth 8, START_CTX ~0%)
PRIORITY #1 CHECK: main KG82_BOARDBG has thu_choi (j82.js:103); img/kit/mg-thu_choi-bg was byte-identical to mg-thu_tam-bg (md5 93fe3bc3) | OD owner 08:48Z «tự vẽ luôn, khỏi báo» | claims C8.
## Done
- Looked at thu_tam (terrace+lake), tuoi (lawn+well), co7 (study room): painterly palace, warm light, 1024x768, cream-veiled by kit.
- ONE gen, Magnific gpt-2-6 2k 4:3, 135 cr (creation oviyGHr829), balance before 2 691 905. No retry. Prompt: courtyard, moon gate, balustrade, open rug centre, pet basket / cat tree / silk ball / feather wand / water bowl; NO people/animals/text.
- LOOKED full size: no people, no animals, no text, centre open for the board, same style. structure: n/a (new picture).
- Resized to 1024x768 webp (218 KB), uploaded to CDN key `img/kit/mg-thu_choi-bg.webp` (md5 3cb9d29f, verified from CDN). Old copy kept at `img/kit/_old-mg-thu_choi-bg-copy-of-thu_tam.webp`.
- NO code change: the game already reads that key (KIT-MGBG, j79 kgbox-bg). Branch review/thuchoi-bg = report + shots only. Wired fine: --kgbg url resolves to the new key, 0 page errors.
- Look: kitGameFrame({kind:"thu_choi"}) rendered on Fold 755x1000 + iPad 1180x820 (PNG shots are gitignored, not kept; empty box of fixed height, board engine not run). Picture sits under the cream veil, centre free.
## Notes / open
- Gate `python3 dev/art/check_store.py` is BROKEN on the handover branch (not by this prompt): dev/art/t8-prompt-B/build.py line 2048 has a stray leftover aster line (ROOT-C7 L2403 edit) → SyntaxError; plus phoenix_plumage_L2227.json invalid (known). With line 2048 removed locally (reverted, not committed) the store self-test still FAILs on the JSON. The gate is person-prompt based; this backdrop has no person. FOR KEEPER: fix both.
- Fetching full origin/main pulls GB (killed); use --depth=1.
- Handover: none needed (done in one pass).
