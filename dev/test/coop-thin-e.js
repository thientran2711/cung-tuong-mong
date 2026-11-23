/* coop-thin-e (part E: the buổi step + night gate on the HOST). Two clients, host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-e.js <workerURL> [level=5] [swap=0]
   E1 level 5 both seats · E2 her ready never steps her phone, no bend / where / ctm-nr from the guest, #next locked while she waits ·
   E3 the host steps both once (his step + her step in withSeat b), her buổi arrives as a part-D patch · E4 her own change of this buổi
   (bac, a log line) reaches the host's copy before her step and is not undone · E5 the world is read-only in her step (unit: an NPC
   number + a world key put back, her viewer row kept) · E6 host clock: a forced step runs both with her not ready ·
   E7 buổi tối: both ready → the night runs → week merged once · E9 cycle flags = the host's (patch, no do cyb) · E10 night by do tn + the view ·
   E11 her summons = a part-D card built on the host · E12 a world window's end on her household runs on the host · E13 no raw ref left in her S · E14 her ready from behind catches her up (host reload lost E.owe) · E15 vu cổ: her accusation of the caught host hits · E16 her hand of acts after the host's step · E8 no page errors. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||5);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
/* SHOTS=<dir outside git> (the Luân hồi intro overlay is hidden for the shot): host + guest at a buổi step (E3) and at her night card (E11), scratch only */
const shot=async(o,n)=>{if(!process.env.SHOTS)return;try{await o.p.evaluate(()=>{for(const b of document.querySelectorAll('.krbox')){const ov=b.parentElement;if(ov&&ov!==document.body)ov.style.display='none'}});await o.p.screenshot({path:require('path').join(process.env.SHOTS,n+'.png')})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|fonts\.gstatic|CORS/.test(m.text()))o.errs.push('console: '+m.text().slice(0,300))});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<12;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',okw?undefined:[await A.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent})),await B.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,log:COOPW.thin.C.log.slice(-5),modal:(document.getElementById('modal')||{}).hidden,q0:Q[0]&&Object.keys(Q[0]).join(','),q0p:Q[0]&&(Q[0].pid||Q[0].ev||''),mg:!!S.mg,km:document.querySelectorAll('.kmov').length,fr:COOP.frozen,cy:COOPW.cyHold,dead:S.dead}))]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=[686,880],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok,{low:1});
 const lv=[await H.p.evaluate(()=>COOPW.thin.lvl),await G.p.evaluate(()=>COOPW.thin.lvl)];ok(lv[0]===LVL&&lv[1]===LVL,'E1 room level '+LVL+' on both seats',lv);
 /* the guest's outgoing messages */
 await G.p.evaluate(()=>{window.__sent=[];const s=COOP.send;COOP.send=function(m){try{window.__sent.push(m.t==='act'?'act:'+m.k+':'+(m.mode||''):m.t==='do'?'do:'+m.op:m.t)}catch(e){}return s.apply(this,arguments)}});
 for(let i=0;i<4;i++){await clear(H);await clear(G);await sleep(300)}
 const st=async o=>o.p.evaluate(()=>({w:COOP.state.week,b:S.buoi||0,bac:S.bac,lg:(S.logs||[]).length,dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,E:JSON.parse(JSON.stringify(COOPW.thin.E.stat))}));
 /* review r1: the setup week's last press can land after the week turned (her ready for the NEW week's buổi): let the host step that one first */
 if(await G.p.evaluate(()=>!!(COOPW.eAsked&&COOPW.eAsked()))){const b0=await G.p.evaluate(()=>S.buoi||0);console.log('setup left her ready: one host step first');await press(H);await until(G,b=>(S.buoi||0)!==b,b0,20000);for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}}
 const h0=await st(H),g0=await st(G);
 /* E4 setup: her own change this buổi */
 await G.p.evaluate(()=>{S.bac=(S.bac||0)+7;window.__mark='E-test-'+Date.now();(S.logs=S.logs||[]).unshift({t:window.__mark});render()});
 const gb=g0.bac+7;
 {const pg=await press(G);ok(pg,'E2 guest pressed Sẵn sàng',pg?undefined:await G.p.evaluate(()=>{const n=document.getElementById('next');const W=COOPW;return {dis:n.disabled,cw:n.dataset.coopWait,nt:n.textContent,Q:Q.map(q=>q.t),mg:!!S.mg,dead:!!S.dead,modal:(document.getElementById('modal')||{}).hidden,eWait:W.eWait&&W.eWait(),wait:W.isWaiting(),fz:W.isFrozen(),pend:W.pend,base:!!W.base,inLife:W.inLife,mine:W.thin.E.mine,b:S.buoi,w:COOP.state.week,ov:[...document.querySelectorAll('.krbox,#kroul,#title')].filter(e=>e.offsetParent!==null).map(e=>e.id||e.className).slice(0,4),log:W.thin.E.log.slice(-6)}}))}await sleep(2500);
 const g1=await st(G),h1=await st(H);
 ok(g1.b===g0.b&&h1.b===h0.b,'E2 her ready alone steps nobody',[g0.b,g1.b,h0.b,h1.b]);
 ok(g1.dis===true,'E2 her #next locked while she waits',g1.nt);
 /* her change is already in the host's copy of her */
 const hc=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return {bac:B&&B.S.bac,mark:!!(B&&(B.S.logs||[]).some(x=>x&&x.t&&/^E-test-/.test(x.t)))}});
 ok(hc.bac===gb&&hc.mark,'E4 her change reached the host copy before the step',[hc,gb]);
 ok(await press(H),'E3 host pressed');
 const moved=await until(G,b=>(S.buoi||0)===b+1,g0.b,20000);const h2=await st(H),g2=await st(G);
 ok(moved&&h2.b===h0.b+1,'E3 both moved one buổi',[h0.b,h2.b,g0.b,g2.b]);
 ok(h2.E.step===(h0.E.step||0)+1&&h2.E.her>(h0.E.her||0),'E3 host ran his step + her step once (counted from before the press)',[h0.E,h2.E]);
 await shot(H,'e3-host-buoi');await shot(G,'e3-guest-buoi');
 /* E16 (review r1): she has a hand of acts after her buổi arrives from the host (level 5: her step runs on the host; her phone deals its hand) */
 {const hd=await G.p.evaluate(()=>{const P=document.getElementById('panel');return {deck:Array.isArray(deck)?deck.length:-1,len:P?P.innerHTML.length:-1,b:S.buoi,cards:P?P.querySelectorAll('button').length:0}});
  ok(hd.deck>0&&hd.cards>0,'E16 her Hành sự has acts after the host\'s step (deck dealt on her phone)',hd)}
 ok(g2.bac===gb,'E4 her change kept after the step (not undone)',[g2.bac,gb]);
 const hc2=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return {b:B&&B.S.buoi,bac:B&&B.S.bac}});
 ok(hc2.b===g2.b&&hc2.bac===g2.bac,'E3 host copy == her phone (buổi, bac)',[hc2,g2.b,g2.bac]);
 const sent=await G.p.evaluate(()=>window.__sent.slice());
 ok(!sent.some(x=>x==='bend'||x==='where'||/^act:ctm-nr/.test(x)),'E2 guest sent no bend / where / ctm-nr',sent.filter(x=>!/^pos|^act:ctm-fam|^seat/.test(x)).slice(0,30));
 ok(sent.includes('do:ready'),'E2 guest sent do ready',sent.filter(x=>/^do:/.test(x)));
 /* E5: the world is read-only in her step (unit in her context on the host) */
 const u=await H.p.evaluate(()=>{const TH=COOPW.thin,E=TH.E;return TH.withSeat('b',()=>{const v=rivals.find(x=>x&&!x.coop&&x.alive);if(!v)return {skip:1};
   const s0=v.sung,m0=S.emp.mood,r0=v.rel||0;const o=E.wSnap();v.sung=(v.sung||0)+33;S.emp.mood=(S.emp.mood+1)%3;v.rel=r0+5;(v.inv=v.inv||[]).push({k:'x-test'});E.wRestore(o);
   return {sung:v.sung===s0,mood:S.emp.mood===m0,rel:v.rel===r0+5,inv:!(v.inv||[]).some(x=>x&&x.k==='x-test'),rel0:r0}})});
 ok(u.skip||u.sung&&u.mood&&u.rel&&u.inv,'E5 world put back after her step, her viewer row kept',u);
 /* E6: host clock forces a step, she is not ready */
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 const g3=await st(G),h3=await st(H);
 if(h3.b<2){await H.p.evaluate(()=>COOPW.forceBend());const m2=await until(G,b=>(S.buoi||0)===b+1,g3.b,20000);const h4=await st(H);ok(m2&&h4.b===h3.b+1,'E6 host clock steps both (she was not ready)',[h3.b,h4.b,g3.b,(await st(G)).b])}
 else console.log('n/a E6: the setup week left the host at buổi '+h3.b+' (no day buổi left this week); E6 is covered by the next run');
 /* E14 (review r1): her ready from BEHIND the host (her owed step lost on a host reload: E.owe lives in host memory) catches her up at once */
 {for(let i=0;i<2;i++){await clear(H);await clear(G);await sleep(300)}const hb=(await st(H)).b;
  if(hb>=1){const w=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');B.S.buoi=(S.buoi||0)-1;COOPW.thin.E.owe=null;return COOP.state.week});
   await G.p.evaluate(([w,b])=>COOPW.thin.doSend('ready',{w,b,id:'e14',n:0}),[w,hb-1]);
   ok(await until(H,b=>COOPW.thin.seatOf('b').S.buoi===b,hb,15000),'E14 her ready from behind (no E.owe) catches her stored person up to the host\'s buổi',await H.p.evaluate(()=>[S.buoi,COOPW.thin.seatOf('b').S.buoi,COOPW.thin.E.stat.up,COOPW.thin.E.log.slice(-4)]));
   ok(await until(G,b=>(S.buoi||0)===b,hb,15000),'E14 her phone on the host\'s buổi after the catch-up',await G.p.evaluate(()=>S.buoi))}
  else console.log('n/a E14: host at buổi 0')}
 /* E7: buổi tối → the night → week merged once */
 await week(H,G,'E7');
 const sent2=await G.p.evaluate(()=>window.__sent.slice());ok(!sent2.some(x=>x==='bend'||x==='where'||/^act:ctm-nr/.test(x)),'E7 still no bend / where / ctm-nr from the guest',sent2.filter(x=>x==='bend'||x==='where'||/ctm-nr/.test(x)));
 const fin=[await st(H),await st(G)];ok(fin[0].b===fin[1].b,'E7 same buổi both seats after the week',fin.map(x=>[x.w,x.b]));
 console.log('E stat host',JSON.stringify(fin[0].E),'guest',JSON.stringify(fin[1].E));
 console.log('E log host',JSON.stringify(await H.p.evaluate(()=>COOPW.thin.E.log.slice(-25))));
 /* E9 (E-fix 'cyAsk on host', f1 #2): her cycle flags are the HOST's — her maid's card is asked and answered in her context on the host
    (coop-cyc checks the card itself); they reach her phone in the part-D patch; her phone sends no do cyb and no ctm-p2 cyb relay */
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 await G.p.evaluate(()=>{window.__sent=[]});
 const w9=await G.p.evaluate(()=>wk());
 await H.p.evaluate(w=>{COOPW.thin.withSeat('b',()=>{S.cyb=S.cyb||{};S.cyb.back=w;S.cyb.rk=w;S.cyb.rv='lui'});try{COOPW.thin.flush()}catch(e){}},w9);
 ok(await until(H,w=>{const c=COOPW.fcyb();const B=COOPW.thin.seatOf('b');return c&&c.back===w&&B.S.cyb&&B.S.cyb.rv==='lui'},w9,15000),'E9 her cycle answer is in the host copy of her (fcyb reads her person)',await H.p.evaluate(()=>[COOPW.fcyb()]));
 ok(await until(G,w=>S.cyb&&S.cyb.back===w&&S.cyb.rv==='lui',w9,15000),'E9 her cycle flags reached her phone in the patch (one fact)',await G.p.evaluate(()=>S.cyb));
 {const s9=await G.p.evaluate(()=>window.__sent.slice());ok(!s9.includes('do:cyb')&&!s9.some(x=>/^act:ctm-p2:cyb/.test(x)),'E9 no do cyb, no ctm-p2 cyb relay from her phone (the host owns her cycle flags)',s9)}
 /* E10: the night (tn) without the ctm-tn relay: her claim = do tn; the host's own change rides the view */
 await G.p.evaluate(()=>{window.__sent=[];S.tonight='me';render()});
 ok(await until(H,()=>!!(S.tn&&S.tn.w===wk()&&S.tn.who===902&&S.tonight===COOPW.friend()),null,15000),'E10 her claim (do tn) taken by the host: his S.tn = her',await H.p.evaluate(()=>[S.tn,S.tonight&&S.tonight.id]));
 const npc=await H.p.evaluate(()=>{const v=rivals.find(x=>x&&!x.coop&&x.alive&&!x.out);S.tonight=v;render();return v.id});
 ok(await until(G,id=>{const t=S.tonight;return t&&t!=='me'&&t.id===id},npc,15000),'E10 the host\'s change reaches her phone through the view',await G.p.evaluate(()=>[S.tn,S.tonight==='me'?'me':S.tonight&&S.tonight.id]));
 {const s10=await G.p.evaluate(()=>window.__sent.slice());ok(s10.includes('do:tn')&&!s10.some(x=>/^act:ctm-tn/.test(x)),'E10 sent as do tn, no ctm-tn relay',s10)}
 /* E11: the host gives her the night: her Kính sự phòng summons is a part-D card built in her context on the host */
 await H.p.evaluate(()=>{COOPW.thin.E.nk=-1;S.tonight=COOPW.friend();render()});
 ok(await until(G,()=>Q.some(q=>q&&q.thin&&/Kính sự phòng/.test(JSON.stringify(q)+((document.getElementById('modal')||{}).textContent||''))),null,20000),'E11 her summons arrives as a part-D card (built on the host)',await G.p.evaluate(()=>[Q.map(q=>q.thin?'thin:'+(q.t||''):q.t).slice(0,4),S.tonight==='me']));
 await shot(H,'e11-host-night');await shot(G,'e11-guest-night');
 ok(await H.p.evaluate(()=>COOPW.thin.E.stat.night>=1&&COOPW.thin.seatOf('b').S.tonight==='me'),'E11 her stored person has the night (tonight = me)');
 /* E12: a world window's end on HER household runs on the host in her context (phóng cung: her aged maid leaves; her choice "let") */
 const nm='E-maid-'+Date.now().toString(36);
 for(const o of [G])await o.p.evaluate(nm=>{(S.staff=S.staff||[]).push({name:nm,role:'maid',age:BAL.srvAge.ask+2,loyal:10});render()},nm);
 await H.p.evaluate(nm=>{const B=COOPW.thin.seatOf('b');(B.S.staff=B.S.staff||[]).push({name:nm,role:'maid',age:BAL.srvAge.ask+2,loyal:10});},nm);
 await H.p.evaluate(()=>{const w={id:99001,k:'phong',t0:wk()-1,t1:wk(),x:{n:0,mine:0}};WORLD_X.EVD.phong.end(w)});
 ok(await until(G,nm=>!(S.staff||[]).some(s=>s&&s.name===nm),nm,20000),'E12 her aged maid left (her household, run on the host, patch)',await H.p.evaluate(nm=>[COOPW.thin.E.stat.wwEnd,(COOPW.thin.seatOf('b').S.staff||[]).some(s=>s&&s.name===nm)],nm));
 /* E15 (review r1): vu cổ end on HER household: her accusation hits when the culprit caught is the host himself (o.gotFr), misses otherwise */
 {const u=await H.p.evaluate(()=>{const TH=COOPW.thin;return TH.withSeat('b',()=>{const f=rivals.find(v=>v&&v.coop);if(!f||(typeof isSrv==='function'&&isSrv()))return {skip:f?'srv':'nofr'};
   const w={id:99002,k:'vuco',x:{}};S.wwMe=S.wwMe||{};S.wwMe[99002]={acc:f.id};const d0=S.danh||0;const E=WORLD_X.EVD.vuco;
   E.home(w,{got:null,gotFr:true});const d1=S.danh||0;S.danh=d0;E.home(w,{got:null,gotFr:false});const d2=S.danh||0;S.danh=d0;delete S.wwMe[99002];return {d0,d1,d2}})});
  if(u.skip)console.log('n/a E15:',u.skip);else ok(u.d1>u.d2,'E15 her accusation of the host hits when he is the caught culprit (gotFr), misses otherwise',u)}
 /* E13 (#4): every part-D patch value is de-referenced on her phone — no raw {$r:id} / {$k:name} left in her S (a raw ref crashed pFaceOf → pv) */
 {const raw=await G.p.evaluate(()=>{const W=new Set((COOPW.X&&COOPW.X.W_KEYS)||[]);const out=[];const seen=new Set();
   const walk=(o,p,d)=>{if(!o||typeof o!=='object'||seen.has(o)||d>8||out.length>5)return;seen.add(o);if(!Array.isArray(o)&&Object.keys(o).length===1&&('$r' in o||'$k' in o)){out.push(p);return}
    if((typeof rivals!=='undefined'&&rivals.includes(o))&&d>0)return;for(const k of Object.keys(o))walk(o[k],p+'.'+k,d+1)};
   for(const k of Object.keys(S))if(k!=='kids'&&!W.has(k))walk(S[k],'S.'+k,1);return {raw:out,pq:(COOPW.thin.E&&COOPW.thin.E.stat)||null}});
  ok(!raw.raw.length,'E13 no raw {$r}/{$k} ref left in her S after the host\'s patches',raw.raw)}
  ok(!H.errs.length&&!G.errs.length,'E8 no page errors',[H.errs.slice(0,3),G.errs.slice(0,3)]);
 const nok=res.filter(r=>!r[0]).length;console.log('RESULT',res.length-nok+'/'+res.length);
 await b.close();process.exit(nok?1:0)})().catch(e=>{console.error(e);process.exit(2)});
