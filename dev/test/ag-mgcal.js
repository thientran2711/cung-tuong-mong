/* AG-ALL-2d2 — OWNER-ONLY MINIGAME CALIBRATION (owner OD 17/11 ~16:20Z (f) + ~16:40Z option 1). node dev/test/ag-mgcal.js [dev/index.html]
   1 owner flag only: no flag → no «Thử tay tài nghệ» row in Thiết lập; flag (?hieuchuan=1 / localStorage ctm-owner-cal) → one kit .kctl row
   2 mgCalBase: her rounds brought back to a matching board (raw − (mgMedD(d) − mgMedD(0))), mean, 0..10
   3 bands: no calibration → BAL default band (2d hands unchanged, old saves roll the same); a calibrated kind → hi = b + w/2 + up, lo = b + w/2 − dn;
     hands re-roll inside the new band from the SAME draw (order of people kept)
   4 fairness with her base b: strong NPC hands rare (≤ 10 % of NPC plays reach her b on a matching board), the middle NPC plays clearly below her (≥ 1.5),
     the clumsiest hands about dn below her; never above 10
   5 the test itself (kit game frame): 5 rounds easy → hard (Dễ … Khó words), result rows, record + «CTM-CAL» code on her device; her device does NOT
     change the shared band (one core: only BAL.ag.mg2.cal.k does)
   6 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  const o={};const C=BAL.ag.mg2.cal,H=BAL.ag.mg2.hand;
  o.row0=/Thử tay tài nghệ/.test(optHTML());localStorage.setItem("ctm-owner-cal","1");const h1=optHTML();o.row1=(h1.match(/Thử tay tài nghệ/g)||[]).length;o.kctl=/class="kctl"[^]*data-mgcal-open/.test(h1);
  localStorage.removeItem("ctm-owner-cal");
  /* 2 */
  const ds=[-2,-1,0,1,2],raws=[9,8,7,6,5];let s=0;ds.forEach((d,i)=>s+=raws[i]-(mgMedD(d)-mgMedD(0)));o.base=mgCalBase(raws,ds);o.baseX=Math.round(s/5*10)/10;o.baseClamp=mgCalBase([10,10,10,10,10],[2,2,2,2,2]);
  /* 3 */
  const L=liveRivals(true).filter(v=>v.alive);o.def=mgCalBand("dan");const before=L.map(v=>mgHand("dan",v));
  const v=L[0];const keep=v.mgH,keepV=v.mgHv;delete v.mgH;delete v.mgHv;o.oldSave=mgHand("dan",v)===before[0];v.mgH=keep;v.mgHv=keepV;
  C.k.dan={b:7,n:5,at:"11/17/2026"};const Bd=mgCalBand("dan");o.band=Bd;o.bandX={hi:Math.min(C.max,7+H.w/2+C.up),lo:Math.max(C.min,7+H.w/2-C.dn)};
  const after=L.map(v=>mgHand("dan",v));o.inBand=after.every(h=>h>=Bd.lo-1e-9&&h<=Bd.hi+1e-9);
  const ord=a=>a.map((h,i)=>[h,i]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]).join(",");o.order=ord(before)===ord(after);o.otherKind=mgCalBand("co").sig===o.def.sig;
  /* 4 */
  const plays=[];for(let i=0;i<600;i++){const q={name:"T"+i,id:9000+i};for(let j=0;j<3;j++)plays.push(mgNpcRaw("dan",q,{d:0}))}plays.sort((a,b)=>a-b);
  o.reach=plays.filter(x=>x>=7).length/plays.length;o.med=plays[plays.length>>1];o.max=plays[plays.length-1];
  const lows=[];for(let i=0;i<600;i++)lows.push(mgHand("dan",{name:"T"+i,id:9000+i}));lows.sort((a,b)=>a-b);o.loPlay=lows[0]-H.w/2;
  delete C.k.dan;o.back=mgCalBand("dan").sig===o.def.sig&&mgHand("dan",v)===before[0];
  return o});
 console.log(JSON.stringify(r));
 ok(!r.row0&&r.row1===1&&r.kctl,'1 owner flag only: no row without it; one kit .kctl row with it',{row0:r.row0,row1:r.row1,kctl:r.kctl});
 ok(r.base===r.baseX&&r.baseClamp===10,'2 her base = mean of rounds brought back to a matching board, clamped',{base:r.base,want:r.baseX,clamp:r.baseClamp});
 ok(r.def.lo===3&&r.def.hi===9.5&&r.oldSave,'3 no calibration → BAL default band; an old save rolls the same hand',{def:r.def,old:r.oldSave});
 ok(Math.abs(r.band.hi-r.bandX.hi)<.01&&Math.abs(r.band.lo-r.bandX.lo)<.01&&r.inBand&&r.order&&r.otherKind&&r.back,'3 calibrated kind → her band; hands re-roll in it from the same draw; other kinds untouched; removing it restores',{band:r.band,want:r.bandX,inBand:r.inBand,order:r.order,other:r.otherKind,back:r.back});
 ok(r.reach<=.1&&r.med<=7-1.5&&r.max<=10&&r.loPlay<=7-3,'4 fair to her (b 7): strong NPC plays rare, the middle NPC clearly below her, clumsy hands far below',{reach:r.reach,med:r.med,max:r.max,loPlay:r.loPlay});
 /* 5 the test UI */
 const u=await p.evaluate(async()=>{const o={tiers:[]};const sleep=t=>new Promise(r=>setTimeout(r,t));const k0=kg82Play;let n=0;
  window.kg82Play=function(kind,onEnd){n++;setTimeout(()=>onEnd(10-n),10)};try{kg82Play=window.kg82Play}catch(e){}
  mgCalOpen();await sleep(200);const box=()=>document.getElementById("kg82");o.frame=!!box()&&!box().hidden;o.kinds=mgCalKinds();
  o.btns=document.querySelectorAll("[data-mgcal-k]").length;document.querySelector('[data-mgcal-k="dan"]').click();
  for(let i=0;i<5;i++){await sleep(150);o.tiers.push(KG82.tier&&KG82.tier.word);const g=document.getElementById("kg82go");if(!g){o.noGo=i;break}g.click();await sleep(150);document.getElementById("kg82ok").click()}
  await sleep(200);const txt=(document.getElementById("kg82")||{}).textContent||"";o.res=/Mức tay của người/.test(txt);o.code=/CTM-CAL dan:/.test(txt);
  const R=JSON.parse(localStorage.getItem("ctm-mgcal")||"{}");o.rec=R.dan&&R.dan.raws;o.b=R.dan&&R.dan.b;o.shared=mgCalBand("dan").sig===BAL.ag.mg2.hand.lo+"/"+BAL.ag.mg2.hand.hi;
  o.pct=/%/.test(txt);document.getElementById("kg82ok").click();await sleep(150);o.back=document.querySelectorAll("[data-mgcal-k]").length;kg82Close();try{kg82Play=k0}catch(e){}return o});
 console.log(JSON.stringify(u));
 ok(u.frame&&u.btns===u.kinds.length&&u.kinds.length>=10,'5 the kit game frame opens with one button per mini-game kind',{btns:u.btns,kinds:u.kinds.length});
 ok(u.tiers.length===5&&u.tiers[0]==="Dễ"&&u.tiers[4]==="Khó","5 five rounds, easy → hard",u.tiers);
 ok(u.res&&u.code&&u.rec&&u.rec.join()==="9,8,7,6,5"&&u.b!=null&&!u.pct,'5 result rows + «CTM-CAL» code; record kept on her device; no %',{rec:u.rec,b:u.b});
 ok(u.shared,'5 her device does not change the shared band (one core: only BAL.ag.mg2.cal.k)',u.shared);
 ok(u.back===u.btns,'5 «Thử môn khác» returns to the kind list',u.back);
 /* 5b every kind's real board starts from the test (1.2 s each), no errors */
 const e0=errs.length;const sm=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const bad=[];for(const k of mgCalKinds()){try{mgCalRun(k);await sleep(120);
   const g=document.getElementById("kg82go");if(!g){bad.push(k+":nogo");continue}g.click();await sleep(1200);if(!KG82.run&&KG82.phase!=="result")bad.push(k+":norun");kg82Close()}catch(e){bad.push(k+":"+e.message)}}return bad});
 ok(!sm.length&&errs.length===e0,'5b every kind starts its real board from the test, no errors',{bad:sm,errs:errs.slice(e0,e0+5)});
 ok(!errs.length,'6 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
