# Cung Tường Mộng — handover

## ⚠ PRIORITY RULES — READ FIRST, EVERY TIME (owner, binding)
The owner must NEVER have to repeat herself. Every main session and every worker:
1. ON TAKING OVER (new session, restart, new worker): read this whole file, dev/OWNER_DECISIONS.md (the log of every owner decision), dev/kit/KIT.md, dev/kit/VANPHONG.md, and the PROGRESS file of your branch BEFORE doing or saying anything.
2. BEFORE REPORTING OR PROPOSING ANYTHING to the owner ("chưa có", "nên thêm", "đề xuất…"): grep the code (dev/build/*.js) and the docs (dev/**/*.md, OWNER_DECISIONS.md) to check whether it already exists or was already decided. Never present an existing or already-discussed feature as new, and never re-open a settled decision.
3. EVERY owner decision, preference, approval or rejection goes into dev/OWNER_DECISIONS.md the same turn (date, topic, decision). Main session owns that file.
4. WORKER BRIEFS must quote every owner rule that applies to the task (art rules, kit rules, wording, devices). A worker brief that omits a relevant rule is the coordinator's fault.
5. Apply common game conventions proactively (rewards, level-ups, warnings, animations, feedback); never wait for the owner to teach them. If something looks crude or wrong, fix it before showing her.
6. Think with the owner: weigh each idea, give an honest recommendation; numbers/balance are decided by us, not asked.
7. Self-check every image/screen before sending it to her; send single readable images (whole face for face details, never extreme zooms).

## (original handover from MAIN 493, 11/14/2026 ~01:00 UTC)

Owner: Victoria ("sếp"). Reply to her in Vietnamese only, as "em", short, no questions unless truly needed; she reads on a Samsung Galaxy Z Fold (inner ~1510x2000 portrait, cover ~904x2316). This is her standalone game, NOT Đại Hy (Đại Hy has its own main session; send any Đại Hy word of hers to MAIN 495 session_01Rc5AsLpa5TYV5oV2gBycQy via send_message).

## Where things are
- Live app: https://thientran2711.github.io/cung-tuong-mong/ (GitHub Pages from main /(root); PWA, icon, service worker; app auto-refreshes to the newest build).
- Repo root = the published site (index.html wrapper, img/, audio/, icons/, sw.js, manifest). Do not hand-edit root index.html: it is generated.
- dev/ = source of truth from now on:
  - dev/build/p1.html + j0..j43 + jbal/jkit/jtin modules, concatenated in the order listed in dev/build/assemble.py (later modules patch earlier ones by wrapping functions). `python3 dev/build/assemble.py` writes dev/index.html (no charset; the site wrapper adds it).
  - dev/site/make_site.sh: builds the PWA into the repo root (copies img/audio, writes manifest + sw.js, wraps index with charset/viewport/manifest, title background). It was written for the old scratchpad paths: adapt S/R paths to dev/ before use.
  - dev/art/STYLE_ANCHOR.md + STYLE_REFS.txt: THE art rules (every art agent uses them verbatim).
  - dev/measure/: bot balance harness (inpage4.js, run*.js, an6.py, m43/ for NPC-mind sims).
- Images: img/fig-*.webp (full-body, transparent) + img/por-*.webp (round portraits) listed in img/FIGURES.json (consorts, player looks, emperor, eunuchs), img/FIGURES-servants.json (maids, mamas), img/FIGURES-others.json (thái hậu, officials, physicians, men). Code merges all FIGURES*.json; old faces img/face-*.webp are the fallback. Map: img/map-<season>-<buổi>.webp, img/map-fest-*.webp, img/map-hotspots.json (+festivals table).
- Testing: serve over http with a <meta charset=utf-8> wrapper; Playwright (require('playwright')); sizes 1510x2000, 904x2316, 1024x768, 390x844; no page errors, no horizontal overflow, no truncated text, equal act-card sizes, old save (localStorage hclh-slot / hclh-save-v2-<n>) must still load.
- Art QA (cutout fix): run `python3 dev/figwork/cutcheck.py img/fig-*.webp` on new art (score >=8 or por >=20 = re-cut: crop ONE figure from the raw generation and run Magnific remove-background on it alone, see dev/figwork/rematte.py); make portraits with `python3 dev/figwork/porcrop.py img/fig-X.webp` (384x506, face-centred; needs opencv-python-headless==4.10.0.84).

