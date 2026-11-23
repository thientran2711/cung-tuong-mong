/* review/coop-thin-d-r1 PROBE — a GATE since D r1 (run beside coop-thin-d.js): the cases coop-thin-d.js does not cover.
   P1 ev proof host world → her phone at once (mid-week) and counted once after the merge; P1b ev the other way (her tai mắt → the host's proof);
   P2 host reload while HIS invite card is open on the guest; P2b host reload while his Tặng quà card is open on her (the item found by value); P3 guest buys the host
   (cung nữ) + his card shot; P4 double click; P5 the rows family: she buys the host, he reports to his mistress → that NPC's rows toward HER
   (evm.me proof, Thiện cảm) on her phone at once, host world unchanged until the merge, counted once after it; P6 both seats at once (her
   pick arrives while the host answers his own card). Same usage as coop-thin-d.js. Expected on 099ce05b: P1 mid-week FAIL, P2 FAIL. */
/* Co-op thin guest, part D (review/coop-thin-d): remote dialogs (cards) built on the host. Two Playwright clients in one room,
   host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Needs a Worker with part A (e.g. local `wrangler dev`).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-d.js <workerURL> [level=1] [swap=0]   (SHOTS=<dir outside git> for shots)
   Both seats set the test-only flag localStorage ctm-thin-part-4=1 (contract C1: part B not on main yet). */
