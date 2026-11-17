/* Single-hall rule (owner 11/16): a courtyard step exists ONLY for places with >=2 halls (one rule: kpmParts length in jpm.js).
   usage: node dev/test/single-hall.js <url of built index.html> <W>x<H>@dpr <outdir> <tag>
   - every place with ONE hotspot (thu nvp vuon dtd tn lc ksp): the Dư đồ tap goes STRAIGHT to the place (no courtyard, S.hall = chính, back button = plain "‹ Dư đồ")
   - every consort palace + home (several halls): the tap opens the courtyard with >=2 hotspots; a hall's back button returns to it
   - no courtyard picture dir left in KPM_DATA for a single-hall place; 0 page errors. */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG,FULL]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',ignoreHTTPSErrors:true});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});await p.waitForTimeout(2000)}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.pal=null;S.place='home';used=0;tab='go';window.__mapZ=1;render();setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});
 const res=[],fails=[];
 const reset=async()=>{await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;window.__kpm=null;S.hall=null;S.pal=null;S.place='home';used=0;tab='go';window.__mapZ=1;render()});await p.waitForTimeout(500)};
 const tapKey=k=>p.evaluate(async k=>{const b=document.querySelector(`#panel .mapv .mspot[data-go="${k}"]`);if(b)b.click();else j77Tap(k,"");/* thu / dtd: no hotspot until summoned, the same handler is used */await new Promise(r=>setTimeout(r,900));
   return{k,court:!!document.querySelector('#panel .kpmv'),spots:document.querySelectorAll('#panel .kpm-spot').length,hall:S.hall&&{k:S.hall.k,part:S.hall.part},place:S.place,tab,dir:(()=>{try{return kpmDir(kpmSlotOf(k))}catch(e){return 'err'}})()}},k);
 const shot=n=>p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:70,animations:'disabled'});
 for(const k of ["thu","nvp","vuon","dtd","tn","lc","ksp"]){await reset();const r=await tapKey(k);res.push(r);
   if(r.nobtn){fails.push(k+": no hotspot on the Dư đồ");continue}
   if(r.court)fails.push(k+": courtyard opened");if(!r.hall||r.hall.k!==k||r.hall.part!=="chinh")fails.push(k+": did not enter its hall "+JSON.stringify(r.hall));if(r.dir)fails.push(k+": has courtyard dir "+r.dir);
   await shot('single-'+k);
   const back=await p.evaluate(()=>{renderStage();const b=document.getElementById('tomap');return b?{t:b.textContent,kpm:b.dataset.kpm}:null});if(back&&(back.kpm!=null||!/Dư đồ/.test(back.t)))fails.push(k+": back button not plain Dư đồ "+JSON.stringify(back))}
 /* multi-hall: each consort palace on the plan */
 const n=await p.evaluate(()=>PALN.length);
 const plainDay=()=>p.evaluate(()=>{S.buoi=0;for(let m=1;m<=12;m++)for(let t=0;t<3;t++){S.month=m;S.tuan=t;if(!festToday()&&!wdTang()&&kpmArt(0)){render();return[m,t]}}return null});
 for(let i=0;i<n;i++){await reset();if(!(await plainDay()))fails.push("no plain painted day found");const r=await p.evaluate(async i=>{const b=[...document.querySelectorAll('#panel .mapv .mspot')].find(x=>x.dataset.go==='empty'&&0)||[...document.querySelectorAll('#panel .mapv .mspot')].find(x=>x.textContent.includes(PALN[i].replace(/ cung$/,'')));if(!b)return{nobtn:1};b.click();await new Promise(r=>setTimeout(r,900));
   const A=kpmArt(i),pa=A&&KPM_HALLS[A.dir]||[];return{court:!!document.querySelector('#panel .kpmv'),rows:document.querySelectorAll('#panel .kpm-row').length,spots:document.querySelectorAll('#panel .kpm-spot').length,bad:[...document.querySelectorAll('#panel .kpm-spot')].some(x=>!pa.includes(x.dataset.go.slice(4))),tamWrong:!!(A&&A.tam)!==!!document.querySelector('#panel .kpmv .ktam')}},i);r.name=await p.evaluate(i=>PALN[i],i);res.push(r);
   if(r.nobtn)continue;if(!r.court||r.rows<2)fails.push(r.name+": multi-hall palace did not open its courtyard "+JSON.stringify(r));if(r.bad)fails.push(r.name+": hotspot on an unpainted hall "+JSON.stringify(r));if(r.tamWrong)fails.push(r.name+": 'tạm' chip does not match art.tam "+JSON.stringify(r));if(i===0)await shot('multi-palace0')}
 await reset();await plainDay();const h=await tapKey("home");res.push(h);if(h.nobtn)fails.push("home: no hotspot");else if(!h.court)fails.push("home: no courtyard "+JSON.stringify(h));
 {const hs=await p.evaluate(()=>({rows:document.querySelectorAll('#panel .kpm-row').length,spots:[...document.querySelectorAll('#panel .kpm-spot')].map(x=>x.dataset.go),tam:!!document.querySelector('#panel .kpmv .ktam'),painted:KPM_HALLS[kpmDir("p:home")]}));res.push(hs);
  if(hs.rows<2)fails.push("home: hall rows missing "+JSON.stringify(hs));if(hs.spots.some(g=>!hs.painted.includes(g.slice(4))))fails.push("home: hotspot on an unpainted hall (r3) "+JSON.stringify(hs));if(!hs.tam)fails.push("home: stand-in picture without the tạm chip "+JSON.stringify(hs))}
 await reset();await plainDay();const bi=await p.evaluate(()=>{for(let i=0;i<PALN.length;i++)if(kpmArt(i)&&kpmKeyOf(i))return i;return -1});
 if(bi<0)fails.push("multi: no palace with a fully painted courtyard to test the back button");else{const t=await p.evaluate(async i=>{const b=[...document.querySelectorAll('#panel .mapv .mspot')].find(x=>x.textContent.includes(PALN[i].replace(/ cung$/,'')));if(b)b.click();await new Promise(r=>setTimeout(r,900));return !!document.querySelector('#panel .kpmv')},bi);if(!t)fails.push("multi: palace did not open its courtyard");await shot('multi-home');
 await p.evaluate(()=>{const r=document.querySelector('#panel [data-kpmpart="chinh"]');if(r)r.click()});await p.waitForTimeout(900);
 const hb=await p.evaluate(()=>{renderStage();const b=document.getElementById('tomap');return b?{t:b.textContent,kpm:b.dataset.kpm}:null});if(!hb||hb.kpm==null)fails.push("multi: back from a hall does not return to the courtyard "+JSON.stringify(hb))}
 const dd=await p.evaluate(()=>Object.keys(KPM_DATA.spots).filter(d=>Object.keys(KPM_DATA.spots[d]).length<2).concat(Object.keys(KPM_DATA.have).filter(d=>!KPM_DATA.spots[d])));if(dd.length)fails.push("single-hall dirs still in KPM_DATA: "+dd);
 console.log(JSON.stringify({TAG,fails,res,errs}));if(fails.length||errs.length)process.exitCode=1;await b.close()})();
