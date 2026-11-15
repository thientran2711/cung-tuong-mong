/* review/kit-fig2: KIT 32.7b + KIT 48 — in every person dialog the people FILL the figure column (painted top under the name chips, feet on
   the column floor), name + rank chip ABOVE the head. usage: node dev/test/fig-fill.js <build url> <outdir> <tag> [WxH@dpr,...] [kinds]
   kinds: woman (one visitor), man (eunuch), two (two women), mix (woman + eunuch), shop (Nội vụ phủ shop).
   Per figure: painted height (top of hair/hat → feet) / column height, / the column under the chips; chip bottom ≤ painted top; feet ≤ floor. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES,KINDS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const res={},errs=[];
  for(const k of (KINDS||"woman,man,two,mix,shop").split(",")){
  /* a fresh context per kind (one long page with many dialogs ran out of memory at @3) */
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;
   render()});
   await sleep(1000);
   for(let tr=0;tr<4;tr++){await p.evaluate(k=>{Q.length=0;const md=document.getElementById("modal");md.hidden=true;const R0=liveRivals(true).filter(v=>!v.queen);const R=R0.filter(v=>k61St(v)>=1).concat(R0.filter(v=>k61St(v)<1));kn();R.slice(0,2).forEach(v=>S.met[v.id]=1);const v=R[0],v2=R[1]||R[0];
    const eun={__fig:"img/fig-eunuch-ndp-tray.webp",__cap:"Tiểu Lý Tử",__role:"Thái giám Nội vụ phủ",age:28,sex:"m"};const o=[{n:"Tiếp",fx:{},x:"thân +3",go:()=>{}},{n:"Từ chối",fx:{},x:"thân -3",go:()=>{}}];
    if(k==="woman")Q.push({t:"Có người đến",stage:[v],who:pv(v),h:`<p>${v.name} sang chơi.</p>`,opts:o});
    if(k==="man")Q.push({t:"Có người đến",stage:[eun],h:`<p>Thái giám Nội vụ phủ đến bẩm việc.</p>`,opts:o});
    if(k==="two")Q.push({t:"Có người đến",stage:[v,v2],who:pv(v),h:`<p>${v.name} cùng ${v2.name} sang thăm.</p>`,opts:o});
    if(k==="mix")Q.push({t:"Có người đến",stage:[v,eun],who:pv(v),h:`<p>${v.name} dẫn thái giám sang.</p>`,opts:o});
    if(k==="shop"){S.shop=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<200).slice(0,8);S.bac=70;invAct("shop");return}
    showModal()},k);await sleep(1200);if(await p.evaluate(()=>!document.getElementById('modal').hidden))break}/* a game timer sometimes empties Q right after: open again */
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(1500);
   for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/fig-${TAG}-${k}-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000});break}catch(e){await sleep(2000)}}
   res[k]=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{shown:false};const col=M.querySelector('#mb .kpsubj.kes');if(!col)return{nocol:true};const C=col.getBoundingClientRect();
    const caps=[...col.querySelectorAll('.kpsn')].map(c=>c.getBoundingClientRect());const capBottom=caps.length?Math.max(...caps.map(c=>c.bottom)):C.top;
    const figs=[...col.querySelectorAll('.kesf img.kesimg')].map(im=>{const r=im.getBoundingClientRect();const fb=(window.__KITFB||{})[im.getAttribute('src')];const v=fb&&fb.v||{t:0,b:1};
     const top=r.top+v.t*r.height,bot=r.top+v.b*r.height;return{painted:+((bot-top)/C.height).toFixed(3),underChips:+((bot-top)/(C.bottom-capBottom)).toFixed(3),img:+(r.height/C.height).toFixed(3),
      chipAbove:capBottom<=top+2,feetGap:Math.round(C.bottom-bot)}});
    const d=M.querySelector('.dlg').getBoundingClientRect();return{colH:Math.round(C.height),capH:Math.round(capBottom-C.top),figs,dlg:[Math.round(d.width),Math.round(d.height)],chips:[...col.querySelectorAll('.kpsn')].map(c=>c.textContent.trim())}});
   await ctx.close()}
  R.push({sz,res,errs})}
 console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
