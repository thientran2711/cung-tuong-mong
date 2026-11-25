/* review/ob-ngoaicung: owner pair of the home stage (Khuê phòng) with the «Người hầu» list open — Fold 755x1000@2 + iPad 1180x820@2.
   usage: node dev/test/ob-ngoaicung/shots.js <site url> <outdir> [origin=tt] [fold=cn|ct] */
const {chromium}=require('playwright');const fs=require('fs');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const [URL,OUT,ORG0,FOLD0]=process.argv.slice(2);const ORG=ORG0||'tt',FOLD=FOLD0||'cn';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const res=[];
 for(const [W,H,touch] of [[755,1000,true],[1180,820,false]]){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block',hasTouch:touch,isMobile:touch,reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()})},300)});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3500);
  const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  await skip();await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
  await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}if(S.origin.k!==o){S.origin=ORIGINS.find(x=>x.k===o);nlCard()}},ORG);await sleep(700);await skip();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(800);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1500);
  await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(0);else closeModal()}tab='act';render()});await sleep(1500);
  await p.evaluate(()=>{for(let i=0;i<12&&Q.length;i++){closeModal()}render()});await sleep(800);
  await p.evaluate(k=>{const b=document.querySelector(`#kshR [data-kgf="${k}"], #krail [data-rail="kgf-${k}"]`);if(b)b.click();else{window.__kgfOpen=k;try{k3Stage()}catch(e){}}},FOLD);await sleep(1500);
  /* the «tạm» stand-in chip only shows on a stand-in room picture; when this life's room has its exact picture, the kit chip is put on the stage the same way
     jres does (kitTam(true) appended to #stage) so the corner rule (kitTamFit) is seen on the owner's screen */
  await p.evaluate(()=>{const st=document.getElementById('stage');if(st&&!st.querySelector('.ktam')){st.insertAdjacentHTML('beforeend',kitTam(true));st.lastElementChild.id='restam'}kitTamFit(st)});await sleep(400);
  const info=await p.evaluate(()=>{const t=document.querySelector('#stage .ktam');const h=document.querySelector('#sc-t h2');const r=t&&t.getBoundingClientRect(),q=h&&h.getBoundingClientRect();
   return{tam:!!t,tamCls:t?t.className:'',overlap:!!(r&&q&&r.left<q.right&&r.right>q.left&&r.top<q.bottom&&r.bottom>q.top),title:h?h.innerText:'',btns:[...document.querySelectorAll('.kgfbtn,#krail [data-rail^=kgf-]')].filter(x=>x.offsetParent).map(x=>x.innerText.replace(/\s+/g,' '))}});
  const f=`${OUT}/ngc-${ORG}-${FOLD}-${W}x${H}.jpg`;await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await sleep(300);await p.screenshot({path:f,type:'jpeg',quality:82});res.push({f,info,errs});await c.close()}
 console.log(JSON.stringify(res,null,1));await b.close()})();
