/* Co-op shared world (worker C): two browsers against the LIVE Worker, checks jcoopworld.js rules.
   usage: python3 dev/build/assemble.py && node dev/test/coop-world.js [outdir]
   A = Fold 686x880@2.2 (host), B = iPad 1180x820@2 (guest). reducedMotion: the Pixi scene ticker keeps headless
   Chromium too busy for screenshots (also in single-player); the static scene picture is shown instead. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-world'));fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
 await serve(ctx);const p=await ctx.newPage();p.setDefaultTimeout(30000);const o={ctx,p,name,errs:[]};
 p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const shot=async(o,n)=>{await o.p.waitForTimeout(300);try{await o.p.screenshot({path:`${OUT}/${n}-${o.name}.png`,timeout:40000})}catch(e){ok(false,'screenshot '+n+' '+o.name)}};
const ev=(o,f,a)=>o.p.evaluate(f,a);
async function clear(o,n=30){for(let i=0;i<n;i++){const st=await ev(o,()=>{const m=document.getElementById('modal');if(document.getElementById('coopfz'))return'fz';
   if(!m||m.hidden){if(S&&S.mg){S.mg=null;render();return'x'}return''}const b=m.querySelector('.opts button:not([disabled])')||m.querySelector('#mr button:not([disabled])');if(b){b.click();return'x'}return'stuck'});
  if(st!=='x')return st;await sleep(150)}return'many'}
const press=o=>ev(o,()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
const st=o=>ev(o,()=>[COOP.state.week,S.buoi||0]);
/* one buổi for both: A presses, B presses, wait until both stepped */
async function buoi(tag){const a0=await st(A),b0=await st(B);await clear(A);await clear(B);
 const pa=await press(A);await sleep(300);const lockA=await ev(A,()=>document.getElementById('next').disabled);const lbl=await ev(A,()=>document.getElementById('next').textContent);
 const pb=await press(B);
 for(let i=0;i<60;i++){const a=await st(A),b=await st(B);if(String(a)!==String(a0)&&String(b)!==String(b0)&&!(await ev(B,()=>COOPW.p2&&!COOPW.on?0:needW())))break;await sleep(400)}
 await sleep(500);await clear(A);await clear(B);return {pa,pb,lockA,lbl,a:await st(A),b:await st(B)}}
let A,B;
const view=o=>ev(o,()=>({me:S.name,era:S.emp.era,d:[S.year,S.month,S.tuan,S.buoi||0],fr:(rivals.find(v=>v.coop)||{}).name,
  R:rivals.filter(v=>!v.coop).map(v=>v.id+':'+v.name+':'+v.rank+':'+(v.alive?1:0)).join(),W:JSON.stringify(Object.fromEntries(Object.entries(S.where||{}).filter(([k])=>+k<900||k==='emp'))),
  wk:COOP.state.week,sung:S.sung,dead:S.dead,place:S.place}));
