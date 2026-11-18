FAIL
Reviewer (opus, D s3) — review/kc-roads-cn-nc @ 793cd37 round 3 · result branch review/kc-roads-cn-nc-r1 @ ef6e7a050cc20151c3ff3d05660552053e13e355 (contains origin/main 18fb8252). START_CTX ≈ 4 % (used_tokens read 0; own estimate).

## FIX LIST (worker, on review/kc-roads-cn-nc-r1 — it already holds main + the reviewer fixes below)
1. **BLOCKING — "Chờ" for cnv is worth much more than "Vào cung ngay" (OD:L1288).** Own measurement on the merged build (dev/measure/kc2val.js, both arms FRESH):
   cnv palace arm 8 lives V = 225 mean (bimodal: direct selection "khá" → V≈400 with Danh 100; "kém" → Tân Giả khố, V≈150, 3 of 8 lives), home arm 3 lives V = 309 → gap **+84**.
   The report's palace arm (355, 4/4 lives "khá") was a reused file from an earlier build and missed the "kém" placements. Same check on the 793cd37 build: 3 lives, 1 of 3 "kém" (V 345 over the 2 counted).
   nc: palace 368 / home 399 (+31, n=3); muoi: 354 / 328 (−26, n=3) — inside noise. Fix: re-measure cnv (and nc, bd) with ≥8 lives per arm, both arms on this build, report the tier mix, then retune BAL.kcv.dan (or the direct cnv placement cut KC2CUT) until the gap is inside the arm's spread. Never reuse a palace-arm file across builds.
2. **Loss written under ĐƯỢC (OD:L908, whole family).** "Ra ruộng giúp cha": ĐƯỢC "Phụ thân thiện cảm +5 · nắng làm sạm da" (green; l:{sac:-1} with o:100 never applies, so the text is also untrue) — jkc2.js:171.
   Scan every kcCard `x:` text in jkc.js + jkc2.js: losses sit in ĐƯỢC ("tổ mẫu với ngươi -15", "huynh trưởng với ngươi -10", "<maid> thiện cảm -5", "thứ muội … -3" is fine as a gain for her), and gains written with a minus ("phe chủ chiến -6 / -3", Nợ nhà −) must be coloured by meaning. Put every loss in MẤT/KÈM (red), real effect only; before/after table.
3. **Her own family shown as strangers.** Gia đình pager (cnv, 1366x1024): her father "Tâm trạng: chưa rõ — Ta chưa gặp, chưa có tai mắt bên người này", "TÍNH NẾT chưa rõ", "?" mood badge on the portrait, while the same card says "Tính cẩn trọng", "Thân thiết +69", "Đã quen". People she lives with are known (mood + nature). Fix in ONE place (jemo kitEmotion / emoKnown + the j61 nature line for S.kc.fam while !S.kc.inPal) so all nine home roads (tiểu thư included) change together.
4. **Exam hook is not one seam yet.** window.kcEntryExam is called only by kc2Play (cnv/nc/bd home selection + every direct "Vào cung ngay" selection). The six tiểu thư home roads' Phúc tuyển (jkc.js ~515, playArt direct) never call it, so Foreman D's exam mini-game would miss them. Route the jkc round through the same hook (kind = origin key, info.art = the art she offered).
   Hook contract after reviewer fix (write it in KIT/handover for session_01DgYSWowhQ6xMD6E52HDA3H): `window.kcEntryExam(kind, done, info)` — kind "dan" (cnv home) | "nc" (nc/bd home) | origin key (direct); info {art: kim|le|mua|<art key>, origin, title, note}; call done(raw 0..10) exactly once; the "wait/cúi đầu" choice never reaches the hook (raw 5); window.__bot skips it; a throw falls back to playArt.

