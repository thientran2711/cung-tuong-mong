/* 3-way merge of the canonical co-op state (dev/coop/PROTOCOL.md section 4).
   base = state at the start of the week, A = host (seat a) result, B = guest (seat b) result. Host wins conflicts that are not numbers. */
const isObj = x => x !== null && typeof x === "object" && !Array.isArray(x);
const isNum = x => typeof x === "number" && isFinite(x);
function eq(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) { if (a.length !== b.length) return false; for (let i = 0; i < a.length; i++) if (!eq(a[i], b[i])) return false; return true; }
  const ka = Object.keys(a), kb = Object.keys(b); if (ka.length !== kb.length) return false;
  for (const k of ka) { if (!Object.prototype.hasOwnProperty.call(b, k) || !eq(a[k], b[k])) return false; }
  return true;
}
/* numbers that are states/indices, not amounts: never add deltas, host wins when both changed */
const NOADD = new Set(["mood", "rank", "buoi", "tuan", "month", "year", "turn", "age", "era", "face", "hue", "fid", "fc", "fk", "id", "sid", "rid", "week",
  "life", "step", "done", "pal", "used", "lastPromo", "vacSince", "pregWk", "preg", "srk", "pid", "v", "seatBan", "until", "at", "wx"]);
/* coop-room-faces (Foreman D #16, MAIN 95): the face registries are SETS ("never hand this face out again"), not values: when both seats
   added to one, the host's list was taken whole and the guest's new faces were lost, so the host drew them again (mama:k01 / maid:m14 worn by
   two people). Union, de-duplicated, host-canon: host list first (its removals stand: figGC frees, figThPick re-roll), then every entry the
   guest ADDED since the base; a guest removal never applies (the guest never frees a face). Lists of plain values only. */
const UNION = new Set(["fidUsed", "fidDead", "usedFaces", "kidUsed", "fseen", "fdead"]);
const prim = x => Array.isArray(x) && x.every(e => e === null || typeof e !== "object");
function union3(base, a, b) {
  const k = e => typeof e + ":" + String(e); const bs = new Set((Array.isArray(base) ? base : []).map(k));
  const out = [], seen = new Set(); for (const e of a) if (!seen.has(k(e))) { seen.add(k(e)); out.push(e); }
  for (const e of b) if (!bs.has(k(e)) && !seen.has(k(e))) { seen.add(k(e)); out.push(e); }
  return out;
}
/* robot-coop-fix-2 (r2: ONE CORE + the whole group): a PERSON's numbers may not leave the game's own range after the additive merge. Both seats
   can spend from one pot in one week (each side valid on its own): base 20, host copy 5, guest copy 4 → 5 + (4 − 20) = −11 bạc on both screens
   (robot10-coop NEGTRAP). The ranges are NOT typed here: ranges.gen.js is generated from BAL.personRange (dev/build/jbalpr.js) + BAL.kh, the
   same table the game's ap / apply / statSet read (test/range.test.mjs proves equality). A person = any object with a string name (her S, a
   consort, a maid / staff / child / man / official; also tonight's pick rows S.nightWhy.rows — snapshots of in-range numbers, so the clamp
   leaves them as they are). Every STAT field of a person in its range, every value of a MAP field (rl / ro / af …, keyed by person id) in its
   range, Sức also under sucCap = the game's jkh formula over the same BAL.kh. Effect objects ({bac:-5}: no name) are never touched. Done on
   the Worker, so the stored state (next week's merge base) and both screens hold the same value. */
