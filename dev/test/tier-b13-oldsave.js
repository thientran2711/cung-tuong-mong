/* E-TIER-B13 gate (law 2 tiers, composed roads 4 → 3 ways): saves made on the LIVE build while a composed-road hồi card (4 ways) is pending load
   clean in the new build: the card shows the hồi's 3 ways (NHẸ · VỪA · NẶNG) with odds read anew, a bạc pledge / a helper refusal saved on the
   4th (removed) way maps to its merged sibling (row om), the card can be chosen, a buổi plays, 0 page errors.
   slot 1 = a premise hồi (s1) of tt_ruong · slot 2 = its climax (x1, odds); and every hồi of every composed chapter (.4–.11) of the 44 roads has
   3 ways + om (the part rows the chapters compose from).
   usage: git show origin/main:index.html > /tmp/old.html && node dev/test/tier-b13-oldsave.js /tmp/old.html */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OLD=process.argv[2];let VER='old';
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p.startsWith('/__ver/')){VER=p.slice(7);return r.end(VER)}
 if(p==='/'||p==='/index.html'){r.setHeader('Content-Type','text/html; charset=utf-8');return fs.createReadStream(VER==='old'?OLD:path.join(ROOT,'index.html')).pipe(r)}
 const f=path.join(ROOT,p.replace(/^\/+/,''));if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,600):''))};
