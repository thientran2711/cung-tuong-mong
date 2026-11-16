/* Sổ mây Worker tests (no network): node test/vault.test.mjs */
import assert from "node:assert/strict";
import worker, { Vault } from "../src/index.js";
import { VAULT, normCode, cleanBundle } from "../src/vault.js";
import { mockNamespace } from "./mock-do.mjs";
const O = "https://thientran2711.github.io";
const env = { VAULT_ORIGINS: O }; env.VAULT = mockNamespace(Vault, env);
const call = async (op, body, o = {}) => { const r = await worker.fetch(new Request("https://w/api/vault/" + op, { method: o.method || "POST",
  headers: { "content-type": o.type || "application/json", Origin: o.origin === undefined ? O : o.origin }, body: o.raw != null ? o.raw : JSON.stringify(body) }), env);
  let j = null; try { j = await r.json(); } catch (e) {} return { s: r.status, j, h: r.headers }; };
const slot = t => "CTM2:" + Buffer.from(t).toString("base64");
const B = (n, extra = {}) => ({ dev: "Điện thoại", slots: { 1: slot("life-" + n), 2: null, 3: null }, sum: { 1: { n: "Lan " + n, w: "Đáp ứng", a: 16, d: "Tháng ba" } }, rooms: [], ...extra });
let ok = 0; const t = (c, m) => { assert.ok(c, m); ok++; };

/* CORS: only the game origin */
let r = await call("new", {}, { origin: "https://evil.example" }); t(r.s === 403, "foreign origin refused");
r = await call("new", {}, { origin: "" }); t(r.s === 403, "no origin refused");
const pre = await worker.fetch(new Request("https://w/api/vault/new", { method: "OPTIONS", headers: { Origin: O } }), env);
t(pre.status === 204 && pre.headers.get("access-control-allow-origin") === O, "preflight ok for the game origin");
const pre2 = await worker.fetch(new Request("https://w/api/vault/new", { method: "OPTIONS", headers: { Origin: "https://evil.example" } }), env);
t(pre2.status === 403 && !pre2.headers.get("access-control-allow-origin"), "preflight refused for others");
r = await call("new", {}, { method: "GET", raw: "" }).catch(() => ({ s: 0 }));
t(r.s === 405 || r.s === 0, "GET refused");
r = await call("new", {}, { type: "text/plain" }); t(r.s === 415, "non-JSON refused");

/* code: 8 chars (40 bits, owner design), unique, server-made */
r = await call("new", {}); t(r.s === 200 && r.j.k.length === VAULT.LEN && VAULT.LEN === 8 && [...r.j.k].every(c => VAULT.ALPH.includes(c)), "new code");
t(r.h.get("access-control-allow-origin") === O && r.h.get("cache-control") === "no-store", "cors + no-store on reply");
const k = r.j.k; const codes = new Set(); for (let i = 0; i < 50; i++) codes.add((await call("new", {})).j.k); t(codes.size === 50, "codes unique");
t(normCode(k.toLowerCase().replace(/(.{4})/g, "$1-")) === k, "typed code normalised");
t(!env.VAULT._objs.has(k) && [...env.VAULT._objs.keys()].every(n => /^[0-9a-f]{64}$/.test(n)), "the code is never the storage name (sha-256)");
r = await call("head", { k: "0".repeat(VAULT.LEN) }); t(r.s === 404, "unknown code = 404, nothing created");
r = await call("head", { k: "abc" }); t(r.s === 404, "malformed code = 404");

