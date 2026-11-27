/* review/sub-odds (owner 11/15 05:15Z): every act that names a relation change ("Hoàng hậu quý ngươi +4", "nàng quý ngươi +10", "Thái hậu
   quý ngươi +8") must change THAT field. Runs every Hành sự act (3 origins × 3 buổi) and every talk option on every consort, forces success,
   diffs S.hh / S.th / aff(v,S) / aff(S,v) and reports claims with no matching change.  usage: node dev/test/rel-audit.js <baseURL> */
const {chromium}=require('./lib/pw-roulette');const sleep=t=>new Promise(r=>setTimeout(r,t));const BASE=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
 for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}
 await sleep(1000);
 const R=await p.evaluate(()=>{const out={acts:0,claims:0,bad:[],unclaimed:[]};const plain=h=>String(h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
  const snap=()=>{const o={hh:S.hh||0,th:S.th||0};for(const v of rivals){o["a"+v.id]=aff(v,S);o["m"+v.id]=aff(S,v)}return o};
  const claims=t=>[...plain(t).matchAll(/(Hoàng hậu|Thái hậu|nàng|Nàng|[A-ZÀ-Ỹ][\wÀ-ỹ]*(?: [A-ZÀ-Ỹ][\wÀ-ỹ]*)*) quý ngươi ([+\-−])\s?(\d+)/g)].map(m=>({who:m[1],sg:m[2]==="+"?1:-1}));
  const check=(name,text,before,after,target)=>{out.acts++;const C=claims(text);const d={};for(const k in after)if(after[k]!==before[k])d[k]=after[k]-before[k];
   for(const c of C){out.claims++;let ok=false;if(c.who==="Hoàng hậu")ok=d.hh*c.sg>0;else if(c.who==="Thái hậu")ok=d.th*c.sg>0;else ok=Object.keys(d).some(k=>k[0]==="a"&&(!target||k==="a"+target.id)&&d[k]*c.sg>0)||(c.sg>0&&d.hh>0);
    if(!ok)out.bad.push(`${name}: "${c.who} quý ngươi ${c.sg>0?"+":"-"}" but changed ${JSON.stringify(d)}`)}
   if(!C.length&&Object.keys(d).some(k=>k==="hh"||k==="th"||k[0]==="a")&&!/oán|ghen|thù|thân|Thái hậu|Hoàng hậu/.test(plain(text)))out.unclaimed.push(`${name}: changed ${JSON.stringify(d)} · text: ${plain(text).slice(0,120)}`)};
  for(const org of ["thd","dtq","cn"])for(const bu of [0,1,2]){window.__forceOrigin=org;SLOT=3;window.__nlInner=1;start();window.__nlInner=0;quiet=true;Q.length=0;S.buoi=bu;S.bac=900;S.suc=100;deal();
   const names=deck.map(a=>a.n);for(let i=0;i<names.length;i++){const a=deck[i];if(!a||(a.b!=null&&a.b!==(S.buoi||0)))continue;const text=(a.x||"")+" · "+fmt(a.w||{});a.o=100;a.lock=false;a.done=0;used=0;S.suc=100;S.bac=900;Q.length=0;
    const b0=snap();{const r0=window.roll;window.roll=()=>true;try{act(i)}catch(e){out.bad.push(a.n+": error "+e.message)}finally{window.roll=r0}}Q.length=0;check(`[${org} b${bu}] ${a.n}`,text,b0,snap())}}
  /* talk options on every consort (person-card Giao thiệp) */
  window.__forceOrigin="thd";window.__nlInner=1;start();window.__nlInner=0;quiet=true;Q.length=0;
  for(const v of liveRivals(true).slice(0,6)){for(const kind of ["rival",v===queenP()?"hh":null].filter(Boolean)){const L=talkOpts({kind,ref:v});
   for(const a of L){S.bac=900;S.suc=100;Q.length=0;const text=(a.x||"")+" · "+(a.risk||"")+" · "+fmt(a.w||{});const b0=snap();const r0=window.roll;window.roll=()=>true;
    try{if(a.run)a.run();else{const c=Object.assign({},a,{o:100,lock:false});runOpt(c)}}catch(e){out.bad.push(a.n+": error "+e.message)}finally{window.roll=r0}
    Q.length=0;check(`[talk ${kind}] ${a.n} → ${v.name}`,text,b0,snap(),kind==="rival"?v:null)}}}
  quiet=false;return out});
 console.log(JSON.stringify({acts:R.acts,claims:R.claims,bad:R.bad,unclaimed:R.unclaimed.slice(0,40),errs},null,1));await b.close()})();
