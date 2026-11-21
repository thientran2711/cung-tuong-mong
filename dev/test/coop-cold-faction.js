/* Co-op cold-faction (review/cold-faction, owner co-op land gate OD L594): faction life while a PLAYER is in lãnh cung, on BOTH seats, both ways.
   usage: python3 dev/build/assemble.py && node dev/test/coop-cold-faction.js [outdir] [workerURL]   A = host 755x1000@2, B = guest 1180x820@2.
   Each seat founds a faction with the friend's consort entry; then B goes to lãnh cung (cold() → pos out): on A the friend is on the roll but not
   present (facIn), no face-to-face ask reaches her, and A (leader) can strike her off (Gạch tên button → facAct); on B (cold) her tab is shut and her
   lãnh cung cards hold the faction letters (Rời phe played). Then the same with A in lãnh cung, seen from B. 0 page errors. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/tmp/coop-cold-faction');fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u;
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code||'',seat:c.seat,week:c.week||0,online:c.online||{},ended:c.ended||{},
      frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};const p=await ctx.newPage();p.setDefaultTimeout(30000);
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return o}
const ALL=[];
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){await el.click();return true}await sleep(250)}return false}
/* close the normal game's dialogs (never the co-op waiting/freeze panel); remembers the titles seen */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   /* the Luân hồi flow (owner 16/11): skip the origin roulette, close a kit book (review/coop-b1b5-p2 harness update) */
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const kx=[...document.querySelectorAll('.kbk-x')].find(x=>x.offsetParent!==null&&/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||''));if(kx){kx.click();return'x'}
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-bar button')].find(x=>x.offsetParent!==null&&/^Lui$/.test(x.textContent.trim()));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';
   try{const t=(m.querySelector('h2,h3,.kmt,.kmtitle')||{}).textContent||'';(window.__seen=window.__seen||[]).push(t.trim()+' | '+m.textContent.replace(/\s+/g,' ').slice(0,300))}catch(e){}
   const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* r1 fix 6: a seat that already pressed for this step (buổi ended = bend, night-ready by the night gate or its night with the Emperor, week end out) counts as pressed */
async function press(o){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(()=>{if(window.COOPW&&COOPW.on&&((COOPW.nReady&&COOPW.nReady())||COOPW.bend||COOPW.pend||COOPW.sent===(COOP.state.week||0)))return true;const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});if(r)return true;await sleep(250)}
  ok(false,o.name+' #next enabled');return false}
async function buoiBoth(A,B){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));await press(A);await press(B);
  for(let t=0;t<80;t++){const a=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0)),b=await B.p.evaluate(()=>__co().week+':'+(S.buoi||0));if(a!==k0&&b!==k0&&a===b)return true;await clear(A);await clear(B);await sleep(250)}
  ok(false,'buổi '+k0+' advanced for both');return false}
const nB=o=>o.p.evaluate(()=>typeof B4N==='number'?B4N:3);
/* play to the last buổi of the week (both) */
async function toLast(A,B){const n=await nB(A);for(let i=0;i<40;i++){const b=await A.p.evaluate(()=>S.buoi||0);if(b>=n-1)return;await buoiBoth(A,B)}}
async function weekWait(o,wk,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(x=>__co().week===x+1,wk))return true;for(const x of ALL)await clear(x);await sleep(300)}return false}
/* the pets as each side sees them */
const myPets=o=>o.p.evaluate(()=>(S.pets||[]).map(P=>({t:P.t,at:P.at||0,full:Math.round(P.full),stg:P.stg|0})));
const frPets=o=>o.p.evaluate(()=>{const f=COOPW.friend();return f?(f.pets||[]).map(P=>({t:P.t,at:P.at||0,full:Math.round(P.full),stg:P.stg|0})):null});
const npcPets=o=>o.p.evaluate(()=>rivals.filter(v=>!v.coop).map(v=>v.id+':'+(v.pets||[]).map(P=>P.t+'/'+Math.round(P.full||0)+'/'+(P.stg|0)).join(',')).join(';'));
/* run one of A's acts on the friend with the dice forced (o: true = success, undetected) */
const act=(o,k,force)=>o.p.evaluate(([k,force])=>{const r0=roll,c0=caught;if(force){roll=x=>true;caught=()=>""}try{const f=COOPW.friend();
   const okk=!!(f&&ACT[k]&&ACT[k].ok(S,f));const r=okk?coopPetAct(k):"";return{okk,r:String(r).replace(/<[^>]+>/g,'').slice(0,200)}}finally{roll=r0;caught=c0}},[k,force]);
async function samePets(A,B,tag){
  const [a,b,fa,fb]=[await myPets(A),await myPets(B),await frPets(A),await frPets(B)];
  const k=L=>JSON.stringify((L||[]).map(x=>[x.t,x.at,x.stg]).sort());
  ok(k(fa)===k(b),tag+': A sees B\'s real pets',[fa,b]);ok(k(fb)===k(a),tag+': B sees A\'s real pets',[fb,a]);
  const na=await npcPets(A),nb=await npcPets(B);ok(na===nb,tag+': NPC pets identical on both',na===nb?undefined:[na.slice(0,200),nb.slice(0,200)])}
