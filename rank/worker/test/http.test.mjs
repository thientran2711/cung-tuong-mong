/* the real Worker over HTTP (wrangler dev = workerd with the Durable Object SQLite, or a throwaway deployment):
   node rank/worker/test/http.test.mjs http://127.0.0.1:8787   — writes test players/lives: NEVER run against the live board */
const U=(process.argv[2]||"").replace(/\/$/,"");if(!U||/ctm-rank\.victoria/.test(U)){console.log("refusing: give a local wrangler dev URL");process.exit(2)}
let fail=0;const ok=(c,m)=>{console.log((c?"ok   ":"FAIL ")+m);if(!c)fail++};
const rq=async(m,p,b)=>{const r=await fetch(U+p,{method:m,headers:b?{"Content-Type":"application/json"}:{},body:b?JSON.stringify(b):undefined});return Object.assign({st:r.status,cors:r.headers.get("access-control-allow-origin")},await r.json())};
const g=n=>("t"+Date.now().toString(36)+n).padEnd(20,"x");const G=[g("a"),g("b")];
const life=o=>Object.assign({n:"Thẩm Mi Trang",o:"tt",mr:3,sr:-1,y:2,age:18,age0:16,sons:0,daus:0,tz:0,danh:20,duc:30,tg:0,endk:"Hồng nhan bạc mệnh",fate:"Bệnh mà chết"},o);
const h=await rq("POST","/hello",{gid:G[0]});ok(h.ok&&/^Khách vô danh #/.test(h.me.pn)&&h.cors==="*","hello + CORS "+h.me.pn);
let r=await rq("POST","/life",{gid:G[0],lid:g("l1"),life:life({mr:7,y:5,age:21})});ok(r.ok&&r.score===2550,"life scored by the Worker "+r.score);
r=await rq("POST","/life",{gid:G[1],lid:g("l2"),life:life({})});ok(r.ok,"second player life");
r=await rq("POST","/life",{gid:G[1],lid:g("l3"),life:life({})});ok(r.st===429,"rate limit");
r=await rq("POST","/life",{gid:G[0],lid:g("l4"),life:life({mr:12})});ok(r.st===422,"impossible life refused");
const L=await rq("GET","/top/lives?n=10&gid="+G[1]);ok(L.ok&&L.rows.length>=2&&L.rows.every((x,i,a)=>!i||a[i-1].s>=x.s)&&L.mine,"top lives sorted, mine present");
const P=await rq("GET","/top/players?n=10");ok(P.ok&&P.rows.length>=2,"top players");
r=await rq("POST","/name",{gid:G[1],name:"Thử Tên "+Date.now().toString(36)});ok(r.ok,"rename");
const M=await rq("GET","/me?gid="+G[0]);ok(M.ok&&M.lives.length===1,"/me");
const O=await fetch(U+"/life",{method:"OPTIONS"});ok(O.status===204,"preflight");
console.log(fail?`${fail} FAILED`:"ALL OK");process.exit(fail?1:0);
