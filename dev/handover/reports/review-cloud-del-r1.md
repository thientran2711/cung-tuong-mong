PRIORITY #1 CHECK ('cloud-del|kdanger|kitConfirm'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 1 (review/cloud-del) → reviewed the existing branch, no rebuild.
# review cloud-del r1 (small tier) — review/cloud-del @ e12ef99a → review/cloud-del-r1 @ 7d67ba1f (live main 64c39ca2 merged, site rebuilt)
Result: PASS (0 fails). Small fixes by me: rebuilt site after merge, test now also covers cancel (✕ on the confirm keeps the link), KIT REQUEST filed.
- Kit parts only: `.kbtn.kdanger`, kitConfirm, kitRows/.kslot; no own CSS. Workaround = existing kit class `kptitle` (z 55) added to the confirm → plain reuse, allowed. Per-place patch though → KIT REQUEST in dev/kit/KIT_REQUESTS.md (kitModal/kitConfirm opened from the title screen sit on the title layer by themselves; only user today: jcloud dropAsk).
- Drop call: only api("drop",{k}) (POST /api/vault/drop); 200/404 → C={} + back (same as "Thôi nối"); error keeps link + ERR text. Local slots untouched (test: Sổ 1 hash equal). Local mock Worker only, no production vault.
- Wording (VANPHONG): no %, cổ trang; buttons one line, no word break at 755x1000@2, 1180x820@2, 390x844@3 (measured + shots looked at).
- Tests: cloud-save 55/55; extra run of the delete flow on 755x1000@2 and 390x844@3 (65/65 incl. cancel), one-core-guard 0 fails, quickcheck.sh PASS (render 242/255, buổi 826/797, old save ok, core gates PASS), no page errors.
- Non-blocking (kit keeper): kit row label small-caps makes "Sổ trên mây"/"Sổ trên máy" look the same in the delete panel (also in the old "Thôi nối" panel). Confirm shows only "Xóa hẳn" + ✕ (kitConfirm design §83.9; "Thôi" = ✕).
PASS 7d67ba1ff932bb21f1e228fdbfbc9af66fa811c8
