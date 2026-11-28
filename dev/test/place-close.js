/* review/place-close (owner OD 26/11 ~14:00Z): closing chip + grace + NHẸ from khắc grace+1, never cấm túc, no dialog.
   A last allowed khắc at Đức Thọ cung (closes after buổi sáng): kitNotice line «Nơi này sắp đóng cửa, mời tiểu chủ rời đi», state pulse, chipGo + goLabel «Về phòng · N khắc».
   B SEEDED TALK PAST CLOSING: a talk card open at the last khắc spends past the buổi line (carry), the card closes, the buổi turns:
     no punishment, no cấm túc, no card; she is still there; grace end = max(BAL.placeClose.grace, carry+leave); chip «Đã quá giờ, mời tiểu chủ rời đi» state late.
   C grace khắc: used < end → nothing; used = end (caught roll forced) → Danh -BAL.sneak.danh + khất bổng BAL.punW.lite.cut, confined 0, home, NO Q card, notice closepen.
   D she leaves inside the grace (homeGo) → no loss.  E not caught → stays, no loss, one roll per buổi.  F unwarned → walked home at the end of the grace, no loss.
   G a long spill (carry 3) → grace lasts to carry+leave.  H punish weight that would confine is refused (BAL.placeClose.sev forced 1 → still no cấm túc).
   usage (HOST mode, built root): [DEV=fold|ipadAir] node dev/test/place-close.js → JSON + exit 1 on a fault */
