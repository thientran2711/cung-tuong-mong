/* review/newlife-reset (owner bug 17/11 ~03:22Z): nothing of one life may leak into the next one.
   A life is played ~2 years with scar + veil + rash + illness + pregnancy + items + quests, then a NEW life starts (start(), Luân hồi rebirth path,
   load of another slot). Every per-life store (S fields, rivals, every top-level let/var of the built game, the week book / log stores, kmReset hooks)
   is compared with a brand-new life on a fresh page. Leftover = a store that is non-empty / bigger after the old life than on any fresh start.
   Also: no healing / veil line in the new life's logs, S.vl is never a non-veil object, old saves (voice memory in S.vl) load with no leftover.
   usage: node dev/test/newlife-leak.js [url | path in this worktree, e.g. dev/index.html]   (default: the built index.html) → lines + "FAIL n" */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');
const ROOT=path.resolve(__dirname,'../..');
/* top-level declarations of the built game (classic script: readable by name through eval) */
const SRC=fs.readFileSync(path.join(ROOT,'dev/build/all.js'),'utf8');const NAMES=new Set();
for(const m of SRC.matchAll(/^(?:let|var)\s+([^;\n]*)/gm)){let d=0,cur='';const parts=[];for(const ch of m[1]){if('([{'.includes(ch))d++;else if(')]}'.includes(ch))d--;if(ch===','&&d===0){parts.push(cur);cur=''}else cur+=ch}parts.push(cur);
 for(const p of parts){const n=(p.match(/^\s*([A-Za-z_$][\w$]*)/)||[])[1];if(n)NAMES.add(n)}}
for(const m of SRC.matchAll(/^const\s+([A-Za-z_$][\w$]*)\s*=\s*(?:window\.[\w$]+\s*=\s*)?(?:\{|\[|new (?:Map|Set)\b)/gm))NAMES.add(m[1]);
/* allow-list: meant to carry over or not per-life (account / device / UI / co-op seat / caches of static data) — each with why */
const ALLOW={SLOT:'save slot index (account)',tab:'UI tab',quiet:'render flag',KMQ:'emptied by kmReset',kmGen:'life counter (must grow)',kmBusy:'kmReset',
 popIdx:'UI',popMsg:'UI',KAK_C:'act-name key cache (static words)',KIT_FLOOR:'painting floor anchors (static art data)',__rtArt:'route card name -> painting (static)',
 localStorage:'device storage: saves of every slot + account unlocks (meant to carry)',CTM_MISSING_PICS:'dev list of missing paintings (never shown, never saved)',KIT_PICFALL:'dev picture-audit list',
 __stealSt:'bot measure counters',__mlN:'bot measure counters',KMM_HEAD:'picture head cache per src (static art)',KM_PRE:'scene picture preload promises per src (static art, j93 kmPre)',__khN:'khStat measure counters (jkh, like __rtN)',EA_SAY:'emotion-act measure counters (jemoact cnt)',__rtN:'route stat counters (jroute rtStat, measure only)',MOOD_N:'bot measure counters',__exN:'bot measure counters',KPRES_LOG:'test hook ring (80)',__cfdbg:'debug ring (30)',DBG:'debug ring',KIT_BGSZ:'painting sizes (static)',kaLastResult:'registered lifeStore (reset by kmReset); the new life refills it by its own play',KIT_CDNHAVE:'CDN picture manifest (static, filled from the network)',sidN:'servant id counter (only grows, staffInit takes the max; ids stay unique)',WD_BASELUX:'wardrobe base value per tier (static)',KIT_TONE_CACHE:'colour cache',PETC_CACHE:'pet stage tables (static)',KDH_ART:'title-plate art loaded',KFX:'fx engine (textures, app); its log/loses reset by lifeStore',kfkTexP:'fx textures',kmmT:'timer id',EVHOLD:'reset by lifeStore (now holds the new life\'s events)',EVLAST:'reset by lifeStore',KMS:'reset by lifeStore (KMSNAP)',KMSNAP:'reset by lifeStore',FP_C:'reset by lifeStore',RCP_PC:'reset by lifeStore',kitRpMap:'reset by lifeStore',ECON_AT:'reset by lifeStore',KPID_OK:'crisp portrait decoded (image cache)',KFK_VPOOL:'fx video element pool',BTR_KEEP:'buổi art preload',__cmN:'bot measure counters',KIT_PH_SEEN:'dev list of placeholders shown once',kmmT2:'timer id',KSFXP:'sfx cache',Q:'reset by start()',S:'rebuilt by start()',rivals:'rebuilt by start()',NLP:'new-life card itself'};
function serve(){return new Promise(r=>{const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.css':'text/css','.svg':'image/svg+xml','.mp3':'audio/mpeg'};
 const s=http.createServer((q,res)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end()}res.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res)});
 s.listen(0,()=>r({url:`http://127.0.0.1:${s.address().port}/`,close:()=>s.close()}))})}
