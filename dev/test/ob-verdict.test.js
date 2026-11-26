/* OB-VERDICT test (owner OD 26/11 ~08:30Z; KIT 7.3 kaAim in j63 + dev/build/jverdict.js).
   1 night «Thì thầm nói xấu <X>» by REAL taps (thành, hỏng, bỏ dở): the night card has the seal THÀNH / BẠI / BỎ DỞ, the act's own sentence,
     a «Người ấy» row with X's real Sủng a → b and her own rows; shots at Fold 755x1000 + iPad 1180x820
   2 scan (law 11): every ACT deed she can do on a consort (doAct) + every talk option on a consort → seal + rows of the card (table)
   3 two-way: an NPC's deed on HER that her Sổ ghi names → «Ai làm» row
   4 old save (no new state) loads and plays a buổi
   usage: node dev/test/ob-verdict.test.js [index.html] [shots dir] [--scan-only] [--json out.json] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const A=process.argv.slice(2);const jI=A.indexOf('--json');const JOUT=jI>=0?A.splice(jI,2)[1]:null;const SCAN=A.includes('--scan-only');const P=A.filter(x=>!x.startsWith('--'));
const URL='file://'+path.resolve(P[0]||'index.html');const OUT=P[1]||'/tmp/obv';fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,700):''))};
async function boot(b,vp,seed){const p=await b.newPage(Object.assign({viewport:vp,deviceScaleFactor:1},process.env.OBVID?{recordVideo:{dir:process.env.OBVID,size:vp}}:{}));const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate((seed)=>{let s=seed*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};
  localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render()},seed);
 await p.waitForTimeout(800);return p}
const card=p=>p.evaluate(()=>{const R=window.kaLastResult;const t=document.getElementById('rtoast');return R?{title:R.title,seal:R.seal,sen:R.sentence,rows:R.rows.map(r=>r.label+': '+r.items.join(' | ')),on:!!(t&&t.classList.contains('on'))}:null});
async function night(p,mode,shot){/* mode: ok | fail | soft — the REAL night: nightScene → prep → night1 → night2, every option a real tap */
 const pre=await p.evaluate((mode)=>{Q.length=0;try{closeModal()}catch(e){}window.kaLastResult=null;window.kneLast=null;document.querySelectorAll('#kneov').forEach(e=>e.remove());
  const v=liveRivals(false).slice().sort((a,b)=>a.rel-b.rel)[0];if(!v)return null;v.sung=Math.max(v.sung,30);S.suc=Math.max(S.suc,60);S.bac=Math.max(S.bac,200);
  S.ntk=null;S.tonight=null;try{kmReset()}catch(e){}document.querySelectorAll('#klife').forEach(e=>{e.hidden=true;e.style.display='none'});try{DQ.user=1}catch(e){}nightScene();showModal();
  window.__obvMode=mode;if(!window.__obvR0){window.__obvR0=window.roll;window.roll=function(n){if(window.__obvArm)return window.__obvMode==="ok";return window.__obvR0.apply(this,arguments)}}
  return {v:v.name,sung:v.sung,rank:RANKS[v.rank].n,me:S.sung,q:Q.map(m=>m.t)}},mode);
 if(!pre)return null;const steps=[];
 for(let g=0;g<6;g++){await p.waitForTimeout(500);await p.evaluate(()=>{document.querySelectorAll('#klife').forEach(e=>{e.hidden=true;e.style.display='none'});try{DQ.user=1}catch(e){}if(Q.length&&document.getElementById('modal').hidden)showModal()});
  const pil=p.locator('#modal:not([hidden]) .opt',{hasText:'Thì thầm nói xấu'}).first();
  if(await pil.count()){await p.evaluate((mode)=>{window.__obvArm=1;if(mode==="soft"){window.__obvAgSoft=agSoft;agSoft=()=>true}},mode);steps.push('PILLOW');await pil.click();
   await p.evaluate(()=>{window.__obvArm=0;if(window.__obvAgSoft){agSoft=window.__obvAgSoft;window.__obvAgSoft=null}});break}
  const o=p.locator('#modal:not([hidden]) .opt:not(:disabled)').first();if(!(await o.count())){steps.push('no opt');break}steps.push((await o.innerText()).split('\n')[0].slice(0,30));await o.click()}
 await p.waitForTimeout(2500);await p.evaluate(()=>{const o=document.getElementById('kneov');if(o){const r=o.querySelector('.kne-cap');if(r)r.click()}});await p.waitForTimeout(1200);const ne=await p.evaluate(()=>{const o=document.getElementById('kneov');const K=o?[...o.querySelectorAll('.kr-kem .kitem')]:[];const tops=K.map(e=>Math.round(e.getBoundingClientRect().top));return {on:!!o,kne:window.kneLast,txt:o?o.innerText.replace(/\s+/g,' ').slice(0,900):'',kem:{n:K.length,oneLine:new Set(tops).size===tops.length,txt:K.map(e=>e.innerText.replace(/\s+/g,' ')).slice(0,9)}}});
 if(shot&&ne.on)await p.screenshot({path:shot});
 const post=await p.evaluate((n)=>{const v=rivals.find(x=>x.name===n);return {sung:v.sung,me:S.sung}},pre.v);
 /* the same card text as the kit result card for the checks */
 const c=ne.kne?{on:ne.on,seal:ne.kne.verdict===true?'THÀNH':ne.kne.verdict===false?'BẠI':ne.kne.verdict==='soft'?'BỎ DỞ':null,sen:ne.kne.sen,rows:(ne.kne.tgt||[]).map(x=>'Người ấy: '+x).concat([ne.txt])}:null;
 await p.evaluate(()=>{document.querySelectorAll('#kneov').forEach(e=>{const b=e.querySelector('[data-km-close]');if(b)b.click()})});await p.waitForTimeout(400);
 return {pre,post,steps,card:c,text:ne.txt,kem:ne.kem}}
