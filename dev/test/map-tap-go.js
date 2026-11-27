/* map-tap-go test: tap a place on Dư đồ = go at once (no card, no undo); no arrival toast (khắc deducted silently); unreachable = reason toast; place card has no person column.
   map-fix-2 (24/11): two owner rules came after this test was written and are now part of it (the test was stale, the game was right):
   (1) ENTOURAGE PICKER (owner OD 18/11 ~19:45Z point (4), j95s): her FIRST departure of a day from her palace asks «Chọn người theo hầu» once (entpick);
       after she picked (S.ent.d = today) every tap goes at once. The «went at once» cases run with today's pick done; one case checks the first tap of the day
       opens the picker and «Đi một mình» then walks her there at once with no second card.
   (2) ONE NOTICE SYSTEM (owner OD 18/11 ~22:10Z, jnotice): every toast (srvToast «CẤM» line included) goes to kitNotice — the «!» box in the top bar + the short top chip
       #kntchip — never the old bottom #rtoast. The toast checks read the notice list (kitNoticeList) and the chip.
   «No card» = no place card / confirm card / picker from the tap (Q items act / entpick); a buổi-turn event after the last walk (the day moves on) is not a tap card.
   «No arrival toast» = no «ĐẾN … Quay lại» undo line; the place-entry line (jplst, «Hoa nở rộ …») is a notice of the place, not an arrival toast.
   usage: node dev/test/map-tap-go.js <device> <outdir>  (serves the BUILT root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const [,,DEV='ipadAir',OUT='/tmp']=process.argv;fs.mkdirSync(OUT,{recursive:true});let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await D.newDeviceContext(b,DEV,{ignoreHTTPSErrors:true,reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(2500);
 const reset=(u,bu,ent)=>g.evaluate(([u,bu,ent])=>{for(const e of [...document.querySelectorAll('#kroul,#kroulw,.kroul,#kload,.kloadchip')])e.remove();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.out=0;S.confined=0;S.acPass={};S.invite=null;S.buoi=bu;used=u;S.ent=ent?undefined:{d:j95sDay(),ids:[],at:'home'};tab='go';render();window.__nt0=kitNoticeList().length?Math.max(...kitNoticeList().map(x=>x.t)):0},[u,bu,ent]);
 const st=()=>g.evaluate(()=>({place:S.place,used,buoi:S.buoi,q:Q.length,modal:!document.getElementById('modal').hidden,pid:Q[0]&&Q[0].pid||'',qa:Q.filter(m=>m.act||m.pid==='entpick').length,toast:kitNoticeList().filter(x=>x.t>window.__nt0).map(x=>x.line).join(' | '),on:!!(document.getElementById('kntchip')&&!document.getElementById('kntchip').classList.contains('out'))||kitNoticeList().some(x=>x.t>window.__nt0)}));
 await reset(0,0);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(900); /* warm-up: the one-time chapter goal 'Đi một nơi trong cung' card is consumed here */
 await reset(0,0,1);const fr=await g.evaluate(()=>j95sMine().filter(x=>x.free).length);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(700);const f0=await st();
 if(fr)ok(f0.place==='home'&&f0.modal&&f0.pid==='entpick',`first departure of the day (${fr} of her people free): the ONE entourage picker «Chọn người theo hầu» (${JSON.stringify(f0)})`);
 else ok(f0.place==='vuon'&&!f0.qa,`first departure of the day, nobody of hers free: no picker, she goes alone at once (j95sEntAsk) (${JSON.stringify(f0)})`);
 if(fr)
 {await g.evaluate(()=>{const m=Q[0];const o=m&&m.opts.find(c=>c.n==='Đi một mình');if(o){Q.shift();document.getElementById('modal').hidden=true;o.go()}});await p.waitForTimeout(700);const f1=await st();
 ok(f1.place==='vuon'&&!f1.qa,`«Đi một mình»: went at once, no second card (${JSON.stringify(f1)})`)}
 for(const [name,u,bu] of [['mid-buổi',0,0],['last-walk',2,0]]){
  await reset(u,bu);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(700);const a=await st();
  ok(a.place==='vuon'&&!a.qa,`${name}: went at once, no place / confirm card (${JSON.stringify(a)})`);ok(!/ĐẾN|Quay lại/.test(a.toast),`${name}: NO arrival toast, no undo (khắc deducted silently, used=${a.used})`);
  await g.evaluate(()=>document.querySelectorAll('.kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/mtg-${DEV}-${name}.png`});
 }
 await reset(3,0);await g.evaluate(()=>j77Tap('vuon'));await p.waitForTimeout(900);const sp=await st();ok(sp.place==='vuon'||sp.q>0,`spill: goes at once, no confirm card (${JSON.stringify(sp)})`);
 await reset(3,3);await p.waitForTimeout(1500);await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__nt0=kitNoticeList().length?Math.max(...kitNoticeList().map(x=>x.t)):0;j77Tap('tn')});await p.waitForTimeout(500);const d=await st();
 ok(d.place==='home'&&!d.modal&&d.on&&/hết khắc/.test(d.toast),`blocked: stays, reason toast (${d.toast.replace(/\s+/g,' ')})`);await g.evaluate(()=>document.querySelectorAll('.kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/mtg-${DEV}-blocked.png`});
 await reset(0,3);await g.evaluate(()=>j77Tap('thu'));await p.waitForTimeout(900);const c2=await g.evaluate(()=>({modal:!document.getElementById('modal').hidden,figs:document.querySelectorAll('#modal .kszfig,#modal .k3mpor,#modal .kes,#modal .kfig').length,t:document.getElementById('mt').textContent}));
 await g.evaluate(()=>document.querySelectorAll('.kload,#klife').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/mtg-${DEV}-card.png`});
 ok(c2.modal&&c2.figs===0,`rule-locked place with choices opens the ONE place card, no person column (${JSON.stringify(c2)})`);
 await reset(0,0);await g.evaluate(()=>j77Tap('kn'));await p.waitForTimeout(900);const e=await g.evaluate(()=>({modal:!document.getElementById('modal').hidden,figs:document.querySelectorAll('#modal .kszfig,#modal .k3mpor,#modal .kes,#modal .kfig').length,place:S.place}));
 ok(e.figs===0,`place card with choices (or arrival) has no person column (${JSON.stringify(e)})`);
 ok(errs.length===0,'page errors '+errs.slice(0,3).join('|'));await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
