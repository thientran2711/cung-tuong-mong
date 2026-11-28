/* OB-NGOAICUNG-2 (RV-OB-NGOAICUNG FAIL 1+2 proof): short video per device — three new home lives (tiểu thư tt, thôn nữ cnv, công chúa nc): «Nhận thân phận»
   → each «Tiền truyện» card read on screen → home stage with her tag (Tiểu thư / Thôn nữ / Công chúa) and the same 8 tabs.
   usage: node intro-video.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const [URL,OUT]=process.argv.slice(2);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const res=[];
 for(const [W,H,touch,tag] of [[755,1000,true,'fold'],[1180,820,false,'ipad']]){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',hasTouch:touch,isMobile:touch,recordVideo:{dir:OUT,size:{width:W,height:H}}});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));const info=[];
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  for(const ORG0 of ['tt','tt','tt','cnv','cnv','cnv','nc','nc','nc']){const ORG=ORG0;if(info.some(x=>x.org===ORG&&x.isKc))continue;
   await p.goto(URL);await sleep(2000);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3500);await skip();
   await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
   await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}if(S.origin.k!==o){S.origin=ORIGINS.find(x=>x.k===o);nlCard()}},ORG);await sleep(1200);await skip();
   await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(1200);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
   await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(2500);
   /* read every dialog in turn, as she does: Tiền truyện cards first */
   const seen=[];for(let i=0,j=0;i<200&&j<10;i++){await sleep(i?0:1500);/* a reward chest (#kmrew) holds the dialogs: open it and take it, as she does */
    if(await p.evaluate(()=>{const R=document.getElementById('kmrew');if(!R)return 0;const ch=[...R.querySelectorAll('*')].find(x=>x.offsetParent&&!x.children.length&&/Chạm để mở/.test(x.textContent||''));if(ch){ch.click();return 1}
      const cl=[...document.querySelectorAll('[data-km-close]')].find(x=>x.offsetParent);if(cl){cl.click();return 1}const bt=[...R.querySelectorAll('button')].find(x=>x.offsetParent&&!x.disabled&&/Nhận|Cất|Đóng|Xong/.test(x.textContent||''));if(bt){bt.click();return 1}return 0})){await sleep(1500);continue}j++;
    const s=await p.evaluate(()=>{const M=document.getElementById('modal');if(document.getElementById('kmrew'))return'WAIT';if(Q.length&&M&&M.hidden){try{showModal()}catch(e){}}if(!Q.length||!M||M.hidden)return null;const m=Q[0];return m.t+' ['+((m.who&&m.who.rw)||'')+']'});if(s==='WAIT'){await sleep(1200);continue}if(!s)break;seen.push(s);await sleep(2600);
    await p.evaluate(()=>{const M=document.getElementById('modal');const bs=[...M.querySelectorAll('.opts button')].filter(x=>x.offsetParent&&!x.disabled);if(bs.length)bs[0].click();else closeModal()});await sleep(1200)}
   await sleep(2500);const st=await p.evaluate(()=>({org:S.origin.k,isKc:isKc(),me:pMe().rw,tabs:[...document.querySelectorAll('#tabs button[data-tab]')].filter(x=>x.offsetParent).map(x=>x.textContent.trim()).join('|')}));
   await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="kid"]');if(b)b.click()});await sleep(2200);await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="act"]');if(b)b.click()});await sleep(1500);
   info.push(Object.assign(st,{seen}))}
  const v=p.video();await c.close();const f=`${OUT}/ngc4-intro-${tag}-${W}x${H}.webm`;await v.saveAs(f);res.push({f,info,errs})}
 console.log(JSON.stringify(res,null,1));await b.close()})();
