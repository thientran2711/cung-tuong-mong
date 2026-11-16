/* dudo-lock.js — Dư đồ lock audit (owner-bug 16/11 18:30Z (4) "chỗ nào cũng khóa hết").
   For each life (origin / rank) and each buổi of a day: every Dư đồ place → accessOf, accState (the grey reason the map shows),
   and the map DOM (hotspot disabled / why text). Then visits every open place (goTo) and checks the place screen opened.
   usage: node dev/test/dudo-lock.js <index.html> [WxH] [outdir]   (old save: fixtures/world30-met.json) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';const [,,HTML0='dev/index.html',SZ='1180x820',OUT='']=process.argv;const HTML=path.resolve(HTML0);const [W,H]=SZ.split('x').map(Number);
const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=WT+'.ahcache/img/';fs.mkdirSync(CACHE,{recursive:true});if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,ignoreHTTPSErrors:true,reducedMotion:'reduce'});
 await ctx.route('**/*',async r=>{const u=r.request().url();
  if(u.startsWith('http://ctm.test/')){const p=decodeURIComponent(new URL(u).pathname).slice(1);
   if(p===''||p==='index.html')return r.fulfill({status:200,body:fs.readFileSync(HTML),contentType:'text/html; charset=utf-8'});
   const f=WT+p;if(fs.existsSync(f)&&fs.statSync(f).isFile())return r.fulfill({status:200,body:fs.readFileSync(f)});return r.fulfill({status:404,body:''})}
  if(u.startsWith(CDN)){const p=new URL(u).pathname.slice(1),c=CACHE+p.replace(/\//g,'__'),ct=p.endsWith('.json')?'application/json':'image/webp';
   if(!p.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!p.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()}
  if(/fonts\.(googleapis|gstatic)/.test(u))return r.continue();return r.abort()});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
 const fresh=async o=>{await p.evaluate(o=>{SLOT=3;window.__forceOrigin=o;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()},o);await p.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1500);await p.evaluate(()=>{Q.length=0;
   for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}render()})};
 const audit=(label)=>p.evaluate(label=>{const out=[];Q.length=0;
  const st={label,origin:S.origin&&S.origin.k,rank:S.rank,srv:typeof isSrv==='function'&&isSrv(),kc:typeof isKc==='function'&&isKc(),place:S.place,buoi:S.buoi,used,out:!!S.out,conf:S.confined||0};
  tab='go';render();
  const dom={};document.querySelectorAll('[data-go],[data-k],[data-place]').forEach(e=>{const k=e.dataset.go||e.dataset.k||e.dataset.place;if(!k)return;const d=e.disabled||e.classList.contains('lock')||e.classList.contains('dis')||e.getAttribute('aria-disabled')==='true';(dom[k]=dom[k]||[]).push((d?'D:':'')+(e.className||e.tagName).toString().slice(0,30))});
  for(const P of places()){const a=accessOf(S,P.k),s=typeof accState==='function'?accState(P.k):{};out.push({k:P.k,n:P.n,ok:a.ok,why:a.why||'',st:s.why||'',tc:travel(S.place,P.k),dom:(dom[P.k]||[]).join('|')})}
  return {st,out,txt:(document.getElementById('panel')||document.body).innerText.slice(0,600)}},label);
 const show=r=>{console.log('==',JSON.stringify(r.st));for(const o of r.out)console.log(`  ${o.ok?'open':'LOCK'} ${o.k.padEnd(5)} ${o.n.padEnd(22)} tc=${o.tc} why="${o.why}" map="${o.st}" dom=${o.dom}`)};
 const visitAll=()=>p.evaluate(()=>{const R=[];const home=S.place;for(const P of places()){Q.length=0;S.place='home';used=0;const a=accessOf(S,P.k);if(!a.ok){R.push(P.k+':locked('+a.why+')');continue}
   try{goTo(P.k)}catch(e){R.push(P.k+':ERR '+e.message.slice(0,60));continue}const ok=S.place===P.k;R.push(P.k+(ok?':in':':NOTIN'+(Q.length?'(card:'+(Q[Q.length-1].t||'')+')':'')));Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}
   S.place='home';used=0;return R.join(' ')});
 /* GRID: every buổi x khắc used; the map HTML (the kit labels) must wear a lock mark ONLY where a rule keeps her out (accessOf fails);
    every place open by rule but too far must be reachable (walk now, or walk spill into the next buổi; the night: wait) */
 const grid=()=>p.evaluate(()=>{const R=[];let bad=0;for(let b=0;b<4;b++){const row=[];for(let u=0;u<4;u++){S.buoi=b;used=u;S.place='home';window.__kpm=null;
   const h=mapHTML();const lockedOnMap=new Set();h.replace(/data-(?:go|ak)="([^"]+)"[^>]*>((?:(?!data-(?:go|ak)=)[\s\S])*?)<\/(?:button|div)>/g,(a,k,inner)=>{if(/class="mlock"/.test(inner))lockedOnMap.add(k);return a});
   let open=0,far=0,spill=0,lock=0,wrong=[];for(const P of places()){const a=accessOf(S,P.k),st=accState(P.k);const ruled=!a.ok;
    if(ruled)lock++;else if(st.why){far++;if(typeof walkLate==='function'?walkLate(P.k):(walkSpill(P.k)||{}).ok)spill++}else open++;
    if(ruled!==lockedOnMap.has(P.k)&&P.k!==S.place)wrong.push(P.k+(ruled?':rule-no-lock':':LOCK-BUT-OPEN'))}
   bad+=wrong.length;row.push(`u${u}:${open}open/${far}far(${spill}spill)/${lock}rule${wrong.length?' WRONG['+wrong.join(',')+']':''}`)}R.push('b'+b+' '+row.join(' '))}S.buoi=0;used=0;return {txt:R.join('\n'),bad}});
 let gridBad=0;
 const lives=process.env.LIVES?process.env.LIVES.split(','):['tt','muoi','dtq','nc','cn'];
 for(const o of lives){await fresh(o);
  if(process.env.PERF){console.log('PERF',o,await p.evaluate(()=>{S.buoi=0;used=3;S.place='home';window.__kpm=null;mapHTML();const t=performance.now();for(let i=0;i<50;i++)mapHTML();const m=(performance.now()-t)/50;const t2=performance.now();for(let i=0;i<50;i++){tab='go';render()}return `mapHTML ${m.toFixed(2)} ms · full Dư đồ render ${((performance.now()-t2)/50).toFixed(1)} ms`}));continue}
  if(process.env.DBG){console.log(await p.evaluate(()=>{Q.length=0;S.place='home';used=3;const o=[];for(const b of [0,1]){S.buoi=b;o.push(b+':'+JSON.stringify(accessOf(S,'tn'))+' sp='+JSON.stringify(b===0?walkSpill('tn'):null)+' st='+JSON.stringify(accState('tn')))}return o.join('\n')}));console.log(await p.evaluate(()=>{Q.length=0;S.buoi=0;used=3;S.place='home';const P=walkSpill('tyv');const r1={P,mg:S.mg,q:Q.length};walkGo('tyv');return JSON.stringify({r1,b:S.buoi,used,W:window.__walkSpill,q:Q.map(x=>x.t)})}));for(let i=0;i<8;i++){await p.waitForTimeout(400);console.log(await p.evaluate(()=>JSON.stringify({b:S.buoi,pl:S.place,used,W:window.__walkSpill,q:Q.map(x=>x.t),md:!document.getElementById('modal').hidden})));await p.evaluate(()=>{if(Q.length){Q.length=0;document.getElementById('modal').hidden=true}})}continue}
  if(process.env.GRID){const g=await grid();console.log('GRID',o,'\n'+g.txt);gridBad+=g.bad;
   /* SPILL: 1 khắc left in the morning, every far-but-open place: walkGo must land her there in the next buổi */
   const snap=await p.evaluate(()=>JSON.stringify(ser()));const ks=await p.evaluate(()=>{S.buoi=0;used=3;S.place='home';return places().filter(P=>accessOf(S,P.k).ok&&accState(P.k).why&&walkLate(P.k)).map(P=>P.k)});const res=[];
   for(const k of ks){await p.evaluate(d=>{quiet=true;deser(JSON.parse(d));quiet=false;Q.length=0;S.buoi=0;used=3;S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};window.__walkSpill=null;window.__seen=[]},snap);
    await p.evaluate(k=>walkGo(k),k);for(let i=0;i<20;i++){await p.waitForTimeout(250);await p.evaluate(()=>{const m=document.getElementById('modal');const t=m&&!m.hidden?m.innerText.replace(/\s+/g,' ').slice(0,240):'';if(t)window.__seen=(window.__seen||[]).concat(t);Q.length=0;if(m)m.hidden=true})}
    const r=await p.evaluate(k=>{const sn=(window.__seen||[]).join(' / ');window.__seen=[];return{at:S.place===k,b:S.buoi,used,greet:/chủ vị|bái kiến|không vào được/iu.test(sn),sn:sn.slice(0,120)}},k);res.push(k+(r.at?`:in(b${r.b},u${r.used})`:r.greet?`:card(b${r.b})`:':MISS['+r.sn+']'));if(!r.at&&!r.greet)gridBad++}
   await p.evaluate(d=>{quiet=true;deser(JSON.parse(d));quiet=false;Q.length=0},snap);console.log('SPILL',o,res.join(' '));continue}
  for(let b=0;b<4;b++){await p.evaluate(b=>{S.buoi=b;used=0;S.place='home';try{placeWhere()}catch(e){}},b);const r=await audit(o+' b'+b);show(r);
   if(b===0||b===1)console.log('  visit:',await visitAll())}
  if(OUT&&o==='tt'){await p.evaluate(()=>{S.buoi=1;used=0;S.place='home';tab='go';render()});await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/dudo-${o}-${W}x${H}.png`})}}
 const fx=WT+'dev/test/fixtures/world30-met.json';
 if(fs.existsSync(fx)){await p.evaluate(d=>{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;Q.length=0;render()},fs.readFileSync(fx,'utf8'));
  for(let b=0;b<2;b++){await p.evaluate(b=>{S.buoi=b;used=0;S.place='home'},b);show(await audit('old-save b'+b));console.log('  visit:',await visitAll())}}
 if(process.env.GRID){if(fs.existsSync(WT+'dev/test/fixtures/world30-met.json')){const g=await grid();console.log('GRID old-save\n'+g.txt);gridBad+=g.bad}console.log(gridBad?'GRID FAIL '+gridBad:'GRID OK: lock mark = rule lock everywhere')}
 console.log('page errors',errs.length,errs.slice(0,5).join(' | '));await b.close()})();
