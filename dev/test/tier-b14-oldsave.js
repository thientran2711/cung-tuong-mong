/* E-TIER-B14 old-save gate (law 2 tier convert of j7c / j68c / j71c / jworldc / j72c; reviewer N1 + the e-tier-b13 lesson: EVERY old way by name).
   On the LIVE build: for up to N seeds of each 4-way family a card is made from the live roster and saved PENDING (Q, ser()), with its 4 old way names.
   In the new build each save is loaded (deser) and checked BY NAME: the card shows BAL.<fam>.tier.length ways; every old way whose stance was kept
   is on the card under its own name; the merged-away way is gone and its om sibling is on the card; 0 page errors.
   jworldc (a window open across the update): an NPC is put under EVERY old stance id of a seed's round (w.x.wc.r, as an old save holds it) →
   the end line names each NPC beside the text of its own stance, or of the om sibling for the merged one (wcOm).
   j72c (no way removed; ways re-ordered): every pick step keeps the SAME set of way names as LIVE (data, all 256 seeds) → a saved favour's step stays valid.
   MUTANTS (env MUT): wcOm=id (no mapping) · wcOm=first (always the first stance) · j7c4 (j7c card still wants 4 ways) — each must FAIL.
   usage: git show <live sha>:index.html > /tmp/old.html && node dev/test/tier-b14-oldsave.js /tmp/old.html [N=12] */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OLD=process.argv[2];const N=+(process.argv[3]||12);const MUT=process.env.MUT||'';let VER='old';
let NEWHTML=fs.readFileSync(path.join(ROOT,'index.html'),'utf8');
if(MUT==='wcOm=id')NEWHTML=NEWHTML.replace('function wcOm(sd,k){return sd.stances[k]?k:','function wcOm(sd,k){return sd.stances[k]?k:null;return ');
if(MUT==='wcOm=first')NEWHTML=NEWHTML.replace('function wcOm(sd,k){return sd.stances[k]?k:','function wcOm(sd,k){return Object.keys(sd.stances)[0];return ');
if(MUT==='j7c4')NEWHTML=NEWHTML.replace('if(ids.length!==BAL.j7c.tier.length)return null;','if(ids.length!==4)return null;');
if(MUT&&NEWHTML===fs.readFileSync(path.join(ROOT,'index.html'),'utf8')){console.log('FAIL mutant not applied '+MUT);process.exit(2)}
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.startsWith('/__ver/')){VER=p.slice(7);return r.end(VER)}
 if(p==='/'||p==='/index.html'){r.setHeader('Content-Type','text/html; charset=utf-8');return VER==='old'?fs.createReadStream(OLD).pipe(r):r.end(NEWHTML)}
 const f=path.join(ROOT,p.replace(/^\/+/,''));if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,600):''));return c};
