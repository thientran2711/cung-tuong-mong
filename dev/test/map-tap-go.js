/* map-tap-go test: tap a place on Dư đồ = go at once (no card, no undo); plain arrival toast; unreachable = reason toast; place card has no person column.
   usage: node dev/test/map-tap-go.js <device> <outdir>  (serves the BUILT root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,DEV='ipadAir',OUT='/tmp']=process.argv;fs.mkdirSync(OUT,{recursive:true});let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,DEV,{ignoreHTTPSErrors:true,reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(2500);
 const reset=(u,bu)=>g.evaluate(([u,bu])=>{for(const e of [...document.querySelectorAll('#kroul,#kroulw,.kroul,#kload,.kloadchip')])e.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;S.acPass={};S.invite=null;S.buoi=bu;used=u;tab='go';render()},[u,bu]);
 const st=()=>g.evaluate(()=>({place:S.place,used,buoi:S.buoi,q:Q.length,modal:!document.getElementById('modal').hidden,toast:(document.getElementById('rtoast')||{}).innerText||'',on:!!(document.getElementById('rtoast')&&document.getElementById('rtoast').classList.contains('on'))}));
 await reset(0,0);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(900); /* warm-up: the one-time chapter goal 'Đi một nơi trong cung' card is consumed here */
 for(const [name,u,bu] of [['mid-buổi',0,0],['last-walk',2,0]]){
  await reset(u,bu);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(700);const a=await st();
  ok(a.place==='vuon'&&!a.modal&&!a.q,`${name}: went at once, no card (${JSON.stringify(a)})`);ok(/ĐẾN/.test(a.toast)&&!/Quay lại/.test(a.toast)&&a.on&&!await g.evaluate(()=>!!document.querySelector('#rtoast button')),`${name}: arrival toast, no undo button: ${a.toast.replace(/\s+/g,' ')}`);
  await g.evaluate(()=>document.querySelectorAll('.kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/mtg-${DEV}-${name}.png`});
 }
 await reset(3,0);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(900);const sp=await st();ok(sp.place==='vuon'||sp.q>0,`spill: goes at once, no confirm card (${JSON.stringify(sp)})`);
 await reset(3,3);await p.waitForTimeout(1500);await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const t=document.getElementById('rtoast');if(t)t.classList.remove('on');j77Tap('tn')});await p.waitForTimeout(500);const d=await st();
 ok(d.place==='home'&&!d.modal&&d.on&&/hết khắc/.test(d.toast),`blocked: stays, reason toast (${d.toast.replace(/\s+/g,' ')})`);await g.evaluate(()=>document.querySelectorAll('.kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/mtg-${DEV}-blocked.png`});
 await reset(0,3);await g.evaluate(()=>j77Tap('thu'));await p.waitForTimeout(900);const c2=await g.evaluate(()=>({modal:!document.getElementById('modal').hidden,figs:document.querySelectorAll('#modal .kszfig,#modal .k3mpor,#modal .kes,#modal .kfig').length,t:document.getElementById('mt').textContent}));
 await g.evaluate(()=>document.querySelectorAll('.kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/mtg-${DEV}-card.png`});
 ok(c2.modal&&c2.figs===0,`rule-locked place with choices opens the ONE place card, no person column (${JSON.stringify(c2)})`);
 await reset(0,0);await g.evaluate(()=>j77Tap('kn'));await p.waitForTimeout(900);const e=await g.evaluate(()=>({modal:!document.getElementById('modal').hidden,figs:document.querySelectorAll('#modal .kszfig,#modal .k3mpor,#modal .kes,#modal .kfig').length,place:S.place}));
 ok(e.figs===0,`place card with choices (or arrival) has no person column (${JSON.stringify(e)})`);
 ok(errs.length===0,'page errors '+errs.slice(0,3).join('|'));await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
