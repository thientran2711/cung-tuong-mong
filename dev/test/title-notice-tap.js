/* E-TITLES3 (Foreman E add to F1, runner E-S5 on LIVE: «Danh hiệu mới» «Để sau» did nothing after 3 real taps). Law 11 family = every title panel
   (kitPanel spec.dh): KIT §101 says a Danh hiệu panel is NOT a hand (kitHand Bàn bài), so ONE real tap on any of its option cards runs it.
   Cases (Fold 755x1000 + iPad 1180x820): dhNotice «Danh hiệu mới» → «Để sau» closes it; dhNotice → «Đeo ngay» wears it; rpNotice «Tiếng thơm» (no hand);
   dhNotice → «Đeo ngay» → the wear panel «Đeo «…»» shows (it used to wait in Q behind a hidden modal) → one tap on a bonus wears it. Real mouse taps at the card centre. Exit 1 on any failure. usage: node dev/test/title-notice-tap.js <page URL> */
const {chromium}=require('playwright');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const F=[],OK=[];const ck=(c,m)=>(c?OK:F).push(m);
for(const [nm,w,h] of [['fold',755,1000],['ipad',1180,820]]){const ctx=await b.newContext({viewport:{width:w,height:h},serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof dhNotice==='function');await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{if(window.KLIFE)KLIFE.off=1}catch(e){}window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;deal();render()});
 await sleep(1500);
 const open=async f=>{await p.evaluate(f);await sleep(1200)};
 const tap=async txt=>{const B=p.locator('#modal:not([hidden]) button',{hasText:txt}).first();if(!(await B.count()))return 'no button «'+txt+'»';const bb=await B.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await sleep(700);return ''};
 const st=()=>p.evaluate(()=>({Q:Q.map(m=>m.t).join('|'),hidden:document.getElementById('modal').hidden,hand:!!document.querySelector('#modal .opts.khand'),worn:S.titleWorn}));
 const clean=()=>p.evaluate(()=>{for(const id of ['kdaytc','klife','curtain'])try{const e=document.getElementById(id);if(e)e.remove()}catch(e){}try{kmReset()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;S.dh=S.dh||{};S.dh.a_doc={n:20,i:0,at:['']};S.titleWorn=null});
 await clean();await open(()=>{dhNotice('a_doc');showModal()});let s0=await st();let e=await tap('Để sau');let s1=await st();
 ck(!e&&!s0.hand&&s1.hidden,`${nm} «Danh hiệu mới»: no hand, ONE tap on «Để sau» closes it ${e} ${JSON.stringify([s0,s1])}`);
 await clean();await open(()=>{dhNotice('a_doc');showModal()});e=await tap('Đeo ngay');await sleep(600);const s2=await st();ck(!e&&!s2.hidden&&/^Đeo «/.test(s2.Q)&&!s2.hand,`${nm} «Đeo ngay»: one tap opens the wear panel «Đeo «…»», no hand (${JSON.stringify(s2)} ${e})`);
 {const B=p.locator('#modal:not([hidden]) .opts button').first();const bb=await B.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2);await sleep(800);const s4=await st();ck(s4.worn==='dh-a_doc',`${nm} wear panel: one tap on a bonus wears the title (${JSON.stringify(s4)})`)}
 await p.evaluate(()=>{document.getElementById('modal').hidden=true;Q.length=0});
 await clean();await open(()=>{for(const v of rivals)if(v)v.sac=Math.min(v.sac||0,50);S.rep={t0:-1e9};S.sac=90;S.tai=88;S.dhNB=null;delete S.dhPend;rpSync(S);if(document.getElementById('modal').hidden)showModal()});
 const s3=await st();const t3=await p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden])');return m?m.innerText.replace(/\s+/g,' ').slice(0,60):''});ck(/Tiếng thơm/.test(t3)&&!s3.hand,`${nm} «Tiếng thơm» panel shows, no hand («${t3}»)`);
 ck(!errs.length,`${nm} page errors 0 ${errs.join(' | ')}`);await ctx.close()}
console.log(OK.map(x=>'ok   '+x).join('\n'));console.log(F.map(x=>'FAIL '+x).join('\n'));console.log(`TITLE-NOTICE-TAP ${F.length?'FAIL':'PASS'} · ok ${OK.length} · fail ${F.length}`);await b.close();process.exit(F.length?1:0)})();
