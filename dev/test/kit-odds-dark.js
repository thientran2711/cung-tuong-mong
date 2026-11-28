/* KIT §53.d (KK59 + RV-175 FAIL-1 KK60): the odds word inside every kit button kind × enabled/disabled × 7 words must be readable on the button's own face:
   on every DARK face (luminance < .2) contrast(word colour, face colour) ≥ 3 (light faces keep the kit ladder colours, not judged here) (face = the button's background-color or the first gradient stop, after its own filter is ignored: grayscale keeps luminance).
   FAILS on bd1bf3d0 (disabled dark .kbtn: ladder word red/green on red). usage: node dev/test/kit-odds-dark.js <file:///…/index.html> <outdir> [WxH,...] (stills DSF=2) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DSF||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitOdds==='function',null,{timeout:240000});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const W=['Mong manh','Hiểm','Khó lường','Tùy duyên','Có cơ','Vững','Rất vững'];
   const box=document.createElement('div');box.id='kodtest';box.style.cssText='position:fixed;inset:0;z-index:99999;background:#f6efe2;overflow:auto;padding:6px;display:grid;grid-template-columns:repeat(4,1fr);gap:4px;align-content:start';
   const kinds=[['kbtn',''],['kbtn kdanger',''],['kbtn alt',''],['kbtn kdone','']];let h='';
   for(const w of W)for(const [c] of kinds)for(const dis of [0,1])h+=`<div class="${dis?'kshc-no':''}"><button class="${c}" ${dis?'disabled':''} style="width:100%;font-size:.7rem;padding:4px">${c.replace('kbtn ','')||'chính'}${dis?' ⦸':''} ${kitOdds(w)}</button></div>`;
   h+=W.map(w=>`<div class="kcol-act"><button class="kbtn kdone" style="width:100%;font-size:.7rem;padding:4px">kcol kdone ${kitOdds(w)}</button></div>`).join('');h+=['kshc','kri-acts'].map(g=>W.map(w=>`<div class="${g}"><button class="kbtn" disabled style="width:100%;font-size:.7rem;padding:4px">${g} ⦸ ${kitOdds(w)}</button></div>`).join('')).join('');
   box.innerHTML=h;document.body.appendChild(box);
   const rgb=s=>{const m=String(s).match(/[\d.]+/g);return m?m.slice(0,3).map(Number):null};
   const lum=c=>{const a=c.map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*a[0]+.7152*a[1]+.0722*a[2]};
   const out=[];box.querySelectorAll('button').forEach(bt=>{const cs=getComputedStyle(bt);let f=rgb(cs.backgroundColor);const a=(cs.backgroundColor.match(/[\d.]+/g)||[])[3];
    if(!f||a==='0'){const g=cs.backgroundImage.match(/(rgba?\([^)]*\)|#[0-9a-f]{3,6})/gi);const L=g?g.filter(x=>!/rgba\([^)]*,\s*0(\.0+)?\)/.test(x)):[];const c=L[L.length-1];if(c){if(c[0]==='#'){const x=c.length===4?c.slice(1).split('').map(y=>y+y).join(''):c.slice(1);f=[0,2,4].map(i=>parseInt(x.substr(i,2),16))}else f=rgb(c)}}
    const wb=bt.querySelector('.kodm b');if(!wb||!f)return;const t=rgb(getComputedStyle(wb).color);const l1=lum(t),l2=lum(f),cr=(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);
    if(bt.closest('.kcol-act')&&l1>.8)out.push(`${bt.textContent.trim().slice(0,40)} light word on a light .kcol-act kdone`);if(l2<.2&&cr<3)out.push(`${bt.textContent.trim().slice(0,40)} word ${t} face ${f} contrast ${cr.toFixed(2)}`)});return {n:box.querySelectorAll('button').length,out}});
  await p.screenshot({path:`${OUT}/odds-${W}.png`});
  console.log(wh,'buttons',r.n,'unreadable',r.out.length);r.out.slice(0,12).forEach(x=>console.log('  BAD',x));bad+=r.out.length;if(errs.length)console.log(wh,'errs',errs.slice(0,3));await ctx.close()}
 console.log(bad?`KIT-ODDS-DARK FAIL ${bad}`:'KIT-ODDS-DARK OK');process.exitCode=bad?1:0;await b.close()})();
