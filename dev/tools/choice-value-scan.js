/* CHOICE-VALUE SCAN (owner OD:L582 + OD 18/11 ~09:20Z, START_CORE laws 2 + 3; job choice-value-audit, Foreman D #2).
   Law 2 EQUAL-VALUE CHOICES: all options of one choice have equivalent value; none clearly better.
   Law 3 GAIN-AND-LOSS: no option is cost-only with no gain; gain-only is fine (its time / khắc is its cost).
   What it reads: every option modal the game builds, through the kit's OWN act-card rows (j63 kaRows: Tốn / Được / Mất / Kèm), i.e. what the
   player reads on the card. Event choices normally hide their outcome (jk2b kitIsEventChoice → hint only); the scan turns that off
   (window.__cvsShowAll) so a gain the card hides still counts as a gain.
   Sources: (1) every PEND dilemma builder (mkP(id) for each key of PEND, a few pp variants), (2) N end-of-turn passes (seeded Math.random)
   catching every modal the turn pushes, (3) the kit-fit demo option pair the shot scripts show (FIXTURE, from dev/test/*.js files).
   Flags per option:
     COST-ONLY  the card shows a cost (Tốn, or a red Mất / Kèm line) and nothing under Được  → law 3 fault
     DOMINATED  a sibling option of the same modal is at least as good on EVERY numeric line (each gain ≥, each cost ≤, odds ≥) and better on one,
                and this option has no word-only gain the sibling lacks → law 2 fault
   Options that neither cost nor gain anything ("Đóng", "Thôi") are not COST-ONLY; they are DOMINATED only by a free, sure, gain-only sibling.
   usage: node dev/tools/choice-value-scan.js [--turns N] [--seed S] [--out file.json] [--md]   (run from the repo root of a BUILT site)
   exit 1 when any COST-ONLY or DOMINATED row is found (the gate), 0 when clean. Last line = one-line summary. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('../test/lib/device');
const A=process.argv.slice(2);const arg=(k,d)=>A.includes(k)?A[A.indexOf(k)+1]:d;
const TURNS=+arg('--turns',60),SEED=+arg('--seed',7),OUT=arg('--out',null),MD=A.includes('--md');
const ROOT=path.resolve(__dirname,'../..');
/* (3) the demo option pair of the shot scripts: same rule, the owner saw it in a shot (OD 18/11 ~09:20Z) */
function fixtureRows(){const R=[];const dir=path.join(ROOT,'dev/test');
 for(const f of fs.readdirSync(dir).filter(f=>/\.js$/.test(f))){const s=fs.readFileSync(path.join(dir,f),'utf8');
  const re=/\[(\{n:(['"])[^'"]*\2,fx:\{[^}]*\},x:(['"])[^'"]*\3[^\]]*?)\]/g;let m;while((m=re.exec(s))){const body=m[1];const opts=[...body.matchAll(/\{n:(['"])([^'"]*)\1,fx:\{([^}]*)\},x:(['"])([^'"]*)\4/g)].map(x=>({n:x[2],fx:x[3],x:x[5]}));
   if(opts.length<2)continue;const fxNum=t=>[...t.matchAll(/(\w+):(-?\d+)/g)].map(z=>[z[1],+z[2]]);
   const cs=opts.map(o=>{const f=fxNum(o.fx);const xs=[...o.x.matchAll(/([^\s·]+(?: [^\s·+\-0-9]+)*)\s*([+-]\d+)/g)].map(z=>[z[1],+z[2]]);
    const hw=/(?:^|·)\s*thành:/.test(o.x)?[['thành',1]]:[];/* a word gain after «thành:» counts */
    const xs2=xs.filter(z=>!/^hỏng|hỏng:/.test(z[0]));
    const gain=[...f.filter(z=>z[1]>0),...xs2.filter(z=>z[1]>0),...hw],cost=[...f.filter(z=>z[1]<0),...xs.filter(z=>z[1]<0)];return{t:o.n,gain,cost}});
   cs.forEach(c=>{if(c.cost.length&&!c.gain.length)R.push({src:'fixture:dev/test/'+f,title:'demo option pair (shot scripts)',opt:c.t,flag:'COST-ONLY',ton:c.cost.map(z=>z.join(' ')).join(' · '),duoc:''})})}}
 return R}
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await D.newDeviceContext(b,'ipadAir');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 const g=await D.openHost(p,srv.url);
 await g.evaluate(sd=>{let seed=sd;Math.random=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},SEED);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;$("modal").hidden=true;
  /* show every outcome row (event choices hide them for play; the scan must see the gains) */
  window.__cvsShowAll=1;if(typeof kitIsEventChoice==='function'){const k0=kitIsEventChoice;window.kitIsEventChoice=kitIsEventChoice=function(m){return window.__cvsShowAll?false:k0(m)}}});
 await g.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 /* one modal → its options as the kit card shows them */
 const probe=()=>g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const op=M.querySelector('.opts');if(!op)return null;
  const bs=[...op.querySelectorAll(':scope > button')];if(bs.length<2)return null;const T=e=>(e&&e.textContent||'').replace(/\s+/g,' ').trim();
  const title=T(M.querySelector('h3,h2,.kpt,.ktitle'));const m=typeof Q!=='undefined'&&Q[0]||{};
  const cs=bs.map(bt=>{const rows={ton:[],duoc:[],mat:[],kem:[]};
   bt.querySelectorAll('.kr').forEach(r=>{const k=[...r.classList].find(c=>/^kr-/.test(c));if(!k)return;let key=k.slice(3);if(key==='thanh'||key==='bai')key='duoc';if(!rows[key])return;
    r.querySelectorAll('.krv>.ef').forEach(e=>rows[key].push({h:T(e),c:e.classList.contains('g')?'g':e.classList.contains('r')?'r':e.classList.contains('t')?'t':'n'}))});
   const odds=T(bt.querySelector('.kodds,.oc'));const name=T(bt.querySelector('.kan,.kat'))||T(bt).slice(0,60);
   return{t:name.slice(0,80),rows,odds,dis:bt.disabled||bt.classList.contains('off')||bt.getAttribute('aria-disabled')==='true'}});
  return{title:title.slice(0,60),pid:m.pid||'',cs}});
 const seen={};const modals=[];
 const record=async(tag)=>{const r=await probe();if(!r)return;const key=r.title+'|'+r.cs.map(c=>c.t).join('/');if(seen[key])return;seen[key]=1;r.tag=tag;modals.push(r)};
 /* (1) every PEND dilemma builder */
 const pend=await g.evaluate(()=>Object.keys(PEND));
 for(const id of pend){for(const pp of [{},{q:3,vp:0}]){try{const ok=await g.evaluate(([id,pp])=>{Q.length=0;$('modal').hidden=true;let d=null;try{d=mkP(id,pp)}catch(e){return 0}if(!d||!d.o||d.o.length<2)return 0;pushDil(d,'PEND '+id);showModal();return 1},[id,pp]);
  if(ok){await p.waitForTimeout(60);await record('pend:'+id)}}catch(e){}}}
 /* (2) end-of-turn passes */
 for(let i=0;i<TURNS;i++){await g.evaluate(()=>{try{if(!S||S.dead)start();Q.length=0;endTurn()}catch(e){}});
  for(let k=0;k<8;k++){await p.waitForTimeout(40);await record('turn'+i);const more=await g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return 0;M.hidden=true;if(typeof Q!=='undefined'&&Q.length)Q.shift();return Q.length?1:0});
   if(!more)break;await g.evaluate(()=>{try{showModal()}catch(e){}})}}
 await b.close();srv.close();
 /* ---- judge ---- */
 const num=h=>{const m=String(h).match(/^(.*?)\s*([+\-−])\s?(\d+)\s*$/);if(!m)return null;return[m[1].trim().toLowerCase(),(m[2]==='+'?1:-1)*+m[3]]};
 const ODD=['liều','khó','năm ăn năm thua','khá chắc','chắc','rất chắc','nắm chắc'];const oddsRank=o=>{const s=String(o||'').toLowerCase();if(!s)return 99;let r=-1;ODD.forEach((w,i)=>{if(s.includes(w))r=i});return r<0?99:r};
 const vec=c=>{const G={},C={},words=[];c.rows.duoc.forEach(x=>{const n=num(x.h);if(x.c==='r'){if(n)C[n[0]]=(C[n[0]]||0)+Math.abs(n[1]);else C['~'+x.h.toLowerCase()]=1}/* a red line in the outcome block (failure loss) */else if(n)G[n[0]]=(G[n[0]]||0)+Math.abs(n[1]);else words.push(x.h.toLowerCase())});
  [...c.rows.ton,...c.rows.mat,...c.rows.kem.filter(x=>x.c==='r')].filter(x=>!/^không (tốn|mất)( gì)?$/i.test(x.h)).forEach(x=>{/* «không tốn gì» is no cost */const n=num(x.h);const tm=String(x.h).match(/(\d+)\s*khắc/);if(tm)C['khắc']=(C['khắc']||0)+ +tm[1];else if(n)C[n[0]]=(C[n[0]]||0)+Math.abs(n[1]);else C['~'+x.h.toLowerCase()]=1});
  return{G,C,words,o:oddsRank(c.odds)}};
 const geq=(a,b)=>Object.keys(b).every(k=>(a[k]||0)>=b[k]);
 /* EXEMPT (documented in dev/handover/reports/choice-value-audit.md): the better option depends on what she has LEARNED (his / her taste),
    or the options differ in LOOK only. These rows are listed, never failing. */
 const EX={night1:'KNOWLEDGE: each answer fits one of his tastes (j8 night1, trait → odds); finding his taste is the play',
  vnight:'KNOWLEDGE: same night answers as night1',ge1:'ENDING: the end-branch outcome is hidden on purpose until the last line (jge, owner ending design)',ge2:'ENDING: as ge1',vlout:'LOOK: veils of the same cover at different prices; the paid part is the look'};
 const exWhy=m=>EX[m.pid]||(/Đặt cược/.test(m.title)?'BET: the payout follows each boat\'s true odds; the odds word groups several real odds':'')||(m.cs.some(c=>/^Chia sẻ bí mật/.test(c.t))?'KNOWLEDGE: talk topics follow her taste (jagacts3 p3ChatF); learning what she likes is the play':'');
 const rows=[],exempt=[];
 for(const m of modals){if(exWhy(m)){exempt.push({src:m.tag,title:m.title,why:exWhy(m)});continue}const V=m.cs.map(vec);
  m.cs.forEach((c,i)=>{if(c.dis)return;const v=V[i];const hasCost=Object.keys(v.C).length>0;const hasGain=Object.keys(v.G).length>0||v.words.length>0;
   const base={src:m.tag,pid:m.pid,title:m.title,opt:c.t,ton:[...c.rows.ton,...c.rows.mat,...c.rows.kem.filter(x=>x.c==='r')].map(x=>x.h).join(' · '),duoc:c.rows.duoc.map(x=>x.h).join(' · '),odds:c.odds};
   if(hasCost&&!hasGain){rows.push({...base,flag:'COST-ONLY'});return}
   for(let j=0;j<m.cs.length;j++){if(j===i||m.cs[j].dis)continue;const w=V[j];
    const better=geq(w.G,v.G)&&Object.keys(w.C).every(k=>(v.C[k]||0)>=w.C[k])&&v.words.every(x=>w.words.includes(x));
    const oddsOk=w.o===99||(v.o!==99&&w.o>=v.o);/* sure ≥ any odds; between ladders the higher word is better */
    const strict=Object.keys(w.G).some(k=>(w.G[k]||0)>(v.G[k]||0))||Object.keys(v.C).some(k=>(v.C[k]||0)>(w.C[k]||0));/* a word-only edge is not «clearly better»: words carry no comparable value */
    if(better&&oddsOk&&strict){rows.push({...base,flag:'DOMINATED',by:m.cs[j].t});break}}})}
 const fx=fixtureRows();rows.push(...fx);
 const res={modals:modals.length,pend:pend.length,turns:TURNS,seed:SEED,errors:errs.slice(0,10),rows,exempt,all:modals};
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));
 const co=rows.filter(r=>r.flag==='COST-ONLY'),dm=rows.filter(r=>r.flag==='DOMINATED');
 if(MD){console.log('| flag | source | modal | option | Tốn / Mất | Được | odds | better sibling |\n|---|---|---|---|---|---|---|---|');for(const r of rows)console.log(`| ${r.flag} | ${r.src} | ${r.title} | ${r.opt} | ${r.ton} | ${r.duoc} | ${r.odds||''} | ${r.by||''} |`)}
 else for(const r of rows)console.log(r.flag.padEnd(10),'|',r.src,'|',r.title,'|',r.opt,'| tốn:',r.ton,'| được:',r.duoc||'—',r.by?'| by: '+r.by:'');
 for(const e of exempt)console.log('EXEMPT    ','|',e.src,'|',e.title,'|',e.why);
 console.log(`CHOICE-VALUE ${co.length+dm.length?'FAIL':'PASS'} · ${modals.length} option modals (PEND ${pend.length} builders + ${TURNS} turns) · COST-ONLY ${co.length} · DOMINATED ${dm.length} · exempt ${exempt.length} · page errors ${errs.length}`);
 process.exit(co.length+dm.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
