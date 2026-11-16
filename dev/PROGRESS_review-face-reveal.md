# PROGRESS — review/face-reveal (owner 15/11 ~21:00Z, LUẬT SỬA CẢ NHÓM)

Base: origin/main 4e37161c0 (ts-a merged; its k61Meet sets S.met — reused).
Task: she learns a face whenever THAT PERSON appears to her in an event dialog (not only when she approaches). Same class: Thái hậu grey in
dialogs while the stage shows her face; the Emperor grey in summons / lake-trip / festival invitation cards.

## What changed (dev/build/j61.js only)
- `k61Shown(m)` at showModal (replaces the old "someone speaking to her" hook, which only fired for UNNAMED people, so public figures —
  Hoàng thượng, Thái hậu, Hoàng hậu, children — and named-but-unmet consorts never got a face): every Q item that carries a person
  (`who` / `who2` / `stage` / `faces` / `kit.subject` / `kit.stage`) reveals that person BEFORE the dialog draws: face level ≥ 1 and, for a
  consort, met (k61Meet → S.met); name level ≥ 2 when the person speaks to her (options + `who`) or the dialog text names them.
  One hook covers every builder: PEND/mkP, pushDil, j67 arcs (who67), j68 events (e68Push), j71 merit/festival (MF), j72 offers, jtoil
  reactions, j92 gifts in person, j70 schemes, jstip, jmen, saved Q items (deserQ → WHO(w)).
- `k61Own(e)`: her own household (maid, servants hired later, her children born later) is always fully known (servants hired after day 1
  were "Thái giám ???" in her own guard-order / spy-report dialogs).
- Old saves: `k61Backfill()` once on load (S.k61bf): a consort named by the old hook ("… đến tận nơi nói chuyện với ngươi", "tự đến gặp",
  "tự tìm đến" in S.logs) is marked met. Old saves without S.known keep the old rule (everyone level 3). Pending dialogs reveal on show.
- Kept strangers (only MENTIONED, not shown): news / Tuần lục fact rows, tuyển tú roll (j27:56), marriage-candidate rows (j54/jht),
  spy reports with `who:{w:[…]}` only (j40/j43: no face is drawn there), contest result rows, rumours.
- KIT.md §49.3b documents the rule. Tests: dev/test/stranger-sweep.js (live dialog moved to the end: the dialog now reveals; asserts
  face shown + met + face everywhere afterwards).

## Scan (dev/test/face-reveal-scan.js, bot dev/measure/inpage4.js, 2 seeds × 14 steps, all origins)
| | dialogs | with a person | strangers shown | revealed by the dialog | still grey after the dialog |
|---|---|---|---|---|---|
| before (main 4e37161c) | 3043 | 1749 | 75 | 45 | 30 |
| after | 2875 | 1657 | 68 | 68 | 0 |

