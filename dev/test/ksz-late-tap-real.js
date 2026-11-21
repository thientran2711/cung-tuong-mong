/* ksz-late-tap-real (review/ksz-lost-tap, owner LIVE fault 21/11): the REAL Hồi kết dialogs (geAsk, 4 steps) with every picture delayed. Measured on LIVE: when the late picture lands, kszLiveRepick3 re-lays the frame
   and the option cards CHANGE SIZE / MOVE (Fold: card 1 161 → 140 px tall, cards 2-3 slide up 21 px) under a finger that was already aimed at the old place.
   Test: for each card, aim at the card CENTRE as she saw it before the re-lay, wait until the cards actually move, then put the finger down at the OLD centre (≤ 80 ms after the move, a human's best reaction)
   with a real touch (hold 120 ms). PASS = the click lands on the card she aimed at (index in .opts), FAIL = another card, the gap or nothing.
   usage: node dev/test/ksz-late-tap-real.js <url|-> <outdir> [WxH@dpr,...]  (IMG_DELAY ms, default 900)  Exit 1 on any miss. */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const URL=process.argv[2]&&process.argv[2]!=='-'?process.argv[2]:'file://'+path.resolve(__dirname,'../../index.html');const OUT=process.argv[3]||'/tmp/ksz-late-tap-real';
const SIZES=(process.argv[4]||'755x1000@2,1180x820@2').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return{w:+m[1],h:+m[2],d:+m[3]}});const DEL=+process.env.IMG_DELAY||900;
fs.mkdirSync(OUT,{recursive:true});let bad=0,n=0;
(async()=>{const b=await chromium.launch();
 for(const z of SIZES)for(const aim of [0,1,2]){const tag=`${z.w}x${z.h}`;const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block',hasTouch:true,isMobile:true});const p=await ctx.newPage();p.setDefaultTimeout(0);
  let delay=0;await p.route(/\.(webp|png|jpg)(\?.*)?$/,async r=>{if(delay)await new Promise(x=>setTimeout(x,delay));try{const rs=await r.fetch();await r.fulfill({response:rs,headers:{...rs.headers(),'cache-control':'no-store'}})}catch(e){try{await r.continue()}catch(e2){}}});/* no-store: the game's own earlier loads of the same picture must not satisfy this open from memory */  await p.goto(URL+'?khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(async()=>{localStorage.removeItem('ctm-ge');const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
   const s=geS();s.pull=[2,9,0,1];s.st=['o','o','x','o'];s.cx[2]=8;S.duc=62;S.sung=64;S.st.ch.all=1;S.st.f14.ends[11]='win';render();await new Promise(r=>setTimeout(r,2500));try{kmReset()}catch(e){}Q.length=0;geAsk();showModal()});
  const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
   /* every case re-opens the same Hồi kết dialog (step 1) with its pictures not cached: unique ?v query is not possible for game art, so the page is reloaded per case via a fresh context cache */
   await p.waitForTimeout(300);
   await p.evaluate(()=>{window.__hit=undefined;if(!window.__hl){window.__hl=1;document.addEventListener('click',e=>{const bt=e.target.closest&&e.target.closest('#modal .opts>button');window.__hit=bt?[...bt.parentNode.children].filter(x=>x.tagName==='BUTTON').indexOf(bt):-1;e.stopPropagation()/* the test only records WHICH card was hit: the dialog must not advance, so an attempt can repeat */},true)}});
   await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(800);
   /* the intro «Sửa soạn nhập cung» gate is gone: open the Hồi kết dialog again with its pictures LATE (fresh context: not cached) */
   delay=DEL;await p.evaluate(()=>{window.__hit=undefined;const M=document.getElementById('modal');M.hidden=true;Q.length=0;S.ge=null;try{geAsk()}catch(e){}showModal()});
   /* wait for the first visible frame, record card centres */
   await p.waitForFunction(()=>{const M=document.getElementById('modal');return M&&!M.hidden&&!M.classList.contains('klifewait')&&document.querySelectorAll('#modal .dlg .opts>button').length>=3},null,{timeout:60000}).catch(()=>{});
   const CEN=()=>p.evaluate(()=>[...document.querySelectorAll('#modal .dlg .opts>button')].map(b=>{const r=b.getBoundingClientRect();return[r.left+r.width/2,r.top+Math.min(14,r.height*.15),r.height,r.top+r.height/2]}));/* finger on the TOP edge strip of the card (a thumb never hits the exact centre) */
   if((await CEN()).length<=aim){await ctx.close();continue}
   /* the late picture's re-lay: measured on LIVE it moves / resizes the cards by ~21 px (shift2 probe: card 1 161 → 140 px tall). Run the REAL pipeline (kszLiveRepick3 → kszLivePick3 → kszLiveLay3) and make its
      result move the option block 24 px (toggle 24 / 0 px so a case can repeat), the same kind of shift, so the case is deterministic (a natural late load cannot be timed to the finger). */
   await p.evaluate(()=>{window.__mt=0;const f=kszLivePick3_0;kszLivePick3_0=function(d){const r=f.apply(this,arguments);const o=d.querySelector('.opts');if(o)o.style.marginTop=window.__mt?'24px':'0px';return r};
    document.addEventListener('pointerdown',e=>{const el=document.elementFromPoint(e.clientX,e.clientY);window.__dbg=[(typeof kszRemap3!=='undefined'&&kszRemap3?'R':'noR'),Math.round(performance.now()-(typeof kszStale3!=='undefined'&&kszStale3?kszStale3.t:window.__rt)),e.clientX|0,e.clientY|0,(el&&el.className||'').toString().slice(0,30)]},true)});
   let res=null;
   /* the finger goes down ~40-120 ms after the re-lay (a human's best reaction to a card that just moved). A slow test machine can add >250 ms between the re-lay and the touch: that attempt is VOID (not counted) and repeats. */
   for(let at=0;at<6&&!res;at++){const C0=await CEN();await p.evaluate(async()=>{window.__hit=undefined;window.__dbg=null;window.__mt=window.__mt?0:1;kszLiveRepick3(document.querySelector('#modal .dlg.kszlive'));await new Promise(r=>setTimeout(r,45));window.__rt=performance.now()-45+30/* the re-lay ran at ~30 ms */});
    const [x,y]=C0[aim];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await p.waitForTimeout(120);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(400);
    const hit=await p.evaluate(()=>window.__hit),dbg=await p.evaluate(()=>window.__dbg);const gap=dbg?dbg[1]:-1;if(process.env.DBG)console.log('  attempt',at,JSON.stringify(dbg),'hit',hit);
    if(gap>=0&&gap<=250)res={hit,gap}}
   if(!res){bad++;console.log(`${tag} aim card ${aim+1}: VOID (test machine too slow to put the finger down within 250 ms of the re-lay) FAIL`);await ctx.close();continue}
   n++;const hit=res.hit,ok=hit===aim;if(!ok){bad++;await p.screenshot({path:`${OUT}/${tag}-aim${aim}.png`})}
   console.log(`${tag} aim card ${aim+1}/4 (finger down ${res.gap} ms after the cards moved) -> click landed on ${hit===undefined?'nothing':hit<0?'gap/other':'card '+(hit+1)} ${ok?'ok':'FAIL'}`)
  await ctx.close()}
 await b.close();console.log(`TOTAL aimed ${n}, missed ${bad}`);process.exit(bad?1:0)})();
