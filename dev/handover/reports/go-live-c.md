# go-live-c (Foreman C go-live prep, OD:L1370)

Both branches confirmed NOT on origin/main (merge-base exists, tips not ancestors). Each merged onto the latest origin/main, generated files (index.html, sw.js, assets.json) rebuilt with dev/site/build_site.sh; assemble list = main's list + the branch's own files. Go-live-kit quick-check script did not exist yet, so the check was run by hand.

## READY 349e815bb9ee9901b65f14831d20155ef1f8fdca  (review/title-sys-live, BIG)
Base: origin/main fb367740 is an ancestor. Source: review/title-sys-r1 PASS ced2edc6.
Player: title system phase 1 - earn, wear and take off titles (Danh hieu) in the Nhiem vu tab; worn title on the stage name tag and in NPC pop-ups; rank-bright.
Checks: build OK; 0 page errors and no overflow at 755x1000 and 1180x820; game-feel old-save load OK, offline OK; title-sys + title-tag pass at both sizes (errs [] fail []); title-tag-r1 0 errs; coop-e2e 59/59. After main moved (2e9615fb -> fb367740) re-merged, rebuilt, re-ran open, title-sys, title-tag, game-feel old-save: pass.

## READY bc11116283d8303e35860cd9926276e76bbc5a91  (review/b-answers-art-live, SMALL)
Base: origin/main 12f52db7 is an ancestor. Source: review/b-answers-art-r1 PASS 82756a80.
Player: new painted figures (4 ages, fig + portrait) for the fallen concubine Ly, the Tan Gia kho steward and the Thuong thu phong tutor; FIGURES-others.json rows.
Checks: build OK; 0 page errors, no overflow at 755x1000 and 1180x820; game-feel old-save load OK; npc-art-audit 92/92 with figure, 0 missing; fig-fill both sizes OK (no chip below head); b-answers-art.js fold half OK (figures load in Quan 3 places) - its iPad half hangs on this slow box (not a game error; the page opens fine at 1180x820), so npc-art-audit + fig-fill used as the reviewer did.

If origin/main moves before the push, ask for a re-merge; both worktrees stay until told to stop.
