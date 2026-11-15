/* KIT 32.7 dialog-person test: opens dialogs with one / two people and no scene picture (visitor, men encounter, faction invite card,
   Thái hậu question, two visitors) + one with a picture band (32.6 must stay), screenshots each, prints geometry, cut text, scrollers, errors.
   usage: node dev/test/dialog-person.js <url of a build at the site root> <W>x<H>@dpr <outdir> <tag> [kinds] */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT,TAG,KINDS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const kinds=(KINDS||'host,men,invite,th,ally2,pic').split(',');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
 await p.waitForTimeout(1500);
 const res={};
 for(const k of kinds){
  res[k]={pushed:await p.evaluate(k=>{const kr=document.getElementById("kroul");if(kr)kr.remove();Q.length=0;const md=document.getElementById("modal");md.hidden=true;const R=liveRivals(true);const v=R[0],v2=R[1]||R[0];
   if(k==='host'){Q.push({t:"Có người đến",who:pv(v),h:`<p>${v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ; nàng ghen +3",go:()=>{}},{n:"Đáp trả sắc sảo",fx:{danh:1},x:"nàng oán +10, ngươi được tiếng cứng cỏi",go:()=>{}}]});showModal();return true}
   if(k==='invite'){Q.push({t:"Lời mời vào phe",who:pv(v),h:`<p>${v.name} mời ngươi vào phe. Vào thì cùng chia tin tức, chứng cứ, che chở nhau.</p><p class="past">Vào mục Phe phái để xin vào.</p>`});showModal();return true}
   if(k==='th'){const D=DILEMMAS[0];Q.push({t:"Vòng 2: Đức hạnh",who:pTH(),h:`<p>${D[0]}</p><p class="past">Chưa rõ người xét trọng điều gì.</p>`,opts:D[1].map(([vv,n])=>({n,fx:{},x:`phần theo ý người xét + Đức ${S.duc}, Tâm cơ ${S.tamco}`,go:()=>{}}))});showModal();return true}
   if(k==='ally2'){Q.push({t:"Có người đến",stage:[v,v2],who:pv(v),h:`<p>${v.name} cùng ${v2.name} sang thăm, ngỏ ý kết làm chị em.</p>`,opts:[{n:"Nhận lời",fx:{},x:`nàng thân +20 · các phi tần khác ghen +3`,go:()=>{}},{n:"Khéo từ chối",fx:{},x:"nàng thân -5",go:()=>{}},{n:"Hẹn hôm khác",fx:{},x:"không đổi gì",go:()=>{}},{n:"Mời trà rồi tiễn",fx:{bac:-2},x:"không đổi gì",go:()=>{}},{n:"Sai cung nữ đáp lời",fx:{},x:"nàng thân -2",go:()=>{}},{n:"Giả bệnh không tiếp",fx:{},x:"nàng thân -4",go:()=>{}}]});showModal();return true}
   if(k==='many'){Q.push({t:"Có người đến",who:pv(v),h:`<p>${v.name} sang hỏi chuyện, xin ngươi chọn một trong mười cách đáp.</p>`,opts:Array.from({length:10},(_,i)=>({n:`Cách đáp thứ ${i+1}`,fx:i%2?{bac:-5}:{danh:1},x:`nàng thân ${i%3?'+':'-'}${i+1} · ngươi được tiếng`,go:()=>{}}))});showModal();return true}
   if(k==='men'){const m=S.men&&S.men.find(x=>x.rw==="thị vệ");if(!m)return false;const vv=liveRivals(false).find(x=>!x.queen&&x.alive)||v;S.out=0;S.confined=0;S.buoi=1;used=0;S.place="home";S.menMet={};S.menW={[m.id]:"vuon"};S.menWhy={[m.id]:{w:"stray",k:"vuon",r:"letter",v:vv.id,why:"jealous"}};S.where[vv.id]="vuon";goTo("vuon");return true}
   if(k==='pic'){Q.push({t:"Có người đến",who:pv(v),headArt:{src:"img/ev-khach-den-1.webp"},h:`<p>${v.name} sang chơi.</p>`,opts:[{n:"Tiếp",fx:{},x:"thân +3",go:()=>{}},{n:"Từ chối",fx:{},x:"thân -3",go:()=>{}}]});showModal();return true}
   return false},k)};
  await p.waitForTimeout(k==='men'?3500:1800);
  for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${k}.jpg`,type:'jpeg',quality:82,timeout:120000});break}catch(e){await p.waitForTimeout(3000)}}
  Object.assign(res[k],await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return{shown:false};const d=M.querySelector('.dlg');const r=e=>{if(!e)return null;const q=e.getBoundingClientRect();return [Math.round(q.left),Math.round(q.top),Math.round(q.width),Math.round(q.height)]};
   const vis=e=>e&&e.offsetParent;const cut=[...M.querySelectorAll('button, .kpb p, .kpsn, figcaption, .opt small')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible').map(e=>e.textContent.slice(0,40));
   const scr=[...M.querySelectorAll('*')].concat([d]).filter(e=>vis(e)&&e.scrollHeight>e.clientHeight+2&&/auto|scroll/.test(getComputedStyle(e).overflowY)).map(e=>e.id||e.className);
   const dd=d.getBoundingClientRect();const figs=[...M.querySelectorAll('.kesimg')].filter(vis).map(r);
   const outside=[...M.querySelectorAll('.kesf,.kpsn,.opt,#mclose')].filter(vis).filter(e=>{const q=e.getBoundingClientRect();const side=q.left<dd.left-1||q.right>dd.right+1;return e.classList.contains('opt')?side:side||q.bottom>dd.bottom+1||q.top<dd.top-1}).map(e=>e.className);
   return{title:document.getElementById('mt').textContent,mode:d.className.replace(/\s+/g,' '),dlg:r(d),figs,body:r(M.querySelector('#mb .kpmain')||M.querySelector('#mb .kpb')),opts:r(M.querySelector('#mb .opts')),nopt:M.querySelectorAll('.opt').length,
    lastOptReach:(()=>{const o=M.querySelector('#mb .opts');if(!o)return null;const t=o.scrollTop;o.scrollTop=1e5;const l=[...o.querySelectorAll('.opt')].pop();const ok=l?l.getBoundingClientRect().bottom<=o.getBoundingClientRect().bottom+2:true;o.scrollTop=t;return ok})(),figOfDlg:figs.length?+(Math.max(...figs.map(f=>f[3]))/dd.height).toFixed(2):0,cut,scr,outside,hovf:document.documentElement.scrollWidth>innerWidth+1}}));
 }
 console.log(JSON.stringify({TAG,res,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
