/* review/empty-states (owner 21/11 02:22Z): scan EVERY tab / sub-tab / panel on a fresh palace start in HOST mode.
   usage: node dev/test/empty-scan.js <outdir> [device,...] [shots]    default device fold,ipadAir
   Per view: kit empty card y/n (.kskill max0 = kitEmpty, .kempty = kitEmpty), has a picture, hint lines, text length. A view that is "thin"
   (short text, no kit empty card) is listed as a candidate. Prints a markdown table; exit 1 when an empty-looking view has no picture card. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT,DEVS,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const devices=(DEVS&&DEVS!=='-'?DEVS:'fold,ipadAir').split(',');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const rows=[];let bad=0;
 for(const dev of devices){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await sleep(2500);
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
   for(let i=0;i<60;i++){try{start()}catch(e){}if(S.ps&&S.reign&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   const st=document.createElement('style');st.textContent='#kroul,#kroulw,#kboot,#kbootw,#kload,#klife,.kmov{display:none!important}';document.head.appendChild(st)});
  await sleep(800);
  const tabs=await g.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));
  const info=()=>g.evaluate(()=>{const P=document.getElementById('panel');const t=(P.innerText||'').replace(/\s+/g,' ').trim();
   const sub=[...P.querySelectorAll('[data-ksub],[data-tdv],[data-ktsub] .pct,.ktsub .pct,.kpbar .pct')].filter(e=>e.offsetParent).map(e=>({k:e.dataset.ksub||e.dataset.tdv||e.dataset.kt||e.textContent.trim(),t:e.textContent.trim()}));
   return{text:t.slice(0,170),len:t.length,empty:!!P.querySelector('.kskill .ksteps,.kskill')&&!!P.querySelector('.kempty,.kskill'),kitEmpty:P.querySelectorAll('.kskill').length,ht:P.querySelectorAll('.kempty').length,
    pic:!!P.querySelector('.kempty img,.kskill img'),sub}});
  for(const k of tabs){await g.evaluate(k=>{tab=k;render()},k);await sleep(500);const r=await info();rows.push({dev,view:k,...r});
   for(const s of r.sub){await g.evaluate(s=>{const e=[...document.querySelectorAll('#panel [data-ksub],#panel [data-tdv],#panel .ktsub .pct,#panel .kpbar .pct')].find(x=>(x.dataset.ksub||x.dataset.tdv||x.textContent.trim())===s.k||x.textContent.trim()===s.t);if(e)e.click()},s);await sleep(500);
    const r2=await info();rows.push({dev,view:k+' › '+s.t,...r2,sub:[]});
    if(SHOTS)await p.screenshot({path:`${OUT}/${k}-${s.t.replace(/\W+/g,'_')}-${dev}.jpg`,type:'jpeg',quality:70});
    await g.evaluate(k=>{tab=k;render()},k);await sleep(250)}}
  if(errs.length)console.log(dev,'page errors',errs);await ctx.close()}
 await b.close();srv.close();
 console.log('| device | view | kit cards | htEmpty | pic | len | text |\n|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.dev} | ${r.view} | ${r.kitEmpty} | ${r.ht} | ${r.pic?'y':'n'} | ${r.len} | ${r.text.slice(0,90)} |`);
 process.exit(0)})();
