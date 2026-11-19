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

## r3 (session_01Rc5AsMY7PgErES6LptdBUE, depth 4, START_CTX ~3 %)
PRIORITY #1 CHECK ('stage-here toast'): OD 18/11 ~19:45Z (5), ~19:55Z, ~20:00Z | main jclose kitToastPlace (§42.2) on review/stage-here 1f33d3c | review/stage-rightcol f2fbe3b (r5, PASS line; merged) | claims stage-here r2 → me
Branch `review/stage-here`, head **ff28fd6** (1f33d3c + merge origin/main 790cda59 + merge review/stage-rightcol f2fbe3b + rebuild + r3 code + KIT.md).

### MAIN LOOK of 1f33d3c: toast on people — whole group
- PEOPLE kept (jclose `KIT_TOAST_PEOPLE` / `kitToastPeopleRects`, part of `kitToastKeepRects`, any size): stage figures `#mefig`, `.figimg`, `.tok.fig`, `.kfig` by the TOP 60 % of their box (head + upper body); face chips `.tok`, `.pface`; portrait frames `.kfr/.kpor/.pframe/.kpf` and card scene-art frames `.ksart` = the whole frame.
- Found on the way (same group, main 790cda59's map): Dư đồ place labels `.mspot/.mlab` were not kept (toast lay over Đức Thọ cung…Cần Ninh cung on Fold) → keep set + `[data-ak]`, `[onclick]`, `[tabindex]`.
- Narrower widths (down to .36 of the column) so it fits a real gap (Fold Giao tình: right of «Ta» above the portraits) instead of hiding.
- NO FREE SPOT → it does not float: hides and COLLAPSES into the stage rail «!» = kitStageRail item `tnote` (glyph «!» + kbusy + kbadge, same button family as the §77.2 closing alert; while the closing «!» is up that button carries it, one «!» only). Tap = the same line, placed keeping only people + top bar + tab bar (tap/time closes it). No new private part (kit rail item, no new CSS). A screen with no stage (Fold panel page) has no rail: the «!» shows when she is back on a stage.
- KIT.md §42.2 updated in place (law 14).

### Scan (stage-here.js; fault toast-cover = kept / outside-column / **person**, people measured by the TEST itself (not via the kit list); new fault collapse-no-rail; 6 cases × 18 tabs)
| build | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| 1f33d3c (before) | toast over portrait faces (Giao tình), over map labels (Dư đồ) | toast over her bust + maid face chip (Hành sự) |
| ff28fd6 | **0/114** (86 shown, 4 collapsed on court tab where no stage) | **0/114** (90 shown, 0 collapsed) |
Open group list (stage-rightcol .kgf.kgfopen / #kgfdrop): toast overlap false on both (shots r3-*-kgf).

### Gap rulings (ROOT-56 20:50Z) → ACT_PLACE
Phát bạc cứu giúp cung nhân nghèo → cnh · Để ý một nam nhân (route card tt0) → vuon · Xin ban hôn cho <tên> (hl_hon, matched by card id / name prefix) → home · Xin về quê phụng dưỡng cha mẹ (hl_que) → home. act-place-audit fold + ipadAir: 28 acts, 24 bound, **0 bad, unbound = only ACT_REMOTE** (Mời thái y, Cài tai mắt, Sai cung nữ đi dò la, Nghe ngóng chung).

### Tests (ff28fd6 code)
stage-here.js fold 0 / ipadAir 0, old save ok, no h-overflow, no page errors · stage-stay.js fold + ipadAir ok (rolled once, chip odds word, old save ok) · act-place-audit 0 bad · **QUICKCHECK PASS** (bd3c953+ksart build, 389 s, core gates PASS, old save ok, perf new/live render 228/263, tab 517/466, buổi 1265/1506 ms).

### Shots (CDN, LOOKED; away in Ngự hoa viên, closing alert up; delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review stage-here`)
Fold: https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-hanhsu.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-giaotinh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-dudo.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-kgf.jpg
iPad: https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-hanhsu.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-giaotinh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-dudo.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-kgf.jpg (open Cung nhân list)
Note: in iPad Hành sự the toast sits on the stage over the Emperor's lower robe (below the 60 % line) — faces/busts/name tags clear.
### r3b — merge of LIVE main e16e1d6 (MAIN ROOT-57 21:45Z)
Head **f9f1894** = ff28fd6 + merge origin/main e16e1d6 (map-zones r6, ge-writers-w1). Conflict only in assemble.py module list (kept main's list + `jstagehere.js` after `jplst.js`; jgedata_w1 + jmapz kept) and index.html/sw.js (rebuilt by build_site.sh). Re-run on f9f1894: stage-here.js fold 0/114, ipadAir 0/114 · act-place-audit 0 bad both (unbound = ACT_REMOTE only) · stage-stay ok both · **QUICKCHECK PASS** (370 s, core gates PASS, old save ok, perf new/live render 231/242, tab 382/428, buổi 1196/1116 ms). All 8 shots retaken on f9f1894, LOOKED, same CDN URLs (overwritten).
### r3c — MAIN ROOT-57 BACK (21:58Z + 22:10Z): whole person, never on a card
Head **8c8f9aa** (f3d1677 code + merge origin/main 884ce97). REPLACES the r3 "figure top 60 %" rule (canon overwrite, KIT §42.2 rewritten in place).
- PERSON = WHOLE box: stage figures head to feet (robe incl.), face chips `.tok/.pface`, name labels, portrait frames, card art `.ksart`.
- ACTION CARD / tappable row (`button`, `[role=button]`, `.card/.kcard`, links, `[onclick]`) = WHOLE box, any size (was: big card = head band only).
- No free spot → collapse into «!»: stage rail on a stage screen; on a tab WITHOUT a stage (Fold panel tabs) the alert items stand in the existing §77 rail corner dock above the tab bar (new item flag `dock:true`, same dock the onTitle status icons use; closing §77.2 + tin báo). Tap «!» = the line as the toast if a spot is free now, else the kit dialog card «Tin báo» (Q/showModal) — never floated over a person or card.
- Scan (stage-here.js) now measures by itself: person (whole body, face chips, name labels, portraits, card art) + card overlap; collapse-no-rail checked on every tab.
| build | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| f9f1894 (r3b) | toast inside first action card, across its border (Hành sự) | toast on Hoàng thượng's robe (Hành sự) |
| 8c8f9aa | **0/114** faults (81 shown free, 9 collapsed «!») | **0/114** faults (22 shown free, 68 collapsed «!» — figures fill the stage) |
Tests on 8c8f9aa: act audit 0 bad both; stage-stay ok both; stage-rightcol ipad bad 0; **QUICKCHECK PASS** (341 s, core gates PASS, old save ok, perf new/live render 214/234, tab 372/424, buổi 1026/1040 ms).
Shots (LOOKED, f3d1677 code; 884ce97 merge = docs only): Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-hanhsu.jpg (collapsed, «!» docked) · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-hanhsu-tap.jpg (tap → «Tin báo» card) · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-giaotinh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-dudo.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-kgf.jpg — iPad https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-hanhsu.jpg (collapsed, «!» on rail) · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-hanhsu-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-giaotinh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-giaotinh-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-dudo.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-kgf.jpg
Note for MAIN: the Fold corner dock «!» (existing §77 dock spot) sits over the left corner of the card list above the tab bar, like the onTitle status icons already do.
### r3d — MAIN ROOT-58 BACK 22:41Z: Fold dock over scrolling content
Head **26483512** (r3c + merge LIVE main ddbf9c7 + r3d). The §77 corner dock (Fold no-stage tabs) floated over scrolling cards/portraits. Fix (kit §77, jrail, whole group = alert «!» items AND the onTitle status icons): on a game screen whose stage is hidden, the dock stands in a FREE SLOT of the fixed top bar `header.hud` (`.krail.khud`, compact 32 px buttons, column or row, `hudSlot` checks every header element); Fold = beside the seal, left of it, clear of buổi/quẻ rows. No slot → old corner dock (not hit on Fold/iPad). KIT §77 + §42.2 updated in place.
Scan: new fault `rail-cover` = every scroller stepped top→bottom (40 % steps), rail/dock rect vs every card / person / portrait box clipped to what is on screen. Sanity: forcing the old corner dock → 6/6 Fold act/rel rows fault (66 hits); real build **Fold 0/114, iPad 0/114** (+ toast person/card 0).
Tests on 26483512: act audit 0 bad both; stage-stay ok both; stage-rightcol bad 0; **QUICKCHECK PASS** (350 s, core gates PASS, old save ok, perf new/live render 223/214, tab 325/434, buổi 1143/2446 ms).
Shots (LOOKED): Fold https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-hanhsu.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-hanhsu-mid.jpg (scrolled mid-list, «!» in the top bar) · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-hanhsu-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-giaotinh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-dudo.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-fold-kgf.jpg — iPad https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-hanhsu.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-hanhsu-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-giaotinh.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-giaotinh-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-dudo.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r3-ipadAir-kgf.jpg

## HANDOVER r3 (worker rollover: context ≈ START_CTX 3 % + 25 %; depth 4) — coordinator opens the successor if more is needed
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
STATE: review/stage-here **26483512** on origin = SẴN SÀNG KIỂM r3d sent to MAIN ROOT-58 (session_01Rc5AsHvFYTJwaE5mFs48oR); includes LIVE main ddbf9c7. QUICKCHECK PASS. Waiting for ROOT-58 LOOK → BIG reviewer.
CODE MAP: jclose (kitToastPlace / kitToastKeepRects / KIT_TOAST_PEOPLE whole box / cards whole box / kitToastCollapse → rail item `tnote` dock:true / kitToastTap → toast or kit card «Tin báo»), jrail (dock:true items + hudSlot/hudFit → `.krail.khud` top-bar slot; fallback corner dock), jstagehere (closing item dock:true, tap → kitToastTap; ACT_PLACE + ACT_PLACE_ID gap rulings; ACT_REMOTE; stayRoll), KIT.md §42.2 + §77.
TESTS: `DEV=fold|ipadAir node dev/test/stage-here.js` (faults toast-cover kept/outside/person/card, collapse-no-rail, rail-cover scroll-through), stage-stay.js, act-place-audit.js, stage-rightcol.js; quickcheck `bash dev/tools/quickcheck.sh` (~6 min; run with timeout ≥ 600 s, it rebuilds index.html — restore with `git checkout index.html` if it leaves a build-line diff). Shot script was container-local (scratchpad shots.js: away in vườn, buổi 2, used 3 → closing alert; tabs act/rel/go + KGF open list + TAP + MID scroll).
CDN review shots: img/_review/stage-here/r3-* (wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review stage-here`).
NEXT if MAIN sends BACK: build on 26483512, merge newest origin/main first (conflicts are usually only index.html/sw.js → take main's, rebuild; assemble.py module list must keep 'jstagehere.js' after 'jplst.js').

## r4 — ONE NOTICE SYSTEM (MAIN ROOT-59, worker session_01Rc5AsL5rJqVVXyTRsQXXPL, depth 7, START_CTX ~4 %)
PRIORITY #1 CHECK ('tin ?báo|tinbao|notice|toast'): OD 34 | ledger 0 | claims 8 | main 15 | review/* 10 (tinbao-ui … r7r PASS, never landed) | archive 116 → REUSED: review/tinbao-ui-r7r's Tai mắt line «<người> báo: <nơi> có chuyện» + «Để ta xem» → Dư đồ, the `.ktbt` chip look (jplst), the §78 `.khap` «!» disc, the §77 square button, `kitToastKeepRects`, `kitPanel` kind notice, `kitArtFrame` picture slot. Owner words: OD "(18/11 ~22:10Z UTC, ROOT-56 chat, ANGRY" RULES (1)–(4).
Head **8e29c099** (review/stage-here; includes LIVE main 1130a49e merge 826c89a1).
WHAT (kit part only, `dev/build/jnotice.js`, after jstagehere; KIT §42.2 rewritten in place, §77 / §77.2 updated, kit page sample §42.2):
- ONE entry point `kitNotice({id, line, text, pic, kind, sticky, go, goLabel, again})` (+ `kitNoticeDrop/Seen/List/Open/Box`). Errand worker session_01Rc5AsLFZhaSRGU7o57KkKy got the signature (send_message, 8a3019ee).
- BOX `#kntbox` in the fixed top bar (child of header.hud; §77 square kit button + yellow round `.khap` «!»; unread = blink + red dot; sticky closing = blink; read = calm; none = no box). Spot = first free spot of the bar (top-right first), re-checked every paint, never over a bar word/picture/button. Tap → «Tin báo» panel listing unread.
- CHIP `#kntchip.ktbt` one line + «!», `BAL.entryToastMs` (5 s, the owner's existing number; one core), TOP ONLY: (a) free slot of the top bar (iPad: the empty middle of the bar); (b) a quiet part of the bar = over no word/number/picture/button, only bar tracks (Fold: over the mood slider track, the bar has no fully free slot); (c) band just under the bar over nothing kept; (d) straddling the bar edge; none → no chip, the box alone. NEVER at the bottom. Hidden while a dialog/book is open, shown after.
- PANEL «Tin báo» = kitPanel kind notice (seal BÁO, ✕): the notice's own picture (closing = the place painting) + full text (closing: «… (đóng cửa tối). Ở lại = như lẻn vào: Khá chắc.»); action row only when real (Tai mắt «Để ta xem»). Plain kit rows (no guessed person figure) so it stays small.
- ROUTED: kitLine (all callers, bottom pill #kupdline gone), kitLineToast (place-entry lines), closing alert (jstagehere: sticky notice, dropped when she leaves / it opens, no rail item), Tai mắt news (tinBaoOn), flip note (kitFlipNote, was a floating .kmnote moved to the bottom by jk3), «CẤM» srvToast. Stage-rail `closing` + `tnote` items removed.
- FOR MAIN (decisions taken, say if wrong): (1) the act result card #rtoast (THÀNH/BẠI) is NOT routed — owner ruling jksize 17:25Z "routine actions keep the small result toast"; law 16 → not changed without her. (2) Fold chip sits over the mood slider track inside the top bar (5 s; the bar has no other free slot and under it are tab chips / map tools). (3) tinbao-ui-r7r should NOT land separately now: its badge/toast are replaced by this box/chip; its Tai mắt list card (§87.1 kitTaiMatCard) was not ported (separate feature). (4) Closing picture = the place painting; C's art request «notice-closing» can replace it via `pic` later.
SCAN (law 11, `python3 dev/test/notice-scan.py [ref]`) — before = r3d 26483512:
| group (26483512) | sites | state | where |
|---|---|---|---|
| kitLine (bottom pill #kupdline) callers | 8 | NOT ROUTED (floating toast) | jcoopchat.js:90, jcoopchat.js:96, jcoopchat.js:110, jcooplobby.js:107, jcooptimer.js:120, jcooptimer.js:130, jcooptimer.js:164, jdisp.js:125 |
| kitLineToast (#ktbtoast) callers | 2 | NOT ROUTED (floating toast) | jclose.js:149, jstagehere.js:28 |
| closing alert (stage rail «!» item) | 1 | FLOATING / RAIL (old) | jstagehere.js:32 |
| tin báo collapse rail item «tnote» | 1 | FLOATING / RAIL (old) | jclose.js:147 |
| flip note (.kmnote floating line) | 1 | NOT ROUTED (floating toast) | j93.js:262 |
| «CẤM» place line (srvToast → #rtoast) | 4 | NOT ROUTED (floating toast) | j42.js:150, j42.js:152, j42.js:153, j77.js:91 |
| Tai mắt news (tinBaoOn) — UI subscriber | 1 | NOT ROUTED (floating toast) | jagknow.js:160 |
| closing notice via kitNotice | 0 | — |  |
| act result card #rtoast (THÀNH/BẠI) | 4 | EXEMPT: act result card, owner ruling jksize 17:25Z "routine actions keep the small result toast" | j19.js:57, j25.js:32, j42.js:87, j63.js:303 |
| tutorial tip kitTip | 1 | EXEMPT: tutorial coach (KIT §50.2), not a notice | jtut.js:162 |
| co-op clock #kctmf | 1 | EXEMPT: co-op status clock (16/11 ruling) | jcooptimer.js:289 |

after = work tree 8e29c099:
| group (work tree) | sites | state | where |
|---|---|---|---|
| kitLine (bottom pill #kupdline) callers | 9 | ROUTED → kitNotice | jcoopchat.js:90, jcoopchat.js:96, jcoopchat.js:110, jcooplobby.js:107, jcoopthinf.js:41, jcooptimer.js:120, jcooptimer.js:130, jcooptimer.js:164 … |
| kitLineToast (#ktbtoast) callers | 1 | ROUTED → kitNotice | jclose.js:147 |
| closing alert (stage rail «!» item) | 0 | GONE |  |
| tin báo collapse rail item «tnote» | 0 | GONE |  |
| flip note (.kmnote floating line) | 1 | ROUTED → kitNotice | j93.js:262 |
| «CẤM» place line (srvToast → #rtoast) | 4 | ROUTED → kitNotice | j42.js:150, j42.js:152, j42.js:153, j77.js:91 |
| Tai mắt news (tinBaoOn) — UI subscriber | 1 | ROUTED → kitNotice | jagknow.js:160 |
| closing notice via kitNotice | 1 | ROUTED (kitNotice) | jstagehere.js:31 |
| act result card #rtoast (THÀNH/BẠI) | 4 | EXEMPT: act result card, owner ruling jksize 17:25Z "routine actions keep the small result toast" | j19.js:57, j25.js:32, j42.js:87, j63.js:303 |
| tutorial tip kitTip | 1 | EXEMPT: tutorial coach (KIT §50.2), not a notice | jtut.js:162 |
| co-op clock #kctmf | 1 | EXEMPT: co-op status clock (16/11 ruling) | jcooptimer.js:289 |

TESTS on 8e29c099 (code) / 89b2f676: stage-here.js **Fold 0/114, iPad 0/114** (new faults: chip-low, hud-word, kept, person, card, collapse-no-box, float-toast) · stage-stay ok both (notice text names the odds) · act-place-audit 0 bad both · stage-rightcol bad 0 · stage-rail PASS 755x1000 + 1180x820 · status-icon: FAILS ALSO ON BASE 826c89a1 (getComputedStyle null in its geo(), pre-existing, not this work) · **QUICKCHECK PASS** (89b2f676, 388 s, core gates PASS, old save ok, perf new/live render 206/238, tab 384/396, buổi 972/967 ms). Last commit 8e29c099 = box re-check + panel rows only (stage-here/stage-stay re-run 0 faults).
SHOTS (LOOKED; away in Ngự hoa viên, buổi chiều, last khắc → closing notice; act/rel = chip, -tap = chip → panel; go = Dư đồ no bottom toast, go-tap = box → list panel):
Fold: https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-fold-act.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-fold-act-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-fold-rel.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-fold-rel-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-fold-go.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-fold-go-tap.jpg
iPad: https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-ipadAir-act.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-ipadAir-act-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-ipadAir-rel.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-ipadAir-rel-tap.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-ipadAir-go.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/stage-here/r4-ipadAir-go-tap.jpg
Wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review stage-here` (r3-* and r4-*).

### r4b — merge LIVE main 9a1d6922 (MAIN ROOT-60 asked for b60c1102; main had moved on) — head **367a1ae0**
- a9f3c04f = merge origin/main 9a1d6922 (conflicts: assemble.py module list → main's list + `'jplst.js', 'jstagehere.js', 'jnotice.js', 'jsmg.js'`, jagacts4 kept; index.html/sw.js rebuilt) + `kitNotice.add({id,text,onTap})` compatibility alias (errand adapter guessed that name; errand worker session_01Rc5AsLFZhaSRGU7o57KkKy was sent the real line: `kitNotice({id, line, text, go, goLabel})`).
- 367a1ae0 = «Tin báo» list panel shows each notice's SHORT line, identical lines once (with 4+ long rows the kit frame sizing jksize picked the big BÁO frame with its narrator figure «kn» = KIT_SIZE.v3.narrator rule; short rows keep the small frame; one notice / chip tap = full text).
- Tests on 367a1ae0: stage-here **Fold 0/114, iPad 0/114** · **QUICKCHECK PASS** (401 s, core gates PASS, old save ok, perf new/live render 247/201, tab 447/425, buổi 1162/992 ms) · shots retaken on the merged build, LOOKED, same CDN names img/_review/stage-here/r4-* (overwritten).
- ⚠ stage-stay.js case `free` (Math.random forced 0, place closed, buổi turn) now FAILS after the main merge: base nextBuoi re-entry (`S.place="home";goTo(k)`) leaves her home, so stayRoll never runs (placeAfter home, S.stayRoll null). PROVEN NOT the notice work: same fault with jnotice.js removed from the build. `caught` case passes. Before the merge (8e29c099) both passed. Likely a main change in the buổi-turn flow with forced random (role-parity r3 / jagacts4 NPC visits: logs show «Hàn Bạch Lộ sang cung ngươi thăm …» in that turn). → successor / reviewer: find which main change makes goTo(k) refuse at the turn (the r2 rule «staying past closing = Lẻn vào roll» depends on her still being inside).

## HANDOVER r4 (worker rollover by context; depth 7) — coordinator opens the successor if more is needed
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11, every foreman and main): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.
STATE: review/stage-here **367a1ae0** on origin = SẴN SÀNG KIỂM r4b (includes LIVE main 9a1d6922). Open: stage-stay `free` fault (above, from main).
CODE MAP: jnotice.js (kitNotice store + box `#kntbox` in header.hud + chip `#kntchip.ktbt` with slot finder a/a2/b/c + panel kitPanel kind notice + picSwap + routing of kitLine / kitLineToast / kitFlipNote / srvToast / tinBaoOn), jstagehere (closing = sticky kitNotice "close:<key>", dropped in tick), jclose (kitToastCollapse no-op; kitToastKeepRects reused), jplst (.ktbt look = THE chip look), jbal (noticeMax; entryToastMs = chip ms).
TESTS: `DEV=fold|ipadAir node dev/test/stage-here.js` · stage-stay.js · act-place-audit.js · stage-rightcol.js · `python3 dev/test/notice-scan.py [ref]` · quickcheck `bash dev/tools/quickcheck.sh` (timeout ≥ 900 s). Shot script was container-local (away in vườn, buổi 2, used 3; TAP #kntchip / #kntbox).
FOR MAIN: the 4 decisions in "## r4" stand (rtoast not routed; Fold chip over the mood track; tinbao-ui-r7r not to land separately; closing picture = place painting).
