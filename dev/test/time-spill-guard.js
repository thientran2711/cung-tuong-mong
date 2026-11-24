/* TIME-SPILL GUARD (owner OD L852 + L886 + 16/11 21:42Z "lấn thời gian qua buổi tối được mà ... nói rất nhiều lần"): no act may be
   blocked because THIS buổi has too few khắc while the DAY still has them; the act spills into the next buổi (j76). Red only when the day
   is short (buổi tối never runs past the night) or the act is tied to its own buổi by nature (a "Chỉ buổi …" card, the sáng-only lesson).
   usage: node dev/test/time-spill-guard.js <built site root> [--static-only]      exit 0 = PASS, 1 = FAIL; last line = summary
   1. STATIC: every live module (dev/build/assemble.py order) is scanned, comments stripped, for buổi-only khắc gates:
      used+N<=4 / used+N>4 tests, Math.min(N,4-used) truncation, a "không kịp … trong <buổi>" reason built from BUOI, j77Kh(...) used as
      a gate for anything but a plain walk. Every allowed occurrence is listed in ALLOW with its reason; anything new = FAIL.
   2. RUNTIME (the built index.html, HOST mode, no network): buổi chiều with 1 khắc left —
      greeting inside a palace (khắc 2) · greeting at the gate (walk 1 + 1) · Xin bái kiến / Lẻn vào (1 + walk) · 'Đến gặp' (walk 2) ·
      Quốc sự-style can(2) · every map place card and every deck card: none may say "không kịp" (deck cards tied to their buổi excepted),
      each listed act is offered and, when chosen, turns the buổi with the rest carried; at buổi tối the same 2-khắc act is refused
      with "hết khắc trong ngày"; co-op: walkSpill is not switched off by the co-op world (both seats run the same rule). */
const fs=require('fs'),path=require('path'),http=require('http');
const A=process.argv.slice(2);const ROOT=path.resolve(A.find(x=>!x.startsWith('--'))||'.');const STATIC_ONLY=A.includes('--static-only');
const fails=[];const fail=m=>{fails.push(m);console.log('FAIL '+m)};
/* ---------- 1. static scan ---------- */
const asm=fs.readFileSync(path.join(ROOT,'dev/build/assemble.py'),'utf8');
const mods=[...new Set((asm.match(/\bj[a-z0-9_]*\.js\b/g)||[]))].filter(f=>fs.existsSync(path.join(ROOT,'dev/build',f)));
const strip=s=>s.replace(/\/\*[\s\S]*?\*\//g,'').replace(/(^|[^:\\'"`])\/\/[^\n]*/g,'$1');
const PAT={
 used4:/used\s*\+\s*[\w.()]+\s*(<=|>)\s*4\b/g,               /* "fits this buổi" test */
 trunc:/Math\.min\(\s*[\w.]+\s*,\s*4\s*-\s*used\s*\)/g,        /* act cost cut to what is left (no spill) */
 khongkip:/không kịp( xong| gặp nàng| đến)? trong \$\{/g,     /* a per-buổi "too late" reason built from the buổi name */
 kh:/j77Kh\(\s*[^)]*[+][^)]*\)/g,                              /* j77Kh(walk + something): an act gated on this buổi only */
 four:/[^\w.]4\s*-\s*used\b/g,                                 /* day-khắc audit 17/11: a typed 4 for the buổi's khắc (one core: BAL.time.khac / j76left) */
 ofbuoi:/khắc còn lại của buổi/g                                   /* day-khắc audit 17/11: player words must say the DAY ("còn lại trong ngày") */,
 dayfit4:/function dayFit\([^)]*\)\{[^}]*<=\s*4\b/g,                 /* day-khắc r2: the ONE time gate never reads a typed 4 */
 thisbuoi:/thành: (được vào|vào được) buổi này/g,               /* day-khắc r2: ask / sneak / lead may spill: say the arrival buổi (j77When), never a fixed "buổi này" */
 /* day-khắc land (20/11): the BAL forms of the same buổi-only gates, so new code written with BAL.time.khac instead of a typed 4 is caught too */
 usedbal:/used\s*\+\s*[\w.()]+\s*(<=|>|<|>=)\s*BAL\.time\.khac\b/g,  /* used+N vs the buổi's khắc: fits THIS buổi only */
 minbal:/Math\.min\(\s*[\w.]+\s*,\s*BAL\.time\.khac\s*-\s*used\s*\)/g, /* cost cut to the buổi's rest (no spill) */
 kleft:/BAL\.time\.khac\s*-\s*used\)?\s*(<=|>=|<|>)\s*[\w.(]/g          /* the buổi's khắc left compared to a cost */
};
/* allowed occurrences: file -> pattern -> count, each with why */
const ALLOW={
 /* day-khắc land (20/11) usedbal/minbal/kleft rows, each read by hand after the 2072-commit main merge:
    j1 can() = base, wrapped by j76 day can · j15 whyTime = wrapped by j76 day words · j72 = text after the day can() already failed ·
    j9 walkOk = "the walk fits THIS buổi" (plain walk; every spill path goes through walkSpill/walkLate) · j77 j77When = label "buổi này"
    vs arrival buổi · jmen menKh / jtsb tsbKh = spill first (j76spills), the min only trims when the day itself is short ·
    jrest = fallback when j76left is missing · j76 = the time core itself */
 'j1.js':{usedbal:1},'j15.js':{usedbal:1},'j72.js':{usedbal:1},'j9.js':{usedbal:1},'j77.js':{usedbal:1},
 'jmen.js':{minbal:1},'jtsb.js':{minbal:1},'jrest.js':{kleft:1},
 'j76.js':{khongkip:3,usedbal:7} /* the time core: "không kịp xong trong <buổi>" only for acts tied to their buổi (a.b cards, sáng lesson).
   day-khắc r2: every other entry (used4 in j1/j15/j9/j72/j76, j77 kh, jmen/jtsb trunc) had 0 hits and was dropped — dayFit reads BAL.time.khac */
};
const ST={};
for(const f of mods){const s=strip(fs.readFileSync(path.join(ROOT,'dev/build',f),'utf8'));
 for(const [k,re] of Object.entries(PAT)){const n=(s.match(re)||[]).length;if(!n)continue;(ST[f]=ST[f]||{})[k]=n;
  const ok=(ALLOW[f]||{})[k]||0;if(n>ok)fail(`static ${f}: ${n} × ${k} (allowed ${ok}) — a buổi-only khắc gate; use dayFit/dayWhy (j76) or justify it in ALLOW`)}}
