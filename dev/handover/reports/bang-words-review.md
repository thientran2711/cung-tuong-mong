# bang-words — BIG review E40r (opus) of E39 927ac123 · session_01DgYSWqAzt8MGwYMUsFUXN5
PRIORITY #1 CHECK ('Cao Ly|thảo nguyên|trà sữa|foreign-bang|jrd_nc|Phù Tang|bdTxt'): OD 3 | ledger 0 | claims 8 (+ this row) | main 15 | review/* review/bang-words only | REUSED: bdTxt/bdTxtProp (THE one bd switch, jrd_bd.js), TOK67/NCL land tables, caoly-oldsave.js + coop-e2e.js harnesses (extended, not rebuilt).
Branch: review/bang-words-r (927ac123 + fixes, final-merged on LIVE main 90da39e3). RESULT: see last line.

## Findings (worker claims checked)
1. **Land list incomplete (FIXED in tests).** The game has 4 foreign princess lands: Cao Ly (nc), Bắc Địch (bd on an old premise BD_OLD), Ba Tư (every new bd life), **Phù Tang (pf, landed on main after E39's base)**. scan.js had no pf → added pf (Japan word list; rong biển / tía tô are true for Phù Tang too, so the Korea list is not applied to pf).
2. **Raw token ON SCREEN the scan missed (FIXED, whole group).** Chapter TITLE «Lão {kha} bị bắt» (nc_gian .9, and its Bắc Địch twin bd_ngua_9) printed raw in the chapter card, goal line and every «Chương 9 · Hồi n/5 · …» log line — found by playing a real Cao Ly life. scan.js filled titles itself, so it hid this. Group = every ARC67 title with a {token}: also «Nhà {v} trong án cũ» (cn_than .6). ONE fix: jstory.js arcTitleFill67 — a getter on those titles fills through TOK67 with the arc's live thread; all 23 readers of ARC67[id].t get it, no per-screen patch. scan.js now also reads the title raw (as the readers do): 927ac123 → 2 hits, now 0.
3. **Ba Tư tutorial line read steppe words (FIXED).** jtq14 BEAT.bd («Khả hãn gửi … đừng để ai bảo người thảo nguyên thô lỗ», «hồi môn từ thảo nguyên») was shown to EVERY bd life incl. Ba Tư (no bdTxt). Now bdTxtProp: Ba Tư «Phụ vương gửi … cầu Đại Hy làm đồng minh … người phương tây», legacy Bắc Địch unchanged. Phù Tang had no row (no line) → BEAT.pf added. Probe before/after in-page (tq14Beat) recorded.
4. jrd_nc «trà sữa / thảo nguyên» beats = BDW-only: CONFIRMED on screen (3 Cao Ly lives played into nc_gian/nc_tuc/nc_su .5–.9: 0 steppe words).
5. jge geF {kha} + land tokens {dien}/{huong}: correct; whole-game raw-token check on screen (12 lives) + scan: 0 after fix 2.
6. chợ biên line «{land} có ngựa, Đại Hy có sắt»: correct (matches c1 «Đại Hy không bán sắt cho nước ngoài»; Goryeo did trade horses).
7. **caoly-oldsave «obsolete» = REJECTED.** The migration code is live (jkc2.js kc2MigNc on deser), so the path is not gone. Precondition rebuilt instead: ageNc() writes the pre-rename strings (Mẫu hậu / Hoàng huynh / Hoàng thúc, Nam Chiếu) into a save made on this build (ids/keys never changed, only stored strings) → 14/14 PASS, the migration really runs (old home save holds the old titles → migrated).
8. Generic, not land words (kept): «sữa dê tắm» in Dưỡng nhan; Bắc Địch / Cao Ly as neighbour countries in court events (owner 19/11 ~06:50Z).

## Tests (final sha)
| test | result |
|---|---|
| bang-words/scan.js (4 lands × all chapters + GE + home + raw titles) | before 927ac123: 2 · after: 0 PASS |
| bang-words/screen.js NEW (real lives: home 6 months → kc2Enter → road chapters .4–.10; whole page text each buổi + tabs) | 12 lives (nc 3, Ba Tư 3, Bắc Địch 3, Phù Tang 3): only hits = the 3 raw titles of finding 2 (pre-fix life); after fix 0 |
| coop-e2e COOP_LAND=1 (new both-seat land check, OD:L594) | Cao Ly host + Ba Tư guest 96/96 · swapped Ba Tư host + Cao Ly guest 96/96 · Phù Tang + Cao Ly 95/96 (1 = AudioContext device error of the test box) · final sha: see FINAL |
| caoly-oldsave (pre-rename fixture) | 14/14 |
| quickcheck (old save + core gates + perf) on final | PASS |
| role-parity ×2 | ALL PASS ×2 |
| voice-core · ge-guard | PASS · 8/8 |

## 18 laws touched
6b real world: each land reads its own words (PASS after fixes) · 7 wording cổ trang: new lines no % (PASS) · 8 expert: E39 note checked + Ba Tư / Phù Tang lines follow it · 11 whole group: titles fixed at one place, every land incl. pf scanned (PASS) · 4 one core: no numbers touched · 9 kit: no UI change. 13 gate zero: line above.
FINAL on cba883e0 (= 927ac123 + E40r fixes + LIVE main 90da39e3; ancestor of origin/main ok): coop-e2e COOP_LAND Cao Ly+Ba Tư 96/96, Ba Tư+Phù Tang 96/96 · screen.js Cao Ly ×3 (nc_tuc .10, nc_vuong .9) 0 hits · scan 0 · quickcheck PASS · role-parity ALL PASS ×2 · ge-guard 8/8 · voice-core PASS. No shots taken (text-only change; nothing on CDN to wipe).
**PASS cba883e0** — LAND READY bang-words cba883e0 (review/bang-words-r) for MAIN CHÍNH 90. E39 owes nothing (all fixes made here, small).
