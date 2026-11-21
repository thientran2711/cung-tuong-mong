/* review/econ-tamco (ECONOMY §5, GAP OR21): Tâm cơ as its own cost + buying safety with bạc.
   usage: node dev/test/sw-serve.js <port> <repo root> (other shell); node dev/test/econ-tamco.test.js http://127.0.0.1:<port>/ <outdir> [WxH@dpr,...]
   Checks: equal value (hire = tc × BAL.tcroad.rate for every priced scheme × rank pair), the road card (3 roads + ✕, odds words, no %),
   each road charges exactly what it prints and rolls the odds it prints, NPC roads (law 1) pay the same and get the same +up, no page errors. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const fails=[];const F=(sz,m)=>fails.push(`${sz}: ${m}`);let first=true;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.addInitScript(()=>{window.__nlInner=1;/* F3: pinned state — the same life, khắc and rolls every run (seeded Math.random) */let s=20261121>>>0;Math.random=()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof econRoadCost==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){KMQ.length=0;start();if(!isSrv())break}
   try{KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}Q.length=0;
   const out={eq:[],keys:[]};const R=BAL.tcroad;
   /* 1. equal value over every priced scheme × every live rival */
   const priced=Object.keys(ACT).filter(k=>ACT[k].__c0);out.keys=priced;
   for(const k of priced)for(const v of liveRivals(true)){const c=econRoadCost(k,S,v);if(c.hire!==c.tc*R.rate||c.tc<R.tcMin)out.eq.push([k,v.name,c])}
   /* 2. her road card on a priced scheme she can do */
   S.bac=2000;S.tamco=60;S.khac=99;try{S.k=99}catch(e){}
   let pick=null;for(const k of ["rumor","bribe","frame","block","poison"])for(const v of liveRivals(true)){if(pick)break;const i=rivals.indexOf(v);
    if(ACT[k]&&ACT[k].__c0&&ACT[k].ok(S,v)&&!sameHouse(S,v)&&can(typeof harmK==="function"?harmK(v,k):BAL.time.cost.harm))pick={k,i,v}}
   if(!pick)return Object.assign(out,{nopick:1});
   out.pick=[pick.k,pick.v.name];Q.length=0;doAct(pick.i,pick.k);
   out.q=Q.length;const m=Q[0]||{};out.opts=(m.opts||[]).map(o=>({n:o.n,fx:o.fx,p:o.p,off:!!o.off,x:o.x,ton:o.ton,line:(()=>{if(typeof dilLine!=="function")return"";const d=document.createElement("div");d.innerHTML=dilLine(o);const r=d.querySelector(".kr-ton .krv");return r?"tốn: "+r.textContent.replace(/\s+/g," ").replace(/·/g,","):d.textContent})()}));
   out.cost=econRoadCost(pick.k,S,pick.v);out.win=ECON_WIN.includes(pick.k);out.o0=actOdds(S,pick.v,pick.k);return out});
  if(r.nopick){F(sz,"no priced scheme available to test");}
  if(r.eq&&r.eq.length)F(sz,`equal value broken: ${JSON.stringify(r.eq.slice(0,3))}`);
  if(first)console.log("priced schemes:",r.keys.join(" "),"| pick",JSON.stringify(r.pick),"| cost",JSON.stringify(r.cost),"| o0",r.o0);
  if(r.opts){if(r.opts.length!==4)F(sz,`road card has ${r.opts.length} options`);const [o1,o2,o3]=r.opts;
   if(o2&&o3&&o2.p!==o3.p)F(sz,"tc and hire roads show different odds");if(o1&&o2&&!(o2.p>o1.p||o2.p>=100))F(sz,"road gives no better odds");
   if(o2&&!new RegExp("tốn:[^·]*Tâm cơ -"+r.cost.tc).test(o2.line))F(sz,"tc road: kit line has no «tốn: Tâm cơ -tc» ("+(o2&&o2.line)+")");for(const o of [o1,o2])if(o&&r.cost.pr>0&&!r.win&&!new RegExp("tốn:[^·]*Bạc -"+r.cost.pr).test(o.line))F(sz,o.n+": kit line has no scheme price «tốn: Bạc -"+r.cost.pr+"» ("+o.line+")");if(o2&&/tốn:/.test(o2.x||""))F(sz,"tc road still types its cost in x (must use the kit ton field)");if(r.win)for(const o of [o1,o2,o3])if(o&&!(/hỏng:[^·]*không mất bạc/.test((o.x||"").replace(/<[^>]+>/g,""))&&new RegExp("thành:[^·]*Bạc -"+r.cost.pr+"(?!\\d)").test((o.x||"").replace(/<[^>]+>/g,""))&&!(o.ton&&o.ton.bac===-r.cost.pr)))F(sz,o.n+": pay-on-success scheme: card must show the price on «thành» and «hỏng: … không mất bạc», not in Tốn ("+o.x+")");
   if(o3&&!(o3.ton&&o3.ton.bac===-(r.win?r.cost.hire:r.cost.pr+r.cost.hire)))F(sz,"hire road: Tốn must be price + hire");
   if(first)console.log(JSON.stringify(r.opts));}
  for(let i=0;i<120;i++){if(!(await p.evaluate(()=>/tranh người trong kiếp/i.test(document.body.innerText))))break;await sleep(1000)}
  await p.evaluate(()=>{try{KMQ.length=0;document.querySelectorAll('.kmov,#kmrew').forEach(o=>o.remove());kmBusy=false;showModal()}catch(e){}});await sleep(800);
  for(let w=0;w<20&&!(await p.evaluate(()=>!!document.querySelector('#modal:not([hidden]) .kr-ton')));w++){await p.evaluate(()=>{try{showModal()}catch(e){}});await sleep(500)}
  if(r.win){const cs=await p.evaluate(pr=>[...document.querySelectorAll('#modal:not([hidden]) button.ka')].map(b=>{const t=q=>[...b.querySelectorAll(q)].map(e=>e.innerText.replace(/\s+/g,' ').trim()).join(' | ');return{ton:t('.kr-ton .krv'),thanh:t('.kr-thanh .krv'),bai:t('.kr-bai .krv'),n:(b.querySelector('.kan')||{innerText:''}).innerText,vis:[...b.querySelectorAll('.kr-thanh .ef.r,.kr-duoc .ef.r')].filter(e=>e.offsetParent&&getComputedStyle(e).display!=='none').map(e=>e.innerText.trim()).join(' | '),tonVis:[...b.querySelectorAll('.kr-ton')].filter(e=>e.offsetParent).map(e=>e.innerText.replace(/\s+/g,' ')).join(' | '),info:!!b.querySelector('.kpi,.kinfo,[data-kinfo]')||/!/.test(b.innerText)}}).filter(c=>c.ton||c.thanh),r.cost.pr);if(first)console.log(sz,'rendered pay-on-success rows',JSON.stringify(cs));
   const re=new RegExp('Bạc\\s*[−-]\\s*'+r.cost.pr+'(?!\\d)');const ok=cs.filter(c=>re.test(c.thanh)&&re.test(c.vis)&&!re.test(c.ton)&&!re.test(c.tonVis)&&/không mất bạc/.test(c.bai));/* visible: the price is a RED item of the shown row (KIT §6.2b: Tốn + Được only), never in Tốn; the BẠI line is in the «!» fold */
   if(ok.length<3)F(sz,'rendered card (pay-on-success, KIT §88): each road must show «Bạc -'+r.cost.pr+'» as a VISIBLE red item of the THÀNH/Được row (not Tốn) and «không mất bạc» in BẠI (the «!» fold) '+JSON.stringify(cs));}
  {const rows=await p.evaluate(()=>[...document.querySelectorAll('#modal:not([hidden]) .kr-ton .krv')].map(e=>e.innerText.replace(/\s+/g,' ').trim()));if(first)console.log(sz,'rendered Tốn rows',JSON.stringify(rows));
   if(!r.win&&(r.cost&&r.cost.pr>0&&!r.win&&rows.filter(s=>new RegExp('Bạc\\s*[−-]\\s*'+r.cost.pr+'(?!\\d)').test(s)).length<2||!rows.some(s=>new RegExp('Bạc\\s*[−-]\\s*'+(r.cost.pr+r.cost.hire)+'(?!\\d)').test(s))))F(sz,'rendered card: scheme price not in 3 Tốn rows '+JSON.stringify(rows));
   if(r.cost&&!rows.some(s=>new RegExp('Tâm cơ\\s*[−-]\\s*'+r.cost.tc).test(s)))F(sz,'rendered card: no Tâm cơ cost in a Tốn row '+JSON.stringify(rows));}
  const ui=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&M.querySelector('.dlg');if(!M||M.hidden||!d)return{shown:false};const rc=d.getBoundingClientRect();
   return{shown:true,txt:M.textContent,inView:rc.left>=-1&&rc.right<=innerWidth+1&&rc.top>=-1&&rc.bottom<=innerHeight+1,pageOvf:document.documentElement.scrollWidth>innerWidth+1,
    opts:[...M.querySelectorAll('.opt')].length}});
  await p.screenshot({path:`${OUT}/roadpick-${wh}.jpg`,type:'jpeg',quality:55});
  if(!ui.shown)F(sz,"road card not shown");else{if(/%/.test(ui.txt))F(sz,"% in road card");if(!ui.inView)F(sz,"road card out of view");if(ui.pageOvf)F(sz,"page overflow")}
  /* 3. each road charges what it prints and freezes the odds it prints */
  const pay=await p.evaluate(()=>{const res={};const m0=Q[0];if(!m0)return null;const vid=m0.pp.v,k=m0.pp.k;let v=RV(vid);
   /* F3: every road starts from the SAME saved state (a road that landed changes the target, the khắc used, …) */S.bac=2000;S.tamco=60;S.khac=99;try{used=0}catch(e){}const q0=quiet;quiet=true;const D=JSON.stringify(ser());quiet=q0;const snap=()=>JSON.stringify([S,rivals].map(x=>x));
   for(const [ix,lab] of [[0,"plain"],[1,"tc"],[2,"hire"]]){deser(JSON.parse(D));Q.length=0;try{used=0}catch(e){}v=RV(vid);const b0=S.bac,t0=S.tamco,pr=econSchemePrice(k,S,v),c0=econRoadCost(k,S,v);let seen=null;const r0=runAct;S.__won=0;
    runAct=function(a,t,kk){seen=ACTFZ?ACTFZ.o:null;return r0.apply(this,arguments)};
    const ptS=window.ptHarmSend;window.ptHarmSend=null;try{Q.length=0;pushDil(mkP("roadpick",{v:v.id,k}),ACT[k].n);const o=Q[0].opts[ix];/* F3: the numbers the card SHOWS at the click (Tốn + the pay-on-success price on «thành») */const ton=Object.assign({},o.ton||{}),wp=+(((o.x||"").replace(/<[^>]+>/g,"").match(/thành:[^·]*Bạc -(\d+)/)||[])[1]||0);chooseM(ix);
     res[lab]={dBac:S.bac-b0,dTc:S.tamco-t0,pr,tc:c0.tc,hire:c0.hire,fx:o.fx,p:o.p,seen,ton,wp,won:!!S.__won}}finally{runAct=r0;window.ptHarmSend=ptS}
    S.bac=2000;S.tamco=60;S.khac=99;Q.length=0;v.block=0;}
   return res});
  if(first)console.log("pay",JSON.stringify(pay));
  if(pay){const t=pay.tc,h=pay.hire;if(t.seen!==t.p)F(sz,`tc road rolled ${t.seen} vs shown ${t.p}`);if(h.seen!==h.p)F(sz,`hire road rolled ${h.seen} vs shown ${h.p}`);
   /* F3: charged = exactly what the card showed at the click: Tốn either way, the «thành» price only when the act landed (S.__won); a scheme's own gain (spy: Tâm cơ +2 on success) is allowed on top */
   for(const lab of ["plain","tc","hire"]){const x=pay[lab];if(!x)continue;const wantB=(x.ton.bac||0)-(x.won?x.wp:0),wantT=x.ton.tamco||0;
    if(x.dBac!==wantB||(x.dTc!==wantT&&!(x.won&&x.dTc>wantT)))F(sz,`${lab} road charged bạc ${x.dBac} Tâm cơ ${x.dTc}, the card showed bạc ${wantB} Tâm cơ ${wantT} (Tốn ${JSON.stringify(x.ton)}, thành price ${x.wp}, won ${x.won})`)}}
  /* 3b. parallel time: a scheme SENT with a servant (ptHarmSend) carries the road in the deed and pays it when the deed lands */
  const dd=await p.evaluate(()=>{if(typeof ptHarmSent!=='function'||typeof ptOn!=='function'||!ptOn())return {skip:'ptime off'};S.bac=2000;S.tamco=60;S.khac=99;
   const priced=Object.keys(ACT).filter(k=>ACT[k].__c0);let k=null,v=null;for(const kk of priced){v=liveRivals(true).find(x=>{try{return ACT[kk].ok(S,x)&&ptHarmSent(x,kk)}catch(e){return false}});if(v){k=kk;break}}
   if(!v)return {skip:'no sendable priced scheme'};if(!S.maid)return {skip:'no maid'};const bs0=bestSent;bestSent=()=>S.maid;/* a free servant to send (this fresh life may have none) */try{
   const out={};for(const [ix,lab] of [[1,'tc'],[2,'hire']]){S.bac=2000;S.tamco=60;v.block=0;try{used=0}catch(e){}S.confined=0;S.mg=null;const c=econRoadCost(k,S,v),n0=ptZ().length;Q.length=0;pushDil(mkP('roadpick',{v:v.id,k}),ACT[k].n);chooseM(ix);
    const a=ptZ().slice(n0).find(x=>x.tgt==='v'+v.id);if(!a){out[lab]={nodeed:1};continue}
    const ec=a.econ&&a.econ.road;const pays=[];const ep0=econRoadPay;econRoadPay=function(a2,k2,t2,r2){const tc0=a2.tamco,bc0=a2.bac,x=ep0.apply(this,arguments);pays.push({road:r2,dTc:a2.tamco-tc0,dBac:a2.bac-bc0});return x};
    const b0=S.bac,t0=S.tamco;try{ptLand(a)}finally{econRoadPay=ep0}out[lab]={kind:a.kind,econ:ec,pays,c,dTcAtSend:t0-60,dBacAtSend:b0-2000,dTcLand:S.tamco-t0,dBacLand:S.bac-b0,her:window.ECON_HER}}
   return {k,v:v.name,out}}finally{bestSent=bs0}});
  if(first)console.log('ptime deeds',JSON.stringify(dd));
  if(dd&&!dd.skip){const T=dd.out.tc,H=dd.out.hire;
   if(!T||T.econ!=='tc'||T.dTcAtSend!==0||T.pays.length!==1||T.pays[0].dTc!==-T.c.tc)F(sz,'sent deed (Tâm cơ road): road not carried / not paid at landing '+JSON.stringify(T));
   if(!H||H.econ!=='hire'||H.dBacAtSend!==0||H.pays.length!==1||H.pays[0].dBac!==-H.c.hire||H.dBacLand>-H.c.hire||H.dBacLand<-(H.c.hire+H.c.pr))F(sz,'sent deed (hire road): road not carried / not paid at landing '+JSON.stringify(H));
   if((T&&T.her)||(H&&H.her))F(sz,'ECON_HER left set after a deed');}
  else if(first)console.log('NOTE ptime deed check skipped:',dd&&dd.skip);
  /* 3c. pay-on-success schemes (ECON_WIN): forced fail + success per road; charged = the card (Tốn either way, price only on «thành») */
  const wv=await p.evaluate(()=>{const ks=ECON_WIN.filter(k=>ACT[k]&&ACT[k].__c0);let k=null,v=null;S.bac=2000;S.tamco=60;
   for(const kk of ks){v=liveRivals(true).find(x=>{try{return ACT[kk].ok(S,x)}catch(e){return false}});if(v){k=kk;break}}if(!v)return {skip:'no pay-on-success scheme open'};
   const pH=window.ptHarmSend;window.ptHarmSend=null;const out=[];try{for(const road of ['','tc','hire'])for(const fz of [0,100]){S.bac=2000;S.tamco=60;v.block=0;try{used=0}catch(e){}S.confined=0;S.mg=null;Q.length=0;
    const c=econRoadCost(k,S,v),i=rivals.indexOf(v);let seen=null;const r0=runAct;runAct=function(){seen=ACTFZ?ACTFZ.o:null;return r0.apply(this,arguments)};
    const b0=S.bac,t0=S.tamco;S.__won=0;try{econRoadGo(i,k,road,fz,c)}finally{runAct=r0}const won=!!S.__won;
    const want={dTc:road==='tc'?-c.tc:0,dBac:-(road==='hire'?c.hire:0)-(fz?c.pr:0),pr:c.pr};out.push({road,fz,seen,won,dTc:S.tamco-t0,dBac:S.bac-b0,want})}}finally{window.ptHarmSend=pH}
   return {k,v:v.name,out}});
  if(first)console.log('pay-on-success',JSON.stringify(wv));
  /* 3d. F3 shown = charged even when the price moves between the card and the payment (khắc spent, ranks change…): the base price doubles after the card */
  const mv=await p.evaluate(()=>{const k=["bribe","block","spy","poison"].find(k=>ACT[k]&&ACT[k].__c0&&liveRivals(true).some(x=>ACT[k].ok(S,x)&&econRoadRolls(k,S,x)));if(!k)return {skip:'no road scheme'};
   const out=[];for(const road of ['','tc','hire']){S.bac=3000;S.tamco=60;try{used=0}catch(e){}S.confined=0;S.mg=null;Q.length=0;const v=liveRivals(true).find(x=>ACT[k].ok(S,x)&&econRoadRolls(k,S,x));v.block=0;
    const c=econRoadCost(k,S,v),b0=S.bac,t0=S.tamco,base=ACT[k].__c0.bac;ACT[k].__c0.bac=base*2;const moved=econSchemePrice(k,S,v);const pH=window.ptHarmSend;window.ptHarmSend=null;S.__won=0;
    try{econRoadGo(rivals.indexOf(v),k,road,100,c)}finally{ACT[k].__c0.bac=base;window.ptHarmSend=pH}const won=!!S.__won,win=ECON_WIN.includes(k);
    const want={dTc:road==='tc'?-c.tc:0,dBac:-(road==='hire'?c.hire:0)-(!win||won?c.pr:0)};out.push({road,won,dBac:S.bac-b0,dTc:S.tamco-t0,want,moved,shown:c.pr})}return {k,out}});
  if(first)console.log('price moved after the card',JSON.stringify(mv));
  /* 3e. F4: a frozen road/price she can no longer pay (the host's copy of her, a late deed) stops the act: «Thiếu …», nothing charged, never below 0 */
  const lk=await p.evaluate(()=>{const k=["spy","bribe","block","poison"].find(k=>ACT[k]&&ACT[k].__c0&&liveRivals(true).some(x=>ACT[k].ok(S,x)&&econRoadRolls(k,S,x)));if(!k)return {skip:1};const out=[];
   for(const [road,bac,tc] of [['hire',null,60],['','low',60],['tc',2000,0]]){S.bac=2000;S.tamco=60;try{used=0}catch(e){}Q.length=0;const v=liveRivals(true).find(x=>ACT[k].ok(S,x)&&econRoadRolls(k,S,x));const c=econRoadCost(k,S,v);
    S.bac=bac==null?c.pr+c.hire-1:bac==='low'?c.pr-1:bac;S.tamco=tc;const b0=S.bac,t0=S.tamco;window.ECON_HER={k,t:v.id,road,fz:50,c};let r="";try{r=runAct(S,v,k)}finally{window.ECON_HER=null}
    out.push({road,r:String(r).slice(0,60),dBac:S.bac-b0,dTc:S.tamco-t0,bac:S.bac,tc:S.tamco})}return {k,out}});
  if(first)console.log('cannot pay any more',JSON.stringify(lk));
  if(lk&&!lk.skip)for(const x of lk.out)if(x.dBac||x.dTc||!/Thiếu/.test(x.r)||x.bac<0||x.tc<0)F(sz,`F4 road «${x.road||'plain'}» she cannot pay: must stop «Thiếu …» and charge nothing ${JSON.stringify(x)}`);
  if(mv&&!mv.skip)for(const x of mv.out)if(x.moved===x.shown)F(sz,'3d: the price did not move, the check proves nothing');else if(x.dBac!==x.want.dBac||(x.dTc!==x.want.dTc&&!(x.won&&x.dTc>x.want.dTc)))F(sz,`${mv.k} road «${x.road||'plain'}»: the price moved after the card and the charge followed it (bạc ${x.dBac} Tâm cơ ${x.dTc}, card bạc ${x.want.dBac} Tâm cơ ${x.want.dTc})`);
  if(wv&&!wv.skip){for(const x of wv.out){/* F2: the frozen odds decide (bribe: the maid's take weight = the frozen odds) — 0 never lands; 100 lands unless caught first (block) */const wantB=x.won?x.want.dBac:x.want.dBac+(x.fz?x.want.pr:0);
    if(x.fz===0&&x.won||wv.k==='bribe'&&x.fz===100&&!x.won)F(sz,`${wv.k} road «${x.road||'plain'}»: frozen odds ${x.fz} but landed=${x.won} (the road's odds do not reach the outcome)`);
    if(x.dBac!==wantB||x.dTc!==x.want.dTc)F(sz,`${wv.k} road «${x.road||'plain'}» ${x.won?'success':'fail'}: charged bạc ${x.dBac} Tâm cơ ${x.dTc}, card says bạc ${wantB} Tâm cơ ${x.want.dTc}`)}
   if(!wv.out.some(x=>x.seen===x.fz))F(sz,'pay-on-success: forced odds never reached the roll '+JSON.stringify(wv.out));}
  else if(first)console.log('NOTE pay-on-success check skipped:',wv&&wv.skip);
  /* 4. NPC roads (law 1): same price, same bonus */
  const npc=await p.evaluate(()=>{const R=BAL.tcroad;const L=liveRivals(true);const res={n:0,tc:0,hire:0,plain:0,bad:[]};
   for(let i=0;i<300;i++){const a=L[i%L.length],t=L[(i+1)%L.length];if(a===t||sameHouse(a,t))continue;const k=["rumor","bribe","block","frame"][i%4];if(!ACT[k]||!ACT[k].__c0)continue;
    a.bac=1000;a.tamco=70;const c=econRoadCost(k,a,t);const b0=a.bac,t0=a.tamco;let bon=null;const o0=aOdd;
    aOdd=function(o,x){const z=o0.apply(this,arguments);if(x===a&&bon==null)bon=z-o;return z};
    try{if(!ACT[k].ok(a,t))continue;ACTX=actCtx(a,t,k);try{ACT[k].f(a,t)}finally{ACTX={a:null,pen:0}}}catch(e){res.bad.push(String(e).slice(0,80))}finally{aOdd=o0}
    res.n++;const dT=a.tamco-t0;if(dT<=-c.tc)res.tc++;else if(b0-a.bac>=c.pr+c.hire)res.hire++;else res.plain++;t.block=0}
   return res});
  /* 5. one core: the plain road charges exactly the printed price (every priced scheme, NPC actor, success forced) */
  const pc=await p.evaluate(()=>{const L=liveRivals(true);const bad=[];const np=BAL.tcroad.npcP;BAL.tcroad.npcP=0;const rnd=Math.random;Math.random=()=>0;
   try{for(const k of Object.keys(ACT).filter(k=>ACT[k].__c0)){const a=L[0],t=L[1];if(!a||!t)break;a.bac=1000;a.tamco=70;if(!ACT[k].ok(a,t))continue;const pr=econSchemePrice(k,a,t);const b0=a.bac;
     ACTX=actCtx(a,t,k);try{ACT[k].f(a,t)}catch(e){}finally{ACTX={a:null,pen:0}}const d=b0-a.bac;if(d!==pr&&d!==0)bad.push([k,pr,d])}}finally{BAL.tcroad.npcP=np;Math.random=rnd}return bad});
  console.log(sz,"price scan (k, printed, charged):",JSON.stringify(pc));if(pc.length)F(sz,`price ≠ charge: ${JSON.stringify(pc)}`);
  console.log(sz,"npc roads",JSON.stringify(npc));if(npc.bad.length)F(sz,`npc errors ${npc.bad[0]}`);if(!(npc.tc>0&&npc.hire>0))F(sz,"NPCs never take a road");
  if(errs.length)F(sz,`page errors: ${errs.slice(0,3).join(" | ")}`);first=false;await ctx.close()}
 await b.close();if(fails.length){console.log("FAIL\n"+fails.join("\n"));process.exit(1)}console.log("PASS econ-tamco")})();
