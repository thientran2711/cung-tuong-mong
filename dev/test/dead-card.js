/* DEAD-CARD regression test (flight-modal-deadlock 25/11, law 11). Part 1 scan: every #modal option card the game can build — is there a state where ALL its options are disabled
   and no cancel exists (no ✕ / Esc / tap-out) = deadlock? Builds every PEND builder (E68 templates incl. composed j68c via pp, j7 EV via pp, other PEND via {})
   at bạc 0 and ranks 0/3/6, and counts cards whose every option is greyed (c.off / poor bạc / lk() / lock).
   Part 2: j68c-sea-023 / j68c-serv-022 at bạc 2 keep ≥1 option she can press; Part 3: the jdeadcard net — a synthetic all-greyed card shows
   the kit «Lui» button, pressing it closes the card (no soft-lock). Exit 1 on any failure.
   Parts 2/3 open the card as a player tap would (DQ.user, jdayq day-queue 25/11: otherwise a fresh life's dawn / activity holds the card unpainted).
   usage: node dev/test/dead-card.js <page url> [out.json]   (serve the repo root, e.g. python3 -m http.server) */
const {chromium}=require('./lib/dlgs-off').pw('tap');const fs=require('fs');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:900,height:900}});
 await p.addInitScript(()=>{let s=7*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{const out={};const built={};
  const dis=c=>{if(!c)return true;if(c.off)return true;if(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)return true;if(c.lock)return true;if(typeof c.lk==='function'){try{if(c.lk())return true}catch(e){}}return false};
  const chk=(key,d,rank,src)=>{if(!d||!d.o||!d.o.length)return;built[key]=1;const m={opts:d.o,mustChoose:d.mustChoose};const ci=kitCancelIx(m);
   const live=d.o.filter((c,i)=>i!==ci);if(ci>=0)return;/* a cancel road exists */
   if(live.length&&live.every(dis)){const r=out[key]=out[key]||{src,ranks:[],why:new Set()};if(!r.ranks.includes(rank))r.ranks.push(rank);
    live.forEach(c=>r.why.add(c.off?('off:'+c.off.why.replace(/\d+/g,'n')):c.fx&&c.fx.bac&&S.bac+c.fx.bac<0?'bac':c.lock?'lock':'lk'))}};
  const keep=JSON.stringify({bac:S.bac,rank:S.rank});
  for(const rank of [0,3,6]){S.rank=rank;S.bac=0;
   for(const s of E68){for(let t=0;t<3;t++){let pp=null;try{pp=s.pp?s.pp():{}}catch(e){}if(!pp)continue;const V=s.v||[''];pp.vi=t%V.length;let d=null;try{d=mkP('e68'+s.id,pp)}catch(e){}chk('e68'+s.id,d,rank,'E68 '+s.fam);}}
   for(const e of EV){let pp=null;try{pp=e.pp?e.pp():{}}catch(x){}if(pp==null)continue;let d=null;try{d=mkP(e.id,pp)}catch(x){}chk(e.id,d,rank,'EV')}
   for(const k of Object.keys(PEND)){if(built[k]||/^e68/.test(k)||EVI[k])continue;let d=null;try{d=mkP(k,{})}catch(x){}chk(k,d,rank,'PEND')}}
  const o=JSON.parse(keep);S.bac=o.bac;S.rank=o.rank;
  const res=Object.entries(out).map(([k,v])=>({k,src:v.src,ranks:v.ranks.join('/'),why:[...v.why].join(' ')}));
  return{n:res.length,built:Object.keys(built).length,pend:Object.keys(PEND).length,e68:E68.length,ev:EV.length,res}});
 console.log(JSON.stringify({n:R.n,built:R.built,pend:R.pend,e68:R.e68,ev:R.ev}));for(const r of R.res)console.log(`| ${r.k} | ${r.src} | ${r.ranks} | ${r.why} |`);
 let fail=R.n;
 const P2=await p.evaluate(()=>{window.__e68off=1;const SM=()=>{const D=typeof DQ!=='undefined'?DQ:null;if(D)D.user=(D.user||0)+1;try{showModal()}finally{if(D)D.user--}};const out={};S.bac=2;S.month=12;for(const id of ['j68c-sea-023','j68c-serv-022']){const s=E68I['c:'+id];let d=null;for(let t=0;t<6&&!d;t++){let pp=null;try{pp=s.pp()}catch(e){}if(pp){pp.vi=0;d=mkP('e68c:'+id,pp)}}
  if(!d){out[id]='not cast';continue}Q.length=0;Q.push({t:'Thời tiết',h:d.t,opts:d.o,pid:d.pid,pp:d.pp});SM();const B=[...document.querySelectorAll('#modal .opts button[data-m]')];out[id]=B.filter(b=>!b.disabled).length+'/'+B.length;Q.length=0;SM()}return out});
 for(const [k,v] of Object.entries(P2)){console.log('part2',k,'pressable',v);if(v!=='not cast'&&/^0\//.test(v))fail++}
 const P3=await p.evaluate(()=>{const SM=()=>{const D=typeof DQ!=='undefined'?DQ:null;if(D)D.user=(D.user||0)+1;try{showModal()}finally{if(D)D.user--}};S.bac=2;Q.length=0;Q.push({t:'Thử',h:'<p>thử</p>',opts:[{n:'Trả bạc',fx:{bac:-60}},{n:'Trả bạc nữa',fx:{bac:-60}}]});SM();
  const c=document.getElementById('mclose');const r={lui:c?c.textContent:null,net:(window.__deadCards||[]).length};if(c)c.click();r.after=Q.length;r.hidden=document.getElementById('modal').hidden;return r});
 console.log('part3',JSON.stringify(P3));if(P3.lui!=='Lui'||P3.after!==0)fail++;
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(Object.assign(R,{P2,P3}),null,1));console.log(fail?'DEAD-CARD FAIL '+fail:'DEAD-CARD PASS');await b.close();process.exit(fail?1:0)})();