const cnt={};const tally=(f,c)=>{const t=cnt[f]=cnt[f]||{ok:0,fail:0};c?t.ok++:t.fail++};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(VER+': '+e.message));
 const open=async()=>{const g=await D.openHost(p,URL,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});return g};
 let g=await open();
 /* ---- LIVE: pending cards of the 4-way families, saved ---- */
 const saves=await g.evaluate(N=>{try{store.set(NL_KEY,null)}catch(e){}document.getElementById('title').hidden=true;SLOT=3;start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;S.srv=null;S.rank=Math.max(S.rank||0,3);S.bac=Math.max(S.bac||0,999);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);
  const NET=[...new Set([].concat(...[J7SEEDS,J68SEEDS,J71SEEDS].flat().map(r=>Object.values(r.roles||{}).flatMap(x=>[].concat(x['nết']||[],x['lòng']||[])))))];const tr0=tr6;tr6=o=>NET;/* every nết fits: the cast is real people, the test reaches many seeds */
  const out=[];const save=(fam,sid,card,extra)=>{Q.length=0;/* a queue card as the game pushes it (pushDil): opts, not the raw builder's o */const q=card.pid?{t:'Việc khó xử',h:card.t,opts:card.o,who:card.who,pid:card.pid,pp:card.pp}:card;Q.push(q);const names=q.opts.map(o=>o.n);out.push(Object.assign({fam,sid,names,s:JSON.stringify(ser())},extra||{}));Q.length=0};
  try{let n=0;for(const x of j7cReady()){if(n>=N)break;const d=mkP("j7c",{sid:x.sd.id,c:x.C});if(d){save('j7',x.sd.id,d,{ids:Object.keys(x.sd.stances)});n++}}}catch(e){out.push({err:'j7 '+e.message})}
  try{let n=0;for(const s of E68){if(n>=N)break;if(!s.cs)continue;let pp=null;try{pp=s.pp&&s.pp()}catch(e){}if(!pp)continue;pp=Object.assign({vi:0},pp);const d=mkP("e68"+s.id,pp);if(d){save('j68',s.cs,d,{pid:"e68"+s.id,ids:Object.keys(J68SEEDS.find(r=>r.id===s.cs).stances)});n++}}}catch(e){out.push({err:'j68 '+e.message})}
  try{let n=0;const X_=window.J71C_X,SD=window.J71C_SEEDS;const L=liveRivals(true);for(const id in SD.CI){if(n>=N)break;const sd=SD.CI[id];const fest=sd.fest==="*"?Object.keys(FV7)[0]:sd.fest;
    const c={id,b:(sd.roles||{}).B?L[n%L.length].id:null};let m=null;try{m=X_.compCard(fest,c)}catch(e){}if(m){save('j71',id,m,{ids:Object.keys(sd.stances)});n++}}}catch(e){out.push({err:'j71 '+e.message})}
  tr6=tr0;return out},N);
 ok(saves.length&&saves.every(x=>!x.err),'LIVE saves '+saves.length,saves.filter(x=>x.err));
 const liveW=await g.evaluate(()=>Object.fromEntries(Object.entries(window.WC_SEEDS||{}).map(([id,sd])=>[id,Object.fromEntries(Object.entries(sd.stances).map(([k,s])=>[k,s.text]))])));
 const live72=await g.evaluate(()=>J72SEEDS.map(r=>[r.id,(r.steps||[]).map(s=>s.t==='pick'?s.opts.map(o=>o.n).sort():null)]));
 /* ---- new build ---- */
 await fetch(URL+'__ver/new');g=await open();
 for(const s of saves){if(s.err)continue;const R=await g.evaluate(s=>{try{store.set(NL_KEY,null)}catch(e){}document.getElementById('title').hidden=true;deser(JSON.parse(s.s));
   const m=Q.find(q=>q&&(q.pid===(s.pid||'j7c')||q.rk==='j71cComp'))||Q[0];const fam=s.fam==='j7'?'j7c':s.fam==='j68'?'j68c':'j71c';
   const sd=s.fam==='j7'?J7SEEDS.find(r=>r.id===s.sid):s.fam==='j68'?J68SEEDS.find(r=>r.id===s.sid):window.J71C_SEEDS.CI[s.sid];
   return{n:m?(m.opts||[]).map(o=>o.n):null,T:BAL[fam].tier.length,om:sd&&sd.om,ids:sd&&Object.keys(sd.stances)}},s);
  const tag=`${s.fam} ${s.sid}`;let good=ok(R.n&&R.n.length===R.T,`${tag}: pending card loads with ${R.T} ways`,R);
  if(R.n&&R.om)s.ids.forEach((id,i)=>{const nm=s.names[i];const kept=R.ids.includes(id);
   const c=kept?R.n.includes(nm):(!R.n.includes(nm)&&R.n.includes(s.names[s.ids.indexOf(R.om[id])]));good=ok(c,`${tag} old way ${i} «${nm}»${kept?' kept':' merged → «'+s.names[s.ids.indexOf(R.om[id])]+'»'}`,R)&&good});
  else good=false;tally(s.fam,good)}
 /* ---- jworldc: an NPC under every OLD stance id of the round ---- */
 const W=await g.evaluate(LW=>{const X_=window.WC_X,out=[];const L=liveRivals(true).filter(v=>v&&v.alive);let w0=null;try{w0=(window.worldWin()||[])[0]}catch(e){}
  for(const [id,old] of Object.entries(LW)){const sd=window.WC_SEEDS[id];if(!sd)continue;const ids=Object.keys(old);if(ids.length!==4){out.push({id,err:'live seed not 4'});continue}
   const r={},who={};ids.forEach((k,i)=>{const v=L[i%L.length];r[k]=[sd.scope==='srv'?('Người hầu '+i):window.WORLD_X.pid(v)];who[k]=sd.scope==='srv'?('Người hầu '+i):v.name});
   if(new Set(Object.values(who)).size<4){out.push({id,err:'roster'});continue}
   const w={id:-1,k:sd.k,x:{wc:{id,r}}};let t="";try{t=X_.wcEnd(w)}catch(e){t='ERR '+e.message}
   out.push({id,t,who,old,om:sd.om,kept:Object.keys(sd.stances)})}return out},liveW);
 for(const x of W){if(x.err){ok(false,'wc '+x.id+' '+x.err);tally('wc',false);continue}let good=true;
  for(const [k,txt] of Object.entries(x.old)){const kk=x.kept.includes(k)?k:x.om&&x.om[k];const want=kk&&x.old[kk];
   /* the NPC's name sits in the «… : «text»» segment of the stance it now reads */
   const seg=x.t.split('; ').find(z=>z.includes(x.who[k]))||'';const c=!!want&&seg.includes(x.who[k])&&seg.includes(want.split(/\{[^}]+\}/).map(z=>z.trim()).sort((u,v)=>v.length-u.length)[0].slice(0,14));
   good=ok(c,`wc ${x.id} old stance ${k}${x.kept.includes(k)?'':' merged → '+kk}: ${x.who[k]}`,{seg:seg.slice(0,200)})&&good}
  tally('wc',good)}
 /* ---- j72c: same way names per pick step (order may change) ---- */
 const new72=await g.evaluate(()=>J72SEEDS.map(r=>[r.id,(r.steps||[]).map(s=>s.t==='pick'?s.opts.map(o=>o.n).sort():null)]));
 const NM=Object.fromEntries(new72);for(const [id,st] of live72){const c=JSON.stringify(NM[id])===JSON.stringify(st);ok(c,'j72 '+id+' pick ways unchanged by name');tally('j72',c)}
 ok(errs.length===0,'page errors '+errs.length+' '+(errs[0]||''));
 console.log('LIVE saves per family: '+JSON.stringify(saves.reduce((a,x)=>(a[x.fam||'err']=(a[x.fam||'err']||0)+1,a),{}))+' · per family (sets ok / fail): '+JSON.stringify(cnt));
 console.log(fail?`TIER-B14 OLDSAVE${MUT?' [MUT '+MUT+']':''}: ${fail} FAIL`:`TIER-B14 OLDSAVE${MUT?' [MUT '+MUT+']':''}: ALL PASS`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
