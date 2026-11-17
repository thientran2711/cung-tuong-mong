PRIORITY #1 CHECK: OD ~14:50Z (2), ~15:25Z (4)(5) | main none | review/* ag-all-2 aa92bbf9 + tinbao-ui e988d2e9 | claims tinbao-ui worker.
# review tinbao-ui r1 — FAIL (small)
Rebased review/tinbao-ui onto the NEWEST ag-all-2 aa92bbf9 (clean) -> review/tinbao-ui-r1 (site rebuilt, pushed). tinbao-ui.test 19/19 PASS, no page errors. quickcheck: perf PASS (render 205/193, tab 329/331, buoi 1061/761 = noise, live runs span 717-1115), old save ok; NOT BUILT fixed by the committed rebuild. G1 frozen list FAIL 5093->6691 inherited from ag-all-2 (judged there); one-core-guard inlineNow 6521 on both ag-all-2 and tinbao-ui = tinbao adds 0.
PASS: kit parts only (no private frame), badge count = tinBaoNew (data-n), blinks/calm/absent, toast once per item, gold, ~3 s, one sound, no modal, top bar buttons not hidden (toast under bar; over place header on Fold, over chip row on iPad, fades), no %, old save / API missing / S null no crash, geometry 5 viewports, "Để ta tới xem" opens Du do.
## FAIL items
1. Card rows do not show the informer's name/role. Brief: "informer portrait (pframe) + name/role". Rows show only a small portrait + "<place>: <line>"; the name ("Thái giám Tiểu An Tử") appears only in the toast. Add the informer name (+ role) to each row (kit person row), "Tai mắt" for the own-ears rows.
2. The big left figure on the card is an unrelated person (Quản sự ma ma Diệp Thanh Hòa, both Fold and iPad saves) while the row portraits are the informer (a eunuch servant). Reads as if she brought the news. Figure must be the informer of the first/unseen row (kit rule OD:L448) or none; find why kitFacts/kitModal picks her.
3. Minor: place is printed twice in a row ("Ngự hoa viên: Bẩm chủ tử, Ngự hoa viên đang có chuyện") when the line already names the place; show the place once (header or prefix).
4. Minor (iPad 1180x820): the count tag "4" touches the "Buổi sáng" text of the bar; give it 2-4 px more air or take the next free spot.
Shots (scratch, Fold 755x1000@2 + iPad 1180x820@2, direct mode; host mode stuck on the first-run download card in this sandbox) looked at; worker CDN folder wiped with this verdict.

# r2 re-review — PASS 05e82176 (review/tinbao-ui-r2r = worker r2 a0327a6b rebased on NEWEST ag-all-2 72263137; ag-all-2 had grown, built files regenerated)
Items 1-4 fixed and LOOKED at (Fold + iPad): informer name+role per row (kitName), big figure = the informer (Cung nữ Lạc Mai), place printed once, count tag moved to the left, clear of "Buổi sáng". tinbao-ui.test 19/19, quickcheck PASS (perf render 242/203, tab 331/317, buổi 1135/1122, tasks>200ms 14/14, old save ok). one-core-guard PASS (fails 0). QUICKCHECK G1 one-core-text FAIL is inherited from ag-all-2 head (sites in j2/j9/j10/j42/jpromsv/jagknow "chứng cứ +1"; none in jtinbao): judge in ag-all-2 review. Worker CDN shots wiped.

# r3 re-review — PASS 47a462ca (review/tinbao-ui-r3r = worker r3 84152ddc (= r2 + card title "Tai mắt báo", owner (e)) rebased on NEWEST ag-all-2 986f797a, site rebuilt)
Title shown, looked at (Fold). tinbao-ui.test 19/19, one-core-guard PASS (fails 0), old save ok. quickcheck G1 one-core-text FAIL still inherited from ag-all-2 (none in jtinbao); perf single run buổi 1845 vs live 1067 is single-run noise (r2 3-run median 1135/1122, no tinbao code on the buổi path). Worker CDN shots wiped.

# r3b review (worker 44500057: "Tai mắt báo" header + kitTaiMatCard + informer kind, ONE adapter, stub) — FAIL
Rebased on NEWEST ag-all-2 275efe22 (my helper branch review/tinbao-ui-r3br d409b92c: r3b source + KIT §87/87.1 + build; use it as the base for the fix). tinbao-ui.test 22/22. Looked at Fold (Tai mắt card) + iPad (Tin báo card).
FAIL items:
1. ONE CORE: one-core-guard FAIL "NEW inline rule number: jtinbao.js [ladder] n>=70?..:n>=40?.." (LOYW). Use BAL.loy.trust (70) and BAL.loy.low (40) (both exist in jbal.js:301). ag-all-2 alone = PASS, so jtinbao adds it.
2. TRUTH (owner ~15:25Z (4), and her 16:25Z question "có phải thực sự là những tai mắt này không"): the STUB tbTaiMat() invents who her Tai mắt are (her servants by lòng, "đặt ở Ngọc Thanh các") and the card prints it as fact ("một lòng với ta" etc.). If taiMatList is not shipped, the Tai mắt card must NOT list invented people: either do not intercept the tap until taiMatList() exists (old behaviour stays), or show only the true count with no names. tbInformerKind stub from the item's `by` is fine (by is real).
3. Minor: iPad card button "Để ta tới xem" wraps to two lines next to its picture (narrow option); give the option its normal width or shorten.
4. Minor: Fold Tai mắt card, 3rd row (the confidant maid) shows the kit placeholder-picture frame (image not loaded at shot time, or her portrait path missing): re-shoot after load and confirm it is her portrait.
G1 one-core-text (quickcheck) still only the ag-all-2 sites. Worker CDN shots wiped.

