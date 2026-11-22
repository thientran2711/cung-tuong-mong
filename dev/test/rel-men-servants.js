/* review/rel-men-servants (KP22): men and servants hold the SAME two bars (Thiện cảm, Oán) as everyone else (j9 one model), both ways,
   from real deeds only; Giao tình › Ân oán shows them in the groups Nam nhân / Cung nhân (jhc relGrp + GR, kit §49.2 / §52 kitRel2).
   usage: node dev/test/rel-men-servants.js <build url> [outdir for shots] [WxH@dpr,...]
   Checks (each PASS/FAIL):
    D1 greeting a man (j22 manHail, the real option) → his regard for her AND hers for him (two-way), an NPC consort's greeting too
    D2 reporting a man (jmen menReport) → his oán toward the reporter (her / an NPC consort: the same rule)
    D3 punishing a servant without cause (j24 judgeServ) → her oán toward her mistress; bribe taken (j29 bribeServ, forced roll) → regard toward the giver
    D4 servant ↔ servant (jagstaff chat) and servant → consort keys never collide (sid vs consort id)
    D5 the oán fade (j28 oanMonth) reaches men and servants (BAL.oanFade)
    D6 old save: m.grudge / s.grudge recorded, no oán number → normAll fills it from BAL.relMS (once)
    U1 Ân oán sub-tabs list Nam nhân + Cung nhân with people; X = a man → rows both ways with the numbers of D1/D2
    U2 X = a servant of hers → Thiện cảm / Oán / Lòng toward Ta
    U3 the man card (Hậu cung › Nam nhân) prints the same numbers as Ân oán (one model, law 11)
    C1 co-op: his oán toward her is hers (MEN_P), like af
    F5 (r6) an NPC consort's servant → its mistress = s.loyal (one store for every master), aff reads / affAdd writes it
    N6 (r6) servant card bars name who → whom: hers «Thiện cảm · Ta tin cậy», another master's «Thiện cảm với <chủ> · <chủ> tin cậy»
    E  no page errors */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;if(OUT)fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let fail=0;const res=[];const ok=(id,c,d)=>{res.push(`${c?"PASS":"FAIL"} ${id}${d?" · "+d:""}`);if(!c)fail++};
 const sizes=(SIZES||"755x1000@2,1180x820@2").split(",");let first=true;
 for(const sz of sizes){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,#kboot{display:none!important}'});
  const r=await p.evaluate(()=>{document.querySelectorAll('#kload,.kload,#klife').forEach(e=>e.remove());try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
   menInit();while((S.staff||[]).length<2){S.staff=S.staff||[];S.staff.push(mkServ(S.staff.length?"eunuch":"maid"))}const O={};const L=liveRivals(true);const v=L.find(x=>!x.queen)||L[0];const m=S.men[0],m2=S.men[1];
   S.menMet=S.menMet||{};S.menMet[m.id]=1;S.menMet[m2.id]=1;try{if(S.known){S.known[kOf61(m)]=3;S.known[kOf61(m2)]=3}}catch(e){}
   const run=(A,id)=>{const a=A.find(x=>x.id4===id);if(a)a.go();return !!a};
   /* D1 */const a0=aff(m,S),b0=aff(S,m);O.hail=run(manCards(S,m,"vuon"),"manHail");O.d1=[aff(m,S)-a0,aff(S,m)-b0];
   const c0=aff(m2,v),c1=aff(v,m2);run(manCards(v,m2,"vuon"),"manHail");O.d1v=[aff(m2,v)-c0,aff(v,m2)-c1];
   /* D2 */const y={k:"vuon",r:"stray"};menReport(S,m,null,y,0);O.d2=oan(m,S);menReport(v,m2,null,y,0);O.d2v=oan(m2,v);
   /* D3 */const s=S.staff[0];s.cause=null;judgeServ(s,"phat");O.d3=oan(s,S);
   const w=L.find(x=>x!==v&&(x.staff||[]).length)||L.find(x=>x!==v)||v;if(!(w.staff||[]).length){w.staff=w.staff||[];w.staff.push(mkServ("maid"))}const mr=Math.random;Math.random=()=>0.001;O.d3b=0;try{for(const x of L.flatMap(y=>y.staff||[]).filter(y=>y.spyFor==null).slice(0,12)){S.bac=999;x.loyal=0;const b1=aff(x,S);O.bribe=bribeServ(S,x);if(x.spyFor==="me"){O.d3b=aff(x,S)-b1;break}}}finally{Math.random=mr}
   /* D4 */const sA=mkServ("eunuch");S.staff.push(sA);affAdd(sA,v,7);const wrote=JSON.stringify(sA.af);O.d4=[aff(sA,v),sA.af["r"+v.id],sA.af[v.id]===undefined||String(v.id)===String((servById(v.id)||{}).sid)?"ok":"collide"];
   oanAdd(S,sA,9);oanAdd(v,m,11);O.d4b=[oan(S,sA),S.ro["s"+sA.sid],oan(v,m),v.ro[m.id]];
   /* D5 */const sx=relMSAll().includes(s)?s:sA;if(!oan(sx,S))oanAdd(sx,S,20);const before=[oan(m,S),oan(sx,S)];oanMonth();O.d5=[before,[oan(m,S),oan(sx,S)],BAL.oanFade];
   /* C1 */O.c1=typeof COOPW!=="undefined"?null:null;
   /* expose for UI */window.__rms={m:m.id,v:v.id,s:s.sid,mAff:[Math.round(aff(m,S)),Math.round(aff(S,m))],mOan:[Math.round(oan(m,S)),Math.round(oan(S,m))],sOan:Math.round(oan(s,S)),sAff:Math.round(aff(s,S)),sLoy:s.loyal};
   O.rms=window.__rms;return O});
  if(first){
   ok("D1 her greeting: his regard + hers",r.hail&&r.d1[0]>0&&r.d1[1]>0,JSON.stringify(r.d1));
   ok("D1 consort greeting: both ways",r.d1v[0]>0&&r.d1v[1]>0,JSON.stringify(r.d1v));
   ok("D2 reported man → oán her",r.d2>0,""+r.d2);ok("D2 reported by a consort → oán her",r.d2v>0,""+r.d2v);
   ok("D3 punished without cause → oán mistress",r.d3>0,""+r.d3);ok("D3 bribe taken → regard to giver",r.d3b>0,""+r.d3b+" "+(r.bribe||"").slice(0,60));
   ok("D4 servant→consort key r<id>",r.d4[0]===r.d4[1]&&r.d4[0]!==0&&r.d4[2]==="ok",JSON.stringify(r.d4));
   ok("D4 ta/consort → man/servant keys",r.d4b[0]===9&&r.d4b[1]===9&&r.d4b[2]>0&&r.d4b[2]===r.d4b[3],JSON.stringify(r.d4b));
   ok("D5 oán fades for men + servants",r.d5[1][0]<r.d5[0][0]&&r.d5[1][1]<r.d5[0][1],JSON.stringify(r.d5));
   /* D6 old save */
   const r6=await p.evaluate(()=>{const m=S.men[2];m.grudge="me";m.grudgeN=2;delete m.oan;normAll();const s=S.staff[0]||S.maid;s.grudge=1;delete s.oan;delete S.relMSv;normAll();const a=[oan(m,S),oan(s,S)];
    m.oan=0;normAll();return a.concat([oan(m,S),BAL.relMS.grudge,BAL.relMS.srvGrudge])});
   ok("D6 old save fill from recorded grudge (once)",r6[0]>0&&r6[1]>0&&r6[2]===0,JSON.stringify(r6));
   const c1=await p.evaluate(()=>{try{return document.documentElement.outerHTML.includes('"grudgeN","debt","seen","oan"')}catch(e){return false}});
   ok("C1 co-op MEN_P carries oan",c1);
  }
  /* UI */
  const u=await p.evaluate(async()=>{const R=window.__rms;tab="rel";relSel=R.m;PG.rel=null;PG.relY=null;render();
   const P=document.getElementById('panel');const sl=document.querySelector('#panel [data-relslot="x"]');if(sl)sl.click();await new Promise(r=>setTimeout(r,700));
   const subs=[[...document.querySelectorAll('#modal .krpop .kcattabs button')].map(b=>b.textContent.trim())];try{kitModalClose()}catch(e){}
   const head=(P.querySelector('.krelh')||{}).textContent||"";const txt=(P.querySelector('.krelpair .kr3r')||{}).textContent||"";const m=S.men.find(x=>x.id===R.m);
   const exp=`→ taThiện cảm${Math.round(aff(m,S))}Oán${Math.round(oan(m,S))}`,exp2=`Thiện cảm${Math.round(aff(S,m))}Oán${Math.round(oan(S,m))}`;return{subs,head,txt,ok:txt.includes(exp)&&txt.includes(exp2)&&/Ta →/.test(txt)}});
  ok(`U1 ${wh} groups`,u.subs.length===1&&u.subs[0].some(t=>/Nam nhân/.test(t))&&u.subs[0].some(t=>/Cung nhân/.test(t)),JSON.stringify(u.subs[0]));
  ok(`U1 ${wh} man rows both ways`,u.ok,u.head+" | "+u.txt.slice(0,160));
  if(OUT){await p.evaluate(()=>{document.querySelectorAll('#kboot,.kload,#klife').forEach(e=>e.remove());document.body.classList.remove('kdlg-on');Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;render();const P=document.getElementById('panel');if(P)P.scrollTop=0});await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(2500)}if(OUT)await p.screenshot({path:`${OUT}/rms-man-${wh}.jpg`,type:'jpeg',quality:72});
  const u2=await p.evaluate(()=>{const R=window.__rms;const tg=servById(R.s)||S.staff[0]||S.maid;relSel=relKey(tg);PG.rel=null;PG.relY=null;render();const P=document.getElementById('panel');
   const q=relPerson(relSel),s=q&&q.p&&q.p!==S&&relMS(q.p)?q.p:null;const txt=(P.querySelector('.krelpair .kr3r')||{}).textContent||"";return{head:(P.querySelector('.krelh')||{}).textContent||"",txt:txt+' EXP '+(s?`→ taThiện cảm${Math.round(s.loyal)}Oán${Math.round(oan(s,S))}`:'none '+JSON.stringify([relSel,R.s,q&&q.k,q&&q.name,q&&relMS(q.p)])),ok:!!s&&txt.includes(`→ taThiện cảm${Math.round(s.loyal)}Oán${Math.round(oan(s,S))}`)}});
  const u4=await p.evaluate(()=>{const o=relMSAll().find(x=>!relMan(x)&&!relMSMet(x)&&true);if(!o)return{skip:1};tab="rel";relSel=relKey(o);PG.rel=null;PG.relY=null;render();
   const t=(document.querySelector('#panel .krelpair .kr3r')||{}).textContent||"";return{t,ok:/chưa rõ/.test(t)}});
  /* S1 whole-group scan (law 11): every met man + servant — the kit relation rows (person card pcfKey, Tuần lục j87 and the man card all read kitRelRows) = Ân oán = j9 aff/oan; loyal only under «Lòng» */
  const sc=await p.evaluate(()=>{const bad=[];let n=0,m2=0;for(const o of relMSAll().concat(S.men.filter(m=>m.alive&&relMSMet(m)))){if(!relMSMet(o))continue;n++;const R=kitRelRows(o);const f=l=>(R.find(r=>r.w===l&&r.dir==="them")||{}).now;
    const A=Math.round(aff(o,S)),O=Math.round(oan(o,S));const mst=typeof o.loyal==="number"&&!relMan(o)&&(o===S.maid||ownerOf(o)===S);if(mst&&A!==Math.round(o.loyal))bad.push(o.name+" master aff "+A+" != loyal "+o.loyal);if(f("Thiện cảm")!==A)bad.push(o.name+" kit aff "+f("Thiện cảm")+" vs "+A);if(f("Oán")!==O)bad.push(o.name+" kit oán "+f("Oán")+" vs "+O);
    if(typeof o.loyal==="number"&&f("Thiện cảm")===Math.round(o.loyal)&&A!==Math.round(o.loyal))bad.push(o.name+" loyal printed as Thiện cảm");
    tab="rel";relSel=relKey(o);PG.rel=null;PG.relY=null;render();if(relSel!==relKey(o))continue;m2++;const t=(document.querySelector('#panel .krelpair .kr3r')||{}).textContent||"";if(/Lòng/.test(t))bad.push(o.name+" Ân oán prints Lòng");if(!t.includes("→ taThiện cảm"+A+"Oán"+O))bad.push(o.name+" Ân oán row != "+A+"/"+O+" :: "+t.slice(0,80))}return{n,m2,bad}});
  ok(`S1 ${wh} scan ${sc.n} men/servants (${sc.m2} in Ân oán): kit rows = Ân oán = j9`,sc.n>0&&!sc.bad.length,sc.bad.slice(0,3).join(" | "));
  ok(`U4 ${wh} stranger servant → chưa rõ`,u4.skip||u4.ok,u4.skip?"no stranger in this start":u4.t.slice(0,120));
  /* F2: a stranger official / servant has ONE name on the whole screen ("Người lạ", the strip's label): strip, pair heading, side label, row heads; no "???", no real name; both stranger stages (0 no face, 1 face seen) */
  const f2=await p.evaluate(()=>{const c=(S.court&&(S.court.tq||Object.values(S.court).find(Boolean)))||relMSAll().find(x=>!relMan(x));const real=c.name.split(" ").slice(-1)[0],bad=[];const st0=S.known[kOf61(c)];
   for(const st of [0,1]){S.known[kOf61(c)]=st;tab="rel";relSel=relKey(c);PG.rel=null;PG.relY=null;render();const P=document.getElementById("panel");const t=P.innerText;const h=(P.querySelector(".krelh")||{}).textContent||"";
    if(/\?\?\?/.test(t))bad.push(st+": ???");if(t.includes(real))bad.push(st+": real name "+real);if(!/Người lạ/.test(h))bad.push(st+": heading "+h)}
   S.known[kOf61(c)]=st0;window.__rmsC=relKey(c);return bad});
  ok(`F2 ${wh} stranger official: one name «Người lạ», no ???`,!f2.length,f2.join(" | "));
  if(OUT){await p.evaluate(()=>{const c=window.__rmsC;S.known[kOf61(k61Ent(c))]=0;tab="rel";relSel=c;PG.rel=null;PG.relY=null;render();document.querySelectorAll('#kboot,.kload,#klife').forEach(e=>e.remove());const P=document.getElementById('panel');if(P)P.scrollTop=0});await sleep(1500);await p.screenshot({path:`${OUT}/rms-stranger-${wh}.jpg`,type:'jpeg',quality:72})}
  await p.evaluate(()=>{const t=servById(window.__rms.s)||S.staff[0]||S.maid;tab="rel";relSel=relKey(t);PG.rel=null;PG.relY=null;render()});
  ok(`U2 ${wh} servant rows: ONE Thiện cảm = loyal (OD:L352), no Lòng`,u2.ok,u2.head+" | "+u2.txt.slice(0,160));
  if(OUT){await p.evaluate(()=>{const k=document.getElementById('kboot');if(k)k.remove()});await p.evaluate(()=>Promise.all([...document.querySelectorAll('#panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(2500)}if(OUT)await p.screenshot({path:`${OUT}/rms-srv-${wh}.jpg`,type:'jpeg',quality:72});
  if(first){const u3=await p.evaluate(()=>{const R=window.__rms;const m=S.men.find(x=>x.id===R.m);const h=manCard(m);const d=document.createElement("div");d.innerHTML=h;const k=d.querySelector(".kpkey");const t=(k?k.innerText||k.textContent:"").replace(/\s+/g," ");const own=d.textContent.replace(/\s+/g," ");
    return JSON.stringify({kit:t,custom:/Hắn quý ngươi|Ngươi quý hắn|Hắn oán ngươi|Ngươi oán hắn/.test(own),loyalAsAff:false})});
   const j=JSON.parse(u3);const nums=(j.kit.match(/-?\d+/g)||[]).map(Number);
   ok("U3 man card: kit block carries the SAME numbers (aff both ways, oán), no custom lines, no second number",!j.custom&&j.kit.includes("Thiện cảm")&&nums.includes(r.rms.mAff[0])&&nums.includes(r.rms.mAff[1])&&nums.includes(r.rms.mOan[0]),u3)}
  /* r6 F5 (law 4 one core, OD:L352): a servant → ITS master is ONE store (s.loyal) for EVERY master — hers and an NPC consort's; aff reads it, affAdd writes it */
  const f5=await p.evaluate(()=>{const bad=[];let n=0;for(const o of relMSAll()){const m=typeof relOwner==="function"?relOwner(o):null;if(!m||m===S)continue;n++;
    if(Math.round(aff(o,m))!==Math.round(o.loyal))bad.push(o.name+" aff "+aff(o,m)+" != loyal "+o.loyal);const l0=o.loyal,a0=JSON.stringify(o.af||{});affAdd(o,m,3);
    if(o.loyal===l0&&l0<100)bad.push(o.name+" affAdd did not move loyal");/* +3 goes through the shared modifiers (mood, trust…), as for everyone */if(JSON.stringify(o.af||{})!==a0)bad.push(o.name+" affAdd wrote s.af");o.loyal=l0}return{n,bad}});
  ok(`F5 ${wh} ${f5.n} NPC consorts' servants: Thiện cảm with the mistress = loyal (one store)`,f5.n>0&&!f5.bad.length,f5.bad.slice(0,3).join(" | "));
  /* r6 N6 (VANPHONG l.55/l.61, law 11): every servant card's two bars say who → whom — her own: «Thiện cảm» · «Ta tin cậy»; another master's: «Thiện cảm với <chủ>» · «<chủ> tin cậy» (after the j84 fixer = on screen) */
  const n6=await p.evaluate(()=>{const bad=[];let own=0,oth=0;const lab=s=>{const d=document.createElement("div");d.innerHTML=bondBars(s);return [...d.querySelectorAll(".sbl")].map(x=>VP.fix(x.textContent))};
    const L=[S.maid].concat(S.staff||[]).concat((S.thO&&S.thO.staff)||[]);liveRivals(true).forEach(v=>{if(v.maid)L.push(v.maid);(v.staff||[]).forEach(s=>L.push(s))});
    for(const s of L){if(!s||typeof s.loyal!=="number")continue;const m=bondOwner(s),b=lab(s);if(m===S){own++;if(b[0]!=="Thiện cảm"||b[1]!=="Ta tin cậy")bad.push("own "+s.name+": "+b.join(" / "))}
     else if(m){oth++;const w=bondWho(m);if(b[0]!=="Thiện cảm với "+w||b[1]!==w+" tin cậy"||b.some(x=>/^Ta |Chủ tin/.test(x)))bad.push("other "+s.name+": "+b.join(" / "))}}
    tab="staff";render();const t=(document.getElementById("panel")||{}).innerText||"";return{own,oth,bad,screen:/cung /.test(t)}});
  ok(`N6 ${wh} servant cards say who → whom (${n6.own} hers · ${n6.oth} other masters')`,n6.own>0&&n6.oth>0&&!n6.bad.length,n6.bad.slice(0,3).join(" | "));
  ok(`E ${wh} no page errors`,!errs.length,errs.join(" | ").slice(0,300));
  first=false;await ctx.close()}
 await b.close();console.log(res.join("\n"));console.log(`rel-men-servants: ${fail?"FAIL":"PASS"} (${res.length-fail}/${res.length})`);process.exit(fail?1:0)})();
