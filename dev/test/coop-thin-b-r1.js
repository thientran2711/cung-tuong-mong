/* review coop-thin-b r1 probes (reviewer): double accept, double reroll, guest leave+rejoin mid-roll, host leave+rejoin mid-roll, socket drop mid-roll;
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
async function mk(b,name,vp,want,trip){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);if(process.env.DFLAG)await ctx.addInitScript(()=>{try{localStorage.setItem('ctm-thin-part-4','1')}catch(e){}});
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
 const FOLD=[686,880],IPAD=[1180,820];const TRIP=!!process.env.TRIP;
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
 ok((await both(()=>COOPW.thin.CAP))+''==='2,2','both seats run a build with part B (TH.CAP 2)');
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
 /* B r1 FIX item 1: while the host answers, the wait note renders no person (not her dead old life) and ✕ / Nhận do nothing local */
 {const l0=(await lifeOf()).hb;await G.p.evaluate(()=>{const f=COOP.send;window.__holdN=0;COOP.send=function(t,x){const o=typeof t==='string'?{t,...(x||{})}:t;
   if(o.t==='do'&&o.op==='life'&&!window.__held){window.__held=1;const a=arguments,self=this;setTimeout(()=>f.apply(self,a),4000);return}return f.apply(this,arguments)}});
  const old=await G.p.evaluate(()=>S.name);const t0=(await tx()).length;await begin('tt');await sleep(800);
  const w=await G.p.evaluate(o=>{const M=document.getElementById('modal');const txt=M&&!M.hidden?M.textContent:'';
   return {thw:!!(Q[0]&&Q[0].thw),nl:Q.some(m=>m.nl),old:txt.includes(o),kpid:!!document.querySelector('#modal .kpid'),tabs:/Độ khó/.test(txt),wait:/đang định thân phận/.test(txt)}},old);
  ok(w.thw&&!w.nl&&!w.old&&!w.kpid&&!w.tabs&&w.wait,'R0 wait note: no person drawn (not the dead old life '+old+'), no Độ khó tabs, the wait text shown',w);
  await G.p.evaluate(()=>{try{nlAccept(true)}catch(e){}try{nlAccept()}catch(e){}try{closeModal()}catch(e){}});
  const T=(await tx()).slice(t0);const g=await G.p.evaluate(()=>({life:COOPW.life||0,acc:(window.__ctx||[]).filter(x=>/do:life:accept|^me$/.test(x)).length}));
  ok(!T.some(x=>/do:life:accept|^me$/.test(x))&&g.life===l0,'R0 ✕ / Nhận / close on the wait note: no accept, no me, no local life',{T,g});
  ok(await cardUp(),'R0 card up after the held answer');const L=await settle(l0);ok(L.hb===l0+1&&L.g===l0+1,'R0 then one life',L)}
 /* B r1 FIX item 6: the friend entry's "hh" is bound at the root (buildFriend): no migration into the Empress's row on either seat */
 for(const [nm,o] of [['host',H],['guest',G]]){const r=await o.p.evaluate(()=>{const fs=COOPW.seat==='a'?'b':'a';const P=JSON.parse(JSON.stringify(COOPW.base.P[fs]||{}));
   if(!P.S)return {skip:1};P.S.hh=77;P.S.dead=false;P.dead=false;if(P.S.kc)P.S.kc.inPal=1;const v=COOPW.X.buildFriend(P);if(!v)return {skip:2};const q=queenP();if(!q)return {skip:3};
   const b0=JSON.stringify(q.rl||{});rivals.push(v);let h;try{consorts();h=v.hh}finally{rivals.splice(rivals.indexOf(v),1)}
   return {same:JSON.stringify(q.rl||{})===b0,bound:!!(Object.getOwnPropertyDescriptor(v,'hh')||{}).get,h,aff:aff(q,v)}});
  ok(r.skip||(r.same&&r.bound&&r.h===r.aff),'R6 '+nm+': buildFriend binds hh (no migration of the copied 77 into the Empress row)',r)}
 /* 1. double accept (two taps of Nhận thân phận) → exactly one life */
 {const l0=(await lifeOf()).hb;const s0=await st();const t0=(await tx()).length;await begin('tt');ok(await cardUp(),'R1 dbl: card up');
  console.log('R1 Q at card',JSON.stringify(await dupQ()));
  await G.p.evaluate(()=>{nlAccept();nlAccept();});await G.p.evaluate(()=>{try{nlAccept(true)}catch(e){}});
  const L=await settle(l0);const s1=await st();const T=(await tx()).slice(t0);
  ok(L.hb===l0+1&&L.g===l0+1&&L.gb===l0+1,'R1 dbl accept: exactly one life (life '+l0+' → '+(l0+1)+')',L);
  ok(s1.accept-s0.accept===1&&T.filter(x=>x==='me').length===1&&T.filter(x=>/do:life:accept/.test(x)).length===1,'R1 dbl accept: one accept intent, one me',{acc:s1.accept-s0.accept,T});
  await same('R1');console.log('R1 Q after',JSON.stringify(await dupQ()))}
 console.log("ERRS before 2.",H.errs.length,G.errs.length,JSON.stringify(G.errs.concat(H.errs).map(e=>e.slice(0,80))));
 /* 2. double reroll → one roll */
 {const l0=(await lifeOf()).hb;const s0=await st();await G.p.evaluate(()=>pdSet(999));await begin('dtq');ok(await cardUp(),'R2 card up');
  const t0=(await tx()).length;await G.p.evaluate(()=>{nlReroll();nlReroll()});ok(await cardUp(),'R2 card after reroll');await sleep(1500);
  const T=(await tx()).slice(t0);ok(T.filter(x=>/do:life:roll/.test(x)).length===1,'R2 double reroll: one roll intent',T);
  const L=await settle(l0);ok(L.hb===l0+1&&L.g===l0+1,'R2 reroll then accept: exactly one life',L);
  await same('R2');const re=await H.p.evaluate(()=>COOPW.base.P.b.S.nlRe);ok(re===1,'R2 her reroll count kept (nlRe 1)',re)}
 console.log("ERRS before 3.",H.errs.length,G.errs.length,JSON.stringify(G.errs.concat(H.errs).map(e=>e.slice(0,80))));
 /* 3. guest reload while the card waits */
 {const l0=(await lifeOf()).hb;await begin('cn');ok(await cardUp(),'R3 card up');
  await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^Vào phòng|^Tiếp tục/,3000);{const t0=Date.now();while(Date.now()-t0<30000){const bt=await G.p.evaluate(()=>[...document.querySelectorAll('button')].filter(b=>b.offsetParent!==null).map(b=>b.textContent.trim().slice(0,30)));console.log('R3 buttons',JSON.stringify(bt).slice(0,400),await G.p.evaluate(()=>JSON.stringify(window.__co&&__co())));if(await G.p.evaluate(()=>window.COOP&&COOP.seat==='b'))break;await tapText(G,/^(Vào phòng|Vào lại|Chơi tiếp|Tiếp tục)/,2000);await sleep(2000)}}await G.p.evaluate(()=>{window.__ctx=[];const f=COOP.send;COOP.send=function(t,x){try{const o=typeof t==='string'?{t,...(x||{})}:t;__ctx.push(o.t==='do'?'do:'+o.op+':'+(o.args&&o.args.st):o.t)}catch(e){}return f.apply(this,arguments)}}).catch(()=>{});
  ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'R3 guest back in seat b');
  const L=await settle(l0);const g=await G.p.evaluate(()=>({dead:!S||S.dead,nl:Q.some(m=>m.nl),name:S&&S.name,inLife:COOPW.inLife,tr:COOPW.tr.filter(x=>/^attach/.test(x)).length}));
  const hold=await H.p.evaluate(()=>COOPW.thin.life.hold);/* her death is not sent to the room before `me` (all levels, pre-existing): she may come back in her old life; then the host must not keep holding the rolled life */
  ok((L.hb===l0+1&&L.g===l0+1||L.hb===l0&&L.g===l0)&&!g.dead&&!g.nl&&!hold,'R3 leave+rejoin mid-roll: one life (new, or the old one resumed) and the host holds no unaccepted life',{L,g,hold});
  ok(await H.p.evaluate(n=>COOPW.base.P.b.name===n,g.name),'R3 room person == guest person',g.name);
  ok(g.tr===0,'R3 after reload the guest built nothing (0 attach)',g.tr)}
 console.log("ERRS before 4.",H.errs.length,G.errs.length,JSON.stringify(G.errs.concat(H.errs).map(e=>e.slice(0,80))));
 /* 4. host reload while her card waits → accept gets "stale" → re-roll → one life */
 {const l0=(await lifeOf()).hb;await G.p.evaluate(()=>pdSet(999));await begin('nc');ok(await cardUp(),'R4 card up');
  const k1=await G.p.evaluate(()=>COOPW.thin.life.key);await G.p.evaluate(()=>nlReroll());ok(await until(G,k=>COOPW.thin.life.key&&COOPW.thin.life.key!==k&&Q[0]&&Q[0].nl,k1,30000),'R4 rerolled once (re 1) before the host reload');
  await H.p.goto(BASE+'?room='+code);await H.p.waitForTimeout(4000);await tapText(H,/^Vào phòng|^Tiếp tục/,4000);
  ok(await until(H,()=>window.COOP&&COOP.seat==='a'&&!COOP.frozen&&COOPW.thin.lvl>=2,null,60000),'R4 host back, level '+LVL);
  await clear(H,4);
  const L=await settle(l0);const g=await G.p.evaluate(()=>({dead:!S||S.dead,nl:Q.some(m=>m.nl),name:S&&S.name}));
  ok(L.hb===l0+1&&L.g===l0+1&&!g.dead&&!g.nl,'R4 host reload mid-roll: one new life',{L,g});
  ok(await H.p.evaluate(n=>COOPW.base.P.b.name===n,g.name),'R4 room person == guest person',g.name);
  const re=await H.p.evaluate(()=>COOPW.base.P.b.S.nlRe);ok(re===1,'R4 stale re-roll keeps her reroll count (B r1 item 4: nlRe 1, not 0)',re)}
 console.log("ERRS before 5.",H.errs.length,G.errs.length,JSON.stringify(G.errs.concat(H.errs).map(e=>e.slice(0,80))));
 /* 5. reconnect (socket drop) mid-roll */
 {const l0=(await lifeOf()).hb;await begin('bd');await G.p.evaluate(()=>{try{__ws.close()}catch(e){}});
  const L=await settle(l0);await same('R5');ok(L.hb===l0+1&&L.g===l0+1,'R5 socket drop mid-roll: one new life',L)}
 console.log('final Q',JSON.stringify(await dupQ()));
 const E=[...H.errs,...G.errs].filter(e=>!/ResizeObserver/.test(e));ok(!E.length,'no page errors',E.slice(0,5));
 const f=res.filter(r=>!r[0]).length;console.log(`\n${res.length-f}/${res.length} ok`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
