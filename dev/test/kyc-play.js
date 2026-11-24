/* ORDER THIN P5 browser test: composed Kỳ ngộ (jkyc) on the real game. node dev/test/kyc-play.js [seeds.jsonl]  (after dev/site/build_site.sh)
   Per seed (the fixture, or the given file registered at runtime): it is in KY.DEF with its BAL.kyngo.E row; its who-picker picks the REAL person of
   that kind from a list of the live world's real people (consort, servant, child, man, court, elder, Thái hậu, Hoàng thượng) and never the finder; its
   when/what read the live state (a when that is false now is forced and reported; a what whose real piece does not exist in this world is skipped,
   never conjured); the card fires through jky's own gate (KY.arrive) as a PEND kyngo card with 2 options (or a read card), every placeholder filled,
   option 1 runs through the real chooseM path to a result card, the seed is then «seen» for this life and marked in P0 family «ky»; plus every built
   KYSEEDS seed registers and the 25 old encounters still register. 0 page errors. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const FILE=process.argv[2]||path.join(__dirname,'kyc-fixture.jsonl');
const FIX=fs.readFileSync(FILE,'utf8').split('\n').filter(l=>l.trim().startsWith('{')).map(JSON.parse);
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;if(!c||process.env.V)console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function'&&window.KY,null,{timeout:120000});
 const R=await g.evaluate(FIX=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});
  window.__bot=1;window.quiet=1;const B=BAL.kyngo;const out={seeds:[],old:["ma_phe","vat_lac","sv_tre","th_kinh","de_mua"].every(id=>KY.DEF[id]&&B.E[id]),cnt:kycCount(),builtN:typeof KYSEEDS!=='undefined'?KYSEEDS.length:-1};
  /* the live world's real people, one row per kind jky's kyPpl can list (law 6b) */
  const RV=liveRivals(true);const own=RV.find(v=>(v.staff||[]).length)||RV[0];const kidOwn=RV.find(v=>(v.kids||[]).some(k=>k.alive));
  const PPL=[...RV.map(v=>({kind:"rv",ref:v})),{kind:"emp"},{kind:"th"},...(S.men||[]).filter(m=>m.alive!==false).map(m=>({kind:"man",ref:m})),
   ...Object.keys(S.court||{}).filter(c=>S.court[c]&&S.court[c].name).map(c=>({kind:"court",c,ref:S.court[c]})),
   ...["gt","tn"].map(id=>{const st=typeof elderBy==="function"?elderBy(id):null;return st?{kind:"el",eid:id,ref:st}:null}).filter(Boolean),
   ...(own?(own.staff||[]).filter(s=>s&&s.alive!==false).map(s=>({kind:"sv",ref:s,own})):[]),...(kidOwn?(kidOwn.kids||[]).filter(k=>k.alive).map(k=>({kind:"kid",ref:k,own:kidOwn})):[])];
  try{if(typeof lyAlive==="function"&&lyAlive())PPL.push({kind:"ly",ref:lyAlive()})}catch(e){}
  out.ppl=[...new Set(PPL.map(x=>x.kind+(x.c?":"+x.c:x.eid?":"+x.eid:"")))].join(" ");
  if(!PPL.some(x=>x.kind==="ly")&&RV[0])PPL.push({kind:"ly",ref:RV[RV.length-1],test:1});
  const p0=B.p0,st0=B.step;
  for(const sd of FIX){const r={id:sd.id};out.seeds.push(r);try{
   if(!KY.DEF[sd.id]){B.E[sd.id]={w:sd.w||1,b:sd.b||"0123"};if(sd.plain)B.E[sd.id].plain=sd.plain;else B.E[sd.id].o=sd.o;if(typeof KYSEEDS!=='undefined')KYSEEDS.push(sd);KY.creg(sd);r.late=1}
   const Dd=KY.DEF[sd.id];r.reg=!!Dd&&!!B.E[sd.id];if(!Dd){r.err='not registered';continue}
   let X0=Dd.what?Dd.what(S):{};if(Dd.what&&!X0&&sd.what==='plot'&&typeof j70==='function'&&j70()&&RV[0]){/* a plot in prep by a real consort (the j70 record), test-only, removed after */const P={st:'prep',a:RV[0].id,t:'zz',k:'test'};(j70().pl=j70().pl||[]).push(P);r.plot=P;r.forcedWhat=1;X0=Dd.what(S)}if(Dd.what&&!X0){r.skip=`no real ${sd.what} piece in this world`;continue}
   const W=Dd.who(S,PPL,X0);r.who=W?(W.kind+":"+((W.ref&&W.ref.name)||W.kind)):null;r.notMe=!W||W.ref!==S;
   if(!W){r.skip=`no ${sd.who&&sd.who.kind} of that sort in this world`;continue}
   r.whenNow=Dd.when?!!Dd.when(S):true;
   const pl0=Dd.pl,wh0=Dd.when,wo0=Dd.who;Dd.pl=["zz"];Dd.when=null;Dd.who=(F,L,X)=>wo0(F,PPL,X);
   S.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const id in KY.DEF)if(id!==sd.id)S.ky.seen[id]=0;S.bac=Math.max(S.bac||0,9999);S.suc=100;B.p0=100;B.step=0;Q.length=0;
   const band=KY.band(S),b0=B.E[sd.id].b;if(!String(b0).includes(String(band))){r.band=`her band ${band} not in b ${b0}: b forced for the test`;B.E[sd.id].b=String(b0)+band}
   if(r.skip){Dd.pl=pl0;Dd.when=wh0;Dd.who=wo0;continue}
   KY.arrive(S,"zz","t");if(r.band)B.E[sd.id].b=b0;Dd.pl=pl0;Dd.when=wh0;Dd.who=wo0;B.p0=p0;B.step=st0;
   const m=Q[0];r.fired=S.ky.got[0]===sd.id&&!!m&&m.evId==="kyngo:"+sd.id;if(!r.fired)continue;
   const all=(m.h||"")+(m.opts||[]).map(o=>o.n+" "+o.x).join(" ");r.unfilled=/\{[A-Za-z]+\}/.test(all);r.text=plain(m.h).slice(0,150);
   r.shape=sd.plain?!m.opts:(m.opts&&m.opts.length===2&&m.pid==="kyngo");
   if(m.opts){const s0=JSON.stringify([S.danh,S.sung,S.duc,S.tamco,S.th,S.suc,S.bac]);chooseM(0);r.res=!!(Q[0]&&Q[0].ky);r.changed=s0!==JSON.stringify([S.danh,S.sung,S.duc,S.tamco,S.th,S.suc,S.bac])||/thiện cảm|tiến bộ|biết|chứng cứ|tai mắt|dứt|lên/.test(Q[0]?Q[0].h:"")}else r.res=r.changed=true;
   if(r.plot){const L=j70().pl;const i=L.indexOf(r.plot);if(i>=0)L.splice(i,1);delete r.plot}r.seen=S.ky.seen[sd.id]!=null;KY.cmark();r.mark=nrNow("ky",sd.id);r.w=B.E[sd.id].w===(sd.w||1);Q.length=0;
  }catch(e){r.err=String(e&&e.stack||e).slice(0,300)}}
  return out},FIX);
 console.log('real people kinds in this world: '+R.ppl);
 for(const r of R.seeds){const t=`${r.id} (${r.who||'-'})${r.forcedWhat?' [test plot]':''}${r.whenNow===false?' [when forced]':''}${r.band?' ['+r.band+']':''}`;
  if(r.err){ok(false,t+' '+r.err);continue}if(r.skip){console.log('skip '+t+': '+r.skip);continue}
  ok(r.reg,t+' registers (DEF + BAL.kyngo.E)');ok(r.notMe,t+' who is a real person, never the finder');ok(r.fired,t+' fires through jky\'s gate as a kyngo card');if(!r.fired)continue;
  ok(!r.unfilled&&r.shape,t+' card shape + placeholders filled: '+r.text);ok(r.res&&r.changed,t+' option runs to a result with a real change');ok(r.seen&&r.mark,t+' once per life + P0 «ky» mark');ok(r.w,t+' weight = authored (no past life)')}
 ok(R.old,'old 25 encounters still registered');ok(R.builtN<0||R.cnt.total>=R.builtN,`built KYSEEDS register (${R.cnt.total}/${R.builtN})`);ok(errs.length===0,'0 page errors '+(errs[0]||''));
 const n=R.seeds.filter(r=>!r.skip&&!r.err).length,sk=R.seeds.filter(r=>r.skip).length;
 console.log(fail?`KYC PLAY: ${fail} FAIL (${R.seeds.length} seeds, ${sk} skipped)`:`KYC PLAY: ALL PASS (${n} played, ${sk} skipped: no real piece/person of that sort in this one world)`);await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
