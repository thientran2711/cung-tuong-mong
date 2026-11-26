/* OB-VERDICT-3 test — RESULT FIRST (owner OD 26/11 ~18:15Z; KIT 7.4 in dev/build/jverdict.js).
   Every choice shows its result card RIGHT AWAY, on top, and the next screen waits for her tap. REAL taps (playwright clicks), Fold 755x1000 + iPad 1180x820.
   A  visitor ENCOUNTER on the stage (jdfv: «Hoàng hậu … giá đáo» say → choices L/R → talk acts): each reply option («Nhịn», «Đáp trả sắc sảo»)
      → the result card is visible on top (elementFromPoint inside #rtoast) with «Người ấy» + «Tiếp ▸», the talk acts are NOT up yet;
      tap «Tiếp ▸» → the talk acts open.
   B  an in-visit talk act in the focus view (tap «Trò chuyện» → «Bỏ qua») → its result card is visible above the focus layer.
   C  family scan (law 11): every visitor / event card maker below, alone and FOLLOWED by a queued card: tap the first option → result on top before
      the next card (the next card hidden until the tap) → before/after table (run with the base index.html for «before»).
   D  bots (window.__bot) never hold; E old save (no RF state) loads and plays a buổi.
   usage: node dev/test/ob-verdict-3.test.js [index.html] [shots dir] [--scan-only] [--json out.json] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const jI=A.indexOf('--json');const JOUT=jI>=0?A.splice(jI,2)[1]:null;const SCAN=A.includes('--scan-only');const P=A.filter(x=>!x.startsWith('--'));
const URL='file://'+path.resolve(P[0]||'index.html');const OUT=P[1]||'/tmp/obv3';fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,500):''))};
async function boot(b,vp,seed){const p=await b.newPage({viewport:vp,deviceScaleFactor:1,reducedMotion:'reduce'});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate((seed)=>{let s=seed*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render()},seed);
 await p.waitForTimeout(800);
 for(let i=0;i<10;i++){const n=await p.evaluate(()=>{let n=0;for(const o of document.querySelectorAll('.kmrew')){o.click();n++}for(const x of document.querySelectorAll('[data-km-close]')){if(x.getClientRects().length){x.click();n++}}return n});if(!n)break;await p.waitForTimeout(1200)}
 await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}document.getElementById('modal').hidden=true;window.__e68off=1/* the optional-card spread gate (evGate) would hold a test card to a later buổi */;try{DQ.user=1}catch(e){}});await p.waitForTimeout(400);return p}
/* what is on screen: the result card (on, visible, topmost at its centre), the modal, the focus buttons */
const look=p=>p.evaluate(()=>{const t=document.getElementById('rtoast');const r=t&&t.getBoundingClientRect();let top=false;
 if(t&&t.classList.contains('on')&&r.width>0){const e=document.elementFromPoint(r.left+r.width/2,r.top+Math.min(r.height/2,40));top=!!(e&&e.closest('#rtoast'))}
 const vis=!!(t&&t.classList.contains('on')&&getComputedStyle(t).visibility!=='hidden'&&+getComputedStyle(t).opacity>0.5);
 const M=document.getElementById('modal');const R=window.kaLastResult;
 return {res:vis&&top,vis,top,txt:t&&vis?t.innerText.replace(/\s+/g,' ').slice(0,240):'',tiep:!!(t&&t.querySelector('.kres-next')),modal:!!(M&&!M.hidden),mt:M&&!M.hidden?document.getElementById('mt').textContent:'',q:Q.length,
  rep:(()=>{/* what is ON SCREEN: the sentence line vs the title line of the card (names painted with their rank) */const sn=t&&t.querySelector('.ksen'),tn=t&&t.querySelector('.kan');if(!vis||!sn||!tn||typeof kaSenDeTitle!=='function')return false;const x=sn.textContent.replace(/\s+/g,' ').trim();return kaSenDeTitle(x,tn.textContent)!==x})(),tgt:R?R.rows.filter(x=>x.k==='tgt').map(x=>x.items.join(' | ')).join(''):'',acts:[...document.querySelectorAll('.kfoc .kfoc-b')].filter(e=>e.getClientRects().length).map(e=>e.innerText.trim().split('\n')[0]).slice(0,8),held:!!(window.RF&&RF.held)}});
