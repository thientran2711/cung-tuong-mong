/* fold-popw: (1) person card docked on the one-page grid (#popw) must fill the page box (stage track), the top bar must keep its height;
   (2) a long-option dialog: the X (#mclose) must not overlap the scrolled option list. usage: node dev/test/fold-popw.js <device> <outdir> <tag> */
const {chromium}=require('playwright');const D=require('./lib/device');
const [,,DEV,OUT,TAG]=process.argv;
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,DEV||'fold');const p=await ctx.newPage();p.setDefaultTimeout(120000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const f=await D.openHost(p,srv.url);
 await f.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await f.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(typeof S!=='undefined'&&S&&!isSrv())break}document.querySelectorAll('[id^=kroul]').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;quiet=false;S.out=0;S.confined=0;S.place="home";try{goTo("home")}catch(e){}});
 await p.waitForTimeout(2500);await f.evaluate(()=>{document.querySelectorAll('[id^=kroul]').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});await p.waitForTimeout(1000);
 const R=r=>{if(!r)return null;const q=r.getBoundingClientRect();return[Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)]};
 const out={dev:DEV,tag:TAG};
 // 1 person card
 out.card=await f.evaluate(async()=>{const n=(typeof curPeople==="function"?curPeople():[]).length;if(!n)return{err:"no people"};popIdx=0;render();await new Promise(r=>setTimeout(r,900));
  const g=document.getElementById("game"),q=s=>document.querySelector(s),R=e=>{if(!e)return null;const b=e.getBoundingClientRect();return[Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)]};
  const pw=document.getElementById("popw");
  return{n,cls:g.className,hud:R(q("header.hud")),stage:R(document.getElementById("stage")),popw:R(pw),pop:R(pw&&pw.querySelector(".pop")),bar:R(q("nav")),game:R(g),rows:getComputedStyle(g).gridTemplateRows,popArea:pw&&getComputedStyle(pw).gridArea}});
 await p.screenshot({path:`${OUT}/${TAG}-${DEV}-card.jpg`,type:'jpeg',quality:70});
 await f.evaluate(()=>{popIdx=null;render()});await p.waitForTimeout(500);
 // 2 long option dialogs (each with a close-only option "Lui" -> kit ✕), every card shape
 out.dlg={};
 for(const kind of ['who','pcm','self','emp']){
  await f.evaluate(()=>{document.querySelectorAll('.kroul,[id^=kroul]').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true});
  let ok=false;
  for(let t=0;t<4&&!ok;t++){
   await f.evaluate(kind=>{document.querySelectorAll('.kroul,[id^=kroul]').forEach(e=>e.remove());Q.length=0;const v=liveRivals(true)[0];
    const opts=Array.from({length:10},(_,i)=>({n:`Cách đáp thứ ${i+1}`,fx:{},x:"thân +3 · các phi tần khác ghen +3",go:()=>{}}));opts.push({n:"Lui",fx:{},go:()=>{}});
    const m={t:"Có người đến",h:`<p>${v.name} sang hỏi chuyện, xin ngươi chọn một trong mười cách đáp. Đây là một đoạn dài để thử cuộn trong hộp thoại.</p>`,opts};
    if(kind==='who'||kind==='pcm'||kind==='headArt')m.who=pv(v);if(kind==='pcm')m.cls='pcm';if(kind==='headArt')m.headArt={src:"img/ev-khach-den-1.webp"};
    if(kind==='faces')m.faces=[[pv(v)],[pv(liveRivals(true)[1]||v)]];
    if(kind==='self')showSelf();else if(kind==='emp')showEmp();else{Q.push(m);showModal()}},kind);await p.waitForTimeout(1500);await f.waitForFunction(()=>!!document.querySelector('#modal .kit-x'),null,{timeout:4000}).catch(()=>{});
   ok=await f.evaluate(()=>!document.getElementById('modal').hidden&&Q.length>0)}
  out.dlg[kind]=await f.evaluate(async()=>{const R=e=>{if(!e)return null;const b=e.getBoundingClientRect();return[Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)]};
   const M=document.getElementById("modal"),d=M.querySelector(".dlg"),x=M.querySelector(".kit-x");if(!x)return{err:"no x",d:R(d)};
   const res={x:R(x),d:R(d),xparent:x.parentElement.className,pos:getComputedStyle(x).position};
   const sc=[...M.querySelectorAll("*")].concat([d]).filter(e=>e.scrollHeight>e.clientHeight+4&&/auto|scroll/.test(getComputedStyle(e).overflowY)&&e.offsetParent);res.scrollers=sc.map(e=>(e.id||String(e.className).split(' ')[0])+":"+e.scrollHeight+"/"+e.clientHeight);
   res.xInScroller=sc.some(e=>e.contains(x));
   const hit=()=>{const xr=x.getBoundingClientRect();if(!xr.width)return"hidden";const pts=[[.5,.5],[.15,.15],[.85,.15],[.15,.85],[.85,.85]];const bad=new Set();for(const[a,b]of pts){for(const e of document.elementsFromPoint(xr.left+xr.width*a,xr.top+xr.height*b)){if(e===x||x.contains(e)||!M.contains(e))continue;if(e.closest('.kph')||e===M||e.classList.contains('dlg')||e.id==='mb')continue;if(e.closest('.opt,figure,.kpb,.kpsn,.kesf,.kdscroll')||(e.children.length===0&&(e.textContent.trim()||e.tagName==='IMG')))bad.add((e.className||e.tagName)+"")}}return[...bad].slice(0,3)};
   res.h0=hit();const s1=sc[sc.length-1];const posn=[];if(s1){for(const f of[.3,.6,1]){s1.scrollTop=Math.round((s1.scrollHeight-s1.clientHeight)*f);posn.push([f,hit(),R(x)])}s1.scrollTop=Math.round((s1.scrollHeight-s1.clientHeight)*.5)}res.scroll=posn;return res});
  await p.screenshot({path:`${OUT}/${TAG}-${DEV}-dlg-${kind}.jpg`,type:'jpeg',quality:60});
 }
 // 3 grid-area orphan scan: every element whose grid-area names an area its grid parent lacks (home, every tab, person card open)
 const SCAN=()=>{const bad=[];for(const e of document.querySelectorAll('*')){const ga=getComputedStyle(e).gridRowStart;if(!ga||ga==='auto')continue;const par=e.parentElement;if(!par)continue;const cs=getComputedStyle(par);if(cs.display!=='grid'&&cs.display!=='inline-grid')continue;if(/^-?\d+$|^span/.test(ga))continue;const areas=(cs.gridTemplateAreas||'').replace(/["]/g,' ').split(/\s+/).filter(Boolean);const nm=ga.replace(/-start$/,'');if(!areas.includes(nm))bad.push((e.id?'#'+e.id:e.tagName+'.'+String(e.className).split(' ')[0])+' area='+ga+' in '+(par.id?'#'+par.id:par.tagName+'.'+String(par.className).split(' ')[0]))}return[...new Set(bad)]};
 out.orphans={};
 const tabs=await f.evaluate(()=>[...document.querySelectorAll('nav button')].map(b=>b.id||b.textContent.trim()));
 out.orphans.home=await f.evaluate(SCAN);
 for(const t of tabs){await f.evaluate(t=>{const b=[...document.querySelectorAll('nav button')].find(b=>(b.id||b.textContent.trim())===t);if(b)b.click()},t);await p.waitForTimeout(500);const r=await f.evaluate(SCAN);if(r.length)out.orphans[t]=r}
 await f.evaluate(()=>{popIdx=0;render()});await p.waitForTimeout(700);out.orphans.card=await f.evaluate(SCAN);
 out.errs=errs;console.log(JSON.stringify(out));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
