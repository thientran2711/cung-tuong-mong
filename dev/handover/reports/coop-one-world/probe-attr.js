/* attribution: guest-seat endTurn with deep write-proxies on every NPC + world sub-objects; logs (path, top functions on stack). */
const {chromium}=require('playwright');
const WT='/home/user/wt/oneworld';const {serve,BASE}=require(WT+'/dev/test/coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx);
await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9';});
const p=await ctx.newPage();p.setDefaultTimeout(180000);
await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
await p.waitForFunction(()=>typeof start==='function'&&typeof endTurn==='function'&&window.COOPW);
const SEAT=process.env.SEAT||'b',RUNS=+process.env.RUNS||6;
const out=await p.evaluate(async([SEAT,RUNS])=>{
 window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20&&!(typeof S!=='undefined'&&S&&S.name);i++)start();Q.length=0;
 const drain=()=>{for(let i=0;i<80&&Q.length;i++)Q.shift();S.mg=null};
 for(let w=0;w<10;w++){drain();S.buoi=B4L;try{endTurn()}catch(e){}drain()}
 const LOG={};let on=false;
 const frames=()=>{const st=new Error().stack.split('\n').slice(3).map(l=>(l.match(/at (?:Object\.|window\.)?([^\s(]+)/)||[])[1]).filter(n=>n&&!/^(set|Proxy|Reflect|Array|new|<anonymous>|eval|Function)/.test(n)&&n!=='Object.set');
   const keep=[];for(const n of st){if(!keep.includes(n))keep.push(n);if(keep.length>=4)break}return keep.join('<')};
 const WM=new WeakMap();
 const deep=(o,path)=>{if(!o||typeof o!=='object')return o;if(WM.has(o))return WM.get(o);
  const px=new Proxy(o,{get(t,k,r){const v=Reflect.get(t,k,r);if(typeof k==='symbol'||typeof v!=='object'||!v)return v;if(v===S||rivals.includes(v))return v;return deep(v,path+'.'+(Array.isArray(t)?'[]':k))},
   set(t,k,v,r){if(on&&t[k]!==v){const pk=path+'.'+(Array.isArray(t)?(k==='length'?'[len]':'[]'):String(k));const f=frames();const key=pk.replace(/R#\d+/,'R')+' @ '+f;LOG[key]=(LOG[key]||0)+1}return Reflect.set(t,k,v,r)},
   deleteProperty(t,k){if(on){const key=(path+'.'+String(k)).replace(/R#\d+/,'R')+' (del) @ '+frames();LOG[key]=(LOG[key]||0)+1}return Reflect.deleteProperty(t,k)}});
  WM.set(o,px);return px};
 const fake=(seat)=>{COOPW.on=true;COOPW.seat=seat;COOPW.base={P:{}};COOPW.sent=-1;COOPW.pend=false;COOPW.p2=false;
    COOP.state.status='open';COOP.state.peerOnline=true;COOP.state.week=0;COOP.state.ended={};COOP.state.you=seat};
 const WK=["emp","thO","court","trieu","storms","usedFaces","fidUsed","kidUsed","luxEdict","thDead","thAge","vacSince","festDone","wx"];
 let added=0,removed=0;
 for(let r=0;r<RUNS;r++){drain();S.buoi=B4L;try{endTurn()}catch(e){}drain();if(r%2)S.tuan=2;if(r%3===2){S.month=12;S.tuan=2}
  const base=JSON.stringify(ser());quiet=true;try{deser(JSON.parse(base))}finally{quiet=false}Q.length=0;S.mg=null;fake(SEAT);
  const ids0=rivals.map(v=>v.id).join(',');
  for(let i=0;i<rivals.length;i++)rivals[i]=deep(rivals[i],'R#'+rivals[i].id);
  for(const k of ["emp","thO","court","trieu"])if(S[k])S[k]=deep(S[k],'S.'+k);
  /* top-level world keys of S */
  const sv={};for(const k of WK)sv[k]=JSON.stringify(S[k]);
  on=true;try{S.buoi=B4L;endTurn()}catch(e){LOG['ERR '+e]=1}on=false;
  for(const k of WK)if(JSON.stringify(S[k])!==sv[k])LOG['S.'+k+' (top-level changed)']=(LOG['S.'+k+' (top-level changed)']||0)+1;
  const ids1=rivals.map(v=>v.id).join(',');if(ids0!==ids1)LOG['rivals list '+ids0+' -> '+ids1]=1;
  COOPW.on=false;COOPW.pend=false;drain()}
 return LOG},[SEAT,RUNS]);
require('fs').writeFileSync(`/home/user/wt/oneworld-probe/attr-${SEAT}.json`,JSON.stringify(out,null,1));
console.log(Object.keys(out).length);await b.close()})();
