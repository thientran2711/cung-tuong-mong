# ge-phutang-land3 review (E45r, opus, session_01DgYSWp1tftExc9HqQtYtZD; opened by FOREMAN E #28)
PRIORITY #1 CHECK ('ge-phutang|jbalge|jgedata_pt|nBranch|geOrig'): OD 0 new | main jge.js geOrig (player side), jgenpc.js:46 nBranch (prefix) | review/* ge-phutang-r6 f37ec5f1, ge-phutang-land3 d5331d60 | claims E45 session_01DgYSWooSZorHJAJ7Gthdcg — reused, only a 2-line fix added.

Branch: review/ge-phutang-land3-r = d5331d60 + LIVE c9ae030e (index/sw) + reviewer fix 8a805cc9 + test GE_BR + LIVE 7af6a13f (jge.js 1 hunk: LIVE geF(how) + branch geOrig(b), pure union) + LIVE 0faf7a05 (assemble.py: LIVE list incl. jdc0/jdc + jgedata_pt after jgedata_bd; index/sw rebuilt).

**VERDICT: PASS 4ee581db678383c46567153d7ed8d3b77d0a911e** (origin/main 0faf7a05 is its ancestor → fast-forward). Reviewer fix inside (2 lines jgenpc.js) — E45 has nothing to redo.

## (b) 18 jgedata_pt option-key remaps — PASS
Independent static check (e45r-out/keychk.py: every lean p/m + pull/push/close/doom string vs every n:"…" in jrd_pt.js + jrd_pt2.js):
392 keys, 0 dead; 20 refs / 18 unique changed vs f37ec5f1, each one exactly «thiếp»→«thần thiếp» (17) or «thiếp»→{tx} (1, «Đáp: {tx} về rồi thì ai tiễn nàng»);
the 20 changed refs are exactly the 20 that were dead on LIVE labels (no extra, no missed). ge-guard 10/10 in the browser.

## (a) jbalge GE09 npc.on:true kept from LIVE — logic right, but the NPC side was DARK for pt roads → FIXED here
The ruling to keep LIVE's on:true is right (laws 1, 6b: the NPC funnel/news/seat parity is live for every road; the branch's on:false was only a «wait» placeholder).
FAULT found: dev/build/jgenpc.js:46 nBranch tested `r.split("_")[0]===v.nr.o`. pt_* roads are origin "pf" (ARC67.pt_*.o; BAL.orig.br.nc gives pf weight 1, nrRoads("pf") = the 4 pt roads),
so an NPC Phù Tang princess on any pt road got NO v.ge (probe: ge null on pt_hai/su/tang/dang, tt_co ok) — the player has grand endings on those roads, the NPC never → law 1 TWO-WAY broken.
Same prefix at jgenpc.js:155 (news identity GE_ID["pt"] = empty). The player's side was already moved to geOrig (jge.js:22); LIVE 7af6a13f also moves its geTitles line.
Fix (8a805cc9): both lines read geOrig(...). Group scan: `split("_")[0]` in jge*/jnroad*/jgenpc = only these 2 (+ geOrig's own fallback).
Tests added: ge-npc-unit (8) every branch whose prefix ≠ origin gets parity → FAIL 4 before / ok 4 after; coop-ge-npc GE_BR=<road> (origin by geOrig).
After fix: pt NPCs' own picks move pull/lean on every pt road (6/6 each), Hồi kết resolves, news «… (Công chúa hòa thân · Phù Tang), tới Đại kết cục …».

## Gates
On 8a805cc9 (= d5331d60 + LIVE c9ae030e + fix): quickcheck PASS on rerun alone (1st run FAIL only longTaskMaxMs 2857 vs 1714, all medians = LIVE; rerun: old save ok, core gates/one-core PASS, buổi 1038/1081, render 224/265) ·
coop-e2e 124/124 · COOP_GE coop-e2e (tt+nc both seats) 134/134 · coop-ge-npc GE_BR=pt_tang swap 0 and 1 all ok (host resolves once, guest lens same ending, pop-up once per seat, guest cannot move NPC road) + default tt 9/9 ·
ge-guard 10/10 · ge-engine 107/107 · ge-pt-scan 85/0 · ge-npc-unit 35/35 · self-word PASS · rare-match [] · role-parity ×2 identical 9b0a3670, table b94f2eb8 unchanged.
On 8e4da816 (+ LIVE 7af6a13f) and again on 4ee581db (+ LIVE 0faf7a05): quickcheck PASS both (old save ok, core gates/one-core PASS; buổi 1092/1034 and 1316/1135) · ge-guard 10/10 · ge-engine 107/107 · ge-npc-unit 35/35 · ge-pt-scan 85/0 · bang-words scan PASS · self-word PASS · coop-e2e 124/124 · COOP_GE 134/134 (both seats).
No UI changed → no shots, no CDN folder to wipe.

Laws touched: 1 two-way (was broken for pt NPCs, fixed), 4 one core (numbers BAL.ge only, unchanged), 6b real people (pt NPCs are real consorts with their own road + ending), 7 wording (no %; remaps are VANPHONG self-word). No UI change (kit n/a).

Cleanup: worktrees /home/user/wt/e45r, e45rh, scratch e45r-out deleted after this report.
