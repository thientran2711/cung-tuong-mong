/* Ân sủng folded chip -> tap -> must open IN PLACE in the right column (no popover), inside the stage, values right-aligned, nothing cut.
   usage: node as2.js <url> <tag> <outdir>   (one browser context, resized through the 5 review sizes so the 123 MB core loads once) */
const {chromium}=require('./lib/pw-roulette');const [,,URL,TAG,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VPS=[[755,1000],[1000,755],[1180,820],[1366,1024],[844,390]];
(async()=>{const ctx=await chromium.launchPersistentContext(''+require("path").resolve(__dirname,"../../.ansung-prof")+'',{viewport:{width:1180,height:820},deviceScaleFactor:2,hasTouch:true});const b={close:()=>ctx.close()};
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console '+m.text().slice(0,300))});p.setDefaultTimeout(600000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:600000});
 for(let i=0;i<2400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;deal();render()});
 await sleep(2500);
 for(const [W,H] of VPS){await p.setViewportSize({width:W,height:H});await sleep(2500);
  const r=await p.evaluate(async()=>{for(let i=0;i<40&&!(document.getElementById('kshR')&&!document.getElementById('kshR').hidden);i++){Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}await new Promise(r=>setTimeout(r,500))}window.__kasOpen=false;const R=document.getElementById('kshR');{const st=document.getElementById('stage');let x=document.getElementById('crowdcss');if(!x){x=document.createElement('style');x.id='crowdcss';document.head.appendChild(x)}x.textContent='#kshR .k3cs .k3c{min-height:'+Math.ceil(st.clientHeight/4.2)+'px}'}if(R)R.dataset.full='';k3Stage();await new Promise(r=>setTimeout(r,600));
   const a=document.querySelector('#kshR [data-kasall]');if(!a)return{err:'no one-chip',R:R?(R.hidden+' kas:'+[...R.querySelectorAll('.kas')].map(x=>x.className).join('|')+' full:'+String(R.dataset.full).length+' w:'+R.dataset.w):'none',stop:!!document.querySelector('#stage .stop'),modal:!!(document.getElementById('modal')&&!document.getElementById('modal').hidden),maptab:!!document.querySelector('.game.maptab')};a.click();await new Promise(r=>setTimeout(r,800));
   const pop=document.querySelector('#kpop:not([hidden])');const P=document.querySelector('#kshR .kasopen');if(!P)return{err:'not opened in place',popover:!!pop};
   const st=document.getElementById('stage').getBoundingClientRect(),Rc=document.getElementById('kshR').getBoundingClientRect(),q=P.getBoundingClientRect();
   const cards=[...document.querySelectorAll('#kshR .k3c')].map(c=>Math.round(c.getBoundingClientRect().width));
   const cut=[...P.querySelectorAll('.k3r>b,.k3r>.k3l')].filter(e=>e.scrollWidth>e.clientWidth+1||e.getBoundingClientRect().right>q.right+0.5).map(e=>e.textContent);
   const rows=[...P.querySelectorAll('.k3r')].map(x=>{const b=x.querySelector('b');return [x.querySelector('.k3l').textContent,b.textContent,Math.round(x.getBoundingClientRect().right-b.getBoundingClientRect().right)]});
   const fold=P.querySelector('[data-kasfold]');
   const out={popover:!!pop,panelW:Math.round(q.width),cardW:cards,colR:Math.round(Rc.right),stageR:Math.round(st.right),colBottom:Math.round(Rc.bottom),stageBottom:Math.round(st.bottom),inStage:Rc.right<=st.right+1&&Rc.bottom<=st.bottom+1,scrolls:Rc.height<document.getElementById('kshR').scrollHeight,cut,rows,hov:document.documentElement.scrollWidth>innerWidth+1};
   return out});
  await p.screenshot({path:`${OUT}/${TAG}-${W}x${H}.png`});
  /* fold back */
  const f=await p.evaluate(async()=>{const x=document.querySelector('#kshR [data-kasfold]');if(!x)return'no fold';x.click();await new Promise(r=>setTimeout(r,500));return document.querySelector('#kshR [data-kasall]')?'folded':'not folded'});
  console.log(TAG,W+'x'+H,JSON.stringify(r),f)}
 console.log('errs',JSON.stringify(errs));await b.close()})();
