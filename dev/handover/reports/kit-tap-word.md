# kit-tap-word (KIT keeper, OD 21/11 ~03:40Z canon: traits are tap-words, not a bullet box)

Branch `review/kit-tap-word` 410c4f44 (from LIVE 32c0e33b). The tap-word already existed (`kitFactTap`, `.kgl.kfx`, j79 §73.1); added the thin kit API next to it in `dev/build/j79.js`:
- `kitTapWord(word, meaning)`: dotted-underline word, tap → kit popup (`kpPop`) with the word as title + ONLY that meaning; empty meaning → the plain word.
- `kitTraitWords(list)`: «Đa nghi, Hiếu thảo» — each item an ETRAITS key («danghi») or its word, meaning from ETRAITS, comma-joined (one word per trait game-wide).
KIT.md §73.2, kit sample «§73.2» (jpcf.js). Test `node dev/test/kit-tap-word.js <url>`: 3 tap-words rendered, dotted underline, popup title «Đa nghi» + exact ETRAITS sentence, empty meaning stays plain: PASS 755x1000 + 1180x820. quickcheck PASS (tab 446/450 ms, render 245/242).
chiton-name uses it for the header rows (told, session_01Rc5AsJe31NLb75JMbggVQc). The avatar «!» (kit-pcrow-square §6.3b-1) stays only for non-word info.
