/* kit-kem-row.js — KIT §7 kitKemRow + kitRows person rows (KK41, MAIN 157 ruling 26/11, RV-OB-VERDICT «Hoàng hậu Điền Chi Lan:một vị Quý phi: ghen +8 ghen +8 …»).
   Per device (Fold 755x1000, iPad 1180x820), in the night card (.kne) AND the result toast (#rtoast):
   - Kèm: one line per NAMED person «<Tên>: ghen +8», the strangers grouped «N vị khác: ghen +8» (per feeling + direction), a named person never twice;
   - every Kèm / Được / Mất line is its own row (distinct tops), the name «<Tên>:» on the same row as its value;
   - no line starts with «một vị» (capital at the start of a row).
   usage: node dev/test/kit-kem-row.js <index.html> [shotdir]   Exit 1 on a FAIL. Shots never go in git. */
const {chromium}=require('playwright');const fs=require('fs');const [,,SRC,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const html=fs.readFileSync(SRC);let fails=0;const chk=(n,ok,i)=>{if(!ok){fails++;console.log('FAIL',n,i||'')}else console.log('ok  ',n)};if(OUT)fs.mkdirSync(OUT,{recursive:true});
for(const [W,H] of [[755,1000],[1180,820]]){const dev=W<H?'fold':'ipad';const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=12345;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
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
 await p.evaluate(()=>{try{kmReset()}catch(e){}kmFree=()=>true;kitNightEnd({tier:"normal",m0:1,m1:1,before:rsnap()})});
 for(let i=0;i<30;i++){if(await p.evaluate(()=>!!document.querySelector('.kne.km-done')))break;await p.waitForTimeout(400)}await p.waitForTimeout(900);
 judge('night card',await read('.kne'));if(OUT)await p.screenshot({path:`${OUT}/${dev}-kne.png`});
 await p.evaluate(()=>{try{kmReset()}catch(e){}resultShow('Thỉnh an Hoàng hậu',rsnap(),true)});await p.waitForTimeout(900);
 judge('result toast',await read('#rtoast'));if(OUT)await p.screenshot({path:`${OUT}/${dev}-rtoast.png`});
 chk(`${dev} no page errors`,!errs.length,errs.join(' | '));await ctx.close()}
await b.close();console.log(fails?`KIT-KEM-ROW FAIL ${fails}`:'KIT-KEM-ROW PASS');process.exit(fails?1:0)})();
