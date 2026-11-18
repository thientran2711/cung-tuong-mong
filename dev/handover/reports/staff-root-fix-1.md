# staff-root fix #1 — a servant coming home is never the one sent away

PRIORITY #1 CHECK: OD 0 | main 25bfd7cf: no capTrim (jcoopask.js settle() returns the maid) | review/* review/staff-root-r1 1abbf075 (capTrim/capSweep j10.js) — reused, no new table | claims B staff-root fix #1 = this session (session_01N1tNP4tMiPQEh5DXeZP29x)

Branch `review/staff-root-fix-1` @ **1f383795** = review/staff-root-r1 1abbf075 + origin/main 25bfd7cf (merge 263f04fe; one conflict j95vis resolved as briefed: staff-root's `gtAtHome()` + main's `c:ly` in lãnh cung) + fix d36cdf31 + site rebuilt 1f383795.
Worker START_CTX ~8 % of the window; finished well under the rollover line (no handover needed).

## Cause
On the guest (rank 0, capOf=[1,0]; hhHas counts the personal maid, so her household is [1,0] before the maid comes back) settle() handed the refused maid back (N.returned=1) → [2,0] > [1,0] → staff-root's guest `capSweep()`→`capTrim(S)` cut the only cuttable servant: the maid who had just come home. S.staff=[].

## Rule (Foreman B decision) and where it lives (ONE place)
- `j10.js srvHome(s)` puts a mark (`s.home=1`) on a servant handed back to her own mistress.
- `capTrim(p,stay)` treats a marked servant exactly like `stay`: never the one sent away; the normal rule picks ANOTHER (least trusted first, usual log line / farewell scene). If no other can go she stays over the table.
- The mark is cleared inside capTrim as soon as that side of the household (maids / eunuchs) is within the table again; from then on she is an ordinary servant for later trims (a later demotion treats her normally).
  First try was "honour once": it failed the e2e (capSweep runs on every render, so the 2nd sweep cut her when nobody else could go) → kept until within the table.
- Callers: jcoopask settle() `np` refused (her maid) and `srv` refused both push `srvHome(...)`. The "… trở về hầu ngươi như cũ." line is unchanged.
- Host and guest: same capTrim, same mark (host seat and guest seat tested).

## LUẬT SỬA CẢ NHÓM — every path that puts a servant into a household (scan: `git grep -E 'staff\.(push|unshift)\(' dev/build`, 20 hits)
| Path | Coming home to her own mistress? | Could a cap trim cut her before | After |
|---|---|---|---|
| jcoopask settle `np` refused (maid back) | yes | YES (capTrim, the bug) | srvHome → kept |
| jcoopask settle `srv` refused (servant back) | yes | YES (same) | srvHome → kept |
| jstaff `fitCap` (named elder placed, separate older trim) | — | would pick the last maid = a just-returned one | honours the mark (`!s.home`) |
| j10 plant into a target (`capTrim(t,s)`) | no (placed) | no (`stay`) | unchanged |
| returned spy / released plant (j10:56, j42, j72:387/451: `spyFor=null`) | no move, stays where she is | no | unchanged |
| lent / named palace women (jstaff place) | eid | no (capTrim skips eid) | unchanged |
| co-op friend servant (jcoopworld pushFriend/placeFriend, jcoopthin) | coop flag | no (capTrim skips coop) | unchanged |
| promotion: jpromo prStaff, jpromsv spMove/spGoTo, j14 bigger consort buys | new/moved, only when under the table | no | unchanged |
| j72 rescue to her household (`capOk()` gate), j6 hire, j29 fill, j24/jeitem swap | new, gated by the table | no | unchanged |
| cold-palace return | no staff restore path (row 0, refill later) | — | unchanged |
| jkc/jkc2 `S.staff=K.staff0` (enters the palace from home) | first entry, whole household | table trim is the staff-root rule | unchanged |
| old save load (staffInit capSweep) | a saved mark is honoured on load | — | covered by the mark |
| host hSrv (guest's servant into an NPC) | going to an NPC, not home | NPC table (host) | unchanged |

## Tests (1f383795, Fold/iPad per test defaults)
- coop-guest-maid: **37/37 ×3** (was 34/37 with case 3 FAIL on 1abbf075/the land merge).
- staff-root: **16/16** (+3 new: host seat, guest seat — another goes with log line, alone she stays over the table on every sweep, ordinary again once within the table; co-op `settle()` np + srv refused → both back marked, the trim sends the others, the line shown). Test hook: `COOPW.askSettle=settle`.
- promote-servants 21/22, promo-rules 27/28 — the 2 FAILs are layout (1180x820 two-road card overlap; 844x390@3 reveal button) and fail identically on the pre-fix merge 263f04fe → pre-existing, not this fix.
- promo-exam 32/32, promo-next-rank no errors, promo-skip PASS, elder-staff PASS, one-core-guard PASS.
- coop-e2e **63/63**; quickcheck **PASS** (old save ok, core gates PASS, perf new/live render 183/212 ms).
- coop-ask-srvprobe 12/13: FAIL "probe srvout … hers only" — also FAILS on the pre-fix merge 263f04fe (there `inNpc:true, mine:false`). On this branch the srvout half now holds (`inNpc:false` on both seats); `mine:false` because the probe pushes an NPC's servant raw into her household past the table and staff-root's guest capTrim (r1 rule) sends the extra away. The real paths it imitates are table-gated (jpromo prStaff only under the table, j72 `capOk()`), so no game path loses a servant this way. Probe is not a 'coming home' case; flagged for the delta reviewer, no change made.

## Files
dev/build/j10.js (capTrim + srvHome), dev/build/jcoopask.js (settle ×2 + test hook), dev/build/jstaff.js (fitCap), dev/test/staff-root.js, site rebuilt.
