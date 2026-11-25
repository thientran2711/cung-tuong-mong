/* ONE CORE (law 4) — THE ranges of a person's numbers (robot-coop-fix-2 r2, review FAIL item 1). Pure data: no function, reads no BAL key set outside this file,
   so the co-op Worker's copy is GENERATED from this file (dev/build/gen_coop_ranges.js → coop/worker/src/ranges.gen.js; coop/worker/test/range.test.mjs
   fails when the two differ). Readers: j8 ap(), j1 apply() + statSet() (the stat block, `core`), j9 affAdd / oanAdd + COOPW.keyMove (BAL.linkRange),
   the Worker's week merge (every field below on every named person: her S, the consorts, their maids / staff / kids, the men), and
   dev/tools/coop-range-scan.js (every game clamp site of these fields must use this range). [lo, hi]; null = no bound on that side.
   Sức also stays under sucCap(p) (jkh, BAL.kh: khí huyết) — the Worker computes the same cap from BAL.kh (generated with this table). */
/* review/coop-flakes (D20; rv: ONE CORE, law 4; moved here from jbal2.js): the range of every person-to-person link — rl thiện cảm, ro oán — ONE source:
   j9 affAdd / oanAdd clamp with it, and COOPW.keyMove (co-op: one person's link moving to another id, a stand-in → her world id, a re-id'd person)
   clamps the ADDED link with it. */
BAL.linkRange={rl:[-100,100],ro:[0,100]};
BAL.personRange={
 /* the stat block ap / apply / statSet clamp (Sức: then sucCap) */
 core:["sung","danh","suc","sac","tai","tamco","duc","ghen","an","th","hh","bac"],
 stat:{sung:[0,100],danh:[0,100],suc:[0,100],sac:[0,100],tai:[0,100],tamco:[0,100],duc:[0,100],ghen:[0,100],an:[0,100],th:[-100,100],hh:[-100,100],bac:[0,null],
  loyal:[0,100]/* maid / staff / men (j10, j42, jagstaff …) */,tin:[0,100]/* trust (maid, court, staff) */,pg:[0,100]/* rival's power grab */,oan:[0,100]/* her oán toward the player */,
  rel:[-100,100]/* a consort's thiện cảm toward the player */,malice:[0,100],ev:[0,null]/* evidence held (j8 evA) */,caseEv:[0,null],dw:[0,null]/* her wrongs ledger count */,
  tinh:[0,100]/* a man's tình */,dad:[0,100],pow:[0,100]/* a minister's power */,
  hp:[0,100],fond:[0,100],tal:[0,100],hM:[0,100],tv:[0,100],tw:[0,100],td:[0,100],tcR:[0,100],fM:[0,100],af:[-100,100]/* a scalar affection (jkc: a suitor) — the per-person map af is below *//* a child's health / fondness / talent / learning (j25, j53, j54, jkidlife) */,rumor:[0,null],khTmp:[0,null],nt:[0,100]/* a cung nữ's nữ công (j42) */},
 /* maps keyed by a person's id: every value in the range */
 /* objects held under a person by this key (not named themselves): their fields in range — a married daughter's household k.hW (j54) */
 sub:{hW:{joy:[0,100]}},
 /* world objects (the room's W.S[key], not persons; the guest's week writes them too): the court's mood (j55 trS: biến / khó) */
 world:{trieu:{bien:[0,100],kho:[0,100]}},
 map:{rl:BAL.linkRange.rl,ro:BAL.linkRange.ro,af:[-100,100]/* a man's or servant's affection per person */,hA:[0,100]/* a child's art skill */,evm:[0,null],cev:[0,null]}};
/* robot-coop-fix-2 r3 (review r2 FAIL 1): the co-op CANONICAL state keeps a world person's feelings toward each player in maps keyed by the player
   id (jcoopworld toCanon / jcoopthinb: r.rl[mp]=rel, r.ro[mp]=oan, r.gp[mp]=ghen, r.ep[mp]=ev, evm[mp], cev[mp]). gp / ep are the SAME numbers as
   the stats ghen / ev: their range is a reference to the stat range, never typed again. dev/tools/coop-range-scan.js fails when a renamed map is missing here. */
BAL.personRange.map.gp=BAL.personRange.stat.ghen;BAL.personRange.map.ep=BAL.personRange.stat.ev;
/* robot-coop-fix-2 r3 (review r2 FAIL 2): WHO has a body (khí huyết, jkh.js): the player (her S) and the consorts (rivals) only — jkh khInit / khFit
   run on S + every rival at start, load and each month, and every sucCap caller in the game is one of them. Servants, maids, children, men have no
   body record and the game never caps their Sức under sucCap (jagstaff asSt / asAp: 0…100). The Worker applies sucCap to the same set, by its place
   in the canonical room state: W.R[] = the consorts, P.<seat>.S = the players. */
BAL.personRange.body=["W.R[]","P.*.S"];
