# REVIEW mg-play2 (BIG, opus) — verdict: PASS fc1fb3b6 (review/mg-play2-rv)
PRIORITY #1 CHECK: OD 20/11 ~07:45Z/~07:55Z (Hoa điền hidden anchored target + no tilt) + ~08:05Z (Hoa đăng avoid + strong lane) read verbatim | main jhd.js hdAnchor/hdBoard, jts tsEngSteer, j82 cue kit BAL.mgFx | review/mg-play2 209f34df (workers LZkqCJgR + KPc7jyAT) | claims: this row only.
Reviewer session_01Rc5AsKEZen6N5ttXHoipPr, depth 5. START_CTX ~3 % (1M window). Target 209f34df → final **fc1fb3b6** on review/mg-play2-rv (descends LIVE 716be762, plain FF checked).

## Owner points checked
| point | result |
|---|---|
| Hoa điền: hidden target on each painted face's natural spot | PASS. HD_ANC (one table, generator dev/art/mkfit/hdanchor.py, BAL.hd.up) = between the brows. I LOOKED at contact sheets of **41 random consort portraits (por-, the board's picture, incl. her c07-t2-a18)**: every spot sits centred between the brow heads, never disagrees with the face; where a portrait has a painted hoa điền it lies inside the spot. Spot stays hidden (no mark drawn); fallback (no row, no points) shows the spot and scores × BAL.hd.shownTol .5. |
| tilt step fully removed | PASS. No «Nghiêng» buttons, BAL.hd.tolA/wA/a0/rot gone, hdQ(d,sk,lvF) distance only, sticker starts level, guided hand never points at tilt, how text has no tilt. |
| score by distance, stricter by tier from BAL (law 4/5) | PASS. BAL.mgTier.lev.hoadien.tol [.6,1.3] via mgLev (ease 0 = .6, strictest). Note (pre-existing, not this branch): the daily makeup step uses a fixed BAL.hd.mkLv 2, not rank. |
| Hoa đăng: avoid obvious by picture | PASS. Lotus pads wear kit danger ring + ✕ (kg82FxBad, colour --bad); hit = red burst, pad fades, lantern shakes, «✕» pop (no word). Rules picture «dodge» LOOKED frame by frame: a ✕ thing comes down the lit lane, the piece steps aside and back. Guided round hand drags the lantern aside. |
| light lane clearly visible Fold 755x1000 + iPad 1180x820 | PASS (shots LOOKED): board outside darkened, light core + two bright edges; luminance gap 87–89 (min BAL.mgFx.laneMin 40). One early iPad run read 16 = test race (lane moves between geometry read and screenshot); 3 reruns pass — flaky-test note below. |
| lane kit part for the whole group, no private look | PASS. kg82FxLane / .path / .stroke / .zone, all in the ONE BAL.mgFx cue kit (j82), KIT.md §13.7.1 + KIT_REQUESTS sign-off line. Shots LOOKED: den, duho, hát ribbon, thư pháp stroke, nấu + Tu đức ngôn gauge zones — same look. |
| no words added in play | PASS. den wind arrow removed, Hoa điền in-play label removed; mg-noword-a 46 ok, mg-visual 8 ok. Words still on boards (duho «Tầm tay», thư pháp «CHỮ THẬP 2 NÉT», ngôn labels) are pre-existing mg-noword family, untouched. |
| owner calibration untouched | PASS. BAL.ag.mg2.cal.k has no hoadien and no den (checked by eval); no cal line in the diff. Her hoadien 5.5 / den 4.7 stay NOT counted. |

## Fixes made by the reviewer (on review/mg-play2-rv)
1. **Spot table was built from a stale repo copy of the face points.** dev/art/mkfit (repo copy) was behind the live img/mk-fit on the CDN: 70 rows (mostly por-/fig-*-kc-*) differ, spot moved up to .11 eye-distance (por-c16-kc-a18 .09 ≈ a perfect drop scoring ~6/10). Since the table wins over the live mesh, I copied ONLY those 70 changed rows from the CDN (anchor-table gate: 5992 pictures, 0 bad) and regenerated HD_ANC (5896 rows, --check OK). The CDN also holds ~1184 NEW v1/v2/a65 rows; I did NOT take them (anchor-table gate flags 102 of them as broken meshes) — those pictures fall back to the live mesh, hidden, as before. → 7511541e
2. Thử tay Hoa điền board waited up to BAL.toil.meshWait 8 s for the face-points file even when the table has the row; now starts at once on a row. → 9b51dacf
3. Final merges: LIVE 377d5ce3 (cal-p2; index/sw only) → 0afe00fa; LIVE 30e8714e (mg-score-same + fig-label) REAL conflicts combined: jhd kgHoaDien = spot-table no-wait + mgLive board mark; jts den = danger-ring hit (✕, denHit, shake) + the ONE live grade mgLive; KIT_REQUESTS both sections → af39bbe2; LIVE 716be762 (mg-env, j92 1 line; index/sw only) → fc1fb3b6.

## Tests (sequential runs) on af39bbe2, re-run on fc1fb3b6 where marked *
mg-play2 19/19* (Fold) + 19/19 (iPad) · hoa-dien 39 ok 0 FAIL · mg-ready-guide PASS 9/9* · mg-env ALL OK* · mg-score-same-scan 35 cells via the ONE grade, 0 raw · ag-mgcal 14 ok · mg-noword-a 46 ok · mg-visual 8 ok · cal-dauho ALL OK against pre-fix base 70bea3d3 (against origin/main its check 3 cannot hold any more: the fix is live) · QUICKCHECK on 7511541e PASS (open 1713 ms, old save ok, perf render 229/239 ms, core gates PASS incl. G4 anchor-table); QUICKCHECK on af39bbe2 PASS (open 1700 ms, old save ok, render 270/255 ms, core gates PASS). fc1fb3b6 adds only main's j92 line (quickchecked on main).

## Follow-ups (not blocking, for MAIN / Foreman C)
- Stale face meshes on some FIGURE pictures (fig-*-ty8-*: c03-ty8-a36, c27-ty8-a26, c13-ty8-a36, c13-ty8-a26 seen off-face; ~4 of 45 sampled figs). Same data the live mesh used before → pre-existing; it only affects her own hoa điền layer on figures (NPC layer is off, BAL.hd.npcShow 0), never the board (por-, 41/41 correct). Foreman C: re-mesh ty8 figs (mkfit verify.py), then re-run hdanchor.py.
- img/mk-fit on the CDN has ~1184 un-vetted v1/v2/a65 rows (102 bad per anchor-table) not in the repo copy — Foreman C to vet/fix and sync the repo copy; then re-run hdanchor.py (mg-play2 test 1a guards the table = generator).
- mg-play2 test 5 (lit-path luminance) can race; read the lane geometry from the same frame as the screenshot.
- Commit pop «Hoa điền ngay ngắn giữa trán!» kept (rules text says «giữa hai đầu mày»); wording owner/VANPHONG call if wanted.

Shots: made and LOOKED in scratch (Fold 755x1000@2 + iPad 1180x820@2, rules + play, 7 kinds, + demo frames, + contact sheets); worker's CDN shots img/_review/mg-play2/ wiped with this verdict.
