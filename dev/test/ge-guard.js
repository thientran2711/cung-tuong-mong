/* ge-guard (review/grand-endings-engine): the variety guard of the grand endings (design GRAND_ENDINGS.md §2.11) on the GAME copy + pilot data integrity.
   1. python3 dev/test/ge_guard/check.py (the catalogue rules: 40 branches × 4 grand, ≥3 groups, ≥1 ác, ≥1 stay, ≥1 leave/follow, 4 distinct pairs + summits,
      2 different shading titles, no duplicate ending / title / shape, titles ≤ 4 chữ) must print ERRORS 0;
   2. dev/build/jgecat.js is exactly what dev/test/ge_guard/gen_js.py writes (the game reads the checked catalogue, nothing hand-edited);
   3. in the built game: every live branch (GE_DATA) has 4 endings in catalogue order, a full road (rdFull), every Chuỗi / push / Khóa / doom / lean name is a REAL
      option name of that road (.4–.11), ch12–14 (noi14 hau14 ke14 st_con st_dong st_the) or a shared line, every "@arc=end" names a real arc + ending,
      every condition term is known, every gate stat has a BAL.ge.gate number, every ending has t / a / ht / ha / cw / fail / ft text, BAL.ge.rw and BAL.ge.fail exist;
      no "%" and no digits in player text (VANPHONG); the Thiên mệnh titles are registered in the jdh catalogue (DH_CAT) with one step at BAL.ge.title.tier.
   5. (E35b Phù Tang wave) the 4 pt roads are live; every branch's identity (geOrig) is its road's own origin and a GE_ID key.
   4. (E28 Ba Tư wave) the 4 bd roads are live and no bd ending text / title / GE_ID carries a steppe or Bắc Địch word.
   usage: node dev/test/ge-guard.js <url-of-dev/index.html> */