## Workers still running in the OLD session at handover (they finish there, then stop)
- Code integrator: balance final pass (targets below), publishes green builds; will sync scratchpad build → dev/ and push; final commit message contains "HANDOFF COMPLETE".
- Art 1: consorts (32 identities × 8 dress tiers × 4 ages), player looks (4 × 8 tiers × 4 ages + lãnh cung), eunuchs (30 × 4), Emperor (2 × 4) — new early-portrait style.
- Art 2: maids (52) + mamas (8) × 4 ages — owner APPROVED this look (quality bar for all).
- Art 3: thái hậu/officials/physicians/men done; redrawing men in pink/purple (official o5, nhạc sư, check vương gia 2).
- Servant-start module j42: adding maid romance/marriage with palace men.
Until you see a commit with "HANDOFF COMPLETE", do not edit existing dev/build files; put new work in NEW module files (j50+) appended to assemble.py, and pull often.

## Owed / next
1. Balance targets (sensible bot): Hoàng hậu reach 20–35%; dies before HH/old age 50–60%; childbirth ~8–12% per birth, not dominating; random play may die a lot but never in the first 2 weeks without a warning; keep-vs-fire servants within ~10%; affair-heavy dies more than clean road. Last measured: HH 42%, died 45% (v9); final knobs being confirmed.
2. Maid romance/marriage (j42 extension) — integrate when READY.
3. Wire newly drawn figures as they land (picker reads manifests every 5 min); publish batches.
4. Contact sheets to her for approval as each art group completes.

## Her standing rules for this game (all in force)
- One UI kit everywhere; every act shows price + gain/loss numbers (green gain / red cost, risks on a separate red 'kèm' line) + an odds word from the ladder Liều/Khó/Năm ăn năm thua/Khá chắc/Chắc/Rất chắc/Nắm chắc (never %, never 'Chắc chắn'; sure acts show no word); result card after every act; disabled buttons say why; every name has its face; every bar labelled; no truncated text; act cards one size; scene not covered (slim ribbon, collapsible status); map full screen.
- Map: Đại Hy palace overview by season, buổi and festival; named palaces; anonymous silhouettes only ("hữu duyên"), no faces of who is where; unreachable places fully grey with the reason; access by rank and place, 'Lẻn vào' with risk, 'Xin yết kiến'.
- Two-way and equal rules for everyone in a group (every act she can do, others can do to her, same odds/costs); NPCs act by traits, human not optimal (mistakes, wrong beliefs, tells); true information only (never a false report to her; NPCs may hold false beliefs).
- People come to her (visits, gifts, summons) as well as she to them. Four ways to meet: wander the map, visit her palace, scout then go, invite.
- Death is core (reincarnation game); chết là hết: no carry-over; 'Kiếp này' + 'Sổ luân hồi'.
- 13 consorts at start (her + 12), tuyển tú every 3 years, cap ~16; seat caps per rank (HH 1, HQP 1, QP 2, Phi 4, Tần 6); Tranh ghế contest for open seats; push-down schemes; demotion review.
- Stipend ladder 30–320 bạc/month by rank; servant wage; rewards with a Sổ ân thưởng; judgment acts need causes (punishing without cause costs).
- Servant traits hidden, each with upside and downside; Chủ tin (mistress→servant) + Lòng (servant→mistress) on every bond.
- Adults 18+ for every cast member and the player; man–woman only; intimacy fade-to-black; consequences at full weight.
- Art: style = the early consort portraits (semi-realistic, near-3D, soft light), refs consort-01/05/12/18; everyone beautiful/handsome at every age; fair skin; serene faces (no sly, glare, smirk, open laugh, pout, sad/teary, no slanted 'mắt xếch' eyes); faces never reveal personality (personality only via pose/props/colour; Hiểm độc drawn with a gentle persona); 8 dress tiers = 8 ranks; age bands 18–27 / 28–38 / 39–50 / 51–63 / 64+ for everyone (owner 24/11 ~00:25Z "Cập nhật tuổi game là 18, 28, 39, 51, 64"; BAL.ageMin + BAL.ageBand; art file tags a18/a26/a36/a51/a65 = bands 1–5); one face per person for life, no reuse within a game; identity pools 1.5–2× group max; nobody looks poor (maids in embroidered silk with hairpins); men never wear pink or purple; her own figure appears only in her own palace.
- Seasonal UI theme; festivals; emotion voice sounds (Giọng slider).

