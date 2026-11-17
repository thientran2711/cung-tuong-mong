/* trung y (jty) scan: while her Y phục slot is empty, EVERY picture of her (stage, header, her own card, dialogs, Hậu cung / Tư trang tabs,
   Tuần lục) must be the trung y art of her tier; the makeup layer (jtoil kmkl) must still be drawn on the trung y figure; the one thiếu lễ
   (jaudit/jtoil leAttire) adds no Danh/Đức on top of the robe rule.
   usage: node dev/test/trung-y-scan.js <site url> <W>x<H>@dpr <outdir> <tag> */
const {chromium}=require('playwright');const [,,URL,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const shot=async n=>{try{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:70})}catch(e){}};
 const clear=()=>p.evaluate(()=>{try{KMQ.length=0}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
 /* every picture of HER face in the DOM: <img> src and CSS backgrounds whose file names carry her identity */
 const mine=()=>p.evaluate(()=>{const id=figPick(S).split(':')[1],re=new RegExp(`-(?:${id})-`);const L=[];
  document.querySelectorAll('img,[style*="background"]').forEach(e=>{if(e.closest('[hidden]'))return;const r=e.getBoundingClientRect();if(!r.width||!r.height)return;
   const s=e.tagName==='IMG'?(e.currentSrc||e.getAttribute('src')||''):(getComputedStyle(e).backgroundImage||'');(s.match(/[\w-]+\.webp/g)||[]).forEach(f=>{if(re.test(f)&&/^(fig|por)-/.test(f))L.push(f)})});
  const bad=L.filter(f=>!/-ty\d-/.test(f));return{n:L.length,bad:[...new Set(bad)],ty:[...new Set(L.filter(f=>/-ty\d-/.test(f)))]}});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tyOn==='function');await p.waitForTimeout(2500);
 const R={};
 /* start() is async: wait for the new life, keep a consort (not a palace maid) */
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:30000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 R.setup=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  Q.length=0;try{NLP=null}catch(e){}const s=document.createElement('style');s.textContent='.kroul{display:none!important}';document.head.appendChild(s);
  S.pid='consort:c05';S.fid='consort:c05';try{figUsed().push('consort:c05')}catch(e){}S.rank=4;
  S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;tab='act';
  const w=wdOf(S);w.y=null;S.toilette={day:wk()*10,wk:wk(),score:80,makeup:true,style:'fit',dv:'hoppham',F:1,occ:['th'],look:'dep'};render();return{fid:figPick(S),ty:tyOn(S),tier:tyTier(S)}});
 await clear();await p.waitForTimeout(3500);
 await p.waitForFunction(()=>{const f=document.getElementById('mefig');return f&&f.complete&&f.naturalWidth>0&&[...document.querySelectorAll('.kmkl')].every(i=>i.complete)},null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(800);
 R.stage=await mine();R.mk=await p.evaluate(()=>{const f=document.getElementById('mefig');const box=f&&f.parentElement;const m=box&&box.querySelector('.kmkl');return{fig:f&&f.getAttribute('src').split('/').pop(),kmk:!!m,kmkSrcLen:m?m.getAttribute('src').length:0}});
 await shot('1-stage');
 /* her stage figure up close: makeup layer over the trung y face */
 try{const el=await p.$('#mefig');if(el){const bb=await el.boundingBox();await p.screenshot({path:`${OUT}/${TAG}-1b-face.jpg`,type:'jpeg',quality:80,clip:{x:bb.x+bb.width*.2,y:bb.y,width:bb.width*.6,height:Math.min(bb.height*.25,bb.width*.6)}})}}catch(e){}
 /* her own card (tap her) */
 try{await p.click('#mefig',{timeout:4000});await p.waitForTimeout(1500);R.card=await mine();await shot('2-card')}catch(e){R.card={err:e.message.slice(0,80)}}
 await clear();
 for(const t of ['rv','inv','log']){R['tab_'+t]=await p.evaluate(t=>{tab=t;render();return true},t);await p.waitForTimeout(1500);R['tab_'+t]=await mine();await shot('3-tab-'+t)}
 await p.evaluate(()=>{tab='act';render()});await clear();
 /* Tuần lục */
 R.book=await p.evaluate(()=>{try{dawn();return true}catch(e){return e.message}});await p.waitForTimeout(2500);const pages=[];
 for(let i=0;i<8;i++){pages.push(await mine());if(i<2)await shot('4-book-'+i);const nx=await p.$('.kbk-next');if(!nx)break;try{await nx.click({timeout:2000})}catch(e){break}await p.waitForTimeout(900)}
 R.bookPages=pages;await p.evaluate(()=>{try{window.__kbk&&window.__kbk.close&&window.__kbk.close()}catch(e){}const d=document.getElementById('dawn');if(d){d.hidden=true;d.innerHTML=''}document.body.classList.remove('kbk-open')});
 /* one thiếu lễ: Thỉnh an Thái hậu in trung y adds only the host's thiện cảm (Danh/Đức come from the robe rule on arrival) */
 R.le=await p.evaluate(()=>{const L=leAttire(S,'',"th");const t=aaThieuLeTxt("th");return{state:L.state,delta:L.delta,txt:t,th0:aaThieuLe0(S)}});
 R.walk=await p.evaluate(()=>{const d0=S.danh,u0=S.duc;window.__tyGo=1;try{goTo('tn')}finally{window.__tyGo=0}return{place:S.place,danh:S.danh-d0,duc:S.duc-u0}});
 R.thinh=await p.evaluate(()=>{const P=curPeople().find(x=>x.kind==='th');if(!P)return{noTH:1};const A=talkOpts(P).filter(a=>a&&/^Thỉnh an/.test(a.n));const a=A[0];if(!a)return{noOpt:1};
  const d0=S.danh,u0=S.duc;const th0=S.th;try{(a.run||a.go).call(a)}catch(e){return{err:e.message}}return{risk:a.risk||a.x||'',danh:S.danh-d0,duc:S.duc-u0}});
 await clear();
 /* night: him at her palace for the night costs nothing */
 R.night=await p.evaluate(()=>{const d0=S.danh;window.__tyGo=1;try{goTo('home')}finally{window.__tyGo=0}S.buoi=3;S.tyPaid=null;const c=tyCost('home',[{kind:'emp'}]);return c});
 R.hovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
