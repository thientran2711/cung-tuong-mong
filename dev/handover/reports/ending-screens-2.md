# ending-screens-2 — owner marks #52 «Học thành tài» + #84 «Sang buổi» full screen (Foreman B ROOT-5; worker session_01N1tNP62bqNSeKx77seTxeP)
PRIORITY #1 CHECK: OD 21/11 marks #52 #84 (OWNER_MARKS_2111.md rows 154/186) | main 666def0c: jlevel.js kitLearn §86, jne.js kitNewDay §62 (the «Bình minh mùa xuân · Tháng ba» screen of her shot — NOT jbuoi.js §74, which is the auto buổi wash with no button), j93.js 81b `.km-full` (reused) | review/* review/ending-screens bffc0a56 (KIT §91 jend.js, endings only — not on main, so not importable; same look rebuilt as the shared kit part 81c here) | claims CLAIMS row ending-screens-2 (this session)
START_CTX ≈ 4 % of 1M window (rollover not needed).

## Branch
review/ending-screens-2 @ e8847011 (from LIVE origin/main 666def0c). TIER BIG (kit part change: new KIT 81c used by two kit parts).

## What changed (kit first, law 9: every caller follows)
- **KIT 81c kitFullPic (j93.js, NEW shared part):** THE full-screen scene picture — covers the whole screen (no frame / border / dark band), soft top + bottom shade, the scene's words + ONE button lie on it. Orientation by KIT §0 (kitSzMode kv1/kv2, media-check clean): phone = `img/<key>-port.webp`, iPad = `img/<key>-land.webp`, only when the key is in `img/INFO.json` have (Foreman C adds it with the art → no code change, no 404). Fallback = the scene's own picture, "cover" or "blur" (small card picture: blurred fill + sharp whole picture in the middle). While open, the room's lean-in emotion seal clone (span.kemo-big, z 9990, jemoseal) is hidden — it floated over the Bình minh picture before (pre-existing, seen in the before shots).
- **§86 kitLearn (#52):** full-bleed scene (81b `.km-full`) on 81c; header top, card (bậc + gains + «Tiếp theo») bottom, both on the picture. One painting per subject `learn-<art|vir>-<k>-<port|land>` (ART REQUEST); until then the skill painting (act-cat-hoc-tap today) in blur mode. The old one-off `img/scene-thanhtai.webp` request (404 on every scene) is replaced by the per-subject paintings (canon overwrite in KIT §86).
- **§62 kitNewDay beats (#84):** every beat (lonely / custom night, season dawn, festival dawn) = full-screen picture (`.kne-pic.kfull`), title + line + «Tiếp theo» on it, host padding 0 (no black band). Portrait/landscape variants via 81c; until then today's 4:3 painting cropped to fill around its FOC focus. The night-end CARD (kitNightEnd, a result card with rows) is unchanged.
- **Bug fixed in the family (law 11):** `kitLearn({t})` from jky.js (a new Tứ đức lối) built an EMPTY overlay with no button (stuck screen until reload). Now the same scene with its line, no bậc; an unknown call returns without an overlay.

## Family scan (law 11)
| caller | part | before | after |
|---|---|---|---|
| j2 addArt hook (every tài nghệ road) | kitLearn | portrait card centred on dim game | full-screen picture |
| j85 addVir hook (Công Dung Ngôn Hạnh) | kitLearn | same | full-screen picture |
| jky.js:201 kitLearn({t}) new lối | kitLearn | EMPTY overlay, no button | full-screen picture + line + button |
| jne dawn() → kitNewDay: lonely beat | §62 | framed 4:3 on #0e0b1c | full screen |
| kitNewDay: custom (theo lệ) beat | §62 | framed | full screen |
| kitNewDay: season dawn ×4 | §62 | framed | full screen |
| kitNewDay: festival dawn ×14 (ev-fest-<k>-b) | §62 | framed | full screen |
| other 81b full-bleed scenes (jtoil ktrv-ov, jflip kcf) | own backdrop | unchanged (already full) | unchanged |

## Tests (on e8847011)
- node dev/test/fullscreen-scenes.js (Fold 755x1000 + iPad 1180x820; learn art / vir / t / real addArt hook / subject art via INFO.json; newday 1 beat / lonely+fest 2 beats / port-land art): 178/178 PASS
- node dev/test/night-end-r3.js (night card unchanged; beat check now = picture full + caption clear of button): night card geometry unchanged; B afterBtn 1
- node dev/test/scenes3.js: no errors
- bash dev/tools/quickcheck.sh e8847011: QUICKCHECK PASS (core gates PASS, time-spill PASS, old save ok, perf new/live median render 247/247 ms, tab 498/442, buổi 1126/1440)
- COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js: run 1 90/92 (only the tail was kept, failing names not captured), run 2 with full log 92/92 PASS — run-1 misses read as flakes; reviewer please re-run once
- Shots looked at 3× (Fold + iPad): CDN img/_review/ending-screens-2/ (verdict giver wipes).

## ART REQUEST
Posted in FOREMAN_C_STATUS.md (21/11 05:35Z): (A) 20 subject paintings learn-<art|vir>-<k>-<port|land>; (B) 8 portrait new-day pictures kit/ne-dawn-*-port + kit/ne-night-lonely-*-port (optional -land + festival -port later). Each lands by adding its key to img/INFO.json.

## Notes for reviewer / MAIN
- Brief named jbuoi.js §71 for #84; her shot («Bình minh mùa xuân · Tháng ba · trời quang» + «Tiếp theo» on a dark page) is kitNewDay (jne.js §62). jbuoi (§74) is the button-less buổi wash, already full screen, untouched.
- review/ending-screens (§91 jend.js) and this branch touch different files; 81c could later carry the §91 background too (one picture layer) — left to the merge order.

## REVIEW r1 (opus BIG, session_01N1tNP2Qz7ZpRucbeYRu2hN, 21/11)
PRIORITY #1 CHECK: OD 3 (OWNER_MARKS_2111 #52 #84) | main 0 | review/* review/ending-screens bffc0a56 (§91), review/ending-screens-2 e8847011 | claims worker 62bqNSeK
**VERDICT: PASS da613d5a1cf086298eec3149bdd6e58244d6a533** = review/ending-screens-2-r1 = e8847011 + merge origin/main 068662ad (only sw.js/index.html conflicted → rebuilt by assemble.py + build_site.sh); main is an ancestor (FF ok).
- Laws touched: 9 KIT FIRST — 81c is a kit part written in KIT.md + used by both kit parts (§86, §62); no private per-screen look. **KIT OK pending keeper**: keeper session_01Rc5AsMtjP4KTgBZVjENGLs is gone ("not found" on send_message/get_session) — Foreman B/MAIN please route the OK to the current kit keeper. 11 FAMILY — every kitLearn caller (j2 addArt, j85 addVir, jky {t}) and every kitNewDay beat (lonely, custom, 4 seasons, 14 festivals) go through the changed parts (grep checked). 12 TWO DEVICES — Fold 755x1000@2 + iPad 1180x820@2 looked 3×. 7 wording: no new player words besides existing «Học thành tài» / «Tiếp theo». Laws 1–6: no numbers/rules touched.
- Overlap 81c vs §91 kitEndScreen (review/ending-screens): NOT a duplicate. §91 = an ending DIALOG frame (flowers, drapes, tone ring) on a full-screen background; 81c = the full-screen PICTURE layer only. One-per-kind: 81c should be THE picture layer — when both are on main, §91's background layer  should be rebuilt on kitFullPicHTML (same cover/blur fallback, port/land via INFO.json). Not blocking (different files).
- (2) INFO.json gating: kitFullSrc only asks -port/-land when the key is listed in KIT_INFOM.have (j79 fetch, already live) → no 404 with no art; fallback looked: Học thành tài = blurred fill + whole skill painting (iPad shows the portrait painting in the middle until C's landscape art — expected interim, owner's "ngang nguyên màn hình" completes with ART REQUEST A); Sang buổi = 4:3 painting cropped full screen, looks right.
- (3) kitLearn({t}) family bug fixed: scene shows title + line + button (card holds only the button — nit, OK).
- (4) span.kemo-big hidden while open (fullscreen-scenes checks open/closed) PASS.
- (5) coop-e2e ×3 on da613d5a1cf086298eec3149bdd6e58244d6a533: 92/92, 90/92, 92/92. The 2 misses = «start / after week 1: both seats show the same Thái hậu picture» (seat B picture empty) — PRE-EXISTING known flake (seen before on LIVE lines: person-minigame-acts r4 «first run 66/68 = both se…», FOREMAN_E_STATUS); not in files this branch touches.
- Tests on da613d5a1cf086298eec3149bdd6e58244d6a533: fullscreen-scenes Fold+iPad @2 178/178 PASS · quickcheck PASS (core gates PASS, time-spill PASS, old save ok, render 235/213, tab 497/504, buổi 1303/1451 ms) · night-end-r3 Fold+iPad: picFull true, capClearOfBtn true, afterBtn 1 (only error = file:// VOICES.json fetch, test harness) · scenes3 errs [].
- Shots: scratch only; CDN img/_review/ending-screens-2/ wiped (8 objects).
