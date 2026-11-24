/* review/titles2 UI check (law 12: Fold 755x1000 + iPad 1180x820, @2): the Danh hiệu view with the new groups (Danh tiếng / Chính truyện / Phụ tuyến, two-tone
   plates KIT §82.1), a reputation info card, the new-reputation notice, the consort card line. usage: node dev/test/titles2-ui.js <page URL> <outdir>
   FIX r1 (E56r FAIL 6): the life cover (#klife, jload lifeGate) is switched off for the test (KLIFE.off test hook) and removed, and EVERY step checks that the
   kit dialog is TOPMOST (document.elementFromPoint at the dialog centre and at its header must be inside the dialog — never the #klife / #curtain cover).
   Also shows a per-chapter title (FIX r1: «Chính truyện» rows + a chapter-title notice).
   Fails on: page errors, the dialog not topmost, horizontal overflow in the dialog, a plate wider than its row, missing group. Shots go to <outdir> (outside git). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const F=[],WN=[];
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();const E=[];p.on('pageerror',e=>E.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof rpSync==='function'&&typeof start==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();if(window.KLIFE){KLIFE.off=true;KLIFE.go=true}window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});
  await sleep(2500);
  const clean=()=>p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;if(window.KLIFE){KLIFE.go=true}const lc=document.getElementById('klife');if(lc)lc.remove();const m=document.getElementById('modal');if(m)m.hidden=true});
  await clean();
  await p.evaluate(()=>{const a=['']; S.dh=S.dh||{};Object.assign(S.dh,{rp_hoathuy:{n:1,i:0,at:a},rp_quocsac:{n:1,i:0,at:a},rp_hamoan:{n:1,i:0,at:a},cp_tt_co_5_t:{n:1,i:0,at:a},cp_tt_co_6_a:{n:1,i:0,at:a},cp_tt_co_4_t:{n:1,i:0,at:a},ca_s_hoa_t:{n:1,i:0,at:a},vn_rv_con_om_t:{n:1,i:0,at:a},mh_doc_lo:{n:1,i:0,at:a},mh_don_thoat:{n:1,i:0,at:a},lc_cuuhoang:{n:1,i:0,at:a},lc_cuuhoang_a:{n:1,i:0,at:a}});dhSync(S,true);dhPanel()});
  await sleep(1200);
  const chk=async tag=>{const r=await p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden]) .dlg')||document.querySelector('#modal:not([hidden])');if(!m)return {none:1};
   const q=m.getBoundingClientRect();const pts=[[q.left+q.width/2,q.top+q.height/2],[q.left+q.width/2,q.top+Math.min(40,q.height/4)]];
   const top=pts.map(([x,y])=>{const e=document.elementFromPoint(x,y);return e&&(m.contains(e)||e===m)?'':(e?(e.closest('#klife')?'#klife':e.closest('#curtain')?'#curtain':(e.id||e.className||e.tagName)):'nothing')}).filter(Boolean);
   const over=m.scrollWidth>m.clientWidth+2;const vis=e=>e.getClientRects().length&&getComputedStyle(e.closest('.kt3')||e).display!=='none';
   const bad=[...m.querySelectorAll('.kdh')].filter(e=>vis(e)&&!e.closest('.kdhcap')).filter(e=>{const r=e.getBoundingClientRect();return r.right>q.right+2||r.left<q.left-2}).length;
   const cap=[...m.querySelectorAll('.kdhcap')].filter(c=>{const pic=c.parentElement.getBoundingClientRect(),k=c.querySelector('.kdh');if(!k)return false;const kr=k.getBoundingClientRect(),bb=k.querySelector('b');return kr.width>pic.width-4||kr.left<pic.left-1||kr.right>pic.right+1||(bb&&bb.scrollWidth>k.clientWidth+1)||k.scrollWidth>k.clientWidth+1}).length;return {over,bad,cap,top,txt:m.textContent}});
   if(r.none)F.push(`${tag}: no dialog`);else{if(r.top.length)F.push(`${tag}: the dialog is NOT topmost (covered by ${r.top.join(', ')})`);if(r.over)F.push(`${tag}: horizontal overflow`);if(r.bad)F.push(`${tag}: ${r.bad} plate(s) outside the dialog`);if(r.cap)WN.push(`${tag}: picture caption plate wider than the picture (KIT REQUEST K-DH-CAPFIT, kitDhCap)`)}return r};
  const r1=await chk(`${W} panel`);for(const g of ['Danh tiếng','Chính truyện','Phụ tuyến'])if(r1.txt&&!r1.txt.includes(g))F.push(`${W} panel: no group ${g}`);
  await p.screenshot({path:`${OUT}/t2-panel-top-${W}.png`});
  await p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden])');const h=[...m.querySelectorAll('*')].find(e=>/^Danh tiếng/i.test((e.textContent||'').trim())&&e.children.length===0);if(h)h.scrollIntoView({block:'start'})});await sleep(500);
  await chk(`${W} panel (Danh tiếng)`);await p.screenshot({path:`${OUT}/t2-panel-dt-${W}.png`});
  await p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden])');const h=[...m.querySelectorAll('*')].find(e=>/^Chính truyện/i.test((e.textContent||'').trim())&&e.children.length===0);if(h)h.scrollIntoView({block:'start'})});await sleep(500);
  const r2=await chk(`${W} panel (Chính truyện)`);if(r2.txt&&!/Giữ nghĩa môn sinh/.test(r2.txt))F.push(`${W} panel: the chapter title «Giữ nghĩa môn sinh» is not listed`);await p.screenshot({path:`${OUT}/t2-panel-cp-${W}.png`});
  await clean();await p.evaluate(()=>kitTitleOpen('dh-rp_hoathuy@me'));await sleep(900);await chk(`${W} info card`);await p.screenshot({path:`${OUT}/t2-card-${W}.png`});
  await clean();await p.evaluate(()=>{delete S.dh.rp_hien;S.duc=95;S.danh=95;S.rep=S.rep||{};S.rep.d={};rpSync(S);showModal()});await sleep(1500);await chk(`${W} notice`);await p.screenshot({path:`${OUT}/t2-notice-${W}.png`});
  await clean();await p.evaluate(()=>{delete S.dh.cp_tt_co_7_t;cpGive(S,'cp_tt_co_7_t');showModal()});await sleep(1500);const r3=await chk(`${W} chapter notice`);if(r3.txt&&!/Gỡ lời đàn hặc/.test(r3.txt))F.push(`${W} chapter notice: no «Gỡ lời đàn hặc»`);await p.screenshot({path:`${OUT}/t2-notice-cp-${W}.png`});
  if(E.length)F.push(`${W} page errors: ${E.slice(0,2).join(' | ')}`);await ctx.close()}
 console.log(WN.map(x=>'WARN '+x).join('\n'));console.log(F.length?F.map(x=>'FAIL '+x).join('\n'):'');console.log(`TITLES2-UI ${F.length?'FAIL':'PASS'} · ${F.length} issue(s)`);await b.close();process.exit(F.length?1:0)})();
