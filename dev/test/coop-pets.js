/* Co-op pets (review/coop-pets, owner 15/11 20:05Z): help / harm / steal the FRIEND's pet in a 2-player room on the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-pets.js [outdir] [rounds=3] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2 (both through coop-serve, dev/index.html).
   Checks: B's pets reach A's friend entry (live, pos); A helps (petcare) → B's own pet: fullness +helpGain, B sees the note, both agree;
   A harms (thaopet, forced success) → B loses that pet, her follow bonus leaves ONCE (not twice); A steals (petsteal, forced) → pet moves
   to A with its stage; a res that lands AFTER B ended the week is in the merged week (B re-sends end, A waits for the ack);
   every merged week: A's friend entry pets == B's own pets and B's friend entry pets == A's own pets; NPC pets identical on both;
   rounds × (random pet acts both ways + one week) stress; 0 page errors. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/tmp/coop-pets');fs.mkdirSync(OUT,{recursive:true});
const ROUNDS=+(process.argv[3]||3);
const WURL=process.argv[4]||'https://ctm-coop.victoria-tntt.workers.dev';
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
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await o.p.evaluate(()=>{const c=__co();if(c.frozen||c.waiting)return'coop';
   /* the Luân hồi flow (owner 16/11): skip the origin roulette, close a kit book (review/coop-b1b5-p2 harness update) */
   const rs=document.querySelector('#kroul .krskip');if(rs&&rs.offsetParent!==null){rs.click();return'x'}
   const kx=[...document.querySelectorAll('.kbk-x')].find(x=>x.offsetParent!==null&&/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||''));if(kx){kx.click();return'x'}
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim()));if(ov){ov.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-bar button')].find(x=>x.offsetParent!==null&&/^Lui$/.test(x.textContent.trim()));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';
   try{const t=(m.querySelector('h2,h3,.kmt,.kmtitle')||{}).textContent||'';(window.__seen=window.__seen||[]).push(t.trim()+' | '+m.textContent.replace(/\s+/g,' ').slice(0,300))}catch(e){}
   const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled])');if(b){b.click();return'x'}return'stuck'});
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
 /* both get pets (B: a cat that follows her + a crane; A: one dog) */
 for(const [o,L] of [[B,['meo','hac']],[A,['cho']]])await o.p.evaluate(L=>{petMax=()=>4;/* test: room for a few pets at any rank */S.pets=[];S.petOn=-1;S.petB=null;S.petBn=0;for(const t of L){const P=petAdd(S,t,'thử','buy');P.full=40;P.clean=50;P.joy=50;P.aff=30;P.stg=1;petcSync(P)}S.bac=Math.max(S.bac||0,200);render()},L);
 ok(!!await A.p.evaluate(()=>COOPW.friend())&&!!await B.p.evaluate(()=>COOPW.friend()),'each has the other as a consort entry',[await A.p.evaluate(()=>!!(S.srv&&!S.srv.risen)),await B.p.evaluate(()=>!!(S.srv&&!S.srv.risen))]);
 ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.pets||[]).length===2}),'A\'s friend entry shows B\'s 2 pets (live pos)');
 ok(await waitFr(B,()=>{const f=COOPW.friend();return f&&(f.pets||[]).length===1}),'B\'s friend entry shows A\'s pet');
 /* 1 help */
 const tgH=await A.p.evaluate(()=>{const f=COOPW.friend();return f.pets[petTarget(f)].t});const b0=await myPets(B);const rl0=await B.p.evaluate(()=>(S.rl||{})[COOPW.seat==='a'?902:901]||0);
 const h=await act(A,'petcare',false);ok(h.okk&&/giúp/.test(h.r),'A: Giúp chăm thú (petcare) is allowed on the friend and runs',h);
 ok(await waitFr(B,()=>/được chăm/.test(JSON.stringify(Q)+((document.getElementById('modal')||{}).textContent||''))),'B sees the help note (Hảo hữu sang giúp)');
 await B.p.screenshot({path:OUT+'/01-help-note-guest.png'});
 const b1=await myPets(B);const p0=b0.find(x=>x.t===tgH),p1=b1.find(x=>x.t===tgH);
 ok(p0&&p1&&p1.full===Math.min(100,p0.full+25),'B\'s own pet ('+tgH+'): No +25',[p0,p1]);
 ok(await B.p.evaluate(()=>(S.rl||{})[COOPW.seat==='a'?902:901]||0)>rl0,'B: thiện cảm toward A went up');
 await clear(B);
 /* 1b gift an item to the friend (Tặng quà = invite → she accepts → her own Quà tặng dialog → the item is in HER bag) */
 {await A.p.evaluate(()=>{S.inv=S.inv||[];S.inv.push({k:'tramngoc'});render()});const n0=await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='tramngoc').length);
  const r=await A.p.evaluate(()=>{const f=COOPW.friend();const ix=S.inv.findIndex(e=>e.k==='tramngoc');return String(runAct(S,f,'gift',ix))});ok(/ngỏ ý/.test(r),'A: Tặng quà sends the invite',r);
  ok(await waitFr(B,()=>/Hảo hữu tìm đến/.test(JSON.stringify(Q)+((document.getElementById('modal')||{}).textContent||''))),'B gets the gift invite card');
  {const t0=Date.now();while(Date.now()-t0<20000){await clear(B);if(await B.p.evaluate(n=>(S.inv||[]).filter(e=>e.k==='tramngoc').length>n,n0))break;await sleep(400)}}
  ok(await B.p.evaluate(n=>(S.inv||[]).filter(e=>e.k==='tramngoc').length===n+1,n0),'B: the hairpin is in her own bag (Quà tặng dialog kept it)',await B.p.evaluate(()=>(window.__seen||[]).slice(-3)));
  ok(await A.p.evaluate(()=>!S.inv.some(e=>e.k==='tramngoc')),'A: the hairpin left her bag');await clear(A)}
 /* 2 harm (forced success): B loses her best pet (petTarget), the follow bonus leaves once */
 const sb0=await B.p.evaluate(()=>({pets:(S.pets||[]).map(P=>P.t),on:S.petOn,b:S.petB,bn:S.petBn,stats:{sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc,danh:S.danh,th:S.th}}));
 const tgt=await A.p.evaluate(()=>{const f=COOPW.friend();return f.pets[petTarget(f)].t});
 const hm=await act(A,'thaopet',true);ok(hm.okk,'A: Hại thú nuôi (thaopet) allowed on the friend',hm);
 ok(await waitFr(B,()=>!(S.pets||[]).some(P=>P.t===window.__tg),5000)||await B.p.evaluate(t=>!(S.pets||[]).some(P=>P.t===t),tgt),'B lost '+tgt);
 const sb1=await B.p.evaluate(()=>({pets:(S.pets||[]).map(P=>P.t),on:S.petOn,b:S.petB,bn:S.petBn,stats:{sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc,danh:S.danh,th:S.th}}));
 {const d={};for(const k in sb0.stats)if(sb1.stats[k]!==sb0.stats[k])d[k]=sb1.stats[k]-sb0.stats[k];
  /* expected: the old follower's bonus off, the new follower's bonus on (if any), nothing else, never twice */
  const exp={};if(sb0.b)exp[sb0.b]=(exp[sb0.b]||0)-(sb0.bn||1);if(sb1.b)exp[sb1.b]=(exp[sb1.b]||0)+(sb1.bn||1);for(const k in exp)if(!exp[k])delete exp[k];
  ok(JSON.stringify(Object.entries(d).filter(([k])=>k!=='danh'&&k!=='th').sort())===JSON.stringify(Object.entries(exp).sort()),'B: stats changed only by the follow bonus, once',{d,exp,sb0,sb1})}
 await B.p.screenshot({path:OUT+'/02-harm-note-guest.png'});await clear(B);
 /* 3 steal (forced): give B one more pet first */
 await B.p.evaluate(()=>{const P=petAdd(S,'tho','thử','buy');P.stg=2;P.full=60;petcSync(P);render()});
 ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.pets||[]).some(P=>P.t==='tho')}),'A sees B\'s new rabbit');
 const tg2=await A.p.evaluate(()=>{const f=COOPW.friend();return {t:f.pets[petTarget(f)].t,stg:f.pets[petTarget(f)].stg}});
 const nA0=await A.p.evaluate(()=>(S.pets||[]).length);
 const st=await act(A,'petsteal',true);ok(st.okk&&/mang/.test(st.r),'A: Trộm thú (petsteal) runs',st);
 ok(await A.p.evaluate(([n,t])=>(S.pets||[]).length===n+1&&S.pets.some(P=>P.t===t.t&&(P.stg|0)===t.stg),[nA0,tg2]),'A has the stolen pet with its stage',tg2);
 ok(await waitFr(B,()=>!(S.pets||[]).some(P=>P.t===window.__x),3000)||await B.p.evaluate(t=>!(S.pets||[]).some(P=>P.t===t),tg2.t),'B no longer has it');
 await clear(A);await clear(B);
 /* 4 week merge: pets agree on both sides */
 {const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);await press(A);await press(B);ok(await weekWait(A,wk)&&await weekWait(B,wk),'week 1 merged');await clear(A);await clear(B);
  await samePets(A,B,'after week 1')}
 /* 5 late res: B ends the week first, THEN A helps her; the help must be in the merged week */
 {await B.p.evaluate(()=>{for(const P of S.pets||[]){P.full=30;petcSync(P)}render()});await sleep(1500);
  const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);await press(B);
  /* r1 fix 6: the night gate (both ready, or the host forces the night) — A holds a dialog open so only B runs the night and ends */
  await A.p.evaluate(()=>{pushModal({t:"Chờ",h:"<p>Chờ</p>"});showModal();COOPW.forceNight()});
  {const t0=Date.now();while(Date.now()-t0<30000&&!await B.p.evaluate(()=>COOPW.sent===__co().week)){await clear(B);await sleep(300)}}
  ok(await B.p.evaluate(()=>COOPW.sent===__co().week),'B ended the week (end sent)');
  ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.pets||[]).length>0}),'A still sees B\'s pets');
  const before=await myPets(B);await B.p.evaluate(f=>{window.__f0=f},Math.max(...before.map(x=>x.full)));const hh=await act(A,'petcare',false);ok(hh.okk,'A helps B after B ended',hh);
  ok(await waitFr(B,()=>(S.pets||[]).some(P=>P.full>=window.__f0+25||P.full>=100)),'B applied the late help',await myPets(B));
  await press(A);ok(await weekWait(A,wk)&&await weekWait(B,wk),'week 2 merged');await clear(A);await clear(B);
  const after=await myPets(B);const t0=before.find(x=>true);
  ok(after.some(x=>x.full>=Math.min(100,Math.max(...before.map(y=>y.full))+25)),'merged week keeps the late help',{before,after});
  await samePets(A,B,'after week 2')}
 /* 6 stress: random pet acts both ways, one week per round */
 for(let r=0;r<ROUNDS;r++){
  for(const o of [A,B])await o.p.evaluate(()=>{if((S.pets||[]).length<2){const k=pick(['meo','cho','tho','hoami','cachep']);if(!(S.pets||[]).some(P=>P.t===k)){const P=petAdd(S,k,'thử','buy');if(P){P.stg=1;petcSync(P)}}}S.bac=Math.max(S.bac||0,100);render()});
  await sleep(1500);
  for(let i=0;i<4;i++){const o=i%2?B:A;const k=['petcare','thaopet','petsteal'][Math.floor(Math.random()*3)];await act(o,k,Math.random()<.5);await sleep(300)}
  const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);
  if(r%2){await press(B);await act(A,'petcare',false);await press(A)}else{await press(A);await press(B)}
  {const w=await weekWait(A,wk)&&await weekWait(B,wk);const dbg=async o=>o.p.evaluate(()=>({co:__co(),sent:COOPW.sent,pend:COOPW.pend,rp:Object.keys(COOPW.rpend||{}).length,Q:Q.length,mg:!!S.mg,b:S.buoi,nx:document.getElementById('next').disabled,tr:COOPW.tr.slice(-6)}));
   ok(w,`stress round ${r+1}: week merged`,w?undefined:[await dbg(A),await dbg(B)])}await clear(A);await clear(B);await samePets(A,B,`stress round ${r+1}`)}
 await A.p.screenshot({path:OUT+'/03-host-end.png'});
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
