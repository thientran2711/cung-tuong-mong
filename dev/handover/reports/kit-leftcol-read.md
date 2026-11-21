# kit-leftcol-read (KIT keeper, addendum 9, OD 21/11 ~03:32Z «dư một chỗ trống … wasting rất dữ»)

Branch `review/kit-leftcol-read` 5fc1b026 (from LIVE 9c1dd605). Her shot (person dialog «Bảo Châu»): figure + tassel, an EMPTY band, then tiny relation rows squeezed at the bottom.
State on LIVE after kit-pcrow-square (§6.3e: figure fills the column, no key-fit shrink): the empty band is gone (rows 10 px under the figure, measured); what remained was the SIZE: `.kpkey` .78rem × `.kr2-cp` .82em × heads .86em ≈ 9 px.
Change (kit part only): `.pc .kpkey` .92rem (jk2b), `.kr2-cp` 1em and `.kr2ch` .8em (jkrel), status chip (Đã quen …) >= .8rem. KIT.md §6.3f.
Test `node dev/test/kit-leftcol-read.js <url> <out> 755x1000,1180x820 pop-maid,tab-rv,tab-court,tab-staff,tab-kin`: gap figure→rows 10 px, every text >= 11.8 px (the status chip was 10.9 → fixed), PASS Fold + iPad. quickcheck 5fc1b026: first run FAIL perf buổi 3572/1181 ms (two of three runs; CSS-only change, machine noise), rerun PASS (tab 410/467, buổi 1269/1081, render 258/242).
