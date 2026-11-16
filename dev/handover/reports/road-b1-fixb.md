# road-b1-fixb — fix B of review road-b1-r1 (jrd_muoi.js + jrd_cn.js)
Worker of Foreman B s7 (session_01N1tNP6YA61ntHf4XBa4y1f); fix A (engine, jrd_tt, jrd_dtq) = session_01N1tNP2G4bsFxWrsbzomkzU.
START_CTX ~5 % of the window. Branch `review/road-b1-fixb` from origin/review/road-b1-r1 a05eec6e. Touched ONLY dev/build/jrd_muoi.js,
dev/build/jrd_cn.js, dev/build/jbal2.js (BAL.road muoi_no / cn_chu / cn_tinh / cn_ban / cn_than keys) and a new scan dev/measure/road-fixb-scan.js.
Engine, j67, j97, jrd_tt, jrd_dtq untouched.

## Before / after (dev/measure/road-fixb-scan.js, a05eec6e → this branch)
| family (review item) | jrd_muoi before → after | jrd_cn before → after |
|---|---|---|
| DOM climax dominance (2): free safe [win,mid] with base(bold) < base(safe)+10; worst ≥ other's best at ≤ cost; free sure gain beside free mid/lose | 16 → 0 | 15 → 0 |
| INV inverted e: (3) | 0 → 0 | 0 → 0 |
| HH Hoàng hậu named with no guard / stand-in (6) | 5 → 0 | 77 → 2 (both false positives: "Hoàng hậu cũ" = the former empress; an E text already switched by CN_QK) |
| TH Thái hậu named with no guard (6) | 2 → 0 | 9 → 0 |
| WORD VANPHONG (9): chắc chắn, bạn, kế toán, hóa đơn, cạnh tranh, tẩy chay, real names, sau rèm | 19 → 0 | 6 → 0 |
| NUM private number tables / typed RANKS bound / typed "… lượng" (8) | 5 → 0 | 5 → 0 |
| EMPTY beat whose every option needs hh/th (new, guards the item-6 fix) | 0 → 0 | 0 (1 mid-fix) → 0 |
road-option-scan.js (unchanged copy on this branch): 112 chapters, 2081 options, FREE GAIN 0, text-only 0, digits [] , double Lợi thế 0.

## What changed, per review item
- **2 Climax dominance (whole family, 30 x beats).** Script /rebal: in every x beat with a free safe `e:["win","mid"]` beside a bold `e:["win","lose"]`,
  bold base +5…+10 and safe base lowered so base(bold) ≥ base(safe)+10 at mid stats (flags unchanged). cn_ban .11 / cn_than .11: the free mid/lose
  option got an upside (w) and the free sure mid a cost. muoi_no .6 safe (gives bạc) base 45→30. muoi_lau .9 «Giữ lão» now carries the witness to .10 (+10).
- **4 Promised losses/gains applied.** New helpers (my files only): MUOI_PAY / CN_PAY = p.cutPay months (same field as the Hoàng hậu's khất bổng, j8
  payday), CN_CAM / MUOI_DROP = p.confined months (or one rank via e67drop), months in BAL.road (muoi_no.phat/cam, cn_chu.cam/phat, cn_tinh.cam/phat,
  cn_ban.cam/phat, cn_than.phat) printed with kitNumVi. Applied: muoi_no .9 x1/x2 + .10 (khất bổng; cấm túc when she has no rank), cn_chu .7 E.win,
  .8 x1, .9 g (at cast; .9 t1 restores), .11 bold/win2 (rank −1 + khất bổng instead of an unmodelled "cung xa"), cn_tinh .9 rf/E.lose/«Xin tự cấm túc»,
  .11 E.lose, cn_ban .6 x1 + .10 x1 ({v} cấm túc), .7 lose (khất bổng instead of a typed month), cn_than .6 s2 fail + .9 «Từ chối».
  Missing l: added (muoi_tuoc .6 c2, .9 s1, muoi_doi .10 c1); muoi_tuoc .8 costs swapped to match the text. Deals wired: muoi_lau .7 «Nhận lời,
  lấy diêm dẫn» → x1 accusation −20 and road flag (.10 −10); cn_ban .9 c2 → .10 g text + bold −15; cn_than .9 c3 → .9 «Xin mang họ Thẩm» hidden,
  .10 bold −15, .11 «truy phong … họ Thẩm» hidden. Road flags live in S.st.f14.fb (MUOI_FL / CN_FL, keys "<road>.<flag>").
  cn_chu .8: s1 text true for any rank gap; x1 decree says "phẩm bậc giữ nguyên … đứng cùng hàng" (ceremony order, no rank); E.win promise of
  "lần xét phẩm tới" removed, E.lose "gác việc xét phẩm" → "nhạt với ngươi một dạo"; .9 x1 "đứng trên nàng" only when she is.
