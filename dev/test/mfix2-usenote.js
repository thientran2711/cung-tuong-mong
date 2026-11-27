/* m-fix-2 item 2 scan: usage node dev/test/mfix2-usenote.js fold|ipad <port of a local server on dev/> — 40 / mixed / one bottle (jallot) and box (jration) entries: «lần dùng» lines in the item card «Ghi chú» pop-up, its height, real-tap ! / tap-away / ✕. */
/* item 2: the item card «Ghi chú» with many bottles / boxes — lines count + card fits + ✕ reachable (real tap) */
const {chromium}=require('playwright');const RT=require('./realtap.js');
const dev=process.argv[2]||'fold';const port=process.argv[3]||'8792';const vp=dev==='fold'?{width:755,height:1000}:{width:1180,height:820};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:vp,deviceScaleFactor:1,hasTouch:dev==='fold'});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:'+port+'/index.html',{waitUntil:'domcontentloaded'});
const rt=RT.make(p,{dev});
/* setup by state (m-fix-2-r): the title walk was label-bound (m-fix-1 renamed the roulette button) and passed silently when stuck */
await p.waitForFunction(()=>typeof start==='function'&&typeof kg82Open==='function',null,{timeout:180000});await p.waitForTimeout(1500);
await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});start()});
for(let i=0;i<10;i++){await p.waitForTimeout(600);await p.evaluate(()=>{Q.length=0;document.querySelectorAll('#klife,.kmov,#kroul,#kload').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}})}
const cases=await p.evaluate(()=>{const out=[];
 const dau=Object.keys(IT).filter(k=>typeof alOf==="function"&&alOf(k)&&alOf(k).kind==="dau");
 const lx=Object.keys(IT).filter(k=>typeof lxOf==="function"&&lxOf(k));
 return {dau:dau.slice(0,2),lx:lx.slice(0,2)}});
console.log('keys',JSON.stringify(cases));
const res=[];
for(const [kind,k,mk] of [['dau',cases.dau[0],'40same'],['dau',cases.dau[0],'mixed'],['dau',cases.dau[0],'one'],['lx',cases.lx[0],'40same'],['lx',cases.lx[0],'mixed']]){if(!k)continue;
 const r=await p.evaluate(([kind,k,mk])=>{S.inv=(S.inv||[]).filter(e=>e.k!==k);const n=mk==='one'?1:40;
  for(let i=0;i<n;i++){const e={k,from:'noivu',d:S.turn};S.inv.push(e)}
  if(kind==='dau'&&typeof alFix==="function")alFix(S);if(kind==='lx'&&typeof lxFix==="function")lxFix(S);
  const E=S.inv.filter(e=>e.k===k);if(mk==='mixed')E.forEach((e,i)=>{e.u=Math.max(1,(e.u||6)-(i%3));if(kind==='lx'&&i%2&&typeof BAL==="object")e.c=e.c})
  const f=kitItemCard({e:E[0]});const g=[...f.querySelectorAll('.krow,.kr')].find(x=>/Ghi chú/.test(x.textContent));
  const c=f.querySelector('.kidc').getBoundingClientRect();
  const dr=(kitItemDetailRows({e:E[0]}).match(/<span class="khap[^>]*>/)||['nokhap'])[0];const all=dr+' ##'+f.textContent.replace(/\s+/g,' ');return {txt:all.slice(0,900),note:g?g.textContent.replace(/\s+/g,' ').slice(0,400):'(none)',uses:(f.textContent.match(/lần dùng/g)||[]).length,cardTop:c.top,cardBot:c.bottom,vh:innerHeight}},[kind,k,mk]);
 const gl=await rt.tap('#kidfl .khap[data-kfxt="Ghi chú"]',{label:'! Ghi chú'});await p.waitForTimeout(500);
 const pop=await p.evaluate(()=>{const q=document.getElementById('kpop');if(!q||q.hidden)return null;const r=q.getBoundingClientRect();return {h:Math.round(r.height),top:Math.round(r.top),bot:Math.round(r.bottom),lines:(q.textContent.match(/lần dùng/g)||[]).length,frac:+(r.height/innerHeight).toFixed(2)}});
 await p.screenshot({path:require("os").tmpdir()+`/r2-${dev}-${port}-${kind}-${mk}.png`});
 const vp2=p.viewportSize();if(dev==='fold')await p.touchscreen.tap(vp2.width/2,vp2.height-30);else await p.mouse.click(vp2.width/2,vp2.height-30);await p.waitForTimeout(300);
 const popClosed=await p.evaluate(()=>{const q=document.getElementById('kpop');return !q||q.hidden});
 r.pop=pop;r.glTap=gl;r.popClosed=popClosed;delete r.txt;
 if(!await p.evaluate(()=>!!document.getElementById('kidfl')))await p.evaluate(e=>{const E=S.inv.filter(x=>x.k===e);kitItemCard({e:E[0]})},k);
 const xok=await rt.tap('#kidfl [data-kidx]',{label:'✕ item card'});await p.waitForTimeout(400);
 const gone=await p.evaluate(()=>!document.getElementById('kidfl'));
 res.push({kind,mk,...r,xTap:xok,closed:gone});}
for(const r of res)console.log(JSON.stringify(r));console.log('ERRS',errs.length,errs.slice(0,3).join(' | '));
const F=[];const cap=await p.evaluate(()=>BAL.itd.useGroups);if(res.length<5)F.push('only '+res.length+'/5 cases ran (item keys '+JSON.stringify(cases)+')');
for(const r of res){const id=r.kind+' '+r.mk;if(!r.glTap)F.push(id+': real tap on «!» Ghi chú did not land');if(!r.pop)F.push(id+': no pop-up');else{if(r.pop.lines>cap+2)F.push(id+': '+r.pop.lines+' «lần dùng» lines (max '+(cap+2)+')');if(r.pop.frac>0.5)F.push(id+': pop-up '+r.pop.frac+' of the screen')}
 if(!r.popClosed)F.push(id+': pop-up did not close on a tap');if(!(r.xTap&&r.closed))F.push(id+': item card ✕ real tap did not close')}
if(errs.length)F.push('page errors '+errs.length);for(const x of F)console.log('FAIL '+x);console.log(F.length?'MFIX2-USENOTE FAIL '+F.length:'MFIX2-USENOTE PASS');await b.close();process.exitCode=F.length?1:0})();
