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
 kh:/j77Kh\(\s*[^)]*[+][^)]*\)/g                               /* j77Kh(walk + something): an act gated on this buổi only */
};
/* allowed occurrences: file -> pattern -> count, each with why */
const ALLOW={
 'j1.js':{used4:1},        /* the first can(); replaced by j76's day-aware can() */
 'j15.js':{used4:1},       /* the first whyTime(); wrapped by j76 (day reasons) */
 'j76.js':{used4:7,khongkip:3}, /* the time core: fits-this-buổi test + spill; "không kịp xong trong <buổi>" only for acts tied to their buổi (a.b cards, sáng lesson) */
 'j9.js':{used4:1},        /* walkOk: the walk fits now; walkSpill / walkGo spill the rest */
 'j77.js':{kh:1},          /* accEtqGo old path: greeting that fits this buổi (the spill path is dayFit) */
 'j72.js':{used4:1},       /* message after !can(k) (can is day-aware) */
 'jmen.js':{trunc:1},      /* menKh: after the j76spills branch, only the night end (buổi tối) is cut */
 'jtsb.js':{trunc:1}       /* tsbKh: same */
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
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL0,{waitUntil:'domcontentloaded'});
 /* HOST mode may run the game in a frame: use the frame that has start() */
 let F=null;for(let t=0;t<120&&!F;t++){for(const fr of p.frames()){try{if(await fr.evaluate(()=>typeof start==='function'&&typeof showModal==='function'&&typeof dayFit==='function'))F=fr}catch(e){}}if(!F)await p.waitForTimeout(500)}
 if(!F){fail('runtime: game did not load (start/dayFit missing)');done();return}
 await F.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}});
 await p.waitForTimeout(800);
 const R=await F.evaluate(()=>{const out={rows:[],bad:[]};const B4=typeof B4L==='number'?B4L:BUOI.length-1,CH=B4-1;
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
    nextBuoi();row('greet inside: next buổi starts with the carried khắc, no second greeting',S.buoi===b0+1&&used===1&&!cbGreetTodo(H.k),{buoi:S.buoi,used})}
   ACC_ETQ.khac=kh0;
   /* 2. greeting at the gate: walk 1 + greet 1, 1 left */
   base(CH,3);S.where[H.v.id]=H.k;const tc=travel(S.place,H.k);used=4-tc;let g=null;try{accEtqCard(H.k,()=>{window.__j77etq=1;try{goTo(H.k)}finally{window.__j77etq=0}});g=body()}catch(e){g={err:String(e)}}
   const go=g&&g.opts&&g.opts.find(x=>/^Bái kiến .* rồi vào|^Đi \(đến nơi vào buổi sau\)/.test(x.n));
   row(`gate greeting: walk ${tc} + ${ACC_ETQ.khac}, ${4-used} left: offered`,!!(go&&!go.dis)&&!/không kịp/.test(g&&g.body||''),g&&g.body&&g.body.slice(0,200));
   if(go&&/^Bái kiến/.test(go.n)){clr();accEtqGo(H.k,H.v,1,()=>{window.__j77etq=1;try{goTo(H.k)}finally{window.__j77etq=0}});row('gate greeting: inside, carry set',S.place===H.k&&S.j76carry>=1,{place:S.place,carry:S.j76carry})}
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
  clr();return out});
 for(const r of R.bad)fail('runtime '+r.id+' · '+JSON.stringify(r.info).slice(0,220));
 if(errs.length)fail('page errors: '+errs.slice(0,3).join(' | '));
 console.log('runtime: '+R.rows.length+' checks, '+R.bad.length+' bad');
 await b.close();done()})().catch(e=>{fail('crash '+e.message);done()});
function done(){try{srv.close()}catch(e){}console.log(fails.length?`TIME-SPILL GUARD FAIL · ${fails.length} · ${fails[0]}`:'TIME-SPILL GUARD PASS · static + runtime');process.exit(fails.length?1:0)}
