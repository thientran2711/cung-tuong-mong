# Review review/act-pics2 @7cce4420d — r6 (merged onto origin/main 94ea008a2)
Branch review/act-pics2-r6. Later worker commits (after 7cce4420d) are NOT included.

Merge: conflicts in assemble.py (main's module list + jly.js after j88) and j31.js (main's `ev:"fest"` on every FESTEV item kept; the
branch's FEST `files` for vulan/vantho/lapbat and evId "fest:<k>" + headArt banner added on the push next to `ev:"fest"`). Site rebuilt.

Checks (local build, CDN pictures):
- dev/test/npc-art-audit.js: 39/39 tokens with a figure, 0 missing, 0 page errors. Lãnh cung stand-in shows fig/por consort-*-tcold-a26
  (plain undyed robe, wooden pin, no jewellery, no huadian); talk-panel portrait = same identity; S.lyF saved in ser(); identity from
  S.fidUsed (no clash with rivals).
- Old save (made on the live build): loads at 5 sizes, lyF absent -> created on first visit, no errors.
- Festival dialogs: real endTurn path gives evId fest:trungthu, ev "fest", headArt ev-fest-trungthu-b; cost mode on (all options data-khide);
  j71 fDay7 dialog (vantho) carries banner + evId; both via kit headArt (.kdlgart / kitSceneArt), no private CSS. No overflow / cut text at
  755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@2. 390x844: portrait title screen OK.
- dev/test/fest-art.js: 14 festivals resolve; 4 new map pictures used. Phase-correlation shift vs season map <= 1.8 px on a 4x3 grid,
  hotspot boxes overlaid line up.
- CDN: ACTS.json 300 acts / 10 prefix / 547 log rules -> 528 distinct keys (124 -h), all in _index; EVENTS.json 14 fest:<k> -> fest-<k>
  categories, all files present; 14 ev-fest-*-b banners present. dev/test/cdn-refs.py: only img/POR_FACE.json missing (main's jkpor.js, not this branch).
- opt-scan.py --fail: 0 unclassified. Tuần lục (j87/j79 meaning rules) opens from the old save, 0 broken images, 0 errors.
- Pictures looked at: 10 action pictures (hands/objects only: OK), festival/story pictures with small people: OK.
