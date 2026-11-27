/* RING-BUILD quick look: stills of the ring flow, Fold + iPad. usage: node dev/test/kit-ring-probe.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const boot=require('./kit-ring-boot.js');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const wh of (process.env.SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()==='error')errs.push('c:'+m.text().slice(0,160))});
  const r=await boot(p,{url:URL});console.log(wh,JSON.stringify(r));const sh=n=>p.screenshot({path:`${OUT}/${wh}-${n}.jpg`,type:'jpeg',quality:75});
  await sh('1ring');await p.evaluate(()=>kitRing.turnBy(1));await p.waitForTimeout(700);await sh('2turn');
  await p.evaluate(()=>kitRing.focus());await p.waitForTimeout(1600);await sh('3focus');
  console.log(wh,'acts',await p.evaluate(()=>[...document.querySelectorAll('.kpk .kpk-b b')].map(b=>b.textContent).join(' | ')));
  await p.evaluate(()=>kitRing.back());await p.waitForTimeout(700);await p.evaluate(()=>kitRing.setMode('group'));await p.waitForTimeout(900);await sh('4group');
  await p.evaluate(()=>kitRing.turnBy(1));await p.waitForTimeout(700);await p.evaluate(()=>kitRing.focus());await p.waitForTimeout(1600);await sh('5gfocus');
  await p.evaluate(()=>kitRing.back());await p.waitForTimeout(700);await p.evaluate(()=>kitRing.setMode('person'));await p.waitForTimeout(900);await p.evaluate(()=>kitRing.focus());await p.waitForTimeout(1600);
  const tapS=async s=>{const b=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2]},s);if(b)await p.touchscreen.tap(b[0],b[1]);return !!b};
  const pl=await p.$('.kpk .kpk-n .kpk-b');if(pl){await tapS('.kpk .kpk-n .kpk-b');await p.waitForTimeout(500);await sh('6lift');const ok=await p.$('.kpk .khok');if(ok){await tapS('.kpk .khok');await p.waitForTimeout(1500);await sh('7res1');for(let k=0;k<6&&await p.$('.kring-say');k++){await p.touchscreen.tap(W*.5,H*.5);await p.waitForTimeout(400);await p.touchscreen.tap(W*.5,H*.5);await p.waitForTimeout(500)}await p.waitForTimeout(1200);await sh('8res2');const o2=await p.$('.kpk .kpk-n .kpk-b');if(o2){await tapS('.kpk .kpk-n .kpk-b');await p.waitForTimeout(500);await tapS('.kpk .khok');await p.waitForTimeout(1200);await sh('9res3');console.log(wh,'res3',await p.evaluate(()=>{const t=document.getElementById('rtoast');return {rt:t&&t.className+' '+t.innerText.slice(0,200),q:Q.length,say:(document.querySelector('.kring-say')||{}).innerText,log:S.logs.slice(0,3).map(plain)}}));await p.waitForTimeout(2500);await sh('10res4')}
   console.log(wh,'after',await p.evaluate(()=>({q:Q.length,modal:!document.getElementById('modal').hidden,rt:(document.getElementById('rtoast')||{}).textContent,figs:document.querySelectorAll('#modal .kstg-fig').length,ring:!!kitRing.cur,sel:kitRing.cur&&kitRing.cur.sel})))}}
  console.log(wh,'errs',errs.slice(0,8));await ctx.close()}
 await b.close()})();