async function waitFr(o,fn,ms=15000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(fn).catch(()=>false))return true;await sleep(300)}return false}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]);ALL.push(A);
 await A.p.goto(BASE);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 await A.p.waitForFunction(()=>__co().code&&__co().seat==='a',null,{timeout:30000});
 const code=(await A.p.evaluate(()=>__co())).code;console.log('room',code);await clear(A);
 const B=await mk(b,'guest',[1180,820,2]);ALL.push(B);await B.p.goto(BASE+'?room='+code);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 await B.p.waitForFunction(()=>__co().seat==='b'&&!__co().frozen,null,{timeout:40000});
 {const inGame=o=>o.p.evaluate(()=>!!(__co().world&&COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}}
 /* both as consorts in the palace (a servant / tiểu thư-at-home start has no consort entry to aim pet acts at) */
 for(const o of [A,B])await o.p.evaluate(()=>{if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=Math.max(S.rank||0,3);render()});
 ok(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world),'both in the shared world');await clear(A);await clear(B);

 const fr=o=>o.p.evaluate(()=>{const f=COOPW.friend();return f?{id:f.id,out:!!f.out}:null});
 /* harness: the friend's consort entry arrives with the next world sync (flaked 2/3 under load at SETUP) → wait for it on both seats */
 for(const o of [A,B])await o.p.waitForFunction(()=>!!COOPW.friend(),null,{timeout:60000}).catch(()=>{});
 ok(!!await fr(A)&&!!await fr(B),'each has the other as a consort entry');
 /* each seat: a faction of her own with the friend's entry + one NPC (she leads) */
 for(const o of [A,B])await o.p.evaluate(()=>{const f=COOPW.friend();S.facs=[];S.rank=6;f.rank=Math.min(f.rank||0,2);const n=liveRivals(true).find(x=>!x.coop&&!x.queen&&!sameHouse(S,x));n.rank=1;found(S,f);joinFac(n,facOf(S));render()});
 for(const [X,Y,tag] of [[B,A,'B'],[A,B,'A']]){
  await X.p.evaluate(()=>{cold("Thử lãnh cung (co-op)");Q.length=0;S.bac=Math.max(S.bac||0,200);render()});await clear(X);
  ok(await X.p.evaluate(()=>herCold()&&!facIn(S)),tag+' seat: she is in lãnh cung (herCold)');
  const x=await X.p.evaluate(()=>{const h=facHTML(),L=coldActs().map(c=>c.n).filter(n=>/^Gửi thư/.test(n));const c=coldActs().find(c=>/^Gửi thư xin rời/.test(c.n));const r=c?c.go():"";return{shut:!/data-fa=/.test(h),L,left:!facOf(S),r:String(r||"").replace(/<[^>]+>/g,"")}});
  ok(x.shut&&x.L.length>=2&&x.left,tag+' seat (cold): tab shut, letter cards, Rời phe by letter works',x);
  {const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);await press(A);await press(B);ok(await weekWait(A,wk)&&await weekWait(B,wk),'week merged ('+tag+' in lãnh cung)');await clear(A);await clear(B)}
  ok(await waitFr(Y,()=>{const f=COOPW.friend();return !!(f&&f.out)},30000),'the other seat sees '+tag+' out (merged week)');
  const rf=await Y.p.evaluate(()=>{const f=COOPW.friend();let g=facOf(S);if(g&&facRoll(g).includes(f))return false;/* the merged month may have dissolved it (game events): found again with her (still out) */S.facs=[];found(S,f);return true});
  const y=await Y.p.evaluate(()=>{const f=COOPW.friend(),g=facOf(S);const n=liveRivals(true).find(x=>!x.coop&&!facOf(x));if(n)affAdd(n,f,80);
   return{inF:facIn(f),roll:!!g&&facRoll(g).includes(f),pres:!!g&&facMembers(g).includes(f),noAsk:!n||!p3FacFr(n).includes(f),btn:new RegExp('data-fa="gach" data-fv="'+f.id+'"').test(facHTML())}});
  ok(!y.inF&&y.roll&&!y.pres&&y.noAsk&&y.btn,'other seat: '+tag+' on the roll, not present, no face-to-face ask, Gạch tên button',Object.assign(y,{refound:rf}));
  await Y.p.evaluate(()=>{const f=COOPW.friend(),g=facOf(S);if(g&&!g.m.includes(key(f)))g.m.push(key(f));});
  const z=await Y.p.evaluate(()=>{const f=COOPW.friend();const oa=oan(f,S);facAct("gach",{fv:String(f.id)});const g=facOf(S);return{off:!g||!g.m.includes(key(f))}});
  ok(z.off,'other seat strikes '+tag+' off the roll (facAct gach)',z);
  await X.p.evaluate(()=>{restore(false,"Thử");Q.length=0;render()});await clear(X);
  {const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);await press(A);await press(B);ok(await weekWait(A,wk)&&await weekWait(B,wk),'week merged ('+tag+' back)');await clear(A);await clear(B)}
  ok(await waitFr(Y,()=>{const f=COOPW.friend();return !!(f&&!f.out)},30000),tag+' back from lãnh cung, seen on the other seat');
  await Y.p.evaluate(()=>{const f=COOPW.friend();S.facs=[];found(S,f);const n=liveRivals(true).find(x=>!x.coop&&!x.queen&&!sameHouse(S,x)&&!facOf(x));if(n)joinFac(n,facOf(S));render()});
  await X.p.evaluate(()=>{const f=COOPW.friend();S.facs=[];found(S,f);render()})}
 for(const o of ALL)ok(!o.errs.filter(e=>!/WebSocket|net::|Failed to fetch/.test(e)).length,o.name+': 0 page errors',o.errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x[0]).length;console.log(n?`COOP-COLD-FACTION FAIL ${n}/${res.length}`:`COOP-COLD-FACTION ALL PASS ${res.length}`);process.exit(n?1:0)})();