- **5 History.** muoi_lau .6 E: "Hình bộ tâu lên, Hoàng thượng phê y"; .7 t1 Hoàng hậu tâu → Emperor sends Hộ bộ; muoi_tuoc .7 Quản Trọng/nước Tề →
  "người xưa … nước giàu" (road-history rule 7); .9 t1 title Đại Lý tự. cn_than .8 x1 trang sổ read in Ngự thư phòng, "phê"; .10 g "Có chỉ của
  Hoàng thượng" (covers the s2 path); .10 x1 no "sau rèm" (she waits in the palace, her word goes with the Thẩm family petition); every verdict
  "Đại Lý tự tâu, Hoàng thượng phê". cn_ban .10: CN_J = "Hoàng thượng hạ chỉ giao Hoàng hậu (Thái hậu / Thận hình ty) xét lại"; x1 = her last
  word submitted through the judge; every verdict "<judge> tâu lên, Hoàng thượng phê". (No ".9 s1 phán / Thái phó" text exists in cn_than .9.)
  **muoi_tuoc (road-history pass 2 rule 9):** "bảo cử" ×15 → nạp bạc xin hàm with an official "đứng bảo"; g says a bought hàm is lifetime and
  hereditary is rare; .11 hereditary win made very hard (bold 25+road wins, safe 12+flags; "phá lệ").
- **6 Hoàng hậu / Thái hậu alive.** Options that use her (hh stat, f:"hh", her name in n) got need:["hh"] (37); every other text naming her is a
  function through MUOI_Q / CN_Q (Hoàng hậu → Thái hậu → Hoàng thượng), with palace (…_QP) and her pronouns (…_QI "bản cung/ai gia/trẫm",
  …_QY "muội/con/ái phi"). Thái hậu-only options/beats got need:["th"] (cn_chu .8 c1 beat, muoi_tuoc .10 c2 beat); CN_TH for mentions.
  Beat speakers w:"hh" on beats where she does not speak → maid / v. cn_chu .11 t1 beat need hh.
- **7 Continuity.** .5 openings read the .4 rare ending (rdPrev()==="r97") in all 8 roads; muoi_lau .11 s2 per .10 ending; cn_tinh .8 s2 per .7;
  cn_than: .5 s2 per .4 mid/lose, .9 g + x1 when the name is already restored (.4 win / r97), .10 g when the father is already cleared (.4 mid / r97);
  identity-bound roles not recast: cn_chu (old mistress) and cn_than (the Thượng thư house) casts use CN_NORECAST (cast() returns false instead of
  handing the role to a random consort — engine/fallback = fix A).
- **8 ONE CORE.** RANKS clamps from RANKS.length (MUOI_RN, CNCHU_RN/VR); 4 private number tables removed → kitNumVi; typed "năm mươi lượng" /
  "tám mươi lượng" removed from texts (the cost row prints the bạc); cn_tinh .6: «Gom bạc dần» now really pays half — x1 «Đưa túi bạc đã gom, bù
  nửa còn lại» −30 instead of −60; nights path uses its own flag.
