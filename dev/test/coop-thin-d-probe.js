/* review/coop-thin-d-r1 PROBE (reviewer, not a gate yet): the cases coop-thin-d.js does not cover. P1 ev proof mid-week on her phone,
   P2 host reload while HIS invite card is open on the guest, P3 guest buys the host (cung nữ), P4 double click. Same usage as coop-thin-d.js.
   Expected on 099ce05b: P1 mid-week FAIL, P2 FAIL (CW.acts lost on host reload), P3/P4 ok. */
/* Co-op thin guest, part D (review/coop-thin-d): remote dialogs (cards) built on the host. Two Playwright clients in one room,
   host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Needs a Worker with part A (e.g. local `wrangler dev`).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-d.js <workerURL> [level=1] [swap=0]   (SHOTS=<dir outside git> for shots)
   Both seats set the test-only flag localStorage ctm-thin-part-4=1 (contract C1: part B not on main yet). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||0);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(c?JSON.stringify(x).slice(0,400):JSON.stringify(x.paths?{paths:x.paths,dels:x.dels,err:x.err}:x).slice(0,3000)):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;try{localStorage.setItem('ctm-thin-part-4','1')}catch(e){};window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code,seat:c.seat,week:c.week,frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}};if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   const W0=window.WebSocket;window.__tx=[];window.__rxT=[];window.WebSocket=function(a,p){const s=p===undefined?new W0(a):new W0(a,p);const sd=s.send.bind(s);
    s.send=d=>{try{if(typeof d==='string'){const j=JSON.parse(d);__tx.push(j.t);if(j.t==='act'||j.t==='actr')(window.__old=window.__old||[]).push([j.t,j.k||'',j.mode||''])}}catch(e){}return sd(d)};s.addEventListener('message',e=>{try{if(typeof e.data==='string')__rxT.push(JSON.parse(e.data).t)}catch(x){}});return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})},[WURL,want]);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
/* the dialog clearer of coop-e2e.js (one source): taken from that file's text */
const clear=(()=>{const t=require('fs').readFileSync(require('path').join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}

async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
const D=o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,tn:S.tn||null,tonight:S.tonight==='me'?'me':S.tonight&&S.tonight.id!=null?S.tonight.id:null,dead:!!S.dead,emp:S.emp&&[S.emp.era,S.emp.age,!!S.emp.dead].join('/'),rank:S.rank,Q:Q.map(q=>q.t).slice(0,4)}));
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<10;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',[await D(A),await D(B)]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=[686,880],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL||1),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'swap',SWAP);
 const join=async()=>{await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000)};await join();
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<120000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 ok(await until(H,()=>!!COOPW.friend(),null,30000)&&await until(G,()=>!!COOPW.friend(),null,30000),'each seat has the other as a consort entry');

 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok((await until(H,()=>COOPW.thin.dOn(),null,30000))&&(await until(G,()=>COOPW.thin.dOn()&&!!COOPW.thin.view,null,30000)),'part D on for both seats (level 1 + part-4 test flag), guest has the host view',await both(()=>[COOPW.thin.lvl,COOPW.thin.dOn()]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 for(const o of [H,G])await o.p.evaluate(()=>{window.__dil=[];const d=pushModal;pushModal=function(m){window.__dil.push((COOPW.ctx?'b:':'')+((m&&m.t)||''));return d.apply(this,arguments)};window.__old=[]});
 const gQ=()=>G.p.evaluate(()=>Q.filter(q=>q.thin).map(q=>q.t));
 const tapM=async(o,re,ms=20000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const M=document.getElementById('modal');if(!M||M.hidden)return false;const R=new RegExp(src);
   const b=[...M.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&R.test(x.textContent.trim()));if(!b)return false;b.click();return true},re.source);if(r)return true;await sleep(300)}return false};
 /* put the first thin card of that title in front (the test's own player reads it now) */
 const front=(o,t)=>o.p.evaluate(t=>{const i=Q.findIndex(q=>(q.thin||q.pid)&&q.t===t);if(i<0)return false;const m=Q.splice(i,1)[0];Q.unshift(m);showModal();return true},t);
 /* close everything on a seat except the thin cards under test */
 const settle=async()=>{for(let i=0;i<3;i++){await clear(H,6);await G.p.evaluate(()=>{for(let i=Q.length-1;i>=0;i--)if(!Q[i].thin)Q.splice(i,1);while(Q.length&&Q[0].thin&&!Q[0].opts)closeModal();for(let i=Q.length-1;i>=0;i--)if(Q[i].thin&&!Q[i].opts){const m=Q.splice(i,1)[0];Q.unshift(m);closeModal()}showModal()});await sleep(300)}};
 const shot=async(o,n)=>{if(!process.env.SHOTS)return;const sz=o===H?(SWAP?'ipad':'fold'):(SWAP?'fold':'ipad');try{await o.p.screenshot({path:process.env.SHOTS+'/'+n+'-'+sz+(SWAP?'-swap':'')+'.png'})}catch(e){}};

 await settle();
 /* ===== P1: ev host-world → her (tai mắt proof) ===== */
 for(const o of [H,G])await o.p.evaluate(()=>{window.__dc=deedCap;deedCap=()=>1e9});
 const ev=await H.p.evaluate(()=>{const f=rivals.find(v=>v.coop);const v=liveRivals(true).find(x=>!x.coop&&x.alive&&x.id<900);const e0=(v.ep||{})[902]||0;const d=evA(f,v,1);return {id:v.id,e0,d,ep:(v.ep||{})[902]||0,hev:v.ev||0}});
 console.log('P1 host evA', JSON.stringify(ev));
 const gev0=await G.p.evaluate(id=>RV(id).ev||0,ev.id);
 await sleep(5000);
 const g1=await G.p.evaluate(id=>{const v=RV(id);return {ev:v.ev||0,log:(S.logs||[]).find(x=>/Tai mắt/.test(x))||''}},ev.id);
 const h1=await H.p.evaluate(id=>{const v=RV(id);return {ep:(v.ep||{})[902]||0,ev:v.ev||0}},ev.id);
 console.log('P1 after 5s guest0',gev0,JSON.stringify(g1),'host',JSON.stringify(h1));
 await settle();
 await week(H,G,'P1 week');
 const g2=await G.p.evaluate(id=>RV(id).ev||0,ev.id);const h2=await H.p.evaluate(id=>{const v=RV(id);return {ep:(v.ep||{})[902]||0,ev:v.ev||0}},ev.id);
 console.log('P1 after week guest ev',g2,'host',JSON.stringify(h2));
 ok(ev.d>0&&g1.ev===gev0+ev.d,'P1 ev: the proof is on her phone mid-week (old relay did this at once)',[ev,gev0,g1,h1]);
 ok(g2===gev0+ev.d,'P1 ev: after the week her proof counted once',[gev0,g2,h2]);
 for(const o of [H,G])await o.p.evaluate(()=>{deedCap=window.__dc});
 /* ===== P2: host reload while HIS invite card is open on the guest ===== */
 await settle();await H.p.evaluate(()=>{window.__dil=[]});
 await H.p.evaluate(()=>runAct(S,rivals.find(v=>v.coop),'ally'));
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000),'P2 card open on guest');
 const rlG=await G.p.evaluate(()=>(S.rl||{})[901]||0);
 await H.p.goto(BASE+'?room='+code);await H.p.waitForTimeout(3000);{const t0=Date.now();while(Date.now()-t0<60000){if(await H.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S&&COOPW.thin.dOn())).catch(()=>false))break;await tapText(H,/^(Vào phòng|Tiếp tục|Chơi tiếp)/,1500);await sleep(500)}}
 ok(await H.p.evaluate(()=>COOPW.on&&COOPW.thin.dOn()),'P2 host back, D on');
 await H.p.evaluate(()=>{window.__dil=[];const d=pushModal;pushModal=function(m){window.__dil.push((COOPW.ctx?'b:':'')+((m&&m.t)||''));return d.apply(this,arguments)}});
 console.log('P2 host acts', await H.p.evaluate(()=>JSON.stringify(COOPW.acts)));
 await sleep(3000);
 await front(G,'Hảo hữu tìm đến');ok(await tapM(G,/^Nhận(?!\s*bạc)/),'P2 guest taps Nhận');
 await sleep(6000);
 const p2=await H.p.evaluate(()=>[__dil,COOPW.thin.D.log.slice(-4)]);const rlG2=await G.p.evaluate(()=>(S.rl||{})[901]||0);
 console.log('P2 host dil',JSON.stringify(p2),'guest rl',rlG,rlG2,await gQ());
 ok(p2[0].includes('Hảo hữu nhận lời'),'P2 after host reload, her Nhận runs his act',p2);
 /* ===== P3: guest buys the host who serves as a cung nữ ===== */
 await settle();await H.p.evaluate(()=>{window.__dil=[]});
 const mid=await H.p.evaluate(()=>{const m=liveRivals(true).find(v=>!v.coop&&v.alive&&!v.out&&v.rank>=1);S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};return m.id});
 await G.p.evaluate(mid=>{const m=RV(mid);m.staff=m.staff||[];m.staff.push({sid:901,coop:true,name:'Hảo hữu',role:'maid',fc:'',fk:'',face:0,hue:0,age:18,tr:'trung',loyal:60,spyFor:null,lover:null,af:{},kn:1,imp:'',org:''});S.bac=Math.max(S.bac||0,200)},mid);
 const gb=await G.p.evaluate(()=>S.bac),hb=await H.p.evaluate(()=>S.bac);
 const r3=await G.p.evaluate(()=>String(bribeServ(S,allServ().find(x=>x.coop))));console.log('P3 guest',r3);
 ok(await until(H,()=>Q.some(q=>q.pid==='thBribe'),null,20000),'P3 host: his Bạc lạ card',await H.p.evaluate(()=>Q.map(q=>q.t)));
 await H.p.evaluate(()=>{const i=Q.findIndex(q=>q.pid==='thBribe');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});
 ok(await tapM(H,/^Nhận bạc/),'P3 host Nhận bạc');
 ok(await until(G,b=>S.bac<b&&Q.some(q=>q.thin&&q.t==='Mua chuộc'),gb,20000),'P3 guest pays + her Mua chuộc card',[gb,await G.p.evaluate(()=>S.bac),await gQ()]);
 ok(await H.p.evaluate(b=>S.bac>b&&S.srv.spyFor===902,hb),'P3 host gets Bạc and spies for her',await H.p.evaluate(()=>[S.bac,S.srv.spyFor]));
 /* ===== P4: double tap on her card from two quick taps + host pick at the same moment ===== */
 await settle();await H.p.evaluate(()=>{S.srv=null;window.__dil=[]});
 await H.p.evaluate(()=>runAct(S,rivals.find(v=>v.coop),'ally'));
 await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000);await front(G,'Hảo hữu tìm đến');
 await G.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal button')].find(x=>/^Nhận/.test(x.textContent.trim()));b.click();b.click()});
 await sleep(5000);
 console.log('P4',await H.p.evaluate(()=>JSON.stringify(__dil)));
 ok(await H.p.evaluate(()=>__dil.filter(t=>t==='Hảo hữu nhận lời').length===1),'P4 double click runs once');
 const errs=[...H.errs.map(e=>'H '+e),...G.errs.map(e=>'G '+e)].filter(e=>!/WebSocket|net::|ERR_|Failed to fetch/.test(e));ok(!errs.length,'no page errors',errs.slice(0,6));
 await b.close();const f=res.filter(r=>!r[0]).length;console.log(`coop-thin-d-probe: ${res.length-f}/${res.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
