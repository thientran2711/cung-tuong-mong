# Review road-b2 r1 — review/road-b2 50805e8c (nc + bd, td, ch roads .5–.11 + rare finales)
Reviewer: Foreman B reviewer (session_01N1tNP4f7UkPdvWCcktAgLp), coordinator Foreman B s8. START_CTX ~4 % of a 1M window.
Read: PREAMBLE, REVIEWER, START_CORE/WORKER/REVIEWER, topic story-roads; reports road-b2, review-road-b1-r1, review-road-b3-r1, road-history
(pass 1–3). jrd_nc.js / jrd_td.js / jrd_ch.js read IN FULL by three reader agents (one per file, given the b1-r1 items 2–9 and the history
rules); every BLOCKING item below re-checked by me on the code (✔ = seen by me).

Merge: `review/road-b2-r1` = origin/review/road-b2 50805e8c + origin/main 594415aa → **57c6c6d0** (pushed). Conflicts: assemble.py (main's
list + jroad/jrd_tt/dtq/muoi/cn/nc/td/ch after jst14 — main added jsteal/jtwoway/jstatus), jbal2.js (both blocks: main's BAL.led + branch
BAL.road), assets.json/index.html/sw.js (main's, then site rebuilt with build_site.sh). Note for landing: this branch also carries the B1
files (jrd_dtq/muoi/cn) at an older state — the road-option-scan hits left on the merge (3 dominance + 29 bold≤safe + 26 VANPHONG) are all
cn_*/muoi_* (B1), none B2. Land B1 r2 first or take B1's files from its own PASS.

## VERDICT: FAIL (8 items). The worker's "0 on every list" holds for road-option-scan, but the scan does not see items 1–2 below; the
family items 3–8 were found by reading.

1. **Free fixed-mid climax options with a gain (b1-r1 item 2, gain-and-loss) — nc 15, ch 1 ✔.** `c:{}`, `w:{duc|tamco:+2/3}`, `e:"mid"`
   beside costed bold/safe options (j67 res67 applies o.w on a fixed end). nc_gian charges its fixed mids; the other three nc roads do not:
   nc_su L300 «Không nhắn gì, để hai bên tự định» ✔, L362 «Xin xử đúng luật», L424 «Xin ngài bỏ điều sắt…», L455 «Để bộ Binh làm việc»,
   L486 «Trả lại, xin để Lễ bộ định»; nc_tuc L533/L537 «Mặc lễ phục Đại Hy đúng phẩm», L568/L572 «Nhận sơ suất…», L673/L677 «Nhường ma ma
   giáo tập…»; nc_vuong L803, L896, L927, L958; ch_bi .9 x1 L1065 «Giữ thế, chờ người khác đi trước» ✔ (tamco +3, free; the 22 other ch
   fixed mids now cost). Fix: a real cost on each (as in ch/nc_gian). Also bd_* (aliases) inherit these.
2. **Same-ending dominance — ch_benh .10 x2 (S.thDead) ✔:** «Xin Hoàng thượng cho giữ ấn làm kỷ vật» c suc −4, o 30+sung/5 vs «Đề nghị đặt
   ấn ở Phụng Tiên điện» c:{} o 45+duc/5, both `e:["dwin","dlose"]` → the free one is strictly better. Cost on the second or base ≤ first −10.
   SCAN GAP (engine/scan owner, not B2): road-option-scan checks only win/lose vs win/mid pairs and not free fixed-mid with a gain → add
   (a) any two options of an x beat with the same e pair: cheaper must not have base ≥ the costlier, (b) fixed e with w gain and no cost.
3. **History pass-3 ADJUSTs half applied.** (a) nc_gian .7 x1 night search is now Nội vụ phủ eunuchs, but L122 rt «Cấm quân về tay không.»,
   rf «Cấm quân lật gối.», L124 E.win «Cấm quân lui.» still name the guards ✔ → «Người Nội vụ phủ…». (b) ch_benh: pass 3 «outside physician
   needs the Emperor's chỉ, show it» — not shown anywhere: .5 s2 L335 «Gọi lương y họ Tôn vào lại» rt «vào bằng cửa Tây Hoa» ✔, .5 s1 L330
   and c4 L327 lodge him behind Đức Thọ cung on her word → «Xin Hoàng thượng cho gọi lương y họ Tôn…» / «Hoàng thượng chuẩn cho…».
   (c) td_an .8 «đốt sổ theo lệ»: s1 L130 rt «Hoàng thượng dặn Binh bộ: sổ năm ấy chưa được đốt», s2 L135 rt «Dòng thứ mười hai bị gạch khỏi
   danh sách», wx L150 «sổ ấn được yên» — yet x1 L153 always puts the ledger on the burning cart and E.lose L159 burns it; f:"reg" only +10
   odds ✔. Either the success lines change the x1 (ledger held back → x1 is about fetching it) or reword them to what the code does.
4. **Officials' wives entering the palace to see her (history rule 11, whole family td) ✔:** td_tha .5 c4 L832 «xin vào chầu, quỳ trước
   cửa cung ngươi», .8 s2 L932–933 «Ông nhờ vợ xin vào cung… Cho phu nhân vào» ✔, .9 c3 L979, .10 c3 L1018, .11 c3 L1053; td_ke .8 s1 L386.
   → the wife enters to greet the Thái hậu/Hoàng hậu and is received by her on the way (td_tha .6 L860 does it right; guard that one with qOn/
   th alive, it names no one when both are gone).
5. **Continuity — later chapters contradict earlier endings (b1-r1 item 7).**
   - ch_benh: .5 E.lose L370 «Lương y họ Tôn bị đuổi khỏi cung» ✔ (x2 rf: jailed), yet .7 L443 «Đưa bã thuốc cho lương y nghiệm» ✔, .9
     s1/s2/x1/E.win, .10 x1 L573, .11 s1 L591/s3 L597/c3/x1 L620 and the RD97L finale L630 have him in the palace; rdEnd(5) is only an odds
     bonus → guard `rdEnd(5)!=="lose"` + a «gọi về bằng chỉ» variant.
   - td_song .11 E.win L786 «Em ở lại kinh, đứng dưới một cái tên có ấn Hộ bộ» ✔ false after .9 mid/lose («Vẫn là Tiểu Thạch», «Tên em bị
     khoanh») and after .10 mid/lose (border); .10 t1/x1 L743–748 he spars / joins cấm quân after .8 lose «không còn cầm đao được».
   - td_ke .10 c1 L464–465 {foed} «chỉ tay…» ✔ after .6 E.lose L346 «không nói được nữa» ✔; same at .11 c1 L499.
   - ch_bi .11: t beat lets her burn the letter / send it back (A.f.bury/amend) but x «Giữ lá thư làm con bài» and E.mid «Lá thư ở trong tay
     ngươi» still fire.
   - nc .5 openings ignore the .4 r97 ending in nc_su (r97 opened the Vĩnh Hòa market, .5 s1 «Minh ước năm trước…») and nc_tuc (r97 «chê y phục
     là chê Đức Thọ cung», .5 s1 {v} still reports her clothes); nc_vuong does it right (L774).
   - smaller: ch_co prayer beads used in .9 E.mid L225 / .11 x1 L309 / RD97L L314 though they exist only after .9 s1; ch_co .10 L265 «Càn Ninh
     cung ghi ơn» vs E.mid «không ai nhớ ngươi đã ở đó»; ch_bi .7 t1 L986 ignores CHR_LAM (r97 Lâm thị alive); td_an .11 E.lose L264 «Tam ty
     không định án» after .10 win; td_ke .11 x1 rf L516 «chỉ phạt bổng» vs E.lose L521; td_ke_11 RD97L L524 {n1}'s men «nghe theo một phi tần»
     after .10 win ({n1} cách chức) — and she steers officials (rule 1); td_tha ruộng hương hỏa returned again at .6 c1, .8 g/x1, .11 c2;
     nc_vuong .8 s2 L874 «Mẹ trong tay giặc» after .7 mid; nc_vuong .11 g/x1 two claimants after .10 win «tân {quan} ngồi vững»; nc_gian .7 s2
     L106 «Từ khi tờ thư không tên lọt ra» after .6 mid; nc_tuc .6 s2 L547 «vốn đã bị chê» after .5 mid; td_tha .5 s2 L808 fires on a dead {foe}.
6. **Promised effects / flags not applied (b1-r1 item 4).** ch_bi .6 c2 L940 wx «{v} bị cấm túc», rt «Hoàng hậu cấm túc {v} một tháng» — only
   rdOan; nc_tuc .7 s2 L583 rf «Nội vụ phủ trả bạc» (bạc −50, no refund); `l:{th:-3}` hidden behind hints naming others (nc L27, L39, L242,
   L267, L279 — also hits lives with the Thái hậu dead: add need/guard or show it); dead flags shown as effects: nc_vuong f:"ally" (wx «Hộ bộ
   thôi cản»), f:"warn", f:"loser"; td_ke .6 t1 L337 «Hứa tha cả nhà hắn» f:"deal", .10 c1 L466 «Nhắn hứa tha con hắn» lx «lời hứa thành ràng
   buộc», td_tha .8 c1 L937 f:"deal" (+120 bạc) — never read (A.f.deal read only in td_tha .6); td_tha .8 E.win L956 lists «rương bạc» as
   evidence after «Trả rương». A consort promising a pardon is also rule 2 → «Xin Hoàng thượng khoan cho…».
7. **History rules 1/2/3 leftovers (consort and outer offices).** td_an .10 c2 L211/L214 «hồi tị» applied to the accused minister (recusal is
   for a related JUDGE); .10 c1–c3 she petitions the tribunal directly («Xin Tam ty đối chiếu…», «Xin quan xét mời sư…») against the chapter's
   own g «mọi lời… đi qua tay người khác»; Tam ty gloss missing in td_an .11 (L232/L264), td_ke .11 s1 L491, td_tha .9 x1/x2 rt L988/L992;
   nc_su .5 s1/s4/c1 «Lễ bộ giao ngươi bản nghi chú», «Lễ bộ ghi công ngươi», .6 c1 «Giao Lễ bộ xét», .11 x1 she edits the quốc thư; nc_vuong
   .6 c2 «Chép cho Hộ bộ…»; nc_tuc .8 s2 L621 / nc_vuong .9 c1 L913 her biểu read before the court (on B2's own doubt list; road-history pass 3
   did not answer nc doubts 1–9 one by one) — route through the Emperor / family / Lễ quan. ch_benh .5 g (thDead) L323 «Lời ngươi nói sẽ định ai
   mang tội» → «…Hoàng thượng sẽ nghe ai»; ch_ho .9 x1 L813 «Nhà {v} bị phạt bổng một năm» straight from her plea → «Hoàng thượng phê…».
8. **VANPHONG / Bắc Địch leaks (small, fix with the rest).** Modern words in jrd_nc: L554 «canh có vấn đề», L516 «vật trang trí», L412 «theo tỷ
   lệ», L283 «Không cần chứng minh», «thông dịch» (L260ff → thông ngôn/thông sự); td L507 h «{v} khi chú lung lay» garbled. Nam Chiếu facts in
   bd lives: nc_gian .7 t1 L114 «ải phía nam», nc_tuc .6 g/c1 «canh chua … lá rừng», «bùa ngải người man», .9 c1 lanterns on water → land tokens.

## HISTORY QUESTION (not counted in the FAIL; for the history expert / coordinator)
- Envoy/kinsman meetings in her own palace behind a curtain with a Nội vụ phủ eunuch, with the Emperor's leave (nc_gian .8 c1/c2, .9 t1; nc_su
  .5 s2/s4/s5, .10 t1/c1 ({pa} in the ngự uyển); nc_tuc .10 c1 L693, .11 s1 L721; nc_vuong .10 s1 L937, .11 s1 L966 — on the RD97L path). Rule 8
  (pass 2) says envoys only at an inner-palace gia lễ yến; these are framed as kin visits by leave = B2 doubt 1, which pass 3 did not rule on.
  If the expert says rule 8 holds, they join item 7.

