/* NO HARD LOCK test (review/hardlock-choice; laws 2 + 3). node dev/test/hardlock-choice.js [shotDir]   (after dev/site/build_site.sh; run from the repo root)
   Fold 755x1000 + iPad 1180x820. The owner's case: j68c «VIỆC · Kẻ hầu» j68c-serv-022 (4 stances, all cost bạc) at 46 bạc must leave a road she can
   take (FAILS on LIVE 502c48c9: every road greyed, no ✕). Also: (b) the road taken pays her purse + the rest in Sức priced by the ONE bạc→Sức rule altCost(short, rank) (jstory BAL.bacTuan/altK), on top of
   the road's own Sức, and the card goes; (c) enough bạc → the card is untouched (no tag, no added road); (d) purse 0 and no Sức / Danh to pay with → the kit ✕ «Lui» leave;
   (e) a forced card (mustChoose) whose every road is greyed by rank → the same kit ✕ «Lui» (r3: one leave for every dead card); (f) a greyed road by rank is never paid another way;
   (g) r1 BIG review probe: forced card 2 × {bac:-60,suc:-12}, purse 0, Sức 13, Danh 0 → no swapped road may take her Sức to 0 (FAILS on r1 ea9cfd51:
   both roads open «Sức -24», picked → Sức 0 = death); only the ✕ «Lui»; (h) same card at Sức 40 → road open, own Sức + altCost Sức, she keeps Sức ≥ 1;
   (i) Sức too low for the swap but Danh there → the rest in Danh at the j68c step ratio, Sức never below its floor.
   r3 (25/11, ONE rule with LIVE's dead-card net, law 14): LIVE 1f0a491a gave serv-022 a bạc-free stance (data law 2), so (a)–(d) build the REAL
   card and put back its old all-bạc price (the bạc-free road costs the same bạc as a one-step road) = the owner's case as found; (a0) the real
   card as it is now at 46 bạc is untouched (a road she can take, no tag, no leave). (d)(e)(g): the one leave is the kit close word «Lui»
   as the card's cancel = the kit ✕, open or forced card (jdeadcard's look, now inside jnolock); it leaves, nothing paid. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(process.cwd());const SHOT=process.argv[2]||null;
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
let fail=0;const ok=(c,m)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m)};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1,reducedMotion:'reduce'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
  await g.evaluate(()=>{SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv()))break}
   ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;$('modal').hidden=true;window.__bot=1;
   S.srv=null;S.rank=Math.max(S.rank||0,3);if(!S.maid)S.maid=newMaid(nmNew('maid'),50);render()});
  await p.waitForTimeout(2500);await g.evaluate(()=>{Q.length=0;$('modal').hidden=true;window.__e68off=1});/* the j68 scheduler (evGate) may hold a card back for later: off, so the test card shows now */
  /* the DOM as she sees it: roads she can tap, and whether the card has a ✕ */
  await g.evaluate(()=>{window.__hlLook=()=>{const M=$('modal');const bs=[...M.querySelectorAll('.opts > button.opt')];const en=bs.filter(b=>!b.disabled);
   const x=typeof kitModalCloser==='function'&&!!kitModalCloser();return{q:Q.map(m=>m.t),shown:!M.hidden,n:bs.length,en:en.length,x,names:bs.map(b=>(b.disabled?'[off] ':'')+((b.querySelector('.kan,.kat')||b).textContent||'').replace(/\s+/g,' ').trim().slice(0,60))}}});
  const look=()=>g.evaluate(()=>window.__hlLook());
  const serv=(bac,old=1)=>g.evaluate(([bac,old])=>{const f=(bac)=>{Q.length=0;$('modal').hidden=true;S.bac=bac;S.suc=Math.max(S.suc||0,60);const s=E68I['c:j68c-serv-022'];if(!s)return 'no seed';let pp=s.pp();if(!pp)return 'no cast';pp.vi=0;
   const d=mkP('e68'+s.id,pp);if(!d)return 'no build';
   if(old){const b1=Math.max(...d.o.map(c=>(c.fx&&c.fx.bac<0)?c.fx.bac:-Infinity));d.o.forEach(c=>{if(c.fx&&!(c.fx.bac<0)){c.fx.bac=b1;c.off=null;delete c.off}})}/* the pre-1f0a491a price: every stance costs bạc */
   if(bac==='short'){S.bac=Math.max(0,Math.min(...d.o.filter(c=>c.fx&&c.fx.bac<0).map(c=>-c.fx.bac))-14)}/* the owner's case: 14 bạc short of the cheapest road (60 → 46 as found) */
   e68Push(d,s);showModal();return ''};const e=f(bac);return [e,window.__hlLook()]},[bac,old]).then(([e,l])=>{L=l;return e});
  // (a0) the real card now (LIVE data: one bạc-free stance) at 46 bạc: a road she can take, untouched by the net
  let L=null;let e=await serv(46,0);const a0=await g.evaluate(()=>!Q[0]?{tag:'gone',add:'gone'}:({tag:Q[0].opts.some(c=>BAL.nolock&&String(c.n).endsWith(BAL.nolock.tag)),add:Q[0].opts.some(c=>c.__nlAdd)}));
  ok(!e&&L.en>0&&!a0.tag&&!a0.add,`${dev}: (a0) real j68c-serv-022 at 46 bạc: ${L.en} open, untouched (tag ${a0.tag}, leave ${a0.add})`);
  // (a) the owner's case
  e=await serv('short');ok(!e,`${dev}: j68c-serv-022 built at the old all-bạc price (${e||'ok'})`);
  ok(L.shown&&L.n===4,`${dev}: card shown with its 4 roads (${L.n}; Q ${JSON.stringify(L.q)})`);
  ok(L.en>0||L.x,`${dev}: 14 bạc short of every road she can take a road (${L.en} open, ✕ ${L.x}) — ${L.names.join(' | ')}`);
  if(SHOT){fs.mkdirSync(SHOT,{recursive:true});await g.evaluate(()=>{document.querySelectorAll('#kmrew,.kmrew').forEach(e=>e.remove())});await p.screenshot({path:path.join(SHOT,`serv022-46-${dev}.png`)})}
  // (b) take it: purse paid, the rest in Sức, the card gone
  const r=await g.evaluate(()=>{const m=Q[0];if(!m)return null;const i=m.opts.findIndex(c=>typeof kitTakeable==='function'?kitTakeable(c,m):!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));if(i<0)return null;const c=m.opts[i];const fx=Object.assign({},c.fx),s0={bac:S.bac,suc:S.suc,danh:S.danh};
   const short=-((c.__nl&&c.__nl.fx.bac)||0)-s0.bac;chooseM(i);return{fx,s0,s1:{bac:S.bac,suc:S.suc,danh:S.danh},short,gone:Q[0]!==m,own:(c.__nl&&c.__nl.fx.suc)||0,alt:typeof altCost==='function'?altCost(short,S.rank,(BAL.nolock||{}).floor||0,0).suc:null,tag:BAL.nolock?c.n.endsWith(BAL.nolock.tag):false}});
  ok(r&&r.gone,`${dev}: the road is taken and the card goes`);
  if(r){ok(r.s1.bac>=0&&r.fx.bac===-r.s0.bac,`${dev}: her whole purse paid (${r.s0.bac} → ${r.s1.bac}), never below 0`);
   ok(r.fx.suc<0&&r.alt>0&&-(r.fx.suc-r.own)===r.alt&&r.tag,`${dev}: the rest (${r.short} bạc) paid as Sức ${r.fx.suc} = own ${r.own} + altCost ${r.alt ==null?'none':-r.alt} (the one bạc→Sức rule at her rank), road tagged`)}
  // (c) enough bạc: untouched
  e=await serv(5000);ok(!e,`${dev}: rebuilt (${e||'ok'})`);const c3=await g.evaluate(()=>!Q[0]?{tag:'gone',add:'gone'}:({tag:Q[0].opts.some(c=>BAL.nolock&&String(c.n).endsWith(BAL.nolock.tag)),add:Q[0].opts.some(c=>c.__nlAdd)}));
  ok(L.en===4&&!c3.tag&&!c3.add,`${dev}: with enough bạc the card is untouched (${L.en} open, tag ${c3.tag}, added ${c3.add})`);
  // (d) nothing to pay with: a ✕ leave
  e=await serv(0);ok(!e,`${dev}: rebuilt (${e||'ok'})`);L=await g.evaluate(()=>{if(!Q[0])return {gone:1};S.suc=1;S.danh=0;showModal();return Object.assign(window.__hlLook(),{lui:Q[0].opts.some(c=>c.__nlAdd&&c.n==='Lui')})});
  ok(L.x&&L.en===0&&L.lui,`${dev}: purse 0, no Sức / Danh → the card gets the kit ✕ «Lui» (✕ ${L.x}, ${L.en} open)`);
  const d2=await g.evaluate(()=>{const m=Q[0];kitModalClose();return{gone:Q[0]!==m,bac:S.bac}});ok(d2.gone&&d2.bac===0,`${dev}: the ✕ leaves the card, nothing paid`);
  await g.evaluate(()=>{S.suc=60;S.danh=30});
  // (e) a forced card, every road greyed by rank → the same kit ✕ «Lui» (one leave for every dead card); (f) never paid another way
  const f=await g.evaluate(()=>{Q.length=0;$('modal').hidden=true;S.bac=0;Q.push({t:'Thử',h:'<p>thử</p>',mustChoose:1,opts:[kitOff({n:'Đường A',fx:{bac:-50},x:''},kitWhyRank(RANKS.length-1),kitWhenRank()),kitOff({n:'Đường B',fx:{danh:-2},x:''},kitWhyRank(RANKS.length-1),kitWhenRank())]});showModal();
   const m=Q[0];return{L:window.__hlLook(),n:m.opts.length,last:m.opts[m.opts.length-1].n,aBac:m.opts[0].fx.bac,aOff:!!m.opts[0].off}});
  L=f.L;ok(f.n===3&&f.last==='Lui'&&L.en===0&&L.x,`${dev}: forced card greyed by rank → the kit ✕ «Lui», no open road (✕ ${L.x}, ${L.en} open: ${L.names.join(' | ')})`);
  ok(f.aBac===-50&&f.aOff,`${dev}: a road greyed by rank keeps its price and its grey (never paid another way)`);
  const f2=await g.evaluate(()=>{const m=Q[0];const b=S.bac,d=S.danh;kitModalClose();return Q[0]!==m&&S.bac===b&&S.danh===d});ok(f2,`${dev}: the ✕ «Lui» leaves the forced card, nothing paid`);
  // (g)(h)(i) the swap never stacks past her floor (r1 BIG review probe)
  const probe=(suc,danh)=>g.evaluate(([suc,danh])=>{Q.length=0;$('modal').hidden=true;S.bac=0;S.suc=suc;S.danh=danh;
   Q.push({t:'Thử',h:'<p>thử</p>',mustChoose:1,opts:[{n:'Đường A',fx:{bac:-60,suc:-12},x:''},{n:'Đường B',fx:{bac:-60,suc:-12},x:''}]});showModal();
   const m=Q[0],Lk=window.__hlLook();const tk=c=>typeof kitTakeable==='function'?kitTakeable(c,m):!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0);const i=m.opts.findIndex(c=>!c.__nlAdd&&tk(c));const fx=i>=0?Object.assign({},m.opts[i].fx):null;
   const alt=altCost(60,S.rank,(BAL.nolock||{}).floor||0,0).suc;if(i>=0)chooseM(i);else if(m.opts[m.opts.length-1].__nlAdd)chooseM(m.opts.length-1);
   const out={L:Lk,i,fx,alt,suc:S.suc,danh:S.danh,gone:Q[0]!==m,last:m.opts[m.opts.length-1].n};Q.length=0;$('modal').hidden=true;return out},[suc,danh]);
  let P=await probe(13,0);
  ok(P.i<0&&P.last==='Lui'&&P.suc===13&&P.gone,`${dev}: (g) 2×{bac:-60,suc:-12}, purse 0, Sức 13, Danh 0 → no swapped road open, only the ✕ «Lui»; Sức stays ${P.suc} (r1: Sức -24 → 0 = death) — ${P.L.names.join(' | ')}`);
  P=await probe(40,0);
  ok(P.i>=0&&P.fx.suc===-12-P.alt&&P.suc===40-12-P.alt&&P.suc>=1,`${dev}: (h) Sức 40 → road open, Sức ${P.fx&&P.fx.suc} = own -12 + altCost -${P.alt}; she keeps Sức ${P.suc} ≥ 1`);
  P=await probe(14,30);
  ok(P.i>=0&&P.suc>=1&&P.fx.danh<0&&P.danh===30+P.fx.danh,`${dev}: (i) Sức 14, Danh 30 → the rest in Danh (${JSON.stringify(P.fx)}); Sức ${P.suc} ≥ 1, Danh ${P.danh}`);
  await g.evaluate(()=>{S.suc=60;S.danh=30});
  ok(!errs.length,`${dev}: 0 page errors ${errs.slice(0,3).join(' / ')}`);await ctx.close()}
 await b.close();srv.close();console.log(fail?`HARDLOCK-CHOICE FAIL (${fail})`:'HARDLOCK-CHOICE ALL PASS');process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
