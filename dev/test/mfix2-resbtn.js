/* m-fix-2 item 1 scan: usage node dev/test/mfix2-resbtn.js fold|ipad <port> — every kg82 result-button label: plain close words hidden (OD:L1352), step labels visible + real-tap hit; ✕ moves on for all. */
/* item 1 family scan: every result-button label of the kg82 frame (kg82ok/kg92ok) — what is on screen, and does a REAL tap on it (or on ✕) move on */
const {chromium}=require('playwright');const RT=require('./realtap.js');
const dev=process.argv[2]||'fold';const port=process.argv[3]||'8792';const vp=dev==='fold'?{width:755,height:1000}:{width:1180,height:820};
const LABELS=['Đã hiểu','Xong','Môn kế tiếp','Xem kết quả','Thử môn khác','Dừng ở đây'];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:vp,deviceScaleFactor:1,hasTouch:dev==='fold'});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:'+port+'/index.html');await p.waitForTimeout(3000);const rt=RT.make(p,{dev});
for(const t of ['Chơi một mình','Bắt đầu kiếp mới']){const h=await p.waitForSelector(`button:has-text("${t}"):visible`,{timeout:15000}).catch(()=>null);if(h)await rt.tap(h,{label:t});await p.waitForTimeout(2000)}
async function upBtn(re){return p.evaluate(s=>{const R=new RegExp(s);for(const e of document.querySelectorAll('button')){const r=e.getBoundingClientRect();if(!(r.width>0))continue;const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);if(t&&(t===e||e.contains(t))&&R.test(e.textContent.replace(/\s+/g,' ').trim()))return {x:r.left+r.width/2,y:r.top+r.height/2}}return null},re)}
for(let i=0;i<60;i++){if(await upBtn('^Hành sự'))break;if(await p.$('#kg82skip')){await rt.tap('#kg82skip');await p.waitForTimeout(2500);continue}if(await p.evaluate(()=>!!document.querySelector('#kg82box-res:not([hidden])')&&!!document.querySelector('#kg82 .kit-x'))){await rt.tap('#kg82 .kit-x');await p.waitForTimeout(2000);continue}const c=await upBtn('^(Tiếp|Bỏ qua|Nhận thân phận|Vào cung|Vào điện|Dâng |Theo ma ma|Đã hiểu|Tiếp theo)');let cc=c;if(!cc)cc=await p.evaluate(()=>{for(const e of document.querySelectorAll('.kprevov button,.kmov button,#modal button')){const r=e.getBoundingClientRect();if(!(r.width>0))continue;const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);if(t&&(t===e||e.contains(t)))return {x:r.left+r.width/2,y:r.top+r.height/2,l:e.textContent.trim().slice(0,20)}}return null});if(cc){if(cc.l)console.error('fallback tap',cc.l);if(dev==='fold')await p.touchscreen.tap(cc.x,cc.y);else await p.mouse.click(cc.x,cc.y)}await p.waitForTimeout(1500)}
const out=[];
for(const lab of LABELS)for(const how of ['button','x']){
 await p.evaluate(lab=>{window.__done=0;kg82Open({art:"Thử",title:"Kết quả",how:"",round:"Môn",roundV:"1/2"});kg82ShowRes(kg82Rows([["Màn chơi","5/10 · Khá","t"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">${lab}</button></div>`,true);document.getElementById('kg82ok').onclick=()=>{kg82Close();window.__done=1}},lab);
 await p.waitForTimeout(600);
 if(!globalThis.__s){globalThis.__s=1;await p.screenshot({path:require('os').tmpdir()+'/r3-'+dev+'-'+port+'.png'})}const st=await p.evaluate(()=>{const b=document.getElementById('kg82ok');const r=b.getBoundingClientRect();const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {cov:t&&(t.id||String(t.className)).slice(0,40),shown:r.width>0&&!b.hidden,hit:!!(t&&(t===b||b.contains(t))),x:!!document.querySelector('#kg82 .kit-x')}});
 const ok=how==='button'?(st.shown?await rt.tap('#kg82ok',{label:lab}):false):await rt.tap('#kg82 .kit-x',{label:'✕'});await p.waitForTimeout(600);
 const done=await p.evaluate(()=>window.__done===1);out.push({lab,how,...st,tap:ok,movedOn:done});
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});await p.waitForTimeout(300)}
for(const o of out)console.log(JSON.stringify(o));console.log('ERRS',errs.length,errs.slice(0,2).join(' | '));await b.close()})();
