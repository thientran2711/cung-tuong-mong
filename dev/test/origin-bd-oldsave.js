/* origin-bd-oldsave (review/origin-bd-branch-r1): REAL old Bắc Địch saves made on the MAIN build (bd = a 10th origin there) load on this
   build as hòa thân + Bắc Địch branch with nothing lost, at three points of a life: mid-tutorial (chapter 1–3), mid-road (f14 road set),
   late life (many years). Per save: origin key bd, par nc, name, rank, turn, kids, chapter n + plan, road + cast, story/quest state kept;
   then 60 buổi play on with no error; the identity card names "Công chúa Bắc Địch hòa thân" with the hòa thân rarity chip.
   Also the j69 pre-roll freeze: for 3000 seeds, main ow69Pick(seed,true/false) == this build ow69Pick(seed,1/2) (lives pre-rolled on main
   keep the origin they were shown), and a co-op world blob (deser with ok:"bd", jcoopworld path) loads as the bd branch.
   usage: NODE_PATH=$(npm root -g) node dev/test/origin-bd-oldsave.js <this build url> <main build url> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */
const [,,URL,MAIN]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,900))};
 const boot=async url=>{const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();await p.addInitScript(require('./lib/qdrain').init);/* headless loop: __bot + answer the night choice (lib/qdrain.js, NPCROADS-RED) */p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(url.slice(-25)+': '+e.message.slice(0,200)));await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);return p};
 /* main build: one bd life, saves taken at month 2 (tutorial), 24 (road), and the last alive month in 40–72 (late); a life that dies early is replaced by a new bd life (up to 6) */
 const q=await boot(MAIN);
 console.log('making main-build bd saves…');const saves=await q.evaluate(async()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
  SLOT=3;window.__forceOrigin='bd';document.getElementById('title').hidden=true;quiet=true;start();quiet=false;
  await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin)||++n>150)r();else setTimeout(t,100)};t()});
  const snap=()=>({save:JSON.stringify(ser()),k:S.origin.k,name:S.name,rank:S.rank,turn:S.turn,kids:(S.kids||[]).length,n:S.st.ch&&S.st.ch.n,plan:S.st.ch&&S.st.ch.plan.join(','),
   rd:S.st.f14?S.st.f14.rd||'':'-',act:S.st.f14&&S.st.f14.act?JSON.stringify(S.st.f14.act):'',story:JSON.stringify(S.st.story||S.st.q||null).length,M:S.st.M?JSON.stringify(Object.keys(S.st.M)).length:0});
  const out={};let late=null;
  for(let life=0;life<6&&!(out.tut&&out.road&&late);life++){if(life){window.__forceOrigin='bd';quiet=true;try{nlNew()}catch(e){}start();quiet=false;await new Promise(r=>setTimeout(r,300));late=null}
  for(let m=1;m<=72;m++){const t=S.turn;for(let g=0;g<40&&S&&!S.dead&&S.turn===t;g++){__qDrain();used=0;try{nextBuoi()}catch(e){out.err=e.message;break}}
   if(!S||S.dead)break;const A=S.st&&S.st.M;try{if(A&&!A.done&&!A.cur&&A.nb){A.due=0;fireBeat67(A)}if(A&&A.cur){const bd=beatDef67(A,A.cur);const O=opts67(A,bd);res67(thKey67(A),A.cur,0,O[0]&&O[0].o!=null?oOf67(A,O[0],bd):100)}}catch(e){}
   if(S.st&&S.st.ms&&typeof msDone67==='function'){S.st.ms.t0=-99}Q.length=0;if(S.dead)break;
   if(m===2&&!out.tut)out.tut=snap();if(m===24&&!out.road)out.road=snap();if(m>=40)late=snap()}
  out.lives=life+1}
  out.late=late;return out});
 await q.context().close();
 chk('main build made the bd saves (tutorial, road, late)',saves.tut&&saves.road&&saves.late,{err:saves.err,tut:!!saves.tut,road:!!saves.road,late:!!saves.late});
 const p=await boot(URL);
 for(const nm of ['tut','road','late']){const o=saves[nm];if(!o)continue;
  const r=await p.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
   const g={k:S.origin.k,par:S.origin.par,n0:S.origin.n,land:S.origin.land,name:S.name,rank:S.rank,turn:S.turn,kids:(S.kids||[]).length,n:S.st.ch&&S.st.ch.n,plan:S.st.ch&&S.st.ch.plan.join(','),
    rd:S.st.f14?S.st.f14.rd||'':'-',act:S.st.f14&&S.st.f14.act?JSON.stringify(S.st.f14.act):'',story:JSON.stringify(S.st.story||S.st.q||null).length,M:S.st.M?JSON.stringify(Object.keys(S.st.M)).length:0,
    rare:(typeof ow69Rare==='function')?ow69Rare(S.origin.k):'',hasStory:!!(STORY&&STORY[S.origin.k]),hasQ:!!(typeof QUEST67!=='undefined'&&QUEST67[S.origin.k])};
   let er=null;for(let i=0;i<60&&!S.dead;i++){__qDrain();used=0;try{nextBuoi()}catch(e){er=e.message;break}}Q.length=0;g.err=er;g.dead=!!S.dead;
   try{tab='story';render();g.storyTab=((document.getElementById('panel')||{}).textContent||'').length;tab='act';render()}catch(e){g.err=g.err||('render '+e.message)}
   return g},o.save);
  console.log(nm,JSON.stringify({k:r.k,par:r.par,rank:[o.rank,r.rank],turn:[o.turn,r.turn],n:[o.n,r.n],rd:[o.rd,r.rd],rare:r.rare,dead:r.dead,err:r.err}));
  chk(`${nm}: old main bd save loads as hòa thân · Bắc Địch (k bd, par nc, land Bắc Địch, story+quest road kept)`,r.k==='bd'&&r.par==='nc'&&r.land==='Bắc Địch'&&r.n0==='Công chúa Bắc Địch hòa thân'&&r.hasStory&&r.hasQ,r);
  chk(`${nm}: nothing lost (name, rank, turn, kids, chapter n + plan, road + cast, story + arc state)`,r.name===o.name&&r.rank===o.rank&&r.turn===o.turn&&r.kids===o.kids&&r.n===o.n&&r.plan===o.plan&&r.rd===o.rd&&r.act===o.act&&r.story===o.story&&r.M===o.M,{o:{...o,save:undefined},r});
  chk(`${nm}: plays 60 buổi on, story tab renders, rarity = hòa thân card's`,!r.err&&r.storyTab>0&&r.rare==='Rất hiếm',r)}
 /* j69 pre-roll freeze vs main */
 const mainPick=await (async()=>{const m=await boot(MAIN);const v=await m.evaluate(()=>{const o={a:[],b:[]};for(let s=1;s<=3000;s++){o.a.push(ow69Pick(s*7919,true));o.b.push(ow69Pick(s*7919,false))}return o});await m.context().close();return v})();
 const fr=await p.evaluate(M=>{let d1=0,d2=0,bd2=0,c3={};const ex=[];for(let i=0;i<3000;i++){const s=(i+1)*7919;const a=ow69Pick(s,1),b2=ow69Pick(s,2),c=ow69Pick(s,3);if(a!==M.a[i]){d1++;if(ex.length<3)ex.push([s,1,M.a[i],a])}
  if(b2!==M.b[i]){d2++;if(ex.length<3)ex.push([s,2,M.b[i],b2])}if(b2==='bd')bd2++;c3[c]=(c3[c]||0)+1}return{d1,d2,bd2,c3,ex}},mainPick);
 console.log('pre-roll freeze',JSON.stringify(fr));
 chk('pre-rolled lives (ow1 + ow2) on main keep the origin they were shown (3000 seeds each, 0 differ)',fr.d1===0&&fr.d2===0&&fr.bd2>0,fr);
 chk('ow3 roll: no "bd" outside the hòa thân share, every key a known origin/branch',Object.keys(fr.c3).every(k=>['tt','dtq','muoi','cn','nc','bd','td','ch','thd','cnv'].includes(k)),fr.c3);
 /* co-op world blob: jcoopworld loads a seat with deser({ok:Pm.ok, S:sS}) — an old co-op seat stored with ok "bd" */
 const co=await p.evaluate(s=>{const d=JSON.parse(s);d.ok='bd';deser(d);return{k:S.origin.k,par:S.origin.par,name:S.origin.n}},saves.road?saves.road.save:saves.tut.save);
 chk('co-op seat blob with ok "bd" loads as the Bắc Địch branch of hòa thân',co.k==='bd'&&co.par==='nc',co);
 chk('no page errors',!errs.length,errs.slice(0,5));
 const nb=ok.filter(x=>!x[1]).length;console.log(`origin-bd-oldsave: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