## Checked and OK
- road-option-scan (merged build, 224 chapters / 4608 options): B2 files 0 free gain, 0 text-only, 0 double Lợi thế, 0 inverted, 0 x-beat
  dominance / bold≤safe, 0 VANPHONG hits, digits [] (also in function texts), all 16 B2 rare finales reachable.
- Readers: item 3 (no `e:["mid","win"]`) clean in all three; item 6 (hh/th guards) clean in td and ch (CHR_TH/CHR_Q/need, empty-seat
  fallbacks) and nc (speaker-only w:"th" beats without her name = nit); item 8 ONE CORE clean (TDAN_RK clamps RANKS, ncConf printed via
  kitNumVi, BAL.road.ch_* used as commented); item 9 no %/chắc chắn/bạn/cơ hội/Khôn Ninh. bd aliases resolve (TOK67/NCL, RD97L cloned to bd_*_11).
- History applied: nc .11 s2 «Gia lễ yến trong nội cung» + «ngồi ngang hàng Hoàng hậu» need:["hh"]; td_an .10 x1 «lão quản gia đọc lời khai
  thay» + «tiên đế bị người che mắt»; td_an .8 g «theo lệ»; ch_benh t2 «Xin dâng hương thay Thái hậu trong hàng nội mệnh phụ».

