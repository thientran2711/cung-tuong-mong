/* MOCKUP (not wired): residence paintings as the LEFT picture page of the iPad person card (KIT §32.4 Hậu cung › Phi tần).
   Pilot art from dev/shots/residence/: Cảnh Phúc cung main hall (chủ vị) xuân-sáng / xuân-tối, Đông phối điện (co-resident side room) xuân-sáng.
   The live game is started; its real #panel is moved into kitBookSpread's right page; the left page is kitBookPic with the residence scene.
   usage: node dev/test/residence-mock.js <baseURL> <W>x<H>@dpr <outdir> <tag>   → <tag>-{chuvi-sang,chuvi-toi,phoidien-sang}.jpg */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const R='dev/shots/residence/';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 /* BASE "http://mock.local/<file>" is served straight from the repo folder (no server process needed) */
 const fs=require('fs'),path=require('path'),ROOT=path.resolve(__dirname,'../..');
 const MT={html:'text/html; charset=utf-8',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css'};
 await ctx.route('http://mock.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  if(u.endsWith('/dev/index.html')||u==='/dev/index.html')return r.fulfill({status:200,contentType:MT.html,body:'<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1"><base href="/">'+fs.readFileSync(f,'utf8')});
  r.fulfill({status:200,contentType:MT[path.extname(f).slice(1)]||'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(S.origin&&S.origin.k==='cnv')&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
 await p.waitForTimeout(1800);
 const res=await p.evaluate(()=>{
  const tab=t=>{const b=document.querySelector(`#tabs button[data-tab=${t}]`);b&&b.click()};
  tab('rv');
  const tabs=document.getElementById('tabs').getBoundingClientRect();
  const pr=document.getElementById('panel').getBoundingClientRect(),st=document.getElementById('stage').getBoundingClientRect();
  const top=Math.min(pr.top||9999,st.height?st.top:9999);
  const ov=document.createElement('div');ov.id='kbsMock';ov.style.cssText=`position:fixed;left:0;right:0;top:${Math.max(0,top-6)}px;height:${tabs.top-top+4}px;z-index:60;background:linear-gradient(#2b2135,#1b1424)`;
  document.body.appendChild(ov);
  const panel=document.getElementById('panel');panel.style.cssText+=';position:static;width:auto;height:auto;max-height:none;margin:0;border:0;box-shadow:none;background:transparent;display:block;visibility:visible';
  const live=rivals.filter(v=>v.alive!==false&&!v.out&&!v.queen);
  try{const K=k61S();live.forEach(v=>K['r'+v.id]=3)}catch(e){}render();
  const head=live.find(v=>v.pal===0)||live.filter(v=>v.pal!=null)[0]||live[0];
  const low=live.find(v=>v!==head&&v.resHead===key(head))||live.filter(v=>v!==head&&rkOf(v)<4)[0]||live[1];
  const pick=v=>{const nm=shortN(v.name);const cell=[...panel.querySelectorAll('*')].filter(e=>e.children.length===0&&e.textContent.trim()===nm).map(e=>e.closest('button,[data-i],[data-pg]')||e)[0];if(cell)cell.click();const h=panel.querySelector('.pc');return !!h&&h.textContent.includes(v.name)};
  window.__m={head,low,pick,panel,ov};
  return{head:head&&`${RANKS[head.rank].n} ${head.name}`,low:low&&`${RANKS[low.rank].n} ${low.name}`}});
 const R0=R;
 const show=async(who,scene,ax,cap)=>{await p.evaluate(([who,scene,ax,cap])=>{const v=__m[who];window.__ok=__m.pick(v);
   const pic=kitBookPic({scene,ax,feet:.92,figs:[{src:kitFigOf(v),h:.84,x:ax}],cap});
   if(!window.__bs)window.__bs=kitBookSpread(__m.ov,{pic,text:__m.panel});else __bs.set({pic,text:__m.panel})},[who,scene,ax,cap]);await p.waitForTimeout(2200)};
 const audit=n=>p.evaluate(n=>{const vw=innerWidth;const bad=[];document.querySelectorAll('#kbsMock *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>vw+1)bad.push(e.className)});
  return{n,cardOk:window.__ok,mode:__bs.mode,overflowX:document.documentElement.scrollWidth>vw,bad:bad.slice(0,5),scene:[...document.querySelectorAll('#kbsMock .kbp-scene')].map(e=>e.style.backgroundImage.slice(0,80))}},n);
 const A=[];
 for(const [n,who,f,ax,cap] of [['chuvi-sang','head','canh-phuc-cung-xuan-sang',.5,'Cảnh Phúc cung · chính điện'],['chuvi-toi','head','canh-phuc-cung-xuan-toi',.5,'Cảnh Phúc cung · chính điện'],['phoidien-sang','low','canh-phuc-cung-dong-phoi-xuan-sang',.55,'Cảnh Phúc cung · Đông phối điện']]){
  await show(who,R0+f+'.webp',ax,cap);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:86});A.push(await audit(n))}
 console.log(JSON.stringify({TAG,res,A,errs}));await b.close()})();
