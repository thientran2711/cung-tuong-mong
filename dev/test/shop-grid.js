/* review/act-pics: Nội vụ phủ shop (owner 11/15 09:40Z + 10:30Z + 10:45Z). usage: node dev/test/shop-grid.js <baseURL> <outdir> [WxH@dpr,...]
   Opens "Nhờ thái giám mua đồ" (8 items, 70 bạc), shoots it; taps an affordable tile (buy panel), "Tối đa", shoots; buys; checks:
   seller figure on the left (kit event stage, no scene band), grid columns, only the grid scrolls, price once per tile, no "TỐN"/"CẦN" on tiles,
   live total, the bag stacks the bought items (×N), "Thiếu bạc" on unaffordable, 0 errors / overflow. */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,412x1058@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100});const p=await ctx.newPage();p.setDefaultTimeout(240000);
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
  for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''});if(s)break;await sleep(500)}
  await sleep(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<40;i++){window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
   quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   S.shop=Object.keys(IT).filter(k=>IT[k].pr>0&&IT[k].pr<200).slice(0,8);S.bac=70;tab="inv";render();invAct("shop")});
  const imgs=()=>p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
  await sleep(2500);await imgs();const tag=wh;await p.screenshot({path:`${OUT}/shop-${tag}.jpg`,type:'jpeg',quality:82});
  const m1=await p.evaluate(()=>{const M=document.getElementById('modal');const g=M.querySelector('.kshg');const cols=g?getComputedStyle(g).gridTemplateColumns.split(' ').length:0;
   const fig=M.querySelector('.kpsubj.kes img.kesimg');const fr=fig&&fig.getBoundingClientRect(),gr=g.getBoundingClientRect();
   const tiles=[...M.querySelectorAll('.kshc')].map(c=>c.innerText.replace(/\s+/g,' '));
   return{cols,tiles:tiles.length,greyed:M.querySelectorAll('.kshc.kshno').length,tile0:tiles[0],tonCanOnTiles:tiles.some(t=>/TỐN|CẦN|thiếu bạc \(cần/i.test(t)),
    fig:fig?fig.getAttribute('src').replace(/^.*img\//,''):'',figLeft:fr?Math.round(fr.left)<Math.round(gr.left):null,figAbove:fr?fr.bottom<=gr.top+2:null,band:!!M.querySelector('.kesband,.kdlgart'),
    scrollers:[...M.querySelectorAll('*')].filter(e=>e.scrollHeight>e.clientHeight+2&&/(auto|scroll)/.test(getComputedStyle(e).overflowY)).map(e=>e.className.split(' ')[0]),
    overflowX:document.documentElement.scrollWidth>innerWidth}});
  /* Bán tab with nothing to sell: the hint line */
  const empty=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const t=document.querySelector('#modal [data-kshtab="sell"]');if(!t)return'no tab';t.click();await W(400);
   const e=document.querySelector('#modal .kshempty');const r=e?e.innerText:'(tiles '+document.querySelectorAll('#modal .kshc').length+')';document.querySelector('#modal [data-kshtab="buy"]').click();await W(300);return r});
  await sleep(300);
  /* select an affordable tile, Tối đa */
  const sel=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const c=document.querySelector('#modal .kshc:not(.kshno)');if(!c)return'none';c.click();await W(400);
   const q1=document.querySelector('#modal .kshtot').innerText.replace(/\s+/g,' ');document.querySelector('#modal [data-kshq="max"]').click();await W(400);
   const P=document.querySelector('#modal .kshbuy');return{q1,qmax:P.querySelector('.kshqn').textContent,tot:P.querySelector('.kshtot').innerText.replace(/\s+/g,' '),rows:P.querySelector('.kinvrows').innerText.replace(/\s+/g,' ').slice(0,120)}});
  await imgs();await sleep(600);await p.screenshot({path:`${OUT}/shop-${tag}-buy.jpg`,type:'jpeg',quality:82});
  const buy=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const b0=S.bac,n0=S.inv.length;const b=document.querySelector('#modal [data-kshbuy]');if(!b||b.disabled)return'disabled';b.click();await W(500);
   const k=S.inv.length?S.inv[S.inv.length-1].k:'';const grp=(typeof kinvItems==='function'?kinvItems():[]).find(x=>x.name===IT[k].n);
   return{bac:[b0,S.bac],inv:[n0,S.inv.length],stack:grp?grp.qty:null,open:!!document.querySelector('#modal .kshop'),log:kpPlain(S.logs[0]),btnAfter:(document.querySelector('#modal [data-kshbuy]')||{}).textContent}});
  await sleep(500);await p.screenshot({path:`${OUT}/shop-${tag}-after.jpg`,type:'jpeg',quality:82});
  /* Bán: the bought item is sellable now; sell 1 */
  const sell=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));document.querySelector('#modal [data-kshtab="sell"]').click();await W(400);
   const c=document.querySelector('#modal .kshc');if(!c)return'no tile';const tile=c.innerText.replace(/\s+/g,' ');c.click();await W(400);
   const b0=S.bac,n0=S.inv.length;const btn=document.querySelector('#modal [data-kshbuy]');const lab=btn.textContent;btn.click();await W(500);
   return{tile,lab,bac:[b0,S.bac],inv:[n0,S.inv.length],log:kpPlain(S.logs[0])}});
  await sleep(400);await p.screenshot({path:`${OUT}/shop-${tag}-sell.jpg`,type:'jpeg',quality:82});
  R.push({sz,m1,empty,sel,buy,sell,errs});await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close()})();
