/* review/hoang-tu: shots + checks of the Hoàng tự sub-tabs. Pages are served by routing (no server): http://ht.local/<file> = repo root file.
   usage: node dev/test/hoang-tu.js <page: _ht.html | _ht0.html> <W>x<H>@dpr <outdir> <tag> <scenario: nokid | kids | old> [oldsave.json to write | read]
   nokid = fresh life, no children; kids = her children (4, 9, 15-son, 17-daughter) + rivals' children (princes 16/19, princesses 14/18);
   old = load a save made by the "before" page (_ht0.html, scenario kids, 4th arg path) into this page.
   Prints JSON: per tab overflowX, clipped text, empty panel, '???' or 'undefined' text; page errors. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,PAGE,SZ,OUT,TAG,SC,SAVE]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');
const MIME={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',css:'text/css',mp3:'audio/mpeg',ogg:'audio/ogg',woff2:'font/woff2'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 await ctx.route('**/*',r=>{const u=new URL(r.request().url());if(u.host!=='ht.local'){return /ctm-img/.test(u.host)?r.fulfill({status:404,body:''}):r.continue()}
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://ht.local/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3500);
 const clean=()=>p.evaluate(()=>{for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}});
 if(SC==='old'){const d=fs.readFileSync(SAVE,'utf8');await p.evaluate(d=>{localStorage.setItem(SK(2),d);showTitle();const b=document.querySelector('[data-load="2"]');if(b)b.click();else{deser(loadSlot(2));SLOT=2}},d);await p.waitForTimeout(3000);await p.evaluate(()=>{document.getElementById('title').hidden=true;try{render()}catch(e){}});await clean()}
 else{await p.evaluate(sc=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
  kn();for(const v of rivals){S.met[v.id]=1;try{k61Meet(v,"gặp",3)}catch(e){}}
  if(sc==='kids'){const mk=(sex,age,fond)=>{const k=mkKid(sex,age);k.fond=fond;k.tal=40+age*2;return k};
   [['m',4,60],['f',9,55],['m',16,70],['f',17,65]].forEach(a=>S.kids.push(mk(...a)));
   const R=rivals.filter(v=>v.alive&&!v.out);[[0,'m',19,50],[0,'f',18,40],[1,'m',16,72],[1,'f',14,60],[2,'m',7,45]].forEach(([i,...a])=>{if(R[i])R[i].kids.push(mk(...a))});
   S.age=Math.max(S.age||18,36);try{allKids().forEach(([k])=>k61Know(k,'',true,3))}catch(e){}for(let i=0;i<2;i++){try{monthTick()}catch(e){console.error(e)}Q.length=0}
   try{h54PoolUp();if(typeof qnPoolUp==='undefined'){}}catch(e){}
   try{const s=h54Pool()[0];if(s)s.kn=1;}catch(e){}try{const q=(S.qPool||[])[0];if(q)q.kn=1}catch(e){}}
  Q.length=0;render()},SC);await p.waitForTimeout(1500);await clean()}
 if(SC==='kids'&&SAVE&&/_ht0/.test(PAGE)){const d=await p.evaluate(()=>JSON.stringify(ser()));fs.writeFileSync(SAVE,d)}
 const shot=async n=>{for(let i=0;i<3;i++){const c=await p.evaluate(()=>{const L=[...document.querySelectorAll('[data-km-close]')].filter(b=>b.offsetParent);L.forEach(b=>b.click());return L.length});if(!c)break;await p.waitForTimeout(700)}await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:70})};
 const meas=()=>p.evaluate(()=>{const vw=innerWidth;const P=document.getElementById('panel');
  const cut=[...document.querySelectorAll('#panel *, #modal *')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,8).map(e=>e.className+':'+e.textContent.slice(0,30));
  const sub=[...document.querySelectorAll('.ksubb')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent);const nv=document.querySelector('#panel > .ksub');if(nv&&nv.scrollWidth>nv.clientWidth+1)sub.push('nav overflow');
  const txt=P?P.innerText:'';return{ovf:document.documentElement.scrollWidth>vw+1,cut,subCut:sub,subs:[...document.querySelectorAll('.ksubb')].map(e=>e.textContent),
   empty:!txt.trim(),bad:/\?\?\?|undefined|NaN|\[object/.test(txt),len:txt.length}});
 const R={};const keys=await p.evaluate(()=>typeof KG!=='undefined'&&KG.ht?KG.ht.keys:['kid']);
 for(const t of keys){await p.evaluate(t=>{tab=t;render()},t);await p.waitForTimeout(1500);await shot(t);R[t]=await meas();
  if(keys.length===1){await p.evaluate(()=>{const P=document.getElementById('panel');P.scrollTop=P.scrollHeight});await p.waitForTimeout(600);await shot(t+'-cuoi')}
  if(SC!=='nokid'&&['kvo','kin','hon','qt'].includes(t)){await p.evaluate(()=>{const f=[...document.querySelectorAll('#panel .pface')];if(f.length>1)f[f.length-1].click()});await p.waitForTimeout(900);await shot(t+'-2');R[t+'-2']=await meas()}}
 if(SC==='kids'&&/_ht\.html/.test(PAGE)){
  await p.evaluate(()=>{tab='hon';PG.hon=0;render();const L=[...document.querySelectorAll('#panel .pface')];const i=L.findIndex(b=>/Hoàng tử|^/.test(b.textContent));render()});
  const ok=await p.evaluate(()=>{S.suc=100;used=0;const k=S.kids.find(x=>x.sex==='m'&&x.age>=16);if(!k)return 'no son';tab='hon';const L=document.querySelectorAll('#panel .pface');render();
   const b=document.querySelector('[data-ht="ban"]:not([disabled])')||(()=>{tab='kid';PG.kid=S.kids.indexOf(k);render();return document.querySelector('[data-ht="ban"]:not([disabled])')})();if(!b)return 'no btn';b.click();return 'ok'});
  await p.waitForTimeout(1500);await shot('banhon');R.banhon=Object.assign({click:ok},await meas());
  const pick=await p.evaluate(()=>{const o=document.querySelector('#modal button.ka,#modal .opts button,#modal button[data-o]');if(!o)return 'no opt';o.click();return o.textContent.slice(0,60)});
  await p.waitForTimeout(1500);await clean();await p.evaluate(()=>{tab='qt';render()});await p.waitForTimeout(800);
  R.ask=await p.evaluate(()=>{used=0;const b=document.querySelector('[data-ht="ask"]:not([disabled])');if(!b)return 'no ask';b.click();return 'ok'});await p.waitForTimeout(1200);await clean();await shot('qt-after-ask');
  R.state=await p.evaluate(()=>({sons:S.kids.filter(k=>k.sex==='m').map(k=>[k.name,k.age,pkState(k)]),hon:S.hon,qn:(S.qPool||[]).length,kn:(S.qPool||[]).filter(q=>q.kn).length}));R.pick=pick}
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
