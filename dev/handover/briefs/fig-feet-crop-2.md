# fig-feet-crop-2 — OWNER BUG 17/11 ~02:00Z (s28): figures lose their feet in dialogs, AGAIN

Owner (verbatim): "Để ý nha, mấy cái hình này hình nào cũng bị crop mất chân hết trơn."
Shots she circled: dev/handover/refs/owner-feet-crop-viec-fold-1117.jpg (Fold 755x1000) and owner-feet-crop-viec-ipad-1117.jpg (iPad 1180x820):
the VIỆC "Kính sự phòng" timed-choice dialog (night flip, 'Còn 22 giây'), left figure column — eunuch's hem/feet cut at the bottom on BOTH sizes.
Same complaint already ruled on 16/11 21:05Z (OD:L1459: "full body incl. feet/shoes never cropped … feet must show in every frame — kit figure frame").
A fix went live (fig-cutout-code-r2 PASS 8fb59e05: jk4.js kitDpFit for person dialogs) — but this dialog still cuts. So the fix does not cover
every dialog kind, or kit-size-10 (timed clock chip, live 7abaf07ac) / the VIỆC choice path bypasses kitDpFit.

Role: kit keeper worker (sonnet, UI). Branch review/fig-feet-crop-2 from origin/main 7abaf07ac. Report dev/handover/reports/fig-feet-crop-2.md on the handover branch.
READ FIRST: dev/rules/START_CORE.md + START_WORKER.md (handover branch) in full; dev/kit/KIT.md §32.7 / §33.6 (person dialog / figure column) + kit-size-10 report.
LAWS: LUẬT KIT TRƯỚC (fix only inside the shared kit part, never per-dialog); LUẬT SỬA CẢ NHÓM (one fault ⇒ whole family).
TASK:
1. Root cause: why kitDpFit does not keep the feet in this dialog (class kdper missing? column height measured before the clock chip / options render? figure sized to column not to visible area?).
2. Whole-family scan script: open EVERY dialog/panel kind that shows a figure (VIỆC choice incl. timed, BÁO, person dialog, event, contest, Nhập cung, gift, visit, night, co-op remote cards…) at
   Fold 755x1000@2, iPad 1180x820@2 and 1366x1024@2, Fold cover 412x1058, 390x844; measure figure bottom (hem incl. shoes) vs the visible column bottom. Before/after table: every row must be 0 px cut.
3. Fix at the kit level so feet show everywhere (shrink figure to fit; never crop the bottom). Figures keep the tag ABOVE the head (OD:L1351).
4. Tests: quickcheck PASS, old-save load, the scan 0 cut; shots of this exact dialog on Fold + iPad in the report.
5. Report SẴN SÀNG KIỂM <sha> to main s28 = session_01UV1SzkNSYyuEkCJ3Bv1Evj (send_message) + CLAIMS row.
ROLLOVER (copy verbatim):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
