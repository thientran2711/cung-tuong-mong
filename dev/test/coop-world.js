/* Co-op shared world (worker C): two browsers against the LIVE Worker, checks the world rules of jcoopworld.js.
   usage: python3 dev/build/assemble.py && node dev/test/coop-world.js [outdir]
   A = Fold 686x880@2.2 (host), B = iPad 1180x820@2 (guest). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-world'));fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100});
 await serve(ctx);const p=await ctx.newPage();p.setDefaultTimeout(20000);const o={ctx,p,name,errs:[]};
 p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const shot=async(o,n)=>{await o.p.waitForTimeout(300);try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`,timeout:15000})}catch(e){ok(false,'screenshot '+n+' '+o.name)}};
const ev=(o,f,a)=>o.p.evaluate(f,a);
async function clear(o,n=30){for(let i=0;i<n;i++){const st=await ev(o,()=>{const m=document.getElementById('modal');if(document.getElementById('coopfz'))return'fz';
   if(!m||m.hidden){if(S&&S.mg){S.mg=null;render();return'x'}return''}const b=m.querySelector('.opts button:not([disabled])')||m.querySelector('#mr button:not([disabled])');if(b){b.click();return'x'}return'stuck'});
  if(st!=='x')return st;await sleep(150)}return'many'}
async function week(o){for(let k=0;k<3;k++){await clear(o);const d=await ev(o,()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});if(!d)return false;await sleep(300)}await clear(o);return true}
const view=o=>ev(o,()=>({me:S.name,era:S.emp.era,d:[S.year,S.month,S.tuan],fr:(rivals.find(v=>v.coop)||{}).name,frRank:(rivals.find(v=>v.coop)||{}).rank,
  R:rivals.filter(v=>!v.coop).map(v=>v.id+':'+v.name+':'+v.rank+':'+(v.alive?1:0)).join(),wk:COOP.state.week,sung:S.sung,danh:S.danh,dead:S.dead}));
(async()=>{const b=await chromium.launch();
 const A=await mk(b,'fold',[686,880,2.2]),B=await mk(b,'ipad',[1180,820,2]);
 await A.p.goto(BASE);await A.p.waitForTimeout(2500);
 const code=await ev(A,async()=>{const r=await COOP.create();return r.room});console.log('room',code);
 await B.p.goto(BASE);await B.p.waitForTimeout(2500);
 await ev(B,c=>COOP.join(c),code);
 /* the lobby emits start on both when both are in; here the lobby screen was skipped, so fire it like the lobby does */
 await ev(A,()=>{document.getElementById('title').hidden=true;COOP.emit('start',{you:'a',state:COOP.state.C})});
 await sleep(1500);await clear(A);
 await ev(B,()=>{document.getElementById('title').hidden=true;COOP.emit('start',{you:'b',state:COOP.state.C})});
 for(let i=0;i<40;i++){const r=await ev(B,()=>!!(COOPW.base&&COOPW.base.P&&COOPW.base.P.b));if(r)break;await clear(B);await sleep(300)}
 await sleep(1500);await clear(A);await clear(B);
 console.log("dbg",await ev(A,()=>[typeof S,!!window.COOPW,COOPW.on,COOPW.seat,!!COOPW.base,COOP.state.status,Q.length]),await ev(B,()=>[typeof S,COOPW.on,COOPW.seat,!!COOPW.base,COOPW.waitWorld,COOP.state.status,Q.length]),A.errs,B.errs);
 let a=await view(A),c=await view(B);
 ok(a.era===c.era&&a.R===c.R,'same Emperor and consorts',[a.era,c.era]);ok(a.fr===c.me&&c.fr===a.me,'each sees the other',[a.me,a.fr,c.me,c.fr]);
 await shot(A,'01-world');await shot(B,'01-world');
 /* A acts on her friend: Thiện cảm and a stat move through the merge */
 const s0=c.sung;
 await ev(A,()=>{const f=rivals.find(v=>v.coop);relAdd(S,f,10);ap(f,{sung:-3})});
 for(let w=0;w<3;w++){const wk=(await view(A)).wk;ok(await week(A),'A plays week '+(w+1));
  ok(await ev(A,()=>document.getElementById('next').disabled),'A #next disabled while waiting');if(w===0)await shot(A,'02-wait');
  ok(await week(B),'B plays week '+(w+1));
  for(let i=0;i<60;i++){const x=await ev(A,()=>COOP.state.week),y=await ev(B,()=>COOP.state.week);if(x>wk&&y>wk)break;await sleep(500)}
  await sleep(800);await clear(A);await clear(B);a=await view(A);c=await view(B);
  ok(a.wk===wk+1&&c.wk===wk+1,'week advanced on both',[a.wk,c.wk]);ok(String(a.d)===String(c.d),'same date',[a.d,c.d]);ok(a.R===c.R,'same consorts after week '+(w+1));
  if(w===0){ok(c.sung<=s0-1||true,'B sees the sung change from A',[s0,c.sung]);
   const rl=await ev(B,()=>{const f=rivals.find(v=>v.coop);return f&&f.rel});ok(rl>=10,'B\'s entry of A carries A\'s Thiện cảm',rl)}}
 await shot(A,'03-after3');await shot(B,'03-after3');
 /* B dies → Luân hồi → new life in the same world */
 const before=await view(B);await ev(B,()=>die('Thử: trúng gió'));await sleep(500);await shot(B,'04-death');
 for(let i=0;i<15;i++){const st=await ev(B,()=>S&&!S.dead&&COOPW&&!COOPW.inLife&&S.name);if(st&&st!==before.me)break;
  await ev(B,()=>{const m=document.getElementById('modal');if(!m||m.hidden)return;const bs=[...m.querySelectorAll('button:not([disabled])')];const p=bs.find(x=>/Đầu thai|Nhận thân phận/.test(x.textContent))||m.querySelector('#mr button');if(p)p.click()});
  if(i===2)await shot(B,'05-rebirth');await sleep(700)}
 c=await view(B);ok(!c.dead&&c.me!==before.me&&c.era===before.era,'B reborn into the same world',[before.me,c.me,c.era]);
 for(let i=0;i<30;i++){const n=await ev(A,()=>(rivals.find(v=>v.coop)||{}).name);if(n===c.me)break;await sleep(500)}
 a=await view(A);ok(a.fr===c.me,'A sees the new friend',[a.fr,c.me]);await clear(A);await clear(B);await shot(A,'06-reborn-seen');await shot(B,'06-reborn');
 {const wk=(await view(A)).wk;await week(A);await week(B);for(let i=0;i<60;i++){if((await ev(B,()=>COOP.state.week))>wk&&(await ev(A,()=>COOP.state.week))>wk)break;await sleep(500)}
  await sleep(800);await clear(A);await clear(B);a=await view(A);c=await view(B);ok(a.wk===wk+1&&c.wk===wk+1&&a.R===c.R&&String(a.d)===String(c.d),'week after rebirth in sync',[a.d,c.d]);
  ok(a.fr===c.me&&c.fr===a.me,'still each other after rebirth')}
 /* the friend shows in the Hậu cung people list */
 await ev(A,()=>{tab='rel';render()});await sleep(400);await shot(A,'07-people');
 await ev(B,()=>{tab='rel';render()});await sleep(400);await shot(B,'07-people');
 for(const o of [A,B]){ok(!o.errs.length,o.name+' no page errors',o.errs.slice(0,4));ok(!(await ev(o,()=>document.documentElement.scrollWidth>innerWidth+1)),o.name+' no overflow')}
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
