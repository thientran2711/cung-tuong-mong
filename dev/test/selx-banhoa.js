/* D-BANHOA-SOLO (review/d-banhoa-solo): the Ban hoa audition gate (laws 1 / 4 / 7 / 11).
   1. KIND: a tú nữ's board mark reads her level on the board KIND for every plain art name the game sets (S.selx.art «cam» / «ky» / «vu» / «nau» …) — never level 0.
   2. ONE BUILDER: the contest (jselxday selxContestRun) and the told chance (jselx selxOddsP) build the girls' tests with the same selxDaysT; a bow judges the
      girls on selxArtAll() (her best board kind), the kind her own bow mark is read on.
   3. HONEST ODDS: with every mark known, selxOddsP == the share of real contests she wins (400 contests on the game's Math.random, same marks) within 10 points,
      on several fresh lives (bow and board).
   4. NO SIDE EFFECT: selxOddsP changes nothing in the save (S.selx2, the girls' marks) and leaves Math.random as it was.
   5. FAMILY SCAN (law 11): every selxContest( call site in dev/build passes tests from selxDaysT or the direct road's own t, and every kg82LvFor( in jselx*.js reads a kind.
   usage: node dev/test/selx-banhoa.js [index.html]   (serves dev/ through a Playwright route; exit 1 on FAIL) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';let fail=0;const ok=(c,m,x)=>{console.log((c?'ok ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''));if(!c)fail++};
/* 5. static family scan */
{const B=path.join(ROOT,'build');const F=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');const sites=[];
 for(const f of F){const L=fs.readFileSync(path.join(B,f),'utf8').split('\n');L.forEach((l,i)=>{let k=-1;while((k=l.indexOf('selxContest(',k+1))>=0){if(/function selxContest\(/.test(l.slice(Math.max(0,k-9),k+12)))continue;sites.push({f,i:i+1,s:l.slice(Math.max(0,k-160),k+60)})}})}
 const bad=sites.filter(x=>!(x.f==='jselx.js'&&/selxOddsP|selxSelDo|t\}\)|\{marks:mk,t:tt\}|null\)/.test(x.s))&&!(x.f==='jselxday.js'&&/selxAll\(\),\{marks:Z\.mk\|\|\{\},t\}/.test(x.s))&&!/c0\.apply|selxCo/.test(x.s));
 console.log('scan selxContest( call sites: '+sites.map(x=>x.f+':'+x.i).join(' '));ok(bad.length===0,'every contest call site uses the one tests builder (selxDaysT) or the direct road t',bad.map(x=>x.f+':'+x.i));
 const day=fs.readFileSync(path.join(B,'jselxday.js'),'utf8'),sx=fs.readFileSync(path.join(B,'jselx.js'),'utf8');
 ok(/function selxContestRun[\s\S]{0,700}selxDaysT\(X\.art\|\|selxArtAll\(\),false\)/.test(day),'selxContestRun builds the girls\' tests with selxDaysT, a bow on selxArtAll()');
 ok(/selxDaysT\(t\.art,true\)/.test(sx),'selxOddsP builds the same tests (selxDaysT, drawn when not yet set)');
 const lv=[];for(const f of F.filter(f=>/^jselx/.test(f))){fs.readFileSync(path.join(B,f),'utf8').split('\n').forEach((l,i)=>{if(/kg82LvFor\(/.test(l))lv.push({f,i:i+1,kind:/entKind\(t\.art\)/.test(l)})})}
 ok(lv.length>0&&lv.every(x=>x.kind),'every kg82LvFor( in jselx*.js reads the board through entKind',lv)}
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(900000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8813/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof selxDay==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(()=>{window.__bot=1;const out={kind:[],cal:[],side:[]};const close=()=>{try{document.querySelectorAll('.kmov,#kprevov,#kg82,#kpodov,.kscn').forEach(x=>x.remove())}catch(e){}};
  const life=()=>{for(let g=0;g<60;g++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S||!S.origin||S.origin.k==="cnv"||selxHoaThan(S.origin.k))continue;S.kcPick="cung";nlAccept();close();if(S.selx2&&S.selx2.days)return true}return false};
  /* 1. KIND */
  if(life()){const g=selxAll();const r0=Math.random;Math.random=()=>.5;try{const NM=BAL.selx.npcMini,MK=BAL.selx.mark;for(const a of Object.keys(KG82_PLAIN)){const k=entKind(a);for(const v of g.slice(0,6)){const want=Math.max(MK.lo,Math.min(MK.hi,Math.round(NM.base+kg82LvFor(v,k)*NM.lv)));const got=selxNpcMarks(v,{art:a}).mini;out.kind.push({a,k,want,got})}}}finally{Math.random=r0}}
  /* 3 + 4. walk to the contest (bow, then board), compare the told chance with real contests on the same marks */
  const cr0=selxContestRun;let hold=null;window.selxContestRun=selxContestRun=function(){hold=arguments;return null};
  for(let L=0;L<8;L++){if(!life())continue;const Z=S.selx2;const board=L%2===1;
   for(let i=0;i<400&&Q.length&&!S.dead&&!hold;i++){const m=Q[0];if(m.pid==="kc2Sel"){Q.shift();const art=board?entBest():"";S.selx.done=1;S.selx.art=art;selxSelDo(board?BAL.selx.mark.hi:entSkipRaw());close();continue}if(m.opts){chooseM(m.pid==="selxD"?R(m.opts.length):0);close();continue}closeModal();close()}
   if(!hold){continue}hold=null;
   const snap=JSON.stringify({z:Z,g:selxAll().map(v=>[v.__impMk,v.__fav,v.__marks,v.__sc])});const mr=Math.random;
   const p=selxOddsP(Z.mk.mini,S.selx.art||undefined);const after=JSON.stringify({z:Z,g:selxAll().map(v=>[v.__impMk,v.__fav,v.__marks,v.__sc])});out.side.push({same:snap===after,rnd:Math.random===mr});
   const t=selxDaysT(S.selx.art||selxArtAll(),false);let w=0;const n=400;for(let i=0;i<n;i++){const C=selxContest(selxAll(),{marks:Z.mk,t});const me=C.find(x=>x.v===S);if(me.place<=BAL.selx.yard.kept)w++}
   out.cal.push({board,told:p,real:Math.round(w*100/n),mk:Object.assign({},Z.mk)})}
  window.selxContestRun=selxContestRun=cr0;return out});
 const kb=r.kind.filter(x=>x.got!==x.want);ok(r.kind.length>0&&kb.length===0,`1. a girl's board mark reads the KIND for every plain art name (${r.kind.length} checks)`,kb.slice(0,5));
 ok(r.cal.length>=6,'3. lives reached the contest',r.cal.length);const cb=r.cal.filter(x=>x.told==null||Math.abs(x.told-x.real)>10);ok(cb.length===0,'3. told chance = real contests within 10 points (bow and board)',r.cal.map(x=>[x.board?'board':'bow',x.told,x.real]));
 ok(r.side.length>0&&r.side.every(x=>x.same&&x.rnd),'4. selxOddsP leaves the save and Math.random unchanged',r.side);
 ok(errs.length===0,'no page errors',errs.slice(0,3));console.log(fail?`FAIL ${fail}`:'ALL PASS');await b.close();process.exit(fail?1:0)})();
