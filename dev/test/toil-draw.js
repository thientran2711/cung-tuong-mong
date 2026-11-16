/* diemtrang-score (owner 16/11): the makeup board has NO guide lines, the hidden brow / cheek / lip targets sit on THIS face (mk-fit face points),
   freehand play is scored strictly. Plays a careful hand (on the painted brows), a sloppy hand (offset brows, powder off the cheeks) and checks
   the looks; shots of the board for the eye. usage: python3 dev/build/assemble.py && node dev/test/toil-draw.js [WxH@dpr] [shotdir] */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');const {serve,BASE}=require('./coop-serve.js');
const VP=process.argv[2]||'755x1000@2',DIR=process.argv[3]||'/home/user/wt/toil-draw-shots';const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP);fs.mkdirSync(DIR,{recursive:true});
const res=[];const ok=(c,msg,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+msg+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],hasTouch:false,reducedMotion:'reduce'});await serve(ctx);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(120000);
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof toilMakeup==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__forceOrigin='thd';start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await require('./lib/roulette').dismissRoulette(p);await p.waitForTimeout(1500);
 const sitOnce=async(tag,hand)=>{
  await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}document.querySelectorAll('.kroul,#kroul,#kload').forEach(e=>e.remove());S.buoi=0;S.toilette=null;S.sac=50;used=0;toilOpen()});await p.waitForTimeout(800);
  await p.evaluate(()=>{TOIL.st.col=toilColFix({});toilMakeup()});
  /* wait for the face points (CDN) and the picture */
  await p.waitForFunction(()=>TOIL.test&&TOIL.test.I&&TOIL.test.I.mesh,null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(6000);
  const mesh=await p.evaluate(()=>!!(TOIL.test.I&&TOIL.test.I.mesh));ok(mesh,tag+': targets anchored on this face (mk-fit points)');
  await p.screenshot({path:`${DIR}/${tag}-0-board.jpg`,quality:70});
  const geo=await p.evaluate(()=>TOIL.geo.brows());
  for(const L of geo){const o=hand.off;await p.mouse.move(L[0].x+o[0],L[0].y+o[1]);await p.mouse.down();for(const q of L)await p.mouse.move(q.x+o[0]+(Math.random()-.5)*hand.j,q.y+o[1]+(Math.random()-.5)*hand.j,{steps:2});await p.mouse.up()}
  await p.waitForTimeout(300);await p.screenshot({path:`${DIR}/${tag}-1-brow.jpg`,quality:70});
  await p.evaluate(()=>TOIL.test.next());
  const ch=await p.evaluate(()=>TOIL.geo.cheeks());
  for(const q of [ch[0],ch[7]]){await p.mouse.move(q.x+hand.cheek[0],q.y+hand.cheek[1]);await p.mouse.down();for(let k=0;k<hand.n;k++){const a=k/hand.n*Math.PI*6;await p.mouse.move(q.x+hand.cheek[0]+Math.cos(a)*hand.rub,q.y+hand.cheek[1]+Math.sin(a)*hand.rub,{steps:3});await p.waitForTimeout(70)}await p.mouse.up()}
  await p.waitForTimeout(300);await p.screenshot({path:`${DIR}/${tag}-2-powder.jpg`,quality:70});
  await p.evaluate(()=>TOIL.test.next());
  for(let k=0;k<3;k++){for(let t=0;t<400;t++){const l=await p.evaluate(()=>TOIL.geo.lip());if(!l)break;if(Math.abs(l.ring-1)<.15){await p.mouse.click(l.x+hand.lip,l.y);break}await p.waitForTimeout(10)}}
  await p.waitForFunction(()=>S.toilette,null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(800);
  const r=await p.evaluate(()=>({parts:Object.fromEntries(Object.entries(TOIL.st&&TOIL.st.parts||{}).map(([k,v])=>[k,Math.round(v*100)/100])),t:S.toilette&&{score:S.toilette.score,look:S.toilette.look,slip:S.toilette.slip,mk:toilMk(S.toilette)}}));
  await p.screenshot({path:`${DIR}/${tag}-3-result.jpg`,quality:70});return r};
 const good=await sitOnce('careful',{off:[0,0],j:2,cheek:[0,0],rub:12,lip:0,n:12});console.log('careful',JSON.stringify(good));
 ok(good.t&&good.t.mk!=='vung'&&good.parts.brow>=.7,'careful hand on the painted brows: not vụng, brow good',good);
 for(let i=0;i<6;i++){const c=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&/^(Tiếp theo|Đã hiểu|Chạm để đóng)$/.test(x.textContent.trim()));if(b){b.click();return 1}return 0});if(!c)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{kg82Close()}catch(e){}TOIL.st=null;document.querySelectorAll('.ktrv,.kmov').forEach(e=>e.remove())});await p.waitForTimeout(500);
 const bad=await sitOnce('sloppy',{off:[0,-22],j:10,cheek:[0,-40],rub:22,lip:9,n:12});console.log('sloppy',JSON.stringify(bad));
 ok(bad.t&&bad.t.mk==='vung'&&bad.t.slip,'sloppy hand (brows on the forehead, powder off the cheek): vụng with the part named',bad);
 const npc=await p.evaluate(()=>{const c={};for(const v of liveRivals(false)){const r=toilNpc(v);const k=toilMk(r);c[k]=(c[k]||0)+1}return c});ok(Object.keys(npc).length>0,'NPC looks from the same table',npc);
 ok(!errs.length,'no page errors',errs.slice(0,4));
 console.log(res.every(x=>x)?`PASS ${res.length}`:`FAIL ${res.filter(x=>!x).length}/${res.length}`);await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
