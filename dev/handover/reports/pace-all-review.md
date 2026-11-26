PRIORITY #1 CHECK: OD 26/11 ~08:00Z / ~08:05Z / ~08:25Z rows + OD:L353 («Q5 A», BAL.art.gain) + MAIN 155 add-on ~08:30Z (FOREMAN_D_STATUS L271) | main LIVE now 1dcb373e (was 3af7896e at the brief) | review/pace-all afa89339 | review/stat-pace (D2, rises — not this branch) | claims PACE-ALL row.

# BIG REVIEW — review/pace-all afa89339 (opus reviewer, session_01D3E3NbYmUBM1sWmm9ckSzA, START_CTX ~6 % est.)
Scope: `git diff 3af7896e..afa89339` (27 files; game code j1 j2 j8 j28 j42 jagacts jbal jbal2 jbalcore jbaleff jmend(new) jtwoway).

## VERDICT: **FAIL — 2 BLOCKING**, 5 SHOULD, 6 NIT
The engineering is careful (one function both ways, every number BAL, refused words not paid, save carries the new fields), the tests pass and co-op e2e passes. It fails on one real co-op bug (double fade of the guest's own grudges) and on one owner-ruling gate (the course gains she picked herself).

## What I ran (all on afa89339)
| check | result |
|---|---|
| `bash dev/site/build_site.sh` | index.html identical except the build line (window.CTM_BI); sw.js/assets.json hash only |
| `node dev/test/pace-all.js index.html` | ALL PASS 32 in 3 of 4 runs; **1 run FAIL C5** `[null,0,0]` (flaky, see S1) |
| one-core-guard (OC_BUILD/OC_BASE) | PASS (inline 3100 < baseline 3592, fails 0) |
| `node dev/test/coop-e2e.js` | **143/143 passed** |
| `bash dev/tools/quickcheck.sh` | open 0 errors · **old LIVE save loads + plays a buổi** · time-spill PASS · perf ok (render 216/213, buổi 1762/1535 ms) · CORE GATES FAIL only G4 kit-dialog-2 empty Tốn/Được + button-crawl «Ô lưu · Lui» = the known pre-existing LIVE fails |
| moodknow-step0 | 19/19 PASS |
| rel-men-servants (file:// URL) | PASS 30/30 |
| receiver-choice-scan | gaps 0, unclassified 0 |
| role-parity-scan | exit 0 but printed no table in my run (inconclusive; the change is one classification entry) |
| own probe (solo) | wk() is j8's (jcoopworld's wk is scoped) → quiet-week count works; a fed 60 grudge cools 60→27 over 12 quiet tuần after the 2-tuần quiet wait; ghenUp at 95 +5 → 0 raise, carry .75, no NaN |
| own real-tap probe iPad 1180x820 | deep-grudge (oán 85) talk: Tạ lỗi / Nhún nhường grey (kit locked look), «Nhờ người đứng giữa» present (Mong manh / locked when no go-between); «Lễ nghi» tab → «Hậu lễ tạ tội» real tap opens the talk mini-game «Luật chơi · Chạm dấu · Việc: Hậu lễ tạ tội» (so the card IS reachable; the worker video skipped this tap). Fold: my tap hit a hidden duplicate tab row (probe limit), not judged. |
| videos (frames, both devices) | watched: part 1 Tiến bộ 0/10 → 2/10; part 2 Nguy hiểm chung oán 85 → 58; part 3 locked rows + refused gift (Fold, refund chips «Danh +1 · Bạc +60») / accepted gift (iPad, Bạc −60). 0 page errors. |

## BLOCKING
**B1 — CO-OP: the guest's own grudges fade twice, without the quiet rule and with a fake nết (law 1 two-way/parity, «no double fades»).** `dev/build/j28.js:60-62` `oanCool` loops every entry of `rivals` and skips only `alive===false`. On the host, rivalsTurn runs with the friend's entry pushed into `rivals` (`jcoopworld.js:1077-1078` B4 pushFriend). That entry is `buildFriend` (`jcoopworld.js:81-85`): `oan` = HER oán toward the host (`ro[mp]`), `ro` = her other grudges, `trait:"Khiêm nhường"`, no `ocq`/`occ`. `toCanon` (`jcoopworld.js:150-152`) writes `v.oan` / `v.ro` changes back into HER blob (`s.ro`). So every week the host cools the guest's own grudges (× persF Khiêm nhường 1.3 instead of BAL.oanCool.me 1; no quiet stamp → even a grudge fed this week cools; carry lost each rebuild), and every month her own client cools the same S.ro again (`j28.js:82` oanCool(3,true,true) on the guest). Host's own grudges cool once a tuần at ×1. coop-e2e does not measure this (passes).
Fix (one line, same family): in `oanCool` skip `v.coop` (her grudges are hers, cooled by her own client with the stamps on her S); add a pace-all test: friend entry pushed → oanCool(1) leaves its oan/ro unchanged.

**B2 — LAW 16 / LAW 14: BAL.art.gain overwrites the owner's own pick «Q5 A» without her OK and without the canon row.** `dev/build/jbal2.js:592` gain `[2,1.5,1.1,.9,.8]` → `[1,1.25,1.25,1.25,1.25]`. OD:L353 (26/11 ~04:32Z, owner «Q5 A») fixes exactly `BAL.art.gain [2,1.5,1.1,.9,.8]` («good player bậc 1→5 in ~2/5/12/21/33 days»). The new table makes bậc 1 twice as slow (10 phần vs 5; a good game at bậc 0 = 3 phần, Nhập môn after ~4 good games instead of the 2 MAIN 154 told her at 08:00Z) and the top bậc faster (to Tông sư 82 vs ~98 phần). Her 08:05Z row is about the DISPLAY («tiến bộ của cái bậc đó»), not the speed; the 1/15–1/3 pace rule is MAIN 155's under the standing «tự làm luôn» rule, which cannot silently undo a number she picked (law 16), and OD:L353 still states the old gains (law 14: two versions).
Fix, either: (a) MAIN 156 records an OD overwrite of L353 with her OK (show her: bậc 1 slower, top faster), or (b) the worker keeps her Q5 A gains (only the per-bậc display changes, KK39) and the pace table flags bậc 0 as «FAST by her choice». Not landable until one is done. (The Công lao / merit changes are not owner-ruled numbers: OK.)

## SHOULD
- **S1 flaky test** `dev/test/pace-all.js:73-76` C5: liking is set through `affAdd` (wrapped by persF trust, `j28.js:46`) so the go-between may stay under «than»/«quen» → `mendGoOf` null (1 of 4 runs). Set `aff` to the target directly (or loop until over the line) and assert the picked person is the best-liked.
- **S2 family (law 11)** `jemoact.js:538` eaHoi «Tạ lỗi, đền bạc» still takes Danh (and bạc) when netForgive refuses. It has a gain (thiện cảm +H.aff) so law 3 holds, but the MAIN 155 add-on says «refusal must not still charge Danh»; list it in the family table and decide (refund Danh, or note why public apology keeps the face cost).
- **S3** `jmend.js:35` `mendDo(..., paid=true)` returns "" with NO refund when `mendCan` is false at run time (e.g. the go-between gone between list and tap); the card already took `a.c`. Refund `c` on that early return too.
- **S4 real objects (law 6c spirit)** `jmend.js:39` the hậu lễ bạc leaves the doer and goes nowhere; the receiver should get it (t.bac / S.bac) — «lễ bị trả về» on refusal already models it as a real gift. (Precedent jemoact also vanishes — same family fix.)
- **S5** LIVE moved to **1dcb373e** (coop-freeze-kmrew-rv2 landed): afa89339 is no longer FF; re-merge + rebuild before LAND READY.

## NIT
- N1 locked Tạ lỗi / Nhún nhường still show the odds word «Rất vững» on the card face (`jmend.js:34` keeps `o:100`); the same as other kit-locked rows («Cảnh báo nàng ta»), but here it misleads — consider `a.o=null` for these two.
- N2 refusal shows the refund as gain chips «Danh +1 · Bạc +60» (Fold video) — reads like a reward; a quieter refund (no fx chips) or a line «lễ được trả về» is enough.
- N3 `jmend.js:52` `BAL.ag.cx.humble.g*2` typed multiplier → a BAL key (oanMend.ag or similar), law 4 spirit (one-core-guard does not catch it).
- N4 stale canon comment `jbal2.js:575` «The fade is the shared BAL.oanFade (j28 oanMonth)» → BAL.oanCool (law 14).
- N5 rollback `BAL.oanCool.on=0`: `ghenCool` (`j28.js:69`) then returns 1+.03×ghen (fraction, not the old 3/1) → rollback is not the old rule; return `G.than/G.base` when off.
- N6 video part 3: the «Lễ nghi» tab tap did not happen (row run by talk(i)); re-record with a real tap (overlays #kdaytc / #kmrew from repeated start() cover the tab; hide them as test setup) and show the Chạm dấu step.

## Laws checked
1 two-way: mendDo one function her/NPC/NPC↔NPC ✓; co-op parity ✗ (B1). 2 equal value: bạc+Danh vs friend's liking+Danh, odds bonus for a strong go-between ✓. 3 gain-and-loss: refusal costs only khắc ✓. 4 BAL: ✓ (N3). 5 harder as she climbs: gift grows with rank, phần per bậc rising ✓. 6 real world: floor while a remembered deed stands ✓; bạc vanishes (S4). 7 wording: odds as words, no %, cổ trang lines ✓. 9 kit: talk option rows (lock/t/c/x) only, no private CSS ✓. 11 family: S2. 12 devices: both videos + iPad real tap ✓. 14/16: B2.

## To the worker (fix list, in order)
1. B1: `oanCool` skip `v.coop`; test. 2. B2: wait for MAIN 156 (a) or restore Q5 A gains (b). 3. S1, S3, S4, S2 (family table). 4. N1–N6 as cheap. 5. Re-merge LIVE 1dcb373e, rebuild, rerun pace-all ×3, coop-e2e, quickcheck → delta review.

## ADDENDUM 13:15Z — head moved to 3942eafe (FF from LIVE aa37de21)
Checked again at 3942eafe: 7ca30095 + 3942eafe are LIVE merges (built files + CHANGE line; the jtwoway TW apol edit is still there); a9d6be0b makes pace-all.js deterministic (C5/C9/B9) → **S1 fixed, S5 fixed (FF from LIVE aa37de21)**. **B1 unchanged** (j28 oanCool still has no `v.coop` skip) and **B2 unchanged** (BAL.art.gain [1,1.25,1.25,1.25,1.25] vs OD:L353 Q5 A). Verdict for 3942eafe: **FAIL — 2 BLOCKING** (B1, B2); S2–S4 and the NITs still stand.