const {chromium}=require('./lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,process.env.DEV||'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{window.__toastKeep=1;let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  S.emp.traits=S.emp.traits.filter(t=>t!=="nongnay"&&t!=="nhantu");
  window.__N=[];const o=window.kitNotice;window.kitNotice=function(t){const r=o.apply(this,arguments);try{if(t&&typeof t==="object")window.__N.push({id:t.id,line:t.line,text:t.text,state:t.tone==="red"?"late":t.pulse?"pulse":"",hold:!!t.hold,go:typeof t.go==="function",chipGo:!!t.chipGo,goLabel:t.goLabel||""})}catch(e){}return r};
  window.__cl=()=>{Q.length=0;document.getElementById('modal').hidden=true};
  window.__turn=async(force)=>{const b0=S.buoi,cards=[];const R0=Math.random;if(force!=null)Math.random=()=>force;
   try{for(let i=0;i<8&&S.buoi===b0;i++){try{kmBusy=false;KMQ.length=0}catch(e){}try{nextBuoi()}catch(e){}await new Promise(r=>setTimeout(r,250));if(S.buoi===b0)__cl()}}finally{Math.random=R0}
   await new Promise(r=>setTimeout(r,500));return cards};
  window.__reset=()=>{__cl();S.dead=false;S.confined=0;S.out=0;S.cutPay=0;S.closeSeen=null;S.stayRoll=null;S.plWarn=null;S.plGrace=null;S.j76carry=0;S.j76ck="";
   S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;S.acPass={};render();__cl();window.__N.length=0};
  window.__go=async k=>{__cl();window.__accSilent=1;try{accGrant(S,k);goTo(k)}finally{window.__accSilent=0}for(let i=0;i<4&&S.place!==k&&Q.length;i++){const m=Q[0];const j=(m.opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await new Promise(r=>setTimeout(r,300))}
   __cl();render();await new Promise(r=>setTimeout(r,300))};
  /* at Đức Thọ cung, last khắc of buổi sáng, then a talk card that spends n khắc (spill), card closed, buổi turned with the roll forced to fail */
  window.__spill=async(n,warn)=>{__reset();await __go("tn");if(!warn){S.closeSeen="x";}used=BAL.time.khac-1;if(warn)render();else{S.plWarn=null;S.closeSeen=null}await new Promise(r=>setTimeout(r,300));
   if(!warn){S.plWarn=null;S.closeSeen=null}
   Q.push({t:"Trò chuyện",h:"<p>…</p>",opts:[{n:"Nói tiếp",fx:{}}]});spend(n);const carry=S.j76carry;__cl();const N0=__N.slice();await __turn(0.999);return{carry,N0}};
  try{asFestToday=function(){return null}}catch(e){}});
 await sleep(800);
 const snap=()=>g.evaluate(()=>({place:S.place,buoi:S.buoi,used,confined:S.confined||0,cut:S.cutPay||0,danh:S.danh,G:S.plGrace,Q:Q.map(m=>m.t),modal:!document.getElementById('modal').hidden}));
 /* A */
 const A=await g.evaluate(async()=>{__reset();await __go("tn");used=BAL.time.khac-travel("tn","home");render();await new Promise(r=>setTimeout(r,300));return{N:__N.filter(x=>/^close:/.test(x.id)),w:homeWay()}});
 /* B + C */
 const B0=await g.evaluate(async()=>{const d0=S.danh;const r=await __spill(2,true);return{...r,d0}});
 const B=await snap();const BN=await g.evaluate(()=>__N.filter(x=>/^close/.test(x.id)).map(x=>({id:x.id,line:x.line,state:x.state,text:(kitNoticeList().find(y=>y.id===x.id)||x).text})));
 const C1=await g.evaluate(async()=>{Math.random=()=>0.999;used=1;render();await new Promise(r=>setTimeout(r,200));return{place:S.place,danh:S.danh,cut:S.cutPay||0,roll:S.stayRoll}});
 const C2=await g.evaluate(async()=>{const d0=S.danh;const R0=Math.random;Math.random=()=>0.999;try{used=S.plGrace.end;render();await new Promise(r=>setTimeout(r,300))}finally{Math.random=R0}
  return{dDanh:S.danh-d0,cut:S.cutPay||0,confined:S.confined||0,place:S.place,Q:Q.map(m=>m.t),modal:!document.getElementById('modal').hidden,pen:__N.filter(x=>/^closepen:/.test(x.id)).map(x=>x.text),want:{danh:-BAL.sneak.danh,cut:BAL.punW.lite.cut[0]}}});
 /* D leave in grace */
 const Dd=await g.evaluate(async()=>{await __spill(2,true);const d0=S.danh;const w=homeWay();const ok=homeGo();render();await new Promise(r=>setTimeout(r,200));Math.random=()=>0.999;used=Math.max(used,3);render();
  return{w:w&&w.label,ok,place:S.place,dDanh:S.danh-d0,cut:S.cutPay||0,confined:S.confined||0}});
 /* E not caught */
 const E=await g.evaluate(async()=>{await __spill(2,true);const d0=S.danh;const R0=Math.random;Math.random=()=>0.0;try{used=S.plGrace.end;render();render()}finally{Math.random=R0}const r1=S.stayRoll;Math.random=()=>0.999;used=BAL.time.khac-1;render();Math.random=R0;
  return{place:S.place,dDanh:S.danh-d0,cut:S.cutPay||0,roll:r1}});
 /* F unwarned */
 const F=await g.evaluate(async()=>{await __spill(2,false);const d0=S.danh;const G=S.plGrace;Math.random=()=>0.999;used=G?G.end:2;render();await new Promise(r=>setTimeout(r,200));
  return{G,place:S.place,dDanh:S.danh-d0,cut:S.cutPay||0,confined:S.confined||0,out:__N.filter(x=>/^closeout:/.test(x.id)).length,Q:Q.map(m=>m.t)}});
 /* G long spill */
 const Gg=await g.evaluate(async()=>{const r=await __spill(4,true);return{carry:r.carry,G:S.plGrace,used,want:Math.max(BAL.placeClose.grace,used+BAL.placeClose.leave)}});
 /* H a confining weight is refused */
 const H=await g.evaluate(async()=>{await __spill(2,true);const sv=BAL.placeClose.sev;BAL.placeClose.sev=1;const R0=Math.random;Math.random=()=>0.999;try{used=S.plGrace.end;render()}finally{Math.random=R0;BAL.placeClose.sev=sv}return{confined:S.confined||0,place:S.place}});
 /* I WHOLE FAMILY: every place that closes at some buổi line (accessOf ok at b, not at b+1): talk past closing → no loss at the turn; grace used up → NHẸ, never cấm túc, no card */
 const I=await g.evaluate(async()=>{const out=[];const L=(typeof places==="function"?places():[]).map(x=>x.k).filter(k=>k&&k!=="home");
  for(const k of L)for(let b=0;b<B4L;b++){__reset();S.buoi=b;if(typeof accOwn==="function"&&accOwn(S,k))continue;const a0=accessOf(S,k);S.buoi=b+1;const a1=accessOf(S,k);S.buoi=b;if(!a0.ok||a1.ok)continue;
   await __go(k);if(S.place!==k)continue;used=BAL.time.khac-1;render();const d0=S.danh,c0=S.cutPay||0;Q.push({t:"Trò chuyện",h:"<p>…</p>",opts:[{n:"Nói tiếp",fx:{}}]});spend(2);__cl();await __turn(0.999);
   const t={place:S.place,conf:S.confined||0,dd:S.danh-d0,cut:(S.cutPay||0)-c0,G:!!S.plGrace,Q:Q.length};const R0=Math.random;Math.random=()=>0.999;try{if(S.plGrace){used=S.plGrace.end;render()}}finally{Math.random=R0}
   out.push({k,b,t,after:{place:S.place,conf:S.confined||0,dd:S.danh-d0,Q:Q.length}});break}
  return out});
 const R={I,A,B0,B,BN,C1,C2,D:Dd,E,F,G:Gg,H,errs:errs.slice(0,5)};const fail=[];
 const a=A.N[A.N.length-1];if(!a||a.line!=="Nơi này sắp đóng cửa, mời tiểu chủ rời đi"||a.state!=="pulse"||!a.hold||!a.go||!a.chipGo||a.goLabel!==A.w.label)fail.push("A last-khắc chip "+JSON.stringify(a));
 if(!(B0.carry>0))fail.push("B no spill carry");if(B.buoi!==1||B.place!=="tn"||B.confined||B.cut||B.danh!==B0.d0||B.Q.length||B.modal)fail.push("B punished at the turn / dialog "+JSON.stringify(B));
 if(!B.G||B.G.end!==Math.max(2,B0.carry+1))fail.push("B grace end "+JSON.stringify(B.G));
 const late=BN.find(x=>/^close:/.test(x.id)&&x.state==="late");if(!late||late.line!=="Đã quá giờ, mời tiểu chủ rời đi"||!/khắc ân hạn/.test(late.text))fail.push("B red chip "+JSON.stringify(BN));
 if(C1.place!=="tn"||C1.roll||C1.cut)fail.push("C1 punished inside grace");
 if(C2.dDanh!==C2.want.danh||C2.cut!==C2.want.cut||C2.confined||C2.place!=="home"||C2.Q.length||C2.modal||!C2.pen.length||!/không bị cấm túc/.test(C2.pen[0]))fail.push("C2 penalty "+JSON.stringify(C2));
 if(!Dd.ok||Dd.place!=="home"||Dd.dDanh||Dd.cut||Dd.confined)fail.push("D left in grace punished "+JSON.stringify(Dd));
 if(E.place!=="tn"||E.dDanh||E.cut||!E.roll)fail.push("E not-caught "+JSON.stringify(E));
 if(!F.G||!F.G.nf||F.place!=="home"||F.dDanh||F.cut||F.confined||!F.out||F.Q.length)fail.push("F unwarned "+JSON.stringify(F));
 if(!Gg.G||Gg.G.end!==Gg.want)fail.push("G long spill "+JSON.stringify(Gg));
 if(I.length<3)fail.push("I too few closing places "+I.length);for(const x of I){if(x.t.place!==x.k||x.t.conf||x.t.dd||x.t.cut||!x.t.G||x.t.Q)fail.push("I turn "+JSON.stringify(x));if(x.after.conf||x.after.Q)fail.push("I after "+JSON.stringify(x))}
 if(H.confined)fail.push("H overstay confined");if(errs.length)fail.push("page errors");
 R.fail=fail;console.log(JSON.stringify(R,null,1));await b.close();srv.close();process.exit(fail.length?1:0)})();