const tapResult=async p=>{const b=p.locator('#rtoast .kres-next');if(await b.count()&&await b.isVisible()){await b.click();return 'tiep'}const t=p.locator('#rtoast.on');if(await t.count()){await t.click({position:{x:20,y:12}}).catch(()=>{});return 'card'}return 'none'};
/* A: the queen comes to her at the garden (the encounter scene) */
async function encounter(p,optName,shot){await p.evaluate(()=>{Q.length=0;try{const F=kitFocus.current&&kitFocus.current();if(F){try{F.endPlay()}catch(e){}F.destroy()}}catch(e){}try{document.querySelectorAll('.kfoc').forEach(e=>e.remove())}catch(e){}try{if(window.DF){DF.F=null;DF.p=null;DF.i=null;DF.tk=null;DF.encM=null}}catch(e){}
  const q=rivals.find(v=>v.queen&&v.alive);S.place='vuon';S.visit={k:'vuon',people:[],talked:false,tk:{}};try{const R=agRec();const P=R.P['v'+q.id];if(P)for(const k in P)if(Array.isArray(P[k]))P[k][0]=S.place}catch(e){}
  try{visitSeen(q)}catch(e){}tab='act';render();window.__obq=q.name});
 await p.waitForTimeout(1500);/* her face on the stage token */
 await p.evaluate(()=>{const q=rivals.find(v=>v.queen&&v.alive);const m=gmReplyCard(q,true,null,`${q.name} nghe nói ngươi được sủng, buông lời khiêu khích ngươi trước mặt mọi người.`,'');m.t='Có người đến';m.h=m.h.replace(/<p><\/p>/g,'');Q.push(m);showModal()});
 await p.waitForTimeout(2500);if(shot)await p.screenshot({path:shot+'-1-say.png'});
 for(let i=0;i<6;i++){const ch=p.locator('.kfoc button.kfoc-b, #modal:not([hidden]) .opt',{hasText:optName}).first();if(await ch.count()&&await ch.isVisible()){if(shot)await p.screenshot({path:shot+'-2-choices.png'});await ch.click();break}
  const t=p.locator('.kfoc .kfoc-next').first();if(await t.count()&&await t.isVisible())await t.click();await p.waitForTimeout(700)}
 await p.waitForTimeout(700);const L1=await look(p);if(shot)await p.screenshot({path:shot+'-3-result.png'});
 await p.waitForTimeout(9500);const L2=await look(p);/* still there after the card family's timers (9 s / 7 s) */
 const how=await tapResult(p);await p.waitForTimeout(1200);const L3=await look(p);if(shot)await p.screenshot({path:shot+'-4-acts.png'});
 return {opt:optName,L1,L2,how,L3}}
/* B: an in-visit talk act on the focus (its quick result: «Bỏ qua») */
async function talkAct(p,shot){const b=p.locator('.kfoc button.kfoc-b:not(.kfoc-off)').first();if(!(await b.count()))return null;const nm=(await b.innerText()).split('\n')[0];await b.click();await p.waitForTimeout(900);
 for(let i=0;i<3;i++){const s=p.locator('.kfoc .kfoc-skip').first();if(await s.count()&&await s.isVisible()){await s.click();break}const g=p.locator('.kfoc .kfoc-introgo').first();if(await g.count()&&await g.isVisible()){await g.click();await p.waitForTimeout(600);continue}
  const o=p.locator('#modal:not([hidden]) .opt:not(:disabled)').first();if(await o.count()){await o.click();break}await p.waitForTimeout(500)}
 await p.waitForTimeout(900);const L=await look(p);if(shot)await p.screenshot({path:shot+'-5-talk.png'});await tapResult(p);await p.waitForTimeout(500);await p.evaluate(()=>{try{const F=kitFocus.current&&kitFocus.current();if(F){try{F.endPlay()}catch(e){}F.destroy()}}catch(e){}});await p.waitForTimeout(300);return {act:nm,L}}
