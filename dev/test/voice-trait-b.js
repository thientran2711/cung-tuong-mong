/* VOICE BY TÍNH TÌNH, part W-B unit test (toil reactions / gestures / slips, wd remarks, staff talk, cycle, ts warn, habit).
   usage: node dev/test/voice-trait-b.js   (needs dev/index.html built by dev/build/assemble.py) */
const {chromium}=require('playwright');const http=require('http');const fs=require('fs');const path=require('path');
const ROOT=path.join(__dirname,'..');
function serve(){return new Promise(r=>{const s=http.createServer((q,a)=>{const f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,d)=>{if(e){a.writeHead(404);a.end();return}a.setHeader('Content-Type',/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript; charset=utf-8':'application/octet-stream');a.end(d)})});s.listen(0,'127.0.0.1',()=>r(s))})}
(async()=>{const srv=await serve();const url=`http://127.0.0.1:${srv.address().port}/index.html`;
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__bot={pre:1}});await p.goto(url);await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(800);
 const R=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();
  const fail=[],out=[],TONES=["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"];
  const KEYS=[];for(const k of["th-scold","hh-scold"])for(const s of["moc","diem","plain","showy"])KEYS.push(`toil:${k}:${s}`);KEYS.push("toil:th-scold:vung","toil:th-praise:plain","toil:th-praise:neat","toil:hh-praise:plain","toil:hh-praise:neat",
   "toil:emp-like:fair","toil:emp-like:any","toil:emp-dislike:moc","toil:emp-dislike:diem","toil:emp-dislike:plain","toil:emp-dislike:showy","toil:rival-jealous:showy","toil:rival-jealous:any","toil:rival-tease:any","toil:rival-praise:any","toil:crowd-jealous:showy","toil:crowd-jealous:any");
  for(const w of["th","hh","emp","v"])for(const sg of["+","-"])KEYS.push(`toilGest:${w}${sg}`);
  for(const w of["th","hh","emp","rival"])for(const s of["brow","powder","son"])KEYS.push(`toilSlip:${w}:${s}`);for(const w of["th","hh","emp","rival"])KEYS.push(`toilSlip:diem:${w}`);
  KEYS.push("wd:ok","wd:over","wd:under","staff:tn:dead","staff:tn:hi","staff:tn:mid","staff:tn:lo","staff:kn:none","staff:kn:me","staff:kn:hi","staff:kn:mid","staff:kn:lo","staff:gt","cycle:ask","ts:warn","habit");
  const sizes={};let nl=0;for(const k of KEYS){const P=kTP(k);if(!P){fail.push("missing pool "+k);continue}for(const t of TONES){const n=(P[t]||[]).length;if(n<10)fail.push(`${k}/${t}: ${n}`);nl+=n}sizes[k]=TONES.map(t=>(P[t]||[]).length).join("/")}
  out.push(`pools ${KEYS.length}, lines ${nl}`);
  /* which tone(s) a produced sentence can come from (placeholders → wildcard; habit / gesture suffixes allowed after) */
  const esc=x=>x.replace(/[.*+?^$()|[\]\\]/g,"\\$&").replace(/\{[A-Za-z]+\}/g,".*").replace(/^\\\[[a-z,]+\\\]/,"");
  const tonesOf=(txt,P)=>TONES.filter(t=>(P[t]||[]).some(l=>{try{return new RegExp("^"+esc(l.replace(/^\[[a-z,]+\]/,"")).replace(/\\\{[A-Za-z]+\\\}/g,".*")).test(txt)}catch(e){return false}}));
  const v=rivals.find(x=>!x.queen&&x.alive);const n0=v.net.slice();
  /* toil reactions: same look, 8 tones → 8 distinct sentences, each from ITS OWN tone pool */
  for(const [k,sub,mk,dress,host] of [["th-scold","moc","moc","","th"],["hh-scold","plain","bt","giandi","hh"],["emp-like","any","bt","","emp"],["rival-jealous","showy","bt","photruong","rival"],["rival-praise","any","bt","giandi","rival"],["crowd-jealous","any","bt","","rival"]]){
   const P=kTP(`toil:${k}:${sub}`);if(!P)continue;const said={};
   for(const t of TONES){v.net=[t,n0[1],n0[2]];S.vmem={};S.thTrait=t;const q=rivals.find(x=>x.queen);if(q)q.net=[t,q.net[1],q.net[2]];S.emp.traits=[({"Nóng nảy":"nongnay","Lạnh lùng":"lanhlung","Kín đáo":"danghi","Ân cần":"nhantu","Điềm tĩnh":"chamchinh"})[t]||"chamchinh"];
    const H=host==="th"?"th":host==="emp"?"emp":host==="hh"?q:v;const s=toilSay(k,{mk,dress,host:H});said[t]=s;
    if(host==="rival"&&k!=="crowd-jealous"){const m=tonesOf(s,P);const bandHit=Object.values((TOIL_BAND[k]||{})).flat().some(l=>{try{return new RegExp("^"+esc(l)).test(s)}catch(e){return false}});if(!m.includes(t)&&!bandHit)fail.push(`toilSay ${k} ${t}: line not from its tone pool: ${s}`)}}
   out.push(`toilSay ${k}: ${new Set(Object.values(said)).size} distinct of 8`);
   if(host!=="rival"||k==="crowd-jealous"){if(k!=="crowd-jealous"&&new Set(Object.values(said)).size<6)fail.push(`toilSay ${k}: too few distinct (${new Set(Object.values(said)).size})`)}
   else if(new Set(Object.values(said)).size<8)fail.push(`toilSay ${k}: tones not distinct`)}
  /* gestures */
  {const P=kTP("toilGest:v+"),said={};for(const t of TONES){v.net=[t,n0[1],n0[2]];S.vmem={};const g=toilGest({host:v,n:5});said[t]=g;if(!P[t].includes(g))fail.push(`toilGest v+ ${t}: ${g}`)}out.push(`toilGest v+: ${new Set(Object.values(said)).size} distinct of 8`)}
  /* habit: tone-keyed, fixed for her life */
  {const P=kTP("habit"),said={};for(const t of TONES){v.net=[t,n0[1],n0[2]];const h=kHabit(v,true);said[t]=h;if(!P[t].includes(h))fail.push(`habit ${t}: ${h}`)}out.push(`habit: ${new Set(Object.values(said)).size} distinct of 8`);v.net=n0;const h1=kHabit(v,true),h2=kHabit(v,true);if(h1!==h2)fail.push("habit not stable")}
  /* slip + diêm tease use the teaser's tone */
  {const said={};for(const t of TONES){v.net=[t,n0[1],n0[2]];S.vmem={};const s=toilSlipSay("rival","diem",v);said[t]=s;if(!kTP("toilSlip:diem:rival")[t].includes(s)&&!tonesOf(s,kTP("toilSlip:diem:rival")).includes(t))fail.push(`slip diem rival ${t}: ${s}`)}out.push(`slip diem rival: ${new Set(Object.values(said)).size} distinct of 8`)}
  /* staff (stable tone per ma ma), maid (own tone) */
  S.thDead=false;S.th=40;S.vmem={};const tn=staffTalkLine("tn");const stT=kToneSt(null,"tn");out.push("staff tn / "+stT+" = "+tn);if(!kTP("staff:tn:hi")||!tonesOf(tn.replace(/ Thái hậu →.*$/,""),kTP("staff:tn:hi")).includes(stT))fail.push("staff tn: line not from the ma ma's tone pool: "+tn);
  for(const t of TONES){S.maid.net=[t,"Thật thà","Tham vọng"];S.vmem={};const w=kLine("ts:warn",kTP("ts:warn"),{sp:{srv:"f"},ls:S,t:kToneSt(S.maid,S.maid.name)});if(kToneSt(S.maid,S.maid.name)!==t)out.push("maid tone "+t+" -> "+kToneSt(S.maid,S.maid.name))}
  /* noRepeat over 30 draws of a staff pool in one tone */
  {const W=BAL.voice.noRepeat,seq=[];S.vmem={};for(let i=0;i<30;i++){S.tuan=i%3;S.turn=Math.floor(i/3);S.buoi=0;seq.push(kLine("t:b",kTP("staff:kn:mid"),{sp:{srv:"f"},ls:S,t:"Kín đáo"}))}let rep=0;for(let i=0;i<seq.length;i++)for(let j=Math.max(0,i-W+1);j<i;j++)if(seq[j]===seq[i])rep++;out.push("noRepeat repeats: "+rep);if(rep)fail.push("noRepeat broken: "+rep)}
  /* old save / nameless: a missing S.vmem and an unnamed speaker still speak */
  delete S.vmem;if(!kLine("t:old",kTP("cycle:ask"),{sp:{srv:"f"},ls:S,t:null}))fail.push("old save: no line");
  return{out,fail,sizes}});
 console.log(R.out.join('\n'));console.log(R.fail.length?'FAIL\n'+R.fail.slice(0,40).join('\n'):'PASS',errs.length?'pageerrors: '+errs.slice(0,3).join(' | '):'no page errors');
 await b.close();srv.close();process.exit(R.fail.length||errs.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
