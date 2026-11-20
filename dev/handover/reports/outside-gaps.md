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
