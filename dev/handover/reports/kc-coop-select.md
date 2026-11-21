# kc-coop-select (E36, opus) — LIVE coop-together «B went through the selection card» (S.selx null)

PRIORITY #1 CHECK ('coop-together|selx|kc-roads|kc2Sel|nlAccept|jcoopthinb'): OD 0 | ledger 0 | claims 8 (only the reports of this bug: STATUS E21r2/E25r2; row E36 RUNNING) | main dev/test/kc-roads/coop-together.js, jkc2.js:514 (kc2Sel), jcoopthinb.js accept()/core() | review/* none touches jcoopthinb (checked coop-thin-g 78583e92, coop-thin-laydo f4fad288: no diff in jcoopthinb.js) | reused: kc2Sel / jentry / joi hooks as they are, coop-together.js extended (no new test file except the static scan).

Branch: review/kc-coop-select, base LIVE 548dcd0d. SHA for review: 8b26815f3f083f0778b8a6550ffdcf73c1244abf (code + build final at 0ac6a33f; later commits = test-only).

## Root cause (two parts)

1. **The LIVE failure is test drift, not a game fault.** Since kit-e-rows / j82 `kg82BackX`, every kg82 game frame carries its own header ✕ `.kit-x[data-kitx=kgback]` «Quay lại»; jk4 `kitOvSync` then adds no `data-kitx=ov` ✕. On a result screen that ✕ presses `#kg82ok` (j82 kg82Back → kitOvBtn().click()), so a PLAYER closes the entry-exam result normally (probe: tier 1, rank 3 → 2 applied). coop-together's `clear()` only looked for the `ov` ✕, so the seat-B exam result («Lễ ra mắt: Múa 5/10 · Khá») stayed open forever, `kc2SelDo` never ran, `S.selx = {art}` with no tier → «B went through the selection card» FAIL (25/26, every run, not a flake). Host A was at home, so only B hit it.
   - Family (tests that close a kg82 result ONLY through the `ov` ✕): `kc-roads/coop-together.js`, `lib/roulette.js` (closeResult), `tuduc-mg.js` (waited 200 s for an ✕ that never comes). All three now accept `ov` or `kgback`. Scan: `grep -rln "kitx=ov\]" dev/test | xargs grep -L kgback` → before 3, after 0.

2. **Real latent game fault in the same family (law 1): the co-op THIN guest skipped the new-life steps.** With the room thin level ≥ 2 (dev flag `ctm-thin`, Foreman B's coop-thin line), her life is rolled and accepted on the HOST (jcoopthinb). `accept()` hand-copied only the j52 core steps + jkc kcInit, and `core()` called `_start52` alone, so 11 of the 17 hooks on nlAccept / nlRun never ran for her: no kc2Sel selection after «Vào cung ngay» (rank given outright), no Tiền truyện / origin intros (joi, jentry, so no entry gate), no kiếp baseline (jkiep), no rank tracking (jrank), no age floor (jage), the cung nữ «nha» road kept her mistress (jkc2:97), a UNIFORM origin instead of the j69 weighted one (in tests: the HOST's forced origin), the host's Độ khó instead of hers (jdiff), no pid (j66), no dead-life pieces (jil, law 6c).
   - Fix (jcoopthinb.js only): `accept()` runs the REAL nlAccept chain (`nlAcc0`) in her context, with the host's own store held (nlNew / nlFaces no-op, `window.__kcO` = HER pick, NLP = her seed, her rank id dropped and re-set on her phone by `rkTrack()`); `core()` runs the REAL nlRun chain with her stored-life marks carried in the roll intent (`ow`, `pid`, `diff`; dev hook `fo` = her `__forceOrigin`, else the host's so coop-thin-b.js keeps forcing on the host). The dialogs she receives keep the story-card art + marks (`entI`, `oiP`) and joi's one closure (last direct-road panel → `oiGate("dir")`).
   - Scan `node dev/test/kc-roads/accept-scan.js [ref]` (exit 1 on any skip):

