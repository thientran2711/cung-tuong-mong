/* ctm-rank — Bảng vinh danh of Cung Tường Mộng (dev/LEADERBOARD.md).
   One Durable Object "Board" (SQLite storage) holds every player and every life; the Worker only adds CORS and forwards.
   The co-op Worker ctm-coop is a separate script and is not touched. */
import {makeBoard,LIMITS} from "./board.js";
const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type","Access-Control-Max-Age":"86400"};
const J=(st,o)=>new Response(JSON.stringify(o),{status:st,headers:Object.assign({"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"},CORS)});
async function ipHash(req){const ip=req.headers.get("CF-Connecting-IP")||"-";const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode("ip:"+ip));return [...new Uint8Array(b)].slice(0,8).map(x=>x.toString(16).padStart(2,"0")).join("")}
export class Board{
 constructor(ctx,env){const sql=ctx.storage.sql;this.core=makeBoard({all:(q,...a)=>sql.exec(q,...a).toArray(),run:(q,...a)=>{sql.exec(q,...a).toArray()}})}
 async fetch(req){const u=new URL(req.url);let body=null;
  if(req.method==="POST"){const t=await req.text();if(t.length>LIMITS.body)return J(413,{ok:false,why:"big"});try{body=JSON.parse(t)}catch(e){return J(400,{ok:false,why:"json"})}}
  const [st,o]=await this.core.handle(req.method,u.pathname.replace(/\/+$/,"")||"/",u.searchParams,body,req.headers.get("x-ip")||"-");return J(st,o)}}
export default{async fetch(req,env){if(req.method==="OPTIONS")return new Response(null,{status:204,headers:CORS});
 if(req.method!=="GET"&&req.method!=="POST")return J(405,{ok:false});
 const h=new Headers(req.headers);h.set("x-ip",await ipHash(req));
 const stub=env.BOARD.get(env.BOARD.idFromName("board"));
 return stub.fetch(new Request(req.url,{method:req.method,headers:h,body:req.method==="POST"?await req.text():undefined}))}};
