/* fig-wiring.js — review/art-wiring-1119 PICKER GATE: every identity of the women's pool (c01–c32 + m01–m52 + ma ma k01–k08) × every role/rank
   (NPC consort cold,t1..t8 · her t1..t8 · palace maid / ma ma servant · Thái hậu NPC · her as Thái hậu) × ages 18…75 incl. every band edge of BAL.ageBand → the REAL
   selector (figFor, fig + por). Must be 0 blanks. Also checks: top-band (a65) file shown from BAL.ageBand[3] wherever it is painted (and never below), the
   Thái hậu wears her own face's "th" robe when painted (never a shared fig-thaihau-*), colour variant v1/v2 only when her colour asks for it,
   and no Thái hậu robe on anyone who is not Thái hậu. Prints the a65 / Thái hậu files still missing (FOR C).
   usage: node dev/test/fig-wiring.js [out.json]   (serves the BUILT repo root; manifests from env FIGDIR or the CDN). Exit 1 on any FAIL. */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'';
const FIGDIR=process.env.FIGDIR||'';const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const MT={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};
(async()=>{
 const srv=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(u==='/')u='/index.html';const f=path.join(ROOT,u);
  if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':MT[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
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
 await p.waitForFunction(()=>typeof start==='function'&&typeof figFor==='function'&&typeof figIsTh==='function',null,{timeout:120000});
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title')&&(document.getElementById('title').hidden=true);window.__nlInner=1;start();window.__nlInner=0;Q.length=0});
 await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0&&f88Keys('maid').length>0&&Object.keys(FIGXT).length>0,null,{timeout:90000}).catch(async e=>{console.log('LOAD STATE',await p.evaluate(()=>({F:typeof FIGS!=='undefined'&&FIGS.length,X:typeof FIGXT!=='undefined'&&Object.keys(FIGXT).length,ok:typeof figxLoad!=='undefined'&&[figxLoad.ok,figxLoad.fail]})),errs);throw e});
 const res=await p.evaluate(()=>{
  const AGES=[18,27,28,30,38,39,40,50,51,55,63,64,66,75];const TOP=BAL.ageBand[BAL.ageBand.length-1],A65='-'+BAL.ageArt[BAL.ageArt.length-1];/* review/ageband: band edges from BAL */const out={n:0,blank:[],bad:[],miss65:{},missTh:[],cnt:{}};const inc=k=>out.cnt[k]=(out.cnt[k]||0)+1;
  const base=s=>String(s||'').replace(/^.*\//,'');
  const pool=figxPool();const has=(k,re)=>{const L=(FIGIX[k.split(':')[0]]||{})[k]||[];return L.some(f=>re.test(f.file))};
  const thHas=k=>!!(FIGXT[k]&&FIGXT[k].th.length);
  const saveS={pid:S.pid,fid:S.fid,rank:S.rank,age:S.age,out:S.out,srv:S.srv,succ:S.succ,dead:S.dead,fate:S.fate,thAge:S.thAge};
  const thO0=S.thO,U0=S.fidUsed.slice(),riv0=rivals.slice();
  const look=(lbl,k,a,src,ex)=>{out.n++;const f=base(src);if(!src){out.blank.push(lbl+' '+k+' a'+a);return}
   const id=k.split(':')[1];if(!f.includes('-'+id+'-')){out.bad.push(lbl+' '+k+' a'+a+' OTHERFACE '+f);return}
   if(f.includes(A65)&&a<TOP)out.bad.push(lbl+' '+k+' a'+a+' top-band art below '+TOP+' '+f);
   if(/-th-/.test(f)&&!ex.th)out.bad.push(lbl+' '+k+' a'+a+' TH ROBE ON NON-TH '+f);
   if(/fig-thaihau|por-thaihau/.test(f))out.bad.push(lbl+' '+k+' SHARED THAIHAU '+f);
   if(ex.th&&thHas(k)&&!/-th-/.test(f))out.bad.push(lbl+' '+k+' a'+a+' TH PAINTED BUT NOT SHOWN '+f);
   if(/-v[12]\./.test(f)&&!ex.v)out.bad.push(lbl+' '+k+' a'+a+' VARIANT WITHOUT ASK '+f);
   if(a>=TOP&&ex.t&&has(k,new RegExp('-t'+ex.t+A65+'\\.webp$'))&&!f.includes(A65)&&!ex.th)out.bad.push(lbl+' '+k+' a'+a+' a65 PAINTED BUT NOT SHOWN '+f);
   if(a>=TOP&&ex.th&&thHas(k)&&!f.includes('-th'+A65))out.bad.push(lbl+' '+k+' a'+a+' TH a65 NOT SHOWN '+f);
   inc(lbl+(f.includes(A65)?':a65':'')+(/-th-/.test(f)?':th':'')+(/-v[12]\./.test(f)?':v':''))};
  try{for(const k of pool){
   /* missing lists (FOR C) */
   const mm=[];for(const t of [1,2,3,4,5,6,7,8])if(!has(k,new RegExp('-t'+t+'-a65\\.webp$')))mm.push('t'+t);if(!/^mama/.test(k)&&!has(k,/-cold-a65\.webp$|-tcold-a65\.webp$/))mm.push('cold');
   if(/^(maid|mama)/.test(k)&&!has(k,/-(m\d+|k\d+)-a65\.webp$/))mm.push('plain');out.miss65[k]=mm;if(!thHas(k))out.missTh.push(k);
   for(const a of AGES){
    /* NPC consort at every rank (cold, t1..t8) */
    S.pid=saveS.pid;S.fid=saveS.fid;if(!/^mama/.test(k)&&k!==saveS.pid)for(const t of [-1,1,2,3,4,5,6,7,8]){const w={name:'AUDIT',age:a,fid:k,rank:t<0?0:Math.min(7,t-1),queen:t===8,out:t<0,figV:0,alive:true};rivals.push(w);
     for(const kind of ['fig','por'])look('npc'+(kind==='por'?'P':''),k,a,figFor({ref:w},kind),{t:t>0?t:0});
     if(t>=7){w.figV=1;const f=base(figFor({ref:w},'fig'));const vh=has2(k,t,a);if(vh&&!/-v1\./.test(f))out.bad.push('npc v1 asked not shown '+k+' t'+t+' a'+a+' '+f);if(vh)inc('npc:v1ok');w.figV=0}
     rivals.pop()}
    /* servant (palace maid young, ma ma old) */
    if(/^(maid|mama)/.test(k)){const s={role:'maid',name:'AUDIT',age:a,fid:k,old:a>=BAL.ageBand[1],rk:1};for(const kind of ['fig','por'])look('srv'+(kind==='por'?'P':''),k,a,figFor({ref:s},kind),{});}
    /* the Thái hậu NPC wearing this face */
    {S.thO={fid:k,age:a};S.thAge=a;for(const kind of ['fig','por'])look('th'+(kind==='por'?'P':''),k,a,figFor({kind:'th'},kind),{th:1})}
    /* her: consort road t1..t8 + as Thái hậu after the succession */
    if(!/^mama/.test(k)){S.pid=k;S.fid=k;S.age=a;S.out=false;S.srv=null;S.dead=false;
     S.figV=0;for(const t of [1,8]){S.rank=t-1;S.succ=null;look('her',k,a,figFor(S,'fig'),{t})}
     S.figV=1;{const f=base(figFor(S,'fig'));if(has2(k,8,a)&&!/-v1\./.test(f))out.bad.push('her v1 asked not shown '+k+' a'+a+' '+f);else if(has2(k,8,a))inc('her:v1ok')}delete S.figV;
     S.succ={p:'a',on:1};look('herTH',k,a,figFor(S,'fig'),{th:1});look('herTHP',k,a,figFor(S,'por'),{th:1});S.succ=null}
   }}}catch(e){out.err=String(e&&e.stack||e)}
  function has2(k,t,a){const X=FIGXT[k];if(!X)return false;const B=BAL.ageArt[ageBandIx(a)];return X.v.some(f=>f.v===1&&+f.tier===t&&f.ageBand===B)}
  Object.assign(S,saveS);S.thO=thO0;S.fidUsed=U0;rivals.length=0;riv0.forEach(x=>rivals.push(x));
  /* THÁI HẬU DRAW: a fresh game draws a pool face for her (retired h1..h3 never), an old save's "thaihau:hN" is replaced */
  S.thO={fid:'thaihau:h2',age:60};S.fidUsed.push('thaihau:h2');const src=figFor({kind:'th'},'fig');out.draw={fid:S.thO.fid,src:base(src),stillUsed:S.fidUsed.includes('thaihau:h2')};
  /* r2 RACE: before img/FIGURES-x.json is in, the Thái hậu draws NO face (her face is for life); once it is in she draws a face whose
     Thái hậu robe is painted. Run 8 times (the reviewer's probe: 3/8 drew a maid face) */
  {const X0=FIGXT,R0=FIGXR,ok0=figxLoad.ok,f0=figxLoad.fail;const race=[];
   for(let i=0;i<8;i++){const old=S.thO&&S.thO.fid;if(old)S.fidUsed=S.fidUsed.filter(x=>x!==old);S.thO={age:58};
    FIGXT={};FIGXR=[];figxLoad.ok=0;figxLoad.fail=0;const pre=figPick(S.thO);
    FIGXT=X0;FIGXR=R0;figxLoad.ok=ok0;figxLoad.fail=f0;const post=figPick(S.thO);race.push([pre,post,!!(FIGXT[post]&&FIGXT[post].th.length)])}
   out.race=race;out.raceBad=race.filter(r=>r[0]!=null||!r[2]).length}
  /* r2 PIN: an old save keeps v0 for the reign running at its first load; a new life / the next reign wears the colours */
  {const e0=S.emp,st0=S.figVStamp;const H=(k,era)=>wdHash(k+'|'+(era||''))%BAL.figVar;const era2=(e0.era||'')+' II';
   const fk=f88Keys('consort').find(k=>H(k,e0.era)!==0&&H(k,era2)!==0)||'consort:c01';const w={fid:fk};const pin=[];
   S.emp=Object.assign({},e0);delete S.emp.figV0;delete S.figVStamp;pin.push(['old save, same reign',figVOf(w)]);
   S.emp=Object.assign({},S.emp,{name:(S.emp.era||'')+' II'});delete S.emp.figV0;pin.push(['old save, next reign',figVOf(w),'hash '+(H(fk,S.emp.era))]);
   S.emp=Object.assign({},e0);delete S.emp.figV0;S.figVStamp=1;pin.push(['new life',figVOf(w),'hash '+(H(fk,S.emp.era))]);
   S.emp=e0;S.figVStamp=st0;pin.push(fk);out.pin=pin;out.pinBad=(pin[0][1]!==0?1:0)+(pin[1][1]!==+pin[1][2].slice(5)?1:0)+(pin[2][1]!==+pin[2][2].slice(5)?1:0)}
  /* bands */out.bands=BAL.ageBand.slice();out.labels=BAND4N.slice();return out});
 console.log('race (pre-load pick, post-load pick, has th robe)',JSON.stringify(res.race),'bad',res.raceBad);console.log('pin',JSON.stringify(res.pin),'bad',res.pinBad);
 const fails=(res.raceBad||0)+(res.pinBad||0)+res.blank.length+res.bad.length+(res.err?1:0)+(/^(consort|maid|mama):/.test(res.draw.fid)&&!res.draw.stillUsed?0:1)+errs.length;
 console.log('cells',res.n,'blank',res.blank.length,'bad',res.bad.length,res.err||'');console.log('counts',JSON.stringify(res.cnt));
 console.log('bands',JSON.stringify(res.bands),'labels',JSON.stringify(res.labels));console.log('old-save Thái hậu redraw',JSON.stringify(res.draw));
 if(res.blank.length)console.log('BLANK',res.blank.slice(0,20));if(res.bad.length)console.log('BAD',res.bad.slice(0,30));
 const g={};for(const k in res.miss65){const s=res.miss65[k].join(',');(g[s]=g[s]||[]).push(k.split(':')[1])}
 console.log('FOR C — a65 missing (by identity):');for(const s in g)console.log('  ['+s+'] ×'+g[s].length+': '+g[s].join(' '));
 console.log('FOR C — Thái hậu robe missing:',res.missTh.length,res.missTh.map(k=>k.split(':')[1]).join(' '));
 console.log('page errors',errs.length,errs.slice(0,3));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));
 await b.close();srv.close();console.log(fails?'FAIL':'PASS: 0 blanks, every rule held');process.exit(fails?1:0)})().catch(e=>{console.error(e);process.exit(2)});
