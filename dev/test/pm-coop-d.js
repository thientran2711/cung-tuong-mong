/* person-minigame-acts r2 (review r1 fix 1 + 2): a co-op Cùng chơi / Thách đấu ask keeps HER pick (game + stake) through the part-D carriers
   host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Needs a Worker with part A (e.g. local `wrangler dev`).
   usage: python3 dev/build/assemble.py && node dev/test/pm-coop-d.js [workerURL] [level=1] [swap=0]   (harness = dev/test/coop-thin-d.js setup, copied)
   Both seats set the test-only flag localStorage ctm-thin-part-4=1 (contract C1: part B not on main yet). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');
const OW=require('./odds-words.js');/* ladder words from the ONE source j0 */
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||0);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+(c?JSON.stringify(x).slice(0,400):JSON.stringify(x.paths?{paths:x.paths,dels:x.dels,err:x.err}:x).slice(0,3000)):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
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
 const settle=async()=>{await shut();for(let i=0;i<3;i++){await clear(H,6);await G.p.evaluate(()=>{for(let i=Q.length-1;i>=0;i--)if(!Q[i].thin)Q.splice(i,1);while(Q.length&&Q[0].thin&&!Q[0].opts)closeModal();for(let i=Q.length-1;i>=0;i--)if(Q[i].thin&&!Q[i].opts){const m=Q.splice(i,1)[0];Q.unshift(m);closeModal()}showModal()});await sleep(300)}};

 /* every seat records the x each pm act really runs with (ACT.pmplay / ACT.pmduel .f, wherever the relay lands: own context or the seat's context on the host) */
 for(const o of [H,G])await o.p.evaluate(()=>{window.__pmx=[];for(const k of ["pmplay","pmduel"]){const f0=ACT[k].f;ACT[k].f=function(a,t,x){try{__pmx.push({k,x:x&&typeof x==="object"?{kind:x.kind,s:x.s||null,n:x.n,live:x.live||null}:x,ctx:!!COOPW.ctx})}catch(e){}return f0.apply(this,arguments)}}
  S.bac=Math.max(S.bac||0,400);S.danh=Math.max(S.danh||0,60);for(const a of ARTS.slice(0,2))S.arts[a.k]=Math.min(4,Math.max(S.arts[a.k]||0,BAL.pm.minLv||1));/* r3: each seat has a real art to play */render()});
 await week(H,G,'stats in each other\'s entry');for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* her pick: the LAST art on offer + the LAST stake that is ok (never the defaults pmX falls back to: first art, first ok stake) */
 const pick=(o,a)=>o.p.evaluate(a=>{const f=rivals.find(v=>v.coop);const A=pmArts(S,f);const AK=A.filter(z=>z.ak&&(S.arts[z.ak]||0)<5);const ar=a==="play"&&AK.length?AK[AK.length-1]:A[A.length-1];/* r3: a pastime with a real art (Đầu hồ has none) */const x={a,kind:ar.kind,ak:ar.ak,n:ar.n};
   if(a==="duel"){const L=pmStakes(S,f).filter(z=>z.ok);x.s=L.length?L[L.length-1].s:null}return {x,arts:A.map(z=>z.kind),stakes:pmStakes(S,f).map(z=>[z.s,z.ok])}},a);
 /* Q-C2 live board: after «Nhận» both seats open the board (pm-live go / rdy); each takes «Để tài nghệ quyết định» then «Đã hiểu» */
 const pmAll=async k=>[...(await H.p.evaluate(()=>__pmx)),...(await G.p.evaluate(()=>__pmx))].filter(z=>z.k===k);
 /* a frame left open by the setup weeks (a game result nobody confirmed) is closed first: the live board never replaces an open game (jpma: «no» → fallback) */
 const shut=async()=>{for(const o of [H,G])await o.p.evaluate(()=>{for(let i=0;i<3&&KG82.phase;i++){const k=document.getElementById('kg82ok');if(KG82.phase==='result'&&k)k.click();else{try{kg82Close()}catch(e){}}}})};
 const boards=async(k,ms=90000)=>{const seen={H:0,G:0},sk={H:0,G:0};const t0=Date.now();while(Date.now()-t0<ms){for(const [o,n] of [[H,'H'],[G,'G']]){const r=await o.p.evaluate(()=>{const s=document.getElementById('kg82skip'),k=document.getElementById('kg82ok');if(KG82.phase==='intro'&&s){s.click();return 1}if(KG82.phase==='result'&&k){k.click();return 2}return 0});if(r===1)sk[n]=1;if(r)seen[n]|=r}
   if((await pmAll(k)).length)break;await sleep(400)}return seen};
 /* ===== (A) Thách đấu host → guest, then a host «reload» (CW.acts is memory only): the card answer rebuilds from pp ===== */
 await settle();const pa=await pick(H,"duel");ok(pa.x.s,'host: a stake both sides can put up',pa);
 const ra=await H.p.evaluate(x=>String(runAct(S,rivals.find(v=>v.coop),'pmduel',x)),pa.x);ok(/đợi nàng trả lời/.test(ra),'duel host→guest: an offer',ra);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000),'guest: the card arrives (part D)',await gQ());
 const ca=await G.p.evaluate(()=>{const q=Q.find(q=>q.thin&&q.t==='Hảo hữu tìm đến');return {h:String(q.h||""),o:(q.opts||[]).map(o=>[o.n,String(o.x||"")])}});
 const LAD=new RegExp('^(?:'+OW.ALT+') ·');
 ok(ca.h.includes(pa.x.n)&&/Cược:/.test(ca.h),'guest card names the game and the stake (the NPC card line)',ca);
 ok(ca.o.length>=2&&ca.o[0][0]==='Nhận lời thách đấu'&&LAD.test(ca.o[0][1])&&/thành:/.test(ca.o[0][1])&&/hỏng:/.test(ca.o[0][1])&&ca.o.some(o=>o[0]==='Từ chối'&&/được:/.test(o[1])&&/mất:/.test(o[1])),'guest card answers = the NPC card answers (ladder word, thành / hỏng, được / mất)',ca.o);
 await H.p.evaluate(()=>{for(const k in COOPW.acts)delete COOPW.acts[k]});/* the host's memory is gone (reload) */
 await front(G,'Hảo hữu tìm đến');ok(await tapM(G,/^Nhận lời thách đấu/),'guest taps Nhận lời thách đấu');
 {const bA=await boards('pmduel');ok(bA.H&&bA.G,'live board (Q-C2): both seats opened the board and played it out',bA)}
 ok(await until(H,()=>__pmx.some(z=>z.k==='pmduel'),null,20000),'host: the duel runs after her answer',await H.p.evaluate(()=>[__pmx,__dil]));
 const xa=await H.p.evaluate(()=>__pmx.filter(z=>z.k==='pmduel').pop());ok(xa&&xa.x&&xa.x.kind===pa.x.kind&&xa.x.s===pa.x.s,'host→guest after a host reload: HER game + stake kept',{sent:pa.x,ran:xa});
 ok(xa&&xa.x&&xa.x.live&&xa.x.live.ra!=null&&xa.x.live.rt!=null&&(await pmAll('pmduel')).length===1,'live board: the duel ran ONCE, with both seats\' raws',{ran:xa,n:(await pmAll('pmduel')).length});
 /* ===== (B) Thách đấu guest → host: the host's own card, her side runs in her context ===== */
 await settle();await clear(H,6);await H.p.evaluate(()=>{__pmx=[]});await G.p.evaluate(()=>{__pmx=[]});
 const pb=await pick(G,"duel");const rb=await G.p.evaluate(x=>String(runAct(S,rivals.find(v=>v.coop),'pmduel',x)),pb.x);ok(/đợi nàng trả lời/.test(rb),'duel guest→host: an offer',rb);
 ok(await until(H,()=>Q.some(q=>q.pid==='thInv'),null,20000),'host: his card (thInv)');
 const cb=await H.p.evaluate(()=>{const q=Q.find(q=>q.pid==='thInv');return {h:String(q.h||""),o:(q.opts||[]).map(o=>[o.n,String(o.x||"")])}});
 ok(cb.h.includes(pb.x.n)&&/Cược:/.test(cb.h)&&cb.o[0]&&LAD.test(cb.o[0][1]),'host card names her game + stake, ladder word on Nhận',cb);
 await front(H,'Hảo hữu tìm đến');ok(await tapM(H,/^Nhận lời thách đấu/),'host taps Nhận lời thách đấu');
 {const bB=await boards('pmduel');ok(bB.H&&bB.G,'live board guest→host: both seats opened the board',bB)}
 const got=async()=>[...(await H.p.evaluate(()=>__pmx)),...(await G.p.evaluate(()=>__pmx))].filter(z=>z.k==='pmduel');
 {const t0=Date.now();while(Date.now()-t0<20000&&!(await got()).length)await sleep(400)}
 const xb=(await got()).pop();ok(xb&&xb.x&&xb.x.kind===pb.x.kind&&xb.x.s===pb.x.s,'guest→host: HER game + stake kept',{sent:pb.x,ran:xb});
 ok(xb&&xb.x&&xb.x.live&&xb.x.live.ra!=null&&xb.x.live.rt!=null&&(await got()).length===1,'live board guest→host: ran ONCE with both raws',{ran:xb,n:(await got()).length});
 /* ===== (C) Cùng chơi host → guest: her game kept ===== */
 /* r3 fix B (law 1): the practice of «Cùng chơi» lands on BOTH real S (the asker's own, and the receiver's through res.fam {op:"art"}) */
 const PT=(o,ak)=>o.p.evaluate(ak=>{if(!ak||!S.artp||S.artp[ak]==null)return null;let n=S.artp[ak];for(let l=0;l<(S.arts[ak]||0);l++)n+=l+2;return {n,lv:S.arts[ak]||0}},ak);
 const XP=await H.p.evaluate(()=>BAL.pm.play.xp);
 await settle();await H.p.evaluate(()=>{__pmx=[]});const pc=await pick(H,"play");const gC0=await PT(G,pc.x.ak),hC0=await PT(H,pc.x.ak);await H.p.evaluate(x=>String(runAct(S,rivals.find(v=>v.coop),'pmplay',x)),pc.x);
 ok(await until(G,()=>Q.some(q=>q.thin&&q.t==='Hảo hữu tìm đến'),null,20000),'guest: the pastime card arrives');
 const cc=await G.p.evaluate(()=>{const q=Q.find(q=>q.thin&&q.t==='Hảo hữu tìm đến');return {h:String(q.h||""),o:(q.opts||[]).map(o=>[o.n,String(o.x||"")])}});
 ok(cc.h.includes(pc.x.n)&&cc.o[0]&&cc.o[0][0]==='Nhận lời'&&/được:/.test(cc.o[0][1])&&/mất:/.test(cc.o[0][1]),'guest pastime card: the game named, được / mất on Nhận lời',cc);
 await front(G,'Hảo hữu tìm đến');ok(await tapM(G,/^Nhận lời/),'guest taps Nhận lời');
 {const bC=await boards('pmplay');ok(bC.H&&bC.G,'live board pastime: both seats played',bC)}
 ok(await until(H,()=>__pmx.some(z=>z.k==='pmplay'),null,20000),'host: the pastime runs');const xc=await H.p.evaluate(()=>__pmx.filter(z=>z.k==='pmplay').pop());
 ok(xc&&xc.x&&xc.x.kind===pc.x.kind,'host→guest pastime: HER game kept',{sent:pc.x,ran:xc});
 ok(xc&&xc.x&&xc.x.live&&xc.x.live.ra!=null&&xc.x.live.rt!=null,'live board pastime: both raws',xc);
 {let g1=null;const t0=Date.now();while(Date.now()-t0<20000){g1=await PT(G,pc.x.ak);if(g1&&gC0&&g1.n>gC0.n)break;await sleep(400)}const h1=await PT(H,pc.x.ak);
  ok(gC0&&g1&&(g1.n-gC0.n===XP||g1.lv>=5)&&hC0&&h1&&(h1.n-hC0.n===XP||h1.lv>=5),'r3 fix B host→guest pastime: the RECEIVING guest gets the practice (BAL.pm.play.xp) on her own S, the host too',{ak:pc.x.ak,XP,g:[gC0,g1],h:[hC0,h1]})}
 /* ===== (D) Cùng chơi guest → host: the receiving host gets the practice ===== */
 await settle();await clear(H,6);await H.p.evaluate(()=>{__pmx=[]});await G.p.evaluate(()=>{__pmx=[]});const pd=await pick(G,"play");const hD0=await PT(H,pd.x.ak),gD0=await PT(G,pd.x.ak);
 const rd=await G.p.evaluate(x=>String(runAct(S,rivals.find(v=>v.coop),'pmplay',x)),pd.x);ok(/đợi nàng trả lời/.test(rd),'pastime guest→host: an offer',rd);
 ok(await until(H,()=>Q.some(q=>q.pid==='thInv'),null,20000),'host: his pastime card (thInv)');
 await front(H,'Hảo hữu tìm đến');ok(await tapM(H,/^Nhận lời/),'host taps Nhận lời');
 {const bD=await boards('pmplay');ok(bD.H&&bD.G,'live board pastime guest→host: both seats played',bD)}
 {let h1=null,g1=null;const t0=Date.now();while(Date.now()-t0<25000){await clear(G);h1=await PT(H,pd.x.ak);g1=await PT(G,pd.x.ak);if(h1&&hD0&&h1.n>hD0.n&&g1&&gD0&&g1.n>gD0.n)break;await sleep(400)}
  ok(hD0&&h1&&(h1.n-hD0.n===XP||h1.lv>=5)&&gD0&&g1&&(g1.n-gD0.n===XP||g1.lv>=5),'r3 fix B guest→host pastime: the RECEIVING host gets the practice on his own S, the guest too',{ak:pd.x.ak,XP,h:[hD0,h1],g:[gD0,g1]})}
 const errs=[...H.errs.map(e=>'H '+e),...G.errs.map(e=>'G '+e)].filter(e=>!/WebSocket|net::|ERR_|Failed to fetch|navigator\.vibrate/.test(e));ok(!errs.length,'no page errors',errs.slice(0,6));
 await b.close();const f=res.filter(r=>!r[0]).length;console.log(`pm-coop-d: ${res.length-f}/${res.length}`);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