- **9 VANPHONG.** muoi: chắc chắn ×2, bạn ×8 (incl. 3 NFD-encoded ones the Python grep missed), kế toán ×4 → quản sổ, hóa đơn, hạ giá cạnh tranh,
  tẩy chay; cn: bạn ×4 → đồng liêu cũ / tri kỷ, "sau rèm" ×2. File normalised to NFC.
- **1c (rare texts in my files).** cn_chu_11 / cn_ban_11 RD97L x need qOn(); cn_ban_11 rare go applies the rank drop it promises and clears the .4
  evidence on the Hoàng hậu; text "dời ra cung xa" dropped. 1a/1b (E.r97, q97 carry, path/bad lists) = fix A.
- **Smaller items.** cn_ban .6 x1 «ra giá» failure → rdOan; cn_ban .8 «Bán trang sức đổi sâm» needs and removes a jewellery item (CN_JEWEL, not the
  worn hair piece); cn_ban twist clears the hh evidence (.6 win + rare); cn_than .7 c1 non-bạc option «Viết thư tay, gửi theo người đưa hương ra chùa»;
  CNTINH_G reads S.st.f14.n1 first.

## Tests (own server with charset=utf-8, build of 70a43f49 = this branch head)
| test | result |
|---|---|
| road-fixb-scan.js | table above: muoi all 0; cn 0 except 2 HH false positives |
| road-option-scan.js (this branch) | 112 chapters, 2080 options: FREE GAIN 0, text-only 0, digits [], double Lợi thế 0 |
| road-option-scan.js of fix A (1926db20, run on my files) | muoi/cn: INVERTED 0, DOMINANCE 0, VANPHONG 0, RARE reachability ok ×8; 6 BOLD≤SAFE hits are stub artifacts (stub sets every stat 30 → S.mat*2 = 60; BAL/CNCHU_UP unreadable → NaN): by hand muoi_tuoc .8 / muoi_doi .7 safe ≤40 at mat 10 vs bold 50; cn_tinh .9 safe ≤40 vs bold 41+; cn_chu .9 bold 45+ vs costed safe 40+ — told fix A (stub mat 3 + eval jbal2) |
| road-full.js @755x1000, 1 life, first option | muoi_lau 10/10 PASS (57 m, 4 = muoi_lau, 5–11 in order, fin «Nộp phạt, mang tiếng», tm96a side); cn_chu 10/10 PASS (49 m, fin «Chủ tớ thành tỷ muội») — 0 page errors |
| road-saves.js (main = /home/user/cung-tuong-mong site 8d14f6ef) | 7/7 PASS (main save, phase-1 frame, mid-road tt/dtq/muoi/cn, no page errors) |
Note: python -m http.server sends no charset and dev/index.html puts the meta charset after a long base64 icon (> 1024 bytes) → the browser
decodes Latin-1 and the bundle dies with "Invalid or unexpected token"; serve with charset=utf-8 (my first run hung on this, not a code fault).

## Merge with fix A
fix A merged da7db382 and took CN_NORECAST={keep:["v"]} (engine rdCast f.keep: cast once, never recast); 70a43f49 has the same line + every
need-v beat of cn_chu/cn_than guarded by if:A=>!!rv67(A,"v") (a mid-chapter death skips the beat instead of j67 recasting the role).

## Notes for the reviewer / foreman
- Review item 5 asked to drop Quản Trọng; road-history pass 2 said the allusion is fine. I followed the review (rule 7, no real person in text).
- muoi_lau r97 (.4 rare: Hộ bộ smuggling net, father made Diêm vận sứ) conflicts with the road premise (.8 «Cha bị giam», .10 a Diêm vận sứ is the
  villain). My .5 line avoids naming the office; the deeper fix is a ROAD_MAP question (r97 never fired before item 1a).
- cn_ban road premise is the Hoàng hậu (Càn Ninh cung's name borrowed). With no Hoàng hậu the texts fall back to the Thái hậu / Emperor; the
  chapter title «Bí mật Càn Ninh cung» stays (static title).
- KIT: no UI touched; no KIT REQUEST.

DONE 70a43f4938b6e7288a9e3509d594d707c2014a36
