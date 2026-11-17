# OWNER LEDGER — every owner request / ruling (14/11 – 15/11, plus older ones still open)
Written by the session-8 ledger sweep (queue item C10), 15/11. Coordinator keeps it current: when a row changes state, edit the row.

## How to read
- Source refs: `OD:Lnnn` = line in dev/OWNER_DECISIONS.md (docs branch claude/cung-tuong-mong-handover-hj0h8w, as of commit 10cec521); `H8` = dev/handover/HANDOVER_TO_SESSION8.md; `H7` = HANDOVER_TO_SESSION7.md; `PM` = HANDOVER_1115_PM.md; `AM` = HANDOVER_1115.md; `HO` = dev/HANDOVER.md; `KR` = dev/kit/KIT_REQUESTS.md; `Q` = dev/handover/SESSION8_QUEUE.md (A/B/C/D ids).
- Status:
  - **LIVE** = on origin/main (main = f53bdade0 at sweep time), checked with `git grep` on origin/main (`dev/build/j*.js`, assemble.py list) and the LIVE notes in the handovers. "(verify)" = code present but the exact owner detail was not re-tested by this sweep.
  - **BRANCH** = done or in progress on a review/* branch, not on main. Branch state from `gh api compare main...<branch>` (ahead/behind) + its PROGRESS / last commit.
  - **NOT DONE** = nobody has it on a branch. "(Q Dn)" = already in the session-8 dispatch list; "(new Dnn)" = added to SESSION8_QUEUE §D by this sweep.
  - **RULE** = standing rule, in force (nothing to build; workers/reviewers must apply it).
  - **CLOSED** = dropped, reversed, superseded or answered by the owner.
- Important finding of this sweep: 14 owner-approved features from 14/11–15/11 were built on branches that were NEVER merged and are in no session-8 list (schedules/roster j95, palace detail map + residence paintings, difficulty modes, succession choice, routes, scheme minigames, tutorial, leaderboard + Bảng vàng podium, drag page-curl, lost items/theft, appearance overlays + allergy, bad-weather risks, places plan, collection milestones). They are now D29–D49. Most branches are ~600–1100 commits behind main and need a re-port (worker on top of the branch, merge current main, re-test), not a plain review.

- Counts (rows of §2–§4, primary status): 338 rows · LIVE 199 · BRANCH 57 · NOT DONE 67 (incl. 2 partial) · CLOSED 9 · RULE 4 · open question 1 · housekeeping 1. Plus 22 standing rules in §1. UNASSIGNED list (§7): 49 items = D1–D28 (already queued) + D29–D49 (new).

## 1. Standing rules (RULE — apply in every task)
| Rule | Src |
|---|---|
| LUẬT ƯU TIÊN SỐ 1: check OWNER_DECISIONS/HANDOVER/PROGRESS + git grep main and all review/* before any new work | OD:L5, AM:L1 |
| LUẬT SỬA CẢ NHÓM: one fault ⇒ fix the whole family, scan script + before/after table | OD:L52, L474 |
| LUẬT KIT TRƯỚC: every display from the shared kit; missing part → KIT_REQUESTS; reviewers FAIL private UI; one component per element (kit_dupes.js) | OD:L115, L336, L491, L513, HO:L63–72 |
| Alignment to margins/grid ±1px ("owner is OCD") | OD:L337 |
| Don't ask her for go-aheads; PASS → push main; CDN push and drawing missing art need no asking | OD:L51, L220, L223, L270, L518 |
| Never start redraws she didn't ask for; don't raise issues she didn't complain about; existing art stays | OD:L84, L143 |
| Art: Magnific gpt-2-6 only, STYLE_ANCHOR; serene beautiful faces; men no pink/purple; no moles; any art change = pilot first (except build-without-waiting items) | OD:L29, L93, L305, HO:L53 |
| High-res previews, one face per file; screenshots only on the approved current layout; Fold + iPad shots together | OD:L67, L98, L146 |
| Supported screens 755x1000, 1000x755, 1180x820, 1366x1024, 844x390 (+390x844 rotate prompt); one layout per orientation, scaled | OD:L339, L345, L346 |
| No review queue: whichever passes first goes live; one reviewer per branch, many in parallel | OD:L347, L389 |
| Pace stays 16 khắc/week (~188 weeks to HH) | OD:L353 |
| Relation colours: others→me purple #7a4fa0, me→others blue #2f6f9f (kitRel) | OD:L354 |
| Everything two-way, NPCs same rules, real causes (no bare luck), true info only | HO:L46, AM:L38 |
| Every feature must work in 2-player co-op, no "later" | OD:L594 |
| Animations/frames: once ideas are given, build without waiting | OD:L595 |
| Painted, never code-drawn (day-close/night/card-flip scenes, effects) | OD:L659, L662, L722 |
| Sounds go straight in, never sent to her for approval | OD:L699 |
| Performance budget (on-demand art, WebP sizes, one particle layer, Hiệu ứng Đầy đủ/Gọn, co-op carries state only, perf test) | OD:L713–719 |
| bạc road ⇒ another road of EQUAL value | OD:L582 |
| Anything that can be drawn → draw it; credits plentiful | OD:L751 |
| Rank and name always together, rank in its rank colour | OD:L821, L795 |
| Language: repo files English, player text Vietnamese (VANPHONG) | OD:L523 |
| ChatGPT only on "đoạn audit tuần này" / "đoạn điều phối tuần này" (no gate, no schedule) | OD:L524 (replaces L520–522) |
| Hourly watch, not 30 min | OD:L519 |
| Kit rules from 14/11 (one kit, review gate, test devices) | HO:L63–95 |

## 2. 14/11 asks
| # | Ask (short) | Src | Status | Where / note |
|---|---|---|---|---|
| 1 | Face pool 84; NPC consorts draw maid faces only with consort-tier art | OD:L8 | LIVE | |
| 2 | Huadian rules, motifs, sizes (consorts only, 8 tiers, t7/t8 smaller, flowers not fruit) | OD:L9, L90, L92, L97, L101–103, L152, L212, L216, L231, L240, L245 | LIVE (CDN) | final size → row 15/11-#Huadian-8.5% |
| 3 | No facial moles | OD:L10 | LIVE | whole-game re-audit = Q D23 |
| 4 | Calm poses, varied hands | OD:L11 | LIVE / RULE | |
| 5 | Veils by role | OD:L12 | LIVE | |
| 6 | Hủy dung claw marks | OD:L13 | LIVE | |
| 7 | Contests = real minigames | OD:L14 | LIVE | |
| 8 | Podium results screen | OD:L15 | LIVE (j90) | 15/11 refinement → D36 |
| 9 | Event choices show costs only; acts full numbers | OD:L16 (final L469, L477) | LIVE | opt-render, KIT §28.6 |
| 10 | Wardrobe 2 slots, grades, hidden fit, Tự chọn đồ, Chải chuốt, sell/pawn, frame-ups | OD:L17 | LIVE | merged into Tư trang (balance-unified) |
| 11 | Rewards from real item pool, chest reveal | OD:L18 | LIVE | |
| 12 | Origin odds; cnv winnable | OD:L19, L43 | LIVE (balance-pass); per-origin spread unmeasured (17/11 sweep) | spread measure = Q C7 balance-pass |
| 13 | Balance targets (early death ~40–45%, HH ~32%, birth death 8–12%) | OD:L20 | LIVE; measured on target (balance-after-truth) (17/11 sweep) | bots HH 0% on main (promo-exam gate) |
| 14 | Portrait cards 3:4, same inner size, ornaments visible, no round avatars | OD:L21, L23, L40, L42 | LIVE | |
| 15 | Stage scale / floor line | OD:L22, L58 | LIVE | |
| 16 | Identity screen + origin roulette | OD:L25, L66, L79 | LIVE | |
| 17 | Game-feel animations for key moments | OD:L26 | LIVE; promo, card-flip, night-end, jpres all merged (17/11 sweep) | rest: A9 promo-rules, A11 cardflip, B1 night-end, Q D11 |
| 18 | Weather visible + chip (already built) | OD:L27 | LIVE | |
| 19 | Scenes 4 seasons × buổi; fill missing variants | OD:L28, L30, L149 | LIVE; 4 seasons x 4 buoi on all places (17/11 sweep) | place-colour/place-art graded all; review/place-seasons (1 ahead) only an inventory |
| 20 | 4 buổi × 4 khắc | OD:L31 | LIVE | |
| 21 | Who-is-where habits + intentions + surprises; NPCs learn her habits | OD:L32 | LIVE (j95 schedules/roster) (17/11 sweep) | review/schedules2 (27 ahead, 1163 behind; independent PASS 14/11, never merged) |
| 22 | Catching secrets / trysts at hidden spots | OD:L33 | LIVE (j95 + jroute) (17/11 sweep) | same branch (j95) |
| 23 | ONE location ledger S.roster + roster.js dev tool + Chép sổ | OD:L34 | LIVE (S.roster, j95c rosterWhere) (17/11 sweep) | rosterWhere not on main (jmen/j96 guard it) |
| 24 | Motive gate for every NPC decision (0 contradictions) | OD:L35 | LIVE (motiveOK gate, j95c) (17/11 sweep) | |
| 25 | Bot audit of the ledger before release (ROSTER_AUDIT.md) | OD:L36 | LIVE (roster_audit + ROSTER_AUDIT.md) (17/11 sweep) | |
| 26 | Painted backgrounds for every minigame | OD:L37 | LIVE (24 painted minigame backgrounds) (17/11 sweep) | |
| 27 | Thanh mai trúc mã love arc | OD:L38 | LIVE (j96) | |
| 28 | Rare endings + Sổ luân hồi count | OD:L39 | LIVE (j97) | |
| 29 | Housing rules; own palace at Tần | OD:L41, L252 | LIVE | court-rules |
| 30 | Anti reroll-by-death (trọn kiếp / dở dang) | OD:L44 | LIVE (jkiep) | |
| 31 | Wardrobe items redo from game outfits (260) | OD:L45 | LIVE | |
| 32 | Collection milestones: Sổ luân hồi titles + Phúc duyên +5/+10/+20/+35 at 20/50/100/200 items | OD:L45, L46 | LIVE (jcol, +5/+10/+20/+35) (17/11 sweep) | jearn has only a stand-in counter "until j92cat lands"; j92cat never landed |
| 33 | Every item painted, kitItem grade frame | OD:L47 | LIVE | |
| 34 | Fold unplayable batch (top bar, stage height, sticky card, chip rows) | OD:L49, L53–63, L67–74 | LIVE | fold-layout + book UI |
| 35 | Every backdrop in portrait AND landscape | OD:L50 | LIVE | landscape-art |
| 36 | Room-scene home view on phone; iPad split | OD:L65, L112, L123 | LIVE | |
| 37 | Phone-specific room paintings | OD:L64, L75, L77 | CLOSED | cancelled by owner |
| 38 | Act pictures: show the act; keep originals; night Chặn ngự giá; time of day | OD:L76, L78, L84 | LIVE | |
| 39 | Selected state = gold glow, no check badge | OD:L80, L81 | LIVE | |
| 40 | New places (Dãy nhà cung nhân, Ngự thiện phòng, Nội vụ phủ, Hoán y cục, Phật đường, học đường); edits of approved scenes | OD:L82, L86 | LIVE (jplx: 5 places, places-d42 test) (17/11 sweep) | Ngự thiện phòng/Phật đường/Nội vụ phủ + maid room + Tân Giả khố live; Dãy nhà cung nhân redo on review/places (2 ahead, unmerged); học đường / Hoán y cục reachability unverified |
| 41 | Princes' residences (nhũ mẫu, A ca sở, Đông cung, orphans) | OD:L87 | LIVE (jplx: A ca so, Dong cung, study hall) (17/11 sweep) | "A ca sở" not in main code |
| 42 | Result texts as bullet lists | OD:L83 | LIVE | |
| 43 | Difficulty Dễ / Vừa / Khó per life, in Sổ luân hồi | OD:L85 | LIVE (jdiff, identity-card choice) (17/11 sweep) | review/difficulty v8 (21 ahead, 997 behind) never merged; jdiff not on main |
| 44 | Succession choice: Hoàng thái hậu / nhiếp chính / Nữ đế, each with conditions + epilogue; card shows full odds | OD:L85, L88, L106 | LIVE (j99succ, 3 roads) (17/11 sweep) | review/succession2 SẴN SÀNG KIỂM 14/11 (12 ahead), never merged; main has only the old HTH ending |
| 45 | Her own age in the top bar | OD:L89 | LIVE | |
| 46 | Items never free; audit free grants | OD:L91 | LIVE (jearn) | |
| 47 | CO-OP 2 players, shared world, invites, Sẵn sàng, rebirth choices, Cloudflare | OD:L94–96, L99, L105, L138, L153, L154, L157, L165 | LIVE | co-op gaps → Q D21; rebirth as tiểu thư → B2 |
| 48 | Tiểu thư / life outside the palace route (single + co-op); tuyenTu ages 18+ | OD:L95, L104 | LIVE (jkc home road; outside-r2-r2 merged) (17/11 sweep) | |
| 49 | Allergy (dị ứng) rash overlay, two-way, heals | OD:L107, L117, L124 | LIVE (jrash, jface face fx) (17/11 sweep) | review/items-earned (jrash, 3 ahead) + review/appearance unmerged |
| 50 | Item rivalry: extort, bribed servants steal, plant to frame (pure game rules, approved) | OD:L108, L117 | LIVE (jlost + jsteal) (17/11 sweep) | review/lost-items (jlost) SẴN SÀNG KIỂM 14/11 (12 ahead), never merged |
| 51 | Dialog option layout per screen; big events with painted header | OD:L109, L113 | LIVE | |
| 52 | Fold person card = iPad layout | OD:L59, L60, L62, L110 | LIVE | |
| 53 | Act/event frames per category, no tassel | OD:L70, L111 | LIVE | |
| 54 | kitEventStage full-body figures in events/week book | OD:L114 | LIVE | |
| 55 | Book UI (two-page spread, page curl like paper) | OD:L116, L119, L120, L132 | LIVE | |
| 56 | Event art muted / st-* style; Tiên đế băng hà | OD:L117, L124, L125, L131 | LIVE; art on CDN with succession (17/11 sweep) | ships with D32 |
| 57 | 'Vào cung ngay' vs 'Ở nhà chờ tuyển tú' real dilemma | OD:L118 | LIVE (jkc two-road choice) (17/11 sweep) | |
| 58 | Appearance: illness, poisoning, slap/punishment overlays | OD:L121, L126, L130 | LIVE (jface kitFaceFx, facefx-all) (17/11 sweep) | review/appearance (9 ahead, 1045 behind) never merged; no kitFaceFx on main |
| 59 | Postponed appearance art: pregnancy figures (6 & 9 months), nun figure, dưỡng nhan glow, grey strands, smallpox | OD:L121, L122 | NOT DONE: art for 5 appearance conditions not drawn (17/11 sweep) | postponed "save credits"; reason lifted by OD:L751 |
| 60 | Code facial expressions | OD:L126, L139 | CLOSED | removed by owner |
| 61 | Emotion system + human-face palace-lady icons | OD:L127, L129, L145, L148, L151, L156 | LIVE (jemo) | 15/11 refinements below |
| 62 | Research trungsinhgame | OD:L127 | LIVE (done) | TRUNGSINH_COMPARE.md |
| 63 | Độ khó row overlap on identity card | OD:L128 | LIVE (jdiff row; idcard-bar-overlap test) (17/11 sweep) | |
| 64 | Servant start shown in maid outfit (figure follows role) | OD:L128 | LIVE | player-dress |
| 65 | Dư đồ leather map; Tư trang inventory grid; roulette approved; face-down cards flow | OD:L133, L135 | LIVE | inventory-origin |
| 66 | Residence paintings per person (8 palaces + side halls, 16 variants each, shared rooms) | OD:L134, L136, L137, L140, L142, L147, L155, L163 | LIVE (jres, 25 rooms) (17/11 sweep) | 400 paintings done on review/residence-art, merged into review/palace-map (13 ahead, 1128 behind), never merged; jres.js not on main |
| 67 | Seasons redraw of old place backdrops | OD:L139, L144 | CLOSED | rejected; L147 correction = residence rooms (row 66) |
| 68 | Loading screen + device cache | OD:L141 | LIVE | size → Q D15 |
| 69 | Book UI first, then go live at once | OD:L148, L150 | LIVE | |
| 70 | Palace detail map (Dư đồ → courtyard by chủ vị rank, Phượng Lệnh 'nhat' art → rooms with real counts) | OD:L158–160, L166 | LIVE (jpm kitPalaceMap, KIT 33) (17/11 sweep) | review/palace-map (kitPalaceMap/jpm) never merged |
| 71 | Tư trang fixes: card border, grade backgrounds reuse frames, equipment slots, garment art, inline info, wear slots, luxury numbers, no allowance shown | OD:L161, L162, L169–175, L181, L187 | LIVE | luxury depth → Q D17 |
| 72 | KIT_FIG one figure scale; men ×1.07; iPad 3 / phone 2 people | OD:L164, L167, L176, L177, L185, L189, L197 | LIVE | |
| 73 | Men on walks, zones, choices; plan-driven intrusions; 4 guard looks | OD:L168, L183, L188 | LIVE (jmen) | |
| 74 | Stage name labels rank over name, rank colour | OD:L171 | LIVE | |
| 75 | 'Nhờ thái giám mua đồ' rename | OD:L172 | LIVE | |
| 76 | Category tab row centred | OD:L173 | LIVE | |
| 77 | Dư đồ locked places: no grey boxes, lock mark, tap card | OD:L178 | LIVE (j41 lock mark, dudo-lock test) (17/11 sweep) | |
| 78 | Page curl shows next page underneath, content on back, sheet swing | OD:L179, L186, L198 | LIVE | |
| 79 | No Chinese characters; 'Ngự' seal | OD:L180 | LIVE | |
| 80 | Choice cards (Nam nhân nơi cấm địa) full Tốn/Được/Mất | OD:L182 | LIVE | |
| 81 | Alternative routes: tư tình, escape, leave legally, follow another man | OD:L184 | LIVE (jroute: 4 private roads) (17/11 sweep) | review/routes (33 ahead, 735 behind) paused 15/11 04:02Z (disk); escape too easy, bot fix |
| 82 | Tư tình child → trích huyết nghiệm thân blood test (+ animation/minigame) | OD:L190, L192 | LIVE (jroute blood test, card only) (17/11 sweep) | in review/routes |
| 83 | Dialogs: only the option list scrolls | OD:L191 | LIVE | |
| 84 | Scheme acts get abstract minigames (Nghe ngóng, Truyền lời, Mặc cả, Thời cơ), skip option, NPCs plain odds | OD:L192, L195, L199 | LIVE (jsgame: 4 scheme minigames) (17/11 sweep) | review/scheme-games SẴN SÀNG KIỂM 15/11 02:45Z, never reviewed (4 ahead, 852 behind) |
| 85 | Event dialogs: people standing on the scene picture | OD:L194 | LIVE | |
| 86 | Player figure drawn at every place | OD:L196 | LIVE | |

## 3. 15/11 asks (in log order)
| # | Ask (short) | Src | Status | Where / note |
|---|---|---|---|---|
| 1 | SW checks for new build on open/return | OD:L201 | LIVE | loading + update-flow |
| 2 | Purple book cover band removed everywhere | OD:L202, L218 | LIVE | |
| 3 | All images on Cloudflare, not git | OD:L203 | LIVE | |
| 4 | Dư đồ unroll slower; reachable if walk ≤ remaining khắc | OD:L204, L205 | LIVE | |
| 5 | Khuê các dresses (84 faces) + poor-girl dresses (thd/td) | OD:L206, L209–211, L214 | LIVE (jkc wiring; art on CDN) (17/11 sweep) | wiring via outside-r2 (Q B2) |
| 6 | Maid fix batches | OD:L207 | CLOSED | already on main |
| 7 | Page turn ~2× slower; opaque sheet | OD:L208, L219 | LIVE | |
| 8 | Huadian motif changes (m05 cherry blossom, objects → flowers) | OD:L212, L216 | LIVE (CDN) | |
| 9 | Trùng Sinh Top 15 (14 kept; #11 dropped) | OD:L213, L215 | LIVE | ts-a (2,3,4,5,6,12,14) + ts-b (1,7,8,9,13); #10 also relies on routes (D33); #15 = j83 |
| 10 | Bullying also demands items | OD:L217 | LIVE (ts-b) | |
| 11 | Passed builds go live without asking | OD:L220 | RULE | |
| 12 | Side-chance ladder Rất thấp…Rất cao; Tai mắt + Ân sủng on stage; Tư chất panel removed | OD:L221, L228 | LIVE (sub-odds) | |
| 13 | No reload mid-play; 'Có bản mới' chip; co-op update at sync point | OD:L222, L224 | LIVE (update-flow) | |
| 14 | Coordinator may push images to CDN itself | OD:L223 | RULE | |
| 15 | Fix play-with-friend UI urgently | OD:L225, L272 | LIVE (coop-ui) | |
| 16 | Thỉnh an pictures (vạn phúc, wide sleeves, TH vs HH different) | OD:L226, L237, L280, L417, L423, L427 | LIVE (CDN) | |
| 17 | New-player tutorial (guide mama, ≤12 steps, tips, on/off, replay) | OD:L227 | LIVE (jtut: guide, goal card, replay) (17/11 sweep) | review/tutorial WIP 2/3 (3 ahead, 773 behind), paused 15/11 07:00Z |
| 18 | Giao tình 3 columns; errand runner wording; Thỉnh tranh chip | OD:L229, L230 | LIVE (hau-cung-ui) | |
| 19 | Frame ornament attached; switch fades; straight columns; Sổ tuần full-page figure; next pages | OD:L232–235, L251, L277 | LIVE | |
| 20 | Person dialogs left full-body figure (KIT §32.7) | OD:L236 | LIVE (dialog-person) | |
| 21 | Act lists: doable first, then time-blocked, then others | OD:L238, L317 | LIVE | |
| 22 | Ban vague effect words; good things never in red Kèm | OD:L239 | LIVE | |
| 23 | Men tab / tab restructure: Hậu cung [Chí tôn · Phi tần · Nam nhân · Cung nhân]; Giao tình [Ân oán · Phe phái] | OD:L241, L246, L249, L256 | LIVE | |
| 24 | Consort card shrinking bug | OD:L242 | LIVE | hotfix |
| 25 | 'Có người đến' real dilemma; audit 2–3-option events | OD:L243, L447 | LIVE (ts-b) | |
| 26 | Thỉnh an Hoàng hậu really +4 (hotfix) | OD:L244, L248, L263 | LIVE | |
| 27 | Subject-verb relation labels | OD:L247 | CLOSED | superseded by "thiện cảm" (OD:L352, L394) |
| 28 | Every button gives the result it says (act-audit) | OD:L250, L266 | LIVE | |
| 29 | Odds from real factors + 'Vì sao' | OD:L255 | LIVE | clarity of the explanation line → Q C11 pick-hint |
| 30 | Rules one source; shown numbers = rule constants; 'Đức 33 → 28' only | OD:L253, L257, L258, L261, L265 | LIVE | |
| 31 | Out of khắc on arrival: stay at place, new buổi there; tap current place | OD:L259, L260, L262 | LIVE (court-rules) | |
| 32 | Stage: she appears once; '+N'; one count; slot template; NPC proper names; no small extra portraits | OD:L264, L269, L273 | LIVE (stage-slots) | |
| 33 | Repo history slimming (needs owner consent) | OD:L267 | OPEN: needs owner consent; images already on CDN (17/11 sweep) | see §6 |
| 34 | Kính sự phòng evening too garish | OD:L268, L283 | LIVE (graded) | |
| 35 | Main session may draw missing art | OD:L270 | RULE | |
| 36 | Pets 18–24, grades, uses, divine beast saves a life, downsides | OD:L271 | LIVE (pets-fix) | |
| 37 | Strangers as silhouettes; image-quality audit | OD:L274 | LIVE (img-quality) | |
| 38 | Archaic renaming (Tuần lục, Sang buổi, Cùng hảo hữu, ngươi→ta …) | OD:L275, L284, L307, L311, L312, L332 | LIVE | |
| 39 | Page turn bends with the finger (press-drag, spring back, flick), ‹ › also curl, cover stiffer | OD:L276 | LIVE (kitCurl drag, page-curl2) (17/11 sweep) | review/drag-curl (2 ahead, 661 behind) never merged |
| 40 | Tuần lục act pictures distinct per meaning; 'Đến <place>'; context | OD:L279, L341, L468 | LIVE (act-pics2 on CDN; 803/804) (17/11 sweep) | act-pics2 r7 live; rest Q C4 |
| 41 | Online leaderboard (life + player ranking, guest code, Công danh) | OD:L281 | ON BRANCH rank-port-r2; blocked on kit parts kitRankList (17/11 sweep) | review/rank (Worker ctm-rank + DO, 5 ahead, 741 behind) never merged |
| 42 | Announce every event that changes her stats immediately; Sổ tuần only a summary | OD:L282 | LIVE (act-audit, kitStatFx, log-sync) (17/11 sweep) | act-audit |
| 43 | She chooses the target of every act (kit picker); NPC targets by motive | OD:L286 | LIVE | picker visible in owner s8 shots |
| 44 | Place card layout (picture top, info, buttons); 'Đi (đến nơi vào buổi sau)' | OD:L287, L288, L290 | LIVE (place-card) | |
| 45 | Targeted 'Sai đi dò la' + cheaper 'Nghe ngóng chung' | OD:L289 | LIVE (jwhy) | |
| 46 | Hoàng tự tab rebuilt with kit sub-tabs; princes' marriages; công tử art | OD:L291, L293, L294 | LIVE (hoang-tu) | |
| 47 | Walk-spill hotfix | OD:L292 | LIVE | |
| 48 | Game feel: press/glow, Pixi particles, vibration, shake | OD:L295 | LIVE (game-feel) | painted replacements → A2 fxkit |
| 49 | Shop: eunuch person dialog, item cell grid, price + Mua, − n +, Mua/Bán tabs, sell handmade | OD:L296, L308, L313, L322, L338, L344 | LIVE (shop-fix) | |
| 50 | face-thaihau-3 redraw gentle | OD:L297 | LIVE (CDN) | |
| 51 | Colour-grade garish buổi backgrounds; per-buổi light layer → none | OD:L300, L328, L330, L342 | LIVE (scene-light) | |
| 52 | Dư đồ midday buổi (from PL) ; Dư đồ not graded | OD:L301, L329 | LIVE | map-*-trua on main |
| 53 | She can promote her own maids/eunuchs (Chưởng sự cô cô, Nữ quan, Thủ lĩnh, Tổng quản), limited by rank; NPCs same | OD:L302 | LIVE (jpromsv: de bat own servants) (17/11 sweep) | no promotion act found in main code |
| 54 | Pet grades use the equipment grade ladder/frames | OD:L303 | LIVE | |
| 55 | Item cut-outs re-cut (not redraw) | OD:L304 | LIVE (CDN 200 items) | |
| 56 | Everyone beautiful/serene; Thái hậu 2/3/5 redrawn | OD:L305 | LIVE | |
| 57 | 'Chí tôn' tab | OD:L306 | LIVE | |
| 58 | Person card: name+rank at top, portrait up, acts in small kit tabs | OD:L316, L318 | LIVE | s8 widening → Q C12 |
| 59 | Monthly stipend card; stipend balance vs prices | OD:L321 | LIVE (econ-stipend) | |
| 60 | Economy by rank (HH surplus ~3–4× Đáp ứng, low-rank income roads, tiered prices) | OD:L325 | LIVE (jecon, jstip, jbac reprice) (17/11 sweep) | econ part live; ratio not re-measured |
| 61 | Remove every Thôi/Lui/Đóng → one ✕; tap outside closes | OD:L331, L340 | LIVE (kit-close) | |
| 62 | Handmade redraws (dance dress, Điệu múa, chess problem); no Chinese in calligraphy | OD:L333 | LIVE (CDN) | |
| 63 | Supported screens + rotate prompt | OD:L339 | LIVE (rotate prompt in small-bugs-3) (17/11 sweep) | rotate prompt fix in small-bugs-3 (Q A3) |
| 64 | Cheeks black on dark backgrounds (alpha) | OD:L343 | LIVE | |
| 65 | Landscape = iPad frame scaled | OD:L345, L346 | LIVE (rot.js) | |
| 66 | Bad weather: cold/slipping as Mất of OUTDOOR acts (no extra walk khắc), umbrella/cape/sedan reduce, NPCs same | OD:L348, L351 | LIVE (jweather outdoor-act risks) (17/11 sweep) | review/weather (jweather, 3 ahead, 671 behind; reviewer: "needs fixes") never merged |
| 67 | Tap stage character → exact kit person dialog | OD:L349 | LIVE (person dialog; dialog-person test) (17/11 sweep) | |
| 68 | Portrait frame shows full jade pendant + tassel | OD:L350 | LIVE (tassel-fix) | |
| 69 | One word "Thiện cảm"; names without numbers | OD:L352, L394 | LIVE (j84 rewrite; rel-words-scan 0) (17/11 sweep) | leftover "thân ±N" sweep in small-bugs-3 (Q A3) |
| 70 | Relation lines one kit component; two stats thiện cảm + oán | OD:L360, L362 | LIVE (jkrel; fix-float r9 merged) (17/11 sweep) | §52 relation table in fix-float r8 (Q A4) |
| 71 | People strip names only; third-person words; Ân oán tabs; figure ≥95% | OD:L355–358 | LIVE | |
| 72 | kitNameRank: name + rank above every figure | OD:L361 | LIVE | |
| 73 | Đáp ứng frame (ivory, frame A) | OD:L363, L365, L375, L380, L386, L410 | LIVE | |
| 74 | ~613 more act pictures; Emperor costume original style (no Qing hat, no cheongsam collar) | OD:L364 | LIVE art on CDN; Emperor Qing-hat pics fixed (17/11 sweep) | Emperor costume audit → new D45 |
| 75 | Her court emblem above her head (8 tiers, bob, item in chest, Dùng to switch; HH/HQP swap) | OD:L366, L390, L411 | LIVE (jmark emblem; promo chest) (17/11 sweep) | emblem in the promotion chest → promo-rules (Q A9) |
| 76 | Emotion icons: game painting style, no text, tap shows name + reason, clear Vui/Giận, Sợ fix | OD:L367, L368, L381, L393 | LIVE | |
| 77 | "Đang mặc" one word for every worn item | OD:L369 | LIVE (j84 maps Dang cai to Dang mac) (17/11 sweep) | one "Đang cài" string still in main → new D47 check |
| 78 | Gifts at game start from the brocade box; rank outfit set via chest on entry and every promotion | OD:L370 | LIVE (jpromo set; jeitem start chest) (17/11 sweep) | promotion set → Q A9 |
| 79 | Equipment slot panel = standard dialog size, no Lui | OD:L371 | LIVE (jinv equip slots; test item-info) (17/11 sweep) | |
| 80 | kitGain/kitLose animation every time items/silver arrive or leave | OD:L372, L376 | LIVE (game-feel) | |
| 81 | Top bar option A | OD:L373 | LIVE | |
| 82 | Demotion/cold palace: above-rank items confiscated in a scene (eunuch + tray) | OD:L374 | NOT DONE: no eunuch-tray scene for demotion confiscation (17/11 sweep) | demotion FX §66 there; confiscation scene not confirmed on main |
| 83 | Sound for every game moment | OD:L377 | LIVE (sfx) | win/fail on every result → Q D1 |
| 84 | Bảng vàng / contest podium: big characters, podium = name plate, medals, frame by highest rank, one title | OD:L378 | PARTLY LIVE: j90 podium live; ranking list on rank-port-r2 (17/11 sweep) | review/rank-ui WIP (8 ahead, 658 behind) |
| 85 | Breach-of-etiquette rule | OD:L379 | LIVE (trung-y) | |
| 86 | Trung y by tier when the outfit slot is empty; robbed of clothes event | OD:L382, L385, L391, L392 | LIVE (trung-y) | re-issue rules → Q D6 |
| 87 | Act pictures anatomy re-audit | OD:L383 | LIVE art on CDN; hand audit done (17/11 sweep) | |
| 88 | Morning Điểm trang (outfit + makeup minigames, reactions) | OD:L384 | LIVE (toilette) | |
| 89 | Pets: painting style, legendary higher grades, 4 stages, care screen, others' pets, no tortoise, markings, Linh thú painted aura, cat redraw | OD:L387, L388, L395, L397–403, L407, L413 | LIVE (88 images) | thiếu niên chubby redraw → Q D2 |
| 90 | One odds function odA for every act | OD:L394 | LIVE (odA used in 26 modules) (17/11 sweep) | |
| 91 | Top-bar portrait cell as large as the name block | OD:L396 | LIVE (header-danh) | |
| 92 | Tư trang 2 tabs Việc / Túi đồ | OD:L404 | LIVE | |
| 93 | 'Tin trong cung' card kept + renamed; remove → reversed | OD:L405, L414 | LIVE | |
| 94 | Skin clean + rosy faces | OD:L406, L415, L475 | LIVE | hands/neck match → Q C5 |
| 95 | Unmet faces in news cards / wrong person avatars | OD:L408, L409, L498 | LIVE (kit-fig2, face-reveal) | |
| 96 | Portrait in frame: no zoom, move up, body centred | OD:L412, L416 | LIVE (rank0-ivory) | |
| 97 | Outside tap closes the card only, never falls through | OD:L418 | LIVE (kit-close) | |
| 98 | Minigame acts: tap opens game, deduct after | OD:L419, L421 | LIVE (act-audit) | |
| 99 | Makeup shows on her face everywhere that day | OD:L420 | LIVE (toilette) | |
| 100 | Every item glows in grade colour, tap to receive, flies to Tư trang; slow reveals; real grades | OD:L422, L497 | LIVE (game-feel) | |
| 101 | Gift dialog: item picture, info, recipient tabs; item in use shows item | OD:L424, L433 | LIVE (gift-ui) | s8 picture grid → Q C13 |
| 102 | Handmade: 10 per kind × 4 grades, dish-specific minigames | OD:L425, L429, L457 | LIVE (j83) | |
| 103 | Every image used by 2+ events gets its own picture | OD:L428, L451, L458 | LIVE; leftovers show 'tam' placeholder marker (17/11 sweep) | leftovers → new D46 |
| 104 | 'Bỏ độc vào' in gifts; Thử độc | OD:L430 | LIVE (poison-gift) | Emperor/Thái hậu poisoning → Q D8 |
| 105 | App logo; Trân nữ seal top right | OD:L431, L432 | LIVE (brand) | |
| 106 | kitActCompact | OD:L434 | LIVE | |
| 107 | Dưỡng sức vs nghỉ một lát | OD:L435 | LIVE (rest-balance) | |
| 108 | Rainy room warmer | OD:L436 | LIVE | |
| 109 | Tài nghệ / Mệnh truyện / Việc nhờ tabs in kit UI with sub-tabs; filter row outside scroll | OD:L438, L446 | LIVE (tabs-kit) | |
| 110 | Portrait scale per group (children etc.) | OD:L439, L553, L554 | LIVE (por-scale) | |
| 111 | Newborn tư chất hidden; Văn/Võ/Đức grow; hiền tài from 6; Hoàng tự trong cung info | OD:L440, L441 | LIVE (hoangtu-tuchat) | |
| 112 | Edge-cut figures / Thái hậu robe | OD:L442, L463 | LIVE (scene-light) | |
| 113 | Person event dialog standard size, name above | OD:L443 | LIVE | |
| 114 | Đoan ngọ invitation own picture, labels not over heads | OD:L444 | LIVE (festival banners; fest-art test) (17/11 sweep) | festival banners live; check in D46 |
| 115 | kitEventDp shared template | OD:L448 | LIVE (kit-fig2 r8) | |
| 116 | Emperor daytime acts (audience, soup, gift, chess, zither, garden walk); Thái hậu similar | OD:L449, L459 | LIVE (gift-ui) | |
| 117 | Chân tình real cause; Ân tình explanation/number | OD:L450, L467 | LIVE (poison-gift) | |
| 118 | Tự học pictures per subject | OD:L452, L465 | LIVE | |
| 119 | Event sound by meaning; crying fixed | OD:L454, L467 | LIVE (sfx) | |
| 120 | Choice renderer drops Được/Mất (bug) | OD:L455 | LIVE (opt-render) | |
| 121 | THÀNH/BẠI stamp follows real outcome; Kèm merged; Bạc −5 source | OD:L456 | LIVE | |
| 122 | Decimals rounded at write + old saves; 'thù' → 'oán'; log the real outcome | OD:L461, L493 | LIVE (fix-float on main: jint.js whole numbers) (17/11 sweep) | jint.js not on main |
| 123 | Tuần lục: text overflow, card instruction text copied, chips never wrap | OD:L462 | LIVE (fix-float on main, jkrel.js) (17/11 sweep) | |
| 124 | Story witness quest: gains/losses, silver-free path, postpone; story labels + deadlines | OD:L464, L499 | LIVE (event-balance) | |
| 125 | Night notes: male mood cells, act button pictures, sub-tabs, mood+face after events, proper flower game, real gift for 'trả quà', new day after tranh sủng + bath, crying sound, visible Ân tình, expensive materials worth it | OD:L467 | LIVE (jnight.js on main) (17/11 sweep) | new day after tranh sủng = jnight in fix-float (Q A4) |
| 126 | Event choices: price + Cần + one honest hint + risk label; outcomes by context; skilled play beats random | OD:L466, L469, L477, L478 | LIVE except bot proof hint>random unmet (balance lever) (17/11 sweep) | bot proof (hint bot ≫ random) → Q C7 |
| 127 | Act-button pictures drawn, no group pictures | OD:L470 | LIVE | |
| 128 | Mood cells show current causes | OD:L471 | LIVE | |
| 129 | Makeup đẹp/diêm dúa levels approved | OD:L472, L475 | LIVE | |
| 130 | Outfit/makeup reactions as event frames (max 1–2) | OD:L473 | LIVE (jtoilr.js incl. extra reaction buttons) (17/11 sweep) | extra reaction buttons → Q D27 |
| 131 | Huadian size (c05, per tier, 0.07 too small, 8.5% chosen) | OD:L476, L490, L512, L529, L592 | PARTIAL: 72 por fixed on CDN; r3 FAIL list + Luan hoi still open (17/11 sweep) | batch at 8.5% |
| 132 | Tuần lục person page fixed template; flash on page turn; small avatar square border; name colours | OD:L479, L481, L503 | LIVE (fix-float on main) (17/11 sweep) | KR rows 2, 4 |
| 133 | VIỆC · <cung> palace visit box | OD:L482 | LIVE (kit-fig2 r8) | |
| 134 | Evening Bái kiến; Phế phi Lý figure; weather × buổi; blue tap box; 'Qua ngày'; update chip | OD:L484–488 | LIVE (close-bugs, jly) | |
| 135 | Pictures: action pictures with few people; story pictures may have people | OD:L492 | LIVE (act pictures complete on CDN; rule kept) (17/11 sweep) | |
| 136 | Evidence lines with real source; ranks; decimals; '..' marks | OD:L494, L495 | LIVE (fix-float + evidence-truth on main) (17/11 sweep) | |
| 137 | Tuần lục every page has a full-body figure (no page packing) | OD:L496, L511 | LIVE (fix-float on main) (17/11 sweep) | |
| 138 | Festival × contest pairs match | OD:L500 | LIVE (close-bugs) | |
| 139 | Ân sủng panel per reference shot; duplicate Sức condition | OD:L501, L510, L516 | LIVE (stage-slots, close-bugs) | |
| 140 | Tuần lục cover title: vertical old calligraphy d4 + Trân nữ seal | OD:L502, L517, L530 | LIVE (book-title) | |
| 141 | Promotion requires an exam; NPCs too | OD:L504 | LIVE (promo-exam) | |
| 142 | Son = direct promotion; daughter = exam; servant/mama roads = exams | OD:L525, L590 | LIVE (promo-rules + promo-skip on main) (17/11 sweep) | |
| 143 | Midday room brown; fireflies at midday; Emperor painting reward without chest | OD:L505 | LIVE | |
| 144 | One kit label/value table everywhere | OD:L506 | LIVE (kit-table + row-align on main) (17/11 sweep) | s8 row alignment → Q C14 |
| 145 | Stipend items real + chest; stipend skimming event | OD:L507, L508 | LIVE (econ-stipend + econ-items on main) (17/11 sweep) | item skimming → Q D6 |
| 146 | Header groups: left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng, right Bạc·Sức | OD:L509, L515 | LIVE (header-danh) | |
| 147 | Neck black mark on figures | OD:L510 | LIVE (scene-light) | |
| 148 | ChatGPT audit setup | OD:L520–524 | LIVE (AGENTS.md) / RULE | |
| 149 | Figure background (silk hanging scroll A, rods, same size inside, crop wide robes, per-status motif) | OD:L526, L646, L649 | CLOSED: owner dropped painted scroll behind figures (OD:L1314) (17/11 sweep) | |
| 150 | Item events: item icon in dialog, fly to Tư trang / burn animation | OD:L527 | LIVE (item-events §64) | |
| 151 | People animations proposals (13-item list approved) | OD:L527, L610 | PARTIAL: promotion/demotion live; other 11 animations unwired (17/11 sweep) | |
| 152 | Event entrance animations (edict scroll); main-story frames by ORIGIN (9 styles); side-story frame ideas | OD:L528 | NOT DONE: origin frames + entrance animation (kit part + art needed) (17/11 sweep) | make sure D11 includes the 9 origin frame styles |
| 153 | Brown/sepia wash audit of every place | OD:L531 | LIVE (place-colour) | |
| 154 | Rank-title look (rank colour, glow on paintings only, vivid) | OD:L532, L702, L703 | LIVE (rank-title) | |
| 155 | Month calendar (3×10, fixed festivals, desk icon) | OD:L535–539 | LIVE (month-calendar) | |
| 156 | Act pictures: no faces; dark = gloomy mood for scheming, light = normal | OD:L542–545, L638 | LIVE (act pictures redrawn, on CDN) (17/11 sweep) | |
| 157 | 4 placeholder pictures + missing list | OD:L548–551 | LIVE (placeholders drawn; stand-ins marked "tam") (17/11 sweep) | drawing the missing ones → new D46 |
| 158 | Makeup: picked colours show exactly on her picture (lips, eyes, blush) | OD:L555 | LIVE (mk-colour on main; fits for 12960 pictures) (17/11 sweep) | |
| 159 | Thái y: monthly pulse, 'Mời thái y bắt mạch', early pregnancy, bribed physician | OD:L558, L625–629 | LIVE (thaiy on main) (17/11 sweep) | |
| 160 | Night-end pictures by mood, sound, new-day picture by season/festival | OD:L561–564 | LIVE (night-end on main, jne.js) (17/11 sweep) | |
| 161 | Art completeness: 4 age bands × every rank for every character | OD:L567 | LIVE (jartc.js; groups A, eunuch ranks, grown kids drawn) (17/11 sweep) | |
| 162 | Recipes learnt/bought; repeat fatigue; tastes; allergies; cheap teacher; 4 sub-styles; level-up grants a recipe | OD:L568–572, L575, L576, L675, L695 | LIVE (recipes on main, jrcp.js) (17/11 sweep) | |
| 163 | Story chapter labels 'Chương N · Hồi M' | OD:L581 | LIVE (chap-label) | |
| 164 | bạc road ⇒ equal-value other road (balance rule) | OD:L582 | LIVE (balance-pass on main; rule stays) (17/11 sweep) | outside-r2 added 13 twins |
| 165 | Pre-palace route (re-port onto main) | OD:L585 | LIVE (outside-r2-r2 on main, jkc.js) (17/11 sweep) | |
| 166 | Face reveal whenever the person appears in an event dialog | OD:L586 | LIVE (face-reveal) | |
| 167 | doat-giai pictures with the Emperor: keep | OD:L591 | CLOSED (keep) | |
| 168 | Pet decisions: life-save at Linh thú; label "No" | OD:L593, L613, L707, L708 | LIVE (pets on main) (17/11 sweep) | |
| 169 | Co-op pet help/harm/steal now | OD:L594 | LIVE (coop-pets on main); co-op rebuild = coop-thin (17/11 sweep) | |
| 170 | Thái hậu thỉnh an not flat +8; lowering events; personality-dependent | OD:L598 | LIVE (jtrong.js on main) (17/11 sweep) | |
| 171 | Personality groups + trọng (13 virtues) for everyone incl. player | OD:L599 | LIVE (jtrong.js on main) (17/11 sweep) | |
| 172 | Sims-like mood bar affecting odds/choices/how others see her | OD:L600 | LIVE (jmood.js on main) (17/11 sweep) | |
| 173 | Stipend skimming also items | OD:L601 | LIVE (econ-items on main) (17/11 sweep) | |
| 174 | Poisoning the Emperor / Thái hậu possible with risk | OD:L602 | NOT DONE: no player road to poison Emperor / Thai hau (rules only) (17/11 sweep) | |
| 175 | Emperor visits her palace and stays the night | OD:L603 | LIVE (jvisit.js on main) (17/11 sweep) | |
| 176 | Stolen clothes target worn/wardrobe outfit; re-issue; show odds | OD:L604 | LIVE (econ-items on main) (17/11 sweep) | |
| 177 | Girlhood belongings chest filling 6 slots | OD:L605 | LIVE (econ-items girlChest on main) (17/11 sweep) | |
| 178 | Promotion rewards (full set) + new servant reveal screen | OD:L606 | LIVE (promo-rules + small-art-wire on main) (17/11 sweep) | missing art: per-rank pendants/bangles/sachets, maid robes per maid rank |
| 179 | Header keeps only her info; others in room tabs | OD:L607 | LIVE (header shows only her info) (17/11 sweep) | |
| 180 | Sound by event group + voices | OD:L608 | PARTIAL: sound/music by group live; group voices not done (17/11 sweep) | |
| 181 | Event frames by group / main / side story | OD:L609 | PARTIAL: group hooks live; frame art per group/origin missing (17/11 sweep) | |
| 182 | 13 approved animations (slide in/out, promotion, demotion, dragged away, slap, death, pregnancy, birth, favoured, poisoned, alliance/betrayal) | OD:L610 | PARTIAL: 2 of 13 animations live (17/11 sweep) | |
| 183 | Update notes popup + Settings "Thông tin cập nhật" | OD:L611 | LIVE (update notes on main) (17/11 sweep) | |
| 184 | History + game-design expert workers → ideas, then build | OD:L612 | PARTIAL: memories live; remaining ideas parked (freeze OD:L1402) (17/11 sweep) | docs only on review/idea-history aa1714ed, review/idea-design 17b2ba71 (not on main) |
| 185 | Her own name black + gold glow on paintings, plain in UI | OD:L616, L704 | LIVE (rank-title) | |
| 186 | Calendar ideas (a)–(j); Trân nữ seal on every event frame | OD:L620, L621, L711 | LIVE (cal-plus on main, jmcal.js) (17/11 sweep) | |
| 187 | Hands/neck match face tone; player look1 rosy (ref Ngọc Lan) | OD:L622 | CLOSED: rosy skin removed by owner OD:L1305; tone match done (17/11 sweep) | |
| 188 | Monthly cycle; Kính sự phòng book; forge/read; calendar; co-op | OD:L632–635 | LIVE (cycle on main, jcycle.js) (17/11 sweep) | |
| 189 | Phế phi Lý stays when a rival is sent to Lãnh cung | OD:L641 | ON BRANCH npc-death-r1 PASS 5f58a715, held for j95 place record (17/11 sweep) | |
| 190 | All NPCs can die; replacements with NEW faces; some posts empty | OD:L642 | ON BRANCH npc-death-r1 PASS 5f58a715, held for j95 place record (17/11 sweep) | |
| 191 | Phế phi Lý side story | OD:L643 | LIVE (Ly side story in jreign.js) (17/11 sweep) | |
| 192 | Real side stories from NPC life goals | OD:L644 | ON BRANCH npc-roads-fx RUNNING (Foreman D); needs story14 first (17/11 sweep) | |
| 193 | No box around rank+name caption in person dialogs | OD:L645 | LIVE (rank-title §48.1c) | |
| 194 | End-of-day card-flip scene (tray, cycle greys out, carried to Emperor, pick, her extra animation); her knowledge only | OD:L651–656, L672 | LIVE (cardflip + flip-entry); co-op pick = coop-thin (17/11 sweep) | co-op pick still local (needs D21 B2) |
| 195 | Painted effects (sprites, black-bg screen-blend videos, alpha sheets) | OD:L662, L663 | LIVE (fxkit on main, jfxkit.js) (17/11 sweep) | |
| 196 | Night follow-ups: Kính sự phòng records, lạnh nhạt mockery, music from another palace, rằm/festival variants | OD:L666–669 | LIVE (night-end follow-ups in jne.js) (17/11 sweep) | |
| 197 | Co-op buổi timer (5 min default, 3/5/8, Tạm dừng both, generic waiting line, lag-safe deadline, pauses only for minigames) | OD:L678–680, L741–744, L757, L765 | LIVE (coop-timer on main); further co-op = coop-thin (17/11 sweep) | |
| 198 | Poem items as calligraphy; incense distinct colours; dress items without rack; chubby thiếu niên pets | OD:L682, L684, L685, L688 | LIVE (item-art r5 on CDN) (17/11 sweep) | |
| 199 | Big centre item display hi-res, transparent, no tile | OD:L686 | LIVE (item-big on main, kitItemBigSrc) (17/11 sweep) | |
| 200 | Makeup presets 8+8 (4 cool/4 warm), lighter đẹp lips, orange/coral; lips anchored per face | OD:L687, L747 | LIVE (mk-colour presets on main) (17/11 sweep) | |
| 201 | Scene pictures for landscape AND portrait (≥1536 px, focal point) | OD:L691 | RULE (applied; keep for new scenes) (17/11 sweep) | |
| 202 | Every art/work kind exactly 4 sub-styles; Công Dung Ngôn Hạnh 4 sub-styles too | OD:L695, L696 | LIVE (tuduc-sub + recipes on main) (17/11 sweep) | |
| 203 | 'Học thành tài' painted level-up scene | OD:L712 | NOT DONE: painted hoc thanh tai scene (needs art + fxkit wiring) (17/11 sweep) | |
| 204 | Perf budget: 129 MB first load first; Hiệu ứng Đầy đủ/Gọn + auto-Gọn; perf test in CI | OD:L713–719 | LIVE (first load 43 MB; perf test on main) (17/11 sweep) | |
| 205 | Painted animations for all moments (15-item list) | OD:L722–738 | PARTIAL: effect library live; many events not wired yet (17/11 sweep) | |
| 206 | CDNH works: 10 items per kind × 4 tiers with art, giftable | OD:L748, L760 | LIVE (tuduc-sub + tuduc-pic on main) (17/11 sweep) | |
| 207 | Draw 128 old-save player looks + add look1–4 as new faces; draw 56 promoted old-love men | OD:L749, L751 | NOT DONE: 108 player-look figures + 56 men still undrawn (CDN) (17/11 sweep) | |
| 208 | Foreign princess origin visible + ≥1 more with own story | OD:L750 | LIVE origin+story (jorigins.js); costume art WIP (17/11 sweep) | |
| 209 | 'Biếu quà làm lành' also accepts a work/item | OD:L752 | NOT DONE: Bieu qua lam lanh with item/work (jlux.luxGift ready) (17/11 sweep) | |
| 210 | Dress contest theme tags + visible luxury; luxury RANGE per occasion; deep xa xỉ system | OD:L753, L761, L762 | LIVE (luxury on main, jlux.js) (17/11 sweep) | |
| 211 | Weather redone with painted effects | OD:L754 | LIVE (weather-fx-one + fx3 on main) (17/11 sweep) | |
| 212 | Spread events across buổi, cap per buổi, histogram | OD:L766 | LIVE (spread-events on main) (17/11 sweep) | |
| 213 | Makeup final-look reveal scene | OD:L769–775 | LIVE (makeup reveal on main) (17/11 sweep) | |
| 214 | 8 vụng looks | OD:L778 | LIVE (vung looks on main) (17/11 sweep) | latest commit "vụng look = deliberate clumsy makeup" |
| 215 | Move to new account; re-open every worker | OD:L781 | LIVE (done by s8) | |
| 216 | Which account reset usage | OD:L782 | CLOSED (answered: no tool sees usage, H8 §8) | |
| 217 | Her figure's face hazy on stage | OD:L785 | LIVE (animation blur fixed); HD upscale rides on fig-cutout-clean (17/11 sweep) | |
| 218 | Rank colour in picker rows and every name+rank place | OD:L795, L821 | LIVE (rank-colour on main) (17/11 sweep) | |
| 219 | Odds explanation line one clear sentence | OD:L799 | LIVE (pick-hint on main) (17/11 sweep) | |
| 220 | Cloudflare token saved, CDN unblocked | OD:L800 | LIVE | |
| 221 | Hậu cung portrait: close top gap, widen frame | OD:L802–805 | LIVE (hc-portrait on main) (17/11 sweep) | |
| 222 | Gift picker as Tư trang picture grid + painted gift animation | OD:L807–810 | LIVE (gift-pick on main, gift animation) (17/11 sweep) | animation needs A2 |
| 223 | Label/value rows in one block share one label column | OD:L812–815 | LIVE (row-align on main) (17/11 sweep) | |
| 224 | Mood dialog picture per mood + icon corner; title with rank | OD:L817–821 | LIVE (mood-dialog on main) (17/11 sweep) | |
| 225 | Tap any item cell → kit item-detail; wear via button | OD:L823–826 | LIVE (item-info on main, jitd.js) (17/11 sweep) | |
| 226 | Correction: mood dialog picture = the CAUSE event's picture (e.g. tấn phong), per-mood pictures only as fallback; icon in a corner | OD:L827 | LIVE (mood-dialog cause picture on main) (17/11 sweep) | |
| 227 | Event dialog figure column capped per KIT §32.2 on every dialog; crop the figure (skirt OK, face always whole) instead of growing | OD:L829–833 | LIVE cap; feet-crop fix on review/fig-feet-crop-2 c269e2fc9 waiting review (17/11 sweep) | |
| 228 | Redraw Thỉnh an Hoàng hậu act picture (bad hands) + audit every act/event picture for malformed hands | OD:L835–838 | LIVE (thinh an art + hands audit on CDN) (17/11 sweep) | |

## 4. Older / handover-only items still open
| Ask | Src | Status | Where |
|---|---|---|---|
| Result sound win/fail on every result, iPhone unlock | H7:L87, PM:L339 | NOT DONE (Q D1) | |
| 844x390 stage name tags overlap regression | H7:L117, H8 §2 | BRANCH review/j59-fix-r1 (Q A1) | |
| Co-op broken list B1–B5 (item/kid steal + servant acts, host night + shared heir, Emperor death in co-op, festivals/NPC schemes include guest, exam seat caps) | H7:L80 | NOT DONE (Q D21) | |
| Real-phone UA test mode (rot.js host mode) | H7:L105 | NOT DONE (Q D22) | |
| Whole-game mole audit with demole_por.py | PM:L335 | NOT DONE (Q D23) | |
| consort-c12-ty5-a51 pale patch over eyes | PM:L337 | NOT DONE (Q D24) | |
| jk2b §7 veil/scar box follows jkpor zoom | PM:L337 | NOT DONE (Q D25) | |
| Toilette extra reaction buttons (Ghi hận / Mách Hoàng hậu / Tặng lại / Hỏi bí quyết) | H7:L41 | NOT DONE (Q D27) | |
| Fig export ≥1100 px (Fold stage upscales figures 1.43–1.53×) | PM:L223, H7:L102 | NOT DONE (new D44) | |
| Outside-route art gap: house/city paintings, Huynh trưởng civilian figure, house map | PM:L330, H8 §3 | NOT DONE (new D48) | B2 worker fixes only the 5 FAIL items |
| Small leftovers: jaudit 'Vì sao' trung y wording at Thỉnh an; 'Phi ???' in greet text and arc tab Mục tiêu; VP 'theo lòng nàng' ambiguity; two kit sample pages (?kit vs #kit) → one; "Đang cài" leftover; servant-road header Đức '!' | PM:L224, L226, L245, L270, L302, L308; OD:L369 | NOT DONE (new D47) | |
| Earrings / embroidered shoes item art; guard 4 indigo outfit; c02-t1-a18 grey skin | AM:L34 | NOT DONE (new D45) | owner never answered; drawable → draw (OD:L751) |
| Should consorts move by schedule/nature instead of random placeWhere | AM:L32 | NOT DONE (new D29) | that is j95 schedules |
| Tai mắt cell in the top bar | AM:L33 | CLOSED | Tai mắt now in Ân sủng panel (OD:L228); header only her info (OD:L607) |
| Water-bowl picture for the blood test; MƯU seal on route minigame | AM:L48 | NOT DONE (new D33) | drawable → draw |
| Her own allergy not modelled (recipes) | PM:L326 | NOT DONE (new D39) | |
| Time-to-HH question (median weeks, real minutes) | HO:L59 | CLOSED | owner set the pace (OD:L353) |
| Maid romance/marriage j42 | HO:L39 | LIVE (j42 'được ban gả') | |
| KIT_REQUESTS: risk/hint/kèm/seal kit parts | KR:L6 | LIVE (opt-render §53) | |
| KIT_REQUESTS: kitRelTable §52; small avatar without square frame | KR:L7, L9 | BRANCH fix-float r8 (Q A4) | |
| KIT_REQUESTS: one-column label/value table | KR:L8 | LIVE (kit-table §51) | |
| KIT_REQUESTS: K3_STATE chip hook | KR:L10 | LIVE (event-balance) | |
| KIT_REQUESTS: k3 top state row wrap rule | KR:L11 | BRANCH small-bugs-3 (Q A3, §31.2a) | close the KR row on PASS |
| dev/IDEAS_OPEN.md "Open" list is stale: items 1–9 are all decided/built | main dev/IDEAS_OPEN.md | housekeeping | coordinator moves them to Closed before the next "đoạn điều phối tuần này" |

## 5. Branch summary (BRANCH items, state at sweep)
- Session-8 queue A/B/C branches: see SESSION8_QUEUE.md (states there are authoritative).
- Unmerged branches with owner-approved work and NO queue entry before this sweep (all need re-port onto current main):
  review/schedules2 + wip/kit-j95 (D29) · review/palace-map incl. residence-art (D30) · review/difficulty (D31) · review/succession2 (D32) · review/routes (D33) · review/scheme-games (D34) · review/tutorial (D35) · review/rank + review/rank-ui (D36) · review/drag-curl (D37) · review/lost-items (D38) · review/appearance + review/items-earned (D39) · review/weather (D40) · review/places (D42) · review/pregnancy-art plan (D43).
- Unmerged and correctly dropped: review/seasons (rejected), review/scene-phone (cancelled), review/balance-old, review/main-next2, review/kiem2-notes, review/r5-notes (notes), review/khuecac + review/outside (superseded by outside-r2), review/gift-chest + gift-chest-wip (superseded by game-feel kitGain/kitReward — check its rank-set chest against promo-rules A9), review/person-acts(+wip) (superseded by kit-fig2 r8 — verify), review/hud-chance (superseded by hud-chance2), review/kit-audit, review/stories, review/schedules, review/schedules-audit (older j95 rounds), review/landscape-art (only a review note commit), review/m05-huadian, review/mole-audit, review/mole-fix, review/img-quality-art (art already on CDN), review/place-seasons (inventory; Dư đồ trưa on main).

## 6. Open owner questions (ask one at a time)
- From SESSION8_QUEUE §E: j72 bước vs Hồi · stage paper halo · Thái hậu title bronze vs plum · HT vs HH gold alike · Đáp ứng muted on paintings.
- Repo history slimming (new repo / filter) needs her consent (OD:L267).
- Ân tình cell in the header (needs an icon) (PM:L271, H7:L46) — likely closed by OD:L607 (header = only her info); confirm.
- Khuê các worker added younger-sister / boudoir-friend dresses — keep? (AM:L98).

## 7. UNASSIGNED / NOT DONE (one line each: short spec · source)
Already in SESSION8_QUEUE §D (D1–D28):
- D1 result-sfx: one distinct win/fail sound on every result surface, sound on by default, iPhone Safari unlock · H7:L87 — 17/11 sweep: LIVE; sound-on default = open owner question
- D2 item-art: poems as calligraphy scroll/sheet/fan (all subjects × 4), incense distinct colours, equipment dresses flowing no rack, chubby thiếu niên for 8 pets, 1024 masters · OD:L682–688 — 17/11 sweep: LIVE (item-art r5 on CDN)
- D3 item-big: centre-screen item display hi-res, transparent, no frame/tile; frame only in Tư trang · OD:L686 — 17/11 sweep: LIVE (item-big on main)
- D4 NPC death + replacement with new faces (some posts empty), Phế phi Lý stays in Lãnh cung until death, Lý side story · OD:L641–643 — 17/11 sweep: ON BRANCH npc-death-r1 PASS 5f58a715, held for j95 place record
- D5 real side stories: NPC life goals → side quests with rewards · OD:L644 — 17/11 sweep: ON BRANCH npc-roads-fx RUNNING (replaces D5)
- D6 econ-items: stipend item skimming (fewer/lower grade; charcoal/ice by rank), stolen clothes re-issue + odds, girlhood chest 6 slots · OD:L601, L604, L605 — 17/11 sweep: LIVE (econ-items on main)
- D7 personality groups + trọng (13 virtues) for everyone incl. player; Thái hậu archetypes; thỉnh an not flat +8; lowering events · OD:L598, L599 — 17/11 sweep: LIVE (jtrong.js on main)
- D8 emperor: poison Emperor/Thái hậu roads (taster/two-pot/touch checks); Emperor visits her palace · OD:L602, L603 — 17/11 sweep: PARTIAL: Emperor visit live; poison-the-Emperor road not built
- D9 header only her info; others' info in room tabs · OD:L607 — 17/11 sweep: LIVE (header-own on main)
- D10 update notes popup + Settings "Thông tin cập nhật" · OD:L611 — 17/11 sweep: LIVE (update notes on main)
- D11 presentation: sound by event group + voices; event frames by group/main/side (incl. 9 origin frame styles for main story, entrance animations e.g. edict scroll); remaining approved animations; §68 into every event · OD:L528, L608–610, L722–738 — 17/11 sweep: PARTIAL: jpres.js live; origin frames/voices/animation wiring open
- D12 Sims-like mood bar · OD:L600 — 17/11 sweep: LIVE (jmood.js on main)
- D13 spread events across buổi, cap per buổi, before/after histogram · OD:L766 — 17/11 sweep: LIVE (spread-events on main)
- D14 painted 'học thành tài' level-up scene · OD:L712 — 17/11 sweep: NOT DONE: painted hoc thanh tai scene
- D15 download-size (129 MB first load) + perf test in CI · OD:L714–719, PM:L223 — 17/11 sweep: LIVE (43 MB first load; perf test on main)
- D16 Tứ đức (CDNH) 4 sub-styles + CDNH works 10 × 4 tiers with art · OD:L696, L748, L760 — 17/11 sweep: LIVE (tuduc-sub on main)
- D17 luxury/xa xỉ system + dress-contest themes + luxury range per occasion · OD:L753, L761, L762 — 17/11 sweep: LIVE (luxury on main)
- D18 foreign princess origin visible + one more with story · OD:L750 — 17/11 sweep: LIVE origin+story; own-costume art WIP
- D19 'Biếu quà làm lành' accepts works/items of equal value · OD:L752 — 17/11 sweep: NOT DONE: Bieu qua lam lanh with item/work
- D20 weather redo with §68 painted effects · OD:L754 — 17/11 sweep: LIVE (weather-fx on main)
- D21 co-op B1–B5 · H7:L80 — 17/11 sweep: LIVE (coop-b1b5-fix); further co-op = coop-thin
- D22 real-phone UA test mode · H7:L105 — 17/11 sweep: LIVE (ua-test on main)
- D23 whole-game mole audit · PM:L335 — 17/11 sweep: PAUSED: review/mole-audit-r2; redo on top of repaint
- D24 consort-c12-ty5-a51 eye patch redraw · PM:L337 — 17/11 sweep: LIVE (redrawn on CDN)
- D25 veil/scar box follows jkpor zoom · PM:L337 — 17/11 sweep: ON BRANCH veil-zoom-r3 PASS d236f309
- D26 idea builds from DESIGN_IDEAS_1115 (30) + HISTORY_IDEAS_1115 (33): memories + hook ledger first · OD:L612, H7:L101 — 17/11 sweep: PARTIAL: memories live; remaining ideas parked (freeze)
- D27 extra toilette reaction buttons · H7:L41 — 17/11 sweep: LIVE (toil-react on main)
- D28 makeup final-look reveal scene (inside C6) · OD:L769–775 — 17/11 sweep: LIVE (makeup reveal on main)
Added by this sweep (D29–D49, appended to SESSION8_QUEUE §D):
- D29 schedules + ONE location ledger (j95): habits/intentions/surprises, trysts at hidden spots, S.roster + roster.js + Chép sổ, motive gate, ROSTER bot audit 30+ lives; re-port review/schedules2 (independent PASS 14/11) + wip/kit-j95 onto main · OD:L32–36, AM:L32 — 17/11 sweep: LIVE (j95 on main)
- D30 palace detail map + residence paintings: Dư đồ → PL 'nhat' courtyard by chủ vị rank → rooms with real people; 25 rooms × 16 variants per person; re-port review/palace-map (incl. residence-art 400 paintings) · OD:L134–140, L155, L158–166 — 17/11 sweep: PARTIAL: palace map live; residence bedroom+hall paintings per rank not drawn
- D31 difficulty modes Dễ/Vừa/Khó per life (Sổ luân hồi), identity-card row; re-port review/difficulty v8, re-measure with C7 · OD:L85, L128 — 17/11 sweep: LIVE (difficulty on main, jdiff.js)
- D32 succession choice card (Hoàng thái hậu / nhiếp chính / Nữ đế, conditions, full odds, epilogues) + Tiên đế băng hà art; re-port review/succession2 · OD:L88, L106, L124–131 — 17/11 sweep: LIVE (succession on main)
- D33 Lối riêng routes (tư tình, trốn cung, rời cung hợp lệ, ẩn dật) + trích huyết nghiệm thân + water-bowl picture; re-port review/routes, fix bot, escape 10–25%, vows harder · OD:L184, L190, L192, AM:L48 — 17/11 sweep: LIVE (routes on main)
- D34 scheme minigames Nghe ngóng/Truyền lời/Mặc cả/Thời cơ (abstract, skip, NPC plain odds); re-port review/scheme-games, wire j78/j9/bribe · OD:L192, L195, L199 — 17/11 sweep: LIVE (scheme-games on main)
- D35 new-player tutorial (guide mama, ≤12 steps, tips, on/off, replay; co-op separate); finish review/tutorial (2/3) on the current tab layout · OD:L227 — 17/11 sweep: LIVE (tutorial + tut-quests on main)
- D36 online leaderboard (review/rank: life + player ranking, guest code, Công danh, Worker+DO) + Bảng vàng/contest podium per 08:55Z + end-of-life card (review/rank-ui WIP) · OD:L281, L378 — 17/11 sweep: ON BRANCH rank-port-r2 blocked on kit parts; not on main
- D37 finger-drag page curl (bend with finger, spring back, flick, buttons curl, stiffer cover); re-port review/drag-curl · OD:L276 — 17/11 sweep: LIVE (finger-drag curl in kitBook)
- D38 lost items + item rivalry: extortion, bribed servants steal, plant to frame, Đồ thất lạc, tra xét; re-port review/lost-items (jlost) · OD:L108, L117 — 17/11 sweep: LIVE (lost-items on main)
- D39 appearance overlays: illness light/heavy, poisoning, slap/punishment, allergy rash (two-way, heals, veil), her own allergy in recipes; re-port review/appearance + review/items-earned (jrash) · OD:L107, L121, L124, L126, L130, PM:L326 — 17/11 sweep: PARTIAL: overlays live; her own recipe allergy not modelled
- D40 bad-weather outdoor-act risks (cold, slipping, pregnancy risk; umbrella/cape/sedan; on the act card; NPCs same); re-port review/weather with reviewer fixes (wxRiskWord via chanceW, '−') · OD:L348, L351, PM:L160 — 17/11 sweep: LIVE (weather-port on main)
- D41 her own servant promotions (Chưởng sự cô cô, Nữ quan, Thủ lĩnh, Tổng quản), capped by her rank, NPCs same · OD:L302 — 17/11 sweep: LIVE (promote-servants on main)
- D42 places plan leftovers: Dãy nhà cung nhân via edit of an approved scene (review/places), Hoán y cục / học đường reachable, A ca sở + Đông cung residences for princes · OD:L82, L86, L87 — 17/11 sweep: LIVE (places-port on main)
- D43 postponed appearance art: pregnancy figures 6 & 9 months, nun figure (xuất gia) 4 ages, dưỡng nhan glow, early grey strands, smallpox overlay (plan on review/pregnancy-art) — confirm with owner first since she postponed it · OD:L121, L122, L751 — 17/11 sweep: NOT DONE: postponed appearance art; owner must re-confirm
- D44 fig export ≥1100 px so Fold stage stops upscaling figures · PM:L223, H7:L102 — 17/11 sweep: NOT DONE: figures <=900 px; rides on fig-cutout-clean
- D45 small art: earrings + embroidered shoes item art, guard 4 indigo outfit, c02-t1-a18 grey skin, Emperor costume audit (no Qing feathered hat / cheongsam collar) · AM:L34, OD:L364 — 17/11 sweep: LIVE (small-art on main/CDN)
- D46 draw own pictures for every act/event still on placeholder (MISSING_PICS.md: acts 18/95, event e68 flowerBloom) + check Đoan ngọ banner/labels · OD:L444, L550, H7:L113 — 17/11 sweep: LIVE (placeholders drawn)
- D47 small-bugs-4: jaudit 'Vì sao' trung y wording at Thỉnh an; 'Phi ???' in greet text + arc tab Mục tiêu; VP 'theo lòng nàng'; one kit sample page (?kit vs #kit); "Đang cài" leftover; servant-road header Đức '!' check · PM:L224, L226, L245, L270, L302, L308, OD:L369 — 17/11 sweep: LIVE (small-bugs-4 on main)
- D48 outside-route art: house/city paintings, Huynh trưởng civilian figure, house map · PM:L330, H8 §3 — 17/11 sweep: LIVE (outside-art on main/CDN)
- D49 collection milestones: per-life item count → Sổ luân hồi titles at 20/50/100/200 + Phúc duyên +5/+10/+20/+35 once per life, lost if kiếp dở dang (replace jearn stand-in counter) · OD:L45, L46 — 17/11 sweep: LIVE (collect-ms on main, jcol.js)


## 8. 17/11 sweep (owner-bug-sweep, origin/main 7abaf07ac) — rows not editable in place above
Full verdict tables: dev/handover/reports/owner-bug-sweep.md. Ledger rows S2/S3 and §7 D-items were rewritten in place (status text ends "(17/11 sweep)").
- S4-resultsfx: LIVE (result-sfx); sound-on default is an OPEN owner question
- S4-844x390: LIVE (j59-fix on main)
- S4-coopB1B5: LIVE (coop-b1b5-fix); further co-op = coop-thin
- S4-uatest: LIVE (ua-test on main)
- S4-mole: PAUSED: mole audit on review/mole-audit-r2; redo on top of repaint
- S4-c12a51: LIVE (c12-ty5-a51 redrawn on CDN)
- S4-veilzoom: ON BRANCH veil-zoom-r3 PASS d236f309, needs kit sign-off + batch
- S4-toilbtn: LIVE (toil-react on main)
- S4-figexport: NOT DONE: figures still <=900 px; rides on fig-cutout-clean repaint
- S4-outsideart: LIVE (outside-art on main/CDN)
- S4-leftovers: LIVE (small-bugs-4 on main)
- S4-smallart: LIVE (small-art + small-art-wire on main)
- S4-schedules: LIVE (j95 schedules on main)
- S4-waterbowl: LIVE (water-bowl picture + routes on main)
- S4-allergy: NOT DONE: her own food/gift allergy to recipe allergens
- S4-kitreltable: LIVE (kitRelTable on main)
- S4-k3wrap: LIVE (small-bugs-3 on main; close KR row)
- S4-ideasopen: NOT DONE: move IDEAS_OPEN items 1-9 to Closed (coordinator)