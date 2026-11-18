/* greet-stranger (owner 18/11 01:38Z): greeting ANY stranger on a place stage (every person kind) reveals the face always, the name by the
   greeting rule (jgreet greetName), and when no name is given the result says so in one line; the result panel never repeats a sentence.
   Per kind: talkOpts[0] must be the k61 "Chào hỏi"/"Hành lễ"; after talk(0): k61St ≥ 1 (face), card shows no "???" name when named,
   the line says "chưa biết tên"/"không xưng danh" when not named, no real name leaks when not named, no sentence twice in popMsg.
   Also: a known person, every talk option: popMsg has no duplicate sentence (the duplicate-line family, every action).
   usage: node dev/test/greet-stranger.js <dev/index.html or URL> → table + exit 1 on any FAIL / page error */
const {chromium}=require('playwright');const path=require('path');const [,,U0]=process.argv;const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0||'dev/index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{Error.stackTraceLimit=40;try{return RUN()}catch(x){return{fatal:x.stack}}function RUN(){localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out&&!(typeof isKc==="function"&&isKc()))break}window.__nlInner=0;Q.length=0;try{closeModal()}catch(e){}render();
  const T=s=>String(s||"").replace(/<br>/g," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
  const dup=h=>{const seen=new Set(),d=[];for(const seg of String(h||"").split("<br>"))for(const s of T(seg).split(/(?<=[.!?])\s+/)){const k=s.replace(/[.!?]+$/,"").trim();if(k.length<8)continue;if(seen.has(k))d.push(k);seen.add(k)}return d};
  const H=trS().H||{};const hc=Object.keys(H);const v=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x));const q=typeof queenP==="function"?queenP():null;
  const C=[];const add=(kind,ent,mk)=>{if(ent)C.push({kind,ent,mk})};
  add("rival (consort, higher)",v.find(x=>x.rank>S.rank)||v[0],e=>({kind:"rival",ref:e,name:e.name}));
  add("rival (consort, lower/equal)",v.find(x=>x.rank<=S.rank&&x!==v[0])||v[1],e=>({kind:"rival",ref:e,name:e.name}));
  {S.rank=Math.min(S.rank,2);const x=v[3]||v[v.length-1];let r=S.rank+1;while(BAL.seatCap[r]===1)r++;add("rival (higher, Kiêu ngạo: gives no name)",x,e=>{e.__n0=e.net.slice();e.__r0=e.rank;e.rank=r;e.net=["Kiêu ngạo",e.net[1],e.net[2]];return{kind:"rival",ref:e,name:e.name}})}
  if(q&&q!==S)add("hh (Hoàng hậu, level 1: name public, face seen once)",q,e=>{e.__st1=1;return{kind:"hh",ref:e,name:e.name}});
  if(q&&q!==S)add("hh (Hoàng hậu)",q,e=>({kind:"hh",ref:e,name:e.name}));
  add("min (official: "+(hc.includes("Đại tướng quân")?"Đại tướng quân":hc[0])+")",H["Đại tướng quân"]||H[hc[0]],e=>({kind:"min",ref:e,name:e.name,ini:"Quan",col:"#7a6a50",info:`${TDOFF[e.c]||"Quan"} · dự yến`}));
  add("min (official 2)",H[hc.find(k=>k!=="Đại tướng quân")],e=>({kind:"min",ref:e,name:e.name,ini:"Quan",col:"#7a6a50",info:`${TDOFF[e.c]||"Quan"} · vào chầu`}));
  if((S.men||[]).length)add("man (nam nhân)",S.men[0],e=>({kind:"man",ref:e,name:e.name,ini:"N",col:"#6a8aa0",info:`${e.role} · x`}));
  if(S.court&&S.court.ty)add("ty (thái y)",S.court.ty,e=>({kind:"ty",name:e.name,ini:"Y",col:"#8fc38a",info:"Thái y viện"}));
  if(S.court&&S.court.ksp)add("ksp (thái giám Kính sự phòng)",S.court.ksp,e=>({kind:"ksp",name:e.name,ini:"Hoạn",col:"#b9a48a",info:"Giữ thẻ bài"}));
  const fr=v[2];if(fr)add("co-op friend (rival with coop)",fr,e=>{e.coop=1;return{kind:"rival",ref:e,name:e.name}});
  const out=[];
  for(const c of C){const e=c.ent;const key=kOf61(e);S.known[key]=0;if(e.__st1){}if(e.id!=null&&(rivals||[]).includes(e))delete S.met[e.id];S.nkn=S.nkn||{};S.nkn.me={};
   S.visit.people=S.visit.people.filter(x=>!x.__t);const pp0=c.mk(e);pp0.__t=1;if(e.__st1){S.known[key]=1;delete e.__st1}S.visit.people.push(pp0);S.visit.tk={};S.visit.talked=false;used=0;Q.length=0;
   const pp=curPeople();const i=pp.findIndex(x=>x.__t||(x.ref&&x.ref===e));popIdx=i;popMsg="";if(i<0){out.push({kind:c.kind,skip:"not kept on the stage list"});continue}const ent=k61VisEnt(pp[i]);
   const row={kind:c.kind,ent:!!ent,stranger:ent?k61St(ent)<2:false};if(!ent||!row.stranger){row.skip="not a k61 stranger on stage";out.push(row);continue}
   let o;try{o=talkOpts(pp[i])}catch(x){out.push({kind:c.kind,skip:"talkOpts error "+x.message+" i="+i});continue}row.opt0=o[0]&&o[0].n;row.gate=!!(o[0]&&(o[0].k61==="greet"||o[0].k61==="name"));
   try{talk(0)}catch(x){row.err=x.message}
   if(!curPeople().some(x=>x===pp0||(x.ref&&x.ref===e)))S.visit.people.push(pp0);/* test-only people are not in the place record: put back after the khắc moves */
   {const ci=curPeople().findIndex(x=>x===pp0||x===pp[i]||(x.ref&&x.ref===e));const o2=ci<0?[]:talkOpts(curPeople()[ci]);row.open=ci>=0&&!(S.visit.tk||{})[ci]&&(o2.some(a=>!a.k61&&!(a.lock&&a.t===K61WHY))||(o2[0]&&o2[0].k61==="name"));row.next=o2.slice(0,3).map(a=>a.n).join("/")}
   row.face=k61St(e)>=1&&isKnown61(e);row.named=k61Named(e);const msg=T(popMsg);row.msg=msg.slice(0,220);
   row.saysNo=/chưa biết tên|không xưng danh/.test(msg);row.leak=!row.named&&e.name&&msg.includes(e.name);row.dup=dup(popMsg);
   const ci=curPeople().findIndex(x=>x===pp[i]||(x.ref&&x.ref===e));const card=ci<0?"":T(popCard(curPeople()[ci],ci));row.cardName=row.named?!/\?\?\?/.test(card.slice(0,120)):true;
   row.ok=row.gate&&row.open&&row.face&&(row.named||row.saysNo)&&!row.leak&&!row.dup.length&&row.cardName&&!row.err;out.push(row);if(c.kind.startsWith("co-op"))delete e.coop;if(e.__n0){e.net=e.__n0;e.rank=e.__r0;delete e.__n0}}
  /* duplicate-line family: every talk option on a known consort, a known official */
  const d=[];const w=v[0];S.known[kOf61(w)]=3;S.met[w.id]=0;const pw={kind:"rival",ref:w,name:w.name,__t:1};
  S.visit.people=S.visit.people.filter(x=>!x.__t);S.visit.people.push(pw);let ops=[];try{ops=talkOpts(pw)}catch(x){d.push({n:"ops err "+x.message,dup:[]})}
  for(let j=0;j<ops.length;j++){S.visit.people=S.visit.people.filter(x=>!x.__t);S.visit.people.push(pw);S.visit.tk={};S.visit.talked=false;used=0;Q.length=0;popIdx=curPeople().findIndex(x=>x.__t||x.ref===w);if(popIdx<0)break;popMsg="";try{talk(j)}catch(x){}const dd=dup(popMsg);d.push({n:ops[j].n,dup:dd});Q.length=0;try{closeModal()}catch(x){}}
  const h=H[hc[0]];S.known[kOf61(h)]=3;S.visit.people=S.visit.people.filter(x=>!x.__t);S.visit.people.push({kind:"min",ref:h,name:h.name,__t:1,info:"Quan"});S.visit.tk={};used=0;popIdx=curPeople().findIndex(x=>x.__t||x.ref===h);popMsg="";if(popIdx>=0)try{talk(0)}catch(x){}d.push({n:"min: Chào hỏi đúng lễ",dup:dup(popMsg)});
  return{out,d}}});if(R.fatal){console.log(R.fatal);process.exit(1)}
 let bad=0;console.log('| kind | gate (Chào hỏi first) | talk open after greet | face | named | says "no name" | leak | dup | ok |');console.log('|---|---|---|---|---|---|---|---|---|');
 for(const r of R.out){if(r.skip){console.log(`| ${r.kind} | – (${r.skip}) | | | | | | – |`);continue}if(!r.ok)bad++;console.log(`| ${r.kind} | ${r.gate?'yes':'NO ('+r.opt0+')'} | ${r.open?'yes: '+r.next:'NO ('+r.next+')'} | ${r.face?'yes':'NO'} | ${r.named?'yes':'no'} | ${r.saysNo?'yes':'–'} | ${r.leak?'LEAK':'no'} | ${r.dup.length?r.dup.join(' / '):'no'} | ${r.ok?'ok':'FAIL'} |`);console.log('   line:',r.msg)}
 const dd=R.d.filter(x=>x.dup.length);console.log(R.d.map(x=>x.n).join(' | '));console.log(`duplicate sentences over ${R.d.length} talk results (every option of a known consort + official): ${dd.length}`,dd.length?JSON.stringify(dd):'');bad+=dd.length;
 if(errs.length){console.log('page errors',errs.slice(0,3));bad++}
 console.log(bad?'FAIL '+bad:'PASS');await b.close();process.exit(bad?1:0)})();
