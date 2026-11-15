/* review/kit-fig2: KIT 40 kitEventDp — event dialogs with a person: person column left (name + rank above, full height), event picture as a
   banner on top of the right column, text, then options (two per row when short). Dialog height = content (32.7c).
   usage: node dev/test/event-dp.js <build url> <outdir> <tag> [WxH@dpr,...] [kinds]   kinds: mock, long, nopic, emp
   Measures: banner inside the right column (left ≥ figure column right), banner height, object-position, painted figure / column under the
   chips, chip above the head, option columns, dialog box, empty space under the options. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,TAG,SIZES,KINDS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,844x390@3,1366x1024@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  for(const k of (KINDS||"mock,long,nopic,emp").split(",")){
   const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
   const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
   await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
   await p.addStyleTag({content:'#kroul{display:none!important}'});
   await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}
    Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
   for(let tr=0;tr<4;tr++){await p.evaluate(k=>{Q.length=0;document.getElementById('modal').hidden=true;const R0=liveRivals(true).filter(v=>!v.queen);const v=R0.find(x=>k61St(x)>=1)||R0[0];kn();S.met[v.id]=1;
     const o2=[{n:"Nhịn",fx:{duc:2},x:"giữ lễ; nàng ghen +3",go:()=>{}},{n:"Đáp trả sắc sảo",fx:{danh:1},x:"nàng oán +10",go:()=>{}}];
     const oL=[{n:"Nhịn, cúi đầu nhận lời",fx:{duc:2,suc:-3},x:"giữ lễ · nàng ghen +3 · cung nhân bàn tán",go:()=>{}},{n:"Đáp trả sắc sảo trước mặt mọi người",fx:{danh:1,tamco:1},x:"nàng oán +10, ngươi được tiếng cứng cỏi · Thái hậu biết chuyện",go:()=>{}},{n:"Mời trà, khéo léo đổi chuyện",fx:{bac:-5},x:"nàng thân +2 · tốn trà ngon",go:()=>{}}];
     if(k==="mock")Q.push({t:"Có người đến",who:pv(v),stage:[v],headArt:{src:"img/ev-khach-den.webp"},h:`<p>${v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opts:o2});
     if(k==="long")Q.push({t:"Có người đến",who:pv(v),stage:[v],headArt:{src:"img/ev-khach-den.webp"},h:`<p>${v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opts:oL});
     if(k==="nopic")Q.push({t:"Có người đến",who:pv(v),stage:[v],h:`<p>${v.name} sang chơi.</p>`,opts:o2});
     if(k==="emp")Q.push({t:"Thánh giá đến",who:pEmp(),stage:[S.emp],headArt:{src:"img/ev-hoang-de-vui.webp"},h:`<p>Hoàng thượng ghé cung ngươi.</p>`,opts:o2});
     showModal()},k);await sleep(1200);if(await p.evaluate(()=>!document.getElementById('modal').hidden))break}
   await p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(1200);
   for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/ev-${TAG}-${k}-${wh}.jpg`,type:'jpeg',quality:72,timeout:120000});break}catch(e){await sleep(2000)}}
   res[k]=await p.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return{shown:false};const d=M.querySelector('.dlg'),R=e=>e.getBoundingClientRect();
    const col=M.querySelector('#mb .kpsubj.kes'),ban=M.querySelector('#mb > .kdlgart'),op=M.querySelector('#mb > .opts');const C=col?R(col):null;
    const caps=col?[...col.querySelectorAll('.kpsn')].map(R):[];const capB=caps.length?Math.max(...caps.map(c=>c.bottom)):(C?C.top:0);
    const figs=col?[...col.querySelectorAll('.kesimg')].map(im=>{const r=R(im);const fb=(window.__KITFB||{})[im.getAttribute('src')];const v=fb&&fb.v||{t:0,b:1};const top=r.top+v.t*r.height,bot=r.top+v.b*r.height;
     return{underChips:+((bot-top)/(C.bottom-capB)).toFixed(3),ofCol:+((bot-top)/C.height).toFixed(3),chipAbove:capB<=top+2}}):[];
    const btns=op?[...op.children].filter(x=>x.offsetParent):[];const cols=new Set(btns.map(x=>Math.round(R(x).left))).size;
    const lastB=btns.length?Math.max(...btns.map(x=>R(x).bottom)):0;const dr=R(d);
    const bi=ban&&ban.querySelector('img');
    return{mode:d.className.replace(/\s+/g,' '),dlg:[Math.round(dr.width),Math.round(dr.height)],banner:ban?{inRight:C?R(ban).left>=C.right-1:null,h:Math.round(R(ban).height),pos:bi?getComputedStyle(bi).objectPosition:''}:null,
     figs,optCols:cols,nOpt:btns.length,emptyUnderOpts:Math.round(dr.bottom-lastB),chips:caps.length}});
   await ctx.close()}
  R.push({sz,res,errs})}
 console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