(async()=>{const b=await chromium.launch();
 const DEV=[['fold',{width:755,height:1000}],['ipad',{width:1180,height:820}]];const OUTJ={night:{},scan:[],two:null,old:null};
 if(!SCAN)for(const [dn,vp] of DEV){const p=await boot(b,vp,3);
  for(const m of ['ok','fail','soft']){const r=await night(p,m,`${OUT}/${dn}-night-${m}.png`);OUTJ.night[dn+'-'+m]=r;console.log(dn,m,JSON.stringify(r));
   const c=r&&r.card;ok(c&&c.on,`${dn} ${m}: the night card is shown`);
   ok(c&&c.seal===(m==='ok'?'THÀNH':m==='fail'?'BẠI':'BỎ DỞ'),`${dn} ${m}: seal`,c&&c.seal);
   ok(c&&c.sen&&c.sen.includes(r.pre.v.split(' ').pop()),`${dn} ${m}: sentence names the target`,c&&c.sen);
   const tg=c&&c.rows.find(x=>x.startsWith('Người ấy'));ok(!!tg&&/NGƯỜI ẤY/i.test(r.text),`${dn} ${m}: «Người ấy» row`,tg);
   ok(r.text&&!/(KẾT CỤC|NGƯỜI ẤY)[^:]*\?\?\?/i.test(r.text),`${dn} ${m}: her chosen target shows its real name (no «???»)`,r.text&&r.text.slice(0,260));
   if(m==='ok')ok(tg&&tg.includes(`Sủng −`)&&tg.includes(`(${r.pre.sung} → ${r.post.sung})`),`${dn} ok: target Sủng a → b`,tg);
   if(m==='fail')ok(r.text&&/MẤT Sủng/i.test(r.text),`${dn} fail: her Sủng loss in Mất`,r.text);
   ok(r.kem&&r.kem.oneLine&&!r.kem.txt.some(t=>/:.*:/.test(t)),`${dn} ${m}: night «Kèm» one person per line (MAIN 157)`,r.kem);}
  ok(!p.errs.length,`${dn}: no page errors`,p.errs.slice(0,3));await p.close()}
 /* 2 scan */
 {const p=await boot(b,{width:1180,height:820},5);
  /* talk: open a visit with the first consort she meets, run each option once on a fresh day */
  for(let oi=0;oi<14;oi++){const r=await p.evaluate((oi)=>{try{Q.length=0;closeModal&&closeModal();window.kaLastResult=null;used=0;S.suc=Math.max(S.suc,80);S.bac=Math.max(S.bac,500);
    const v=liveRivals(false).find(v=>!sameHouse(S,v));if(!v)return null;if(!S.visit||!curPeople().some(x=>x.ref===v))S.visit={k:S.place,people:[{kind:'rival',ref:v,name:v.name}],tk:{},talked:false};used=0;
    const idx=curPeople().findIndex(x=>x.ref===v);if(idx<0)return {k:'talk',skip:'no visit',end:1};S.visit.tk={};S.visit.talked=false;popIdx=idx;
    const O=talkOpts(curPeople()[idx]);if(oi>=O.length)return {end:1};const a=O[oi];
    if(a.open||a.lock){return {k:'talk',n:a.n,skip:a.open?'opens a dialog':'locked'}}
    talk(oi);const R=window.kaLastResult;Q.length=0;
    return {k:'talk',n:a.n,seal:R&&R.seal,rows:R?R.rows.map(r=>r.label+': '+r.items.join(' | ')):null,sen:R&&R.sentence}}catch(e){return {k:'talk',oi,err:String(e).slice(0,160)}}},oi);
   if(!r||r.end)break;OUTJ.scan.push(Object.assign({via:'talk'},r))}
  /* 3 two-way: an NPC deed on her (rumor), told in her Sổ ghi */
  const ACTK=await p.evaluate(()=>Object.keys(ACT));
  for(const k of ACTK){const r=await p.evaluate((k)=>{try{Q.length=0;closeModal&&closeModal();window.kaLastResult=null;S.bac=Math.max(S.bac,500);S.suc=Math.max(S.suc,80);used=0;
    const L=liveRivals(false).filter(v=>!sameHouse(S,v)&&ACT[k].ok(S,v));const v=L[0];if(!v)return {k,n:ACT[k].n,skip:'no target'};
    try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}/* she knows her (a deed is only on a person she knows: j61) */
    const i=rivals.indexOf(v);const pt0=ptHarmSend;ptHarmSend=()=>false;let dl='',R=null;try{doAct(i,k);R=window.kaLastResult;
    /* her own dialogs: «Bày mưu» → «Ra tay ngay», the road card → «Làm như thường», a picker → its first choice; the LAST card is the deed's */
    for(let g=0;g<5&&Q.length;g++){const m=Q[0];dl+=(m.t||'')+';';const O=m.opts||[];let j=O.findIndex(c=>/^Ra tay ngay/.test(c.n||''));if(j<0)j=O.findIndex(c=>/^Làm như thường/.test(c.n||''));if(j<0)j=O.findIndex(c=>!c.off&&!/^Thôi/.test(c.n||''));if(j<0){Q.shift();continue}try{DQ.user=1}catch(e){}window.kaLastResult=null;chooseM(j);if(window.kaLastResult)R=window.kaLastResult}}finally{ptHarmSend=pt0}Q.length=0;try{closeModal()}catch(e){}
    const lg=S.logs.slice(0,6).map(plain).join(' ‖ ');
    return {k,n:ACT[k].n,dl,lg,seal:R&&R.seal,rows:R?R.rows.map(r=>r.label+': '+r.items.join(' | ')):null,sen:R&&R.sentence}}catch(e){return {k,err:String(e).slice(0,120)}}},k);
   OUTJ.scan.push(Object.assign({via:'doAct'},r))}
  OUTJ.two=await p.evaluate(()=>{try{Q.length=0;window.kaLastResult=null;const v=liveRivals(false).find(v=>!sameHouse(S,v));const b=rsnap();
    const r0=window.roll;window.roll=()=>true;let r;try{r=pillowDo(v,S,100)}finally{window.roll=r0}log(`Tai mắt nghe được: gối đầu, ${v.name} nói xấu ngươi.`);resultShow("Trong cung vừa qua",b,null);const R=window.kaLastResult;
    return {r,seal:R&&R.seal,rows:R?R.rows.map(r=>r.label+': '+r.items.join(' | ')):null}}catch(e){return {err:String(e)}}});
  ok(OUTJ.two&&OUTJ.two.rows&&OUTJ.two.rows.some(x=>/^Ai làm: .*nói xấu ngươi bên gối · thành/.test(x)),'two-way: «Ai làm» row for an NPC deed on her',OUTJ.two);
  ok(!p.errs.length,'scan: no page errors',p.errs.slice(0,3));await p.close()}
 for(const s of OUTJ.scan)console.log(s.via.padEnd(6),String(s.n||s.k).padEnd(24),s.dl?'['+s.dl.slice(0,30)+']':'',s.skip?'SKIP '+s.skip:s.err?'ERR '+s.err:`${s.seal} | ${(s.rows||[]).join(' || ')}`.slice(0,330)+(process.env.OBLG&&s.lg?'\n      LOG '+s.lg.slice(0,400):''));
 console.log('two-way',JSON.stringify(OUTJ.two));
 /* 5 r2 (RV r1 #1–#3, #6): deeds from their own dialog, decisions without aRoll, runners outside runAct */
 const R2={};OUTJ.r2=R2;
 const vuTap=async(p,mode,shot)=>{/* Vu oan by real taps: the person-card deed → «Bày mưu» → «Ra tay ngay: vu oan» (→ road card «Làm như thường» if any) */
  const pre=await p.evaluate((mode)=>{Q.length=0;try{closeModal()}catch(e){}window.kaLastResult=null;S.confined=0;S.bac=Math.max(S.bac,500);S.suc=Math.max(S.suc,80);S.tamco=Math.max(S.tamco||0,50);used=0;
   const v=liveRivals(false).filter(v=>!sameHouse(S,v)&&ACT.frame.ok(S,v)&&!v.confined)[0];if(!v)return null;try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}
   if(!window.__vuR0){window.__vuR0=window.roll;window.roll=function(n){if(window.__vuMode){const st=String(new Error().stack);return window.__vuMode==='ok'?!/\b(caught|framed)\b/.test(st):true}return window.__vuR0.apply(this,arguments)}}
   window.__vuMode=mode;const pt0=ptHarmSend;window.__vuPt=pt0;ptHarmSend=()=>false;try{DQ.user=1}catch(e){}doAct(rivals.indexOf(v),'frame');showModal();return {v:v.name,id:v.id,sung:v.sung,danh:v.danh,rank:v.rank,q:Q.map(m=>m.t)}},mode);
  if(!pre)return null;const steps=[];
  for(let g=0;g<3;g++){await p.waitForTimeout(500);await p.evaluate(()=>{document.querySelectorAll('#klife').forEach(e=>{e.hidden=true;e.style.display='none'});document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove());if(Q.length&&document.getElementById('modal').hidden)showModal()});let o=p.locator('#modal:not([hidden]) .opt',{hasText:'Ra tay ngay'}).first();if(!(await o.count()))o=p.locator('#modal:not([hidden]) .opt',{hasText:'Làm như thường'}).first();if(!(await o.count()))break;steps.push((await o.innerText()).split('\n')[0].slice(0,30));await o.click({timeout:8000})}
  await p.waitForTimeout(900);await p.evaluate(()=>{document.querySelectorAll('#kmrew,.kmov').forEach(e=>e.remove())});if(shot)await p.screenshot({path:shot});
  const c=await card(p);const post=await p.evaluate((id)=>{window.__vuMode=null;ptHarmSend=window.__vuPt;const v=RV(id);const lg=S.logs.slice(0,3).map(plain).join(' ‖ ');Q.length=0;try{closeModal()}catch(e){}return {sung:v.sung,danh:v.danh,rank:v.rank,confined:v.confined||0,lg}},pre.id);
  return {pre,post,steps,card:c}};
 for(const [dn,vp] of DEV){R2[dn]={};
  for(const m of ['ok','lo']){const p=await boot(b,vp,3)/* a fresh life per outcome: no notice or rank change left over from the other run (MAIN 157 (2)) */;const r=await vuTap(p,m,path.join(OUT,`after-${dn}-vuoan-${m}.png`));R2[dn][m]=r;const c=r&&r.card;
   ok(c&&c.on,`${dn} Vu oan via Bày mưu (${m}): the card is shown`,r&&{steps:r.steps,c});
   ok(c&&c.seal===(m==='ok'?'THÀNH':'BẠI'),`${dn} Vu oan via Bày mưu (${m}): seal ${m==='ok'?'THÀNH':'BẠI'}`,c&&{seal:c.seal,lg:r.post.lg.slice(0,200)});
   const tg=c&&c.rows.find(x=>x.startsWith('Người ấy'));ok(tg&&tg.includes(r.pre.v),`${dn} Vu oan via Bày mưu (${m}): «Người ấy» names her target`,tg);
   if(m==='ok')ok(tg&&/bị cấm túc|Sủng −|Danh −/.test(tg),`${dn} Vu oan thành: the target's real loss`,tg);
   if(m==='ok')ok(c&&/^Ngươi vu oan .*: thành/.test((c.sen||'').replace(/<[^>]+>/g,'')),`${dn} Vu oan thành: the deed's own sentence (RV N4)`,c&&c.sen);else ok(c&&/: bị lộ\./.test(c.sen||''),`${dn} Vu oan bị lộ: ONE plain sentence «…: bị lộ.» (RV N4)`,c&&c.sen);if(m!=='ok')ok(tg&&/không hề hấn gì/.test(tg)&&r.post.rank===r.pre.rank,`${dn} Vu oan bị lộ: «không hề hấn gì», her rank unchanged`,{tg,rank:[r.pre.rank,r.post.rank]});
   const sp=await p.evaluate(()=>{const c=document.getElementById('rtoast'),s=c&&c.querySelector('.kmseal');if(!s)return null;const a=c.getBoundingClientRect(),b=s.getBoundingClientRect();return {inside:b.top>=a.top-1&&b.bottom<=a.bottom+1&&b.left>=a.left-1&&b.right<=a.right+1}});ok(sp&&sp.inside,`${dn} ${m}: the stamp sits on the result card only`,sp);
   ok(!p.errs.length,`${dn} ${m} r2 taps: no page errors`,p.errs.slice(0,3));await p.close()}}
 {const p=await boot(b,{width:1180,height:820},11);
  const E=(fn,arg)=>p.evaluate(fn,arg);
  const pre=()=>{Q.length=0;try{closeModal()}catch(e){}window.kaLastResult=null;S.bac=Math.max(S.bac,500);S.suc=Math.max(S.suc,80);S.tamco=Math.max(S.tamco||0,50);used=0};
  await E(`window.__pre=${pre.toString()};window.__cardOf=()=>{const R=window.kaLastResult;return R?{seal:R.seal,title:R.title,rows:R.rows.map(r=>r.label+': '+r.items.join(' | '))}:null};window.__named=v=>{try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}return v}`);
  /* road card «Làm như thường» (Giá họa): the deed's seal on the card of that choice */
  R2.giahoa=await E(()=>{try{__pre();const v=__named(liveRivals(false).filter(v=>!sameHouse(S,v)&&ACT.giahoa.ok(S,v))[0]);if(!v)return {skip:'no target'};const pt0=ptHarmSend;ptHarmSend=()=>false;
   try{doAct(rivals.indexOf(v),'giahoa');const j=Q[0]&&Q[0].opts.findIndex(c=>/^Làm như thường/.test(c.n));if(!(j>=0))return {skip:'no road card',q:Q.map(m=>m.t)};chooseM(j)}finally{ptHarmSend=pt0}const c=__cardOf();Q.length=0;return c}catch(e){return {err:String(e)}}});
  ok(R2.giahoa&&(R2.giahoa.skip||/THÀNH|BẠI|BỎ DỞ/.test(R2.giahoa.seal)),'Giá họa via the road card «Làm như thường»: seal from its own roll',R2.giahoa);
  /* servant-sent Giá họa: lands later → «chưa rõ — người được sai về sẽ báo» */
  R2.sent=await E(()=>{try{__pre();const v=__named(liveRivals(false).filter(v=>!sameHouse(S,v)&&ACT.giahoa.ok(S,v))[0]);if(!v)return {skip:'no target'};const s0=ptHarmSent;ptHarmSent=()=>true;
   try{doAct(rivals.indexOf(v),'giahoa');const j=Q[0]&&Q[0].opts.findIndex(c=>/^Làm như thường/.test(c.n));if(j>=0)chooseM(j)}finally{ptHarmSent=s0}const c=__cardOf();Q.length=0;return c||{skip:'no sent servant (bestSent)'}}catch(e){return {err:String(e)}}});
  ok(R2.sent&&(R2.sent.skip||R2.sent.rows&&R2.sent.rows.some(x=>/^Người ấy: .*chưa rõ — người được sai về sẽ báo/.test(x))),'servant-sent Giá họa: «chưa rõ — người được sai về sẽ báo»',R2.sent);
  /* j7 event option on a consort (Sao chổi «Đổ thêm dầu vào lửa»): «Người ấy» with her Sủng a → b */
  R2.comet=await E(()=>{try{__pre();const L=liveRivals(false);const v=__named(L[0]),a=L[1]||L[0];const s0=v.sung;pushDil(mkP("comet",{me:false,v:v.id,a:a.id,y:""}),"Sao chổi");const j=Q[0]&&Q[0].opts.findIndex(c=>/^Đổ thêm dầu/.test(c.n));if(!(j>=0))return {skip:'no option',q:Q.map(m=>m.t)};chooseM(j);const c=__cardOf();Q.length=0;return Object.assign({v:v.name,s0,s1:v.sung},c)}catch(e){return {err:String(e)}}});
  ok(R2.comet&&R2.comet.rows&&R2.comet.rows.some(x=>x.startsWith('Người ấy')&&x.includes(R2.comet.v)&&x.includes(`(${R2.comet.s0} → ${R2.comet.s1})`)),'event option on a consort («Đổ thêm dầu vào lửa»): «Người ấy» Sủng a → b',R2.comet);
  /* RV N1: game code clears the queue under her pending «Bày mưu» → the open aim must not leak onto a later card */
  R2.n1=await E(()=>{try{__pre();const L=liveRivals(false).filter(v=>!sameHouse(S,v));const v=__named(L.find(v=>ACT.frame.ok(S,v))),w=__named(L.find(x=>x!==v));if(!v||!w)return {skip:'targets'};
   doAct(rivals.indexOf(v),'frame');const q=Q.map(m=>m.t);Q.length=0;try{closeModal()}catch(e){}v.sung=Math.max(0,v.sung-14);
   if(!S.visit||!curPeople().some(x=>x.ref===w))S.visit={k:S.place,people:[{kind:'rival',ref:w,name:w.name}],tk:{},talked:false};S.visit.tk={};S.visit.talked=false;popIdx=curPeople().findIndex(x=>x.ref===w);used=0;
   const O=talkOpts(curPeople()[popIdx]);const oi=O.findIndex(a=>!a.open&&!a.lock);window.kaLastResult=null;talk(oi);const c=__cardOf();return Object.assign({q,v:v.name,w:w.name},c)}catch(e){return {err:String(e)}}});
  ok(R2.n1&&(R2.n1.skip||!(R2.n1.rows||[]).some(x=>x.startsWith('Người ấy')&&x.includes(R2.n1.v))),'RV N1: a pending act whose dialog was cleared does not leak onto a later card',R2.n1);
  /* j55 tdLeak by an NPC on HER, traced in her Sổ ghi → «Ai làm» */
  R2.td=await E(()=>{try{__pre();const v=__named(liveRivals(false)[0]);v.bac=Math.max(v.bac||0,200);try{deA(v,S,3)}catch(e){}const b=rsnap();const r0=window.roll;window.roll=()=>true;const d0=tdDadT;tdDadT=()=>true;let r;try{r=tdLeak(v,S)}finally{window.roll=r0;tdDadT=d0}if(r)log(r);resultShow("Trong cung vừa qua",b,null);const c=__cardOf();return Object.assign({r:plain(r||'').slice(0,160),v:v.name},c)}catch(e){return {err:String(e)}}});
  ok(R2.td&&R2.td.rows&&R2.td.rows.some(x=>/^Ai làm: /.test(x)&&x.includes(R2.td.v)&&/tham ô · thành/.test(x)),'j55 tdLeak on her: «Ai làm … · thành»',R2.td);
  /* jemoact: the Emperor's anger on HER → «Ai làm: Hoàng thượng» */
  R2.ea=await E(()=>{try{__pre();if(!S.emp||typeof eaMeSlot!=="function"||!eaMeSlot())return {skip:'no slot'};const b=rsnap();apply({sung:-3});log("Hoàng thượng nổi giận với ngươi, phất tay áo bỏ đi.");eaHitMe(S.emp,"noi");Q.length=0;resultShow("Trong cung vừa qua",b,null);return __cardOf()}catch(e){return {err:String(e)}}});
  ok(R2.ea&&(R2.ea.skip||R2.ea.rows&&R2.ea.rows.some(x=>/^Ai làm: Hoàng thượng: nổi giận với ngươi/.test(x))),'jemoact: the Emperor on her → «Ai làm: Hoàng thượng»',R2.ea);
  ok(!p.errs.length,'r2 checks: no page errors',p.errs.slice(0,3));await p.close()}
 /* j42 servant mode: «Tố cáo <chủ> trước Hoàng hậu» is aimed at the mistress, not the listener */
 {const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});await p.waitForTimeout(1200);
  R2.srv=await p.evaluate(()=>{try{let s=13*9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(!isSrv()&&g<200);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render();
   if(!isSrv())return {skip:'no servant start'};const m=srvM(),q=typeof queenP==="function"?queenP():null;if(!m||!q||q===m||q===S)return {skip:'no mistress / queen'};S.srv.sec=Math.max(S.srv.sec||0,(SRVA.accuse&&SRVA.accuse.sec)||1);used=0;S.suc=Math.max(S.suc,80);
   try{const K=k61S();if(K){K[kOf61(q)]=3;K[kOf61(m)]=3}}catch(e){}const pp={kind:'srv',sk:'hh',ref:q,name:q.name};S.visit={k:S.place,people:[pp],tk:{},talked:false};popIdx=0;const O=talkOpts(pp);const oi=O.findIndex(a=>/^Tố cáo/.test(a.n));if(oi<0)return {skip:'no Tố cáo option',O:O.map(a=>a.n)};
   window.kaLastResult=null;const r0=window.roll;window.roll=()=>true;try{talk(oi)}finally{window.roll=r0}const R=window.kaLastResult;Q.length=0;return {m:m.name,q:q.name,rows:R?R.rows.map(r=>r.label+': '+r.items.join(' | ')):null,seal:R&&R.seal}}catch(e){return {err:String(e).slice(0,200)}}});
  ok(R2.srv&&(R2.srv.skip||R2.srv.rows&&R2.srv.rows.some(x=>x.startsWith('Người ấy')&&x.includes(R2.srv.m))&&!R2.srv.rows.some(x=>x.startsWith('Người ấy')&&x.includes(R2.srv.q)&&!x.includes(R2.srv.m))),'servant mode «Tố cáo <chủ>»: «Người ấy» = the accused mistress',R2.srv);
  ok(R2.srv&&(R2.srv.skip||R2.srv.seal==='THÀNH'),'servant mode «Tố cáo <chủ>» (forced thành): seal from the option\'s own roll',R2.srv&&R2.srv.seal);
  ok(!errs.length,'servant check: no page errors',errs.slice(0,3));await p.close()}
 /* RV r1 #6: every scanned deed whose own outcome line rolled / decided has a seal (THÀNH / BẠI / BỎ DỞ), never KẾT QUẢ */
 {const RW=/: thành|bị lộ|bị bắt|bắt gặp|không thành|bỏ qua|tố bừa|từ chối bạc|đến dò, báo|không nhận bạc|minh oan được|mang tội/;const bad=[];let n=0;
  for(const s of OUTJ.scan){if(s.via!=='doAct'||!s.seal||!s.lg)continue;const l0=s.lg.split(' ‖ ')[0].replace(/Kẻ được ngươi sai đi bị bắt, khai ra chủ[^.]*\./g,'');if(!RW.test(l0))continue;n++;if(s.seal==='KẾT QUẢ')bad.push(`${s.n}: ${l0.slice(0,120)}`)}
  ok(n>=5&&!bad.length,`scan: every rolled / decided deed has a seal (${n} deeds)`,bad)}
 /* 4 old save */
 {const p=await boot(b,{width:755,height:1000},7);const r=await p.evaluate(()=>{try{save();const raw=localStorage.getItem(Object.keys(localStorage).find(k=>/ctm|save|slot/i.test(k))||'');return !!raw}catch(e){return String(e)}});
  const r2=await p.evaluate(()=>{try{if(typeof loadSlot==='function')loadSlot(SLOT);else if(typeof loadGame==='function')loadGame();nextBuoi();render();return {ok:1,turn:S.turn}}catch(e){return {err:String(e)}}});OUTJ.old={r,r2};ok(r2&&r2.ok&&!p.errs.length,'old save loads and plays a buổi',{r,r2,e:p.errs.slice(0,2)});await p.close()}
 if(JOUT)fs.writeFileSync(JOUT,JSON.stringify(OUTJ,null,1));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`ALL ${res.length} OK`);process.exit(f&&!SCAN?1:0)})();
