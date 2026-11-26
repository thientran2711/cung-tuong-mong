/* OB-NGOAICUNG-3b r3 (MAIN brief): can a REAL player finish the tiểu thư «Rương đồ khuê các» reward chest (#kmrew) and press «Nhận»?
   New tiểu thư life → «Nhận thân phận» (setup by script, as scan.js) → from the moment the chest is up ONLY real taps at screen points
   (page.mouse / touchscreen at the centre of what she sees; the point must hit that element: document.elementFromPoint) — no element.click().
   Per device (Fold 755x1000 touch, iPad 1180x820): «Chạm để mở» tap → items reveal → «Nhận» on screen + hit-testable → tap → chest gone →
   the «Tiền truyện» cards follow. usage: node chest-tap.js <url> [shotdir]  · exit 1 when «Nhận» cannot be reached. */
const {chromium}=require('playwright');const fs=require('fs');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const [URL,SH]=process.argv.slice(2);if(SH)fs.mkdirSync(SH,{recursive:true});
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H,touch,tag] of [[755,1000,true,'fold'],[1180,820,false,'ipad']]){let done=null;
  for(let tr=0;tr<4&&!done;tr++){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block',hasTouch:touch,isMobile:touch});
   await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
   const skip=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
   await p.goto(URL);await sleep(2000);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3500);await skip();
   await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skip();
   await p.evaluate(o=>{for(let i=0;i<200&&S.origin.k!==o;i++){try{store.set(NL_KEY,null)}catch(e){}start()}if(S.origin.k!==o){S.origin=ORIGINS.find(x=>x.k===o);nlCard()}},'tt');await sleep(1200);await skip();
   await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(1200);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
   await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});
   let up=false;for(let i=0;i<40&&!up;i++){await sleep(500);up=await p.evaluate(()=>!!document.getElementById('kmrew'))}
   const kc=await p.evaluate(()=>isKc());if(!up||!kc){console.log(tag,'try',tr,'no chest / not at home (start flake) isKc',kc,'chest',up);await c.close();continue}
   const tap=async(x,y)=>{if(touch)await p.touchscreen.tap(x,y);else await p.mouse.click(x,y)};
   /* where a real finger lands: the centre of a visible element, and that point must hit it */
   const spot=sel=>p.evaluate(s=>{const R=document.getElementById('kmrew');if(!R)return null;const e=[...R.querySelectorAll(s)].find(x=>x.offsetParent||x.getClientRects().length);if(!e)return{miss:'none'};
     const r=e.getBoundingClientRect();const x=r.left+r.width/2,y=r.top+r.height/2;const vis=r.width>0&&r.height>0&&x>=0&&y>=0&&x<=innerWidth&&y<=innerHeight;
     const h=document.elementFromPoint(x,y);return{x,y,vis,hit:!!(h&&(h===e||e.contains(h))),hitWhat:h?(h.className||h.tagName):'',r:[r.left|0,r.top|0,r.width|0,r.height|0]}},sel);
   const log=[];const t0=Date.now();
   if(SH)await p.screenshot({path:`${SH}/chest-${tag}-0-closed.jpg`,type:'jpeg',quality:70});
   /* 0. the boot / art loading cover (#modal.kload «Sửa soạn nhập cung») may still sit over the chest: she taps «Vào cung ngay» on it (a real tap) */
   for(let i=0;i<6;i++){const k=await p.evaluate(()=>{const M=document.querySelector('#modal.kload');if(!M||M.hidden||!M.offsetParent)return null;const b=[...M.querySelectorAll('button')].find(x=>x.offsetParent);if(!b)return{wait:1};const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,t:b.textContent.trim()}});
    if(!k)break;log.push('cover up'+(k.t?' → tap «'+k.t+'»':''));if(k.x)await tap(k.x,k.y);await sleep(1500)}
   /* 1. «Chạm để mở»: she taps the chest */
   const o=await spot('.kmtap');log.push('open-hint '+JSON.stringify(o));const box=await spot('.kmbox');await tap(box&&box.vis?box.x:W/2,box&&box.vis?box.y:H/2);await sleep(400);
   /* 2. wait for «Nhận» to come on screen (no tap: does it come by itself?); then a second run would tap to hurry — we note the time */
   let n=null;for(let i=0;i<20;i++){n=await spot('.kmtake');if(n&&n.vis&&n.hit)break;await sleep(500)}
   log.push('take after '+((Date.now()-t0)/1000).toFixed(1)+'s '+JSON.stringify(n));
   if(SH)await p.screenshot({path:`${SH}/chest-${tag}-1-open.jpg`,type:'jpeg',quality:70});
   for(let h=0;h<3&&!(n&&n.vis&&n.hit);h++){/* a real tap on the chest hurries the reveal (step 1 → fin) */const bx=await spot('.kmbox');await tap(bx&&bx.vis?bx.x:W/2,bx&&bx.vis?bx.y:H/2);await sleep(1500);n=await spot('.kmtake');log.push('hurry tap '+h+' '+JSON.stringify(n))}
   let ok=false;if(n&&n.vis&&n.hit){await tap(n.x,n.y);await sleep(1500);ok=await p.evaluate(()=>!document.getElementById('kmrew'))}
   const next=await p.evaluate(()=>{const M=document.getElementById('modal');return Q.length?Q.map(m=>m.t).slice(0,4).join(' / ')+(M&&!M.hidden?' (shown)':''):''});
   if(SH)await p.screenshot({path:`${SH}/chest-${tag}-2-after.jpg`,type:'jpeg',quality:70});
   done={tag,ok,next,errs:errs.length,log};await c.close()}
  if(!done){console.log(tag,'NO HOME LIFE in 4 tries');bad++;continue}
  console.log(tag,done.ok?'NHẬN REACHED + chest closed':'NHẬN NOT REACHABLE','| next:',done.next,'| page errors',done.errs);done.log.forEach(l=>console.log('  ',l));if(!done.ok||done.errs)bad++}
 await b.close();console.log(bad?'CHEST FAIL':'CHEST PASS');process.exit(bad?1:0)})();
