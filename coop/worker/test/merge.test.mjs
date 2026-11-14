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
console.log("merge ok");
