# mood-seal-2 report (sonnet worker, MAIN CHÍNH 87, OWNER mark #68, 21/11)
PRIORITY #1 CHECK: OD L2157 (#68) + #39 | main jemoseal (live seal part), jk2b kitSceneArt o.mark (KIT 28.19b), jevb emoBoxArt | review/* mood-seal (#39, landed 607a6b12) | CLAIMS row mood-seal-2.
Branch review/mood-seal-2 @ b03e2002, base review/mood-seal 62f4b11e (= #39 fix; rebase onto LIVE with 607a6b12 is trivial: same files, no overlap with it). No new style: existing kit seal part only.

## What she asked
Every emotion-driven event dialog (Khóc suốt đêm, Trốn trong phòng, …): the emotion seal on the TOP-RIGHT corner of the event picture, animation starting at once on pop-up, no waiting.

## Changes
- jk2b kitSceneArt: the corner mark is now the LIVE kit seal (img.kemo, data-kemo-now) when the mark is an emo-*.webp (any other mark stays the still <i>). CSS keeps it top-right, size clamp(46px,9vmin,80px) within the picture height; !important picture rules (kdper banner, kaart, jksize, jpdlg) exclude .ksart-mark.
- jemoseal: a data-kemo-now seal leans ONCE the moment it stands still (two samples 50 ms apart, ≤ ~0.8 s; the dialog is popping in) instead of the 0.7 s openDelay; the figure seal of the same dialog keeps its own random lean (one seal at a time); never sets the shell's once-flag.
- jksize live frame: keeps the seal element through every re-lay (size pick loop rebuilt the picture 10+ times → motion restarted); the seal's own load no longer re-lays the frame (loop guard); kszLiveMark3 reads img src and falls back to emoEvMark.
- jevb emoEvMark(m) + kitEvArt wrapper + jk4 kitEventStage + jk2b kitEvArt slot: any event with m.emoSeal={k,who} gets the seal (a feeling without a painted still, khoc, walks to buon).
- Tags m.emoSeal on every event that comes from a feeling: jfeel feelMeShow (Khóc suốt đêm, Trốn trong phòng, Bỏ dở việc, Cáo bệnh, Không tiếp, Cáu gắt, Ngồi thừ, Nói móc, …), jemoact eaMeOut + Mắng cung nữ pick, eaHitMe (9 kinds: châm chọc, ban thưởng, Long nhan đại nộ, Thái hậu quở trách / thiên vị, nghi kỵ …), Cung nữ bị ức hiếp, đến hỏi tội, extreme mood (Ưu uất, Lỡ lời, Đắc ý, Lo âu mất ngủ).
- #39 mood frames use the same part, so they now move too.

## Whole group scan (law 11) — dev/test/mood-seal-ev.js, 12 cases x Fold 755x1000 + iPad 1180x820
Before (main/62f4b11e): no emotion event had any seal. After: 24/24 cases: seal in the picture's top-right corner, dialog fits, seal lean starts 210–790 ms after the dialog is queued (dialog build + image decode included), 0 page errors.
Cases: khoc, tron, chan (Bỏ dở), hot-cham, emp-noi, emp-ban, th-quo, th-tvui, emp-egian, out-gian (Đập đồ / Mắng cung nữ), out-buon (Khóc suốt đêm / Gửi thư nhà), ext-so.
#39 scan (dev/test/mood-seal-scan.js): 20/20 markIn true, incl. «Ta» (a rule hit it: fixed).
LOOKED 3× (Fold: Trốn trong phòng, Lo âu; iPad: Khóc suốt đêm, Long nhan đại nộ, Tâm trạng · Ta).

## Tests
quickcheck b03e2002 PASS (core gates, time-spill, old save, perf ≈ live); coop-e2e 68/68; emo-seal-persist fail 0; fig-seal ran, errs [].
Open note: emo-khoc.webp is not painted on the CDN (404) → Khóc shows the Buồn seal until it is painted (the walk is automatic). Test hooks added: window.eaHitMe / eaMeOut / eaS (used only by the scan).

~100% xong / ~100% chơi được (mục này).
