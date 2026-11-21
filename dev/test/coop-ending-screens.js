/* coop-ending-screens (review/ending-screens, KIT §91.6): in a co-op room BOTH seats end their life → each sees ITS OWN full-screen ending screen
   (kes-t-death with her own name), «Chuyển kiếp» works on both, nobody is stuck (both play the next life, the week advances). Live Worker, like coop-e2e.
   usage: python3 dev/build/assemble.py && node dev/test/coop-ending-screens.js */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,300):''))};
/* clear = coop-e2e clear(): km overlays, «Nhận thân phận», the dialog's main button; it never presses an ending screen (that is the check) */
const clear=async(p,n=25)=>{for(let i=0;i<n;i++){const r=await p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}
  const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
  const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
  const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';if(/\bkes\b/.test(m.className))return'end';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);
  const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
 if(r==='mg'){await p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}if(r!=='x')return r;await sleep(200)}return'many'};
const tap=(p,re)=>p.evaluate(s=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&new RegExp(s).test(b.textContent.trim()));if(b){b.click();return true}return false},re);
const st=p=>p.evaluate(()=>({n:S&&S.name,dead:!!(S&&S.dead),week:COOP.state.week,cls:document.getElementById('modal').className,hid:document.getElementById('modal').hidden,t:(document.querySelector('#modal .kptitle')||document.getElementById('mt')||{}).textContent||''}));
(async()=>{const b=await chromium.launch();const mk=async(vp)=>{const c=await b.newContext({viewport:{width:vp[0],height:vp[1]},reducedMotion:'reduce'});await serve(c);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.errs=errs;return p};
 const A=await mk([755,1000]),B=await mk([1180,820]);await A.goto(BASE);await A.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000});await A.waitForTimeout(1500);
 await tap(A,'^(Chơi cùng bạn|Cùng hảo hữu)');await A.waitForTimeout(500);await tap(A,'^(Mời bạn|Mời hảo hữu)');await A.waitForTimeout(3000);
 await A.waitForFunction(()=>COOP.state.room,null,{timeout:30000}).catch(()=>{});const code=await A.evaluate(()=>COOP.state.room);await B.goto(BASE+'?room='+code);await B.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000});await B.waitForTimeout(1500);for(let i=0;i<16&&!(await tap(B,'^Vào phòng'));i++)await sleep(250);
 await A.waitForFunction(()=>COOP.state.room&&COOP.state.you==='a',null,{timeout:30000}).catch(()=>{});
 for(let i=0;i<120;i++){await clear(A);await clear(B);const w=async p=>p.evaluate(()=>typeof S!=='undefined'&&!!S&&!!S.name&&!!(window.COOPW&&COOPW.base)&&!COOPW.inLife).catch(()=>false);if(await w(A)&&await w(B))break;await sleep(500)}
 for(let i=0;i<20;i++){await clear(A);await clear(B);await sleep(250)}
 const nA=(await st(A)).n,nB=(await st(B)).n;ok(nA&&nB,'both seats in the room',[nA,nB]);
 await A.evaluate(()=>die('Bệnh nặng'));await B.evaluate(()=>die('Trúng độc'));await sleep(4000);await A.evaluate(()=>{try{kmReset()}catch(e){}});await B.evaluate(()=>{try{kmReset()}catch(e){}});await sleep(600);
 const a=await st(A),c=await st(B);
 ok(a.dead&&/\bkes-t-death\b/.test(a.cls)&&!a.hid,'host sees her own full-screen ending',a);
 ok(c.dead&&/\bkes-t-death\b/.test(c.cls)&&!c.hid,'guest sees her own full-screen ending',c);
 ok(await A.evaluate(n=>document.getElementById('modal').innerText.includes(n),nA)&&await B.evaluate(n=>document.getElementById('modal').innerText.includes(n),nB),'each ending screen names that seat\'s own person');
 await tap(A,'^Chuyển kiếp');await tap(B,'^Chuyển kiếp');
 for(let i=0;i<80;i++){await clear(A);await clear(B);const x=await st(A),y=await st(B);if(!x.dead&&!y.dead&&x.n&&y.n&&x.n!==nA&&y.n!==nB)break;await sleep(500)}
 const a2=await st(A),c2=await st(B);ok(!a2.dead&&a2.n&&a2.n!==nA&&!/\bkes\b/.test(a2.cls),'host: «Chuyển kiếp» → a new person, no ending screen left',a2);ok(!c2.dead&&c2.n&&c2.n!==nB&&!/\bkes\b/.test(c2.cls),'guest: «Chuyển kiếp» → a new person, no ending screen left',c2);
 const w0=a2.week;const next=p=>p.evaluate(()=>{const b=document.getElementById('next');if(b&&!b.disabled){b.click();return true}return false});
 for(let i=0;i<120;i++){await clear(A);await clear(B);await next(A);await next(B);await sleep(400);const x=await st(A);if(x.week>w0)break}
 ok((await st(A)).week>w0,'not stuck: the week advances after both rebirths',{w0,w:(await st(A)).week});
 ok(!A.errs.length&&!B.errs.length,'no page errors',A.errs.concat(B.errs).slice(0,4));
 await b.close();const nb=res.filter(x=>!x).length;console.log(`coop-ending-screens: ${res.length-nb}/${res.length} pass`);process.exit(nb?1:0)})();