const FIND=([names,needles])=>{const hit=[];const look=(where,v)=>{let j='';try{j=JSON.stringify(v,(k,x)=>x instanceof Map?[...x]:x instanceof Set?[...x]:(typeof Node!=='undefined'&&x instanceof Node)?undefined:x)||''}catch(e){return}
  if(j.length>3e6)j=j.slice(0,3e6);for(const n of needles)if(n&&j.includes(n))hit.push(where+' has "'+n+'"')};
 for(const n of names){if(n==='S'||n==='rivals')continue;try{const v=(0,eval)(n);if(v&&typeof v==='object')look('g.'+n,v)}catch(e){}}
 look('S',S);try{look('rivals',rivals)}catch(e){}
 /* where in S / rivals (a same-name draw of the new life vs a carried string) */
 const at=[];const walk=(v,pa,d,seen)=>{if(d>9||v==null||at.length>6)return;if(typeof v==='string'){for(const n of needles)if(n&&v.includes(n))at.push(pa+' = '+v.slice(0,70));return}
  if(typeof v!=='object'||(typeof Node!=='undefined'&&v instanceof Node)||seen.has(v))return;seen.add(v);for(const k in v){try{walk(v[k],pa+'.'+k,d+1,seen)}catch(e){}}};
 if(hit.some(h=>/^(S|rivals) has/.test(h))){const sn=new Set();walk(S,'S',0,sn);try{walk(rivals,'rivals',0,sn)}catch(e){}hit.push('at: '+at.join(' | '))}return hit};
const SNAP=names=>{const sh=v=>{if(v==null)return 0;if(typeof v==='function'||v instanceof Node)return null;if(Array.isArray(v))return v.length;if(v instanceof Map||v instanceof Set)return v.size;
  if(typeof v==='object'){try{return Object.keys(v).length}catch(e){return null}}if(typeof v==='boolean')return v?1:0;if(typeof v==='number')return v;if(typeof v==='string')return v.length?1:0;return null};
 const g={};for(const n of names){try{const v=(0,eval)(n);const x=sh(v);if(x!==null)g[n]=x}catch(e){}}
 const s={};for(const k of Object.keys(S)){if(!S[k]||typeof S[k]!=='object')continue;/* numbers / strings of a new S are drawn at random: only stores are compared */const x=sh(S[k]);if(x!==null)s[k]=x}
 const logs=[].concat((S.logs||[]).map(x=>typeof x==='string'?x:JSON.stringify(x)),(S.nightLog||[]).map(x=>typeof x==='string'?x:JSON.stringify(x)));
 let book='';try{book=JSON.stringify(S.wb||S.tl||S.book||'')}catch(e){}
 return {g,s,logs,book,vl:S.vl?Object.keys(S.vl).slice(0,6):null,vlBad:!!(S.vl&&!S.vl.k),invBad:(S.inv||[]).filter(e=>e&&typeof e==='object'&&!e.k).length,
  win:Object.keys(window).filter(k=>{try{const v=window[k];return v&&typeof v==='object'&&!(v instanceof Node)&&!(v instanceof Window)}catch(e){return false}}).reduce((o,k)=>{const x=sh(window[k]);if(x!==null)o[k]=x;return o},{})}};
