/* palace-life (GAP IT05 + KP03): real stolen pieces + children living rules. Rule checks on the built game + 2 shots per viewport.
   usage: node dev/test/palace-life.js <url> <W>x<H>@dpr <outdir> <tag>     (exit 1 on a failed check or a page error) */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.waitForTimeout(2500);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80,animations:'disabled'})};
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 const C=[];const ck=(n,ok,v)=>C.push({n,ok:!!ok,v});
 /* ---------- IT05: the bought maid ---------- */
 const it=await p.evaluate(()=>{Q.length=0;const o={};
  const val=k=>{try{return loPrice({k})}catch(e){return 0}};const keys=Object.keys(IT).filter(k=>{const e={k};return loOk(e)}).sort((a,b)=>val(b)-val(a));o.key=keys[0];
  S.inv=(S.inv||[]).filter(e=>!loOk(e));S.inv.push({k:o.key});const n0=S.inv.length;const bac0=S.bac;
  const a=rivals.find(v=>v.alive&&!v.out);a.bac=999;S.maid.loyal=0;S.maid.src=null;S.schemes=0;
  S.maid.tal=null;const R0=Math.random,N0=npcWhy;npcWhy=function(k,c,d){return k==='maidSell'?{who:c&&c.m}:N0.apply(this,arguments)};Math.random=()=>0.001;let ev="";try{ev=maidMonthP(S)}finally{Math.random=R0;npcWhy=N0}
  const c=(S.lost||[]).slice(-1)[0];o.ev=ev.replace(/<[^>]+>/g,"");o.moved=!S.inv.some(e=>e.k===o.key&&!e.lo);o.inBuyer=!!(c&&loP(c.at)&&loP(c.at).inv.some(e=>e.lo===c.id));
  o.case=c?{st:c.st,cause:c.cause,keep:c.keep,at:c.at,by:c.by,kn:c.kn}:null;o.bac=S.bac-bac0;o.acts=c?loActs(c).map(h=>h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").slice(0,40)):[];
  /* no piece worth taking → silver, and the text says silver */
  S.inv=S.inv.filter(e=>!loOk(e));S.maid.loyal=0;S.lost=[];S.loCd=0;const b1=S.bac=200;npcWhy=function(k,c,d){return k==='maidSell'?{who:c&&c.m}:N0.apply(this,arguments)};Math.random=()=>0.001;let ev2="";try{ev2=maidMonthP(S)}finally{Math.random=R0;npcWhy=N0}
  o.ev2=ev2.replace(/<[^>]+>/g,"");o.bac2=S.bac-b1;o.cap=BAL.eff.j8.maidStealBac;return o});
 ck('IT05 piece left her chest',it.moved,it.key);ck('IT05 piece sits in the buyer chest (held case)',it.inBuyer&&it.case&&it.case.keep===1,it.case);
 ck('IT05 case known to her (found, Đòi lại open)',it.case&&it.case.st==='found'&&it.acts.some(x=>/Đòi lại/.test(x)),it.acts);
 ck('IT05 text names the piece, no silver line',!/Bạc -/.test(it.ev)&&/lấy trộm/.test(it.ev),it.ev);ck('IT05 no silver moved',it.bac===0,it.bac);
 ck('IT05 empty chest → silver, text says silver',/lấy trộm bạc/.test(it.ev2)&&it.bac2===-it.cap&&new RegExp('Bạc -'+it.cap).test(it.ev2),[it.ev2,it.bac2]);
 /* ---------- IT05 group: lostItem / hairpinThief bind a real piece ---------- */
 const ev=await p.evaluate(()=>{Q.length=0;const o={};S.lost=[];const key=Object.keys(IT).find(k=>loOk({k}));S.inv.push({k:key});o.nm=loNm(key);
  const s=E68I.lostItem;S.suc=30;const pp=s.pp();o.pp=!!pp;if(!pp)return o;const d=PEND["e68lostItem"](pp);o.built=!!d;o.textNames=d&&d.t.indexOf(o.nm)>=0;o.gone=!S.inv.some(e=>e.k===key&&!e.lo);
  const c=loGet(pp.lc);o.case=c&&c.st;const opt=d.o[0];const R0=roll;roll=()=>true;try{opt.go()}finally{roll=R0}o.back=S.inv.some(e=>e.k===key);o.caseAfter=c&&c.st;
  /* no piece → no event */S.inv=S.inv.filter(e=>!loOk(e));o.ppEmpty=!!s.pp();o.ppThief=!!E68I.hairpinThief.pp();
  /* hairpin thief: give up road leaves the case open */S.inv.push({k:key});S.staff=S.staff||[];const tp=E68I.hairpinThief.pp();o.tp=!!tp;
  if(tp){const d2=PEND["e68hairpinThief"](tp);o.t2=d2&&d2.t.indexOf(o.nm)>=0;const c2=loGet(tp.lc);o.c2=c2&&{st:c2.st,cause:c2.cause,sv:c2.sv}}
  return o});
 ck('lostItem binds a real piece (text + chest)',ev.built&&ev.textNames&&ev.gone&&ev.case==='lost',ev);ck('found → back in her chest, case closed',ev.back&&ev.caseAfter==='done',ev);
 ck('no piece worth taking → the events do not come',!ev.ppEmpty&&!ev.ppThief,ev);
 if(ev.tp)ck('hairpinThief: real piece, servant named on the case',ev.t2&&ev.c2&&ev.c2.cause==='srv'&&!!ev.c2.sv,ev.c2);
 /* ---------- KP03 ---------- */
 const kp=await p.evaluate(()=>{Q.length=0;const o={},B=BAL.kid;S.rank=4;S.out=0;S.confined=0;S.kids=[];const a=mkKid('m',8),g=mkKid('f',4);S.kids.push(a,g);
  a.hM=60;g.hM=60;S.turn=(S.turn|0)+1;let ev=kidLifeMonth();o.estr=a.hM-60;o.girl=g.hM-60;o.ev=ev.replace(/<[^>]+>/g,"");
  /* call home */S.turn++;S.buoi=1;used=0;const t0=a.tal;const why=kmCallWhy(a);kmCall(a);o.callWhy=why;o.call=a.hM-(60+B.estr);o.tal=a.tal-t0;o.atHome=plxKidPlace(a)===null;
  o.btns=[...new DOMParser().parseFromString(kidCard(a),'text/html').querySelectorAll('.pcb')].filter(x=>x.querySelector('[data-go="home"]')).flatMap(x=>[...x.children]).map(h=>h.textContent.replace(/<[^>]+>/g," ").replace(/\s+/g," ").slice(0,30));o.card=/Mẫu tử/.test(kidCard(a));
  S.turn++;ev=kidLifeMonth();/* r1: the real month runs S.turn++ first */o.noEstrAfterCall=a.hM-(60+B.estr+B.call);
  /* visit A ca sở */S.turn++;S.buoi=1;used=0;S.place='home';const h0=a.hM;try{accGrant&&accGrant(S,'acs')}catch(e){}goTo('acs');o.place=S.place;o.visit=a.hM-h0;
  /* Thái tử prestige: her son, then an NPC son */S.heir=null;allKids().forEach(([x])=>x.heir=false);const d0=S.danh;setHeir(a,null);o.heir=S.danh-d0;
  const v=rivals.find(x=>x.alive&&!x.out&&!x.queen);v.kids=v.kids||[];const s2=mkKid('m',9);v.kids.push(s2);const d1=S.danh,vd=v.danh||0;setHeir(s2,v);o.lost=S.danh-d1;o.npc=(v.danh||0)-vd;
  /* orphan → the Hoàng hậu: her */const w=rivals.find(x=>x.alive&&!x.out&&!x.queen&&x!==v);w.kids=w.kids||[];const orf=mkKid('m',3);w.kids.push(orf);w.alive=false;
  S.rank=7;const q=rivals[0];const qq=q.queen;q.queen=false;const d2=S.danh;o.wardHome=kidWardHome(orf,w);S.turn++;ev=kidLifeMonth();o.ward=S.danh-d2;o.wardEv=ev.replace(/<[^>]+>/g,"");
  o.tab=/Con nuôi/.test(kidTabHTML("x"));q.queen=qq;S.rank=4;o.wardHome2=kidWardHome(orf,w);w.alive=true;o.back=kidWardHome(orf,w);return o});
 const B=await p.evaluate(()=>BAL.kid);
 ck('KP03 estrangement for a prince away',kp.estr===B.estr&&/xa cách/.test(kp.ev),kp);ck('KP03 a little princess at home: none',kp.girl===0,kp.girl);
 ck('KP03 Cho gọi con về: Mẫu tử + / Tài − / at her palace this buổi',kp.callWhy===''&&kp.call===B.call&&kp.tal===-B.callTal&&kp.atHome,kp);
 ck('KP03 no estrangement in a month she saw him',kp.noEstrAfterCall===0,kp.noEstrAfterCall);ck('KP03 act cards in the Thăm con group',kp.btns.some(x=>/Cho gọi con về/.test(x))&&kp.btns.some(x=>/thăm con/.test(x)),kp.btns);
 ck('KP03 Mẫu tử bar on a son card',kp.card,0);ck('KP03 visit at A ca sở',kp.place==='acs'&&kp.visit===B.visit,[kp.place,kp.visit]);
 ck('KP03 Thái tử: her Danh + (BAL)',kp.heir===B.heirDanh,kp.heir);ck('KP03 her son put aside: Danh − ; NPC mother +',kp.lost===-B.heirDanh&&kp.npc===B.heirDanh,[kp.lost,kp.npc]);
 ck('KP03 orphan → her palace when she is Hoàng hậu, Danh +',kp.wardHome==='home'&&kp.ward===B.ward.danh*(kp.wardEv.match(/giao về cung ngươi/g)||[]).length&&kp.ward>0&&kp.tab,{h:kp.wardHome,d:kp.ward,ev:kp.wardEv,tab:kp.tab});ck('KP03 no Hoàng hậu → Thái hậu; mother back → none',(kp.wardHome2==='kn'||kp.wardHome2==='tn')&&kp.back===null,[kp.wardHome2,kp.back]);
 /* save round-trip */
 const sv=await p.evaluate(()=>{try{save();return JSON.stringify(S).length}catch(e){return String(e)}});ck('save',typeof sv==='number',sv);
 /* shots: her children tab (a son away: Mẫu tử bar + «Cho gọi con về» / «Sang A ca sở thăm con»; «Con nuôi»), and the Đồ thất lạc case of a bought maid */
 const clean=async()=>{for(let i=0;i<6;i++){await p.evaluate(()=>{Q.length=0;for(const b of document.querySelectorAll('button'))if(/^(Đã hiểu|Khâm thử|Tiếp theo|Nhận)$/.test(b.textContent.trim())&&b.offsetParent)try{b.click()}catch(e){}
   for(const el of document.querySelectorAll('body *'))if(el.textContent&&/Khâm thử/.test(el.textContent)&&getComputedStyle(el).position==='fixed')el.remove();const m=document.getElementById('modal');if(m)m.hidden=true});await p.waitForTimeout(300)}};
 await p.evaluate(()=>{S.rank=4;S.turn++;S.place='home';S.buoi=1;used=0;tab='kid';render()});await clean();
 await p.evaluate(()=>{const t=[...document.querySelectorAll('#panel .pct')].find(x=>/Thăm con/.test(x.textContent));if(t)t.click()});await p.waitForTimeout(400);await p.evaluate(()=>{const b=document.querySelector('#panel [data-kl]');if(b)b.scrollIntoView({block:'center'})});await clean();await shot('1-kid');
 await p.evaluate(()=>{const h=[...document.querySelectorAll('#panel .ph span')].find(x=>/Con nuôi/.test(x.textContent));if(h)h.scrollIntoView({block:'start'})});await shot('1b-ward');
 await p.evaluate(()=>{Q.length=0;const key=Object.keys(IT).find(k=>loOk({k}));S.inv.push({k:key});S.loCd=0;const a=rivals.find(v=>v.alive&&!v.out);maidTheft(S,a,S.maid);tab='inv';render();
  const t=[...document.querySelectorAll('#panel button')].find(b=>b.textContent.trim()==='Việc');if(t)t.click()});await clean();
 await p.evaluate(()=>{const x=[...document.querySelectorAll('#panel *')].find(e=>/Đồ thất lạc/.test(e.textContent)&&e.children.length<3);if(x)x.scrollIntoView({block:'start'})});await shot('2-lost');
 const ox=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);ck('no horizontal overflow',!ox,ox);ck('no page errors',!errs.length,errs.slice(0,3));
 const bad=C.filter(c=>!c.ok);for(const c of C)console.log((c.ok?'ok   ':'FAIL ')+c.n+(c.ok?'':' :: '+JSON.stringify(c.v).slice(0,400)));
 console.log(`palace-life ${TAG} ${W}x${H}: ${C.length-bad.length}/${C.length} ok`);await b.close();process.exit(bad.length?1:0)})();
