/* name-mask screenshots: Nhật ký (log tab) with strangers named by the kit mask, and a result list with the aggregate rows.
   usage: NODE_PATH=$(npm root -g) node dev/test/name-mask-shot.js <url|file> WxH <out-prefix> */
const {chromium}=require('playwright');const path=require('path');const [,,U,VP,OUT]=process.argv;const [W,H]=VP.split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'})).newPage();
 await p.goto(/^https?:/.test(U)?U:'file://'+path.resolve(U));await p.waitForFunction(()=>typeof start==='function'&&typeof kaResultRows==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<40;i++){start();if(S.ps&&S.origin.k!=='tt')break}Q.length=0;$("modal").hidden=true;
  const un=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&!kitKnownName(v)).slice(0,4);
  log(`${un[0].name} sang cung ngươi thăm hỏi.`);log(`${un[1].name} dời khỏi ${palName("r"+un[1].id)}, sang ${houseName(un[0])}.`);log(`Ngươi nghe ${un[2].name} nói xấu ${un[3].name} sau lưng.`);
  const before=rsnap();before.rel=before.rel||{};un.forEach((v,i)=>before.rel[v.id]={a:aff(v,S)-(i%2?-6:6),m:aff(S,v),e:v.ev||0,g:v.ghen||0,o:Math.round(oan(v,S))});
  window.__un=un.map(v=>v.name);resultShow("Thử",before);tab='log';render()});
 await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});await p.waitForTimeout(1200);await p.screenshot({path:OUT+'-result.png'});
 await p.evaluate(()=>{const t=document.getElementById('rtoast');if(t)t.classList.remove('on');tab='log';render()});await p.waitForTimeout(800);await p.screenshot({path:OUT+'-log.png'});
 console.log(await p.evaluate(()=>{const t=document.body.innerText;return JSON.stringify(__un.filter(n=>t.includes(n)))}));await b.close()})();