const ROWS=fs.readFileSync(path.join(ROOT,'dev/handover/content/thin/rdseeds_a.md'),'utf8').split('\n').filter(l=>l.startsWith('{')).map(l=>JSON.parse(l));
const PREM=ROWS.find(r=>r.id==='tt_ruong');
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const open=async()=>{const g=await D.openHost(p,URL,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});return g};
 let g=await open();const old=[];
 const CASES=[{s:1,a:'tt_ruong',b:'s1'},{s:2,a:'tt_ruong',b:'x1'}];
 for(const C of CASES){old.push(await g.evaluate(C=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=C.s;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}
   const others=Object.keys(ARC67).filter(id=>ARC67[id].o==='tt'&&id!=='tt_ruong');try{localStorage.setItem('ctm-arcs',JSON.stringify({tt:others}));localStorage.setItem('ctm-tm96','1')}catch(e){}
   window.__forceOrigin='tt';start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;
   if(!S.st.f14||S.st.f14.rd!=='tt_ruong')return{err:'road '+(S.st.f14&&S.st.f14.rd)};
   const c=S.st.ch,i=c.plan.indexOf('o');S.st.ms=null;S.st.M=null;c.i=i-1;c.n=i;chAdvance67(null);Q.length=0;
   let A=S.st.M;if(C.a!=='tt_ruong'){A=newThread67(C.a);S.st.M=A}if(!A||A.a!==C.a)return{err:'thread '+(A&&A.a)};
   A.nb=C.b;A.cur=null;Q.length=0;fireBeat67(A);const q=Q.find(m=>m.pid==='j67');if(!q)return{err:'no card'};
   const b=beatDef67(A,C.b);const O=opts67(A,b);
   /* a pledge (jstory) and a helper refusal (jroad) saved on the 4th way, as an old life could hold them */
   S.pl67={a:A.a,b:C.b,t:thKey67(A),pp:q.pp,i:3,sev:1,due:absB67()+9,t0:absB67(),n:'x',h:'x',cost:1,chap:1};A.hpNo={b:C.b,i:[3]};
   localStorage.setItem(SK(C.s),JSON.stringify(ser()));
   return{name:S.name,a:A.a,b:C.b,n:O.length,names:O.map(o=>o.n),pp:q.pp.o.length}},C))}
 ok(old.every(x=>!x.err&&x.n>=4&&x.pp===x.n),'old build (LIVE): 2 lives saved with a composed hồi card of 4 ways pending '+old.map(x=>x.err||x.a+':'+x.b).join(' '),old);
 ok(errs.length===0,'old build: '+errs.length+' page errors '+(errs[0]||''));errs.length=0;
 await fetch(URL+'__ver/new');g=await open();
 for(const C of CASES){const o=old[C.s-1];if(o.err)continue;
  const ld=await g.evaluate(C=>{const d=loadSlot(C.s);if(!d)return{ok:false};SLOT=C.s;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});render();
   const A=S.st.M;const b=A&&beatDef67(A,C.b);const O=b?opts67(A,b):[];const q=Q.find(m=>m.pid==='j67');
   const R={ok:true,name:S.name,a:A&&A.a,cur:A&&A.cur,n:O.length,om:b&&b.om,rcT:S.rcT,pl:S.pl67&&S.pl67.i,ppo:S.pl67&&S.pl67.pp&&S.pl67.pp.o.length,hp:A&&A.hpNo&&A.hpNo.i,
    card:q?q.opts.filter(x=>x.j67).length:-1,cardN:q?q.opts.slice(0,3).map(x=>x.n):[],odds:q?q.opts.slice(0,3).map(x=>String(x.j67||'').split(' · ')[0]):[]};
   /* choose the NẶNG way on the card (index 2) */
   try{const i=Q.indexOf(q);if(i>0){Q.splice(i,1);Q.unshift(q)}showModal();chooseM(2);R.chose=1}catch(e){R.chose=0;R.ce=e.message}
   R.after=A&&A.cur!==C.b;return R},C);
  const want=(PREM&&C.a==='tt_ruong'?(C.b==='x1'?PREM.x[0]:PREM.s[0]):null);
  const row=(C.b==='x1'?PREM.x[0]:PREM.s[0]).opts.map(x=>x.n),gone=o.names.slice(0,4).find(n=>!row.includes(n.replace(/<[^>]+>/g,'')));
  ok(ld.ok&&ld.name===o.name&&ld.a===C.a&&ld.rcT===2&&JSON.stringify(ld.cardN)===JSON.stringify(row)&&!ld.cardN.includes(gone),`slot ${C.s} (${C.a}:${C.b}) loads: the saved card shows the row's 3 ways NHẸ · VỪA · NẶNG (${ld.cardN.join(' | ')}), the removed way «${gone}» is gone`,ld);
  ok(Array.isArray(ld.om)&&ld.pl===ld.om[3]&&ld.ppo>=3&&ld.ppo<o.pp&&JSON.stringify(ld.hp)===JSON.stringify([ld.om[3]]),`slot ${C.s}: pledge / refusal on the removed 4th way → merged sibling ${ld.om&&ld.om[3]} (om ${JSON.stringify(ld.om)})`,ld);
  if(want)ok(want.om===ld.om.join(""),`slot ${C.s}: om = the writer row's om`,{want:want.om,got:ld.om});
  ok(ld.chose===1&&ld.after,`slot ${C.s}: the NẶNG way can be chosen on the loaded card`,ld);
  if(C.b==='x1')ok(ld.odds.every(w=>/Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững/.test(w)),`slot ${C.s}: climax odds words read anew (${ld.odds.join(' / ')})`,ld)}
 const st=await g.evaluate(()=>{const bad=[];let n=0;for(const road of Object.keys(RDC.def)){for(const id of [road].concat([5,6,7,8,9,10,11].map(k=>road+'_'+k))){const a=ARC67[id];if(!a)continue;
   for(const [k,b] of Object.entries(a.B||{})){n++;if(!b||b.o.length!==3||!Array.isArray(b.om)||b.om.length!==4)bad.push(id+':'+k)}}}return{n,bad:bad.slice(0,5),nb:bad.length}});
 ok(st.n>=44*8*6&&st.nb===0,`new build: ${st.n} hồi of the 44 composed roads (premise + chapters .5–.11) each have 3 ways and an old-way map om`,st);
 ok(errs.length===0,'new build: '+errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`TIER-B13 OLDSAVE: ${fail} FAIL`:'TIER-B13 OLDSAVE: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
