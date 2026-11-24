/* kyngo-shots: the kỳ ngộ card on the two priority devices (law 12) — a choice card (th_kinh: Thái hậu), a card with a found piece
   (vat_lac: kitItemTag), the result card, and the Sổ luân hồi block. Checks: no horizontal overflow, options inside the screen, 0 page errors.
   usage: node dev/test/kyngo-shots.js <url of the SITE index.html> <outdir> [WxH@dpr,...]  → shots <outdir>/<size>-<n>.png, last line PASS / FAIL n */
const {chromium}=require('playwright');const [,,URL,OUT,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));const fs=require('fs');fs.mkdirSync(OUT,{recursive:true});
const VPS=(SIZES||"755x1000@2,1180x820@2").split(",");
(async()=>{const b=await chromium.launch();let fail=0;const ck=(n,ok,i)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(i?' · '+JSON.stringify(i).slice(0,200):''))};
 for(const sz0 of VPS){const [sz,dpr]=sz0.split("@");const [W,H]=sz.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.KY);await sleep(3000);
  await p.addStyleTag({content:'#kroul,.kroul,.krbox,.kcf-w,.kmov.kcf,#kload,#klife{display:none!important}'});
  /* Sổ luân hồi on the title screen (the real place: j74 «Sổ luân hồi» button → pastHTML, j97 block + the kỳ ngộ block) */
  await p.evaluate(()=>{try{localStorage.setItem("ctm-kyngo",JSON.stringify({ma_phe:{n:1,first:{who:"Thẩm Như Ý",o:"Con gái Tể tướng",y:1}},de_mua:{n:2,first:{who:"Thẩm Như Ý",o:"Con gái Tể tướng",y:2}}}))}catch(e){}});
  await p.evaluate(()=>{const b=document.querySelector('[data-tgo="past"]');if(b)b.click()});{await sleep(1500);await p.screenshot({path:`${OUT}/${sz}-0-book.png`});
   const t=await p.evaluate(()=>document.body.innerText.includes("kỳ ngộ đã gặp"));ck(`${sz} Sổ luân hồi shows the kỳ ngộ block`,t)}
  await p.evaluate(()=>{const M=document.getElementById('modal');Q.length=0;if(M)M.hidden=true;/* this test checks the CARD frame: the kỳ ngộ dialogue scene (jdlgs, wave 2) would hide the card until tapped through — dlgs-play checks the scenes */try{BAL.dlgs.on=false}catch(e){}});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!isSrv())break}Q.length=0;render()});
  await sleep(2500);
  const force=async id=>p.evaluate(id=>{Q.length=0;S.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const k in KY.DEF)if(k!==id)S.ky.seen[k]=0;BAL.kyngo.p0=100;BAL.kyngo.pity=0;
   const gg=id==="vat_lac_g";if(gg){id="vat_lac";delete S.ky.seen.vat_lac}const D=KY.DEF[id];if(id==="th_kinh"){D._w=D.when;D.when=null}
   if(id==="vat_lac"&&!gg){const v=liveRivals(true).find(x=>(x.inv||[]).some(e=>e&&loOk(e)));if(v)loLose(v,{cause:"mis"});Q.length=0}
   /* r2 F4: a piece whose NAME holds a bad-sounding word («Son điểm giáng») — its gain must stay under ĐƯỢC, never TỐN */
   if(gg){const v=liveRivals(true)[0];const e={k:"lxson2",from:"shot"};v.inv=v.inv||[];v.inv.push(e);const lc=loLoseE(v,e,"mis");Q.length=0;KY.DEF.vat_lac._x=KY.DEF.vat_lac.what;KY.DEF.vat_lac.what=()=>lc?{lc}:null}
   const k=D.pl[0]==="*"?"vuon":D.pl[0];KY.arrive(S,k,"shot");if(D._w)D.when=D._w;if(D._x){D.what=D._x;delete D._x}showModal();return Q[0]&&Q[0].evId||"none"},id);
  const shot=async n=>{await sleep(1500);await p.screenshot({path:`${OUT}/${sz}-${n}.png`});
   const m=await p.evaluate(()=>{const M=document.getElementById('modal');const r=M&&M.getBoundingClientRect();const o=[...document.querySelectorAll('#modal .opt')].map(x=>x.getBoundingClientRect()).filter(x=>x.width);
    return {open:!!M&&!M.hidden,ovx:document.documentElement.scrollWidth>innerWidth+1,optsIn:o.every(x=>x.bottom<=innerHeight+1&&x.right<=innerWidth+1),n:o.length}});return m};
  let id=await force("th_kinh");let m=await shot("1-choice");ck(`${sz} choice card (${id})`,m.open&&!m.ovx&&m.optsIn&&m.n>=2,m);
  await p.evaluate(()=>{const o=document.querySelector('#modal .opt');if(o)o.click()});m=await shot("2-result");ck(`${sz} result card`,m.open&&!m.ovx,m);
  id=await force("vat_lac");m=await shot("3-found-piece");ck(`${sz} found piece card (${id})`,id==="kyngo:vat_lac"&&m.open&&!m.ovx&&m.optsIn,m);
  await p.evaluate(()=>{Q.length=0;const M=document.getElementById('modal');if(M)M.hidden=true});
  id=await force("vat_lac_g");m=await shot("4-found-giang");
  const g=await p.evaluate(()=>[...document.querySelectorAll('#modal .opt')].map(o=>{const t=o.innerText.replace(/\s+/g," ");const j=t.search(/ĐƯỢC/),k=t.search(/TỐN/);const i=t.search(/giáng|món đồ/);return {t:t.slice(0,220),inGain:j>=0&&!/chẳng được gì/.test(t),underCost:/giáng|món đồ/.test(t.slice(k,j>k?j:undefined))}}));
  ck(`${sz} «giáng» piece: both options have a ĐƯỢC row (no «chẳng được gì»), no piece words under TỐN`,id==="kyngo:vat_lac"&&g.length===2&&g.every(x=>!x.underCost&&x.inGain),{id,g});
  ck(`${sz} page errors`,errs.length===0,errs);await ctx.close()}
 console.log(fail?`FAIL ${fail}`:'PASS');await b.close();process.exit(fail?1:0)})();