| hook | LIVE 548dcd0d (thin guest) | review/kc-coop-select |
|---|---|---|
| j52 nlAccept / nlRun (base) | runs (copied) / runs | runs / runs |
| j66 nlRun (pid) | SKIPPED | runs |
| j69 nlRun (weighted origin) | SKIPPED | runs |
| jdiff nlRun (her Độ khó) | SKIPPED | runs |
| jil nlRun (dead-life pieces) | SKIPPED | runs |
| jkiep nlAccept (kiếp baseline) | SKIPPED | runs |
| jage nlAccept (age floor) | SKIPPED | runs |
| jrank nlAccept (rank track) | SKIPPED | runs |
| jkc nlAccept (home road kcInit) | runs (copied) | runs |
| jkc2:97 nlAccept (cung nữ «nha» drops the mistress) | SKIPPED | runs |
| jkc2:514 nlAccept (kc2Sel selection) | SKIPPED | runs |
| jentry nlAccept (Tiền truyện) | SKIPPED | runs |
| joi nlAccept (origin intros + gate) | SKIPPED | runs |
| jcoopworld ×2, jrbatch | n/a (co-op send / render batch) | n/a |
| **skipped** | **11 / 17** | **0 / 17** |

## Test changes (coop-together.js, all backward compatible)
`--home=b` (guest takes the home road, host enters at once: both seats, both ways) · `--thin=n` (host asks thin level n) · both identity cards checked (an origin with no home road — cn — has no road card, as solo) · both seats must carry the solo new-life marks (entV, oiV, kpR0, rkSeed, diff) · palace seat waits for the selection result · `CT_SELSHOT=1` holds the selection card for a shot (after the life-gate cover and the entry-gate moment) · `CT_SWAPVP=1` guest on the Fold.

## Gates (this box, LIVE Worker)
- coop-together matrix, normal rooms: 9 home-road origins (tt dtq muoi thd ch td cnv nc bd) × both seat directions, palace origins rotating over all 10 (cn included) = 18 pairs. Pass 1: 17/18 PASS + 1 test check (cn has no road card) → fixed. Passes 2 + 3 (final test): 18/18 + 18/18 PASS → every pair ≥ 3 runs, 0 game fails, no flake. Default pair cnv+nc: 26/26, 29/29 ×2 (+ shots runs 31/31 ×2).
- coop-together matrix, thin=8: 15/18 PASS; every selection / new-life check passes in all 18; the 3 fails are «week 2 advanced» stalls (home=a direction). Same stall on LIVE: thin=8 baseline with main's jcoopthinb 1/6 week-2 stall (and 6/6 «went through the selection card» FAIL = the bug). = pre-existing, Foreman B's coop-week-stall (CLAIMS L509), not this branch.
- coop-thin-b.js (level 2, all origins forced on the host) 136/136 · coop-thin-b-r1.js 39/39.
- coop-e2e 68/68 ×2.
- kc-roads direct.js 10/10 origins fail [] · route.js cnv / nc / bd fail [] · kin-known.js FAIL 8/8 = SAME on LIVE 548dcd0d (pre-existing, solo home family knowledge; not touched here — for the kc-roads owner).
- one-core-guard PASS · quickcheck PASS (open 1394 ms, old save ok, core gates PASS) · role-parity not needed (no agent code touched).

## Shots
CDN upload refused (cdn_sync HTTP 401 on this account, as FOREMAN E noted); images are not committed (owner rule). Re-make them in ~4 min: `CT_SELSHOT=1 node dev/test/kc-roads/coop-together.js <out> "" --thin=8` (guest = iPad) and `CT_SELSHOT=1 CT_SWAPVP=1 …` (guest = Fold): 01-card-free (both roads open), 01a-gate (thin guest now gets «Kiệu hoa đến cổng cung · Vào Lễ ra mắt», was nothing), 01b-selection («Lễ ra mắt»: Dâng điệu múa / Dâng khúc đàn cố quốc / Cúi đầu chờ xét; Fold 755x1000 + iPad 1180x820, looked at). Before: thin guest had none of these, rank given outright.

## Notes for FOREMAN E / Foreman B
- jcoopthinb.js is Foreman B's coop-thin line (thin-b): please tell B (coop-thin-g owner) this branch changes `accept()` / `core()` / `qSer` / `show` / `rollAsk`; no conflict with review/coop-thin-g or coop-thin-laydo today.
- thin=8 week-2 stall reproduces on LIVE (above) → coop-week-stall.
- kin-known.js FAIL on LIVE → kc-roads owner.

SẴN SÀNG KIỂM kc-coop-select 8b26815f3f083f0778b8a6550ffdcf73c1244abf
