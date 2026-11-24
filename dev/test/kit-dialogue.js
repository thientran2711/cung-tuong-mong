/* review/kit-dialogue-vn (KIT §95 kitDialogue · kitTypeLine · kitScene.light/focus): Fold 755x1000 + iPad 1180x820.
   Serves the checkout through a Playwright route, starts a life, opens a real scene with 3 figures and plays 3 lines:
   word-by-word typing (box never reflows), tap = finish the line (cues all fire), next tap = next line, spotlight (speaker lit, others dim not black),
   focus shot (one figure big + others hidden + bg blurred), the speech box stays inside the layer, onDone cleans everything (no dim / focus class left), no page errors.
   usage: node dev/test/kit-dialogue.js <outdir> [WxH,...]   shots: <outdir>/kdv-<step>-<dev>.png */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitDialogue!=='undefined',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render()});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#dawn,.kne,#kneov{display:none!important}'});
  const o=await p.evaluate(async()=>{const Rv=liveRivals(true).filter(x=>x.alive&&!x.out).slice(0,3);while(Rv.length<3)Rv.push(S);
   const Sc=kitScene.open({bg:IMG_U("img/ev-te-le.webp"),intro:0}),g=Sc.L.g,fh=Math.round(g.H*.8);const cx=[.2,.5,.8];for(let i=0;i<3;i++)await Sc.fig(Rv[i],{cx:g.w*cx[i],top:g.H-fh,fh,z:2+i});Sc.show();
   window.__SC=Sc;window.__cue=[];window.__done=0;window.__lines=[];
   const D=kitDialogue.play(Sc,{box:ln=>({x:Math.round(g.w*(ln.fig===0?.4:.05)),y:g.H-190,w:Math.round(g.w*.55)}),onLine:i=>window.__lines.push(i),onDone:()=>{window.__done=1},
    lines:[{fig:0,who:"A",text:"Ngươi là con nhà ai mà dám đứng trước ta, lại còn không biết hành lễ cho phải phép?",cues:[{w:2,fn:()=>window.__cue.push(2)},{w:12,fn:()=>window.__cue.push(12)}]},{fig:1,who:"B",text:"Thưa tỷ, muội mới vào cung, chưa quen quy củ."},{fig:2,who:"C",text:"Hai vị đừng cãi nhau nữa.",focus:true}]});window.__D=D;return{figs:Sc.L.figs.length}});
  ok(o.figs===3,`${dev} scene with 3 figures`);
  await p.waitForTimeout(800);
  const t1=await p.evaluate(()=>{const s=[...document.querySelectorAll('.kdv-line .kdw')];const L=__SC.L;return{n:s.length,on:s.filter(x=>x.classList.contains('on')).length,lit:L.dataset.klit,dim:L.figs.map(f=>f.classList.contains('kscn-dim')),f:L.figs.map(f=>getComputedStyle(f).filter)}});
  ok(t1.n>10&&t1.on>=1&&t1.on<t1.n,`${dev} typing word by word ${JSON.stringify({n:t1.n,on:t1.on})}`);
  ok(t1.lit==="0"&&t1.dim.join()==="false,true,true",`${dev} spotlight: speaker 0 lit, others dim ${JSON.stringify(t1.dim)}`);
  ok(t1.f[1].includes('brightness(0.5)')&&!/brightness\(0\)/.test(t1.f[1]),`${dev} dim = brightness .5 (not black) ${t1.f[1]}`);
  await p.screenshot({path:path.join(OUT,`kdv-typing-${dev}.png`)});
  const h0=await p.evaluate(()=>document.querySelector('.kdv-box').getBoundingClientRect().height);
  await p.mouse.click(W/2,H*.35);await p.waitForTimeout(150);
  const t2=await p.evaluate(()=>{const s=[...document.querySelectorAll('.kdv-line .kdw')];return{all:s.every(x=>x.classList.contains('on')),cues:__cue.join(),h:document.querySelector('.kdv-box').getBoundingClientRect().height,done:document.querySelector('.kdv-box').classList.contains('kdv-done'),lines:__lines.join()}});
  ok(t2.all&&t2.cues==="2,12"&&t2.done&&t2.lines==="0",`${dev} tap finishes the line, every cue fired ${JSON.stringify(t2)}`);
  ok(Math.abs(t2.h-h0)<=2,`${dev} box never reflows while typing (${Math.round(h0)} → ${Math.round(t2.h)})`);
  await p.screenshot({path:path.join(OUT,`kdv-line1-${dev}.png`)});
  await p.mouse.click(W/2,H*.35);await p.waitForTimeout(500);
  const t3=await p.evaluate(()=>{const L=__SC.L,g=L.getBoundingClientRect(),r=document.querySelector('.kdv-box').getBoundingClientRect();return{lit:L.dataset.klit,lines:__lines.join(),box:r.top>=g.top-1&&r.bottom<=g.bottom+1&&r.left>=g.left-1&&r.right<=g.right+1}});
  ok(t3.lit==="1"&&t3.lines==="0,1"&&t3.box,`${dev} next tap = next line, spotlight moves, box inside the layer ${JSON.stringify(t3)}`);
  await p.mouse.click(W/2,H*.35);await p.mouse.click(W/2,H*.35);await p.waitForTimeout(900);
  const t4=await p.evaluate(()=>{const L=__SC.L;return{focus:L.classList.contains('kscn-focus'),hid:L.figs.map(f=>f.classList.contains('kscn-fhide')),big:L.figs.map(f=>f.classList.contains('kscn-fbig')),bg:(L.querySelector('.kscn-bg')||{style:{}}).style.filter,scale:L.figs[2].style.transform}});
  ok(t4.focus&&t4.hid.join()==="true,true,false"&&t4.big[2]&&/blur\(/.test(t4.bg)&&/scale\(1\.5\)/.test(t4.scale),`${dev} focus shot: one figure big, others hidden, bg blurred ${JSON.stringify(t4)}`);
  await p.screenshot({path:path.join(OUT,`kdv-focus-${dev}.png`)});
  await p.mouse.click(W/2,H*.35);await p.waitForTimeout(150);await p.mouse.click(W/2,H*.35);await p.waitForTimeout(300);
  const t5=await p.evaluate(()=>{const L=__SC.L;return{done:window.__done,dim:L.figs.some(f=>f.classList.contains('kscn-dim')),focus:L.classList.contains('kscn-focus'),box:!!document.querySelector('.kdv-box')}});
  ok(t5.done===1&&!t5.dim&&!t5.focus&&!t5.box,`${dev} after the last line: onDone fired, spotlight + focus + box cleaned ${JSON.stringify(t5)}`);
  ok(errs.length===0,`${dev} no page errors ${JSON.stringify(errs)}`);await ctx.close()}
 await b.close();console.log(bad?'FAILED '+bad:'ALL PASS');process.exit(bad?1:0)})();
