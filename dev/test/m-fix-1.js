/* m-fix-1 (robot M4 25/11) items 2 + 3. usage: node dev/test/m-fix-1.js dev/index.html
   2. «Sang buổi / Sang ngày mới» disabled while a queued card is HELD (jdayq gate (c): nothing on screen shows it) must SAY WHY (CTM_WAIT.dqHeld,
      #next.kcwait) and come back to its own label once the card is shown; never a silent grey button.
   3. ONE «Nhận thân phận» at the start: the roulette's button only shows the card («Xem thân phận»), the identity card (j52) takes it. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');(async()=>{const F=[];const ok=(c,n)=>{console.log((c?'PASS ':'FAIL ')+n);if(!c)F.push(n)};
const B=path.join(__dirname,'..','build');const rd=f=>fs.readFileSync(path.join(B,f),'utf8');
const nhan=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js').filter(f=>/(textContent=|>)\s*"?Nhận thân phận/.test(rd(f).replace(/\/\*[\s\S]*?\*\//g,'')));
ok(nhan.length===1&&nhan[0]==='j52.js','one «Nhận thân phận» button in the build (j52 identity card): '+nhan.join(','));ok(/go\.textContent="Xem thân phận"/.test(rd('jk2b.js')),'roulette button = «Xem thân phận»');
const b=await chromium.launch();for(const dev of ['fold','ipad']){const vp=dev==='ipad'?{width:1180,height:820}:{width:755,height:1000};
 const ctx=await b.newContext({viewport:vp,hasTouch:true,isMobile:dev!=='ipad'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(process.argv[2]||'dev/index.html'));await p.waitForFunction(()=>typeof start==='function'&&typeof dqNextCue==='function',null,{timeout:180000});await p.waitForTimeout(1500);
 const r=await p.evaluate(async()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();Q.length=0;document.querySelectorAll('#klife,.kmov,#kroul').forEach(e=>e.remove());render();
  const n=document.getElementById('next'),M=document.getElementById('modal'),w=ms=>new Promise(r=>setTimeout(r,ms));const o={free:[n.disabled,n.textContent]};
  const ov=document.createElement('div');ov.className='kmov';document.body.appendChild(ov);/* an activity is open (jdayq gate (c) dqActEl: a kit motion scene) */
  Q.push({t:"<p>Thử</p>",opts:[{n:"Đã hiểu",fx:{},go:()=>{}}]});showModal();render();await w(300);o.held=[n.disabled,n.textContent,n.classList.contains('kcwait'),M.hidden];
  ov.remove();showModal();render();await w(800);o.shown=[n.disabled,n.textContent,M.hidden];Q.length=0;showModal();render();await w(800);o.after=[n.disabled,n.textContent,n.classList.contains('kcwait')];o.cue=CTM_WAIT.dqHeld;return o});
 console.log(dev,JSON.stringify(r));ok(!r.free[0]&&/Sang/.test(r.free[1]),dev+': free → «'+r.free[1]+'» enabled');ok(r.held[0]&&r.held[1]===r.cue&&r.held[2],dev+': held card → disabled + says «'+r.cue+'»');
 ok(r.shown[1]!==r.cue&&!r.shown[2],dev+': card shown → own label back');ok(!r.after[0]&&/Sang/.test(r.after[1])&&!r.after[2],dev+': after → «'+r.after[1]+'»');ok(!errs.length,dev+': no page errors '+errs.slice(0,2).join(' | '));await ctx.close()}
await b.close();process.exit(F.length?1:0)})();
