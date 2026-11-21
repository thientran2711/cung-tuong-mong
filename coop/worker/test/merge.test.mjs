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
console.log("merge ok");
