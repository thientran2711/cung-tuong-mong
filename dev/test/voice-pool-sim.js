/* palace-voice REPETITION SIM (owner 16/11 19:38Z): every recurring situation is triggered once per tuần for T tuần (default 30) on a build,
   and the lines it says are compared: rep = lines identical to one said in the same situation within the last 5 tuần (BAL.voice.noRepeat).
   Situations: Thái hậu / Hoàng hậu / Hoàng thượng / phi tần reactions to her look (toilSay, all looks), the gain/loss line (toilLit), the monthly
   cycle question (PEND.cyrep), staff talk (staffTalkLine, new builds), a rival's dress remark (wdRemark under/over), talk outcome (kOutcome, new).
   usage: node dev/test/voice-pool-sim.js <url> [T]   — run on origin/main's build and on the branch build for the before/after table */
const {chromium}=require('playwright');const [,,URL,TS]=process.argv;const T=+TS||30;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.addInitScript(()=>{window.__bot={pre:1}});await p.goto(URL);await p.waitForFunction(()=>typeof start==='function',null,{timeout:90000});await p.waitForTimeout(800);
 const R=await p.evaluate(T=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start();quiet=true;
  const txt=h=>{const d=document.createElement('div');d.innerHTML=String(h||'');return d.textContent.replace(/\s+/g,' ').trim()};
  const v=rivals.find(x=>!x.queen&&x.alive);const SIT={};
  const add=(k,f)=>{SIT[k]=f};
  const looks=[["moc","hoppham"],["diem","hoppham"],["vua","giandi"],["vua","photruong"],["dep","hoppham"]];
  for(const k of ["th-scold","th-praise","hh-scold","hh-praise","emp-like","emp-dislike","rival-jealous","rival-tease","rival-praise"])
   for(const [mk,dress] of looks){const host=k.startsWith("th")?"th":k.startsWith("emp")?"emp":k.startsWith("hh")?(rivals.find(x=>x.queen)||"hh"):v;
    add(`toil ${k} ${mk}/${dress}`,()=>toilSay(k,{mk,dress,host}))}
  if(typeof toilLit==='function')for(const [h,n] of [["th",2],["th",-2],["emp",1]])add(`gain/loss line ${h} ${n>0?"+":"-"}`,()=>toilLit({host:h,n,line:"y phục hợp phẩm, trang điểm vừa: thiện cảm "+n}));
  add('cycle ask',()=>{S.maid=S.maid||{name:"Tiểu Thúy",loyal:60};const d=PEND.cyrep&&PEND.cyrep();return d?txt(d.t).split('Kính sự phòng ghi sổ')[0]:null});
  if(typeof staffTalkLine==='function'){for(const e of ["tn","kn","gt"])add(`staff talk ${e}`,()=>{try{return staffTalkLine(e)}catch(x){return null}})}
  add('dress remark under',()=>{const R0=Math.random;Math.random=()=>0;try{return txt(wdRemark(v,"under"))}catch(x){return null}finally{Math.random=R0}});
  if(typeof kOutcome==='function')for(const k of ["th","hh","emp","rival"])for(const ok of [1,0])add(`talk outcome ${k} ${ok?"ok":"fail"}`,()=>kOutcome(k,!!ok));
  const out={};const W=5;/* the same window for every build: BAL.voice.noRepeat */
  for(const k in SIT){const L=[];S.turn=0;S.tuan=0;S.vl={};for(let i=0;i<T;i++){if(/cycle/.test(k)&&i%3)continue;/* the cycle comes once a month */S.tuan=i%3;S.turn=Math.floor(i/3);let x=null;try{x=SIT[k]()}catch(e){x=null}if(x)L.push([i,String(x).replace(/\d+/g,'#')])}
   let rep=0;const last={};for(const [i,x] of L){if(last[x]!=null&&i-last[x]<W)rep++;last[x]=i}
   out[k]={n:L.length,distinct:new Set(L.map(x=>x[1])).size,rep6:rep,ex:L.slice(0,3).map(x=>x[1])}}
  return out},T);
 await b.close();let N=0,REP=0;const rows=Object.entries(R).filter(([k,x])=>x.n);
 for(const [k,x] of rows){N+=x.n;REP+=x.rep6;console.log(`${String(x.rep6).padStart(3)} / ${String(x.n).padStart(3)}  distinct ${String(x.distinct).padStart(2)}  ${k}  | ${x.ex[0]||''}`.slice(0,230))}
 console.log(JSON.stringify({url:URL,tuan:T,situations:rows.length,lines:N,rep6:REP,rep6Pct:+(100*REP/Math.max(1,N)).toFixed(1),errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
