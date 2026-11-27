/* review/emo-men: which emotion seal each person wears. Serves the repo root as http://em.local/ and the local img/kit/emo-* (not yet on the CDN).
   usage: node dev/test/emo-men.js <W>x<H>@dpr <outdir>
   Starts a life, makes the Emperor angry and known, opens his card and a few people cards; prints every seal on screen with its owner's role. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');
const MIME={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',css:'text/css'};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.route('**/*',r=>{const u=new URL(r.request().url());
  if(/\/img\/kit\/emo-/.test(u.pathname)){const f=path.join(ROOT,u.pathname.replace(/^.*\/img\//,'img/'));return fs.existsSync(f)?r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'image/webp','access-control-allow-origin':'*'}}):r.fulfill({status:404,body:''})}
  if(u.host!=='em.local')return r.continue();
  const f=path.join(ROOT,decodeURIComponent(u.pathname));if(/assets\.json$/.test(f)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':MIME[f.split('.').pop()]||'application/octet-stream'}})});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://em.local/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
 await p.waitForTimeout(9000);
 await p.evaluate(()=>{document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;
  S.emp.emo={k:'gian',v:70,why:'bị quần thần can gián',t:null,w:0};(S.nightLog=S.nightLog||[]).push(typeof emoW==='function'?emoW():0);
  try{k61Meet(S.emp,'gặp',3)}catch(e){}for(const m of (S.men||[]).slice(0,3)){try{k61Meet(m,'gặp',3)}catch(e){}}S.met=S.met||{};for(const v of rivals.slice(0,3)){S.met[v.id]=1;try{k61Meet(v,'gặp',3)}catch(e){}v.emo={k:'ghen',v:60,why:'thử',w:0}}
  for(const m of (S.men||[]).slice(0,3))m.emo={k:'so',v:60,why:'thử',w:0};render()});
 await p.waitForTimeout(1500);
 const list=()=>p.evaluate(()=>[...document.querySelectorAll('img.kemo')].filter(e=>e.getClientRects().length).map(e=>{const c=e.closest('[data-kc],[data-who],.pcp,.md,button,.kcard')||e.parentElement;
  return{src:e.getAttribute('src').replace(/^.*\/img\//,'img/'),ok:e.complete&&e.naturalWidth>0,where:(c.getAttribute('data-kc')||c.className||'').toString().slice(0,40),txt:(c.textContent||'').trim().slice(0,30)}}));
 const R={stage:await list()};await p.screenshot({path:`${OUT}/stage-${W}x${H}.jpg`,type:'jpeg',quality:70});
 /* the Emperor's card */
 await p.evaluate(()=>{const b=document.querySelector('[data-kc="emp"]')||document.getElementById('emp');if(b)b.click()});await p.waitForTimeout(1500);
 R.empCard=await list();await p.screenshot({path:`${OUT}/emp-card-${W}x${H}.jpg`,type:'jpeg',quality:75});
 /* a direct check of the rule on every kind of person */
 R.rule=await p.evaluate(()=>{const o={};const add=(n,x)=>{try{o[n]=emoArtSet(x)||'(nữ)'}catch(e){o[n]='ERR '+e.message}};
  add('Hoàng thượng',S.emp);add('{kind:emp}',{kind:'emp'});add('ngươi',S);add('phi tần',rivals[0]);add('Thái hậu',{kind:'th'});add('cung nữ',S.maid);
  add('thái y',{kind:'ty'});add('thái giám',{kind:'peddler'});(S.men||[]).slice(0,4).forEach((m,i)=>add('nam nhân '+i+' '+(m.rw||'')+' '+(m.age||''),m));
  try{const ks=allKids();ks.slice(0,3).forEach(([k],i)=>add('con '+i+' '+k.sex+' '+k.age,k))}catch(e){}
  if(S.court)Object.keys(S.court).forEach(k=>add('court '+k,S.court[k]));return o});
 console.log(JSON.stringify({W,H,...R,errs},null,1));await b.close()})();
