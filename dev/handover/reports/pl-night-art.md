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

## BATCH DONE (owner OK: "ảnh tối vẽ mới lại, ok duyệt")
- 159/159 pl2 toi repainted with gpt-2-6: 149 from the same-dir sang picture (approved sample prompt), 10 festival toi without a sang sibling repainted from the current toi ("lighter, same picture"): can-chinh/duc-tho/duong-hoa giaothua+nguyentieu+thattich pairs, garden nguyentieu+thattich. Same file names, 1792x1003 webp, on the CDN (cdn_sync --check: same 159, 0 to upload). Names unchanged, so no hotspots.json / pl2_sync change.
- Code wash: none in game code (no tint on pl2 toi in jpm.js/jmap/jkit). The (37,42,58)@0.45 wash was baked into the old pictures by PL nfix.py; new pictures carry none. CODE SHA: none (no code change).
- Brightness (mean RGB): old toi 35-55 -> new min 92.8 / median 109 / max 141.7 (sang median ~150). Edge correlation vs the sang reference >=0.62 for all (layout kept). Size median 266 KB (111 over 250 KB; existing sang median 244 KB, max 582 KB).
- Checked: all 159 looked at (4 workers on contact sheets, then me on 10 sheets of 16): buildings, people, festival decoration (tang drapes, lanterns, offering tables, snow) kept; no text/moon disc/weather.
- Caveats: (1) spring/summer/autumn courts read pale blue-white (moonlit stone), a little like frost; (2) truong-mon ha/thu/xuan brightness 92-99, slightly yellow-green moss; (3) more vivid than PL's muted watercolour (owner approved the sample look).
- Sheets: dev/handover/reports/pl-night-art/final_00..09.jpg (16 per sheet, name + mean brightness); table.csv (name, KB, brightness).
- Untouched: 11 map-*-toi (PL originals, not washed).
- SẴN SÀNG KIỂM.

## FIX 2 (Foreman C s7): non-winter courts read as snow -> stone grade
- 125 non-winter toi (all except dong, dongchi, giaothua, lapbat) got a one-off image grade baked in (not a runtime overlay): mask = bright + low-saturation + blue-leaning pixels (the pale pavement) -> warm-neutral grey stone, ~16% darker; lanterns, roofs, walls, trees untouched. Script: dev/handover/reports/pl-night-art/grade.py (pre-grade originals kept in /tmp only). 34 winter toi unchanged.
- Re-encoded webp q<=80 (<=312 KB), same names, re-uploaded to the CDN (cdn_sync --check: same 159). Brightness now min 87.5 / median 102 / max 142; KB median 284.
- Sheets final_00..09.jpg + table.csv regenerated.
