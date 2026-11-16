# pl-night-art (art worker for Foreman C, OD:L659)
START_CTX ~8%.

## Inventory
- 159 toi pictures in img/pl2 (11 dirs) + 11 map-*-toi (Du do overview). Script: /tmp inv.py (mean RGB per picture).
- pl2 toi: mean brightness 35-55 (median ~45) vs sang ~150, chieu ~135; mean RGB ~(36,42,57) = flat dark navy. 125/159 pass "dark + blue-biased" test; the rest are festival nights with lanterns, still <70.
- PL source xuan_toi.prompt.txt: painted ideogram edit "deep blue night light evenly over the WHOLE picture ... as dark as the rest" PLUS `nfix.py code colour (37,42,58) 0.45`. Undoing the code wash gives ~(35,42,56): the painting itself was already dark navy; wash only deepens it. No lighter pre-wash file exists in the PL repo, so every toi must be repainted.
- map-*-toi (PL originals, mean 77-94, OD:L329 keep exactly): NOT washed, not in scope.

## SAMPLE READY
Sheet: dev/handover/reports/pl-night-art/sample.jpg = rows xuan / trungthu; columns [sang reference | CURRENT toi | NEW toi].
Method: gpt-2-6 edit of the same-dir sang picture (ref = CDN nhat-cac-*-sang), prompt = moonlit blue-violet readable night, warm lantern/window glow, no overlay, no weather, no moon disc. Output 1344x752 (batch resizes to 1792 + webp <=250 KB).
Result: mean ~114 (xuan) / ~128 (trungthu) vs current 45. Same framing, buildings, cranes, plum/pine, both maids. Self-check: no new people, no text.
Caveat for owner: lantern windows are fairly vivid; can be toned down if she finds it too "AI".
Waiting for owner verdict via Foreman C.
