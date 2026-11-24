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
     HINT-NO-GAIN  an EVENT card (rows hidden in play, GỢI Ý line instead) whose option has a gain, but its hint (jk2b kitHint, lowest level)
                reads «chẳng được gì» → law 3 fault as she sees it (the hint reader did not take the gain words as a gain)
   Options that neither cost nor gain anything ("Đóng", "Thôi") are not COST-ONLY; they are DOMINATED only by a free, sure, gain-only sibling.
   usage: node dev/tools/choice-value-scan.js [--turns N] [--seed S] [--out file.json] [--md] [--words] [--plant] [--fullsuc]   (--plant: self-test, plants 3 bad choices; exit 1 = all caught, 3 = gate broken)   (run from the repo root of a BUILT site)
   exit 1 when any COST-ONLY or DOMINATED row is found (the gate), 0 when clean. Last line = one-line summary. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('../test/lib/device');
const A=process.argv.slice(2);const arg=(k,d)=>A.includes(k)?A[A.indexOf(k)+1]:d;
const TURNS=+arg('--turns',60),SEED=+arg('--seed',7),OUT=arg('--out',null),MD=A.includes('--md'),PLANT=A.includes('--plant');const FULLSUC=A.includes('--fullsuc');const NUMS=A.includes('--numbers');/* robot10-onecore (law 4 + law 11): also run the ROBOT-10 one-core number audit (dev/measure/robot10-in.js auditOpt, ONE rule) on every option built here: a number printed on an option must be the number it applies *//* every card drawn with Sức at her cap: a «giữ sức» road must still show a gain when Sức +N clamps to 0 (seed-7 find, #4) */
const ROOT=path.resolve(__dirname,'../..');
/* (3) the demo option pair of the shot scripts: same rule, the owner saw it in a shot (OD 18/11 ~09:20Z) */
function fixtureRows(){const R=[];const dir=path.join(ROOT,'dev/test');
 for(const f of fs.readdirSync(dir).filter(f=>/\.js$/.test(f))){const s=fs.readFileSync(path.join(dir,f),'utf8');
  const re=/\[(\{n:(['"])[^'"]*\2,fx:\{[^}]*\},x:(['"])[^'"]*\3[^\]]*?)\]/g;let m;while((m=re.exec(s))){const body=m[1];const opts=[...body.matchAll(/\{n:(['"])([^'"]*)\1,fx:\{([^}]*)\},x:(['"])([^'"]*)\4(?:,hint:(['"])([^'"]*)\6)?/g)].map(x=>({n:x[2],fx:x[3],x:x[5],hint:x[7]||''}));
   if(opts.length<2)continue;const fxNum=t=>[...t.matchAll(/(\w+):(-?\d+)/g)].map(z=>[z[1],+z[2]]);
   const cs=opts.map(o=>{const f=fxNum(o.fx);const hg=o.hint&&!/^(không|chưa rõ)\b/i.test(o.hint)?[['gợi ý: '+o.hint.split(/\s*;?\s*nhưng\s+/)[0],1]]:[];/* jopic kitOptFinal shows a GỢI Ý wording in Được */const xs=[...o.x.matchAll(/([^\s·]+(?: [^\s·+\-0-9]+)*)\s*([+-]\d+)/g)].map(z=>[z[1],+z[2]]);
    const hw=/(?:^|·)\s*thành:/.test(o.x)?[['thành',1]]:[];/* a word gain after «thành:» counts */
    const xs2=xs.filter(z=>!/^hỏng|hỏng:/.test(z[0]));
    const gain=[...f.filter(z=>z[1]>0),...xs2.filter(z=>z[1]>0),...hw,...hg],cost=[...f.filter(z=>z[1]<0),...xs.filter(z=>z[1]<0)];return{t:o.n,gain,cost}});
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
  window.__cvsShowAll=1;if(typeof kitIsEventChoice==='function'){const k0=kitIsEventChoice;window.__cvsK0=k0;window.kitIsEventChoice=kitIsEventChoice=function(m){return window.__cvsShowAll?false:k0(m)}}});
 if(FULLSUC)await g.evaluate(()=>{const s0=showModal;window.showModal=showModal=function(){try{if(S&&typeof sucCap==='function')S.suc=sucCap(S)}catch(e){}return s0.apply(this,arguments)}});
 await g.addStyleTag({content:'#kroul,#kroulw,.kmov{display:none!important}'});
 /* the audit rule taken from dev/measure/robot10-in.js's own text (ONE source; loading the whole harness file would also wrap start / over / contests) */
 if(NUMS){const T=fs.readFileSync(path.join(ROOT,'dev/measure/robot10-in.js'),'utf8');const i=T.indexOf('const LAB='),j=T.indexOf('R.auditOpt=auditOpt;');if(i<0||j<0)throw new Error('robot10-in.js: audit rule not found');
  await g.evaluate(src=>{const R=window.__r10={bugs:[],seen:{},opts:0};const strip=x=>String(x==null?"":x).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();const words=()=>{};
   function bug(type,msg,detail){const key=type+"|"+String(msg).slice(0,160);const b=R.seen[key];if(b){b.n++;return}const x={type,msg:String(msg).slice(0,300),detail:detail==null?"":String(detail).slice(0,600),n:1};R.seen[key]=x;R.bugs.push(x)}
   eval(src+';R.auditOpt=auditOpt;')},T.slice(i,j))}
 const audN=async tag=>{if(NUMS)await g.evaluate(t=>{const m=typeof Q!=='undefined'&&Q[0];const R=window.__r10;if(!m||!R||!R.auditOpt)return;const n0=R.bugs.length;(m.opts||m.o||[]).forEach(o=>{try{R.auditOpt(o,m)}catch(e){}});for(let i=n0;i<R.bugs.length;i++)R.bugs[i].src=t},tag).catch(()=>{})};
 /* one modal → its options as the kit card shows them */
 const probe=()=>g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const op=M.querySelector('.opts');if(!op)return null;
  const bs=[...op.querySelectorAll(':scope > button')];if(bs.length<2)return null;const T=e=>(e&&e.textContent||'').replace(/\s+/g,' ').trim();
  const title=T(M.querySelector('h3,h2,.kpt,.ktitle'));const m=typeof Q!=='undefined'&&Q[0]||{};
  /* the GỢI Ý line she reads on an event card (outcome rows hidden in play): kitHint at the lowest Tâm cơ level */
  let isEv=false;try{isEv=!!(window.__cvsK0&&window.__cvsK0(m))}catch(e){}const OL=isEv?(m.o||m.opts||[]):[];const HN=nm=>{const o=OL.find(o=>o&&o.n&&nm.startsWith(T({textContent:o.n})));if(!o||typeof kitHint!=='function')return'';try{return kitHint(o,m,0).hint||''}catch(e){return''}};
  const cs=bs.map(bt=>{const rows={ton:[],duoc:[],mat:[],kem:[]};
   bt.querySelectorAll('.kr').forEach(r=>{const k=[...r.classList].find(c=>/^kr-/.test(c));if(!k)return;let key=k.slice(3);if(key==='thanh'||key==='bai')key='duoc';if(!rows[key])return;
    if(r.classList.contains('kfill'))return;/* opt-card-short (jopic kitOptFinal): a filler row («Tốn: không», «Được: không») carries no value */r.querySelectorAll('.krv>.ef:not(.kdup)').forEach(e=>rows[key].push({h:T(e),c:e.classList.contains('g')?'g':e.classList.contains('r')?'r':e.classList.contains('t')?'t':'n'}))});
   /* kitOptFinal (opt-card-short #10, LAW 3): with no Được row the GỢI Ý wording is shown in Được (before «nhưng») and Tốn (after it) as .kdup chips: read those too */if(!rows.duoc.length){const fd=bt.querySelector('.kr-duoc.kfill');if(fd)fd.querySelectorAll('.krv>.ef.kdup').forEach(e=>rows.duoc.push({h:T(e),c:'g'}));const ft=bt.querySelector('.kr-ton.kdup0');if(ft)ft.querySelectorAll('.krv>.ef.kdup.r').forEach(e=>rows.ton.push({h:T(e),c:'r'}))}
   const odds=T(bt.querySelector('.kodds,.oc'));const name=T(bt.querySelector('.kan,.kat'))||T(bt).slice(0,60);
   return{t:name.slice(0,80),rows,odds,hint:HN(name),dis:bt.disabled||bt.classList.contains('off')||bt.getAttribute('aria-disabled')==='true'}});
  return{title:title.slice(0,60),pid:m.pid||'',cs}});
 const seen={};const modals=[];
 const record=async(tag)=>{await audN(tag);const r=await probe();if(!r)return;const key=r.title+'|'+r.cs.map(c=>c.t).join('/');if(seen[key])return;seen[key]=1;r.tag=tag;modals.push(r)};
 /* --plant (self-test of the gate, review FAIL 2): three planted bad choices must all be flagged — cost-only, dominated, and a fake-green word (a loss written as a gain) */
 if(PLANT)await g.evaluate(()=>{PEND.__cvPlantCost=()=>({t:'<p>plant</p>',o:[{n:'Plant cost-only',fx:{bac:-10}},{n:'Plant free gain',fx:{duc:1}}]});
  PEND.__cvPlantDom=()=>({t:'<p>plant</p>',o:[{n:'Plant dominated',fx:{bac:-10,duc:2}},{n:'Plant better',fx:{bac:-10,duc:3}}]});
  PEND.__cvPlantWord=()=>({t:'<p>plant</p>',o:[{n:'Plant fake green',fx:{sung:-2},x:'nhường đêm'},{n:'Plant accept',fx:{suc:-3},x:'thân +3'}]})});
 const NPLANT=A.includes('--numplant');if(NUMS&&NPLANT)await g.evaluate(()=>{PEND.__cvPlantNum=()=>({t:'<p>plant</p>',o:[{n:'Plant num',fx:{sung:2},x:'Sủng +5'},{n:'Plant num ok',fx:{duc:1},x:'Đức +1'}]});/* robot10-onecore 2: a j68 (c6) sure option whose printed win differs from its win block — only the WIN block (__w) can catch it */PEND.__cvPlantC6=()=>{const c=c6('Plant c6',{c:{bac:-5},w:{suc:2}});c.x=c.x.replace(/Sức \+2/,'Sức +6');return{t:'<p>plant</p>',o:[c,c6('Plant c6 ok',{w:{duc:1}})]}}});/* --numbers self-test: one planted lie must be caught */
 /* (1) every PEND dilemma builder */
 const pend=await g.evaluate(()=>Object.keys(PEND));
 for(const id of pend){const e6=/^e68/.test(id)?await g.evaluate(id=>{try{const E=typeof E68I==='object'&&E68I[id.slice(3)];const P=E&&E.pp?E.pp():null;return P&&typeof P==='object'?P:null}catch(e){return null}},id):null;/* robot10-onecore 2: a j68 event with actors needs its own params (E68I[id].pp: who / which item); {} built none of them */
  for(const pp of [{},{q:3,vp:0}].concat(e6?[e6]:[])){try{const ok=await g.evaluate(([id,pp])=>{Q.length=0;$('modal').hidden=true;let d=null;try{d=mkP(id,pp)}catch(e){return 0}if(!d||!d.o||d.o.length<2)return 0;pushDil(d,'PEND '+id);showModal();return 1},[id,pp]);
  if(ok){await p.waitForTimeout(60);await record('pend:'+id)}}catch(e){}}}
 /* (1b) rank- / condition-gated builders the turns rarely reach (review FAIL 2b): drive them directly.
    MF7 merits (PEND j71m, every family × variant), FV7 festivals (j71f / j71i, every kind × variant), FX7 contests (j71x),
    every WORLD event card (EVD[k].card with her among the chosen), and every TSA panel builder (Hoàng thượng triệu đàn / cờ / du hồ …). */
 const drain=async(tag)=>{for(let k=0;k<12;k++){const has=await g.evaluate(()=>{if(typeof Q==='undefined'||!Q.length)return 0;try{showModal()}catch(e){return 0}return 1});if(!has)break;
   await p.waitForTimeout(50);await record(tag);await g.evaluate(()=>{const M=document.getElementById('modal');if(M)M.hidden=true;if(Q.length)Q.shift()})}};
 const jobs=await g.evaluate(()=>{const J=[];const vl=o=>Array.isArray(o)?o.length:o&&o.v?o.v.length:0;
  try{for(const k of Object.keys(MF7))for(let i=0;i<vl(MF7[k]);i++)J.push(['m',k,i])}catch(e){}
  try{for(const k of Object.keys(FV7))for(let i=0;i<vl(FV7[k]);i++)J.push(['f',k,i])}catch(e){}
  try{for(const k of Object.keys(FX7))J.push(['x',k,0])}catch(e){}
  try{const EVD=window.WORLD_EVD||{};for(const k of Object.keys(EVD))if(EVD[k]&&EVD[k].card){const subs=k==='away'?Object.keys((BAL.world.away||{}).fol||{}):[null];subs.forEach(sb=>J.push(['w',k,sb]))}}catch(e){}
  J.push(['srv','amNight',0]);/* the cung nữ road's night summons (PEND amNight returns null on the consort road) */
  try{for(const k of ['dan','co','duho'])J.push(['ts','summonMe',k]);for(const k of Object.keys(TSA))if(k!=='summonMe'&&typeof TSA[k]==='function'&&TSA[k].length===0)J.push(['ts',k,null])}catch(e){}
  return J});
 for(const [kind,k,i] of jobs){const ok=await g.evaluate(([kind,k,i])=>{Q.length=0;$('modal').hidden=true;const r0=S.rank;try{
   if(kind==='m'){const f=MF7[k];let pp=null;try{pp=f.pp?f.pp():{}}catch(e){}pp=Object.assign({},pp||{},{k,vi:i});const d=mkP('j71m',pp);if(!d||!d.o||d.o.length<2)return 0;pushDil(d,f.t||'merit');return 1}
   if(kind==='f'){let pp=null;try{pp=typeof fPP7==='function'?fPP7(k,i):null}catch(e){}pp=Object.assign({},pp||{},{k,vi:i});let n=0;for(const id of ['j71f','j71i']){let d=null;try{d=mkP(id,pp)}catch(e){}if(d&&d.o&&d.o.length>=2){pushDil(d,'festival');n++}}return n}
   if(kind==='x'){const d=mkP('j71x',{kk:k});if(!d||!d.o||d.o.length<2)return 0;pushDil(d,'contest');return 1}
   if(kind==='w'){const w={k,id:'scan-'+k,x:Object.assign({f:['me'],who:S.id},i?{sub:i}:{}),cause:'(scan)',txt:'',t:0};const c=window.WORLD_EVD[k].card(w);const o=c&&(c.opts||c.o);if(!o||o.length<2)return 0;Q.push({t:c.t,h:c.h,opts:o,who:c.who});return 1}
   if(kind==='srv'){const s0=S.srv,a0=S.age;S.srv=Object.assign({},s0||{},{risen:0});S.age=Math.max(18,a0||0);let d=null;try{d=mkP(k,{})}finally{S.srv=s0;S.age=a0}if(!d||!d.o||d.o.length<2)return 0;pushDil(d,'PEND '+k);return 1}
   if(kind==='ts'){i==null?TSA[k]():TSA[k](i);return Q.length}}catch(e){return 0}finally{S.rank=r0}return 0},[kind,k,i]);
  if(ok)await drain(kind==='m'?'mf7:'+k:kind==='f'?'fv7:'+k:kind==='x'?'fx7:'+k:kind==='w'?'world:'+k+(i?':'+i:''):kind==='srv'?'srv:'+k:'ts:'+k+(i?':'+i:''))}
 /* (2) end-of-turn passes */
 for(let i=0;i<TURNS;i++){await g.evaluate(()=>{try{if(!S||S.dead)start();Q.length=0;endTurn()}catch(e){}});
  for(let k=0;k<8;k++){await p.waitForTimeout(40);await record('turn'+i);const more=await g.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return 0;M.hidden=true;if(typeof Q!=='undefined'&&Q.length)Q.shift();return Q.length?1:0});
   if(!more)break;await g.evaluate(()=>{try{showModal()}catch(e){}})}}
 const NB=NUMS?await g.evaluate(()=>(window.__r10&&__r10.bugs||[]).filter(b=>b.type==='number').map(b=>({msg:b.msg,detail:b.detail,src:b.src||'',n:b.n}))):[];const NO=NUMS?await g.evaluate(()=>window.__r10?__r10.opts:0):0;
 await b.close();srv.close();
 /* ---- judge ---- */
 const num=h=>{const m=String(h).match(/^(.*?)\s*([+\-−])\s?(\d+)\s*$/);if(!m)return null;return[m[1].trim().toLowerCase(),(m[2]==='+'?1:-1)*+m[3]]};
 const ODD=['liều','khó','năm ăn năm thua','khá chắc','chắc','rất chắc','nắm chắc'];const oddsRank=o=>{const s=String(o||'').toLowerCase();if(!s)return 99;let r=-1;ODD.forEach((w,i)=>{if(s.includes(w))r=i});return r<0?99:r};
 const vec=c=>{const G={},C={},words=[];c.rows.duoc.forEach(x=>{const n=num(x.h);if(x.c==='r'){if(n)C[n[0]]=(C[n[0]]||0)+Math.abs(n[1]);else C['~'+x.h.toLowerCase()]=1}/* a red line in the outcome block (failure loss) */else if(n)G[n[0]]=(G[n[0]]||0)+Math.abs(n[1]);else if(LOSSW.test(x.h))C['~'+x.h.toLowerCase()]=1;/* a loss written in green (review FAIL 2a: «nhường đêm») is a cost, never a gain */else words.push(x.h.toLowerCase())});
  [...c.rows.ton,...c.rows.mat,...c.rows.kem.filter(x=>x.c==='r')].filter(x=>!/^không (tốn|mất)( gì)?$/i.test(x.h)).forEach(x=>{/* «không tốn gì» is no cost */const n=num(x.h);const tm=String(x.h).match(/(\d+)\s*khắc/);if(tm)C['khắc']=(C['khắc']||0)+ +tm[1];else if(n)C[n[0]]=(C[n[0]]||0)+Math.abs(n[1]);else C['~'+x.h.toLowerCase()]=1});
  return{G,C,words,o:oddsRank(c.odds)}};
 /* LOSS WORDS (review FAIL 2a): a green word that names her own loss is not a gain. Others' loss («Thái giám X bị phạt», «nàng ta bị trách») is her gain and stays. */
 const LOSSW=/^(nhường|mất |bị |phải |chịu |thua|không (gửi|được)|cha giận|(nàng|người|ngài|hắn|cha|mẹ) (giận|oán|thù|ghét|nghi)|.*(giận|oán|thù|ghét|nghi) ngươi|.*ngươi bị )/i;
 const geq=(a,b)=>Object.keys(b).every(k=>(a[k]||0)>=b[k]);
 /* EXEMPT from LAW 2 only (MAIN ROOT-59 ~23:05Z; documented in dev/handover/reports/choice-value-audit.md): the better option depends on what she has LEARNED (his / her taste),
    or the options form a LOOK price ladder. These rows are listed and never fail LAW 2 (dominance); LAW 3 (cost-only) is still judged on them. */
 const EX={night1:'KNOWLEDGE: each answer fits one of his tastes (j8 night1, trait → odds); finding his taste is the play',
  vnight:'KNOWLEDGE: same night answers as night1',ge1:'ENDING: the end-branch outcome is hidden on purpose until the last line (jge, owner ending design)',ge2:'ENDING: as ge1',vlout:'LOOK: a price / cover ladder of veils (che được ít … khá kín): a dearer veil covers more and looks finer — a fair price / quality ladder'};
 const exWhy=m=>EX[m.pid]||(/Đặt cược/.test(m.title)||m.cs.filter(c=>/^Cược /.test(c.t)).length>=2?'BET: the payout follows each boat\'s true odds; the odds word groups several real odds':'')||(m.cs.some(c=>/^Chia sẻ bí mật/.test(c.t))?'KNOWLEDGE: talk topics follow her taste (jagacts3 p3ChatF); learning what she likes is the play':'');
 const rows=[],exempt=[];
 for(const m of modals){const exm=exWhy(m);if(exm)exempt.push({src:m.tag,title:m.title,why:exm});/* MAIN ROOT-59 ~23:05Z: exempt classes are exempt from LAW 2 only — law 3 (cost-only, hint) still applies */const V=m.cs.map(vec);
  m.cs.forEach((c,i)=>{if(c.dis)return;const v=V[i];const hasCost=Object.keys(v.C).length>0;const hasGain=Object.keys(v.G).length>0||v.words.length>0;
   const base={src:m.tag,pid:m.pid,title:m.title,opt:c.t,ton:[...c.rows.ton,...c.rows.mat,...c.rows.kem.filter(x=>x.c==='r')].map(x=>x.h).join(' · '),duoc:c.rows.duoc.map(x=>x.h).join(' · '),odds:c.odds};
   if(hasCost&&!hasGain){rows.push({...base,flag:'COST-ONLY'});return}
   /* law 3 in play: an event card hides its rows and shows a GỢI Ý line; a real gain must not read «chẳng được gì» there */
   if(hasGain&&/^chẳng được gì/.test(c.hint||'')){rows.push({...base,flag:'HINT-NO-GAIN',duoc:base.duoc+' | gợi ý: '+c.hint});return}
   if(exm)return;for(let j=0;j<m.cs.length;j++){if(j===i||m.cs[j].dis)continue;const w=V[j];
    const better=geq(w.G,v.G)&&Object.keys(w.C).every(k=>(v.C[k]||0)>=w.C[k])&&v.words.every(x=>w.words.includes(x));
    const oddsOk=w.o===99||(v.o!==99&&w.o>=v.o);/* sure ≥ any odds; between ladders the higher word is better */
    const strict=Object.keys(w.G).some(k=>(w.G[k]||0)>(v.G[k]||0))||Object.keys(v.C).some(k=>(v.C[k]||0)>(w.C[k]||0));/* a word-only edge is not «clearly better»: words carry no comparable value */
    if(better&&oddsOk&&strict){rows.push({...base,flag:'DOMINATED',by:m.cs[j].t});break}}})}
 /* hand-check table (not failing): every option whose only gain under Được is a word (no number) while it has a cost — reviewer reads these */
 const wordOnly=[];for(const m of modals){m.cs.forEach(c=>{if(c.dis)return;const v=vec(c);if(Object.keys(v.C).length&&!Object.keys(v.G).length&&v.words.length)wordOnly.push({src:m.tag,title:m.title,opt:c.t,ton:Object.keys(v.C).join(', '),words:v.words.join(' · ')})})}
 const fx=fixtureRows();rows.push(...fx);
 const res={wordOnly,modals:modals.length,pend:pend.length,turns:TURNS,seed:SEED,errors:errs.slice(0,10),rows,exempt,all:modals};
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));
 const co=rows.filter(r=>r.flag==='COST-ONLY'||r.flag==='HINT-NO-GAIN'),dm=rows.filter(r=>r.flag==='DOMINATED'),hn=rows.filter(r=>r.flag==='HINT-NO-GAIN');
 if(MD){console.log('| flag | source | modal | option | Tốn / Mất | Được | odds | better sibling |\n|---|---|---|---|---|---|---|---|');for(const r of rows)console.log(`| ${r.flag} | ${r.src} | ${r.title} | ${r.opt} | ${r.ton} | ${r.duoc} | ${r.odds||''} | ${r.by||''} |`)}
 else for(const r of rows)console.log(r.flag.padEnd(10),'|',r.src,'|',r.title,'|',r.opt,'| tốn:',r.ton,'| được:',r.duoc||'—',r.by?'| by: '+r.by:'');
 for(const e of exempt)console.log('EXEMPT    ','|',e.src,'|',e.title,'|',e.why);
 if(A.includes('--words'))for(const w of wordOnly)console.log('WORD-GAIN ','|',w.src,'|',w.title,'|',w.opt,'| tốn:',w.ton,'| được (words):',w.words);
 console.log(`CHOICE-VALUE ${co.length+dm.length?'FAIL':'PASS'} · ${modals.length} option modals (PEND ${pend.length} builders + ${TURNS} turns) · COST-ONLY ${co.length-hn.length} · HINT-NO-GAIN ${hn.length} · DOMINATED ${dm.length} · exempt ${exempt.length} · word-only gains ${wordOnly.length} (hand-check, --words) · page errors ${errs.length}`);
 if(PLANT){const want={'Plant cost-only':'COST-ONLY','Plant dominated':'DOMINATED','Plant fake green':'COST-ONLY'};const miss=Object.keys(want).filter(n=>!rows.some(r=>r.opt.startsWith(n)&&r.flag===want[n]));
  const extra=rows.filter(r=>/^Plant (free gain|better|accept)/.test(r.opt));console.log(`PLANT ${miss.length||extra.length?'BROKEN':'OK'} · caught ${3-miss.length}/3${miss.length?' · missed: '+miss.join(', '):''}${extra.length?' · wrongly flagged: '+extra.map(r=>r.opt).join(', '):''}`);process.exit(miss.length||extra.length?3:1)}
 if(NUMS){console.log('\n| # | source | option text vs effect | where |\n|---|---|---|---|');NB.forEach((b,i)=>console.log(`| ${i+1} | ${b.src} | ${b.msg} | ${b.detail.replace(/\|/g,'/')} |`));const real=NB.filter(b=>!/Plant (num|c6)/.test(b.detail)),pl=NB.length-real.length;console.log(`ONE-CORE NUMBERS ${real.length?'FAIL':'PASS'} · ${NO} options audited · ${real.length} option(s) print a number their effect does not apply${NPLANT?` · plant ${pl?'CAUGHT':'MISSED'}`:''}`);process.exit(NPLANT&&!pl?3:real.length?1:0)}
 process.exit(co.length+dm.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
