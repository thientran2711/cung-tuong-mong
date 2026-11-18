PASS d236f309bb5ad6705e87cfa9106877b97003d5a4

# Review D25 veil-zoom (r3) — CONDITIONAL on kit keeper sign-off (items below)
review/veil-zoom-r2 @ f88a191b merged onto latest origin/main (73c06812) as review/veil-zoom-r3 @ d236f309bb5ad6705e87cfa9106877b97003d5a4 (descends from origin/main; only index.html/sw.js conflicted, rebuilt with dev/site/build_site.sh, no markers).

## Checks (own http server, port 8765, killed after)
- dev/test/veil-zoom.js (layers / fail / page errors): 755x1000@2 824/0/none; 1000x755@1 878/0/none; 1180x820@2 808/0/none; 1366x1024@2 793/0/none; 390x844@2 901/0/none; 844x390@2 1486/36 (see note)/none. Same scan on origin/main at 844x390: 1032 fails -> branch fixes ~97 %.
- Note (minor, not blocking): the 36 remaining fails at 844x390 are all her own stage figure (mefig, fig-consort-c32) repeated across tabs: box 1 CSS px right of the picture (kitFxLay uses integer offsetLeft/offsetWidth; figure only ~50 px wide there, error 5-7 % of the layer width). Fixable later by fractional layout; not visible.
- rotate-prompt.js: ALL PASS (390x844 prompt shown, hosts/devices). No horizontal overflow, 0 page errors at all 6 sizes (boot, 4 s idle).
- Old save: chap-label-oldsave.js (save from main loaded in branch build): FAIL [] (loads v1/v2/v3).
- Screenshots looked at: main stage, Tuan luc book (veil sits on her face) at 1180x820 and 844x390. Places covered by scan: stage tokens/her figure, person card, dialog, galleries, book, kitFaceZoom, makeup reveal.
- Kit: general (one kit path kitFxPut -> kitFxLay for every stage/podium figure; kporApply -> kporFx for every portrait frame); no private CSS, no wording, no numbers, no art.
- Cost/leaks: one ResizeObserver per image (guarded by img.__kfxro), rAF-throttled, observes only the image (box is absolute, so no feedback loop); re-lay is a no-op once the box is disconnected. Observer is never disconnect()ed explicitly, but it dies with the removed image element (acceptable; stage re-renders replace the images).

## KIT KEEPER SIGN-OFF NEEDED
1. KIT.md 28.8 "Zoom-follow (D25)" + jkpor kporFx / .kfxz / --kxl,--kxt,--kxw,--kxh.
2. KIT.md 28.8 "Stage-box follow (D25-r2)" + jk2b kitFxLay + ResizeObserver/load re-lay in kitFxPut; jface copies s.__fig transform.

Not covered: real touch / iOS Safari.
