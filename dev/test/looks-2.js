/* review/looks-2: NEW LOOKS checks + LAYER LAW family scan (owner OD tail '(17/11 ~16:20Z real' (g)).
   usage: node dev/test/looks-2.js <page url> [--scan-only]   → JSON {scan:[{place,mark,mk,below}], checks:{...}, errs}
   Layer scan: her with makeup on (toilAuto) × every face mark (old: ill, doc, rash, slap, scar; new: pox, smudge, ink) one at a time and all together
   × every face place (tall portrait, small avatar, stage figure, mirror zoom). mk = makeup layer still present, below = every makeup tag sits
   before (under) every mark tag. Picture slots of the new marks are forced on (LOOKS_ART) only inside this test, to see their order. */
const {chromium}=require('playwright');const URL=process.argv[2];const SCAN_ONLY=process.argv.includes('--scan-only');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit&&window.KIT_VEIL&&KIT_VEIL.fit,null,{timeout:30000}).catch(()=>{});
 const out=await p.evaluate(async(SCAN_ONLY)=>{Q.length=0;document.getElementById('modal').hidden=true;
  const NEW=typeof lkSmudge==='function';if(NEW)for(const f of ['fx-smu-1.png','fx-smu-2.png','fx-smu-3.png','fx-muc-1.png','fx-pox-thuydau-2.png','fx-pox-daumua-2.png'])LOOKS_ART[f]=1;
  try{toilAuto()}catch(e){}const T=S.toilette;
  /* use a picture of hers that has every fit table (veil / scar / toil), so each mark can draw: same face, its portrait and its figure */
  const VF=KIT_VEIL.fit||{},SF=(KIT_SCAR&&KIT_SCAR.fit)||{},TF=TOIL_FIT.fit||{};
  const por=Object.keys(VF).find(k=>/^por-/.test(k)&&SF[k]&&TF[k]&&VF[k.replace(/^por-/,'fig-')]&&TF[k.replace(/^por-/,'fig-')]&&SF[k.replace(/^por-/,'fig-')]);const fig=por&&por.replace(/^por-/,'fig-');
  const kf0=kitFace,kg0=kitFigOf;kitFace=function(q){const f=kf0.apply(this,arguments);if(q===S&&por&&f&&f.src){const g=Object.assign({},f,{src:String(f.src).replace(/[^/]*$/,por)});if(f.__kp)g.__kp=f.__kp;return g}return f};
  kitFigOf=function(q){const s=kg0.apply(this,arguments);return q===S&&fig?String(s).replace(/[^/?]*(\?.*)?$/,fig):s};
  const KP=(q,s)=>{const f=kitFace(q);return s==='lg'?pframe(f):mdH(f,s||'')};
  const fileOf=h=>kitFile((/class="kpor" src="([^"]*)"/.exec(h)||/src="([^"]*por-[^"]*)"/.exec(h)||[])[1]||'');
  const places={portrait:()=>KP(S,'lg'),avatar:()=>KP(S,'sm'),stage:()=>{try{return kitStageFig(S)}catch(e){return''}},mirror:()=>{try{const f=fileOf(KP(S,'lg'));return kitFaceZoom(S,f)}catch(e){return''}}};
  const MARK=/class="(kff [^"]*|krash|kslap[^"]*|kswell|kscar|kpox|ksmu|kink)"/g;
  const marks={ill:()=>{S.ill={k:'phonghan',st:2,known:true}},doc:()=>{S.pz={sev:2,until:wk()+5,dx:1,nt:1,at:wk()}},rash:()=>{S.rash={sev:2,until:wk()+3,at:wk()}},
   slap:()=>{S.slap={sev:2,until:wk()+2,at:wk()}},scar:()=>{try{scarGive(S,1,null,'test')}catch(e){}}};
  if(NEW)Object.assign(marks,{pox:()=>{S.ill={k:'thuydau',st:2,known:true}},smudge:()=>{lkSmudge(S,2,'mua')},ink:()=>{lkInk(S)}});
  const clear=()=>{S.ill=null;S.pz=null;S.rash=null;S.slap=null;S.scar=null;S.sc70=null;S.toilette=T;if(T)delete T.lk;S.lk=null;S.stain=null};
  const row=(place,mark)=>{const h=places[place]();const mk=[...h.matchAll(/class="kmkl/g)].map(m=>m.index);const mm=[...h.matchAll(MARK)].map(m=>m.index);
   return{place,mark,mk:mk.length>0,marks:mm.length,below:mk.length>0&&mm.every(i=>i>Math.max(...mk))}};
  const scan=[];for(const pl in places){for(const m in marks){clear();marks[m]();scan.push(row(pl,m))}clear();for(const m in marks)marks[m]();scan.push(row(pl,'ALL'));clear()}
  if(SCAN_ONLY||!NEW)return{scan,por,fig,toilette:!!(T&&T.makeup),T:JSON.stringify(T).slice(0,200)};
  /* ---- logic checks (part 2: catalog, 3 levels, every weather kind, minigame acts, pox scar) ---- */
  const C={};const v=rivals.find(x=>x.alive!==false);const sacOf=(id,lv)=>Math.round(BAL.looks.cat[id].sac*lv);
  C.thuydau=!!ILL.thuydau&&ILL.thuydau.die===0&&ILL.thuydau.cont===1;
  clear();const sac0=effSac(S);lkSmudge(S,3,'mua');C.smu3=lkSmuOf(S).lv===3&&sac0-effSac(S)===sacOf('smu',3);C.smuChip=/Phấn son lem nhem nặng/.test(pcard({name:S.name,f:kitFace(S)})||'');
  S.toilette=Object.assign({},T);delete S.toilette.lk;C.redoClears=!lkSmuOf(S);clear();
  S.toilette=Object.assign({},T,{makeup:false});C.noMakeupNoSmu=lkSmudge(S,1,'mua')===''&&!lkSmuOf(S);clear();
  C.empNoSmu=lkSmudge(S.emp,1,'mua')==='';C.empStain=!!lkStain(S.emp,'uot');S.emp.stain=null;
  const wx0=S.wx,inv0=S.inv,maid0=S.maid,st0=S.staff,cw0=window.currentWeather;window.currentWeather=undefined;S.inv=(S.inv||[]).filter(e=>!(itm(e.k)||{}).wxg);S.maid=null;S.staff=[];
  const kie0=window.wxKieuOk;wxKieuOk=()=>false;
  const trial=(wx,n,f)=>{let h=0;for(let i=0;i<n;i++){clear();S.wx=wx;lkOutdoor(S,{});if(f())h++}return h};
  C.stormAll=trial({n:'giông tố',k:'storm',f:3},20,()=>lkSmuOf(S)&&lkSmuOf(S).lv===3&&lkItem(S,'uot')&&lkItem(S,'uot').lv===3)===20;
  C.rainAlways=trial({n:'mưa phùn',k:'rain',f:1},20,()=>!!lkSmuOf(S))===20;
  C.windHair=trial({n:'gió heo may',k:'wind',f:0},200,()=>!!lkItem(S,'toc'));C.snowCold=trial({n:'tuyết nhẹ',k:'snow',f:1},200,()=>!!lkItem(S,'lanh'));
  C.petal=trial({n:'hoa đào bay',k:'petal',f:0},200,()=>!!lkItem(S,'vuong'));C.heatSweat=trial({n:'nắng gắt',k:'sun',f:2},200,()=>!!lkItem(S,'moho'));C.calmNone=trial({n:'trăng rằm',k:'dust',f:0},50,()=>lkItems(S,['smu','toc','uot','vuong','moho','lanh']).length>0)===0;
  S.inv=(S.inv||[]).concat([{k:'du'}]);C.umbrellaRain=trial({n:'mưa phùn',k:'rain',f:1},200,()=>!!lkSmuOf(S));C.umbrellaWindUseless=trial({n:'gió heo may',k:'wind',f:0},200,()=>!!lkItem(S,'toc'));
  wxKieuOk=kie0;window.currentWeather=cw0;S.inv=inv0;S.wx=wx0;S.maid=maid0;S.staff=st0;clear();
  lkStain(S,'uot');S.stain.it.uot.at-=BAL.looks.cat.uot.t[1];C.wetDries=!lkStainOf(S);S.stain=null;
  lkStain(S,'tra');try{wdApply(S,null)}catch(e){}C.outfitClears=!lkStainOf(S);S.stain=null;
  if(v){lkInk(v);C.npcInk=!!lkInkOf(v);v.lk.w=wk()-1;C.npcInkGone=!lkInkOf(v);v.lk=null}
  C.acts=['nuoc','tea','ink'].every(k=>ACT[k]&&RVGRP.find(x=>x[0]==='Hại nhỏ')[1].includes(k))&&!ACT.tea.ok(v,S.emp);
  if(v){let r='';for(let i=0;i<10&&!lkStainOf(S);i++){r=ACT.tea.f(v,S)}C.teaHits=!!lkStainOf(S)&&!!lkSmuOf(S);S.stain=null;clear();ACT.ink.f(S,v);C.inkOnNpc=!!lkInkOf(v);v.lk=null}
  if(v){let n=0;for(let i=0;i<100;i++){v.lk=null;lkCry(v);if(lkSmuOf(v))n++}C.cryOdds=n;v.lk=null}
  S.scar=null;const t=lkPoxScar(S,3);C.poxScar=!!t&&S.scar&&S.scar.how==='daumua'&&S.scar.sev===BAL.looks.pox.scar[3]&&kitScarOf(S)===null&&ILL.daumua.scar===0;S.scar=null;
  const o=JSON.parse(JSON.stringify(rivals[0]));delete o.lk;delete o.stain;C.oldSave=lkSmuOf(o)===null&&lkStainOf(o)===null&&lkInkOf(o)===null;
  const old=JSON.parse(JSON.stringify(rivals[0]));old.stain={k:'tra',w:wk(),at:0};old.lk={w:wk(),smu:{sev:2}};C.part1Save=lkStainOf(old)===null&&lkSmuOf(old)===null;
  C.emoGone=typeof looksEmoFace==='undefined';
  {const c=typeof currentWeather==='function'?currentWeather():null,w=lkWxNow();C.cagApi=typeof currentWeather==='function'&&(!c||!c.k||(w&&w.k===c.k));}
  kitFace=kf0;kitFigOf=kg0;return{scan,por,fig,checks:C}},SCAN_ONLY);
 console.log(JSON.stringify(Object.assign(out,{errs})));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
