/* Live book UI shots: every tab of the consort road (or the cung nữ road with "srv") on the real layout.
   usage: node dev/test/book-live.js <baseURL> <W>x<H>@dpr <outdir> <tag> [srv] [tabs,comma]
   Writes <tag>-<tab>.jpg; prints per tab: overflowX, stage backdrops (count of painted backdrop layers), errors. */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,TAG,ROAD,ONLY]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const SRV=ROAD==='srv';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(SRV=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();const srv=(typeof isSrv==='function'&&isSrv());if(srv===SRV)break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()},SRV);
 await p.waitForTimeout(1800);
 const tabs=ONLY?ONLY.split(','):await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab));
 const R=[];
 for(const t of tabs){
  await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()},t);await p.waitForTimeout(2200);
  await p.screenshot({path:`${OUT}/${TAG}-${t}.jpg`,type:'jpeg',quality:82});
  R.push(await p.evaluate(t=>{const vw=innerWidth;const st=document.getElementById('stage');
   const bgs=st?[st,...st.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();if(r.width<80||r.height<80)return false;const cs=getComputedStyle(e);return (cs.backgroundImage.includes('url(')&&!cs.backgroundImage.includes('svg'))||(e.tagName==='IMG'&&r.width>st.clientWidth*.6)}).map(e=>{const r=e.getBoundingClientRect();return `${e.tagName}.${String(e.className).slice(0,30)} ${Math.round(r.top)}+${Math.round(r.height)}`}):[];
   return{t,overflowX:document.documentElement.scrollWidth>vw,game:document.querySelector('.game').className,bgs:bgs.slice(0,6),curls:document.querySelectorAll('.kcl').length}},t))}
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})();
