/* mg-signs-preplay (review/kit-signs-preplay, rv-kit-signs-odds note) — node dev/test/mg-signs-preplay.js [dev/index.html] [WxH]
   KIT §13.x signs («●» ✓ ? ↶ ↷ ♨ instead of words) run ONLY inside the running play board. For EVERY KG82 kind: the rules / pre-play screen (before «Sẵn sàng») shows NO sign button
   (every button keeps its word); then the makeup «Trước gương đồng» own screens (dress, pre-play, colour pick) keep their words and its drawing step still signs. Prints kind | pre-play buttons. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof playArt==='function'&&typeof toilOpen==='function'&&typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  window.__btn=()=>[...document.querySelectorAll('#kg82 button')].filter(b=>b.offsetParent&&!b.closest('.kit-x')&&b.id!=='kit-x'&&!b.classList.contains('kit-x')).map(b=>({id:b.id||b.className.split(' ')[0],t:b.textContent.trim(),sign:!!b.dataset.kgsign}));
  window.__pre=async(src)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{(0,eval)(src)}catch(e){return{err:String(e.message)}}await sleep(1100);return{b:__btn()}}});
 await p.waitForTimeout(3000);
 const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};let bad=0;
 /* makeup own screens FIRST (fresh KG82 state, as in the real game) */
 const m=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};try{kg82Close()}catch(e){}try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());Q.length=0;
  toilOpen();await sleep(600);{const r=document.getElementById('toilrdy');if(r)r.click()}await sleep(900);o.dress=__btn();document.getElementById('toilok').click();await sleep(1500);o.pre=__btn();document.getElementById('toilmk').click();await sleep(1500);o.col=__btn();document.getElementById('toilgo').click();await sleep(1800);o.draw=__btn();try{kg82Close()}catch(e){}return o});
 for(const s of ['dress','pre','col'])ok(m[s].length>0&&m[s].every(x=>!x.sign),`makeup ${s} screen: every button keeps its word`,m[s].map(x=>x.t.slice(0,12)));
 ok(m.draw.some(x=>x.sign),'makeup drawing step: its done button is still a sign',m.draw.map(x=>x.t));
 const kinds=await p.evaluate(()=>Object.keys(KG82_KIND).filter(k=>typeof KG82_ENG[KG82_KIND[k].e]==='function'));
 for(const k of kinds){const src=k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
  const r=await p.evaluate(s=>window.__pre(s),src);const sg=(r.b||[]).filter(x=>x.sign);console.log(k.padEnd(10),r.err?'ERR '+r.err:(r.b||[]).map(x=>(x.sign?'[S]':'')+x.t.slice(0,14)).join(' | '));if(sg.length){bad++;console.log('  SIGN on pre-play',JSON.stringify(sg))}}
 ok(bad===0,`all ${kinds.length} kinds: no sign on the rules / pre-play screen`,bad);
 ok(errs.length===0,'no page errors',errs.slice(0,2));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
