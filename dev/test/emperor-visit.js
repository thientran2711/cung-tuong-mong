/* review/emperor-visit: the visit road end to end in the real build (dev/index.html) + the frequency bot.
   usage: node dev/test/emperor-visit.js [years=6] [lives=6]
   1. FLOW: a forced visit → card "empnight" (3 options, Thắp đèn has the visit numbers) → the visit night (no prep / quilt) → night2 → nightFx
      → the night's closing card (jne kitNightEnd) gets the visit caption (r1: no second modal); checks Sủng / Danh / Thái hậu / Hoàng hậu / jealousy deltas against BAL.visit + BAL.night.
   2. Safe road: "Khuyên ngài giữ long thể" gives BAL.visit.adviseDuc / adviseTh.
   3. Gates: pregnant / lãnh cung / gap → no visit; empnight no longer drawn by the generic pool.
   4. BOT: real endTurn days (dialogs cleared, Sủng held at a level) → visits per year per Sủng level; Thái hậu displeased rate per archetype. */
const {chromium}=(require('./lib/bigpage'),require('./lib/dlgs-off').pw('off'));/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs'),path=require('path');const R=path.resolve(__dirname,'../..');
const YEARS=+process.argv[2]||6,LIVES=+process.argv[3]||6,BEFORE=+process.env.BEFORE||0;
(async()=>{const b=await chromium.launch({args:['--disable-gpu']});const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const errs=[];const page=await ctx.newPage();page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
 const res=await page.evaluate(([YEARS,LIVES,BEFORE])=>{const out={fail:[],flow:{},bot:{}};const F=m=>out.fail.push(m);const strip=x=>String(x||"").replace(/<[^>]+>/g,"");
  const V=BAL.visit,N=BAL.night;const quiet=()=>{Q.length=0;try{$("modal").hidden=true}catch(e){}};
  /* r1: her monthly days (jcycle cyTray) now also keep him away; the forced flow cases run outside them */
  const offCy=()=>{try{const b=cyBase(S);if(b&&S.tuan===b.t)S.tuan=(S.tuan+1)%3}catch(e){}};
  const force=()=>{offCy();const k=["base","cap"].map(x=>V[x]);V.base=1000;V.cap=100;/* palace distance (jpdist) would lower the forced 100 for a far home: off for the forced flow */const PD=BAL.palDist,pk=PD&&PD.visit;if(PD)PD.visit=0;S.visW=null;if(S.emp)S.emp.visit=null;const r=visRoll();V.base=k[0];V.cap=k[1];if(PD)PD.visit=pk;return r};
  const run=(o)=>{const it=Q.shift();(o.go||(()=>{}))();if(o.fx&&Object.keys(o.fx).length)apply(o.fx);return it};
  /* 1. flow */
  SLOT=3;start();quiet();S.sung=50;S.an=30;S.tonight=null;S.preg=0;S.out=0;S.th=30;S.hh=20;S.thDead=false;
  const t=liveRivals(false)[0];if(t){S.tonight=t;t.ghen=10}const g0=t?t.ghen:0,s0=S.sung,d0=S.danh,th0=S.th,hh0=S.hh;
  const who=force();if(who!=="me")F("forced visit did not pick her: "+who);
  const c=Q.find(x=>x.pid==="empnight");if(!c)F("no empnight card");else{out.flow.card=strip(c.h);out.flow.opts=c.opts.map(o=>o.n+" | "+strip(o.x));
   if(c.opts.length!==3)F("empnight options "+c.opts.length);const a=c.opts.find(o=>/^Thắp đèn hầu rượu/.test(o.n));
   if(!a||!new RegExp(`Sủng \\+${V.sung}, Danh \\+${V.danh}`).test(a.x))F("visit option numbers");
   Q.length=0;Q.push(c);run(a);const n1=Q[0];if(!n1||n1.pid!=="vnight")F("visit night card missing: "+(n1&&n1.pid));else{
    if(/chăn gấm|Kính sự phòng đã báo/.test(n1.h))F("visit night still has the quilt/prep text");out.flow.night=strip(n1.h);
    const sB=S.sung;const ex=JSON.stringify({x:0});Q.shift();n1.opts[3].go();const n2=Q[0];if(!n2||n2.pid!=="night2")F("night2 missing");else{const it=Q.shift();n2.opts[1].go()}
    /* r1: no second modal; the night's closing card (jne kitNightEnd, KIT §81 button) carries the visit's caption */
    if(Q.find(x=>x.t==="Sáng hôm sau"))F("second morning modal still pushed");const ln=window.kneLineHook&&kneLineHook();out.flow.morning=ln;if(!ln)F("night card caption hook empty")}
   out.flow.d={sung:S.sung-s0,danh:S.danh-d0,th:S.th-th0,hh:S.hh-hh0,lostGhen:t?t.ghen-g0:null};
   if(S.danh-d0<V.danh)F("Danh gain "+(S.danh-d0));if(S.sung-s0<V.sung+N.sung)F("Sủng gain "+(S.sung-s0));if(t&&t.ghen-g0<V.lostGhen)F("lost rival ghen "+(t.ghen-g0));
   if(S.tonight!=="me")F("tonight not hers")}
  /* 1b. r1 family fix: the night talk line (j8 nx) shows the real best / worst of nightFx (nightGain, BAL.night) */
  {const mood0=S.emp.mood;out.flow.nx=[];for(const md of [0,1,2,3])for(const q of [1,2,4])for(const b of [-1,0,1,3]){S.emp.mood=md;const m=[1,0,-1,-2][md];
    const x=nx(b,"",{q,vp:0});const mm=x.match(/thành: đêm vui, Sủng \+(\d+), Ân tình \+(\d+) · hỏng: đêm nhạt, Sủng \+(\d+), Ân tình \+(\d+)/);
    const hi=nightGain(q+b+m+2),lo=nightGain(q+b+m);if(!mm||+mm[1]!==hi.sung||+mm[2]!==hi.an||+mm[3]!==lo.sung||+mm[4]!==lo.an)F(`nx shown≠applied mood${md} q${q} b${b}: ${x}`);
    /* applied: run the real nightFx at the two ends and read the true change */
    for(const [s,w] of [[q+b+m+2,hi],[q+b+m,lo]]){const s0=S.sung,a0=S.an;S.sung=40;S.an=40;const L0=log;log=()=>{};try{nightFx(s)}finally{log=L0}const got={sung:S.sung-40,an:S.an-40};S.sung=s0;S.an=a0;
     /* Sủng goes through sg() (his nature: nóng nảy ×1.3, lạnh lùng ×0.7) both when applied (j1 apply) and when drawn (jaudit #15 actLineRaw) */if(got.sung!==sg(w.sung)||got.an!==w.an)F(`nightFx s${s} gave ${JSON.stringify(got)} not sg(${JSON.stringify(w)})`)}
    if(md===1&&q===2)out.flow.nx.push(`b${b}: ${x.split(" · ").slice(0,3).join(" · ")}`)}S.emp.mood=mood0;Q.length=0}
  /* 2. safe road */
  quiet();S.visW=null;S.tonight=null;S.ntk=null;S.preg=0;force();const c2=Q.find(x=>x.pid==="empnight");if(c2){const o=c2.opts.find(o=>/^Khuyên/.test(o.n));const du=S.duc,th=S.th;Q.length=0;Q.push(c2);run(o);
   out.flow.advise={duc:S.duc-du,th:S.th-th};if(S.duc-du!==V.adviseDuc&&S.duc<100)F("advise Đức "+(S.duc-du))}else F("no 2nd card");
  /* 3. gates */
  quiet();S.ntk=null;S.tonight=null;S.preg=1;S.visW=null;if(force())F("visit while pregnant");S.preg=0;
  S.visW=wk();S.ntk=null;{const k=V.base,kc=V.cap;V.base=100;V.cap=100;const r=visRoll();V.base=k;V.cap=kc;if(r)F("visit inside the gap")}
  out.flow.pool=freshEvents().some(e=>e.id==="empnight");if(out.flow.pool)F("empnight still in the generic pool");
  if(BEFORE)out.fail=[];/* the flow checks are for the new rule */
  /* 4. bot */
  const LV=[10,20,40,60,80,100];
  /* BEFORE=1: the old rule (empnight in the generic pool, Sủng ≥ 20, no daily roll) for the before/after table */
  if(BEFORE){V.cap=0;EVI.empnight.ok=()=>!S.preg&&S.sung>=20;const m0=mkEv;mkEv=function(id){const d=m0.apply(this,arguments);if(id==="empnight"&&d)S.visN=(S.visN||0)+1;return d}}
  for(const lv of LV){let days=0,vis=0,thD=0,thN=0;const arch={};
   for(let l=0;l<LIVES;l++){SLOT=3;start();quiet();const A=thArch().n;arch[A]=arch[A]||{n:0,d:0};
    for(let d=0;d<YEARS*36&&!S.dead;d++){S.sung=lv;S.an=30;S.preg=0;S.suc=80;S.out=0;S.tho=999;if(S.emp){S.emp.tho=999;S.emp.ill=null}if(S.mort)S.mort.empDue=null;S.buoi=0;
     const v0=S.visN||0;quiet();try{endTurn()}catch(e){out.fail.push("endTurn "+String(e).slice(0,100));break}
     if((S.visN||0)>v0){vis++;const c=Q.find(x=>x.pid==="empnight");const th=S.th;
      if(c){const a=c.opts.find(o=>/^Thắp đèn/.test(o.n));if(a&&!(a.lk&&a.lk())){Q.length=0;Q.push(c);run(a);if(Q[0]&&Q[0].pid==="vnight"){const n1=Q.shift();n1.opts[3].go();const n2=Q.shift();if(n2&&n2.opts)n2.opts[1].go();
       thN++;arch[A].n++;if(S.th<th){thD++;arch[A].d++}}}}}
     days++;quiet()}}
   out.bot[lv]={perYear:+(vis/(days/36)).toFixed(2),visits:vis,years:+(days/36).toFixed(1),thDisplPct:thN?Math.round(thD/thN*100):null,arch}}
  return out},[YEARS,LIVES,BEFORE]);
 console.log(JSON.stringify(res,null,1));console.log("page errors:",errs.length,errs.slice(0,5));console.log(res.fail.length||errs.length?"FAIL":"PASS");await b.close()})();
