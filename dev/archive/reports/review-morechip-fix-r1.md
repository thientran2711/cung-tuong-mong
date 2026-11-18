PRIORITY #1 CHECK: OD none for "+N chip on column"; main dev/build/j59.js j59chips (KIT 33.9) is the one placer; origin/review/* only morechip-fix; claims none running; reviewed the one branch from the brief.

# review morechip-fix r1 — PASS 3bed78e3 (review/morechip-fix-r1 = review/morechip-fix eba25768 + merge of origin/main 65dcf52f)
- Merge: conflicts only in generated index.html / sw.js / assets.json → took theirs + build_site.sh; no hand conflicts. Ancestor of origin/main: yes.
- Code read: j59chips re-places once on the next frame (rAF, guarded by st.isConnected, `again` flag prevents loops); if a chip box overlaps #kshR (right) or #kshL/.krailb (left) it moves beside the column at its top. Kit part only, no new CSS/part; KIT §33.9 line added. Kit-only: pass.
- morechip-scan.js (host mode, her room + 14 place paintings, Fold 755x1000, iPad Air 1180x820, iPad Pro 1366x1024, 412x1058, 390x844), two runs: chips 71 / 71, ON column/rail 0 / 0, outside stage 0, page errors 0. MORECHIP OK both.
- quickcheck --runs 5 vs live 65dcf52f: PASS (core gates, time-spill guard, old save ok, no errors). Perf median new/live: render 235/230, tab 368/322, buổi 901/980, tasks>200ms 12/13 (box noise; the change adds one rAF per render; tab +14 % within noise, buổi better).
- LOOK: Fold 755x1000 home: «+4» sits under the column, clear of «Nguy hiểm chung / Xét phẩm»; iPad 1180x820 home: «+4» under the column, nothing covered. Scan covers every place numerically; I looked at the two home shots (no fail shots were produced, so no place shots exist).
- No fixes needed. Shots stayed in scratch, none in git or CDN.
