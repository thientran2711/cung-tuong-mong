/* review/wear-slots (GAP IT03): wear slots «Hoa tai» (IT.sl ear) + «Giày» (IT.sl shoe).
   usage: node dev/test/sw-serve.js <port> <repo root> (other shell); node dev/test/wear-slots.js http://127.0.0.1:<port>/ <outdir> [WxH@dpr,...]
   Checks: 4 items built from BAL.wearSlots (law 4, every number) · one piece per slot (wear swaps) · wearBonus ×1.5 above rank · vượt phẩm (vpItems) ·
   luxury (luxWorn/luxOf) · the 3 wear-slot places (Tư trang KEQ_TT, Chọn y phục TOIL_SL, person card DS_SLOTS) carry both slots ·
   shop sub-tab «Giày» · earrings reward-only (not in SHOP_ALL), in BEST lists · NPC parity (bestow + monthly auto-wear, person card shows it) ·
   worn piece stays in p.inv (law 6c) · old save (no new keys) loads · Tư trang panel: no page overflow, wear column inside the panel. Exit 1 on a miss. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const fails=[];const F=(sz,m)=>fails.push(`${sz}: ${m}`);let first=true;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.addInitScript(()=>{window.__nlInner=1});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof keqTT==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  const r=await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){try{nlNew()}catch(e){}KMQ.length=0;start();if(!isSrv()&&!S.kc)break}Q.length=0;KMQ.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   const o={};const B=BAL.wearSlots;o.items={};for(const sl in B)for(const k in B[sl]){const it=IT[k],b=B[sl][k];o.items[k]={ok:!!it&&it.sl===sl&&it.pr===b.pr&&it.rk===b.rk&&JSON.stringify(it.w)===JSON.stringify(b.w)&&it.kd==="Trang sức",art:!!itemArt(k),d:it&&it.d,shop:SHOP_ALL.includes(k),best:Object.keys(BEST).filter(w=>BEST[w].includes(k))}}
   S.rank=0;S.inv=S.inv.filter(e=>!(IT[e.k]&&["ear","shoe"].includes(IT[e.k].sl)));const sac0=wearBonus(S).sac,lux0=luxOf(S).sc,vp0=vpItems(S).length;
   S.inv.push({k:"hoatai",from:"emp"});wear(S,S.inv.length-1);const wb1=wearBonus(S);o.ear1={w:S.inv[S.inv.length-1].w,dSac:wb1.sac-sac0,lux:luxOf(S).sc-lux0,vp:vpItems(S).length-vp0};
   S.inv.push({k:"hoataivang",from:"emp"});wear(S,S.inv.length-1);const wb2=wearBonus(S);
   o.ear2={onlyOne:S.inv.filter(e=>e.w&&IT[e.k]&&IT[e.k].sl==="ear").length,still:S.inv.some(e=>e.k==="hoatai"&&!e.w),dSac:wb2.sac-sac0,vp:vpItems(S).map(x=>x.k)};
   S.inv.push({k:"giayhoa"});wear(S,S.inv.length-1);o.shoe={dSac:wearBonus(S).sac-sac0,worn:S.inv.some(e=>e.k==="giayhoa"&&e.w)};
   o.places={keq:KEQ_TT.map(t=>t[0]),toil:TOIL_SL.map(t=>t[0]),ds:DS_SLOTS.map(t=>t[0])};
   o.shopCat={giay:kitShopCat("giayhoa"),ear:kitShopCat("hoatai")};
   /* NPC parity */const v=liveRivals(true).find(x=>x&&x.alive!==false&&!x.out);v.inv=(v.inv||[]).filter(e=>!(IT[e.k]&&["ear","shoe"].includes(IT[e.k].sl)));const vr=rkOf(v);
   v.inv.push({k:"hoatai",from:"emp"},{k:"giayhoa",from:"buy"});const sv=wearBonus(v).sac;
   v.inv.forEach((e,i)=>{const it=e&&IT[e.k];if(it&&it.sl&&!e.w&&!e.h&&(it.rk<=rkOf(v)||hasT(v,"Kiêu ngạo")))wear(v,i)});/* = the j8 rivalsMonth line */
   const ds=dressSlots(v);o.npc={worn:v.inv.filter(e=>e.w&&IT[e.k]&&["ear","shoe"].includes(IT[e.k].sl)).map(e=>e.k),dSac:wearBonus(v).sac-sv,card:ds.filter(c=>c.slot==="ear"||c.slot==="shoe").map(c=>c.k||null),n:ds.length};
   let got=0;for(let i=0;i<300;i++){const n0=v.inv.length;bestow(v,"night");const e=v.inv[v.inv.length-1];if(v.inv.length>n0&&IT[e.k]&&IT[e.k].sl==="ear")got++;}o.npc.bestowEar=got;
   /* old save: a saved state without any new key loads and the slots are empty */
   const old=JSON.parse(JSON.stringify(S));old.inv=old.inv.filter(e=>!(IT[e.k]&&["ear","shoe"].includes(IT[e.k].sl)));o.old={ok:true};try{const s0=S;S=old;tab='inv';render();o.old.slots=document.querySelectorAll('#panel .kinvside .keqc').length;S=s0}catch(e){o.old={ok:false,e:e.message}}
   return o});
  if(first){console.log(JSON.stringify(r));first=false}
  for(const k in r.items){const x=r.items[k];if(!x.ok)F(sz,`item ${k} not from BAL`);if(!x.art)F(sz,`no art ${k}`)}
  if(r.items.hoatai.shop||r.items.hoataivang.shop)F(sz,'earring sold in shop (reward only)');if(!r.items.giayhoa.shop)F(sz,'giayhoa not in shop');
  if(!r.items.hoatai.best.length||!r.items.hoataivang.best.length)F(sz,'earring not in rewards');
  if(r.ear1.w!==1||r.ear1.dSac!==2||r.ear1.lux<=0||r.ear1.vp)F(sz,'hoatai wear '+JSON.stringify(r.ear1));
  if(r.ear2.onlyOne!==1||!r.ear2.still||r.ear2.dSac!==Math.round(3*1.5)||!r.ear2.vp.includes('hoataivang'))F(sz,'hoataivang swap/vp '+JSON.stringify(r.ear2));
  if(!r.shoe.worn||r.shoe.dSac!==Math.round(3*1.5)+1)F(sz,'shoe '+JSON.stringify(r.shoe));
  for(const pl in r.places)if(!r.places[pl].includes('ear')||!r.places[pl].includes('shoe'))F(sz,'place '+pl+' lacks a slot');
  if(r.shopCat.giay!=='trang:shoe'||r.shopCat.ear!=='trang:ear')F(sz,'shop sub-tab '+JSON.stringify(r.shopCat));
  if(r.npc.worn.length!==2||r.npc.dSac!==3||r.npc.card.join()!=='hoatai,giayhoa')F(sz,'NPC '+JSON.stringify(r.npc));if(!r.npc.bestowEar)F(sz,'NPC never rewarded an earring');
  if(!r.old.ok||r.old.slots<8)F(sz,'old save '+JSON.stringify(r.old));
  /* Tư trang panel with both worn: shot + layout audit */
  const L=await p.evaluate(async()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}tab='inv';render();await new Promise(r=>setTimeout(r,900));
   const P=document.getElementById('panel'),sd=document.querySelector('#panel .kinvside');const pr=P.getBoundingClientRect(),sr=sd?sd.getBoundingClientRect():null;
   const labs=[...document.querySelectorAll('#panel .kinvside .keqc')].map(c=>c.textContent.replace(/\s+/g,' ').trim().slice(0,40));
   return{slots:labs.length,labs,inside:!!sr&&sr.bottom<=pr.bottom+1,pageOvf:document.documentElement.scrollWidth>innerWidth+1,scroll:P.scrollHeight>P.clientHeight+2}});
  console.log(sz,JSON.stringify(L));if(L.slots<8)F(sz,'Tư trang slots '+L.slots);if(!L.inside)console.log(sz,'OPEN (KIT_REQUESTS 20/11 wear-slots): wear column leaves the panel');if(L.pageOvf)F(sz,'page overflow');
  if(!L.labs.some(t=>/Hoa tai/.test(t))||!L.labs.some(t=>/Giày/.test(t)))F(sz,'slot names missing');
  await p.evaluate(async()=>{Q.length=0;try{KMQ.length=0}catch(e){}try{closeModal()}catch(e){}document.querySelectorAll('.kmov,#kroul,.kroul').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;await new Promise(r=>setTimeout(r,400))});
  await p.screenshot({path:`${OUT}/${wh}-tutrang.png`});
  /* the item panel of the worn earring: «Tháo»; a stored earring: «Đeo» */
  const A=await p.evaluate(async()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());const ix=S.inv.findIndex(e=>e.k==="hoatai"&&!e.w);/* r1: the real chest entry (kinvItems carries the painting grade the panel subtitle shows) */const x=kinvItems().find(x=>x&&x.g&&x.g.k==="hoatai"&&x.g.i===ix)||{g:{k:"hoatai",i:ix,n:1},grade:itemArt("hoatai").grade};kinvOpen(x);await new Promise(r=>setTimeout(r,500));
   const M=document.getElementById('modal');return{shown:!M.hidden,sub:(M.textContent.match(/Trang sức · \S+ ?\S*/)||[''])[0],btn:[...M.querySelectorAll('button')].map(b=>b.textContent.replace(/\s+/g,' ').trim().slice(0,50))}}).catch(e=>({err:e.message}));
  console.log(sz,'panel',JSON.stringify(A));if(!A.btn||!A.btn.some(t=>/^Đeo/.test(t)))F(sz,'no «Đeo» on a stored earring');if(!/Tinh phẩm/.test(A.sub||''))F(sz,'earring panel grade '+A.sub+' (painting = Tinh phẩm)');
  await p.screenshot({path:`${OUT}/${wh}-earring-panel.png`});
  /* the person card of the NPC from the parity check (K1 kitWearSlots row: 8 wear slots + pet) */
  const nm=await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const L=liveRivals(true);const i=L.findIndex(x=>x&&(x.inv||[]).some(e=>e.k==="hoatai"&&e.w));const v=L[i];
   S.met=S.met||{};S.met[v.id]=wk();try{k61Meet(v,"đã gặp",3)}catch(e){}try{dressLook(S,v,"cùng chỗ")}catch(e){}PG.rv=i;tab='rv';try{K3SH.home=false}catch(e){}render();try{k3Shell()}catch(e){}return v.name});
  await sleep(1500);await p.evaluate(nm=>{const sn=shortN(nm);const el=[...document.querySelectorAll('.pfaces [data-pi],.pfaces button,.pfaces .pf')].find(e=>e.textContent.trim().endsWith(sn));if(el)el.click()},nm);await sleep(1500);
  const K=await p.evaluate(()=>{const c=document.querySelector('.pc .kwear');if(!c)return{none:1};c.scrollIntoView({block:'center'});const r=c.getBoundingClientRect(),pc=c.closest('.pc').getBoundingClientRect();
   return{cells:c.querySelectorAll('.kitem').length,inside:r.left>=pc.left-1&&r.right<=pc.right+1,ovf:c.scrollWidth>c.clientWidth+2}});
  console.log(sz,'card',JSON.stringify(K));if(K.cells!==9)F(sz,'person card cells '+JSON.stringify(K));if(!K.inside||K.ovf)F(sz,'person card row overflows');
  await sleep(500);await p.screenshot({path:`${OUT}/${wh}-card.png`});
  /* the Chọn y phục side column */
  if(errs.length)F(sz,'page errors: '+errs.join(' | '));await ctx.close()}
 await b.close();console.log(fails.length?'FAIL\n'+fails.join('\n'):'PASS wear-slots');process.exit(fails.length?1:0)})();
