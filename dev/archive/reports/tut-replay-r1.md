# tut-replay review r1 (reviewer, BIG: save code j3 serQ/deserQ)

VERDICT: PASS cfea74357bbb4d85566b360743ffde877f140ecb (branch review/tut-replay-r1 = review/tut-replay ecd2ffb3 merged onto origin/main 2934bede, generated files index.html/sw.js/assets.json rebuilt with build_site.sh; ancestor of origin/main: no, it is a merge ON TOP of main, so main can fast-forward to it).

## Checks
1. Other modal kinds wrongly skipped: no. isMenuCard matches only modal cls containing `kptitle`; that cls is set only by the ☰ home/sub cards (j74) and the co-op lobby card (jcooplobby, a screen too, already dropped on load by that file). Real event dialogs have no kptitle in cls. Tested: dialog `{t:"Việc thật A"}` pushed + save + deser round trip -> restored.
2. Old saves with a stored menu card load clean: yes. Tested P=[menu card, co-op lobby card, real event] -> Q = ["Việc thật"] only. (tut-replay.js also asserts it.)
3. Solo + co-op: coop-e2e 59/59 ok, 0 page errors (fold, ipad, solo; solo old save loads). cloud-save.js: 21 ok / 0 FAIL, then times out at cloud-save.js:99 (click blocked by the #dawn overlay); IDENTICAL on pure origin/main (21 ok, same line 99) -> pre-existing harness flake, not caused by this change (ticket for test owner: wait for #dawn to clear before that click). cloud strip of kptitle in jcloud.js is consistent with the new serQ.
4. tut-replay.js rerun by me (direct mode ?khost=0, OPT_N=10): Fold 755x1000@2 20/20 + Thiết lập 10/10, old save OK, errs []; iPad 1180x820@2 20/20 + 10/10, old save OK, errs [].
5. Consistency scan of ☰ entries (data-tgo): cont and Xem lại lời dặn (home + Thiết lập) use kitMenuResume; opt/past/slots only switch sub pages (no game flow). Slots-page "Tiếp tục kiếp này": tested ☰ > Sổ > save() > load: save holds no menu card (P=[]), after load modal hidden, Q empty, title hidden. Co-op button opens the lobby card, not a game flow. No other close-then-open path found. 0 page errors in all runs.

Small notes (not blocking): none needed fixing.
