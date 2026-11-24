/* odds-cap r3 shots: Fold 755x1000@2 + iPad 1180x820@2 — (1) the Thú tội deck card (j22: death risk in BẠI only, "có thể bị ban chết"),
   (2) a decision dialog (j95 caught-in-the-act options: "Giữ làm con bài khống chế" / "Giả như không thấy" carry NO ladder word, the
   accuse options keep word()). Prints the card / option texts, page errors and horizontal overflow. Shots go to <outdir> (outside git).
   usage: node dev/test/odds-cap-shots.js <baseURL> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function skipLoader(p){for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return 'skip'}
  return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s==='ok')return;await sleep(500)}}
(async()=>{const b=await chromium.launch();
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});await skipLoader(p);await sleep(1500);
  await p.evaluate(()=>{try{kitReward=function(){}}catch(e){}window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await sleep(1500);
const clearAll=async()=>{for(let i=0,quiet=0;i<30&&quiet<3;i++){const n=await p.evaluate(()=>{let h=0;const md=document.getElementById('modal');Q.length=0;if(md&&!md.hidden){md.hidden=true;h++}
   for(const x of [...document.querySelectorAll('.kmhint')].filter(x=>x.offsetParent)){(x.parentElement||x).click();h++}
   for(const x of document.querySelectorAll('body *'))if(x.children.length===0&&x.offsetParent&&/^Chạm để (mở|bỏ qua)$/.test((x.textContent||'').trim())){(x.closest('[role=dialog]')||x.parentElement||x).click();h++}
   for(const x of [...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^(Ta biết rồi|Nhận|Cất vào rương|Đóng|Tiếp theo)$/.test(x.textContent.trim()))){x.click();h++}
   const ov=document.getElementById('ov');if(ov&&!ov.hidden){const bs=ov.querySelectorAll('button');if(bs.length){bs[bs.length-1].click();h++}}return h}).catch(()=>0);quiet=n?0:quiet+1;await sleep(900)}};
  await clearAll();
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.preg=1;S.hidden=true;S.pregMismatch=true;S.pregWk=wk();S.trueFather=null;S.buoi=1;used=0;S.suc=Math.max(S.suc,80);deal();render()});
  await clearAll();await p.evaluate(()=>{tab='act';render()});await sleep(1500);await clearAll();await p.evaluate(()=>{tab='act';render()});await sleep(1200);if(W<1100){await p.locator('[data-tab="act"]:visible').first().click().catch(()=>{});await sleep(1500)}
  const cards=await p.$$('.kcard,button.ka');let card=null;for(const c of cards){if(/Thú tội với Hoàng thượng/.test(await c.textContent())&&await c.isVisible()){card=c;break}}
  if(card){await card.scrollIntoViewIfNeeded();await sleep(400);console.log(`[${W}] Thú tội card:\n`+(await card.innerText()).replace(/\n+/g,' | '));await card.screenshot({path:`${OUT}/thu-toi-${W}x${H}.png`,animations:'disabled'})}
  else console.log(`[${W}] Thú tội card NOT FOUND`);
  for(const c of await p.$$('.kcard,button.ka')){if(/Uống thuốc phá thai/.test(await c.textContent())&&await c.isVisible()){await c.scrollIntoViewIfNeeded();console.log(`[${W}] phá thai card:\n`+(await c.innerText()).replace(/\n+/g,' | '));await c.screenshot({path:`${OUT}/pha-thai-${W}x${H}.png`,animations:'disabled'});break}}
  await p.screenshot({path:`${OUT}/act-${W}x${H}.png`,animations:'disabled'});
  await clearAll();await p.evaluate(()=>{const v=liveRivals(true)[0];Q.length=0;Q.push({t:"Bắt gặp",who:pv(v),h:`<p>Ở ngự hoa viên, ngươi thấy rõ ${v.name} hẹn hò.</p>`,opts:j95catchOpts(v,null,{kind:"tryst"},"rev")});showModal()});await sleep(1200);for(let i=0;i<4;i++){await p.evaluate(()=>{for(const x of [...document.querySelectorAll('.kmhint')].filter(x=>x.offsetParent))(x.parentElement||x).click();for(const x of [...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^Tiếp theo$/.test(x.textContent.trim())))x.click()});await sleep(700)}
  const opts=await p.evaluate(()=>[...document.querySelectorAll('#modal button')].filter(e=>e.offsetParent).map(e=>e.innerText.replace(/\s*\n+\s*/g,' | ')));
  console.log(`[${W}] decision dialog options:\n  `+opts.join('\n  '));
  await p.screenshot({path:`${OUT}/decision-${W}x${H}.png`,animations:'disabled'});
  const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);console.log(`[${W}] page errors ${errs.length}${errs.length?': '+errs.slice(0,3).join(' / '):''} · horizontal overflow ${ov}`);
  await ctx.close()}
 await b.close()})();
