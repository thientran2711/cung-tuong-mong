/* Local mock of the deployed Worker for client tests: node test/mock-server.mjs <port> [allowed-origin,...]
   Runs the REAL src/index.js fetch handler with the Vault class on mock Durable Objects (test/mock-do.mjs).
   Prints "listening <port>" when ready. Co-op rooms (WebSocket) are not served by this mock. */
import http from "node:http";
import worker, { Vault } from "../src/index.js";
import { mockNamespace } from "./mock-do.mjs";
const port = +process.argv[2] || 8787;
const env = { VAULT_ORIGINS: process.argv[3] || "http://ctm.local" };
env.VAULT = mockNamespace(Vault, env);
http.createServer(async (rq, rs) => {
  const parts = []; for await (const c of rq) parts.push(c);
  const body = Buffer.concat(parts);
  const h = new Headers(); for (const [k, v] of Object.entries(rq.headers)) if (typeof v === "string") h.set(k, v);
  h.set("CF-Connecting-IP", rq.socket.remoteAddress || "");
  const req = new Request("http://127.0.0.1:" + port + rq.url, { method: rq.method, headers: h, body: ["GET", "HEAD"].includes(rq.method) ? undefined : body });
  try { const r = await worker.fetch(req, env); rs.writeHead(r.status, Object.fromEntries(r.headers)); rs.end(Buffer.from(await r.arrayBuffer())); }
  catch (e) { console.error(e); rs.writeHead(500); rs.end("err"); }
}).listen(port, "127.0.0.1", () => console.log("listening " + port));