Per site (before line numbers of modules assembled after j61 are shifted by the j61 growth; match by title). After: the Emperor sites show
"-" because his first dialog already revealed him earlier in the life.
| site | example title | people kinds | before: strangers shown / revealed / still grey | after |
|---|---|---|---|---|
| j24.js:37 | Kẻ hầu xin | consort,emp,eun,kid,maid,man,phys,th,tq | 37 / 27 / 10 | 30 / 30 / 0 |
| ? | Nhập cung | consort,emp,eun,maid | 3 / 0 / 3 | 3 / 3 / 0 |
| j71.js:405 | Tết Đoan ngọ · Lễ | consort,emp,th | 3 / 0 / 3 | 1 / 1 / 0 |
| j8.js:249 | Chuẩn bị thị tẩm | emp,th | 2 / 0 / 2 | - |
| j71.js:406 | Hội Phượng · Lời mời: Thi vẽ t | emp | 2 / 0 / 2 | - |
| j8.js:244 | Thánh thượng ban thưởng | emp | 2 / 0 / 2 | - |
| j68.js:82 | Kẻ hầu | consort,emp,eun,maid,phys,th,tq | 3 / 1 / 2 | 2 / 2 / 0 |
| j72.js:132 | Việc nhờ | consort,emp,maid,man,off,th | 6 / 5 / 1 | 8 / 8 / 0 |
| j3.js:22 | Việc khó xử | consort,emp,eun,maid,man,off,other,th,tq | 6 / 5 / 1 | 10 / 10 / 0 |
| j31.js:23 | Hội Phượng | emp | 1 / 0 / 1 | - |
| j71.js:386 | Thi tài ngày Thất tịch | emp | 1 / 0 / 1 | - |
| j92.js:209 | Thánh thượng ban thưởng | emp | 1 / 0 / 1 | - |
| jtsb.js:2 | Điềm lạ quanh cung | consort | 1 / 0 / 1 | - |
| jstip.js:91 | Bổng lộc bị cắt xén | eun | 2 / 2 / 0 | - |
| j70.js:397 | Phòng bị | maid | 4 / 4 / 0 | - |
| j75.js:84 | Thái y bắt mạch | phys | 1 / 1 / 0 | - |
| jtoil.js:343 | Thái hậu khen | consort,emp,th | - | 2 / 2 / 0 |
| j70.js:419 | Phòng bị | maid | - | 5 / 5 / 0 |
| jstip.js:113 | Bổng lộc bị cắt xén | eun | - | 2 / 2 / 0 |
| j70.js:260 | Mưu hại | consort,eun,maid | - | 2 / 2 / 0 |
| jtsb.js:24 | Điềm lạ quanh cung | consort | - | 2 / 2 / 0 |
| j75.js:189 | Kính sự phòng | eun | - | 1 / 1 / 0 |

Grey left in dialogs after the fix = people only mentioned in fact rows (news "Tin trong cung", contest results, quoted others, tuyển tú roll).
Static list: `python3 dev/test/face-reveal-sites.py --md` (254 queue sites, 80 carry a person field on the same line; multi-line builders are
caught by the dynamic scan).

## Live checks (dev/test/face-reveal-shots.js: stranger consort visit, Thái hậu summons, Emperor lake summons; then Hậu cung strip)
755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390: all three dialogs draw the REAL figure (no unknown-*), face + name known after,
consort met, strip/figure real afterwards, no page errors, no horizontal overflow. 390x844: loading screen, rotate prompt not shown
(pre-existing, noted by small-bugs-2 too). Old save from main loads and plays 12 weeks (ts-oldsave.js); backfill unit check OK.
event-dp.js 1180: unchanged layout numbers.

## Notes / overlap
- review/small-bugs-2 (in review) makes Hoàng thượng + Thái hậu met from day one (k61SeedChiTon). Compatible: with it the stage plaques
  are also faces on day one; this branch makes ANY person's first dialog reveal them. Merge: both edit j61 near k61InitNew/normAll
  (different lines).
- Site rebuilt (dev/site/build_site.sh).

## Review r1 (review/face-reveal-r1, merged onto origin/main e5a327d1)
Merge: only generated files conflicted (index.html, sw.js, assets.json) -> took main's and rebuilt. small-bugs-2 (k61SeedChiTon) not on main yet.
Reviewer fixes (dev/build/j61.js, j79.js, jevb.js):
1. WHEN: j68 `evGate` is assembled BEFORE j61, so it ran INSIDE the j61 showModal wrapper: k61Shown(Q[0]) revealed / met the person of an
   optional event that evGate then held or dropped (never drawn). Repro: stranger-sweep live dialog was held -> shown:false but met:true.
   Now the reveal runs right after evGate (wraps evGate), with a fallback in showModal when j68 is absent / an item was missed.
   Test: stranger-sweep `heldNoReveal` {shown:false, met:false}; `dialogReveal` {shown:true, face:true, met:true}.
2. Look-up panels she opens herself (kitIntelPanel "Đã biết về X", kitEvidencePanel "Chứng cứ về X", mood box "Tâm trạng · X") went
   through kitPanel -> Q -> showModal with `subject` = the person: opening one on an unmet stranger made her met + face known.
   Now these specs carry `look:1` and k61Shown skips them. Test: dev/test/face-reveal-look.js (before: st 0->1, met true; after: unchanged).
KIT.md §49.3b notes both rules.
