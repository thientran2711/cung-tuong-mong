/* review/home-way (owner OD 26/11 ~04:25Z): the way home + punishment by weight.
   A top bar away (Ngự hoa viên): #k3room shown, label «Về phòng · N khắc» (N = travel = BAL.walk near/far) + her palace's name; tap → her room, khắc spent = N.
   B every place: the label's N = BAL.walk.near or BAL.walk.far (+ slow walk 0 here) and the Dư đồ top-row button says the same label (one rule).
   C no khắc left at a place that closes: button disabled «Về phòng · hết khắc»; the buổi turn → escorted home, NO punishment (no cấm túc, no Danh, no khất bổng).
   D warned overstay, caught: NHẸ = Danh -BAL.sneak.danh + khất bổng BAL.punW.lite.cut, never cấm túc.
   E punish() weights: sev 0 / 1 / 2 → months from BAL.punW, the same for an NPC (law 1); vượt phẩm (BAL.shelf.acc.vpConf) = 0 NHẸ.
   F Dư đồ: her home's label carries «Nhà ta» away from home.
   usage (HOST mode, built root): [DEV=fold|ipadAir] node dev/test/home-way.js → JSON + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,process.env.DEV||'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__toastKeep=1;let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  S.emp.traits=S.emp.traits.filter(t=>t!=="nongnay"&&t!=="nhantu");
  window.__turn=async(force)=>{const b0=S.buoi,cards=[];const R0=Math.random;if(force!=null)Math.random=()=>force;
   try{for(let i=0;i<8&&S.buoi===b0;i++){try{kmBusy=false;KMQ.length=0}catch(e){}try{nextBuoi()}catch(e){}await new Promise(r=>setTimeout(r,250));for(const m of Q)cards.push({t:m.t,h:String(m.h||"").replace(/<[^>]+>/g," ")});if(S.buoi===b0){Q.length=0;document.getElementById('modal').hidden=true}}}finally{Math.random=R0}
   await new Promise(r=>setTimeout(r,600));for(const m of Q)cards.push({t:m.t,h:String(m.h||"").replace(/<[^>]+>/g," ")});return cards};
  window.__reset=()=>{Q.length=0;document.getElementById('modal').hidden=true;S.dead=false;S.confined=0;S.out=0;S.cutPay=0;S.closeSeen=null;S.stayRoll=null;S.plWarn=null;
   S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;S.acPass={};render();Q.length=0;document.getElementById('modal').hidden=true};
  window.__go=async k=>{Q.length=0;document.getElementById('modal').hidden=true;window.__accSilent=1;try{accGrant(S,k);goTo(k)}finally{window.__accSilent=0}for(let i=0;i<4&&S.place!==k&&Q.length;i++){const m=Q[0];const j=(m.opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await new Promise(r=>setTimeout(r,300))}
   Q.length=0;document.getElementById('modal').hidden=true;render();await new Promise(r=>setTimeout(r,300))};
  try{asFestToday=function(){return null}}catch(e){}});
 await sleep(800);
 const btn=()=>g.evaluate(()=>{const rb=document.getElementById('k3room');if(!rb)return null;const r=rb.getBoundingClientRect();const l=rb.querySelector('.kbl');
  return{txt:l?l.textContent:"",shown:!rb.hidden&&r.width>0&&r.height>0&&getComputedStyle(l||rb).display!=="none",disabled:rb.disabled,box:[r.x,r.y,r.width,r.height].map(Math.round)}});
 /* A */
 await g.evaluate(async()=>{__reset();S.buoi=1;await __go("vuon")});
 const A0=await g.evaluate(()=>({place:S.place,tc:travel(S.place,"home"),used,hn:homeName(),near:BAL.walk.near,far:BAL.walk.far}));const Ab=await btn();
 await p.screenshot({path:process.env.SHOT_DIR?`${process.env.SHOT_DIR}/A-${process.env.DEV||'ipadAir'}.png`:'/dev/null'}).catch(()=>{});
 const fr=g.childFrames?null:null;const box=Ab&&Ab.box;let clicked=false;
 try{await g.click('#k3room');clicked=true}catch(e){}await sleep(600);
 const A1=await g.evaluate(()=>({place:S.place,visitK:S.visit&&S.visit.k,used,home:typeof K3SH!=="undefined"?K3SH.home:null}));
 /* B */
 const Bv=await g.evaluate(async()=>{const out=[];__reset();const ks=Object.keys(typeof PLACES!=="undefined"&&PLACES?PLACES:{}).length?Object.keys(PLACES):[];
  tab="go";render();await new Promise(r=>setTimeout(r,300));const cand=[...document.querySelectorAll('[data-go],[data-ak]')].map(e=>e.dataset.go||e.dataset.ak);tab="act";const L=[...new Set(["vuon","tn","thu",...ks,...cand])].filter(k=>k&&k!=="home");
  for(const k of L){__reset();S.buoi=1;try{await __go(k)}catch(e){}if(S.place!==k)continue;tab="go";render();await new Promise(r=>setTimeout(r,150));const w=homeWay();const tc=travel(k,"home");
   const mb=document.querySelector('[data-plhome]');const rb=document.querySelector('#k3room .kbl');out.push({k,tc,label:w&&w.label,map:mb?mb.textContent:null,top:rb?rb.textContent.split("\n")[0]:null});tab="act";if(out.length>=14)break}
  return out});
 /* C no khắc: Đức Thọ cung closes after buổi sáng */
 const C=await g.evaluate(async()=>{__reset();await __go("tn");const s0={danh:S.danh,cut:S.cutPay||0};used=BAL.time.khac;window.__hwCan=null/* r6: she arrived with no khắc to walk home (never had a way) */;render();await new Promise(r=>setTimeout(r,300));
  const w=homeWay();const rb=document.getElementById('k3room');const lab=rb&&rb.querySelector('.kbl').textContent;const dis=rb&&rb.disabled;
  S.closeSeen=null;try{const k=bkey()+"|tn";S.plWarn=k;S.closeSeen=k}catch(e){}
  const cards=await __turn(0.999);return{w,lab,dis,place:S.place,confined:S.confined,dDanh:S.danh-s0.danh,cut:(S.cutPay||0)-s0.cut,cards}});
 /* D warned overstay, caught (place-rules A path, now light) */
 const Dd=await g.evaluate(async()=>{__reset();await __go("tn");render();await new Promise(r=>setTimeout(r,300));used=BAL.time.khac-travel("tn","home");render();await new Promise(r=>setTimeout(r,300));
  const w=homeWay();const s0={danh:S.danh,cut:S.cutPay||0};const cards=await __turn(0.999);
  return{wOk:w&&w.ok,place:S.place,confined:S.confined,dDanh:S.danh-s0.danh,cut:(S.cutPay||0)-s0.cut,cards,want:{danh:-BAL.sneak.danh,cut:BAL.punW.lite.cut[0]}}});
 /* C2 (RV-HOME-WAY r6): she HAD the khắc to walk home (button enabled) but spent them all at the closing place: a warned overstay, caught = NHẸ */
 const C2=await g.evaluate(async()=>{__reset();await __go("tn");render();await new Promise(r=>setTimeout(r,300));const had=window.__hwCan;used=BAL.time.khac;render();await new Promise(r=>setTimeout(r,300));
  S.closeSeen=null;try{const k=bkey()+"|tn";S.plWarn=k;S.closeSeen=k}catch(e){}const s0={danh:S.danh,cut:S.cutPay||0};
  const cards=await __turn(0.999);return{had,place:S.place,confined:S.confined,dDanh:S.danh-s0.danh,cut:(S.cutPay||0)-s0.cut,cards:cards.map(c=>c.t),want:{danh:-BAL.sneak.danh,cut:BAL.punW.lite.cut[0]}}});
 /* E weights, her and an NPC */
 const E=await g.evaluate(()=>{__reset();const v=rivals.find(x=>x.alive&&!x.out&&x.rank===0)||rivals.find(x=>x.alive&&!x.out);const R0=Math.random;Math.random=()=>0.999;const r={};
  try{for(const sev of [0,1,2]){for(const [who,o] of [["S",S],["npc",v]]){o.confined=0;o.cutPay=0;const rk=o===S?S.rank:o.rank;punish(o,"thử",sev);r[who+sev]={conf:o.confined,cut:o.cutPay||0,rk:(o===S?S.rank:o.rank)-rk}}}}finally{Math.random=R0}
  S.confined=0;v.confined=0;return{r,W:BAL.punW,vpConf:BAL.shelf.acc.vpConf,txt:[aaPunishTxt(0),aaPunishTxt(1),aaPunishTxt(2)]}});
 /* F Dư đồ home mark away */
 const F=await g.evaluate(async()=>{__reset();S.buoi=1;await __go("vuon");tab="go";render();await new Promise(r=>setTimeout(r,500));const labs=[...document.querySelectorAll('.mspot')].map(e=>e.innerText);tab="act";render();return{home:labs.filter(t=>/Nhà ta/.test(t)).length,n:labs.length}});
 const R={A:{A0,Ab,clicked,A1},B:Bv,C,C2,D:Dd,E,F,errs:errs.slice(0,5)};
 const fail=[];
 if(!C2.had||C2.place!=="home"||C2.confined||C2.dDanh!==C2.want.danh||C2.cut!==C2.want.cut)fail.push("C2 spent-khắc overstay not light-punished "+JSON.stringify(C2));
 if(!Ab||!Ab.shown)fail.push("A button not shown away");if(Ab&&!new RegExp(`^Về phòng · ${A0.tc} khắc\\n${A0.hn}$`).test(Ab.txt))fail.push("A label "+JSON.stringify(Ab&&Ab.txt));
 if(A1.place!=="home"||A1.visitK!=="home")fail.push("A not home");if(A1.used-A0.used!==A0.tc)fail.push(`A khắc ${A1.used-A0.used}≠${A0.tc}`);
 for(const x of Bv){if(x.tc!==A0.near&&x.tc!==A0.far)fail.push("B cost "+x.k);if(x.label!==`Về phòng · ${x.tc} khắc`||x.map!==x.label||x.top!==x.label)fail.push("B label "+JSON.stringify(x))}
 if(!Bv.some(x=>x.tc===A0.far))fail.push("B no far place seen");if(!Bv.some(x=>x.tc===A0.near))fail.push("B no near place seen");
 if(!C.dis||!/hết khắc/.test(C.lab||""))fail.push("C button not disabled");if(C.place!=="home"||C.confined||C.dDanh||C.cut)fail.push("C punished without fault");if(!C.cards.some(c=>/Không phải lỗi/.test(c.h)))fail.push("C no-fault card");
 if(!Dd.wOk)fail.push("D had no way home");if(Dd.place!=="home"||Dd.confined)fail.push("D cấm túc on overstay");if(Dd.dDanh!==Dd.want.danh||Dd.cut!==Dd.want.cut)fail.push("D light price "+JSON.stringify([Dd.dDanh,Dd.cut]));
 const W=E.W;for(const w of ["S","npc"]){if(E.r[w+0].conf||E.r[w+0].cut!==W.lite.cut[0])fail.push("E lite "+w);if(E.r[w+1].conf!==W.mid.m[0])fail.push("E mid "+w);if(E.r[w+2].conf!==W.heavy.m[0]&&E.r[w+2].rk>=0)fail.push("E heavy "+w)}
 if(E.vpConf!==0)fail.push("E vượt phẩm (shelf) not NHẸ");/* sếp OD 26/11 ~05:55Z «3 lỗi nhẹ ok»: call sites checked by punish-weight-scan.py */
 if(!F.home)fail.push("F no Nhà ta");if(errs.length)fail.push("page errors");
 R.fail=fail;console.log(JSON.stringify(R,null,1));await b.close();srv.close();process.exit(fail.length?1:0)})();
