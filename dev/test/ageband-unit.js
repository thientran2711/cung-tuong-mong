/* ageband-unit.js — review/ageband (owner 24/11 ~00:25Z "Cập nhật tuổi game là 18, 28, 39, 51, 64" → bands 18–27 / 28–38 / 39–50 / 51–63 / 64+).
   Checks on the BUILT game (real selectors, real manifests from the CDN or env FIGDIR):
   1 band index at 17/18/27/28/38/39/50/51/63/64 (ageBandIx / band4) · 2 labels "18-27" … "64+" (BAND4N, tuoi()) · 3 art tags = bands
   (ageArtIx / tagBand / figAge: a26 = band 1 = first age 28) · 4 every band × role draws a picture of the SAME identity (NPC consort cold/t1/t8,
   palace maid, ma ma look, Thái hậu, her as consort) and, where that band's file is painted, exactly that band's file · 5 face pools
   (bandKeys consort/maid/emperor/official, eunBand) and the maid → ma ma look switch at the band-2 edge · 6 old save: a 26-year-old keeps her
   identity and shows her a18 art until she turns 28, then her a26 art (j35: one identity for life) · 7 her own portrait tag (jimg mePor).
   usage: node dev/test/ageband-unit.js            (this build)
          INDEX=/path/live-index.html node dev/test/ageband-unit.js   (same checks on another build, e.g. LIVE main: every case must FAIL there)
   Case 4 (no blank) is a guard that holds on LIVE too; every other case FAILs on LIVE 4a8c627b. Exit 1 on any FAIL. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),http=require('http'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const INDEX=process.env.INDEX||'';const FIGDIR=process.env.FIGDIR||'';
const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const MT={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};
(async()=>{
 const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';
  if(u==='/index.html'&&INDEX){r.writeHead(200,{'content-type':MT['.html']});return fs.createReadStream(INDEX).pipe(r)}
  const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}
  r.writeHead(200,{'content-type':MT[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
 await new Promise(r=>srv.listen(0,r));const url='http://127.0.0.1:'+srv.address().port+'/';
 const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await ctx.addInitScript(()=>{window.__bot=1});
 await ctx.route(/FIGURES[^/]*\.json/,async r=>{const n=r.request().url().match(/(FIGURES[^/?]*\.json)/)[1];
  if(FIGDIR&&fs.existsSync(path.join(FIGDIR,n)))return r.fulfill({status:200,body:fs.readFileSync(path.join(FIGDIR,n)),contentType:'application/json'});
  for(let i=0;i<4;i++){try{const x=await ctx.request.get(CDN+n,{timeout:60000});if(x.ok())return r.fulfill({status:200,body:await x.body(),contentType:'application/json'});if(x.status()===404)break}catch(e){}}
  return r.fulfill({status:404,body:'[]',contentType:'application/json'})});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.fulfill({status:200,body:Buffer.alloc(0),contentType:'image/webp'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(url+'index.html?khost=0',{waitUntil:'domcontentloaded',timeout:120000});
 await p.waitForFunction(()=>typeof start==='function'&&typeof figFor==='function'&&typeof ageBandIx==='function',null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title')&&(document.getElementById('title').hidden=true);window.__nlInner=1;start();window.__nlInner=0;Q.length=0});
 await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0&&typeof f88Keys==='function'&&f88Keys('maid').length>0&&typeof FIGXT!=='undefined'&&Object.keys(FIGXT).length>0,null,{timeout:90000});
 const R=await p.evaluate(()=>{
  const C=[];const ok=(name,pass,info)=>C.push({name,pass:!!pass,info:info==null?'':String(info).slice(0,300)});
  const base=s=>String(s||'').replace(/^.*\//,'');const tagOf=f=>{const m=/-(a\d+)(?:-v\d)?\.webp$/.exec(base(f));return m?m[1]:''};
  const EXP={17:0,18:0,27:0,28:1,38:1,39:2,50:2,51:3,63:3,64:4,70:4};
  /* 1 band index */
  {const got={};for(const a in EXP)got[a]=ageBandIx(+a);ok('1 ageBandIx at the edges',Object.keys(EXP).every(a=>got[a]===EXP[a]),JSON.stringify(got));
   const g4={};for(const a in EXP)g4[a]=band4(+a);ok('1b band4 = ageBandIx',Object.keys(EXP).every(a=>g4[a]===EXP[a]),JSON.stringify(g4));
   ok('1c BAL.ageMin 18, BAL.ageBand [28,39,51,64]',BAL.ageMin===18&&JSON.stringify(BAL.ageBand)==='[28,39,51,64]',JSON.stringify([BAL.ageMin,BAL.ageBand]))}
  /* 2 labels */
  {const want=['18-27','28-38','39-50','51-63','64+'];ok('2 BAND4N labels',JSON.stringify(BAND4N)===JSON.stringify(want),JSON.stringify(BAND4N));
   const t=[0,1,2,3,4].map(ageBandName);ok('2b ageBandName',JSON.stringify(t)===JSON.stringify(want),JSON.stringify(t))}
  /* 3 art tags are bands, not ages */
  {const T=['a18','a26','a36','a51','a65'];const ix=T.map(x=>typeof ageArtIx==='function'?ageArtIx(x):tagBand(x)),tb=T.map(tagBand),fa=T.map(figAge);
   ok('3 tag → band from BAL.ageArt (ageArtIx, tagBand)',typeof ageArtIx==='function'&&JSON.stringify(BAL.ageArt)===JSON.stringify(T)&&JSON.stringify(ix)==='[0,1,2,3,4]'&&JSON.stringify(tb)==='[0,1,2,3,4]',JSON.stringify({ix,tb}));
   ok('3b figAge(tag) = first age of its band',JSON.stringify(fa)===JSON.stringify([BAL.ageMin].concat(BAL.ageBand)),JSON.stringify(fa))}
  /* 4 every band × role: same identity, the band's own file where painted */
  {const L0=f88Keys('consort');const bad=[],blank=[],n={c:0};const S0={pid:S.pid,fid:S.fid,rank:S.rank,age:S.age,out:S.out,srv:S.srv,succ:S.succ};const riv0=rivals.slice(),thO0=S.thO,thA0=S.thAge;
   const has=(k,re)=>{const L=(FIGIX[k.split(':')[0]]||{})[k]||[];return L.some(f=>re.test(f.file))};
   const look=(lbl,k,a,src,re)=>{n.c++;const f=base(src);if(!src){blank.push(lbl+' '+k+' '+a);return}const id=k.split(':')[1];if(!f.includes('-'+id+'-')){bad.push(lbl+' '+k+' '+a+' OTHER FACE '+f);return}
    const want=(BAL.ageArt||['a18','a26','a36','a51','a65'])[EXP[a]];/* LIVE has no BAL.ageArt: same tags */if(re&&has(k,new RegExp(re+want+'(-v\\d)?\\.webp$'))&&tagOf(f)!==want)bad.push(lbl+' '+k+' age '+a+' want '+want+' got '+f)};
   const keys=L0.slice(0,12).concat(f88Keys('maid').slice(0,8));
   try{for(const k of keys)for(const a of Object.keys(EXP).map(Number).filter(x=>x>=18)){
     S.pid=S0.pid;S.fid=S0.fid;
     if(/^consort/.test(k)&&k!==S0.pid)for(const t of [-1,1,8]){const w={name:'AUDIT',age:a,fid:k,rank:t<0?0:Math.min(7,t-1),queen:t===8,out:t<0,figV:0,alive:true};rivals.push(w);
      look('npc t'+t,k,a,figFor({ref:w},'fig'),t>0?'-t'+t+'-':null);look('npcP t'+t,k,a,figFor({ref:w},'por'),null);rivals.pop()}
     if(/^maid/.test(k)){const s={role:'maid',name:'AUDIT',age:a,fid:k,old:a>=BAL.ageBand[1],rk:1};look('srv',k,a,figFor({ref:s},'fig'),null);look('srvP',k,a,figFor({ref:s},'por'),null)}
     S.thO={fid:k,age:a};S.thAge=a;look('th',k,a,figFor({kind:'th'},'fig'),null);
     if(/^consort/.test(k)){S.pid=k;S.fid=k;S.age=a;S.out=false;S.srv=null;S.succ=null;S.rank=0;look('her t1',k,a,figFor(S,'fig'),'-t1-')}}
   }catch(e){bad.push('ERR '+String(e&&e.stack||e).slice(0,200))}
   Object.assign(S,S0);rivals.length=0;riv0.forEach(x=>rivals.push(x));S.thO=thO0;S.thAge=thA0;
   ok('4 every band × role has a picture (no blank)',!blank.length&&n.c>0,n.c+' cells, blank '+blank.length+' '+blank.slice(0,3).join(' | '));
   ok('4b each band shows its own painted file, same identity',!bad.length,bad.length+' '+bad.slice(0,4).join(' | '))}
  /* 5 face pools and the ma ma look */
  {const k=[27,28,38,39,50,51].map(a=>bandKeys('consort',a)[0]+'/'+bandKeys('emperor',a)[0]+'/'+bandKeys('official',a)[0]+'/'+eunBand(a));
   ok('5 face pools change at 28/39/51',k[0]===k[0]&&bandKeys('consort',38)[0]==='consort'&&bandKeys('consort',39)[0]==='womid'&&bandKeys('consort',50)[0]==='womid'&&bandKeys('consort',51)[0]==='mama'
     &&bandKeys('emperor',27)[0]==='emp0'&&bandKeys('emperor',28)[0]==='emp1'&&bandKeys('emperor',39)[0]==='emp2'&&bandKeys('emperor',51)[0]==='emp3'
     &&bandKeys('official',38)[0]==='off0'&&bandKeys('official',39)[0]==='off1'&&bandKeys('man',51)[0]==='manold'&&bandKeys('man',50)[0]!=='manold'
     &&eunBand(27)===0&&eunBand(28)===1&&eunBand(39)===2&&eunBand(51)===3,k.join(' '));
   const m=a=>{try{return personRoleRank({role:'maid',age:a,rk:1},'maid').role}catch(e){return'?'}};
   ok('5b maid → ma ma look at 39 (personRoleRank)',m(38)==='maid'&&m(39)==='mama',[m(38),m(39)].join(','))}
  /* 6 old save: a 26-year-old keeps her identity, a18 art until 28 */
  {const k=f88Keys('consort').find(x=>x!==S.pid&&['a18','a26'].every(t=>(FIGIX.consort[x]||[]).some(f=>new RegExp('-t2-'+t+'\\.webp$').test(f.file))));
   if(!k)ok('6 old save 26 → 28',false,'no identity with t2 a18+a26');else{
   const w={name:'OLD',age:26,fid:k,rank:1,alive:true,figV:0};rivals.push(w);const sv=JSON.parse(JSON.stringify(w));
   const w2=Object.assign({},sv);rivals.pop();rivals.push(w2);const f26=base(figFor({ref:w2},'fig'));w2.age=27;const f27=base(figFor({ref:w2},'fig'));w2.age=28;const f28=base(figFor({ref:w2},'fig'));rivals.pop();
   ok('6 old save: same identity, a18 at 26/27, a26 at 28',w2.fid===k&&f26.includes('-'+k.split(':')[1]+'-')&&tagOf(f26)==='a18'&&tagOf(f27)==='a18'&&tagOf(f28)==='a26',[k,f26,f27,f28].join(' '))}}
  /* 7 her own portrait tag (player set a18–a51) */
  {const s0={fid:S.fid,age:S.age,porMe:S.porMe};const out=[];S.fid='player:p1';for(const a of [27,28,39,51,70]){S.age=a;out.push(tagOf(typeof kitMePor==='function'?kitMePor():''))}Object.assign(S,s0);
   ok('7 her portrait tag by band',out.join(',')==='a18,a26,a36,a51,a51',out.join(','))}
  return C});
 let fails=0;for(const c of R){if(!c.pass)fails++;console.log((c.pass?'ok   ':'FAIL ')+c.name+(c.info?'  · '+c.info:''))}
 if(errs.length){fails++;console.log('FAIL page errors',errs.slice(0,3))}
 await b.close();srv.close();console.log(fails?`AGEBAND-UNIT FAIL ${fails}/${R.length}`:`AGEBAND-UNIT PASS ${R.length}/${R.length}`);process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(2)});
