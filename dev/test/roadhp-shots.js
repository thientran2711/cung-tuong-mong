/* roadhp-shots (QUESTLINE Q3): the owner's two devices (Fold 755x1000@2, iPad 1180x820@2), HOST mode, the BUILT root index.html.
   Shot 1: a hồi card of her road with a «Nhờ» option — its Gợi ý row opens with the willingness word. Shot 2: she asks, the helper REFUSES
   (forced for the shot: that role's w = refuse only, nết / liking / Tâm cơ / road / nợ ân terms zeroed, BAL restored after) — the same hồi comes back with the answer line on top, that option gone, the others kept.
   usage: bash dev/site/build_site.sh && node dev/test/roadhp-shots.js <outdir OUTSIDE the repo> [--no-net]   (shots never go in git) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');
const A=process.argv.slice(2);const OUT=A.find(a=>!a.startsWith('--'))||'/tmp/roadhp-shots';fs.mkdirSync(OUT,{recursive:true});const NET=!A.includes('--no-net');let bad=0;
(async()=>{const srv=await D.serveRoot(process.env.CTM_ROOT||undefined);const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){const dd=D.DEVICES[dev];const tag=dd.w+'x'+dd.h;
  const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:2,reducedMotion:'reduce'});await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  if(!NET)await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());
  const pg=await ctx.newPage();const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(pg,srv.url);await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
  await g.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:NET?60000:5000}).catch(()=>{});await g.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  await g.evaluate(()=>{try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){start();if(!(S.origin&&S.origin.k==='cnv'))break}['kroul','kroulw','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
  await g.waitForFunction(()=>{['kroul','kroulw','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());
   for(const e of [...document.body.children]){if(e.id==='modal'||e.id==='title'||e.querySelector('#tabs'))continue;const cs=getComputedStyle(e),r=e.getBoundingClientRect();
    if(cs.position==='fixed'&&cs.display!=='none'&&r.width*r.height>=innerWidth*innerHeight*.8){const bt=e.querySelector('button.kbtn,button');if(bt&&!e.__qcPressed){e.__qcPressed=1;bt.click()}else e.remove()}}try{for(let j=0;j<8&&Q.length&&!S.dead;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}}catch(e){}return !Q.length&&(window.__qcN=(window.__qcN||0)+1)>12},null,{timeout:60000,polling:150}).catch(()=>{});
  /* open a road hồi with a tagged option whose helper is a person with a voice (Thái hậu, Hoàng hậu, Tổng quản, a consort …) */
  const pick=await g.evaluate(()=>{const pref=['th','hh','eun','v','emp','maid','doc','off','dad','bro','fam','go'];Q.length=0;
   for(const role of pref)for(const [k,t] of Object.entries(RDHP)){if(t.hp!==role)continue;const [id,bk,ri]=k.split(':');try{S.st.X=S.st.X||[];const A=newThread67(id,'t');S.st.X.push(A);A.nb=bk;
     if(!beatOk67(A,bk)){S.st.X.pop();continue}const bb=beatDef67(A,bk);if(!opts67(A,bb).includes(bb.o[+ri])||opts67(A,bb).length<3){S.st.X.pop();continue}
     fireBeat67(A);if(!Q.length){S.st.X.pop();continue}window.__shotA={A,bk,ri:+ri,role,key:k};showModal();return k+' ('+role+')'}catch(e){}}return null});
  console.log(tag,'hồi:',pick);
  const shot=async n=>{await pg.waitForTimeout(700);await pg.screenshot({path:`${OUT}/${tag}-${n}.jpg`,type:'jpeg',quality:70});
   const o=await g.evaluate(()=>document.documentElement.scrollWidth-innerWidth);if(o>0){bad++;console.log(`FAIL ${tag} ${n}: horizontal overflow ${o}px`)}};
  const hint=await g.evaluate(()=>[...document.querySelectorAll('#modal .kr-hint')].map(x=>x.textContent.trim()));console.log(tag,'hint rows:',JSON.stringify(hint));
  await shot('1-word');
  /* scroll the helper option into view as well (long cards) */
  await g.evaluate(()=>{const X=window.__shotA;const bb=beatDef67(X.A,X.bk);const i=opts67(X.A,bb).indexOf(bb.o[X.ri]);const bt=document.querySelectorAll('#modal .opts > button')[i];if(bt)bt.scrollIntoView({block:'center'})});await shot('1b-word-option');
  await g.evaluate(()=>{const X=window.__shotA;const H=BAL.road.hp;window.__h0=JSON.parse(JSON.stringify(H));H.w[X.role]=[0,0,100,0];H.tr={};H.aff=[0,0,0,0];H.rdRiv=0;H.owe=0;H.tcSab=0;H.rdWon=0;H.rdLost=0;const bb=beatDef67(X.A,X.bk);const i=opts67(X.A,bb).indexOf(bb.o[X.ri]);chooseM(i)});
  await pg.waitForTimeout(400);await g.evaluate(()=>{try{if(!document.querySelector('#modal:not([hidden]) .opts'))showModal()}catch(e){}const X=window.__shotA;Object.assign(BAL.road.hp,window.__h0);const m=document.querySelector('#modal .dlg, #modal');if(m)m.scrollTop=0});
  const top=await g.evaluate(()=>{const m=document.querySelector('#modal');return m?m.textContent.slice(0,400):''});console.log(tag,'after refusal:',top.replace(/\s+/g,' ').slice(0,300));
  await shot('2-answer');
  if(errs.length){bad++;console.log(`FAIL ${tag}: ${errs.length} page errors: ${errs[0]}`)}await ctx.close()}
 await b.close();srv.close();console.log(bad?`ROADHP-SHOTS FAIL ${bad}`:'ROADHP-SHOTS OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
