/* LUẬT SỬA CẢ NHÓM scan (owner 11/15 15:30Z, 16:50Z, 17:16Z): the relation words and small avatars as they appear ON SCREEN across the game.
   usage: node dev/test/rel-words-scan.js <url> [W]x[H]
   Opens every bottom tab (and every person in its strip, up to 6), the Tuần lục book, and counts on the visible text:
     natalt  "Nàng ta oán ta" / "Nàng ta → ta" / "Nàng ta ghen"           (VP turned a kit label into nonsense)
     bare    a relation label that is only "thiện cảm"/"Thiện cảm" with a number, no subject, on a person card or table
     than    "thân ±N" (old word for NPC ↔ NPC thiện cảm)
     frac    a number with a decimal part in a stat / relation context
     box     a small avatar (.md.kfc) with a ring / background box behind the frame
   Prints one JSON line {counts, samples}. Exit 0 always (it is a scan: compare before/after). */
const {chromium}=require('playwright');const [,,URL,SZ]=process.argv;const [W,H]=(SZ||'1180x820').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();window.__bot=true;tmPlace(S,12);
  S.met=S.met||{};for(const v of liveRivals(false))S.met[v.id]=wk();S.wkSnap=wkSnap();for(let n=0;n<6;n++){Q.length=0;S.mg=null;used=4;try{nextBuoi()}catch(e){}}Q.length=0;render()});
 const C={natalt:0,bare:0,than:0,frac:0,box:0,rows:0,screens:0};const S0={natalt:[],bare:[],than:[],frac:[],box:[],rows:[]};
 const scan=async(where)=>{await p.waitForTimeout(700);const r=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).visibility!=='hidden'};
   const txt=document.body.innerText;const o={natalt:[],bare:[],than:[],frac:[],box:[],rows:[]};for(const m of txt.matchAll(/.{0,30}oán ta \d.{0,12}/g))o.rows.push(m[0]);
   for(const m of txt.matchAll(/.{0,30}[Nn]àng ta (?:oán ta|→ ta|ghen).{0,10}/g))o.natalt.push(m[0]);
   for(const m of txt.matchAll(/.{0,30}(?<![\p{L}])thân [+\-−]\s?\d.{0,5}/gu))o.than.push(m[0]);
   for(const m of txt.matchAll(/.{0,25}(?:Sủng|Danh|Đức|oán|ghen|thiện cảm|Thiện cảm|tin cậy|Thái hậu|Hoàng hậu)[^\n\d]{0,12}[+\-−]?\d+[.,]\d+.{0,5}/g))o.frac.push(m[0]);
   for(const e of document.querySelectorAll('.krel,.kst-chip small,.kpc small,.krt-l,.kr3k')){if(!vis(e)||e.closest('.ef,.kchip,.krd,.k3v'))continue;/* act-card deltas "thiện cảm +10" and the servant bar "Thiện cảm" are the VANPHONG §1 words (owner 09:55Z, 10:10Z) */const t=e.innerText.trim();if(/^thiện cảm:?$/i.test(t))o.bare.push(t+' @'+(e.parentElement.closest('[class]')||{}).className+' | '+(e.parentElement.closest('[class]')||{}).innerText.slice(0,60))}
   for(const e of document.querySelectorAll('span.md.kfc')){if(!vis(e))continue;const cs=getComputedStyle(e);if(cs.boxShadow!=='none'||cs.backgroundColor!=='rgba(0, 0, 0, 0)'||cs.backgroundImage!=='none')o.box.push(cs.boxShadow.slice(0,40))}
   return o});
  C.screens++;for(const k in r){C[k]+=r[k].length;for(const s of r[k])if(S0[k].length<4)S0[k].push(where+': '+s.replace(/\s+/g,' '))}};
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab).filter(t=>t!=='go'));
 for(const t of tabs){await p.evaluate(t=>{try{const b=document.querySelector(`#tabs [data-tab=${t}]`);b&&b.click()}catch(e){}},t);await scan('tab '+t);
  const n=await p.evaluate(()=>document.querySelectorAll('#panel .pager button,#panel .kpstrip button,#panel .kpplist>button').length);
  for(let i=0;i<Math.min(6,n);i++){await p.evaluate(i=>{const L=document.querySelectorAll('#panel .pager button,#panel .kpstrip button,#panel .kpplist>button');L[i]&&L[i].click()},i);await scan(`tab ${t} #${i}`)}}
 await p.evaluate(()=>{try{dawn()}catch(e){}});await p.waitForTimeout(3000);
 const pages=await p.evaluate(()=>window.__kbk?window.__kbk.max:0);for(let i=0;i<=pages;i++){await p.evaluate(i=>window.__kbk.go(i),i);await scan('book p'+i)}
 console.log(JSON.stringify({size:SZ||'1180x820',counts:C,samples:S0,errs:errs.slice(0,5)}));await b.close()})();
