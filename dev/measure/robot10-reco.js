/* robot10-reco.js — OWNER ORDER #6 (OD 23/11 ~22:40Z, MAIN 113 22:32Z): every ROBOT-10 round report (rates-<date>.md) ENDS with a
   «RECOMMENDATIONS» table: finding (off vs target) → BAL key(s) file:line → current value (read from the game page) → proposed value → expected effect.
   REPORT ONLY: nothing here changes BAL; values change after sếp's OK via MAIN (law 16), then a tuning worker applies them and one re-run confirms.
 USE   robot10-agg.js calls recommend(ctx) at the end of the report (ctx = the lives + catalogue + helpers of agg).
       BAL comes from the GAME PAGE (law 4, one core): `node dev/measure/robot10-reco.js bal [GAME] [out.json]` opens the game (index.html path served
       over local http, or the LIVE https URL; default env GAME, else this checkout's index.html) and writes bal.json (BAL + RANKS + ORIGINS + ORIGIN_BR +
       ARC67 roads). robot10-agg.js reads a bal.json found next to the run JSON, else runs this CLI itself (GAME env), never a typed number.
       file:line of every key = a scan of dev/build/jbal*.js (keyLoc) — the line where that key is written.
 COVERS (order #6): (1) origin roll weights BAL.orig.ow / BAL.orig.br vs each origin × road HH reach (easier origins rarer; a branch in ORIGIN_BR that is
       missing from BAL.orig.br = flag) · (2) death rate by cause vs target (early death, childbirth per birth; lifespan floor) · (3) HH and each top rank:
       reach speed in game years + real minutes (pace model), the slowest step = the bottleneck · (4) endings / rare endings (BAL.arc.rare p per road) /
       kỳ ngộ / event variety (metric 12, ORDER #5) too common or too rare.
 TARGETS (one place, below): OD:L19 + OD:L43 of dev/OWNER_DECISIONS.md (origin HH 20–40 %, overall ~32 %, cnv 20–25 %, early death 40–45 %, childbirth
       death 8–12 % per birth); OD 23/11 ~23:25Z «a kiếp must not drag» has NO number yet → PACE cap below is PROVISIONAL (MAIN to set).
 PROPOSED VALUES are first-order proportional estimates (scale a key by target ÷ observed, clamped ×0.5–×2) — the confirming re-run decides. Rows on
       fewer than MIN_N lives are marked «low n» (indicative only). */
const fs=require('fs'),path=require('path');
const TARGET={
 hh:{lo:20,hi:40,mid:30,src:'OD:L43 (each origin HH ~20–40 %, smart bot)'},
 hhAll:{mid:32,src:'OD:L19/L43 (overall ~32 %)'},
 hhCnv:{lo:20,hi:25,mid:22.5,src:'OD:L43 (cnv ~20–25 %)'},
 early:{lo:40,hi:45,mid:42.5,src:'OD:L19 (early death ~40–45 %)'},
 birth:{lo:8,hi:12,mid:10,src:'OD:L19 (childbirth death 8–12 % per birth)'},
 kiepMin:{hi:120,src:'PROVISIONAL — OD 23/11 ~23:25Z «a kiếp must not drag» has no number; MAIN to set'},
 endShare:{hi:50,src:'order #6 (4): one ending > half of all endings = too common'},
 evRep:{hi:25,src:'order #5/#6 (4): > 25 % of a kiếp\'s cards seen again in the same kiếp = repetitive'}};
const MIN_N=20,CLAMP=[.5,2];
const REPO=path.join(__dirname,'..','..');
/* ---------- BAL from the game page (law 4) ---------- */
const PAGE=`(()=>{const o={bal:JSON.parse(JSON.stringify(BAL,(k,v)=>typeof v==='function'?undefined:v))};
 try{o.ranks=RANKS.map(r=>({n:r.n,s:r.s,d:r.d}))}catch(e){}
 try{o.origins=ORIGINS.map(x=>x.k)}catch(e){}
 try{o.originBr=Object.values(typeof ORIGIN_BR!=='undefined'?ORIGIN_BR:{}).map(x=>({k:x.k,par:x.par}))}catch(e){}
 try{o.promoGap=[0,1,2,3,4,5,6].map(r=>promoGap(r))}catch(e){}
 try{o.roads={};const A=typeof ARC67!=='undefined'?ARC67:null;if(A)for(const k in A){const a=A[k];const og=a&&(a.o||a.origin||a.par);if(og){(o.roads[og]=o.roads[og]||[]).push(k)}}}catch(e){}
 o.at=new Date().toISOString();o.url=location.href;return o})()`;
