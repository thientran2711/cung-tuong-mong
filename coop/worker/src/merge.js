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
const idArr = x => Array.isArray(x) && x.length > 0 && x.every(e => isObj(e) && e.id != null);
function m3(base, a, b, inP, key) {
  if (UNION.has(key) && prim(a) && prim(b) && (base === undefined || base === null || prim(base))) return union3(base, a, b);
  if (eq(a, b)) return a;
  if (eq(a, base)) return b;
  if (eq(b, base)) return a;
  if (isNum(a) && isNum(b)) { if (!isNum(base) || NOADD.has(key)) return a; const r = a + (b - base); return Number.isInteger(a) && Number.isInteger(b) ? Math.round(r) : r; }
  if (isObj(a) && isObj(b)) {
    const bs = isObj(base) ? base : {}; const out = {};
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of keys) {
      const v = m3(bs[k], a[k], b[k], inP || k === "P", k);
      if (v !== undefined) out[k] = v;
    }
    return out;
  }
  if ((idArr(a) || (Array.isArray(a) && !a.length)) && (idArr(b) || (Array.isArray(b) && !b.length)) && (idArr(a) || idArr(b))) {
    const bm = new Map((Array.isArray(base) ? base : []).filter(isObj).map(e => [String(e.id), e]));
    const bmA = new Map(a.map(e => [String(e.id), e])), bmB = new Map(b.map(e => [String(e.id), e]));
    const out = [];
    for (const e of a) {
      const id = String(e.id);
      if (bmB.has(id)) out.push(m3(bm.get(id), e, bmB.get(id), inP, key));
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
export function merge3(base, A, B) { return m3(base, A, B, false); }
export { eq };
