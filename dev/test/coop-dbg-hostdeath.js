/* Repro: host dies in buổi tối (after or before Qua đêm) while the guest has ended the week; after rebirth the guest must see her. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const AFTER=process.argv[2]==='after';
const clear=p=>p.evaluate(()=>{const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
 const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
 const m=document.getElementById('modal');if(!m||m.hidden)return'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/Nhận thân phận|Chuyển kiếp|Đầu thai/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled])');if(b){b.click();return'x'}return''});
const tap=(p,re)=>p.evaluate(s=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&new RegExp(s).test(b.textContent.trim()));if(b){b.click();return true}return false},re);
const st=p=>p.evaluate(()=>({n:S&&S.name,dead:S&&S.dead,buoi:S&&S.buoi,week:COOP.state.week,fr:(rivals.find(v=>v.coop)||{}).name||null,Pf:COOPW.base&&COOPW.base.P&&JSON.stringify(Object.fromEntries(Object.entries(COOPW.base.P).map(([k,v])=>[k,[v.name,v.dead,v.S&&v.S.dead,v.life]]))),pend:COOPW.pend,sent:COOPW.sent,inLife:COOPW.inLife}));
(async()=>{const b=await chromium.launch();const mk=async()=>{const c=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce'});await serve(c);const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message,(e.stack||'').split('\n').slice(1,6).join(' <- ')));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text().slice(0,200))});return p};
const A=await mk(),B=await mk();await A.goto(BASE);await A.waitForTimeout(3000);await tap(A,'^Chơi cùng bạn');await A.waitForTimeout(500);await tap(A,'^Mời bạn');await A.waitForTimeout(3000);
const code=await A.evaluate(()=>COOP.state.room);await B.goto(BASE+'?room='+code);await B.waitForTimeout(3000);await tap(B,'^Vào phòng');
for(let i=0;i<60;i++){await clear(A);await clear(B);if(await A.evaluate(()=>typeof S!=='undefined'&&!!S&&!!COOPW.base&&rivals.some(v=>v.coop))&&await B.evaluate(()=>typeof S!=='undefined'&&!!S&&!!COOPW.base&&rivals.some(v=>v.coop)))break;await sleep(500)}
const next=p=>p.evaluate(()=>{const b=document.getElementById('next');if(b&&!b.disabled){b.click();return true}return false});
for(let k=0;k<2;k++){for(let i=0;i<40&&!(await next(A));i++){await clear(A);await sleep(250)}for(let i=0;i<40&&!(await next(B));i++){await clear(B);await sleep(250)}
 for(let i=0;i<40;i++){await clear(A);await clear(B);const a=await st(A),c=await st(B);if(a.buoi===k+1&&c.buoi===k+1)break;await sleep(250)}}
console.log('at tối',JSON.stringify(await st(A)),JSON.stringify(await st(B)),'TRA',await A.evaluate(()=>COOPW.tr.join(' | ')),'TRB2',await B.evaluate(()=>COOPW.tr.join(' | ')));
if(AFTER){await next(A);await sleep(800)}   // host presses Qua đêm, dialogs still open
for(let i=0;i<40&&!(await next(B));i++){await clear(B);await sleep(250)}for(let i=0;i<20;i++){await clear(B);await sleep(250)}
console.log('B ended',await st(B),'TRB',await B.evaluate(()=>COOPW.tr.join(' | ')));
await A.evaluate(()=>die('Thử'));for(let i=0;i<30;i++){await clear(A);await sleep(400);const a=await st(A);if(!a.dead&&!a.inLife&&a.n)break}
console.log('A reborn',await st(A),await A.evaluate(()=>COOPW.tr.join(' | ')));await sleep(2000);console.log('B after A reborn',await st(B));
for(let i=0;i<60;i++){await clear(A);await clear(B);await next(A);await sleep(300);const a=await st(A),c=await st(B);if(a.week>0&&c.week>0)break}
await sleep(1500);console.log('after week A',await st(A));console.log('after week B',await st(B));await b.close()})();
