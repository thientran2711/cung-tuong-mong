# RV-OB-M3UI-sololh — SMALL review of delta 51855c36..d8dba46c (review/ob-m3ui-sololh)

PRIORITY #1 CHECK: OD «Kiếp mới» re-ask removed (OD 24/11) | main 3af7896e | r3 51855c36 SMALL PASS | claims OB-M3UI. Rules read: START_CORE/WORKER/REVIEWER.

## Verdict: SMALL FAIL d8dba46c

### FAIL 1 — the new row has an EMPTY origin (law 4: numbers/text from state, nothing blank)
j6.js reads `loadSlot(n).S.origin`, but a saved S has NO `origin` (deser() rebuilds it with `S.origin=originByKey(d.ok)`). On the robot M3 old save (S.kpTron=1, alive) the row written is
`{"n":"Mạnh Mi Trang","o":"","r":"Đáp ứng","age":22,"y":3,"kids":0,"f":"Bỏ ngang"}` → Sổ luân hồi shows «· Đáp ứng · 3 năm · 0 con · Bỏ ngang» (a leading «· » with no thân phận) on Fold 755x1000 and iPad 1180x820.
Fix (one line): `o:(typeof originByKey==="function"&&originByKey(d.ok)||{}).n||(s.origin&&s.origin.n)||""` (d = the loadSlot result). Add to test 3a-yes: the new row's `o` must be non-empty.

### Checked, OK
1. Old saves / no double rows: path is `ask==="2"` only, `!s.dead && s.kpTron`; jkiep handles `!s.kpTron` (its own «Bỏ ngang · Kiếp dở dang» row), dead lives were written at death (lifeSave) → mutually exclusive, never twice. Old saves load; Sổ luân hồi keeps the earlier row (Tiêu Lạc Anh) under the new one.
2. Wording «Bỏ ngang» = the jkiep word; row goes through pastHTML → the same kitRows as every other Sổ luân hồi row (no custom chip). Missing `nm` (no nghiệp) is correct for a «trọn» life.
3. Other numbers from state (name, rank via max(rank,maxRank) incl. Hoàng hậu rule, age, year, alive kids, fc) — OK except origin (FAIL 1).
4. `node dev/test/ob-m3ui.js` on a fresh build of d8dba46c, robot M3 save, Fold + iPad: 122 cases, 0 FAIL (3a-yes: Sổ luân hồi +1 both sizes; no page errors).
   dev/tools/quickcheck.sh: ran until my 500 s cap; only dialog-fixed FAIL «(kit-dialog-2 a) no empty Tốn / Được cell» — identical on the 51855c36 base build → pre-existing, not this delta.
5. Shots looked at (scratch only, not in git): Fold + iPad Sổ luân hồi — new row sits first, kit row, no overflow/cut text; only the blank origin above is wrong.

~ delta otherwise sound; one-line fix then re-review.

---
## Re-review of eca83a5d (OB-M3UI r2) — **SMALL PASS eca83a5d**
Delta d8dba46c..eca83a5d: o = originByKey(d.ok).n, fallback S.origin.n, in BOTH writers (j6 «Bỏ ngang» and jkiep «Bỏ ngang · Kiếp dở dang»; `d` is in scope in jkiep). Test 3a-yes now asserts name + non-empty origin.
- Fresh build of eca83a5d, robot M3 save: new row «Con gái nhà buôn muối · Đáp ứng · 3 năm · 0 con · Bỏ ngang», Fold 755x1000 + iPad 1180x820, kit row, no overflow; no page errors. Look at both shots (scratch only).
- ob-m3ui.js 122 cases: first full run 1 FAIL = «1 meter-tap ksp-card: no meter on the card» on iPad in the random fresh-life part A (not this code); iPad re-run 61/61, 0 FAIL, 3a-yes +1 with origin. Treated as a flake of the random card; MAIN may want it noted.
- quickcheck: only the pre-existing dialog-fixed «no empty Tốn / Được cell» (same on base 51855c36).
