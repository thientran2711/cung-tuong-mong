/* mg-craft (owner OD 20/11 ~08:15Z: each craft its OWN mechanic; dev/design/MG_CRAFTS.md) — node dev/test/mg-craft.js [dev/index.html] [WxH] [--kinds=td_cong,kim,theu] [--runs=N] [--speed=S] [--measure]
   For each craft kind whose new engine is registered (crOn(kind); a kind still on its old engine is listed as «not built» and skipped):
   1 every caller opens it on the NEW engine, first screen = kgReady rules (+ «Hướng dẫn»), «Sẵn sàng» starts a canvas board:
       playArt · startContest · Thử tay mgCalRun · khảo hạch exRun · tuyển chọn kcEntryExam · lesson kg82Lesson (lesson kinds) · works (openMG → playArt, j83)
   2 no visible text node / no lettered canvas text in the play area while playing (OD 20/11 ~05:10Z), «Hướng dẫn» included
   3 the guided round shows the ghost hand (KG82.peek / KG82.hint) and leaves S untouched
   4 a full play by the oracle bot ends with a float raw 0..10 (KG82.rawF), graded through mgGrade (result screen shown)
   5 law 5 (harder as she climbs): the skilled bot (oracle + human noise) at ease 5 ≥ 9 raw and lower at ease 0 (mean over --runs)
   6 ✕ (kg82Close) mid-play stops the board (no canvas left, KG82.run null)
   7 an old save (made before mg-craft) loads and the kinds still play
   8 no page errors. --measure prints only the bot table (kind | ease | skilled raw | random raw).
   Sonnet builders (ve, hoa) add their kind's own cases in KIND_CASES below. */
const {chromium}=require('playwright');const path=require('path');
const A=process.argv.slice(2);const pos=A.filter(a=>!a.startsWith('--'));const opt=n=>{const a=A.find(x=>x.startsWith('--'+n+'='));return a?a.split('=')[1]:null};
const URL0=pos[0]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(pos[1]||'755x1000').split('x').map(Number);const RUNS=+(opt('runs')||2),SPEED=+(opt('speed')||2),MEASURE=A.includes('--measure');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
/* per-kind extra checks (in-page source, returns {ok, info}); builders add theirs */
const KIND_CASES={/* td_cong (owner 21/11 ~01:05Z): the stitch levers live in BAL.mgTier.lev.td_cong (none left under theu), Thêu is back on the j82 pattern engine, the old dotted-line engine is gone */
 td_cong:()=>{const L=BAL.mgTier.lev.td_cong||{},need=["beat","win","near","st","alike","sway","peek","wC","wS","lim"],miss=need.filter(n=>!Array.isArray(L[n]));
  return{ok:!miss.length&&!BAL.mgTier.lev.theu&&KG82_KIND.theu.e==="pattern"&&typeof KG82_ENG.pattern==="function"&&!KG82_ENG.tdthread&&KG82_KIND.td_cong.t==="Thêu theo nét",miss,theu:KG82_KIND.theu.e}},
/* ve (mg-craft-ve): the Thủy mặc levers exist and get harder toward ease 0; the stand-in motifs are listed as missing pictures (the «tạm» marker) */
 ve:`(()=>{const L=BAL.mgTier.lev.ve,need=["place","tones","ramp","dry","peek","bleed","lim","limBase"];const m=(window.CTM_MISSING_PICS&&JSON.stringify(window.CTM_MISSING_PICS))||"";
  return{ok:typeof k91Ve==="function"&&need.every(k=>Array.isArray(L[k]))&&L.place[0]<L.place[1]&&L.tones[0]>L.tones[1]&&L.ramp[0]<L.ramp[1]&&L.dry[0]<L.dry[1]&&L.peek[0]<L.peek[1],info:{lev:Object.keys(L),missing:m.slice(0,80)}}})()`,
 /* hoa (review/mg-craft-hoa): every lever the engine reads sits in the lead's BAL.mgTier.lev.hoa block as [ease0, ease5] (ONE CORE), the score weights add to 1, the tray has 6 slots;
    the wrong-flower / cut / lean play checks live in dev/test/mg-craft-hoa.js */
 hoa:()=>{const L=BAL.mgTier.lev.hoa,H=BAL.mgTier.hoa,need=["ghost","cutTol","angTol","alike","sway","limStem"],miss=need.filter(n=>!Array.isArray(L[n])||L[n].length!==2);
  const ws=Object.values(H.w).reduce((a,b)=>a+b,0);return{ok:!miss.length&&Math.abs(ws-1)<1e-9&&H.n.length===3&&L.alike[0]<=3&&L.alike[0]+1<=6&&L.limStem[0]<L.limStem[1],miss,ws,n:H.n}}};
