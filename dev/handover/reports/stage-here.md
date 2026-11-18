# stage-here — report (MAIN ROOT-54 UI worker, session_01Rc5AsK9y5NbRATifWtFqG7, depth 2, START_CTX ~4 %)
PRIORITY #1 CHECK ('nền sân khấu' / 'đóng cửa' / 'goTo' / 'walk-spill'): OD 18/11 ~19:45Z (5), ~19:55Z, ~20:00Z + place-stage OD 04:50Z–06:05Z | main jplfs kplAway + jk3 k3Phone (one-page shell while away), j6 renderStage (already paints S.place), j41 accessOf/ACC_DAY/B4L (hours), jplst kitLineToast (tai mắt chip), jrail kitStageRail (glyph/busy/badge), j9 `const u=used;goTo(k);used=u` (free move idiom) | review/place-stage LANDED on main (built on it) | claims none
Branch `review/stage-here`, head **e8e5afe** (r1 af77e99 + r1b 4005ab2 + merge origin/main 13bb8c8).

## (1) Why tabs lost the stage / showed the room
renderStage always painted `placeOf(S.place)`; the fault was the SHELL: KIT 33.10 (owner 16/11 19:15Z "Hành sự stage = her room only") forced the ONE-PAGE shell on iPad whenever she was away, so every tab became a full-page panel with no stage beside it (only her room ever had the split stage). Fix (one source = S.place, kit shell only): jk3 `k3Full()` = away AND (one-page screen OR the place page itself `K3SH.home`). iPad: the place page stays the full-screen painting; any tab = normal spread, stage (her place) | panel. Fold: unchanged model (panel page per tab, "Về <nơi>" = her place painting). Room returns only at the day turn (j3) or goTo("home"). KIT 33.10 overwritten in place (law 14). Side fix (same group): jplst entry-line toast no longer re-fires when coming back from a hidden stage.

## (2)+(3) Closing alert (jstagehere.js, KIT §77.2)
`stClose()` from the ONE access rule: last khắc of the buổi (`BAL.time.khac-used<=1`, buổi < B4L) and `accessOf(S,k)` for the next buổi says no → "sắp đóng cửa"; or closed now and she stayed → "đã đóng cửa". Kit only: kitStageRail item `closing` (glyph "!" §77.1 glyph mode + `kbusy` motion + `kbadge` seal dot), stays until she leaves / it opens; first time per buổi (place + state) the tai mắt chip `kitLineToast` ("Ngự hoa viên sắp đóng cửa sau khắc này (đóng cửa tối)."), tap icon = chip again. No new number. **KIT REQUEST K-ICO-ALERT** filed (painted `img/kit/ico-alert.webp`, Foreman C); swap is one line.
(4) Staying past closing: no new penalty; existing j41 nextBuoi stay rule keeps her inside without a check. **GAP FOR MAIN**: nothing happens to her for being in a closed place (no "caught" roll) — owner said drama; needs a ruling/design, not invented here.