/* round trip */
r = await call("head", { k }); t(r.s === 200 && r.j.rev === 0, "empty head");
r = await call("put", { k, base: 0, b: B(1) }); t(r.s === 200 && r.j.rev === 1 && r.j.head === 1, "first put");
r = await call("get", { k }); t(r.j.rev === 1 && r.j.slots[1] === slot("life-1") && r.j.slots[2] === null && r.j.sum[1].n === "Lan 1", "get head");
/* conflict: stale base */
r = await call("put", { k, base: 1, b: B(2) }); t(r.j.rev === 2, "put 2");
r = await call("put", { k, base: 1, b: B(3) }); t(r.s === 409 && r.j.error === "conflict" && r.j.rev === 2 && r.j.sum[1].n === "Lan 2", "stale base = 409 with the cloud summary");
r = await call("put", { k, base: 1, keep: 1, b: B("bk") }); t(r.s === 200 && r.j.head === 2 && r.j.rev === 3, "keep=1 stores a backup, head unchanged");
r = await call("get", { k, rev: 3 }); t(r.j.keep === 1 && r.j.slots[1] === slot("life-bk"), "backup readable");
/* 10-version cap, head never dropped */
let base = 2; for (let i = 0; i < 14; i++) { r = await call("put", { k, base, b: B("v" + i) }); base = r.j.rev; }
r = await call("list", { k }); t(r.j.versions.length === VAULT.KEEP && r.j.versions[0].rev === base && r.j.head === base, "10 versions, newest first");
t(r.j.versions.every((v, i, a) => !i || a[i - 1].rev > v.rev), "sorted");
const o = [...env.VAULT._objs.values()].find(x => x.st.storage._m.get("meta") && x.st.storage._m.get("meta").head === base).st.storage._m;
t([...o.keys()].filter(x => x.startsWith("v:")).length === VAULT.KEEP, "old version chunks deleted from storage");
r = await call("get", { k, rev: 1 }); t(r.s === 404, "trimmed version gone");
/* validation */
r = await call("put", { k, base, b: { ...B(9), slots: { 1: "<script>" } } }); t(r.s === 400 && r.j.error === "slot", "bad slot text refused");
r = await call("put", { k, base, b: { ...B(9), slots: { 1: "CTM2:" + "A".repeat(VAULT.MAX_SLOT) } } }); t(r.s === 400, "oversize slot refused");
r = await call("put", { k, base, b: { ...B(9), rooms: [{ room: "ab" }] } }); t(r.s === 400, "bad room refused");
r = await call("put", { k, base, b: { ...B(9), rooms: [1, 2, 3, 4] } }); t(r.s === 400, "too many rooms refused");
r = await call("put", { k, base: "x", b: B(9) }); t(r.s === 400, "bad base refused");
r = await call("put", { k, base }, { raw: "{" }); t(r.s === 400, "bad JSON refused");
r = await call("put", {}, { raw: "x".repeat(VAULT.MAX_BODY + 10) }); t(r.s === 413, "body over limit refused");
const cb = cleanBundle({ dev: "<b>x</b>\u0007", evil: 1, slots: { 1: slot("a"), 4: slot("z") }, sum: { 1: { n: "<img>", a: 999, x: 1 } },
  rooms: [{ room: "K7QD", seat: "a", pid: "abcdef1234567890", name: "A", at: 5, ip: "1.2.3.4" }] }).b;
