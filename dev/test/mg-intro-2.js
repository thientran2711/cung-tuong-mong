/* mg-intro-2 (owner OD 21/11 ~04:17Z) — node dev/test/mg-intro-2.js [index.html] [WxH]
   every contest / mini-game intro: the EVENT picture on top (.kgr-ev), NO rules-demo picture (.kgr-demo), the long rules behind the kit tap-word (.kpst .kfx → kit pop-up),
   «Phần của ngươi» / «Đối thủ» short (no «màn thi chưa rõ» in view), «Sẵn sàng» + «Hướng dẫn» present. Scan table per kind (law 11). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;S.rank=3;try{render()}catch(e){}
  const st=document.createElement('style');st.textContent='.kmov{display:none!important}';document.head.appendChild(st);try{if(window.KMQ)KMQ.length=0}catch(e){}});
 await p.waitForTimeout(800);
 const kinds=await p.evaluate(()=>Object.keys(KG82_KIND).filter(k=>KG82_KIND[k].n));
 const scan=()=>p.evaluate(()=>{const bx=kg82Box();if(!bx)return null;const img=bx.querySelector('.kgr-ev img');return{ev:!!img,evh:img?Math.round(img.getBoundingClientRect().height):0,demo:!!bx.querySelector('.kgr-demo'),bang:bx.querySelectorAll('.kpst .kfx').length,kb:!!bx.querySelector('.kgr .kb'),go:!!bx.querySelector('.kgr-go'),tut:!!bx.querySelector('#kgrtut'),
   chua:/màn thi chưa rõ/.test(bx.innerText)}});
 const rows=[];
 for(const k of kinds){await p.evaluate(k=>{try{kg82Close()}catch(e){}Q.length=0;S.mg=null;playArt({art:k,title:'t',onDone(){}})},k);await p.waitForTimeout(450);const r=await scan();rows.push([k,r]);
  ok(r&&r.ev&&!r.demo&&r.bang>=1&&!r.kb&&r.go,`playArt ${k}: event picture, no demo picture, rules behind «!»`,r)}
 await p.evaluate(()=>{try{kg82Close()}catch(e){}Q.length=0;startContest({art:'tho',title:'Tết Thất tịch',fk:'thattich',luck:30,prep:8,onDone(){}})});await p.waitForTimeout(900);
 const c=await scan();const evsrc=await p.evaluate(()=>(document.querySelector('.kgr-ev img')||{}).src||'');
 ok(c&&c.ev&&/ev-fest-thattich/.test(evsrc)&&!c.demo&&c.bang===3&&!c.chua&&c.go&&c.tut,'startContest (Thất tịch): festival picture, 3 «!» (luật / phần của ngươi / đối thủ), no long rows in view',Object.assign({evsrc},c));
 await p.evaluate(()=>document.querySelector('.kgr .kpst .kfx').click());await p.waitForTimeout(300);
 const pop=await p.evaluate(()=>{const k=document.getElementById('kpop');return k&&!k.hidden&&/Luật/.test(k.innerText)});ok(pop,'the «!» opens the kit pop-up with the rules');
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});
 ok(errs.length===0,'no page errors',errs);console.log(bad?`${bad} FAIL`:'ALL OK');await b.close();process.exit(bad?1:0)})();
