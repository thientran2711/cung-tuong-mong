PRIORITY #1 CHECK ('kpb'): OD 0 | ledger 0 | claims 4 (none on .kpb shrink) | main 15 (jk4 .kpb flex rule; j79.js:408-510 kpanel rules) | review/* review/kpanel-compact-r1 (16/11, older; check whether its rule is already live before touching) | archive 15

# kit-kpb — kdscroll `.kpb` no longer shrinks under the option list (KIT KEEPER)

Branch `review/kit-kpb` from live 5cbfd620. Fix commit 3a26b824 (jk4 + jkitpage + KIT.md + test + rebuilt index.html/sw.js/assets.json); head 19953e93 (adds only dev/test/kpb-shots.js).

## Root cause and fix (kit rule, once)
`dev/build/jk4.js` `.modal .dlg.kdscroll>#mb>.kpb{flex:0 1 auto!important;min-height:0}` let the intro / facts / item card shrink (overflow visible) while `.opts` (flex 1 1 auto, basis = its full content) took the room, so the options lay on top of the intro.
Now `flex:0 0 auto;min-height:auto`: the intro keeps its full height; only `.opts` takes the rest (min 96 px) and scrolls; a very long intro is still capped by `kitDlgText` (`.kdtx`, scrolls inside itself). One CSS line in the shared kdscroll rule, no per-picker change.

## Scan (whole group) — dev/test/kpb-scan.js
Opens every PEND dialog with an option list (tries every inventory index) + generic subject/facts/text pickers with 2/4/8/24 options; measures `.kpb` rendered height / scrollHeight, intro text lying under `.opts`, options reachable, dialog fit. `BEFORE=1` re-applies the old rule for the before column. Kdper banner dialogs (kpb empty, whole column scrolls) are reported but not failed.
| viewport | cases with .kpb+.opts | FAIL before | FAIL after |
|---|---|---|---|
| Fold 755x1000@2 | 13 | 7 | 0 |
| iPad 1180x820@2 | 13 | 7 | 0 |
| iPad Pro 1366x1024@2 | 13 | 7 | 0 |
| 412x1058@2 | 13 / 10 | 7 | 0 |
| 390x844@3 | 13 | 7 | 0 |
Fold detail (kpb rendered/content px): pgpick 23/163 → 163/163 (overlap 2 → 0) · wkgive 29/195 → 195/195 (overlap 14 → 0) · giftpick 16/24 → 24/24 · evpick, itarget 19/24 → 24/24 · plantsv 55/78 → 78/78 · generic text, 24 options 23/53 → 53/53 (overlap 1 → 0). Short pickers (2/8 options) unchanged. Page errors 0.

## Gates
quickcheck.sh PASS on 3a26b824 (182 s; open 1519 ms, old save ok, perf new/live render 225/200, tab 441/434, buổi 1057/946, core gates PASS incl. one-core-guard 0 fails, rules-one-source, kit-conform). img-allowlist OK.

## Docs
KIT.md §8.1 bullet "kdscroll intro never shrinks"; kit sample page §8 new button "CHỌN NHIỀU" (`kitPopSample('pickmany')`, 16 options). KIT_REQUESTS entry marked DONE.

## Shots (LOOKED, after-only, Fold | iPad), CDN img/_review/kit-kpb/ (delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review kit-kpb`)
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-kpb/pgpick-fold.jpg · pgpick-ipad.jpg · giftpick-fold.jpg · giftpick-ipad.jpg · short-fold.jpg · short-ipad.jpg
pgpick: intro line, person strip and the "Thành hay bại tùy" note fully visible, option cards scroll below with the "Kéo xuống" cue; giftpick: item card + tabs + options, nothing covered; short picker unchanged.

Note: the Foreman D poison-road-fix worker (session_01964izENMh7RgrvjTLQsBZa) FAIL 1 depends on this sha.

SẴN SÀNG KIỂM 19953e9355d342f752f55452f178eecad50875a9
