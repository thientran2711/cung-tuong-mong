/* review/place-rules (owner OD 25/11 ~23:33Z): the three families of the Đức Thọ cung bug.
   A warned overstay → caught: moved home AT ONCE (S.place, S.visit, stage), NHẸ = khất bổng, no cấm túc (review/home-way), «Bị bắt»; the warning on ENTRY («chỉ được lưu đến hết …»)
     and at the last khắc («sắp đóng cửa sau khắc này») came first.
   B unwarned overstay (no notice shown) → escorted home, no Danh loss, no cấm túc, «Hết giờ tiếp».
   C cấm túc set by ANY path while away (plain punish at Ngự hoa viên) → the next render moves her home.
   D one presence: the Hoàng hậu on her stage at Đức Thọ cung → no AG-MEET arrival card (gmCard null), no door approach (AP_MK null).
   E a summons answered («Thái hậu triệu» → «Đến ngay») walks her to Đức Thọ cung.
   F the door refusal of Cần Chính điện («Ngươi phải lui ra») sends her home.
   usage (HOST mode, built root): [DEV=fold|ipadAir] node dev/test/place-rules.js → JSON + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,process.env.DEV||'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__toastKeep=1;let a=13572468;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  window.__chips=[];const o=window.kitNotice;window.kitNotice=function(t){const r=o.apply(this,arguments);try{if(r)window.__chips.push(r.text)}catch(e){}return r};
  /* one buổi turn as the player sees it: the cards an inner wrapper queued are read and closed, then the turn goes on */
  window.__turn=async(force)=>{const b0=S.buoi,cards=[];const R0=Math.random;if(force!=null)Math.random=()=>force;
   try{for(let i=0;i<8&&S.buoi===b0;i++){/* motion scenes are hidden in this test: their queue must not hold the turn (jdayq) */try{kmBusy=false;KMQ.length=0}catch(e){}try{nextBuoi()}catch(e){}await new Promise(r=>setTimeout(r,250));for(const m of Q)cards.push(m.t);if(S.buoi===b0){Q.length=0;document.getElementById('modal').hidden=true}}}finally{Math.random=R0}
   await new Promise(r=>setTimeout(r,600));for(const m of Q)cards.push(m.t);return cards};
  window.__reset=()=>{Q.length=0;document.getElementById('modal').hidden=true;S.dead=false;S.confined=0;S.out=0;S.closeSeen=null;S.stayRoll=null;S.plWarn=null;window.__chips=[];
   S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;S.acPass={};S.thDead=false;render();Q.length=0;document.getElementById('modal').hidden=true;window.__chips=[]};
  /* a walk out of her palace first asks «Chọn người theo hầu» (j95s): she goes alone */
  window.__go=async k=>{Q.length=0;document.getElementById('modal').hidden=true;goTo(k);for(let i=0;i<4&&S.place!==k&&Q.length;i++){const m=Q[0];const j=(m.opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await new Promise(r=>setTimeout(r,300))}
   Q.length=0;document.getElementById('modal').hidden=true};
  /* no festival opens Đức Thọ cung all day in this test (jact2 AS_FPLACE) */try{asFestToday=function(){return null}}catch(e){}});
 await sleep(800);
 /* A: warned overstay at Đức Thọ cung (open at buổi sáng only), caught */
 const A=await g.evaluate(async()=>{__reset();await __go("tn");document.getElementById('modal').hidden=true;render();await new Promise(r=>setTimeout(r,300));
  const entry=__chips.find(x=>/chỉ được lưu đến hết/.test(x))||"";used=BAL.time.khac-1;render();await new Promise(r=>setTimeout(r,300));
  const last=__chips.find(x=>/sắp đóng cửa sau khắc này/.test(x))||"";used=BAL.time.khac-travel("tn","home");/* review/home-way: she still had the khắc to walk home (no way home = no fault, home-way.js C) */const danh0=S.danh,cut0=S.cutPay||0,placeIn=S.place;const pw=[S.plWarn,S.closeSeen,bkey()];const sr0=stayRoll;
  const cards=await __turn(0.999);const stageTxt=(document.querySelector('#stage')||document.body).innerText.slice(0,4000);
  return{pw,placeIn,entry,last,buoi:S.buoi,place:S.place,visitK:S.visit&&S.visit.k,confined:S.confined,dCut:(S.cutPay||0)-cut0,dDanh:S.danh-danh0,cards,stageHome:!/Đức Thọ cung/.test(stageTxt.split("\n").slice(0,3).join(" ")),msg:S.visit&&S.visit.msg}});
 /* B: unwarned (the notice never shown) → escorted out, no loss */
 const B=await g.evaluate(async()=>{__reset();window.__accSilent=1;try{accGrant(S,"tn");await __go("tn")}finally{window.__accSilent=0}Q.length=0;document.getElementById('modal').hidden=true;
  S.plWarn=null;S.closeSeen=null;const r0=render;render=function(){};let cards;const danh0=S.danh;try{used=BAL.time.khac-1;cards=await __turn(0.999)}finally{render=r0}render();
  return{place:S.place,visitK:S.visit&&S.visit.k,confined:S.confined,dDanh:S.danh-danh0,cards}});
 /* C: cấm túc from a plain punish while away */
 const C=await g.evaluate(async()=>{__reset();S.buoi=1;await __go("vuon");document.getElementById('modal').hidden=true;const in0=S.place;punish(S,"thử",1);render();await new Promise(r=>setTimeout(r,200));
  return{in0,place:S.place,visitK:S.visit&&S.visit.k,confined:S.confined,msg:S.visit&&S.visit.msg}});
 /* D: one presence */
 const Dd=await g.evaluate(async()=>{__reset();const q=rivals.find(v=>v.queen&&v.alive&&!v.out)||rivals.find(v=>v.alive&&!v.out);S.where=S.where||{};S.where[q.id]="tn";
  try{if(S.roster&&S.roster.P&&S.roster.P["v"+q.id])for(const e of S.roster.P["v"+q.id])e[0]="tn"}catch(e){}
  await __go("tn");render();const onStage=curPeople().some(x=>x.ref===q);const w=plWith(q);
  const gm=typeof gmCard==="function"?gmCard(q):"nofn";let ap=null;try{ap=AP_MK.apFriend({kind:"apFriend",who:q,s:1})}catch(e){ap="err:"+e}
  const other=rivals.find(v=>v!==q&&v.alive&&!v.out&&whereOf(v)!==S.place);const wOther=other?plWith(other):null;
  Q.length=0;Q.push({ev:1,t:"Có người đến",who:pv(q),h:"<p>Phía trước có tiếng cung nhân xướng: “Hoàng hậu giá đáo!”</p><p>Nàng hỏi han ngươi.</p>",opts:[{n:"Thôi",fx:{}}]});showModal();const gate=Q[0]?{t:Q[0].t,h:Q[0].h}:null;Q.length=0;document.getElementById('modal').hidden=true;
  return{gate,q:q.name,queen:!!q.queen,onStage,with:w,gmNull:gm===null,apNull:ap===null,wOther,stat:PR.stat}});
 /* E: a summons answered walks her there */
 const E=await g.evaluate(async()=>{__reset();Q.length=0;Q.push({ev:1,t:"Thái hậu triệu",who:pTH(),h:"<p>thử</p>",opts:[{n:"Đến ngay",fx:{}},{n:"Cáo bệnh",fx:{}}]});
  const q0=Q.map(m=>m.t+':'+(m.opts||[]).map(o=>o.n).join('/'));const cf=[S.confined,S.out,S.dead];chooseM(0);await new Promise(r=>setTimeout(r,300));render();await new Promise(r=>setTimeout(r,300));const asked=Q.map(m=>m.t);
  for(let i=0;i<4&&S.place!=="tn"&&Q.length;i++){const j=(Q[0].opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await new Promise(r=>setTimeout(r,300))}Q.length=0;document.getElementById('modal').hidden=true;render();await new Promise(r=>setTimeout(r,300));return{q0,cf,asked,place:S.place,visitK:S.visit&&S.visit.k,stat:PR.stat.summon}});
 /* F: Cần Chính điện door refusal */
 const F=await g.evaluate(async()=>{__reset();S.where=S.where||{};S.where.emp="thu";try{if(S.roster&&S.roster.P&&S.roster.P.emp)for(const e of S.roster.P.emp)e[0]="thu"}catch(e){}S.sung=0;accGrant(S,"thu");
  const R0=Math.random;Math.random=()=>0.999;try{window.__accSilent=1;goTo("thu")}finally{window.__accSilent=0;Math.random=R0}const ref=/lui/.test(String(S.visit&&S.visit.msg));Q.length=0;document.getElementById('modal').hidden=true;render();
  return{place:S.place,visitK:S.visit&&S.visit.k,msg:S.visit&&S.visit.msg,ref}});
 /* G: Dư đồ under cấm túc (k17): she is home, no label repeats «cấm túc», her home label says «Nhà ta», ONE notice; away: «Về phòng» walks home */
 const G=await g.evaluate(async()=>{__reset();S.buoi=1;await __go("vuon");S.confined=2;tab="go";window.__chips=[];render();await new Promise(r=>setTimeout(r,500));
  const labs=[...document.querySelectorAll('.mapv .mspot')].map(e=>e.innerText);const rep=labs.filter(t=>/cấm túc/.test(t)).length;const home=labs.some(t=>/Nhà ta/.test(t));const ban=window.__chips.filter(x=>/Đang cấm túc/.test(x)).length;
  S.confined=0;S.buoi=1;used=0;S.plBan=null;await __go("vuon");tab="go";render();await new Promise(r=>setTimeout(r,300));const b=document.querySelector('[data-plhome]');const btn=b?b.innerText:"";if(b)b.click();await new Promise(r=>setTimeout(r,300));
  const after=S.place;tab="act";render();return{place0:"home",rep,home,ban,btn,after}});
 const old=await g.evaluate(()=>{try{delete S.plWarn;S=JSON.parse(JSON.stringify(S));render();return true}catch(e){return String(e)}});
 const X=[];
 if(A.placeIn!=="tn"||!A.entry||!A.last)X.push("A-warn");if(A.place!=="home"||A.visitK!=="home"||A.confined||!(A.dCut>0)||!A.cards.includes("Bị bắt"))X.push("A-moved");/* review/home-way: a caught overstay is NHẸ (khất bổng, never cấm túc) */
 if(B.place!=="home"||B.visitK!=="home"||B.confined||B.dDanh<0||!B.cards.includes("Hết giờ tiếp"))X.push("B-unwarned");
 if(C.in0!=="vuon"||C.place!=="home"||C.visitK!=="home")X.push("C-sweep");
 if(!Dd.onStage||!Dd.with||!Dd.gmNull||!Dd.apNull||Dd.wOther||!Dd.gate||Dd.gate.t!=="Người bên cạnh"||/giá đáo/.test(Dd.gate.h))X.push("D-presence");
 if(E.place!=="tn")X.push("E-summon");if(F.ref&&F.place!=="home")X.push("F-door");if(old!==true)X.push("old");if(G.rep||!G.home||G.ban!==1||!/Về phòng/.test(G.btn)||G.after!=="home")X.push("G-map");
 console.log(JSON.stringify({dev:process.env.DEV||'ipadAir',faults:X,A,B,C,D:Dd,E,F,G,old,errs:errs.slice(0,3)}));await b.close();srv.close();process.exit(X.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
