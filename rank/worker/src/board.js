/* Bảng vinh danh — storage + API logic, independent of the host (Durable Object SQLite in the Worker, node:sqlite in tests).
   db = {all(q,...args) -> rows, run(q,...args)}; now() -> ms. See dev/LEADERBOARD.md for the API. */
import "./score.js";
const R=globalThis.CTM_RANK;
const DAY=86400000;
const SCHEMA=[
 `CREATE TABLE IF NOT EXISTS players(pid TEXT PRIMARY KEY, gh TEXT UNIQUE, name TEXT, nkey TEXT UNIQUE, created INTEGER, seen INTEGER,
   lives INTEGER DEFAULT 0, best INTEGER DEFAULT 0, total INTEGER DEFAULT 0, best_lid TEXT, acct TEXT)`,
 `CREATE TABLE IF NOT EXISTS lives(lid TEXT PRIMARY KEY, pid TEXT, score INTEGER, at INTEGER, ver INTEGER, sum TEXT)`,
 `CREATE INDEX IF NOT EXISTS lives_score ON lives(score DESC, at ASC)`,
 `CREATE INDEX IF NOT EXISTS lives_pid ON lives(pid, at DESC)`,
 `CREATE INDEX IF NOT EXISTS players_best ON players(best DESC, total DESC, created ASC)`,
 `CREATE TABLE IF NOT EXISTS rate(k TEXT PRIMARY KEY, n INTEGER, t INTEGER)`,
 `CREATE TABLE IF NOT EXISTS meta(k TEXT PRIMARY KEY, v TEXT)`];
/* limits (documented in dev/LEADERBOARD.md) */
export const LIMITS={lifeGap:15000,lifeDay:60,lifeIpDay:200,nameDay:10,helloIpDay:400,body:16384,topMax:100};

async function sha(s){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
export function normName(s){return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[đĐ]/g,"d").toLowerCase().replace(/\s+/g," ").trim()}
/* obscene words: whole words (with tones, so "Du", "Long", "buổi" stay allowed) + letter runs that are never innocent */
const BAD_WORDS=["đụ","địt","đ!t","lồn","l*n","buồi","cặc","c*c","đéo","đĩ","cứt","ỉa","đái","đù","lìn","dái","đm","đmm","đcm","đkm","vcl","vkl","vl","clgt","cl","cc","dm","dmm","dcm","dkm","đ.m","mẹ mày","con mẹ","cave","phò","điếm"];
const BAD_RUNS=["fuck","fuk","shit","bitch","cunt","pussy","dick","porn","nigg","whore","slut","asshole","cailon","concac","ditme","dimemay","dumemay","dume","duma","dkmm","dmcs","occho","occac","oclon","thangcho","convit","sucvat","matday","xxx","sex","http","www"];
export function badName(s){const low=String(s).toLowerCase().replace(/\s+/g," ").trim();const words=low.split(/[^\p{L}\p{N}*!.]+/u).filter(Boolean);
 const phrase=" "+low.replace(/[^\p{L}\p{N}*!. ]+/gu," ")+" ";
 for(const w of BAD_WORDS){if(w.includes(" ")){if(phrase.includes(" "+w+" "))return true}else if(words.includes(w))return true}
 const run=normName(s).replace(/[^a-z0-9]/g,"");return BAD_RUNS.some(w=>run.includes(w))}
