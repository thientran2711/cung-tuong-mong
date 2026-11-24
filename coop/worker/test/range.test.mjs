/* robot-coop-fix-2 r2 (review FAIL items 1–3): the Worker's person ranges ARE the game's (ONE CORE), every clamped person field is covered
   (the whole group), Sức stays under the game's own sucCap, effect objects are never touched. */
import { merge3, sucCap, clampP, isPerson, isBody } from "../src/merge.js";
import { STAT, MAP, SUB, WORLD, KH, BODY } from "../src/ranges.gen.js";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
/* 1. ONE CORE: the committed table = BAL (generator --check); the game's clamps read the same table */
execFileSync("node", [path.join(ROOT, "dev/build/gen_coop_ranges.js"), "--check"], { stdio: "pipe" });
{ const ctx = { BAL: {} }; vm.createContext(ctx); vm.runInContext(readFileSync(path.join(ROOT, "dev/build/jbalpr.js"), "utf8"), ctx);
  assert.deepEqual(JSON.parse(JSON.stringify(ctx.BAL.personRange.stat)), STAT); assert.deepEqual(JSON.parse(JSON.stringify(ctx.BAL.personRange.map)), MAP);
  assert.deepEqual(JSON.parse(JSON.stringify(ctx.BAL.personRange.sub)), SUB); assert.deepEqual(JSON.parse(JSON.stringify(ctx.BAL.personRange.world)), WORLD);
  for (const k of ctx.BAL.personRange.core) assert.ok(STAT[k], "core stat " + k + " has a range");
  assert.deepEqual(MAP.rl, JSON.parse(JSON.stringify(ctx.BAL.linkRange.rl))); assert.deepEqual(MAP.ro, JSON.parse(JSON.stringify(ctx.BAL.linkRange.ro)));
  /* r3: the canonical feeling maps are the stats' own ranges (gp = ghen, ep = ev), and the body set is BAL's */
  assert.deepEqual(MAP.gp, STAT.ghen); assert.deepEqual(MAP.ep, STAT.ev); assert.deepEqual(BODY, JSON.parse(JSON.stringify(ctx.BAL.personRange.body))); }
{ const j8 = readFileSync(path.join(ROOT, "dev/build/j8.js"), "utf8"), j1 = readFileSync(path.join(ROOT, "dev/build/j1.js"), "utf8");
  const ap = j8.slice(j8.indexOf("function ap(p,o)"), j8.indexOf("function dieIf")), apply = j1.slice(j1.indexOf("function apply(o)"), j1.indexOf("function apply(o)") + 900),
    st = j1.slice(j1.indexOf("function statSet"), j1.indexOf("function statSet") + 300);
  for (const [n, src] of [["j8 ap", ap], ["j1 apply", apply], ["j1 statSet", st]]) {
    assert.ok(/BAL\.personRange/.test(src), n + " reads BAL.personRange");
    assert.ok(!/"sung","danh"|cl\(\w+\.(th|hh),-100,100\)|Math\.max\(0,\w+\.bac/.test(src.replace(/\/\*[\s\S]*?\*\//g, "")), n + " types no range of its own"); } }
/* 2. sucCap = the game's jkh.js sucCap over the same BAL.kh (500 people: age, children, scars, temporary loss) */
{ const ctx = { BAL: { kh: KH }, S: { age: 20 } }; vm.createContext(ctx); const jkh = readFileSync(path.join(ROOT, "dev/build/jkh.js"), "utf8"), i0 = jkh.indexOf("function khB("), i1 = jkh.indexOf("\n", jkh.indexOf("function sucCap("));
  assert.ok(i0 >= 0 && i1 > i0, "jkh.js: khB … sucCap found"); vm.runInContext(jkh.slice(i0, i1), ctx);/* the game's own functions, as written (the rest of jkh.js wraps the engine) */
  let seed = 7; const rnd = n => (seed = (seed * 16807) % 2147483647) % n;
  for (let i = 0; i < 500; i++) {
    const p = { name: "x", age: 14 + rnd(60), kids: Array.from({ length: rnd(6) }, () => ({})) }; if (rnd(2)) p.khScar = rnd(30); if (rnd(2)) p.khTmp = rnd(40);
    const w = sucCap(JSON.parse(JSON.stringify(p))), g = ctx.sucCap(JSON.parse(JSON.stringify(p)));
    assert.equal(w, g, "sucCap " + JSON.stringify(p)); } }
/* 3. the reviewer's merge3 proof table (base → host, guest): every row now in the game's range */
const one = (base, h, g) => merge3({ W: { R: [base] } }, { W: { R: [h] } }, { W: { R: [g] } }).W.R[0];
const P = (o) => Object.assign({ id: 3, name: "N", alive: true, rank: 2 }, o);
const rows = [
  ["R[].rl[id]", P({ rl: { 901: 90 } }), P({ rl: { 901: 100 } }), P({ rl: { 901: 95 } }), m => m.rl[901], 100],
  ["R[].ro[id]", P({ ro: { 901: 10 } }), P({ ro: { 901: 0 } }), P({ ro: { 901: 4 } }), m => m.ro[901], 0],
  ["R[].staff[].loyal", P({ staff: [{ id: 5, sid: 5, name: "s", loyal: 10 }] }), P({ staff: [{ id: 5, sid: 5, name: "s", loyal: 0 }] }), P({ staff: [{ id: 5, sid: 5, name: "s", loyal: 2 }] }), m => m.staff[0].loyal, 0],
  ["maid.loyal", P({ maid: { name: "m", loyal: 10 } }), P({ maid: { name: "m", loyal: 0 } }), P({ maid: { name: "m", loyal: 3 } }), m => m.maid.loyal, 0],
  ["tin", P({ tin: 95 }), P({ tin: 100 }), P({ tin: 98 }), m => m.tin, 100],
  ["pg", P({ pg: 95 }), P({ pg: 100 }), P({ pg: 99 }), m => m.pg, 100],
  ["oan", P({ oan: 5 }), P({ oan: 0 }), P({ oan: 1 }), m => m.oan, 0],
  ["ev", P({ ev: 3 }), P({ ev: 0 }), P({ ev: 1 }), m => m.ev, 0],
  ["suc ≤ sucCap (age 60, 3 kids)", P({ suc: 60, age: 60, kids: [{ id: 1, name: "k" }, { id: 2, name: "k" }, { id: 3, name: "k" }] }), P({ suc: 70, age: 60, kids: [{ id: 1, name: "k" }, { id: 2, name: "k" }, { id: 3, name: "k" }] }), P({ suc: 75, age: 60, kids: [{ id: 1, name: "k" }, { id: 2, name: "k" }, { id: 3, name: "k" }] }), m => m.suc, null],
  ["kids[].hp", P({ kids: [{ id: 1, name: "k", hp: 95 }] }), P({ kids: [{ id: 1, name: "k", hp: 100 }] }), P({ kids: [{ id: 1, name: "k", hp: 99 }] }), m => m.kids[0].hp, 100],
  ["men af[id]", P({ af: { 901: -95 } }), P({ af: { 901: -100 } }), P({ af: { 901: -99 } }), m => m.af[901], -100],
];
const table = [];
rows.push(["kids[].hW.joy (married daughter)", P({ kids: [{ id: 1, name: "k", hW: { kind: "hoa", joy: 95 } }] }), P({ kids: [{ id: 1, name: "k", hW: { kind: "hoa", joy: 100 } }] }), P({ kids: [{ id: 1, name: "k", hW: { kind: "hoa", joy: 99 } }] }), m => m.kids[0].hW.joy, 100]);
rows.push(["nt (her nữ công)", P({ nt: 95 }), P({ nt: 100 }), P({ nt: 98 }), m => m.nt, 100]);
for (const [n, b, h, g, get, want] of rows) {
  const m = one(b, h, g), v = get(m), w = want == null ? sucCap(m) : want;
  assert.equal(v, w, n); table.push(`| ${n} | ${v} |`);
}
/* r3 (review r2 FAIL 1): the CANONICAL shape — toCanon moved her ghen / ev into gp[mp] / ep[mp] (and rel / oan into rl / ro) */
rows.length = 0;
for (const [n, b, h, g, get, want] of [
  ["R[].ep[mp] (her ev, canon)", P({ ep: { 901: 3 } }), P({ ep: { 901: 0 } }), P({ ep: { 901: 1 } }), m => m.ep[901], 0],
  ["R[].gp[mp] (her ghen, canon) high", P({ gp: { 901: 95 } }), P({ gp: { 901: 100 } }), P({ gp: { 901: 99 } }), m => m.gp[901], 100],
  ["R[].gp[mp] (her ghen, canon) low", P({ gp: { 901: 5 } }), P({ gp: { 901: 0 } }), P({ gp: { 901: 1 } }), m => m.gp[901], 0],
]) { const m = one(b, h, g), v = get(m); assert.equal(v, want, n); table.push(`| ${n} | ${v} |`); }
/* r3 (review r2 FAIL 2): Sức ≤ sucCap only on a body (the consorts W.R[], the players P.<seat>.S) — a servant's Sức over the cap is the game's own number */
assert.ok(isBody("W.R[]") && isBody("P.a.S") && isBody("P.b.S") && !isBody("W.R[].staff[]") && !isBody("P.a.S.maid") && !isBody("W.S"));
{ const st = (loyal) => P({ age: 40, staff: [{ id: 5, sid: 5, name: "s", age: 59, suc: 81, loyal }] });
  const m = one(st(50), st(55), st(52)); assert.equal(m.staff[0].suc, 81, "staff Sức over sucCap stays (no body)"); assert.equal(m.staff[0].loyal, 57);
  table.push(`| R[].staff[].suc 81 (age 59, cap ${sucCap({ name: "s", age: 59 })}), both seats moved loyal | ${m.staff[0].suc} |`); }
{ const her = (suc) => ({ name: "her", age: 60, kids: [{}, {}, {}], suc });
  const m = merge3({ P: { a: { name: "her", S: her(60) } } }, { P: { a: { name: "her", S: her(70) } } }, { P: { a: { name: "her", S: her(75) } } }).P.a.S;
  assert.equal(m.suc, sucCap(m), "her Sức (P.a.S) ≤ sucCap"); table.push(`| P.a.S.suc 60→70,75 (age 60, 3 kids) | ${m.suc} = sucCap |`); }
/* world: the court's biến / khó (W.S.trieu, not a person) */
{ const w = merge3({ W: { S: { trieu: { bien: 95, kho: 5 } } } }, { W: { S: { trieu: { bien: 100, kho: 0 } } } }, { W: { S: { trieu: { bien: 99, kho: 2 } } } }).W.S.trieu;
  assert.equal(w.bien, 100); assert.equal(w.kho, 0); table.push(`| W.S.trieu.bien / kho | ${w.bien} / ${w.kho} |`); }
/* 4. not a person (no name): an effect object keeps its additive merge; a person's in-range numbers are unchanged */
assert.equal(merge3({ Q: [{ fx: { bac: -5 } }] }, { Q: [{ fx: { bac: -5 } }] }, { Q: [{ fx: { bac: -9 } }] }).Q[0].fx.bac, -9);
assert.ok(!isPerson({ fx: 1 }) && isPerson({ name: "a" }));
{ const p = { name: "a", sung: 50, bac: 3, rl: { 1: 20 }, suc: 40, age: 20 }; assert.deepEqual(clampP(JSON.parse(JSON.stringify(p))), p); }
/* 5. tonight's pick rows (S.nightWhy.rows: name + id + sung snapshots) are persons by this rule: in-range snapshots stay as they are */
{ const r = { id: 3, name: "N", sung: 77, w: 4, n6: 2, share: 31 }; assert.deepEqual(clampP(JSON.parse(JSON.stringify(r))), r); }
if (process.argv.includes("--table")) console.log("| field | merged (after) |\n|---|---|\n" + table.join("\n"));
console.log("range ok");
