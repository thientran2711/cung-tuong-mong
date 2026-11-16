/* coop-steal (owner OD 16/11 22:25Z + 20:32Z co-op first): the GUEST's Tranh sủng is resolved on the HOST, in the khắc both seats have had.
   1 guest tries (odds 100) against the host-flipped NPC holder → the host resolves it once both had that khắc → the host's world gives
     the night to the friend (decided), the guest plays her own night (summons first); the NPC gets nothing.
   2 next tối: host and guest both succeed in the SAME khắc → the higher Sủng (host) wins, the guest gets the "cũng mời được…" line,
     no Sủng loss; exactly one holder on both seats.
   usage: node dev/build/assemble.py && node dev/test/coop-steal.js [outdir] [workerURL]   (LIVE Worker, like coop-night.js) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../../.tmp/coop-steal'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const DCL={waitUntil:'domcontentloaded'};
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);
  const o={ctx,name,errs:[]};o.page=async()=>{const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
    p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return p};return o}
async function until(o,fn,arg,ms=30000){try{await o.p.waitForFunction(fn,arg,{timeout:ms,polling:250});return true}catch(e){return false}}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({timeout:5000});return true}catch(e){}}await sleep(250)}return false}
const shot=async(o,n)=>{try{await o.p.screenshot({path:`${OUT}/${n}.png`,timeout:120000})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
/* close the normal game's dialogs (any button that only reads / takes the first road), end mini games: the test's own player */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||m.querySelector('.kbk-x,[aria-label="Đóng"]');if(b){b.click();return'x'}return'stuck'}).catch(()=>'err');
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
const K=o=>o.p.evaluate(()=>({k:COOPW.tm.myKey(),rk:COOPW.tm.roomKey(),v:COOPW.tm.view(),bend:COOPW.bend,pend:COOPW.pend,pb:!!COOPW.pendBuoi,Q:Q.length,mg:!!S.mg,next:document.getElementById('next').textContent,chip:(document.getElementById('kctm')||{}).textContent||'',chipOn:!!(document.getElementById('kctm')&&!document.getElementById('kctm').hidden)}));
/* r1: a seat already night-ready by itself (a night with the Emperor → jnight) counts as pressed */
const isRd=o=>o.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.nReady&&COOPW.nReady()));
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const setTm=(o,t)=>o.p.evaluate(t=>{Object.assign(BAL.coopTm,t)},t);
const reset=o=>o.p.evaluate(()=>COOPW.tm.reset());
/* wait until a seat has moved past key k (its own buổi, or its week end is out) */
const past=(o,k,ms)=>until(o,k=>COOPW.tm.myKey()!==k||COOPW.pend||COOPW.sent===(COOP.state.week||0),k,ms);
async function bothPast(A,B,k,ms){const t0=Date.now();while(Date.now()-t0<ms){const a=await A.p.evaluate(k=>COOPW.tm.myKey()!==k,k),b=await B.p.evaluate(k=>COOPW.tm.myKey()!==k,k);if(a&&b)return Date.now()-t0;await sleep(250)}return -1}
async function join(B,code){await B.page();await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng|^Tiếp tục/,4000)}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]),B=await mk(b,'guest',[1180,820,1]);
 await A.page();await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 ok(await A.p.evaluate(()=>{const r=document.querySelector('#modal .kctmlen');return !!r&&/Mỗi buổi tối đa/.test(r.textContent)&&/✓ 5 phút/.test(r.textContent)}),'lobby: host sees Mỗi buổi tối đa 3 / 5 / 8 phút (5 chosen)');
 await join(B,code);
 ok(await until(B,()=>COOP.seat==='b'&&!COOP.frozen,null,60000),'B in seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(A);await clear(B);const a=await A.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.base&&typeof S!=='undefined'&&S)),c=await B.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&COOPW.base&&typeof S!=='undefined'&&S));if(a&&c)break;await sleep(500)}}
 /* both through Luân hồi (the roulette, then Nhận thân phận) and into the game */
 {const inGame=o=>o.p.evaluate(()=>!!(COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}
  const dbg=o=>o.p.evaluate(()=>({on:COOPW.on,S:typeof S!=='undefined'&&!!S,inLife:COOPW.inLife,title:document.getElementById('title').hidden,roul:!!document.querySelector('[id^="kroul"],.kroul-ov'),next:!!document.getElementById('next').offsetParent,M:!document.getElementById('modal').hidden&&document.getElementById('mt').textContent})).catch(e=>e.message);
  ok(await inGame(A)&&await inGame(B),'both chose their thân phận and are in the game',[await dbg(A),await dbg(B)])}
 for(let i=0;i<4;i++){await clear(A);await clear(B);await sleep(400)}
 ok(await until(A,()=>!!COOPW.tm.view(),null,20000)&&await until(B,()=>!!COOPW.tm.view(),null,20000),'both see the clock');
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
 const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,date:[S.year,S.month,S.tuan,S.turn].join('/'),pend:!!COOPW.pend,sent:COOPW.sent,nr:COOPW.nrdy,
   ready:!!(COOPW.nReady&&COOPW.nReady()),next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,Q:Q.length,tr:(COOPW.tr||[]).slice(-6)}));
 /* both press through the day buổi until both are at tối */
 async function toNight(tag){for(let g=0;g<6;g++){const a=await D(A),c=await D(B);if(a.b>=LAST&&c.b>=LAST&&a.w===c.w)return true;
   const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await clear(A);await clear(B);await press(A);await press(B);
   await bothPast(A,B,k,30000);for(let i=0;i<3;i++){await clear(A);await clear(B);await sleep(300)}}
  const a=await D(A),c=await D(B);return ok(a.b>=LAST&&c.b>=LAST,tag+': both at buổi tối',[a,c])||(a.b>=LAST&&c.b>=LAST)}
 /* wait for the merged week on both, then compare */
 ok(await toNight('1'),'1: at tối');
 /* the host's Emperor turned an NPC's card (forced here), relayed to the guest */
 const setHolder=()=>A.p.evaluate(()=>{const v=liveRivals(false).find(x=>x&&!x.coop&&nightCh(x)>0)||liveRivals(false).find(x=>x&&!x.coop);S.tonight=v;S.nfF=wk();S.ntk=null;S.ntTry=null;S.nfA=null;window.stealWant=()=>({u:0,p:0,mode:null});nfSend();return{id:v.id,n:v.nights||0}});
 let H=await setHolder();
 ok(await until(B,id=>S.tonight&&S.tonight!=="me"&&S.tonight.id===id,H.id,20000),'1: guest sees the NPC holder',H);
 await B.p.evaluate(()=>{S.ntTry=null;S.nfA=null;window.stealWant=()=>({u:0,p:0,mode:null});const o0=oSteal;oSteal=()=>100;try{stealNight(S,tonightOf(),"feign")}finally{oSteal=o0}render()});
 await sleep(1500);
 ok(await A.p.evaluate(id=>S.tonight&&S.tonight.id===id,H.id),'1: not resolved before the host has had that khắc');
 await A.p.evaluate(()=>{spend(1);render()});
 ok(await until(A,()=>S.tonight&&S.tonight.coop&&S.ntk&&S.ntk.who===S.tonight.id,null,20000),'1: host gives the night to the friend (decided)',await A.p.evaluate(()=>nfDebug()));
 ok(await until(B,()=>S.tonight==="me"&&(S.nfN===wk()||Q.some(m=>m.pid==="nfsum"||m.pid==="prep")),null,20000),'1: guest plays her own night (summons → sequence)',await B.p.evaluate(()=>({d:nfDebug(),Q:Q.map(m=>m.pid)})));
 const n1=await A.p.evaluate(id=>(liveRivals(false).find(v=>v.id===id)||{}).nights||0,H.id);ok(n1===H.n,'1: the NPC got no night',[H.n,n1]);
 /* 2. both seats try in the same khắc */
 for(let i=0;i<40;i++){await clear(A);await clear(B);const a=await D(A),c=await D(B);if(a.w>1&&c.w>1&&a.b===0&&c.b===0)break;
  const k=await A.p.evaluate(()=>COOPW.tm.myKey());await setTm(A,{buoiMs:120000});await reset(A);await press(A);await press(B);await bothPast(A,B,k,30000)}
 ok(await toNight('2'),'2: at tối again');
 H=await setHolder();
 ok(await until(B,id=>S.tonight&&S.tonight!=="me"&&S.tonight.id===id,H.id,20000),'2: guest sees the NPC holder',H);
 await A.p.evaluate(()=>{S.sung=80;const f=liveRivals(false).find(v=>v.coop);if(f)f.sung=20});
 const s0=await B.p.evaluate(()=>{S.ntTry=null;S.nfA=null;S.sung=20;window.stealWant=()=>({u:0,p:0,mode:null});const s=S.sung;const o0=oSteal;oSteal=()=>100;try{stealNight(S,tonightOf(),"feign")}finally{oSteal=o0}render();return s});
 await sleep(800);
 await A.p.evaluate(()=>{const o0=oSteal;oSteal=()=>100;try{stealNight(S,tonightOf(),"feign")}finally{oSteal=o0}spend(1);render()});
 ok(await until(A,()=>S.tonight==="me"||S.nfN===wk(),null,20000),'2: the higher Sủng (host) wins',await A.p.evaluate(()=>nfDebug()));
 ok(await until(B,()=>S.tonight&&S.tonight!=="me"&&S.tonight.coop,null,20000),'2: guest sees the host holding it',await B.p.evaluate(()=>nfDebug()));
 const g=await B.p.evaluate(()=>({sung:S.sung,line:S.logs.slice(0,6).join(" ")}));ok(g.sung===s0&&/cũng mời được/.test(g.line),'2: guest: no Sủng loss, the "cũng mời được" line',g);
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
