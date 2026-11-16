/* opt-greyed: a known option she cannot take (cost/rank/item) is shown GREYED with a reason chip, not tappable; kitTam on stand-in pictures.
   usage: node dev/test/opt-greyed.js <url> <shotdir> [WxH,...]   Exit 1 on failure. */
const {chromium}=require('playwright');const [,,URL,DIR,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  const r=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;S.bac=3;
   const hit=[];const o1=kitOff({n:"Ma ma giáo tập (thử)",fx:{},x:"Nắm chắc · tốn: 2 khắc, Sức -10, Bạc -40 · thành: tiến bộ +2..3",go:()=>{window.__took=1}},kitWhyBac(40),kitWhenBac());
   const o2={n:"Việc bình thường",fx:{},x:"Chắc chắn · tốn: 1 khắc · thành: không đổi gì",go:()=>{window.__ok=1}};
   Q.push({t:"Thử lựa chọn xám",h:"<p>Một lựa chọn đã biết nhưng chưa thể chọn.</p>",opts:[o1,o2,{n:"Thôi",fx:{},x:""}]});showModal();await new Promise(r=>setTimeout(r,700));
   const bs=[...document.querySelectorAll("#modal .opt")];const g=bs.find(x=>/Ma ma/.test(x.textContent));
   const out={n:bs.length,dis:g&&g.disabled,txt:g&&g.textContent.replace(/\s+/g," "),grey:g&&g.classList.contains("kdis")};
   if(g)g.click();out.took=!!window.__took;return out});
  await p.screenshot({path:`${DIR}/opt-${sz}.png`});
  const tm=await p.evaluate(async()=>{Q.length=0;document.getElementById('modal').hidden=true;let a=null;try{a=kpmArt(0)}catch(e){}
   const h=kitPalaceMap({slot:0,k:null});const pn=document.getElementById('panel');pn.innerHTML=h;{const o=document.createElement('div');o.id='tamov';o.style.cssText='position:fixed;left:20px;top:20px;width:'+Math.min(innerWidth-40,700)+'px;z-index:99999;background:#f5ecdc';o.innerHTML=h.replace(/<img class="mapimg"[^>]*>/,'<div class="mapimg" style="height:360px;background:#7a6a55"></div>');document.body.appendChild(o)}await new Promise(r=>setTimeout(r,900));
   const has=!!pn.querySelector('.ktam');return{tam:a&&a.tam,has,none:kitTam(false)===''&&kitTam(true).includes('tạm')}});
  await p.screenshot({path:`${DIR}/tam-${sz}.png`});console.log(sz,'tam',JSON.stringify(tm));if(!tm.none||(tm.tam&&!tm.has)||(!tm.tam&&tm.has))bad++;
  const ok=r.dis&&r.grey&&/thiếu 37 bạc/.test(r.txt)&&/mở lại khi đủ bạc/.test(r.txt)&&!r.took&&errs.length===0;
  console.log(sz,ok?'PASS':'FAIL',JSON.stringify(r),errs.join('|'));if(!ok)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
