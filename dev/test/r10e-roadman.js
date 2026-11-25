/* robot10 E-FIX-5 (R8 bd_hen «TypeError: Cannot read properties of undefined (reading '1')», 5/5 skilled lives, Fold + iPad real pages):
   the hòa-thân road men (jrd_bd «mbd_*», jrd_pt «mpt_*», role «Sứ thần») are men, but every display test of «is a man» matched only ids m<digits>,
   so the Giao tình picker drew him as a SERVANT (srkName → SRK["Sứ thần"] undefined → TypeError) and filed him under «Cung nhân».
   Checks on a bd_hen save: every tab + the relation picker, no servant title asked for a non-servant, no console.error, the road man listed in
   «Nam nhân» with a man's face. usage: node dev/test/r10e-roadman.js <save.json> (a bd / pf road life with its sứ thần met)   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const SV=process.argv[2];const {serve,BASE}=require('./coop-serve.js');let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});for(const [w,h,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const ce=[],pe=[];p.on('pageerror',e=>pe.push(String(e)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))ce.push(m.text().slice(0,160))});
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(800);
 await p.evaluate(()=>{const f=srkName;srkName=function(s){if(!s||!SRK[s.role])(window.__bad=window.__bad||[]).push((s&&s.role)+' '+(s&&s.name));return f.apply(this,arguments)}});
 await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());SLOT=3;Q=[];quiet=true;deser(JSON.parse(d));quiet=false;render();try{Q.length=0;closeModal()}catch(e){}document.getElementById('title').hidden=true},fs.readFileSync(SV,'utf8'));await p.waitForTimeout(1000);
 const man=await p.evaluate(()=>{const m=(S.men||[]).find(m=>/^m[a-z]+_/.test(m.id)&&m.alive!==false);return m?m.name.split(' ').slice(-2).join(' '):null});ok(!!man,tag+': the save has a road man (sứ thần)',man);
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('.bar [data-tab]')].filter(e=>e.offsetParent!==null).map(e=>e.dataset.tab));
 for(const t of tabs){await p.evaluate(t=>{try{Q.length=0;closeModal()}catch(e){}document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());const b=document.querySelector('.bar [data-tab="'+t+'"]');if(b&&!b.disabled)b.click()},t);await p.waitForTimeout(350)}
 await p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}document.querySelector('.bar [data-tab="rel"]').click()});await p.waitForTimeout(600);
 const bx=await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].filter(e=>e.offsetParent!==null&&e.children.length===0&&e.textContent.trim()==='Hoàng thượng')[0];if(!e)return null;const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});
 if(bx){await p.mouse.click(bx[0],bx[1]);await p.waitForTimeout(700)}
 const grp={};for(const g of ['Nam nhân','Cung nhân']){await p.evaluate(g=>{const e=[...document.querySelectorAll('#modal *')].filter(e=>e.offsetParent!==null&&e.textContent.trim().startsWith(g)&&e.textContent.length<20).pop();e&&e.click()},g);await p.waitForTimeout(500);
  grp[g]=await p.evaluate(()=>[...document.querySelectorAll('#modal *')].filter(e=>e.offsetParent!==null&&e.children.length===0).map(e=>e.textContent.trim()).join('|'))}
 const bads=await p.evaluate(()=>window.__bad||[]);ok(!bads.length,tag+': no servant title asked for a non-servant (srkName)',bads.slice(0,3));
 ok(!!bx&&man&&grp['Nam nhân'].includes(man),tag+': the road man is listed under «Nam nhân»',man);ok(!man||!(grp['Cung nhân']||'').includes(man),tag+': … and not under «Cung nhân»');
 ok(!ce.length&&!pe.length,tag+': no console.error / page error',ce.concat(pe).slice(0,3));await ctx.close()}await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
