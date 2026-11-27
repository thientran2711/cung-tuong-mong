/* mg-trim (owner OD 26/11 ~05:10Z, verbatim: "Những trò liên quan tới cơ may thành công thì nên giữ chứ, như trò nghiệm thân đó. Còn trò tát hay né thì bỏ,
   chừa thêm nút «Tự tay điểm trang, 3 không ra đồ, học nhanh cho lên tùy duyên đi."; report dev/handover/reports/mg-trim.md on the handover branch).
   REAL TAPS (page.tap / mouse), Fold 755x1000 + iPad 1180x820, video per size (VID=<dir>):
   1 BAL.skip.od = Tùy duyên; a learning game's quick reads «Học nhanh · Tùy duyên»; a contest keeps «Bỏ qua»
   2 Điểm trang: one-tap «Điểm trang» (kit .kbtn, odds words per look) + «Tự tay điểm trang» + «Để mặt mộc»; the tap = the face-table draw on her hand; no mirror opens
   3 «Tự tay điểm trang» still opens the mirror game (colour screen)
   4 Dung counts (her odds rise with Dung; an NPC's hand rises with HER OWN Dung, law 1); rank demand: the same draw scores lower at a higher rank (law 5)
   5 her Tát: no game frame; the tier is slapNpcTier(S) (the NPC draw)
   6 an NPC slaps her: «Né đòn» shows its odds word; one tap = one roll, no game frame; the result card follows
   7 kept cơ-may games still open their boards (a scheme act game sgPlay exists, Dư đồ class A acts keep their engine)
   8 no page errors
   10 BIG rv fixes 2–4 (Tự tay rank demand, her hand in the slap draw + gap to target, «Học nhanh» on every lesson quick)
   9 pet care + plant watering (owner OD 26/11 ~05:45Z): boards kept; «Chăm nhanh» on the rules screen like «Học nhanh»; «Giao … chăm» on pets + plants
   usage: node dev/test/mg-trim.js <dev dir or url> [755x1000@2,1180x820@2] */
