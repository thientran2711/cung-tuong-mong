/* AG-ALL-2d2 — OWNER-ONLY MINIGAME CALIBRATION (owner OD 17/11 ~16:20Z (f) + ~16:40Z option 1). node dev/test/ag-mgcal.js [dev/index.html]
   1 owner flag only: no flag → no «Thử tay tài nghệ» row in Thiết lập; flag (?hieuchuan=1 / localStorage ctm-owner-cal) → one kit .kctl row
   2 mgCalBase: her rounds brought back to a matching board (raw − (mgMedD(d) − mgMedD(0))), mean, 0..10
   3 bands (owner OD 20/11 ~01:10Z fair spread): no calibration → centred on the skilled human median (old saves roll the same); a calibrated kind →
     centre b + w/2, lo / hi = centre ∓ far (thirds, OD 20/11 ~01:18Z);
     hands re-roll inside the new band from the SAME draw (order of people kept)
   4 fairness with her base b (fair spread): the middle NPC plays like her, about half the NPC plays at or above her on a matching board, symmetric:
     as many hands above her as below; never above 10
   5 the test itself (kit game frame): 5 rounds easy → hard (Dễ … Khó words), result rows, record + «CTM-CAL» code on her device; her device does NOT
     change the shared band (one core: only BAL.ag.mg2.cal.k does)
   6 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const o={};const C=BAL.ag.mg2.cal,H=BAL.ag.mg2.hand;
  o.row0=/Thử tay tài nghệ/.test(optHTML());localStorage.setItem("ctm-owner-cal","1");const h1=optHTML();o.row1=(h1.match(/Thử tay tài nghệ/g)||[]).length;o.kctl=/class="kctl"[^]*data-mgcal-open/.test(h1);
  localStorage.removeItem("ctm-owner-cal");
  /* 2 */
  const ds=[-2,-1,0,1,2],raws=[9,8,7,6,5];let s=0;ds.forEach((d,i)=>s+=raws[i]-(mgMedD(d)-mgMedD(0)));o.base=mgCalBase(raws,ds);o.baseX=Math.round(s/5*10)/10;o.baseClamp=mgCalBase([10,10,10,10,10],[2,2,2,2,2]);
  /* 3 */
  /* steps 3–4 run on kinds the owner has NOT calibrated (BAL.ag.mg2.cal.k), picked at run time: a landed owner code must not break them */
  const UNC=mgCalKinds().filter(k=>!(C.k||{})[k]);const K=UNC[0],K2=UNC[1];o.K=K;o.K2=K2;
  const L=liveRivals(true).filter(v=>v.alive);o.def=mgCalBand(K);const def2=mgCalBand(K2).sig;/* K2 keeps ITS OWN default band (K and K2 may sit in different hand groups, review/cal-p2b-rv) */o.defMed=(H.ctr[K]!=null?H.ctr[K]:H.ctr[""])+H.w/2;const before=L.map(v=>mgHand(K,v));
  const v=L[0];const keep=v.mgH,keepV=v.mgHv;delete v.mgH;delete v.mgHv;o.oldSave=mgHand(K,v)===before[0];v.mgH=keep;v.mgHv=keepV;
  C.k[K]={b:7,n:5,at:"11/17/2026"};const Bd=mgCalBand(K);o.band=Bd;o.same=Bd.sig===o.def.sig;o.share=mgCalShare(K);o.share0=mgCalShare(K2);
  const after=L.map(v=>mgHand(K,v));o.inBand=after.every(h=>h>=Bd.lo-1e-9&&h<=Bd.hi+1e-9);
  const ord=a=>a.map((h,i)=>[h,i]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]).join(",");o.order=ord(before)===ord(after)&&after.every((h,i)=>h===before[i]);o.otherKind=mgCalBand(K2).sig===def2;
  /* 4 */
  const ID=BAL.orig.id,npc0=ID&&ID.npc;if(ID)ID.npc=0;/* cal-p2c: the bare curve (the identity class shift, the same for her and the NPC, is checked in dev/test/cal-p2c.js) */const plays=[];for(let i=0;i<600;i++){const q={name:"T"+i,id:9000+i,rank:S.rank,arts:Object.assign({},S.arts),ag:{o:(S.origin&&S.origin.k)||"_"}};/* equal to her in art and upbringing: no lift */for(let j=0;j<3;j++)plays.push(mgNpcRaw(K,q,{d:0}))}plays.sort((a,b)=>a-b);
  if(ID)ID.npc=npc0;o.reach=plays.filter(x=>x>=7).length/plays.length;o.med=plays[plays.length>>1];o.max=plays[plays.length-1];
  const hs=[];for(let i=0;i<600;i++)hs.push(mgHand(K,{name:"T"+i,id:9000+i})-H.w/2-7);o.up=hs.filter(x=>x>1).length;o.dn=hs.filter(x=>x<-1).length;o.loPlay=Math.min(...hs)+7;
  delete C.k[K];o.back=mgCalBand(K).sig===o.def.sig&&mgHand(K,v)===before[0];
  return o});
 console.log(JSON.stringify(r));
 ok(!r.row0&&r.row1===1&&r.kctl,'1 owner flag only: no row without it; one kit .kctl row with it',{row0:r.row0,row1:r.row1,kctl:r.kctl});
 ok(r.base===r.baseX&&r.baseClamp===10,'2 her base = mean of rounds brought back to a matching board, clamped',{base:r.base,want:r.baseX,clamp:r.baseClamp});
 ok(Math.abs(r.def.c-r.defMed)<.01&&r.oldSave,'3 the NPC curve centres on the average adult play (BAL.ag.mg2.hand ctr) + w/2; an old save rolls the same hand',{def:r.def,old:r.oldSave});
 {const sh=r.share||{},t=sh.better+sh.equal+sh.worse;ok(r.same&&r.inBand&&r.order&&r.otherKind&&r.back&&Math.abs(t-1)<.01&&Math.abs(sh.better-sh.worse)<.08&&sh.equal>.28&&sh.equal<.38&&r.share0===null,'3 her calibration does NOT move the curve (same hands); it places her on it: b = the adult average → better / equal / worse ≈ 37 / 33 / 30; an uncalibrated kind has no place',{same:r.same,inBand:r.inBand,order:r.order,other:r.otherKind,back:r.back,share:sh,share0:r.share0})}
 ok(r.reach>=.45&&r.reach<=.7&&Math.abs(r.med-7)<=.5&&r.max<=10&&Math.abs(r.up-r.dn)<=60,'4 her b 7 = the adult average: the middle NPC plays like her, about half at or above her, as many hands above her as below',{reach:r.reach,med:r.med,max:r.max,up:r.up,dn:r.dn,loPlay:r.loPlay});
 /* 5 the test UI */
 const u=await p.evaluate(async()=>{const o={tiers:[]};const sleep=t=>new Promise(r=>setTimeout(r,t));const k0=kg82Play;let n=0;
  window.kg82Play=function(kind,onEnd){n++;setTimeout(()=>onEnd(10-n),10)};try{kg82Play=window.kg82Play}catch(e){}
  mgCalOpen();await sleep(200);const box=()=>document.getElementById("kg82");o.frame=!!box()&&!box().hidden;o.kinds=mgCalKinds();
  o.btns=document.querySelectorAll("[data-mgcal-k]").length;o.sig0=mgCalBand("dan").sig;/* the shared band before her test (dan may carry the owner's landed code) */document.querySelector('[data-mgcal-k="dan"]').click();
  for(let i=0;i<5;i++){await sleep(150);o.tiers.push(KG82.tier&&KG82.tier.word);const g=document.getElementById("kg82go");if(!g){o.noGo=i;break}g.click();await sleep(150);(document.getElementById("mgcal-nx")||document.getElementById("kg82ok")).click()}
  await sleep(200);const txt=(document.getElementById("kg82")||{}).textContent||"";o.res=/Mức tay của người/.test(txt);o.code=/CTM-CAL dan:/.test(txt);
  const R=JSON.parse(localStorage.getItem("ctm-mgcal")||"{}");o.rec=R.dan&&R.dan.raws;o.b=R.dan&&R.dan.b;o.shared=mgCalBand("dan").sig===o.sig0;
  o.only=mgCalCode().split(" ").length===2;o.pct=/%/.test(txt);(document.getElementById("mgcal-nx")||document.getElementById("kg82ok")).click();await sleep(150);o.back=document.querySelectorAll("[data-mgcal-k]").length;{const t2=(document.getElementById("kg82")||{}).textContent||"";o.rows=/Đã thử 1\/\d+ môn/.test(t2)&&/Chưa thử/.test(t2)}kg82Close();try{kg82Play=k0}catch(e){}return o});
 console.log(JSON.stringify(u));
 ok(u.frame&&u.btns===u.kinds.length&&u.kinds.length>=10,'5 the kit game frame opens with one button per mini-game kind',{btns:u.btns,kinds:u.kinds.length});
 ok(u.tiers.length===5&&u.tiers[0]==="Dễ"&&u.tiers[4]==="Khó","5 five rounds, easy → hard",u.tiers);
 ok(u.res&&u.code&&u.rec&&u.rec.join()==="9,8,7,6,5"&&u.b!=null&&!u.pct,'5 result rows + «CTM-CAL» code; record kept on her device; no %',{rec:u.rec,b:u.b});
 ok(u.shared,'5 her device does not change the shared band (one core: only BAL.ag.mg2.cal.k)',u.shared);
 ok(u.back===u.btns&&u.rows,'5 «Thử môn khác» returns to the kind list; kit rows Đã thử 1/N · Chưa thử',{back:u.back,rows:u.rows});
 ok(u.only,'5 one kind at a time: the code carries only the kinds done',u.only);
 /* 5c owner 17/11 ~17:10Z: ONE run through every kind in order; stop keeps progress; resume starts at the next kind not done */
 const sq=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};let n=0;const k0=kg82Play;window.kg82Play=function(kind,onEnd){n++;setTimeout(()=>onEnd(6),5)};try{kg82Play=window.kg82Play}catch(e){}
  localStorage.removeItem("ctm-mgcal");const ks=mgCalKinds();mgCalOpen();await sleep(150);const b=document.getElementById("mgcal-seq");o.label=b&&b.textContent;b.click();o.played=[];
  for(let j=0;j<3;j++){for(let i=0;i<5;i++){await sleep(60);document.getElementById("kg82go").click();await sleep(60);(document.getElementById("mgcal-nx")||document.getElementById("kg82ok")).click()}await sleep(80);o.played.push(Object.keys(JSON.parse(localStorage.getItem("ctm-mgcal")||"{}")).length);if(j<2)document.getElementById("mgcal-next").click()}
  (document.getElementById("mgcal-nx")||document.getElementById("kg82ok")).click();await sleep(150);const b2=document.getElementById("mgcal-seq");o.resume=b2&&b2.textContent;b2.click();await sleep(100);o.resumeKind=(document.getElementById("kg82")||{}).textContent.includes(KG82_KIND[ks[3]].n);
  o.order=Object.keys(JSON.parse(localStorage.getItem("ctm-mgcal")||"{}")).join()===ks.slice(0,3).join();kg82Close();try{kg82Play=k0}catch(e){}localStorage.removeItem("ctm-mgcal");return o});
 ok(/Thử hết cả/.test(sq.label)&&sq.played.join()==="1,2,3"&&sq.order&&/Thử tiếp các môn còn lại/.test(sq.resume)&&sq.resumeKind,'5c one run walks kind after kind; «Dừng ở đây» keeps progress; resume starts at the next kind not done',sq);
 /* 5b every kind's real board starts from the test (1.2 s each), no errors */
 const e0=errs.length;const sm=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const bad=[];for(const k of mgCalKinds()){try{mgCalRun(k);await sleep(120);
   const g=document.getElementById("kg82go");if(!g){bad.push(k+":nogo");continue}g.click();await sleep(1200);if(!KG82.run&&KG82.phase!=="result")bad.push(k+":norun");kg82Close()}catch(e){bad.push(k+":"+e.message)}}return bad});
 ok(!sm.length&&errs.length===e0,'5b every kind starts its real board from the test, no errors',{bad:sm,errs:errs.slice(e0,e0+5)});
 ok(!errs.length,'6 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
