/* review/person-acts (owner 11/15): KIT §37 — person view from the stage, court person dialogs, doable-first lists, whole portrait frame.
   usage: node dev/test/person-acts.js <page URL> <WxH@dpr> <outdir> <tag> [oldPageURL]
   Cases (each a shot <outdir>/<tag>-<W>-<case>.jpg unless SHOTS=0):
     pv     a known Quý phi tapped on the stage (#popw): rank line above the name at the top, full-body figure under it (no .pcp frame),
            "Giao tình" + "Việc làm được" kit sections, act tabs with doable counts, default tab has a doable act, doable acts first;
            the header (#hud) is not covered by the person view
     emp/th the court chips open the kit person dialog (.kesdlg.kdper: figure left, kit sections right, seal NGƯỜI), no portrait frame
     rv     Hậu cung person card: the frame opening (size + place) is the same as on the old page (±1 px) and the canvas bottom (tassel)
            is inside the box and not clipped by any ancestor
     deck   Hành sự cards: every doable card before every greyed one
   Prints JSON {cases:{…:{…,ck:[problems]}}, oldSave, errs}. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,VP,OUT,TAG,OLD]=process.argv;
const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2];fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p,url){await p.goto(url,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500)}
const START=()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render()};
const FRAME=async()=>{const b=document.querySelector('[data-tab="rv"]');if(b)b.click();else{tab="rv";render()}await new Promise(r=>setTimeout(r,2500));
 const pp=document.querySelector("#panel .pc .pcp.kit");if(!pp)return{none:1};const kin=pp.querySelector(".kin");const a=pp.getBoundingClientRect(),k=kin.getBoundingClientRect();
 let clip=null;for(let e=pp.parentElement;e&&e!==document.body;e=e.parentElement){const cs=getComputedStyle(e);if(cs.overflowY!=="visible"||cs.overflowX!=="visible"){const r=e.getBoundingClientRect();if(k.bottom>r.bottom+1){clip=e.className;break}}}
 /* opening relative to the box top-left (names differ per life, the box itself may sit lower or higher) + its size */
 return{opening:[k.top+k.height*214/1037-a.top,k.left+k.width*83/550-a.left,k.width*384/550,k.height*506/1037].map(x=>+x.toFixed(1)),canvasBottom:+k.bottom.toFixed(1),boxBottom:+a.bottom.toFixed(1),pcpOverflow:getComputedStyle(pp).overflow,clip}};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+m[3],hasTouch:true,isMobile:W<1000});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);const R={vp:VP,cases:{}};const shot=async n=>{if(process.env.SHOTS!=='0')await p.screenshot({path:`${OUT}/${TAG}-${W}-${n}.jpg`,type:'jpeg',quality:70,timeout:240000})};
 /* the old page: its frame box (reference for "same frame size") + an old save */
 let oldFrame=null;if(OLD){await boot(p,OLD);await p.evaluate(START);await sleep(1200);oldFrame=await p.evaluate(FRAME);await p.evaluate(()=>{S.month=4;save()})}
 await boot(p,URL);
 if(OLD)R.oldSave=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;deal();render();return 'ok month '+S.month}catch(e){return 'err '+String(e.stack).slice(0,300)}});
 /* the SAME life (old save) on this page: its frame opening must match the old page (±1 px) */
 let sameFrame=null;if(OLD&&/^ok/.test(R.oldSave||""))sameFrame=await p.evaluate(FRAME);
 await p.evaluate(START);await p.evaluate(()=>{if(!window.kitIsOff)window.kitIsOff=e=>!!(e.disabled||e.classList.contains('kdis'))});await sleep(1500);await p.addStyleTag({content:'img.figimg,#mefig,#tokens .tok{animation:none!important}'});
 /* pv */
 R.cases.pv=await p.evaluate(async()=>{const ck=[];const Wh=S.where;const v=liveRivals(false).find(x=>x.rank>=4)||liveRivals(false)[0];for(const x of rivals)if(Wh[x.id]==="vuon")Wh[x.id]="r"+x.id;Wh[v.id]="vuon";Wh.emp="tn";S.menW={};S.minW={};
  try{k61Know([v],"",true,3)}catch(e){}S.place="home";used=0;tab="act";goTo("vuon");await new Promise(r=>setTimeout(r,1500));
  popIdx=curPeople().findIndex(q=>q.ref===v);popMsg="";renderStage();await new Promise(r=>setTimeout(r,2500));
  const pc=document.querySelector("#popw .pc");if(!pc)return{ck:["no person view"]};const r=e=>e?e.getBoundingClientRect():null;
  const nm=r(pc.querySelector(".pcl>.pcname")),rk=r(pc.querySelector(".pcl>.pcrk")),fig=r(pc.querySelector(".kpafig img"));
  if(pc.querySelector(".pcl .pcp"))ck.push("portrait frame still in the person view");if(!fig)ck.push("no full-body figure");
  if(nm&&fig&&nm.top>fig.top)ck.push("name below the figure");if(rk&&nm&&rk.top>nm.top)ck.push("rank under the name");
  const pcr=pc.querySelector(".pcr");const hs=[...pcr.querySelectorAll(".kpst")].map(h=>h.textContent.trim());if(!hs.includes("Giao tình")||!hs.includes("Việc làm được"))ck.push("sections "+hs.join("/"));
  const tabs=[...pc.querySelectorAll(".kpatabs .pct")].map(t=>({k:t.dataset.kpag,on:t.classList.contains("on"),n:+((t.querySelector("i")||{}).textContent||0)}));
  const acts=[...pc.querySelectorAll(".pcb>.ka")];const off=a=>kitIsOff(a);
  tabs.forEach(t=>{const n=acts.filter(a=>a.dataset.kpag===t.k&&!off(a)).length;if(n!==t.n)ck.push(`tab ${t.k} count ${t.n} real ${n}`)});
  const cur=tabs.find(t=>t.on);if(cur&&cur.n===0&&tabs.some(t=>t.n>0))ck.push("default tab has no doable act");
  acts.filter(a=>!a.hidden).forEach(a=>{if(a.dataset.kpag!==(cur&&cur.k))ck.push("act of another tab shown")});
  const seen=acts.map(off);if(seen.indexOf(true)>=0&&seen.lastIndexOf(false)>seen.indexOf(true))ck.push("greyed act before a doable one");
  const hud=document.getElementById("hud")||document.querySelector(".hud");const pw=document.getElementById("popw");const hb=hud&&hud.getBoundingClientRect(),pb=pw&&pw.getBoundingClientRect();
  if(hb&&pb&&pb.height&&pb.top<hb.bottom-1)ck.push(`person view top ${pb.top.toFixed(0)} over the header bottom ${hb.bottom.toFixed(0)}`);
  const chips=[...pc.querySelectorAll(".kst-chip small")].map(s=>s.textContent.trim()).filter(t=>/quý|oán|thiện cảm/.test(t));if(chips.some(t=>/ngươi/.test(t)))ck.push("chip says ngươi: "+chips.join(" | "));
  return{tabs,chips,acts:acts.length,ck}});
 await shot("pv");
 for(const k of ["emp","th"]){R.cases[k]=await p.evaluate(async k=>{popIdx=null;renderStage();Q.length=0;const M0=document.getElementById("modal");if(M0)M0.hidden=true;kitCourtOpen(k);await new Promise(r=>setTimeout(r,2500));
   const M=document.getElementById("modal");const d=M&&M.querySelector(".dlg");const ck=[];if(!d||M.hidden)return{ck:["no dialog"]};
   if(!d.classList.contains("kdper"))ck.push("not the kit person dialog: "+d.className);if(d.querySelector(".pcp"))ck.push("portrait frame in the dialog");
   const hs=[...d.querySelectorAll(".kpst")].map(h=>h.textContent.trim());if(!hs.length)ck.push("no kit sections");if(/ngươi/.test((d.querySelector(".kpsec")||{}).textContent||"")&&/sủng ngươi|quý ngươi|thương ngươi/.test(d.textContent))ck.push("ngươi in relation rows");
   return{cls:d.className,hs,ck}},k);await shot(k);await p.evaluate(()=>{Q.length=0;const M=document.getElementById("modal");if(M)M.hidden=true})}
 /* deck: doable first */
 R.cases.deck=await p.evaluate(async()=>{popIdx=null;S.place="home";const b=document.querySelector('[data-tab="act"]');if(b)b.click();else{tab="act";render()}await new Promise(r=>setTimeout(r,2000));
  const ck=[];document.querySelectorAll("#panel .cards").forEach(G=>{const s=[...G.querySelectorAll(":scope > button.ka")].map(kitIsOff);if(s.indexOf(true)>=0&&s.lastIndexOf(false)>s.indexOf(true))ck.push("greyed card before a doable one")});return{ck}});
 await shot("deck");
 /* rv frame */
 const nf=await p.evaluate(FRAME);const ck=[];if(nf.none)ck.push("no frame");else{if(nf.canvasBottom>nf.boxBottom+1)ck.push("tassel below the box");if(nf.clip)ck.push("tassel clipped by "+nf.clip);
  if(oldFrame&&!oldFrame.none&&sameFrame&&!sameFrame.none)sameFrame.opening.forEach((x,i)=>{if(Math.abs(x-oldFrame.opening[i])>1)ck.push(`opening[${i}] ${x} old ${oldFrame.opening[i]}`)})}
 R.cases.rv=Object.assign({old:oldFrame,same:sameFrame},nf,{ck});await shot("rv");
 R.errs=errs;console.log(JSON.stringify(R));await b.close()})();