console.log('static: '+mods.length+' modules scanned · hits '+JSON.stringify(ST));
if(STATIC_ONLY){console.log(fails.length?`TIME-SPILL GUARD FAIL · ${fails.length} · ${fails[0]}`:'TIME-SPILL GUARD PASS · static');process.exit(fails.length?1:0)}
/* ---------- 2. runtime ---------- */
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(res=>srv.listen(0,'127.0.0.1',res));const URL0='http://127.0.0.1:'+srv.address().port+'/';
 const {chromium}=require('playwright');const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.route('**/*',rt=>rt.request().url().startsWith(URL0)?rt.continue():rt.abort());
 const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL0,{waitUntil:'domcontentloaded'});
 /* HOST mode may run the game in a frame: use the frame that has start() */
 let F=null;for(let t=0;t<120&&!F;t++){for(const fr of p.frames()){try{if(await fr.evaluate(()=>typeof start==='function'&&typeof showModal==='function'&&typeof dayFit==='function'))F=fr}catch(e){}}if(!F)await p.waitForTimeout(500)}
 if(!F){fail('runtime: game did not load (start/dayFit missing)');done();return}
 /* SEEDED (reviewer time-spill-r1 follow-up, flake 2/56): the life and every roll in the checks come from one seeded RNG (env SEED,
    default 7), like coop-one-world.js, so a FAIL replays exactly: SEED=<n> node dev/test/time-spill-guard.js <root> */
 const SEED=+process.env.SEED||7;console.log('seed '+SEED);
 /* coop-one-world-flake 22/11 (LAW 11 family): the NPC agents decide in 3 ms wall-clock slices (BAL.ag.perf.slice); a loaded CPU lets fewer
    decide per buổi and the seeded stream shifts. window.__agAll (the game's own switch) runs every slice at once: the same run on any CPU */
 await F.evaluate(sd=>{let x=sd;window.__tsgRnd=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};Math.random=window.__tsgRnd;window.__agAll=1},SEED);
 await F.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;/* a consort life (the flake: a random life could be a maid, isSrv, where the consort gate greeting does not apply) */window.__forceOrigin='thd';window.__nlInner=1;start();window.__forceOrigin=0;window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}});
 await F.waitForFunction(()=>typeof S!=='undefined'&&!!S&&!!S.name&&!document.querySelector('#modal:not([hidden])'),null,{timeout:30000});/* real condition (the life exists, no dialog up), not an 800 ms timer */
 const R=await F.evaluate(()=>{if(window.__tsgRnd)Math.random=window.__tsgRnd;const out={rows:[],bad:[]};const B4=typeof B4L==='number'?B4L:BUOI.length-1,CH=B4-1;
  const clr=()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true};
  const body=()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;return{t:(document.getElementById('mt')||{}).textContent||'',body:M.innerText.replace(/\s+/g,' '),opts:[...M.querySelectorAll('#mb .opts > button, #mb .opts button')].map(x=>({n:x.innerText.replace(/\s+/g,' ').trim(),dis:x.disabled}))}};
  const row=(id,ok,info)=>{out.rows.push({id,ok,info});if(!ok)out.bad.push({id,info})};
  const base=(bu,u)=>{clr();window.__walkSpill=null;S.out=0;S.confined=0;S.mg=0;S.dead=false;S.buoi=bu;used=u;S.j76carry=0;S.j76ck="";S.acPass={};S.acGreet={};S.acGreetNx={};S.acSkip={};S.acSeen={};S.suc=80;S.bac=500;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}}};
  /* a palace whose chủ vị outranks her and is home */
  const host=()=>{S.rank=0;const v=liveRivals(false).filter(x=>x.alive&&!x.out).sort((a,b)=>rkOf(b)-rkOf(a))[0];if(!v)return null;const k=palaceOf(v);S.where=S.where||{};S.where[v.id]=k;return{v,k}};
  /* 0. the one rule */
  base(CH,3);row('dayFit(2) chiều 1 left',dayFit(2)===true,dayWhy(2));row('can(2) chiều 1 left (deck / Quốc sự)',can(2)===true,whyTime(2));
  base(B4,3);row('tối 1 left: 2 khắc refused, day words',!dayFit(2)&&/hết khắc trong ngày/.test(dayWhy(2)),dayWhy(2));
  /* 1. greeting inside a palace (owner's Chung Tú cung case), greeting cost 2 */
  const H=host();const kh0=ACC_ETQ.khac;
  if(H){base(CH,3);ACC_ETQ.khac=2;S.place=H.k;S.visit={k:H.k,people:[],talked:false,tk:{}};S.where[H.v.id]=H.k;
   let m=null;try{cbGreetCard(H.k);m=body()}catch(e){m={err:String(e)}}
   const o=m&&m.opts&&m.opts.find(x=>/^Bái kiến/.test(x.n));row('greet inside, 2 khắc, 1 left: offered',!!(o&&!o.dis)&&!/không kịp/.test(m&&m.body||''),m&&m.body&&m.body.slice(0,200));
   if(o){clr();const b0=S.buoi;cbGreetGo(H.k);row('greet inside: spills (carry 1, greeted next buổi too)',S.j76carry===1&&used===4&&(S.acGreetNx||{})[H.k]===wk()+"-"+(b0+1),{carry:S.j76carry,used});
    const q0=Q.map(q=>q.t||'');clr();S.mg=0;nextBuoi();clr();row('greet inside: next buổi starts with the carried khắc, no second greeting',S.buoi===b0+1&&used===1&&!cbGreetTodo(H.k),{buoi:S.buoi,used,cardsBefore:q0,mg:!!S.mg})}
   ACC_ETQ.khac=kh0;
   /* 2. greeting at the gate: walk 1 + greet 1, 1 left */
   base(CH,3);S.where[H.v.id]=H.k;const tc=travel(S.place,H.k);used=4-tc;let g=null;try{accEtqCard(H.k,()=>{window.__j77etq=1;try{goTo(H.k)}finally{window.__j77etq=0}});g=body()}catch(e){g={err:String(e)}}
   const go=g&&g.opts&&g.opts.find(x=>/^Bái kiến .* rồi vào|^Đi \(đến nơi vào buổi sau\)/.test(x.n));
   row(`gate greeting: walk ${tc} + ${ACC_ETQ.khac}, ${4-used} left: offered`,!!(go&&!go.dis)&&!/không kịp/.test(g&&g.body||''),g&&g.body&&g.body.slice(0,200));
   if(go&&/^Bái kiến/.test(go.n)){clr();accEtqGo(H.k,H.v,1,()=>{window.__j77etq=1;try{goTo(H.k)}finally{window.__j77etq=0}});row('gate greeting: inside, carry set',S.place===H.k&&S.j76carry>=1,{place:S.place,carry:S.j76carry,used,want:H.k,access:accessOf(S,H.k),walk:travel(S.place,H.k),Q:Q.map(q=>(q.t||'')+': '+String(q.h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,140)),log:(S.log||[]).slice(-4).map(x=>String(x&&x.t||x).replace(/<[^>]+>/g,'').slice(0,120))})}
  }else row('palace with a chủ vị',false,'no rival');
  /* 3. map place cards, chiều 1 left and sáng 1 left: no per-buổi "không kịp"; ask / sneak offered when the day has the khắc */
  for(const bu of [0,CH])for(const k of places().map(x=>x.k)){if(k==="home")continue;base(bu,3);if(H)S.where[H.v.id]=H.k;let m=null;try{if(accessOf(S,k).ok)j77Tap(k);else j77Card(k);m=body()}catch(e){m={err:String(e)}} /* a closed place: its card (j77Card) holds the ways in */
   const st=accState(k);const t=m&&m.body||'';
   if(/không kịp/.test(t))row(`place ${k} b${bu}`,false,t.slice(0,200));
   if(st.ask&&!st.empAway&&!st.dayDone&&dayFit((st.tc||0)+1)&&!(m&&m.opts&&m.opts.some(x=>/^Xin (bái|yết) kiến/.test(x.n))))row(`place ${k} b${bu}: ask offered`,false,t.slice(0,200));
   if(st.kind&&dayFit((st.tc||0)+1)&&!(m&&m.opts&&m.opts.some(x=>/^Lẻn vào/.test(x.n))))row(`place ${k} b${bu}: sneak offered`,false,t.slice(0,200));
   out.rows.push({id:`place ${k} b${bu}`,ok:true})}
  /* 4. person-card walks: 'Đến gặp' / 'Đến cung nàng thăm' with 1 left and a 2-khắc walk are not dead */
  base(CH,3);let pc=0;for(const v of liveRivals(false).filter(x=>x.alive&&!x.out)){const k=palaceOf(v);if(travel("home",k)<2)continue;S.where[v.id]=k;try{(v.known=v.known||{});}catch(e){}
   const hv=visitBtn(v)||'',hs=(typeof locKnown==='function'&&locKnown(v))?(seeBtn(v)||''):'';for(const [n,h] of [['visit',hv],['see',hs]]){if(!h)continue;pc++;
    const dis=/^<button[^>]*\sdisabled/.test(h),txt=h.replace(/<[^>]+>/g,' ');if(/không kịp/.test(txt)||(dis&&!accessOf(S,k).ok===false&&/khắc/.test(txt)&&dayFit(travel("home",k))))row(`person ${n} ${v.name}`,false,txt.slice(0,160))}}
  out.rows.push({id:'person cards checked',ok:true,info:pc});
  /* 5. deck: no card says "không kịp" unless it is tied to its own buổi */
  for(const bu of [0,CH]){base(bu,3);try{deal()}catch(e){}tab="act";try{render()}catch(e){}
   (deck||[]).forEach(a=>{let w='';try{w=cardWhy(a)||''}catch(e){}if(/không kịp/.test(w)&&a.b==null)row(`deck "${a.n}" b${bu}`,false,w)})}
  /* 6. co-op: the co-op world does not switch walk spill off */
  base(CH,3);const far=places().map(x=>x.k).find(k=>{if(k==="home"||travel("home",k)<2)return false;const P=walkSpill(k);return !!(P&&P.ok)});
  if(far){const P0=walkSpill(far);const W0=window.COOPW;window.COOPW=Object.assign({},W0||{},{on:true});let P=null;try{P=walkSpill(far)}finally{window.COOPW=W0}row('co-op walkSpill = solo walkSpill',JSON.stringify(P)===JSON.stringify(P0),{solo:P0,coop:P})}
  else row('a far place open next buổi',false,'none');
  /* 7. day-khắc audit (owner 17/11 ~16:45Z): the Dư đồ greys a place only when the DAY cannot hold the walk — a walk that spills keeps the plain label */
  base(CH,3);{const ml=window.__mapList,kp=window.__kpm;window.__mapList=0;window.__kpm=null;let h='';try{h=mapHTML()}finally{window.__mapList=ml;window.__kpm=kp}if(!/data-(go|ak)=/.test(h))row('dudo map rendered',false,h.slice(0,120));let n=0;for(const k of places().map(x=>x.k)){if(k==="home")continue;const P=walkSpill(k);if(!(P&&P.ok))continue;n++;
   const m=h.match(new RegExp('<(?:button|div) class="mspot([^"]*)"[^>]*data-(?:go|ak)="'+k+'"'));if(m&&/\b(off|awalk|agrey)\b/.test(m[1]))row('dudo '+k+' spills but greyed',false,m[1])}
   out.rows.push({id:'dudo spill places checked',ok:true,info:n});
   let g='';try{g=mapHTMLgrid()}catch(e){}for(const k of places().map(x=>x.k)){if(k==="home")continue;const P=walkSpill(k);if(!(P&&P.ok))continue;const m=g.match(new RegExp('<(?:button|div) class="mtile([^"]*)"[^>]*data-(?:go|ak)="'+k+'"'));if(m&&/\b(awalk|agrey)\b/.test(m[1]))row('list '+k+' spills but greyed',false,m[1])}}
  /* 8. rest (Nghỉ ngơi dưỡng sức, buổi tối only): its khắc = the rest of the DAY; 1 left at tối → refused in day words */
  {const rd=(pool()||[]).find(a=>a.rest==="ds");if(rd){base(B4,1);restFix(rd);row('rest tối 3 left: k = day left',rd.k===j76left()&&!cardWhy(rd),{k:rd.k,left:j76left(),why:cardWhy(rd)});
   base(B4,3);restFix(rd);const w=cardWhy(rd)||'';row('rest tối 1 left: refused in day words',/hết khắc trong ngày/i.test(w)&&!/không kịp/.test(w),w)}else out.rows.push({id:'rest card not in pool',ok:true})}
  /* 9. NPC parity (two-way): an NPC deed reads the SAME function — j76left(buổi, her khắc) — as her act (dayFit) */
  base(CH,3);row('NPC chiều kh 3, deed 2 khắc: allowed (spills)',2<=j76left(CH,3)&&dayFit(2),{left:j76left(CH,3)});
  base(B4,3);row('NPC tối kh 3, deed 2 khắc: refused',!(2<=j76left(B4,3))&&!dayFit(2),{left:j76left(B4,3)});
  row('NPC rows = player rows for every buổi/khắc',[0,1,2,3].every(b=>[0,1,2,3,4].every(u=>{base(Math.min(b,B4),u);return j76left(Math.min(b,B4),u)===j76left()})),'');
  /* 10. day-khắc r2 (review r1 FAIL 1): EVERY reader of accState treats a walk that only spills as OPEN. Court panel "Đến <nơi> gặp ngài"
     (Hoàng thượng) and "Sang Đức Thọ cung thỉnh an" (Thái hậu), sáng + chiều with 1 khắc left: enabled whenever walkSpill(k).ok */
  const dis=h=>/^<button[^>]*\sdisabled/.test(h||''),txt=h=>String(h||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  let cm=0;for(const bu of [0,CH]){for(const k of places().map(x=>x.k)){if(k==="home")continue;base(bu,3);S.where=S.where||{};S.where.emp=k;const st=accState(k);
    if(st.ask||st.why&&!st.walk)continue;const P=walkSpill(k);if(!(P&&P.ok))continue;cm++;const B=courtMeet('emp');const h=B.find(x=>/data-kgmgo=/.test(x))||'';
    row(`court emp at ${k} b${bu}: spill walk open`,!!h&&!dis(h)&&!/buổi này/.test(txt(h)),txt(h).slice(0,180))}
   base(bu,3);if(!S.thDead){const st=accState("tn"),P=walkSpill("tn");if(!st.ask&&P&&P.ok){cm++;const h=courtMeet('th').find(x=>/data-kgmgo=/.test(x))||'';row(`court th b${bu}: spill walk open`,!!h&&!dis(h),txt(h).slice(0,180))}}}
  out.rows.push({id:'court walks checked',ok:true,info:cm});
  /* 10b. the tap: the court button walks on into the next buổi (walkGo → walkSpillGo), it does not stall */
  {base(0,3);const P=walkSpill("tn");if(P&&P.ok&&!S.thDead&&!accState("tn").ask){const h=courtMeet('th').find(x=>/data-kgmgo=/.test(x))||'';const d=document.createElement('div');d.innerHTML=h;document.body.appendChild(d);
    try{const b=d.querySelector('button');if(b)b.click()}finally{d.remove()}const W=window.__walkSpill;row('court th tap at sáng 1 left: spill walk started',!!(W&&W.k==="tn")||S.place==="tn",{W:W&&W.k,place:S.place});window.__walkSpill=null}}
  /* 11. the whole family, by render: no disabled button anywhere (every tab + court cards) carries the spill sentence of j77WalkWhy
     ("đi N khắc, đến nơi đã sang buổi X" with no closing reason) — a spill is never a block */
  {const SPILL=/(^|\s)đi \d+ khắc, đến nơi đã sang buổi \S+(\s|$)(?!—)/;const seen=[];const p0=pbtn;pbtn=function(){const h=p0.apply(this,arguments);seen.push(h);return h};
   try{for(const bu of [0,CH]){base(bu,3);for(const t of ["act","go","staff","inv","rv","court","rel","fac","kid","art","story"]){try{tab=t;window.__mapList=0;render()}catch(e){}
     const pn=document.getElementById('panel');if(pn)pn.querySelectorAll('button[disabled]').forEach(b=>seen.push(b.outerHTML));
     try{window.__mapList=1;if(t==="go")render();if(pn)pn.querySelectorAll('button[disabled]').forEach(b=>seen.push(b.outerHTML))}catch(e){}window.__mapList=0}
    for(const k of places().map(x=>x.k)){if(k==="home")continue;base(bu,3);S.where.emp=k;try{courtMeet('emp');courtMeet('th')}catch(e){}}}}finally{pbtn=p0}
   let n=0;for(const h of new Set(seen)){if(!dis(h))continue;n++;const m=(h.match(/<span class="kwhy">([^<]*)<\/span>/)||[])[1]||'';if(SPILL.test(m))row('disabled by a spill: '+txt(h).slice(0,80),false,m);
    /* day-khắc land (20/11, the sweep after the 2072-commit main merge): at sáng / chiều with 1 khắc left the DAY still holds 5+ khắc, so no
       button may be greyed "hết khắc" or "không kịp" — except the sáng-only thỉnh an («không kịp xong trong buổi sáng», OD L852 (b)) */
    if(/hết khắc|không kịp/.test(m)&&!/không kịp xong trong buổi sáng/.test(m))row('greyed for time while the day has khắc: '+txt(h).slice(0,80),false,m)}
   out.rows.push({id:'disabled buttons scanned',ok:true,info:n})}
  /* 12. words (review r1 FAIL 3): ask / sneak / lead lines say the arrival buổi when the walk spills, "buổi này" only when it fits */
  {base(CH,3);let wn=0;for(const k of places().map(x=>x.k)){if(k==="home")continue;const st=accState(k);if(!st.ask&&!st.kind)continue;const tc=st.tc||0;wn++;
    const L=[st.ask?accAskLine(k):'',st.kind?accSneakLine(k,tc):''].filter(Boolean).join(' | ');const sp=used+tc+1>BAL.time.khac;
    row(`ask/sneak words ${k} chiều 1 left`,sp?(!/buổi này/.test(L)&&/đến nơi vào buổi/.test(L)):/buổi này/.test(L),L.slice(0,200))}
   out.rows.push({id:'ask/sneak lines checked',ok:true,info:wn})}
  /* 13. one core (review r1 FAIL 2): dayFit follows BAL.time.khac, not a typed 4 */
  {const k0=BAL.time.khac;try{BAL.time.khac=k0+1;base(CH,k0);row('dayFit reads BAL.time.khac',dayFit(1)===true,{khac:BAL.time.khac,used})}finally{BAL.time.khac=k0}}
  clr();return out});
 for(const r of R.bad)fail('runtime '+r.id+' · '+JSON.stringify(r.info).slice(0,220));
 if(errs.length)fail('page errors: '+errs.slice(0,3).join(' | '));
 console.log('runtime: '+R.rows.length+' checks, '+R.bad.length+' bad · '+R.rows.filter(r=>r.ok&&typeof r.info==='number').map(r=>r.id+' '+r.info).join(' · '));
 await b.close();done()})().catch(e=>{fail('crash '+e.message);done()});
function done(){try{srv.close()}catch(e){}console.log(fails.length?`TIME-SPILL GUARD FAIL · ${fails.length} · ${fails[0]}`:'TIME-SPILL GUARD PASS · static + runtime');process.exit(fails.length?1:0)}
