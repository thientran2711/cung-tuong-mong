# ev-pic-fig — event scene picture + figure scale (owner bug OD 19/11 ~04:15Z) · review/ev-pic-fig 946a2900
PRIORITY #1 CHECK ('event picture' / 'figure fill' / 'kszEvLaw10' / 'kszFeetFit'): OD 18/11 ~16:05Z law 10, ~16:10Z (KIT 56.6), ~21:20Z (1) "figure FILLS the left column", 19/11 ~04:15Z | main jksize.js kszPicStep3 / kszEvLaw10 / kszFeetFit, dev/test/scene-pic-scan.js (reused as harness) | review/* none | claims none (row 226 = this worker).
START_CTX ~5 % of 1M; depth 2. Base: origin/main f43a2ba6.

## Cause (both bugs, one kit file dev/build/jksize.js)
1. **Picture missing**: kszEvLaw10 (opt-card-short #5) had a 2nd step "options still scroll → picture DROPPED" (`data-evfit="x"` = display:none). Every option frame whose cards scroll lost its picture on Fold (night1, night2, prep, giftpick, plantpick, vl*, vnight, tsgiftpick, pgin, rcpacc, j70def, e68hairpinThief, giftto) and on iPad it was the 56 px NS sliver. The picture existed (ev-night1-v2.webp) — it was hidden, not unmapped.
2. **Figure small and high**: the figure body = the class body XL3 393 px always; opt-card-short-b lets the frame grow with content (Fold night1 body 731 px), so the figure (418 px) stood at the top with a 266 px empty band under the feet.

## Fix (kit, whole group, no per-dialog size)
- KIT 56.6 canon-overwritten in place: the picture is never dropped. New `kszEvStrip3` = THE STRIP (standard narrow ratio NM 300x84 at the column width, at most NL: Fold ≈ 304x85, iPad ≈ 602x140). kszPicStep3 uses a class below the strip only when it removes the scroll; a scroll nothing removes keeps the strip; kszEvLaw10 (options scroll) sets the strip, never hides.
- KIT 56.17 (new): `kszFigFill3` — after the size pick (`kszLivePick3` sets `dlg.__kszFill`, never inside the picker so sizes still pick by content), when the body is taller than the class figure column, the ONE body of the frame grows so the column (tag + plate room + Hoàng hậu crown room + skull→feet) reaches the body floor: min(cap room, info column height). Same factor for everyone in the frame; true proportions; feet on the floor; class bodies stay the minimum.
- Scan fix: figure-head-fade-scan "same class, different body" now keys device + frame kind + class (the old key compared Fold vs iPad / news vs choice, which 56.17 makes legitimately different).

## Before / after
Scene picture (dev/test/ev-pic-coverage.js, 138/135 PEND ids opened in maid + consort life + Q kinds, Fold + iPad):
| | frames with a picture slot | picture shown | NOT shown |
|---|---|---|---|
| before f43a2ba6 | 263 | 247 | **16** (list above, 15 Fold + vase iPad) |
| after 946a2900 | 254 | 254 | **0** |
Static: 225 PEND ids; 140 resolve to an own painting by id, the rest by title meaning group (jevfit) at open time; live sources: own 126 Fold / 122 iPad; **placeholder (ph-*) 3: thInv, thBribe, giftto** → FOR MAIN below. No ART ORDER needed (fitting paintings exist, looked at).

Figure (dev/test/fig-col-fill-scan.js; body = visible frame body; fill = painted top→feet / body):
| frame | Fold before → after (fill, bottom gap px) | iPad before → after |
|---|---|---|
| night1 XL (many options) | .572, 266 → **.882, 26** | .803, 56 → **.837, 38** |
| e68snowDay XL | (S portrait in that run) → .826, 22 | .778, 38 → .783, 38 |
| tt3 XL | .839, 0 → .839, 0 | same |
| choice-2 / notice M | .88, 0 → .88, 0 | same |
| info-long XL | .908, 0 → .912, 0 | .873, 19 → .867, 19 |
| person dialog / shop | .71 / .78 unchanged (56.15 / kitDpFit) | same |
| identity card | .68 unchanged (KIT 56.11 book size, owner-approved; printed only) | .71 |
iPad bottom gap ≈ 38 px = the worn-title plate room (56.4) + body padding.

## Gates
- quickcheck vs live: **PASS** (186 s, old save ok, core gates PASS; buổi 996/1255 ms). (A first run in parallel with 3 scans showed buổi 2771 ms = CPU load; alone it passes.)
- scene-pic-scan: rc 0. ev-pic-coverage: rc 0 (0 hidden). fig-col-fill-scan: 0 FAIL. fullbody-frames-scan: ALL OK (spread ≤ .09 %). figure-head-fade-scan: rc 0 (0 FAIL after the key fix; news widest robe 34 px under the text = 56.14 printed, owner rule 56.4).
- coop-e2e: **BLOCKED by network** (room create fails: the Worker host is refused by this container's proxy, ctm-rank…workers.dev connect_rejected; st "off", no room code) — not caused by this change (frame layout only); please run it where the Worker is reachable. Old save loads (quickcheck).

## Shots (looked, Fold 755x1000@2 + iPad 1180x820@2, before | after side by side)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-night1-755x1000.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-night1-1180x820.jpg (real path: Kính sự phòng prep → «Để mộc, tự nhiên» → «Đêm thị tẩm»)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-tt3-755x1000.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-tt3-1180x820.jpg (Mệnh truyện, unchanged = already right)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-ge1-755x1000.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-ge1-1180x820.jpg (Vật liệu vlget: picture back, figure fills)
https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-snow-755x1000.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/cmp-snow-1180x820.jpg (e68 Tuyết đầu mùa)
Singles: https://ctm-img.victoria-tntt.workers.dev/img/_review/ev-pic-fig/{before,after}-{night1,tt3,ge1,snow}-{755x1000,1180x820}.jpg

## FOR MAIN
1. EVENTS.json (the ONE event→picture table, CDN; not pushed by me — a manifest push is live at once): add to `events`: `"thInv":"hao-huu"` (co-op friend befriends / gifts → two friends at the moon gate), `"thBribe":"hoi-lo"` (bribe → silver pouch), `"giftto":"qua-tang"` (gift chest → gift box). `cdn_sync --pull img/EVENTS.json`, add 3 keys, push the named file. Then ev-pic-coverage shows 0 placeholder.
2. Seen, NOT in scope (pre-existing, owner OD 18/11 ~07:25Z (1) "info fixed, only buttons scroll"): on iPad the XL option frame scrolls the WHOLE #mb (picture + text + options together; R.maxHeight = max(L, k3body.clientHeight) feeds on itself → 883 px), the last card is clipped at the frame edge with no «Kéo xuống». Fold scrolls only the info column. Suggest one kit job.

## r1 addendum (MAIN ROOT-63/64 messages 04:37Z–04:55Z) · review/ev-pic-fig 739bfdf3
- Merged LIVE main 7fb7c104 (contains fd6118cd art-wiring-1119) → eb54037f; generated files rebuilt. Quickcheck vs live **PASS** (189 s, old save ok, core gates PASS).
- Owner scope OD 19/11 ~04:55Z: ev-pic-coverage now REQUIRES the picture only in M / L / XL frames; S / narrow frames are listed apart (never a figure added to S). Merged build: M/L/XL frames 262, picture shown 262, NOT shown 0; S frames opened by the PEND pass 0 (the Q-kinds news / S choice keep their left picture, see table).
- Size table (kitFramePick3 / kszLivePick3 data-ksz; expected = KIT_SIZE.fig[KIT_SIZE.lay[size].fig].h on main = fig3 M 284 · L 351 · XL 393 (KIT 56.12/56.8; the "XL 480" in KIT §v3 (2)/(9b) is the older table, overwritten by 56.12); measured = skull→feet px; band = .k3ev / S left picture):
| frame | dev | size | expected body | measured before | measured after | band before | band after |
|---|---|---|---|---|---|---|---|
| night1 | Fold | XL | 393 | 393 | 606 (56.17 fill) | NO (hidden) | yes 85 px strip |
| night1 | iPad | XL | 393 | 393 | 409 | 56 px NS | yes 140 px NL |
| vlget | Fold | XL | 393 | 393 | 589 | NO | yes 85 px strip |
| vlget | iPad | XL | 393 | 393 | 393 | 56 px NS | yes 140 px NL |
| tt3 | Fold / iPad | XL | 393 | 393 | 393 | 85 / 168 px | same |
| info-long | Fold / iPad | XL | 393 | 393 | 393 | 85 / 140 px | same |
| notice | both | M | 284 | 284 | 284 | 82 px | same |
| choice-2 / news | both | S | (no figure: picture left) | – | – | left 67 / 160 px | same |
  So the night path DID pick XL and the class body; the faults were (1) the band hidden by kszEvLaw10 step 2 and (2) the frame growing with content while the body stayed the class value — both fixed in the kit for every frame kind.
