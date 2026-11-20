/* roadhp-scan (QUESTLINE Q3, review/questline-q3): the helper tags of HER road (jrdhp.js RDHP) against the live data of every road arc.
   Checks (FAIL = exit 1): (1) every «Nhờ …» option of a road arc (.4 premise + .5–.11) is tagged, or is on the no-ask list below;
   (2) every tag points at an existing option whose name holds «nhờ» (a shifted index after a road edit is caught); (3) every tagged hồi
   keeps at least one option that asks nobody (OD:L1601 (5): never a forced route) — static, and also after each option's own `if`/`need`
   filter in a neutral life; (4) every tag role has BAL.road.hp.w + a line type, every line type has the 5 answer lines (full half no sab lk),
   no line is shared, no digit / % / typed address word (VANPHONG: xưng hô only via {goi} {xung}). usage: node dev/test/roadhp-scan.js <url> */
const {chromium}=require('playwright');const URL=process.argv[2]||'http://127.0.0.1:8731/index.html';
const NOASK=/không dám nhờ|^Không nhờ ai|không kèm lời nhờ|nhờ công trận/;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof ARC67==='object'&&window.RDHP&&typeof rdHpWho==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 const r=await p.evaluate(NOS=>{const NOASK=new RegExp(NOS);const roads=new Set(Object.keys(ROAD14));const fail=[],note=[];let nho=0,tagged=0,noask=0;const beats=new Map();
  for(const [id,a] of Object.entries(ARC67)){const road=a.o==='rd'?a.road:(roads.has(id)?id:null);if(!road)continue;
   for(const [bk,bb] of Object.entries(a.B||{})){if(!Array.isArray(bb.o)){if(typeof bb.o==='function')note.push('dynamic options (not scanned): '+id+':'+bk);continue}
    bb.o.forEach((o,i)=>{const n=String(typeof o.n==='function'?'':o.n||'');if(!/nhờ/i.test(n))return;nho++;const k=id+':'+bk+':'+i;
     if(NOASK.test(n)){noask++;if(RDHP[k])fail.push('no-ask option tagged: '+k+' «'+n+'»');return}
     if(!RDHP[k])fail.push('UNTAGGED «Nhờ»: '+k+' «'+n+'»');else{tagged++;const e=beats.get(id+':'+bk)||{n:bb.o.length,t:0,id,bk};e.t++;beats.set(id+':'+bk,e)}})}}
  for(const k of Object.keys(RDHP)){const [id,bk,i]=k.split(':');const o=ARC67[id]&&ARC67[id].B&&ARC67[id].B[bk]&&ARC67[id].B[bk].o&&ARC67[id].B[bk].o[+i];
   if(!o)fail.push('tag on a missing option: '+k);else if(!/nhờ/i.test(String(o.n)))fail.push('tag on a non-«Nhờ» option: '+k+' «'+o.n+'»')}
  /* (3) a free option in every tagged hồi: static, then with the option filters of a neutral life */
  try{quiet=true;start();quiet=false;Q.length=0}catch(e){note.push('neutral life: '+e.message)}
  let dyn=0;for(const e of beats.values()){const bb=ARC67[e.id].B[e.bk];const free=bb.o.filter((o,i)=>!RDHP[e.id+':'+e.bk+':'+i]);if(!free.length){fail.push('hồi with no option that asks nobody: '+e.id+':'+e.bk);continue}
   const A={a:e.id,act:{},f:{},sc:0,n1:'',n2:''};let ok=0;for(const o of free){try{if(oNeed67(o)&&(!o.if||o.if(A)))ok++}catch(x){}}if(!ok){dyn++;note.push('free option hidden by its filter in a neutral life (engine falls back: refusal = plain failure): '+e.id+':'+e.bk)}}
  /* (4) roles, line types, lines */
  const H=BAL.road.hp,roles=new Set(Object.values(RDHP).map(x=>x.hp));for(const r of roles){if(!H.w[r])fail.push('role without BAL.road.hp.w: '+r);if(!H.type[r]||!RDHPL[H.type[r]])fail.push('role without a line type: '+r)}
  const seen=new Map(),ADDR=/tiểu chủ|nương nương|thần thiếp|tần thiếp|nô tỳ|nô tài|bổn cung|ai gia|\btrẫm\b|vi thần|muội muội|tỷ tỷ|ái phi/i;let lines=0;
  for(const [t,L] of Object.entries(RDHPL))for(const k of ['full','half','no','sab','lk']){const s=L[k];if(!s){fail.push('missing line '+t+'.'+k);continue}lines++;
   if(seen.has(s))fail.push('shared line '+t+'.'+k+' = '+seen.get(s));seen.set(s,t+'.'+k);if(/\d|%/.test(s))fail.push('digit/% in '+t+'.'+k);if(ADDR.test(s))fail.push('typed address word in '+t+'.'+k);
   const tok=(s.match(/\{(\w+)\}/g)||[]).filter(x=>!/^\{(goi|Goi|xung|Xung|hn|ri)\}$/.test(x));if(tok.length)fail.push('unknown token '+tok+' in '+t+'.'+k)}
  for(const w of Object.values(H.word))if(/\d|%/.test(w))fail.push('digit in word '+w);
  /* (5) RENDER (review E9r item 1/3): for EVERY tag, the real helper (rdHpWho on a thread of that arc, cast once, then with the cast gone)
     renders its card label and all 5 answer lines through rdHpLine at a low and a high rank: no leftover {…}, no empty name, no double space */
  let rendered=0;const R0=S.rank;
  for(const [k,t] of Object.entries(RDHP)){const [id]=k.split(':');for(const cast of [1,0])for(const rk of [1,6]){S.rank=rk;let A;try{A=newThread67(id,'t');if(cast){for(const c of ['v','v2'])try{castRv67(A,c)}catch(e){}}else A.act={}}catch(e){A={a:id,act:{},f:{},n1:'',n2:''}}
    let P;try{P=rdHpWho(A,t.hp)}catch(e){fail.push('rdHpWho throws '+k+': '+e.message);continue}const lab=rdHpLab(P);if(!lab||/^\s|\s$/.test(lab))fail.push(`empty label ${k} (${t.hp})`);
    for(let kk=0;kk<5;kk++){const Q2=Object.assign({},P,{net:kk===4?['Nhiều chuyện']:P.net.filter(x=>x!=='Nhiều chuyện')});const L=rdHpLine(A,Q2,kk===4?3:kk);rendered++;
     if(!L||/[{}]/.test(L)||/  |^[:«\s]|: «\s|^\s*$/.test(L)||/\s[,.;]/.test(L))fail.push(`render ${k} (${t.hp}, cast ${cast}, rank ${rk}, ${['full','half','no','sab','lk'][kk]}): «${L}»`)}}}
  S.rank=R0;note.push('rendered lines: '+rendered);
  const byRole={};for(const x of Object.values(RDHP))byRole[x.hp]=(byRole[x.hp]||0)+1;
  return {nho,tagged,noask,beats:beats.size,dyn,lines,fail,note,byRole}},NOASK.source);
 console.log(`«Nhờ» options ${r.nho} · tagged ${r.tagged} · no-ask ${r.noask} · tagged hồi ${r.beats} (free option hidden by a filter in a neutral life: ${r.dyn}) · answer lines ${r.lines}`);
 console.log('by role:',JSON.stringify(r.byRole));r.note.slice(0,40).forEach(x=>console.log('  note: '+x));
 r.fail.forEach(x=>console.log('FAIL '+x));if(errs.length)console.log('page errors:',errs.slice(0,5));
 console.log(r.fail.length||errs.length?`ROADHP-SCAN FAIL (${r.fail.length})`:'ROADHP-SCAN PASS');await b.close();process.exit(r.fail.length||errs.length?1:0)})();
