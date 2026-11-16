# PROGRESS merge-train-4 (worker, coordinator = main session 9)

Base: origin/main eba64ead43adcd53e4cf0ebf1e5b50f17c093a03. Branch: review/merge-train-4.
Method (as merge-train-3): `git merge --no-ff` one branch at a time; generated files (index.html, sw.js, assets.json) taken from ours
then REBUILT with `bash dev/site/build_site.sh` after every merge (one commit per merge); assemble.py list = ours + the branch's new
module inserted after its predecessor in the branch's list.

## Merged (order)
1. routes-port-r1 332308a19 — assemble: jroute after jmen
2. chapter-detail-r1 936a2fe78 — jchap after jtabs
3. difficulty-port-r1 cbb8ab2bf — jdiff after jbal2
4. tuduc-mg-r1 53a13452d — jtd after j85
5. result-sfx-r1 18926abcc — jtoil.js conflict: kept train-3 makeup reveal/colours (HEAD) + result-sfx's win/lose sound through kg82ShowRes(html,tOk)
6. placeholder-pics3-r1 696127b32 — clean
7. small-art-wire-r1 6bce72fa6 — clean
8. collect-ms-r1 94591de58 — jcol after jearn
9. act-text-r1 fe15a6d54 — jtabs.js conflict (Tứ đức buttons): act-text wording + tuduc-mg's "chơi một trò nhỏ"
10. ua-test-r1 cad6e04c0 — clean (dev/ only)
11. cycle-r3 d9c47fad1 — jcycle after jtruth/jkpc
12. tuduc-sub-r1 adeb7de66 — j83: tuduc-sub's Đức cap (wkFinLeft/wkFinTxt) + act-text wording (Tự học, "từ 0 đến 10", wkTierTxt); j85: act-text log
Assemble tail: … jtruth, jkpc, jcycle, jtds (jcycle and jtds wrap disjoint functions: jcycle deal/endTurn/flip/monthPay/nightCh/nightScene/
rivalsMonth/stealNight/talkOpts; jtds addVir/virCost/deser/tdFinish/lessonVir/wkLv/wkrMat/rcpListOpen/rcpOldSave/render/ktArtSkills/start/ktWorksHTML).

## Merge-breakage fixes (in the tuduc-sub merge commit)
- Owner rule carried by act-text-r1 (one word "Tự học"; "Học với ma ma"; log "Học X với ma ma giáo tập") was undone by tuduc-mg / tuduc-sub
  text: jtabs Tứ đức buttons, jtd TD_MODE + log, jtds practice ("Tự học, làm đồ", log "tự học") brought back in line.
- jtds teacher-log rewrite regex also matches the new log form.
- j79 kpActCtx (placeholder-pics3 picture keys) accepts the new labels ("Tự học", "Học với ma ma", "Học với Thái hậu",
  "Tự học, làm tác phẩm") → same ACTS.json pictures as before.
- Update notes: new id 2026-11-16b in dev/build/jnotes.js.

## KIT
No new § sections in this train; no duplicate § numbers (§6.x / §57.x are subsections). Next free §81.

## Tests
(see below)
