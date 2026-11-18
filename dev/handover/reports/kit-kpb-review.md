PRIORITY #1 CHECK ('kpb'): KIT REQUEST from D poison-road review (FOREMAN_D_STATUS 09:34Z) | main none | review/* review/kit-kpb 19953e93 | claims MAIN ROOT-50 kit-kpb session_01UV1SzmDYo7maUqr1RbcypR

# kit-kpb review (small UI reviewer)

Reviewed review/kit-kpb @19953e93 (fix 3a26b824). Final merge: origin/main 711d7bad merged in (only index.html / sw.js conflicted = built files, rebuilt with dev/site/build_site.sh; no source conflict). Pushed review/kit-kpb-rv @13e2b83407d7ac0c8c82afdec4617af68003100e (descends from live 711d7bad, FF-able).

1. Whole group: kpb-scan on the merged build, Fold 755x1000@2 and iPad 1180x820@2: 13 cases with .kpb+.opts each, FAIL 0, page errors 0. Only other .kpb rule is `.dawn .dbox.kpanel>.kpb` (own overflow-y:auto, no .opts, a different container, untouched by the fix).
2. KIT FIRST: the fix is one CSS line in the shared kdscroll rule (dev/build/jk4.js) plus KIT.md 8.1 and the kit sample page; no per-screen override.
3. LOOKED (3x each, scratch only, nothing uploaded to the CDN, nothing in git), Fold and iPad: poison-road picker (pgpick), item-gift picker (giftpick), 24-option picker with a two-paragraph intro (longest list), short 2-option picker. Intro, person strip and "Thành hay bại tùy" note fully visible, no overlap; option list scrolls with the "Kéo xuống" cue; short picker unchanged.
4. quickcheck.sh on 13e2b834: PASS (open 1171 ms, old save ok, perf new/live render 173/189, tab 337/357, buổi 897/1168; core gates PASS incl. one-core-guard 0, rules-one-source, kit-conform; time-spill guard PASS).

LAND READY 13e2b83407d7ac0c8c82afdec4617af68003100e
