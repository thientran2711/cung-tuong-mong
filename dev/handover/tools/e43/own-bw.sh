r bw-scan node dev/test/bang-words/scan.js $U
r bw-screen node dev/test/bang-words/screen.js $U
r bang-line-scan node dev/test/bang-line-scan.js
r caoly-oldsave node dev/test/caoly-oldsave.js
r bd-legacy-save node dev/test/bd-legacy-save.js
r coop-land-nc-bd env COOP_LAND=1 COOP_A_ORIGIN=nc COOP_B_ORIGIN=bd node dev/test/coop-e2e.js $O/cl1
r coop-land-bd-nc env COOP_LAND=1 COOP_A_ORIGIN=bd COOP_B_ORIGIN=nc node dev/test/coop-e2e.js $O/cl2
r ge-guard node dev/test/ge-guard.js $U
r self-word-scan node dev/test/self-word/scan.js $U
r rare-match node dev/test/self-word/rare-match.js $WT
