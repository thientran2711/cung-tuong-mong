/* ROW 12 r3 — LAW 11 runtime fuzz (owner OD 25/11 ~23:33Z L2531 «a punishment never falls without a prior visible warning»).
   Plays real buổi (nextBuoi) in a consort life and a servant life with rivals that hate her, and watches every WORSENING write on her:
   rank down · cấm túc up · lãnh cung (S.out, consort only) · Tân Giả khố (S.srv.lau) · a beating notice «Bị đánh đòn» · a punishment death (die()
   with punishment words) · Danh / Sủng falling in the same tick as one of those (a penalty split). Each write is OK only when it falls
   (a) inside her own tap / act (gate context «her»), (b) inside a held record firing on its day (awFire) or its «Nhẹ» option, or (c) inside an
   already-warned road (awOk: a month-ahead notice, the place-close plaque). Anything else = UNWARNED → FAIL (with the stack top).
   Consort life: the NPC buổi (rivalsBuoi) + the month (endTurn) are driven straight (her own day cards would hold nextBuoi in a bot run).
   MUTATE=1 turns the gate off (window.__awoff) — the fuzz must then FAIL.
   usage: node dev/test/accw-fuzz.js [index.html] [buổi=300] [seeds=2]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||path.join(__dirname,'..','..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+path.resolve(A);
const NB=+(process.argv[3]||300),NS=+(process.argv[4]||2);
(async()=>{const b=await chromium.launch();let fail=0;const errs=[];
 for(const life of ['consort','servant'])for(let sd=1;sd<=NS*(life==='servant'?2:1);sd++){
  const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});
  for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
  const r=await p.evaluate(([life,sd,NB,MUT])=>{let seed=sd*7919;Math.random=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
   window.__bot=1;if(MUT)window.__awoff=1/* MUTATE=1: the gate off → the fuzz must FAIL */;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();
   for(let i=0;i<80&&(life==='servant'?!isSrv():isSrv());i++)start();window.__nlInner=0;quiet=false;if(life==='servant'?!isSrv():isSrv())return {skip:1};
   const bad=[],seen={held:0,fired:0,her:0,ok:0,pre:0};let FIRE=0,OKW=0;
   const f0=window.awFire;window.awFire=function(){FIRE++;seen.fired++;try{return f0.apply(this,arguments)}finally{FIRE--}};
   const o0=window.awOk;awOk=window.awOk=function(f){OKW++;try{return o0.apply(this,arguments)}finally{OKW--}};
   const why=()=>{const c=typeof awCtxNow==="function"?awCtxNow():"";if(FIRE||(typeof awWarnedNow==="function"&&awWarnedNow()))return "fire";if(OKW)return "warned";if(c==="her")return "her";return null};
   const note=(k,v)=>{const w=why();if(w){seen[w==="her"?"her":"ok"]++;return}bad.push(`${k} ${v} · ctx «${awCtxNow()}» · ${String(new Error().stack).split("\n").slice(3,7).map(x=>x.trim().replace(/^at /,"").replace(/ \(.*$/,"")).join(" < ")}`)};
   const trap=(o,k,test,lbl)=>{let v=o[k];Object.defineProperty(o,k,{configurable:true,enumerable:true,get(){return v},set(x){if(test(v,x))note(lbl,`${v}→${x}`);v=x}})};
   trap(S,"rank",(a,x)=>!isSrv()&&x<a,"rank down");trap(S,"confined",(a,x)=>(x|0)>(a|0)&&!(S.ill==="daumua"),"cấm túc");trap(S,"out",(a,x)=>!isSrv()&&!a&&x,"lãnh cung");
   if(S.srv)trap(S.srv,"lau",(a,x)=>isSrv()&&(x|0)>0&&!(a>0),"Tân Giả khố");
   const PW=/dìm|giếng|trượng|đánh đòn|đòn roi|sai người|sai đánh|ban chết|xử tử|xử trảm|đánh chết|tru di|rượu độc|lụa trắng|treo cổ|thắt cổ|phạt|trị tội|đuổi/i;
   const d0=die;die=function(w){if(PW.test(String(w||"")))note("death",String(w).slice(0,60));return d0.apply(this,arguments)};
   const q0=Q.push;Q.push=function(m){try{if(m&&m.t==="Bị đánh đòn")note("beating",String(m.h||"").replace(/<[^>]+>/g,"").slice(0,50));if(m&&m.t==="Sắp bị trị tội"||m&&m.pid==="accw")seen.held++}catch(e){}return q0.apply(this,arguments)};
   for(const v of liveRivals(true))try{if(!v.coop){v.malice=Math.max(v.malice||0,80);affAdd(v,S,-60);oanAdd(v,S,60)}}catch(e){}
   /* her open cards (the turn's own: Kính sự phòng, a borrow …) answered by their LAST option, as her own tap (gate context «her»); held-punishment cards by ✕ (wait) */
   const ans=()=>{for(let k=0;k<8&&Q.length;k++){const m=Q.shift();try{if(m&&m.pid!=="accw"&&Array.isArray(m.opts)&&m.opts.length){const op=m.opts[m.opts.length-1];awInHer(()=>{try{if(op.fx&&Object.keys(op.fx).length)apply(op.fx)}catch(e){}if(typeof op.go==="function")op.go()})}}catch(e){}}Q.length=0};
   const ACCN={};try{const r0=runAct;runAct=function(a,t,k){if(t===S&&a!==S)ACCN[k]=(ACCN[k]||0)+1;return r0.apply(this,arguments)}}catch(e){}
   const HS={};let n=0;for(;n<NB&&!S.dead;n++){
    /* pressure (consort): her own misdeeds keep piling up, so rivals have charges to bring; her Sủng sags under the rank floor now and then */
    if(life==='consort'&&n%15===0){try{const L=liveRivals(true).filter(v=>!v.coop);const v=L[n%L.length];if(v){deedAdd(S,["trip","batnat","vp","poison"][n%4],v,1+(n%3===0),"việc xấu "+n);for(const x of L.slice(0,3))evA(x,S,2)}try{const H=["accuse","tocao","expose","frame","kframe","trinhhh"].filter(k=>ACT[k]);const k=H[(n/15|0)%H.length];const L2=liveRivals(true).filter(v=>!v.coop&&!v.queen);const v2=L2[(n/15|0)%L2.length];if(k&&v2){const g=[["npcKnows",()=>true],["j95gate",()=>false],["ptNpcSent",()=>false]].filter(x=>typeof window[x[0]]==="function").map(x=>{const o=window[x[0]];window[x[0]]=x[1];return [x[0],o]});try{awInW(()=>runAct(v2,S,k))}finally{g.forEach(([nm,o])=>window[nm]=o)}}}catch(e){}/* an NPC act on her each 15 buổi */
     if(n%60===30)S.sung=Math.max(0,(typeof sungFloor==="function"?sungFloor(S.rank):10)-3)}catch(e){}}
    Q.length=0;S.mg=0;try{document.getElementById('modal').hidden=true}catch(e){}/* every open card answered by ✕ (wait) */
    /* consort: her day's own cards (Kính sự phòng …) would hold nextBuoi; the world turn is driven straight: each buổi the NPCs act
       (rivalsBuoi, world context like nextBuoi), every fourth the month turns (endTurn) — the same functions nextBuoi calls */
    if(life==='consort'){try{awInW(()=>rivalsBuoi());if(n%4===3)for(let k=0;k<10;k++){const t=S.turn+"/"+S.tuan;ans();S.mg=0;S.buoi=0;endTurn();if(S.dead||S.turn+"/"+S.tuan!==t)break}}catch(e){bad.push("EXC "+e.message.slice(0,80));break}continue}
    try{nextBuoi()}catch(e){bad.push("EXC "+e.message.slice(0,80));break}Q.length=0;try{if(typeof DIL!=="undefined"&&Array.isArray(DIL))DIL.length=0}catch(e){}
    for(const id in (S.accw||{})){if(id.startsWith("pre:"))seen.pre++;else if(!HS[id]){HS[id]=1;seen.held++}}}
   return {n,ym:`năm ${S.year} tháng ${S.month}`,acc:Object.keys(ACCN).length?ACCN:{},dead:!!S.dead,why:S.deathWhy||"",srv:isSrv(),bad:bad.slice(0,12),nb:bad.length,seen}},[life,sd,NB,!!process.env.MUTATE]);
  if(r.skip){console.log(`skip ${life} seed ${sd} (no such life drawn)`);await ctx.close();continue}
  const okR=r.nb===0;if(!okR)fail++;console.log(`${okR?'PASS':'FAIL'} ${life} seed ${sd}: ${r.n} buổi → ${r.ym} · NPC acts on her ${JSON.stringify(r.acc).slice(0,120)}${r.dead?' (dead: '+String(r.why).slice(0,40)+')':''} · held cards ${r.seen.held} · her own ${r.seen.her} · warned/fired writes ${r.seen.ok} · UNWARNED ${r.nb}`);
  for(const x of r.bad)console.log('   '+x);await ctx.close()}
 if(errs.length){console.log('FAIL page errors: '+errs.slice(0,5).join(' | '));fail++}else console.log('ok   no page errors');
 console.log(fail?`accw-fuzz: FAIL ${fail}`:'accw-fuzz: PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
