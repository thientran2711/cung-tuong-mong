PRIORITY #1 CHECK: ROOT-51 brief root51-review-look-fx-r10 | OD owner 04:58Z (0 off-face) | main 2850c45b | review/look-fx-wire-r10 = 2850c45b (data only) | report look-fx-wire.md R10 read | claims MAIN ROOT-51 look-fx-wire #9.

# look-fx r10 review (small data reviewer)
Candidate: img/_review/look-fx-wire/cand-face-fit-r10.json (11506 rows) served over the LIVE build 2850c45b with harness dev/test/look-fx-wire.js (LFW_OVR). Shots are local scratch only (not uploaded).

## (2) Scan: PASS
- JSON valid; every row [dx,dy,sx,sy] numeric, same format as live (4073 live rows, all kept as keys; 27 live rows changed value).
- Keys: 6562 fig + 4944 por, 0 rows without a veil-fit entry. veil-fit index = 17805 pictures; 6299 have no row = existing safe fallback (generic polygon, code: "no row = polygon as it is"), by design (<3 % off skin).
- Ranges: dx -.12..+.12, dy -.10..+.11, sx/sy .76..1.0 (same bounds as live).

## (3) quickcheck.sh on 2850c45b: PASS (147 s, open 1212 ms, old save ok, core gates PASS). Note: quickcheck aborts CDN requests, so it cannot exercise the candidate; it only proves the build is sound.

## (1) LOOK (3x): FAIL
Looked: Fold 755x1000@2 c01 t2 (8 marks x lv1-3, face + mirror), Fold c01 ty6, c07 t3, c09 tm1 (lv1+3); iPad 1180x820@2 c01 t2 (8 x lv1-3, face + mirror), c19 t2 (crown/headdress), c30 t2 (lv1+3). Live vs candidate side by side for c01 muc / poxscar / bui. Good: no mark on eyes or lips; pox, soot, dust, mồ hôi, cào, muội all clearly visible on skin in every picture.
Not covered: beard picture and an old-save portrait (harness only forces consort-<id> pictures).

Numbered faults:
1. INK (muc) lv3, c01 t2, Fold + iPad: stroke tail still lies over the dark hair lock at the temple and its faded start touches the outer eye corner (c01 ty6 the same, thick). Candidate == live here, so r10 did not fix caveat c/d for ink lv3.
2. INK (muc) lv3 is CLIPPED AWAY to nothing on other pictures: c19 t2 (iPad) only two tiny specks remain; c07 t3 (Fold) only faint hairlines. Violates "not clipped away to nothing". Likely cause: the stroke runs across the temple, which the new tighter face polygon removes. Needs ink art/stroke placement moved onto the cheek (like muội R8), not just a tighter polygon.
3. (minor, check) poxscar lv3 on c01/c19 reads as 3-5 tiny dots; faint but present.

VERDICT: FAIL cand-face-fit-r10.json (faults 1-2).
