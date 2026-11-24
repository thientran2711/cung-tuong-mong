/* ksz-late-tap (review/ksz-lost-tap, owner LIVE fault 21/11): a tap made right after a kit dialog opens must never be lost when a picture of the frame loads LATE
   (kszLiveRepick3 re-lays the live frame: figure + option block are moved/resized under the finger). Law 11 scan: every kit dialog kind x every device x early tap times.
   Pictures are delayed (route) so the late load lands INSIDE the finger-down window. A real finger = touchStart, HOLD ms, touchEnd (CDP), not an instant p.tap.
   usage: node dev/test/ksz-late-tap.js <url|-> <outdir> [WxH@dpr,...]   Exit 1 when any tap is lost. Prints a table (kind | device | taps landed / taps tried). */
const path=require('path');const fs=require('fs');const {chromium}=require('playwright');
const URL=process.argv[2]&&process.argv[2]!=='-'?process.argv[2]:'file://'+path.resolve(__dirname,'../../index.html');const OUT=process.argv[3]||'/tmp/ksz-late-tap';
const SIZES=(process.argv[4]||'755x1000@2,1180x820@2').split(',').map(s=>{const m=s.match(/(\d+)x(\d+)@(\d+)/);return{w:+m[1],h:+m[2],d:+m[3]}});
const IMG_DELAY=+process.env.IMG_DELAY||700, HOLD=+process.env.HOLD||150, DOWNS=(process.env.DOWNS||'450,550,600,650,700,750').split(',').map(Number);
const KINDS=[{kind:'choice',opts:3},{kind:'choice',opts:2,who:1},{kind:'news',opts:0},{kind:'intel',opts:0},{kind:'result',opts:0},{kind:'rule',opts:0},{kind:'notice',opts:0},{kind:'reward',opts:0},{kind:'night',opts:2},{kind:'end',opts:0},{kind:'week',opts:0},{kind:'evidence',opts:0}];
fs.mkdirSync(OUT,{recursive:true});let lost=0,tried=0;const rows=[];
(async()=>{const b=await chromium.launch();
 for(const z of SIZES){const tag=`${z.w}x${z.h}`;const ctx=await b.newContext({viewport:{width:z.w,height:z.h},deviceScaleFactor:z.d,serviceWorkers:'block',hasTouch:true,isMobile:true});const p=await ctx.newPage();p.setDefaultTimeout(0);
  let delay=0;await p.route(/\.(webp|png|jpg|jpeg)(\?.*)?$/,async r=>{if(delay&&/late=/.test(r.request().url())){await new Promise(x=>setTimeout(x,delay))}try{await r.continue()}catch(e){}});
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(()=>{try{kitReward=()=>{}}catch(e){}const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!isSrv())break}window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.th=Math.max(S.th||0,40);S.bac=500;render()});await p.waitForTimeout(800);await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on)&&!document.querySelector('#klife:not([hidden])'),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(1500);
  const cdp=await ctx.newCDPSession(p);
  for(const K of KINDS){const name=K.kind+(K.opts?`/${K.opts}opt`:'/ok')+(K.who?'/who':'');let ok=0,n=0,info='';
   for(const dn of DOWNS){
    delay=0;await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;window.__tap=0});await p.waitForTimeout(250);
    delay=IMG_DELAY;/* a picture NOT in the browser cache: unique query so it is requested again, late */
    const r=await p.evaluate(async([K,dn])=>{const u=(window.__u=(window.__u||0)+1);const pic=(Object.keys(window).includes('KIT_SIZE'),`img/ev-fest-qingming.webp?late=${u}`);
     const msg={t:K.kind==='news'?'Tin trong cung':K.kind==='night'?'Đêm nay':'Có người tìm đến',h:'<p>Có người tìm đến cung nàng, dáng vẻ ngập ngừng như có điều muốn nói.</p>',kit:{kind:K.kind,pic:pic}};
     if(K.kind==='end'||K.kind==='night')msg.cls=K.kind;
     if(K.opts)msg.opts=Array.from({length:K.opts},(_,i)=>({n:'Lựa chọn '+(i+1),fx:{},x:'tốn: 1 khắc · thành: cùng nhau trải qua khắc này',go:()=>{window.__tap++}}));else msg.ok=()=>{window.__tap++};
     Q.length=0;Q.push(msg);const t0=performance.now();showModal();return{t0:Date.now()}},[K,dn]);
    await p.waitForTimeout(Math.max(0,dn-60));
    /* finger down on the first target at time dn, up HOLD ms later; the target is looked up at touch-down (what her eye saw) */
    /* the life gate (#modal.klifewait) hides the dialog + blocks taps while the people pictures load: she cannot tap it, so the finger goes down the moment it lifts */
    await p.waitForFunction(()=>{const M=document.getElementById('modal');return M&&!M.hidden&&!M.classList.contains('klifewait')&&M.querySelector('.dlg')},null,{timeout:8000}).catch(()=>{});
    const tg=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg');if(!d)return null;const bt=[...d.querySelectorAll('.opts>button,#mb .k3btns button,#mr button,.k3foot button,.k3btns button,#mb button:not(.kx):not(.close)')].filter(e=>e.offsetParent&&e.getClientRects().length)[0];if(!bt)return{none:1,kind:d.dataset.kind,ksz:d.dataset.ksz};const r=bt.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,kind:d.dataset.kind,ksz:d.dataset.ksz,txt:bt.textContent.trim().slice(0,20)}});
    if(!tg||tg.none){info=JSON.stringify(tg);continue}
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:tg.x,y:tg.y}]});
    /* STRADDLE: the late picture lands while the finger is down (the real fault); STRADDLE=0 only measures the natural race */
    if(process.env.STRADDLE!=='0')await p.evaluate(()=>{const d=document.querySelector('#modal .dlg.kszlive');if(d)kszLiveRepick3(d)});
    await p.waitForTimeout(HOLD);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(500);
    const hit=await p.evaluate(()=>(window.__tap|0)||(document.getElementById('modal').hidden||!document.querySelector('#modal .dlg')?1:0));n++;tried++;if(hit>=1)ok++;else{lost++;await p.screenshot({path:`${OUT}/${tag}-${name.replace(/\//g,'_')}-down${dn}.png`})}
    info=`${tg.kind}/${tg.ksz}`}
   rows.push(`${name.padEnd(18)} | ${tag.padEnd(9)} | ${String(ok)+'/'+n} | ${info}`);console.log(rows[rows.length-1])}
  if(errs.length)console.log('pageerrors',errs.slice(0,3));await ctx.close()}
 await b.close();console.log(`TOTAL tried ${tried}, lost ${lost}`);process.exit(lost?1:0)})();