function serve(file){const http=require('http');const root=path.dirname(path.resolve(file)),idx=path.basename(file);
 const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.css':'text/css'};
 return new Promise(res=>{const sv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/'+idx;const f=path.join(root,u);
  if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
  sv.listen(0,'127.0.0.1',()=>{sv.unref();res('http://127.0.0.1:'+sv.address().port+'/'+idx)})})}
async function balFromGame(game){const {chromium}=require('playwright');game=game||process.env.GAME||path.join(REPO,'index.html');
 const url=/^https?:/.test(game)?game:await serve(game);const b=await chromium.launch();try{const p=await b.newPage();
  await p.route(/\.(png|jpe?g|webp|gif|mp3|ogg|wav|m4a|mp4|webm|woff2?)(\?|$)/i,r=>r.abort());
  await p.goto(url,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof BAL==='object'&&BAL&&BAL.orig&&typeof RANKS!=='undefined',null,{timeout:120000});
  return await p.evaluate(PAGE)}finally{await b.close()}}
/* ---------- key → file:line (the line in dev/build/jbal*.js where the key is written) ---------- */
let SRC=null;
function srcs(){if(SRC)return SRC;const dir=path.join(REPO,'dev','build');SRC=fs.readdirSync(dir).filter(f=>/^jbal.*\.js$/.test(f)).sort((a,b)=>a==='jbal.js'?-1:b==='jbal.js'?1:a<b?-1:1)
  .map(f=>({f,t:fs.readFileSync(path.join(dir,f),'utf8')}));return SRC}
const lineOf=(t,i)=>t.slice(0,i).split('\n').length;
/* «mort.fate.tuanP»: first the top key (BAL.mort= / BAL.mort. / mort:{), then each next part after it (part: / part=) */
function keyLoc(kp){const parts=kp.split('.');const esc=x=>x.replace(/[.$]/g,'\\$&');const C=[];
 /* candidates, strongest first: BAL.a.b= (longest dotted path) · Object.assign(BAL,{a: · BAL.a. · a:{ anywhere */
 for(const {f,t} of srcs()){for(let k=parts.length;k>=1;k--){const re=new RegExp('BAL\\.'+parts.slice(0,k).map(esc).join('\\.')+'\\s*=(?!=)','g');let m;while((m=re.exec(t)))C.push({f,t,i:m.index,k,s:10+k})}
  {const re=new RegExp('assign\\(BAL,\\s*\\{(?:\\s|/\\*[^]*?\\*/)*'+esc(parts[0])+'\\s*:','g');let m;while((m=re.exec(t)))C.push({f,t,i:m.index+m[0].length-1,k:1,s:9})}
  {const re=new RegExp('BAL\\.'+esc(parts[0])+'\\.','g');let m;while((m=re.exec(t)))C.push({f,t,i:m.index,k:1,s:2})}
  {const re=new RegExp('[{,\\s]'+esc(parts[0])+'\\s*:\\s*[{\\[]','g');let m;while((m=re.exec(t)))C.push({f,t,i:m.index,k:1,s:1})}}
 C.sort((a,b)=>b.s-a.s);let part=null;
 for(const c of C){let i=c.i,ok=true;for(let j=c.k;j<parts.length;j++){const r=new RegExp('[{,\\s]'+esc(parts[j])+'\\s*:','g');r.lastIndex=i;const n=r.exec(c.t);if(!n){ok=false;break}i=n.index}
  if(ok)return c.f+':'+lineOf(c.t,i+1);if(!part)part=c.f+':'+lineOf(c.t,c.i+1)+' (parent)'}
 return part||'not found in jbal*.js'}
