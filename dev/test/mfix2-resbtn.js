/* m-fix-2 item 1 scan: usage node dev/test/mfix2-resbtn.js fold|ipad <port> — every kg82 result-button label: plain close words hidden (OD:L1352), step labels visible + real-tap hit; ✕ moves on for all. */
/* item 1 family scan: every result-button label of the kg82 frame (kg82ok/kg92ok) — what is on screen, and does a REAL tap on it (or on ✕) move on */
const {chromium}=require('playwright');const RT=require('./realtap.js');
const dev=process.argv[2]||'fold';const port=process.argv[3]||'8792';const vp=dev==='fold'?{width:755,height:1000}:{width:1180,height:820};
const LABELS=['Đã hiểu','Xong','Môn kế tiếp','Xem kết quả','Thử môn khác','Dừng ở đây'];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:vp,deviceScaleFactor:1,hasTouch:dev==='fold'});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:'+port+'/index.html',{waitUntil:'domcontentloaded'});const rt=RT.make(p,{dev});
/* setup by state (m-fix-2-r): the title walk was label-bound (m-fix-1 renamed the roulette button) and passed silently when stuck */
await p.waitForFunction(()=>typeof start==='function'&&typeof kg82Open==='function',null,{timeout:180000});await p.waitForTimeout(1500);
await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});start()});
for(let i=0;i<10;i++){await p.waitForTimeout(600);await p.evaluate(()=>{Q.length=0;document.querySelectorAll('#klife,.kmov,#kroul,#kload').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}})}
const out=[];
for(const lab of LABELS)for(const how of ['button','x']){
 await p.evaluate(lab=>{window.__done=0;kg82Open({art:"Thử",title:"Kết quả",how:"",round:"Môn",roundV:"1/2"});kg82ShowRes(kg82Rows([["Màn chơi","5/10 · Khá","t"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">${lab}</button></div>`,true);document.getElementById('kg82ok').onclick=()=>{kg82Close();window.__done=1}},lab);
 await p.waitForTimeout(600);
 if(!globalThis.__s){globalThis.__s=1;await p.screenshot({path:require('os').tmpdir()+'/r3-'+dev+'-'+port+'.png'})}const st=await p.evaluate(()=>{const b=document.getElementById('kg82ok');const r=b.getBoundingClientRect();const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {cov:t&&(t.id||String(t.className)).slice(0,40),shown:r.width>0&&!b.hidden,hit:!!(t&&(t===b||b.contains(t))),x:!!document.querySelector('#kg82 .kit-x')}});
 const ok=how==='button'?(st.shown?await rt.tap('#kg82ok',{label:lab}):false):await rt.tap('#kg82 .kit-x',{label:'✕'});await p.waitForTimeout(600);
 const done=await p.evaluate(()=>window.__done===1);out.push({lab,how,...st,tap:ok,movedOn:done});
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});await p.waitForTimeout(300)}
for(const o of out)console.log(JSON.stringify(o));console.log('ERRS',errs.length,errs.slice(0,2).join(' | '));
const F=[];const plain=l=>/^(Đã hiểu|Xong)$/.test(l);for(const o of out){if(plain(o.lab)&&o.shown)F.push(o.lab+': plain close word shown (OD:L1352)');if(!plain(o.lab)&&!o.shown)F.push(o.lab+': step button hidden');
 if(o.how==='button'&&!plain(o.lab)&&!(o.tap&&o.movedOn))F.push(o.lab+': real tap on the step button did not move on');if(o.how==='x'&&!(o.tap&&o.movedOn))F.push(o.lab+': ✕ real tap did not move on')}
if(errs.length)F.push('page errors '+errs.length);for(const x of F)console.log('FAIL '+x);console.log(F.length?'MFIX2-RESBTN FAIL '+F.length:'MFIX2-RESBTN PASS');await b.close();process.exitCode=F.length?1:0})();
