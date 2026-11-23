/* Co-op thin guest, part A (review/coop-thin-a): two Playwright clients in one room.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-a.js [workerURL] [thinLevel=0] [swap=0]
   thinLevel 0 (default, flag off): proves part A changes nothing (level stays 0, no snap/delta/do on the wire) and runs the host's
     withSeat round trip for both seats (state before == after), a write in context b (lands only in her state / her viewer row),
     the room RNG (same seed → same draws on both seats), the build-match hold (level 0 while held).
   thinLevel 1 (needs a Worker with part A, e.g. local `wrangler dev`): also the snap → guest view, delta, a version gap → snapreq, and
     a guest intent "probe" run by the host in her context.
   swap=1: the iPad creates the room (host) and the Fold joins (guest) — the coop-e2e roles swapped. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||0);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(c?JSON.stringify(x).slice(0,400):JSON.stringify(x.paths?{paths:x.paths,dels:x.dels,err:x.err}:x).slice(0,3000)):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code,seat:c.seat,week:c.week,frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}};if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   const W0=window.WebSocket;window.__tx=[];window.__rxT=[];window.WebSocket=function(a,p){const s=p===undefined?new W0(a):new W0(a,p);const sd=s.send.bind(s);
    s.send=d=>{try{if(typeof d==='string')__tx.push(JSON.parse(d).t)}catch(e){}return sd(d)};s.addEventListener('message',e=>{try{if(typeof e.data==='string')__rxT.push(JSON.parse(e.data).t)}catch(x){}});return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})},[WURL,want]);
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
/* the dialog clearer of coop-e2e.js (one source): taken from that file's text */
const clear=(()=>{const t=require('fs').readFileSync(require('path').join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
(async()=>{/* a local Worker (wrangler dev on 127.0.0.1): let the page (http://ctm.local) reach the private address */
 const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=[755,1000],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'swap',SWAP,'level',LVL);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^Vào phòng/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 {const t0=Date.now();while(Date.now()-t0<90000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}}
 ok(await G.p.evaluate(()=>__co().world),'guest in the shared world');
 ok(await until(H,()=>COOPW.on&&COOPW.base&&COOPW.base.P&&COOPW.base.P.b&&rivals.some(v=>v.coop),null,60000),'host sees the friend');
 await sleep(1500);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok((await both(()=>!!(COOPW.thin&&COOPW.X)))+''==='true,true','thin module loaded on both seats');
 /* review r1: every name the module claims is really registered (IIFE state comes through window.THIN_REG); none failed silently */
 {const R=await H.p.evaluate(()=>({bad:COOPW.thin.REGBAD,reg:COOPW.thin.REG}));ok(!R.bad.length&&['NOLUCK','FORCE','inFlip','stoleFrom','ACTX','K61PASS'].every(n=>R.reg.includes(n)),'registry: no silent registration failure, IIFE state (NOLUCK FORCE inFlip stoleFrom) registered',R)}
 if(!LVL){const L=await both(()=>COOPW.thin.lvl);ok(L[0]===0&&L[1]===0,'flag off: room level 0 on both',L);
  const W=await both(()=>__tx.filter(t=>t==='snap'||t==='delta'||t==='do'||t==='snapreq').length);ok(W[0]===0&&W[1]===0,'flag off: no snap/delta/do sent',W)}
 /* withSeat round trip on the host */
 const st=await H.p.evaluate(()=>COOPW.thin.selfTest());ok(st.ok,'host withSeat round trip: seat a and seat b, host state before == after',st.ok?{b:st.b}:st);
 const gname=await G.p.evaluate(()=>S.name),hname=await H.p.evaluate(()=>S.name);
 ok(st.b&&st.b.name===gname,'in context b, S is the guest\'s person',[st.b&&st.b.name,gname]);
 ok(st.b&&st.b.host===hname&&st.b.hostId===901,'in context b, the host is the friend entry (id 901)',st.b);
 ok(await G.p.evaluate(()=>{try{COOPW.thin.withSeat('a',()=>1);return false}catch(e){return /host only/.test(e.message)}}),'withSeat refused on the guest');
 /* a write in context b: her stat + her row on an NPC; the host's own S / row untouched */
 const w=await H.p.evaluate(()=>{const T=COOPW.thin;const r=rivals.find(v=>!v.coop&&v.alive);const t0=S.tai,rel0=r.rel,row0=(r.rl||{})[902],had=r.rl&&902 in r.rl;
   const bt0=T.seatOf('b').S.tai;let inside;
   T.withSeat('b',()=>{S.tai=(S.tai||0)+3;const x=rivals.find(v=>v.id===r.id);x.rel=(x.rel||0)+7;inside={rel:x.rel,ctx:COOPW.ctx}});
   const o={hostTai:[t0,S.tai],hostRel:[rel0,r.rel],herRow:[row0,r.rl[902]],herTai:[bt0,T.seatOf('b').S.tai],inside};
   T.withSeat('b',()=>{S.tai-=3;const x=rivals.find(v=>v.id===r.id);x.rel-=7});if(had)r.rl[902]=row0;else{delete r.rl[902]}return o});
 ok(w.hostTai[0]===w.hostTai[1]&&w.hostRel[0]===w.hostRel[1],'write in context b: host S.tai and host Thiện cảm unchanged',w);
 ok(w.herTai[1]===w.herTai[0]+3&&w.herRow[1]===(w.herRow[0]||0)+7,'write in context b: lands in her stored S and her viewer row (rl[902])',w);
 /* room RNG: same stream, same draws on both seats */
 const rA=await H.p.evaluate(()=>[0,1,2,3,4].map(()=>COOPW.thin.rng('test-'+COOP.week))),rB=await G.p.evaluate(()=>[0,1,2,3,4].map(()=>COOPW.thin.rng('test-'+COOP.week)));
 ok(JSON.stringify(rA)===JSON.stringify(rB)&&rA.every(x=>x>=0&&x<1)&&new Set(rA).size===5,'room RNG: same seed → same draws on both seats',rA.map(x=>x.toFixed(4)));
 ok(await H.p.evaluate(()=>{const a=COOPW.thin.rng('other');return a!==COOPW.thin.rlog[COOPW.thin.rlog.length-2][3]&&COOPW.thin.rlog.length>=6}),'room RNG: streams differ, draws logged');
 /* build-match hold → level off */
 ok(await H.p.evaluate(()=>{const h=COOPW.hold;COOPW.hold=true;const r=COOPW.thin.on(1);COOPW.hold=h;return r===false}),'build-match hold: no part on');
 if(LVL){
  ok(await until(H,x=>COOPW.thin.lvl===x,LVL,20000)&&await until(G,x=>COOPW.thin.lvl===x,LVL,20000),'level '+LVL+' on both (same build, host asked)',await both(()=>({lvl:COOPW.thin.lvl,want:COOPW.thin.want(),tx:__tx.filter(t=>t!=='ping'),rx:__rxT.filter(t=>t!=='pong').slice(-12)})));
  ok(await until(G,()=>COOPW.thin.view&&COOPW.thin.view.o&&COOPW.thin.view.o.P&&COOPW.thin.view.o.P.a,null,20000),'guest received the host snapshot');
  await H.p.evaluate(()=>{S.danh=(S.danh||0)+1;COOPW.thin.flush()});
  const hv=await H.p.evaluate(()=>[COOPW.thin.hv,S.danh]);ok(await until(G,x=>COOPW.thin.view.v===x[0]&&COOPW.thin.view.o.P.a.danh===x[1],hv,20000),'delta: guest view follows the host (version + value)',hv);
  await G.p.evaluate(()=>{COOPW.thin.view.v-=5});await H.p.evaluate(()=>{S.danh-=1;COOPW.thin.flush()});
  ok(await until(G,()=>__tx.includes('snapreq'),null,15000),'version gap: guest asks snapreq');
  const hv2=await H.p.evaluate(()=>[COOPW.thin.hv,S.danh]);ok(await until(G,x=>COOPW.thin.view.v===x[0]&&COOPW.thin.view.o.P.a.danh===x[1],hv2,20000),'after snapreq: full snapshot, view back in step',hv2);
  const id=await G.p.evaluate(()=>COOPW.thin.doSend('probe',{}));
  ok(await until(G,i=>{const d=COOPW.thin.view.o.dr;return d&&d.id===i&&d.r&&d.r.ctx==='b'&&d.r.name===S.name&&d.r.host===901},id,20000),'intent "probe": host ran it in her context and the result came back in the view');
  ok(await H.p.evaluate(()=>!COOPW.ctx&&COOPW.thin.selfTest().ok),'host state intact after the intent')}
 /* a normal week still goes through */
 const wk0=await H.p.evaluate(()=>COOP.week);
  const t0=Date.now();while(Date.now()-t0<90000){for(const o of [H,G]){await clear(o,6);await o.p.evaluate(()=>{const n=document.getElementById('next');if(n&&!n.disabled)n.click()}).catch(()=>{})}
  if((await H.p.evaluate(()=>COOP.week))>wk0&&(await G.p.evaluate(()=>COOP.week))>wk0)break;await sleep(300)}
 if(!((await H.p.evaluate(()=>COOP.week))>wk0&&(await G.p.evaluate(()=>COOP.week))>wk0))for(const o of [H,G])console.log('dbg week '+o.name,JSON.stringify(await o.p.evaluate(()=>{const T=COOPW.thin,G=T.G;let st=null;try{st=T.seatOf('b')}catch(e){}return{wk:wk(),week:COOP.week,b:S.buoi,sent:COOPW.sent,pend:COOPW.pend,ngo:COOPW.ngoW,nrdy:COOPW.nrdy,Q:Q.map(m=>m.t),next:document.getElementById('next').textContent,dis:document.getElementById('next').disabled,tr:COOPW.tr.filter(x=>!/^pull/.test(x)).slice(-14),G:G&&{done:G.done,log:G.log.slice(-6)},hold:!!(COOPW.gHold&&COOPW.gHold()),frPz:!!(COOPW.frPz&&COOPW.frPz()),thq:st&&st.S&&(st.S.thq||[]).map(c=>c.t||c.pid),ended:COOP.state.ended}}).catch(e=>e.message)).slice(0,2500));
 ok((await H.p.evaluate(()=>COOP.week))>wk0&&(await G.p.evaluate(()=>COOP.week))>wk0,'a week still ends and merges on both seats');
 const st2=await H.p.evaluate(()=>{COOPW.thin.seatDrop('b');return COOPW.thin.selfTest()});ok(st2.ok,'round trip again after the merged week (seat b rebuilt from the new P.b)',st2.ok?undefined:st2);
 const E=[...H.errs,...G.errs].filter(e=>!/ResizeObserver/.test(e));ok(!E.length,'no page errors',E.slice(0,5));
 const f=res.filter(r=>!r[0]).length;console.log(`\n${res.length-f}/${res.length} ok`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