import { STAT, MAP, SUB, WORLD, KH, BODY } from "./ranges.gen.js";
/* who has a body (BAL.personRange.body, jkh.js khí huyết): canonical paths "W.R[]" (the consorts) / "P.*.S" (the players); only they hold Sức ≤ sucCap */
const BODY_RE = new RegExp("^(?:" + BODY.map(b => b.replace(/[.]/g, "\\.").replace(/\*/g, "[^.]+").replace(/\[\]/g, "\\[\\]")).join("|") + ")$");
const isBody = pth => BODY_RE.test(pth || "");
const inR = (v, r) => Math.max(r[0] == null ? -Infinity : r[0], Math.min(r[1] == null ? Infinity : r[1], v));
const isPerson = o => isObj(o) && typeof o.name === "string";
/* jkh.js khOf / sucCap, the same formula (khInit's defaults without writing them; test/range.test.mjs compares with jkh.js on 500 people) */
function sucCap(p) {
  const K = KH; if (!K || !K.on || !isObj(p)) return 100;
  const init = p.khScar == null; /* khInit: no scar yet → oldScar × children, temporary loss 0 */
  const scar = init ? K.oldScar * (Array.isArray(p.kids) ? p.kids.length : 0) : p.khScar, tmp = init ? 0 : p.khTmp;
  const kh = Math.max(K.capMin, Math.round(100 - Math.max(0, (p.age || 0) - K.ageFrom) * K.agePer - (scar || 0) - (tmp || 0)));
  return Math.min(100, Math.round(K.maxBase + K.maxPer * kh));
}
function clampP(o, body) {
  for (const k in STAT) { const v = o[k]; if (isNum(v)) { const w = inR(v, STAT[k]); if (w !== v) o[k] = w; } }
  for (const k in MAP) { const m = o[k]; if (isObj(m)) for (const id in m) { const v = m[id]; if (isNum(v)) { const w = inR(v, MAP[k]); if (w !== v) m[id] = w; } } }
  for (const k in SUB) { const x = o[k]; if (isObj(x)) inF(x, SUB[k]); }
  if (body && isNum(o.suc)) { const c = sucCap(o); if (o.suc > c) o.suc = c; }/* r3: a servant / maid / child / man has no body in the game (Sức 0…100 only) */
  return o;
}
function inF(x, T) { for (const f in T) { const v = x[f]; if (isNum(v)) { const w = inR(v, T[f]); if (w !== v) x[f] = w; } } return x; }
/* world objects (W.S[key], e.g. the court's biến / khó): the same additive overflow, not a person */
function clampW(st) { if (isObj(st) && isObj(st.W) && isObj(st.W.S)) for (const k in WORLD) if (isObj(st.W.S[k])) inF(st.W.S[k], WORLD[k]); return st; }
export { sucCap, clampP, isPerson, clampW, isBody };
const idArr = x => Array.isArray(x) && x.length > 0 && x.every(e => isObj(e) && e.id != null);
function m3(base, a, b, inP, key, pth) {
  if (UNION.has(key) && prim(a) && prim(b) && (base === undefined || base === null || prim(base))) return union3(base, a, b);
  if (eq(a, b)) return a;
  if (eq(a, base)) return b;
  if (eq(b, base)) return a;
  if (isNum(a) && isNum(b)) { if (!isNum(base) || NOADD.has(key)) return a; const r = a + (b - base); return Number.isInteger(a) && Number.isInteger(b) ? Math.round(r) : r; }
  if (isObj(a) && isObj(b)) {
    const bs = isObj(base) ? base : {}; const out = {};
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const v = m3(bs[k], a[k], b[k], inP || k === "P", k, pth ? pth + "." + k : k);
      if (v !== undefined) out[k] = v;
    }
    return isPerson(out) ? clampP(out, isBody(pth)) : out;
  }
  if ((idArr(a) || (Array.isArray(a) && !a.length)) && (idArr(b) || (Array.isArray(b) && !b.length)) && (idArr(a) || idArr(b))) {
    const bm = new Map((Array.isArray(base) ? base : []).filter(isObj).map(e => [String(e.id), e]));
    const bmA = new Map(a.map(e => [String(e.id), e])), bmB = new Map(b.map(e => [String(e.id), e]));
    const out = [];
    for (const e of a) {
      const id = String(e.id);
      if (bmB.has(id)) out.push(m3(bm.get(id), e, bmB.get(id), inP, key, (pth || "") + "[]"));
      else if (bm.has(id)) { if (!eq(bm.get(id), e)) out.push(e); /* B removed, A changed: keep A */ }
      else out.push(e);
    }
    for (const e of b) {
      const id = String(e.id); if (bmA.has(id)) continue;
      if (bm.has(id)) { if (!eq(bm.get(id), e)) out.push(e); continue; } // A removed it; keep only if B changed it
      if (inP) out.push(e); // new on the guest side: only her own things
    }
    return out;
  }
  return a;
}
export function merge3(base, A, B) { return clampW(m3(base, A, B, false)); }
export { eq };
