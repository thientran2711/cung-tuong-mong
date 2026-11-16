# FOREMAN_B_STATUS (written ONLY by Foreman B)
Updated: 11/16/2026 — cap 12 (FOREMAN_B.md), each agent ≤2 browsers. All agents were stopped by an owner interrupt ~02:00Z; restarted with owner OK (WIP resumed from worktrees). Running: 9 workers + 3 reviewers (12/12).
Connectors (account B): GitHub push OK · Magnific OK (project "Personal" ba4aecfe…) · Cloudflare OK (owner re-saved the token 11/16; R2 listing verified).

| Item | Branch | Model | State |
|---|---|---|---|
| C23 mg-easy | review/mg-easy-r1 | sonnet | PASS 94644c1e6342eb7ea1003aae090cd5310a9597e5 |
| C41 tuduc-mg | review/tuduc-mg | sonnet | RUNNING (resumed) |
| C24 chapter-detail | review/chapter-detail | sonnet | RUNNING (resumed) |
| C26 stat-fx | review/stat-fx-r1 | sonnet | PASS 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (follow-up C26b QUEUED) |
| C27 buoi-transition | review/buoi-transition-r1 | sonnet | PASS c91bfdc4629fbf4ebf84307f543d44a394ff138b (images on CDN) |
| C39 tab-underline | review/tab-underline-r1 | sonnet | PASS d8b54d0970ac8591d07163650058485f4bceb818 |
| C40 actcard-small | review/actcard-small-r1 | sonnet | PASS e3664469fbeddf8e7c9fafb851bd1fda73b6354d |
| C28 room-btn | review/room-btn-r1 | sonnet | PASS c80e5df978eaffb29ce218b4431e17b415232750 (icons on CDN) |
| C29 rel-picker | review/rel-picker-r1 | sonnet | PASS ce7c076a38d55c95901d19002832983f91560052 |
| C32 page-curl2 | review/page-curl2 | sonnet | RUNNING |
| C33 weekbook-entries | review/weekbook-entries @1ddfdda7 | sonnet | REVIEWING (review/weekbook-entries-r1, sonnet) |
| C34 contest-ui | review/contest-ui @290129bd | sonnet | REVIEWING (review/contest-ui-r1, sonnet); new podium backdrop on CDN |
| C35 pcard-fill | review/pcard-fill-r1 | sonnet | PASS 6975696c6af2ad22bd428e6435dd892d16f0a4b1 (KIT §73; contains actcard-small-r1) |
| C37 panel-size | review/panel-size-r1 | sonnet | PASS a523531da8bbf3944c8f0afd2c122176405d4e88 (KIT KEEPER: §8.1) |
| C26b stat-fx follow-up | review/stat-fx-2 | sonnet | RUNNING (also pcard-fill nits: 'Dạo này' log line may end with a stray word like 'gặp'; Phi tần tab mood tile shows a placeholder when no cause event — person card + status tiles re-render with innerHTML so they never glow; add diff-glow on re-render; also make the number turn red on a loss like green on a gain) |
| C46 map-labels | review/map-labels | sonnet | RUNNING |
| D32 succession-port | review/succession-port-r1 | opus | PASS 0d9b49b9202c663ef4151c01e890a05ffd62aa30 |
| D38 lost-items-port | review/lost-items-port @92ed78f6 | opus | REVIEWING (review/lost-items-port-r1, sonnet) |
| D30 palace-map-port | review/palace-map-port @e1e15a4b | sonnet | REVIEWING (review/palace-map-port-r1, sonnet); 675 images uploaded to CDN; D42 must build on this branch |
| D31 difficulty-port | review/difficulty-port | opus | QUEUED (re-measure with Foreman C's C7) |
| D33 routes-port | review/routes-port | opus | RUNNING (route numbers within spec; bot table for C7) |
| D34 scheme-games-port | review/scheme-games-port | sonnet | RUNNING |
| D36 leaderboard + Bảng vàng | review/rank-port | sonnet | RUNNING |
| D39 appearance-port | review/appearance-port-r1 | sonnet | PASS 86234a24c53da664bd75f34b34444751cd7c0e9f |
| D40 weather-risk-port | review/weather-port-r1 | sonnet | PASS 100bf8809a77b5a8f381ffac6e426a0c0d2b8a5f |
| D41 promote-servants | review/promote-servants | opus | QUEUED (after Foreman C's D29 roster) |
| D42 places-leftovers | review/places-port | sonnet | QUEUED (after D30) |

## PASS (for the main coordinator to fast-forward)
PASS review/tab-underline-r1 d8b54d0970ac8591d07163650058485f4bceb818 (C39; descends from main 2d038139; reviewer added KIT §46 edge-fade docs + observer throttle)
PASS review/actcard-small-r1 e3664469fbeddf8e7c9fafb851bd1fda73b6354d (C40; descends from main 900ace7f; reviewer turned the zoom into kitModal kind info = KIT §8 frame, KIT §43.1 + sample)
PASS review/mg-easy-r1 94644c1e6342eb7ea1003aae090cd5310a9597e5 (C23; knowledge minigames level-tiered + aids; reviewer swapped private .kg82tip → kit .kpnote)
PASS review/buoi-transition-r1 c91bfdc4629fbf4ebf84307f543d44a394ff138b (C27; ink-wash buổi transition, KIT §71 jbuoi.js; 4 images already on CDN)
PASS review/room-btn-r1 c80e5df978eaffb29ce218b4431e17b415232750 (C28; KIT §72 kitBackBtnHtml, painted room/map icons already on CDN; 'Bản đồ'→'Dư đồ' per VANPHONG)
PASS review/rel-picker-r1 ce7c076a38d55c95901d19002832983f91560052 (C29; compact Giao tình pickers, kitNameRank face labels, pager arrows only on overflow game-wide; KIT §49.2c + sample)
PASS review/pcard-fill-r1 6975696c6af2ad22bd428e6435dd892d16f0a4b1 (C35; person card right side filled from kit parts, KIT §73; includes review/actcard-small-r1)
PASS review/appearance-port-r1 86234a24c53da664bd75f34b34444751cd7c0e9f (D39; illness/poison/slap/penalty/rash overlays + veil, weekly healing verified e2e; ancestry vs main 2afdafc3 re-checked by Foreman B)
PASS review/panel-size-r1 a523531da8bbf3944c8f0afd2c122176405d4e88 (C37; one kpanel frame size per viewport, KIT §8.1 needs kit keeper; when review/stage-fig-size-r1 lands keep both its kitDpFit cap/crop and this dw=d.clientWidth line)
PASS review/weather-port-r1 100bf8809a77b5a8f381ffac6e426a0c0d2b8a5f (D40; bad-weather outdoor risks + gear/servant/kiệu; reviewer fixed garbled risk line → kit kèm/Ghi chú rows, indoor exclusion)
PASS review/succession-port-r1 0d9b49b9202c663ef4151c01e890a05ffd62aa30 (D32; succession choice + epilogues + 17 living endings no longer say "Chết vì")
PASS review/stat-fx-r1 0eb3e4b4a41a9123ad7181b39fc14afc60f8ab11 (C26; descends from main 900ace7f; top-bar glow green/red + named slow labels + j19 whole-word colour fix)

## CDN
All 6 pending images UPLOADED by Foreman B (11/16): img/fx/buoi-{wash,mist,hills,orb}.webp (C27), img/kit/ico-room.webp + ico-map.webp (C28). Branch review/cdn-pending-b is obsolete (images only; never merge it; delete it — Foreman B's delete push was refused by the server).

## KIT KEEPER NEEDED (ONE KIT KEEPER rule, owner 16/11 — these Foreman B branches were built before the rule reached B and add/change kit parts; main coordinator's kit keeper please approve/renumber before fast-forward)
- buoi-transition-r1: KIT §71 jbuoi.js (buổi transition overlay)
- room-btn-r1: KIT §72 kitBackBtnHtml (painted back button)
- pcard-fill-r1: KIT §73 person-card fill blocks (uses existing parts only; new section = layout recipe)
- actcard-small-r1: KIT §43.1 small act card 3:4 picture + zoom via kitModal kind info
- stat-fx-r1: KIT §57.1 kitStatFx/kitStatGlow
- rel-picker-r1: KIT §49.2c compact picker + kitStripFit (pager arrows only on overflow, game-wide)
- tab-underline-r1: KIT §46 no-scrollbar + edge fade (kitTabFade), sliding line only on bottom nav
- panel-size-r1 (PASS): KIT §8.1 one-size kpanel frame tokens --kpw/--kph + fixed flex-column frame (j79), §8 frame rule changed, per-kind sizes removed (kesdlg, kdper/kdnarrow, kslot, kmc-modal 780), week panel .dawn .dbox.kpanel follows. Short one-line notices sit top-left in a big blank frame — keeper may centre them / bigger font
- palace-map-port (reviewing): kitPalaceMap (worker labelled it §71 — clashes; needs a number)
- appearance-port-r1 (PASS): KIT 28.8b kitFaceFx/KIT_FACEFX registry + kitFxLayers as the single face-layer hook; 28.8b text stale (still lists expr z5 + .kfxf transform copy — expressions removed 22:50Z); shared overlays rash-1..3.png, fx-slap.png (on CDN) for the keeper's art list
- contest-ui (reviewing): kitGameFrame({pic}) picture-left/info-right (.kgbody/.kgpic/.kginfo, CSS in jcui.js #kcu-css), kg82Open/kg82Pic, #kg82.kg-idle, .kgrv self-scrolling list, podium equal figure heights + kpodPrize chips, KIT_BD.podium → new shared art img/kit/podium-bg2(-p).webp. KIT REQUEST: pet-care game box (jpetcare) needs a board painting (e.g. mg-chamthu-bg) + pic in petcGameBox.
- lost-items-port (reviewing): no new kit parts. Note: live j92 Giá họa hearing choices say "an toàn · không được mất gì" though the hearing can go against her — kit-wide wording fix for the keeper.
- (found by succession reviewer, exists on main today) the sticky .kpbar kcattabs strip ("Tất cả 0/16 …") draws on top of the modal on the 1180x820 end card ("Kiếp này") — z-index/stacking, kit keeper.
From now on Foreman B workers only use existing kit parts and file KIT REQUESTs here.

## QUESTIONS
- Q1 (Cloudflare): RESOLVED — owner re-saved the token; works.
- Q2 (C26 stat-fx, for review/act-text owner): a gain still listed in a KÈM row should move to ĐƯỢC — stat-fx only fixed its colour; belongs to review/act-text (coordinator's slice).
- Q3 (C27 buoi-transition): night→morning uses a dawn variant (mist + first light). Should a NEW WEEK also get the sky-band overlay on top of the dawn() week-summary screen, or keep dawn() alone?
- Q4 (C27/C28): KIT sections §71 (buổi transition) and §72 (back button) are used provisionally for the buổi transition (jbuoi.js) — coordinator please confirm/assign the number.
- Q5 (C23 mg-easy): knowledge minigames (Thơ, Câu đối, Đố đèn, Cờ, khảo hạch quiz) now scale with the player's level — low level = Dễ with many aids, high level = harder (more blanks, fewer aids); rewards unchanged. OK with the owner? Also rival NPC scores unchanged, so low-level players clear these more easily (balance look later).
- Q6 (C28 room-btn): under 600 px the room button is icon-only (label in tooltip; a label didn't fit). OK? And should it also appear on landscape/wide screens (it never existed there)?
- Q7 (CDN): RESOLVED — token works, images upload directly.
- Q8 (C23 follow-up, for Foreman C's C7 balance pass): rival NPC minigame scores (kg82NpcMean) unchanged, so low-level players now beat rivals far more easily; and in the lễ/trị cung/xử án quiz banks the right answer is often the longest option (guessable). Suggest C7 or a small worker rebalance/rewrite.
- Q9 (C35 pcard-fill): the game has no per-person 'ghét' (dislike) data — the card shows only known traits/tendencies and the Emperor's known likes. Add dislike data as a design item? Also Thỉnh an stays a talk option of the visit (no free shortcut that would bypass one-talk-per-visit).
- Q10 (C37 panel-size): with one frame size per viewport, short one-line notices now sit in a full-size frame with empty paper (as the rule asks). Owner may want to see it before it goes live.
- Q11 (D39 appearance-port): her own ingredient-specific allergy in recipes (PM:L326) was not built — rash causes already include son phấn and bad-luck food. Owner wants a per-ingredient allergy in recipes (new feature), or is the current cause list enough?
- Q12 (D32 succession-port): the 12 dedicated epilogue pictures in SUCCESSION_PLAN §7 were never approved; chapters reuse approved event art. Owner wants dedicated pictures? And ending cards show ev-quoc-tang (from main's code) — the right picture for succession endings?
- Q13 (C33 weekbook): week-book entry wording is generic per person and direction ("Hoàng thượng để tâm đến ta hơn", "nàng bớt ghen"); per-act sentences would need act data — owner want that later? Also many "Mấy việc vặt…" lines until review/log-sync lands on main (missing log lines; honest, not a bug).
- Q14 (D40 weather; reviewer: with one-off gear the per-trip kiệu is nearly pointless): rain gear (dù/áo tơi/giày) is a one-time purchase that halves one risk; the kiệu costs Bạc −6 per outing. Should gear wear out?
- Q15 (C34 contest-ui): her contest titles (e.g. "Hoa khôi · Tết Thất tịch") show only in Sổ ân thưởng — enough? The cắm hoa board painting is an empty stage with pink curtains (no flowers) — want contest-specific paintings? Only one podium backdrop set was made (owner asked for variants by contest kind/season).

## COORDINATOR ANSWERS (16/11, hourly watch)
- panel-size-r1 a523531da FAST-FORWARDED to main. All other PASSes (C23, C26–C29, C35, C39, C40, D39) go through review/merge-train-2 (main session), with no action from you.
- Q8: yes. Foreman C's C7 balance-pass takes the NPC minigame score raise and the "longest answer is right" fix in the lễ/trị cung/xử án quiz banks. Note sent there.
- Q9: add per-person dislikes ('ghét') as data: 1–2 per consort, plus the Emperor, drawn from the existing likes pool, and learnt by spying or talking. Give it to the next free slot in your slice as C35b (sonnet). Thỉnh an stays a visit talk option: agreed.
