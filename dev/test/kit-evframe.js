/* review/kit-evframe (KIT §93.4 layout A relayout): Fold 755x1000 + iPad 1180x820.
   WITH a choice: speaker LEFT full body (not clipped), her figure RIGHT, smaller and WHOLE (r2: never cropped), story box RIGHT-top, choice box BELOW over the left figure (x left of the story box), tail on the right.
   WITHOUT a choice (two other people talking): BOTH full body, one each side (never clipped), ONE box between, top. No page errors.
   usage: node dev/test/kit-evframe.js <outdir> [WxH,...]   shots: <outdir>/kef-<case>-<dev>.png */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');const [,,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const ROOT=path.resolve(__dirname,'../..');const MT={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{if(!c){bad++;console.log('FAIL',m)}else console.log('ok',m)};
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.route('http://localhost:8812/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:MT[path.extname(f)]||'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto('http://localhost:8812/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitScene!=='undefined',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render()});
  await require('./lib/veil').waitOut(p);await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#dawn,.kne,#kneov,#kroul,#kroulw,.kroul,#kmrew{display:none!important}'});
  for(const nc of [false,true]){const r=await p.evaluate(async nc=>{const Rv=liveRivals(true).filter(x=>x.alive&&!x.out);const v=Rv[0]||S;Q.length=0;
    const opts=kitBareOpts([{n:'Cúi đầu đáp lời, giữ lễ'},{n:'Ngẩng lên thưa rõ ràng'}]);
    const Sc=kitScene.open({bg:IMG_U("img/ev-te-le.webp"),intro:0});const story=['<div class="kpmain"><p>Giữa giờ Thìn, tú nữ đứng thành hàng trước điện.</p></div>'];
    const P=await Sc.pair({msgr:v,me:S,storyTitle:'Tuyển tú',story,choiceTitle:S.name,choice:nc?[]:[opts]});Sc.show();window.__SC=Sc;return{ok:1}},nc);
   await p.waitForTimeout(3600);
   const m=await p.evaluate(()=>{const L=__SC.L,g=L.getBoundingClientRect();const F=L.figs.map(f=>{const r=f.getBoundingClientRect(),o=f.ob;return{h:Math.round(r.height*(o.b-o.t)),cx:(r.left+r.width/2-g.left)/g.width,half:!!f.__half,bot:Math.round(g.bottom-(r.top+o.b*r.height)),side:Math.round(r.left+o.l*r.width-g.left),sideR:Math.round(g.right-(r.left+o.r*r.width))}});
    const B=L.boxes.map(b=>{const r=b.getBoundingClientRect();return{l:(r.left-g.left)/g.width,r:(r.right-g.left)/g.width,t:Math.round(r.top-g.top),b:Math.round(g.bottom-r.bottom),tr:b.classList.contains('kscn-tr'),tl:b.classList.contains('kscn-tl')}});return{F,B}});
   if(!nc){ok(m.F.length===2&&m.F[0].cx<.35&&m.F[1].cx>.65,`${dev} with choice: speaker LEFT, her RIGHT ${JSON.stringify(m.F.map(f=>+f.cx.toFixed(2)))}`);
    ok(!m.F[0].half&&m.F[1].half&&m.F[0].bot>=-1&&m.F[0].side>=3&&m.F[1].bot>=-1&&m.F[1].side>=3&&m.F[1].sideR>=3,`${dev} with choice: speaker full body never clipped, HER figure WHOLE (no crop at any edge, r2) ${JSON.stringify(m.F)}`);
    ok(m.F[1].h<=m.F[0].h*.72&&m.F[1].h>=m.F[0].h*.5,`${dev} with choice: her figure clearly smaller than the speaker (${m.F[1].h} vs ${m.F[0].h}, ratio ${(m.F[1].h/m.F[0].h).toFixed(2)} in .5-.72)`);
    ok(m.B.length===2&&m.B[0].r>.4&&m.B[0].l>.3&&m.B[1].l<m.B[0].l&&m.B[1].t>m.B[0].t&&m.B[1].tr&&m.B[0].tl,`${dev} with choice: story box right-top (tail left), choice box below, left of it, over the left figure (tail right) ${JSON.stringify(m.B)}`)}
   else{ok(m.F.length===2&&m.F[0].cx<.35&&m.F[1].cx>.65&&m.F.every(f=>!f.half&&f.bot>=-1&&f.side>=3&&f.sideR>=3),`${dev} no choice: BOTH full body, one each side, never clipped ${JSON.stringify(m.F)}`);
    ok(m.B.length===1&&m.B[0].l>.1&&m.B[0].r<.9&&m.B[0].l<.5&&m.B[0].r>.5,`${dev} no choice: ONE box between them ${JSON.stringify(m.B)}`)}
   await p.screenshot({path:path.join(OUT,`kef-${nc?'nochoice':'choice'}-${dev}.png`)});
   await p.evaluate(()=>{kitScene.close(true)});await p.waitForTimeout(300)}
  ok(errs.length===0,`${dev} no page errors ${JSON.stringify(errs)}`);await ctx.close()}
 await b.close();console.log(bad?'FAILED '+bad:'ALL PASS');process.exit(bad?1:0)})();
