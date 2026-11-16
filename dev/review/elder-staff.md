# Review: review/elder-staff @06a0080416 -> review/elder-staff-r1

Result: PASS (with one small kit fix by the reviewer).

## Merge
Branch was behind main (c36a0632); merged origin/main 4f5e5f3b32. Conflicts: built files (index.html, sw.js, assets.json: re-built),
dev/build/assemble.py (took main's file list, appended jstaff.js last), dev/build/j15.js (kept main's court card incl. thyCardLines/thyCardGroup,
re-added the elderTabRows push, the "thh" card and the elderGroups concat on servant cards). Site rebuilt.

## Fix by reviewer (kit, one place)
pcard group tabs (j15.js) printed "0/0" on a text-only group ("Chức việc 0/0": kitRows have no buttons). The count badge is now
omitted when the group has no buttons (applies to every card the same way).

## Checks
- KIT FIRST: jstaff.js has no CSS / no custom DOM; card = pcard, duties = kit text rows, actions = pbtn (Biếu / Hỏi chuyện), list rows = the
  existing Cung nhân pager rows. PASS. Consistency: same pcard frame, same pager row, same tab bar as every other servant/court card.
- VANPHONG: no %, odds via existing pbtn words ("Chắc chắn"), cổ trang wording. PASS.
- Old saves: staffInit hook seeds silently (test 'oldsave'); guest never seeds (isGuest in elderInit/giveFace/ageYear); host-authoritative. PASS.
- Faces: 3 ma ma use por-mama-kNN-a51 art (grey hair, visibly elderly, three different faces; figUsed guards uniqueness vs every other NPC).
  Same face object (staffFace = pServ) in list, stage, card, event text and staffGuide() (test 'guide'). LOOKED at all three: not young a36 art.
- Caps: srkMax/capOf used, fitCap moves an ordinary maid; test 'seed' checks no consort over cap.
- Test dev/test/elder-staff.js (serve repo root, built index.html): PASS at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390, zero page errors.
  390x844 shows the rotate prompt "Xoay ngang điện thoại để chơi".
  Note: under heavy machine load the test sometimes failed 'seed'/'guide' (fid still empty because FIGS had not loaded yet); giveFace
  retries on every draw so it heals; passes on rerun.

## Non-blocking notes for the worker
1. The two eunuchs (Tổng quản Lý Liên Anh, Kính sự phòng) are only reused: their duties live in a BAL.staff comment and are not shown
   as "Chức việc" rows on their court cards, so "each holds several duties" is true in play but not displayed for them. Suggest the same
   elderGroups-style duty rows on the court card in a later pass.
2. Before FIGS loads, a staff woman is drawn from drawF (fc) and then switches to her fid face once FIGS is ready (only during load).
3. On a stage with 4+ people, Hà cô cô sits behind the "+2" button; reachable, not broken.
