/* E66 forged-record test: every forged life must be REFUSED (422) by the Worker and never reach the board — node rank/worker/test/forged.test.mjs */
import {makeBoard} from "../src/board.js";
import {nodeDb} from "./nodedb.mjs";
let t=1e12;const B=makeBoard(nodeDb(),()=>t);let fail=0,n=0;
const ok=(c,m)=>{if(!c){fail++;console.log("FAIL",m)}else console.log("ok  ",m)};
const call=async(m,p,body,q)=>{const [st,o]=await B.handle(m,p,new URLSearchParams(q||""),body,"ip"+(n%50));return Object.assign({st},o)};
const base=o=>Object.assign({n:"Thẩm Mi Trang",o:"tt",mr:3,sr:-1,y:2,age:18,age0:16,sons:0,daus:0,tz:0,danh:20,duc:30,tg:0,endk:"Hồng nhan bạc mệnh",fate:"x"},o);
const forged=[
 ["phẩm vượt Hoàng hậu",{mr:8}],["bậc cung nữ vượt",{sr:9}],["không phẩm không bậc",{mr:-1,sr:-1}],
 ["năm 61",{y:61,age:77}],["tuổi lệch năm (Hoàng hậu 1 năm, 60 tuổi)",{mr:7,y:1,age:60}],["tuổi đầu 5",{age0:5}],
 ["con quá nhiều so với năm",{y:1,age:17,sons:15,daus:5}],["Thái tử > con trai",{sons:1,tz:3}],["tranh ghế 99",{tg:99}],["Danh 5000",{danh:5000}],
 ["Hoàng thái hậu không con",{mr:7,endk:"Hoàng thái hậu"}],["Nữ đế mà chưa Hoàng hậu",{mr:3,endk:"Nữ đế"}],["Thái phi mà không phải phi tần",{mr:-1,sr:2,endk:"Thái phi"}],
 ["nhật ký sai thứ tự",{trail:[[3,1,"r",2],[1,1,"r",3]]}],["nhật ký phẩm > phẩm cao nhất",{mr:2,trail:[[1,1,"r",7]]}],["nhật ký con > số con",{trail:[[1,1,"k",1]]}],
["không có kết cục",{endk:""}]];
let i=0;
for(const [name,o] of forged){n++;t+=20000;const g="gggggggggggggggggggg"+String(i).padStart(2,"0");
 await call("POST","/hello",{gid:g});
 const r=await call("POST","/life",{gid:g,lid:"forge"+String(i++).padStart(4,"0"),life:base(o)});
 ok(r.st===422,`forged "${name}" refused (${r.st} ${r.why||""})`)}
/* a score sent by the client is ignored */
t+=20000;let r=await call("POST","/life",{gid:"hhhhhhhhhhhhhhhhhhhh01",lid:"honest01",score:999999,life:base({score:999999,parts:[["x",999999]]})});
ok(r.ok&&r.score<2000,"client-sent score ignored, server computes "+r.score);
/* best forgeable-but-plausible life stays below the cap */
t+=20000;r=await call("POST","/life",{gid:"iiiiiiiiiiiiiiiiiiii01",lid:"cap00001",life:base({mr:7,y:60,age:76,sons:20,daus:0,tz:20,tg:20,danh:1000,duc:1000,endk:"Nữ đế",rare:true})});
ok(r.st===422||(r.ok&&r.score<=15000),"cap: "+(r.st===422?"refused "+r.why:"score "+r.score));
/* none of the forged lives reached the board */
const L=await call("GET","/top/lives",null,"n=100");
ok(L.rows.length===2,"board holds only the honest lives ("+L.rows.length+" rows)");
console.log(fail?`${fail} FAILED`:"ALL OK");process.exit(fail?1:0);
