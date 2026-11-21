# MAIN85 E-LANDER report (session_01Rc5AsJW9Vhg1k64SUB5Jmb)
PRIORITY #1 CHECK: OD go-live OD:L220/L1370 + co-op land gate 20/11 ~21:30Z | main none of the three landed at start (LIVE 64d2e094) | review/* phutang-road 54e068e5, errand-bal-land 0d3a4328, cold-faction-land 2208d341 (reviewer PASS) | claims none for re-landing.
START_CTX ~4 %. Coordinators during the run: MAIN 85 → 86 → 87 → 88 → 89 (session_01Rc5AsN8weZNZcjxNiCsivs).
Method: detached sparse worktrees /home/user/wt/e85*, merge newest LIVE, index.html/sw.js = main's then assemble.py + build_site.sh, one Chromium test at a time.

## 1. phutang-road 54e068e5 → review/main85-land-phutang 0f9d0f77 — LANDED (LIVE 666def0c, MAIN 88 self-merge)
- Merge LIVE 64d2e094: assemble.py module list (branch +jbalpt/jrd_pt/jrd_pt2, main +jtc) → union.
- Merge LIVE a88b14f0 (coop-name-clash): REAL conflict dev/build/jkc2.js kc2Init. Kept both: main's nmNew naming (gm/gv/gf/gx/gmo) + phutang Phù Tang titles (pf ? L.tx.dadN / `${L.tx.momN} ${gf()}` / L.tx.huynh / L.tx.thuc; muội title kc2Muoi()). assemble list union (+jname/jnamefix).
- Merge LIVE 32c0e33b: index/sw only.
- Gates on 0f9d0f77: quickcheck PASS (old save ok) · coop-e2e 92/92 · coop-name-scan 0 open · coop-together cnv+pf 25/26 (only the known LIVE fault «B went through the selection card») · route --origin=pf fail [] · ge-engine all 1328/1328 · road-full pt_hai/pt_su/pt_tang/pt_dang 9/9 each (14/14 chapters) · names-unique 80 yrs / 4 lives 0 failures.

## 2. errand-bal 0d3a4328 → review/main85-land-errand-bal 1d30dfe9 — in MAIN 88/89 land chain
- Merge phutang land 0f9d0f77: REAL conflict dev/build/jkc.js kcInit. Kept both: main's nmNew naming (via coop-name-clash) + errand-bal roll(BAL.odb.jkc.rlMomAlive) (BAL key exists, =60). kcFreeName gone on main; no caller left.
- Merge LIVE 60dd62c3: assemble list union (+jkinl). Later LIVE (068662ad, 1e826e29): index/sw only.
- Gates on 1d30dfe9: quickcheck PASS · coop-e2e 92/92 · coop-errand both seats ALL PASS 16 · errand-bal guard PASS · one-core PASS · role-parity ALL PASS · coop-name-scan 0 open.

## 3. cold-faction 2208d341 → review/main85-land-cold-faction 5168e396 — LAND READY (contains errand-bal)
- e6e25d77 = 2208d341 + errand-bal land 1d30dfe9 (index/sw only). Gates all PASS (coop-cold-faction 22/22 ×3 after one setup flake).
- Merge LIVE 068662ad: REAL conflict dev/build/j10.js facHTML (kit-ghichu-bang replaced the «Hậu cung chưa có phe phái nào» <p> with kitEmpty(...)). Kept both: cold-faction rows (facCold chips, lc guard, «Gạch tên» buttons) + main's kitEmpty empty state.
- Gates on 5168e396: quickcheck PASS · coop-e2e 92/92 · cold-faction 20/20 · coop-cold-faction both seats 22/22 (2 of 3; 1 = harness SETUP flake «each has the other as a consort entry», also seen once on e6e25d77 → the 2208d341 harness wait is still too short under load; flagged to E) · one-core PASS · role-parity ALL PASS.

## Extra (MAIN 88 order): or20-j68q 88205658 → review/main88-or20-j68q-ff d11280f5 — LAND READY
- = 88205658 + LIVE 6e07f837 (index/sw only). quickcheck PASS · coop-e2e 92/92 · or20-j68q-coop both seats 11/11 · or20-j68q 26 months 18/18 (8 months 17/18: «HH duty cards ≥3 kinds» saw only q6hhJudge = sample size).

## Notes
- coop-together «B went through the selection card» = LIVE fault (kc2Sel / S.selx for a cnv host guest), still open.
- FOREMAN E #25 session in CLAIMS (session_01DgYSWmm3tPLnLMUtPofz2g) not reachable by send_message; relayed in FOREMAN_E_STATUS.md.
