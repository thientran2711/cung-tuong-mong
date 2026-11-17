/* scenes-3 (review/scenes-3): demotion scene (jdemo), Học thành tài (jlevel), Biếu quà làm lành with a work/item (jts).
   usage: node dev/test/scenes3.js [outdir]   shots go OUTSIDE the repo (default /home/user/wt/scenes-3-shots) */
const {chromium}=require('playwright');const D=require('./lib/device');const out=process.argv[2]||'/home/user/wt/scenes-3-shots';require('fs').mkdirSync(out,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});const R={};
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  const g=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
  const r={};
  r.start=await g.evaluate(()=>{try{SLOT=3;document.getElementById('title').hidden=true;start();try{NLP=null}catch(e){}Q.length=0;{const k=document.getElementById('kload');if(k)k.hidden=true;const m=document.getElementById('modal');if(m)m.hidden=true}try{render()}catch(e){}if(S.rank<3)S.rank=3;return {rank:S.rank,rivals:rivals.length}}catch(e){return{err:String(e)}}});
  try{await g.waitForSelector('#kroul',{timeout:20000});await p.waitForTimeout(1500);await g.evaluate(()=>{const b=[...document.querySelectorAll('#kroul button')].find(x=>/Bỏ qua/.test(x.textContent));b&&b.click()});await g.waitForSelector('#kroul',{state:'detached',timeout:20000})}catch(e){r.rouErr=String(e).slice(0,80)}
  await p.waitForTimeout(1500);await g.evaluate(()=>{document.querySelectorAll('.krbox,#kroul').forEach(x=>{const o=x.id==='kroul'?x:x.parentElement;o&&o.remove()});const c=document.getElementById('curtain');if(c)c.hidden=true;Q.length=0;try{NLP=null}catch(e){}const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}render()});
  /* --- part 2: level-up --- */
  r.lv=await g.evaluate(()=>{try{document.querySelectorAll(".kmov").forEach(x=>x.remove());KMQ.length=0;kmBusy=false;S.arts.cam=2;S.artp.cam=0;addArt("cam",5);return{lv:S.arts.cam,ov:KMQ?KMQ.length:-1}}catch(e){return{err:String(e.stack||e)}}});
  await p.waitForTimeout(2500);await p.screenshot({path:`${out}/${dev}-learn.png`});
  r.lvov=await g.evaluate(()=>{const o=document.getElementById("klearnov");return{has:!!o,txt:o?o.innerText.slice(0,260):"",img:o&&o.querySelector(".klearn-pic")?o.querySelector(".klearn-pic").src:""}});
  r.lvVir=await g.evaluate(()=>{try{document.querySelectorAll(".kmov").forEach(x=>x.remove());vNorm(S);S.vir.cong=0;S.virp.cong=0;addVir(S,"cong",3);return{lv:S.vir.cong}}catch(e){return{err:String(e.stack||e)}}});
  await g.evaluate(()=>{document.querySelectorAll('.kmov').forEach(x=>x.remove());KMQ.length=0;Q.length=0});
  /* --- part 3: gift picker --- */
  r.gift=await g.evaluate(()=>{try{const v=rivals.find(x=>x.alive!==false&&!x.out)||rivals[0];S.inv.push({k:"nghien"});const keys=Object.keys(IT).filter(k=>IT[k].sl).slice(0,3);for(const k of keys)S.inv.push({k});
   S.inv.push({k:"tp",wk:{kind:"kimchi",a:"cong",ti:3,q:6,n:"Túi thơm thêu hoa sen",m:2,bn:"ngươi",d:"x",from:"me"}});S.inv.push({k:"tp",wk:{kind:"kimchi",a:"cong",ti:0,q:1,n:"Khăn thêu tạm",m:0,bn:"ngươi",d:"x"}});
   const D1={top:[{v,q:.3,b:2}],n:30,unk:0};const o=tsOptGiftsItem(D1);const d=PEND.tsgiftpick({v:v.id});
   return {opt:o&&o.n,optx:o&&o.x,rows:d.o.map(x=>({n:x.n,x:x.x,dis:!!x.tsDis,need:x.need&&x.need.map(n=>n.t)}))}}catch(e){return{err:String(e.stack||e)}}});
  r.giftgo=await g.evaluate(()=>{try{const v=rivals.find(x=>x.alive!==false&&!x.out)||rivals[0];v.ghen=40;const d=PEND.tsgiftpick({v:v.id});const i=d.o.findIndex(x=>x.n&&!x.tsDis&&x.ik!=null);if(i<0)return{none:true};const ghen0=v.ghen,n0=S.inv.length;d.o[i].go();return{item:d.o[i].n,ghen:[ghen0,v.ghen],inv:[n0,S.inv.length]}}catch(e){return{err:String(e.stack||e)}}});
  /* --- the panel itself, with the new option, as a real dialog --- */
  await g.evaluate(()=>{try{Q.length=0;const v=rivals.find(x=>x.alive!==false&&!x.out)||rivals[0];const D1={top:[{v,q:.3,b:2}],n:30,unk:0};Q.unshift({t:"Nguy hiểm chung",h:"<p>x</p>",opts:[tsOptGifts(D1),tsOptGiftsItem(D1),{n:"Thôi",fx:{}}].filter(Boolean),showOut:true,tsk:"danger"});showModal()}catch(e){}});
  await p.waitForTimeout(600);await p.screenshot({path:`${out}/${dev}-giftopt.png`});
  r.pick=await g.evaluate(()=>{try{Q.length=0;const v=rivals.find(x=>x.alive!==false&&!x.out)||rivals[0];pushDil(mkP("tsgiftpick",{v:v.id}),"Biếu quà làm lành");showModal();return Q.length}catch(e){return String(e)}});
  await p.waitForTimeout(700);await p.screenshot({path:`${out}/${dev}-giftpick.png`});
  /* --- part 1: demotion --- */
  await g.evaluate(()=>{Q.length=0;document.getElementById("modal")&&(document.getElementById("modal").hidden=true)});
  r.demo=await g.evaluate(()=>{try{Q.length=0;S.out=0;S.rank=4;const hi=Object.keys(IT).filter(k=>IT[k].sl&&IT[k].rk>=5).slice(0,2);for(const k of hi)S.inv.push({k,w:1});
   const before=S.inv.filter(e=>e.w).length;S.rank=2;const got=window.dhConfiscate(S,"giang","thử");return{hi,before,above:demoAbove(S).length,inv:S.inv.filter(e=>e.w).length,box:(S.il&&S.il.box||[]).filter(x=>x.why==="demote").length,Q:Q.length,qt:Q[0]&&Q[0].t}}catch(e){return{err:String(e.stack||e)}}});
  await g.evaluate(()=>{showModal()});await p.waitForTimeout(900);await p.screenshot({path:`${out}/${dev}-demo.png`});
  r.demoNpc=await g.evaluate(()=>{try{Q.length=0;const v=rivals.find(x=>x.alive!==false&&!x.out&&!x.queen&&x.rank>=1);if(!v)return{none:1};const k=Object.keys(IT).filter(k=>IT[k].sl&&IT[k].rk>=6)[0];v.inv=v.inv||[];v.inv.push({k,w:1});const r0=v.rank;v.rank=0;const got=demoSeize(v,"giang","thử");return{npc:v.name,k,got:got.length,Q:Q.length,left:v.inv.filter(e=>e.w).length}}catch(e){return{err:String(e.stack||e)}}});
  r.demoReturn=await g.evaluate(()=>{try{Q.length=0;S.out=0;S.rank=7;const n0=(S.il.box||[]).filter(x=>x.why==="demote").length;demoReturn();return{box0:n0,box1:(S.il.box||[]).filter(x=>x.why==="demote").length,Q:Q.length}}catch(e){return{err:String(e.stack||e)}}});
  r.cold=await g.evaluate(()=>{try{Q.length=0;S.rank=3;S.out=0;const k=Object.keys(IT).filter(k=>IT[k].sl&&IT[k].rk<=1)[0];S.inv.push({k,w:1});S.out=1;const got=window.dhConfiscate(S,"cold","thử");return{k,got:got&&got.items?1:0,inv:S.inv.filter(e=>e.w&&e.k===k).length,Q:Q.length}}catch(e){return{err:String(e.stack||e)}}});
  await g.evaluate(()=>{showModal()});await p.waitForTimeout(900);await p.screenshot({path:`${out}/${dev}-cold.png`});
  await g.evaluate(()=>{S.out=0;S.rank=3;Q.length=0});
  r.errs=errs;R[dev]=r;await ctx.close()}
 console.log(JSON.stringify(R,null,1));await b.close();srv.close()})();