t(!("evil" in cb) && !("4" in cb.slots) && cb.dev === "bx/b" && cb.sum[1].n === "img" && cb.sum[1].a === null && !("x" in cb.sum[1]) && !("ip" in cb.rooms[0]), "whitelist rebuild");
r = await call("put", { k, base, b: { ...B(9), rooms: [{ room: "K7QD", seat: "b", pid: "abcdef1234567890", name: "Mai", at: 7 }] } });
t(r.s === 200, "rooms accepted"); base = r.j.rev; r = await call("get", { k }); t(r.j.rooms[0].pid === "abcdef1234567890" && r.j.sum.r[0].room === "K7QD", "rooms round trip");
/* per-vault rate limit */
const k2 = (await call("new", {})).j.k; let s429 = 0, b2 = 0;
for (let i = 0; i < VAULT.MAX_PUT + 3; i++) { const x = await call("put", { k: k2, base: b2, b: B(i) }); if (x.s === 429) s429++; else b2 = x.j.rev; }
t(s429 === 3, "put rate limit per vault");
/* per-IP binding (when deployed) */
const env2 = { ...env, VAULT_RL: { limit: async () => ({ success: false }) } };
const rr = await worker.fetch(new Request("https://w/api/vault/head", { method: "POST", headers: { "content-type": "application/json", Origin: O, "CF-Connecting-IP": "9.9.9.9" }, body: JSON.stringify({ k }) }), env2);
t(rr.status === 429, "per-IP limit binding honoured");
/* drop */
r = await call("drop", { k: k2 }); t(r.j.ok, "drop"); r = await call("head", { k: k2 }); t(r.s === 404, "dropped vault gone");
/* GUARD (r1): per-network miss lockout, works without the [[ratelimits]] binding */
import { netKey } from "../src/vault.js";
t(netKey("1.2.3.4") === "4:1.2.3.4" && netKey("2001:db8:1:2a00::5") === netKey("2001:db8:1:2aff:ffff::9") && netKey("2001:db8:1:2a00::5") !== netKey("2001:db8:1:2b00::5") && netKey("") === "" && netKey("::ffff:1.2.3.4") === "4:1.2.3.4", "net key: IPv4 address, IPv6 /56");
const ipCall = (op, body, ip) => worker.fetch(new Request("https://w/api/vault/" + op, { method: "POST", headers: { "content-type": "application/json", Origin: O, "CF-Connecting-IP": ip }, body: JSON.stringify(body) }), env);
const live = (await ipCall("new", {}, "5.5.5.5")).status === 200;
const kG = (await call("new", {})).j.k; const rnd = i => ("ZZZZZZZ" + "0123456789ABCDEFGHJKMNPQRSTVWXYZ"[i % 32]);
let st = []; for (let i = 0; i < VAULT.G.MISS_H; i++) st.push((await ipCall("head", { k: rnd(i) }, "7.7.7.7")).status);
t(live && st.every(x => x === 404), "misses under the limit answer 404");
t((await ipCall("head", { k: rnd(99) }, "7.7.7.7")).status === 429 && (await ipCall("head", { k: kG }, "7.7.7.7")).status === 429, "after MISS_H misses every lookup from that network is refused (even a real code)");
t((await ipCall("head", { k: kG }, "7.7.7.8")).status === 200, "other networks unaffected");
const par = await Promise.all(Array.from({ length: 40 }, (_, i) => ipCall("head", { k: rnd(i + 40) }, "6.6.6.6").then(x => x.status)));
t(par.filter(x => x === 404).length <= VAULT.G.MISS_H, "parallel guesses cannot pass the limit (in-flight count)");
let hits = 0; for (let i = 0; i < 25; i++) if ((await ipCall("head", { k: kG }, "8.8.4.4")).status === 200) hits++; t(hits === 25, "real-code lookups never count as misses");
let nn = 0; for (let i = 0; i < VAULT.G.NEW_H + 3; i++) if ((await ipCall("new", {}, "4.4.4.4")).status === 200) nn++; t(nn === VAULT.G.NEW_H, "new codes per network capped");
const gobj = [...env.VAULT._objs.values()].find(x => x.st.storage._m.get("g") && x.st.storage._m.get("g").hm >= VAULT.G.MISS_H);
t(gobj && !gobj.st.storage._m.has("meta") && !JSON.stringify([...gobj.st.storage._m.values()]).includes("7.7.7.7"), "guard state persisted; no IP stored");
gobj.inst.g = null; gobj.inst.fly = 0; t((await ipCall("head", { k: kG }, "7.7.7.7")).status === 429, "lockout survives eviction (persisted)");
/* co-op rooms endpoints untouched */
const h = await worker.fetch(new Request("https://w/api/health"), env); t(h.status === 200, "health still ok");
console.log("vault ok", ok);
