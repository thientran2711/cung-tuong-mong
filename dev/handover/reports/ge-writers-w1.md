# ge-writers-w1 (E11a → E11a2, Foreman E) — report
PRIORITY #1 CHECK ('ge-writers|GE writer|jgedata'): OD 0 | ledger 0 | claims 8 | main 5 | review/* 2 | archive 0 — reused review/ge-writers-w1 (fixed in place) + review/ge-writers-w2 test text (base of fix 4); nothing new built.
LINEAGE (fix round): E11a2 depth 5 · session_01DgYSWoSMJso8hGSAFMN9W6 · START_CTX ~3 % (window 1M; get_session reads 0, own estimate) · ended ~12 %.

**READY (round 4): review/ge-writers-w1 tip fd7c6775** (round 4 = jrd_muoi ch8 c3 patch carried in W1 by MAIN ORDER 18:45Z + merge origin/main 94d11623; round 2 was df30265f) (round 2 = merge origin/main 5e6490b4 + test timing + FOR B final; fix round was 46aeac92) (parent a58b55eb). No push to main, no PR. Road files jrd_* NOT edited. Verdict fixed: dev/handover/reports/ge-writers-w1-review.md (E11r-w1 FAIL a58b55eb, 4 fixes).

## ROUND 4 (E11a2, MAIN ORDER 18:45Z via Foreman E: carry the ONE jrd_muoi ch8 patch inside W1) — tip fd7c6775
- 18c75df5-ish commit «carry jrd_muoi ch8 c3»: the exact §FOR B item 1 diff applied (jrd_muoi.js muoi_no ch8: s1 + s2 options `to:"c3",tf:"c3"`, new beat c3 «Thư sinh Giang Nam», not in the c-pool; jbalroad.js `muoi_no_8.c3`). muoi_no_4 pull += «Xóa nợ, chúc y thi đỗ», «Cho hoãn, đỗ rồi hãy trả», «Giữ giấy nợ, đợi y làm quan»; muoi_no lean.p += the first two, lean.m += the third. Law 6(b) for muoi_no_4 now holds: the scholar the ending names is met in ch8 of every muoi_no life.
- Merged origin/main 94d11623 (assemble.py = main's list + 'jgedata_w1.js' after 'jgedata.js'; index/sw rebuilt). FOREMAN_B_STATUS.md got the FYI line.
- Tests (fd7c6775): ge-guard 6/6 · ge-engine `- all` cold ×2 456/456, 456/456 · one-core-guard PASS · build_site OK · quickcheck ALONE **PASS** (core gates PASS, open 1460 ms, old save ok, perf new/live render 237/264, tab 483/452, buổi 1278/1329, tasks>200 18/19).
- Measure muoi_no (`MODES=kind,cruel node dev/measure/ge-measure.js - 2 2 out.json muoi_no sens`, run on the patch before the main merge): 4/4 lives ok, page errors 0 · open .8 3.00 · open .11 **2.25 IN** · kind→thiện **1.00 IN** · cruel→ác **1.00 IN** · per ending 0/1 1/1 1/1 1/1 (round 1: 2.25 / 1.00 / 1.00 — unchanged) · inChar .75 OUT of [.30,.60] = the known engine-level note (BAL.ge.odds / Chuỗi length, for E).

## ROUND 2 (E11a2, after E11r-w1 PASS 46aeac92 «land after B patch») — tip df30265f
1. Re-merged origin/main 5e6490b4: assemble.py = main's module list (12 new modules) + `'jgedata_w1.js'` right after `'jgedata.js'` (W2 adds `'jgedata_w2.js'` after it, same line); index.html / sw.js taken from main and rebuilt.
2. Test timing family: dev/test/ge-engine.js `__life` and dev/measure/ge-measure.js `__ge` now wait for `S.st.f14.rd===road` (they accepted the OLD life when only `S.st.f14` was checked). Shared block — W2 copies `git show df30265f:dev/test/ge-engine.js` (+ ge-guard.js unchanged since 46aeac92; ge-measure.js same line).
3. FOR B item 1 rewritten as the final, tested patch (below).
Tests (df30265f): ge-guard 6/6 · ge-engine `- all` cold ×2: **456/456, 456/456** · one-core-guard PASS · build_site OK · quickcheck ALONE **PASS** (core gates PASS, open 1671 ms, old save ok, perf new/live render 229/255, tab 466/482, buổi 1336/1273, tasks>200 19/19).

## FIX ROUND (E11a2, 18/11) — the 4 fixes, each as a family
Files: dev/build/jgedata_w1.js (words only: no pull / close / lean / cond change → no new measure needed), dev/test/ge-guard.js, dev/test/ge-engine.js, site rebuilt (index.html, sw.js, assets.json).

### Fix 1 — law 6(b) REAL PEOPLE (family = every person / deed / named thing in t/a/ht/ha/ft/cw of all 44 endings, checked against that road's own chapters .5–.11; scan = per-road text split of jrd_tt/dtq/muoi + term grep, ~60 terms)
| ending | before (not in the road) | after (who the road / world really has) |
|---|---|---|
| dtq_binh_3 | «vị vương gia giữ đất phong phương bắc … từng cùng cha ngươi giữ ải», hoa núi | the world's real **Vương gia** (j22 MROLES, one in every life; haunts vườn ngự, visits Thái hậu); no invented tie to cha / ải; «những lá thư … đã bóc ra đọc trước» = her real road option «Bóc cả hai ra đọc trước». FOR B (recommended, below) |
| dtq_huynh_4 | «vị vương tử bên kia ải … lén mở cửa trại cho huynh» | the road's **sứ giặc** (ch6: half the captives «còn tùy một chuyện riêng», «Hắn muốn gặp nương nương»; Chuỗi already holds «Xin gặp riêng sứ giặc») |
| muoi_lau_3 | «người con trai của lão lái thuyền» | the road's **old boatman himself** (ch9, the only witness) + **his daughter** (road option «Hứa đưa con gái lão ra»); no romance word left |
| muoi_no_4 | «người thư sinh nghèo từng vay bạc nhà ngươi» | **unchanged — the catalogue lever FOLLOW · scholar («Thư sinh trả nợ», fixed title) truly needs a new person**; road muoi_no has only {v}/{v2}, {eun}, the Nội vụ phủ lender, lão quản sổ. Exact road patch **FOR B** below; the ending text already matches it word for word. Until B lands this ending must not go to main (decision for Foreman E). |
| tt_mat_3 | «điều khoản đã giam một tiểu cung nữ vô tội» | the pact's **real clause** (tt_mat ch6 / ch11: keeps HER one rank lower) — t + ht rewritten |
| dtq_bien_4 (scan) | «người thân binh … mang thư **cha**, nay là **phó tướng**» | the road's thân binh carries **huynh trưởng's** letters (ch6); «phó tướng» is another, suspect man in that road → «người thân binh ấy» in t / a / ht |
| dtq_vu_2 (scan) | «Thái tử» (none in that road, not in every life) | Hoàng thượng (t, ht) |
| muoi_tuoc_4 (scan) | plaque «Nghĩa thương» | the road's real «tấm biển trước cửa nhà» (ch9 / ch10) |
| tt_oan_3 (scan) | «Cung chính ty» | «Cung Chính ti» (game spelling, 76 uses) |
| other 35 endings | checked: cha / mẹ / huynh trưởng / chị dâu / gia nhân, Ngự sử (tt_oan), ký thất + khuôn ấn + phủ phía đông (dtq_vu), hai nửa hổ phù + đồn điền + lão tướng (dtq_binh), Hắc Thủy + thân binh + hòa ước (dtq_huynh), Diêm vận ty + Giang Khẩu + thông gia + ngạch (muoi_lau), Tri huyện + đầu cơ + tích trữ (muoi_doi), Kính sự phòng + chỉ đỏ (muoi_no), Nội vụ phủ + tố (muoi_tuoc) all in their roads | no change |

### Fix 2 — whole-family variety across waves
| unit | before | after |
|---|---|---|
| tt_tranh_3 fail | «Không đi không ở» (= W2 cn_than_3, W2 keeps it) | «Lơ lửng giữa hai phe» (matches its ft) |
| dtq_binh_2 cw | «cần Đức dày và Hoàng thượng thương ngươi» (= pilot tt_co_2) | «cần Đức dày và lòng sủng của Hoàng thượng để ngài tin lời ngươi» |
| stricter check (same units as the shared ge-guard block: t/a/ft sentences >12 chars, ht/ha/cw/fail, case-blind, + t = a) over pilots (jgedata.js) + W1 + W2 @ ddbd88be, 25 branches | **2 repeats** / 1174 units | **0 repeats** / 1173 units |

### Fix 3 — the Queen's form + palace names (family = every pronoun for another woman and every palace / temple name in the 44)
| place | before | after |
|---|---|---|
| tt_mat_1 t | «lui về **Từ Ninh cung**» (Thái hậu's), «bà tiến cử», «bà ngồi» | «lui về **Thọ Khang cung**» (game: where retired consorts live as Thái phi), «tiến cử», «Hoàng hậu cũ ngồi» |
| tt_mat_2 a / ht / ft | «Bà gọi ngươi…», «cùng nàng gánh», «bà nói» | «Hoàng hậu gọi ngươi…», «cùng nàng ta gánh», «nàng ta nói» |
| tt_mat_4 t / a / ha | «chùa **Tĩnh Tâm**» (not in the game), «bà chọn / theo bà / bà không», «canh giữ nàng» | «chùa **Hộ Quốc**» (the game's temple, 23 uses), «Hoàng hậu chọn / theo nàng ta / nàng ta không», «canh giữ nàng ta» |
| tt_mat_3 t | «Nàng được thả» | gone with fix 1 |
| muoi_no_2 a / ft (family, VANPHONG §2.1) | «chỉ nàng biết», «đã bán nàng» | «chỉ nàng ta biết», «đã bán nàng ta» |
| palace scan (all 44) | Càn Ninh (tt_mat_2/3, muoi_no_1) = HH ✔ · Dưỡng Tâm (muoi_tuoc_3, emperor's hall, regency curtain) ✔ · Thái Hòa (dtq_vu_1) ✔ · Ngọ môn (dtq_binh_1) ✔ · Từ Ninh ✘ → fixed · Tĩnh Tâm ✘ → fixed | 0 wrong |
Left: «Hai nàng» inside the Emperor's quoted speech (muoi_no_2), «đàn bà», «bà chủ thuyền» (titles, not a pronoun). **FOR E (game-wide, not W1):** the game itself names the Queen's palace both Càn Ninh (151) and Khôn Ninh (40), and the Thái hậu's both Từ Ninh (34) and Đức Thọ (445: map place "tn", j-map) — one family decision for the kit/wording owner.

### Fix 4 — ONE test block shared with W2 (base = origin/review/ge-writers-w2 text)
| tool | before (W1 a58b55eb / W2) | after (46aeac92, W2 copies verbatim) |
|---|---|---|
| ge-guard.js variety | W1: t/a/ft sentences + fail + t = a · W2: t/a/ft sentences + ht/ha/cw/fail, case-blind (two blocks, textual conflict) | ONE block = W2's units + W1's «t = a»; diff vs W2 file = header comment + 1 line |
| ge-engine.js roads | W1: 2nd CLI arg (`all` / list), url `-` · W2: env GE_ROADS only | CLI arg (list \| `all`) → env GE_ROADS (same forms) → pilots; url `-` = local build |
Sha sent to Foreman E right after push.

### Tests (tip 46aeac92)
- `node dev/test/ge-guard.js` **6/6** (ERRORS 0; 14 live branches; variety block).
- `node dev/test/ge-engine.js - all` **456/456** on two runs; the first, cold run right after the build read 241/456 (the D5 «prev» / cnv_mat «last» rows; reruns clean, no code change between) — flagged as a possible timing flake of the life-start wait (150×100 ms), not touched.
- `node dev/test/one-core-guard.js` **PASS** (fails 0, inline 4212 = baseline).
- `bash dev/site/build_site.sh` OK (committed index.html / sw.js / assets.json).
- `bash dev/tools/quickcheck.sh` ALONE: everything PASS (time-spill PASS, open 1423 ms 0 errors, old save ok, perf new/live render 248/276, tab 428/424, buổi 988/1168, tasks>200 16/17) except **G4 70-manifest-guard = network drop** (`RemoteDisconnected` on the live CDN check); rerun of that gate alone: **MANIFEST GUARD PASS**.
- Measure: not rerun (words only; no Chuỗi / Khóa / lean / cond change).

### FOR B (road patches; jrd_* are Foreman B's — not edited)
1. **REQUIRED — muoi_no ch8 «Nợ chồng nợ»: the scholar of muoi_no_4, played in EVERY life (FINAL, round 2).**
   How it is always played: j67 `pickNext67` uses `A.force` before the pool (j67:105), and an option's `to` / `tf` sets it (j67:143). Ch8 always opens with s1 (after a won chapter) or s2 (otherwise); both need {v}, and the road cannot run without {v} (cast). So every option of s1 and s2 gets `to:"c3",tf:"c3"`, and the new beat c3 is **not** put in the c-pool (no 3rd c pick, the ~2-of-3 draw is untouched); it takes the first c slot (nc ≥ 1 always).
   BAL (laws 2/3/4): row `BAL.road.muoi_no_8.c3` in jbalroad.js — each option one cost + one gain from BAL, equal value, same shapes as the c2 row of that chapter (bạc −40 → Đức +3 · Sức −3 → Danh +2 · Đức −2 → Tâm cơ +3, each +1 Lợi thế). Lean: thiện = the first two, ác = the third.
   Tested locally on review/ge-writers-w1 df30265f (patch applied, then reverted — not landed): assemble OK, **one-core-guard PASS**, page probe `newThread67("muoi_no_8")` ×60 per opening: s2 path 180/180 options → c3, s1 path (rdK stubbed won) 180/180 → c3, 0 page errors.
   Exact patch (`git apply` from the repo root):
```diff
diff --git a/dev/build/jbalroad.js b/dev/build/jbalroad.js
index 81e137cd..e4c67e7c 100644
--- a/dev/build/jbalroad.js
+++ b/dev/build/jbalroad.js
@@ -190,3 +190,3 @@ Object.assign(BAL,{road:{get first(){return BAL.st14.parts[1][0]+1},get last(){r
  muoi_no_7:{s1:[{c:{suc:-2},o:[40,["d","tamco",3]],w:{mat:1},l:{tamco:-2},sc:1},{c:{tamco:-1},w:{duc:2},sc:1,g:[6]},{c:{bac:-30},w:{tamco:2},g:[8,-4]}],s2:[{c:{},o:[40,["d","tai",4]],w:{danh:2},l:{danh:-2},sc:1,g:[5]},{c:{danh:-2},w:{duc:2},sc:1,g:[8]},{c:{sung:-2},w:{tamco:2},g:[4]}],c1:[{c:{sung:-4},w:{tamco:1}},{c:{},o:[40,["d","tamco",3],["d","danh",6]],w:{danh:2},l:{danh:-3},sc:1,g:[6,3]},{c:{bac:-20},o:[40,["m","mat",5]],w:{mat:1},l:{tamco:-1},sc:1}],c2:[{c:{bac:-40},w:{mat:1},sc:1},{c:{suc:-2},o:[35,["m","mat",5]],w:{tamco:2},l:{danh:-2},sc:1},{c:{mat:-1},w:{duc:1}}],t1:[{c:{tamco:-1},w:{duc:2},sc:1},{c:{suc:-3},o:[40,["f","call",15,0],["f","cut",10,0]],w:{tamco:2},l:{danh:-3},sc:1,g:[6,8,4]}],x1:[{c:{suc:-3},o:[35,["f","pair",10,0],["d","tai",5]],g:[6]},{c:{bac:-30},o:[40,["f","cut",15,0],["f","read",10,0],["m","mat",3]]},{c:{sung:-3},w:{tamco:2}}],E:{win:{fx:{danh:4,tamco:2},k:1,g:[8,8]},mid:{fx:{tamco:1},k:0},lose:{fx:{danh:-5,sung:-2},k:-1,g:[6]}}},
- muoi_no_8:{s1:[{c:{},o:[40,["d","danh",5],["d","tamco",6]],w:{mat:1},l:{tamco:-2},sc:1,g:[3]},{c:{bac:-40},w:{duc:3},sc:1,g:[8]},{c:{duc:-1},w:{tamco:2}}],s2:[{c:{bac:-20},w:{mat:1},sc:1},{c:{},o:[35,["d","duc",4]],w:{duc:2},l:{danh:-2},sc:1,g:[8,-3]},{c:{duc:-2},w:{tamco:2}}],c1:[{c:{bac:-60},w:{tamco:2},sc:1},{c:{},o:[40,["m","mat",4],["d","danh",6]],w:{danh:3},l:{danh:-3},sc:1},{c:{suc:-3},o:[40,["d","tamco",3]],w:{tamco:2},l:{danh:-2}}],c2:[{c:{bac:-40},w:{duc:3},sc:1,g:[10]},{c:{duc:-2},w:{tamco:3},g:[5]},{c:{suc:-3},o:[40,["d","tai",4]],w:{duc:2},l:{bac:-20},sc:1}],t1:[{c:{bac:-40},w:{duc:2},sc:1},{c:{suc:-3},o:[40,["f","know",15,0],["f","stop",10,0]],w:{tamco:2},l:{danh:-3},sc:1}],x1:[{c:{bac:-60},o:[40,["f","buy",15,0],["f","help",5,0],["d","tamco",6]]},{c:{suc:-4},o:[40,["f","stop",15,0],["f","know",10,0],["m","mat",3]]},{c:{duc:-2},w:{tamco:2}}],E:{win:{fx:{tamco:3,duc:2},k:1,g:[10]},mid:{fx:{tamco:1},k:0},lose:{fx:{danh:-5,bac:-30},k:-1}}},
+ muoi_no_8:{c3:[{c:{bac:-40},w:{duc:3},sc:1},{c:{suc:-3},w:{danh:2},sc:1},{c:{duc:-2},w:{tamco:3},sc:1}],s1:[{c:{},o:[40,["d","danh",5],["d","tamco",6]],w:{mat:1},l:{tamco:-2},sc:1,g:[3]},{c:{bac:-40},w:{duc:3},sc:1,g:[8]},{c:{duc:-1},w:{tamco:2}}],s2:[{c:{bac:-20},w:{mat:1},sc:1},{c:{},o:[35,["d","duc",4]],w:{duc:2},l:{danh:-2},sc:1,g:[8,-3]},{c:{duc:-2},w:{tamco:2}}],c1:[{c:{bac:-60},w:{tamco:2},sc:1},{c:{},o:[40,["m","mat",4],["d","danh",6]],w:{danh:3},l:{danh:-3},sc:1},{c:{suc:-3},o:[40,["d","tamco",3]],w:{tamco:2},l:{danh:-2}}],c2:[{c:{bac:-40},w:{duc:3},sc:1,g:[10]},{c:{duc:-2},w:{tamco:3},g:[5]},{c:{suc:-3},o:[40,["d","tai",4]],w:{duc:2},l:{bac:-20},sc:1}],t1:[{c:{bac:-40},w:{duc:2},sc:1},{c:{suc:-3},o:[40,["f","know",15,0],["f","stop",10,0]],w:{tamco:2},l:{danh:-3},sc:1}],x1:[{c:{bac:-60},o:[40,["f","buy",15,0],["f","help",5,0],["d","tamco",6]]},{c:{suc:-4},o:[40,["f","stop",15,0],["f","know",10,0],["m","mat",3]]},{c:{duc:-2},w:{tamco:2}}],E:{win:{fx:{tamco:3,duc:2},k:1,g:[10]},mid:{fx:{tamco:1},k:0},lose:{fx:{danh:-5,bac:-30},k:-1}}},
  muoi_no_9:{s1:[{c:{},o:[40,["d","hh",4],["d","danh",6]],w:{hh:3},l:{danh:-3},sc:1,g:[6]},{c:{suc:-2},w:{duc:2},sc:1,g:[5]},{c:{duc:-2},w:{tamco:2}}],s2:[{c:{suc:-3},o:[40,["d","hh",4]],w:{hh:2},l:{hh:-3},sc:1},{c:{},o:[45,["d","tamco",4]],w:{tamco:2},l:{danh:-3},sc:1},{c:{danh:-2},w:{duc:2}}],s3:[{c:{},o:[40,["d","danh",5],["m","mat",3]],w:{danh:2},l:{danh:-3},sc:1,g:[6]},{c:{suc:-2},w:{duc:2},sc:1,g:[5]},{c:{bac:-40,duc:-1},w:{tamco:2}}],c1:[{c:{suc:-2},o:[40,["d","danh",4]],w:{danh:3},l:{danh:-2},sc:1},{c:{bac:-30},o:[40,["m","mat",5]],w:{mat:1},l:{mat:-1},sc:1},{c:{danh:-3},w:{tamco:2}}],c2:[{c:{danh:-2},o:[40,["d","hh",4],["d","danh",6]],w:{duc:3},l:{hh:-3},sc:1,g:[10,6]},{c:{tamco:-1},w:{duc:2}},{c:{duc:-2},w:{tamco:2},g:[6]}],t1:[{c:{},o:[40,["d","sung",4]],w:{sung:2},l:{sung:-3},sc:1},{c:{},o:[45,["d","tai",5]],w:{sung:2},l:{sung:-4},sc:1}],x1:[{c:{suc:-3},o:[50,["f","open",10,0],["f","truth",5,0],["d","duc",6]],g:[10]},{c:{},o:[40,["f","trace",10,0],["f","pair",10,0],["d","hh",6]]},{c:{duc:-2},w:{tamco:2},g:[6]}],x2:[{c:{suc:-3},o:[50,["f","open",10,0],["f","truth",5,0],["d","duc",6]],g:[10]},{c:{},o:[40,["f","trace",10,0],["f","pair",10,0],["d","sung",6]]},{c:{duc:-2},w:{tamco:2},g:[6]}],E:{win:{fx:{danh:5,hh:3},k:1},mid:{fx:{bac:-20,duc:2},k:0},lose:{fx:{danh:-6,hh:-4},k:-1}}},
diff --git a/dev/build/jrd_muoi.js b/dev/build/jrd_muoi.js
index e07b6f7a..03d14660 100644
--- a/dev/build/jrd_muoi.js
+++ b/dev/build/jrd_muoi.js
@@ -792,9 +792,9 @@ rdDef("muoi_no",8,{t:"Nợ chồng nợ",w:"v",sj:"những món nợ mới của
  B:{s1:{h:"Cây trâm ngự ban",w:"v",if:RDW(1),need:["v"],t:"Sau Trung thu {v} thở được ít ngày. Rồi ngươi thấy nàng lén cầm cố cả cây trâm ngự ban.",o:[
-  {n:"Hỏi thẳng {v} nợ ai",f:"know",wx:"biết chủ nợ mới",lx:"{v} xấu hổ, đóng cửa không tiếp",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} khai: một thái giám coi kho ở Nội vụ phủ.",rf:"{v} đóng cửa cung, không tiếp ai."},
-  {n:"Chuộc lại cây trâm cho nàng",f:"help",wx:"{v} giữ được trâm ngự ban",lx:"bạc ngươi đi, nợ nàng vẫn còn",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Cây trâm về lại hộp gấm của {v}."},
-  {n:"Ghi lại, chờ xem",wx:"không tốn gì",lx:"nợ nàng lăn thêm một tháng, lòng ngươi áy náy",rt:"Ngươi ghi vào sổ riêng."}]},
+  {n:"Hỏi thẳng {v} nợ ai",to:"c3",tf:"c3",f:"know",wx:"biết chủ nợ mới",lx:"{v} xấu hổ, đóng cửa không tiếp",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} khai: một thái giám coi kho ở Nội vụ phủ.",rf:"{v} đóng cửa cung, không tiếp ai."},
+  {n:"Chuộc lại cây trâm cho nàng",to:"c3",tf:"c3",f:"help",wx:"{v} giữ được trâm ngự ban",lx:"bạc ngươi đi, nợ nàng vẫn còn",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Cây trâm về lại hộp gấm của {v}."},
+  {n:"Ghi lại, chờ xem",to:"c3",tf:"c3",wx:"không tốn gì",lx:"nợ nàng lăn thêm một tháng, lòng ngươi áy náy",rt:"Ngươi ghi vào sổ riêng."}]},
  s2:{h:"{v} tránh mặt",w:"maid",if:RDW(0),need:["v"],t:"{v} tránh mặt ngươi đã lâu. Người của ngươi nghe được: nàng vay cả bạc của một thái giám cho vay nặng lãi.",o:[
-  {n:"Sai người dò chủ nợ",f:"know",wx:"biết kẻ cho vay là ai",lx:"tốn bạc, {v} biết ngươi dò",rt:"Kẻ cho vay là một thái giám coi kho ở Nội vụ phủ."},
-  {n:"Gửi lời: nếu cần, cứ đến tìm",f:"help",wx:"{v} có lối quay lại",lx:"{v} cho là ngươi thương hại, nói khắp nơi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Đêm ấy {v} gửi sang một mảnh lụa thêu, không lời.",rf:"{v} trả lời: “Không dám làm phiền chủ nợ cũ.”"},
-  {n:"Mừng thầm",wx:"kẻ cũ tự sa lầy",lx:"lòng ngươi nhỏ đi",rt:"Ngươi không làm gì."}]},
+  {n:"Sai người dò chủ nợ",to:"c3",tf:"c3",f:"know",wx:"biết kẻ cho vay là ai",lx:"tốn bạc, {v} biết ngươi dò",rt:"Kẻ cho vay là một thái giám coi kho ở Nội vụ phủ."},
+  {n:"Gửi lời: nếu cần, cứ đến tìm",to:"c3",tf:"c3",f:"help",wx:"{v} có lối quay lại",lx:"{v} cho là ngươi thương hại, nói khắp nơi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Đêm ấy {v} gửi sang một mảnh lụa thêu, không lời.",rf:"{v} trả lời: “Không dám làm phiền chủ nợ cũ.”"},
+  {n:"Mừng thầm",to:"c3",tf:"c3",wx:"kẻ cũ tự sa lầy",lx:"lòng ngươi nhỏ đi",rt:"Ngươi không làm gì."}]},
  c1:{h:"Chủ nợ ở Nội vụ phủ",w:"eun",t:"Kẻ cho vay là một thái giám coi kho ở Nội vụ phủ. Hắn cho vay cả chục phi tần, cung nữ, lãi mỗi tháng một phần mười.",o:[
@@ -807,2 +807,6 @@ rdDef("muoi_no",8,{t:"Nợ chồng nợ",w:"v",sj:"những món nợ mới của
   {n:"Dạy nàng cách kiếm bạc",wx:"{v} bán tranh thêu qua hiệu nhà ngươi",lx:"nàng không quen làm ăn, ngươi bù lỗ",rt:"Tranh thêu của {v} bán chạy ở Giang Nam.",rf:"Tranh thêu không ai mua, ngươi bỏ bạc bù."}]},
+ c3:{h:"Thư sinh Giang Nam",w:"maid",t:"Thư nhà kèm một tờ giấy nợ: một thư sinh nghèo ở Giang Nam vay bạc hiệu buôn nhà ngươi để lên kinh ứng thí, nay trọ ngoài cửa thành chờ khoa thi, chưa trả được đồng nào. Cha hỏi: đòi hay thôi?",o:[
+  {n:"Xóa nợ, chúc y thi đỗ",f:"warm",wx:"thư sinh nhớ ơn nhà ngươi",lx:"hiệu buôn mất một món bạc",rt:"Thư sinh gửi vào một bài thơ tạ ơn."},
+  {n:"Cho hoãn, đỗ rồi hãy trả",f:"help",wx:"giữ được nợ mà không ép người",lx:"ngươi lo nghĩ hao sức thay y",rt:"Thư sinh viết giấy hẹn, nét chữ rất đẹp."},
+  {n:"Giữ giấy nợ, đợi y làm quan",f:"hold",wx:"sau này có một vị quan nợ nhà ngươi",lx:"ép người lúc cùng đường",rt:"Tờ giấy nợ nằm sâu trong tráp của ngươi."}]},
  t1:{h:"Lãi quá hạn",w:"eun",t:"Hạn trả lãi đến. Kẻ cho vay dọa sẽ đem giấy nợ của {v} lên Kính sự phòng.",o:[
```
   After it lands: add «Xóa nợ, chúc y thi đỗ», «Cho hoãn, đỗ rồi hãy trả», «Giữ giấy nợ, đợi y làm quan» to muoi_no_4 pull, the first two to muoi_no lean.p, the third to lean.m; rerun ge-guard + `MODES=kind,cruel node dev/measure/ge-measure.js - 2 2 out.json muoi_no sens`.
2. **RECOMMENDED — dtq_binh (jrd_dtq.js) ch7 «yến»: one beat where the world's Vương gia appears**, so dtq_binh_3's follow is seen in the road (he already exists in every life via MROLES, so this is not blocking):
```
 c4:{h:"Vương gia ở vườn ngự",w:"maid",t:"Sau yến, Vương gia dạo vườn ngự, dừng trước cung ngươi hỏi thăm sức khỏe lão tướng quân, rồi nói nhỏ: binh quyền về triều thì nhà tướng quân cần một chỗ dựa.",o:[
  {n:"Tạ ơn, không nhận lời",wx:"giữ khoảng cách với vương phủ",lx:"Vương gia thấy bị khước từ",rt:"Vương gia cười, chắp tay lui."},
  {n:"Mời ngài dùng trà",f:"warm",wx:"vương phủ có thiện cảm với nhà ngươi",lx:"có người thấy ngươi tiếp nam nhân",rt:"Hai chén trà nguội dần bên hiên."}]},
```
### Notes FOR E (not this writer's)
- Same engine family as tt_mat_2/4 «Queen alive»: every FOLLOW ending names a person who could be dead / gone in some lives (Vương gia `alive` flag in S.men, the sứ giặc, the old boatman after ch9 «lose», the Ngự sử of tt_oan_4, the thân binh of dtq_bien_4). One engine term «the followed person alive» (fail-only, like misD) would cover all waves.
- ge-engine cold-run flake above (one run 241/456, reruns 456/456).

## ROUND 1 (E11a, a58b55eb)
LINEAGE: E11a depth 3 · session_01DgYSWmGi5DMjQqQpadvKCr · START_CTX ~3 % (window 1M; get_session reads 0, own estimate) · ended ~22 %.
PRIORITY #1 CHECK ('grand ending'): OD 5 (L1613/L1618/L1623–24/L1601/L1837) | main: engine LIVE a8a10c66 (jgecat/jgedata/jge/jbalge), branch cut from f60b4024 | review/grand-endings-design r3 (catalogue §3: names/pairs/titles taken as fixed) | review/ge-writers-w2 = E11b (not touched) | claims E11a/E11b rows. Reused: jgedata.js pattern, ge-guard, ge-engine, ge-measure (no new tool; two small switches added).

**READY: review/ge-writers-w1 tip a58b55eb** (from origin/main f60b4024). No push to main, no PR. Road files jrd_* NOT edited.

## What
- `dev/build/jgedata_w1.js` (new) = `Object.assign(GE_DATA,{…})` for 11 branches: tt_oan tt_tranh tt_mat · dtq_bien dtq_vu dtq_binh dtq_huynh · muoi_tuoc muoi_lau muoi_doi muoi_no. Per branch lean{p,m} + 4 endings (catalogue order) with pull / close / cond / fo / cw / t / a / ht / ha / fail / ft. Every name is a REAL option of that road (.4–.11) or an "@arc=end" result (@<road>_11=win, @<road>_7=win, @hau14 / @st_the / @st_con / @st_dong / @ke14 =win). No name bleeds into the shared lines (checked).
- Each ending's Chuỗi holds both thiện- and ác-tagged options (E1c fix-4 lesson), so both shading titles are reachable.
- `dev/build/assemble.py`: one line, `jgedata_w1.js` right after `jgedata.js`.
- `dev/build/jbalge.js`: 44 rows each in BAL.ge.gate / fail / rw, INSIDE the BAL.ge literal after the nc_tuc rows (an Object.assign block failed the G1 one-core guard: the same id in gate/fail/rw read as "set 3 times").
- `dev/test/ge-guard.js`: whole-family variety check on the written words — no narration sentence (t/a/ft) used twice across ALL live branches, no fail name twice, t ≠ a (426 lines, 0 repeats).
- `dev/test/ge-engine.js`: optional 2nd arg roads (`all` = every live branch); default unchanged (pilots).
- Site rebuilt (index.html, sw.js, assets.json).

| branch | Chuỗi per ending | Khóa | lean p / m | conditions (BAL.ge.gate) |
|---|---|---|---|---|
| tt_oan | 18 18 17 14 | 4 4 4 4 | 29/20 | duc+danh · tamco+mat · tai+danh · duc + e11 win|mid |
| tt_tranh | 22 19 17 17 | 4 4 4 3 | 33/24 | dad+duc · tamco+mat · duc+tai · sung + seat HH |
| tt_mat | 21 22 17 18 | 4 5 4 4 | 29/23 | sung + seat HH · hh+duc · tamco+mat · duc+hh |
| dtq_bien | 19 21 17 16 | 4 4 3 4 | 27/22 | tai+dad · tamco+mat · son+sung · duc+suc |
| dtq_vu | 23 18 18 22 | 4 5 3 4 | 30/20 | duc+sung · tamco+dad · duc+dad · tamco+danh |
| dtq_binh | 20 22 17 19 | 5 4 4 4 | 31/23 | tamco+mat + seat NDE (fo seatT) · duc+sung · tai+duc · dad+duc |
| dtq_huynh | 20 20 19 16 | 4 4 4 4 | 26/22 | dad+duc · danh+sung · tamco+dad · sac+mat |
| muoi_tuoc | 22 20 20 20 | 4 4 4 4 | 35/24 | tai+danh · son+th · son+tamco + seat THH (fo seatT) · duc+dad |
| muoi_lau | 22 22 17 19 | 5 4 4 5 | 27/22 | duc+danh · tamco+mat · duc+tamco · tamco+danh |
| muoi_doi | 23 22 22 20 | 5 4 4 4 | 31/22 | duc+danh · tamco+dad · sung+danh · tamco+mat |
| muoi_no | 24 24 20 16 | 4 5 3 3 | 34/29 | tamco+mat · duc+danh · duc+dad · duc+tai |

## Tests (tip a58b55eb)
- `node dev/test/ge-guard.js` **6/6** (catalogue ERRORS 0, jgecat generated, all 14 live branches' names real, gates/rw/fail rows, no digit/% in player text, titles in DH_CAT, narration variety).
- `node dev/test/ge-engine.js - all` **456/456** (every live branch: init, old save, pull, close, lean, Hồi, win+shade+reward+Kim sách+title+Bảng, fail, quiet, odds, map, panels).
- `bash dev/site/build_site.sh` OK · `bash dev/tools/quickcheck.sh` ALONE **PASS** (core gates PASS, time-spill PASS, open 1511 ms 0 errors, old save ok; perf new/live render 234/274, tab 507/544, buổi 1040/1439, tasks>200 21/22).
- Shots: none (no new UI, per brief).

## Measure (`MODES=kind,cruel node dev/measure/ge-measure.js - 2 2 m1.json <11 roads> sens`, 44 lives, PAR 2, 44/44 ok, page errors 0)
| road | lives | open .8 | open .11 [1,2.6] | kind→thiện ≥.70 | cruel→ác ≥.70 |
|---|---|---|---|---|---|
| tt_oan | 4 | 2.50 | 2.00 IN | 1.00 IN | 1.00 IN |
| tt_tranh | 4 | 2.75 | 2.50 IN | 1.00 IN | 1.00 IN |
| tt_mat | 4 | 2.50 | 1.75 IN | 1.00 IN | 1.00 IN |
| dtq_bien | 4 | 3.00 | 2.50 IN | 1.00 IN | 1.00 IN |
| dtq_vu | 4 | 2.75 | 1.75 IN | 1.00 IN | 1.00 IN |
| dtq_binh | 4 | 2.25 | 1.75 IN | 1.00 IN | 1.00 IN |
| dtq_huynh | 4 | 2.25 | 2.25 IN | 1.00 IN | 1.00 IN |
| muoi_tuoc | 4 | 3.50 | 2.25 IN | 1.00 IN | 1.00 IN |
| muoi_lau | 4 | 2.75 | 2.00 IN | 1.00 IN | 1.00 IN |
| muoi_doi | 4 | 2.75 | 1.75 IN | 1.00 IN | 1.00 IN |
| muoi_no | 4 | 3.00 | 2.25 IN | 1.00 IN | 1.00 IN |
| all | 44 | 2.73 | 2.07 IN | 1.00 IN | 1.00 IN |
Lean of the lives: kind lt +4..+20 (lean +15..+85), cruel lt −6..−18 (lean −22..−71).
**Note for Foreman E (not tuned, engine-level):** aimed-bot win rate 39/44 = .89, above BAL.ge.target.inChar [.30,.60] — the sensible month bot drives most stats to 100, and long Chuỗi (pull ≥ 8) cap the odds at 88; the pilots showed the same (E1b run 4 .63 aimed-only). The 5 misses were the 12-odds cap on unmet conditions (son ×3, hh ×1, dad 19/20 ×1). If the band must hold for aimed bots, tune BAL.ge.odds (per / max) once for all branches, not per writer.
Fix made from the measure: tt_mat_2 / tt_mat_4 queen-favour gates hh 40 / 20 → 20 / 10 (hh sat at 0 in those lives).

## Notes / FOR E
- HH endings (tt_tranh_4, tt_mat_1) use cond ["seat","HH"] WITHOUT fo seatT HH: geSeatTaken("HH") is true whenever a queen sits, and geLive at the .4 end would make the ending fail-only for good before she can win hau14. With cond only, the odds are capped while a queen sits and open once she is queen herself (@hau14=win pulls). cnv_mat_2 (pilot) has the fo — worth one decision for all HH endings.
- Merge with W2: assemble.py (one line each after jgedata.js) and jbalge.js (rows after nc_tuc in gate/fail/rw) will conflict textually with E11b; keep both blocks.
- FOR B: none — every ending has real thiện and ác paths on its road; no road patch needed.

## HANDOVER (E11a → successor) — DONE by E11a2 (fix round above, 46aeac92); kept for the record: — 18/11 ~17:55Z, rollover by context (START_CTX ~3 %, now ~24 % of 1M; the 4-fix round would cross START_CTX+25 %)
Fix order from Foreman E ROOT #5 (session_01DgYSWkmGWJMooE69PH8bHk, report to it): review E11r-w1 on a58b55eb = FAIL, 4 fixes — read **dev/handover/reports/ge-writers-w1-review.md §«FIXES (worker, whole family each)» verbatim** and the 18 laws at the top of dev/rules/START_CORE.md. NOTHING of the fix round is started; branch tip is still **a58b55eb**.
Summary of the order: (1) law 6(b) real people — dtq_binh_3 (vương gia), dtq_huynh_4 (vương tử bên kia ải), muoi_no_4 (thư sinh), muoi_lau_3 (con trai lão lái thuyền), tt_mat_3 (tiểu cung nữ) + scan all 44: rewrite onto people the road already has (cast: {v}, {v2}, {eun}, {maid}, {man}, cha, huynh trưởng, mẹ, chị dâu, lão lái thuyền, thị vệ, phó tướng/thân binh, Ngự sử…); a new person only via «FOR B» road patch + tell E; (2) rename tt_tranh_3 fail «Không đi không ở» (clash W2 cn_than_3), reword dtq_binh_2 cw (= pilot tt_co_2 cw); stricter variety check over pilots+W1+W2 → 0; (3) tt_mat: one form for the Queen (Hoàng hậu / nàng ta) everywhere, tt_mat_1 must not retire to Từ Ninh cung (Thái hậu's) — scan all 44 palace names; (4) ONE test block shared with W2: base = origin/review/ge-writers-w2 dev/test/ge-guard.js + ge-engine.js (W2 units: t/a/ft sentences, ht/ha/cw/fail, case-blind) + my «t = a» check; ge-engine = CLI `all` + GE_ROADS env fallback; push, send sha to E so E11b2 copies it verbatim. Not ours: tt_mat_2/4 «Queen alive» term (Foreman E queue).
How to work (what I used):
- Worktree: `git worktree add /home/user/wt/gew1 -B review/ge-writers-w1 origin/review/ge-writers-w1` (fetch it `--depth=30` under flock), `git sparse-checkout set --no-cone '/*' '!/dev/shots/' '!/dev/owner-shots/' '!/dev/figwork/'`, `bash dev/site/hooks/install.sh`.
- Data: dev/build/jgedata_w1.js (all words); BAL rows inside BAL.ge gate/fail/rw after nc_tuc (keep them there — G1 one-core guard).
- Real option names: dump ARC67 in the built page (`ROAD14[road]` → arc ids; `ARC67[id].B[beat].o[].n`); my scratch scripts were deleted — a 30-line playwright evaluate does it (pattern: dev/test/ge-guard.js optNames).
- After edits: `python3 dev/build/assemble.py` → `node dev/test/ge-guard.js` → `node dev/test/ge-engine.js - all` → `bash dev/site/build_site.sh` → commit index.html/sw.js/assets.json → `bash dev/tools/quickcheck.sh` ALONE. Words-only fixes do not need a new measure (lean/pull lists unchanged); if a Chuỗi/lean list changes, rerun `MODES=kind,cruel node dev/measure/ge-measure.js - 2 2 out.json <roads> sens` for those roads (PAR 2, ~3 min/life).
- Then before/after table per fix in this report, CLAIMS row, FOREMAN_E_STATUS line, «SẴN SÀNG KIỂM ge-writers-w1 <sha>» to session_01DgYSWkmGWJMooE69PH8bHk.

## §ROUND 5 REMERGE (E11w1m, 18/11)
- review/ge-writers-w1 now **dca5550f** (was fd7c6775); merged origin/main **13bb8c88** (shop-panel-r3). No content changes.
- Conflicts: only the built files index.html + sw.js (both sides rebuilt). Source auto-merged clean; assemble.py keeps main's list + `jgedata_w1.js`. Resolved by taking main's copy and regenerating with `bash dev/site/build_site.sh` (no hand edits); conflict markers 0.
- Tests on dca5550f: ge-guard **6/6** (ERRORS 0) · ge-engine `- all` **456/456** · one-core-guard **PASS** (fails 0, inline 4001 vs baseline 4212) · shop-panel.js (main's r3 test, file:// build) **28 PASS / 0 FAIL** · muoi_no measure (`MODES=kind,cruel ... - 2 2 out.json muoi_no sens`) 4/4 lives ok, page errors 0, inChar .50 IN, open11 2.25 IN, kind→thiện 1.00 IN, cruel→ác 1.00 IN · quickcheck ALONE **PASS** first run (core gates PASS, time-spill PASS, open 1354 ms, old save ok, buổi 1297/1248 ms new/live, render 194/215, tab 343/382). No jrd_muoi-named test file exists; covered by ge-engine/ge-guard/measure.

## §ROUND 6 REMERGE (E11w1m2, 18/11)
- review/ge-writers-w1 now **a7e6199** (was dca5550f); merged origin/main **790cda5d** (map-labels-missing r2d), passing through fa411d6f (ag-deed-perf r6 / kit-subtabs-overflow) at b02879d. Main moved during the run, so it was merged twice. No content changes.
- Conflicts: only the built files index.html + sw.js each time. Source auto-merged clean; assemble.py keeps main's list + `jgedata_w1.js`. Resolved by taking main's copy and regenerating with assemble.py + `bash dev/site/build_site.sh` (no hand edits); markers 0.
- Tests on a7e6199: ge-guard **6/6** (ERRORS 0) · ge-engine `- all` **456/456** · one-core-guard **PASS** (fails 0, inline 4001 vs baseline 4212) · subtabs-overflow.js (main's test, fold+pixel) **PASS no overflow, no overlap** · muoi_no measure (`MODES=kind,cruel ... - 2 2 out.json muoi_no sens`) 4/4 lives ok, page errors 0, inChar .50 IN, open11 2.50 IN, kind→thiện 1.00 IN, cruel→ác 1.00 IN (the earlier run on b02879d read inChar .75 OUT = the known engine-level note, sample-size noise at 4 lives) · quickcheck ALONE **PASS** first run (core gates PASS, time-spill PASS, open 1565 ms, old save ok, render 243/247, tab 414/413, buổi 1134/2395 new/live — live-side outlier, not a regression).
- Pushed with main 790cda5 already contained (fetched right before the push).

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>
