import { merge3 } from "../src/merge.js";
import assert from "node:assert/strict";
const base = { W: { S: { month: 3, tuan: 0 }, R: [{ id: 1, suc: 50, rl: {} }, { id: 2, suc: 60 }] }, P: { a: { S: { bac: 10 } }, b: { S: { bac: 20 } } } };
const A = { W: { S: { month: 3, tuan: 1 }, R: [{ id: 1, suc: 54, rl: { 901: 5 } }, { id: 2, suc: 64 }, { id: 3, suc: 1 }] }, P: { a: { S: { bac: 30 } }, b: { S: { bac: 20, sung: -1 } } } };
const B = { W: { S: { month: 3, tuan: 1 }, R: [{ id: 1, suc: 44, rl: { 902: 7 } }, { id: 2, suc: 64 }, { id: 4, suc: 9 }] }, P: { a: { S: { bac: 10 } }, b: { S: { bac: 5 } } } };
const F = merge3(base, A, B);
assert.equal(F.W.S.tuan, 1);          // same change on both = once
assert.equal(F.W.R[0].suc, 48);       // 50 +4 (host) -6 (guest)
assert.deepEqual(F.W.R[0].rl, { 901: 5, 902: 7 });
assert.equal(F.W.R.length, 3);        // guest-only new NPC dropped
assert.equal(F.P.a.S.bac, 30);
assert.equal(F.P.b.S.bac, 5); assert.equal(F.P.b.S.sung, -1);
assert.equal(merge3({emp:{mood:1}},{emp:{mood:3}},{emp:{mood:0}}).emp.mood,3); // enum: host wins, never 3+(0-1)
/* coop-room-faces: face registries merge as sets (union, host-canon) */
{ const b0 = { W: { S: { fidUsed: ["consort:c01", "maid:m02"] } } };
  const a0 = { W: { S: { fidUsed: ["consort:c01", "mama:k03"] } } };            // host freed m02, drew k03
  const g0 = { W: { S: { fidUsed: ["consort:c01", "maid:m02", "mama:k01", "mama:k03"] } } }; // guest drew k01 (+ the same k03)
  assert.deepEqual(merge3(b0, a0, g0).W.S.fidUsed, ["consort:c01", "mama:k03", "mama:k01"]); // both sides, de-dup, host removal stands
  assert.deepEqual(merge3(b0, { W: { S: { fidUsed: ["consort:c01", "maid:m02"], month: 2 } } }, { W: { S: { fidUsed: ["consort:c01"] } } }).W.S.fidUsed, ["consort:c01", "maid:m02"]); // a guest removal never applies
  assert.deepEqual(merge3({ S: { kidUsed: [1, 2] } }, { S: { kidUsed: [1, 2, 3] } }, { S: { kidUsed: [1, 2, 4] } }).S.kidUsed, [1, 2, 3, 4]);
  assert.deepEqual(merge3({ S: { nmOrd: ["a"] } }, { S: { nmOrd: ["a", "b"] } }, { S: { nmOrd: ["a", "c"] } }).S.nmOrd, ["a", "b"]); // other lists: host whole, unchanged
}
/* robot-coop-fix-2: both seats spend her bạc in one week → never below 0 (was 5 + (4 − 20) = −11); stats stay 0–100; effect objects untouched */
{
  const b = { P: { b: { S: { name: "Y", rank: 2, sung: 50, bac: 20, th: 90 } } }, W: { R: [{ id: 3, name: "N", alive: true, suc: 10, bac: 4 }] }, Q: [{ fx: { bac: -5 } }] };
  const a = { P: { b: { S: { name: "Y", rank: 2, sung: 95, bac: 5, th: 95 } } }, W: { R: [{ id: 3, name: "N", alive: true, suc: 2, bac: 1 }] }, Q: [{ fx: { bac: -5 } }] };
  const g = { P: { b: { S: { name: "Y", rank: 2, sung: 70, bac: 4, th: 99 } } }, W: { R: [{ id: 3, name: "N", alive: true, suc: 1, bac: 0 }] }, Q: [{ fx: { bac: -9 } }] };
  const m = merge3(b, a, g);
  assert.equal(m.P.b.S.bac, 0);          // 5 + (4 − 20) = −11 → 0
  assert.equal(m.P.b.S.sung, 100);       // 95 + (70 − 50) = 115 → 100
  assert.equal(m.P.b.S.th, 100);         // 95 + 9 = 104 → 100
  assert.equal(m.W.R[0].suc, 0);         // 2 + (1 − 10) = −7 → 0
  assert.equal(m.W.R[0].bac, 0);         // 1 + (0 − 4) = −3 → 0
  assert.equal(m.Q[0].fx.bac, -9);       // not a person: −5 + (−9 + 5) = −9, kept
  const ok = merge3(b, a, { P: { b: { S: { name: "Y", rank: 2, sung: 50, bac: 30, th: 90 } } } , W: b.W, Q: b.Q });
  assert.equal(ok.P.b.S.bac, 15);        // in range: plain additive merge unchanged (5 + 10)
}
console.log("merge ok");