const {execSync}=require('child_process');const fs=require('fs');const path=require('path');const {chromium}=require('playwright');
const URL=process.argv[2]||'file://'+path.resolve(__dirname,'../index.html');
const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);if(!c)console.error('FAIL',n,JSON.stringify(x).slice(0,1200))};
(async()=>{
 const out=execSync('python3 '+path.join(__dirname,'ge_guard/check.py')).toString();console.log(out.split('\n').slice(0,2).join('\n'));
 chk('catalogue variety guard: ERRORS 0',/ERRORS 0/.test(out),out.split('\n')[1]);
 const cat=path.resolve(__dirname,'../build/jgecat.js');const before=fs.readFileSync(cat,'utf8');
 const tmp=execSync('python3 '+path.join(__dirname,'ge_guard/gen_js.py')).toString();const after=fs.readFileSync(cat,'utf8');
 chk('jgecat.js = generated from cat.py (no hand edit)',before===after,tmp);
 const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof GE_DATA==='object'&&typeof geS==='function'&&typeof ROAD14==='object',null,{timeout:0});await p.waitForTimeout(1200);
 const R=await p.evaluate(()=>{const bad=[];const info={};
  const optNames=ids=>{const S1=new Set();for(const id of ids){const a=ARC67[id];if(!a)continue;for(const bk in (a.B||{}))for(const o of (a.B[bk].o||[]))if(o&&o.n)S1.add(o.n)}return S1};
  const shared=Object.keys(ARC67).filter(id=>/^(s_|st_)/.test(id)||["noi14","hau14","ke14"].includes(id));
  const TERMS=new Set(["s","e","seat","seatT","mis","misD","son"]);
  for(const b in GE_DATA){const D=GE_DATA[b],C=GE_CAT[b];if(!C){bad.push(b+': not in GE_CAT');continue}
   const R=ROAD14[b]||{};if(typeof rdFull!=='function'||!rdFull(b))bad.push(b+': road not full');
   const own=[b].concat(Object.keys(R).map(n=>R[n]));const N=optNames(own.concat(shared));
   if(D.e.length!==4)bad.push(b+': '+D.e.length+' endings');
   /* no name twice in one list (review E11r-w2 fix 3: a doubled name inflates the Chuỗi count) */for(const [k,a] of [['lean.p',D.lean.p||[]],['lean.m',D.lean.m||[]],...D.e.flatMap((e,i)=>['pull','push','close','doom'].map(L=>[`ge${i+1}.${L}`,e[L]||[]]))]){const d=a.filter((x,j)=>a.indexOf(x)!==j);if(d.length)bad.push(`${b} ${k}: name twice in one list: ${d.join(' | ')}`)}
   const names=[];D.e.forEach((e,i)=>{const id=b+'_'+(i+1);
    for(const L of ['pull','push','close','doom'])for(const n of (e[L]||[])){names.push(n);if(n[0]==='@'){const m=n.slice(1).split('=');if(!ARC67[m[0]]||!(ARC67[m[0]].E||{})[m[1]])bad.push(`${id} ${L}: no arc/ending ${n}`)}else if(!N.has(n))bad.push(`${id} ${L}: not an option of the road: ${n}`)}
    for(const t of (e.cond||[]).concat(e.fo||[])){if(!TERMS.has(t[0]))bad.push(`${id}: unknown term ${t[0]}`);if(t[0]==='s'&&!(BAL.ge.gate[id]||{})[t[1]])bad.push(`${id}: no BAL.ge.gate.${id}.${t[1]}`);if(t[0]==='mis'&&!(BAL.ge.gate[id]||{}).mis)bad.push(`${id}: no gate mis`)}
    for(const k of ['t','a','ht','ha','cw','fail','ft'])if(!e[k])bad.push(`${id}: no ${k}`);
    for(const k of ['t','a','ht','ha','cw','fail','ft']){const s=String(e[k]||'');if(/%|\d/.test(s))bad.push(`${id}.${k}: digit or % in player text`)}
    /* scale guard (E1b: Tai mắt S.mat is clamped 0–10 in j1 ap(), every other stat 0–100): a gate or reward above the stat's scale can never be met / is cut */
    {const MAXS={mat:10},mx=k=>MAXS[k]||100;for(const [k,v] of Object.entries(BAL.ge.gate[id]||{}))if(v>mx(k))bad.push(`${id}: gate ${k} ${v} above the stat scale ${mx(k)}`);
     for(const R of [BAL.ge.rw[id]||{},BAL.ge.fail[id]||{}])for(const [k,v] of Object.entries(R))if(typeof v==='number'&&!['rank','bac','rel','mis'].includes(k)&&Math.abs(v)>mx(k)/2)bad.push(`${id}: rw/fail ${k} ${v} beyond half the stat scale ${mx(k)}`)}
    if(!BAL.ge.rw[id])bad.push(`${id}: no BAL.ge.rw`);if(!BAL.ge.fail[id])bad.push(`${id}: no BAL.ge.fail`);
    if(!(e.pull||[]).length)bad.push(`${id}: no Chuỗi`);if(!(e.close||[]).length)bad.push(`${id}: no Khóa`);
    for(const sh of ['t','a']){const k=`ge_${b}_${i+1}${sh}`;if(!DH_CAT[k]||DH_CAT[k].g!=='tm')bad.push(`${k}: not in DH_CAT tm`);const T=BAL.dh.T[k];if(!T||T.n.length!==1||T.b!==BAL.ge.title.tier)bad.push(`${k}: BAL.dh.T step/tier`)}});
   for(const n of (D.lean.p||[]).concat(D.lean.m||[]))if(!N.has(n))bad.push(`${b} lean: not an option: ${n}`);
   const both=(D.lean.p||[]).filter(n=>(D.lean.m||[]).includes(n));if(both.length)bad.push(`${b} lean: both + and −: ${both}`);
   info[b]={chuoi:D.e.map(e=>e.pull.length),khoa:D.e.map(e=>e.close.length),lean:[D.lean.p.length,D.lean.m.length]}}
  /* variety guard, whole family (E11, one block for every wave): no two endings of ANY live branch share a narration sentence (t / a / ft), a «Đạt được khi» line (ht / ha),
     a condition line (cw) or a fail name (case-blind); the two shadings of one ending never read the same (t ≠ a) */
  {const seen={};for(const b in GE_DATA)GE_DATA[b].e.forEach((e,i)=>{const id=b+'_'+(i+1);
    if(e.t&&e.t===e.a)bad.push(`${id}: t = a`);
    const units=[].concat(...['t','a','ft'].map(k=>String(e[k]||'').split(/(?<=[.!?…”])\s+/).map(x=>x.trim()).filter(x=>x.length>12).map(x=>[k,x])),['ht','ha','cw','fail'].map(k=>[k,String(e[k]||'').trim()]));
    for(const [k,x] of units){const key=x.toLowerCase();if(seen[key]&&seen[key]!==id+'.'+k)bad.push(`duplicate narration ${id}.${k} = ${seen[key]}: ${x.slice(0,60)}`);else seen[key]=id+'.'+k}})}
  /* Ba Tư wave (E28): the bd roads are Ba Tư for every new life (OD 19/11 ~06:40Z) — no steppe / Bắc Địch word in any player text of a bd ending */
  const STEPPE=/thảo nguyên|khả hãn|khả đôn|bắc địch|kim trướng|đống đá|tuyết trắng|sói|(^|[^\p{L}])hãn([^\p{L}]|$)/iu,steppe=[];
  for(const b in GE_DATA)if(/^bd_/.test(b))GE_DATA[b].e.forEach((e,i)=>{for(const k of ['t','a','ht','ha','cw','fail','ft'])if(STEPPE.test(String(e[k]||'')))steppe.push(`${b}_${i+1}.${k}`);
   for(const k of [6,7])if(STEPPE.test(String(GE_CAT[b].e[i][k]||'')))steppe.push(`${b}_${i+1} title`)});
  if(GE_ID.bd&&!/Ba Tư/.test(GE_ID.bd))steppe.push('GE_ID.bd = '+GE_ID.bd);
  /* Phù Tang wave (E35b) + the identity family: every live branch's identity (geOrig = its road's own ARC67 o) is an origin key with a GE_ID name,
     so geBranch can open it on that origin's life (pt_* roads are origin pf: a prefix check left them dark); and no Phù Tang text names an era-wrong word (Wokou / thập nhị đơn) */
  const orig=[];for(const b in GE_DATA){const o=typeof geOrig==='function'?geOrig(b):b.split('_')[0];if(!GE_ID[o]||!ARC67[b]||ARC67[b].o!==o)orig.push(`${b}: identity ${o}`)}
  const ERA=/oa khấu|wokou|thập nhị đơn/i;for(const b in GE_DATA)if(/^pt_/.test(b))GE_DATA[b].e.forEach((e,i)=>{for(const k of ['t','a','ht','ha','cw','fail','ft'])if(ERA.test(String(e[k]||'')))orig.push(`${b}_${i+1}.${k}: era word`)});
  return {bad,info,steppe,orig,live:Object.keys(GE_DATA),it:!!IT[BAL.ge.kimsach]&&IT[BAL.ge.kimsach].pr===0&&IT[BAL.ge.kimsach].keep===1}});
 console.log('live branches',R.live.join(' '),JSON.stringify(R.info));
 chk('3 pilot branches live (tt_co, cnv_mat, one nc road)',R.live.includes('tt_co')&&R.live.includes('cnv_mat')&&R.live.some(b=>/^nc_/.test(b)),R.live);
 chk('Ba Tư wave: the 4 bd roads are live (bd_san bd_soi bd_tuyet bd_hen)',['bd_san','bd_soi','bd_tuyet','bd_hen'].every(b=>R.live.includes(b)),R.live);
 chk('Phù Tang wave: the 4 pt roads are live (pt_hai pt_su pt_tang pt_dang)',['pt_hai','pt_su','pt_tang','pt_dang'].every(b=>R.live.includes(b)),R.live);
 chk('every live branch opens on its own origin (geOrig = ARC67 o, a GE_ID key); no era-wrong word in pt texts',!R.orig.length,R.orig);
 chk('Ba Tư wave: no steppe / Bắc Địch word in bd ending texts, titles, GE_ID',!R.steppe.length,R.steppe);
 chk('pilot data integrity (real option names, terms, gates, texts, BAL rows, titles)',!R.bad.length,R.bad.slice(0,30));
 chk('Kim sách Thiên mệnh: one item kind, no sale, kept',R.it,null);
 chk('no page errors',!errs.length,errs.slice(0,5));
 await b.close();const nb=ok.filter(x=>!x[1]).length;console.log(`ge-guard: ${ok.length-nb}/${ok.length} pass`);process.exit(nb?1:0)})();
