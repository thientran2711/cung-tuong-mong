/* HARD-LOCK SCAN (review/hardlock-choice; START_CORE laws 2 + 3 + 11 «fix the whole group»).
   A HARD LOCK = a choice card whose every road she cannot take now (greyed: cost over her purse, rank, item, evidence, night taken, temper)
   and that has no ✕ / leave road: the game stands still. FIXER #9 found one live (j68c-serv-022 at 46 bạc).
   What it walks (the same sources as dev/tools/choice-value-scan.js, plus every j68 template): (1) every PEND dilemma builder (two pp
   variants); (2) every EV6 j68 template, old 90 and composed j68c, built with its own cast (s.pp()); (3) MF7 merits, FV7 festivals, FX7
   contests, every WORLD event card, the TSA summons; (4) N buổi steps (nextBuoi, as the robots) catching every card a buổi pushes (a road she can take is chosen so the chain goes on).
   Each card is drawn through the REAL showModal (every wrapper: kit grey, bạc, j75 night lock, jemoact temper, jnolock) at each test purse
   (default 0 and 46 bạc; Sức / Danh as her life has them) and judged on the DOM she sees: open roads (.opt not disabled) + the kit ✕ closer.
   Static part: every seed file (j68sd / j7sd / j70sd / j71sd / j72sd / jkysd / jwsd) — option sets whose EVERY option costs bạc (lockable
   when poor unless the engine guards them).
   usage: node dev/tools/hardlock-scan.js [--turns N] [--seed S] [--purse 0,46] [--md] [--out f.json]   (from the repo root of a BUILT site)
   exit 1 when any HARD LOCK is found, 0 when clean. Last line = one-line summary. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const D=require('../test/lib/device');
const A=process.argv.slice(2);const arg=(k,d)=>A.includes(k)?A[A.indexOf(k)+1]:d;
const TURNS=+arg('--turns',30),SEED=+arg('--seed',7),OUT=arg('--out',null),MD=A.includes('--md');const PURSE=String(arg('--purse','0,46')).split(',').map(Number);
const ROOT=path.resolve(process.cwd());
/* static: seed option sets where every option costs bạc */
function staticSeeds(){const dir=path.join(ROOT,'dev/build');const R=[];
 const costsBac=o=>!!o&&((o.loss&&o.loss.bac>0)||(o.cost&&o.cost.bac>0)||(o.c&&o.c.bac<0)||(o.fx&&o.fx.bac<0));
 const walk=(x,id,where)=>{if(!x||typeof x!=='object')return;
  for(const k of ['stances','opts','options','picks','o','ch','choices']){const v=x[k];if(!v||typeof v!=='object')continue;const L=Array.isArray(v)?v:Object.values(v);
   if(L.length>=2&&L.every(o=>o&&typeof o==='object')&&L.every(costsBac))R.push({id,where:where+'.'+k,n:L.length})}
  for(const k of Object.keys(x))if(x[k]&&typeof x[k]==='object')walk(x[k],id,where+'.'+k)};
 const files=fs.readdirSync(dir).filter(f=>/^j\w*sd\.js$/.test(f));const tot={};
 for(const f of files){const src=fs.readFileSync(path.join(dir,f),'utf8');const m=src.match(/const\s+(\w+)\s*=\s*\[/);if(!m)continue;let L=[];
  try{L=new Function(src+';return '+m[1])()}catch(e){continue}tot[f]=L.length;for(const s of L)walk(s,s.id||'?',f)}
 return{rows:R,tot}}
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'ipadAir',{deviceScaleFactor:1,reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 const g=await D.openHost(p,srv.url);
 await g.evaluate(sd=>{let seed=sd;Math.random=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},SEED);
 await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;$("modal").hidden=true;
  /* a mid-life consort, so most casts find their people (as dev/test/j68c-play.js) */
  S.rank=Math.max(S.rank||0,3);if(!S.maid&&typeof newMaid==='function')S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4&&typeof fillStaff==='function')fillStaff(S,true);
  window.__HL=[];window.__hlKeep=(m,tag)=>{if(m&&m.opts&&m.opts.length)window.__HL.push({m,tag})};
  /* judge one card at one purse: through the real showModal, on the DOM */
  window.__hlJudge=(m,bac)=>{const b0=S.bac,e0=window.__e68off,q0=window.__bot;S.bac=bac;window.__e68off=1;window.__bot=1;/* jdayq (solo new-day order) holds a card back when not a bot: off while judging *//* the j68 scheduler (evGate) must not hold the card back */Q.length=0;Q.push(m);let r=null;try{showModal();const M=$('modal');const bs=[...M.querySelectorAll('.opts > button.opt')];
    if(M.hidden)return (S.bac=b0,window.__e68off=e0,window.__bot=q0,{hidden:1,dead:!!S.dead});const en=bs.filter(x=>!x.disabled).length;const x=typeof kitModalCloser==='function'&&!!kitModalCloser();
    r={en,x,n:bs.length,why:(m.opts||[]).map(c=>c&&c.off&&c.off.why||((c&&c.fx&&c.fx.bac&&bac+c.fx.bac<0)?'bạc '+c.fx.bac:'')).slice(0,6),names:(m.opts||[]).map(c=>String(c&&c.n||'').replace(/<[^>]+>/g,'').slice(0,50)).slice(0,6)}}catch(e){r={err:String(e).slice(0,120)}}
   S.bac=b0;window.__e68off=e0;window.__bot=q0;Q.length=0;$('modal').hidden=true;return r}});
 await g.addStyleTag({content:'#kroul,#kroulw,.kmov,#kmrew{display:none!important}'});
 /* harvest: build cards (not shown) */
 const H=await g.evaluate(()=>{const keep=window.__hlKeep;const P0=window.__HL;let n={pend:0,e68:0,e68skip:0,jobs:0};window.__e68off=1;
  const asM=(d,t)=>({t:t||'Việc khó xử',h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,mustChoose:d.mustChoose});
  for(const id of Object.keys(PEND)){if(/^e68/.test(id))continue;for(const pp of [{},{q:3,vp:0}]){let d=null;try{d=mkP(id,pp)}catch(e){}if(d&&d.o&&d.o.length){keep(asM(d,'PEND '+id),'pend:'+id);n.pend++}}}
  for(const id of Object.keys(E68I)){const s=E68I[id];let pp=null;for(let t=0;t<3&&!pp;t++){try{pp=s.pp?s.pp():{}}catch(e){pp=null}}if(!pp){n.e68skip++;continue}
   pp.vi=0;let d=null;try{d=mkP('e68'+id,pp)}catch(e){}if(d&&d.o&&d.o.length){keep(asM(d,s.t||FAM6[s.fam]),'e68:'+id);n.e68++}else n.e68skip++}
  const pull=tag=>{while(Q.length){const m=Q.shift();keep(m,tag)}};
  const vl=o=>Array.isArray(o)?o.length:o&&o.v?o.v.length:0;
  try{for(const k of Object.keys(MF7))for(let i=0;i<vl(MF7[k]);i++){let pp=null;try{pp=MF7[k].pp?MF7[k].pp():{}}catch(e){}const d=mkP('j71m',Object.assign({},pp||{},{k,vi:i}));if(d&&d.o){keep(asM(d,'merit'),'mf7:'+k);n.jobs++}}}catch(e){}
  try{for(const k of Object.keys(FV7))for(let i=0;i<vl(FV7[k]);i++){let pp=null;try{pp=typeof fPP7==='function'?fPP7(k,i):null}catch(e){}for(const id of ['j71f','j71i']){let d=null;try{d=mkP(id,Object.assign({},pp||{},{k,vi:i}))}catch(e){}if(d&&d.o){keep(asM(d,'festival'),'fv7:'+k);n.jobs++}}}}catch(e){}
  try{for(const k of Object.keys(FX7)){const d=mkP('j71x',{kk:k});if(d&&d.o){keep(asM(d,'contest'),'fx7:'+k);n.jobs++}}}catch(e){}
  try{const EVD=window.WORLD_EVD||{};for(const k of Object.keys(EVD))if(EVD[k]&&EVD[k].card){const w={k,id:'scan-'+k,x:{f:['me'],who:S.id},cause:'(scan)',txt:'',t:0};let c=null;try{c=EVD[k].card(w)}catch(e){}const o=c&&(c.opts||c.o);if(o&&o.length){keep({t:c.t,h:c.h,opts:o,who:c.who},'world:'+k);n.jobs++}}}catch(e){}
  try{for(const k of Object.keys(TSA))if(typeof TSA[k]==='function'&&TSA[k].length===0&&k!=='summonMe'){Q.length=0;try{TSA[k]()}catch(e){}pull('ts:'+k);n.jobs++}}catch(e){}
  /* PLANT (self-test, always on): a card whose two roads both cost bạc, no ✕ — must be caught on LIVE (lock) */
  keep({t:'Plant',h:'<p>plant</p>',opts:[{n:'Plant A',fx:{bac:-500,duc:2},x:''},{n:'Plant B',fx:{bac:-300,danh:2},x:''}]},'plant');
  window.__e68off=0;Q.length=0;return n});
 /* (4) end-of-turn passes: every card a turn pushes */
 /* judge */
 if(process.env.HLDBG)console.log('DBG plant',JSON.stringify(await g.evaluate(()=>{const x=window.__HL.find(h=>h.tag==='plant');return [window.__hlJudge(x.m,0),$('modal').hidden,Q.length]})));
 const locks=[];const hid={n:0,dead:0,first:null};let judged=0;
 const judgeFrom=async(from)=>{const tot=await g.evaluate(()=>window.__HL.length);const BATCH=60;
 for(let s=from;s<tot;s+=BATCH){const part=await g.evaluate(([s,B,P])=>{const out=[];for(let i=s;i<Math.min(s+B,window.__HL.length);i++){const {m,tag}=window.__HL[i];
    for(const bac of P){const r=window.__hlJudge(m,bac);if(r&&r.hidden){out.push({hidden:1,dead:r.dead,tag});break}if(r&&!r.err&&r.n>0&&r.en===0&&!r.x){out.push({tag,title:String(m.t||'').replace(/<[^>]+>/g,'').slice(0,40),pid:m.pid||'',bac,forced:!!m.mustChoose,names:r.names,why:r.why});break}}}return out},[s,BATCH,PURSE]);for(const x of part){if(x.hidden){hid.n++;if(x.dead)hid.dead++;if(!hid.first)hid.first=x.tag;(hid.L=hid.L||[]).push(x.tag)}else locks.push(x)}}
 judged=tot;return tot};
 await judgeFrom(0);
 let turnCards=0;for(let i=0;i<TURNS;i++){await g.evaluate(()=>{try{if(!S||S.dead)start();Q.length=0;$('modal').hidden=true;if(typeof nextBuoi==='function')nextBuoi();else endTurn()}catch(e){}});
  for(let w=0;w<10;w++){await p.waitForTimeout(60);const r=await g.evaluate(i=>{let k=0,g=0;while(Q.length&&g++<40){const m=Q[0];
     if(m&&m.opts&&m.opts.length&&!m.nl){window.__hlKeep(Object.assign({},m,{opts:m.opts.map(c=>Object.assign({},c))}),'turn'+i);k++;
      let j=m.opts.findIndex(c=>typeof kitTakeable==='function'?kitTakeable(c,m):c&&!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));try{if(j<0)Q.shift();else chooseM(j)}catch(e){if(Q[0]===m)Q.shift()}}
     else{try{closeModal()}catch(e){if(Q[0]===m)Q.shift()}}if(S.dead)break}$('modal').hidden=true;return [k,Q.length]},i);turnCards+=r[0];if(!r[1])break}}
 await judgeFrom(judged);
 if(process.env.HLDBG)console.log('DBG turns',JSON.stringify(await g.evaluate(()=>(window.__hlDbg||[]).slice(0,30))));
 await b.close();srv.close();
 const plant=locks.filter(l=>l.tag==='plant');for(const x of plant)locks.splice(locks.indexOf(x),1);
 const ST=staticSeeds();
 const fam=t=>t.replace(/^(e68:c:j68c-[a-z]+|e68|pend|turn|mf7|fv7|fx7|world|ts)[:\d].*$/,'$1');const byFam={};for(const l of locks){const f=/^e68:c:/.test(l.tag)?'j68c composed':/^e68:/.test(l.tag)?'j68 old':l.tag.replace(/[:\d].*$/,'');byFam[f]=(byFam[f]||0)+1}
 const res={cards:judged,purses:PURSE,harvest:H,turnCards,locks,byFam,static:ST,errors:errs.slice(0,10)};if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));
 if(MD){console.log('| source | card | purse | forced | roads (why held back) |\n|---|---|---|---|---|');for(const l of locks)console.log(`| ${l.tag} | ${l.title} | ${l.bac} | ${l.forced?'yes':''} | ${l.names.map((n,i)=>n+(l.why[i]?' ['+l.why[i]+']':'')).join(' · ')} |`)}
 else for(const l of locks)console.log('HARD-LOCK |',l.tag,'|',l.title,'| bạc',l.bac,'|',l.names.map((n,i)=>n+(l.why[i]?' ['+l.why[i]+']':'')).join(' · '));
 console.log('not drawn (a wrapper held the card back; not judged):',(hid.L||[]).join(' '));
 console.log('by family:',JSON.stringify(byFam));
 console.log(`static seeds: ${ST.rows.length} option sets where every option costs bạc (${Object.entries(ST.tot).map(([f,n])=>f+' '+n).join(', ')})${ST.rows.length?' — e.g. '+ST.rows.slice(0,6).map(r=>r.id).join(', '):''}`);
 console.log(`PLANT (2 roads, both bạc over her purse, no ✕): ${plant.length?'LOCKED on this build':'not locked on this build (guarded)'}`);
 console.log(`HARDLOCK-SCAN ${locks.length?'FAIL':'PASS'} · ${judged} choice cards (PEND ${H.pend} + j68 ${H.e68} [${H.e68skip} not castable] + gated ${H.jobs} + ${turnCards} from ${TURNS} turns) × purses ${PURSE.join('/')} bạc · HARD LOCKS ${locks.length} · not drawn ${hid.n} (dead ${hid.dead}, first ${hid.first}) · page errors ${errs.length}`);
 process.exit(locks.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