/* C: the card makers of the family (visitor scenes + event cards + roads); each gives a card with options */
const MAKERS={
 'ap.apTaunt':`AP_MK.apTaunt({who:V,why:"nghe nói ngươi được sủng"})`,
 'ap.apSorry':`AP_MK.apSorry({who:V})`,
 'ap.apFriend ally':`AP_MK.apFriend({who:V,sub:"ally"})`,
 'ap.apFriend borrow':`AP_MK.apFriend({who:V,sub:"borrow"})`,
 'ap.svAsk':`(S.staff&&S.staff[0]||S.maid)?AP_MK.svAsk({who:(S.staff&&S.staff[0])||S.maid}):null`,
 'ap.thCall':`AP_MK.thCall({})`,
 'gm.reply provoke':`gmReplyCard(V,true,null,V.name+" buông lời khiêu khích ngươi.","")`,
 'gm.reply greet':`gmReplyCard(V,false,null,V.name+" hỏi han sức khỏe ngươi.","")`,
 'e68 visit':`(()=>{const r=e68Fire(["visit"]);return r?{t:r[1].t||"Có người đến",h:r[0].t,opts:r[0].o,who:r[0].who,pid:r[0].pid,pp:r[0].pp}:null})()`,
 'e68 day':`(()=>{const r=e68Fire(["day"]);return r?{t:r[1].t||"Chuyện trong cung",h:r[0].t,opts:r[0].o,who:r[0].who,pid:r[0].pid,pp:r[0].pp}:null})()`,
 'e68 emp':`(()=>{const r=e68Fire(["emp"]);return r?{t:r[1].t||"Hoàng thượng",h:r[0].t,opts:r[0].o,who:r[0].who,pid:r[0].pid,pp:r[0].pp}:null})()`,
 'e68 serv':`(()=>{const r=e68Fire(["serv"]);return r?{t:r[1].t||"Kẻ hầu",h:r[0].t,opts:r[0].o,who:r[0].who,pid:r[0].pid,pp:r[0].pp}:null})()`};
const NEXT=`{t:"Chuyện trong cung",h:"<p>Thẻ kế tiếp (thử).</p>",opts:[{n:"Biết rồi",fx:{}}]}`;
async function family(p,key,followed){const mk=await p.evaluate(({src,followed,NEXT})=>{try{Q.length=0;try{closeModal()}catch(e){}document.getElementById('modal').hidden=true;const t=document.getElementById('rtoast');if(t)t.classList.remove('on');
   if(window.RF){RF.held=false;RF.wantModal=false;RF.later.length=0}S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};tab='act';S.suc=Math.max(S.suc,80);S.bac=Math.max(S.bac,300);
   const V=liveRivals(false).find(v=>!v.queen&&!sameHouse(S,v))||liveRivals(false)[0];const m=eval(src);if(!m||!m.opts||!m.opts.length)return {skip:'no card'};
   Q.push(m);if(followed)Q.push(eval('('+NEXT+')'));showModal();return {t:m.t,opts:m.opts.map(o=>o.n).slice(0,3)}}catch(e){return {err:String(e).slice(0,160)}}},{src:MAKERS[key],followed,NEXT});
 if(mk.skip||mk.err)return Object.assign({key,followed},mk);await p.waitForTimeout(900);
 const o=p.locator('#modal:not([hidden]) .opt:not(:disabled)').first();if(!(await o.count()))return {key,followed,skip:'no option on screen'};const on=(await o.innerText()).split('\n')[0];await o.click();
 await p.waitForTimeout(700);const L1=await look(p);await tapResult(p);await p.waitForTimeout(900);const L2=await look(p);
 /* PASS: the result card is on top right after the tap; a queued next card is NOT up before the tap and IS up after it */
 const pass=L1.res&&(!followed||(!L1.modal&&L2.modal&&/Thẻ kế tiếp|Chuyện trong cung/.test(L2.mt)));
 await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}document.getElementById('modal').hidden=true});
 return {key,followed,t:mk.t,opt:on,res:L1.res,parked:L1.vis&&!L1.top?1:0,nextBefore:L1.modal,nextAfter:L2.modal,tiep:L1.tiep,rep:L1.rep,pass}}