# r4 review (worker 55294eaf = r3b code on r3r 47a462ca) — FAIL: adapter does not match the REAL 2f API now in ag-all-2 7de949ee
Helper base (newest ag-all-2 7de949ee + r4 source + KIT §87/87.1 + build): origin/review/tinbao-ui-r4r 76b93af6. Against it tinbao-ui.test = 20/22 (2 FAIL), one-core-guard FAIL.
Probe with the REAL taiMatList/informerInfo (a rival's servant set spyFor "me"): taiMatList → {id,sid,name,role,placedAt:"kn",placedWith:"v1",placedName,loyaltyKnown:null,reports}; informerInfo → {kind:"taiMat"|"ownMaid"|"friend"|"passerby", isTaiMat, soldOutKnown}.
FAIL items (all in the adapter, jtinbao.js):
1. tbNorm reads x.place / x.loy / x.loyal; the API gives placedAt / placedName / loyaltyKnown. Result: the card prints "đặt ở Ngọc Thanh các" (HER OWN palace, palaceOf(S) fallback) for a servant placed in Diệp Linh Lung's palace (kn). Map place ← placedAt (+ placedName "ở cung <name>"), person ← servById(sid) (portrait), role/rank from the person.
2. Loyalty: loyaltyKnown null (= she does not know) is printed as "khó tin" (the 0-lòng fallback) — a false statement. null → "chưa rõ lòng"; a number → word by BAL.loy.trust / BAL.loy.low (see 4). Never read the servant's hidden .loyal.
3. tbInformerKind returns the raw API kind ("taiMat","ownMaid","friend","passerby") with label "" (KL has no such keys). Map taiMat→mat, ownMaid→hau (soldOutKnown → "sold"), friend→ban, passerby→qua; "here"→tai stays. Fixes the 2 failing tests (informer kind per row, Tai mắt list).
4. ONE CORE: LOYW hard-codes 70 / 40 → BAL.loy.trust / BAL.loy.low (ag-all-2 alone PASS).
5. Still open from r3b: iPad "Để ta tới xem" wraps to 2 lines; re-shoot Fold Tai mắt card after images load (3rd row showed the placeholder frame). Drop the stub branch once the real API is used (taiMatList exists now) or keep it only when typeof taiMatList!=="function".
Worker CDN shots wiped.

# r5 review (worker 30bb1851) — FAIL (2 small items left); helper base origin/review/tinbao-ui-r5r c7214b04 = r5 on NEWEST ag-all-2 f4a065dc + built
Real 2f API now used: Tai mắt card LOOKED at (Fold): "Cung nữ ??? · đặt ở Càn Ninh cung (người của Hoàng hậu Lâm Tú Uyển) · chưa rõ" = correct place, unknown lòng = "chưa rõ", unknown name = the kit's standard ??? silhouette (so the "placeholder" of r3b was this standard unknown form: OK). iPad "Để ta tới xem" now one line: OK. Test 22/22 (one geometry check 390x844 failed once with hit:1, passed on 2 reruns: flaky, watch).
Your 4 r3b items: placeholder OK; button wrap OK; invented names when API absent: STILL FAIL (below); one-core loyalty ladder: STILL FAIL (below).
FAIL items:
1. ONE CORE: jtinbao.js line 60 const LOYW=n=>n>=70?...:n>=40?... -> one-core-guard "NEW inline rule number jtinbao.js [ladder] (0 -> 1)"; use BAL.loy.trust / BAL.loy.low (ag-all-2 alone PASS).
2. NO INVENTED NAMES: tbTaiMat() still keeps a fallback that lists her own servants by lòng as "Tai mắt" with placedAt = her own palace and reads the hidden s.loyal when taiMatList is absent. Make it return [] (the card then prints "Chưa có ai chịu làm tai mắt cho ta." or the tap is not intercepted); no stub list.
3. Minor: Tin báo row prints "Thái giám Tiểu Quý Tử (Người hầu Tiểu Quý Tử)": the API label (knInfUi: KN_INFL[code]+" "+name) repeats the name next to kitName(p). Print KL[code] ("người hầu của ta" / "tai mắt của ta" …) when a person frame is shown, or strip the name from label.
Worker CDN shots wiped.

# r6 review (worker d685a491) — PASS 220359da (origin/review/tinbao-ui-r6r = r6 on NEWEST ag-all-2 4baf13f3, site rebuilt; descends from ag-all-2; supersedes 47a462ca)
r5 items fixed: LOYW ladder gone (words from the API) -> one-core-guard PASS (fails 0); tbTaiMat() returns [] without the API (no invented names; tap not intercepted without taiMatList); Tin báo row prints "Cung nữ Tiểu Hoa (người hầu của ta)", no repeated name. LOOKED at (Fold + iPad): Tai mắt card (place "Càn Ninh cung (người của Hoàng hậu …)", name ??? standard unknown, "chưa rõ"), Tin báo card (title "Tai mắt báo", button one line). tinbao-ui.test 22/22 twice, quickcheck perf PASS (render 215/135, tab 303/309, buổi 989/886, old save ok). Quickcheck G1 one-core-bind FAIL = ag-all-2 sites only (j25/j78 evRun), none in jtinbao. CDN shots wiped.