## Reviewer fixes already on review/kc-roads-cn-nc-r1 (keep them)
- Merge main 18fb8252: assemble.py jkc2.js after jkc.js, before main's new jhouse.js; built files from main, rebuilt.
- Merge regression fixed: main's j2 "Nhập cung" card now puts the rank in a kitRows "Phong" row; kc2SelDo still patched the old sentence, so the card showed the CEILING (direct.js tt/dtq/cn/nc FAIL 'card'). Now the row is rewritten → direct.js 9/9 PASS.
- kc2Lt(): Xuân Đào / Bà Tư keep capitals (map line said "người ở đây: xuân đào"; relation row "Ta → xuân đào").
- "Quý nhân Trịnh Như Ý vào cung, phong Quý nhân": her name was rank-decorated before "phong …" → name dropped from that sentence (jkc2 nc card + jkc tiểu thư card, same family).
- "Vào cung ngay" road cards promised "phong Tần theo hòa ước" / "phong <r0> theo thân phận" though the selection decides → "thân phận cho tới <r0>, phẩm vị định ở kỳ tuyển chọn" (jkc2 nc + jkc tiểu thư; ceiling Đáp ứng keeps "phong Đáp ứng").
- Exam hook passes info{art,origin,title,note} (backward compatible: kind, done unchanged).

## Tests (merged build, after fixes unless noted)
| test | result |
|---|---|
| kc-roads/route.js --origin=cnv 755x1000@2, 1180x820@2, 1366x1024@2 | PASS 3/3, 0 page errors, no overflow/cut/??? (before the text-only fixes) |
| kc-roads/route.js --origin=nc same 3 sizes | PASS 3/3 |
| kc-roads/direct.js 9 origins | 4 FAIL before fix (merge regression) → 9/9 PASS |
| kc-roads/coop-together.js cnv home + nc direct, live Worker | 26/26 (both roads open on B, same date, A home / B palace, A alone at the tuyển tú month) |
| coop-e2e.js live Worker | 59/59 |
| outside/oldsave.js (origin/main build save → this build; home save reload) 755x1000@2 | PASS, 0 errors |
| kc2val.js own runs (cnv/nc/muoi) | see FIX 1 |
Screenshots looked at: identity cards, home stage, Dư đồ, Gia đình pager, Nhập cung (cnv/nc), Hành trang, co-op home.

## Checks
- OD:L1288 co-op: PASS (free choice at the same point, no gate, no forced entry; the "Chờ hảo hữu…" button seen is the normal week sync). Value of waiting: FAIL (item 1).
- OD:L1250 selection: direct + home roads go through a selection, ceiling only — PASS after the card-text fix.
- ONE CORE: carry numbers in BAL.kcv; selection cuts KC2CUT live in jkc2 as a const, not BAL (move to BAL with item 1's retune).
- Kit-first: kit cards/rows/pager only; no private CSS found in jkc2. "Hành trang" card: Bạc row is a kitChip while the other rows are plain text (same as main's Nhập cung "Mang theo"), consistent with main.
- Animation ends with a button (OD:L1261): no new animation in this branch (entry animation = Foreman D hook kcHook("enter")).
- ??? side flag: this branch adds NO new ??? case (no "???" literal in jkc2; route checks at 3 sizes × 2 origins clean). "Mạnh thái y ???" not reproduced; belongs to review/reign-road-fix.
- VANPHONG: "Vấn lễ" (le) is a quiz = word game (OD:L1265); it reaches the player through playArt("le"); review/nw-quiz replaces the le bank engine-wide, so no branch change needed — re-check after nw-quiz merges.

## Not blocking (pre-existing on main / art / questions)
- Identity card at 755x1000: the subtitle "<origin> · N tuổi" is overlapped by the "CON ĐƯỜNG" header (main tt too: subtitle bottom 588 > header top 579) — kit/jkc owner.
- Art placeholders (worker's art list): Phụ thân / Phụ vương chips as a dark square at 755, brown act-card art, the father in a court robe.
- Owner said "chờ 3 năm"; every home road (tiểu thư on main too) lasts ≈ 22–24 months. Coordinator question, not a branch fault.
- Danh reaches 100 within two palace years for a "khá" cung nữ (palace servant road, main) — balance owner.