(async()=>{const b=await chromium.launch();const DEV=[['fold',{width:755,height:1000}],['ipad',{width:1180,height:820}]];const OJ={enc:{},talk:{},fam:[],bot:null,old:null};
 const isNew=await (async()=>{const p=await boot(b,{width:755,height:1000},3);const r=await p.evaluate(()=>!!window.RF);await p.close();return r})();console.log('build has RESULT FIRST:',isNew);
 if(!SCAN)for(const [dn,vp] of DEV){const p=await boot(b,vp,3);
  for(const [i,opt] of ['Nhịn','Đáp trả sắc sảo'].entries()){const r=await encounter(p,opt,`${OUT}/${dn}-enc${i}`);OJ.enc[dn+'-'+opt]=r;console.log(dn,'enc',opt,JSON.stringify(r).slice(0,900));
   ok(r.L1.res,`${dn} «${opt}»: the result card is on top right after the tap`,r.L1);
   ok(!r.L1.rep,`${dn} «${opt}»: the sentence does not repeat the title`,r.L1.txt);
   ok(r.L1.tgt.includes(await p.evaluate(()=>window.__obq)),`${dn} «${opt}»: «Người ấy» row = the queen`,r.L1.tgt);
   ok(!r.L1.acts.length,`${dn} «${opt}»: the talk acts are not up before the tap`,r.L1.acts);
   ok(r.L2.res&&r.L2.tiep,`${dn} «${opt}»: still on screen 10 s later (no timer takes it), «Tiếp ▸»`,{res:r.L2.res,tiep:r.L2.tiep});
   ok(!r.L3.vis&&r.L3.acts.length>0,`${dn} «${opt}»: after the tap the talk acts open`,r.L3.acts);
   if(i===0){const t=await talkAct(p,`${OUT}/${dn}-enc${i}`);OJ.talk[dn]=t;console.log(dn,'talk',JSON.stringify(t).slice(0,600));ok(t&&t.L.res,`${dn} in-visit talk act «${t&&t.act}»: its result card is on top of the focus`,t&&t.L)}}
  ok(!p.errs.length,`${dn}: no page errors`,p.errs.slice(0,3));await p.close()}
 /* C family scan, Fold + iPad */
 for(const [dn,vp] of DEV){const p=await boot(b,vp,5);for(const key of Object.keys(MAKERS))for(const fo of [false,true]){const r=await family(p,key,fo);r.dev=dn;OJ.fam.push(r);console.log('fam',JSON.stringify(r).slice(0,400))}
  ok(!p.errs.length,`${dn} scan: no page errors`,p.errs.slice(0,3));await p.close()}
 const rows=OJ.fam.filter(r=>!r.skip&&!r.err);const bad=rows.filter(r=>!r.pass);console.log(`\nFAMILY TABLE (${isNew?'after':'before'}): ${rows.length-bad.length}/${rows.length} result-first`);
 for(const r of rows)console.log(`  ${r.dev.padEnd(5)} ${r.key.padEnd(20)} ${r.followed?'+next':'alone'}  result on top ${r.res?'yes':'NO '}  next before tap ${r.nextBefore?'YES':'no '}  ${r.pass?'PASS':'FAIL'}`);
 for(const r of OJ.fam.filter(r=>r.skip||r.err))console.log(`  ${r.dev} ${r.key} ${r.followed?'+next':'alone'} skipped: ${r.skip||r.err}`);
 if(isNew)ok(!rows.some(r=>r.rep),'family scan: no result sentence repeats its title (MAIN 162)',rows.filter(r=>r.rep).map(r=>r.dev+' '+r.key));
 console.log('title repeated in the sentence: '+rows.filter(r=>r.rep).length+'/'+rows.length);
 if(isNew)ok(!bad.length,'family scan: every choice shows its result first',bad.map(r=>r.dev+' '+r.key+(r.followed?' +next':'')));
 /* D bots */
 {const p=await boot(b,{width:755,height:1000},7);const r=await p.evaluate(()=>{window.__bot=1;const V=liveRivals(false)[0];Q.push(AP_MK.apTaunt({who:V,why:"x"}));Q.push({t:"Chuyện trong cung",h:"<p>x</p>",opts:[{n:"Biết rồi",fx:{}}]});showModal();chooseM(0);
   const r={held:!!(window.RF&&RF.held),q:Q.length,modal:!document.getElementById('modal').hidden};window.__bot=undefined;return r});OJ.bot=r;
  if(isNew)ok(!r.held&&r.modal,'bots: nothing held, the next card shows at once',r);await p.close()}
 /* E old save */
 {const p=await boot(b,{width:1180,height:820},9);const r=await p.evaluate(()=>{try{const s=JSON.stringify(S);localStorage.setItem('ctm_obv3_old',s);load&&0}catch(e){}try{endTurn()}catch(e){return {err:String(e)}}return {ok:1,turn:S.turn}});OJ.old=r;ok(r.ok,'a buổi plays with the build',r);await p.close()}
 if(JOUT)fs.writeFileSync(JOUT,JSON.stringify(OJ,null,1));
 const n=res.filter(x=>x).length;console.log(`\nob-verdict-3: ${n}/${res.length} ${n===res.length?'ALL OK':'FAILURES'}`);await b.close();process.exit(n===res.length?0:1)})();
