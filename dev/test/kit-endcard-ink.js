/* kit-endcard-ink.js — KK29 KIT BUG #4 (robot, B1 report d-robot-bugs): on a mourning ending the death-ink banner («Hồng nhan bạc mệnh · Mở Sổ luân hồi») drew over the «Kiếp này» card rows.
   RULE: the banner never covers rows: while the ink scene plays the ending card is held back (visibility hidden) and shows when the scene goes; at no moment are both visible with the banner box on card rows.
   Mourning endings: bệnh (thọ 19), + a second cause. Fold 755x1000 + iPad 1180x820. usage: node dev/test/kit-endcard-ink.js <index.html> [outdir]  Exit 1 on a FAIL. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,SRC,OUT]=process.argv;const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000],[1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R=[];
 for(const [W,H] of SZ){for(const [cause,txt] of [['bệnh','Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 19 tuổi'],['độc','Chén trà có độc, ngươi không qua khỏi']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',ignoreHTTPSErrors:true});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:404,body:''}));/* rv-plr4 r8 (law 11): only the page gets the 20 MB html; every other ctm.test asset 404 — answering each mp3/vendor request with the whole page broke the Playwright pipe once the page passed ~20.6 MB */await ctx.route(/^http:\/\/ctm\.test\/index\.html([?#].*)?$/,r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof over==='function',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true});
  await p.waitForTimeout(3000);await p.addStyleTag({content:'#dawn,[id^=kroul],.kne,#kxcatch{display:none!important}'});
  await p.evaluate(([cause,txt])=>{try{kmReset()}catch(e){}S.age=19;over('Hồng nhan bạc mệnh',txt,cause,false);showModal()},[cause,txt]);
  let worst={both:0,overlap:0,ink:0,cardWhileInk:0};
  for(let i=0;i<40;i++){await p.waitForTimeout(150);const s=await p.evaluate(()=>{const ink=document.querySelector('.kmov.km-inkov:not(.km-out)');const M=document.getElementById('modal');const card=M&&!M.hidden&&getComputedStyle(M).visibility!=='hidden'&&(M.classList.contains('end')||M.classList.contains('kes'));
    const cap=ink&&ink.querySelector('.kmicap');let ov=0;if(ink&&card&&cap){const c=cap.getBoundingClientRect();for(const r of M.querySelectorAll('.dlg .kb .kr, .dlg .kpkb tr, .dlg .kpkb > *')){const q=r.getBoundingClientRect();if(q.width>4&&q.height>4&&c.left<q.right&&c.right>q.left&&c.top<q.bottom&&c.bottom>q.top)ov++}}
    return {ink:!!ink,card:!!card,ov}});if(s.ink)worst.ink++;if(s.ink&&s.card)worst.cardWhileInk++;if(s.ov)worst.overlap+=s.ov}
  if(OUT){fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:`${OUT}/${W}-endcard-${cause}.png`})}
  /* end the scene by tap (the scene ends on tap / its button), then the card must show */
  await p.evaluate(()=>{const e=document.querySelector('.kmov.km-inkov');if(e)e.click()});await p.waitForTimeout(600);await p.evaluate(()=>{const e=document.querySelector('.kmov.km-inkov [data-km-close]');if(e)e.click()});await p.waitForTimeout(2500);
  const fin=await p.evaluate(()=>{const M=document.getElementById('modal');return {ink:!!document.querySelector('.kmov.km-inkov:not(.km-out)'),vis:!!M&&!M.hidden&&getComputedStyle(M).visibility!=='hidden'}});
  const rew=await p.evaluate(()=>{const M=document.getElementById('modal');if(!(M&&!M.hidden&&(M.classList.contains('end')||M.classList.contains('kes'))))return {skip:1};kitReward({kind:'chest',title:'Rương',items:[{n:'Trâm',d:'',img:'',tier:1}],bac:0});return {over:!!document.querySelector('#kmrew,.kmov.km-reward,.kmrew')}});
  R.push({dev:W+'x'+H,cause,'reward over ending':rew.skip?'n/a':rew.over?'SHOWN':'none','ink frames':worst.ink,'card visible while ink':worst.cardWhileInk,'banner on rows':worst.overlap,'after scene: ink gone':!fin.ink,'card shown':fin.vis,FAIL:worst.cardWhileInk>0||worst.overlap>0||fin.ink||!fin.vis||rew.over===true});
  await ctx.close()}}
 await b.close();console.table(R);const bad=R.filter(r=>r.FAIL);console.log('cases',R.length,'FAIL',bad.length);process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
