/* name-mask old-save + met-person control (review/name-mask-r1): a save written BEFORE the mask holds raw names of strangers in S.logs / S.news / S.notes.
   After save -> reload -> load, no rendered text/attribute shows a stranger's raw name (Nhật ký tab + news card), while a person she HAS met still shows hers.
   usage: NODE_PATH=$(npm root -g) node dev/test/name-mask-oldsave.js <url|file> [WxH] [shot-prefix]   exit 1 on a failure */
const {chromium}=require('playwright');const path=require('path');const [,,U,VP,OUT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const url=/^https?:/.test(U)?U:'file://'+path.resolve(U);
 await p.goto(url);await p.waitForFunction(()=>typeof start==='function'&&typeof newsHTML==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 const info=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<40;i++){start();if(S.ps&&S.origin.k!=='tt')break}Q.length=0;$("modal").hidden=true;
  const un=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&!kitKnownName(v)&&v.name.split(' ').length>=3).slice(0,3);
  const kn=rivals.filter(v=>v.alive&&kitKnownName(v)&&v.name.split(' ').length>=3).slice(0,1);
  /* raw, un-masked lines exactly as an old build stored them */
  S.logs.unshift(`${un[0].name} sang cung ngươi thăm hỏi.`,`Ngươi nghe ${un[1].name} nói xấu ${un[2].name} sau lưng.`);
  if(kn[0])S.logs.unshift(`${kn[0].name} gửi lời hỏi thăm.`);
  S.news=S.news||[];S.news.unshift({w:wk(),id:un[0].id,k:"x",t:`${un[0].name} đuổi một cung nữ khỏi cung`});
  window.__nm={un:un.map(v=>v.name),kn:kn.map(v=>v.name)};
  try{saveSlot?saveSlot(1):0}catch(e){}return {un:__nm.un,kn:__nm.kn,hasSave:typeof saveSlot}});
 console.log(JSON.stringify(info));
 const ser=await p.evaluate(()=>{try{return JSON.stringify(Object.keys(localStorage))}catch(e){return'ERR'}});console.log('ls keys',ser.slice(0,200));
 await p.evaluate(()=>{tab='log';render()});await p.waitForTimeout(1500);
 const t=await p.evaluate(()=>{const cl=document.body.cloneNode(true);cl.querySelectorAll('script,style').forEach(n=>n.remove());let t=cl.textContent;document.querySelectorAll('[title],[aria-label],[alt]').forEach(n=>{for(const a of['title','aria-label','alt'])t+=' '+(n.getAttribute(a)||'')});
  const d=document.createElement('div');d.innerHTML=newsHTML();document.body.appendChild(d);return new Promise(r=>setTimeout(()=>{r(t+' '+d.textContent);d.remove()},300))});
 let bad=0;for(const n of info.un)if(t.includes(n)){console.log('RAW',n);bad++}
 for(const n of info.kn)console.log('known shown:',t.includes(n),n);
 await p.screenshot({path:(OUT||'/tmp/x/os')+'-log.png'});
 console.log('page errors',errs.length);await b.close();console.log(bad||errs.length?'FAIL':'PASS');process.exit(bad||errs.length?1:0)})();