/* "" = fine, else the reason shown to the player */
export function nameProblem(s){const t=String(s||"").replace(/\s+/g," ").trim();
 if([...t].length<2)return"Tên hiệu cần ít nhất hai chữ.";if([...t].length>24)return"Tên hiệu dài quá, tối đa hai mươi bốn chữ.";
 if(!/^[\p{L}\p{M}\p{N} .'_-]+$/u.test(t))return"Tên hiệu chỉ dùng chữ, số và khoảng trắng.";
 if(!/\p{L}/u.test(t))return"Tên hiệu cần có chữ.";
 if(/^khach vo danh/.test(normName(t)))return"Tên này để dành cho khách vô danh.";
 if(badName(t))return"Tên hiệu không nhã, xin chọn tên khác.";return""}

export function makeBoard(db,now){now=now||(()=>Date.now());
 for(const q of SCHEMA)db.run(q);
 const one=(q,...a)=>db.all(q,...a)[0]||null;
 /* rules changed: re-score every life from its stored summary */
 (function rescore(){const m=one("SELECT v FROM meta WHERE k='ver'");if(m&&+m.v===R.RULES.ver)return;
  for(const l of db.all("SELECT lid,sum FROM lives")){let s=0;try{s=R.score(JSON.parse(l.sum)).score}catch(e){}db.run("UPDATE lives SET score=?,ver=? WHERE lid=?",s,R.RULES.ver,l.lid)}
  for(const p of db.all("SELECT pid FROM players"))aggr(p.pid);
  db.run("INSERT OR REPLACE INTO meta(k,v) VALUES('ver',?)",String(R.RULES.ver))})();
 function aggr(pid){const a=one("SELECT COUNT(*) n, COALESCE(MAX(score),0) b, COALESCE(SUM(score),0) t FROM lives WHERE pid=?",pid);
  const b=one("SELECT lid FROM lives WHERE pid=? ORDER BY score DESC, at ASC LIMIT 1",pid);
  db.run("UPDATE players SET lives=?,best=?,total=?,best_lid=? WHERE pid=?",a.n,a.b,a.t,b?b.lid:null,pid)}
 function rate(k,win,max){const t=now(),w=Math.floor(t/win)*win,key=k+":"+w;const r=one("SELECT n FROM rate WHERE k=?",key);
  if(r&&r.n>=max)return false;if(r)db.run("UPDATE rate SET n=n+1 WHERE k=?",key);else db.run("INSERT INTO rate(k,n,t) VALUES(?,?,?)",key,1,t);
  if(Math.random()<.02)db.run("DELETE FROM rate WHERE t<?",t-2*DAY);return true}
 function gap(k,ms){const t=now(),r=one("SELECT t FROM rate WHERE k=?",k);if(r&&t-r.t<ms)return false;db.run("INSERT OR REPLACE INTO rate(k,n,t) VALUES(?,?,?)",k,1,t);return true}
 async function ids(gid){gid=String(gid||"");if(!/^[a-z0-9]{16,40}$/.test(gid))return null;return{gh:await sha("g:"+gid),pid:(await sha("p:"+gid)).slice(0,12)}}
 function defaultName(pid){let tag=parseInt(pid.slice(0,6),16)%9000+1000;for(let i=0;i<20000;i++){const n=`Khách vô danh #${tag}`;if(!one("SELECT 1 x FROM players WHERE nkey=?",normName(n)))return n;tag=tag>=99999?1000:tag+1}return `Khách vô danh #${pid}`}
 function ensure(id){let p=one("SELECT * FROM players WHERE pid=?",id.pid);const t=now();
  if(!p){const n=defaultName(id.pid);db.run("INSERT INTO players(pid,gh,name,nkey,created,seen) VALUES(?,?,?,?,?,?)",id.pid,id.gh,n,normName(n),t,t);p=one("SELECT * FROM players WHERE pid=?",id.pid)}
  else if(p.gh!==id.gh)return null;else if(t-(p.seen||0)>60000)db.run("UPDATE players SET seen=? WHERE pid=?",t,id.pid);return p}
 function setName(p,name){const t=String(name||"").replace(/\s+/g," ").trim();const why=nameProblem(t);if(why)return why;const k=normName(t);
  const o=one("SELECT pid FROM players WHERE nkey=?",k);if(o&&o.pid!==p.pid)return"Tên hiệu này đã có người dùng.";db.run("UPDATE players SET name=?,nkey=? WHERE pid=?",t,k,p.pid);return""}
 function lifeRank(l){return one("SELECT COUNT(*) n FROM lives WHERE score>? OR (score=? AND at<?)",l.score,l.score,l.at).n+1}
 function playerRank(p){return one("SELECT COUNT(*) n FROM players WHERE best>? OR (best=? AND total>?) OR (best=? AND total=? AND created<?)",p.best,p.best,p.total,p.best,p.total,p.created).n+1}
 function lifeView(l,rank){let s={};try{s=JSON.parse(l.sum)}catch(e){}const pn=l.pname!=null?l.pname:(one("SELECT name FROM players WHERE pid=?",l.pid)||{}).name;
  return{r:rank,lid:l.lid,pid:l.pid,pn:pn||"",n:s.n||"",o:s.on||"",p:R.phamName(s),e:s.endk||"",f:s.fate||"",alive:!!s.alive,rare:!!s.rare,y:s.y|0,
   sons:s.sons|0,daus:s.daus|0,s:l.score,dd:R.partial(s),fig:s.fig||"",por:s.por||"",mode:s.mode||"solo",at:l.at}}
 function playerView(p,rank){const b=p.best_lid?one("SELECT l.*,NULL pname FROM lives l WHERE lid=?",p.best_lid):null;const bv=b?lifeView(Object.assign(b,{pname:p.name}),0):null;
  return{r:rank,pid:p.pid,pn:p.name,s:p.best,t:p.total,k:p.lives,since:p.created,best:bv&&{lid:bv.lid,n:bv.n,o:bv.o,p:bv.p,e:bv.e,y:bv.y,s:bv.s,fig:bv.fig,por:bv.por,alive:bv.alive,rare:bv.rare}}}
 function meView(p){return Object.assign(playerView(p,playerRank(p)),{of:one("SELECT COUNT(*) n FROM players").n})}
 /* the summary as stored: only known fields, clipped (the score is always re-computed from this) */
 function clean(L){const I=v=>{v=Number(v);return isFinite(v)?Math.round(v):0},T=R.txt;const o=String(L.o||"");
  const fig=v=>{v=String(v||"");return /^img\/(kit\/)?[a-z0-9][a-z0-9_.-]{0,80}\.webp$/.test(v)?v:""};
  const trail=Array.isArray(L.trail)?L.trail.slice(0,80).map(t=>Array.isArray(t)?[I(t[0]),I(t[1]),T(t[2],2),I(t[3])]:t):null;
  return{n:T(L.n,30),o:T(o,8),on:R.RULES.origins[o]||T(L.on,48),mr:I(L.mr),sr:I(L.sr),mama:!!L.mama,out:!!L.out,endk:T(L.endk,40),fate:T(L.fate,140),
   alive:!!L.alive,rare:!!L.rare,y:I(L.y),age:I(L.age),age0:I(L.age0),sons:I(L.sons),daus:I(L.daus),tz:I(L.tz),danh:I(L.danh),duc:I(L.duc),tg:I(L.tg),
   fig:fig(L.fig),por:fig(L.por),mode:L.mode==="coop"?"coop":"solo",seed:I(L.seed)>>>0,ver:T(L.ver,24),t0:I(L.t0),trail}}
 const H={
  async hello(b,ip){if(!rate("h:"+ip,DAY,LIMITS.helloIpDay))return[429,{ok:false,why:"rate"}];const id=await ids(b.gid);if(!id)return[400,{ok:false,why:"gid"}];
   const p=ensure(id);if(!p)return[403,{ok:false,why:"gid"}];return[200,{ok:true,me:meView(p)}]},
  async name(b){const id=await ids(b.gid);if(!id)return[400,{ok:false,why:"gid"}];const p=ensure(id);if(!p)return[403,{ok:false,why:"gid"}];
   if(normName(b.name)===p.nkey)return[200,{ok:true,me:meView(p)}];
   if(!rate("n:"+p.pid,DAY,LIMITS.nameDay))return[429,{ok:false,why:"Hôm nay đã đổi tên nhiều lần, mai hãy đổi tiếp."}];
   const why=setName(p,b.name);if(why)return[200,{ok:false,why}];return[200,{ok:true,me:meView(one("SELECT * FROM players WHERE pid=?",p.pid))}]},
  async life(b,ip){const id=await ids(b.gid);if(!id)return[400,{ok:false,why:"gid"}];const lid=String(b.lid||"");if(!/^[a-z0-9]{8,40}$/.test(lid))return[400,{ok:false,why:"lid"}];
   let p=ensure(id);if(!p)return[403,{ok:false,why:"gid"}];
   const old=one("SELECT * FROM lives WHERE lid=?",lid);
   if(old){if(old.pid!==p.pid)return[409,{ok:false,why:"lid"}];return[200,lifeRes(old,p)]}
   const L=clean(b.life||{});const why=R.check(L);if(why)return[422,{ok:false,why}];
   if(!gap("g:"+p.pid,LIMITS.lifeGap))return[429,{ok:false,why:"rate",retry:LIMITS.lifeGap}];
   if(!rate("l:"+p.pid,DAY,LIMITS.lifeDay)||!rate("li:"+ip,DAY,LIMITS.lifeIpDay))return[429,{ok:false,why:"rate",retry:3600000}];
   const sc=R.score(L);if(sc.score>R.RULES.max)return[422,{ok:false,why:"score"}];
   if(b.name&&p.nkey.startsWith("khach vo danh"))setName(p,b.name);
   db.run("INSERT INTO lives(lid,pid,score,at,ver,sum) VALUES(?,?,?,?,?,?)",lid,p.pid,sc.score,now(),R.RULES.ver,JSON.stringify(L));aggr(p.pid);
   p=one("SELECT * FROM players WHERE pid=?",p.pid);return[200,Object.assign(lifeRes(one("SELECT * FROM lives WHERE lid=?",lid),p),{parts:sc.parts,partial:sc.partial})]},
 };
 function lifeRes(l,p){const of=one("SELECT COUNT(*) n FROM lives").n;return{ok:true,lid:l.lid,score:l.score,rank:lifeRank(l),of,me:meView(p),parts:R.score(JSON.parse(l.sum)).parts}}
 async function top(kind,q){const n=Math.max(1,Math.min(LIMITS.topMax,parseInt(q.get("n"))||20));const id=q.get("gid")?await ids(q.get("gid")):null;
  const p=id?one("SELECT * FROM players WHERE pid=? AND gh=?",id.pid,id.gh):null;
  if(kind==="lives"){const rows=db.all("SELECT l.*,p.name pname FROM lives l LEFT JOIN players p ON p.pid=l.pid ORDER BY l.score DESC, l.at ASC LIMIT ?",n);
   const out={ok:true,rows:rows.map((l,i)=>lifeView(l,i+1)),of:one("SELECT COUNT(*) n FROM lives").n};
   if(p){out.me=meView(p);const mine=db.all("SELECT l.*,? pname FROM lives l WHERE pid=? ORDER BY score DESC, at ASC LIMIT 1",p.name,p.pid)[0];
    if(mine)out.mine=lifeView(mine,lifeRank(mine));const last=db.all("SELECT l.*,? pname FROM lives l WHERE pid=? ORDER BY at DESC LIMIT 1",p.name,p.pid)[0];if(last)out.last=lifeView(last,lifeRank(last))}
   return[200,out]}
  const rows=db.all("SELECT * FROM players ORDER BY best DESC, total DESC, created ASC LIMIT ?",n);
  const out={ok:true,rows:rows.map((x,i)=>playerView(x,i+1)),of:one("SELECT COUNT(*) n FROM players").n};if(p){out.me=meView(p);out.mine=out.me}return[200,out]}
 async function me(q){const id=await ids(q.get("gid"));if(!id)return[400,{ok:false,why:"gid"}];const p=one("SELECT * FROM players WHERE pid=? AND gh=?",id.pid,id.gh);if(!p)return[404,{ok:false,why:"none"}];
  const lives=db.all("SELECT l.*,? pname FROM lives l WHERE pid=? ORDER BY at DESC LIMIT 12",p.name,p.pid).map(l=>lifeView(l,lifeRank(l)));return[200,{ok:true,me:meView(p),lives}]}
 /* one entry point: method, pathname, URLSearchParams, parsed body, client ip (hashed by the caller) */
 async function handle(m,path,q,body,ip){try{
   if(m==="GET"&&path==="/health")return[200,{ok:true,ver:R.RULES.ver}];
   if(m==="GET"&&path==="/rules")return[200,{ok:true,rules:R.RULES}];
   if(m==="GET"&&path==="/top/lives")return await top("lives",q);
   if(m==="GET"&&path==="/top/players")return await top("players",q);
   if(m==="GET"&&path==="/me")return await me(q);
   if(m==="POST"){const f={"/hello":H.hello,"/name":H.name,"/life":H.life}[path];if(f){if(!body||typeof body!=="object")return[400,{ok:false,why:"body"}];return await f(body,ip||"-")}}
   return[404,{ok:false,why:"not found"}]}catch(e){return[500,{ok:false,why:"server",err:String(e&&e.message||e)}]}}
 return{handle}}