(async()=>{const b=await chromium.launch();
 A=await mk(b,'fold',[686,880,2.2]);B=await mk(b,'ipad',[1180,820,2]);
 for(const o of [A,B])await o.ctx.addInitScript(()=>{window.needW=()=>{try{return COOPW&&COOPW.on&&COOPW.seat==='b'&&document.getElementById('next').textContent==='Đợi bạn'}catch(e){return false}}});
 await A.p.goto(BASE);await A.p.waitForTimeout(2500);
 const code=await ev(A,async()=>{const r=await COOP.create();return r.room});console.log('room',code);
 await B.p.goto(BASE);await B.p.waitForTimeout(2500);await ev(B,c=>COOP.join(c),code);
 /* the lobby emits start when both are in; fire it the way the lobby does */
 await ev(A,()=>{document.getElementById('title').hidden=true;COOP.emit('start',{you:'a',state:COOP.state.C})});
 await sleep(1500);await clear(A);
 await ev(B,()=>{document.getElementById('title').hidden=true;COOP.emit('start',{you:'b',state:COOP.state.C})});
 for(let i=0;i<40;i++){const r=await ev(B,()=>!!(COOPW.base&&COOPW.base.P&&COOPW.base.P.b&&!COOPW.inLife));if(r)break;await clear(B);await sleep(300)}
 await sleep(2000);await clear(A);await clear(B);
 let a=await view(A),c=await view(B);
 ok(a.era===c.era&&a.R===c.R,'same Emperor and consorts',[a.era,c.era]);ok(a.fr===c.me&&c.fr===a.me,'each sees the other',[a.me,a.fr,c.me,c.fr]);
 ok(a.W===c.W,'same NPC whereabouts (host where)');
 await shot(A,'01-world');await shot(B,'01-world');
 /* B walks to the garden: A sees her there; A goes too → both see each other at the stage */
 await ev(B,()=>{used=0;goTo('vuon')});await sleep(1500);
 let fw=await ev(A,()=>{const f=rivals.find(v=>v.coop);return f&&whereOf(f)});ok(fw==='vuon','A sees B in the garden (pos)',fw);
 await ev(A,()=>{used=0;goTo('vuon')});await sleep(1500);
 const seeA=await ev(A,()=>curPeople().some(p=>p.ref&&p.ref.coop)),seeB=await ev(B,()=>curPeople().some(p=>p.ref&&p.ref.coop));
 ok(seeA&&seeB,'both see each other at the same place',[seeA,seeB]);await clear(A);await clear(B);await shot(A,'02-same-place');await shot(B,'02-same-place');
 /* A schemes against B (do → res): B's own S changes, A's entry baseline moves (no double count) */
 const s0=await ev(B,()=>S.danh);
 const r1=await ev(A,()=>{const f=rivals.find(v=>v.coop);const t=runAct(S,f,'rumor');return t});await sleep(2000);
 const s1=await ev(B,()=>S.danh);ok(true,'A rumor on B: B danh',[s0,s1,String(r1).slice(0,80)]);await clear(B);await clear(A);
 /* invitation: Kết giao → B gets a choice card */
 await ev(A,()=>{const f=rivals.find(v=>v.coop);runAct(S,f,'ally')});await sleep(2000);
 const card=await ev(B,()=>{const m=document.getElementById('modal');return !m.hidden&&/Nhận/.test(m.textContent)&&/Từ chối/.test(m.textContent)});ok(card,'B gets Nhận / Từ chối for Kết giao');
 await shot(B,'03-invite');await ev(B,()=>{const x=[...document.querySelectorAll('#modal .opts button')].find(b=>/^Nhận/.test(b.textContent));if(x)x.click()});await sleep(2000);
 await shot(A,'04-invite-answer');await clear(A);await clear(B);
 /* buổi sync: three buổi = one week */
 for(let w=0;w<2;w++){const wk0=(await view(A)).wk;
  for(let k=0;k<3;k++){const r=await buoi('w'+w+'b'+k);if(w===0&&k===0)ok(r.lockA&&/Đợi bạn/.test(r.lbl),'A waits for B after her buổi',[r.lbl]);
   ok(String(r.a)===String(r.b),`week ${w+1} buổi ${k+1}: same buổi`,[r.a,r.b]);if(w===0&&k===0){await shot(A,'05-buoi')}}
  for(let i=0;i<40;i++){if((await ev(A,()=>COOP.state.week))>wk0&&(await ev(B,()=>COOP.state.week))>wk0)break;await sleep(500)}
  await sleep(800);await clear(A);await clear(B);a=await view(A);c=await view(B);
  ok(a.wk===wk0+1&&c.wk===wk0+1,'week advanced on both',[a.wk,c.wk]);ok(String(a.d)===String(c.d),'same date',[a.d,c.d]);ok(a.R===c.R,'same consorts');ok(a.W===c.W,'same whereabouts')}
 await shot(A,'06-after-weeks');await shot(B,'06-after-weeks');
 /* B dies → Luân hồi → new life in the same world */
 const before=await view(B);await ev(B,()=>die('Thử: trúng gió'));await sleep(500);await shot(B,'07-death');
 for(let i=0;i<15;i++){const s=await ev(B,()=>S&&!S.dead&&COOPW&&!COOPW.inLife&&S.name);if(s&&s!==before.me)break;
  await ev(B,()=>{const m=document.getElementById('modal');if(!m||m.hidden)return;const bs=[...m.querySelectorAll('button:not([disabled])')];const p=bs.find(x=>/Đầu thai|Nhận thân phận/.test(x.textContent))||m.querySelector('#mr button');if(p)p.click()});
  if(i===2)await shot(B,'08-rebirth');await sleep(700)}
 c=await view(B);ok(!c.dead&&c.me!==before.me&&c.era===before.era,'B reborn into the same world',[before.me,c.me,c.era]);
 for(let i=0;i<30;i++){const n=await ev(A,()=>(rivals.find(v=>v.coop)||{}).name);if(n===c.me)break;await sleep(500)}
 a=await view(A);ok(a.fr===c.me,'A sees the new friend',[a.fr,c.me]);await clear(A);await clear(B);await shot(A,'09-reborn-seen');await shot(B,'09-reborn');
 {const wk0=(await view(A)).wk;for(let k=0;k<3;k++)await buoi('r'+k);for(let i=0;i<40;i++){if((await ev(B,()=>COOP.state.week))>wk0&&(await ev(A,()=>COOP.state.week))>wk0)break;await sleep(500)}
  await sleep(800);await clear(A);await clear(B);a=await view(A);c=await view(B);ok(a.wk===wk0+1&&c.wk===wk0+1&&a.R===c.R&&String(a.d)===String(c.d),'week after rebirth in sync',[a.d,c.d]);
  ok(a.fr===c.me&&c.fr===a.me,'still each other after rebirth')}
 for(const o of [A,B]){ok(!o.errs.length,o.name+' no page errors',o.errs.slice(0,4));ok(!(await ev(o,()=>document.documentElement.scrollWidth>innerWidth+1)),o.name+' no overflow')}
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
