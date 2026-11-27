# REVIEW E-T2FLAKE-RV — review/titles2-unit-harden cf124903 (base 14a3a4c2)

PRIORITY #1 CHECK: OD «titles2» = E-TITLES3 work | main d9ca7892 none | review/* titles-daycard-lrm3 14a3a4c2 (base) + titles2-unit-harden cf124903 | claims E-T2FLAKE session_01DgYSWpputcRCYEcdKJoZsf.
18 LAWS: test-only change; touches no player-visible word, no number, no UI. Law 11 (whole group) checked in item 3. Laws 1–10, 12 not touched.

## VERDICT: PASS (cf124903; test-only, nothing to land on main beyond the test files)

1. **Diff is test-only — PASS.** `git diff 14a3a4c2..cf124903 --stat`: dev/test/{titles2-unit,chapter-title-hook,title-notice-tap,titles2-ui}.js + the report. Zero files under dev/build, dev/site or dev/index.html.
2. **The `S.maid.loyal=0` pin is a fair setup, not a hidden game fault — PASS.** `S.maid.loyal=50+R(31)` per life (j8.js:32). `RULE.khoan` (jdh3.js:92) is the designed «Khoan hậu» rule (maid loyalty + Đức, BAL.dh.rp.T.khoan loy 85/duc 60, jbal2.js:823); a loyal maid earning it first is correct behaviour. G1–G3 test the per-buổi gate (dhNoteGate / BAL.dh.note.per), which only needs *some* second name, so pinning the unrelated input to make that name deterministic («Cần kiệm») is legitimate. The mutant (item 4) proves the pin did not blunt the gate test. Minor note (not a fail): `loyal` stays 0 after the G block (worker flagged it); later cases still pass 20/20 per device.
3. **No assertion weakened; whole family of waits done — PASS.** Only wait mechanics changed plus the one pin; no `ck(...)` condition edited. `grep -n 'sleep(' ` over the 4 files finds no call left (helpers until/settle/stable/ready/shown are bounded and throw «TIMEOUT waiting for …»). Side benefit: on the BASE, titles2-ui also showed an intermittent «panel: the dialog is NOT topmost» (seen on base in 3 of 4 runs here); on the branch it is gone (`shown()` waits for topmost).
4. **Reruns — PASS.** Built dev/index.html from the branch (assemble.py), run via file://:
   - titles2-unit 20× Fold 755x1000 (4 parallel): 20/20 exit 0; 20× iPad 1180x820 (VP=1180x820): 20/20 exit 0. 0 flakes.
   - Mutant (dhNoteGate cap off: `if(false&&S.dhNB&&…`) on a copy of index.html: both devices exit 1, `FAIL G1`, `FAIL G2`, `FAIL G1-3 threw…`, «ok 79 · fail 3».
   - chapter-title-hook: PASS 41 ok / 0 fail. title-notice-tap: PASS 10 ok / 0 fail.
5. **titles2-ui «notice: no dialog» — confirmed on the BASE 14a3a4c2, it is a STALE TEST, not a live/landing fault.** On base (built the same way) both 755 and 1180 print `FAIL … notice: no dialog` (plus the intermittent not-topmost one); on the branch the same 2 fails remain, deterministic.
   Cause (reproduced with a probe): the test case (dev/test/titles2-ui.js, the `…delete S.dh.rp_hien;S.duc=95;S.danh=95;S.rep.d={};rpSync(S);showModal()` line, ~line 37) tries to earn «Hiền lương thục đức» on a brand-new life. E-TITLES3 added the rule «no name before BAL.dh.rp.seen (8) months in the palace» (jdh3.js:133 `seenOK`, jbal2.js:818 `seen:8`); `rpSync` returns `[]` on a fresh life, nothing is earned, the modal stays hidden → «no dialog». Adding `S.rep.t0=-1e9` (what titles2-unit G5 already does with `S.rep.t0-=RB.seen`) makes `rpSync` return `["hien"]` and the notice «Tiếng thơm — Hiền lương thục đức» opens. So the game is right; the test setup predates the `seen` gate. No LIVE/landing fault, no family to fix in game code.
   Follow-up (one-line test fix, not blocking this PASS; Foreman E may order it or fold it into the next test touch): in titles2-ui.js add `S.rep.t0=-1e9` before `rpSync(S)` in the notice case; check the other cases of that file that earn an rp name on a fresh life.

Reviewer did not push anything to main; no PR; scratch outputs in /tmp only.

## RE-CHECK 6cc8a0c4 (add-on, titles2-ui.js only) — PASS
- (a) `S.rep.t0=-1e9` before `rpSync` in the «notice» case: setup only (the seen gate, jdh3.js:133, bars a fresh life); the assertions (`chk`, «Tiếng thơm» dialog present, topmost, no overflow) are unchanged.
- (b) `S.dhNB=null;delete S.dhPend` before `cpGive` in the «chapter notice» case: setup only. One notice per buổi is the designed gate (dhNoteGate, BAL.dh.note.per=1), so the chapter title queued in S.dhPend behind the previous notice; clearing the state gives it its own buổi. Assertion «Gỡ lời đàn hặc» present is unchanged. Not hiding a fault: the gate itself is covered by titles2-unit G1–G3 (mutant-proven above).
- Diff 6cc8a0c4 vs cf124903: only those two lines in titles2-ui.js + report text.
- Run (merged build, each run covers Fold 755 and iPad 1180): titles2-ui PASS 0 issues ×2 (4 kit-caption WARNs K-DH-CAPFIT, pre-existing, warnings only); titles2-unit PASS ok 84 / fail 0 ×2 (VP=755x1000 and VP=1180x820).
