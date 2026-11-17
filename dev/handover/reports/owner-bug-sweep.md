# owner-bug-sweep report (sonnet worker, 11/17/2026 ~03:00Z)
Basis: live main = origin/main 7abaf07ac (batch-0132). Branch states come from dev/handover/CLAIMS.md + reports as of 11/17 ~02:30Z (review/* not fetched; merge state of branches not checked with git). Mostly code/test/report evidence, no headless shots except none; art on CDN not visually re-checked. Co-op items are NOT jobs: "-> coop-thin (Foreman B)" (owner stopped co-op patching, OD 11/17 02:05Z). Ideas are not bugs (see PARKING_LOT).
Ledger: OWNER_LEDGER.md §2/§3 rows and §7 D-items rewritten in place (184 rows, status ends "(17/11 sweep)"); §4 rows and extras listed in new §8. The ledger had gone stale: most "NOT DONE / BRANCH" rows are now LIVE.

## (1) NOT FIXED on live main, grouped into whole jobs (UI first)
### UI jobs main can take
| Job | Items | Where / kit part | Size |
|---|---|---|---|
| kit-ico-wire | C42 placeholder pictures by real orientation/size (K-ICO-2); C44 painted download/update status icon; K-ICO-1 rail calendar/goal icons. Art already on CDN (ph-p-*, ph-l-*, ph-w-*, ph-s-*, ico-download/ico-update/ico-cal/ico-goal), nothing referenced in code | jksize.js:236 still ph-act-light/ph-event-light; jstatus.js glyph is text; jrail | S-M |
| demotion-scene | S3-82: above-rank items confiscated in a scene (eunuch + tray) on demotion/cold palace. Only kitGloom FX + jdh2 title-item confiscation exist | kitGloom (KIT 66.2), person dialog (Nội vụ phủ eunuch), kitItem tray | M |
| bieu-qua-lam-lanh | S3-209/D19: "Biếu quà làm lành" also accepts a work/item of equal value; no such act in j*.js, API jlux.luxGift(k,from,to) is ready | act card + gift picker kit | M |
| level-up-scene | S3-203/D14: painted "Học thành tài" level-up scene; no code, no art key | fxkit (live) + painted scene | M |
| presentation-wiring | S3-151/182/205 remaining animations (slap, death, pregnancy, birth, poisoned, alliance, harm, poison, rumour, seal; 2 of 13 live); S3-152 entrance animation (edict scroll) + 9 origin frames (needs KIT REQUEST + art); S3-181 frame art per group/main/side; S3-180/D11 group voices | jpres.js hooks, jfxkit.js | L |
| place-names | D36/OD:L1475: poetic Hán-Việt names for every hall, side hall, pavilion; generic "chính điện / Đông-Tây phối điện" still shown (jpm.js, 10 uses). PARKING_LOT #3, no worker, needs history expert first | jpm.js place labels, name table | L |
| night-ledger | C22/C26: 10-night ledger, cycle by day, Hoàng hậu auto day 1/15 not in flip, extra-night notice. review/night-ledger does not exist; waits for review/night-final PASS | j75, jcycle, kit notice | L |
| emperor-poison-road | S3-174/D8: no player road to poison Emperor/Thái hậu (jpoison.js forbids). Feature freeze (OD:L1402) | - | M |
### Art jobs (Foreman C)
| Job | Items | Size |
|---|---|---|
| appearance-art-2 | S2-59/D43: pregnancy figures, nun, dưỡng nhan glow, grey strands, smallpox not drawn (jface.js:12 "Postponed") | L |
| art-complete-rest | S3-207: CDN has only 20 of 128 player-look figures, no sign of the 56 old-love men | L |
| residence-rooms-art | D30/D51/D52: every residence = chính điện + bedroom per rank (OD 11/17 01:45-02:05Z); nothing drawn, code placement not assigned | L |
| fig-cutout-clean family | huadian too big/r3 FAIL list (S3-131, B12, D12), mole audit (S4-mole/D23, paused), fig export >=1100 px (S4-figexport/D44, figures <=900 px), anatomy/back-turned audit (D13/D14), Luân hồi cut-out (D10/D11): all ride on the whole-figure repaint (review/fig-cutout-clean, branch NOT pushed, W1-W7 running) | L |
### Non-UI jobs (foremen)
| Job | Items | Size |
|---|---|---|
| staff-cap | B18/OD:L1155: 9 servants/palace still (jpromo.js:20 BAL.promo.cap up to [5,4]); no owner ruling on total-people cap yet | S+M |
| origin-bd-branch | B37/OD:L1213-1220: Bắc Địch still a separate 10th origin (jorigins.js), not a branch of hòa thân; review/origins-r1 PASS 968ed007 not on main and keeps it separate | M |
| one-core-legacy | B56/OD:L1267: guard live, ~6691 legacy typed numbers frozen in code (one-core-baseline.json) | L |
| npc-agent AG2/AG3 + maid nights | C28/C53: only AG1 on review/npc-agent-r1; Emperor-picks-who and maid nights not built | L |
| her-allergy | S4-allergy/D39: her own recipe allergy not modelled (PROGRESS_recipes.md L48) | S |
| bot-proof-hint | S3-126: UI/hints live, but bot proof hint > random missing (PROGRESS_balance-pass.md: about equal); lever BAL.ctxTaste 12->18 / ctxCap 22->30 | S |
| housekeeping | IDEAS_OPEN.md items 1-9 still "Open" (all built/decided); coordinator moves them to Closed | S |
### Needs the owner (not a build job)
S3-33 repo history slimming (yes/no). Kit requests kitRankList/kitRankRow/kitRankFoot block the leaderboard.

## (2) ON BRANCH, waiting
- review/fig-feet-crop-2 c269e2fc9: owner repeat OD:L1459/L1492/L1494 (feet cropped in figure dialogs) READY FOR REVIEWER. Highest-value: owner has said it twice.
- review/fig-cutout-clean (Foreman C, W1-W7 running, not pushed): A53 face blur, B21 sharpness, D10-D14, D20, C37 proportions; plus review/fig-proportion-redo (old people).
- review/foreign-princess-samples (B35, C02, C07, NC v24/v25, BD ranks).
- night family: review/night-final (D39, D40, D43, C23 flip at start of evening, no PASS yet), review/npc-agent-r1 (C52/C53), review/npc-death-r1 PASS 5f58a715 held for the j95 place record (S3-189/190, D4), review/npc-roads-fx running (B45/S3-192/D5).
- balance: review/balance-core-r2 (D44-D46 talents start too high, all stats fit origin; r2b early-death check running; ships only after owner agrees proposal §7); review/batch-0232 (story roads, balance re-measure, B BASS PASSes road-b2-fix-r2, road-b3-fix2-r1, emotion-acts-3-r1 [C12], diff-remeasure-r1, tut-followups-r1).
- review/rank-port-r2 (leaderboard S3-41/84): blocked on kit requests A/B.
- review/veil-zoom-r3 PASS d236f309 not on main (S4-veilzoom/D25, no Zoom-follow in KIT.md).
- review/names-unique (D06) PASS but HELD (co-op names diverged).
- origin intros + "Chờ 3 năm" choice (B43/B44): held out of main for a performance problem.
- art waiting for owner verdict: Nội vụ phủ scene (B48), place glyphs v2 (B49), podium backdrop (B55), makeup room too vivid (D28), title plates (C10), item art audit (C18), item conservation/ledger (C16), health+pregnancy bundle (C56).
- Re-verify on a real device: iPad Home-Screen double download (ios-install-first merged), iPad stuck skeleton (A54, test-only), iPad header/tab bar (D24: hotfix scope only), one test "promo-rules at 755 reveal shown" still failing in CLAIMS.

## (3) Counts (slice tables below; the OD slices A-D and ledger slices E1/E2 overlap, so do NOT add them up)
| Slice | rows | LIVE-FIXED | ON-BRANCH | NOT-FIXED | COOP | CLOSED | IDEA/RULE | UNVERIFIABLE |
|---|---|---|---|---|---|---|---|---|
| A OD L836-1040 | 68 | 54 | 1 | 0 | 4 | 5 | 3 | 1 |
| B OD L1040-1300 | 65 (+6 listed) | 45 | 10 | 3 | 4 | 3 | 6 | 0 |
| C OD L1300-1440 | 66 | 46 | 12 | 5 (3 jobs) | 1 | 1 | list | 1 |
| D OD L1440-1496 | 57 | 24 | 17 | 1 | 6 | 9 | 0 (+4 parking) | 0 |
| E1 ledger §2-3a (non-LIVE rows) | 54 | 49 | 2 | 2 | 0 | 0 | 0 | 1 |
| E2 ledger §3b-7 (non-LIVE rows + D1-D49) | 148 | 104 | 9 | 24 | 5 | 2 | 4 | 0 |
Distinct NOT-FIXED jobs: 8 UI, 4 art families, 7 non-UI (above). Co-op items: 20 rows -> coop-thin (Foreman B).

## Handover (worker)
No rollover needed (low context); successor not needed. Details of every item: appendix tables A-E2 below.


# Appendix A

# Sweep A: OD:L836-L1040 (owner bugs/complaints, 15-16/11 session 8)
State checked on origin/main 7abaf07ac (shallow clone: "merged" = PROGRESS file + test + code present on main, or CLAIMS/queue LIVE line). 11/17/2026.

| ID | short ask | OD/ledger ref | verdict | evidence / where | UI? | size | job group |
|---|---|---|---|---|---|---|---|
| A1 | Redraw bad hands on Thỉnh an Hoàng hậu picture; audit all act pics for hands | L836-838, ledger 228 | LIVE-FIXED | act-pics2: hands redraws + 24 bad pics live on CDN (L969); remaining keys done by art-complete-p2 (CLAIMS L401 DONE); act-hanh-le-v2 in pic-dupes | Y | - | - |
| A2 | Show shared pop-up kit sample page | L841 | LIVE-FIXED | jkitpage.js:119-151 kitPopSample (§8 samples), dev/test/kit-popup-sample.js | Y | - | - |
| A3 | "Nghỉ ngơi" and "Đọc sách" acts share one picture | L844 | LIVE-FIXED | review/pic-dupes: act-nghi-ngoi-mot-lat / act-doc-sach-giai-khuay (PROGRESS_review-pic-dupes.md:25); dev/test/pic-dupes.js | Y | - | - |
| A4 | Act card text broken: stray ")", cut "(", "+1..2" | L847 | LIVE-FIXED | review/act-text + act-text-r1 on main (PROGRESS_review-act-text.md; scan brk 0 dots 0 frag 0; dev/test/act-text-scan.js); "+1..2" only in comments now | Y | - | - |
| A5 | Khắc chip red per buổi, must use whole-day khắc | L849-852, L886 | LIVE-FIXED | review/khac-day r1 PASS 2d038139e LIVE (SESSION8_QUEUE C21; PROGRESS_review-khac-day.md) | Y | - | - |
| A6 | Old unstyled skeleton flashes on open | L854-856 | LIVE-FIXED | boot-flash-r1 PASS 20f4d7c9e (kbootDone in index.html, 12 hits; test boot-flash.js, boot-slow.js; PROGRESS_boot-flash.md) | Y | - | - |
| A7 | Thơ minigame too hard (and all knowledge minigames) | L858-861 | LIVE-FIXED | review/mg-easy on main: PROGRESS_mg-easy.md, dev/test/mgeasy*.js, mgeasy refs in index.html (11) | Y | - | - |
| A8 | Rank line needs same halo as name on stage | L863-866 | CLOSED | Superseded by L889 (only her) then by KIT §48.1d/e 16/11 13:55Z (glow on paintings for everyone, plain on paper); KIT.md:2824,2840 | Y | - | - |
| A9 | Tapping Mệnh truyện chapter shows nothing; no dead taps | L868-871 | LIVE-FIXED | review/chapter-detail on main (PROGRESS_chapter-detail.md, test chapter-detail*.js, kitChapterDetail refs 18); goal strip also tappable (see A47) | Y | - | - |
| A10 | Whole pane bounces on any tap | L873-876, L1036 | LIVE-FIXED | press-fx-r1 PASS 2afdafc39 LIVE (jfx kfTapOf; SESSION8_QUEUE C25; test press-fx.js) | Y | - | - |
| A11 | Stat +/- too fast; glow changed cell, green for plus | L878-880, L891 | LIVE-FIXED | jstatfx.js (kitStatFx/kitStatGlow, KIT 57.1), stat-fx-2-r1 merge a2603a1d3 | Y | - | - |
| A12 | Buổi change page-flip looks odd -> time-of-day transition, Magnific-painted | L883-885, L892 | LIVE-FIXED | jbuoi.js + dev/test/buoi-transition.js on main; assets.json has buoi-wash/buoi-mist (CDN upload done after the 401) | Y | - | - |
| A13 | Stage glow only for her (ruling) | L888-890 | CLOSED | Superseded by KIT §48.1d/e (everyone glows on paintings, 16/11 13:55Z) | Y | - | - |
| A14 | "‹ Phòng" empty bar -> room icon button | L894-897 | LIVE-FIXED | jk3.js:270 k3room button, dev/test/room-btn.js, PROGRESS_room-btn.md (phone shell only by design) | Y | - | - |
| A15 | Giao tình relation pickers waste space | L899-902 | LIVE-FIXED | review/rel-picker on main (PROGRESS_rel-picker.md, rel-picker refs in index.html 6) | Y | - | - |
| A16 | Gain "+" shown red; gains belong in ĐƯỢC | L905-908 | LIVE-FIXED | j19 whole-word KWB (root cause "thùa" matched /thù/), stat-fx-scan 745 strings 0 left; act-text kemgain 0 | Y | - | - |
| A17 | Redraw thị tẩm quilt-carry picture | L910-912 | LIVE-FIXED | ev-night1-v2.webp, jevban KIT_DLGMAP night1 -> night1-v2 (PROGRESS_review-pic-dupes.md:21) | Y | - | - |
| A18 | Night picture cold on a warm night | L914-915, L946 | LIVE-FIXED | night-end r2/r3: ne-night-warm/normal/cold/lonely + ev-night2-warm/tender/apart by tone (PROGRESS_night-end-r2.md; test night-end-r3.js) | Y | - | - |
| A19 | Night panel dark, unlike rest of game | L916 | LIVE-FIXED | night-end r2: panel bg #fffaf0, dark-panel scan 0 (PROGRESS_night-end-r2.md) | Y | - | - |
| A20 | Sổ ghi numbers do not match header | L918-921 | LIVE-FIXED | review/log-sync: log-sync-r2 + merge-hot-1 LIVE bad941b4 (CLAIMS L36); jlogsyn on main; tests log-sync*.js | N | - | - |
| A21 | Fold page-turn stiff, must curl | L923-924 | LIVE-FIXED | page-curl2-r1 merge bbc7ab454 (landscape curl 800 ms, KIT 34.0b) | Y | - | - |
| A22 | Pick-hint must cover all groups | L925 | LIVE-FIXED | pick-hint family rewrite (scan 0 old-style) + pick-hint-r1; answered in OD | Y | - | - |
| A23 | Status: tranh sủng new-day (jnight) | L926 | LIVE-FIXED | fix-float r9 main 7ba53114d | N | - | - |
| A24 | Status: reward chest / promo FX | L927 | LIVE-FIXED | promo-rules + reward-box on main (PROGRESS_review-promo-rules.md, tests promo-rules.js, reward-box.js); noted open: promo-rules 755 "reveal shown" FAIL pre-existing (CLAIMS L231, OPEN) | Y | S | tiny test fix (not owner-visible) |
| A25 | Kit-sample (a): info panels use full-body, no 3:4 portrait | L928 | CLOSED | Owner later accepted full-body stage column (OD L948 "ok nè"); one pop-up frame ruling | Y | - | - |
| A26 | Kit-sample (b): "Bổng lộc" rule picture placeholder | L928 | UNVERIFIABLE | Picture lives in CDN manifest (ACTS.json), not in git; opt-pics3/ev-art-fit worked placeholders (opt-pics-table.md); check on live site | Y | - | - |
| A27 | Kit-sample (c): option title wraps at 1180 | L928 | LIVE-FIXED | act-text titlewrap scan 0 (§6.2 sample 0.9 line at 755/844/1180) | Y | - | - |
| A28 | Kit-sample (d): Hoàng hậu triệu kiến generic picture, no rank | L928, L967 | LIVE-FIXED | ev-art-fit-r1 PASS 10d770744 + opt-pics (no default picture; tests ev-art-fit.js, dialog-art.js) | Y | - | - |
| A29 | Week book person page shows unrelated entry | L930-933 | LIVE-FIXED | review/weekbook-entries on main (PROGRESS_weekbook-entries.md, tests weekbook-entries.js + scan; per-person lines); depends on log-sync (LIVE) | Y | - | - |
| A30 | Wide robe figure in week book spreads under text | L934 | LIVE-FIXED | stage-figsize-r1 2994ce31 in golive batch 2 (2ee134c5), book-fig-r1 re-merge bad941b4; tests book-figwide.js, stage-fig-size.js | Y | - | - |
| A31 | Week book "Triều đình" page without figure | L935 | LIVE-FIXED | fix-float r8, main 7ba53114d (owner told to tap "Có bản mới") | Y | - | - |
| A32 | Podium: rewards 2nd/3rd, same figure scale, contestants known | L937-940 | LIVE-FIXED | contest-ui (jcui.js: BAL.cp prizes, kpodPrize, KIT_FIG height, cuMeet) PROGRESS_contest-ui.md r2; test contest-ui.js, podium.js | Y | - | - |
| A33 | Contest intro: picture left, info right, scrolling contestant box | L942-945 | LIVE-FIXED | contest-ui: kitGameFrame (KIT 13.4), rivals box scrolls alone, counters hidden on intro | Y | - | - |
| A34 | Figure squashed (wrong aspect) in info panel | L948-949 | LIVE-FIXED | stage-fig-size (2994ce31) + kitDpFit fig-cutout-code-r2 8fb59e05; dev/test/dlg-fig-scan.js | Y | - | - |
| A35 | Person card right side empty | L951 | LIVE-FIXED | review/pcard-fill on main (PROGRESS_pcard-fill.md, test pcard-fill.js) | Y | - | - |
| A36 | Identity card full-body figure missing (regression) | L952 | LIVE-FIXED | stage-fig-size load-race fix in golive batch 2 | Y | - | - |
| A37 | Two frames look the same -> keep ONE pop-up frame | L953 | CLOSED | Answered; kpanel rule kept (KIT §8) | Y | - | - |
| A38 | Every option card: illustration left, info right | L955-958 | LIVE-FIXED | opt-pics r1 PASS 900ace7fb LIVE; opt-pics3-r1 PASS f02abdc41 (merge-train-5); 25 leftovers = D53 (Foreman C) | Y | - | - |
| A39 | Pop-up frames same size per viewport | L963 | LIVE-FIXED | panel-size-r1 merge a523531da + postmerge-fix-1-r1 86bd7121f; 560x700 / 560x574 | Y | - | - |
| A40 | Page turn only landscape; portrait other animation; swipe only in Tuần lục | L961-962, L983-985 | LIVE-FIXED | page-curl2-r1 (book portrait slide, swipe removed elsewhere); later tab change = instant per OD 16/11 15:45Z/15:55Z, KIT §34.0a, dev/test/tab-instant.js | Y | - | - |
| A41 | Redraw podium backdrop | L965-966 | LIVE-FIXED | podium-bg2(-p).webp, KIT_BD.podium (PROGRESS_contest-ui.md:10); owner may still dislike (OD 16/11 07:31Z asks model) | Y | - | - |
| A42 | Event pictures unrelated (default visitor box) | L966-967, L987 | LIVE-FIXED | ev-art-fit-r1 PASS 10d770744 (merge-train-1); rule per meaning group | Y | - | - |
| A43 | Stray line through selected chip; grey bar under chips | L971-973, L978 | LIVE-FIXED | review/tab-underline on main (PROGRESS_tab-underline.md, KIT §46 edge fade, tab-underline-scan.js) | Y | - | - |
| A44 | Real prizes for every contest (item, bạc, chest, title) | L975 | LIVE-FIXED | contest-ui: CU_POOL themed items, chest reveal, S.honors title, Emperor gift; item origin "thi" | Y | - | - |
| A45 | Act cards: big and small, equal heights, rectangle picture, tap picture, "!" why | L977-981, L1000-1001, L1009 | LIVE-FIXED | review/actcard-small on main (PROGRESS_actcard-small.md: 3:4 picture, kitActZoom, "!" mark, one per row in kpane); the earlier "one act card" decision CLOSED by owner override | Y | - | - |
| A46 | ONE word "Tự học" everywhere; Dung/Ngôn pictures reuse Công's | L988 | LIVE-FIXED | VANPHONG.md:39; no "Tự rèn" label left in j*.js; j79.js:773-777 picture keyed per art (placeholder-pics3) | Y | - | - |
| A47 | Goal strip "Mệnh truyện · Chương 1" not tappable; lost after picking character | L1028-1030, L1034 | LIVE-FIXED | tutorial-r2 (goal card, chip, tour) PASS, notes 9b4f1697a on main; goal-strip-fix (PROGRESS_goal-strip-fix.md); dev/test/goal.js | Y | - | - |
| A48 | Tứ đức has no minigames | L990-999 | LIVE-FIXED | review/tuduc-mg + tuduc-sub on main (merge-train-4; tests tuduc-mg.js, tuduc-sub.js); tuduc-pic-r1 PASS 2954ff9f | Y | - | - |
| A49 | Study/minigame frame: picture left, info right, result not cut | L999 | LIVE-FIXED | contest-ui kitGameFrame (result lives in .kginfo); tuduc-mg | Y | - | - |
| A50 | Evidence collected against clean player; news run together | L1003-1007 | LIVE-FIXED | review/evidence-truth-r1 on main (jtruth.js; clean player 0 true evidence, rumours only; one kit row per fact j70 note70) | N/Y | - | - |
| A51 | Co-op invite: "Rồi sao nữa" next step unclear | L1010 | COOP | -> coop-thin (Foreman B). Note: coop-invite-ux-r1 PASS 727b6112 was built (waiting state, 1-2-3 steps) | Y | - | coop |
| A52 | Same character on phone and iPad, solo + co-op | L1013-1016 | LIVE-FIXED | cloud-save-r1 PASS 7e187abe + merge-hot-4 LIVE a96b3464 (Worker deployed, smoke PASS); chonso-cloud-r1; only "Xóa sổ trên mây" button BLOCKED on kit request (cloud-del) | Y | S | cloud-del (kit danger button + confirm) |
| A53 | Face blurred by background cut-out | L1017-1018, L1449-1457 | ON-BRANCH | face-sharp-r1 PASS ca5791108 LIVE, fig-cutout-code-r2 LIVE (2ee134c5) but owner still saw blur 16/11 20:35Z; whole-figure repaint on review/fig-cutout-clean (Foreman C, RUNNING W1-W7, owner GO 17/11 01:25Z, not live) | Y | L | - |
| A54 | iPad stuck on raw old skeleton (WebKit) | L1019 | LIVE-FIXED | boot-flash-r1: 15 s note, 30 s card with Tải lại / Xóa bộ nhớ đệm, webkit-boot PASS; owner device recheck advised (cannot run real iPad Safari) | Y | - | - |
| A55 | New-game identity: heights, panel covers figure, lag, Nhập cung picture | L1021-1024 | LIVE-FIXED | newgame-ui-r3 PASS f484d226 -> merge-train-5; tests newgame-ui.js; owner later asked "no tabs" (OD L1448, chonso-tabs-r1 PASS c4f80b7f) | Y | - | - |
| A56 | BÁO/TIN/KẾT QUẢ pop-ups without picture ("Hảo hữu vào cung") | L1025 | LIVE-FIXED | ev-art-fit-r1 scope (event frame with group picture); dialog-art.js | Y | - | - |
| A57 | Yellow rectangle when selecting her figure | L1026 | LIVE-FIXED | face-sharp 3b797182 (alpha-haze cause; silhouette glow), face-sharp-r1 PASS ca5791108 | Y | - | - |
| A58 | Co-op stuck: khắc out, no hint, cards red | L1031 | COOP | -> coop-thin (Foreman B); coop-timer-r1 PASS b2690dfb3 LIVE already | Y | - | coop |
| A59 | Roster strip labels cut under sub-tab bar | L1032 | LIVE-FIXED | hc-portrait-r1 583858942 + hc-portrait-revert (tests hc-revert*.js); owner repeat L1087 handled by revert | Y | - | - |
| A60 | Map labels tiny/faint/cut | L1033 | LIVE-FIXED | map-labels-2-b-r1 PASS 30f499cc merged (86229158b), PROGRESS_map-labels*.md, test map-labels-2.js | Y | - | - |
| A61 | Co-op countdown / friend ready strip missing | L1035 | COOP | -> coop-thin (Foreman B); coop-timer-r1 LIVE b2690dfb3 (strip KIT §69.2) | Y | - | coop |
| A62 | iPad stage side cards wide 2-col block | L1037 | LIVE-FIXED | stage-side-r1 PASS 6298d2f55 (one narrow column); note 755x1000 3 people shows 2 + page chip | Y | - | - |
| A63 | Close X covered by chip row | L1038 | LIVE-FIXED | press-fx-r1 (close never covered), tests kit-close.js, kit-close2.js | Y | - | - |
| A64 | Co-op: both finished morning, buổi never advanced | L1040 | COOP | -> coop-thin (Foreman B); fixed by coop-timer-r1 b2690dfb3 LIVE, reconnect + stable r1 6f8e33a0 (batch-0032) | N | - | coop |
| A65 | Question: outside-r2 (tuyến trước nhập cung) in game? | L1011 | CLOSED | Status question; outside-r2 queue B2 then D48 art gap (ledger) | N | - | - |
| A66 | Ruling: pictures per MEANING GROUP, not per event | L986-987 | IDEA | Ruling (applied by ev-art-fit, opt-pics, pic-dupes) | - | - | - |
| A67 | Ruling: Portrait paper-slide for book; swipe only Tuần lục | L983-985 | IDEA | Ruling; implemented (A40) | - | - | - |
| A68 | Design proposals: Sổ mây design, tutorial design, Mệnh truyện detail | L1013-1016, L1030 | IDEA | Built (A52, A47, A9) | - | - | - |

## Jobs (NOT-FIXED)
No NOT-FIXED item in this slice. Open work only:
- JOB cloud-del (S, UI, KIT danger button + confirm dialog, kit request filed in CLAIMS L187, reports/cloud-del.md): "Xóa sổ trên mây" button (follow-up of A52, not an owner complaint).
- JOB fig-cutout (ON-BRANCH, L, art, Foreman C): A53 face softness; verify on a real build once W batches go live.
- A26 "Bổng lộc" rule picture: needs a look at the live CDN manifest (UNVERIFIABLE from git).
- Co-op items A51/A58/A61/A64 -> coop-thin (Foreman B), not jobs.


# Appendix B

# Sweep B: owner bugs/complaints OD:L1040-L1300 (16/11 sessions 8-15), state on origin/main 7abaf07ac (checked 17/11)

Evidence key: "IN main" = `git merge-base --is-ancestor <sha> origin/main` true. Claims = dev/handover/CLAIMS.md + reports/*.md on the handover branch. Branch review/* shas from `git ls-remote`.

| ID | short ask | OD/ledger ref | verdict | evidence / where | UI? | size | job group |
|---|---|---|---|---|---|---|---|
| B01 | Co-op: both finished buổi sáng, buổi never advanced | OD:L1040, L1042 tail | COOP | coop-timer-r1 merged (b2690dfb3, 6864793d2 in main log), dev/test/coop-timer.js; later coop-stable/coop-main-faults on main. -> coop-thin (Foreman B) | n | - | coop-thin |
| B02 | Top bar flips 1-row/2-row, side column 1<->2 cols when dialog opens | OD:L1042, L1081 | LIVE-FIXED | review/stage-side-r1 + design-scale-p2 (5682ce6f IN) makes kv1/kv2 per-viewport fixed (jk4 two-row bar); tests header-fix.js, stage-side.js | y | - | - |
| B03 | Separate solo (>=3) and co-op (>=3) save slots; co-op never overwrites solo | OD:L1045-1047, L1058 | LIVE-FIXED | dev/build/jslots.js "TWO separate save sets" on main, dev/test/save-slots.js (owner said lost saves: no recovery) | y | - | - |
| B04 | Fixed stage slots (1 centre, 2 at 1/3-2/3, 3 at 1/4s), never overlap, Fold 2 fixed slots | OD:L1048-1049, L1273, L1442 | LIVE-FIXED | j59.js KIT_SLOTS (KIT 33.12, lines 69/185/227); stage-pets r7 dcef6c566 IN, stage-figsize-r1 2ee134c59 IN; CHANGE.txt "Fold hai chỗ đứng cố định"; tests stage-slots*.js, stage-fig-size.js. No owner repeat after 21:20Z | y | - | - |
| B05 | Co-op friend status chip (grey avatar "Hảo hữu của ta", tick/!/..), notify when live | OD:L1060-1061, L1063 | COOP | jcooptimer.js + j61.js:49-50 K61FR on main (coop-timer-r1). -> coop-thin | y | - | coop-thin |
| B06 | Side info column always fully expanded, no collapse, rows never clipped | OD:L1062 | LIVE-FIXED | review/stage-side-r1 on main (KIT 33.11 kitSideHost, 32c4a8269; test stage-side.js) | y | - | - |
| B07 | Palace has only princes; few small kids at start (1-4 y), mixed sex, no đích tử | OD:L1064, L1067-1073, L1077-1078 | LIVE-FIXED | j1.js:104-107 psSeedKids (BAL.ps, princes+princesses, ages 1-4); palace-start-r1 67af14139 IN | n | - | - |
| B08 | Emperor's own side story (reign road, factions) + faction win = direct rank, gain AND loss | OD:L1071, L1221-1228 | LIVE-FIXED | reign-road-r1 0a311183f IN + reign-road-fix; promo-skip-r1 7453911c IN (jbal2.js:320 BAL.psk; full-seat compensation) | n | - | - |
| B09 | Marker above HER head bobs more visibly and glows | OD:L1079 | LIVE-FIXED | dev/build/jmark.js:79-81 (7 px / 2.4 s bob + gold glow, figure never animated) | y | - | - |
| B10 | hc-portrait: roster label fix, 3:4 frame; then revert wide frame | OD:L1087-1088, L1098 | LIVE-FIXED | hc-portrait-r1 583858942 + hc-revert (tests hc-revert*.js, jhcpor.js in assemble) | y | - | - |
| B11 | KIT FIRST: every UI change only in the kit part; consistent frames everywhere | OD:L1091-1103 | LIVE-FIXED | kit-conform.js + one-core-guard wired into quickcheck gate (one-core-land 71eaeb3ba IN); KIT.md registry; KIT_REQUESTS flow | y | - | - |
| B12 | Huadian: fruit/grape cluster on forehead; only flower/leaf/butterfly/phoenix, small | OD:L1104; repeat OD:L1451 | ON-BRANCH | C9 review/huadian-size (f931416e) PART DONE: 72 por fixed on CDN; ty1-8 + hd/fig twins folded into review/fig-cutout-clean whole-figure repaint (WIP, lead #6 RUNNING). Owner repeated 16/11 20:38Z => not fully fixed on CDN | y (art) | L | fig-repaint (C) |
| B13 | Tutorial must say what the game is and the goal | OD:L1109 | LIVE-FIXED | tutorial-r2 9b4f1697a IN (+ tut-quests-r1 in 744b80e7) | y | - | - |
| B14 | Frames can succeed; defence can fail | OD:L1110, L1125 | LIVE-FIXED | evidence-truth-r1 7f20b751 IN (BAL.truth) | n | - | - |
| B15 | Hành sự vs Dư đồ vs Tài nghệ: dedupe, acts in Hành sự, split AI/VIỆC/ĐI ĐÂU waves 1-3, Nội vụ phủ shop, "!" happenings | OD:L1111, L1113, L1123-1126, L1138, L1153 | LIVE-FIXED | jcycle.js:21,209,218 (Hành sự cards); act-dedupe-r1 + act-split-w2-r1 072687e2 (merge eca3bcac1 IN); tests act-dedupe-*.js, act-split-*.js | y | - | - |
| B16 | Monthly period popup: report right/wrong/hide to Kính sự phòng | OD:L1112 | LIVE-FIXED | jcycle.js:23 (BAL.cyc.rep: báo đúng/lùi/sớm/giấu); cycle-r3 + cycle-art-r1 in merge-train-6 | y | - | - |
| B17 | Elderly named staff (Tống ma ma etc.) real NPCs in Cung nhân lists; tutorial guide is one | OD:L1120-1121, L1133-1134, L1147 | LIVE-FIXED | elder-staff-r1 a3dbdc19f IN; tutorial guide = Tống ma ma (9b4f1697a) | n | - | - |
| B18 | 9 servants per palace far too many: moderate ceiling + cap on TOTAL interactive people | OD:L1155 (L1133 earlier) | NOT-FIXED | dev/build/jpromo.js:20 BAL.promo.cap up to [5,4]=9 per rank 7; capOf all40.js:1439 (4+2). Owner got "proposal pending", no later ruling found in OD | n | S (cap table) + M (total-people cap) | staff-cap |
| B19 | Face marks (illness, poison, slap, scar) on ALL people, one rule, Emperor/Thái hậu never slapped | OD:L1144, L1154, L1166 | LIVE-FIXED | jface.js:13 kitFaceFx "EVERYONE with a face"; facefx-all-r2 d31473d02 IN, merge-hot-2 ba07c65e IN | y | - | - |
| B20 | Dư đồ: no faces on place names, "!" happening marker, tap person -> pop-up (not Hậu cung tab) | OD:L1150, L1152 | LIVE-FIXED | act-split-w2-r1 ("!" slot) IN; place glyphs 11100a99 IN; OD:L1410 confirms tap-person pop-up is the live swipe-stage design (jk3). Not re-tested on device | y | - | - |
| B21 | Every figure sharp when enlarged (maids, ma ma, eunuchs, men) | OD:L1156, L1160 | ON-BRANCH | review/fig-cutout-clean (C, whole-figure repaint 2K/4K, batches W2-W7 + lead #6 RUNNING, CLAIMS 17/11 02:2xZ); jfighd.js (HD twin loader) already on main | y (art) | L | fig-repaint (C) |
| B22 | Servants: eunuchs not on room stage; every servant rises; maids any rank catch Emperor's eye | OD:L1162, L1165, L1159 | LIVE-FIXED | servant-system-r1 e82a9bcf IN (house-stage.js); jmline mlEye j14.js:36-37 (BAL.mline); promote-servants jpromo.js | y | - | - |
| B23 | Title menu huge/flips; pcard act options tall clipped boxes; her room looks brown | OD:L1170 | LIVE-FIXED | kpanel-compact eba64ead4 IN; pcard-actrow-r1 (jgift.js:74 masked "Phi ???"); brown = buổi tint removed a942395b IN | y | - | - |
| B24 | On entering game first screen = her room (Hành sự); title bg stays generic | OD:L1171-1173 | LIVE-FIXED | eba64ead4 IN (CHANGE: "vào game mở Hành sự") | y | - | - |
| B25 | Remove CSS buổi tint, keep weather only; fix rooms whose buổi painting unused | OD:L1176 | LIVE-FIXED | postmerge-fix-1-r1 a942395b IN | y | - | - |
| B26 | Co-op room slot card: info on top, buttons below, one slot-card part | OD:L1178 | LIVE-FIXED | eba64ead4 IN; dev/test/slot-card.js | y | - | - |
| B27 | Tuần lục book figures not standard proportion | OD:L1179 | LIVE-FIXED | book-fig-r1 in merge-hot-1 bad941b4 IN; tests book-fig-scale.js, book-figwide.js | y | - | - |
| B28 | Modal content cannot touch-scroll (Học Cầm picker); work-gift lists many "Phi ???" | OD:L1180, L1194 | LIVE-FIXED | modal-scroll-r1 merge-hot-1 bad941b4 IN (test modal-swipe.js); Phi ??? = jgift.js:74 stranger chip. Touch feel on real iPad not re-tested | y | - | - |
| B29 | Place dialog / item info / co-op strip / chapter goal hand-built, not kit; card flip too jerky/fast | OD:L1182 | LIVE-FIXED | kit-sweep-r1 0c23da40 IN, kit-conform T-templates; cardflip-smooth-r1 feba37e5 IN; anim-pace in 0ce59361 | y | - | - |
| B30 | Goal strip jumps/cannot close; left rail icons | OD:L1184, L1186 | LIVE-FIXED | goal-strip-fix a363cc14a IN (kitStageRail §77; strip removed) | y | - | - |
| B31 | Person-target pickers show scene picture not portrait; tiny cut-off scroll box | OD:L1187 | LIVE-FIXED | pcard-actrow-r1 (jk4.js:977 kitOptPic, 97538bc44 IN) | y | - | - |
| B32 | Sổ ghi lines show false "Ân tình 0->1" | OD:L1188 | LIVE-FIXED | log-sync-r2 + an-tinh-fix in merge-hot-1 bad941b4 IN; tests log-sync*.js | n | - | - |
| B33 | Co-op rejoin: friend client stuck, khắc/acts reset, stats roll back (23->10), friend jumps to next day, other device | OD:L1189, L1191, L1192, L1182 tail, L1283 | COOP | coop-night-sync-r1 bd6342c7 IN, coop-rejoin-xdev-r1 c4b0c58f IN, coop-stable/one-world on main. -> coop-thin | n | - | coop-thin |
| B34 | Weather: one system, painted sprites, full screen season vs stage weather, no grey petals, storm full frame | OD:L1193, L1195, L1196, L1302 | LIVE-FIXED | weather-fx-one-r1 (2940a5458) + weather-fx3-r1 594415aa IN (owner OK'd videos, "hơi lag" -> perf pass in fx3) | y | - | - |
| B35 | Foreign princess art: own faces 3+3, hairstyles, costume by rank, maids in palace-maid cut, proportions, no winter fur | OD:L1203-1212, L1238, L1256, L1268, L1282, L1298, L1301, L1304 | ON-BRANCH | review/foreign-princess-samples (a1743672; C session #5 RUNNING, v25 sent, owner verdicts pending); code gap REQUEST to main in FOREMAN_C_STATUS; nothing foreign on main yet | y (art) | L | foreign-princess (C) |
| B36 | Robbed-clothes re-issue random 1-3 weeks weighted by Nội vụ phủ regard; thiếu lễ -2.8 stays | OD:L1208, L1211 | LIVE-FIXED | jeitem.js:26 BAL.eit.reG (random 1-3 wk, eitRegard); jty.js reissue path | n | - | - |
| B37 | Bắc Địch must be a BRANCH of hòa thân (nc), not a 10th origin; odds measured; hard origin = rare | OD:L1213-1220 | NOT-FIXED | jorigins.js:1-9 ORIGINS.splice k:"bd" = separate origin "Công chúa Bắc Địch hòa thân" on main; review/origins-r1 968ed007 PASS, NOT in main, still separate origin; reports/review-origins-r1: bot HH 0/28 for bd/nc, re-measure pending | n | M | origin-bd-branch |
| B38 | Close maid by origin (table v2) | OD:L1212, L1219 | LIVE-FIXED | close-maid in merge-train-9 / BAL.cmaid (jbal2.js); reports/review-close-maid-r1.md | n | - | - |
| B39 | Pregnancy rate too low: double base + fertile-window peak | OD:L1177, L1205 | LIVE-FIXED | preg-rate-r1 in batch-2300 744b80e7 IN (test preg-rate.js) | n | - | - |
| B40 | Balance audit after evidence-truth/palace-start; HH odds | OD:L1105, L1296 | ON-BRANCH | balance-pass-r1 89ea80f7 IN (owner: merge as is, no tuning); balance-after-truth-r1 PASS 614138eb (measure tools); HH tuning = diff-remeasure-r1 PASS ebe9ab2d queued in review/batch-0232 (SẴN SÀNG KIỂM) | n | M | balance (B/main batch-0232) |
| B41 | Tutorial quests must DO the feature; tutorial part of story; ch1-3 | OD:L1233, L1242, L1259 | LIVE-FIXED | tut-quests-r1 66f598de in 744b80e7 IN; tut-followups-r1 PASS 92cce50b waiting in batch-0232 (bd gets ch1-3) | y | - | - |
| B42 | td home road before family fall; lore consistent over 6 home-road origins | OD:L1235 | LIVE-FIXED | kc-lore a58f8bf89 IN | n | - | - |
| B43 | 14-chapter life, several different roads per origin, living world (varied per life) | OD:L1223, L1226, L1242, L1252-1253 | ON-BRANCH | story14 frame LIVE (jst14.js in assemble); road-b2-fix-r2 fba2b5de + road-b3-fix2-r1 b837b0d1 PASS in review/batch-0232 (waiting "SẴN SÀNG KIỂM" 7abaf07a base); road-b1-fixa PASS c012bf32 dropped by one-core gate -> road-onecore | n | L | story-roads (B) |
| B44 | Each origin: narrated intro + illustrations + entry animation + selection exam minigame; cn/nc pre-palace roads; "Chờ 3 năm" worth same as 3 palace years | OD:L1244, L1250-1251, L1288 | ON-BRANCH | review/origin-intros (batch-2300-oi 25546cf0 -> batch-0032-oi 5e5eb4c8; held out of main for perf: life-card click 1.3-1.5 s, oi-perf RUNNING 17/11 00:53Z); kc-roads-cn-nc-fix2; entry-exam-r1 merged into it; intro art C RUNNING | y | L | origin-intros (C/main) |
| B45 | NPC roads (consorts/maids/men) with own origin + road; real people with real hatred; NPC picks by own traits not best option | OD:L1243, L1247-1248, L1252, L1264 | ON-BRANCH | review/npc-roads-fx (D RUNNING 20:37Z), road-map-410 DONE; npc-agent AG1 + r1-fix (C RUNNING) | n | L | npc-roads (D/C) |
| B46 | Every person has personality, strength, dislike, liking | OD:L1249 | LIVE-FIXED | pcard-dislikes + personality-r1 (merge-train-5 IN; tests pcard-dislikes.js) | y | - | - |
| B47 | Minigames too easy (Tuyệt phẩm every time): tiers by skill+stakes, medium; no word games | OD:L1255, L1265-1266 | LIVE-FIXED | mg-tune-live 7c5523ad IN (BAL.mgTier; Tuyệt phẩm 20-30%); nw-poem/quiz/lantern in merge-train-8; slap/dodge via mg-train | y | - | - |
| B48 | Nội vụ phủ scene set colours vivid/AI-looking / washed out (match approved Kính sự phòng) | OD:L1257, L1275 | ON-BRANCH | review/nvp-v4 (manifest only): 16 tone-passed finals on CDN nvp-v4-<season>-<buoi>.webp, NOT wired; waits owner verdict (reports/place-glyphs.md tail) | y (art) | S | nvp-scene (main art) |
| B49 | Place glyphs not in game painting style: redraw | OD:L1254, L1281 | ON-BRANCH | v1 live 11100a99 IN; v2 sample of 3 APPROVED by owner (OD:L1281); remaining 6 + wiring of all 9 replacing v1 = C mass production, not on main (icon-art v2 sent 17:00Z, FOREMAN_C_STATUS) | y (art) | M | place-glyphs-v2 (C) |
| B50 | Card flip: light in middle covers face / must follow frame; STILL too fast; later "whole frame glows, not running light like casino" | OD:L1260, L1300 | LIVE-FIXED | cardflip-glow2-r2 + skin-norosy-r1 73c06812 IN (reports/cardflip-glow2-r2.md); anim-pace speed. Tray style = separate owner item OD:L1325 (cf-tray-style, out of slice) | y | - | - |
| B51 | Every animation scene ends with ONE short button (card flip -> "Chuẩn bị thị tẩm") | OD:L1261 | LIVE-FIXED | j93.js:46-50 kitSceneEndLabel (KIT §81); scene-end-sweep-r1 PASS 67db47f6; a5d9d2bc9 wires night-end | y | - | - |
| B52 | Person pop-ups: full-body figure left, picture right top; small-portrait variant forbidden; one frame size per event | OD:L1271-1272 | LIVE-FIXED | jkitpage.js:174 kitPersonDlg, jpdlg.js:4; popup-fullbody-r1 in merge-train-4 (6a4acf298); tests popup-fullbody.js, kit-conform. (j79.js:577 .kpsubj remains only on the identity card, not a person pop-up) | y | - | - |
| B53 | Fold portrait = iPad half; ONE design frame + uniform scale, no per-size tuning | OD:L1277-1278 | LIVE-FIXED | design-scale-p2 5682ce6f IN (page 590x820, @media 189->0 content), page-scale-r1 1aa0edb2 IN; tests design-scale.js, page-scale.js, tab-pairs.js | y | - | - |
| B54 | Day-change / night-end painted scenes stuck since s8 | OD:L1285, L1276 | LIVE-FIXED | night-end-r3 a5d9d2bc9 IN (jne.js, kitSceneEnd) | y | - | - |
| B55 | Vinh danh podium backdrop ugly (redo as sample, matte floor, approved palette) | OD:L1284, L1262 | ON-BRANCH | podium-bg3 SAMPLE sheet on CDN (reports/podium-bg3-sample.jpg); NOT wired, KIT_BD.podium still podium-bg2; waits owner verdict | y (art) | S | nvp-scene (main art) |
| B56 | ONE CORE: every number from BAL, no typed numbers (50 vs 55) | OD:L1267 | NOT-FIXED | gate live (one-core-guard + rules-one-source in quickcheck, one-core-land 71eaeb3ba IN) so NEW typed numbers fail; legacy frozen list 6945 -> 6703 -> 6691 typed numbers still in code (dev/test/one-core-baseline.json) | n | L | one-core-legacy |
| B57 | Player vs maid skin/light mismatch on stage; rosy layer removed from all pictures | OD:L1299, L1303, L1305 | LIVE-FIXED | skin-norosy-r1 73c06812 IN (owner picked B; test sw-norosy.js) | y | - | - |
| B58 | Lifespan roll hidden, bell curve, no floor; mortality for all; pregnancy 4 parts; hủy dung | OD:L1116-1117, L1128-1130, L1141, L1151, L1157, L1161, L1164, L1168 | LIVE-FIXED | jbal2.js:160 BAL.mort playerFloorYears:0; mortality-r1 2d3428f8 IN; cab4a7664 | n | - | - |
| B59 | Slap minigame (3 tiers) + dodge | OD:L1163, L1167 | LIVE-FIXED | slap-mg-r3 in mg-train (62b489df6 IN; test slap-mg.js) | y | - | - |
| B60 | Place paintings for every place (4 buổi x 4 seasons) incl. 3 new places; festival maps | OD:L1174, L1177, L1258, L1269-1270 | LIVE-FIXED | 3 new places in merge-train-3 63cf7b12a IN; buoi-art 31c38a286 IN. Festival-map painting order CANCELLED/overwritten by OD:L1415 (Phượng Lệnh) | y | - | - |
| B61 | Co-op chat icon, pop-up chat | OD:L1158 | COOP | coop-chat live (5f43aea8f golive; chat in jcoopchat.js). -> coop-thin | y | - | coop-thin |
| B62 | Stage slot / SEAT rules: promo vs full seat, compensation | OD:L1224, L1228 | LIVE-FIXED | seatcap-r1-golive in 744b80e7 IN; BAL.psk compensation | n | - | - |
| B63 | Dư đồ palace pictures taken from Phượng Lệnh, nothing painted; "festival maps" | OD:L1269-1270 | CLOSED | overwritten by OD:L1415 (paint what is missing); Phượng Lệnh courtyards via pl-courtyards-r3 on main | y | - | - |
| B64 | No "palace maid uniform" rule: match existing maid art | OD:L1239 | CLOSED | owner correction, withdrawn rule; applied in B35 | n | - | - |
| B65 | Send videos as files in chat; card-flip videos; weather videos | OD:L1245, L1297 | CLOSED | cardflip-videos.md, weather videos sent; process rule | n | - | - |

## IDEA / rulings listed (not bugs)

| ID | item | ref | state |
|---|---|---|---|
| I1 | NPC consorts also roll identity at start (some lives an NPC is a foreign princess) | OD:L1289 | IDEA, no code; waits foreign princess art (B35) + origin-bd-branch (B37) |
| I2 | "Chờ 3 năm" value equal to 3 palace years; co-op choices at same time point | OD:L1288 (replaces L1263) | IDEA/ruling, ON-BRANCH with origin-intros (B44); co-op part -> coop-thin |
| I3 | Every named character has side quests (D5) -> replaced by NPC roads | OD:L1072, L1234, L1252 | IDEA, folded into npc-roads (B45) |
| I4 | Model-by-weight rule, no haiku, opus for rules/numbers | OD:L1051-1059 | RULE (process) |
| I5 | Foreman/claim/rollover/art-ownership/low-context/canon-overwrite rules | OD:L1041, L1075-1085, L1199-1202, L1217, L1225, L1229-1232, L1237, L1241, L1246, L1279-1280, L1286-1295 | RULE (process, no code) |
| I6 | Thái hậu archetypes keep names; Q14 foreign princess ruling; "ask less" ruling; faction side choice | OD:L1204, L1077-1078 | RULE |

## Jobs (NOT-FIXED)

1. staff-cap (non-UI, S + M): B18. Lower BAL.promo.cap (jpromo.js:20, now up to [5,4]) and add a cap on the TOTAL number of named interactive people (people-ledger / roster, no random additions). Needs an owner number first (coordinator proposal never answered). Kit: none. Opus (BAL numbers).
2. origin-bd-branch (non-UI, M): B37. Re-home Bắc Địch inside the hòa thân origin (nc) as a country branch (j1/j4 pattern as Nam Chiếu), remove the separate k:"bd" origin from jorigins.js, then measure with the same smart-bot harness as j69 (OD:L19, L43), target Hoàng hậu ~20-40%, hard = rare, split nc's 6% share; PASS branch review/origins-r1 968ed007 is NOT this (still a 10th origin). Do not re-run old origins (OD:L1218). Opus.
3. one-core-legacy (non-UI, L): B56. Move the ~6691 frozen legacy typed numbers (dev/test/one-core-baseline.json) to BAL so texts print the constant; the gate already blocks new ones. Opus, long; can go in slices by module.

ON-BRANCH families (not jobs, waiting): fig-repaint (B12, B21: review/fig-cutout-clean, Foreman C), foreign-princess (B35), origin-intros + kc-roads cn/nc (B44), story-roads (B43: batch-0232), npc-roads + npc-agent (B45), balance diff-remeasure (B40: batch-0232), nvp/podium/place-glyph-v2 art (B48, B49, B55: waiting owner verdict).

## Verdict counts
LIVE-FIXED 45, ON-BRANCH 10, NOT-FIXED 3 (jobs), COOP 4, CLOSED 3, IDEA/RULE rows 6 (counts of table rows B01-B65; rows group several OD lines).


# Appendix C

# Sweep C: owner bugs/complaints OD:L1300-L1440 (11/16 sessions 15-22)
Live main checked = origin/main 7abaf07ac (batch-0132). Pending batch = review/batch-0232 (RUNNING, not live). Evidence from `git grep origin/main`, reports on handover branch, CLAIMS.md, FOREMAN_*_STATUS.md.

| ID | short ask | OD/ledger ref | verdict | evidence / where | UI? | size | job group |
|---|---|---|---|---|---|---|---|
| C01 | Card-flip frame light = whole frame softly glowing, no chasing light | OD:L1300 | LIVE-FIXED | review/cardflip-glow2-r2 merged (main 287a70105); jflip.js:29-30 frame ring "breathing slowly (opacity only)" | UI | - | - |
| C02 | Foreign-princess maids: same cut/sleeves as palace maids | OD:L1301 | ON-BRANCH | Maid pairs approved v5 (OD:L1304); full set of maid pairs is step 2 of review/foreign-princess-samples (Foreman C art, WIP, successor #5 RUNNING) | art | L | foreign-princess art |
| C03 | Storm lightning flashes the WHOLE background frame | OD:L1302 | LIVE-FIXED | jfx.js kfBolt() full stage rect; j11.js:138 calls kfBolt | UI | - | - |
| C04 | Snow clearer/denser, wind visible, spring = pink peach petals, summer differs, fireflies visible | OD:L1302 | LIVE-FIXED | jfx.js KF_WX (wind = blown leaves + streaks, snow cap 150, petal-peach tint pink, KF_RAYS summer, fly glow); weather-fx3-r1 LIVE 594415aa; owner "Tuyet va dom dom ok" OD:L1443 | UI | - | - |
| C05 | Snow/fireflies must look real (soft round flakes, warm glow points) | OD:L1434 | LIVE-FIXED | Owner OK'd the weather-fx3 look 11/16 20:06Z (OD:L1443; only lag, fixed by perf pass). Note: C's snow-real-1..7 / fly-real-1..4 sprites are on CDN but NOT wired (jfx.js:98 `KF_SPR={snow:"orb",fly:"orb"}`), optional swap, S | UI | S (optional) | - |
| C06 | Rosy-skin layer off for ALL pictures (choice B); figure sits IN the scene | OD:L1303, L1305 | LIVE-FIXED | review/skin-norosy-r1 merged with cardflip-glow2-r2 (main 287a70105) | UI/art | - | - |
| C07 | Foreign princess hair/proportions (BD Dap ung/Phi/Quy phi hair, NC slimmer not lanky) | OD:L1304, L1309 | ON-BRANCH | review/foreign-princess-samples WIP (reports/foreign-princess-art.md v25, NC pick, BD ranks; successor #5 RUNNING 02:04Z) | art | L | foreign-princess art |
| C08 | 3-line name tag (title/rank/name) on stage under feet + left figure of pop-up; rank+name elsewhere | OD:L1306, L1311, L1314(1), L1351 | LIVE-FIXED | review/title-tag-r1 PASS item 4; jtitle.js:6-7 kitTitleTag3; none in Tuan luc book | UI | - | - |
| C09 | Title system: Danh hieu list/tab, own short names, info card, emperor hieu joins rank, worn title = modest bonus (one worn), sac phong book+seal, confiscation + atonement | OD:L1306, L1310, L1311, L1313(D), L1322(4), L1323, L1328 | LIVE-FIXED | jtitle.js, jdh.js, jdh2.js on main; review/title-sys-r1 PASS, title-sys2-r1 PASS 5f710161 (title-sys-live in main log) | UI | - | - |
| C10 | Title plate = painted transparent plate (Magnific), bright tiers | OD:L1306 | ON-BRANCH | review/title-plate-art SAMPLE READY (3 tiers) waits owner verdict (no verdict in OD); live shows CSS placeholder plate (jtitle.js:5, kdhArt looks for img/kit/title-plate-<t>.webp) | art | L (8 tiers) | title plates art |
| C11 | Rank colours too pale: brighter/deeper on paper | OD:L1307, L1315 | LIVE-FIXED | review/rank-bright + title-tag-r1 (jewel tones, one RCOL source in j1, floor 3.6:1; jk4:663) | UI | - | - |
| C12 | Emotion actions (Dap do, Khoc tham...) + extreme-mood consequences + FORCED personality/mood events, player + all NPCs | OD:L1308, L1313(B), L1322(3) | ON-BRANCH | review/emotion-acts-3-r1 PASS 2118d118 -> batch-0232 (RUNNING); strings absent on main (grep) | UI+logic | L | emotion-acts |
| C13 | Memory fades per person, lifelong big memories, memory changes behaviour | OD:L1313(A) | LIVE-FIXED | review/mem-upgrade-r1 PASS 64b40270, in batch-2300 (744b80e7) | non-UI | - | - |
| C14 | Fold portrait: top bar + bottom tabs adapted, 2 rows x 4 | OD:L1313(C) | LIVE-FIXED | review/phone-bars-r1 merged (main log) | UI | - | - |
| C15 | Do NOT use fig-bg painted scroll behind figures | OD:L1314(2) | LIVE-FIXED | KIT.md section 61 "NOT SHIPPED" | UI | - | - |
| C16 | Item conservation + item ledger (lost/stolen item always somewhere, return odds, search/report) | OD:L1314(3), L1317 | ON-BRANCH | review/item-ledger-r1 PASS 7aba5de9 but held out (double gift delivery vs coop-b1b5); item-ledger-coop parked by owner 02:05Z "no co-op patching"; no jil.js on main | non-UI+UI | M | item-ledger solo land |
| C17 | People ledger: everyone exactly somewhere, Du do counts match, no random presence; cause ledger | OD:L1317, L1322(2) | LIVE-FIXED | j95.js S.roster; review/people-ledger-r1 merged; CHANGE line "so bong nguoi tren du do khop dung nguoi"; cause ledger = jmem (C13) | non-UI | - | - |
| C18 | Every item (incl. event/quest items) has a picture, sharp enough for the big reveal | OD:L1319, L1320 | ON-BRANCH | review/item-art-audit SAMPLE (16 items without art + 46 low-res, ~2,700 cr) waits owner; 22 missing items done (item512-art-r1 PASS, CDN); event/quest-only items not audited | art | L | item art audit |
| C19 | Rank glow only on paintings, never on paper/frames; all people on paintings glow (rank colour, name gold) | OD:L1322(1), L1324 | LIVE-FIXED | title-tag-r1 PASS items 2-3 (paper plain, paintings glow, contrast re-check PASS) | UI | - | - |
| C20 | Card-flip tray + backdrop in the game's painting style (3rd repeat) | OD:L1325(1), L1333(2), L1429 | LIVE-FIXED | cf-tray-style DONE: old "E" look live on CDN img/kit/cf-gplate-*; owner "Ok, mam lat the. Ok roi do" (FOREMAN_C_STATUS:225) | art | - | - |
| C21 | Rank+name under every card; her card glows soft white from the start | OD:L1325(2), L1326 | LIVE-FIXED | review/tham-flip-ui-r1 (tham-flip-ui-r1.md l.5) | UI | - | - |
| C22 | Hoang hau auto-summoned day 1 and 15, no card flip; her card not on tray | OD:L1325(3), L1396(2) | NOT-FIXED | j75.js:197-200 only wraps flip with "custom mung 1/ram -> Hoang hau" (nightWhy), still a flip scene; tray exclusion + by-day rule arrive with the 10-night ledger | UI+logic | M (inside C25) | night-ledger |
| C23 | Flip at START of evening; result committed ONCE at "ket thuc ngay" for exactly one woman (Tranh sung / Chan ngu gia reopen it, NPCs too) | OD:L1325(4), L1437 | ON-BRANCH | flip-entry-r1 live (flip only in evening). Commit rule + multi-steal = review/night-final (solo checked @09c0f055, co-op parked, PASS not issued); not on main | logic | L | night family (night-final) |
| C24 | NPCs steal nights from self-interest/ambition, much more often; symmetric | OD:L1329, L1332, L1395 | LIVE-FIXED | jsteal.js:4 (same costs/odds as hers); review/night-steal-r2 PASS 290bd3b5 (ancestor main caa73a87); review/npc-jealousy-r2 | non-UI | - | - |
| C26 | Night count: 10-night ledger per tuan, cycle by day (5/6/7 days per month per woman), extra-night notice (So ghi + toast) | OD:L1331, L1388, L1392, L1396, L1397 | NOT-FIXED | No review/night-ledger branch exists (CLAIMS: "QUEUED after night-final"; FOREMAN_D s28 ORDER 02:32Z). jcycle.js:4 still "cycle = 5-7 days inside ONE tuan" | UI(notice)+logic | L | night-ledger |
| C27 | Round icon buttons in left rail -> SQUARE kit buttons (whole game) | OD:L1333(1), L1344 (8.2) | LIVE-FIXED | review/square-icons merged (jrail.js .krailb 44px square, report square-icons.md) | UI | - | - |
| C28 | Maid nights follow stats/own road (9 origins), no invented %; Emperor chooses as an agent; maid pregnancy/low-born child | OD:L1333(3), L1381 | NOT-FIXED | Not built: npc-agent AG2/AG3 (Emperor picks WHO, maid nights) not started; only AG1 on review/npc-agent-r1. Report: reports/history-maid-nights.md. j42 player stat path (nt) exists | logic | L | npc-agent AG2-AG3 |
| C29 | LAG = first priority, no lag in play | OD:L1333(4), L1443 | LIVE-FIXED | go-live-kit-r2 perf gate (quickcheck: render/tab/buoi medians + long tasks) on every batch; lag-play-r1, lag-play-2-r1 live; weather perf (jfx.js:142 30 fps ambient) | UI | - | - |
| C30 | Buoi transition full screen, clearer, slower; all animations slower; season + festival variants; buoi icons | OD:L1333(5)(6), L1343 (7.5) | LIVE-FIXED | jbuoi.js:5, :17-21 (SEASON + FESTIVAL tables), :85 `.btr{position:fixed;inset:0}`; buoi-art-r1 PASS, anim-pace-r1 merged | UI/art | - | - |
| C31 | Kit SIZE system: frames S/M/L/XL by content, figures 4 sizes, pictures per orientation, buttons S/L, "where used + size" on catalogue | OD:L1335, L1336, L1337, L1340, L1343 (7.1), L1371(2) | LIVE-FIXED | review/kit-size-r7/-8/-9/-10 in batches 0032/0132; jksize.js; KIT.md section 84; CHANGE line 2 "bon co" | UI | - | - |
| C32 | Every frame shows BOTH the person and an event picture; narrator = named palace official for personless frames; S keeps avatar frame | OD:L1372(1), L1373, L1430, L1431, L1432 | LIVE-FIXED | jksize.js:241-315 (narrator = BAL.staff.narrator jbal.js:214-217, S avatar, event-centred S) | UI | - | - |
| C33 | Event picture fills frame, subject not cropped (focal crop), standard ratios, aligned with buttons | OD:L1374, L1440 | LIVE-FIXED | kit-size #6/#7 (274a55d1c focal crop 329 boxes, c4e35f53a cover crop); S picture = standard PM 3:4 | UI | - | - |
| C34 | No "Da hieu" button; close by tap outside / X | OD:L1352 | LIVE-FIXED | KIT.md 32.10 + 32.x: close-only buttons never drawn (kitCancelIx j3) | UI | - | - |
| C35 | Figure + buttons centred, top gap = bottom gap, feet never cropped (Emperor figure touching frame top) | OD:L1353, L1417(2) (repeat OD:L1494 11/17 02:00Z) | ON-BRANCH | review/fig-feet-crop-2 RUNNING (CLAIMS 01:55Z, owner repeat "hinh nao cung bi crop mat chan"); earlier fix 8fb59e05 kitDpFit insufficient | UI | M | figure fit in frames |
| C36 | Choice buttons same width per frame, picture left + TON/DUOC/MAT rows, hint box full width under; use small square form when space is empty | OD:L1337, L1354, L1355, L1357, L1358, L1376, L1417(3) | LIVE-FIXED | kit-fit (section 6.2b square option cards), kit-size #4-#8 (jksize.js:162-174 "buttons same width") | UI | - | - |
| C37 | Figure proportions: Thai hau squashed/stout, one scale for everyone, old-people audit + redraw | OD:L1335(1.1), L1356, L1375 | ON-BRANCH | review/fig-proportion (C, RUNNING 01:21Z) + "old-people ROLLOUT #3" + WHOLE FIGURE REPAINT W1-W7 (review/fig-cutout-clean); reports/review-fig-proportion-redo.md; 15 Thai hau figs NOT live yet | art | L | figure repaint / proportions |
| C38 | Night/transition pictures: backs only, no faces; "Goi dau" rejected | OD:L1335(1.7) | LIVE-FIXED | night-backs: owner picked variant A, art swapped on CDN under same keys (reports/review-night-backs.md) | art | - | - |
| C39 | Marks: Hoang thuong bright imperial yellow, rank+name one colour, bare ink check/cross, relation = 2 equal aligned columns, no boxes round +3/-3, KET QUA seal orange, one grade chip, place icon above name, cream place chips | OD:L1336 (2.4, 2.6), L1338, L1339, L1362, L1363, L1364 | LIVE-FIXED | review/kit-marks-r1 merged; j1.js:12 KIT_IMP="#ffd400"; reports/kit-marks.md; owner "duyet, ok" OD:L1380 | UI | - | - |
| C40 | Items: grade chip ON frame bottom edge, Xa xi = square box (word + number) as scaled XL master, Ngu mark square, XL chip size | OD:L1342, L1360, L1361, L1365, L1377, L1382 | LIVE-FIXED | kit-size #8 (86ce95052 Xa xi master) + #9 (db8ded367 chip on edge) in batch 0032 | UI | - | - |
| C41 | Mood mark on picture corners bigger; spring = flower petals not petal-gold | OD:L1343 (7.2, 7.4) | LIVE-FIXED | kit-marks part 2 (jk2b); jfx.js KF_WX.gold uses petal-peach, KF_ALIAS petal -> plum | UI | - | - |
| C42 | Placeholder pictures per real orientation and size (not 2+2); stand-in marked "tam" | OD:L1343 (7.3), L1439 | NOT-FIXED | Art done (ph-p-*, ph-l-*, ph-w-*, ph-s-* on CDN) but K-ICO-2 not wired: no `ph-p-/ph-l-` in dev/build (git grep empty); jksize.js:236 still uses ph-act-light / ph-event-light / ph-act-dark-v2 (the "tam" mark itself is live per CHANGE line) | UI | S-M | kit-ico wire |
| C43 | Calendar icon in ancient style (no desk calendar); chat/edict icons | OD:L1344 (8.3) | LIVE-FIXED | icon-art: mo-calendar, ico-chat, desk-cal replaced IN PLACE on CDN, owner approved sample v2 (FOREMAN_C_STATUS:36). Rail ico-cal/ico-goal NOT wired (K-ICO-1, git grep empty): see C44 | art | - | (see C44) |
| C44 | Download status = small square icon in corner with animation; tap = panel; painted download/update icon | OD:L1367 | NOT-FIXED | Icon button + bob animation live (jstatus.js, status-icons-r1 PASS); glyph is plain-text placeholder: img/kit/ico-download.webp / ico-update.webp (on CDN) not referenced (`git grep ico-download` empty). Same job also K-ICO-1 jrail -> ico-cal/ico-goal | UI | S | kit-ico wire |
| C45 | Portrait tab change = instant swap; NO page-turn/curl on tab changes anywhere (curl only in Tuan luc book) | OD:L1347, L1349 | LIVE-FIXED | jbook.js:554-561 "TAB change has NO animation on any device" | UI | - | - |
| C46 | Bring the natural hand into the 2D card flip (bigger, whole hand+sleeve); no PlayCanvas | OD:L1385, L1348 | LIVE-FIXED | review/flip-hand-r1 merged; PlayCanvas dropped (CLOSED) | UI/art | - | - |
| C47 | Tu trang: ĐANG MANG vertical column left, bag fills right, pet box under Y phuc, Thu cung inner tab, pet info | OD:L1366, L1369, L1378, L1384(1) | LIVE-FIXED | review/tutrang-layout (c39139e51) merged via page-scale-r1 (LIVE 1aa0edb2); jinv.js:360 tabs Tui do / Thu cung / Viec | UI | - | - |
| C48 | Fold portrait = iPad right page scaled uniformly (bag 7 vs 4 rows) | OD:L1379 | LIVE-FIXED | review/page-scale-r1 PASS 9736c445 LIVE 1aa0edb2 + design-scale-p2-r1 | UI | - | - |
| C49 | Go-live: hourly batch, tiered checks, build number + what-changed line, rollback | OD:L1368, L1370 | LIVE-FIXED | go-live-kit-r2 (GO_LIVE.md, quickcheck); jnotes.js:46-52 CTM_BI build line; batches 2300/0032/0132 | UI+tool | - | - |
| C50 | Pets on stage: one fixed spot beside owner, kit size classes, fixed 2-slot Fold, swipe + "+N" both sides, no overlap of bodies, Hanh su = her room only | OD:L1384(2), L1387, L1408, L1410, L1414, L1421, L1439 | LIVE-FIXED | review/stage-pets-r7 6aaca31af + stage-pets-r1 merged (main log 92ddac8cc); KIT 33.12 slot table; CHANGE line "Fold hai cho dung co dinh" | UI | - | - |
| C51 | Pet lifespan like people; divine pets also mortal | OD:L1389, L1394 | LIVE-FIXED | jpetlife.js (review/pet-lifespan merged) | non-UI | - | - |
| C52 | NPC actions really happen where/when she arrives: witness event (Nghe len / Bo di / Mac ke / Tham gia) | OD:L1390 | ON-BRANCH | npc-agent AG1b (witness) in review/npc-agent-r1 (r1 review pending/FAIL fixes, successor #2 RUNNING 00:28Z); not on main | UI+logic | L | npc-agent |
| C53 | Every NPC is an agent playing like a player; two-way acts (what NPC can do to her, she can do to NPC) | OD:L1386, L1403 | ON-BRANCH | Two-way acts LIVE (review/two-way-acts-r1; jtwoway.js). Agent loop AG1 = review/npc-agent(-r1) WIP, AG2/AG3 not started (npc-agent AUDIT report reports/npc-agent.md) | logic | L | npc-agent |
| C54 | Dress offences: To vuot pham vs To xa xi, Do la shows dress, person card 7 wear slots | OD:L1391(1)-(3) | LIVE-FIXED | review/dress-offence-r1 merged; jdress.js ACT.xx; reports/dress-offence.md (wear row = 7) | UI+logic | - | - |
| C55 | Du do places all locked; A ca so label placement; open-but-too-far places grey | OD:L1391(4), L1417(1), L1418 | LIVE-FIXED | review/dudo-lock + map-labels-2-b-r1 PASS 30f499cc merged (jplx.js acs box; grey .awalk label) | UI | - | - |
| C56 | Health + pregnancy bundle: Suc khoe = Suc max ceiling only, o cu 1 month, preterm/overdue, miscarriage by weather/travel/work, early-birth paternity scheme + blood test, thuoc thuc sinh | OD:L1393, L1398-L1401, L1404-L1407, L1409 | ON-BRANCH | review/suc-khoe: r1 FAIL 8 (3 blocking) -> fix da50857d -> r2 reviewer RUNNING (CLAIMS/FOREMAN_D); not on main. Needs kit act category "Y duoc" (KIT_REQUESTS) + act picture act-uong-thuoc-thuc-sinh (Foreman C) | UI+logic | L | health bundle (suc-khoe) |
| C57 | Childbirth death rate kept; death is a feature, no shields | OD:L1419 | CLOSED | Ruling only; suc-khoe-build.md l.11 keeps jmort formula untouched | - | - | - |
| C58 | iPad downloads twice (Safari vs Home Screen) | OD:L1411 | LIVE-FIXED | review/ios-install-first-r1 merged. UNVERIFIABLE here: needs an iPad Home-Screen install on her device to confirm | UI | - | - |
| C59 | Chon so: two tabs (one player / co-op), So may in Chon so, "Choi mot minh" opens Chon so | OD:L1412, L1420, L1424 | LIVE-FIXED | review/chonso-tabs-r1 + chonso-cloud-r1 merged (main log) | UI | - | - |
| C60 | Du do courtyard pictures from Phuong Lenh (nhat), missing states painted, courtyard only for multi-hall places | OD:L1413, L1415, L1422 | LIVE-FIXED | review/pl-courtyards-r1..r3 + single-hall merged; pl-courtyards-art DONE 299 pictures on CDN (CLAIMS) | UI/art | - | - |
| C61 | Du do map frame painted (not CSS leather) | OD:L1416 | LIVE-FIXED | review/map-frame-kit-r1 in batch-2300 (744b80e7); style C owner OK | UI/art | - | - |
| C62 | Fireworks: not on ordinary evenings, only Tet + Giao thua | OD:L1423, L1425, L1428 | LIVE-FIXED | review/fest-fx-r1 (v3 a114024a) merged | UI | - | - |
| C63 | Images not in git; rejected images stored nowhere | OD:L1426, L1427 | LIVE-FIXED | review/img-cleanup-live (66381c484), allow-list check; ongoing rule | tool | - | - |
| C64 | Du do / courtyard / every place screen show the same left + right info columns as her room | OD:L1433 | LIVE-FIXED | stage-pets-r1.md table "Du do / courtyard: same L + R columns" 139 px everywhere; KIT 33.11 | UI | - | - |
| C65 | Palace voice: address by rank, literary gain/loss text, no repeated lines | OD:L1435, L1436 | LIVE-FIXED | review/palace-voice-r1 in batch-2300; jvoice.js kAddr/kLine; voice-pool-sim 59 situations repeats 100% -> 0%. Open follow-ups (reports/palace-voice.md "Not done"): act-keyed talk pools, "nang" in 9 emperor quotes j67/j97 | UI(text) | S (follow-up) | palace-voice pass 2 |
| C66 | Co-op contest: both players invited, one result list, prizes once | OD:L1438 | COOP | -> coop-thin (Foreman B). review/coop-contest-fix r3 CANCELLED by s28 (reports/coop-contest-check.md) | - | - | coop-thin |
| C67 | Weather videos / skin / tray etc. owner-device look | - | UNVERIFIABLE | Only items needing the owner's device: C58 (iOS Home Screen). All others have code or report proof | - | - | - |

## IDEA list (not bugs; state noted)
- OD:L1306 titles/achievement titles = BUILT (C09). OD:L1389 pet lifespan = BUILT (C51). OD:L1393/L1398-L1401/L1404 health + pregnancy ideas = ON-BRANCH (C56). OD:L1348 animation/PlayCanvas trial = CLOSED (owner rejected, only the hand kept, C46). OD:L1313(A) memory question = answered, C13. OD:L1402 feature freeze = rule (new ideas -> dev/PARKING_LOT.md).
- Pure rulings/rules skipped: OD:L1312, L1316, L1318, L1321, L1327, L1346, L1402.

## Jobs (NOT-FIXED / not on main, grouped)
1. **night-ledger** (L, owner Foreman D per s28 ORDER 02:32Z; own branch review/night-ledger on top of review/night-final; spec reports/night-time.md V3-B). Items: C22 (Empress day 1/15 no flip, not on tray), C26 (10-night ledger, cycle by day 5/6/7, extra-night notice via So ghi line + kit toast). Needs the C23 commit rule (review/night-final PASS) first. Mostly non-UI; notice uses existing kit toast / kitFacts.
2. **npc-agent AG2-AG3 + maid nights** (L, Foreman C; review/npc-agent-r1 only AG1/AG1b so far). Items: C28 (maid nights on the stat path, Emperor as agent chooses, maid pregnancy / low-born child, promotion by seat rules), plus the unfinished parts of C52/C53. Non-UI core; witness event frame uses kit event frame (KIT section 84 sizes).
3. **kit-ico wire** (S-M, UI, kit keeper: KIT_REQUESTS K-ICO-1..3). Items: C42 (placeholder sets by orientation/size into jph / jksize.js:236, KIT section 59), C44 (kitStatusIcon -> img/kit/ico-download.webp + ico-update.webp, jstatus.js; jrail -> ico-cal / ico-goal, KIT section 77). All art is already on the CDN; nothing to draw.

## Counts (table rows C01-C67, C25 unused)
LIVE-FIXED 46 / ON-BRANCH 12 / NOT-FIXED 5 (C22, C26, C28, C42, C44 = 3 jobs) / COOP 1 / CLOSED 1 / UNVERIFIABLE 1 (C67 is a note row; real device-only check = C58) / IDEA listed separately.
ON-BRANCH waiting on owner (art samples): C10, C18. ON-BRANCH PASS but not live: C12 (batch-0232), C16 (held). Rest ON-BRANCH = WIP/review running.


# Appendix D

# Sweep D: owner bugs OD:L1440-L1496 + PARKING_LOT (main 7abaf07ac, 11/17/2026)
Evidence = CHANGE.txt lines on main, main commits, handover CLAIMS.md / reports. Statuses of ON-BRANCH rows come from CLAIMS.md (17/11 ~02:30Z). No headless look was needed.

| ID | short ask | OD/ledger ref | verdict | evidence / where | UI? | size | job group |
|---|---|---|---|---|---|---|---|
| D01 | Event pictures: standard sizes, subject (letter) inside crop | OD:L1440 | LIVE-FIXED | kit-size 4 sizes (CHANGE "bốn cỡ, tranh lấp đầy khung"); focal point per picture KIT.md:3500 (FOC in jne), batches 0032/0132 | UI | - | - |
| D02 | Co-op audit: anyone living in own world / own number | OD:L1441 | COOP | -> coop-thin (Foreman B); one-world already live (CHANGE "hai người sống chung một thế giới") | UI | - | coop-thin |
| D03 | Fold: 2 fixed slots per view, pets fixed spot, no 3 overlapping | OD:L1442 | LIVE-FIXED | stage-pets r7 6aaca31a + dcef6c56 (KIT 33.12); CHANGE "Fold hai chỗ đứng cố định" | UI | - | - |
| D04 | Snow/fireflies lag: perf pass before live | OD:L1443 | LIVE-FIXED | weather-fx3-r1 live 594415aa, dev/test/perf-fx.js, drizzle cap 20 (8eb75b6) | UI | - | - |
| D05 | Load check/hand out work without being asked | OD:L1444 | CLOSED | process rule for main/foremen (OD:L1286 sharpened), no code | - | - | - |
| D06 | Unique ancient-Chinese names, no Vietnamese-looking | OD:L1445 | ON-BRANCH | review/names-unique-r1 PASS dcb2ea96, HELD from batch (co-op names diverged 1 of 4 runs); jname.js not on main; depends on co-op names from host (coop-thin B) | non-UI | - | - |
| D07 | Origin/identity cards much bigger, span the background | OD:L1446 | LIVE-FIXED | kit-fit r3 2c272f750 kitRouFit KIT 28.12b; CHANGE "thẻ thân phận to hơn" | UI | - | - |
| D08 | CO-OP FIRST priority + shared kit / shared rules and numbers | OD:L1447 | COOP | standing rule; work = coop-thin A->H (OD:L1490 ff.) | - | - | coop-thin |
| D09 | No face tabs; faces chosen by identity (52 / consort set) | OD:L1448 | LIVE-FIXED | kitFaceScope KIT.md:839 (j88), kit-fit r3; CHANGE "chọn dung mạo tự theo thân phận" | UI | - | - |
| D10 | Luan hoi figure: warped face, dark neck streak, halo | OD:L1449 | ON-BRANCH | code half LIVE (fig-cutout-code-r2 8fb59e05, 8deb7bc3 edge harden); image half = review/fig-cutout-clean regen batches W1-W7 RUNNING (C art, CDN) | UI | L (art) | fig-repaint |
| D11 | Cut-out broke figure: background shows through sleeve/arm | OD:L1450 | ON-BRANCH | same as D10 (root-cause worker fixed code; re-cut = fig-cutout-clean) | UI | L | fig-repaint |
| D12 | Huadian (forehead mark) far too big | OD:L1451 | ON-BRANCH | review/huadian-size r4: 72 por fixed on CDN, rest (ty1-8, twins, hd) folded into fig-cutout-clean regen; r3 FAIL list | UI | M | fig-repaint |
| D13 | Anatomy: left-side arm ends in a right hand; audit all figures | OD:L1452 | ON-BRANCH | repaint by Foreman C (fig-cutout-clean scan sheet). No separate anatomy-audit result found in reports: verify it is in the scan | UI | L | fig-repaint |
| D14 | No back-turned looking-over-shoulder pose; replace all | OD:L1453 | ON-BRANCH | back-pose list in fig-cutout-root b01caedb5 (c20/c02/c08 ty1-8 ...); repaint in fig-cutout-clean | UI | L | fig-repaint |
| D15 | Clean cut-out method (upscale, remove bg, decontaminate, QA) | OD:L1454 | CLOSED | superseded by D18 (transparent generation, step 0 test passed in reports/fig-cutout-clean.md) | - | - | - |
| D16 | New game opens the card-flip screen right after identity | OD:L1455 | LIVE-FIXED | flip-entry-r1 6f513340 (jfe.js), CHANGE "Vào game mới không còn bật ngay màn lật thẻ"; cardflip.js test | UI | - | - |
| D17 | Fold: shift both slots right, left figure not clipped | OD:L1456 | LIVE-FIXED | stage-figsize hotfix (one owner of slots incl. r7 shift), live 2ee134c5; CHANGE "Fold hai chỗ đứng cố định dời sang phải" | UI | - | - |
| D18 | Draw figures straight on a transparent background | OD:L1457 | CLOSED | applied: Magnific gpt-2-6 transparentBackground confirmed, now the method of fig-cutout-clean | - | - | - |
| D19 | Palace voice fits rank; nang / ai phi; short toast + long literary | OD:L1458 | LIVE-FIXED | palace-voice-r1 550f233ed; jbal2.js:416 (nuong/aiPhi bands); CHANGE "lời trong cung hợp phẩm cấp" | UI | - | - |
| D20 | Repaint all figures consistently; feet/shoes never cropped | OD:L1459 | ON-BRANCH | repaint W1-W7 RUNNING (fig-cutout-clean); code crop live efcdb636/8fb59e05 but owner repeated -> D53 | UI | L | fig-repaint |
| D21 | After page-scale: people on Hanh su stage far too small; giant clipped eunuch; blank card portraits | OD:L1460 | LIVE-FIXED | stage-figsize hotfix live 2ee134c5 (figures .79, shots Fold+iPad); CHANGE "Người trên sân khấu to trở lại" | UI | - | - |
| D22 | Choice: no rollback, wait for stage hotfix | OD:L1461 | CLOSED | decision, hotfix shipped (D21) | - | - | - |
| D23 | Goal/event cards: small text = small button; every card has a picture | OD:L1462 | LIVE-FIXED | kit-size #1-#10 live (KIT 4024 9c; CHANGE "Khung việc và khung sự kiện bốn cỡ") | UI | - | - |
| D24 | iPad: strip under 8-tab bar; header dots / Bac-Suc cut off | OD:L1463 | LIVE-FIXED | stage-figsize 2f071fe8 (flush to bottom, header inside safe area), CHANGE "iPad hết dải trống dưới thanh tab". Header-right cut was in that hotfix scope; owner iPad glance advised | UI | - | - |
| D25 | Same-kind rows get same picture (Thinh an Hoang hau, Thanh Minh) | OD:L1464 | LIVE-FIXED | jksize.js:544 agenda rows, KIT 9c; missing art shows "tam": vacant-Empress portrait por-vacant-hh + festival icons = C art (review/toil-room-art RUNNING, live upload after owner OK) | UI | S (art) | - |
| D26 | Diem trang: black round second mirror; layout advice | OD:L1465 | LIVE-FIXED | black disc fix 824d5e3f (kmkl); minigame-frame-r1 (in kit-size-r7) = left column figure, KIT 609 | UI | - | - |
| D27 | Makeup reveal: no light over person, no round frame, zoom | OD:L1466 | LIVE-FIXED | f7097061b kitFxRim + reveal zoom; batch 3 08725411; CHANGE "ánh sáng chỉ viền quanh người" | UI | - | - |
| D28 | Makeup room painting slightly too vivid; match sister rooms | OD:L1467 | ON-BRANCH | C art "makeup-reveal desat + dressing room per rank" (review/pl-courtyards-cac) RUNNING, CDN same name | UI | S (art) | - |
| D29 | Mini-game layout: left figure on wide, none on Fold | OD:L1468 | LIVE-FIXED | KIT.md:609-610 (kv2 left figure, kv1 no column) | UI | - | - |
| D30 | Diem trang scoring: dieu duc/vung never happen; make them funny | OD:L1469 | LIVE-FIXED | diemtrang-score 64effc1c9 + 2793359f3 (diem earned by choices, vung by failed part, numbers in BAL), merged 42939eaa | non-UI | - | - |
| D31 | Courtyard painting has no side halls but labels pinned | OD:L1470 | LIVE-FIXED | pl-courtyards-r3 5425e4c1/f42dd31c (hotspots only on painted halls) + map-frame-kit-r1 55d6e9a4; CHANGE "dư đồ nhãn giấy mới" | UI | - | - |
| D32 | Never hide an option for time/cost: show greyed with reason | OD:L1471 | LIVE-FIXED | opt-greyed 42936b3f + opt-greyed-2 (kitOff/kitWhy); CHANGE "hiện mờ kèm lý do" | UI | - | - |
| D33 | Stand-in picture shows one "tam" marker | OD:L1472 | LIVE-FIXED | kitTam e6d12523b; CHANGE 'tranh tạm có dấu "tạm"' | UI | - | - |
| D34 | khac spill: "khong kip" gate per buoi violates rule (angry) | OD:L1473 | LIVE-FIXED | time-spill-r1 e788a3e4 (jtds.js), tests khac-day-run.js, time-spill-guard.js; CHANGE "việc dài lấn sang buổi sau". Legacy j76.js:32 string still in tree (guarded by jtds) | UI | - | - |
| D35 | Correction: courtyard pictures come from Phuong Lenh; pins only on painted halls | OD:L1474 | LIVE-FIXED | same as D31 (the "which palace" answer is a fact, no code) | UI | - | - |
| D36 | Hall/pavilion proper poetic Han-Viet names (not "chinh dien / Dong phoi dien") | OD:L1475 | NOT-FIXED | no place-name table on main (jpm.js, 10 "phối điện" uses); PARKING_LOT #3, no worker; needs history expert first (OD:L1327) | UI | L | place-names |
| D37 | Go-live = hourly batch | OD:L1476 | CLOSED | process rule, batches 2300/0032/0132 follow it | - | - | - |
| D38 | Priority: ch1-4 first, features + unified UI complete, art may lag | OD:L1477 | CLOSED | priority rule; status in reports/ch1-4-status.md | - | - | - |
| D39 | Tie "earlier attempt" favours bots (they read the flip result) | OD:L1478 | ON-BRANCH | review/night-final (superseded by D40 canon); NOT on main (no jnf.js) | UI | M | night-final |
| D40 | Night canon: 4 khac intact, Tranh sung/Chan ngu gia only in flip, 10 s choice | OD:L1479 | ON-BRANCH | review/night-final #5 RUNNING: solo checked @09c0f055, co-op parked (OD 02:05Z), G4/perf/steal hints open; not on main | UI | L | night-final |
| D41 | Makeup: no colour warning; freehand, strict scoring, brow anchor per face | OD:L1480 | LIVE-FIXED | diemtrang-score 64effc1c9 (every face its own targets, no fallback), 2793359f3 | UI | - | - |
| D42 | Makeup: brow/lip target misplaced (above nose, near chin) | OD:L1481 | LIVE-FIXED | same commits (anchors for brow, cheek, lip per portrait), Thai hau points re-measured 8098201f | UI | - | - |
| D43 | Flipped consort needs a defence button; Tranh sung vs Chan ngu gia unbalanced | OD:L1482 | ON-BRANCH | night-final (Giu chan, "tam" pic) + balance-core steal modes (stealBase, rungDown); not on main | UI | L | night-final |
| D44 | Talents start too high (75), reach 100 too fast | OD:L1483 | ON-BRANCH | review/balance-core r2 PASS baff0824 (cond.), r2b early-death check RUNNING, ships only after owner agrees proposal §7 (reports/balance-core.md); not on main | non-UI | L | balance-core |
| D45 | Emperor picks one favoured/one disliked art per month; used in night | OD:L1484 | ON-BRANCH | balance-core (empArtMonth, bestArt) same branch | non-UI | M | balance-core |
| D46 | Balance ALL stats and fit each origin | OD:L1485 | ON-BRANCH | balance-core §3 origin table, BAL.orig | non-UI | L | balance-core |
| D47 | Grade chip on picture edge everywhere | OD:L1486 | LIVE-FIXED | kit-size #9 db8ded36 (KIT 54.1b); CHANGE "phẩm ... ngay trên viền khung ảnh" | UI | - | - |
| D48 | Why co-op buggy; thin-guest option 2 only | OD:L1487 | COOP | -> coop-thin (Foreman B) | - | - | coop-thin |
| D49 | Lesson: show architecture choices to owner first | OD:L1488 | CLOSED | process rule | - | - | - |
| D50 | GO co-op thin-guest A->H order | OD:L1489 | COOP | -> coop-thin; A = review/coop-thin-a RUNNING | - | - | coop-thin |
| D51 | Stage backdrop for her residence = her furnished bedroom, not veranda | OD:L1490 | ON-BRANCH | C art "residence ROOMS per place" (reports/residence-rooms) RUNNING, samples to owner first. Code that picks bedroom vs chinh dien per place still to do after art | UI | L | residence-rooms |
| D52 | Every residence of every rank gets 2 rooms (chinh dien + bedroom), per place | OD:L1491 | ON-BRANCH | same job as D51 (art count = seat caps in BAL) | UI | L | residence-rooms |
| D53 | Feet cropped in every figure dialog (repeat of D20) | OD:L1492 | ON-BRANCH | review/fig-feet-crop-2 RUNNING (kit keeper; kitDpFit root + family scan); earlier 8fb59e05 missed this dialog | UI | M | fig-feet |
| D54 | Stop co-op patching, straight to thin guest | OD:L1493 | COOP | -> coop-thin; coop-stable/coop-contest-fix/night-final co-op parts parked | - | - | coop-thin |
| D55 | Co-op waves schedule | OD:L1494 | COOP | -> coop-thin | - | - | coop-thin |
| D56 | Always hand out work to foremen at session start | OD:L1495 | CLOSED | process rule | - | - | - |
| D57 | Main also fixes unfixed bugs; owner away ~3 days | OD:L1496 | CLOSED | process rule | - | - | - |

## IDEAS (PARKING_LOT.md, not verified)
| ID | idea | ref | note |
|---|---|---|---|
| P1 | Induced-birth drug (thuoc thuc sinh) to match the date | PARKING_LOT #1 | marked MOVED OUT 16/11 18:08Z, built with the health+pregnancy bundle; live state not checked |
| P2 | Live AI narrator (LLM per line via server proxy) | PARKING_LOT #2 | IDEA; Worker proxy + cache + fallback |
| P3 | Poetic names for halls / side halls | PARKING_LOT #3 (a) | promoted to rule by owner 21:48Z -> see D36 (NOT-FIXED) |
| P4 | Mini-game for Tranh sung / Chan ngu gia (win = +1 odds rung) | PARKING_LOT #3 (b) | IDEA; depends on night-final (D40) |

## Jobs (NOT-FIXED)
1. place-names (L, UI + data): D36. ONE place-name table (data/BAL, one core) used by Du do, courtyard pins, hall list, residence lines, So; role as small subtitle. History expert first (OD:L1327). Kit: no new part (kitName / kpm labels). Parked at PARKING_LOT #3 until now.

Rows with only part of the work missing (not counted as NOT-FIXED, already owned): residence-rooms code placement after C's art samples (D51/D52).

## Counts (57 slice rows)
LIVE-FIXED 24 ; ON-BRANCH 17 ; NOT-FIXED 1 ; COOP 6 ; CLOSED 9 ; IDEA 0 (4 parking-lot ideas listed apart) ; UNVERIFIABLE 0.


# Appendix E1

# E1 sweep: OWNER_LEDGER sections 2 (rows 1-86) and 3 (rows 1-115), non-LIVE rows re-checked on origin/main 7abaf07ac (17/11/2026 sweep)

Basis: code on main (assemble list, git grep), tests in dev/test, handover reports/CLAIMS. Only ledger rows whose Status was NOT plain LIVE/RULE/CLOSED (54 rows). Art on the CDN is not visually re-checked (marked).

| ID | short ask | OD/ledger ref | verdict | evidence / where | UI? | size | job group | new ledger status text |
|---|---|---|---|---|---|---|---|---|
| S2-12 | Origin odds; cnv winnable | OD:L19,L43 | LIVE-FIXED | balance-pass-r1 on main: jbal2.js:15 ex.bar [22,25,28], jbac.js reprice; PROGRESS_balance-after-truth: HH 34% (target ~32%) in CI. Per-origin spread not re-measured | no | - | - | LIVE (balance-pass); per-origin spread unmeasured |
| S2-13 | Balance targets: early death, HH, birth death | OD:L20 | LIVE-FIXED | PROGRESS_balance-after-truth.md: HH 34%, early death 38% (28-48 CI ok), birth death 10.5%; ex.bar fix in jbal2.js:15; bots HH 0% was only the 'same' control bot | no | - | - | LIVE; measured on target (balance-after-truth) |
| S2-17 | Game-feel animations for key moments | OD:L26 | LIVE-FIXED | jfxkit.js (painted fx), jstatfx.js, jpromo/jpres.js, jflip.js card-flip, night-end-r3 all on main (tests fxkit.js, cardflip.js, presentation.js, night-end-r3.js) | UI | - | - | LIVE; promo, card-flip, night-end, jpres all merged |
| S2-19 | Scenes 4 seasons x buoi; fill variants | OD:L28,L30,L149 | LIVE-FIXED | tests scene-seasons.js, place-colour.js, buoi-art.js on main; jplx/jres pictures per season x buoi (16 variants); art on CDN | no | - | - | LIVE; 4 seasons x 4 buoi on all places |
| S2-21 | Who-is-where habits, intentions, NPCs learn her habits | OD:L32 | LIVE-FIXED | j95.js/j95b.js/j95c.js (schedules, S.roster, learnt habits); schedules3-r3/r5 merged; tests roster_sim.js, roster_oldsave.js | no | - | - | LIVE (j95 schedules/roster) |
| S2-22 | Catching secrets / trysts at hidden spots | OD:L33 | LIVE-FIXED | j95.js ledger + jroute tt tryst + jmen watcher; tests roster_dom.js, routes.js | no | - | - | LIVE (j95 + jroute) |
| S2-23 | ONE location ledger S.roster + roster.js dev tool | OD:L34 | LIVE-FIXED | j95c.js:97 rosterWhere, j95.js:304/459 j95table + dev tool; ROSTER_AUDIT.md in dev/test. OD:L1317 reaffirmed as core law | no | - | - | LIVE (S.roster, j95c rosterWhere) |
| S2-24 | Motive gate for every NPC decision | OD:L35 | LIVE-FIXED | j95c.js motiveOK(a,t,...) + j24 BANDS gate; jlost/jrash 'motive-gated'; npc-agent audit (reports/npc-agent.md) continues as a separate job | no | - | - | LIVE (motiveOK gate, j95c) |
| S2-25 | Bot audit of ledger before release | OD:L36 | LIVE-FIXED | dev/test/roster_audit.js, roster_audit_c.js, ROSTER_AUDIT.md on main | no | - | - | LIVE (roster_audit + ROSTER_AUDIT.md) |
| S2-26 | Painted backgrounds for every minigame | OD:L37 | LIVE-FIXED | MINIGAMES.md: 24 backgrounds + 73 pieces img/kit/mg-*.webp; KIT 13.1 | no | - | - | LIVE (24 painted minigame backgrounds) |
| S2-32 | Collection milestones: titles + Phuc duyen at 20/50/100/200 | OD:L45,L46 | LIVE-FIXED | jcol.js + BAL.col jbal2.js:170 [20,5],[50,10],[100,20],[200,35]; test collect-ms.js; once-per-life ledger | no | - | - | LIVE (jcol, +5/+10/+20/+35) |
| S2-40 | New places (cung nhan row, Ngu thien phong, Noi vu phu, Hoan y cuc, Phat duong, hoc duong) | OD:L82,L86 | LIVE-FIXED | jplx.js: cnh Day nha cung nhan, tgk Tan Gia kho (=Hoan y cuc), ttp Thuong thu phong (=hoc duong), acs, dc; Ngu thien phong/Noi vu phu in j71/j95; places-d42.js; owner approved art OD:L1190 merge-train-3 | UI | - | - | LIVE (jplx: 5 places, places-d42 test) |
| S2-41 | Princes' residences (nhu mau, A ca so, Dong cung) | OD:L87 | LIVE-FIXED | jplx.js header: prince 6-17 at Thuong thu phong/A ca so, Thai tu at Dong cung, under 6 with mother; nhu mau role j3/j53 | no | - | - | LIVE (jplx: A ca so, Dong cung, study hall) |
| S2-43 | Difficulty De/Vua/Kho per life | OD:L85 | LIVE-FIXED | jdiff.js in assemble list (DIFF de/vua/kho, S.diff, on identity card); test difficulty.js; jnotes mentions it | UI | - | - | LIVE (jdiff, identity-card choice) |
| S2-44 | Succession choice Hoang thai hau / nhiep chinh / Nu de | OD:L85,L88,L106 | LIVE-FIXED | j99succ.js + jreign.js on main; OD:L1190 merge-train-3 'succession choice'; tests succession.js, reign.js. Nu de art redraw is a separate art job (stC s11) | UI | - | - | LIVE (j99succ, 3 roads) |
| S2-48 | Tieu thu / life outside the palace route | OD:L95,L104 | LIVE-FIXED | jkc.js 'Vao cung ngay' vs 'O nha cho tuyen tu' (jkc.js:2-3,90), outside-r2-r2 merged (c4e89f89 in main log), OUTSIDE_PLAN.md, test outside; tuyenTu j27. Co-op friendHome -> coop-thin (Foreman B) | UI | - | - | LIVE (jkc home road; outside-r2-r2 merged) |
| S2-49 | Allergy rash overlay, two-way, heals | OD:L107,L117,L124 | LIVE-FIXED | jrash.js registers KIT_FACEFX entry (header: two-way, heals 1-4 tuan); jface.js; test ghen-shown/appearance-port.js | UI | - | - | LIVE (jrash, jface face fx) |
| S2-50 | Item rivalry: extort, bribed servants steal, plant to frame | OD:L108,L117 | LIVE-FIXED | jlost.js (thatlac/minh oan, two-way) + jsteal.js + j95c plant record; test lost-items.js; OD:L1190 'lost items' live. Item-conservation rule (OD:L1314) = separate follow-up in jlost | no | - | - | LIVE (jlost + jsteal) |
| S2-56 | Event art muted st-* style; Tien de bang ha | OD:L117,L124,L125,L131 | LIVE-FIXED | j3.js:129 Tien de bang ha text, succession merged (j99succ/jreign); art on CDN (CDN not visually re-checked) | no | - | - | LIVE; art on CDN with succession |
| S2-57 | 'Vao cung ngay' vs 'O nha cho tuyen tu' real dilemma | OD:L118 | LIVE-FIXED | jkc.js:90-95 options with Thanh/Tốn/Được text (KIT_GLOSS 'Con duong'); outside-r2-r2 merged | UI | - | - | LIVE (jkc two-road choice) |
| S2-58 | Appearance: illness, poisoning, slap/punishment overlays | OD:L121,L126,L130 | LIVE-FIXED | jface.js KIT_FACEFX: ill, doc, tat (img/fx-slap.png), phat chip; facefx-all merged (OD:L1190 line + jface header 'EVERYONE with a face'); tests appearance-port.js, facefx-scan.js | UI | - | - | LIVE (jface kitFaceFx, facefx-all) |
| S2-59 | Postponed appearance art: pregnancy figures, nun, duong nhan glow, grey strands, smallpox | OD:L121,L122 | NOT-FIXED | jface.js:12 'Postponed (no art yet): duong nhan glow, toc bac som, dau mua marks'; no pregnancy/nun figure keys in build (grep 0). Pure art + add() entries; ready:false until owner approves pilot | UI (art) | L (art, credits) | appearance-art-2 | NOT DONE: art for 5 appearance conditions not drawn |
| S2-63 | Do kho row overlap on identity card | OD:L128 | LIVE-FIXED | jdiff.js header 'row placement OD:L128'; tests idcard-bar-overlap.js, idcard-pin-scan.js, newgame-ui.js on main | UI | - | - | LIVE (jdiff row; idcard-bar-overlap test) |
| S2-66 | Residence paintings per person (8 palaces + side halls x 16) | OD:L134-163 | LIVE-FIXED | jres.js (residenceOf/roomResidents/residenceArt, 25 rooms x 4 seasons x 4 buoi) in assemble list; art on CDN. Owner later rejected a SEPARATE home courtyard for low ranks (stC s8 22:15Z): design stays 'low ranks live under a chu vi' | UI | - | - | LIVE (jres, 25 rooms) |
| S2-70 | Palace detail map (Du do -> courtyard -> rooms with real counts) | OD:L158-166 | LIVE-FIXED | jpm.js kitPalaceMap (counts = countAt), OD:L1190 'palace detail map' live; tests palace-map.js, pl-courtyards.js | UI | - | - | LIVE (jpm kitPalaceMap, KIT 33) |
| S2-77 | Du do locked places: no grey boxes, lock mark, tap card | OD:L178 | LIVE-FIXED | j41.js:88-94 lock mark + option card (review/dudo-lock); tests dudo-lock.js, dudo-tap.js on main | UI | - | - | LIVE (j41 lock mark, dudo-lock test) |
| S2-81 | Alternative routes: tu tinh, escape, leave legally, follow another man | OD:L184 | LIVE-FIXED | jroute.js (tt/tc/hl/ad, 73 KB) in assemble list; test routes.js; BAL 'rieng' jbal.js:54. 'Escape too easy' balance note unverified (not re-measured) | UI | - | - | LIVE (jroute: 4 private roads) |
| S2-82 | Tu tinh child -> blood test (+ animation/minigame) | OD:L190,L192 | LIVE-FIXED | jroute.js:119 'trich huyet nghiem than' (test + rtNgSet). Separate animation/minigame not found; plain card only | UI | - | - | LIVE (jroute blood test, card only) |
| S2-84 | Scheme acts get abstract minigames (Nghe ngong, Truyen loi, Mac ca, Thoi co) | OD:L192,L195,L199 | LIVE-FIXED | jsgame.js header: spy->Nghe ngong, rumor->Truyen loi, bribe->Mac ca, 12 stealth acts->Thoi co, 'Giao cho nguoi lam' plain odds; tests schemegames.js, schemewire.js; scheme-games-port-r1 PASS e25486e0 | UI | - | - | LIVE (jsgame: 4 scheme minigames) |
| S3-5 | Khue cac dresses (84 faces) + poor-girl dresses | OD:L206-214 | LIVE-FIXED | jkc.js khue cac pieces (jts.js:267 retag note), jeitem.js:15 girlhood chest; art on CDN; outside-art merged (art not eyeballed) | no | - | - | LIVE (jkc wiring; art on CDN) |
| S3-17 | New-player tutorial (guide mama, tips, on/off, replay) | OD:L227 | LIVE-FIXED | jtut.js (47 KB) + jgoal.js; tutorial-r2 9b4f1697 on main; tests tutorial.js, tut-quests.js, tut-replay.js; guide = Tong ma ma | UI | - | - | LIVE (jtut: guide, goal card, replay) |
| S3-33 | Repo history slimming (needs owner consent) | OD:L267 | UNVERIFIABLE | Owner never answered. Images moved to CDN (OD:L267 plan) so worker checkout is small; 21 GB git packs were handled by a worktree cleanup (OD:L1183). Needs owner yes/no | no | S | owner-decision | OPEN: needs owner consent; images already on CDN |
| S3-39 | Page turn bends with the finger (press-drag, spring back, flick) | OD:L276 | LIVE-FIXED | j87.js:6 'Drag/swipe turns the page with a paper CURL', jbook.js kitCurl; tests page-curl.js, page-curl2.js, curl-live.js; OD:L1190 'page curl 2' | UI | - | - | LIVE (kitCurl drag, page-curl2) |
| S3-40 | Tuan luc act pictures distinct per meaning; 'Den <place>' | OD:L279,L341,L468 | LIVE-FIXED | act-pics2 complete on CDN 803/804 (stC 21:00Z: '143 left' was stale); jopic.js/jact; act-pics.js tests | UI | - | - | LIVE (act-pics2 on CDN; 803/804) |
| S3-41 | Online leaderboard (life + player ranking, guest code) | OD:L281 | ON-BRANCH | no jrank.js / ctm-rank on main. review/rank-port-r2 d8636053 FAIL r1 fixed, BLOCKED on KIT REQUEST A (kitRankList/kitRankRow) + B (kitRankFoot) per reports/rank-port-r2.md; Worker+DO part not deployed | UI | L | rank-port (leaderboard + Bang vang list) | ON BRANCH rank-port-r2; blocked on kit parts kitRankList |
| S3-42 | Announce every stat-changing event immediately; So tuan only summary | OD:L282 | LIVE-FIXED | tests act-audit.js, log-sync*.js, stat-fx*.js on main; jstatfx.js kitStatFx; log-sync-r2 live (bad941b4) | UI | - | - | LIVE (act-audit, kitStatFx, log-sync) |
| S3-53 | She promotes own maids/eunuchs (Chuong su co co, Nu quan...) | OD:L302 | LIVE-FIXED | jpromsv.js (D41, de bat act + ask-queen road) in assemble list; test promote-servants.js; jmline.js active maid line | UI | - | - | LIVE (jpromsv: de bat own servants) |
| S3-60 | Economy by rank (HH surplus, low-rank income roads, tiered prices) | OD:L325 | LIVE-FIXED | jecon.js + jstip.js + jbac.js (balance-pass-r1 reprice) on main; ratio target measured 'HH 34%' not surplus ratio; econ-items live (jeitem.js) | no | - | - | LIVE (jecon, jstip, jbac reprice) |
| S3-63 | Supported screens + rotate prompt | OD:L339 | LIVE-FIXED | small-bugs-3-r1 merged; test rotate-prompt.js, rot.js; design-scale in main (OD:L1500 area) | UI | - | - | LIVE (rotate prompt in small-bugs-3) |
| S3-66 | Bad weather: cold/slipping as Mat of OUTDOOR acts, gear reduces, NPCs same | OD:L348,L351 | LIVE-FIXED | jweather.js header (outdoor acts, BAL.wx gear/help, walking costs no extra) in assemble list; OD:L1190 'weather risks'; test weather-port.js | no | - | - | LIVE (jweather outdoor-act risks) |
| S3-67 | Tap stage character -> exact kit person dialog | OD:L349 | LIVE-FIXED | tests dialog-person.js, popup-fullbody.js, stage-slots.js on main (popup-fullbody person-popup template) | UI | - | - | LIVE (person dialog; dialog-person test) |
| S3-69 | One word 'Thien cam'; names without numbers | OD:L352,L394 | LIVE-FIXED | j84.js:80 rewrites old 'than +-N' to 'thien cam'; small-bugs-3-r1 merged; test rel-words-scan.js 0 hits | UI | - | - | LIVE (j84 rewrite; rel-words-scan 0) |
| S3-70 | Relation lines one kit component; thien cam + oan | OD:L360,L362 | LIVE-FIXED | jkrel.js (KIT 52) + fix-float-r9 merged (jint, jnight, jkrel in assemble); tests rel-row.js, rel-audit.js | UI | - | - | LIVE (jkrel; fix-float r9 merged) |
| S3-74 | ~613 more act pictures; Emperor costume original style | OD:L364 | LIVE-FIXED | act-pics2 complete on CDN; 2 Qing-hat Emperor pictures fixed (stC note: ev-hoang-de-gian, -vui); rule gold crown/Ming hat. Full Emperor audit not re-run (art, CDN) | UI (art) | - | - | LIVE art on CDN; Emperor Qing-hat pics fixed |
| S3-75 | Her court emblem above head (8 tiers, bob, Dung to switch) | OD:L366,L390,L411 | LIVE-FIXED | jmark.js (head marks, OD:L1079 bob+glow), jpromo.js puts rank's head mark in chest; test crest-sheet.js | UI | - | - | LIVE (jmark emblem; promo chest) |
| S3-77 | 'Dang mac' one word for every worn item | OD:L369 | LIVE-FIXED | j84.js:84 maps Dang cai/Dang deo/Dang dung -> Dang mac; VANPHONG.md:56. Only j84 holds 'Dang cai' now (grep) | UI | - | - | LIVE (j84 maps Dang cai to Dang mac) |
| S3-78 | Gifts at start from brocade box; rank outfit via chest on entry + promotion | OD:L370 | LIVE-FIXED | jpromo.js full set per rank, jeitem.js girlhood chest; promo-rules-r1 merged (0d425b5a); test promo-rules.js | UI | - | - | LIVE (jpromo set; jeitem start chest) |
| S3-79 | Equipment slot panel = standard dialog size, no Lui | OD:L371 | LIVE-FIXED | jinv.js kitEquipSlots (col layout, grows to 112px); item-info.js test; size/Lui not re-shot by this sweep | UI | - | - | LIVE (jinv equip slots; test item-info) |
| S3-82 | Demotion/cold palace: above-rank items confiscated in a scene (eunuch + tray) | OD:L374 | NOT-FIXED | Only KIT 66.2 kitGloom FX (j93) and jdh2.js confiscation of SAC PHONG/title items exist. No Noi vu phu eunuch person-dialog + item tray scene for above-rank worn items (grep tich bien/thu lai: only pets jpetcare.js:56). j8.js:265 has vuot pham seizure by Emperor at night only | UI | M | demotion-scene (kitGloom + eunuch tray) | NOT DONE: no eunuch-tray scene for demotion confiscation |
| S3-84 | Bang vang podium: big figures, name plate podium, medals, frame by rank, one title | OD:L378 | ON-BRANCH | j90.js kitPodium on main (tests podium.js, podium-place.js, 'podium beam' f7097061b); ranking-list half (frame by highest rank, medals row) sits in review/rank-port-r2 BLOCKED on kit rows (same job as S3-41) | UI | M | rank-port (leaderboard + Bang vang list) | PARTLY LIVE: j90 podium live; ranking list on rank-port-r2 |
| S3-87 | Act pictures anatomy re-audit | OD:L383 | LIVE-FIXED | act-pics2: hand audit 24 bad pictures redrawn (OD:L969), complete on CDN; art-complete-p2 DONE. New Luan hoi figure anatomy report (OD:L1452) is a separate figure job | UI (art) | - | - | LIVE art on CDN; hand audit done |
| S3-90 | One odds function odA for every act | OD:L394 | LIVE-FIXED | j8.js:36 od()=odA(S,..); odA( used in 26 modules (j8 21x, j10, j75, j78, jgift, jpoison, jtwoway...); no second odds function found | no | - | - | LIVE (odA used in 26 modules) |
| S3-103 | Every image used by 2+ events gets its own picture | OD:L428,L451,L458 | LIVE-FIXED | 73 banners live; opt-pics3, pic-dupes-r2, placeholder-pics3 passed; 'tam' marker on placeholders (CHANGE.txt); test pic-dupes.js, placeholder-pics.js. Remaining drawn-art leftovers cannot be proven from code | UI (art) | - | - | LIVE; leftovers show 'tam' placeholder marker |
| S3-114 | Doan ngo invitation own picture, labels not over heads | OD:L444 | LIVE-FIXED | festival banners: jevban.js, fest-art.js test on main; j71 doanngo events; label placement not re-shot | UI | - | - | LIVE (festival banners; fest-art test) |

## Jobs (NOT-FIXED / ON-BRANCH)
1. appearance-art-2 (art, L): S2-59. Draw pregnancy figures (6/9 months), nun figure, duong nhan glow, early grey strands, smallpox marks, then register with KIT_FACEFX.add (jface.js) and set ready:true after owner pilot. Kit part: existing face-fx layer, no new part.
2. demotion-scene (UI, M): S3-82. On demotion / lanh cung: Noi vu phu eunuch person dialog + item tray carrying above-rank worn items, decree line (extends KIT 66.2 kitGloom, jdh2/jpromo hooks; parts: person dialog, kitLose/kitItem). Kit part exists (KIT 66.2, 54.1); likely no new kit request.
3. rank-port (leaderboard + Bang vang ranking list, UI, L): S3-41, S3-84 (ranking-list half). review/rank-port-r2 d8636053; needs kit keeper to build kitRankList/kitRankRow + kitRankFoot (KIT_REQUESTS A/B) first, then Worker+D1 deploy of ctm-rank.
4. owner-decision (S): S3-33 repo history slimming: needs owner yes/no (images already on CDN).

UNVERIFIABLE: S3-33 (owner decision). CLOSED: none in this slice. COOP: none (S2-48 co-op friendHome part -> coop-thin Foreman B).


# Appendix E2

# E2 sweep: OWNER_LEDGER §3 rows 116-228, §4, §7 (D1-D49) re-checked on live main (7abaf07ac, 17/11/2026 01:39Z)

Method: code/test/PROGRESS presence on origin/main (extracted to /tmp/claude-0/sweep/m), CDN manifests (img/_index.json, FIGURES.json), handover reports + CLAIMS + FOREMAN_*_STATUS, OD tail. Plain LIVE / RULE / CLOSED ledger rows skipped. Art lives on the CDN, so art rows say "CDN" where the proof is a manifest or a looked-at image.
Branch list checked with `git ls-remote`; ON-BRANCH states come from CLAIMS/FOREMAN status (last known).

| ID | short ask | OD/ledger ref | verdict | evidence / where | UI? | size | job group | new ledger status text |
|---|---|---|---|---|---|---|---|---|
| S3-122 | Decimals rounded at write + old saves; thù->oán; log real outcome | OD:L461,L493 | LIVE-FIXED | dev/build/jint.js on main (whole numbers, deser rounding); PROGRESS_fix-float.md e30e76903 | n | - | - | LIVE (fix-float on main: jint.js whole numbers) |
| S3-123 | Tuần lục overflow, copied card text, chips never wrap | OD:L462 | LIVE-FIXED | fix-float on main: jkrel.js kbkClean drops card text/fractions/".."; kitRelTable | y | - | - | LIVE (fix-float on main, jkrel.js) |
| S3-125 | Night notes bundle (last: new day after tranh sung) | OD:L467 | LIVE-FIXED | dev/build/jnight.js S.toMorning ends the day after a night; later night-final rework | y | - | - | LIVE (jnight.js on main) |
| S3-126 | Event choices honest; skilled play beats random (bot proof) | OD:L466,L469,L477,L478 | NOT-FIXED | UI/hints/risk labels LIVE (opt-render, pick-hint). Bot proof missing: PROGRESS_balance-pass.md L73-74 "hint does NOT clearly beat random"; suggested lever BAL.ctxTaste 12->18 / ctxCap 22->30 (jevb.js). No later measure found | n | S | bot-proof-hint | LIVE except bot proof hint>random unmet (balance lever) |
| S3-130 | Outfit/makeup reactions as event frames | OD:L473 | LIVE-FIXED | jtoilr.js: Ghi han / Mach Hoang hau / Tang lai / Hoi bi quyet (D27) | y | - | - | LIVE (jtoilr.js incl. extra reaction buttons) |
| S3-131 | Huadian size 8.5% + motif rule (no fruit/beads) | OD:L476,L490,L512,L529,L592,L1104,L1451 | NOT-FIXED | Art only (CDN). CLAIMS: C9 "PART DONE: 72 por fixed"; r3 FAIL list (c14 t4/t5 discs, rings/beads m48/m14/m34/c28) never finished; ty1-8 folded into whole-figure regen review/fig-cutout-clean (branch NOT pushed). Owner repeated 20:38Z (Luan hoi huadian too big) | n (art) | L | fig-cutout-clean | PARTIAL: 72 por fixed on CDN; r3 FAIL list + Luan hoi still open |
| S3-132 | Tuần lục person page fixed template, avatar border, name colours | OD:L479,L481,L503 | LIVE-FIXED | jkrel.js kitRelTable (KIT 52); small avatars no ring (jk2b); PROGRESS_fix-float | y | - | - | LIVE (fix-float on main) |
| S3-135 | Action pictures few people; story pictures may have people | OD:L492 | LIVE-FIXED | act-pics2 complete on CDN (803/804 keys, art-complete-p2 report); test act-pics.js on main | n | - | - | LIVE (act pictures complete on CDN; rule kept) |
| S3-136 | Evidence lines real source, ranks, decimals, ".." | OD:L494,L495 | LIVE-FIXED | fix-float: "(nguon: tai mat cua ta thay tan mat)", kbkClean, j79 current rank in log; evidence-truth LIVE | y | - | - | LIVE (fix-float + evidence-truth on main) |
| S3-137 | Tuần lục every page has a full-body figure | OD:L496,L511 | LIVE-FIXED | PROGRESS_fix-float: every page has subject figure, kit silhouette fallback; flow-merge cancelled 17:45Z | y | - | - | LIVE (fix-float on main) |
| S3-142 | Son direct promotion; daughter/servant roads = exams | OD:L525,L590 | LIVE-FIXED | jpromo.js + jexam.js; promoReward in j8.js/jexam.js/jreign.js (promo-skip: first prince direct, later sons/princess exam waived) | n | - | - | LIVE (promo-rules + promo-skip on main) |
| S3-144 | One kit label/value table; s8 row alignment | OD:L506 | LIVE-FIXED | kit-table + row-align: PROGRESS_row-align.md, test rel-row.js, KIT section 51 column cap | y | - | - | LIVE (kit-table + row-align on main) |
| S3-145 | Stipend items real + chest; item skimming | OD:L507,L508 | LIVE-FIXED | jstip.js + jeitem.js (D6: skimming also items, ice/charcoal by rank, girlhood chest) | y | - | - | LIVE (econ-stipend + econ-items on main) |
| S3-149 | Figure background silk hanging scroll behind every figure | OD:L526,L646,L649 | CLOSED | KIT.md section 61 "FIG-BG NOT SHIPPED (owner 16/11 13:30Z, OD:L1314)"; no jfigbg in build | n | - | - | CLOSED: owner dropped painted scroll behind figures (OD:L1314) |
| S3-151 | People animations (13-item list) | OD:L527,L610 | NOT-FIXED | promotion/demotion live (jpromo.js); rest (slap, death, pregnancy, birth, poisoned, alliance...) not wired: PROGRESS_fxkit.md "NOT wired yet: harm, poison, rumour, seal..." | y | M | presentation-wiring | PARTIAL: promotion/demotion live; other 11 animations unwired |
| S3-152 | Event entrance animations (edict scroll); frames by ORIGIN (9 styles); side-story frames | OD:L528 | NOT-FIXED | jpres.js sets data-kpres-origin only; its header says "the 9 origin frames need kit art = KIT REQUEST"; no entrance anim | y | M | presentation-wiring | NOT DONE: origin frames + entrance animation (kit part + art needed) |
| S3-156 | Act pictures: no faces; dark = gloomy for scheming | OD:L542-545,L638 | LIVE-FIXED | act-pics2 art complete on CDN; act-pics.js test on main | n | - | - | LIVE (act pictures redrawn, on CDN) |
| S3-157 | 4 placeholder pictures + missing list | OD:L548-551 | LIVE-FIXED | PROGRESS_placeholder-pics2/3: e68 drawn, 0/304 events 0/98 acts on placeholder; "tam" mark on stand-ins (CHANGE line) | n | - | - | LIVE (placeholders drawn; stand-ins marked "tam") |
| S3-158 | Makeup picked colours show exactly on her picture | OD:L555 | LIVE-FIXED | mk-colour merged (OD:L1190 "makeup colours + reveal"); test mk-colour.js; later diemtrang-fx/score LIVE (batch 0032) | y | - | - | LIVE (mk-colour on main; fits for 12960 pictures) |
| S3-159 | Thai y monthly pulse, early pregnancy, bribed physician | OD:L558,L625-629 | LIVE-FIXED | dev/build/jthaiy.js (22x "bat mach"), test thaiy.js | y | - | - | LIVE (thaiy on main) |
| S3-160 | Night-end pictures by mood, sound, new-day picture | OD:L561-564 | LIVE-FIXED | jne.js on main (night-end-r3, kitSceneEnd KIT 81); test night-end.js | y | - | - | LIVE (night-end on main, jne.js) |
| S3-161 | Art completeness 4 age bands x every rank | OD:L567 | LIVE-FIXED | jartc.js on main; art-complete-p2: 48/48 grown kids x a26/a36/a51 on CDN, act-pics2 complete, eunuch ranks 360/360 (reports/art-complete-p2.md) | y | - | - | LIVE (jartc.js; groups A, eunuch ranks, grown kids drawn) |
| S3-162 | Recipes learnt/bought, fatigue, tastes, allergies, 4 sub-styles | OD:L568-576,L675,L695 | LIVE-FIXED | jrcp.js on main (assemble list), test recipes.js; "recipes" in OD:L1190; her OWN allergy not modelled (see D39) | y | - | - | LIVE (recipes on main, jrcp.js) |
| S3-164 | bac road = equal-value other road (balance rule) | OD:L582 | LIVE-FIXED | balance-pass-r1 merged (merge-train-6 f645f82ce); rule kept | n | - | - | LIVE (balance-pass on main; rule stays) |
| S3-165 | Pre-palace route re-ported onto main | OD:L585 | LIVE-FIXED | outside-r2-r2 LIVE c4e89f89b (HANDOVER_SESSION9 s10 07:10Z); jkc.js on main | y | - | - | LIVE (outside-r2-r2 on main, jkc.js) |
| S3-168 | Pet decisions: life-save at Linh thu; label "No" | OD:L593,L613,L707,L708 | LIVE-FIXED | jpet.js/jpetcare.js/jpetlife.js on main; test pets.js | y | - | - | LIVE (pets on main) |
| S3-169 | Co-op pet help/harm/steal | OD:L594 | COOP | code + test coop-pets.js on main (jcoopworld.js); co-op now rebuilt -> coop-thin (Foreman B), not a job | y | - | coop | LIVE (coop-pets on main); co-op rebuild = coop-thin |
| S3-170 | Thai hau thinh an not flat +8; personality-dependent | OD:L598 | LIVE-FIXED | jtrong.js (trong + Thai hau archetypes + ONE greeting rule); personality-r1 PASS | y | - | - | LIVE (jtrong.js on main) |
| S3-171 | Personality groups + trong (13 virtues) for everyone | OD:L599 | LIVE-FIXED | jtrong.js on main; test trong-check.js | y | - | - | LIVE (jtrong.js on main) |
| S3-172 | Sims-like mood bar | OD:L600 | LIVE-FIXED | dev/build/jmood.js (S.mood.v -100..100, BAL.mood) | y | - | - | LIVE (jmood.js on main) |
| S3-173 | Stipend skimming also items | OD:L601 | LIVE-FIXED | jstip.js + jeitem.js (one step worse grade, ice -> broken ice) | y | - | - | LIVE (econ-items on main) |
| S3-174 | Poison Emperor / Thai hau possible with risk | OD:L602 | NOT-FIXED | jpoison.js:12,76 forbids ("Hoang thuong va Thai hau luon co nguoi nem thu"); only NPC/assassination deaths via jmort.js. Player road never built; post-freeze (OD:L1402) | y | M | emperor-poison-road | NOT DONE: no player road to poison Emperor / Thai hau (rules only) |
| S3-175 | Emperor visits her palace and stays the night | OD:L603 | LIVE-FIXED | jvisit.js on main (emperor-visit via ghen-shown-r1-golive 7ee482e0); test emperor-visit.js | y | - | - | LIVE (jvisit.js on main) |
| S3-176 | Stolen clothes: worn/wardrobe target; re-issue; odds | OD:L604 | LIVE-FIXED | jeitem.js + jty.js (reissue roads, delay by rank) per PROGRESS_econ-items | y | - | - | LIVE (econ-items on main) |
| S3-177 | Girlhood chest fills 6 slots | OD:L605 | LIVE-FIXED | jeitem.js girlChest (6 things, skipped when home road ran) | y | - | - | LIVE (econ-items girlChest on main) |
| S3-178 | Promotion rewards full set + new servant reveal | OD:L606 | LIVE-FIXED | jpromo.js + small-art-wire (pendants/bangles/sachets/maid robes on CDN) | y | - | - | LIVE (promo-rules + small-art-wire on main) |
| S3-179 | Header keeps only her info | OD:L607 | LIVE-FIXED | header-own: worker found it already true on main (orphan-audit #32); test header-own.js on main | y | - | - | LIVE (header shows only her info) |
| S3-180 | Sound by event group + voices | OD:L608 | NOT-FIXED | Sound + music by group LIVE (jpres.js sfx/mus tables; jsfx.js); voices only as fallback when j36 finds none; no group voices set | n | S | presentation-wiring | PARTIAL: sound/music by group live; group voices not done |
| S3-181 | Event frames by group / main / side story | OD:L609 | NOT-FIXED | jpres.js data hooks only (data-kpres-grp/story/origin); frame art per group/origin not built | y | M | presentation-wiring | PARTIAL: group hooks live; frame art per group/origin missing |
| S3-182 | 13 approved animations | OD:L610 | NOT-FIXED | see S3-151 (promotion/demotion only) | y | M | presentation-wiring | PARTIAL: 2 of 13 animations live |
| S3-183 | Update notes popup + Settings "Thong tin cap nhat" | OD:L611 | LIVE-FIXED | jnotes.js + j74.js; CHANGE.txt shown in menu; test update-notes.js | y | - | - | LIVE (update notes on main) |
| S3-184 | History + game-design expert workers -> ideas, then build | OD:L612 | IDEA | docs only; memories + hook ledger LIVE (jmem.js); rest parked by FEATURE FREEZE OD:L1402 (dev/PARKING_LOT.md) | n | L | ideas-parked | PARTIAL: memories live; remaining ideas parked (freeze OD:L1402) |
| S3-186 | Calendar ideas a-j; Tran nu seal on every event frame | OD:L620,L621,L711 | LIVE-FIXED | jmcal.js (KIT 58.3-58.6) + jseal.js; PROGRESS_review-cal-plus.md | y | - | - | LIVE (cal-plus on main, jmcal.js) |
| S3-187 | Hands/neck match face tone; look1 rosy | OD:L622 | CLOSED | rosy layer REMOVED by owner (OD:L1303,L1305 "bo lop da hong ra"); skin-audit-r1 PASS d16535c68 for tone match | n | - | - | CLOSED: rosy skin removed by owner OD:L1305; tone match done |
| S3-188 | Monthly cycle; Kinh su phong book | OD:L632-635 | LIVE-FIXED | jcycle.js on main (cycle-r3 + cycle-art-r1 merged); test cycle.js | y | - | - | LIVE (cycle on main, jcycle.js) |
| S3-189 | Phe phi Ly stays when a rival is sent to Lanh cung | OD:L641 | ON-BRANCH | review/npc-death-r1 5f58a715 PASS, golive 33e1bc22 (reports/npc-death.md); HOLD: needs j95 place record -> review/npc-death-wire (not pushed) (FOREMAN_D_STATUS L263) | y | M | npc-death-wire | ON BRANCH npc-death-r1 PASS 5f58a715, held for j95 place record |
| S3-190 | All NPCs can die; replacements new faces; posts empty | OD:L642 | ON-BRANCH | same branch; main has jmort.js lifespan/death only, no replacement | y | M | npc-death-wire | ON BRANCH npc-death-r1 PASS 5f58a715, held for j95 place record |
| S3-191 | Phe phi Ly side story | OD:L643 | LIVE-FIXED | jreign.js rgl_ly1-3 on main (reign-road) | y | - | - | LIVE (Ly side story in jreign.js) |
| S3-192 | Real side stories from NPC life goals | OD:L644 | ON-BRANCH | D5 cancelled -> NPC roads (OD:L1252): review/npc-roads-r1 83d84225 HOLD, merge-fix review/npc-roads-fx RUNNING (CLAIMS L397); npc-agent-r1 RUNNING (CLAIMS L494); nothing on main | y | L | npc-roads | ON BRANCH npc-roads-fx RUNNING (Foreman D); needs story14 first |
| S3-194 | End-of-day card-flip scene | OD:L651-656,L672 | COOP | cardflip-smooth LIVE; flip-entry-r1 LIVE (batch-2300). Co-op pick still local -> coop-thin (Foreman B) | y | - | coop | LIVE (cardflip + flip-entry); co-op pick = coop-thin |
| S3-195 | Painted effects kit | OD:L662,L663 | LIVE-FIXED | jfxkit.js (KIT 68) on main, test fxkit.js, 24 kinds | y | - | - | LIVE (fxkit on main, jfxkit.js) |
| S3-196 | Night follow-ups (records, mockery, music, ram/festival) | OD:L666-669 | LIVE-FIXED | jne.js section 4 + KIT 62.5 (PROGRESS_night-end-r2.md "Follow-ups L666-669") | y | - | - | LIVE (night-end follow-ups in jne.js) |
| S3-197 | Co-op buoi timer | OD:L678-680,L741-744,L757,L765 | COOP | jcooptimer.js + test coop-timer.js on main; further co-op faults -> coop-thin (Foreman B) | y | - | coop | LIVE (coop-timer on main); further co-op = coop-thin |
| S3-198 | Poem calligraphy, incense colours, dress no rack, chubby pets | OD:L682-688 | LIVE-FIXED | PROGRESS_item-art.md: 44 poems, 44 incense, 25 dresses w/o rack, 8 pets; r5 PASS aedcca1ed, art on CDN | n | - | - | LIVE (item-art r5 on CDN) |
| S3-199 | Big centre item display hi-res, frameless | OD:L686 | LIVE-FIXED | jk2b.js "KIT 28.13b BIG ITEM (D3 item-big)": sizes lg/xl frameless, kitItemBigSrc | y | - | - | LIVE (item-big on main, kitItemBigSrc) |
| S3-200 | Makeup presets 8+8, lips anchored per face | OD:L687,L747 | LIVE-FIXED | PROGRESS_mk-colour.md L69 (8 dep + 8 diem + 8 vung looks; anchors img/mk-fit for 12960 pictures) | y | - | - | LIVE (mk-colour presets on main) |
| S3-201 | Scene pictures landscape AND portrait | OD:L691 | RULE | applied in night-end, cardflip (cf-gplate-*-p), jne; keep as rule | n | - | - | RULE (applied; keep for new scenes) |
| S3-202 | Every art/work kind exactly 4 sub-styles; Tu duc 4 sub-styles | OD:L695,L696 | LIVE-FIXED | jtds.js (D16) + recipes jrcp.js on main; PROGRESS_tuduc-sub.md | y | - | - | LIVE (tuduc-sub + recipes on main) |
| S3-203 | "Hoc thanh tai" painted level-up scene | OD:L712 | NOT-FIXED | no code or art (grep 'thanh tai' only text; no img/ key on CDN); B status "HELD art + after fxkit"; fxkit now live | y | M | level-up-scene | NOT DONE: painted hoc thanh tai scene (needs art + fxkit wiring) |
| S3-204 | Perf budget, Hieu ung Day du/Gon, perf test | OD:L713-719 | LIVE-FIXED | PROGRESS_perf.md: first load 911.9 MB -> 43.3 MB; dev/test/perf.js + perf-budget.json; OPT.fxon setting (j11) | y | - | - | LIVE (first load 43 MB; perf test on main) |
| S3-205 | Painted animations for all moments (15-item list) | OD:L722-738 | NOT-FIXED | library live (jfxkit.js); wiring partial (jpres.js group fx); not wired: harm, poison, rumour, seal (PROGRESS_fxkit.md L35-38) | y | M | presentation-wiring | PARTIAL: effect library live; many events not wired yet |
| S3-206 | CDNH works 10 per kind x 4 tiers with art, giftable | OD:L748,L760 | LIVE-FIXED | jtds.js (4 kinds x 10 x 4 tiers x 4 loi); tuduc-pic-r1 art (CDN) | y | - | - | LIVE (tuduc-sub + tuduc-pic on main) |
| S3-207 | Draw 128 old-save player looks + 56 old-love men | OD:L749,L751 | NOT-FIXED | CDN: only 20 fig-player-look files (look1-4 t1 x4 ages + t3 a18) vs 128 needed (t2-t8 + cold x 4 ages x 4 looks); no report of the 56 men | n (art) | L | art-complete-rest | NOT DONE: 108 player-look figures + 56 men still undrawn (CDN) |
| S3-208 | Foreign princess origin visible + 1 more with story | OD:L750 | LIVE-FIXED | jorigins.js: bd (Bac Dich) second origin with own story; ORIGIN_LORE. Own-costume art still WIP (review/foreign-princess-samples a1743672; C v8) | n | - | foreign-princess-art | LIVE origin+story (jorigins.js); costume art WIP |
| S3-209 | "Bieu qua lam lanh" accepts a work/item | OD:L752 | NOT-FIXED | no act of that name in j*.js; API ready: jlux.js luxGift(k,from,to) "for D19"; Foreman B held it | y | M | bieu-qua-lam-lanh | NOT DONE: Bieu qua lam lanh with item/work (jlux.luxGift ready) |
| S3-210 | Dress contest themes + luxury range per occasion | OD:L753,L761,L762 | LIVE-FIXED | jlux.js (luxRange/luxVerdict/luxCtx); luxury-r1 PASS; test luxury.js | y | - | - | LIVE (luxury on main, jlux.js) |
| S3-211 | Weather redone with painted effects | OD:L754 | LIVE-FIXED | weather-fx-one-r1 LIVE 2940a545; weather-fx3-r1 LIVE 594415aa (CLAIMS L77, L379) | y | - | - | LIVE (weather-fx-one + fx3 on main) |
| S3-212 | Spread events across buoi, cap, histogram | OD:L766 | LIVE-FIXED | dev/build/jspread.js; test spread-e2e.js; PROGRESS_spread-events.md | y | - | - | LIVE (spread-events on main) |
| S3-213 | Makeup final-look reveal scene | OD:L769-775 | LIVE-FIXED | toilReveal (KIT 60.5), diemtrang-fx-r1 golive 08725411 (CHANGE: "tu tay to ... toan than roi can mat") | y | - | - | LIVE (makeup reveal on main) |
| S3-214 | 8 vung looks | OD:L778 | LIVE-FIXED | PROGRESS_mk-colour.md L69 (commit 973729653, in jtoil) | y | - | - | LIVE (vung looks on main) |
| S3-217 | Her figure's face hazy on stage | OD:L785 | LIVE-FIXED | PROGRESS_face-sharp.md: cause = infinite animation on her picture; static now; test face-sharp.js. HD upscale (face-sharp-hd2) never pushed; fig-cutout repaint separate | n | - | fig-cutout-clean | LIVE (animation blur fixed); HD upscale rides on fig-cutout-clean |
| S3-218 | Rank colour in pickers and every name+rank | OD:L795,L821 | LIVE-FIXED | KIT kitRankTone/kitNameRank; tests rank-colour.js, rank-name-scan.js on main | y | - | - | LIVE (rank-colour on main) |
| S3-219 | Odds explanation one clear sentence | OD:L799 | LIVE-FIXED | pick-hint rewrote the family (OD:L925); test pick-hint-scan.py on main | y | - | - | LIVE (pick-hint on main) |
| S3-221 | Hau cung portrait: close top gap, widen frame | OD:L802-805 | LIVE-FIXED | test hc-portrait.js on main (hc-portrait merged: names list "hc-portrait: YES") | y | - | - | LIVE (hc-portrait on main) |
| S3-222 | Gift picker as Tu trang picture grid + painted gift animation | OD:L807-810 | LIVE-FIXED | jgpick.js (4 kitFx calls), fxkit sprites gift/gift-hands (KIT 68); PROGRESS_gift-pick.md | y | - | - | LIVE (gift-pick on main, gift animation) |
| S3-223 | Label/value rows share one label column | OD:L812-815 | LIVE-FIXED | PROGRESS_row-align.md, review-row-align-r2; test rel-row.js | y | - | - | LIVE (row-align on main) |
| S3-224 | Mood dialog picture per mood + corner icon | OD:L817-821 | LIVE-FIXED | jcmood.js; PROGRESS_mood-dialog.md (corner seal KIT 28.19b, 40 cause wordings mapped) | y | - | - | LIVE (mood-dialog on main) |
| S3-225 | Tap any item cell -> item detail; wear via button | OD:L823-826 | LIVE-FIXED | jitd.js kitItemRef/kitItemDetail/kitItemTap (KIT 70); test item-info.js | y | - | - | LIVE (item-info on main, jitd.js) |
| S3-226 | Mood dialog picture = CAUSE event's picture | OD:L827 | LIVE-FIXED | PROGRESS_mood-dialog.md cause mapping (70 distinct causes to fitting picture) | y | - | - | LIVE (mood-dialog cause picture on main) |
| S3-227 | Dialog figure column capped per KIT 32.2; face whole | OD:L829-833 | ON-BRANCH | stage-figsize-r1 LIVE (golive batch 2); BUT owner repeat OD:L1492 17/11 02:00Z "feet cropped in every frame": review/fig-feet-crop-2 c269e2fc9 (kszFeetFit in jksize.js; 0/155 cut vs 33/155) waiting for reviewer | y | S | feet-crop | LIVE cap; feet-crop fix on review/fig-feet-crop-2 c269e2fc9 waiting review |
| S3-228 | Redraw Thinh an Hoang hau picture (hands) + malformed-hands audit | OD:L835-838 | LIVE-FIXED | test thinhan-art.js on main; act-pics2 complete on CDN | n | - | - | LIVE (thinh an art + hands audit on CDN) |
| S4-resultsfx | Result sound win/fail on every result, iPhone unlock | H7:L87 | LIVE-FIXED | result-sfx-r1 on main (test result-sfx.js). Default still OFF: j11.js:4 SND_DEFAULT=false = OPEN owner question | n | S | - | LIVE (result-sfx); sound-on default is an OPEN owner question |
| S4-844x390 | 844x390 stage name tags overlap | H7:L117 | LIVE-FIXED | PROGRESS_j59-fix-r1.md + stage-slots tests on main (stage-figsize/stage-slots-fix) | y | - | - | LIVE (j59-fix on main) |
| S4-coopB1B5 | Co-op broken list B1-B5 | H7:L80 | COOP | coop-b1b5-fix-r1 LIVE 392fff60 (FOREMAN_D_STATUS L12); co-op now = coop-thin (Foreman B) | y | - | coop | LIVE (coop-b1b5-fix); further co-op = coop-thin |
| S4-uatest | Real-phone UA test mode | H7:L105 | LIVE-FIXED | PROGRESS_ua-test.md, tests device-selftest.js / host-safe-area.js on main | n | - | - | LIVE (ua-test on main) |
| S4-mole | Whole-game mole audit (demole_por.py) | PM:L335 | NOT-FIXED | review/mole-audit-r2 @474f735 PAUSED (art pause, fixes were local-only, FOREMAN_C L447/L417); 8,747 por scanned, real moles c07/c08/c16/c17/eunuchs; whole-figure repaint (fig-cutout-clean) overlaps | n (art) | M | fig-cutout-clean | PAUSED: mole audit on review/mole-audit-r2; redo on top of repaint |
| S4-c12a51 | consort-c12-ty5-a51 pale patch over eyes | PM:L337 | LIVE-FIXED | CDN img/por-consort-c12-ty5-a51.webp looked at 17/11: eyes/forehead clean (FOREMAN_C L447 "D24 DONE + uploaded") | n | - | - | LIVE (c12-ty5-a51 redrawn on CDN) |
| S4-veilzoom | jk2b veil/scar box follows jkpor zoom (D25) | PM:L337 | ON-BRANCH | review/veil-zoom-r3 d236f309 PASS (conditional kit sign-off KIT 28.8 Zoom-follow); not on main (no "Zoom-follow" in KIT.md, no veil-zoom test) | y | S | veil-zoom | ON BRANCH veil-zoom-r3 PASS d236f309, needs kit sign-off + batch |
| S4-toilbtn | Toilette extra reaction buttons | H7:L41 | LIVE-FIXED | jtoilr.js (toil-react) on main | y | - | - | LIVE (toil-react on main) |
| S4-figexport | Fig export >=1100 px | PM:L223,H7:L102 | NOT-FIXED | figures native <=900 px (fig-cutout-clean.md); fig-hd-upscale never pushed; hi-res arrives only via whole-figure transparent 4k repaint (fig-cutout-clean, branch not pushed). Layout side fixed by stage-figsize | n (art) | L | fig-cutout-clean | NOT DONE: figures still <=900 px; rides on fig-cutout-clean repaint |
| S4-outsideart | Outside-route art gap | PM:L330,H8 s3 | LIVE-FIXED | PROGRESS_outside-art.md (kc-* scenes, huynh truong, map) + OD:L1190 "outside art"; outside-r2-r2 live | n | - | - | LIVE (outside-art on main/CDN) |
| S4-leftovers | Small leftovers (Vi sao, Phi ???, theo long nang, ?kit vs #kit, Dang cai, header Duc !) | PM:L224..L308 | LIVE-FIXED | small-bugs-4 in OD:L1190 LIVE; PROGRESS_small-bugs-4.md, test small-bugs-4.js | y | - | - | LIVE (small-bugs-4 on main) |
| S4-smallart | Earrings/shoes art, guard 4 indigo, c02-t1-a18 grey skin | AM:L34 | LIVE-FIXED | PROGRESS_small-art.md (G1-G4 sheets, guard 4, c02-t1-a18 redone), small-art-wire live | n | - | - | LIVE (small-art + small-art-wire on main) |
| S4-schedules | Consorts move by schedule not random | AM:L32 | LIVE-FIXED | dev/build/j95.js (+j95b/j95c) on main; schedules3 merged (names list); test roster_*.js | y | - | - | LIVE (j95 schedules on main) |
| S4-waterbowl | Water-bowl picture; MUU seal on route minigame | AM:L48 | LIVE-FIXED | PROGRESS_routes-port.md: img/kit/mg-nghiem-bowl.webp; scheme-games port owns MUU seal (jsgame.js) | n | - | - | LIVE (water-bowl picture + routes on main) |
| S4-allergy | Her own allergy not modelled in recipes | PM:L326 | NOT-FIXED | PROGRESS_recipes.md L48 "Her own allergy is NOT modelled"; jrash.js is rash overlay only (her rash from pollen/son phan exists) | n | S | her-allergy | NOT DONE: her own food/gift allergy to recipe allergens |
| S4-kitreltable | kitRelTable section 52; avatar without square | KR:L7,L9 | LIVE-FIXED | jkrel.js kitRelTable on main; jk2b avatar ring removed | y | - | - | LIVE (kitRelTable on main) |
| S4-k3wrap | k3 top state row wrap rule | KR:L11 | LIVE-FIXED | small-bugs-3 merged (PROGRESS_review-small-bugs-3, test small-bugs-3.js) | y | - | - | LIVE (small-bugs-3 on main; close KR row) |
| S4-ideasopen | IDEAS_OPEN "Open" list stale | main dev/IDEAS_OPEN.md | NOT-FIXED | main dev/IDEAS_OPEN.md still lists items 1-9 as Open (all built/decided); "Closed" empty | n | S | housekeeping | NOT DONE: move IDEAS_OPEN items 1-9 to Closed (coordinator) |
| D1 | result-sfx distinct win/fail sound, sound on by default | H7:L87 | LIVE-FIXED | see S4-resultsfx; only default-on = open owner question | n | S | - | LIVE; sound-on default = open owner question |
| D2 | item-art poems/incense/dresses/pets | OD:L682-688 | LIVE-FIXED | see S3-198 | n | - | - | LIVE (item-art r5 on CDN) |
| D3 | item-big centre display | OD:L686 | LIVE-FIXED | see S3-199 | y | - | - | LIVE (item-big on main) |
| D4 | NPC death + new faces + Ly | OD:L641-643 | ON-BRANCH | see S3-189/190 (Ly story live) | y | M | npc-death-wire | ON BRANCH npc-death-r1 PASS 5f58a715, held for j95 place record |
| D5 | real side stories from NPC goals | OD:L644 | ON-BRANCH | superseded by NPC roads (OD:L1252); see S3-192 | y | L | npc-roads | ON BRANCH npc-roads-fx RUNNING (replaces D5) |
| D6 | econ-items | OD:L601,L604,L605 | LIVE-FIXED | jeitem.js | y | - | - | LIVE (econ-items on main) |
| D7 | personality + trong + Thai hau archetypes | OD:L598,L599 | LIVE-FIXED | jtrong.js | y | - | - | LIVE (jtrong.js on main) |
| D8 | emperor: poison roads; visits her palace | OD:L602,L603 | NOT-FIXED | visit LIVE (jvisit.js); poison-road NOT built (see S3-174) | y | M | emperor-poison-road | PARTIAL: Emperor visit live; poison-the-Emperor road not built |
| D9 | header only her info | OD:L607 | LIVE-FIXED | see S3-179 | y | - | - | LIVE (header-own on main) |
| D10 | update notes popup + Settings | OD:L611 | LIVE-FIXED | jnotes.js | y | - | - | LIVE (update notes on main) |
| D11 | presentation: sound/voices, frames by group/main/side, animations | OD:L528,L608-610,L722-738 | NOT-FIXED | jpres.js live (sound, music, fx by group; data hooks); missing: voices, 9 origin frames, entrance animations, full wiring | y | L | presentation-wiring | PARTIAL: jpres.js live; origin frames/voices/animation wiring open |
| D12 | Sims-like mood bar | OD:L600 | LIVE-FIXED | jmood.js | y | - | - | LIVE (jmood.js on main) |
| D13 | spread events across buoi | OD:L766 | LIVE-FIXED | jspread.js | y | - | - | LIVE (spread-events on main) |
| D14 | painted hoc thanh tai scene | OD:L712 | NOT-FIXED | see S3-203 | y | M | level-up-scene | NOT DONE: painted hoc thanh tai scene |
| D15 | download size + perf test | OD:L714-719 | LIVE-FIXED | see S3-204 | n | - | - | LIVE (43 MB first load; perf test on main) |
| D16 | Tu duc sub-styles + CDNH works | OD:L696,L748,L760 | LIVE-FIXED | jtds.js + tuduc-pic | y | - | - | LIVE (tuduc-sub on main) |
| D17 | luxury / xa xi + contest themes | OD:L753,L761,L762 | LIVE-FIXED | jlux.js | y | - | - | LIVE (luxury on main) |
| D18 | foreign princess origin + 1 more | OD:L750 | LIVE-FIXED | jorigins.js; costume art WIP (see S3-208) | n | - | foreign-princess-art | LIVE origin+story; own-costume art WIP |
| D19 | Bieu qua lam lanh accepts items | OD:L752 | NOT-FIXED | see S3-209 | y | M | bieu-qua-lam-lanh | NOT DONE: Bieu qua lam lanh with item/work |
| D20 | weather redo painted | OD:L754 | LIVE-FIXED | see S3-211 | y | - | - | LIVE (weather-fx on main) |
| D21 | co-op B1-B5 | H7:L80 | COOP | see S4-coopB1B5 | y | - | coop | LIVE (coop-b1b5-fix); further co-op = coop-thin |
| D22 | real-phone UA test mode | H7:L105 | LIVE-FIXED | see S4-uatest | n | - | - | LIVE (ua-test on main) |
| D23 | whole-game mole audit | PM:L335 | NOT-FIXED | see S4-mole | n | M | fig-cutout-clean | PAUSED: review/mole-audit-r2; redo on top of repaint |
| D24 | c12-ty5-a51 eye patch | PM:L337 | LIVE-FIXED | see S4-c12a51 | n | - | - | LIVE (redrawn on CDN) |
| D25 | veil/scar box follows zoom | PM:L337 | ON-BRANCH | see S4-veilzoom | y | S | veil-zoom | ON BRANCH veil-zoom-r3 PASS d236f309 |
| D26 | idea builds (30 + 33) memories + hook ledger first | OD:L612,H7:L101 | IDEA | jmem.js memories LIVE (mem-upgrade-r1 golive); rest parked by freeze OD:L1402 | n | L | ideas-parked | PARTIAL: memories live; remaining ideas parked (freeze) |
| D27 | extra toilette reaction buttons | H7:L41 | LIVE-FIXED | jtoilr.js | y | - | - | LIVE (toil-react on main) |
| D28 | makeup final-look reveal | OD:L769-775 | LIVE-FIXED | see S3-213 | y | - | - | LIVE (makeup reveal on main) |
| D29 | schedules + location ledger j95 | OD:L32-36 | LIVE-FIXED | j95.js on main | y | - | - | LIVE (j95 on main) |
| D30 | palace detail map + residence paintings | OD:L134-140,L155,L158-166 | NOT-FIXED | map LIVE (OD:L1190 "palace detail map"; pl-courtyards, jmapc, jplx; test palace-map.js). Residence art: owner 17/11 01:45-02:05Z new rule (every residence = 2 rooms: chinh dien + phong ngu, per rank seats) -> Foreman C table + samples first, nothing drawn | y (art) | L | residence-rooms-art | PARTIAL: palace map live; residence bedroom+hall paintings per rank not drawn |
| D31 | difficulty modes | OD:L85,L128 | LIVE-FIXED | jdiff.js on main; test difficulty.js | y | - | - | LIVE (difficulty on main, jdiff.js) |
| D32 | succession choice card | OD:L88,L106,L124-131 | LIVE-FIXED | j99succ.js + test succession.js; OD:L1190 | y | - | - | LIVE (succession on main) |
| D33 | Loi rieng routes + blood test + water bowl | OD:L184-192 | LIVE-FIXED | jroute.js + routes-port; bowl image on CDN | y | - | - | LIVE (routes on main) |
| D34 | scheme minigames | OD:L192,L195,L199 | LIVE-FIXED | jsgame.js; test schemegames.js | y | - | - | LIVE (scheme-games on main) |
| D35 | new-player tutorial | OD:L227 | LIVE-FIXED | jtut.js, jtq14.js (tut-quests LIVE batch-2300); tutorial-r2 LIVE 9b4f1697a | y | - | - | LIVE (tutorial + tut-quests on main) |
| D36 | online leaderboard + Bang vang | OD:L281,L378 | ON-BRANCH | podium kit part LIVE (j90.js); leaderboard: review/rank-port-r2 BLOCKED on KIT REQUEST A/B/C (d8636053, 16/11 13:55Z, worker archived); nothing on main (no jrank) | y | L | leaderboard | ON BRANCH rank-port-r2 blocked on kit parts; not on main |
| D37 | finger-drag page curl | OD:L276 | LIVE-FIXED | PROGRESS_page-curl2.md: finger-drag curl in j87 kitBook pointer handlers; page-curl2 live | y | - | - | LIVE (finger-drag curl in kitBook) |
| D38 | lost items + rivalry | OD:L108,L117 | LIVE-FIXED | jlost.js; test lost-items.js; OD:L1190 | y | - | - | LIVE (lost-items on main) |
| D39 | appearance overlays + allergy rash + her own allergy | OD:L107,L121..L130 | NOT-FIXED | overlays + rash LIVE (jrash.js, appearance-port, facefx-all); her own allergen-from-recipes not modelled (PROGRESS_recipes.md L48) | n | S | her-allergy | PARTIAL: overlays live; her own recipe allergy not modelled |
| D40 | bad-weather outdoor-act risks | OD:L348,L351 | LIVE-FIXED | jweather.js; OD:L1190 "weather risks"; weather-port test | y | - | - | LIVE (weather-port on main) |
| D41 | her own servant promotions | OD:L302 | LIVE-FIXED | jpromsv.js; test promote-servants.js | y | - | - | LIVE (promote-servants on main) |
| D42 | places plan leftovers | OD:L82,L86,L87 | LIVE-FIXED | test places-d42.js + places-port on main; "3 new places" OD:L1190 | y | - | - | LIVE (places-port on main) |
| D43 | postponed appearance art (pregnancy figures, nun, glow, grey, smallpox) | OD:L121,L122,L751 | IDEA | owner postponed; review/pregnancy-art plan only; art-complete mandate "draw anything drawable" (OD:L751) not scheduled; frozen | n (art) | L | ideas-parked | NOT DONE: postponed appearance art; owner must re-confirm |
| D44 | fig export >=1100 px | PM:L223 | NOT-FIXED | see S4-figexport | n | L | fig-cutout-clean | NOT DONE: figures <=900 px; rides on fig-cutout-clean |
| D45 | small art (earrings, shoes, guard 4, a18 skin, Emperor audit) | AM:L34,OD:L364 | LIVE-FIXED | see S4-smallart; 2 Qing-hat Emperor pictures fixed (FOREMAN_C L551) | n | - | - | LIVE (small-art on main/CDN) |
| D46 | own pictures for placeholder acts/events | OD:L444,L550 | LIVE-FIXED | PROGRESS_placeholder-pics2/3; opt-pics3 for 64 option cards; "tam" mark | n | - | - | LIVE (placeholders drawn) |
| D47 | small-bugs-4 | PM:L224.. | LIVE-FIXED | see S4-leftovers | y | - | - | LIVE (small-bugs-4 on main) |
| D48 | outside-route art | PM:L330 | LIVE-FIXED | see S4-outsideart | n | - | - | LIVE (outside-art on main/CDN) |
| D49 | collection milestones | OD:L45,L46 | LIVE-FIXED | jcol.js on main; test collect-ms.js; Q7 open (what counts as an item) per FOREMAN_C L565 | y | - | - | LIVE (collect-ms on main, jcol.js) |

## Jobs (NOT-FIXED / ON-BRANCH groups)

1. **presentation-wiring** (UI, L; kit sections 62/68 + jpres.js + new kit art for 9 origin frames; one foreman per OD:L1229): S3-151, S3-152, S3-180, S3-181, S3-182, S3-205, D11. Live part: jpres.js sound/music/fx by group, jfxkit library, promotion/demotion animations. Open: voices, 9 origin frames, entrance animations (edict scroll), wiring harm/poison/rumour/seal/birth/death/pregnancy.
2. **fig-cutout-clean** (art, L, Foreman C; branch never pushed): S3-131 (huadian r3 FAIL list + Luan hoi), S4-figexport / D44 (>=1100 px via transparent 4k repaint), D23 / S4-mole (redo on top of repaint, mole-audit-r2), S3-217 (HD upscale part).
3. **art-complete-rest** (art, L): S3-207 (108 old-save player-look figures + 56 promoted old-love men; CDN has only 20 player-look files).
4. **residence-rooms-art** (art, L, Foreman C; owner 17/11 01:45-02:05Z): D30 residence bedroom + chinh dien for every residence of every rank; table + 1 sample pair to owner first, then wiring by main.
5. **npc-death-wire** (non-UI M, Foreman D): S3-189, S3-190, D4. review/npc-death-r1 5f58a715 PASS, golive 33e1bc22; needs j95 place record wiring (review/npc-death-wire not pushed).
6. **npc-roads** (L, Foreman D/main): S3-192, D5. review/npc-roads-fx RUNNING, npc-agent-r1 RUNNING; depends on story14 frame.
7. **veil-zoom** (UI S, kit sign-off needed KIT 28.8): S4-veilzoom, D25. review/veil-zoom-r3 d236f309 PASS, never batched.
8. **leaderboard** (UI L, Foreman B + Worker deploy): D36. review/rank-port-r2 blocked on kit requests; Worker ctm-rank live; owner Q20 (recovery code) open.
9. **feet-crop** (UI S, kit): S3-227 / OD:L1492. review/fig-feet-crop-2 c269e2fc9 ready, needs reviewer + batch.
10. **emperor-poison-road** (rules M, opus): S3-174, D8 (poison part). Needs owner OK to overrule jpoison.js default; post-freeze.
11. **level-up-scene** (art + UI M): S3-203, D14.
12. **bieu-qua-lam-lanh** (UI M): S3-209, D19; use jlux.luxGift + recipes works.
13. **bot-proof-hint** (balance S, opus): S3-126; measure hint vs random vs same-always, try BAL.ctxTaste/ctxCap.
14. **her-allergy** (rules S): S4-allergy, D39 (her own allergy to recipe allergens).
15. **housekeeping** (S, coordinator): S4-ideasopen (IDEAS_OPEN to Closed).
16. **foreign-princess-art** (art, in progress at C): S3-208, D18 costume sets (review/foreign-princess-samples, v8).
17. **ideas-parked** (IDEA, frozen by OD:L1402): S3-184, D26 (rest), D43.

COOP items (-> coop-thin, Foreman B, not jobs): S3-169, S3-194, S3-197, S4-coopB1B5, D21.
Open owner question (not a job): sound-on by default (S4-resultsfx / D1); D49 Q7 what counts as a collected item; D36 Q20 leaderboard recovery code.
