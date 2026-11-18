# review-staff-root-fix-1 — delta review of review/staff-root-fix-1 1f383795 (opus BIG reviewer)

PRIORITY #1 CHECK ('capTrim|srvHome|settle|srvout'): OD 0 | ledger 0 | main: no capTrim/srvHome (jcoopask settle() hands the maid back) | review/*: staff-root-r1 1abbf075 (PASS), staff-root-fix-1 1f383795 (this) | claims: this reviewer session_01N1tNP6QsncpxxS2jeBjMi5.
START_CTX ~6 % (estimate); finished well under the rollover line.

## VERDICT: PASS review/staff-root-fix-1-r1 7e0250ec (ancestor = origin/main bbb3b4ca → fast-forwardable)
Commits on top of 1f383795:
- 108d78b5 merge origin/main abe056c3 (world-events; only index.html/sw.js conflicted), site rebuilt
- ce94d1b0 **probe fix**: coop-ask-srvprobe 'srvout' gives her room first (as a promotion does), see (5)
- 4deeb025 merge origin/main 2de320ac (one-core-dup3 + mg-snap). One code conflict j10: kept staff-root `capTrim(t,s)` in plantServ + `capSweep()` at servMonth start, with main's `BAL.eff.j10.evPlantServ`; sentPen/confessRisk/bribeServ moved to j29 by main (auto)
- 7e0250ec merge origin/main bbb3b4ca (trait-rename; generated files only), site rebuilt

## (1) ONE shared rule
- `srvHome(s)` (j10) sets `s.home=1`; the only readers are capTrim (`home(s)` = like `stay`) and jstaff fitCap (`!s.home` in both picks). No second cap table, no new number (one-core-guard PASS).
- Cleared inside capTrim per side (maids / eunuchs) as soon as that side is within the table. Probed: a promotion gives room → cleared on the next sweep; a later demotion treats her as ordinary (she can go). Immune only while she is the one extra on an over-table side (Foreman rule "if none can go she stays").
- Key `home` collides with nothing on servant objects (j95 `p.home` is on the people list, not servants). Saved with the servant (ser round trip keeps it); old saves without the key load (quickcheck old save ok; staff-root old-save cases PASS).

## (2) Host seat = guest seat
Same capTrim on both; my family probe ran every case on seat a and seat b with identical results. The host has no refused-seat path (j14 raises a maid only when `roomFor("consort")`), so settle() (guest only) is the one producer of the mark.

## (3) Family — tried to break each return path (scratch probe, both seats)
| Path | Result |
|---|---|
| settle np refused / srv refused | back + marked, another goes, line "trở về hầu ngươi như cũ" (staff-root case 9) |
| rank 0 (table [1,0]), marked maid the only extra | stays over the table on every sweep, mark kept |
| …then an NPC plants a spy into her household | plant kept at placement (`stay`), sent away by the next sweep; returning maid kept (before the fix the returning maid was cut). Rare edge, consistent with "another goes" |
| promotion gives room → later demotion | mark cleared at promotion; at demotion she is ordinary (least trusted first) |
| marked maid sent as her plant into an NPC | NPC trims another; mark cleared there (within table) |
| both sides over, both marked (maid + eunuch alone) | both stay; each side's mark cleared independently |
| fitCap (named elder placed) | never picks a marked maid; alone she stays (code read; fitCap is closure-scoped) |
| returned spy / released plant / j72 rescue (`capOk()`) / prStaff (only under the table) / jcmaid old close maid / cold palace / jkc entry | no "coming home" past the table (checked the ~60 staff push/splice sites); jcmaid old close maid is not a return (stays, ordinary trim — r1 behaviour) |
| old save | mark absent = ordinary; present = honoured |

## (4) Merge with main
1f383795's j95vis resolution keeps staff-root `gtAtHome()` + main's lãnh cung `c:ly` (checked). Re-merged three newer mains (above); staff-root static check (no private table / +1) PASS after one-core-dup3.

## (5) coop-ask-srvprobe 'srvout'
- main 25bfd7cf: **13/13** (o2 mine:true). Branch 1f383795: 12/13 (my run inNpc:true, mine:false; the worker's run inNpc:false — timing).
- Cause: at rank 0 her table [1,0] is already full with the personal maid; the probe pushed an NPC servant RAW past the table. staff-root's guest capTrim (r1 rule) sends that extra away — before the week's ser (no srvout, she stays in the NPC household on both seats) or after (srvout sent, then reassigned). No game path does this: jpromo prStaff moves a servant only while `hhHas < capOf` (on a promotion); the j72 rescue is gated by `capOk()`.
- Fix (test only, ce94d1b0): the probe first raises her rank until the table has a maid seat free (what a promotion does), then takes the servant. Now **13/13** (3 runs, incl. after each main merge). No code change needed.

## Tests (7e0250ec unless noted)
- coop-guest-maid **37/37 ×6** (3 on 108d78b5, 2 on 4deeb025, 1 on 7e0250ec) · coop-e2e **63/63 ×2** · coop-ask-srvprobe **13/13** · staff-root **16/16** · one-core-guard PASS · elder-staff PASS · promo-rules 20/20 · promo-skip PASS · promo-next-rank 0 mismatches.
- promote-servants 22/23: FAIL "1180x820 two-road card overlap" = pre-existing on main (r1 report). promo-exam 20/21: FAIL "old save loads: exam state…" fails identically with main vs main → pre-existing on main.
- quickcheck: open / old save / perf PASS (render 138/150, buổi 653/630 ms new/live); G1 one-core, G2 rules-one-source, G3 kit-conform (103 conform) pass. **G4 coop-one-world FAILS on seed 7 (4 of 5 runs): only `S.wwin` (world-events, jworld.js).** NOT this branch: origin/main abe056c3 fails the same way on seed 1 (seeds 2–13 pass); staff-root changes the RNG path so seed 7 now hits it. Detail: the host drops an expired event (`S.wwin.L` → []) while the guest's sent copy of that event differs from base, so merge3's rule "A removed it; keep only if B changed it" keeps it → the guest changes a field of a world-key record. **For Foreman B: world-events (main) bug — the guest must not touch S.wwin.L entries; the go-live G4 gate flags any sha whose RNG path hits it.** Not fixed here (world code, outside this review).
- Shots (scratch only, nothing uploaded, nothing to wipe): Fold 755x1000@2 + iPad 1180x820@2 — farewell "Nội vụ phủ điều người" scene (cổ trang, "Đành vậy"); room "Ở đây còn 3 người" = her + close maid + the returning maid kept (least trusted, marked) + eunuch within [2,1]; Hậu cung › Cung nhân: "Cung ta" 3, hire rows "✕ đủ số theo phẩm" (kit row); no overflow, 0 page errors.
