/* silent events: let time pass (nextBuoi) for many buổi and list every time HER numbers or relations changed while no dialog
   (Q) was raised — before jaudit's notice queue those changes were only in the log / week book.
   usage: node dev/test/silent-events.js <url> [buoi=240] → JSON {n, silent:[{sig, n, ex, d}], notices} */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,URL,NB]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const r=await p.evaluate(async(NB)=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<8;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
  const hide=()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true};hide();
  const K=["sung","danh","suc","bac","duc","th","hh","sac","tai","tamco","mat","an","rank","confined","out"];
  const snap=()=>{const o={};K.forEach(k=>o[k]=S[k]||0);o.maid=S.maid?S.maid.loyal:0;for(const v of rivals){o["aff:"+v.name]=aff(v,S);o["oan:"+v.name]=oan(v,S)}o.inv=(S.inv||[]).length;return o};
  const P=s=>String(s).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
  const sig=t=>P(t).replace(/\d+/g,"N").replace(/(Hoàng hậu|Thái hậu|Hoàng thượng)?\s?[A-ZĐ][a-zà-ỹ]+( [A-ZĐ][a-zà-ỹ]+){1,2}/g,"X").slice(0,70);
  const out={},notes={n:0};let qPushed=0;const qp=Q.push.bind(Q);
  const toast=()=>{const t=document.getElementById('rtoast');return t&&t.classList.contains('on')?P(t.innerText).slice(0,60):""};
  for(let i=0;i<NB&&!S.dead;i++){const b0=snap(),seq=S.logSeq||0;let qn=0;Q.push=function(){qn++;return qp.apply(Q,arguments)};
   const t=document.getElementById('rtoast');if(t)t.classList.remove('on');
   used=4;try{nextBuoi()}catch(e){out["ERR "+e.message]={n:1}}Q.push=qp;await new Promise(r=>setTimeout(r,20));
   const a=snap();const d={};for(const k in a)if(a[k]!==b0[k]&&!/^(suc|bac)$/.test(k))d[k]=a[k]-b0[k];
   const ts=toast();if(ts)notes.n++;
   if(Object.keys(d).length&&!qn){const L=S.logs.slice(0,Math.max(0,(S.logSeq||0)-seq)).map(P).filter(x=>/ngươi|Ngươi/.test(x)||true);
    for(const l of L.length?L:["(không có dòng sổ)"]){const g=sig(l);const e=out[g]=out[g]||{n:0,ex:l.slice(0,160),d:JSON.stringify(d).slice(0,140),shown:0};e.n++;if(ts)e.shown++}}
   hide()}
  return{buoi:S.turn,dead:!!S.dead,notices:notes.n,silent:Object.entries(out).sort((a,b)=>b[1].n-a[1].n).slice(0,60)}},+(NB||240));
 console.log(JSON.stringify({r,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
