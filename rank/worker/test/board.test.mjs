/* unit test: board API (rank/worker/src/board.js) on node:sqlite — node rank/worker/test/board.test.mjs */
import {makeBoard,nameProblem} from "../src/board.js";
import {nodeDb} from "./nodedb.mjs";
let t=1e12;const now=()=>t;const B=makeBoard(nodeDb(),now);let fail=0;
const ok=(c,m)=>{if(!c){fail++;console.log("FAIL",m)}else console.log("ok  ",m)};
const call=async(m,p,body,q)=>{const [st,o]=await B.handle(m,p,new URLSearchParams(q||""),body,"ip1");return Object.assign({st},o)};
const G=["aaaaaaaaaaaaaaaaaaaa1","bbbbbbbbbbbbbbbbbbbb2","cccccccccccccccccccc3"];
const life=o=>Object.assign({n:"Thẩm Mi Trang",o:"tt",mr:3,sr:-1,y:2,age:18,age0:16,sons:0,daus:0,tz:0,danh:20,duc:30,tg:0,endk:"Hồng nhan bạc mệnh",fate:"Bệnh mà chết",fig:"img/fig-consort-c01-t3-a18.webp"},o);
const h=await call("POST","/hello",{gid:G[0]});ok(h.ok&&/^Khách vô danh #\d{4}$/.test(h.me.pn),"guest gets a default name "+h.me.pn);
const h2=await call("POST","/hello",{gid:G[0]});ok(h2.me.pid===h.me.pid&&h2.me.pn===h.me.pn,"same guest id = same player");
ok((await call("POST","/hello",{gid:"x"})).st===400,"bad guest id refused");
/* lives */
let r=await call("POST","/life",{gid:G[0],lid:"life0001",life:life({mr:7,y:5,age:21})});ok(r.ok&&r.rank===1&&r.of===1,"first life rank 1 of 1, score "+r.score);
ok(r.score===2200+200+60+90,"server re-computes the score (ignores any sent score)");
t+=20000;r=await call("POST","/life",{gid:G[0],lid:"life0002",life:life({mr:2,y:1,age:17,score:999999})});ok(r.ok&&r.rank===2,"second life of the same player = its own row, rank 2");
r=await call("POST","/life",{gid:G[0],lid:"life0002",life:life({mr:2,y:1,age:17})});ok(r.ok&&r.rank===2&&r.of===2,"re-send of the same life is idempotent (offline queue)");
t+=1000;r=await call("POST","/life",{gid:G[0],lid:"life0003",life:life({mr:2,y:1,age:17})});ok(r.st===429,"rate limit: a life 1 s after the last is refused");
t+=20000;r=await call("POST","/life",{gid:G[1],lid:"life0004",life:life({mr:7,y:12,age:28,sons:1,tz:1,endk:"Hoàng thái hậu",alive:true})});ok(r.ok&&r.rank===1,"better life takes rank 1");
r=await call("POST","/life",{gid:G[2],lid:"life0005",life:life({mr:9})});ok(r.st===422,"impossible summary refused ("+r.why+")");
r=await call("POST","/life",{gid:G[2],lid:"life0004",life:life({})});ok(r.st===409,"a life id of another player refused");
t+=20000;r=await call("POST","/life",{gid:G[2],lid:"life0006",life:life({mr:0,y:0,age:16})});ok(r.ok&&r.rank===4,"low life is last");
/* tops */
let L=await call("GET","/top/lives",null,"n=2&gid="+G[2]);ok(L.rows.length===2&&L.rows[0].lid==="life0004"&&L.rows[1].lid==="life0001","top lives in order");
ok(L.mine&&L.mine.r===4&&L.mine.lid==="life0006","my best life shown even outside the top");
ok(!JSON.stringify(L).includes(G[0])&&!JSON.stringify(L).includes("gh"),"guest ids never leave the server");
let P=await call("GET","/top/players",null,"n=10&gid="+G[0]);ok(P.rows.length===3&&P.rows[0].pid===P.rows[0].pid&&P.rows[0].k===1&&P.rows[1].k===2,"players: one row each (best life, number of lives)");
ok(P.rows[1].t===P.rows[1].s+(await call("GET","/top/lives",null,"n=10")).rows.find(x=>x.lid==="life0002").s,"player total = sum of lives");
ok(P.mine&&P.mine.r===2,"my player rank");
/* names */
r=await call("POST","/name",{gid:G[0],name:"Chân Hoàn"});ok(r.ok&&r.me.pn==="Chân Hoàn","rename");
r=await call("POST","/name",{gid:G[1],name:"chan hoan"});ok(!r.ok&&/đã có người/.test(r.why),"duplicate name (case/tones) refused");
r=await call("POST","/name",{gid:G[1],name:"Đồ ngốc đụ"});ok(!r.ok&&/không nhã/.test(r.why),"obscene name refused");
for(const [n,bad] of [["Du Phi",false],["Long Nguyệt",false],["Buổi sáng",false],["Các tỷ",false],["vcl",true],["Fuck you",true],["d i t",false],["Khách vô danh #1",true],["a",true],["<b>x</b>",true],["Nhàn phi 2",false]])
 ok(!!nameProblem(n)===bad,`name "${n}" ${bad?"refused":"allowed"}`);
L=await call("GET","/top/lives",null,"n=5");ok(L.rows.find(x=>x.lid==="life0001").pn==="Chân Hoàn","life rows show the current name");
const M=await call("GET","/me",null,"gid="+G[0]);ok(M.ok&&M.lives.length===2&&M.me.k===2,"/me: my lives");
console.log(fail?`${fail} FAILED`:"ALL OK");process.exit(fail?1:0);