(async()=>{let srv=null,URL=process.argv[2];if(!URL||!/^http/.test(URL)){srv=await serve();URL=srv.url+(URL||'index.html')}
 const b=await chromium.launch();let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info!==undefined?' · '+JSON.stringify(info).slice(0,900):''))};
 const page=async()=>{const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&window.__ctmBuilt,null,{timeout:0});await p.waitForTimeout(2500);p.errs=errs;return p};
 const newLife=async(p,how)=>p.evaluate(how=>{const clr=()=>{Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}};
   try{$("title").hidden=true}catch(e){}
   if(how==='rebirth'){S.dead=true;S.why='bệnh'}start();
   try{const ok=document.querySelector('button[data-nl="ok"]');if(ok)ok.click()}catch(e){}clr();return {nlp:typeof NLP!=='undefined'&&!!NLP}},how);
 const accept=async p=>{for(let i=0;i<30;i++){const r=await p.evaluate(()=>{const s=[...document.querySelectorAll('#kroul button,.kroul button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click();
   const ok=document.querySelector('button[data-nl="ok"]');if(ok){ok.click();return 1}return typeof NLP!=='undefined'&&NLP?0:2});if(r)break;await p.waitForTimeout(250)}
   await p.waitForTimeout(800);await p.evaluate(()=>{Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}})};
 const names=[...NAMES];
 /* fresh baselines: two brand-new lives on fresh pages (noise band) */
 const base=[];for(let i=0;i<3;i++){const p=await page();await newLife(p,'start');await accept(p);
  await p.evaluate(()=>{for(let i=0;i<4;i++){try{Q.length=0;nextBuoi()}catch(e){}}Q.length=0});base.push(await p.evaluate(SNAP,names));await p.context().close()}
 /* the old life: 2 years with everything per-life switched on */
 const p=await page();await newLife(p,'start');await accept(p);
 const play=await p.evaluate(()=>{const out={err:[]};const clr=()=>{Q.length=0;S.mg=null;try{document.getElementById('modal').hidden=true}catch(e){}};
  const tryi=(n,f)=>{try{f()}catch(e){out.err.push(n+': '+e.message.slice(0,80))}};
  tryi('scar',()=>{S.scar={sev:2,d:12,veil:0,pg:0,need:40,w:wk()}});
  tryi('veil',()=>{if(typeof vlKey==='function'){S.inv.push({k:vlKey(3,1)});vlWear(S,S.inv.length-1)}});
  tryi('rash',()=>{if(typeof rashGive==='function')rashGive(S,3,'thử')});
  tryi('pz',()=>{if(typeof pzGive==='function')pzGive(S,2,'thử',null)});
  tryi('ill',()=>{S.ill={k:'phong',w:wk(),d:3};S.asthma=true});
  tryi('preg',()=>{S.preg=3;S.fert=2});
  tryi('items',()=>{for(const k of Object.keys(IT).slice(0,12))S.inv.push({k})});
  const w0=wk();for(let i=0;i<3000&&wk()<w0+100;i++){clr();S.suc=100;S.dead=false;S.why=null;S.tho=99;try{if(i%40===5){S.scar=S.scar||{sev:2,d:12,veil:0,pg:0,need:400,w:wk()}}S.buoi=0;endTurn()}catch(e){if(out.err.length<12)out.err.push('turn '+e.message.slice(0,80))}}
  clr();out.wk=wk();out.vl=S.vl&&S.vl.k;out.logs=(S.logs||[]).length;return out});
 ck('old life played ~2 years',play.wk>=90,play);
 const old=await p.evaluate(SNAP,names);
 /* fingerprints of the old life: her name + the names of her rivals (a new life draws new ones; checked against it below) */
 /* mark every person object of the old life (non-enumerable), then walk every top-level store of the new life for a reference to one */
 await p.evaluate(()=>{const mk=o=>{try{if(o&&typeof o==='object'&&!o.__ol)Object.defineProperty(o,'__ol',{value:1})}catch(e){}};mk(S);(rivals||[]).forEach(mk);mk(S.maid);mk(S.emp);(S.kids||[]).forEach(mk);mk(S.thO);Object.values(S.court||{}).forEach(mk)});
 const REFS=names=>{const hit=[];const seen=new WeakSet();const walk=(v,path,d)=>{if(!v||typeof v!=='object'||d>5||hit.length>20)return;if(typeof Node!=='undefined'&&v instanceof Node)return;if(seen.has(v))return;seen.add(v);
   if(v.__ol){hit.push(path);return}let ks=[];try{ks=v instanceof Map?[...v.values()]:v instanceof Set?[...v]:Array.isArray(v)?v.slice(0,400):Object.keys(v).slice(0,400).map(k=>{try{return v[k]}catch(e){return null}})}catch(e){return}
   ks.forEach((x,i)=>walk(x,path+'.'+i,d+1))};
  for(const n of names){if(n==='S'||n==='rivals')continue;try{walk((0,eval)(n),n,0)}catch(e){}}walk(S,'S',0);try{walk(rivals,'rivals',0)}catch(e){}
  for(const k of Object.keys(window)){if(/^(S|rivals|webkit|on)/.test(k))continue;try{const v=window[k];if(v&&typeof v==='object'&&!(v instanceof Window))walk(v,'window.'+k,0)}catch(e){}}return [...new Set(hit)]};
 const oldNames=await p.evaluate(()=>[S.name,...(rivals||[]).map(v=>v&&v.name)].filter(x=>typeof x==='string'&&x.length>=4));
 const results={};
 for(const how of ['start','rebirth','load']){
  if(how==='load'){/* save the old life into slot 3 (by the game itself), make a new life, load slot 2 ← a fresh save, compare */
   await p.evaluate(()=>{try{SLOT=3;save()}catch(e){}});}
  await newLife(p,how);await accept(p);
  if(how==='load'){await p.evaluate(()=>{try{SLOT=2;save()}catch(e){}});await p.evaluate(()=>{try{SLOT=3;const d=loadSlot(3);if(d){kmReset();quiet=true;deser(d);quiet=false}}catch(e){}});
   await p.evaluate(()=>{try{const d=loadSlot(2);SLOT=2;kmReset();quiet=true;deser(d);quiet=false;Q.length=0}catch(e){}})}
  await p.evaluate(()=>{for(let i=0;i<4;i++){try{Q.length=0;nextBuoi()}catch(e){}}Q.length=0;
   /* the owner's case: the first spoken line of the new life (kLine) + the veil's month / week checks */
   try{kLine('__newlife_probe',['một','hai','ba'])}catch(e){}try{if(typeof vlSync==='function')vlSync(S)}catch(e){}try{S.buoi=0;endTurn()}catch(e){}Q.length=0});
  const n=await p.evaluate(SNAP,names);results[how]=n;if(how==='start')console.log('LIFE_STORES',await p.evaluate(()=>window.LIFE_STORES||null));
  /* every person of the NEW life (servants, officials, family… draw from the same name pools: a same-name draw is not a leak; object leaks are judged by the reference walk) */
  const curNames=await p.evaluate(()=>[S.name,...(rivals||[]).map(v=>v&&v.name),...(typeof kpPeople==='function'?kpPeople().map(x=>x[0]):[]),...(()=>{/* + every .name field inside the new S (court officials S.trieu, family…) */const o=[],sn=new Set();const w=(v,d)=>{if(d>8||!v||typeof v!=='object'||sn.has(v)||(typeof Node!=='undefined'&&v instanceof Node))return;sn.add(v);if(typeof v.name==='string')o.push(v.name);for(const k in v){try{w(v[k],d+1)}catch(e){}}};w(S,0);return o})()].filter(x=>typeof x==='string'&&x.length>=4));
  const needles=oldNames.filter(x=>!curNames.some(c=>c.includes(x)||x.includes(c)));
  const fp=(await p.evaluate(FIND,[names,needles])).filter(h=>!/^g\.(KAK_C|KPRES_LOG|__cfdbg|CTM_MISSING_PICS|KIT_PH_SEEN|DBG|ST)\b/.test(h));
  const refs=(await p.evaluate(REFS,names)).filter(h=>!/^(KMS|window\.KPRES_LOG|__cfdbg)/.test(h));
  ck(`${how}: no store of the new life still points at a person of the old life`,refs.length===0,refs.slice(0,12));
  ck(`${how}: no name of the old life anywhere in the new life's state`,fp.length===0,fp.slice(0,12));
  const leak=[];const cmp=(sec,k)=>{const v=n[sec][k];if(v==null||ALLOW[k])return;const mx=Math.max(...base.map(x=>x[sec][k]==null?0:x[sec][k]));
   const o=old[sec][k];/* r1: 3 fresh lives are a thin noise band (deck, last picture… depend on the draw): a store empty on every fresh life must stay empty, else it may grow to 1.5x+2 */const lim=sec==='s'?mx*1.3+2:mx===0?0:mx*1.5+2;if(typeof v==='number'&&v>lim&&o!=null&&o>=v&&v>0&&!(sec==='g'&&/^(kmGen)$/.test(k)))leak.push(`${sec}.${k}: new ${v} > fresh max ${mx} (old life ${o})`)};
  for(const sec of ['g','win'])for(const k of Object.keys(n[sec]))cmp(sec,k);
  /* S is a NEW object from start() / deser(): its stores differ by origin + chance, so their sizes are reported, not judged (the person-reference and old-name checks above judge S) */
  {const L0=leak.length;for(const k of Object.keys(n.s))cmp('s',k);const sL=leak.splice(L0);if(sL.length)console.log('info '+how+' S store sizes vs fresh (origin/chance): '+sL.join(' | '))}
  ck(`${how}: no store bigger than on a brand-new life`,leak.length===0,leak);
  const heal=n.logs.filter(x=>/đã lành|tháo mạng|mạng che/.test(x));ck(`${how}: no healing / veil line in the new life`,heal.length===0,heal.slice(0,4));
  ck(`${how}: S.vl is a veil or nothing; no foreign object in the chest`,!n.vlBad&&!n.invBad,{vl:n.vl,inv:n.invBad});
 }
 ck('no page errors',p.errs.length===0,p.errs.slice(0,6));
 console.log('names scanned',names.length);
 await b.close();if(srv)srv.close();console.log('FAIL '+fail);process.exit(fail?1:0)})();
