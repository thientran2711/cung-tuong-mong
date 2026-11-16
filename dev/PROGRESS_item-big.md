# PROGRESS item-big (OD:L686, OWNER_LEDGER #199)
Status: SCAN DONE, code change BLOCKED on KIT REQUEST (the item frame is a kit part; only the kit keeper may change it).
- Scan: `python3 dev/test/item-big-scan.py` lists every big (size lg/xl) kitItem call: 29 calls in 14 files; only 9 pass src512 (the rest pass the 104/256 px src).
- Every big item display uses ONE path already: kitItem({size:"lg"|"xl"}) -> `.kitem > .kitb` (grade frame + radial ground + border) -> wrapped by kitModal itemPic / kpsubj.
- CDN: largest item image = img/item512 (751 files, median 52 KB) and img/wd512 (138). No 1024 on the CDN. 22 base items have no item512 (see report).
- Next (after kit keeper): see KIT REQUEST in dev/handover/reports/item-big.md; then switch non-512 big calls to the 512 source and re-run the scan.