## (5) Acts bound to a place (OD ~19:55Z + ~20:00Z)
jstagehere `ACT_PLACE` + `act()` wrap: after the act, `accGrant` + goTo with the walk khắc refunded (one cost), deferred until the result cards close (same buổi only). Audit `node dev/test/act-place-audit.js` (28 deck acts):
| act | place | before: moves? | after: moves? | stays | stage | charged once (spent = card cost) |
|---|---|---|---|---|---|---|
| Thỉnh an Thái hậu | tn | no | yes | yes | yes | 2 = 2 |
| Thỉnh an Hoàng hậu | kn | no | yes | yes | yes | 2 = 2 |
| Hối lộ Kính sự phòng | ksp | no | yes | yes | yes | 2 = 2 |
| Sang Thái y viện xin bắt mạch | tyv | no | yes | yes | yes | 3 = 3 |
| Xem sổ nguyệt sự | ksp | no | yes | yes | yes | 1 = 1 |
| Xem lén sổ nguyệt sự | ksp | no | yes | yes | yes | 2 = 2 |
| Nhờ Thái hậu nói giúp / Xin rút thẻ bài | tn / ksp | no | yes (bound; story-gated in the run) | yes | yes | 1 = 1 |
| Mời thái y bắt mạch | — invite (stays) | no | no | — | — | 1 = 1 |
| 18 home/self acts (Điểm trang, Nghỉ ngơi, Đọc sách, Dưỡng nhan, Giả bệnh, Trò chuyện với cung nữ, maid errands…) | none | no | no | — | — | yes |
Person acts: j2 `talk()` only targets people ON her stage (curPeople) = already place-bound; Hậu cung / court cards walk via j21 visitPal/goTo. **GAPS FOR MAIN**: "Cầu tự ở Phụng Tiên điện", "Múa trong yến tiệc" name places that are not on Dư đồ; "Cài tai mắt" (talks to another palace's maid) — remote by nature or a trip? Home acts ("Nằm nghỉ trong tẩm cung") still usable while away. Maid errand scene (OD 20:05Z) not in this job.

## Tests
- `DEV=fold|ipadAir node dev/test/stage-here.js` (6 cases × 18 tabs = 114 rows, seeded, consort road): **fold 0 faults, ipadAir 0 faults**, old save ok, no h-overflow, no page errors. BEFORE (main, iPad): 85 tab rows "panel without stage" while away → 0.
- `DEV=ipadAir node dev/test/stage-here-scan.js`: every place (19) × act/rel/inv = her place picture, visible; hours table: vuon/tyv/cnh/nvp NEXT at chiều last khắc, CLOSED tối; kn NEXT at sáng last khắc; summons-only places (thu/dtd/ttp/acs/dc) CLOSED without a pass.
- `node dev/test/act-place-audit.js`: 8 bound, 0 bad.
- quickcheck (e8e5afe): **QUICKCHECK PASS** · 214 s · old save ok · core gates PASS · perf new/live: render 259/241 ms, tab 575/456 ms (iPad now paints the stage beside every tab while away — expected), buổi 1477/1461 ms.
## Shots (CDN write refused 403 → dev/handover/shots/stage-here/ on this branch per brief; Fold 755x1000 + iPad 1180x820, looked; delete after verdict)
own-fold-1-place.jpg (Fold, Ngự hoa viên painting, "!" + chip) · own-fold-2-act.jpg · own-ipadAir-2-act.jpg (iPad Hành sự: stage = vườn | cards, "!" + chip) · own-ipadAir-3-rel.jpg · ipadAir-tn-closing-act.jpg · ipadAir-vuon-closed-act.jpg · ipadAir-palace-rel.jpg
Note: the tin báo toast (pre-existing §87 position under the top bar) sits over the sub-tab row / name plaque for its 5 s.

## HANDOVER (worker rollover: context 33 % ≥ START_CTX 4 % + 25 %; depth 2) — coordinator opens the successor
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.

STATE: review/stage-here head e8e5afe on origin (r1 af77e99 stage/alert, r1b 4005ab2 act binding, merge of main 13bb8c8). QUICKCHECK PASS on e8e5afe. Code: dev/build/jstagehere.js (stClose, rail item `closing`, ACT_PLACE + act wrap + actMove/actPendRun), jk3 k3Full(), jplst toast-key fix; tests dev/test/stage-here.js, stage-here-scan.js, act-place-audit.js (all host mode, seeded, __forceOrigin='thd').
OPEN — MAIN ROOT-55 order 20:08Z (session_01Rc5AsNFnALGujUFYDSjs4g, verbatim points):
1. LOOK (1) iPad: tai mắt toast covers the sub-tab bar + stage place name; place name hidden behind right-column cards — must always read. Merge review/stage-rightcol 5f00b0c and build on it; toast (kitLineToast, jplst `.ktbt`, placed at hud bottom+6) placed so it never covers a tab bar / place name / figure name — whole group, every toast. (2) Fold: confirm stage = S.place on every tab where Fold has a stage; one Fold shot away in Ngự hoa viên on the stage (own-fold-1-place.jpg already shows the painting — re-shoot after toast fix).
2. (a) home acts while away (Nghỉ ngơi một lát «Nằm nghỉ trong tẩm cung», Điểm trang, Đọc sách, Dưỡng nhan, Giả bệnh, Trò chuyện với cung nữ, Đọc binh thư, Nghỉ ngơi dưỡng sức…) = place-bound to "home": add to ACT_PLACE (value "home"; actMove must allow k="home": goTo("home") path j2:124 has no walk spend — check one cost). (b) «Cầu tự ở Phụng Tiên điện», «Múa trong yến tiệc» → bind to the nearest EXISTING Dư đồ place (places() in j2.js:105 + cnh/tgk/ttp/acs/dc/nvp), list it in the audit table; never add a map spot. (c) «Cài tai mắt» = parallel time (Foreman D review/parallel-time): no move, leave a hook only. (d) staying after closing: reuse the «Lẻn vào» caught row (j41 accSneakO(k) odds + BAL.sneak.danh loss; see j41.js:48-55 sneak code), rolled ONCE at the buổi turn while she is inside a closed place (hook j41 nextBuoi stay branch / jstagehere), shown on the alert chip «ở lại = như lẻn vào: <word(odds)>»; no new number → BIG review.
3. Then merge newest origin/main, quickcheck + old save + the 3 tests (fold + ipadAir), Fold 755x1000 + iPad 1180x820 shots LOOKED, CDN img/_review/stage-here/ (403 here → dev/handover/shots/stage-here/), report SẴN SÀNG KIỂM <sha> to ROOT-55.
4. Reply to ROOT-55 on K-ICO-ALERT: missing kit icon = `img/kit/ico-alert.webp` (square rail icon, ico-cal/ico-goal family; motif: half-closed palace gate or small bell) — already sent in this handover message.
Worktree /home/user/wt/stage-here (sparse) can be reused or deleted.

## r2 (successor session_01Rc5AsHiLwk4MGH662uw5L3, depth 3, START_CTX ~3 %)
PRIORITY #1 CHECK ('toast' / 'Lẻn vào' / 'ở lại' / 'ACT_PLACE'): OD 18/11 ~19:45Z (5), ~19:55Z, ~20:00Z + MAIN ROOT-55 order 20:08Z | main jplst kitLineToast (§87), jclose kitLine/kitLinePos (§42.2), j41 accSneak/accSneakO/BAL.sneak.danh, j2 goTo("home") free walk, jplx PLX places, jact2 AS_FPLACE (banquets at thu) | review/stage-rightcol 5f00b0c MERGED (built on it) | claims stage-here #1 rolled over → me
Branch `review/stage-here`, head **d0d3779** (merge stage-rightcol 90e3e97 · r2 code · merge origin/main 9366028 · toast watch).

### LOOK (1) toast covers tab row / place name — whole toast group (KIT §42.2 KEEP-CLEAR)
`kitToastClear(el,dir)` (jclose, kit) moves every one-line toast — §87 `#ktbtoast` (kitLineToast) and §42.2 `#kupdline` (kitLine) — off `KIT_TOAST_KEEP`: top bar, `#tabs`, `.pctabs`, `.ktsub`, `.kpbar`, `[role=tablist]`, place name `#kpname`/`#sc-t`, figure name tags `.tok .tag`/`.j59n`, podium plaques, dialog titles. Top toast slides down (no room → bottom spot above the tab bar, sliding up); bottom pill slides up. `kitToastRefit()` after every render + `kitToastWatch()` every 300 ms while a toast is up (tab switches that skip render). No private position anywhere. The result card `#rtoast` (bottom card, §28.10) was not moved: it is a card, not a one-line toast — say if MAIN wants it in the group.
Scan (`DEV=fold|ipadAir node dev/test/stage-here.js`, new fault `toast-cover`, 6 cases × 18 tabs):
| build | Fold rows covering | iPad rows covering |
|---|---|---|
| e8e5afe (before; toast fixed at hud+6) | every toast row (sub-tab row / place name under it, see r1 shots) | same |
| refit on render only (intermediate) | 25 | 4 |
| d0d3779 (clear + watch) | **0** | **0** |
(2) Fold: stage = S.place on every tab that has a stage (place page = Ngự hoa viên painting, toast clear of place name + figure names) — shot r2-fold-vuon-place.jpg.

### Gaps a–d (MAIN rulings)
(a) home acts → ACT_PLACE "home": Nghỉ ngơi một lát, Điểm trang, Đọc sách giải khuây, Dưỡng nhan, Giả bệnh, Trò chuyện với cung nữ, Đọc binh thư sử sách, Nghỉ ngơi dưỡng sức, Nghĩ cách trốn khỏi cung, Dâng biểu xin xuất gia. goTo("home") has no walk spend (j2:124) → one cost.
(b) «Cầu tự ở Phụng Tiên điện» → tn (Đức Thọ cung, incense hall of the Thái hậu); «Múa trong yến tiệc» → thu (Cần Chính điện, where the festival banquets already sit: jact2 AS_FPLACE newyear/giaothua). No map spot added. MAIN: change the key in ACT_PLACE if another place is wanted.
(c) `ACT_REMOTE` = Cài tai mắt, Sai cung nữ đi dò la, Nghe ngóng chung, Mời thái y bắt mạch: no move; hook `window.actRemoteHook(a)` → place key or null for Foreman D parallel-time.
(d) staying after closing = Lẻn vào: `stayRoll` (jstagehere, wraps nextBuoi) — at a buổi turn that finds her still inside a place now closed to her, ONE roll for that buổi with j41 `accSneakO(k)`; caught = Danh -`BAL.sneak.danh` + `punish` (accSneak's fail branch) + guards walk her home + card «Bị bắt»; not caught = stays + log line. Chip: «… sắp đóng cửa sau khắc này (đóng cửa tối). Ở lại = như lẻn vào: Khá chắc.» No new number. NOTE for BIG review: `accSneakO` bases (25/30/35/45/55) are pre-existing typed numbers in j41 (not BAL) — reused, not changed. Two-way: NPCs never stay in a barred place (j41 placeWhere sends them home) — unchanged.

### Act audit (`node dev/test/act-place-audit.js`, start AWAY in Ngự hoa viên; fold + ipadAir: 28 acts, 20 bound, 0 bad)
| act | place | moves | stays | stage | charged once (card = spent) |
|---|---|---|---|---|---|
| Thỉnh an Thái hậu / Nhờ Thái hậu nói giúp / Cầu tự ở Phụng Tiên điện | tn | yes | yes | yes | 2=2 / 1=1 / 2=2 |
| Thỉnh an Hoàng hậu | kn | yes | yes | yes | 2=2 |
| Hối lộ KSP / Xem sổ nguyệt sự / Xem lén / Xin rút thẻ bài | ksp | yes | yes | yes | 2=2 / 1=1 / 2=2 / 1=1 |
| Sang Thái y viện xin bắt mạch | tyv | yes | yes | yes | 3=3 |
| Múa trong yến tiệc | thu | yes | yes | yes | 4=4 |
| 10 home acts (list a) | home | yes (from vườn) | yes | yes | yes |
| Cài tai mắt, Sai cung nữ đi dò la, Nghe ngóng chung, Mời thái y | remote | no | — | — | yes |
**GAPS FOR MAIN** (not bound, need a ruling): «Phát bạc cứu giúp cung nhân nghèo» (person act → cnh Dãy cung nhân?), «Để ý một nam nhân áo gấm», «Xin ban hôn cho Vương gia», «Xin về quê phụng dưỡng cha mẹ» (petitions: written at home, or Cần Chính điện?).

### Tests (d0d3779 unless noted)
- stage-here.js fold **0/114**, ipadAir **0/114** (incl. toast-cover), old save ok, no h-overflow, no page errors.
- stage-stay.js (new) ipadAir + fold: caught → home, Danh -8 (= BAL.sneak.danh), «Bị bắt», rolled once; free → stays, no loss; own palace never rolls; chip carries the odds word; old save ok.
- act-place-audit.js ipadAir + fold: 0 bad. stage-here-scan.js ipadAir: every place × act/rel/inv = her place picture. stage-rightcol.js: bad 0.
- quickcheck (c1a1c43): build ok, old save ok, perf new/live render 222/236, tab 398/425, buổi 1210/1501 ms; **CORE GATE G3 kit-conform FAIL = PRE-EXISTING**: dialog `contest` MISSING also on origin/main 9366028 (same script, same box); `cold-palace` MISSING once was flaky (passed on 2 reruns). **Final sha d0d3779: QUICKCHECK PASS · 153 s · old save ok · core gates PASS (G3 passed this run) · perf new/live render 160/196, tab 323/389, buổi 1087/917 ms.**
### Shots (CDN 403 → dev/handover/shots/stage-here/, LOOKED; delete after verdict)
r2-fold-vuon-place.jpg (Fold 755x1000: away in Ngự hoa viên, stage painting, "!" + chip below the top bar, place name + figure names clear) · r2-ipadAir-vuon-act.jpg (iPad 1180x820 Hành sự: stage = vườn | cards; chip under the sub-tab row and the place name) · r2-ipadAir-vuon-rel.jpg (Giao tình: same rule).

## r2b (ROOT-56 20:49Z: toast still covered group buttons, Ân sủng box, card title, crossed the split)
Head **1f33d3c** on review/stage-here. Whole-group fix, generic (not a hand list): `kitToastPlace` (jclose, KIT §42.2) keeps clear every tappable thing (button/link/tab/input), every chip (`.kchip/.kwhy/.kodds/.kmchip`), every kit plaque/box `.k3p` (right-column «Cung nhân·n»/«Chí tôn·n» group buttons, Ân sủng box), card info rows (`.krl/.krv`), names (`.kname/.knr/[class*=name]`, place name, figure tags), headings, and the head band (title + first line) of every big card. On a two-page screen (iPad) the toast stays INSIDE the stage column, never crosses the split; one page (Fold) = between top and bottom bars. Searches widths × rows × left/centre/right; no free spot → waits hidden (refit every 300 ms). Found + fixed on the way: fixed toasts were squeezed by the space right of `left` (now `width:max-content`), so measured height was wrong.
Scan (stage-here.js, fault `toast-cover` = kept overlap OR outside-column; 6 cases × 18 tabs): **Fold 0/114, iPad 0/114**; toast shown in 90/90 rows that have one (never had to hide). One Fold run flagged `staff` once; rerun of that tab 0 (timing flake, toast moving while the court panel loads).
Tests: stage-stay ok; act audit 0 bad (unchanged code); **QUICKCHECK PASS 1f33d3c** (core gates PASS, old save ok, perf new/live render 161/222, tab 296/349, buổi 811/1059 ms).
Shots (LOOKED; replace r2-*): r2b-ipad-act.jpg (toast in the stage column left of the right column, clear of group buttons/Ân sủng box/cards) · r2b-ipad-rel.jpg · r2b-fold-act.jpg (toast in the empty lower part of the first card, rows/chips/title clear) · r2b-fold-rel.jpg · r2b-fold-place.jpg.
OPEN (not fixed, for MAIN/next worker): (1) Fold Giao tình (r2b-fold-rel.jpg): the toast sits across the two big portrait frames' faces (portraits are large non-tappable pictures, not in the keep set); a face band for portrait frames would need the portrait class added (kit keeper call: which element = "face"). (2) stage-rightcol's new small group buttons: rerun `DEV=fold|ipadAir node dev/test/stage-here.js` once that sha lands (`.k3p` + `button` already cover them).

## HANDOVER (worker rollover: context ≈ START_CTX 3 % + 25 %; depth 3) — coordinator opens the successor if more is needed
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
STATE: review/stage-here 1f33d3c on origin, QUICKCHECK PASS. Code: jclose (kitToastPlace/KeepRects/Col/Refit/Watch, kitLinePos), jplst (kitLineToast uses it), jstagehere (ACT_PLACE incl. home/tn/thu, ACT_REMOTE + actRemoteHook, stayRoll on nextBuoi), tests stage-here.js (toast-cover), stage-stay.js, act-place-audit.js (START env). Next if MAIN asks: OPEN (1) portrait face band; (2) rerun on stage-rightcol's new sha; 4 gap acts per MAIN ruling (add to ACT_PLACE). Tools: probe script was in /home/user/wt/sh-tools/probe.js (container-local).
SUCCESSOR TODO (MAIN ROOT-56 20:50Z + 20:55Z, received after rollover; verbatim points):
1. Gap rulings → add to ACT_PLACE in jstagehere.js: «Phát bạc cứu giúp cung nhân nghèo» → cnh (PLX key cnh EXISTS in jplx.js, Dãy cung nhân); «Để ý một nam nhân áo gấm» → vuon; «Xin ban hôn cho Vương gia» → home; «Xin về quê phụng dưỡng cha mẹ» → home. act-place-audit must show 0 unbound (except ACT_REMOTE).
2. Merge review/stage-rightcol a1d5ea3d. New buttons: .kgfbtns (first child of #kshR) > .kgfbtn.krailb.krailt (data-kgf="cn"/"ct"); open list #kshR .kgf.kgfopen; phone Dư đồ rail [data-rail="kgf-cn"/"kgf-ct"] + #kgfdrop. kitToastPlace already keeps every button/[role=button]/.k3p clear — verify with `DEV=fold|ipadAir node dev/test/stage-here.js` (toast-cover 0) incl. an open group list; rebuild index.html/sw.js (`bash dev/site/build_site.sh`, take --ours on conflicts then rebuild).
3. OPEN (1) above: Fold Giao tình portrait faces.
4. quickcheck, Fold + iPad shots (Hành sự + Giao tình) LOOKED → dev/handover/shots/stage-here/, SẴN SÀNG KIỂM <sha> to ROOT-56 session_01Rc5AsMXM16MfHRicSPRHEC.
