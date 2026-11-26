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
  for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
   await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});if(await p.evaluate(()=>!isSrv()&&!S.out))break}
  try{await require('./lib/roulette').dismissRoulette(p)}catch(e){}await sleep(1200);
  for(let i=0;i<8;i++){const go=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal:not([hidden]) button')].find(x=>/^Vào cung ngay/.test(x.innerText.trim()));if(b){b.click();return 1}return 0});if(!go)break;await sleep(1500)}
  await p.waitForFunction(()=>typeof rivals!=='undefined'&&rivals.some(v=>v.alive&&!v.out),null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>{new MutationObserver(()=>document.querySelectorAll('.ktrv-ov').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});Q.length=0;document.getElementById('modal').hidden=true;S.suc=90;S.bac=Math.max(S.bac||0,500);render()});await sleep(800);
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
  await tap('#toilquick');await p.waitForFunction(()=>/Dung nhan/.test((document.querySelector('#kg82')||{}).innerText||''),null,{timeout:30000}).catch(()=>{});await sleep(800);
  const r2=await p.evaluate(()=>({made:S.toilette&&S.toilette.makeup,score:S.toilette&&S.toilette.score,mk:toilMk(S.toilette),mirror:!!document.querySelector('#kg82 canvas'),rows:(document.querySelector('#kg82')||{}).innerText||""}));
  ok('2 one tap = the face-table draw on her hand; no mirror canvas; result rows follow',r2.made&&r2.score===want.score&&(want.vung?r2.mk==="vung":r2.mk!=="vung")&&!r2.mirror,{r2:Object.assign({},r2,{rows:r2.rows.slice(0,160)}),want});
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
  const r5=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const i=rivals.findIndex(v=>v.alive&&!v.out&&ACT.tat&&ACT.tat.ok(S,v));if(i<0)return{none:1};let spy=0;const t0=slapNpcTier;slapNpcTier=a=>{spy+=a===S?1:0;return t0(a)};S.khac=Math.max(S.khac||0,8);
   let open=false;try{doAct(i,"tat")}finally{slapNpcTier=t0}const k=document.getElementById('kg82');open=!!(k&&!k.hidden&&k.querySelector('canvas'));return{spy,open,logs:(S.logs||[]).slice(0,1).map(x=>String(x).replace(/<[^>]+>/g,"").slice(0,90))}});
  ok('5 her Tát: no game frame, the tier = slapNpcTier(S)',!r5.none&&r5.spy>=1&&!r5.open,r5);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(500);
  /* 6 */
  await p.evaluate(()=>{const v=liveRivals(true).find(x=>x!==S&&x.alive&&!x.out);v.rank=Math.max(v.rank||0,(S.rank||0)+1);window.__v=v;runAct(v,S,"tat");showModal()});await sleep(1200);
  const card=await p.evaluate(()=>{const m=document.getElementById('modal');const bs=[...m.querySelectorAll('button')].map(b=>b.innerText.replace(/\s+/g,' '));return{t:m.innerText.slice(0,80).replace(/\s+/g,' '),bs}});
  const dodge=card.bs.find(x=>/^Né đòn/.test(x))||"";ok('6 NPC slap card: «Né đòn» shows an odds word and no «ván ngắn» game line',/(Mong manh|Hiểm|Khó lường|Tùy duyên|Có cơ|Vững|Rất vững)/.test(dodge)&&!/ván ngắn/.test(dodge),card);
  const nb=await p.evaluateHandle(()=>[...document.querySelectorAll('#modal button')].find(b=>/^Né đòn/.test(b.innerText.trim())));if(nb&&nb.asElement()){await nb.asElement().tap();await sleep(1500)}
  const r6=await p.evaluate(()=>{const k=document.getElementById('kg82');return{game:!!(k&&!k.hidden&&k.querySelector('canvas')),modal:!document.getElementById('modal').hidden,t:document.getElementById('modal').innerText.slice(0,140).replace(/\s+/g,' ')}});
  ok('6 one tap «Né đòn» = one roll: no game frame, the result card follows',!r6.game&&r6.modal&&/tát|né/i.test(r6.t),r6);await sleep(1000);
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
  /* 7 */
  const r7=await p.evaluate(()=>({sg:typeof sgPlay==="function",dfA:Object.keys(DFG.ENG).length,rt:typeof rtNgSleight==="function",dfOn:BAL.df.on}));ok('7 kept cơ-may games: scheme boards, Dư đồ engines, nghiệm thân still there',r7.sg&&r7.dfA===7&&r7.rt&&r7.dfOn===1,r7);
  ok('8 no page errors',!errs.length,errs.slice(0,3));
  await ctx.close();if(VID){const f=fs.readdirSync(VID).filter(x=>/\.webm$/.test(x)).map(x=>[x,fs.statSync(path.join(VID,x)).mtimeMs]).sort((a,c)=>c[1]-a[1])[0];if(f)fs.renameSync(path.join(VID,f[0]),path.join(VID,`mg-trim-${W}x${H}.webm`))}}
 await b.close();if(SV)SV.close();console.log(bad?`FAIL ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