const {chromium}=require('playwright');const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,SIZES]=process.argv;URL=URL||'dev';
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;const ok=(n,c,x)=>{if(!c)bad++;console.log(`${c?'PASS':'FAIL'} ${n}${x!==undefined?' '+JSON.stringify(x).slice(0,500):''}`)};
const VID=process.env.VID||'';
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];console.log('== '+sz);
  const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'},VID?{recordVideo:{dir:VID,size:{width:W,height:H}}}:{}));
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  /* boot = the delegate-nomg pattern (pre-palace roads skipped with __nlInner; the «Sửa soạn nhập cung» loader tapped through) */
  await p.evaluate(()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;window.__forceOrigin='cn';for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out)break}});
  await p.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await sleep(1500);
  try{await require('./lib/roulette').dismissRoulette(p)}catch(e){}
  for(let k=0;k<30;k++){const gone=await p.evaluate(()=>{const r=document.getElementById('kmrew');if(r)r.remove();const bt=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent||'')&&x.offsetParent);if(bt)bt.click();return !/Sửa soạn nhập cung/.test(document.body.innerText||'')});if(gone&&k>2)break;await sleep(1500)}
  for(let k=0;k<12;k++){const n=await p.evaluate(()=>{const m=document.getElementById('modal');if(!m||m.hidden)return 0;const bt=[...m.querySelectorAll('button')].find(x=>/^(Đã hiểu|Tiếp|Vào cung ngay)/.test(x.innerText.trim()));if(bt){bt.click();return 1}return 0});if(!n)break;await sleep(900)}
  await p.waitForFunction(()=>typeof rivals!=='undefined'&&rivals.some(v=>v.alive&&!v.out),null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>{new MutationObserver(()=>{if(!window.__keepRev)document.querySelectorAll('.ktrv-ov').forEach(e=>e.remove())}).observe(document.body,{childList:true,subtree:true});Q.length=0;document.getElementById('modal').hidden=true;S.suc=90;S.bac=Math.max(S.bac||0,500);render()});await sleep(800);
  const tap=async sel=>{const e=await p.waitForSelector(sel,{state:'visible',timeout:30000});await e.scrollIntoViewIfNeeded();await e.tap();await sleep(500)};
  const txt=sel=>p.evaluate(s=>{const e=document.querySelector(s);return e?e.textContent.replace(/\s+/g,' ').trim():null},sel);
  /* 1 */
  const o1=await p.evaluate(()=>({od:BAL.skip.od,w:word(BAL.skip.od)}));ok('1 BAL.skip.od = Tùy duyên (owner «học nhanh cho lên tùy duyên»)',o1.od===50&&o1.w==="Tùy duyên",o1);
  await p.evaluate(()=>{playArt({art:"cam",title:"Học Cầm",quick:{n:"Học nhanh",roll:1,win:"tiến bộ một phần, không ra thành phẩm",lose:"không tiến bộ"},onDone(){}})});await sleep(1200);
  const lq=await txt('#kg82skip');ok('1 a lesson quick reads «Học nhanh» + Tùy duyên',/^Học nhanh/.test(lq||"")&&/Tùy duyên/.test(lq||""),lq);await sleep(600);
  await p.evaluate(()=>{try{kg82Close()}catch(e){}});
  const cq=await p.evaluate(()=>{const h=kitQuick({id:"x",n:"Để tài nghệ quyết định",sub:"kết quả khá"});return h.replace(/<[^>]+>/g," ").trim()});ok('1 a contest quick keeps «Bỏ qua»',/^Bỏ qua/.test(cq),cq);
  /* 2 */
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.buoi=0;delete S.toilette;vNorm(S);S.vir=S.vir||{};S.vir.dung=3;try{kg82Close()}catch(e){}toilOpen()});await sleep(1200);
  await p.evaluate(()=>toilDressDone(true));await sleep(900);
  const bt=await p.evaluate(()=>['toilquick','toilmk','toilmoc'].map(id=>{const e=document.getElementById(id);return e?{id,t:e.innerText.replace(/\s+/g,' '),cls:e.className}:null}));
  ok('2 dress screen: «Điểm trang» (kit .kbtn, odds words) · «Tự tay điểm trang» · «Để mặt mộc»',bt[0]&&/^Điểm trang/.test(bt[0].t)&&/Đoan trang: (Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/.test(bt[0].t)&&!/%/.test(bt[0].t)&&/\bkbtn\b/.test(bt[0].cls)&&!/kquick/.test(bt[0].cls)&&bt[1]&&/Tự tay điểm trang/.test(bt[1].t)&&bt[2]&&/mộc/.test(bt[2].t),bt);
  const want=await p.evaluate(()=>{const r=toilRollOf(toilRollSeed());return{score:r.score,vung:r.look==="vung"}});await sleep(800);
  await p.evaluate(()=>{window.__keepRev=1});await tap('#toilquick');
  /* the look reveal (jtoil toilReveal: close-up + the result rows, «Chạm để bỏ qua») plays as in LIVE; she taps through it */
  const rv=await p.waitForSelector('.ktrv-ov',{timeout:15000}).then(()=>1).catch(()=>0);const rvTxt=rv?await txt('.ktrv-ov .ktrv-card'):null;await sleep(3500);
  if(rv){for(let k=0;k<12;k++){const nx=await p.$('.ktrv-ov button');if(nx&&await nx.isVisible()){await sleep(1500);await nx.tap();break}try{await p.tap('.ktrv-ov .kmhint',{timeout:3000})}catch(e){}await sleep(1000)}}/* the scene ends with the ONE kit scene-end button «Tiếp theo» (KIT 81) */
  await p.waitForFunction(()=>!document.querySelector('.ktrv-ov')&&/dung nhan/i.test((document.querySelector('#kg82')||{}).innerText||''),null,{timeout:30000}).catch(()=>{});await p.evaluate(()=>{window.__keepRev=0});await sleep(1500);
  const r2=await p.evaluate(()=>({made:S.toilette&&S.toilette.makeup,score:S.toilette&&S.toilette.score,mk:toilMk(S.toilette),mirror:!!document.querySelector('#kg82 canvas'),rows:(document.querySelector('#kg82')||{}).innerText||""}));
  ok('2 one tap = the face-table draw on her hand; no mirror canvas; the look reveal shows Dung nhan, then the result rows follow',r2.made&&r2.score===want.score&&(want.vung?r2.mk==="vung":r2.mk!=="vung")&&!r2.mirror&&rv&&/Dung nhan/.test(rvTxt||"")&&/dung nhan/i.test(r2.rows),{r2:Object.assign({},r2,{rows:r2.rows.slice(0,200)}),want,rvTxt});
  await sleep(1200);const okb=await p.$('#kg82ok,#toildone');if(okb){try{await okb.tap()}catch(e){}}await sleep(500);
  /* 3 */
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;delete S.toilette;try{kg82Close()}catch(e){}toilOpen()});await sleep(1000);await p.evaluate(()=>toilDressDone(true));await sleep(700);
  await tap('#toilmk');await sleep(1200);const r3=await p.evaluate(()=>({sw:!!document.querySelector('.kswt-rset'),go:!!document.getElementById('toilgo'),q2:(document.getElementById('toilquick2')||{}).innerText||""}));
  ok('3 «Tự tay điểm trang» opens the colour screen of the mirror game (its own «Tự tay» + one-tap again)',r3.sw&&r3.go,r3);await sleep(800);
  await p.evaluate(()=>{try{kg82Close()}catch(e){}TOIL.st=null});
  /* 4 */
  const r4=await p.evaluate(()=>{const o={};for(const d of [0,5]){S.vir.dung=d;o["d"+d]=toilRollOdds()}const v=liveRivals(true).find(x=>x!==S&&x.alive&&!x.out);vNorm(v);v.vir=v.vir||{};const d0=v.vir.dung||0;v.vir.dung=0;o.n0=toilNpcSk(v);v.vir.dung=5;o.n5=toilNpcSk(v);v.vir.dung=d0;
   const sk=.4;o.r0=toilNpcPlay(sk,"t:1",{},"","fit",[],0,null).score;o.r7=toilNpcPlay(sk,"t:1",{},"","fit",[],7,null).score;o.dem=BAL.toil.rkDemand;return o});
  ok('4 Dung raises her one-tap odds; an NPC hand rises with her own Dung (law 1); higher rank = the same draw scores lower (law 5)',r4.d5.vua>=r4.d0.vua&&r4.d5.dep>r4.d0.dep&&r4.n5>r4.n0&&r4.r0-r4.r7===Math.min(r4.r0,7*r4.dem),r4);
  /* 5 */
  const r5=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;/* a lower-rank rival standing where she stands (the test sets the scene; ACT.tat.ok = together + rank above + no fresh slap) */{const v=rivals.find(x=>x.alive&&!x.out&&!x.queen);if(v){v.rank=0;S.place=whereOf(v);if(v.slap)v.slap.until=0}}const i=rivals.findIndex(v=>v.alive&&!v.out&&ACT.tat&&ACT.tat.ok(S,v));if(i<0)return{none:1};let spy=0;const t0=slapNpcTier;slapNpcTier=a=>{spy+=a===S?1:0;return t0(a)};S.khac=Math.max(S.khac||0,8);
   let open=false;try{doAct(i,"tat")}finally{slapNpcTier=t0}const k=document.getElementById('kg82');open=!!(k&&!k.hidden&&k.querySelector('canvas'));return{spy,open,logs:(S.logs||[]).slice(0,1).map(x=>String(x).replace(/<[^>]+>/g,"").slice(0,90))}});
  ok('5 her Tát: no game frame, the tier = slapNpcTier(S)',!r5.none&&r5.spy>=1&&!r5.open,r5);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(500);
  /* 6 */
  await p.evaluate(()=>{const v=liveRivals(true).find(x=>x!==S&&x.alive&&!x.out);v.rank=Math.max(v.rank||0,(S.rank||0)+1);window.__v=v;Q.length=0;document.getElementById('modal').hidden=true;/* scene set-up only (not under test): she stands with the slapper, the slapper knows her, the motive gate (j95) is off for this one act */S.place=whereOf(v);try{npcLearn(v,S)}catch(e){}window.__j95off=1;try{runAct(v,S,"tat")}finally{window.__j95off=0}showModal()});await sleep(1200);
  const card=await p.evaluate(()=>{const m=document.getElementById('modal');const bs=[...m.querySelectorAll('button')].map(b=>b.innerText.replace(/\s+/g,' '));return{t:m.innerText.slice(0,80).replace(/\s+/g,' '),bs}});
  const dodge=card.bs.find(x=>/^Né đòn/.test(x))||"";ok('6 NPC slap card: «Né đòn» shows an odds word and no «ván ngắn» game line',/(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/.test(dodge)&&!/ván ngắn/.test(dodge),card);
  const nb=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button')].find(b=>/^Né đòn/.test(b.innerText.trim())));if(nb&&nb.asElement()){await nb.asElement().tap();await sleep(1500)}
  const r6=await p.evaluate(()=>{const k=document.getElementById('kg82');return{game:!!(k&&!k.hidden&&k.querySelector('canvas')),modal:!document.getElementById('modal').hidden,t:document.getElementById('modal').innerText.slice(0,140).replace(/\s+/g,' ')}});
  ok('6 one tap «Né đòn» = one roll: no game frame, the result card follows',!r6.game&&r6.modal&&/tát|né/i.test(r6.t),r6);await sleep(1000);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
  /* 7 */
  const r7=await p.evaluate(()=>({sg:typeof sgPlay==="function",dfA:Object.keys(DFG.ENG).length,rt:typeof rtNgSleight==="function",dfOn:BAL.df.on}));ok('7 kept cơ-may games: scheme boards, Dư đồ engines, nghiệm thân still there',r7.sg&&r7.dfA===7&&r7.rt&&r7.dfOn===1,r7);
  /* 9 owner OD 26/11 ~05:45Z verbatim: "Trò chăm thú cưng và tưới cây giữ như cũ và option chăm nhanh như học nhanh hoặc giao người chăm" — real taps */
  const pi=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{kg82Close()}catch(e){}S.khac=Math.max(S.khac||0,8);if(!tsbPets(S).length)petAdd(S,Object.keys(PET)[0],"test");
   const m=S.maid;if(m)m.loyal=Math.max(m.loyal||0,BAL.loy.close+5);const k=Object.keys(BAL.shelf.it).find(x=>BAL.shelf.it[x].care==="cay");shelfOf(S).g.t9={k,pc:50};delete shelfOf(S).g.t9.pm;petcOpen(0);return{k,maid:!!tsbMaid(S),n:tsbPets(S).length,kp:!!document.getElementById("kpcare"),mh:document.getElementById("modal").hidden,q:Q.map(x=>x.t)}});await sleep(1000);/* a first-time tip (kit «lời dặn lần đầu») may come first: she reads it and taps on */
  for(let k=0;k<6;k++){if(await p.$('[data-petc="feed"]'))break;await p.evaluate(()=>{const m=document.getElementById('modal');const bt=[...m.querySelectorAll('button')].find(x=>/^(Đã hiểu|Tiếp|Lui)/.test(x.innerText.trim()));if(bt)bt.click()});await sleep(900)}
  const pg=await p.evaluate(()=>{const g=document.querySelector('[data-petc="maid"]');return{maid:g?g.innerText.replace(/\s+/g,' '):null}});
  await tap('[data-petc="feed"]');await sleep(800);const pq=await txt('#kpcquick');const board=await p.evaluate(()=>!!document.getElementById('kpcgame'));
  ok('9 pet care: the board stays (rules screen) + «Chăm nhanh» (Tùy duyên) like «Học nhanh» + «Giao … chăm»',board&&/^Chăm nhanh/.test(pq||"")&&/Tùy duyên/.test(pq||"")&&!!pg.maid&&/^Giao /.test(pg.maid),{pi,pg,pq});
  await tap('#kpcquick');await sleep(1200);const pr=await p.evaluate(()=>(document.getElementById('kpcare')||{}).innerText||"");ok("9 «Chăm nhanh» = one tap, the result line («Vừa rồi») follows",/Vừa rồi/i.test(pr),pr.slice(0,300));
  await p.evaluate(()=>{try{petcClose()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;shelfPlantOpen("t9")});await sleep(1000);
  const gv=await txt('[data-shc="give"]');const pc0=await p.evaluate(()=>shelfOf(S).g.t9.pc);await tap('[data-shc="give"]');await sleep(900);
  const r9=await p.evaluate(()=>{const e=shelfOf(S).g.t9,b=document.querySelector('[data-shc="give"]');return{pc:e.pc,pm:e.pm===wk(),lock:b?(b.disabled||/đã chăm/.test(b.innerText)):null}});
  ok('9 plant: «Giao … chăm» = the week\'s servant care now, 0 khắc, once a tuần (no double)',/^Giao /.test(gv||"")&&r9.pc>pc0&&r9.pm&&r9.lock,{gv,pc0,r9});
  await p.evaluate(()=>{delete shelfOf(S).g.t9.pm;shelfPlantDraw("")});await sleep(500);await tap('[data-shc="water"]');await sleep(800);const wq=await txt('#kshpquick');const wb=await p.evaluate(()=>!!document.getElementById('kshpgame'));
  ok('9 plant watering: the board stays + «Chăm nhanh» (Tùy duyên)',wb&&/^Chăm nhanh/.test(wq||"")&&/Tùy duyên/.test(wq||""),wq);
  await p.evaluate(()=>{try{kgTutDrop()}catch(e){}SHPC.game=null;try{closeModal()}catch(e){}});await sleep(800);
  /* 10 BIG rv fixes: (2) «Tự tay» face score has the same rank demand; (3) her slap = the same hand-aware draw, fallback gap to the target; (4) «Học nhanh» on every lesson quick */
  const r10=await p.evaluate(()=>{const o={};Q.length=0;document.getElementById('modal').hidden=true;try{kg82Close()}catch(e){}
   const sc=rk=>{delete S.toilette;toilOpen();toilDressDone(true);TOIL.st.parts={brow:.7,powder:.7,son:.7};const r0=S.rank;S.rank=rk;try{toilFinish(true)}finally{S.rank=r0}const v=S.toilette.score;try{kg82Close()}catch(e){}TOIL.st=null;return v};
   o.s0=sc(0);o.s3=sc(3);o.dem=BAL.toil.rkDemand;
   let seen=0;const h0=window.mgHandEff;window.mgHandEff=function(k,pp){if(pp===S)seen++;return h0.apply(this,arguments)};try{eval("mgHandEff=window.mgHandEff")}catch(e){}try{for(let i=0;i<5;i++)slapNpcDraw(S)}finally{window.mgHandEff=h0;try{eval("mgHandEff=window.mgHandEff")}catch(e){}}o.hand=seen;
   o.gap=/rkOf\(a\)-rkOf\(t\|\|S\)/.test(String(slapNpcTier));
   try{openMG("cam",1,()=>{});o.j5=(document.getElementById('mgskip')||{}).innerText||"";document.getElementById('ov').hidden=true}catch(e){o.j5="ERR "+e.message}return o});
  ok('10 (2) «Tự tay điểm trang» score − rank demand (same as the one tap + NPCs)',r10.s0-r10.s3===Math.min(r10.s0,3*r10.dem),r10);
  ok('10 (3) her slap draw reads HER hand (mgHandEff(S)); fallback gap = slapper → target',r10.hand>=1&&r10.gap,r10);
  ok('10 (4) the old lesson overlay quick reads «Học nhanh»',/^Học nhanh/.test(r10.j5.trim()),r10.j5);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
  ok('8 no page errors',!errs.length,errs.slice(0,3));
  await ctx.close();if(VID){const f=fs.readdirSync(VID).filter(x=>/\.webm$/.test(x)).map(x=>[x,fs.statSync(path.join(VID,x)).mtimeMs]).sort((a,c)=>c[1]-a[1])[0];if(f)fs.renameSync(path.join(VID,f[0]),path.join(VID,`mg-trim-${W}x${H}.webm`))}}
 await b.close();if(SV)SV.close();console.log(bad?`FAIL ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
