# C3-RANKROOM-r1 — review of review/c3-rankroom @ d8ed8090
PRIORITY #1 CHECK ('rooms-nc|rankroom'): OD 1 | ledger 0 | claims 8 | main 0 | review/* 2 | archive 0.

## VERDICT: FAIL d8ed8090 (one picture, see 4). Everything else PASS.

1. Diff scope — PASS. vs origin/main 5e013076 (branch is a straight descendant): jres.js (rank-room table block + resBase/resPick/residenceArt/resScene with head+night args), sw.js/index.html/assets.json (rebuild), tests, dev/art tooling and prompts. No BAL number typed; rank read via rkOf(head)+RANKS[r].n. No private UI part. Only typed numbers: floor .6 / anchor {x:.5,feet:.9} defaults for rank rooms, same pattern as the existing KIT_FLOOR block (art layout, not a BAL value) — nit only.
2. Build/tests — PASS. build_site.sh rebuild: build hash e4cc1fa5bfd2 same as committed; only the CTM_BI build-info line differs (committed line still says 16679f5c+, cosmetic). rankroom-stage.js fold + ipadAir: wired bases 64, 192 lookups, 80 fall back to old, 0 page errors.
3. OLD-SAVE — PASS. Local python http.server on 127.0.0.1:8765 worked (old = origin/main, new = branch). palace-oldsave.js 755x1000@1: old save made on main (Phú Sát Trầm Bích, tháng 3), loaded in the new build via the title Load button, Dư đồ shows 3 cung, palace detail opens, oldErrs [] errs [].
4. Shots Fold 755x1000 + iPad 1180x820 (live CDN pictures, 8 rooms each, 0 page errors, every key resolves to the expected room):
   - canh-phuc-cung-phi (GAP): picture fills stage, no window curtains. PASS
   - truong-xuan/ham-an-tan, canh-phuc-quyphi-ngu, khai-tuong-quyphi, canh-phuc-dong-phoi-ngu (GAP): fills stage, no window curtains (quyphi-ngu has only bed-canopy hangings). PASS
   - **thua-minh-cung-dong-phoi-ngu (GAP): FAIL.** Cream sheer curtains with tie-backs hang on BOTH sides of the lattice window/arch (left edge and right edge, gold tassel on the right) — a window-curtain look, which the L2387/L30 rule forbids. Same on Fold and iPad. Needs repaint (curtain-free) and re-swap of thua-minh-cung-dong-phoi-ngu-ha-sang.
   - chung-tu-cung-tay-phoi-ngu: UNSURE. Large blue drape tied back at the left, thin blue edge at right; could be bed alcove drape, could be window. Foreman/owner to eye it.
   - Nothing cut off, figures stand on the floor everywhere.
5. Rollback — PASS. 256/256 backups (16 live bases x 16 mùa×buổi) answer 200 at CDN img/_review/rankroom-backup/<key>.webp; backup bytes differ from live (old vs new, checked 2 keys); all 64 new <base>-ha-sang keys answer 200. Note: manifest for --revert lives only in the worker container (img/_review/rankroom-stage/manifest.json is NOT on the CDN, 404) — keep that worker's manifest or revert by the key list.

Fix needed: repaint thua-minh-cung-dong-phoi-ngu without window curtains (and decide chung-tu-cung-tay-phoi-ngu), swap, re-shoot, re-review. Rest may land once these are settled.
~95% xong / ~90% choi duoc