/* the engine names the kinds must reach (mirror of KG82_CRAFT; a mismatch = the wiring moved) */
const KG82_CRAFT_E={td_cong:"stitch",kim:"papercut",ve:"inkwash",hoa:"ikebana"};/* owner 21/11 ~01:05Z: Thêu keeps the j82 pattern game; the stitch board = Công «Thêu theo nét» */
/* the plain play of a kind: playArt (Cắm hoa has no plain art key — the plain "hoa" is Họa/Vẽ — so it opens by startContest) */
const SRC0=k=>k==='td_cong'?`(TDS.busy=false,tdPlay("cong","self"))`:k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__ct=null;/* owner OD 21/11 ~00:50Z «guiding words stay» (canon overwrite of «no text in play»): the stitch board (Công) keeps its ONE kit guiding line (kg82Guide) + the «Mẫu» tag; any other word still fails */const GUIDE=/^(Mẫu|Chạm cuộn chỉ cùng sắc dải sáng|Chạm khung ngay!|Chạm khung khi kim chúc xuống)$/;const okT=t=>/^[^\p{L}]*$/u.test(t)||GUIDE.test(t);
  for(const f of['fillText','strokeText']){const o=CanvasRenderingContext2D.prototype[f];CanvasRenderingContext2D.prototype[f]=function(t){if(window.__ct&&!okT(String(t).trim()))window.__ct.add(String(t).trim());return o.apply(this,arguments)}}});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const kinds0=await p.evaluate(()=>Object.keys(KG82_CRAFT).map(k=>[k,KG82_CRAFT[k].e,crOn(k),KG82_KIND[k].e]));
 const want=(opt('kinds')||'').split(',').filter(Boolean);
 for(const [k,e,on,cur] of kinds0)if(!on)console.log(`not built: ${k} (craft engine ${e} not registered; still on ${cur})`);
 const KINDS=kinds0.filter(([k,e,on])=>on&&(!want.length||want.includes(k))).map(x=>x[0]);
 /* an old save made before mg-craft (the main page, before any play): kept to load later */
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}try{save()}catch(e){}
  window.__oldSave=JSON.stringify(S);
  window.__words=box=>{const out=[];const w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);let n;
   while(n=w.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const el=n.parentElement;if(!el)continue;
    if(el.closest('.kgr,.kgt-bar,script,style,[data-nw-ok]'))continue;const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;
    const r=el.getBoundingClientRect();if(!r.width&&!r.height)continue;if(/^[^\p{L}]*$/u.test(t))continue;out.push(t)}return out};
  const sleep=t=>new Promise(r=>setTimeout(r,t));window.__sleep=sleep;
  const gauss=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
  const fire=(type,x,y,id)=>{const box=kg82Box();const cv=box&&[...box.querySelectorAll('canvas')].find(c=>{const q=c.getBoundingClientRect();return x>=q.left-40&&x<=q.right+40&&y>=q.top-40&&y<=q.bottom+40});
   const el=cv||document.elementFromPoint(x,y);if(el)el.dispatchEvent(new PointerEvent(type,{clientX:x,clientY:y,pointerId:id||1,pointerType:'touch',isPrimary:true,bubbles:true,cancelable:true}))};
  /* the bot: follows KG82.peek (the oracle). noise = {px: drop error as a share of the board width, ms: reaction spread}. mode "random" = random taps/drags */
  window.__cbot=async(o)=>{o=o||{};const end=performance.now()+(o.ms||100000);let busy=false,acts=0;
   while(performance.now()<end&&KG82.phase==='play'&&KG82.run){await sleep(8);if(busy)continue;
    const box=kg82Box();const cv=box&&box.querySelector('canvas');if(!cv)continue;const R=cv.getBoundingClientRect();
    if(o.random){busy=true;const x=R.left+Math.random()*R.width,y=R.top+Math.random()*R.height;
     if(Math.random()<.5){fire('pointerdown',x,y);fire('pointerup',x,y)}else{const x2=R.left+Math.random()*R.width,y2=R.top+Math.random()*R.height;fire('pointerdown',x,y);for(let i=1;i<=6;i++){fire('pointermove',x+(x2-x)*i/6,y+(y2-y)*i/6);await sleep(12)}fire('pointerup',x2,y2)}
     const bt=box.parentNode.querySelectorAll('.kg82act .kgbtn');if(bt.length&&Math.random()<.15)bt[Math.floor(Math.random()*bt.length)].click();acts++;await sleep(220);busy=false;continue}
    let pk=null;try{pk=KG82.peek&&KG82.peek()}catch(e){}if(!pk)continue;busy=true;acts++;
    const jit=()=>gauss()*(o.px||0)*R.width;
    if(pk.sel){const el=document.querySelector(pk.sel);if(el&&!el.disabled)el.click();await sleep(260)}
    else if(pk.drag){const L=pk.drag;const ex=jit(),ey=jit();fire('pointerdown',L[0][0],L[0][1]);const n=8;for(let i=1;i<=n;i++){const f=i/n,seg=Math.min(L.length-2,Math.floor(f*(L.length-1))),t=f*(L.length-1)-seg;
      const x=L[seg][0]+(L[seg+1][0]-L[seg][0])*t+ex*f,y=L[seg][1]+(L[seg+1][1]-L[seg][1])*t+ey*f;fire('pointermove',x,y);await sleep(14)}
     const lx=L[L.length-1][0]+ex,ly=L[L.length-1][1]+ey;fire('pointerup',lx,ly);await sleep(200)}
    else if('hold' in pk){/* a press-and-hold board (ve: the brush on the inkstone): press while the oracle says hold, lift when it says release */
     if(pk.hold&&!window.__held){fire('pointerdown',pk.x,pk.y,7);window.__held=1}else if(!pk.hold&&window.__held){fire('pointerup',pk.x,pk.y,7);window.__held=0}await sleep(10)}
    else if(pk.x!=null){let x=pk.x,y=pk.y;/* memory slip: the sample is covered and a look-alike spool / shape is near: picks it now and then */
     if(o.slip&&pk.hidden&&pk.alike&&pk.alike.length&&Math.random()<o.slip*pk.alike.length){const a=pk.alike[Math.floor(Math.random()*pk.alike.length)];x=a.x;y=a.y}
     if(pk.at!=null){/* a timed tap: aim at the moment (+ the hand's spread), on the craft clock */const aim=crNow()+pk.at+(o.ms0||0)+gauss()*(o.msS||0);let w;while((w=aim-crNow())>0)await sleep(Math.min(4,w/(CRAFT.speed||1)))}
     fire('pointerdown',x,y);fire('pointerup',x,y);await sleep(pk.at!=null?20:120)}
    busy=false}
   return acts};
  /* open with a caller source, «Sẵn sàng», return what the board shows */
  window.__open=async(src,o)=>{o=o||{};const r={};try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   try{(0,eval)(src)}catch(e){r.err=String(e.message||e);return r}await sleep(900);const box=kg82Box();if(!box){r.nobox=1;return r}
   r.rules=!!box.querySelector('.kgr .kpst .kfx')&&!box.querySelector('.kgr .kgr-demo');/* LIVE mg-intro-2 (same check as mg-ready-guide): rules title with the kit tap-word «!» (.kfx), no rules-demo picture */r.tut=!!box.querySelector('#kgrtut');const go=box.querySelector('.kgr-go');if(!go){r.nogo=1;return r}
   if(o.ease!=null){/* the board ease of this play (law 5 measure) */const k0=kg82Play;kg82Play=function(kind,cb){KG82.lv=o.ease;kg82Play=k0;return k0.apply(this,arguments)}}
   window.__ct=new Set();go.click();await sleep(1600);r.eng=KG82_KIND[o.kind].e;r.canvas=!!box.querySelector('canvas');r.play=KG82.phase==='play';r.words=[...new Set(__words(box))];
   if(o.bot){r.acts=await __cbot(o.bot);await sleep(1200);r.rawF=KG82.rawF;r.res=!!document.querySelector('#kg82box-res:not([hidden])')||!!document.getElementById('kg82ok')}
   r.words.push(...[...window.__ct].map(t=>t+' «canvas»'));window.__ct=null;
   if(o.close){r.closed=(()=>{try{kg82Close()}catch(e){return false}return !KG82.run&&!document.querySelector('#kg82 canvas')})()}
   return r};
  /* the guided round: hand shows, no text, S untouched */
  window.__tut=async(src)=>{const r={};try{kg82Close()}catch(e){}try{(0,eval)(src)}catch(e){r.err=String(e.message||e);return r}await sleep(900);const box=kg82Box();const tb=box&&box.querySelector('#kgrtut');if(!tb){r.notut=1;return r}
   const S0=JSON.stringify(Object.assign({},S,{pcx:undefined}));window.__ct=new Set();tb.click();let hand=false;const end=performance.now()+9000;
   while(performance.now()<end&&KG82.tut){await sleep(80);if(document.querySelector('.kgt-hand.on'))hand=true;if(hand&&performance.now()>end-5000)break}
   r.hand=hand;r.words=[...new Set(__words(box))].concat([...window.__ct].map(t=>t+' «canvas»'));window.__ct=null;const bk=document.getElementById('kgtback');if(bk)bk.click();await sleep(200);
   r.unsaved=JSON.stringify(Object.assign({},S,{pcx:undefined}))===S0;r.back=!!box.querySelector('.kgr-go');try{kg82Close()}catch(e){}return r}});
 await p.waitForTimeout(3000);
 const ev=(f,a)=>p.evaluate(f,a).catch(e=>({err:String(e.message).slice(0,160)}));
 const table=[];
 for(const k of KINDS){
  const mgl=await p.evaluate(k=>Object.keys(KG82_MGL).find(a=>KG82_MGL[a][1]===k)||null,k);
  const callers=[['playArt',`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`],['startContest',`startContest({art:${JSON.stringify(k)},title:"Hội thi",onDone:()=>{}})`],
   ['Thử tay mgCalRun',`mgCalRun(${JSON.stringify(k)})`],['khảo hạch exRun',`(()=>{const P=exPlan(S);P.rounds=[${JSON.stringify(k)}];exRun(P,{},()=>{})})()`],
   ['tuyển chọn kcEntryExam',`kcEntryExam(${JSON.stringify(k)},()=>{},{art:${JSON.stringify(k)}})`]/* review/mg-craft-r3: entExam picks its board from info.art (empty → her best art, any kind: on iPad that was Điều hương, whose LIVE guiding words failed this row); art = the kind makes the row test the craft board */,['works openMG→playArt',`(S.mg={k:${JSON.stringify(mgl||k)},pa:1},openMG(${JSON.stringify(mgl||k)},1,()=>{}))`]];
  if(k==='hoa')callers.shift();/* no plain playArt road to Cắm hoa */
  if(k==='hoa')callers.splice(callers.findIndex(c=>c[0].startsWith('tuyển chọn')),1);/* nor a selection-exam road: entKind("hoa") = KG82_PLAIN.hoa = Vẽ */
  if(k==='td_cong')callers.splice(0,callers.length,['Công lesson tdPlay self','(TDS.busy=false,tdPlay("cong","self"))'],['Công lesson tdPlay master','(TDS.busy=false,tdPlay("cong","master"))'],['Thử tay mgCalRun','mgCalRun("td_cong")'],['khảo hạch exRun','(()=>{const P=exPlan(S);P.rounds=["td_cong"];exRun(P,{},()=>{})})()']);/* the Tứ đức lesson roads */
  for(const [lab,src] of callers){if(lab.startsWith('works')&&!mgl)continue;
   const r=await ev(([s,k])=>window.__open(s,{kind:k,close:true}),[src,k]);
   const good=!r.err&&r.rules&&r.tut&&r.canvas&&r.play&&r.eng===(KG82_CRAFT_E[k])&&!r.words.length&&r.closed;
   ok(good,`1/2/6 ${k} via ${lab}: rules + Sẵn sàng → new engine on canvas, no text in play, ✕ stops`,good?undefined:r)}
  if(mgl){const r=await ev(async([a,k])=>{const d=document.createElement('div');d.style.width='600px';d.className='kgbox';document.body.appendChild(d);let lvl=null;
    const L=kg82Lesson(a);const stop=L[2](d,2,x=>{lvl=x});await __sleep(1500);const o={t:L[0],can:!!d.querySelector('canvas'),eng:KG82_KIND[k].e};try{stop()}catch(e){}d.remove();return o},[mgl,k]);
   ok(r.can&&r.eng===KG82_CRAFT_E[k]&&!/nhớ|đồ nét/i.test(r.t),`1 ${k} lesson kg82Lesson("${mgl}") runs the new board`,r)}
  const t=await ev(s=>window.__tut(s),SRC0(k));
  ok(t.hand&&!t.words.length&&t.unsaved&&t.back,`2/3 ${k} «Hướng dẫn»: ghost hand, no text, S untouched, back to rules`,t);
  /* 4/5 the bots */
  const play=async(ease,bot)=>{const r=await ev(([s,k,e,bot,sp])=>{CRAFT.speed=sp;return window.__open(s,{kind:k,ease:e,bot})},[SRC0(k),k,ease,bot,SPEED]);
   await ev(()=>{CRAFT.speed=1;try{kg82Close()}catch(e){}});return r};
  const row={k,e5:[],e0:[],r5:[],e2:[]};
  for(let i=0;i<RUNS;i++){const a=await play(5,{px:.012,ms0:0,msS:45,slip:.08});row.e5.push(a.rawF);if(i===0)ok(typeof a.rawF==='number'&&a.rawF>=0&&a.rawF<=10&&a.res,`4 ${k} full bot play ends with a float raw 0..10 + result`,{rawF:a.rawF,acts:a.acts,res:a.res});
   const c=await play(0,{px:.012,ms0:0,msS:45,slip:.08});row.e0.push(c.rawF);const m=await play(2,{px:.012,ms0:0,msS:45,slip:.08});row.e2.push(m.rawF);const z=await play(5,{random:1});row.r5.push(z.rawF)}
  const mean=a=>a.filter(x=>typeof x==='number').reduce((s,x,_,A)=>s+x/A.length,0);
  table.push([k,mean(row.e5),mean(row.e2),mean(row.e0),mean(row.r5)]);
  if(!MEASURE){ok(mean(row.e5)>=9,`5 ${k} skilled bot ≥ 9 raw at ease 5`,row.e5);ok(mean(row.e0)<mean(row.e5),`5 ${k} lower at ease 0 than at ease 5 (law 5)`,{e0:row.e0,e5:row.e5});ok(mean(row.r5)<mean(row.e5)-2,`5 ${k} random bot well below skilled`,row.r5)}
  if(KIND_CASES[k]){const r=await ev(KIND_CASES[k]);ok(r&&r.ok,`${k} own case`,r)}}
 /* owner 21/11 ~01:05Z "Cái trò đó hay nha, không bỏ nha": Thêu keeps «Nhớ mẫu thêu» (j82 pattern) on every road: Tài nghệ lesson, contests, Thử tay, khảo hạch, works */
 if(!want.length||want.includes('theu')){const srcT=[['playArt','playArt({art:"theu",onDone:()=>{}})'],['startContest','startContest({art:"theu",title:"Hội thi",onDone:()=>{}})'],['Thử tay mgCalRun','mgCalRun("theu")'],
   ['khảo hạch exRun','(()=>{const P=exPlan(S);P.rounds=["theu"];exRun(P,{},()=>{})})()'],['works openMG→playArt','(S.mg={k:"theu",pa:1},openMG("theu",1,()=>{}))']];
  for(const [lab,src] of srcT){const r=await ev(([s])=>window.__open(s,{kind:'theu',close:true}),[src]);const good=!r.err&&r.rules&&r.canvas&&r.play&&r.eng==='pattern'&&r.closed;
   ok(good,`theu via ${lab}: «Nhớ mẫu thêu» (pattern engine) plays, ✕ stops`,good?undefined:r)}
  const L=await ev(async()=>{const d=document.createElement('div');d.style.width='600px';d.className='kgbox';document.body.appendChild(d);const L=kg82Lesson('theu');const stop=L[2](d,2,()=>{});await __sleep(1500);
   const o={t:L[0],can:!!d.querySelector('canvas'),eng:KG82_KIND.theu.e,t2:KG82_KIND.theu.t};try{stop()}catch(e){}d.remove();return o});
  ok(L.can&&L.eng==='pattern'&&/nhớ mẫu thêu/i.test(L.t)&&L.t2==='Nhớ mẫu thêu',`theu Tài nghệ lesson kg82Lesson("theu") = «Nhớ mẫu thêu» on the pattern engine`,L)}
 /* 7 old save loads */
 const os=await ev(async([ks,srcs])=>{try{localStorage.setItem('ctm_slot3',window.__oldSave)}catch(e){}let o={};try{const s=JSON.parse(window.__oldSave);Object.assign(S,s);render();o.loaded=true;
   for(const k of ks){(0,eval)(srcs[k]);await __sleep(700);const g=document.querySelector('.kgr-go');if(g)g.click();await __sleep(1200);o[k]=!!document.querySelector('#kg82 canvas');kg82Close()}}catch(e){o.err=String(e.message||e)}return o},[KINDS,Object.fromEntries(KINDS.map(k=>[k,SRC0(k)]))]);
 ok(os.loaded&&!os.err&&KINDS.every(k=>os[k]),'7 an old save loads and the craft kinds play',os);
 console.log('\n| kind | engine | skilled ease 5 | skilled ease 2 | skilled ease 0 | random ease 5 |');console.log('|---|---|---|---|---|---|');
 for(const [k,a,m,c,z] of table)console.log(`| ${k} | ${await p.evaluate(k=>KG82_KIND[k].e,k)} | ${a.toFixed(2)} | ${m.toFixed(2)} | ${c.toFixed(2)} | ${z.toFixed(2)} |`);
 ok(!errs.length,'8 no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(MEASURE||!f?0:1)})();
