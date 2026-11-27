/* OB-NGOAICUNG-2: a FULL home life (~20 buổi of real taps), the SAME 8 bottom tabs with the palace names (OD:L2108), Hoàng tự = the empty line,
   Tin báo opened every 5 buổi (k10), every dialog title + speaker listed (k3/k9 palace speakers = 0). Earlier text: FULL walk video of the home road (Fold 755x1000 + iPad 1180x820): head-count groups open, every bottom tab (home names),
   Tin báo, then several buổi of real taps (cards + Sang buổi) so any palace visitor / news would show. usage: node video.js <url> <outdir> [origin=tt] */
const {chromium}=require('playwright');const fs=require('fs');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const [URL,OUT,ORG0]=process.argv.slice(2);const ORG=ORG0||'tt';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const res=[];
 for(const [W,H,touch,tag] of [[755,1000,true,'fold'],[1180,820,false,'ipad']]){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',hasTouch:touch,isMobile:touch,recordVideo:{dir:OUT,size:{width:W,height:H}}});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()});/* reward chest: open + Nhận, as she does */[...document.querySelectorAll('button,[role=button],.krchest,.kr-chest')].filter(x=>x.offsetParent&&/^(Chạm để mở|Nhận)$/.test((x.textContent||'').trim())).forEach(x=>x.click());const ch=[...document.querySelectorAll('*')].find(x=>x.offsetParent&&x.children.length===0&&(x.textContent||'').trim()==='Chạm để mở');if(ch)ch.click()},700)});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3500);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}if(S.origin.k!==o){S.origin=ORIGINS.find(x=>x.k===o);nlCard()}},ORG);await sleep(900);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(1200);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(2500);
  const seen=[];const clear=async()=>{for(let i=0;i<10;i++){const q=await p.evaluate(()=>{const M=document.getElementById('modal');if(!Q.length||!M||M.hidden)return 0;window.__seen=window.__seen||[];{const m=Q[0];window.__seen.push((m.t||'')+' ['+((m.who&&(m.who.rw||m.who.n))||'')+']')}const bs=[...M.querySelectorAll('.opts button')].filter(x=>x.offsetParent&&!x.disabled);if(bs.length){bs[0].click();return 1}closeModal();return 1});if(!q)break;await sleep(1400)}};
  await clear();
  for(const k of ['cn','ct']){await p.evaluate(k=>{const b=document.querySelector(`#kshR [data-kgf="${k}"], #krail [data-rail="kgf-${k}"]`);if(b)b.click()},k);await sleep(2200)}
  await p.evaluate(()=>{if(window.__kgfOpen){window.__kgfOpen=null;try{k3Stage()}catch(e){}}});
  for(const t of ['act','go','rv','rel','kid','inv','art','story','act']){await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab="${t}"]`);if(b)b.click()},t);await sleep(2000)}
  for(let n=0;n<20;n++){if(n&&n%5===0){await p.evaluate(()=>{try{if(typeof kitNoticeOpen==='function')kitNoticeOpen()}catch(e){}});await sleep(2500);await p.keyboard.press('Escape');await sleep(800)}await p.evaluate(()=>{const c=[...document.querySelectorAll('#panel .cards button, #panel .card')].find(x=>x.offsetParent&&!x.disabled);if(c)c.click()});await sleep(1500);await clear();
   await p.evaluate(()=>{try{nextBuoi()}catch(e){}});await sleep(1800);await clear()}
  await p.evaluate(()=>{try{if(typeof kitNoticeOpen==='function')kitNoticeOpen()}catch(e){}});await sleep(3000);
  const info=await p.evaluate(()=>({isKc:isKc(),tabs:[...document.querySelectorAll('#tabs button[data-tab]')].filter(x=>x.offsetParent).map(x=>x.textContent.trim()),seen:window.__seen||[],turn:S.turn,buoi:S.buoi,maid:S.maid?S.maid.name:null,notes:(typeof kitNoticeList==='function'?kitNoticeList():[]).map(x=>String(x.line||'').replace(/<[^>]+>/g,''))}));
  const v=p.video();await c.close();const f=`${OUT}/ngc3-${ORG}-life-${tag}-${W}x${H}.webm`;await v.saveAs(f);res.push({f,info,errs})}
 console.log(JSON.stringify(res,null,1));await b.close()})();