const {chromium}=require('playwright');const {cardShot}=require('./coop-thin-d-kit.js');const {serve,BASE}=require('./coop-serve.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||0);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(c?JSON.stringify(x).slice(0,400):JSON.stringify(x.paths?{paths:x.paths,dels:x.dels,err:x.err}:x).slice(0,3000)):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;try{localStorage.setItem('ctm-thin-part-4','1')}catch(e){};window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code,seat:c.seat,week:c.week,frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}};if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   const W0=window.WebSocket;window.__tx=[];window.__rxT=[];window.WebSocket=function(a,p){const s=p===undefined?new W0(a):new W0(a,p);const sd=s.send.bind(s);
    s.send=d=>{try{if(typeof d==='string'){const j=JSON.parse(d);__tx.push(j.t);if(j.t==='act'||j.t==='actr')(window.__old=window.__old||[]).push([j.t,j.k||'',j.mode||''])}}catch(e){}return sd(d)};s.addEventListener('message',e=>{try{if(typeof e.data==='string')__rxT.push(JSON.parse(e.data).t)}catch(x){}});return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})},[WURL,want]);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});return o}
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
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
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
 /* ===== P1b: ev her tai mắt → the host holds the proof (guest-side evA with the host's entry as holder; the host's own world, at once) ===== */
 const evh0=await H.p.evaluate(()=>{const v=liveRivals(true).filter(x=>!x.coop&&x.alive&&x.id<900)[1];return {id:v.id,ev:v.ev||0}});
 const evb=await G.p.evaluate(id=>{const f=rivals.find(v=>v.coop);const v=RV(id);const d=evA(f,v,1);return {id:v.id,d}},evh0.id);
 ok(evb.d>0&&await until(H,o=>(RV(o.id).ev||0)===o.ev+1,evh0,15000),'P1b ev her tai mắt → the proof is the HOST\'s, at once',[evb,await H.p.evaluate(id=>RV(id).ev||0,evb.id)]);
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
 /* ===== P2b: host reload while his Tặng quà card is open on her: the item is found again BY VALUE in his chest (pp carries it, not the index) ===== */
 await settle();await H.p.evaluate(()=>{window.__dil=[]});
 const it=await H.p.evaluate(()=>{S.inv=S.inv||[];const k=Object.keys(IT).find(k=>IT[k]&&!IT[k].pet&&!IT[k].hide)||Object.keys(IT)[0];S.inv.push({k},{k});const i=S.inv.length-1;return {i,k,n:S.inv.length}});
 await H.p.evaluate(i=>runAct(S,rivals.find(v=>v.coop),'gift',i),it.i);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000),'P2b her "muốn tặng ngươi" card open',await gQ());
 await H.p.evaluate(()=>{S.inv.unshift({k:Object.keys(IT)[1]});save()});/* his chest order changes before the reload: the old index would point at another thing */
 await H.p.goto(BASE+'?room='+code);await H.p.waitForTimeout(3000);{const t0=Date.now();while(Date.now()-t0<60000){if(await H.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S&&COOPW.thin.dOn())).catch(()=>false))break;await tapText(H,/^(Vào phòng|Tiếp tục|Chơi tiếp)/,1500);await sleep(500)}}
 await H.p.evaluate(()=>{window.__dil=[];const d=pushModal;pushModal=function(m){window.__dil.push((COOPW.ctx?'b:':'')+((m&&m.t)||''));return d.apply(this,arguments)}});await sleep(3000);
 const hn=await H.p.evaluate(k=>(S.inv||[]).filter(e=>e&&e.k===k).length,it.k);
 await front(G,'Hảo hữu tìm đến');ok(await tapM(G,/^Nhận(?!\s*bạc)/),'P2b guest taps Nhận after the host reload');
 ok(await until(H,()=>__dil.includes('Hảo hữu nhận lời'),null,20000),'P2b after host reload her Nhận runs his gift (rebuilt from pp)',await H.p.evaluate(()=>__dil));
 ok(await until(H,a=>(S.inv||[]).filter(e=>e&&e.k===a.k).length===a.n-1,{k:it.k,n:hn},20000),'P2b the gift left his chest (found by value, one of it)',[hn,await H.p.evaluate(k=>(S.inv||[]).filter(e=>e&&e.k===k).length,it.k)]);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Quà tặng'),null,20000),'P2b her Quà tặng card',await gQ());
 /* ===== P3: guest buys the host who serves as a cung nữ ===== */
 await settle();await H.p.evaluate(()=>{window.__dil=[]});
 const mid=await H.p.evaluate(()=>{const m=liveRivals(true).find(v=>!v.coop&&v.alive&&!v.out&&v.rank>=1);S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};return m.id});
 /* the host's servant entry on her phone is made by fromCanon (placeFriend): the harness adds it in that sync layer (level >= 3: her world is read-only) */
 await G.p.evaluate(mid=>{COOPW.inFC=(COOPW.inFC||0)+1;try{const m=RV(mid);m.staff=m.staff||[];m.staff.push({sid:901,coop:true,name:'Hảo hữu',role:'maid',fc:'',fk:'',face:0,hue:0,age:18,tr:'trung',loyal:60,spyFor:null,lover:null,af:{},kn:1,imp:'',org:''})}finally{COOPW.inFC--}S.bac=Math.max(S.bac||0,200)},mid);
 const gb=await G.p.evaluate(()=>S.bac),hb=await H.p.evaluate(()=>S.bac);
 const r3=await G.p.evaluate(()=>String(bribeServ(S,allServ().find(x=>x.coop))));console.log('P3 guest',r3);
 ok(await until(H,()=>Q.some(q=>q.pid==='thBribe'),null,20000),'P3 host: his Bạc lạ card',await H.p.evaluate(()=>Q.map(q=>q.t)));
 await H.p.evaluate(()=>{const i=Q.findIndex(q=>q.pid==='thBribe');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});await cardShot(H,'p3-host-bribe',SWAP);
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
 /* ===== P5 rows family: she buys the host, he reports to his mistress (briberRes "told" in HER context: that NPC's proof against her
    evm.me +1, its Thiện cảm toward her −5) → on her phone at once; the host's world keeps the old numbers until the week; once after ===== */
 await settle();
 const mid5=await H.p.evaluate(()=>{const m=liveRivals(true).find(v=>!v.coop&&v.alive&&!v.out&&v.rank>=1);S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};return m.id});
 await G.p.evaluate(mid=>{const m=RV(mid);m.staff=m.staff||[];if(!m.staff.some(x=>x.coop))m.staff.push({sid:901,coop:true,name:'Hảo hữu',role:'maid',fc:'',fk:'',face:0,hue:0,age:18,tr:'trung',loyal:60,spyFor:null,lover:null,af:{},kn:1,imp:'',org:''});S.bac=Math.max(S.bac||0,200)},mid5);
 for(const o of [H,G])await o.p.evaluate(()=>{window.__dc=deedCap;deedCap=()=>1e9});
 const rowG=id=>G.p.evaluate(id=>{const v=RV(id);return {ev:(v.evm||{}).me||0,rel:v.rel||0}},id),rowH=id=>H.p.evaluate(id=>{const v=RV(id);return {ev:(v.evm||{})['902']||(v.evm||{})['p902']||0,rel:(v.rl||{})[902]||0}},id);
 const g50=await rowG(mid5),h50=await rowH(mid5);
 await G.p.evaluate(()=>String(bribeServ(S,allServ().find(x=>x.coop))));
 ok(await until(H,()=>Q.some(q=>q.pid==='thBribe'),null,20000),'P5 host: his Bạc lạ card');
 await H.p.evaluate(()=>{const i=Q.findIndex(q=>q.pid==='thBribe');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});ok(await tapM(H,/^Từ chối, bẩm chủ/),'P5 host: Từ chối, bẩm chủ');
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Mua chuộc'),null,20000),'P5 her Mua chuộc note',await gQ());
 await sleep(1500);const g51=await rowG(mid5),h51=await rowH(mid5);
 console.log('P5 rows guest',JSON.stringify([g50,g51]),'host',JSON.stringify([h50,h51]));
 ok(g51.ev===g50.ev+1&&g51.rel<g50.rel,'P5 her rows on that NPC (its proof against her +1, its Thiện cảm toward her down) on her phone at once',[g50,g51]);
 if(LVL>=3)ok(h51.ev===g51.ev&&h51.rel===g51.rel,'P5 (level >= 3, part C: the host world is the one world) her rows changed there at once, the same as on her phone; counted once after the merge (below)',[h50,h51,g51]);
 else ok(h51.ev===h50.ev&&h51.rel===h50.rel,'P5 the host\'s world keeps the old numbers for her rows until the merge (no double count)',[h50,h51]);
 await H.p.evaluate(()=>{S.srv=null});await G.p.evaluate(mid=>{const m=RV(mid);m.staff=(m.staff||[]).filter(x=>!x.coop)},mid5);/* back to a consort before the merge */
 await settle();await week(H,G,'P5 week');const g52=await rowG(mid5),h52=await rowH(mid5);
 /* the proof is a plain count (nothing else moves it in a week): counted once on both seats. Thiện cảm also drifts with the week, printed only. */
 ok(g52.ev===g51.ev&&h52.ev===g51.ev,'P5 after the week her proof row counted once (guest and host world agree)',[g51,g52,h52]);
 for(const o of [H,G])await o.p.evaluate(()=>{deedCap=window.__dc});
 /* ===== P6 both seats at once: her pick of HIS invite arrives while the host answers HER invite on his own card ===== */
 await settle();await H.p.evaluate(()=>{window.__dil=[]});
 ok(await until(H,()=>!!rivals.find(v=>v.coop),null,20000)&&await until(G,()=>!!rivals.find(v=>v.coop),null,20000),'P6 both seats see the other as a consort');
 await H.p.evaluate(()=>runAct(S,rivals.find(v=>v.coop),'ally'));await G.p.evaluate(()=>runAct(S,rivals.find(v=>v.coop),'ally'));
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000)&&await until(H,()=>Q.some(q=>q.pid==='thInv'),null,20000),'P6 both cards open');
 await front(G,'Hảo hữu tìm đến');await H.p.evaluate(()=>{const i=Q.findIndex(q=>q.pid==='thInv');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});
 await Promise.all([tapM(G,/^Nhận(?!\s*bạc)/),tapM(H,/^Nhận(?!\s*bạc)/)]);
 ok(await until(H,()=>__dil.filter(t=>t==='Hảo hữu nhận lời').length===1,null,20000),'P6 host: her answer ran his act once',await H.p.evaluate(()=>__dil));
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu nhận lời'),null,20000),'P6 guest: his answer ran her act (her "Hảo hữu nhận lời")',await gQ());
 ok(await H.p.evaluate(()=>COOPW.thin.selfTest().ok),'P6 host: withSeat round trip still exact');
 const errs=[...H.errs.map(e=>'H '+e),...G.errs.map(e=>'G '+e)].filter(e=>!/WebSocket|net::|ERR_|Failed to fetch|navigator\.vibrate/.test(e))/* vibrate: Chrome's no-gesture notice (the heart feedback of a pid card), not a page error */;ok(!errs.length,'no page errors',errs.slice(0,6));
 await b.close();const f=res.filter(r=>!r[0]).length;console.log(`coop-thin-d-probe: ${res.length-f}/${res.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
