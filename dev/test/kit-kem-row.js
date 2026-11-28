/* kit-kem-row.js — KIT §7 kitKemRow + kitRows person rows (KK41, MAIN 157 ruling 26/11, RV-OB-VERDICT «Hoàng hậu Điền Chi Lan:một vị Quý phi: ghen +8 ghen +8 …»).
   Per device (Fold 755x1000, iPad 1180x820), in the night card (.kne) AND the result toast (#rtoast):
   - Kèm: one line per NAMED person «<Tên>: ghen +8», the strangers grouped «N vị khác: ghen +8» (per feeling + direction), a named person never twice;
   - every Kèm / Được / Mất line is its own row (distinct tops), the name «<Tên>:» on the same row as its value;
   - no line starts with «một vị» (capital at the start of a row).
   usage: node dev/test/kit-kem-row.js <index.html> [shotdir]   Exit 1 on a FAIL. Shots never go in git. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const html=fs.readFileSync(SRC);let fails=0;const chk=(n,ok,i)=>{if(!ok){fails++;console.log('FAIL',n,i||'')}else console.log('ok  ',n)};if(OUT)fs.mkdirSync(OUT,{recursive:true});
for(const [W,H] of [[755,1000],[1180,820]]){const dev=W<H?'fold':'ipad';const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=12345;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e).slice(0,200))});
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
 await p.waitForFunction(()=>typeof start==='function'&&typeof kitNightEnd==='function',null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
 await p.waitForTimeout(3000);
 const ex=await p.evaluate(()=>{const R=liveRivals(true);const q=queenP();const named=R.filter(v=>v!==q&&kaNamed(v)),anon=R.filter(v=>!kaNamed(v));
  window.__K=[...(q&&q!==S?[{v:q,k:"ghen",d:8},{v:q,k:"ghen",d:8}]:[]),...named.slice(0,1).map(v=>({v,k:"ghen",d:8})),...anon.slice(0,4).map(v=>({v,k:"ghen",d:8})),...anon.slice(4,6).map(v=>({v,k:"oán",d:-3}))];
  const P=(n,t,c)=>`<span class="ef t">${n}:</span> <span class="ef ${c}">${t}</span>`;window.__G=[P(kaWho(named[0]||q),'thiện cảm +6','g'),P('một vị Phi','thiện cảm +2','g'),'<span class="ef g">Sủng +3</span>'];window.__B=[P(kaWho(q),'thiện cảm −4','r'),'<span class="ef r">Sức −10</span>'];
  const o=kaResultRows;kaResultRows=function(){return [window.__G.slice(),window.__B.slice(),window.__K]};
  return {nNamed:(q&&q!==S?1:0)+Math.min(1,named.length),g:Math.min(4,anon.length),o:Math.max(0,Math.min(2,anon.length-4))}});
 const read=sel=>p.evaluate(sel=>[...document.querySelectorAll(sel+' .kr')].map(r=>({l:r.querySelector('.krl').textContent,L:[...r.querySelectorAll('.krv>.kitem')].map(x=>{const t=x.querySelector('.ef.t'),v=x.querySelector('.ef:not(.t)');return {t:x.textContent.trim(),top:Math.round(x.getBoundingClientRect().top),same:!t||!v||Math.abs(t.getBoundingClientRect().top-v.getBoundingClientRect().top)<4}})})),sel);
 const judge=(where,rows)=>{const kem=rows.find(r=>r.l==='Kèm');chk(`${dev} ${where} Kèm row`,!!kem);if(!kem)return;
  const T=kem.L.map(x=>x.t);chk(`${dev} ${where} Kèm: ${ex.nNamed} named + grouped lines`,kem.L.length===ex.nNamed+(ex.g?1:0)+(ex.o?1:0),JSON.stringify(T));
  if(ex.g>1)chk(`${dev} ${where} strangers grouped «${ex.g} vị khác: ghen +8»`,T.includes(`${ex.g} vị khác: ghen +8`),JSON.stringify(T));
  chk(`${dev} ${where} a named person once`,new Set(T).size===T.length,JSON.stringify(T));
  for(const r of rows.filter(r=>/^(Kèm|Được|Mất)$/.test(r.l))){const tops=r.L.map(x=>x.top);chk(`${dev} ${where} ${r.l}: one line per row`,new Set(tops).size===tops.length,JSON.stringify(r.L));chk(`${dev} ${where} ${r.l}: name on its value's row`,r.L.every(x=>x.same));chk(`${dev} ${where} ${r.l}: no row starts «một vị»`,r.L.every(x=>!/^một vị/.test(x.t)),JSON.stringify(r.L.map(x=>x.t)))}};
 await p.evaluate(()=>{document.querySelectorAll('#kload,#kboot,#kcover,#dawn').forEach(e=>e.remove())/* the boot cover «Sửa soạn nhập cung» is not part of this check */;try{kmReset()}catch(e){}kmFree=()=>true;kitNightEnd({tier:"normal",m0:1,m1:1,before:rsnap()})});
 for(let i=0;i<30;i++){if(await p.evaluate(()=>!!document.querySelector('.kne.km-done')))break;await p.waitForTimeout(400)}await p.waitForTimeout(900);
 judge('night card',await read('.kne'));if(OUT){await p.waitForTimeout(3000);await p.screenshot({path:`${OUT}/${dev}-kne.png`})}
 await p.evaluate(()=>{try{kmReset()}catch(e){}resultShow('Thỉnh an Hoàng hậu',rsnap(),true)});await p.waitForTimeout(900);
 judge('result toast',await read('#rtoast'));if(OUT)await p.screenshot({path:`${OUT}/${dev}-rtoast.png`});
 /* on screen (RV-KK41 nits): «(42)» totals in the real toast once kaNT exists (skip-marked before act-merge-J0 lands); a K.more-only Kèm still makes the card */
 const scr=await p.evaluate(async()=>{const nat=typeof kaNT==="function";const R=liveRivals(true);const v=R.find(x=>kaNamed(x))||R[0];const o=kaResultRows;
  const show=async K=>{kaResultRows=function(){return [[],[],K]};try{kmReset()}catch(e){}resultShow('Thử',rsnap(),true);await new Promise(r=>setTimeout(r,600));const t=document.getElementById('rtoast');return {on:!!t&&t.classList.contains('on'),kem:t?[...t.querySelectorAll('.kr-kem .kitem')].map(x=>x.textContent.trim()):[]}};
  const a=await show([{v,k:"ghen",d:8,t:42}]);const M=[];M.more=3;const b=await show(M);kaResultRows=o;return {nat,a,b}});
 if(scr.nat)chk(`${dev} toast shows the total «ghen +8 (42)»`,scr.a.kem.some(x=>/ghen \+8 \(42\)$/.test(x)),JSON.stringify(scr.a));else console.log(`SKIP ${dev} toast «(42)» total: kaNT not on this base (act-merge-J0 / one-sieve brings it)`);
 chk(`${dev} K.more-only Kèm still shows the card`,scr.b.on&&scr.b.kem.length===1&&scr.b.kem[0]==='3 người khác trong cung đổi lòng chút ít',JSON.stringify(scr.b));
 /* ONE-SIEVE points (MAIN 158): totals «ghen +8 (42)» on a named / single line (kaNT, x.t), none on a group; K.more counted in the tail; only K.more → «N người khác trong cung đổi lòng chút ít» */
 const os=await p.evaluate(()=>{const R=liveRivals(true);const nm=R.filter(v=>kaNamed(v)),an=R.filter(v=>!kaNamed(v));if(typeof kaNT!=="function")window.kaNT=(n,t)=>kaN(n)+(t==null?"":` (${Math.round(t)})`);
  const T=h=>{const d=document.createElement('div');d.innerHTML=h;return [...d.querySelectorAll('.kitem')].map(x=>x.textContent.trim())};
  const K=[{v:nm[0],k:"ghen",d:8,t:42},{v:an[0],k:"oán",d:3,t:20},{v:an[1],k:"ghen",d:8,t:30},{v:an[2],k:"ghen",d:8,t:31}];K.more=5;const M=[];M.more=4;
  const A=R.slice(0,10).map((v,i)=>({v,k:"oán",d:i+1}));A.all=1;A.more=2;
  return {a:T(kitKemRow(K)),b:T(kitKemRow(M)),c:kitKemRow([]),all:T(kitKemRow(A)),n:R.slice(0,10).length}});
 chk(`${dev} K.all: every line, no 8-cap, K.more still counted`,os.all.length===os.n+1&&os.all[os.all.length-1]==='… và 2 người khác',JSON.stringify(os.all));
 chk(`${dev} ONE-SIEVE named total «ghen +8 (42)»`,os.a.some(x=>/: ghen \+8 \(42\)$/.test(x)),JSON.stringify(os.a));
 chk(`${dev} ONE-SIEVE single stranger total «oán +3 (20)»`,os.a.some(x=>/^Một vị .*: oán \+3 \(20\)$/.test(x)),JSON.stringify(os.a));
 chk(`${dev} ONE-SIEVE group «2 vị khác: ghen +8» has no total`,os.a.includes('2 vị khác: ghen +8'),JSON.stringify(os.a));
 chk(`${dev} ONE-SIEVE K.more tail «… và 5 người khác»`,os.a.includes('… và 5 người khác'),JSON.stringify(os.a));
 chk(`${dev} ONE-SIEVE only K.more`,os.b.length===1&&os.b[0]==='4 người khác trong cung đổi lòng chút ít'&&os.c==='',JSON.stringify([os.b,os.c]));
 chk(`${dev} no page errors`,!errs.length,errs.join(' | '));await ctx.close()}
await b.close();console.log(fails?`KIT-KEM-ROW FAIL ${fails}`:'KIT-KEM-ROW PASS');process.exit(fails?1:0)})();
