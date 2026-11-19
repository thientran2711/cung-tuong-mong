# art-wiring-1119 — worker report (opus, session_01N1tNP59FAL2oqUhk7AUxRa) → Foreman B ROOT-3

Owner verbatim (first, per brief): "Cái mốc 65 tuổi không phải là thêm cho mỗi phi tần mà là ở bất kỳ một cái nhóm nào, như cung nữ cũng có 65 tuổi, tức là nhân viên của mình bất kỳ ai cũng có 65 tuổi." / "Hình Thái Hậu cũng vậy. Nói chung là hình nào mà hôm nay vẽ mà tao duyệt ok rồi thì đẩy hết lên live đi."
Also applied (OD 19/11 ~00:49Z, verbatim in OD): "… Ai cũng là Thái Hậu hết, 90 người Thái Hậu." → canon: Thái hậu drawn from the 90-pool; shared h1/h2/h3 retired.

PRIORITY #1 CHECK ('thaihau a65 v1v2'): OD 3 (19/11 ~00:45Z, ~00:49Z, ~00:50Z) | ledger 0 | claims 1 (this job, B) | main 0 (no th / a65 / v slot; figTier("th") = null trap confirmed at j39:14) | review/* 0 | reused: j39 figPick/figFor/figIndex, j66 figTierOf/figDist, j88 f88Best/f88Pick/f88Keys, jbal BAL.ageBand + ageBandIx, j92 wdHash, LIVE-2 file list (reports/live-today.md FOR MAIN WIRING).
START_CTX ~5 % (own estimate, 1M window) → rollover at ~30 %; finished at ~22 %. No handover needed.

**Note (overrule):** the LIVE-2 list says "keep fig-thaihau-h1..h3 for S.thO". The LATER owner line 19/11 ~00:49Z overrules it: S.thO now takes a pool face; h1–h3 are no longer picked (an old save holding "thaihau:hN" redraws a pool face once).