## Tests (build 57c6c6d0, own http server with utf-8 charset — python -m http.server serves dev/index.html without a charset → mojibake +
"Invalid or unexpected token", every bot hangs: use a charset-aware server or coop-serve)
| test | result |
|---|---|
| road-rare.js, 16 B2 roads (nc/bd/td/ch) | ALL PASS (83 checks + 0 page errors); 7 roads note «path names only .11 options» (by design) |
| road-saves.js @1180x820, full-road lives switched to nc/bd/td/ch | 7/7 PASS (origin/main 594415aa save loads, phase-1 save, 4 mid-road saves keep road nc_tuc/bd_tuc/td_an/ch_ho + cast + plan) |
| coop-e2e.js (Fold host + iPad guest, live Worker) | **59/59** (incl. solo + old save load, no page errors) — no regression |
| road-full.js | not run this round (content FAIL; ~1 h per road, worker run green); run nc/bd/td/ch on r2 |
| event-card shots 755x1000@2 + 1180x820@2 (nc_gian_11 s2, nc_su_7 x1, td_an_10 x1, ch_benh_5 s2, bd_ngua nc_gian_6 s2) — looked at | j67 kit event card (VIỆC frame, speaker figure, kit option cards with Tốn/Gợi ý rows and odds tags), no overflow, 0 page errors, no private UI. Known kit issues (not B2): beat text not on screen above the options (KIT REQUEST of review-road-b3-r1, kdpall), option/picture thumbnails blank (CDN lazy timing), costs on tamco/duc/danh/sung not shown in Tốn (road-b2 round-1 note). Shots in scratch only, deleted. |

## Handover
Context at write ~25 %. Worktrees /home/user/wt/rb2r1 (review branch, pushed 57c6c6d0), /home/user/wt/rb2main, /home/user/wt/rb2doc — removed after push.
