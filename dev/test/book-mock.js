/* MOCKUPS of the two-page book (owner-approved mapping, 11/14) — NOT wired into the live layout.
   The live game is started; its real tab panel (#panel) is MOVED into the right page of kitBookSpread; the left page is a
   kitBookPic illustration (real scene + real full-body figure). iPad = spread; phone/Fold = the right page only.
   usage: node dev/test/book-mock.js <baseURL> <W>x<H>@dpr <outdir> <tag>
   Writes <outdir>/<tag>-{phitan,dudo,tutrang,cungnhan}.jpg + <tag>-turn-{30,55,80}.jpg (tab switch Phi tần → Cung nhân, frozen mid-curl). */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await p.waitForTimeout(1800);
 const res=await p.evaluate(()=>{
  const tab=t=>{const b=document.querySelector(`#tabs button[data-tab=${t}]`);b&&b.click()};
  tab('rv');
  const tabs=document.getElementById('tabs').getBoundingClientRect(),top0=document.querySelector('.top,#hud,header');
  const pr=document.getElementById('panel').getBoundingClientRect(),st=document.getElementById('stage').getBoundingClientRect();
  const top=Math.min(pr.top||9999,st.height?st.top:9999);
  const ov=document.createElement('div');ov.id='kbsMock';ov.style.cssText=`position:fixed;left:0;right:0;top:${Math.max(0,top-6)}px;height:${tabs.top-top+4}px;z-index:60;background:linear-gradient(#2b2135,#1b1424)`;
  document.body.appendChild(ov);
  const panel=document.getElementById('panel');panel.style.cssText+=';position:static;width:auto;height:auto;max-height:none;margin:0;border:0;box-shadow:none;background:transparent;display:block;visibility:visible';
  const sc=n=>`img/${SCIMG[n]||n}.webp`;
  const known=rivals.filter(v=>v.alive!==false&&!v.out&&kitIsKnown(v));let v=known.find(x=>!kitFigOf(x).includes('unknown'));if(!v){v=rivals.find(x=>x.alive!==false&&!x.out);const k0=window.kitKnown;window.kitKnown=x=>x===v?true:k0(x);render()}
  window.__mock={tab,v,panel,ov,sc};
  const pal=v?palName(palaceOf(v)):'';
  window.__pics={
   rv:()=>kitBookPic({scene:sc('rv'),ax:.5,feet:.9,figs:[{src:kitFigOf(v),h:.84,x:.5}],cap:pal||'Cung phi tần'}),
   inv:()=>kitBookPic({scene:sc('home'),ax:.62,feet:.94,figs:[{src:kitFigOf(S),h:.84,x:.42}],cap:'Thử y phục',
     slots:[{label:'Trâm cài',n:'Chưa cài'},{label:'Y phục',n:'Áo đang mặc'},{label:'Ngọc bội',n:'Chưa đeo'}]}),
   staff:()=>{const L=[S.maid].concat(S.staff||[]).filter(Boolean);let m=null;for(const e of __mock.panel.querySelectorAll('*')){if(e.children.length)continue;const t=e.textContent.trim();m=L.find(x=>x.name===t);if(m)break}m=m||L[0];return kitBookPic({scene:sc('home'),ax:.68,feet:.94,figs:[{src:kitFigOf(m),h:.82,x:.5}],cap:placeOf('home').n})},
   go:()=>kitBookPic({scene:sc('vuon'),ax:.3,feet:.9,figs:[{src:'img/kit/unknown-fig-f.webp',h:.6,x:.3,dim:true},{src:'img/kit/unknown-fig-f.webp',h:.62,x:.62,dim:true},{src:'img/kit/unknown-fig-m.webp',h:.66,x:.8,dim:true}],cap:'Ngự hoa viên · 3 bóng người'})};
  /* select the consort in the Phi tần picker */
  const cell=[...panel.querySelectorAll('button,[data-i],.kpk,.pk,div')].find(e=>e.children.length<4&&e.textContent.trim()===String(v.name).split(' ').slice(-2).join(' '));
  if(cell)cell.click();
  window.__bs=kitBookSpread(ov,{pic:__pics.rv(),text:panel});
  return{v:v&&v.name,fig:v&&kitFigOf(v),cell:!!cell,mode:__bs.mode,staffFig:kitFigOf((S.staff||[])[0]),pal}});
 await p.waitForTimeout(1500);
 const shot=async n=>{await p.waitForTimeout(900);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:84})};
 const audit=async n=>p.evaluate(n=>{const bad=[];const vw=innerWidth;document.querySelectorAll('#kbsMock *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>vw+1)bad.push('out:'+e.className)});
  return{n,overflowX:document.documentElement.scrollWidth>vw,bad:bad.slice(0,5),imgs:[...document.querySelectorAll('#kbsMock .kbp img')].map(i=>i.complete&&i.naturalWidth>0)}},n);
 const A=[];
 await shot('phitan');A.push(await audit('phitan'));
 const go=async(t,dir)=>{await p.evaluate(([t,dir])=>{__bs.swap(()=>{__mock.tab(t);const dbl=t==='go';
   __bs.set({pic:__pics[t]?__pics[t]():'',double:dbl&&__bs.mode==='spread'?__mock.panel:null,text:dbl&&__bs.mode==='spread'?'':__mock.panel})},{dir})},[t,dir]);await p.waitForTimeout(1600)};
 /* tab switch frozen mid-curl: Phi tần → Cung nhân */
 await p.evaluate(()=>{window.__q=[];window.__rafo=requestAnimationFrame;window.requestAnimationFrame=f=>{__q.push(f);return __q.length};window.__step=t=>{const q=__q;__q=[];q.forEach(f=>f(t))}});
 const t0=await p.evaluate(()=>{__bs.swap(()=>{__mock.tab('staff');__bs.set({pic:__pics.staff(),text:__mock.panel})},{dir:1});return performance.now()});
 for(const f of (W>=900?[.3,.55,.8]:[.22,.32,.42])){await p.evaluate(([t0,f])=>__step(t0+600*f),[t0,f]);await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${TAG}-turn-${Math.round(f*100)}.jpg`,type:'jpeg',quality:84})}
 await p.evaluate(t0=>{__step(t0+3000);window.requestAnimationFrame=__rafo},t0);await p.waitForTimeout(800);
 await shot('cungnhan');A.push(await audit('cungnhan'));
 await go('inv',1);await shot('tutrang');A.push(await audit('tutrang'));
 await go('go',-1);await shot('dudo');A.push(await audit('dudo'));
 console.log(JSON.stringify({TAG,res,A,errs}));await b.close()})();
