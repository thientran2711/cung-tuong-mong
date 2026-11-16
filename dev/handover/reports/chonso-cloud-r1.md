# chonso-cloud-r1 review

Verdict: PASS. Re-reviewed on the worker new sha 9361f6604 (merged with main 0188d595) + 1-line reviewer fix; same results: save-slots 84, chonso-cloud 26, cloud-save 45, coop-e2e 59/59, coop-lobby, ios_install_first all PASS.

## Tests (all on the result tree)
- save-slots 84 ok / ALL OK; chonso-cloud 26/26; cloud-save 45/45; coop-e2e (live worker) 59/59.
- coop-lobby (local http server of the repo root as BASE, live worker): both browsers start, freeze/unfreeze, full/no-room OK, no page errors. The test still clicks `#modal .kco` and `[data-coop=join]`; both still exist (the title button keeps class .kco, now opens Chọn sổ › Cùng hảo hữu; Nhập ám hiệu = .kjoin card there), so no test change was needed.
- ios_install_first 100 % PASS; the Safari notice reads "vào Chọn sổ › Một mình › Sổ mây › Giữ sổ trên mây; ở ứng dụng chọn Nối sổ" (jload.js) and jcloud's code-screen hint says the same path. Both point to the right place.
- old saves: save-slots covers v2-v6 sổ + old single co-op room; they load and list.
- First launch (no save): title = Chơi một mình / Cùng hảo hữu / Sổ luân hồi / Thiết lập; Chơi một mình opens Chọn sổ on Một mình with Sổ mây card on top (Giữ sổ trên mây + Nối sổ), so a brand-new device can link at once.
- With save: "Chơi một mình — Tiếp tục: <name> · <date>" → Chọn sổ Một mình; "Cùng hảo hữu" → co-op tab (Nhập ám hiệu card + 3 phòng).
- Fold 755x1000@2 and iPad 1180x820@2 shots viewed (Sổ mây card on top, linked + not linked, co-op tab, iOS notice): no overflow, no cut text, no page errors.
- Kit-only: Sổ mây card, Nhập ám hiệu card = .kslot + h4.kpst + kitRows + .kbtn; no new CSS. VANPHONG: no %, wording OK.

## Fix made by the reviewer (1 line, j74.js homeMenu)
The title button "Kiếp mới" had no data-cstab, so after a player had looked at the co-op tab it opened the co-op tab. Now data-cstab="solo".

## Notes for the coordinator (not FAILs)
1. iPad 1180x820: with 3 filled sổ + Sổ mây card the Chọn sổ panel scrolls (3rd sổ below the fold) = the known scroll growth, to be fixed by the kit keeper's compact .kslot row.
2. The title button "Kiếp mới" is now REDUNDANT: it opens the same screen as "Chơi một mình"/"Tiếp tục" (each sổ already has its own Kiếp mới). Recommend removing it from homeMenu (j74.js); left in place pending the coordinator's decision.
3. Minor: the Nhập ám hiệu card's heading and button carry the same words.
