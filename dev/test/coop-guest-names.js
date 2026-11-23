/* coop-guest-names (review/coop-guest-names, law 6b + OD:L165 + law 1 two-way): on EITHER seat no local / world record may mask a co-op shared
   person (the friend, her maid / servants / children / home family) with its own title (rv-hao-huu r2 FAIL A: «Hàn lâm học sĩ ???» over the
   met friend's name on the guest). usage: python3 dev/build/assemble.py && node dev/test/coop-guest-names.js [outdir] [workerURL]
   env COOP_SWAP=1 (iPad hosts), COOP_A_ORIGIN / COOP_B_ORIGIN (default tt / nc), GN_WEEKS (default 1).
   Steps: room + join → probe both seats (k61-coop-probe) → FORCED COLLISION on both seats: an unmet world man (S.men, «Hàn lâm học sĩ») and an
   unmet own record take the friend's full name and her maid's → the friend's name (met: as is; unmet: «Hảo hữu của ta») and her maid's never
   read «Hàn lâm học sĩ ???», in k61Scrub, kitName and a live DOM text node; key clash: a local record holding a world person's j61 key → two keys
   → one merged week → probe again (the rebuilt world keeps it). */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');const PROBE=require('./k61-coop-probe.js');
const OUT=path.resolve(process.argv[2]||'/tmp/coop-guest-names');fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,900):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const booted=o=>o.p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000}).catch(()=>{});
async function mk(b,name,vp,origin){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
 await serve(ctx);/* night-final (as coop-e2e): .kcf / #kroul are no longer hidden — clear() (lib/coop-clear.js) ends them like a player */
 await ctx.addInitScript(([u,k])=>{window.COOP_URL=u;if(k)window.__forceOrigin=k},[WURL,origin||'']);
 const o={ctx,name,errs:[]};const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
 p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return o}
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:15000});return true}catch(e){}}await sleep(250)}return false}
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}
   const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}
   {const c=window.COOP,st=c&&c.state||{};const on=st.status&&st.status!=='off';const wk=c&&c.week!=null?c.week:(st.week||0);const you=c&&(c.seat||st.you);
    if(on&&(st.status!=='open'||!st.peerOnline||(window.COOPW&&COOPW.on&&(COOPW.sent===wk||(you&&(st.ended||{})[you])))))return'coop'}/* never press the co-op wait / freeze panel (coop-e2e clear) */
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);
   const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled]):not([data-kcp])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}if(st!=='x')return st;await sleep(200)}return'many'}
