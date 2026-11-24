/* visitor-scene (owner 24/11 ~22:02Z, rv-visitor-fix 1): a stranger standing on the place stage who comes to find her (gmCard → showModal, the Dư đồ encounter scene = kitFocus) is shown
   with her FACE (never the grey unknown-fig silhouette), her name, at the kit figure size; both ranks (higher = «giá đáo», lower = «xin cầu kiến»); the card text never has
   «Ta đã biết» / «Vì sao» / «ngươi» inside a quote / a personal name in speech. usage: NODE_PATH=$(npm root -g) node dev/test/visitor-scene.js [dev/index.html] [WxH]   exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const [,,U0,VP]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
const URL=/^(https?|file):/.test(U0||'')?U0:'file://'+path.resolve(U0||'dev/index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof gmCard==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}});
 for(let i=0;i<30;i++){const gone=await p.evaluate(()=>{const r=document.getElementById('kmrew');if(r)r.remove();const bt=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent||'')&&x.offsetParent);if(bt)bt.click();return !/Sửa soạn nhập cung/.test(document.body.innerText||'')});if(gone&&i>2)break;await p.waitForTimeout(1500)}
 const out=[];
 for(const which of ['hi','lo']){
  const R=await p.evaluate(async(which)=>{try{document.getElementById('kmrew')&&document.getElementById('kmrew').remove();Q.length=0;try{closeModal()}catch(e){}
   const c=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x)).sort((a,b)=>b.rank-a.rank);const v=which==='hi'?c[0]:c[c.length-1];S.rank=2;delete S.met[v.id];S.known[kOf61(v)]=0;S.nkn=S.nkn||{};S.nkn.me={};
   S.visit=S.visit||{people:[],tk:{}};S.visit.people=S.visit.people.filter(x=>!x.__t);S.visit.people.push({kind:"rival",ref:v,name:v.name,__t:1});try{tab="act"}catch(e){}render();
   const was=isKnown61(v);const m=gmCard(v);Q.length=0;Q.push(m);showModal();await new Promise(r=>setTimeout(r,2500));
   const imgs=[...document.querySelectorAll('img')].filter(i=>i.offsetParent&&/unknown-fig/.test(i.currentSrc||i.src||'')).length;
   const T=String(m.h).replace(/<[^>]+>/g,' ');return{rank:rkName(v),was,known:isKnown61(v),named:k61Named(v),sil:imgs,text:T}}catch(e){return{err:e.stack}}},which);
  out.push(R)}
 let bad=0;for(const r of out){if(r.err){console.log('ERR',r.err);bad++;continue}const q=[...r.text.matchAll(/“([^”]*)”/g)].map(x=>x[1]);
  const f=[];if(r.sil)f.push('grey silhouette on screen '+r.sil);if(!r.known||!r.named)f.push('not known by sight+name');if(/Ta đã biết|Ngươi đã biết|Vì sao/.test(r.text))f.push('system reasoning');if(q.some(x=>/ngươi/i.test(x)))f.push('«ngươi» inside a quote');if(!/giá đáo|xin cầu kiến|xin ra mắt|có tiếng/.test(r.text))f.push('no arrival line');if(!/Tần thiếp|Thần thiếp/.test(r.text)&&r.text.includes('xin'))f.push('no self-address');
  console.log(`${f.length?'FAIL':'ok  '} ${r.rank}: ${r.text.slice(0,230)}${f.length?'  <- '+f.join('; '):''}`);if(f.length)bad++}
 if(errs.length){console.log('page errors',errs.slice(0,3));bad++}console.log(bad?'FAIL '+bad:'PASS');await b.close();process.exit(bad?1:0)})();
