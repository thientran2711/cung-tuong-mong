/* RANK + NAME KIT SCAN (kit-rank-name, owner 17/11 ~16:20Z item b). Lists every on-screen place that prints a rank and/or a name, the FORM used
   (stack = rank line over name line, line = "rank name" on one line, bare = name only, rank-only), and flags DUPLICATES (the same rank word printed twice in one card/frame).
   Surfaces scanned: every panel tab, then person dialog, result line / log, week book. usage: node rank-name-scan.js <url> <W>x<H> [--table] ; exit 1 on any duplicate.
   Allowed: STACK on avatars, portrait frames, figure feet, person card headers; LINE only in result lines (log, toasts, option lines) and Tuần lục (week book). */
const {chromium}=require('playwright');const [,,URL,SZ,FLAG]=process.argv;const [W,H]=(SZ||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0});
 for(let i=0;i<60;i++){const v=await p.evaluate(()=>{const kc=document.querySelector('[data-km-close]');if(kc){kc.click();return 1}const o=document.getElementById('kmrew');if(o){o.remove();return 1}return 0});if(!v&&i>8)break;await p.waitForTimeout(600)}
 const SCAN=()=>p.evaluate(()=>{
  const RK=new Set(["Hoàng hậu","Hoàng quý phi","Quý phi","Phi","Tần","Quý nhân","Thường tại","Đáp ứng","Thái hậu","Hoàng thượng","Cung nữ","Thái giám","Thái y","Thị vệ","Ma ma","Cô cô","Cung nữ thân tín","Tổng quản thái giám","Phế phi","Vương gia","Hoàng tử","Công chúa"]);
  try{RANKS.forEach(r=>RK.add(r.n))}catch(e){}
  const vis=e=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return false;const s=getComputedStyle(e);return s.visibility!=='hidden'&&s.display!=='none'&&s.opacity!=='0'};
  const T=e=>(e.textContent||'').replace(/\s+/g,' ').trim();
  const rkIn=t=>{let best='';for(const r of RK)if((t===r||t.startsWith(r+' '))&&r.length>best.length)best=r;return best};
  const out=[];
  /* element kinds: rank-bearing and name-bearing */
  const KINDS=[['.knr','stack'],['.kpsn','stack'],['.pc .pcl','stack'],['.stage .tok .tag, #j59metag .tag','stack'],['.kname','kname'],['.krl','line'],['.klab','rank-only'],['.kpod-plq','stack'],['.kbk-pname','stack'],['.pface','stack']];
  const roots=new Set();for(const s of ['.pc','.kpsn','.pface','.stage .tok','#j59metag','.kpl','.kpod-plq','.kbk-pname','.krv','.ksh .k3c','.kpstrip>*'])document.querySelectorAll(s).forEach(e=>vis(e)&&roots.add(e));
  const rows=[];
  for(const r of roots){const ranks=[];const PROSE='p,li,button,.opts,.spkt,.logs,.kpnote,.kft,.krv,td,.kpsub,.past,.kbk-pg>p';const add=(e,how)=>{if(!vis(e)||e.closest(PROSE))return;const t=T(e);if(!t||t.length>80)return;const rk=rkIn(t);if(rk)ranks.push({how,rk,t})};
   r.querySelectorAll('.kti,.krt,.knr-r,.pcrk,.klab,.j59t,.kpsn small,.krl-r').forEach(e=>add(e,e.className.toString().split(' ')[0]||e.tagName));
   r.querySelectorAll('.pcname,.krn,.knr-n,.j59n,.kpsn b,.kname,.krl-n').forEach(e=>{if(!vis(e)||e.closest('p,li,button,.opts,.spkt,.logs'))return;const kt=e.querySelector('.kti');const t=T(kt?{textContent:T(e).slice(T(kt).length).trim()}:e);const rk=rkIn(t);if(rk&&t!==rk)ranks.push({how:'in-name-line:'+(e.className.toString().split(' ')[0]||e.tagName),rk,t})});
   if(!ranks.length)continue;const cnt={};ranks.forEach(x=>cnt[x.rk]=(cnt[x.rk]||0)+1);const dup=Object.entries(cnt).filter(([k,v])=>v>1).map(([k,v])=>k+'×'+v);
   const form=r.querySelector('.knr,.pcrk,.klab,.j59t,.kti')?(r.querySelector('.knr,.pcrk,.klab,.j59t')?'stack':'line'):'?';
   rows.push({root:(r.id?'#'+r.id:'')+'.'+(r.className.toString().split(' ').slice(0,2).join('.')),ranks:ranks.map(x=>x.how+':'+x.rk).join(' | '),form,dup:dup.join(',')})}
  /* FORM AUDIT: every .kname / .knr as it is RENDERED (kti block = stacked) against where the owner allows each form */
  const OKLINE='p,li,.logs,.kbk-pg,.kbk,.kbk-toc,.toast,#toast,.opts,button,.krv,td,.kpnote,.kft,.past,.kmsg,.kn';
  document.querySelectorAll('.kname,.knr').forEach(e=>{if(!vis(e))return;const kt=e.querySelector('.kti,.knr-r');if(!kt)return;const stacked=e.classList.contains('knr')||getComputedStyle(kt).display==='block'||getComputedStyle(e).display.includes('flex')&&getComputedStyle(e).flexDirection==='column';
   const inProse=!!e.closest(OKLINE);const where=(e.closest('[id],.dlg,.pc,.kpsn,.stage,.krv,.ksh,.kbk')||e.parentElement||{className:''}).className.toString().split(' ').slice(0,2).join('.');
   if(!stacked&&!inProse)rows.push({root:'LINE-OUTSIDE '+where,ranks:T(e).slice(0,50),form:'line-misplaced',dup:'line form outside result/Tuần lục'});
   if(stacked&&inProse&&!e.closest('.k-cover')&&e.closest('p,li,.logs,.kbk-pg'))rows.push({root:'STACK-IN-PROSE '+where,ranks:T(e).slice(0,50),form:'stack-misplaced',dup:'stacked form inside a result line / Tuần lục text'})});
  return rows});
 const tabs=['rv','go','staff','kid','court','rel','men','fac','inv','story','log'];const all=[];
 for(const t of tabs){await p.evaluate(t=>{tab=t;render()},t);await p.waitForTimeout(1300);(await SCAN()).forEach(r=>all.push(Object.assign({surface:'tab '+t},r)))}
 /* dialog with a person + result line */
 await p.evaluate(()=>{Q.length=0;const v=liveRivals(true)[0];Q.push({t:'Có người đến',who:pv(v),h:`<p>${v.name} sang thăm.</p>`,opts:[{n:'Tiếp',fx:{},x:'thân +3',go:()=>{}}]});showModal()});await p.waitForTimeout(1500);
 (await SCAN()).forEach(r=>all.push(Object.assign({surface:'person dialog'},r)));
 await p.evaluate(()=>{Q.length=0;const R=liveRivals(true),v=R[0],v2=R[1]||R[0];Q.push({t:'Có người đến',stage:[v,v2],who:pv(v),h:`<p>${v.name} cùng ${v2.name} sang thăm.</p>`,opts:[{n:'Tiếp',fx:{},x:'thân +3',go:()=>{}}]});showModal()});await p.waitForTimeout(1500);
 (await SCAN()).forEach(r=>all.push(Object.assign({surface:'two-person dialog'},r)));
 await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{dawn()}catch(e){console.log('dawn',e.message)}});await p.waitForTimeout(3500);
 (await SCAN()).forEach(r=>all.push(Object.assign({surface:'Tuần lục book'},r)));
 if(process.env.SHOT)await p.screenshot({path:process.env.SHOT,type:'jpeg',quality:80});
 await b.close();
 const dups=all.filter(r=>r.dup);const bySurf={};all.forEach(r=>{const k=r.surface+' · '+r.form;bySurf[k]=bySurf[k]||{n:0,dup:0};bySurf[k].n++;if(r.dup)bySurf[k].dup++});
 if(FLAG==='--table'){console.log('surface · form | places | with duplicate rank');Object.entries(bySurf).forEach(([k,v])=>console.log(`${k} | ${v.n} | ${v.dup}`))}
 dups.forEach(r=>console.log(`DUP ${r.surface} ${r.root} → ${r.dup} :: ${r.ranks}`));
 console.log(dups.length?`RANK-NAME-SCAN FAIL · ${dups.length} of ${all.length} places print a rank twice`:`RANK-NAME-SCAN OK · ${all.length} places, no rank twice`);console.log('errors',JSON.stringify(errs));process.exit(dups.length?1:0)})();