## HANDOFF COMPLETE (11/14/2026 ~01:25 UTC) — final state from MAIN 493
All old-session workers are STOPPED. The new main (Cung Tường Mộng · chính 2) owns everything: draws, balances, publishes.
- Live = cbe31f1 build (balance v12 measured: Hoàng hậu ~32%, early death ~45%).
- dev/build/ = full current source incl. jbal.js knobs as last edited (may be the v14 trial): `BAL={outQ:85,hz:1.4,conc:.3/.7,later:6,hhTh:60}` — outQ = % an empty HH seat goes to an outsider girl (85), hz = rivals' hazard multiplier toward her (1.4), conc = conception scale, later = birth-risk reduction after first child, hhTh = Thái hậu favour needed to stand for HH (60). NOT re-measured as a set: measure before shipping. Owner's newest targets: early death ~40% (≤45%), HH ~35–45% is fine (don't make the climb harder just to lower HH; drop hhTh 60 if it only serves that). She also asked: how long (in-game years, weeks, real minutes at ~10–20 s/week) until Hoàng hậu for the sensible bot (median, 25/75%).
- dev/figwork/ = art worker scripts/ledgers/prompts (mk.py, mkc.sh, sheetproc.py, urls.py, spec*.py, ids*, sheets*.txt). Usage: `bash mkc.sh N-c18-t2` prints prompt/refs; GPT 2.6 (gpt-2-6) only, 2:1, 4k, high, 1 style ref (consort-01/05/12/18 rotated) + the identity's t1 lineup as image ref; Magnific folder ba4aecfe-efce-47e2-b53f-30d292091886; append gen ids to sheets5.txt and 'jid gen bg' lines to sheets4_bg.txt; after creations_wait run `python3 urls.py; python3 sheetproc.py sheets4_bg.txt` (paths inside scripts point to the old scratchpad: repoint to repo img/).
- ART STATE: DONE = maids 52 + mamas 8 (×4 ages, FIGURES-servants.json), thái hậu 3/officials 6/physicians 3/men 9 (×4, FIGURES-others.json, no pink/purple on men), eunuchs 30 ×4, Emperor 2 ×4, consorts tier 1 all 32, consorts tier 2 c01–c17, player looks tier 1 (FIGURES.json, 340 records). OPEN = redo c11-t2 (came out mint, must be lilac like her t1); consort tier 2 c18–c32; tiers 3–8 for all 32; player looks tiers 2–8 + lãnh cung; check look1 t1 isn't too plain.

## PRIORITY RULE: ONE KIT, REVIEW GATE (owner 11/14, binding over everything visual)
- Every image, frame, button, bar, card, tab, backdrop and any other visual/UI element must come from the ONE shared kit (dev/kit/KIT.md + the kit functions pframe/pcard/act-card/option/tabs/bars in j19/jkit and their successors). No worker may hand-draw a new style, a one-off frame, a custom button or a private CSS look.
- Review gate: no visual change goes to main unreviewed. Workers push visual/UI work to a branch `review/<topic>`; the main session runs an independent kit reviewer (it checks against dev/kit/KIT.md with screenshots at 1510x2000, 904x2316, 1024x768, 390x844). Only after PASS is it merged to main. Anything that deviates from the kit = FAIL, regardless of how nice it looks.
- Portraits: rectangular (3:4) rank/role frames from the kit (modelled on Đại Hy's round rank frames, refs in dev/kit/ref-daihy/), a brocade (gấm) patterned background per rank/role instead of cream/white, and a grey silhouette "unknown person" portrait for anyone the player has not yet met.

## KIT-FIRST PROCESS (owner rule, binding — 2026-11-14)
1. Any UI issue covers its whole GROUP. Example: a complaint about the "Thang nguy hiểm" panel means EVERY info/rule/help/notice/news/result panel in the game gets fixed the same way, not just that one.
2. UI work goes to the KIT OWNER first. The kit owner builds the shared component in dev/kit (KIT.md + kit functions/CSS), tests it at the 4 sizes, and posts a "KIT READY: <component>" confirmation to the main session.
3. Only after that confirmation may other workers use that component. Workers never style UI themselves; they only fill kit components with data/logic.
4. Review rejects any UI not built from a confirmed kit component.

## TEST VIEWPORTS (owner device, binding — 2026-11-14)
The owner plays on a Samsung Galaxy Z Fold, PORTRAIT. Her screenshots are 1510x2000 *device pixels*, i.e. a CSS viewport of about 755x1000 at deviceScaleFactor 2. Testing at a 1510x2000 CSS viewport shows a desktop layout she never sees.
Test sizes from now on (CSS px, Playwright viewport + deviceScaleFactor):
- Fold inner, portrait: 755x1000 @2  (PRIMARY)
- Fold cover: 412x1058 @2
- 390x844 @3 (phone), 1024x768 @2 (landscape tablet)
Owner previews: send single readable screenshots (one image per file), not tiny grids.

## PRIORITY DEVICES (owner, binding — 2026-11-14, supersedes the list above)
The owner plays mostly on TWO devices; fix and test these FIRST, others after:
1. Samsung Galaxy Z Fold, PORTRAIT: 755x1000 @2
2. iPad, LANDSCAPE: 1180x820 @2 (iPad Air/10th gen) and 1366x1024 @2 (iPad Pro 12.9)
Secondary: Fold cover 412x1058 @2, phone 390x844 @3, 1024x768 @2.

## OWNER RULES ADDED 11/14 (phiên chính 2, binding)
- Think WITH the owner: for every idea she gives, weigh it and propose how (or whether) to do it; don't just obey blindly.
- Hidden outcomes: in EVENT choices (weekly events j68, Mệnh truyện chapters j67, side events, dilemmas) show ONLY costs (Sức, khắc, bạc) — no long-term gains/losses (Sủng, Danh, Đức, favour…) and no odds word. The result card still shows the true numbers afterwards. Normal act buttons/cards keep full price + gain/loss + odds.
- Wardrobe: 2 slots (Trâm cài, Y phục) beside the portrait for everyone; item grades Thường/Tinh phẩm/Trân phẩm/Tuyệt phẩm/Ngự tứ; whether an outfit is Đúng phẩm/Vượt phẩm/Quá giản dị is HIDDEN until someone remarks on it (same for NPCs); "Tự chọn đồ" = fast but risky; dressing minigame decides the outcome; Ngự tứ can't be sold; frame-ups (planted items).
- Huadian (forehead ornament): consorts only (incl. maids promoted to consort), never maids/servants/cold palace; size like c03 t1 (small, visible); 8 DISTINCT tiers (t7 Hoàng quý phi, t8 Hoàng hậu clearly grander via material/detail, never larger). No facial moles on anyone.
- Poses: calm standing (no flying sleeves/sashes, no swirling hems) for ALL figure art incl. Part C.
- Contests: each subject its own real minigame, never multiple-choice quizzes. Results: podium screen first (full-body figures, glow, confetti), then the score table.
- Never ship code-drawn art where a painting is expected; if something looks crude, redraw it without waiting to be asked.

## TRẠNG THÁI 14/11 15:40Z — mọi thợ dừng vì hết hạn mức tuần (mở lại 18/11 17:00Z)
Khi hạn mức mở lại, gửi SendMessage cho từng thợ để làm tiếp (đừng mở thợ mới):
- Cân bằng ad2c1bd409d320efa: đã tìm ra lỗi jpal viết lại palaceOf (trả "home" cho kẻ hầu) → bỏ đoạn đó (fix1), CHƯA ĐẨY; đang đo 24 đời. Đầu origin/review/balance còn cũ.
- Sửa j95 a729f798f8caea14b (review/schedules2): đang dở; phải gộp balance mới (palaceOf gốc) trước kiểm cuối; dùng bot inpage6 cho bộ kiểm độc lập. Sau đó mở lại người kiểm độc lập a5c2d5a7218acd7d7.
- Người duyệt kit a4b1ef66e8fa6f413: đang kiểm lại minigames fe63a6f.
- consort-art #9 a7b31f0e1c489c55f: đang làm hoa điền đúng nấc + xóa nốt ruồi.
- Part C-A acb72ee291fbd2861: Part C (maid-art-c) vẽ đủ 52 nàng; đang sửa lỗi lãnh cung (áo trơn, không trang sức, mặt 48), hoa điền t6, m06-t7, m26-t8; rồi soát C-B, ghi SẴN SÀNG KIỂM LẠI.
- maid-art (scratchpad/wmA 89dd550, 7b3f527) và maid-art-b (scratchpad/wfixB 212db69): lệnh đẩy của thợ bị bộ kiểm quyền chặn; CHỜ SẾP cho phép. Sau đó sửa a51 còn lại (A: 164 tờ, todo ở scratchpad/cwM; B: ~47 lineup).
- wardrobe 66d1bd9 và kit-j95 đi qua review/balance.

### Cập nhật 15:50Z — chuyển phiên chính sang tài khoản khác
Việc dở của các thợ đã đẩy lên nhánh wip/* (không đè nhánh nào):
- wip/balance-fix1: review/balance + jpal bỏ đoạn viết lại palaceOf (fix1). Cần đo 24 đời; đạt thì đưa vào review/balance.
- wip/schedules2: bản sửa j95 dở (6 lỗi kiểm độc lập), đã gộp balance 4516bec. Cần làm tiếp, gộp wip/balance-fix1, chạy cả 2 bộ kiểm (bộ độc lập dùng dev/measure/inpage6.js), rồi kiểm độc lập lại.
- wip/maid-art-fix: sửa review/maid-art (10 nốt ruồi, 44/208 mặt a51). Hàng đợi a51 còn lại: dev/handover/maidA-a51-todo.txt.
- wip/maid-art-b-fix: sửa review/maid-art-b (trả 640 ảnh phần A, vá 20 nốt ruồi). Còn khoảng 47 lineup a51 trông trẻ (danh sách trong PROGRESS_B).
  Hai nhánh này chưa đẩy vào review/* vì bộ kiểm quyền chặn và chưa có lệnh của sếp: hỏi sếp trước.
- review/maid-art-c (97a3a9e): Part C đủ 52 nàng; còn sửa: lãnh cung phải áo trơn, không trang sức (m11 m12 m15 m16 m19 m20 m24, hoa tai), mặt 48 ở lãnh cung còn trẻ, hoa điền t6 như dây rủ (m08 m14 m17 m18 m19), m06-t7 còn một nét, m26-t8 rộng; soát C-B tương tự.
- review/minigames fe63a6f: chờ duyệt lại.
- review/consort-art: thợ #9 dừng giữa lúc sửa "hoa điền đúng nấc + xóa nốt ruồi"; xem PROGRESS của nhánh.
Phiên mới không có scratchpad cũ và không gọi được các thợ cũ: mở thợ mới từ các nhánh trên.
Trigger 9:15 PT cũ đã xóa; phiên mới tự kiểm bản live trước 10 giờ sáng giờ Los Angeles nếu kịp.
- wip/consort-art: 1642 ảnh fig/por phi tần thợ #9 đã sửa nhưng chưa commit lúc dừng (hoa điền đúng nấc / xóa nốt ruồi / cắt lại chân dung). CHƯA KIỂM: so với origin/review/consort-art, xem từng ảnh, rồi mới đưa vào review/consort-art.
- Tranh đã vẽ trên Magnific mà chưa tải về vẫn còn trong thư mục Magnific ba4aecfe; mã từng lượt vẽ ghi trong gens.txt / PROGRESS của từng nhánh, tải lại được, không phải vẽ lại.
