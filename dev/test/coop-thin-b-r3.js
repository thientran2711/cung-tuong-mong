/* review coop-thin-b r3 probes (reviewer r3, B‖D seam family beyond R7/R7c; harness = coop-thin-b-r1.js):
   R10 two D kinds deferred at once while her rolled life is held (invite = answer card, kept; tai mắt proof = old-life news, dropped);
   R8  host reload while D work is deferred (data survives in localStorage, runs after the reload, her invite reaches her new life once);
   R9  HER offer (Kết giao) made in her old life, answered by the host after her new life is in: must not run on the new person.
   usage: DFLAG=1 node dev/test/coop-thin-b-r3.js [workerURL] [level=2]   (or LVL4=1 with a CAP=4 build, level 4)
   (r1 header kept below for the harness:) review coop-thin-b r1 probes (reviewer): double accept, double reroll, guest leave+rejoin mid-roll, host leave+rejoin mid-roll, socket drop mid-roll;
   guest live person == room person. DFLAG=1 also turns part D on (localStorage ctm-thin-part-4) = the merged B+D path.
   usage: node dev/test/coop-thin-b-r1.js [workerURL] [level=2]   (R3 fails on 9af781c2: review-coop-thin-b-r1.md item 3) */
/* Co-op thin guest, part B (review/coop-thin-b): life creation + rebirth on the HOST. Two Playwright clients in one room.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-b.js [workerURL] [thinLevel=2] [swap=0] [origins=all]
   level 2: the guest's first life and every rebirth are built by the host in context b (do life roll / accept); the guest shows the host's
     person (card == life), builds no world, sends the host's blob as `me`. Checks per origin (forced on the host: window.__forceOrigin):
     same consorts on both seats, 0 temp ids, her name / her maid's name unique in the one world, a cung nữ's mistress real on both seats,
     the host forgets the old face (j61 "Người lạ" until met), host state intact (withSeat round trip + own person unchanged), the tiểu thư
     road at home (kc "nha"). Then the host's own rebirth (old path, unchanged) and a week merge.
   level 1: the same rebirths through the OLD guest path (the before number of the tripwire).
   TRIP: the guest tripwire (dev/test/coop-thin-trip.js) counts every guest write outside fromCanon during the rebirths only (meter of part B).
   swap=1: the iPad creates the room (host), the Fold joins (guest). Shots: none (no new UI; the card and the wait note are the kit card). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||2);const SWAP=+(process.argv[4]||0);const ONLY=(process.argv[5]||'').split(',').filter(Boolean);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp,want,trip){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce',hasTouch:!!process.env.TOUCH});await serve(ctx);if(process.env.DFLAG)await ctx.addInitScript(()=>{try{localStorage.setItem('ctm-thin-part-4','1')}catch(e){}});
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code,seat:c.seat,week:c.week,frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}};if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   const W0=window.WebSocket;window.__tx=[];window.WebSocket=function(a,p){const s=p===undefined?new W0(a):new W0(a,p);window.__ws=s;const sd=s.send.bind(s);
    s.send=d=>{try{if(typeof d==='string'){const m=JSON.parse(d);__tx.push(m.t==='do'?'do:'+m.op+':'+(m.args&&m.args.st):m.t)}}catch(e){}return sd(d)};return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})},[WURL,want]);
  if(trip)await ctx.addInitScript({path:path.join(__dirname,'coop-thin-trip.js')});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=require('fs').readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=process.env.FOLD755?[755,1000]:[686,880]/* r3: FOLD755=1 = the owner's Fold 755x1000 */,IPAD=[1180,820];const TRIP=!!process.env.TRIP;
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL,false),G=await mk(b,'guest',SWAP?FOLD:IPAD,0,TRIP);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'swap',SWAP,'level',LVL,'trip',TRIP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);
 /* the guest's own core build is counted (it must stay 0 at level 2): j2 start's scratch harem calls newRival */
 await G.p.evaluate(()=>{window.__nr=0;const f=newRival;newRival=function(){__nr++;return f.apply(this,arguments)}});
 await tapText(G,/^Vào phòng/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}}
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 {const c=await both(()=>COOPW.thin.CAP);ok(c[0]>=2&&c[0]===c[1],'both seats run the same build with part B (TH.CAP >= 2)',c)}
 const L=await both(()=>COOPW.thin.lvl);ok(L[0]===LVL&&L[1]===LVL,'room level '+LVL+' on both',L);
 ok(await H.p.evaluate(()=>COOPW.thin.NOOP.every(n=>COOPW.thin.NOOPED.includes(n))&&!COOPW.thin.REGBAD.length&&['KMS','KMSNAP','J95B.bind','SP13.L','J95C.lastV'].every(n=>COOPW.thin.REG.includes(n))),'UI no-op list wrapped, part B state registered, REGBAD empty');
 if(process.env.DBG1)console.log('DBG1',JSON.stringify(await H.p.evaluate(()=>({why:COOPW.thin.life.why,st:COOPW.thin.life.stat,hold:COOPW.thin.life.hold}))),JSON.stringify(await G.p.evaluate(()=>({ask:COOPW.thin.life.ask,key:COOPW.thin.life.key,S:!!S,Q:Q.map(m=>m.t),ctx:(window.__tx||[]).slice(-30)}))),JSON.stringify(G.errs.concat(H.errs).slice(0,5)));
 /* first life of the guest */
 const fl=await both(()=>({st:COOPW.thin.life&&COOPW.thin.life.stat,tr:COOPW.tr.filter(x=>/^attach/.test(x)).length,nr:window.__nr,name:S&&S.name,life:COOPW.life}));
 if(LVL>=2){ok(fl[0].st.roll>=1&&fl[0].st.accept>=1,'first life of the guest: built by the host (roll + accept)',fl[0].st);
  ok(fl[1].tr===0&&fl[1].nr===0&&fl[1].st.old===0,'first life: the guest ran no core build (0 newRival, 0 attach, no old path)',fl[1]);
  ok(await H.p.evaluate(n=>COOPW.base.P.b&&COOPW.base.P.b.name===n,fl[1].name),'first life: the room has her host-built person',fl[1].name)}
 /* the host's own person + its own rows on every NPC, right before and right after each life intent (inside the same task: nothing else runs) */
 await H.p.evaluate(()=>{window.__wsd=[];const T=COOPW.thin;const w=T.withSeat;const snap=()=>JSON.stringify({n:S.name,r:S.rank,st:['tai','sac','tamco','duc','danh','bac','sung','suc','age'].map(k=>S[k]),
   rows:rivals.filter(v=>!v.coop).map(v=>[v.id,v.rel,v.oan,v.ghen,v.ev,v.alive,v.rank]),tab,Q:Q.length,used,deck:(deck||[]).length,popMsg,quiet,logs:(S.logs||[]).length,known:Object.keys(S.known||{}).length,ek:Object.keys((S.emp||{}).known||{}).length});
   T.withSeat=function(seat,fn){if(T.curDo!=='life'||seat===COOPW.seat)return w.apply(this,arguments);const a=snap();try{return w.apply(this,arguments)}finally{const b=snap();if(a!==b){let i=0;while(a[i]===b[i])i++;__wsd.push([a.slice(Math.max(0,i-60),i+80),b.slice(Math.max(0,i-60),i+80)])}else __wsd.push(0)}}});
 if(process.env.DBG)await H.p.evaluate(()=>{window.__aff=[];const f=affAdd;affAdd=function(x,y,n){if(COOPW.ctx&&(x&&x.coop||y&&y.coop))__aff.push([x&&x.name,y&&y.name,n,new Error().stack.split('\n').slice(2,9).map(l=>l.trim().split(' ')[1]).join('<')]);return f.apply(this,arguments)}});
 const H0=await H.p.evaluate(()=>{const o={};for(const k of ['name','rank','tai','sac','tamco','duc','danh','age'])o[k]=S[k];o.ids=rivals.filter(v=>!v.coop).map(v=>v.id+':'+v.name+':'+v.rel).join(',');return o});
 if(TRIP)await G.p.evaluate(()=>{window.__trip0=JSON.parse(JSON.stringify(__trip()))});
 /* ===== reviewer r1 scenarios ===== */
 const st=()=>H.p.evaluate(()=>JSON.parse(JSON.stringify(COOPW.thin.life.stat)));
 await G.p.evaluate(()=>{window.__ctx=[];const f=COOP.send;COOP.send=function(t,x){try{const o=typeof t==='string'?{t,...(x||{})}:t;__ctx.push(o.t==='do'?'do:'+o.op+':'+(o.args&&o.args.st):o.t)}catch(e){}return f.apply(this,arguments)}});
 const tx=()=>G.p.evaluate(()=>(window.__ctx||[]).slice());
 const lifeOf=async()=>({g:await G.p.evaluate(()=>COOPW.life||0),hb:await H.p.evaluate(()=>COOPW.base&&COOPW.base.P.b&&COOPW.base.P.b.life||0),gb:await G.p.evaluate(()=>COOPW.base&&COOPW.base.P.b&&COOPW.base.P.b.life||0)});
 const cardUp=()=>until(G,()=>COOPW.thin.life.key&&Q[0]&&Q[0].nl&&S&&!S.dead&&Q[0].h&&Q[0].h.includes(S.name),null,30000);
 const begin=async k=>{await H.p.evaluate(k=>{window.__forceOrigin=k},k);await G.p.evaluate(()=>{window.__forceOrigin=undefined;window.__kcO=undefined;try{over('<h3>Thử luân hồi</h3>','thử','Thử luân hồi')}catch(e){}Q=[];start()})};
 const same=async tag=>{await sleep(2500);const g=await G.p.evaluate(()=>{const o={};for(const k of ['tai','sac','tamco','duc','danh','bac','sung','suc','rank','age'])o[k]=S[k];o.name=S.name;return o});const h=await H.p.evaluate(()=>{const P=COOPW.base.P.b;const o={};for(const k of ['tai','sac','tamco','duc','danh','bac','sung','suc','rank','age'])o[k]=P.S[k];o.name=P.name;return o});ok(JSON.stringify(g)===JSON.stringify(h),tag+': guest live person == room person (stats)',{g,h})};
 const settle=async l0=>{const t0=Date.now();while(Date.now()-t0<40000){await clear(G,4);const L=await lifeOf();if(L.hb>=l0+1&&L.g>=l0+1&&!(await G.p.evaluate(()=>COOPW.inLife)))break;await sleep(400)}await sleep(1500);return lifeOf()};
 const dupQ=()=>G.p.evaluate(()=>{const t=Q.map(m=>(m.pid||'')+'|'+(m.t||'')+'|'+(m.thin?'thin':'loc'));return {n:Q.length,t,thq:(COOPW.base.P.b&&COOPW.base.P.b.S&&COOPW.base.P.b.S.thq||[]).length,pq:(COOPW.thin.view&&COOPW.thin.view.o&&COOPW.thin.view.o.pq||[]).length,thpn:S.thpn||0}});

 const hostQ=()=>H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return {thq:(B&&B.S.thq||[]).map(c=>c.pid||c.t),df:(COOPW.thin.D.DF.b||[]).map(x=>x.k||x.op||'fn'),log:COOPW.thin.D.log.slice(-14).map(x=>x.join(':'))}});
 const answerAll=async()=>{const t0=Date.now();while(Date.now()-t0<45000){await clear(G,4);await sleep(1500);if(!(await G.p.evaluate(()=>Q.some(m=>m&&m.thin)))&&!(await hostQ()).thq.length)break;await sleep(500)}await sleep(2000)};/* an answer may bring a follow-up card (e.g. Hảo hữu ra tay): until both sides are empty */
 const cnt=t=>{const c={};for(const x of t){const k=x.split('|').slice(0,2).join('|');c[k]=(c[k]||0)+1}return Object.entries(c).filter(([k,n])=>n>1)};
 /* R10: two D kinds deferred at once while held */
 {const l0=(await lifeOf()).hb;await begin('tt');ok(await cardUp(),'R10 card up (roll held)');const n0=await H.p.evaluate(()=>COOPW.thin.D.log.length);
  await H.p.evaluate(()=>{const T=COOPW.thin;try{runAct(S,rivals.find(v=>v.coop),'ally')}catch(e){window.__r10e=String(e)}/* as R7: a harness call */const v=rivals.find(x=>!x.coop&&x.alive);T.D.kind('b','ev',{tg:v.id,n:1})});await sleep(3000);
  const h1=await hostQ();ok(h1.df.length===2&&h1.df.includes('inv')&&h1.df.includes('ev'),'R10 both kinds deferred while held (inv + ev)',h1);
  await G.p.evaluate(()=>{try{nlAccept()}catch(e){}});await until(G,l=>(COOPW.life||0)>l&&!COOPW.inLife,l0,30000);await sleep(4500);
  const q=await dupQ();const L=await H.p.evaluate(n=>COOPW.thin.D.log.slice(n).map(x=>x.join(':')),n0);console.log('R10 after accept',JSON.stringify(q),JSON.stringify(L));
  ok(!cnt(q.t).length&&q.t.filter(t=>/Nhập cung/.test(t)).length===1&&q.t.filter(t=>/Hảo hữu tìm đến/.test(t)).length===1,'R10 her Q: Nhập cung once, the invite once, no card twice',q.t);
  ok(L.includes('drop-life:b:ev')&&!L.some(x=>/^held-run/.test(x)),'R10 host: the old life proof dropped (life-bound), nothing ran on the held store',L);
  if(process.env.SHOTS){/* r3: the R7/R10 scene at the NATIVE viewports (no resize), both seats; TOUCH=1: she answers the invite by a real tap */
   await tapText(G,/^Bỏ qua$/,2500);await tapText(H,/^Bỏ qua$/,1500);await sleep(400);/* the Luân hồi intro cover */
   for(let i=0;i<8&&!(await G.p.evaluate(()=>!!(Q[0]&&Q[0].thin)));i++){await G.p.evaluate(()=>{const m=document.getElementById('modal');const b=m&&!m.hidden?[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null):[];const c=b.find(x=>!x.classList.contains('x')&&!/^[✕×]$/.test(x.textContent.trim()))||b[0];if(c)c.click()});await sleep(700)}
   await sleep(1500);for(const [nm,o] of [['guest',G],['host',H]]){const vp=o.p.viewportSize();await o.p.screenshot({path:require('path').join(process.env.SHOTS,'r10-'+nm+'-'+vp.width+'x'+vp.height+'.png')});
    ok(!(await o.p.evaluate(()=>document.documentElement.scrollWidth>innerWidth)),'R10 shot '+nm+' '+vp.width+'x'+vp.height+': no horizontal overflow')}
   const same=await G.p.evaluate(()=>{const m=Q[0];return !!(m&&m.thin&&document.querySelector('#modal')&&!document.getElementById('modal').hidden&&document.querySelectorAll('#modal .opt').length===2)});ok(same,'R10 her invite shown as the native kit card (2 kit option tiles)');
   if(process.env.TOUCH){const n0=await H.p.evaluate(()=>COOPW.thin.D.log.length);const bx=await G.p.evaluate(()=>{const e=[...document.querySelectorAll('#modal .opt')].filter(e=>e.offsetParent)[0];const r=e.getBoundingClientRect();const n=[...e.querySelectorAll('*')].find(x=>!x.children.length&&/Nhận/.test(x.textContent));const R=n?n.getBoundingClientRect():r;/* her finger on the option's name (the kit tile) */return [R.x+R.width/2,R.y+R.height/2,e.textContent.trim().slice(0,12),!!n]});
    await G.p.touchscreen.tap(bx[0],bx[1]);await sleep(1200);await G.p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&/^(Vẫn làm|Đồng ý|Xác nhận)/.test(b.textContent.trim()));if(b)b.click()});await sleep(4000);
    const dl=await H.p.evaluate(n=>COOPW.thin.D.log.slice(n).map(x=>x.join(':')),n0);ok(dl.some(x=>/^pick:thInv:0/.test(x)),'R10 real touch on "Nhận": the host ran her answer once',{bx,dl})}}
  await settle(l0);await answerAll();const h2=await hostQ();ok(!h2.thq.length&&!h2.df.length,'R10 host: her store empty after she answered, nothing deferred',h2)}
 /* R8: host reload while D work is deferred */
 {const l0=(await lifeOf()).hb;await begin('tt');ok(await cardUp(),'R8 card up (roll held)');
  await H.p.evaluate(()=>{const T=COOPW.thin;try{runAct(S,rivals.find(v=>v.coop),'ally')}catch(e){window.__r10e=String(e)}/* as R7: a harness call */const v=rivals.find(x=>!x.coop&&x.alive);T.D.kind('b','ev',{tg:v.id,n:1})});await sleep(3000);
  const ls=await H.p.evaluate(()=>{const k=Object.keys(localStorage).find(k=>/^ctm-thin-d:/.test(k));const o=k&&JSON.parse(localStorage.getItem(k));return o&&o.df&&o.df.b?o.df.b.map(x=>x.k||x.op):null});
  ok(ls&&ls.length===2,'R8 the deferred work is saved as data on the host (localStorage df)',ls);
  await H.p.goto(BASE+'?room='+code);await H.p.waitForTimeout(4000);await tapText(H,/^Vào phòng|^Tiếp tục/,4000);
  ok(await until(H,()=>window.COOP&&COOP.seat==='a'&&!COOP.frozen&&COOPW.thin.lvl>=2,null,60000),'R8 host back');await clear(H,4);await sleep(3000);
  const h1=await hostQ();console.log('R8 host after reload',JSON.stringify(h1));ok(!h1.df.length,'R8 after the reload the deferred work ran (nothing left in D.DF)',h1);
  for(let i=0;i<4;i++){await G.p.evaluate(()=>{try{nlAccept()}catch(e){}});/* stale after the host reload: she re-rolls, then accepts the card again */if(await until(G,l=>(COOPW.life||0)>l&&!COOPW.inLife&&!COOPW.thin.life.ask,l0,12000))break;await cardUp()}await sleep(4500);const q=await dupQ();console.log('R8 after accept',JSON.stringify(q));const L=await settle(l0);
  ok(L.hb===l0+1&&L.g===l0+1,'R8 one new life',L);
  ok(!cnt(q.t).length&&q.t.filter(t=>/Nhập cung/.test(t)).length<=1&&q.t.filter(t=>/Hảo hữu tìm đến/.test(t)).length===1,'R8 her Q after the stale re-roll + accept: the invite once, nothing twice',q.t);
  await answerAll();const h2=await hostQ();ok(!h2.thq.length&&!h2.df.length&&!h2.log.some(x=>/^held-run/.test(x))&&h2.log.filter(x=>/^pick:thInv/.test(x)).length===1,'R8 host: her invite answered once, store empty, no held-run',h2)}
 /* R9: her old-life offer answered by the host after her new life */
 {const l0=(await lifeOf()).hb;await H.p.evaluate(()=>{Q=Q.filter(m=>!(m&&m.pid==='thInv'))});
  const g0=await G.p.evaluate(()=>{try{return runAct(S,rivals.find(v=>v.coop),'ally')}catch(e){return 'ERR '+e}});
  ok(await until(H,()=>Q.some(m=>m&&m.pid==='thInv'),null,20000),'R9 her Kết giao offer reached the host (his card)',g0);
  const lf=await H.p.evaluate(()=>{const m=Q.find(m=>m&&m.pid==='thInv');return m&&m.pp&&m.pp.lf});
  await begin('tt');ok(await cardUp(),'R9 her new life card up');await G.p.evaluate(()=>{try{nlAccept()}catch(e){}});const L=await settle(l0);ok(L.hb===l0+1&&L.g===l0+1,'R9 her new life is in',L);
  const n0=await H.p.evaluate(()=>COOPW.thin.D.log.length);const gq0=await G.p.evaluate(()=>(S.logs||[]).length);
  const r=await H.p.evaluate(()=>{const i=Q.findIndex(m=>m&&m.pid==='thInv');if(i<0)return 'no card';const m=Q.splice(i,1)[0];Q.unshift(m);try{chooseM(0)}catch(e){return 'ERR '+e}return 'ok'});await sleep(5000);
  const dl=await H.p.evaluate(n=>COOPW.thin.D.log.slice(n).map(x=>x.join(':')),n0);const gq=await G.p.evaluate(()=>Q.map(m=>m.t));
  console.log('R9 lf',lf,'host answer',r,'D.log',JSON.stringify(dl),'her Q',JSON.stringify(gq));
  ok(lf===l0,'R9 her offer carries the life that made it (pp.lf)',{lf,l0});
  ok(dl.includes('drop-life:b:invHer')&&!gq.some(t=>/Hảo hữu nhận lời|Hảo hữu từ chối/.test(t)),'R9 the host answer to her OLD life offer does not run on her new person (dropped, no card on her new life)',{dl,gq});
  await answerAll()}
 console.log('final Q',JSON.stringify(await dupQ()));
 const E=[...H.errs,...G.errs].filter(e=>!/ResizeObserver/.test(e));ok(!E.length,'no page errors',E.slice(0,5));
 const f=res.filter(r=>!r[0]).length;console.log(`\n${res.length-f}/${res.length} ok`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
