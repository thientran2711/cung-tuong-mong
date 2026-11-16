/* C39 tab-underline scan: every tab/chip row, every main tab, every sub-tab / chip click, at all test viewports.
   Per row: visible scrollbar (offsetHeight-clientHeight with real scrollbars on), stray .kftl line outside #tabs, line crossing a chip (.kftl overlapping a .pct).
   usage: node dev/test/tab-underline-scan.js <url> [<W>x<H>@dpr ...]   exit 1 if any fault */
const {chromium}=require('playwright');const URL=process.argv[2];let SIZES=process.argv.slice(3);
if(!SIZES.length)SIZES=['755x1000@2','1000x755@2','1180x820@2','1366x1024@2','844x390@3','390x844@3','412x1058@2'];
const ROWS=".pctabs,.kcattabs,.ksub,.ksubs,.kmc-tabs,.kchips,.chips,.relsel,.hud2,.j59strip,#tabs";
(async()=>{const b=await chromium.launch({ignoreDefaultArgs:['--hide-scrollbars']});const out={};let bad=0;const errs=[];
for(const SZ of SIZES){const [wh,d]=SZ.split('@');const [W,H]=wh.split('x').map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 p.on('pageerror',e=>errs.push(SZ+' '+e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof KIT_INFOM!=='undefined'&&(KIT_INFOM.have||[]).length>0&&(KIT_ACTS.have||[]).length>0,null,{timeout:60000});
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=200;render()});
 const scan=ROWS_=>p.evaluate(sel=>{const res=[];document.querySelectorAll(sel).forEach(r=>{if(!r.offsetWidth||!r.offsetHeight)return;const cs=getComputedStyle(r);const over=r.scrollWidth>r.clientWidth+1&&cs.overflowX!=='visible';
   const sb=r.offsetHeight-r.clientHeight-(parseFloat(cs.borderTopWidth)||0)-(parseFloat(cs.borderBottomWidth)||0);const wk=getComputedStyle(r,'::-webkit-scrollbar').display;
   const trackVisible=over&&(sb>1||r.matches('.pctabs,.kcattabs,.ksub,.ksubs,.kmc-tabs,.kchips,.chips,.relsel,.hud2,.j59strip'))&&cs.scrollbarWidth!=='none'&&wk!=='none';
   const ln=[...r.querySelectorAll(':scope>.kftl')].filter(l=>l.style.opacity!=='0');const stray=r.id==='tabs'?0:ln.length;
   res.push({cls:(r.id?'#'+r.id:r.className.toString().replace(/\s+/g,'.')).slice(0,48),over,trackVisible,stray})});
   const strayAll=[...document.querySelectorAll('.kftl')].filter(l=>!l.parentElement||!l.parentElement.matches('#tabs')).length;return{res,strayAll}},ROWS);
 const acc={rows:0,over:0,track:0,stray:0,bad:[]};
 const add=(tag,r)=>{r.res.forEach(x=>{acc.rows++;if(x.over)acc.over++;if(x.trackVisible){acc.track++;acc.bad.push(tag+' track '+x.cls)}if(x.stray){acc.stray++;acc.bad.push(tag+' stray '+x.cls)}});if(r.strayAll){acc.stray+=r.strayAll;acc.bad.push(tag+' kftl outside #tabs x'+r.strayAll)}};
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));
 for(const t of tabs){await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()},t);await p.waitForTimeout(450);add(t,await scan());
  /* click every sub-tab / chip of the pane (max 14 per tab) */
  const n=await p.evaluate(()=>document.querySelectorAll('#panel .ksubb,#panel .pct,#panel .kcattabs [data-kcat]').length);
  for(let i=0;i<Math.min(n,14);i++){await p.evaluate(i=>{const l=document.querySelectorAll('#panel .ksubb,#panel .pct,#panel .kcattabs [data-kcat]');const e=l[i];if(e&&e.offsetParent){e.scrollIntoView({inline:'center',block:'nearest'});e.click()}},i);await p.waitForTimeout(250);add(t+'#'+i,await scan())}}
 out[SZ]={rows:acc.rows,scrolling:acc.over,visibleTrack:acc.track,strayLine:acc.stray,bad:[...new Set(acc.bad)].slice(0,8)};bad+=acc.track+acc.stray;await ctx.close()}
console.log(JSON.stringify({bad,out,errs},null,1));await b.close();process.exit(bad||errs.length?1:0)})();
