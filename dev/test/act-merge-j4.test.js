/* ACT-MERGE J4 test: tab doors (Học · Thêm người · Thưởng phạt · Dạy con · Mua đồ). usage: node dev/test/act-merge-j4.test.js [index.html] [WxH]
   Real taps on the real page: the tab shows ONE button per merged family, its option dialog lists every old way with its own reason,
   and choosing a way runs the old engine (cost taken / state changed). 0 page errors. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const src=fs.readFileSync(path.join(__dirname,'act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(__dirname,'../../dev/index.html'));const [W,H]=(process.argv[3]||'755x1000').split('x').map(Number);
let fail=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)fail++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:true,reducedMotion:'reduce',serviceWorkers:'block'});
const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);await p.evaluate(LIB);
const names=`(sel)=>[...document.querySelectorAll('#panel '+sel)].map(x=>{const k=x.querySelector('.kan');return (k?k.textContent:x.firstChild.textContent).replace(/\\s+/g,' ').trim()})`;
const E=(f,...a)=>p.evaluate(f,...a);
/* 1. Tài nghệ / Tứ đức: one «Học» per skill */
let r=await E(()=>{AA.scen('cao');AA.restore(1);AA.show(AA.surfaces().find(s=>s.id==='art'));const bs=[...document.querySelectorAll('#panel button[data-learndoor]')];
 const old=[...document.querySelectorAll('#panel button[data-learn],#panel button[data-vlearn]')].length;
 const k='cam';const d=document.querySelector('[data-learndoor]');d.click();const o=Q[0]&&Q[0].opts.map(x=>x.n+(x.off?'|off':''));const t=Q[0]&&Q[0].t;
 return {doors:bs.length,old,o,t,arts:ARTS.length,virs:VIR.length}});
ok(r.doors>=1,'Học doors shown on this sub-tab: '+r.doors);ok(r.old===0,'no old Tự học/Học với thầy/… button left in the tab ('+r.old+')');
ok(/Tự học/.test(r.o.join()),'dialog lists Tự học · '+r.o.join(' / '));ok(r.o.some(x=>/thầy|ma ma/.test(x)),'dialog lists Học với thầy');
r=await E(()=>{const u0=used;const i=Q[0].opts.findIndex(x=>/^Tự học/.test(x.n)&&!x.off);chooseM(i);return {u0,opened:!!(S.mg||document.querySelector('.kgdefer,#kg,.kgame')||Q.length||document.querySelector('#modal:not([hidden])'))}});
ok(r.opened,'choosing Tự học runs the old lesson flow');
/* 2. Cung nhân */
r=await E(()=>{AA.scen('cao');AA.restore(1);AA.show(AA.surfaces().find(s=>s.id==='staff:1'));const bs=[...document.querySelectorAll('#panel button')].filter(x=>x.querySelector('small')).map(x=>(x.querySelector('.kan')||x.firstChild).textContent.trim());
 const d=document.querySelector('[data-j4door^="sj:"]');d.click();const o=Q[0].opts.map(x=>x.n);const b0=S.bac;const i=Q[0].opts.findIndex(x=>/^Thưởng/.test(x.n)&&!x.off);chooseM(i);return {bs,o,b0,b1:S.bac}});
ok(r.bs.filter(x=>/Thưởng|Phạt|Đổi người|Đề bạt/.test(x)).length===1,'one Thưởng phạt button on a servant: '+r.bs.join(' | '));ok(r.b1<r.b0,'Thưởng runs the old engine (Bạc '+r.b0+' → '+r.b1+')');
r=await E(()=>{AA.scen('cao');AA.restore(1);AA.show(AA.surfaces().find(s=>s.id==='staff:0'));return [...document.querySelectorAll('#panel button')].map(x=>(x.querySelector('.kan')||x.firstChild).textContent.trim()).filter(x=>/Thêm/.test(x))});
ok(r.length===1&&r[0]==='Thêm người','one «Thêm người» (was Thêm cung nữ + Thêm thái giám): '+r.join());
/* 3. Hoàng tự */
r=await E(()=>{AA.scen('con');AA.restore(1);AA.show(AA.surfaces().find(s=>/^kid/.test(s.id)));const bs=[...document.querySelectorAll('#panel button')].filter(x=>x.querySelector('small')).map(x=>(x.querySelector('.kan')||x.firstChild).textContent.trim());return bs});
ok(r.length<=5&&r.includes('Dạy con'),'Hoàng tự ≤5 buttons: '+r.join(' | '));
/* 4. Tư trang */
r=await E(()=>{AA.scen('cao');AA.restore(1);AA.show(AA.surfaces().find(s=>s.id==='inv'));const bs=[...document.querySelectorAll('#panel button')].filter(x=>x.querySelector('small')).map(x=>(x.querySelector('.kan')||x.firstChild).textContent.trim());
 const d=document.querySelector('[data-ill="door"]');d.click();const o=Q[0].opts.map(x=>x.n+(x.off?'|off':''));const i=Q[0].opts.findIndex(x=>/Thái y viện/.test(x.n)&&!x.off);if(i>=0)chooseM(i);return {bs,o,next:Q[0]&&Q[0].t}});
ok(r.bs.filter(x=>/Mua đồ/.test(x)).length===1&&!r.bs.some(x=>/Sai cung nữ|Hối lộ|Chợ đen/.test(x)),'Tư trang: one «Mua đồ»: '+r.bs.join(' | '));
ok(/Thái y viện/.test(r.next||''),'way «Hối lộ người ở Thái y viện» opens the old item dialog: '+r.next);
r=await E(()=>{AA.scen('cao');AA.restore(1);const s=S.staff[0];const A=talkOpts({kind:'serv',ref:s,sid:s.sid}).map(a=>a.n);const t=talkOpts({kind:'serv',ref:s,sid:s.sid}).find(a=>a.n==='Thưởng phạt');t.open();return {A,q:Q[0]&&Q[0].t}});
ok(r.A.includes('Thưởng phạt')&&!r.A.some(x=>/^(Thưởng vô|Phạt vô|Đổi người)/.test(x)),'servant stage pop-up: one Thưởng phạt: '+r.A.join(' | '));ok(r.q==='Thưởng phạt','pop-up door opens the dialog');
ok(perr.length===0,'0 page errors '+JSON.stringify(perr));
await b.close();console.log(fail?'FAILED '+fail:'ALL PASS');process.exit(fail?1:0)})();
