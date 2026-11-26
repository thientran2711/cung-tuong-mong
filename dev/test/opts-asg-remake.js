/* save r6 (BIG rv save-fix-stack, LAW 11 «.opts=» family): cards whose options were given AFTER they were made — j75 «Thái y bắt mạch» (week
   flip), jtsb visitor answers on the j24 ap.* cards, jtoilr reaction answers on the toilPop cards — must come back from the sổ (serQ → JSON →
   deserQ, the true-reload path) with the SAME title and the SAME answers. usage: node dev/test/opts-asg-remake.js index.html [other.html …]
   → exit 1 on FAIL (the build before the fix FAILs: preg LOST, tsb other answers, toil answers missing) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);
(async()=>{const root=path.resolve(__dirname,'../..');const http=require('http');
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html':'text/javascript'});r.end(b)})}).listen(0);
 const b=await chromium.launch();let bad=0;
 for(const page of process.argv.slice(2)){const ctx=await D.newDeviceContext(b,'fold',{serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();
  const errs=[];p.on('pageerror',e=>errs.push(String(e.message).slice(0,120)));
  await D.openDirect(p,`http://127.0.0.1:${srv.address().port}/${page}`);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H);
  const R=await p.evaluate(async()=>{__sbr.newLife();await __sbr.settle();const out={};
   const fp=m=>m?JSON.stringify([m.t,(m.opts||[]).map(o=>o&&[o.n,o.x,JSON.stringify(o.fx||{})]),m.who&&m.who.w]):'LOST';
   const trip=m=>{Q.length=0;Q.push(m);const L=JSON.parse(JSON.stringify(serQ()));Q.length=0;const back=deserQ(L)||[];return back.find(x=>x&&x.t===m.t)||null};
   const run=(name,mk)=>{try{const m=mk();if(!m){out[name]={err:'not made'};return}const a=fp(m);const c=trip(m);out[name]={same:a===fp(c),rk:m.rk||null,saveable:jqSaveable(m),before:a.slice(0,160),after:fp(c).slice(0,160)}}catch(e){out[name]={err:String(e&&e.message)}}};
   const V=liveRivals(true);const v=V[0],v2=V[1]||V[0];
   /* 1. j75 finding card at the week flip (can hide) */
   run('pregFind',()=>{Q.length=0;S.preg=2;S.pregUnk=1;S.pregDisc=0;S.hidden=true;S.fake=0;pregFind();return Q.find(x=>x&&x.t==='Thái y bắt mạch')});
   /* 2. jtsb answers on the j24 visitor cards: run the approachOne wrappers on a real ap.* card (the inner pick is stubbed to that card) */
   const apWrapped=(kind,o)=>{const inner=AP_MK[kind](o);/* re-run only the jtsb wrappers by stubbing npwAsk so approachOne picks this kind / person */
     /* outer wrappers (j95 rumours, j68 events, j25 faction) may put another card in its place: try again until the visitor card comes */
     window.__j95off=1;window.__e68off=1;/* the motive gate (j95) and the j68 situations decide WHETHER a visit comes: here it must come */
     const n0=npwAsk;npwAsk=(k)=>k===kind?[Object.assign({kind,s:1},o)]:[];let m=null;try{for(let i=0;i<40;i++){m=approachOne();if(m&&m.t===inner.t&&String((m.who||{}).w||(m.who||{}).name)===String((inner.who||{}).w||(inner.who||{}).name)&&/rk|ap\.|tsbAp/.test(String(m.rk||"rk")))break;m=null}}finally{npwAsk=n0;window.__j95off=0;window.__e68off=0}return m};
   run('tsb mock',()=>apWrapped('apTaunt',{who:v,why:'ghen ghét'}));
   run('tsb ally',()=>{for(const x of V){const m=apWrapped('apFriend',{who:x,sub:'ally'});if(m)return m}return null});
   run('tsb thCall',()=>apWrapped('thCall',{}));
   {const v3=V.find(x=>(x.staff||[]).some(y=>y&&y.name));if(v3)run('tsb svDefect',()=>apWrapped('svDefect',{who:v3.staff.find(y=>y&&y.name),tgt:v3}));else out['tsb svDefect']={same:true,skip:'no rival staff'}}
   /* 2b. jagknow «Có người bán tin» (the news object carries code: before, no rk at all; probe iPad seed 1 rv10) */
   {let r=null;try{for(const x of [S]){const L=[];for(const s of (typeof knAllSrv==='function'?knAllSrv():[]).filter(y=>y&&y.name)){const N=knSellNews(S,s);if(N.length){/* a fact that carries code (f.go, as j78 facts with a follow-up do; probe iPad seed 1) */const n=N[0];r={s,n:Object.assign({},n,{f:Object.assign({},n.f||{},{go:()=>''})})};break}}if(r)break}}catch(e){}
    if(r)run('knSell',()=>knSellCard(r.s,r.n));else out['knSell']={same:true,skip:'no seller with news'}}
   /* 3. jtoilr answers on a reaction card (a slight from a consort) */
   run('toil rx',()=>{Q.length=0;const k='rival-tease';TOIL_POP.length=0;
     TOIL_POP.push({k,who:pv(v),host:v,n:-4,name:v.name,line:'son phấn nhạt'});toilFlush();return Q.find(x=>x&&x.toilEv===k)});
   return out});
  for(const [k,r] of Object.entries(R)){const pass=r.same===true;if(!pass)bad++;console.log(page,k,pass?'PASS':'FAIL',JSON.stringify(r))}
  if(errs.length)console.log(page,'page errors',errs.slice(0,3));await ctx.close()}
 await b.close();srv.close();process.exit(bad?1:0)})();
