# Report: review/story14-p1 (phase 1 of dev/STORY_ROADS_PLAN.md) — SẴN SÀNG KIỂM 5a1a450

Plan: dev/STORY_ROADS_PLAN.md (handover branch) — frame, phases 1–6, art SAMPLE list for main (no art made here), NPC roads incl. men
(OD:L1243/1252/1264), OD:L1247/1250/1251/1253/1259 written in, verbatim OD lines in the appendix.

## Built (review/story14-p1, from origin/main 0c23da4)
- `dev/build/jst14.js` (after j67.js; no j67 line changed). NEW lives only (`S.st.f14`, `S.st.v2=4`); old saves keep their frame.
  - 14 chapters: 1–3 Nhập cung học việc (nhap14, sung14, tap14; cnv gets len14 in part 2), 4–11 Truyện xuất thân (rolled road first,
    then the origin's other 3 premises, shared arcs, Gây dựng thế lực), 12–14 Ngôi Trung cung (st_dong/st_con/shared, hau, ke).
  - Road rolled at đầu thai, fresh premise first (ctm-arcs history), opens ch4. A chapter that cannot run → shared arc (numbers stay 1..14).
    Thanh mai trúc mã chapters (j96/jkc splices) moved into part 2, frame kept at 14.
  - Tutorial: closing by time limit = "Lỡ dịp", NO Danh, NO item; reward only when a real step is done.
  - OD:L1247: hostile arc roles cast from live consorts who are not her friends; both sides thiện cảm ≤ -15, oán up (relAdd);
    td family enemy S.foe = that live consort, hostile both ways.
  - OD:L1253: chancy story odds ±15 by this life's context; endings that no roll decides can move one step with a 5–40/100 chance by context.
- `jgoal.js` kitGoalDetail: section "Đời người · 14 chương" (kitRows). `jtabs.js` Mệnh truyện chips (kchip) "Chương n/14 · part", "còn N chương".
  Servant panel67 same words. Kit parts only; no new CSS. No KIT REQUEST.

## Tests (all PASS, 0 page errors)
- dev/test/story14-frame.js: sensible bot 40×300 iterations (+ its save round trips); fast story bot over all 9 origins walks chapters
  1..14 in order, tutorial first, road opens ch4, origin ending told (~120–135 months); tutorial reward rule both ways; L1247 checks;
  L1253: 14 lives × fixed first-option path → 10/11 arcs end 2+ ways, same option different odds in 36/60 beats; detail + tab text;
  old save from main build and from frame-off load, keep old frame, play 60 buổi.
- dev/test/story14-view.js: 755x1000 and 1180x820 — tab chip, chapter detail rows, no overflow, no page errors.

## Notes / follow-ups
- review/chapter-detail-r1 (jchap.js, queued) touches jgoal/jtabs too: my hooks are 2 small blocks, merge should be trivial.
- Option preview "kết: …" for sure-ending options can now be off by one step (L1253 shift) → wording to decide in phase 2.
- j67 chapter/milestone rewards still gain-only (gain-and-loss pass = phase 2/3, balance = phase 5).
- Hostility detection is a keyword scan of the arc text (F14HOST); a per-arc role table belongs to phase 3 content.
