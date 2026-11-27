/* live-servants-words — FAMILY SCAN for review live-servants FAIL 1 (law 7 VANPHONG, law 11 fix the whole group): no code key on screen
   in any view of the ONE record (S.roster). usage: node dev/test/live-servants-words.js <index.html> [lives=3] [buoi=12] [--json]
   (A) KEYS: every act key the game can write into a record row — every ACT95 key, every registered deed run (AGRUN "ag_"+k), every servant
       deed (SRVA rows × maid / srv + empTea), every shared deed (AGACTW) — through the act word of each player view.
   (B) ROWS: seeded bot lives (deed plans on), every row of every khắc through the five views: picker reason (j95sNotFree), the reason guard
       (j95sWhy), the map read API (j95here / j95whereId .act), the dev table (j95table rows .act) + the saved log words (S.rlog D.A).
   (C) roster.js on the saves of (B): its answers (table + --who) carry no key.
   RAW = a "group:key" token (maid:sweep, srv:askRew, cx2:vent …), an "ag_" token, or an act word that is a bare ASCII identifier (call, empTea).
   Exit 0 when (A)+(B)+(C) find no RAW. */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs'),cp=require('child_process'),os=require('os');
const F=process.argv[2]||'dev/index.html',LIVES=+(process.argv[3]||3),NB=+(process.argv[4]||12),JSONOUT=process.argv.includes('--json');
const ROSTER=path.join(path.dirname(path.resolve(F)),'tools','roster.js');
(async()=>{const b=await chromium.launch();const out={keys:{n:0,raw:[]},rows:{n:0,raw:{},ex:{}},roster:{n:0,raw:[]}};const TMP=fs.mkdtempSync(path.join(os.tmpdir(),'lsw-'));
for(let seed=1;seed<=LIVES;seed++){const p=await b.newPage();p.on('pageerror',e=>{});await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
 await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(([seed,NB])=>{let x=seed;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;
  window.render=render=function(){};window.showModal=showModal=function(){};
  const RAW=s=>{s=String(s==null?"":s);return /(^|[^\p{L}])(ag_\w+|[a-z]+\d?:[A-Za-z]\w*)/u.test(s)};const RAWW=s=>{s=String(s==null?"":s);return RAW(s)||/^[A-Za-z_][\w:]*$/.test(s)};
  const W=typeof j95sActW==="function"?j95sActW:(a=>ACT95[a]||String(a).replace(/^ag_/,""));
  const res={keys:{n:0,raw:[]},rows:{n:0,raw:{},ex:{}},saves:[]};const bump=(v,k,ex)=>{res.rows.raw[v]=(res.rows.raw[v]||0)+1;if(!res.rows.ex[v])res.rows.ex[v]=[];if(res.rows.ex[v].length<6&&!res.rows.ex[v].includes(ex))res.rows.ex[v].push(ex)};
  if(seed===1){const K=new Set(Object.keys(ACT95));try{for(const k in AGRUN)K.add("ag_"+k)}catch(e){}try{for(const k of Object.keys(SRVA).concat(["empTea"]))for(const g of ["maid","srv"])K.add("ag_"+g+":"+k)}catch(e){}try{for(const k in AGACTW)K.add("ag_"+k)}catch(e){}
   for(const k of K){res.keys.n++;const w=W(k);if(RAWW(w))res.keys.raw.push(k+" → "+w)}}
  for(let i=0;i<NB&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();if(typeof agFlush==="function")agFlush()}catch(e){}
   for(let k=0;k<4&&!S.dead;k++){try{j95sync(false,true)}catch(e){}const R=S.roster;if(R&&R.P){const kh=j95kh();let K=null;
     for(const id in R.P){const x=R.P[id][kh];if(!x)continue;res.rows.n++;
      try{const v=j95sNotFree(x);if(RAW(v))bump("j95sNotFree",x[1],v)}catch(e){}
      try{if(!K){K={};for(const q of j95ppl(R))K[q.id]=q.kind}const v=j95sWhy(R,id,kh,x,K[id]);if(RAW(v))bump("j95sWhy",x[1],v)}catch(e){}
      try{const v=j95whereId(id,kh);if(v&&RAWW(v.act))bump("j95whereId.act",x[1],v.act);if(v&&RAW(v.why))bump("row why",x[1],v.why)}catch(e){}}
     try{const seen=new Set();for(const id in R.P){const x=R.P[id][kh];if(!x||seen.has(x[0]))continue;seen.add(x[0]);for(const h of j95here(x[0],kh))if(RAWW(h.act))bump("j95here.act",h.id,h.act)}}catch(e){}
     try{const q=j95table(null,null,kh);const rows=(q&&q.rows)||[];for(const w of rows)if(RAWW(w.act))bump("j95table.act",w.id,w.act)}catch(e){}}
    if(k===1||k===3){try{save()}catch(e){}res.saves.push((window.slotGet?slotGet("hclh-save-v2-4"):localStorage.getItem("hclh-save-v2-4")))}
    const kh=j95kh();try{spend(1)}catch(e){}if(j95kh()===kh)break}
   try{nextBuoi()}catch(e){}Q.length=0}
  try{for(const key in (S.rlog&&S.rlog.e)||{}){const L=S.rlog.e[key];for(const a of (L.D&&L.D.A)||[]){res.rows.n++;if(RAWW(a))bump("S.rlog words",key,a)}}}catch(e){}
  return res},[seed,NB]);
 if(seed===1)out.keys=r.keys;out.rows.n+=r.rows.n;for(const v in r.rows.raw){out.rows.raw[v]=(out.rows.raw[v]||0)+r.rows.raw[v];out.rows.ex[v]=(out.rows.ex[v]||[]).concat(r.rows.ex[v]).slice(0,6)}
 r.saves.filter(Boolean).forEach((sv,i)=>{const f=path.join(TMP,`s${seed}-${i}.json`);fs.writeFileSync(f,sv);
  for(const args of [[f],[f,'--who','người hầu của ta'],[f,'--who','me']]){const x=cp.spawnSync('node',[ROSTER,...args],{encoding:'utf8'});out.roster.n++;
   for(const l of (x.stdout||'').split('\n'))if(/(^|[^\p{L}])(ag_\w+|(maid|srv|cx\d?|hh|see|know|emp|th):[A-Za-z]\w*)/u.test(l)&&out.roster.raw.length<8)out.roster.raw.push(l.slice(0,160))}});
 await p.close()}
await b.close();
const nRaw=out.keys.raw.length+Object.values(out.rows.raw).reduce((a,b)=>a+b,0)+out.roster.raw.length;
if(JSONOUT)console.log(JSON.stringify(out));else{console.log(`(A) keys ${out.keys.n}: raw ${out.keys.raw.length}`,out.keys.raw.slice(0,12));console.log(`(B) rows ${out.rows.n}: raw by view`,JSON.stringify(out.rows.raw));for(const v in out.rows.ex)console.log('   ',v,'e.g.',JSON.stringify(out.rows.ex[v].slice(0,4)));console.log(`(C) roster.js runs ${out.roster.n}: raw lines ${out.roster.raw.length}`,out.roster.raw.slice(0,4))}
console.log(nRaw?`LIVE-SERVANTS-WORDS: FAIL (${nRaw} raw)`:'LIVE-SERVANTS-WORDS: PASS');process.exit(nRaw?1:0)})().catch(e=>{console.error(e);process.exit(1)});
