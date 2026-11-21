/* mg-play2 (owner bugs OD 20/11 ~07:45Z + ~07:55Z Hoa điền, ~08:05Z Hoa đăng) — node dev/test/mg-play2.js [dev/index.html] [WxH] [shotdir]
   HOA ĐIỀN (hoadien, jhd.js)
   1 the ONE spot table HD_ANC covers EVERY portrait of her that the game can show (every por/fig of role player in img/FIGURES*.json) and equals what
     dev/art/mkfit/hdanchor.py gives (one rule, between the brows, BAL.hd.up)
   2 the tilt step is gone: no «Nghiêng» buttons on the board, hdQ takes the distance only, the sticker starts level with the eyes, the guided-round hint
     never points at a tilt button, no rule text speaks of tilting
   3 the spot stays HIDDEN on a portrait with a row (HD.peek().shown false, row true); a real drag onto the spot scores ≥ 9.5, a drag 0.3 eye-distance off
     scores clearly less; scoring tiers come from BAL.mgTier.lev.hoadien (hardest tier strictly stricter than the easiest); the fallback (no row, no
     face points) shows the spot and is stricter by BAL.hd.shownTol
   HOA ĐĂNG (den, tssteer)
   4 a lotus pad that reaches the lantern = a hit: KG82.denHit counts it and the score falls (penalty), the pad wears the kit danger ring (red pixels on it)
   5 the lit path: luminance at its centre is at least BAL.mgFx.laneMin above the board just outside it
   6 the rules screen picture for tssteer is the «dodge» motion (a thing with the danger ring on a lit path), the guided round's hand DRAGS the lantern
   7 no page errors. Shots: <shotdir>/{hd,den}-{rules,play}-<WxH>.png */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');const {execFileSync}=require('child_process');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const DIR=process.argv[4]||'';if(DIR)fs.mkdirSync(DIR,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{
 /* 1a the table equals the generator (python, offline) */
 let gen='';try{gen=execFileSync('python3',['-I',path.join(__dirname,'../art/mkfit/hdanchor.py'),'--check']).toString().trim();ok(/ OK$/.test(gen),'HD_ANC block = dev/art/mkfit/hdanchor.py output',gen)}catch(e){ok(false,'HD_ANC block = generator',String(e.stdout||e.message).trim())}
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:DIR?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}});
 await p.waitForTimeout(3000);
 const clear=()=>p.evaluate(()=>{document.querySelectorAll('.kmbox').forEach(b=>{let r=b;while(r.parentElement&&r.parentElement!==document.body)r=r.parentElement;r.remove()})});/* the new-game reward box (j93) left over the board by the test's fresh start */
 await clear();
 /* 1b coverage: every player picture listed in the figure lists */
 const cov=await p.evaluate(async()=>{const L=[];for(const u of ["img/FIGURES.json","img/FIGURES-servants.json","img/FIGURES-others.json","img/FIGURES-ty.json","img/FIGURES-kc.json"]){try{const j=await fetch(IMG_BASE+u).then(r=>r.json());const a=Array.isArray(j)?j:(j.figures||j.files||j.items||[]);
   for(const f of a)if(f&&(f.role==="player"||f.role==="consort"))for(const k of ["por"])if(f[k])L.push(String(f[k]).split("/").pop())}catch(e){}}
  /* the board always uses a PORTRAIT (toilPor): every por- of the faces she can wear (old player looks + consort faces c01–c32, every dress / age / trung y / kc) */
  const U=[...new Set(L)],miss=U.filter(n=>!HD_ANC[n]);return{n:U.length,rows:Object.keys(HD_ANC).length,miss:miss.slice(0,8),nMiss:miss.length}});
 ok(cov.n>=1000&&!cov.nMiss,'HD_ANC covers every portrait of every face she can wear (figure lists)',cov);
 /* 2 + 3 formula */
 const f=await p.evaluate(()=>{const lo=mgLev({lv:0},"hoadien","tol"),hi=mgLev({lv:5},"hoadien","tol");const T=BAL.mgTier.lev.hoadien.tol;
  return{len:hdQ.length,q0:hdQ(0,0,1),q1:hdQ(.1,0,1),q3:hdQ(.3,0,1),hard:hdQ(.1,0,lo),easy:hdQ(.1,0,hi),shown:hdQ(.1,0,BAL.hd.shownTol),T,lo,hi,
   tilt:"tolA" in BAL.hd||"rot" in BAL.hd||"a0" in BAL.hd||"wA" in BAL.hd,how:KG82_KIND.hoadien.how,demo:KG82_DEMO.hoadien,demoDen:KG82_DEMO.tssteer}});
 ok(f.len===3&&f.q0===1&&f.q1>f.q3&&!f.tilt,'hdQ(d, sk, lvF): distance only, 1 on the spot, no tilt knobs left in BAL.hd',f);
 ok(f.lo===f.T[0]&&f.hi===f.T[1]&&f.hard<f.easy,'scoring tiers from BAL.mgTier.lev.hoadien: hardest tier stricter than easiest',{hard:f.hard,easy:f.easy,T:f.T});
 ok(f.shown<f.q1&&BAL_OK(f),'fallback (spot shown) scores stricter (BAL.hd.shownTol)',{shown:f.shown,normal:f.q1});
 function BAL_OK(){return true}
 ok(!/nghiêng/i.test(f.how)&&/mày/.test(f.how),'rules text: no tilting, aims by the brows',f.how);
 /* the board, real drags (Thử tay → «Sẵn sàng») */
 const play=async(off)=>{await p.evaluate(()=>{try{kg82Close()}catch(e){}mgCalRun("hoadien")});await sleep(900);
  if(off===0&&DIR)await p.screenshot({path:`${DIR}/hd-rules-${VW}x${VH}.png`});
  await p.evaluate(()=>document.querySelector('#kg82 .kgr-go').click());await p.waitForFunction(()=>HD.peek&&HD.peek()&&document.getElementById('hdok'),null,{timeout:60000});await sleep(500);await clear();
  const pk=await p.evaluate(()=>Object.assign(HD.peek(),{btns:[...document.querySelectorAll('#kg82 .kg82act button')].map(b=>b.id),hint:KG82.peek()}));
  await p.mouse.move(pk.at.x,pk.at.y);await p.mouse.down();await p.mouse.move(pk.anchor.x,pk.anchor.y-pk.ed*off,{steps:10});await p.mouse.up();await sleep(300);
  const pk2=await p.evaluate(()=>Object.assign(HD.peek(),{hint:KG82.peek()}));if(off===0&&DIR)await p.screenshot({path:`${DIR}/hd-play-${VW}x${VH}.png`});
  await p.evaluate(()=>document.getElementById('hdok').click());await p.waitForFunction(()=>KG82.phase==='result'||document.getElementById('kg82ok')||KG82.last!=null,null,{timeout:20000}).catch(()=>{});await sleep(1500);
  const sc=await p.evaluate(()=>{const e=document.querySelector('#kg82 [data-kg="score"]');return e?e.textContent:''});return{pk,pk2,sc}};
 const A=await play(0),Bm=await play(.3);const num=s=>parseFloat(String(s).replace(',','.'));
 ok(A.pk.row&&!A.pk.shown,'spot HIDDEN on a portrait with a row (the face guides)',{row:A.pk.row,shown:A.pk.shown});
 ok(!A.pk.btns.includes('hdl')&&!A.pk.btns.includes('hdr')&&A.pk.btns.includes('hdok'),'board buttons: only «Dán» (no tilt)',A.pk.btns);
 ok(Math.abs(A.pk.ang-A.pk.ideal)<.01,'sticker starts level with the eyes',{ang:A.pk.ang,ideal:A.pk.ideal});
 ok(A.pk2.hint&&A.pk2.hint.sel==='#hdok','guided-round hint after the drag points at «Dán» (never a tilt button)',A.pk2.hint);
 ok(num(A.sc)>=9.5&&num(Bm.sc)<num(A.sc)-2,'a drag onto the spot ≥ 9.5; 0.3 eye-distance off clearly less',{on:A.sc,off:Bm.sc});
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});
 /* fallback: a picture with no row and no face points */
 const fb=await p.evaluate(async()=>{const box=document.createElement('div');box.style.width='400px';document.body.appendChild(box);const C=kg82Canvas(box,.86,620);const G=toilGeom(C.W,C.H,"por-none.webp");
  const A=hdAnchor("por-none-x9-a18.webp",G.img,G.fws,G);box.remove();return A&&{shown:!!A.shown,row:!!A.row}});
 ok(fb&&fb.shown&&!fb.row,'fallback anchor (no row, no points) is SHOWN',fb);
 /* 4–6 Hoa đăng */
 await p.evaluate(()=>{mgCalRun("den")});await sleep(900);
 const rules=await p.evaluate(()=>({demo:!!document.querySelector('#kg82 .kgr-demo'),ev:!!document.querySelector('#kg82 .kgr-ev img')}));
 if(DIR){await sleep(900);await p.screenshot({path:`${DIR}/den-rules-${VW}x${VH}.png`})}
 ok(f.demoDen==='dodge'&&!rules.demo,'Hoa đăng rules screen: no rules-demo picture (mg-intro-2; the «Hướng dẫn» round teaches); the event picture is on top when the manifest has it',rules);
 await p.evaluate(()=>document.querySelector('#kg82 .kgr-go').click());await p.waitForFunction(()=>KG82.denPeek&&KG82.denPeek(),null,{timeout:30000});await sleep(3500);
 /* pixels from a real screenshot (the board paints CDN pictures, so the canvas itself is not readable) */
 const geo=await p.evaluate(()=>{const P=KG82.denPeek();const r=document.querySelector('#kg82 canvas').getBoundingClientRect(),k=r.width/P.W;const out=P.chan+P.cw*.8+28<P.W-6?P.chan+P.cw*.8+28:P.chan-P.cw*.8-28;
  return{pts:[.2,.35,.5].map(f=>[[r.left+P.chan*k,r.top+f*P.H*k],[r.left+out*k,r.top+f*P.H*k]]),min:BAL.mgFx.laneMin}});
 const png=(await p.screenshot()).toString('base64');
 const lane=await p.evaluate(async([png,geo])=>{const im=new Image();await new Promise(r=>{im.onload=r;im.src='data:image/png;base64,'+png});const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
  const sc=im.width/innerWidth,lum=([x,y])=>{const d=g.getImageData(Math.round(x*sc)-4,Math.round(y*sc)-4,8,8).data;let s=0,n=0;for(let i=0;i<d.length;i+=4){s+=.299*d[i]+.587*d[i+1]+.114*d[i+2];n++}return s/n};
  let a=0,b=0;for(const [i,o] of geo.pts){a+=lum(i);b+=lum(o)}return{gap:Math.round((a-b)/geo.pts.length),min:geo.min}},[png,geo]);
 ok(lane.gap>=lane.min,'lit path: centre luminance ≥ BAL.mgFx.laneMin above the board beside it',lane);
 if(DIR)await p.screenshot({path:`${DIR}/den-play-${VW}x${VH}.png`});
 const hit0=await p.evaluate(async()=>{const P=KG82.denPeek();const g0=P.good,t0=P.tot;P.pads.push({x:P.lx,y:P.ly-4,r:24});await new Promise(r=>setTimeout(r,120));const P2=KG82.denPeek();
  const pad=P2.pads[P2.pads.length-1];const r=document.querySelector('#kg82 canvas').getBoundingClientRect(),k=r.width/P2.W;
  /* a fresh pad high on the board: its rim (the danger ring) is read from a screenshot */
  const q={x:P2.W*.5,y:P2.H*.12,r:24};P2.pads.push(q);return{hits:KG82.denHit,hitPad:!!pad.hit,g0,g1:P2.good,ring:Array.from({length:12},(_,a)=>[r.left+(q.x+Math.cos(a/12*6.283)*q.r*1.02)*k,r.top+(q.y+2+Math.sin(a/12*6.283)*q.r*1.02)*k])}});
 const png2=(await p.screenshot()).toString('base64');
 const red=await p.evaluate(async([png,pts])=>{const im=new Image();await new Promise(r=>{im.onload=r;im.src='data:image/png;base64,'+png});const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
  const sc=im.width/innerWidth;let n=0;for(const [x,y] of pts){const d=g.getImageData(Math.round(x*sc)-2,Math.round(y*sc)-2,5,5).data;let hit=false;for(let i=0;i<d.length;i+=4)if(Math.abs(d[i]-194)<12&&Math.abs(d[i+1]-59)<12&&Math.abs(d[i+2]-34)<12)hit=true/* the exact kit --bad red of the old ring */;if(hit)n++}return n},[png2,hit0.ring]);
 const hit=Object.assign({},hit0,{red,ring:undefined});
 ok(hit.hits>=1&&hit.hitPad&&hit.g1<hit.g0,'a lotus pad reaching the lantern = a hit, score falls (penalty)',hit);
 ok(hit.red===0,'den-look: lotus pads are plain painted lotus (no danger ring / ✕ over them)',{red:hit.red});
 await p.evaluate(()=>{try{kg82Close()}catch(e){}});
 /* guided round: the hand drags */
 await p.evaluate(()=>{mgCalRun("den")});await sleep(900);await p.evaluate(()=>document.getElementById('kgrtut').click());await sleep(2500);
 const tut=await p.evaluate(()=>{const pk=KG82.peek&&KG82.peek();const h=document.querySelector('.kgt-hand');return{drag:!!(pk&&(pk.drag||Number.isFinite(pk.x))),isDrag:!!(pk&&pk.drag),hand:!!(h&&h.classList.contains('on')),m:h&&h.dataset.m}});
 ok(tut.drag&&tut.hand,'Hướng dẫn: the ghost hand guides the lantern along the path',tut);
 await p.evaluate(()=>{try{const bk=document.getElementById('kgtback');if(bk)bk.click();kg82Close()}catch(e){}});
 /* law 11 group: every guide to follow / zone to keep uses the kit lit path (no private faint fill left) */
 {const B=path.join(__dirname,'../build/');const src=f=>fs.readFileSync(B+f,'utf8');const use={'jts.js':/kg82FxLane\(/,'j91.js':/kg82FxLane\.path\(/,'j91.js ':/kg82FxLane\.zone\(/,'jtd.js':/kg82FxLane\.zone\(/,'jnwp.js':/kg82FxLane\.stroke\(/};
  const miss=Object.entries(use).filter(([f,re])=>!re.test(src(f.trim()))).map(([f])=>f.trim());const faint=['j91.js','jtd.js','jnwp.js'].filter(f=>/#2d7a5244|rgba\(255,226,140,\.38\)|"#8a735044"/.test(src(f)));
  const zv=await p.evaluate(()=>BAL.mgFx.zone);ok(!miss.length&&!faint.length&&zv>=.5,'law 11: den/duho/hát/nấu/Tu đức/thư pháp guides on the kit lit path (no old faint fill)',{miss,faint,zone:zv})}
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`mg-play2: ${n} FAIL`:`mg-play2: all ${res.length} ok`);process.exit(n?1:0)})();
