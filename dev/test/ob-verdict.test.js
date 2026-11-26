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
 await p.waitForTimeout(2500);await p.evaluate(()=>{const o=document.getElementById('kneov');if(o){const r=o.querySelector('.kne-cap');if(r)r.click()}});await p.waitForTimeout(1200);const ne=await p.evaluate(()=>{const o=document.getElementById('kneov');return {on:!!o,kne:window.kneLast,txt:o?o.innerText.replace(/\s+/g,' ').slice(0,900):''}});
 if(shot&&ne.on)await p.screenshot({path:shot});
 const post=await p.evaluate((n)=>{const v=rivals.find(x=>x.name===n);return {sung:v.sung,me:S.sung}},pre.v);
 /* the same card text as the kit result card for the checks */
 const c=ne.kne?{on:ne.on,seal:ne.kne.verdict===true?'THÀNH':ne.kne.verdict===false?'BẠI':ne.kne.verdict==='soft'?'BỎ DỞ':null,sen:ne.kne.sen,rows:(ne.kne.tgt||[]).map(x=>'Người ấy: '+x).concat([ne.txt])}:null;
 await p.evaluate(()=>{document.querySelectorAll('#kneov').forEach(e=>{const b=e.querySelector('[data-km-close]');if(b)b.click()})});await p.waitForTimeout(400);
 return {pre,post,steps,card:c,text:ne.txt}}
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
   if(m==='fail')ok(r.text&&/MẤT Sủng/i.test(r.text),`${dn} fail: her Sủng loss in Mất`,r.text);}
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
    const i=rivals.indexOf(v);const pt0=window.ptHarmSend;window.ptHarmSend=()=>false;try{doAct(i,k)}finally{window.ptHarmSend=pt0}let dl='';for(let g=0;g<3&&Q.length&&!window.kaLastResult;g++){const m=Q[0];dl+=(m.t||'')+';';const j=(m.opts||[]).findIndex(c=>!c.off&&!/^Thôi/.test(c.n||''));if(j<0){Q.shift();continue}try{DQ.user=1}catch(e){}chooseM(j)}const R=window.kaLastResult;Q.length=0;try{closeModal()}catch(e){}
    return {k,n:ACT[k].n,dl,seal:R&&R.seal,rows:R?R.rows.map(r=>r.label+': '+r.items.join(' | ')):null,sen:R&&R.sentence}}catch(e){return {k,err:String(e).slice(0,120)}}},k);
   OUTJ.scan.push(Object.assign({via:'doAct'},r))}
  OUTJ.two=await p.evaluate(()=>{try{Q.length=0;window.kaLastResult=null;const v=liveRivals(false).find(v=>!sameHouse(S,v));const b=rsnap();
    const r0=window.roll;window.roll=()=>true;let r;try{r=pillowDo(v,S,100)}finally{window.roll=r0}log(`Tai mắt nghe được: gối đầu, ${v.name} nói xấu ngươi.`);resultShow("Trong cung vừa qua",b,null);const R=window.kaLastResult;
    return {r,seal:R&&R.seal,rows:R?R.rows.map(r=>r.label+': '+r.items.join(' | ')):null}}catch(e){return {err:String(e)}}});
  ok(OUTJ.two&&OUTJ.two.rows&&OUTJ.two.rows.some(x=>/^Ai làm: .*nói xấu ngươi bên gối · thành/.test(x)),'two-way: «Ai làm» row for an NPC deed on her',OUTJ.two);
  ok(!p.errs.length,'scan: no page errors',p.errs.slice(0,3));await p.close()}
 for(const s of OUTJ.scan)console.log(s.via.padEnd(6),String(s.n||s.k).padEnd(24),s.dl?'['+s.dl.slice(0,30)+']':'',s.skip?'SKIP '+s.skip:s.err?'ERR '+s.err:`${s.seal} | ${(s.rows||[]).join(' || ')}`.slice(0,330));
 console.log('two-way',JSON.stringify(OUTJ.two));
 /* 4 old save */
 {const p=await boot(b,{width:755,height:1000},7);const r=await p.evaluate(()=>{try{save();const raw=localStorage.getItem(Object.keys(localStorage).find(k=>/ctm|save|slot/i.test(k))||'');return !!raw}catch(e){return String(e)}});
  const r2=await p.evaluate(()=>{try{if(typeof loadSlot==='function')loadSlot(SLOT);else if(typeof loadGame==='function')loadGame();nextBuoi();render();return {ok:1,turn:S.turn}}catch(e){return {err:String(e)}}});OUTJ.old={r,r2};ok(r2&&r2.ok&&!p.errs.length,'old save loads and plays a buổi',{r,r2,e:p.errs.slice(0,2)});await p.close()}
 if(JOUT)fs.writeFileSync(JOUT,JSON.stringify(OUTJ,null,1));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`ALL ${res.length} OK`);process.exit(f&&!SCAN?1:0)})();