const until=async(o,fn,arg,ms=30000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const probe=o=>o.p.evaluate(PROBE);
async function check(tag,A,B){for(const o of [A,B]){const r=await probe(o);if(r.skip||r.err){ok(false,`${tag} ${o.name}: probe ran`,r);continue}
  ok(!r.coll.length,`${tag} ${o.name} (seat ${r.seat}): no shared person's name is given to another record by the mask (${r.n} shared people)`,r.coll.length?r.coll.slice(0,6):undefined);
  ok(!r.keyDup.length,`${tag} ${o.name}: one j61 key = one person on this seat`,r.keyDup.length?r.keyDup.slice(0,6):undefined);
  if(r.scrub)ok(r.scrub.ok,`${tag} ${o.name}: the friend's name after the mask (${r.scrub.named?'met':'unmet'})`,r.scrub)}}
/* FORCED COLLISION (both seats): an unmet world man «Hàn lâm học sĩ» (S.men) and an unmet record of this seat's own (a new servant of a world
   consort) take the friend's full name / her maid's; their j61 keys are forgotten (unmet) */
async function force(o){return o.p.evaluate(()=>{const P=COOPW.base.P[COOPW.seat==='a'?'b':'a'];const f=k61CoopEnt();const fn=(f&&f.name)||P.name;const mn=P.S&&P.S.maid&&P.S.maid.name;
  const man=(S.men||[]).find(m=>m.alive!==false);if(!man)return{err:'no man'};man.role='Hàn lâm học sĩ';man.rw='hàn lâm học sĩ';man.name=fn;delete S.known[kOf61(man)];
  let srv=null;if(mn){const v=rivals.find(x=>!x.coop&&x.alive&&!x.out);if(v){srv={sid:88800+(COOPW.seat==='a'?1:2),name:mn,role:'eunuch',age:30,loyal:50};(v.staff=v.staff||[]).push(srv);delete S.known[kOf61(srv)]}}
  K61RX=null;K61VER++;window.__gnF={fn,mn,man:man.id};
  const t='Quý nhân '+fn;const s1=k61Scrub(t,true,'',t);const kn=typeof kitName==='function'?kitName(f||{name:fn,coop:true}):'';
  const d=document.createElement('div');d.id='gn-probe';d.textContent=t+(mn?' · '+mn+' dâng trà':'');document.body.appendChild(d);
  return{fn,mn,named:f?k61Named(f):null,s1,kn:String(kn).replace(/<[^>]+>/g,''),srv:!!srv}})}
async function domRead(o){await sleep(400);return o.p.evaluate(()=>{const d=document.getElementById('gn-probe');const t=d?d.textContent:'';if(d)d.remove();return t})}
(async()=>{const b=await chromium.launch();const FOLD=['fold',[755,1000,2]],IPAD=['ipad',[1180,820,2]];const [VA,VB]=process.env.COOP_SWAP?[IPAD,FOLD]:[FOLD,IPAD];
 const A=await mk(b,VA[0],VA[1],process.env.COOP_A_ORIGIN||'tt'),B=await mk(b,VB[0],VB[1],process.env.COOP_B_ORIGIN||'nc');
 await A.p.goto(BASE,{waitUntil:'domcontentloaded'});await booted(A);ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await sleep(600);ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 ok(await until(A,()=>window.COOP&&(COOP.code||(COOP.state||{}).room)&&(COOP.seat||(COOP.state||{}).you)==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code||COOP.state.room);console.log('room',code);await clear(A);
 await B.p.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});await booted(B);await tapText(B,/^Vào phòng/,4000);await sleep(3000);console.log('B join',JSON.stringify(await B.p.evaluate(()=>({st:COOP.state.status,room:COOP.state.room,err:COOP.state.err||COOP.state.error||null,url:location.href}))),B.errs.slice(0,3));
 {const t0=Date.now();let w=false;while(Date.now()-t0<90000){await clear(A);await clear(B);const fr=o=>o.p.evaluate(()=>{try{const f=k61CoopEnt();return typeof S!=='undefined'&&S&&!!(window.COOPW&&COOPW.base)&&(f?f.name:null)}catch(e){return null}});
   const a=await fr(A),c=await fr(B);if(a&&c){w=true;break}await sleep(500)}ok(w,'both seats in the shared world, each sees the friend',w?undefined:await B.p.evaluate(()=>({st:window.COOP&&COOP.state&&COOP.state.status,you:COOP.state&&COOP.state.you,S:typeof S!=='undefined'&&!!S,base:!!(window.COOPW&&COOPW.base),modal:(document.getElementById('modal')||{}).textContent.slice(0,200),btns:[...document.querySelectorAll('button')].filter(b=>b.offsetParent).map(b=>b.textContent.trim()).slice(0,12)})));if(!w){await b.close();process.exit(1)}}
 await check('start',A,B);
 /* both players MEET (the hao-huu r2 case: met friend) — knowledge set the way an introduction does (k61Know stage 2) */
 const meet=o=>o.p.evaluate(()=>{const f=k61CoopEnt();if(f){k61Know([f],"",true,2);K61RX=null}return f?k61Named(f):null});
 for(const o of [A,B]){const before=await force(o);const dom=await domRead(o);const bad=s=>/Hàn lâm học sĩ|thái giám \?\?\?|Thái giám \?\?\?/.test(s||'');
  ok(!bad(before.s1)&&!bad(before.kn)&&!bad(dom),`${o.name} friend (${before.named?'met':'unmet'}), forced collision: never «Hàn lâm học sĩ ???» / «thái giám ???» over her or her maid`,{s1:before.s1,kn:before.kn,dom});
  if(before.named===false)ok(/Hảo hữu của ta/.test(before.s1)&&!/\?\?\?/.test(before.s1),`${o.name} unmet friend reads «Hảo hữu của ta» (OD:L1060)`,before.s1);else ok(before.s1==='Quý nhân '+before.fn,`${o.name} friend already met at start (same palace / Hoàng hậu): her name as is`,before);
  const met=await meet(o);const after=await o.p.evaluate(()=>{const F=window.__gnF;const t='Quý nhân '+F.fn;const d=document.createElement('div');d.id='gn-probe';d.textContent=t+(F.mn?' · '+F.mn+' dâng trà':'');document.body.appendChild(d);
   return{s1:k61Scrub(t,true,'',t),kn:String(kitName(k61CoopEnt()||{name:F.fn})).replace(/<[^>]+>/g,''),want:t}});const dom2=await domRead(o);
  ok(met&&after.s1===after.want&&!bad(after.kn)&&dom2.startsWith(after.want)&&!bad(dom2),`${o.name} MET friend, forced collision: her name stays as is (sheet title case)`,{met,after,dom2})}
 /* F3 the friend's entry OUT of rivals (the week end pulls it, she is at home, a rebuild in flight): the unmet «Hàn lâm học sĩ» who holds her
    full name must not take it — unmet: «Hảo hữu của ta», met: her name as is */
 for(const o of [A,B])for(const st of [0,2]){const r=await o.p.evaluate(st=>{const F=window.__gnF;const f=rivals.find(v=>v.coop)||null;const L0=f?null:rivals.find(v=>(v.staff||[]).some(x=>x.coop));const fs=L0?L0.staff.find(x=>x.coop):null;const K=S.known,PP=COOPW.base.P[COOPW.seat==='a'?'b':'a'],k=(PP.S.srv&&!PP.S.srv.risen?'s':'r')+PP.pid;const k0=K[k];K[k]=st;
   const i=f?rivals.indexOf(f):-1;if(i>=0)rivals.splice(i,1);const j=fs?L0.staff.indexOf(fs):-1;if(j>=0)L0.staff.splice(j,1);K61RX=null;K61VER++;const t='Quý nhân '+F.fn;let out;try{out=k61Scrub(t,true,'',t)}finally{if(i>=0)rivals.splice(i,0,f);if(j>=0)L0.staff.splice(j,0,fs);K[k]=k0;K61RX=null;K61VER++}return{st,out,t,pulled:i>=0||j>=0}},st);
  ok(st?r.out===r.t:/^Hảo hữu của ta$/.test(r.out),`${o.name} friend entry out of rivals (${st?'met':'unmet'}), forced collision: ${st?'her name as is':'«Hảo hữu của ta»'}`,r)}
 await check('forced',A,B);
 /* jnamefix cross-seat (law 6b): the HOST sweep gives way to the friend — the world man who took her full name is renamed, she keeps it */
 {const hostO=(await A.p.evaluate(()=>COOPW.seat))==='a'?A:B;const r=await hostO.p.evaluate(()=>{const F=window.__gnF;const m=(S.men||[]).find(x=>x.id===F.man);const out=typeof nmFix==='function'?nmFix('gn'):null;const f=k61CoopEnt();
   return{fn:F.fn,man:m&&m.name,fr:f&&f.name,renamed:(out||[]).filter(x=>x.old===F.fn||x.old===F.mn).map(x=>[x.old,x.neu,x.why,x.kind])}});
  ok(r.man&&r.man!==r.fn&&r.fr===r.fn,'host sweep (jnamefix): the world man holding the friend\'s full name gives way, she keeps it',r)}
 /* key clash: a record of this seat's own holding the j61 key of a world man (kk issued by the other seat) */
 for(const o of [A,B]){const r=await o.p.evaluate(()=>{const m=(S.men||[]).find(x=>x.alive!==false&&x.id!=='m96'&&x.id!==(window.__gnF||{}).man);if(!m)return{err:'no man'};const k=kOf61(m);
   /* guest seat: a record of her own; host seat: a person of the friend (her entry's servants, a copy from her seat) */
   const L=COOPW.seat==='a'?((rivals.find(v=>v.coop)||{}).staff||null):(S.staff=S.staff||[]);if(!L)return{err:'no list'};
   const x={name:'Lục Thanh Viễn',role:'eunuch',age:40};x.kk=k;L.push(x);const k2=kOf61(x);const k3=kOf61(m);L.splice(L.indexOf(x),1);return{seat:COOPW.seat,k,k2,k3,same:k2===k3}});
  ok(!r.err&&!r.same,`${o.name}: a local record that carries a world person's j61 key gets its own key (two people, two keys)`,r)}
 /* reviewer r1 (law 1 two-way): the mirror on EACH seat — a copy of the OTHER player's person on her entry (her child) and a world record of this
    seat carrying the same kk (both seats run the key counter from the same shared S.kseq, so this seat's next key = the other seat's next key) */
 for(const o of [A,B]){const r=await o.p.evaluate(()=>{const f=rivals.find(v=>v.coop);if(!f)return{err:'no friend entry'};let c=(f.kids||[])[0],made=false;
   if(!c){c={name:'Tiểu Thư Thử',age:3,alive:true};(f.kids=f.kids||[]).push(c);made=true}const kc=kOf61(c);const m={name:'Đỗ Văn Thử',role:'Hàn lâm học sĩ',alive:true,kk:c.kk};
   (S.men=S.men||[]).push(m);const km=kOf61(m);S.men.splice(S.men.indexOf(m),1);if(made)f.kids.splice(f.kids.indexOf(c),1);return{seat:COOPW.seat,kseq:S.kseq,kc,km,same:kc===km}});
  ok(!r.err&&!r.same,`${o.name} (seat ${r.seat}): the other player's person copy and a world record with the same kk get two keys (two-way)`,r)}
 /* one merged week: the world is rebuilt from the room; the probe must stay clean */
 const press=async o=>{for(let t=0;t<120;t++){await clear(o);const r=await o.p.evaluate(()=>{if(COOPW.pend||COOPW.bend)return true;const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});if(r)return true;await sleep(250)}return false};
 for(let w=0;w<(+process.env.GN_WEEKS||1);w++){const wk=await A.p.evaluate(()=>(COOP.week!=null?COOP.week:(COOP.state||{}).week||0));const t0=Date.now();
  while(Date.now()-t0<240000){const [a,c]=await Promise.all([A,B].map(o=>o.p.evaluate(()=>(COOP.week!=null?COOP.week:(COOP.state||{}).week||0))));if(a>wk&&c>wk)break;await press(A);await press(B);await sleep(300)}
  const [a,c]=await Promise.all([A,B].map(o=>o.p.evaluate(()=>(COOP.week!=null?COOP.week:(COOP.state||{}).week||0))));ok(a>wk&&c>wk,`week ${w+1}: both seats advanced`,[wk,a,c]);await clear(A);await clear(B);await check('after week '+(w+1),A,B)}
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} ok`);fs.writeFileSync(OUT+'/coop-guest-names.json',JSON.stringify(res,null,1));await b.close();process.exit(bad.length?1:0)})();
