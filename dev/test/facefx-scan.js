/* review/facefx-all: scan every place a face is drawn x every kind of person with a poison mark set (same state, same rule for all).
   usage: node dev/test/facefx-scan.js <page url>   -> JSON {rows:[{who,fit,lg,sm,stage,podium,room}]}; run on the old and the new build for the before/after table */
const {chromium}=require('playwright');const URL=process.argv[2];
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.evaluate(()=>{window.KP=(q,s)=>{const f=kitFace(q);return s==='lg'?pframe(f):mdH(f,s||'')}});/* jbook.js redefines kitPortrait() as an orientation check, so build the portrait from kitFace/pframe/mdH */await p.waitForTimeout(6000);
 const rows=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;render();await new Promise(r=>setTimeout(r,1500));
  S.met=S.met||{};rivals.forEach(v=>S.met[v.id]=1);for(const q of KIT_FACEFX.everyone()){try{S.known[kOf61(q)]=3}catch(e){}}/* REAL knowledge (S.known, what the portrait picker reads); overriding window.kitKnown only changed the person check and left silhouettes */
  const rs=rivals.find(v=>(v.staff||[]).length);const ka=allKids().find(a=>!a[1])||allKids()[0];
  const who={S,rival:rivals[0],emp:S.emp,thaihau:S.thO||(S.thO={}),maid:S.maid,staff:(S.staff||[])[0],rstaff:rs&&rs.staff[0],thaiy:S.court&&S.court.ty,man:(S.men||[])[0],kid:ka&&ka[0]};
  const has=h=>/kff-doc/.test(h);const out=[];
  for(const k in who){const q=who[k];if(!q)continue;const u=wk()+5;q.pz={sev:2,until:u,dx:1,nt:1,at:wk()};
   const lg=KP(q,'lg'),sm=KP(q,'sm'),st=kitStageFig(q);
   const file=kitFile((/class="kpor" src="([^"]*)"/.exec(lg)||/src="([^"]*)"/.exec(sm)||[])[1]||'');
   /* podium */
   const root=document.createElement('div');root.innerHTML=kitPodium([{who:q,place:1}]);document.body.appendChild(root);const r0=root.firstElementChild;try{kpodFit(r0)}catch(e){}await new Promise(r=>setTimeout(r,900));const pod=!!r0.querySelector('.kfxf .kff-doc');root.remove();
   /* room stage token */
   const stg=document.createElement('div');stg.id='stage';stg.innerHTML='<div id="tokens"><div class="tok" data-p="0" style="position:relative;width:200px;height:300px"><img class="figimg" style="width:200px;height:300px" src="'+kitFigOf(q)+'"></div></div>';
   const old=document.getElementById('stage');if(old)old.id='stage_old';document.body.appendChild(stg);const vis=S.visit;S.visit={people:[q===S.emp?{kind:'emp'}:q===S.thO?{kind:'th'}:q===S.maid?{kind:'maid'}:{kind:'x',ref:q}]};
   const im=stg.querySelector('img');await new Promise(r=>{if(im.complete)r();else{im.onload=r;im.onerror=r}});try{kitFigFx()}catch(e){}const room=!!stg.querySelector('.kfxf .kff-doc');stg.remove();if(old)old.id='stage';S.visit=vis;
   out.push({who:k,pic:file.replace(/-a\d+.*/,'').replace(/\d+/g,'N'),fit:!!(KIT_VEIL.fit&&KIT_VEIL.fit[file]),lg:has(lg),sm:has(sm),stage:has(st),podium:pod,room});q.pz=null}
  /* Cung nhân list (staff tab) */
  const list=typeof staffHTML==='function'?(()=>{try{const s=S.staff[0];s.pz={sev:2,until:wk()+5,dx:1};const h=staffHTML();s.pz=null;return /kff-doc/.test(h)}catch(e){return null}})():null;
  out.push({who:'cung-nhan-list(staff[0])',list});return out});
 console.log(JSON.stringify({rows,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
