/* review/flip-newlife, act-dedupe UI: Hành sự "Tất cả" = usable cards first; the grey-card popover covers no other card; Nội vụ phủ weekly rare tile shows "hàng hiếm".
   usage: node dev/test/flip-newlife-ui.js <url> [W]x[H]@dpr <outdir> → JSON lines + "FAIL n" + shots */
const {chromium}=require('playwright');const fs=require('fs');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);
 await p.evaluate(LIB);let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info?' · '+JSON.stringify(info).slice(0,300):''))};
 const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/ui-${n}-${W}x${H}.png`})};
 await p.evaluate(()=>{window.__nlInner=1;AA.scen('dau');S.bac=500;S.suc=80;S.buoi=0;used=0;Q.length=0;try{document.getElementById('modal').hidden=true;document.getElementById('title').hidden=true}catch(e){}kmReset();deal();tab='act';render()});
 await p.waitForTimeout(1200);
 for(let k=0;k<2&&!(await p.evaluate(()=>document.getElementById('panel').getBoundingClientRect().height>50));k++){await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()==='Hành sự'&&x.getBoundingClientRect().width>0);if(b)b.click()});await p.waitForTimeout(900)}
 /* make some cards grey in the middle of the list: spend khắc so costly ones turn grey */
 await p.evaluate(()=>{S.bac=0;render()});await p.waitForTimeout(800);
 await p.evaluate(()=>{const t=document.querySelector('.kcattabs [data-kcat="all"]');if(t)t.click()});await p.waitForTimeout(500);
 const o=await p.evaluate(()=>{const L=[...document.querySelectorAll('#panel .cards > button.ka')].filter(b=>!b.hidden&&b.offsetParent);const seq=L.map(b=>({i:+b.dataset.i,g:!!(b.disabled||b.classList.contains('kdis')),y:Math.round(b.getBoundingClientRect().top+scrollY),x:Math.round(b.getBoundingClientRect().left)}));
  const sorted=[...seq].sort((a,c)=>a.y-c.y||a.x-c.x);const firstGrey=sorted.findIndex(x=>x.g);const lastUse=sorted.map(x=>x.g).lastIndexOf(false);
  return{n:seq.length,grey:seq.filter(x=>x.g).length,firstGrey,lastUse}});
 ck('Tất cả: usable cards before greyed ones',o.n>0&&o.grey>0&&(o.firstGrey<0||o.lastUse<o.firstGrey),o);
 await p.evaluate(()=>{const g=[...document.querySelectorAll('#panel .cards > button.ka')].find(b=>(b.disabled||b.classList.contains('kdis'))&&!b.hidden);if(g)g.scrollIntoView({block:'center'})});await p.waitForTimeout(400);await shot('all');
 /* tap a grey card: popover must not overlap any OTHER card */
 const pos=await p.evaluate(()=>{const g=[...document.querySelectorAll('#panel .cards > button.ka')].filter(b=>(b.disabled||b.classList.contains('kdis'))&&!b.hidden&&b.offsetParent);const t=g[Math.min(2,g.length-1)];if(!t)return null;t.scrollIntoView({block:'center'});const r=t.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,i:t.dataset.i}});
 ck('grey card found',!!pos,pos);
 if(pos){await p.waitForTimeout(300);const pos2=await p.evaluate(i=>{const t=document.querySelector(`#panel .cards > button.ka[data-i="${i}"]`);const r=t.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}},pos.i);
  await p.mouse.move(pos2.x,pos2.y);await p.mouse.down();await p.mouse.up();await p.waitForTimeout(500);
  const v=await p.evaluate(i=>{const pp=document.getElementById('kpop');if(!pp||pp.hidden)return{open:false};const pr=pp.getBoundingClientRect();const hit=[...document.querySelectorAll('#panel .cards > button.ka')].filter(b=>!b.hidden&&b.offsetParent&&b.dataset.i!==String(i)).filter(b=>{const r=b.getBoundingClientRect();return r.left<pr.right-1&&r.right>pr.left+1&&r.top<pr.bottom-1&&r.bottom>pr.top+1}).map(b=>b.dataset.i);return{open:true,txt:pp.textContent.slice(0,60),overlaps:hit,pr:[pr.left|0,pr.top|0,pr.width|0,pr.height|0]}},pos.i);
  ck('popover open with the reason',v.open&&v.txt,v);ck('popover covers no other card',v.open&&v.overlaps.length===0,v);await shot('pop')}
 /* Nội vụ phủ rare tile */
 await p.evaluate(()=>{Q.length=0;try{document.getElementById('kpop').hidden=true}catch(e){}used=0;S.buoi=1;S.bac=500;goTo('nvp');const pi=curPeople().findIndex(x=>x.kind==='peddler');popIdx=pi;talk(0)});await p.waitForTimeout(900);
 const sh=await p.evaluate(()=>{const t=document.querySelector('.kshop .kshc');return{has:!!t,mark:t&&t.querySelector('.kmark,.kitm,[class*=mark]')?t.querySelector('.kmark,.kitm,[class*=mark]').textContent:null,txt:t?t.textContent.slice(0,80):''}});
 ck('rare tile labelled "hàng hiếm"',sh.has&&/hàng hiếm/i.test(sh.txt+(sh.mark||'')),sh);await shot('shop');
 ck('no page errors',perr.length===0,perr);
 console.log(fail?'FAIL '+fail:'ALL OK');await b.close();process.exit(fail?1:0)})();
