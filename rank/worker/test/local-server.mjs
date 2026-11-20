/* local stand-in for the Worker ctm-rank (same board.js on node:sqlite) for e2e tests.
   usage: node rank/worker/test/local-server.mjs [port=8791] [dbfile=:memory:]   env GAP=<ms between lives of one player> */
import http from "node:http";
import {makeBoard,LIMITS} from "../src/board.js";
import {nodeDb} from "./nodedb.mjs";
const port=+(process.argv[2]||8791);if(process.env.GAP)LIMITS.lifeGap=+process.env.GAP;
const B=makeBoard(nodeDb(process.argv[3]||":memory:"));
const CORS={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,OPTIONS","Access-Control-Allow-Headers":"Content-Type"};
http.createServer(async(req,res)=>{if(req.method==="OPTIONS"){res.writeHead(204,CORS);return res.end()}
 const u=new URL(req.url,"http://x");let body=null;
 if(req.method==="POST"){let t="";for await(const c of req)t+=c;try{body=JSON.parse(t)}catch(e){res.writeHead(400,CORS);return res.end("{}")}}
 const [st,o]=await B.handle(req.method,u.pathname.replace(/\/+$/,"")||"/",u.searchParams,body,"local");
 res.writeHead(st,Object.assign({"Content-Type":"application/json"},CORS));res.end(JSON.stringify(o))}).listen(port,()=>console.log("rank local on",port));
