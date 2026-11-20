# outside-gaps — GAP rows OR01 OR06 OR08 OR14 (+ OR13 single-player half) — worker J3 (opus), session_01N1tNP4VKcnA6UqaKXZanu1, 20/11
PRIORITY #1 CHECK ('kcFest|kcEnter|kcHook|Khuê các|Thư nhà|lời đồn cũ|outside-art'): OD 12 | ledger 4 | claims 3 | main 15 | review/* 2 | archive 42 — review/outside-art(-r1) = ART ONLY (PROGRESS + hotspot json, no code); all art already on the CDN (13 kc-* scenes, map-kc-nha/kinh + hotspot json, FIGURES-huynh 8 fig + 8 por). Reused: playArt (Phúc tuyển call), KIT §85 map markup, jinv Tư trang sub-tabs, jdh catalogue, j61 intel, item ledger lgr. Co-op rebirth into the home road ALREADY LIVE (jcoopthinb.js:112 accept → kcInit; test dev/test/outside/coop-home.js).
START_CTX 5 % (1M window).

Branch **review/outside-gaps** @ **70f3c853** (base LIVE 30e8714e). New module dev/build/jkcg.js (last in assemble.py), BAL.kcg in jbal2.js.

## What
| row | done | where |
|---|---|---|
| OR01 | 13 home scenes replace the palace placeholders (SCIMG kc*) + KIT_FLOOR per painting; Dư đồ = painted house map / city map with hotspots (same .mapv/.mspot kit markup as the palace map, faces of who is there, "đang ở đây", reason when locked), Cổng nhà ↔ Nhà họ switch maps, «Danh sách» keeps the old list; Huynh trưởng gets his own figure (role "huynh" index, men pool never sees it; old saves' guard placeholder migrates on first draw). j77 palace tap-sheet skips the home map. | jkcg.js OR01, j77.js:93 |
| OR06 | Hội thơ / Ngắm hoa / Thượng nguyên (đố đèn) / Thất tịch (xâu kim) play the REAL mini-game (playArt occ "hoi", quick option = 5/10 like Phúc tuyển); tiers + Danh from BAL.kcg.fest (old kcFest typed numbers removed). Bots keep a quick score. | jkcg.js OR06 |
| OR08 | Phụ thân thiện cảm moves «Nhờ cha dâng sớ» odds (askO, ±15 at 0/100); Mẫu thân (else Tổ mẫu) sends letters (real «Thư nhà» item into the bag, true j61 intel on a consort, ledger row) and gifts (real item, ledger), monthly by her liking; Tư trang › «Thư nhà» sub-tab (kit .ksubb, new generic jinv KINV_XTRA registry): «Viết thư thăm nhà» / «Xin nhà gửi đồ vào» (gain + loss, odds word) + letters received; «lời đồn cũ» flag (Lời đồn ≥ 40 at entry) → palace event «Lời đồn cũ» from a hostile rival, 3 options (admit / mother's witness letter with odds / wait) each gain+loss; kcEnter's typed danh/bạc/sủng numbers → BAL.kcg.carry. td fall: no family letters. | jkcg.js OR08, jkc.js kcEnter line, jinv.js |
| OR08 cap | **DECISION (law 16/17 check):** OUTSIDE_PLAN §9 "+15 cap" is built as a knob but **OFF** (BAL.kcg.carry.cap 0). Reason: later owner rule OD:L1287/L1288 (waiting worth the same months in the palace; BAL.kcv calibrated with kc2val WITHOUT a cap). Measured kc2val home arm on this build (tt/muoi/thd/dtq × 3 lives): a +15 cap cuts **49–91 Tư chất points per life (mean ≈ 77)** → would break the calibrated parity. Owner/Foreman may turn it on by setting the knob (then re-run kc2val both arms). | jbal2.js BAL.kcg note |
| OR13 (part) | the ONE hook path kcSendToPal(kind,payload,from) → palRecvFromKc (letter / gift) used by the family senders (plan §13 "single-player uses the same hooks"); payload.coop → kcHook (network stub). | jkcg.js |
| OR14 | «Khuê các» titles in the jdh catalogue (new group "kc", shown once earned like Thiên mệnh): Trâm hoa ngự ban (selected), Khuê tú danh môn (Quý nhân at entry), 6 rare (one per kcR1–R6); kept across lives in localStorage ctm-kct, worn again in later lives, rows in Sổ luân hồi. | jkcg.js OR14, jdh.js GROUPS |

## NOT done — OR13 co-op half (split to a new worker, as flagged to Foreman B at start)
Friend at home ↔ friend in the palace: letter / gift / sớ / rumour / joining tuyển tú as real co-op acts (sender act with price+odds, receiver accept-card, host-computed numbers). Needs the jcoopworld W/P merge (window.coopSend does not exist; kcHook only queues). Hook to use: kcSendToPal(kind,{coop:1,...}) on the home side, palRecvFromKc on the palace side (letter/gift already there; add so/rumour/join). Co-op rebirth into the home road is already LIVE (see top).

## Tests (local build, both devices first)
- NEW dev/test/outside/gaps.js 755x1000@2 + 1180x820@2: **PASS both** (maps, gate, walk, huynh fid/fig, festival opens #kg82 + Danh moves, cap mechanism at 15 (cut 10), lời đồn cũ flag + event 3 options, father odds 78/48, mother letter item + mail, Thư nhà pane 2 acts + write, titles + rare title, no page errors).
- dev/test/outside/route.js tt 755x1000: PASS (no fail; the "???" in m4 is a palace card «Ngỏ lời với cung nữ ???», same on LIVE).
- dev/test/outside/oldsave.js (LIVE main.html → this build): PASS. kc-end.js: 6/7 PASS; 1 run failed "girlhood set above allowance 58/57" (random chest roll at entry; not touched here; 0/4 on LIVE — flagged as possible LIVE flake).
- Co-op: coop-home.js not run (needs the LIVE Worker; my change does not touch co-op code paths — kcHook unchanged).
- Shots (local, not uploaded): /home/user/wt/og-shots/gaps/ (map nha/kinh, huynh, mini-game, Thư nhà, lời đồn cũ, titles) — looked at all; fixed: Hoa viên label clipped (top clamp), letter card put Tổ mẫu on the palace stage (now shows her).

## Scan (whole group, law 11)
| group | before | after |
|---|---|---|
| home festivals using a formula | 4 (kcFest callers) | 0 |
| home scenes on palace placeholders | 13 | 0 |
| family figures on a guard placeholder | 1 (huynh) | 0 |
| typed numbers in kcEnter / kcFest | 9 | 0 (BAL.kcg) |

SẴN SÀNG KIỂM outside-gaps 70f3c853 → BIG review (rules-numbers + UI).

## REVIEW r1 (opus BIG, session_01N1tNP3qXHKuMuUrxD5QGRQ, 20/11) — VERDICT: PASS 52f0638e
PRIORITY #1 CHECK: worker's check reused (OD 12 | main 15 | review/outside-art(-r1) art only); re-grepped kcFest/kcEnter/kcHook/askO/geLifeNo on main — no second copy. START_CTX ≈4 % (1M window).
Branch **review/outside-gaps-r1** @ **52f0638e** = 70f3c853 + merge LIVE fd682a8d + reviewer fixes (index.html/sw.js rebuilt).

### Reviewer fixes (commit ca3ff6b8)
| # | law | fault | fix |
|---|---|---|---|
| 1 | 4 ONE CORE | one-core-guard FAILED on the worker sha: Thư nhà typed `can(1)`/`spend(1)`/"1 khắc" (3 new inline rule numbers); festival quick option typed "tính 5/10" while the score is BAL.kcg.fest.skip | BAL.kcg.home.khac (1); text prints `${BAL.kcg.fest.skip}/10`. Guard now PASS (0 fails). |
| 2 | 7 / kit hint | cost written "tốn: Bạc 10" (no sign): the kit event hint read it as a GAIN — «Nhờ … viết thư làm chứng» showed "Được: có thêm bạc"; Thư nhà put "Bạc 5" under GHI CHÚ and the ask's thiện cảm under KÈM | game convention "tốn: N khắc, Bạc -N" (3 strings). Looked: TỐN rows now "1 khắc · Bạc -15" / "1 khắc · Tổ mẫu thiện cảm -1". |
| 3 | 2 EQUAL VALUE | «Viết thư thăm nhà» (−5 bạc; af +4, a Thư nhà item Sức+10/Đức+2, true intel) dominated «Xin nhà gửi đồ vào» (af −3; one gift worth 6–30 bạc) | BAL knobs writeBac 5→15, askAf 3→1 (noted in the BAL.kcg comment). |
| 4 | bug | «Viết thư» spent the khắc before checking bạc (khắc lost, no result) | bạc check first. |
| 5 | bug | Khuê các titles always "kiếp 0": geLifeNo lives inside jge's closure (undefined globally) | same count (lifeLog().length+1) in jkcg; checked: lives [1]. |

### Special checks
- **OR08 +15 cap (BAL.kcg.carry.cap 0) — measurement CONFIRMED.** Reviewer re-ran dev/measure/kc2val.js home arm, tt/muoi/thd/dtq × 3 lives, cap 15 vs cap 0 (same build): lives that entered the palace with cap 15 lost **48 / 75 / 75 / 92 / 108 Tư chất (mean ≈ 80)**; entry stat sums cap15 mean ≈ 240 vs cap0 ≈ 307 (5 entries each, n small). Worker's 49–91 / ≈77 is the same order. So a +15 cap would break the OD:L1287 "Chờ 3 năm worth the palace years" calibration (BAL.kcv).
  **OFF = LIVE behaviour: CONFIRMED** by code: the cap block runs only when `C.cap>0`; S.kc.st0 is written but inert; kcEnter numbers moved to BAL with LIVE's values (Sủng 8+5×rank, Danh ×0.6 max 30, Bạc max 400). Decision stays with the owner (Foreman B → MAIN): OUTSIDE_PLAN §9 (+15) vs OD:L1287; not decided here.
- **kc-end 6/7 flake — PRE-EXISTING ON LIVE, proven.** 6 runs each, same server: this build 6/6 PASS; LIVE main.html 5/6, run 2 FAIL "girlhood set above allowance 58/57" (the same random chest roll). Not this branch; flag for whoever owns the girlhood chest (jkc kcInit chest vs luxOf budget).

### Tests (reviewer, on the merged build)
- gaps.js 755x1000@2 + 1180x820@2: PASS both (after fixes, after the final main merge).
- one-core-guard PASS · undef-scan PASS (250 names) · oldsave.js (LIVE → this build, same origin) PASS · route.js tt 755x1000 PASS (0 fail, 0 errs) · kc-end 6/6 PASS · **coop-home.js (LIVE Worker) 51/51 PASS** (co-op home road unaffected).
- role-parity.test.js: 2 FAIL (harm:accuse/banphe/uyhiep N-ONLY + NPC promoted maid onlyRisen harm acts) — PRE-EXISTING: the SAME 2 FAILs on LIVE 66bd36cd (assembled from origin/main); nothing in jkcg touches harm acts or maid promotion
- Shots LOOKED (Fold + iPad, scratch only, none uploaded): house map, city map (kit .mapv/.mspot, faces, "đang ở đây", khắc), festival mini-game card (kit kg82 + kitQuick), Thư nhà sub-tab (kit .ksubb + act cards), Lời đồn cũ event (kit event card, 3 options, odds words), titles (jdh kit plates). No overflow, no cut text, no page errors.

### 18 laws touched
1 two-way: «lời đồn cũ» is one-way (rivals have no home road to dig up) — by design in OUTSIDE_PLAN §9; noted, not FAIL. 2/3: fixed (#3); every option has gain+loss (lời đồn: admit Đức+/Danh−, witness bạc−/odds, wait Tâm cơ+/Danh−). 4: fixed (#1), guard PASS. 5: festivals play with occ "hoi" (mgTier rank rule). 6b: letter card shows her, sender stays home; 6c: letters/gifts are real items with ledger rows (lgr, from kc:<id>). 7: odds words only; "5/10" is the shared quick-option form. 9 kit: map/sub-tab/cards/plates all existing kit parts; jinv KINV_XTRA is a generic registry on the same .ksubb control (no new look). 11: scan table in the report.

### Notes (not blocking)
- kcgHyLoad refetches FIGURES-huynh.json every 5 min (no-cache) — tiny, but a one-shot (or SW-cached) fetch would do.
- kcgLdMonth falls back to ANY rival (shot: Hoàng hậu digs it up) when no hostile one exists.
- Pre-existing elsewhere (not this branch): j82/jkc/jkc2 type "tính 5/10" and fin(5) — whole-group one-core item for MAIN's mini-game lane.