## STEP 0 — touch points
| part | touch point | change |
|---|---|---|
| rows | img/FIGURES-x.json (NEW manifest, CDN) | 592 rows from the CDN listing: **th 96** (32 × a36/a51/a65) · **a65 v0 42** (21 people × t7/t8) · **v1/v2 454** (t7/t8 a18/a26/a36 ×31–32, c04 a51, a65 ×19) = all 592 LIVE-2 files. Row: `{role:"consort",identity:"cNN",tier:"th"|7|8,ageBand,v?:1|2,file,por}`. Why not FIGURES.json: the old live code would read the rows before this code lands (the th trap + random v0/v1/v2). FIGURES-x.json is read only by the new code, so it is already on the CDN with no live effect. |
| hd | img/FIGURES-hd.json | +574 HD twins (widths read by Range request) |
| index | j39 figIndex (wrapped, jfigx) | a65 rows join FIGIX like any row; th / v rows go to FIGXT (never seen by other FIGIX readers: jht, jkc, jstaff, j86 …) |
| tier | j39 figTier (wrapped) | "th" → 9 (own slot code), the LIVE-2 trap |
| who is TH | figIsTh (new, jfigx) | S.thO; her once S.succ.p is "a"/"b"; her ending fate "…Thái hậu…" (not Thái phi) |
| figTierOf | wrapped (outermost) | Thái hậu → 9; jtoil's temporary rank override still wins (dressing table shows the robe she wears) |
| f88Wear | wrapped | Thái hậu wears consort dress (not maid art) |
| S.thO face | figRoles + figPick (wrapped) | draws a free pool face (c01–c32, m01–m52, k01–k08), preferring faces with a painted th robe; one face for life (figUsed); co-op guest never draws (thO + fidUsed are world keys) |
| picture | j88 f88Best (wrapped) | TH: own th robe nearest age band → else own t8 (figBestRank) → else nearest picture of the same person (6c). Colour: same tier + band v-row if her colour asks for it, else v0 |
| colour | figVOf (new) | who.figV, else wdHash(face + Emperor's name) % BAL.figVar — one colour per woman per reign, same on both seats, her and NPCs alike (law 1). BAL.figVar = 1 turns it off |
| a65 | jbal BAL.ageBand [26,36,51] → [26,36,51,65] | + labels from BAL (BAND4N "51-64","65+"), j66 pidBand → ageBandIx, jkc KC_AB + "a65", jstaff elder figRec (hard-coded "a51" → band of max(51, age)) |
| tools | dev/tools/figx_rows.py · dev/site/manifest_guard.py | rows builder; FIGURES-x.json guarded; a manifest with no live copy reads as empty (was a crash) |
| tests | dev/test/fig-wiring.js · fig-wiring-shots.js · coop-e2e.js | picker gate; review shots; co-op "same Thái hậu picture" check in `same()` |

Laws: 4 — every number from BAL (ageBand, figVar); tier 9 / dress 8 are slot codes of the art. 6c — never blank (picker 0 blanks). 9 — no UI change; figures go through the existing kit figure frame. 1 — the same colour + Thái hậu rule for her and NPCs. 18 — no new feature UI: a colour PICKER would be new UI → not built (FOR MAIN below).

## GATES (branch review/art-wiring-1119)
- picker `node dev/test/fig-wiring.js`: **15,064 cells, 0 blanks, 0 bad** (92 faces × NPC consort cold,t1–t8 × her t1/t8 × servant × Thái hậu NPC × her as Thái hậu × ages 18/30/40/55/64/66/75, fig + por). Checks a65 never below 65 and shown at 65+ where painted; th robe only on a Thái hậu and always when painted; v1/v2 only when asked and always when painted; never a shared fig-thaihau-*; old save "thaihau:h2" → pool face (consort:c28), h2 freed.
- quickcheck 64887d06: PASS (core gates incl. one-core-guard, time-spill, old save loads + plays a buổi, perf new/live render 178/226 ms). Re-run after the main merge: see the line at the end.
- one-core-guard: PASS (inline 3988 ≤ baseline 4212).
- coop-e2e: **68/68**; new check at start / each week / after rejoin: both seats show `fig-consort-c07-th-a51.webp`, fid consort:c07.
- shots (Fold 755x1000 + iPad 1180x820, one montage per look), CDN `img/_review/art-wiring-1119/`: mont-th51 (Thái hậu c07, own th robe a51, Đức Thọ cung) · mont-th65 (same, age 70 → th a65) · mont-her65 (her Hoàng hậu at 70 → t8 a65) · mont-herV1 (her Hoàng hậu 26, colour v1) · mont-herTH (her after road a → own th robe a51; harness sets S.succ only, so the rank chip still reads Hoàng hậu). Looked at all five.

## FOR C — art still missing (shown meanwhile as the nearest age / dress of the same person)
- a65 consort: t1–t6 + cold for all 32; t7/t8 a65 for c06 c07 c08 c14 c15 c16 c20 c21 c22 c23 c24 (11); v1/v2 a65 for c05 c13.
- a65 maid m01–m52: plain + t1–t8 + cold (none painted). a65 ma ma k01–k08: plain (none painted).
- Thái hậu robe for maid faces m01–m52 and ma ma k01–k08 (60 faces). The draw prefers the 32 consort faces that have one; a maid / ma ma face is used only when no consort face is free, then she wears her own t8 dress (maid) or her ma ma robe.

## FOR MAIN
- Colour choice is automatic (per woman per reign). If the owner wants her to CHOOSE the colour, that is a picker = new kit part (law 9/18) → KIT REQUEST; the API is ready: `figVSet(who, 0|1|2)`.
- Two-way note: a consort NPC who becomes Thái hậu exists only in ending text (j3 "Tân Thái hậu …"); there is no live state for it, so nothing to wire.
- roomFor (j17) counts maid faces worn by her and consorts, not the Thái hậu's: a Thái hậu on a maid face (rare, see FOR C) could allow one more servant than faces. Left as is.
- LAND: FIGURES-x.json + FIGURES-hd.json are already on the CDN (no live effect until this code lands). Wipe review shots with the verdict: `python3 dev/site/cdn_sync.py --wipe-review art-wiring-1119`.

~100% xong / ~100% chơi được (a65 / Thái hậu for maid faces wait for C's art; fallbacks hold).

## SẴN SÀNG KIỂM 69a26198cb04771a1b7266b17f5a7de8ceee8bcf
Final merge of origin/main 89aa1bd9 (only index.html conflicted: rebuilt). On 69a26198: quickcheck PASS (core gates PASS; old save ok; render 235/210 ms new/live), fig-wiring picker 15,064 cells 0 blank 0 bad. coop-e2e 68/68 ran on b037bd44 (same code; the merge brought only role-parity tooling).

## REVIEW r1 (independent opus reviewer, session_01N1tNP6nQ6XCj5Xu1dFX9af, 19/11 ~03:40Z) — FAIL (2 items, both small)
PRIORITY #1 CHECK ('thaihau a65 v1v2 figVar FIGURES-x'): OD 3 (19/11 ~00:45Z/~00:49Z/~00:50Z, L1937–1938) | main 0 (no th / a65 / v slot on 1cf5e8bb) | review/* only review/art-wiring-1119 | claims: worker session_01N1tNP59FAL2oqUhk7AUxRa. Reviewer START_CTX ~6 % (own estimate).
Merge branch: review/art-wiring-1119-r1 @ 1853c22e = 69a26198 + origin/main 1cf5e8bb (only index.html / sw.js conflicted, rebuilt by build_site.sh).

### Gates (run by the reviewer on 1853c22e)
| gate | result |
|---|---|
| fig-wiring.js (own run) | PASS — 15,064 cells, 0 blank, 0 bad; bands [26,36,51,65], labels 18-25…65+; old save "thaihau:h2" → consort:c32, h2 freed |
| quickcheck (core gates incl. one-core-guard, time-spill, old save from LIVE loads + plays a buổi, perf) | PASS — render 211/227 ms new/live, 0 page errors |
| coop-e2e | PASS 68/68 (incl. the new "same Thái hậu picture" check at start / each week / rejoin) |
| coop-e2e COOP_SWAP=1 | PASS 68/68 |
| old save with S.thO.fid "thaihau:h1" saved + reloaded (own probe) | PASS — no crash, redraws consort:c29 (own th robe a51), h1 freed |
| BAL.ageBand scan (every reader) | PASS — band4/BAND4N (j35), pidBand (j66), kcBand + KC_AB (jkc), jstaff figRec, j28 ageBandOf (uses B[0],B[1] only), tagBand numeric path → all follow BAL; no typed 26/36/51 left. Nits (not FAIL): ageBandName lo=18 typed (min age); jtut:63 tutorial ma ma fixed "a51" portrait (fixed picture, not age-driven); jstaff giveFace still requires an a51 maid file to choose an elder face (selection, not band). |
| ONE selector (law 4/9) | PASS — jfigx only wraps figIndex / figTier / figTierOf / f88Wear / figRoles / figPick / f88Best; th + v rows kept out of FIGIX (FIGXT); no second private picture list |
| figVOf determinism / two seats | PASS — wdHash(fid + Emperor name) % BAL.figVar; fid = pid for her (j66), LOOK carries fid/pid to the friend's record, so both seats compute the same colour |
| LOOK Fold 755x1000@2 + iPad 1180x820@2, both together, looked 3× (fig-wiring-shots.js, 5 looks: th51, th65, her65, herV1, herTH) | PASS — own th robe a51 → a65 on the same face; her Hoàng hậu at 70 = t8 a65; colour v1 at 26; her after road a = own th robe; no cut text, no overflow, kit frames unchanged. Shots kept in reviewer scratch only (not in git, not on CDN). |
| FOR C missing-art list | PASS — present (a65 t1–t6+cold ×32, t7/t8 a65 ×11, maid/ma ma a65, th robe for 60 maid/ma ma faces) |

### FAIL items (worker fixes on review/art-wiring-1119-r1 or remerges it)
1. **Thái hậu face drawn before FIGURES-x.json has loaded (race → the approved Thái hậu robes are skipped for that whole life).** figThPick runs on the first render after start(); FIGURES.json is in, FIGURES-x.json (figxLoad, separate fetch) often is not yet, so `good` (faces with a th robe) is empty and she draws from all 92 faces. Own probe, 8 fresh games: **3/8 drew a maid face** (maid:m25 / m07 / m40 → fig-maid-mNN-t8-a51 = a maid face in the Hoàng hậu t8 dress) while 20–30 consort faces with a painted th robe were free; the face is for life, so she never shows the approved robe. Fix: do not draw the Thái hậu face until FIGXT is loaded (figxLoad done, also when the CDN answers 404/empty), and re-check on the first FIGXT load (a face drawn before the load and not yet painted-preferred may be redrawn once, before any reload has shown it — or simply never draw early). Add the race to fig-wiring.js (fresh start() → read S.thO.fid after FIGXT loads; must be a th-painted face while one is free; run ≥ 8 fresh games).
2. **Old save mid-reign: the t7/t8 dress colour changes on the first reload under this build.** figVOf = hash(face + Emperor) has no memory, so in an old save every t7/t8 woman (her included) whose hash ≠ 0 switches from the v0 dress she already wore to v1/v2 mid-reign (≈ 2/3 of them) — brief check (3) asks that a picture already seen mid-reign does not change on reload. Fix (small): pin v0 for the reign running when the save is first loaded under this build (e.g. a stamp S.figVR = S.emp.name set once for old saves; figVOf returns 0 while S.emp.name === S.figVR); new games and the next reign use the hash. Prove with an old-save probe (save from origin/main with a t8 queen + her at t8 → load on the branch → same file names).

Not FAIL (notes for the worker while fixing #1): on the co-op GUEST, before the host's Thái hậu face arrives, figFor({kind:'th'}) returns "" (stage keeps its default token) — transient (coop-e2e sees the same picture within its 20 s wait); if the #1 fix changes the "not drawn yet" state, keep it non-blank (law 6c).

Laws touched: 1 (her + NPC same rule) PASS · 4 (BAL.ageBand / BAL.figVar, all readers follow) PASS · 6c (never blank) PASS in the 15,064-cell gate, see #1 note · 9 (no UI change, kit figure frame) PASS · 12 (Fold + iPad together, 3×) PASS · 13 PASS · 18 (no colour picker built; FOR MAIN KIT REQUEST noted) PASS.
VERDICT: **FAIL r1** (items 1–2). Re-review = SMALL (code in jfigx.js + fig-wiring.js only), rerun fig-wiring + quickcheck + coop-e2e.

## FIX r2 (worker, 19/11 ~04:20Z) — SẴN SÀNG KIỂM 84530d067ea6bccc65964fb9e12630134271f5a8
Branch review/art-wiring-1119-r2 = review/art-wiring-1119-r1 @ 1853c22e (main 1cf5e8bb, still LIVE) + 1 commit 84530d06. Files: dev/build/jfigx.js, dev/build/jbal.js (+BAL.figxTry), dev/test/fig-wiring.js, generated index.html/sw.js.
| item | fix | proof |
|---|---|---|
| 1 race | figThPick draws NO face until img/FIGURES-x.json is in (figxLoad.ok), or after BAL.figxTry = 3 failed reads (offline / file gone); meanwhile figFor returns "" and the stage keeps her old portrait (faceFor "thaihau", j17), never blank. Whole group: the only permanent pick that reads FIGURES-x is the Thái hậu face (colour + th/a65 picture choices are re-made every render, nothing stored). | fig-wiring race ×8: pre-load pick = null 8/8; post-load = consort face with a painted th robe 8/8 (raceBad 0) |
| 2 old-save colour | figVPin: a save first loaded under this build pins v0 for the reign running then (S.emp.figV0 = S.emp.era; S.emp is a world key, written by host/solo only, guest reads the host's); start() stamps a new life (S.figVStamp) so it is never pinned; the next reign (another era) wears the colours. ALSO FOUND: S.emp.name does not exist in the game, so r1's hash was per face only, not per reign → hash now uses S.emp.era. | fig-wiring pin: old save same reign → 0; old save next reign → hash (2); new life → hash (2) on consort:c03 (a face with hash ≠ 0 in both eras); pinBad 0 |
Gates on 84530d06: fig-wiring 14,938 cells 0 blank 0 bad + race 0 + pin 0 (cell count varies with her random face, skipped for NPC cells) · quickcheck PASS (old save ok; render 195/186 ms) · one-core-guard PASS · coop-e2e 68/68 (same Thái hậu picture c16 th a51 both seats, every check) · coop-e2e COOP_SWAP=1 68/68. Test route now retries CDN manifest reads (one run timed out on a dropped FIGURES-servants.json read).

## REVIEW r2 (SMALL, same reviewer session_01N1tNP6nQ6XCj5Xu1dFX9af, 19/11 ~04:50Z) — PASS → READY FF 84530d06
PRIORITY #1 CHECK: same as r1 (OD 3 | main 0 | review/* this job only | claims worker 59FAL2oq). Branch review/art-wiring-1119-r2 @ 84530d06 descends origin/main 1cf5e8bb (still LIVE at verdict; maid-ladder-6 not landed yet). Rebuild = build line only.
| check | result |
|---|---|
| FIX 1 race — own probe, 8 real fresh games (start() → render → FIGURES-x arrives later) | PASS — 8/8 drew a consort face with a painted th robe (c27, c16, c02, c14 …), 0 maid faces (r1: 3/8). Before the rows arrive figThPick returns null → stage keeps the old faceFor "thaihau" portrait (not blank); BAL.figxTry = 3 failed reads then draws anyway (law 4: from BAL) |
| FIX 2 pin — own probe: save with 4 t8 consorts (hash v1/v0/v1/v2), stamp removed = old save → reload | PASS — pinned (S.emp.figV0 = era), c20 back to v0 file; second reload still v0 (S.figVStamp=1 persists); era changed (next reign) → unpinned. Fresh game: 8/8 not pinned (stamp set by start(), no figV0 written) |
| hash key | S.emp.era (S.emp.name never existed → r1 hash was per face only; now per face + reign, as designed). Guest never writes figV0; emp is a world key → both seats same |
| fig-wiring.js (with r2 race + pin parts) | PASS — 15,064 cells 0 blank 0 bad, race bad 0, pin bad 0, page errors 0 |
| quickcheck (old save from LIVE, core gates incl. one-core-guard) | PASS — render 239/210 ms new/live, buổi 1137/1036 (run right after two coop-e2e runs on this box) |
| coop-e2e / COOP_SWAP=1 | PASS 68/68 / 68/68 (same Thái hậu picture on both seats at every check) |
| LOOK | not re-shot: r2 changes only when the face is drawn and the colour pin; r1 Fold+iPad looks stand |
Laws 1, 4, 6c, 9, 13, 18: PASS (unchanged from r1; new number BAL.figxTry in BAL).
VERDICT: **PASS r2 — READY FF 84530d067ea6bccc65964fb9e12630134271f5a8** (descends main 1cf5e8bb). If maid-ladder-6 lands first, this needs a final-merge + rerun (touches jbal*).