/* a non-BAL code site (law 4 flag when a tuning number lives there) */
function codeLoc(re){const dir=path.join(REPO,'dev','build');for(const f of fs.readdirSync(dir).filter(f=>/^j.*\.js$/.test(f)).sort()){const t=fs.readFileSync(path.join(dir,f),'utf8');const m=re.exec(t);if(m)return f+':'+lineOf(t,m.index+1)}return '?'}
const get=(o,kp)=>kp.split('.').reduce((a,k)=>a==null?undefined:a[k],o);
const show=v=>v===undefined?'(absent)':typeof v==='object'?JSON.stringify(v):String(v);
const r2=x=>Math.round(x*100)/100,clamp=k=>Math.max(CLAMP[0],Math.min(CLAMP[1],k));
const scaleV=(v,k)=>typeof v!=='number'?null:(Math.abs(v)>=10?Math.round(v*k):r2(v*k));
/* ---------- the table ---------- */
function recommend(c){const {L,BALX,pct,f1,mean,by,M,lifeMin,ended}=c;const rankN=i=>{const n=c.rankN(i);return /^rank /.test(n)&&BALX&&BALX.ranks&&BALX.ranks[i]?BALX.ranks[i].n:n};const B=BALX&&BALX.bal;const rows=[],notes=[];
 const P=(a,b)=>b?100*a/b:null;const low=n=>n<MIN_N?` · low n (${n})`:` · n ${n}`;
 const K=kp=>`BAL.${kp} ${keyLoc(kp)}`;
 const add=(area,finding,keys,cur,prop,effect)=>rows.push([area,finding,keys,cur,prop,effect]);
 if(!B){return ['## RECOMMENDATIONS (OWNER ORDER #6)','','BAL could not be read from the game page (no bal.json, GAME not reachable): no recommendation is computed without the live numbers (law 4).','']}
 const hhOf=G=>P(G.filter(r=>(r.life.maxRank!=null?r.life.maxRank:-1)>=7||(r.life.top&&r.life.top.hoangHau)).length,G.length);
 /* (1) origin roll weights */
 {const ow=B.orig&&B.orig.ow||{},br=B.orig&&B.orig.br||{};const tot=Object.values(ow).reduce((a,x)=>a+(x||0),0);const byO=new Map(by(L,r=>r.job.origin));
  const branchPar={};(BALX.originBr||[]).forEach(x=>branchPar[x.k]=x.par);
  /* a life of a branch (bd / pf) counts for its parent origin's card; the branch row decides BAL.orig.br */
  const card=o=>branchPar[o]||o;const byCard=new Map(by(L,r=>card(r.job.origin)));
  let expNow=0,wNow=0,expNew=0,wNew=0;const prop={},unmeasured=[];
  Object.keys(ow).forEach(o=>{const G=byCard.get(o)||[];const h=G.length?hhOf(G):null;const t=o==='cnv'?TARGET.hhCnv:TARGET.hh;
   if(h==null){unmeasured.push(o+' '+ow[o]);return}
   const k=clamp(h>0?t.mid/h:CLAMP[1]);prop[o]=ow[o]*(h>t.hi?Math.min(1,k):h<t.lo?Math.max(1,k):1);
   expNow+=ow[o]*h;wNow+=ow[o];
   const off=h>t.hi?`ABOVE ${t.lo}–${t.hi} % (easy origin)`:h<t.lo?`BELOW ${t.lo}–${t.hi} %`:'in target';
   add('(1) origin weight',`${o}: HH reach ${f1(h)} % (${G.filter(r=>r.life.maxRank>=7).length}/${G.length}) ${off}${low(G.length)}`,K('orig.ow.'+o),show(ow[o])+` (${f1(P(ow[o],tot))} % of rolls)`,
    h>t.hi?String(r2(prop[o])):h<t.lo?String(r2(prop[o]))+' + tune the origin\'s own numbers (start stats BAL.orig.'+o+' / its roads)':'keep',
    h>t.hi?'easier origin rolled less often (owner: «dễ lên quá thì cho tỷ lệ hiếm hơn»)':h<t.lo?'weight alone cannot lift reach: a hard origin rolled a bit more only if MAIN wants; the reach fix is in its own numbers':'—')});
  if(wNow){/* renormalise the proposed weights to the same total; expected overall HH = Σ w·h / Σ w over the origins measured */
   const s=Object.keys(prop).reduce((a,o)=>a+prop[o],0),s0=Object.keys(prop).reduce((a,o)=>a+ow[o],0);Object.keys(prop).forEach(o=>{const h=hhOf(byCard.get(o));expNew+=prop[o]*s0/s*h;wNew+=prop[o]*s0/s});
   add('(1) overall HH',`expected overall HH with today's weights ${f1(expNow/wNow)} % vs target ~${TARGET.hhAll.mid} % (origins measured: ${Object.keys(prop).join(' ')})`,K('orig.ow'),'sum '+tot,'the per-origin values above, renormalised to the same sum',`expected overall HH ${f1(expNew/wNew)} %`)}
  if(unmeasured.length)add('(1) origin weight',`no lives this round: ${unmeasured.length} origin(s) — HH reach unknown`,K('orig.ow'),unmeasured.join(' · '),'keep','measured when their runners\' JSON joins the round');
  /* branches: every ORIGIN_BR branch must have a weight in BAL.orig.br[par] */
  (BALX.originBr||[]).forEach(x=>{const W=br[x.par];if(W&&W[x.k]!=null)notes.push(`branch ${x.k} (par ${x.par}) is in BAL.orig.br.${x.par} (weight ${W[x.k]} of ${Object.values(W).reduce((a,y)=>a+y,0)}): rolled`);if(!W||W[x.k]==null)add('(1) branch weight',`branch «${x.k}» (par ${x.par}) is in ORIGIN_BR but NOT in BAL.orig.br.${x.par} → never rolled`,K('orig.br.'+x.par)+' · ORIGIN_BR '+codeLoc(/ORIGIN_BR\s*=/),show(W),`add ${x.k}:${W?Math.min(...Object.values(W)):1} (same as the rarest branch; hard branch = rare, OD:L1216)`,'the branch is reachable from the roulette')});
  Object.entries(br).forEach(([par,W])=>{const G=byCard.get(par)||[];if(!G.length)return;Object.keys(W).forEach(b=>{const H=G.filter(r=>r.job.origin===b);if(!H.length)return;const h=hhOf(H);
   if(h>TARGET.hh.hi)add('(1) branch weight',`${par} → ${b}: HH reach ${f1(h)} %${low(H.length)}`,K('orig.br.'+par+'.'+b),show(W[b]),String(r2(W[b]*clamp(TARGET.hh.mid/h))),'easier branch rolled less often')})});
  /* roads (nhánh) of one origin: the spread of HH reach */
  by(L,r=>r.job.origin).forEach(([o,G])=>{const R=by(G,r=>r.road||r.job.road).map(([k,H])=>[k,hhOf(H),H.length]);if(R.length<2)return;
   const hi=R.reduce((a,x)=>x[1]>a[1]?x:a),lo=R.reduce((a,x)=>x[1]<a[1]?x:a);if(hi[1]-lo[1]>=20)add('(1) road spread',`${o}: road ${hi[0]} HH ${f1(hi[1])} % vs ${lo[0]} ${f1(lo[1])} % (law 2: roads of one origin worth the same)${low(Math.min(hi[2],lo[2]))}`,
    `BAL.orig.art.${o} ${keyLoc('orig.art.'+o)} · BAL.arc (road arcs) ${keyLoc('arc')}`,'—','even out the two roads\' arc rewards / start arts (the road is chosen, not rolled: no weight to change)','roads of one origin closer in HH reach')})}
 /* (2) death by cause */
 {const dead=L.filter(r=>r.life.death),oldAge=get(B,'mort.oldAge');const early=dead.filter(r=>oldAge==null||r.life.age<oldAge);const e=P(early.length,L.length);
  const CK={'fate (lifespan)':['mort.life.dice.adult.mean','mort.dieAge'],illness:['mort.illAge','mort.sudden'],childbirth:['mort.birth.hardDie','mort.birth.hardX'],
   accident:['mort.acc.me'],exhaustion:['mort.tired.per'],execution:['mort.fate.tuanP'],poison:['mort.acc.npc']};
  const t=TARGET.early;const off=e>t.hi?'TOO HIGH':e<t.lo?'TOO LOW':'in target';
  add('(2) early death',`death before old age (${oldAge}, BAL.mort.oldAge) ${f1(e)} % of lives (${early.length}/${L.length}) vs ${t.lo}–${t.hi} % → ${off}${low(L.length)}`,K('mort.oldAge'),show(oldAge),off==='in target'?'keep':'per cause below',off==='in target'?'—':`early death → ~${t.mid} %`);
  if(off!=='in target'){const kAll=t.mid/(e||1);by(early,r=>r._who||'other').sort((a,b)=>b[1].length-a[1].length).forEach(([w,G])=>{const keys=CK[w];const share=P(G.length,early.length);
    const k=clamp(kAll);if(!keys){add('(2) death cause',`${w}: ${G.length} early deaths (${f1(share)} % of them) — sites: ${[...new Set(G.map(r=>r._csrc).filter(Boolean))].join(', ')||'?'}`,'no BAL key mapped for this cause (law 4 gap?)','—','—','—');return}
    keys.filter(kp=>get(B,kp)!==undefined).forEach(kp=>{const v=get(B,kp);const lifespan=/mean|dieAge|illAge/.test(kp);let pv;
     if(Array.isArray(v))pv=lifespan?JSON.stringify([Math.round(v[0]/k)].concat(v.slice(1))):JSON.stringify(v.map(x=>scaleV(x,k)));else pv=lifespan?(typeof v==='number'?String(Math.round(v/k)):'?'):String(scaleV(v,k));
     add('(2) death cause',`${w}: ${G.length} early deaths = ${f1(P(G.length,L.length))} % of lives (${f1(share)} % of early deaths) · mean age ${f1(mean(G.map(r=>r.life.age)))}`,K(kp),show(v),pv,
      `${w} deaths × ~${r2(k)} (${lifespan?'later death age':'odds scaled'})`)})})}
  /* deaths whose text is not in the catalogue (harness gap, e.g. «giả mang thai … khi quân»): listed so no cause is lost */
  {const nc=dead.filter(r=>/^\(not in catalogue\)/.test(r._cause||''));if(nc.length)add('(2) cause not catalogued',`${nc.length} death(s) with a text the code scan did not catch: ${[...new Set(nc.map(r=>r._cause.replace(/^\(not in catalogue\) /,'').slice(0,60)))].join(' / ')}`,'robot10-cat.js staticScan (harness, not BAL)','—','add the site to the catalogue (built at run time); counted under «'+[...new Set(nc.map(r=>r._who))].join('/')+'» meanwhile','by-cause rows complete')}
  /* one cause dominating the deaths (by cause, order #6 (2)): ≥ half of ≥ 3 deaths */
  {const T=by(dead,r=>r._who||'other').sort((a,b)=>b[1].length-a[1].length);if(T.length&&dead.length>=3){const [w,G]=T[0];const sh=P(G.length,dead.length);const keys=CK[w];
   if(sh>=50)(keys||[null]).slice(0,1).forEach(kp=>{const v=kp?get(B,kp):null;const lifespan=kp&&/mean|dieAge|illAge/.test(kp);
    add('(2) one cause dominates',`${w}: ${G.length} of ${dead.length} deaths (${f1(sh)} %) — causes: ${[...new Set(G.map(r=>r._cause.replace(/\$\{[^}]*\}/g,"…").slice(0,50)))].join(' / ')}${low(dead.length)}`,kp?K(kp):'no BAL key mapped (sites '+[...new Set(G.map(r=>r._csrc).filter(Boolean))].join(', ')+')',kp?show(v):'—',
     kp?(lifespan?(Array.isArray(v)?JSON.stringify([Math.round(v[0]/.75)].concat(v.slice(1))):String(Math.round(v/.75))):(Array.isArray(v)?JSON.stringify(v.map(x=>scaleV(x,.75))):String(scaleV(v,.75)))):'—','deaths spread over more causes (variety), total kept by the early-death row')})}}
  /* lifespan floor: «Tuổi trời đã tận» at an age a young consort should not die of old age */
  const fate=dead.filter(r=>r._who==='fate (lifespan)'),dice=get(B,'mort.life.dice.adult');
  if(dice&&fate.some(r=>r.life.age<dice.mean-dice.sd)){const n=fate.filter(r=>r.life.age<dice.mean-dice.sd).length;
   add('(2) lifespan floor',`${n} death(s) «Tuổi trời đã tận» before age ${dice.mean-dice.sd} (= mean − sd of her lifespan dice; youngest ${Math.min(...fate.map(r=>r.life.age))})`,K('mort.life.dice.adult.lo'),show(dice.lo),String(dice.mean-dice.sd),'no lifespan death before mean − sd; illness / schemes still kill young')}
  /* childbirth per birth */
  /* births = her pregnancies (M.sons/M.daus over-count: a kid without an id is re-counted after every save round-trip — harness bug, part-2 counter) */
  const births=L.reduce((a,r)=>a+(M(r).preg||0),0),cb=dead.filter(r=>r._who==='childbirth').length,tb=TARGET.birth;
  if(births){const x=P(cb,births+cb);const o2=x>tb.hi?'TOO HIGH':x<tb.lo?'TOO LOW':'in target';const v=get(B,'mort.birth.hardDie');
   add('(2) childbirth',`death in childbirth ${f1(x)} % per birth (${cb} of ${births+cb}) vs ${tb.lo}–${tb.hi} % → ${o2}${low(births+cb)}`,K('mort.birth.hardDie'),show(v),o2==='in target'?'keep':String(scaleV(v,clamp(x>0?tb.mid/x:CLAMP[1]))),o2==='in target'?'—':`→ ~${tb.mid} % per birth`)}
  else add('(2) childbirth','no birth in this round: childbirth death per birth not measurable','BAL.mort.birth '+keyLoc('mort.birth'),'—','—','needs lives that reach pregnancy')}
 /* (3) speed: HH and each top rank — game years + real minutes; the bottleneck step */
 {const R=(BALX.ranks||[]).length||8;const step=[];for(let i=1;i<R;i++){const A=L.filter(r=>(r.life.maxRank!=null?r.life.maxRank:-1)>=i-1),Bq=L.filter(r=>(r.life.maxRank!=null?r.life.maxRank:-1)>=i);
   const at=Bq.map(r=>{const ra=M(r).rankAt||{};const a=ra[i];if(!a)return null;const ages=Object.values(ra).map(x=>x.age).filter(x=>x!=null);const st=ages.length?Math.min(...ages):null;
    const mi=c.mins({chars:a.chars,clicks:a.clicks,choices:a.choices,mg:a.mg,mgs:a.mgs});return{yrs:st!=null&&a.age!=null?a.age-st:null,min:mi}}).filter(Boolean);
   step.push({i,pass:A.length?P(Bq.length,A.length):null,nA:A.length,nB:Bq.length,yrs:mean(at.map(x=>x.yrs)),min:mean(at.map(x=>x.min))})}
  const top=step.filter(s=>s.i>=4);
  top.forEach(s=>add('(3) reach speed',`${rankN(s.i)}: reached by ${s.nB}/${L.length} · ${s.nB?`after ${f1(s.yrs)} game years · ${f1(s.min)} real min (pace model)`:'nobody reached it'} · passes the step from ${rankN(s.i-1)}: ${s.pass==null?'—':f1(s.pass)+' %'}${low(s.nA)}`,
   `RANKS[${s.i}].s/.d ${codeLoc(/const RANKS\s*=/)} (not in BAL: law 4 flag) · promoGap ${codeLoc(/function promoGap/)}`,BALX.ranks?`Sủng ${BALX.ranks[s.i].s} · Danh ${BALX.ranks[s.i].d} · gap ${BALX.promoGap?BALX.promoGap[s.i-1]:'?'} tháng`:'?','see bottleneck row','—'));
  const real=step.filter(s=>s.nA>=3&&s.pass!=null);if(real.length){const bn=real.reduce((a,s)=>s.pass<a.pass?s:a);const hh=hhOf(L);
   if(hh<TARGET.hh.lo&&BALX.ranks){const rk=BALX.ranks[bn.i],pv=BALX.ranks[bn.i-1];const k=clamp((bn.pass||1)/Math.max(bn.pass||1,60));const ns=Math.round(pv.s+(rk.s-pv.s)*Math.max(.5,k)),nd=Math.round(pv.d+(rk.d-pv.d)*Math.max(.5,k));
    add('(3) bottleneck',`HH ${f1(hh)} % < ${TARGET.hh.lo} %: the hardest step is ${rankN(bn.i-1)} → ${rankN(bn.i)} (only ${f1(bn.pass)} % of those at ${rankN(bn.i-1)} pass)${low(bn.nA)}`,
     `RANKS[${bn.i}] ${codeLoc(/const RANKS\s*=/)} (move to BAL first, law 4)`,`Sủng ${rk.s} · Danh ${rk.d}`,`Sủng ${ns} · Danh ${nd} (the step from ${rankN(bn.i-1)} cut to ×${r2(Math.max(.5,k))})`,'more lives pass the bottleneck step → HH reach up; re-run confirms')}}
  /* pace model calibration (part-2 gap): the reading term's share of the minutes; until calibrated, judge speed by game years */
  if(c.PACE&&c.P){const rd=L.map(r=>{const p=c.P(r),m=lifeMin(r);return p&&m?((p.chars||0)/c.PACE.READ_CPS/60)/m:null}).filter(x=>x!=null);const sh=mean(rd);
   if(sh!=null)add('(3) pace model',`reading = ${f1(100*sh)} % of the modelled real minutes; PACE is NOT calibrated against human-paced play (part-2 gap)`,'robot10-agg.js PACE (READ_CPS '+c.PACE.READ_CPS+', CLICK_S '+c.PACE.CLICK_S+', CHOICE_S '+c.PACE.CHOICE_S+')','—','calibrate READ_CPS with one human-paced kiếp before any minutes-based tuning; until then use the game-year column','real-minute rows become trustworthy')}
  const km=mean(L.map(lifeMin)),kd=mean(L.filter(ended).map(lifeMin));
  add('(3) kiếp length',`mean kiếp ${f1(km)} real min (ended lives ${f1(kd)}) vs cap ${TARGET.kiepMin.hi} min (${TARGET.kiepMin.src})`,'pace: robot10-agg.js PACE + the rank steps above','—',(km||0)>TARGET.kiepMin.hi?'lower the slowest step (bottleneck row) or BAL.entry.cap start rank':'keep','—')}
 /* (4) endings / rare endings / kỳ ngộ / event variety */
 {const E=L.filter(r=>r._end);const T=by(E,r=>r._end).map(([k,G])=>[k,G.length,G]).sort((a,b)=>b[1]-a[1]);
  if(E.length>=5&&T.length){const [k,n,G]=T[0];const s=P(n,E.length);if(s>TARGET.endShare.hi)add('(4) ending too common',`«${k.slice(0,60)}» = ${f1(s)} % of ${E.length} endings (${TARGET.endShare.src})${low(E.length)}`,
   G[0].life.death?'see (2) death rows (this ending is a death)':`site ${G[0]._esrc||'?'}`,'—',G[0].life.death?'the (2) values':'lower its trigger odds at the site','other endings get room')}
  /* rare endings per road: BAL.arc.rare.<road>.p */
  const RA=get(B,'arc.rare')||{};by(L,r=>r.road||r.job.road).forEach(([rd,G])=>{const d=RA[rd];if(!d||typeof d.p!=='number')return;const n=G.filter(r=>r.life.group==='rare').length;const x=n/G.length;
   const need=Math.ceil(3/d.p);if(!n&&G.length>=need)add('(4) rare ending too rare',`road ${rd}: 0 rare endings in ${G.length} lives (p ${d.p} → expected ${f1(G.length*d.p)})`,K('arc.rare.'+rd+'.p'),show(d.p),String(r2(Math.min(1,d.p*1.5))),'rare ending seen about once per '+Math.round(1/Math.min(1,d.p*1.5))+' lives');
   else if(x>2*d.p&&G.length>=5)add('(4) rare ending too common',`road ${rd}: ${n}/${G.length} lives (${f1(100*x)} %) vs p ${d.p}${low(G.length)}`,K('arc.rare.'+rd+'.p'),show(d.p),String(r2(d.p*clamp(d.p/x))),'rare stays rare');
   else if(!n)notes.push(`road ${rd}: no rare ending yet in ${G.length} lives (p ${d.p}: need ≥ ${need} lives to judge)`)});
  /* kỳ ngộ */
  const ky=L.map(r=>(M(r).ky||[]).length),z=P(ky.filter(x=>!x).length,L.length),p0=get(B,'kyngo.p0');
  if(z>50)add('(4) kỳ ngộ too rare',`${f1(z)} % of lives met no kỳ ngộ (mean ${f1(mean(ky))} per life)${low(L.length)}`,K('kyngo.p0')+' · '+K('kyngo.festP'),`p0 ${show(p0)} · festP ${show(get(B,'kyngo.festP'))}`,`festP ${scaleV(get(B,'kyngo.festP'),1.5)} (p0 already ${p0})`,'more lives meet at least one kỳ ngộ');
  else if(mean(ky)>6)add('(4) kỳ ngộ too common',`mean ${f1(mean(ky))} kỳ ngộ per life`,K('kyngo.p0'),show(p0),String(scaleV(p0,.8)),'kỳ ngộ feels special again');
  else notes.push(`kỳ ngộ: mean ${f1(mean(ky))} per life, ${f1(z)} % of lives with none — no change`);
  /* event variety (metric 12) */
  const ds=mean(L.map(r=>M(r).evDistinct)),rp=mean(L.map(r=>M(r).evRep));if(ds){const x=P(rp||0,ds);
   if(x>TARGET.evRep.hi)add('(4) events repeat',`cards seen again in the same kiếp: ${f1(rp)} of ${f1(ds)} distinct (${f1(x)} %) vs ≤ ${TARGET.evRep.hi} %`,K('eff.j68q.cd'),show(get(B,'eff.j68q.cd')),String(scaleV(get(B,'eff.j68q.cd'),clamp(x/TARGET.evRep.hi))),'longer cooldown before a j68 card returns');
   else notes.push(`events: ${f1(rp)} repeats of ${f1(ds)} distinct cards per kiếp (${f1(x)} %) — no change`)}}
 const md=['## RECOMMENDATIONS (OWNER ORDER #6 — report only; values change after sếp\'s OK via MAIN, then one re-run confirms)','',
  `BAL read from the game page ${BALX.url||''} at ${BALX.at||'?'} (law 4). Targets: ${[TARGET.hh,TARGET.hhAll,TARGET.hhCnv,TARGET.early,TARGET.birth].map(t=>t.src).join(' · ')} · kiếp cap: ${TARGET.kiepMin.src}. Proposed values = first-order estimates (current × target ÷ observed, ×${CLAMP[0]}–×${CLAMP[1]}); rows under ${MIN_N} lives are «low n».`,'',
  c.tbl(['area','finding (off vs target)','BAL key(s) file:line','current','proposed','expected effect'],rows),''];
 if(notes.length)md.push('No change needed / not yet judgeable: '+notes.join(' · '),'');return md}
module.exports={recommend,balFromGame,keyLoc,codeLoc,TARGET};
if(require.main===module){const [cmd,game,outf]=process.argv.slice(2);
 if(cmd==='bal'){balFromGame(game).then(o=>{const s=JSON.stringify(o);if(outf)fs.writeFileSync(outf,s);else process.stdout.write(s)}).catch(e=>{console.error('bal: '+e.message);process.exit(1)})}
 else if(cmd==='loc'){console.log(process.argv.slice(3).map(k=>k+' → '+keyLoc(k)).join('\n'))}
 else console.log('usage: node dev/measure/robot10-reco.js bal [GAME] [out.json] | loc <key.path>...')}
