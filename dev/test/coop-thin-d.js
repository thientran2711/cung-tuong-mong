/* Co-op thin guest, part D (review/coop-thin-d): remote dialogs (cards) built on the host. Two Playwright clients in one room,
   host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Needs a Worker with part A (e.g. local `wrangler dev`).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-d.js <workerURL> [level=1] [swap=0]   (SHOTS=<dir outside git> for shots)
   Both seats set the test-only flag localStorage ctm-thin-part-4=1 (contract C1: part B not on main yet). */
const {chromium}=require('playwright');const {cardShot,sameDom}=require('./coop-thin-d-kit.js');const {serve,BASE}=require('./coop-serve.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||0);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(c?JSON.stringify(x).slice(0,400):JSON.stringify(x.paths?{paths:x.paths,dels:x.dels,err:x.err}:x).slice(0,3000)):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;try{localStorage.setItem('ctm-thin-part-4','1')}catch(e){};window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code,seat:c.seat,week:c.week,frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}};if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}},[WURL,want]);
  await ctx.addInitScript(require('./lib/coop-wire.js').typeSpy);/* __tx/__rxT/__old incl. gzip binary frames (lib/coop-wire.js) */
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
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;/* D r1 5a: the "Kiếp này chưa trọn" warning (an option that names death) is asked once per life; seeded so the bribe step never waits on it */render()});
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
 /* D r1 5c: real dialog shots (overlays closed) at Fold 755x1000 + iPad 1180x820; 2: on the guest every moved card == the native card (kit) */
 const shot=async(o,n)=>{if(o===G){const r=await sameDom(G);ok(r.ok,'kit: guest copy of "'+n+'" renders like the native card ('+(r.pid||'')+')',r)}await cardShot(o,n,SWAP)};
 const shotT=async(o,t,n)=>{if(await front(o,t))await shot(o,n)};
 /* ===== (1) Kết giao, host → guest: the card is built on the host in her context ===== */
 await settle();
 const r1=await H.p.evaluate(()=>String(runAct(S,rivals.find(v=>v.coop),'ally')));ok(/đợi nàng trả lời/.test(r1),'invite host→guest: an offer, nothing run yet',r1);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000),'guest: the card arrives through the host view (no act relay)',await gQ());
 ok(await H.p.evaluate(()=>{const c=(COOPW.thin.seatOf('b').S.thq||[]).find(c=>c.pid==='thInv');return !!c&&/muốn kết giao với ngươi/.test(c.v.h)&&!/function/.test(JSON.stringify(c))}),'host: the card is serialized in her stored person (pid thInv, her perspective, no closure)');
 await G.p.evaluate(()=>{const i=Q.findIndex(q=>q.thin);const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});await shot(G,'d1-guest-invite');
 const rlG0=await G.p.evaluate(()=>(S.rl||{})[901]||0);
 await front(G,'Hảo hữu tìm đến');ok(await tapM(G,/^Nhận(?!\s*bạc)/),'guest taps Nhận');
 ok(await until(H,()=>__dil.includes('Hảo hữu nhận lời'),null,20000),'host: her answer runs his act (Hảo hữu nhận lời)',await H.p.evaluate(()=>__dil));
 ok(await until(G,()=>Q.some(q=>q.thin&&/Hảo hữu ra tay|Biến cố/.test(q.t)),null,20000),'guest: the act\'s note is a host-built card',await gQ());
 ok(await G.p.evaluate(()=>{const h=Q.find(q=>q.thin&&/Hảo hữu ra tay|Biến cố/.test(q.t));return !!h&&!String(h.h).includes(S.name)&&!/nàng ta/.test(h.h)}),'res note on her phone in HER perspective (her own name / "nàng ta" never used for her)',await G.p.evaluate(()=>{const h=Q.find(q=>q.thin&&/Hảo hữu ra tay|Biến cố/.test(q.t));return [S.name,h&&h.h]}));
 await shotT(G,(await G.p.evaluate(()=>{const h=Q.find(q=>q.thin&&/Hảo hữu ra tay|Biến cố/.test(q.t));return h&&h.t})),'d1b-guest-res-note');
 ok(await until(G,r=>((S.rl||{})[901]||0)!==r,rlG0,20000),'guest: the effect lands on HER live person (patch: Thân sơ with the host)',[rlG0,await G.p.evaluate(()=>(S.rl||{})[901]),await G.p.evaluate(()=>S.thpn)]);
 ok(await until(H,()=>!(COOPW.thin.D.PQ.b||[]).length,null,20000),'host: her patch acked (pack), the host week-end wait released',await H.p.evaluate(()=>COOPW.thin.D.PQ.b));
 /* ===== (2) Tặng quà host → guest: her Quà tặng card, the item reaches HER live chest ===== */
 await settle();
 const it=await H.p.evaluate(()=>{const k=Object.keys(IT).find(k=>IT[k]&&IT[k].n&&!IT[k].tg&&/trâm|vòng|lụa|gấm|hương/i.test(IT[k].n))||Object.keys(IT)[0];S.inv=S.inv||[];S.inv.push({k});return {k,i:S.inv.length-1,n:S.inv.length}});
 const inv0=await G.p.evaluate(()=>(S.inv||[]).length);
 const r2=await H.p.evaluate(i=>String(runAct(S,rivals.find(v=>v.coop),'gift',i)),it.i);ok(/đợi nàng trả lời/.test(r2),'gift host→guest: an offer',r2);
 await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000);await front(G,'Hảo hữu tìm đến');ok(await tapM(G,/^Nhận(?!\s*bạc)/),'guest: Nhận on "muốn tặng ngươi"');
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Quà tặng'),null,20000),'guest: the Quà tặng card (giftin, pid card built in her context)',await gQ());
 await G.p.evaluate(()=>{const i=Q.findIndex(q=>q.thin&&q.t==='Quà tặng');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});await shot(G,'d2-guest-gift');
 const g1=await G.p.evaluate(()=>Q[0].opts.map(o=>o.n));
 await G.p.evaluate(()=>chooseM(0));
 ok(await until(G,n=>(S.inv||[]).length>n,inv0,20000),'guest: the gift is in her live chest',[inv0,await G.p.evaluate(()=>(S.inv||[]).length),g1]);
 ok(await H.p.evaluate(n=>S.inv.length<n,it.n),'host: the item left his chest');
 /* ===== (3) Kết giao guest → host: the host's own card; her side runs in her context ===== */
 await settle();await H.p.evaluate(()=>{window.__dil=[];});
 /* review/coop-driver-fails: at level >= 6 (thin F1, jcoopthinf TH.on(6)) her act is an INTENT run on the host; its words come back with the kit
    result card (not as runAct's return, which is "" then); the offer itself is proved by the host's own card just below */
 const r3=await G.p.evaluate(()=>({t:String(runAct(S,rivals.find(v=>v.coop),'ally')),f1:!!(COOPW.thin&&COOPW.thin.on&&COOPW.thin.on(6))}));ok(/đợi nàng trả lời/.test(r3.t)||(r3.f1&&r3.t===''),'invite guest→host: an offer (sent as do inv; at F1 an intent, no text yet)',r3);
 ok(await until(H,()=>Q.some(q=>q.pid==='thInv'),null,20000),'host: his card (pid thInv) in his own queue');
 await H.p.evaluate(()=>{const i=Q.findIndex(q=>q.pid==='thInv');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});await shot(H,'d3-host-invite');
 const hrl0=await H.p.evaluate(()=>(S.rl||{})[902]||0);
 await front(H,'Hảo hữu tìm đến');ok(await tapM(H,/^Nhận(?!\s*bạc)/),'host taps Nhận');
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu nhận lời'),null,20000),'guest: "Hảo hữu nhận lời" card built in HER context',await gQ());
 await shotT(G,'Hảo hữu nhận lời','d3b-guest-accepted');
 ok(await until(H,r=>((S.rl||{})[902]||0)!==r,hrl0,10000),'host: her act changed his Thân sơ row with her (bridge), not hers',[hrl0,await H.p.evaluate(()=>(S.rl||{})[902])]);
 /* ===== (4) Mua chuộc: guest serves as a cung nữ in an NPC house; host buys her ===== */
 await settle();
 const mid=await G.p.evaluate(()=>{const m=liveRivals(true).find(v=>!v.coop&&v.alive&&!v.out&&v.rank>=1)||liveRivals(true).find(v=>!v.coop);S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};return m.id});
 await H.p.evaluate(mid=>{const T=COOPW.thin;T.D.noPatch=true;try{T.withSeat('b',()=>{S.srv={mid,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0}})}finally{T.D.noPatch=false}
  const m=RV(mid);m.staff=m.staff||[];m.staff.push({sid:902,coop:true,name:'Hảo hữu',role:'maid',fc:'',fk:'',face:0,hue:0,age:18,tr:'trung',loyal:60,spyFor:null,lover:null,af:{},kn:1,imp:'',org:''});S.bac=Math.max(S.bac||0,200)},mid);
 const gb0=await G.p.evaluate(()=>S.bac||0),hb0=await H.p.evaluate(()=>S.bac);
 const r4=await H.p.evaluate(()=>String(bribeServ(S,allServ().find(x=>x.coop))));ok(/đợi nàng trả lời/.test(r4),'bribe host→guest servant: an offer',r4);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Bạc lạ'),null,20000),'guest: "Bạc lạ" card (pid thBribe) built in her context',await gQ());
 await G.p.evaluate(()=>{const i=Q.findIndex(q=>q.thin&&q.t==='Bạc lạ');const m=Q.splice(i,1)[0];Q.unshift(m);showModal()});await shot(G,'d4-guest-bribe');
 await front(G,'Bạc lạ');ok(await tapM(G,/^Nhận bạc/),'guest: Nhận bạc, làm tai mắt');
 ok(await until(G,b=>(S.bac||0)>b&&S.srv&&S.srv.spyFor===901,gb0,20000),'guest: Bạc +pay and she spies for the host (on HER live person)',[gb0,await G.p.evaluate(()=>[S.bac,S.srv&&S.srv.spyFor])]);
 ok(await until(H,b=>S.bac<b&&__dil.includes('Mua chuộc'),hb0,20000),'host: his Bạc −pay + his "Mua chuộc" result (his context)',[hb0,await H.p.evaluate(()=>[S.bac,__dil,COOPW.thin.D.log.slice(-6),COOPW.thin.D.bad])]);
 /* ===== (5) an NPC buys her (nbribe): the j42 card built on the host in her context ===== */
 await settle();
 await H.p.evaluate(mid=>{const v=liveRivals(true).find(x=>!x.coop&&x.id!==mid&&x.alive);v.bac=Math.max(v.bac||0,80);window.__nb=v.id;bribeServ(v,allServ().find(x=>x.coop))},mid);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Bạc lạ'),null,20000),'guest: an NPC bribe = the j42 cnvBribe card from the host',await gQ());
 await shotT(G,'Bạc lạ','d5-guest-npc-bribe');
 const nb=await H.p.evaluate(()=>RV(__nb).bac);
 await front(G,'Bạc lạ');ok(await tapM(G,/^Nhận bạc/),'guest: Nhận bạc (NPC buyer)');
 ok(await until(H,b=>RV(__nb).bac<b,nb,20000),'host world: the NPC paid (effect on the NPC lands in the host world)',[nb,await H.p.evaluate(()=>RV(__nb).bac)]);
 ok(await until(G,()=>S.srv&&S.srv.spyFor!=null&&S.srv.spyFor!==901,null,20000),'guest: she now spies for that NPC (her live person)',await G.p.evaluate(()=>S.srv&&S.srv.spyFor));
 await G.p.evaluate(()=>{S.srv=null});await H.p.evaluate(()=>{const T=COOPW.thin;T.D.noPatch=true;try{T.withSeat('b',()=>{S.srv=null})}finally{T.D.noPatch=false}});
 /* ===== (6) Lập Thái tử: her son named heir → her card + the j1 gain, built on the host ===== */
 await settle();
 const kid=await G.p.evaluate(()=>{S.kids=S.kids||[];const k={name:'Thử Lân',sex:'m',bt:3,alive:true,hp:60,tal:50,fond:50,age:6};S.kids.push(k);return k});
 await H.p.evaluate(k=>{const T=COOPW.thin;T.D.noPatch=true;try{T.withSeat('b',()=>{S.kids=S.kids||[];S.kids.push(Object.assign({},k))})}finally{T.D.noPatch=false}},kid);
 const dn0=await G.p.evaluate(()=>S.danh||0);
 await H.p.evaluate(()=>{window.__hrs=S.hr;S.hr='p902|Thử Lân#3'});
 ok(await G.p.evaluate(()=>{COOPW.hrPrev=null;S.hr='p902|Thử Lân#3';COOPW.hrWeek();return !Q.some(q=>q.t==='Lập Thái tử'&&!q.thin)}),'guest: her old merged-week heir card no longer runs on her phone (dOn)');
 await H.p.evaluate(()=>{COOPW.thin.D.later('b',()=>COOPW.hrCardTest(S.hr))});
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Lập Thái tử'),null,20000),'guest: "Lập Thái tử" card built on the host in her context',await gQ());
 ok(await until(G,d=>(S.danh||0)>d,dn0,20000),'guest: the mother\'s Danh gain (j1 setHeir, printed number) on her live person',[dn0,await G.p.evaluate(()=>S.danh)]);
 ok(await G.p.evaluate(()=>{const h=Q.find(q=>q.thin&&q.t==='Lập Thái tử');return !!h&&/con của ngươi/.test(h.h)}),'heir card text in her perspective ("con của ngươi")');
 await shotT(G,'Lập Thái tử','d6-guest-heir');
 await H.p.evaluate(()=>{S.hr=window.__hrs||null});
 /* ===== (7) the host world gives her something (B4 / festival result path): host-built card + item ===== */
 await settle();
 const inv1=await G.p.evaluate(()=>(S.inv||[]).length);
 await H.p.evaluate(k=>COOPW.b4Run(()=>{const v=rivals.find(x=>x.coop);v.inv=v.inv||[];v.inv.push({k})}),it.k);
 ok(await until(G,n=>(S.inv||[]).length>n,inv1,20000),'host world → her: the item reaches her live chest (patch), no res relay',[inv1,await G.p.evaluate(()=>(S.inv||[]).length)]);
 ok(await until(G,()=>Q.some(q=>q.thin),null,10000),'host world → her: the note is a host-built card',await gQ());
 /* ===== (8) reconnect while a card is open: still there, the choice applied once ===== */
 await settle();await G.p.evaluate(()=>{for(let i=Q.length-1;i>=0;i--)if(Q[i].thin)chooseM.call(null,0)});await sleep(1500);
 await H.p.evaluate(()=>{window.__dil=[];});
 await H.p.evaluate(()=>runAct(S,rivals.find(v=>v.coop),'ally'));
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000),'reconnect: card open on the guest');
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);{const t0=Date.now();while(Date.now()-t0<60000){if(await G.p.evaluate(()=>!!(window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S)).catch(()=>false))break;await tapText(G,/^(Vào phòng|Tiếp tục|Chơi tiếp)/,1500);await sleep(500)}}
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&COOPW.on&&typeof S!=='undefined'&&S&&Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,60000),'reconnect: after a reload the card is shown again (from the stored snapshot)',await G.p.evaluate(()=>[typeof Q!=='undefined'?Q.map(q=>q.t):null,[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim().slice(0,20)).slice(0,12),window.COOP&&COOP.seat,!!(window.COOPW&&COOPW.on),!!(COOPW.thin&&COOPW.thin.view)]).catch(e=>String(e)));
 const cid=await G.p.evaluate(()=>(Q.find(q=>q.thin&&q.t==='Hảo hữu tìm đến')||{}).thin);
 await G.p.evaluate(id=>{COOPW.thin.doSend('pick',{card:id,i:0});COOPW.thin.doSend('pick',{card:id,i:0})},cid);
 await sleep(4000);
 const nAcc=await H.p.evaluate(()=>__dil.filter(t=>t==='Hảo hữu nhận lời').length);ok(nAcc===1,'reconnect + a double tap: the choice runs once',nAcc);
 ok(await until(G,id=>!Q.some(q=>q.thin===id),cid,10000),'guest: the answered card leaves her queue');
 /* ===== wire: no old relay used ===== */
 const old=await both(()=>(window.__old||[]).filter(x=>(x[0]==='act'&&(x[2]==='invite'||(x[1]==='ctm-p2'&&/^(bribe|briber|nbribe|ev)$/.test(x[2]))))||(x[0]==='actr'&&!x[2])).length);
 ok(old[0]===0&&old[1]===0,'wire: no act-invite / actr / ctm-p2 bribe-briber-nbribe-ev relay sent by either seat',old);
 {const st=await H.p.evaluate(()=>{const o=COOPW.thin.selfTest();return{ok:o.ok,sameA:o.sameA,sameB:o.sameB,b:o.b,paths:o.paths,err:o.err}});ok(st.ok,'host: withSeat round trip still exact (selfTest)',st.ok?undefined:st)}
 ok(await H.p.evaluate(()=>!COOPW.thin.D.bad.length),'no card with handlers lost (D.bad empty)',await H.p.evaluate(()=>COOPW.thin.D.bad));
 const errs=[...H.errs.map(e=>'H '+e),...G.errs.map(e=>'G '+e)].filter(e=>!/WebSocket|net::|ERR_|Failed to fetch|navigator\.vibrate/.test(e))/* vibrate: Chrome's no-gesture notice (the heart feedback of a pid card), not a page error */;ok(!errs.length,'no page errors',errs.slice(0,6));
 await b.close();const f=res.filter(r=>!r[0]).length;console.log(`coop-thin-d: ${res.length-f}/${res.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
