/* Local stand-in for Cloudflare Durable Objects (enough for src/vault.js): in-memory storage per object name,
   structured-clone values like the real storage API. Used by test/vault.test.mjs and test/mock-server.mjs. */
export function mockNamespace(Cls, env) {
  const objs = new Map();
  const mkStorage = () => { const m = new Map(); const cl = v => structuredClone(v);
    return { _m: m,
      async get(k) { if (Array.isArray(k)) { const r = new Map(); for (const x of k) if (m.has(x)) r.set(x, cl(m.get(x))); return r; } return m.has(k) ? cl(m.get(k)) : undefined; },
      async put(k, v) { if (typeof k === "object") { for (const x in k) m.set(x, cl(k[x])); } else m.set(k, cl(v)); },
      async delete(k) { if (Array.isArray(k)) { let n = 0; for (const x of k) n += m.delete(x) ? 1 : 0; return n; } return m.delete(k); },
      async deleteAll() { m.clear(); }, async setAlarm() {}, async getAlarm() { return null; } }; };
  return { _objs: objs,
    idFromName(n) { return { name: String(n), toString() { return this.name; } }; },
    get(id) { let o = objs.get(id.name); if (!o) { const st = { storage: mkStorage() }; o = { inst: new Cls(st, env), st }; objs.set(id.name, o); }
      return { fetch: (u, init) => o.inst.fetch(u instanceof Request ? u : new Request(u, init)) }; } };
}
